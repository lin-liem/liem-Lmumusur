var b2gold = new Vue({
    el:'#gold',
    data:{
        data:[],
        paged:1,
        msg:'',
        pages:1,
        selecter:'.gold-page-list ul',
        opt:{
            type:'credit'
        },
        api:'getGoldList',
        url:'',
        show:false,
        money:'',
        locked:false,
        success:false
    },
    mounted(){
        if(this.$refs.goldData){
            this.opt.user_id = this.$refs.goldData.getAttribute('data-user');
            this.opt.paged = this.$refs.goldData.getAttribute('data-paged');
            this.opt.type = this.$refs.goldData.getAttribute('data-type');
            this.url = this.$refs.goldData.getAttribute('data-url')+'/'+this.opt.type
            this.getUserGoldData()
            this.$refs.goldNav.go(this.opt.paged,'comment',true)
        }
    },
    methods:{
        getUserGoldData(){
            this.$http.post(b2_rest_url+'getUserGoldData','user_id='+this.opt.user_id).then(res=>{
                this.data = res.data
            }).catch(err=>{
                this.$toasted.show(err.response.data.message,{
                    theme: 'primary', 
                    position: 'top-center', 
                    duration : 4000,
                    type:'error'
                })
            })
        },
        // getGoldList(){
        //     this.$http.post(b2_rest_url+'getGoldList',Qs.stringify(this.opt)).then(res=>{
        //         this.msg = res.data.data
        //         this.pages = res.data.pages
        //         Vue.nextTick(()=>{
        //             b2Timeago.render(this.$refs.goldData.querySelectorAll('.b2timeago'), 'zh_CN');
        //         })
        //     }).catch(err=>{
        //         this.$toasted.show(err.response.data.message,{
        //             theme: 'primary', 
        //             position: 'top-center', 
        //             duration : 4000,
        //             type:'error'
        //         })
        //     })
        // },
        users(users){
            let str = ''
            let leng = users.length
            for (let i = 0; i < leng; i++) {
                if(i == 3 && leng > 3){
                    str = str.slice(0,-1)
                    str += '<span class="gold-and"> 和</span> ' 
                }

                if(users[i] instanceof Object){
                    str += '<a href="'+users[i].link+'" target="_blank">'+users[i].name+'</a>，'
                }else{
                    str += users[i]+'，'
                }
            }
            if(leng > 3){
                return str.slice(0,-1)+' 等人 ';
            }else{
                return str.slice(0,-1)+' ';
            }
        },
        get(data){
            this.msg = data.data
            this.pages = data.pages
            Vue.nextTick(()=>{
                b2Timeago.render(this.$refs.goldData.querySelectorAll('.b2timeago'), 'zh_CN');
            })
        },
        change(type){
            this.opt.type = type
            this.opt.paged = 1
            if(this.url.indexOf('money') !== -1 || this.url.indexOf('credit') !== -1){
                this.url = this.url.replace('money',type).replace('credit',type)
            }else{
                this.url = this.url+'/'+type
            }
            
            this.$refs.goldNav.go(this.opt.paged,'comment',true)
        },
        pay(){
            let userData = JSON.parse(localStorage.getItem('userData'))
            if(!userData){
                login.show = true
            }else{
                b2DsBox.show = true
                b2DsBox.showtype = 'cz'
            }
        },
        buy(){
            let userData = JSON.parse(localStorage.getItem('userData'))
            if(!userData){
                login.show = true
            }else{
                b2DsBox.show = true
                b2DsBox.showtype = 'cg'
            }
        },
        tx(){
            if(this.locked) return
            this.locked = true
            this.$http.post(b2_rest_url+'cashOut','money='+this.money).then(res=>{
                this.success = true
                this.locked = false
            }).catch(err=>{
                this.$toasted.show(err.response.data.message,{
                    theme: 'primary', 
                    position: 'top-center', 
                    duration : 4000,
                    type:'error'
                })
                this.locked = false
            })
        },
        close(){
            this.show = !this.show
        },
        refresh(){
            location.reload();
        }
    }
})

var goldTop = new Vue({
    el:'#gold-top',
    data:{
        data:''
    },
    mounted(){
        if(this.$refs.goldTop){
            this.getGoldTop()
        }
    },
    methods:{
        getGoldTop(){
            this.$http.post(b2_rest_url+'getGoldTop').then(res=>{
                this.data = res.data
            }).catch(err=>{
                this.$toasted.show(err.response.data.message,{
                    theme: 'primary', 
                    position: 'top-center', 
                    duration : 4000,
                    type:'error'
                })
            })
        }
    }
})