//挂在axios
Vue.prototype.$http = axios //需要鉴权
Vue.prototype.$https = axios //不需要鉴权
Vue.prototype.$b2JsonData = []
var b2_rest_url = b2_global.rest_url + '/'

var B2ClientWidth = document.body.clientWidth;

var lazyLoadInstance = new LazyLoad({
    elements_selector: ".entry-content img"
});

// 导航选中状态
var url = location.href;
var urlstatus = false;
$("#top-menu-ul li a").each(function() {
	if ((url + '/').indexOf($(this).attr('href')) > -1 && $(this).attr('href') != '/') {
		$(this).parent("li").addClass('current-menu-item');
		var isSub = $(this).parent("li").parents("ul").is(".sub-menu");
		if(isSub){
			$(this).parent("li").parents("ul").parent("li").addClass('current-menu-item');
		}
		urlstatus = true;
	} else {
		$(this).parent("li").removeClass('current-menu-item');
	}
});
if (!urlstatus) {
	$("#top-menu-ul li").eq(0).addClass('current-menu-item');
}


//  公告模态
Vue.component('gg-box', {
	props: ['show', 'ggdata'],
	template: b2_global.gg_box,
	methods: {
		close() {
			this.$emit('close')
		},
	}
})

var b2GG = new Vue({
	el: '#gg-box',
	data: {
		ggdata: {
			'title': '',
			'thumb': '',
			'desc': '',
			'date': 0,
			'href': '',
			'close': 0
		},
		show: false
	},
	mounted() {
		var param = {
			params: {
				size: 1,
				sort: 'desc'
			},
			headers: {
				'Content-Type': 'application/json;charset=UTF-8',
				'API-Authorization': b2_global.api_content
			}
		}
		this.$http.get(b2_rest_url + 'tags/notice/posts', param).then(res => {
			let gg = JSON.parse(localStorage.getItem('gg_info'))

			var json_data = res.data.data;
			if (json_data.hasContent) {
				var content = json_data.content[0];
				var contentData = {
					'title': content.title,
					'thumb': content.thumbnail,
					'desc': content.summary,
					'date': content.createTime,
					'href': content.fullPath
				}

				if (!gg) {
					this.ggdata = contentData
					this.show = true
				} else {
					this.ggdata = contentData
					let timestamp = new Date().getTime()
					timestamp = parseInt(timestamp / 1000)

					if (timestamp - gg.close >= 86400) {
						this.show = true
					}
				}
			}

		}).catch(err => {
			this.$toasted.show(err.response.data.message, {
				theme: 'primary',
				position: 'top-center',
				duration: 4000,
				type: 'error'
			})
		})
	},
	methods: {
		close() {
			this.show = false
			let timestamp = new Date().getTime()
			timestamp = parseInt(timestamp / 1000)

			this.ggdata.close = timestamp
			localStorage.setItem('gg_info', JSON.stringify(this.ggdata))
		}
	}
})


/**
 * 赞赏
 */
var donateBox = new Vue({
    el:'#donate-box',
    data:{
		payType:'',
        show:false
    },
    methods: {
        close(){
            this.show = !this.show
        },
		choseType(val){
		    this.payType = val
		}
    }
})
 

/**
 * 关注微信公众号
 */
var gongzhonghaoBox = new Vue({
    el:'#gongzhonghao-box',
    data:{
        show:false
    },
    methods:{
        close(){
            this.show = !this.show
        }
    }
})



//文章内部图片点击放大
function b2ImgZooming(sele){
    if(!b2_global.show_slider || b2_global.show_slider == '0') return

    let att = document.querySelectorAll('.attachment img')
    for (let _i = 0; _i < att.length; _i++) {
        b2zoom.listen(att[_i])
    }

    var imgs = document.querySelectorAll(sele)

    for (let i = 0; i < imgs.length; i++) {
		//      if(
		//          imgs[i].className.indexOf('po-img-big') !== -1 || 
		//          imgs[i].className.indexOf('alignnone') !== -1 || 
		//          imgs[i].className.indexOf('alignleft') !== -1 ||
		//          imgs[i].className.indexOf('alignright') !== -1 ||
		//          imgs[i].className.indexOf('aligncenter') !== -1 ||
		//          imgs[i].className.indexOf('gallery-image') !== -1 ||
		//          imgs[i].className.indexOf('size-full') !== -1 ||
		//          imgs[i].className.indexOf('wp-image-') !== -1 ||
		// 			imgs[i].className.indexOf('loading') !== -1 
		//      ){
		//          b2zoom.listen(imgs[i]);
		//      }
		b2zoom.listen(imgs[i]);
    }

}
document.addEventListener('DOMContentLoaded', function () {
    b2ImgZooming('.entry-content img')
})


 
//附件下载，复制解压码
function b2FileDown(){
    let code = document.querySelectorAll('.entry-content .file-down-pass span');
    code.forEach(e => {
        e.onclick = (ev)=>{

            let input = ev.target.firstElementChild;
            input.select()

            if(document.execCommand('copy')){

                ev.target.firstChild.data = b2_global.copy.success
                setTimeout(()=>{
                    ev.target.firstChild.data = b2_global.copy.text
                },1000)

            }else{
                ev.target.firstChild.data = b2_global.copy.error
            }

            window.getSelection().removeAllRanges();
        }
    });
}
b2FileDown()


/**
 * 自定义页面
 */
var sheetParam = {
	headers: {
		'Content-Type': 'application/json;charset=UTF-8',
		'API-Authorization': b2_global.api_content
	}
}
this.$http.get(b2_rest_url + 'sheets', sheetParam).then(res => {
	console.log(res);
});
