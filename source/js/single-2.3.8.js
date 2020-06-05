
  

Vue.component('poster-box', {
    props: ['show'],
    template:b2_global.poster_box,
    data(){
        return {
            poster:'',
            isWeixin:false,
            data:'',
            loadedjs:false,
            locked:false,
            showLong:false,
            thumb:'',
            logo:''
        }
    },
    mounted(){
        this.isWeixin = b2isWeixin()
        this.data = JSON.parse(this.$refs.poster.getAttribute('data-poster'))

        const qr = new QRious({
            value: this.data.link,
            size:100,
            level:'L'
          });
        this.data.qrcode = qr.toDataURL('image/jpeg')
    },
    methods:{
        close(val){
            this.$emit('close-form',val)
        },
        openWin(url,type){
            if(type == 'weibo'){
                url = url+'&pic='+this.data.thumb
            }else{
                url = url+'&pics='+this.data.thumb
            }

            openWin(url,type,500,500)
        },
		getbase64(){
            if(this.locked) return;
            this.locked = true 
			var path = this.data.logo;
			
			this.getUrlBase64(path, 'jpeg', function (base64) {
				console.log(base64);//base64编码值
				this.logo = base64
			});
			setTimeout(()=>{
				this.html2canvas()
			}, 0);
		 
        },
		getUrlBase64(url, ext, callback) {
			var canvas = document.createElement("canvas");   //创建canvas DOM元素
			var ctx = canvas.getContext("2d");
			var img = new Image;
			img.crossOrigin = 'Anonymous';
			img.src = url;
			img.onload = function () {
				canvas.height = img.height; //指定画板的高度,自定义
				canvas.width = img.width; //指定画板的宽度，自定义
				ctx.drawImage(img, 0, 0, img.width,  img.height); //参数可自定义
				var dataURL = canvas.toDataURL("image/" + ext);
				callback.call(this, dataURL); //回掉函数获取Base64编码
				canvas = null;
			};
		},
        html2canvas(){
            var dom = this.$refs.posterContent,
                w = dom.clientWidth,
                h = dom.clientHeight;

            html2canvas(dom,{
                allowTaint: true,
                taintTest: false,
                dpi: 240,
                scale: 2,
                with:w,
                height:h,
                onrendered:(canvas)=>{
                    canvas.mozImageSmoothingEnabled = false;
                    canvas.webkitImageSmoothingEnabled = false;
                    canvas.msImageSmoothingEnabled = false;
                    canvas.imageSmoothingEnabled = false;
					var img = new Image();
					img.setAttribute('crossOrigin', 'anonymous');
					console.log(canvas.imageSmoothingEnabled);
					img.src =  canvas.toDataURL();
					console.log(img);
     //                this.poster = canvas.toDataURL();
					
                }
            });
        },
        base64ToBlob(code) {
            var parts = code.split(';base64,');
            var contentType = parts[0].split(':')[1];
            var raw = window.atob(parts[1]);
            var rawLength = raw.length;

            var uInt8Array = new Uint8Array(rawLength);

            for (var i = 0; i < rawLength; ++i) {
                uInt8Array[i] = raw.charCodeAt(i);
            }
            return new Blob([uInt8Array], {type: contentType});
        },
    },
    watch:{
        show(val){
            if(val && !this.loadedjs){
                b2loadScript(b2_global.site_info.plugin_uri+'html2canvas.min.js',()=>{
                    this.loadedjs = true
                    this.getbase64()
                })
            }
        }
    }
})

var posterBox = new Vue({
    el:'#poster-box',
    data:{
        show:false,
        data:[]
    },
    methods:{
        close(val){
            this.show = val
        }
    }
})

//内页底部
var b2ContentFooter = new Vue({
    el:'.content-footer',
    data:{
        showPoster:false,
        postData:[],
        locked:false
    },
    methods:{
        openPoster(){
            posterBox.show = true;
        }
    }
})

//点击展开二维码
// var b2Fold = new Vue({
//     el:'#fold',
//     data:{
//         open:false
//     },
//     mounted() {
//         document.onclick = ()=>{
//             if(this.open == true){
//                 this.open = false
//             }
//         }
//     },
//     methods:{
//         click(){
//             this.open = !this.open
//         }
//     }
// })

function grin(tag,myField) {
    tag = ' ' + tag + ' ';

    if (document.selection) {
        myField.focus();
        sel = document.selection.createRange();
        sel.text = tag;
        myField.focus();
    }
    else if (myField.selectionStart || myField.selectionStart == '0') {
        var startPos = myField.selectionStart;
        var endPos = myField.selectionEnd;
        var cursorPos = startPos;
        myField.value = myField.value.substring(0, startPos)
                + tag
                + myField.value.substring(endPos, myField.value.length);
        cursorPos += tag.length;
        myField.focus();
        myField.selectionStart = cursorPos;
        myField.selectionEnd = cursorPos;

    } else {
        myField.value += tag;
        myField.focus();
    }
}

//评论框
var b2Comment = new Vue({
    el:'#respond',
    data:{
        userData:[],
        data:[],
        content:'',
        show:{
            info:false,
            smile:false,
            image:false
        },
        focus:false,
        //图片上传
        parentId:0,
        progress:0,
        locked:false,
        commentData:{
            imgUrl:'',
            imgId:''
        },
        subLocked:false,
    },
    mounted(){
        if(this.$refs.respond){
            this.resetUserInfo()
            setTimeout(()=>{
                autosize(this.$refs.textarea_box);
            })
        }
    },
    methods:{
        resetUserInfo(){
            let userData = JSON.parse(localStorage.getItem('userData'))
            if(!userData){
                this.data = JSON.parse(this.$refs.formData.getAttribute('data-commenter'))
                this.userData = {
                    'nickname':this.data.user_name,
                    'email':this.data.user_email,
                    'avatar':this.data.avatar
                }
            }else{
                this.userData = {
                    'nickname':userData.user_display_name,
                    'email':'',
                    'avatar':userData.avatar,
                    'user_link':userData.user_link
                }
            }
        },
        addSmile(val){
            grin(val,document.querySelector('#textarea'))
        },
        resetmove(){
            if(this.subLocked || this.locked) return
            this.parentId = 0
            document.querySelector('#comment-form').appendChild(b2Comment.$refs.respond)
            if(this.$refs.fileInput){
                this.$refs.fileInput.value = null
            }
            this.commentData.imgUrl = ''
            this.commentData.imgId = ''
            this.show.image = false
            this.progress = 0
        },
        submit(){
            if(this.subLocked == true || this.Locked == true) return
            this.subLocked = true
            let data = {
                'comment_post_ID':b2_global.post_id,
                'author':this.userData.nickname,
                'email':this.userData.email,
                'comment':this.$refs.textarea.value,
                'comment_parent':this.parentId,
                'img':this.commentData
            }

            this.$http.post(b2_rest_url+'commentSubmit',Qs.stringify(data)).then(res=>{
                if(this.parentId){
                    b2CommentList.$el.querySelector('#comment-children-'+this.parentId).innerHTML = res.data.list
                }else{
                    b2CommentList.$refs.commentList.insertAdjacentHTML('beforeend', res.data.list)
                }
                this.$refs.textarea.value = ''
                this.subLocked = false
                this.resetmove()
                b2CommentList.listImg()
                if(b2CommentList.$refs.noneComment){
                    b2CommentList.$refs.noneComment.remove()
                }
            }).catch(err=>{
                this.$toasted.show(err.response.data.message, {
                    theme: 'primary', 
                    position: 'top-center', 
                    duration : 4000,
                    type:'error'
                })
                this.subLocked = false
            })
        },
        deleteImage(){
            this.commentData.imgUrl = ''
            this.commentData.imgId = ''
            this.progress = 0
            this.$refs.fileInput.value = null
        },
        getFile(event){
            if(event.target.files.length <= 0) return
            if(this.locked == true) return
            this.locked = true

            this.commentData.imgUrl = ''
            this.commentData.imgId = ''

            this.progress = 0

            let file = event.target.files[0]

            this.show.image = true

            let formData = new FormData()

            formData.append('file',file,file.name)
            formData.append("post_id", b2_global.post_id)
            formData.append("type", 'comment')

            let config = {
                onUploadProgress: progressEvent=>{
                    this.progress = progressEvent.loaded / progressEvent.total * 100 | 0
                }
            }

            this.$http.post(b2_rest_url+'imageUpload',formData,config).then(res=>{
                if(res.data.status == 401){
                    this.$toasted.show(res.data.message, {
                        theme: 'primary', 
                        position: 'top-center', 
                        duration : 4000,
                        type:'error'
                    })
                    this.show.image = false
                    this.progress = 0
                }else{
                    this.commentData.imgUrl = res.data.url
                    this.commentData.imgId = res.data.id
                }
                this.$refs.fileInput.value = null
                this.locked = false;
            }).catch(err=>{
                this.$toasted.show(err.response.data.message, {
                    theme: 'primary', 
                    position: 'top-center', 
                    duration : 4000,
                    type:'error'
                })
                this.locked = false
                this.show.image = false
                this.progress = 0
                this.$refs.fileInput.value = null
            })
        },
        showLogin(){
            login.show = true
        }
    }
})

//评论列表
var b2CommentList = new Vue({
    el:'#comments',
    data:{
        selecter:'.comment-list',
        opt:{
            'post_id':b2_global.post_id
        },
        api:'getCommentList',
        options:[],
        tips:'',
        canSticky:false,
        lazyLoadInstance:''
    },
    mounted(){
        if(!this.$refs.commentPageNav) return
        this.listImg()
        this.checkVote()
        this.getTips()
        this.lazyLoadInstance = new LazyLoad({
            elements_selector: ".comment-img-box img"
        });
    },
    methods:{
        listImg(){
            let img = document.querySelectorAll('.comment-img-box img');
            if(img.length > 0){
                for (let index = 0; index < img.length; index++) {
                    b2zoom.listen(img[index]);
                }
            }
        },
        getTips(){
            this.$https.get(b2_rest_url+'getCommentTips').then(res=>{
                this.tips = res.data
            })
        },
        showSticky(){
            if(this.canSticky){
                let zd = document.querySelectorAll('.comment-zd');
                if(zd.length > 0){
                    for (let index = 0; index < zd.length; index++) {
                        zd[index].className = zd[index].className.replace(' comment-zd','')
                    }
                }
            }
        },
        sticky(comment_id){
            this.$http.post(b2_rest_url+'commentSticky','post_id='+b2_global.post_id+'&comment_id='+comment_id).then(res=>{
                this.$refs.commentPageNav.go(1,'comment',true)
                b2Comment.resetmove()
            })
        },
        vote(e,type,comment_id){

            let userData = JSON.parse(localStorage.getItem('userData'))
            if(!userData){
                login.show = true
            }else{
                this.$http.post(b2_rest_url+'commentVote','type='+type+'&comment_id='+comment_id).then(res=>{
                    let _type;
                    if(type === 'comment_up'){
                        _type = 'comment_down'
                    }else{
                        _type = 'comment_up'
                    }

                    let next = e.parentNode.querySelector('#'+_type.replace('_','-')+'-'+comment_id);
                        next.className = next.className.replace(/ voted/g,'')

                        e.className = e.className.replace(/ voted/g,'')

                    if(res.data[type] > 0){
                        e.className += ' voted'
                    }

                    next.lastChild.innerText = parseInt(next.lastChild.innerText) + res.data[_type]
                    e.lastChild.innerText = parseInt(e.lastChild.innerText) + res.data[type]

                })
            }
        },
        checkVote(){
            let userData = JSON.parse(localStorage.getItem('userData'))
            if(!userData) return
            let dom = document.querySelectorAll('.reply')

            if(dom.length == 0 ) return

            let ids = []

            for (let i = 0; i < dom.length; i++) {

                ids.push(dom[i].getAttribute('data-id'))
            }

            let data = {
                'ids':ids,
                'post_id':b2_global.post_id
            }

            this.$https.post(b2_rest_url+'commentVoteData',Qs.stringify(data)).then(res=>{
                if(res.data){
                    Object.keys(res.data.list).forEach(function (key) {
                        if(res.data.list[key]){
                            let dom = document.querySelector('#'+res.data.list[key]+'-'+key)

                            if(dom){
                                dom.className += ' voted'
                            }
                        }
                    })
                }
                this.canSticky = res.data.can_sticky
                this.showSticky()
            })
        },
        move(comment_id){
            if(b2Comment.subLocked || b2Comment.locked) return
            b2Comment.parentId = comment_id
            document.querySelector('#comment-form-'+comment_id).appendChild(b2Comment.$refs.respond)
        }
    }
})

var b2DownloadBox = new Vue({
    el:'#download-box',
    data:{
        list:'',
        login:false
    },
    mounted(){
        if(this.$refs.downloadBox){
            let userData = JSON.parse(localStorage.getItem('userData'))
            if(!userData){
                this.login = false
            }else{
                this.login = true
            }
            this.getList()
        }
    },
    methods:{
        getList(){
            this.$http.post(b2_rest_url+'getDownloadData','post_id='+b2_global.post_id).then(res=>{
                this.list = res.data
                let show = false

                if(document.body.clientWidth > 720){
                    show = true
                }

                for (let i = 0; i < this.list.length; i++) {
                    this.list[i].show_role = show
                }
                
            })
        },
        login(){
            login.show = true
        },
        go(link,allow){
            if(!this.login && !allow){
                login.show = true
            }else if(!allow){
                this.$toasted.show('没有权限下载', {
                    theme: 'primary', 
                    position: 'top-center', 
                    duration : 4000,
                    type:'error'
                })
            }else{
                window.open(link)
            }
        },
        pay(index){
            if(!this.login){
                login.show = true
            }else{
                if(this.list[index].current_user.can.type == 'money'){
                    b2DsBox.data = {
                        'title':this.list[index].name,
                        'order_price':this.list[index].current_user.can.value,
                        'order_type':'x',
                        'post_id':b2_global.post_id,
                        'order_key':index
                    }
                    b2DsBox.show = true;
                    b2DsBox.showtype = 'normal'
                }
            }
        },
        credit(index){
            if(!this.login){
                login.show = true
            }else{
                if(this.list[index].current_user.can.type == 'credit'){
                    payCredit.data = {
                        'title':this.list[index].name,
                        'order_price':this.list[index].current_user.can.value,
                        'order_type':'x',
                        'post_id':b2_global.post_id,
                        'order_key':index
                    }
                    payCredit.show = true;
                }
            }
        }
    }
})

b2VideoReset()
function b2VideoReset(){
    let videos = document.querySelectorAll('.b2-player');
    if(videos.length > 0){
        var player = [];
        for (let i = 0; i < videos.length; i++) {
            let data = JSON.parse(videos[i].getAttribute('data-video'));
            if(data.url){
                player[i] = new DPlayer({
                    container: videos[i],
                    screenshot: false,
                    mutex:true,
                    hotkey:true,
                    preload:'none',
                    video: {
                        url: data.url,
                        pic: data.poster,
                    },
                    logo:data.logo,
                    autoplay:false
                });
                player[i].on('play',()=>{
                    videos[i].querySelectorAll('.dplayer-video-current')[0].style="object-fit:contain"
                })
            }
        }
        b2playerInit()
    }
}

if(typeof b2SingleMeta !== 'undefined'){
    const postData = b2SingleMeta.$watch('postData',(newVal,oldVal)=>{
        if(typeof b2ContentFooter !== 'undefined'){
            b2ContentFooter.postData = newVal
        }
        if(typeof B2ShopSingle !== 'undefined'){
            if(B2ShopSingle.$refs.shopSingle){
                B2ShopSingle.postData = newVal
            }
        }
        if(typeof documentVote !== 'undefined'){
            documentVote.postData = newVal
        }
    })
}

function b2loadScript(url, callback){
    var script = document.createElement ("script")
    script.type = "text/javascript";
    if (script.readyState){ //IE
        script.onreadystatechange = function(){
            if (script.readyState == "loaded" || script.readyState == "complete"){
                script.onreadystatechange = null;
                callback();
            }
        };
    } else { //Others
        script.onload = function(){
            callback();
        };
    }
    script.src = url;
    document.getElementsByTagName("head")[0].appendChild(script);
}