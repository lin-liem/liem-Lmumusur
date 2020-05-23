document.ready = function (callback) {
    ///兼容FF,Google
    if (document.addEventListener) {
        document.addEventListener('DOMContentLoaded', function () {
            document.removeEventListener('DOMContentLoaded', arguments.callee, false);
            callback();
        }, false)
    }
     //兼容IE
    else if (document.attachEvent) {
        document.attachEvent('onreadystatechange', function () {
              if (document.readyState == "complete") {
                        document.detachEvent("onreadystatechange", arguments.callee);
                        callback();
               }
        })
    }
    else if (document.lastChild == document.body) {
        callback();
    }
}

document.ready(function () {
    var list = document.querySelector('.pinterest-list');
    if(list){
        var indexlist = new Packery(list, {
            itemSelector: '.index-item',
            resize:true
          });

        indexlist.items.forEach( function( item ) {
            item.element.className += ' fadeIn animated'
        });

        var paged = 2

        var load = document.querySelector('#index-loading');

        var locked = false

        window.onscroll= function(){
            //文档内容实际高度（包括超出视窗的溢出部分）
            var scrollHeight = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight);
            //滚动条滚动距离
            var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
            //窗口可视范围高度
            var clientHeight = window.innerHeight || Math.min(document.documentElement.clientHeight,document.body.clientHeight);
            
            if(clientHeight + scrollTop >= scrollHeight && !locked){
                locked = true
                load.className += ' show'
                axios.post(b2_rest_url+'indexMorePost','paged='+paged).then(res=>{
                    if(res.data){
                        let dom = parseDom(res.data);
                    
                        var fragment = document.createDocumentFragment();
    
                        let items = [];
                        dom.forEach(element => {
                            if(element.tagName == 'DIV'){
                                fragment.appendChild(element );
                                items.push(element)
                            }
                        });
    
                        list.appendChild( fragment );
    
                        indexlist.appended( items );
    
                        indexlist.items.forEach( function( item ) {
                            if(item.element.className.indexOf('fadeIn') === -1){
                                item.element.className += ' fadeIn animated'
                            }
                        });
                        load.className = load.className.replace(' show','')
                        console.log(paged)
                        paged++
                    }else{
                        document.querySelector('#index-loading').innerHTML = '<span>已经到底啦</span>'
                    }
                    locked = false
                })
            }
    
        }
    }
});

function parseDom(arg) {

    var objE = document.createElement("div");
    
    objE.innerHTML = arg;
    
    return objE.childNodes;
    
};
    