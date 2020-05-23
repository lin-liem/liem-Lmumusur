var b2Vips = new Vue({
    el:'#vips',
    data:{
        data:[],
        show:[]
    },
    mounted() {
        if(this.$refs.vips){
            this.getVipInfo()
        }
    },
    methods:{
        getVipInfo(){
            this.$http.post(b2_rest_url+'getVipInfo').then(res=>{
                this.data = res.data
            })
        },
        showAc(event){
            let ev = event.target
            if(event.target.calssName != 'vip-faq-list'){
                ev = event.target.parentNode
            }
            if(ev.className != 'vip-faq-list') return

            let child = ev.querySelectorAll('p')[0]

            if(child.className == 'b2-hidden'){
                child.className = ''
            }else{
                child.className = 'b2-hidden'
            }
        },
        join(type,name,price){
            console.log(price);
            let userData = JSON.parse(localStorage.getItem('userData'))
            if(!userData){
                login.show = true
            }else{
                b2DsBox.data = {
                    'title':name,
                    'order_type':'vip',
                    'order_key':type,
                    'order_price':price
                }
                b2DsBox.show = true
            }
        }
    }
})