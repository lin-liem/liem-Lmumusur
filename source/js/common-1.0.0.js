//挂在axios
Vue.prototype.$http = axios //需要鉴权
Vue.prototype.$https = axios //不需要鉴权
Vue.prototype.$b2JsonData = []
var b2_rest_url = b2_global.rest_url + '/'

var B2ClientWidth = document.body.clientWidth;

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
Vue.component('ds-box', {
    props: ['show','money','msg','user','author','data','showtype'],
    template: b2_global.ds_box,
    data(){
        return {
            value:0,
            custom:0,
            content:'',
            payType:'',
            payMoney:0,
            locked:false,
            jump:'',
            href:'',
            isWeixin:'',
            isMobile:'',
            allow:[],
            card:[],
            cg:[],
            newWin: null
        }
    },
    methods:{
        close(){
            setTimeout(()=>{
                this.$emit('close')
                this.locked = false
            },10)
        },
        clean(){
            this.$emit('clean')
        },
        picked(m,val){
            this.value = val
            this.payMoney = m
        },
        restData(data = []){
            if(this.showtype == 'ds'){
                data = Object.assign(data,{
                    'title':this.$refs.dstitle.innerText,
                    'order_price':this.payMoney,
                    'order_type':'ds',
                    'post_id':b2_global.post_id,
                    'pay_type':this.payType,
                    'order_content':this.content
                })
            }else{
                data = Object.assign(this.data,data)
            }
            data['pay_type'] = this.payType


            return data;
        },
		chosePayType(val){
            
            this.locked = true
            this.payType = val

             
        },
        disabled(){
            if(this.data.pay_type !=='card'){
                if(this.jump == '') return true
                if(this.jump == 'jump' && this.href == '') return true
                if(this.locked == true) return true
                if(this.payType == '') return true
            }else{
                if(!this.card.number || !this.card.password) return true
            }

            return false
        }
    }
})


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

/**
 * 关注微信公众号
 */
var gongzhonghao_box = new Vue({
    el:'#gongzhonghao-box',
    data:{
        show: false
    },
    methods:{
        close(){
            this.show = !this.show
        },
		show(){
			this.show = true
		}
    }
})

