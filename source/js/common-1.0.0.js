//挂在axios
Vue.prototype.$http = axios //需要鉴权
Vue.prototype.$https = axios //不需要鉴权
Vue.prototype.$b2JsonData = []
var b2_rest_url = b2_global.rest_url + '/'

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
//支付容器
var b2DsBox = new Vue({
    el:'#ds-box',
    data:{
        money:[],
        show:false,
        msg:'',
        user:[],
        author:[],
        data:[],
        showtype:''
    },
    methods: {
        close(){
            this.show = !this.show
        },
        clean(){
            setTimeout(()=>{
                this.data = []
                this.money = []
            },100)
        },
        change(type){
            this.showtype = type
        }
    },
})

var b2Ds = new Vue({
    el:'#content-ds',
    data:{
        data:''
    },
    methods:{
        show(){
			b2DsBox.money = this.data.moneys
			b2DsBox.show = true
			b2DsBox.showtype = 'ds'
			b2DsBox.msg = this.data.single_post_ds_text
			console.log(this.data.moneys);
			console.log(this.data.single_post_ds_text);
        },
    }
})
