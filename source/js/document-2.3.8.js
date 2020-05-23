var requestsPage = new Vue({
    el:'#requests-page',
    data:{
        data:{
            email:'',
            title:'',
            content:'',
            image:''
        },
        image:'',
        locked:false,
        progress:0,
        requestList:'',
        showList:[],
        pages:0,
        selecter:'.request-list-box ul',
        opt:{
            userid:0,
            paged:1
        },
        api:'getMyDirectmessageList'
    },
    mounted(){
        if(this.$refs.requests){
            this.opt.paged = this.$refs.paged.getAttribute('data-paged')
            this.$refs.goldNav.go(this.opt.paged,'comment',true)
        }
    },
    methods:{
        get(data){
            this.requestList = data.data
            this.pages = data.pages
        },
        submit(){
            if(this.locked == true) return
            this.locked = true

            this.$http.post(b2_rest_url+'submitRequest',Qs.stringify(this.data)).then(res=>{
                this.requestList.push({
                    id:Math.round(Math.random()*10000),
                    type:'from',
                    date:new Date().Format("yyyy-MM-dd hh:mm:ss"),
                    value:this.data.title,
                    content:this.data.content
                })
                this.locked = false
            }).catch(err=>{
                this.$toasted.show(err.response.data.message, {
                    theme: 'primary', 
                    position: 'top-center', 
                    duration : 4000,
                    type:'error'
                })
                this.locked = false
            })
        },
        getFile(event){
            if(event.target.files.length <= 0) return
            if(this.locked == true) return
            this.locked = true
            this.progress = 0
            let file = event.target.files[0]

            let formData = new FormData()

            formData.append('file',file,file.name)
            formData.append("post_id", 1)
            formData.append("type", 'request')

            let config = {
                onUploadProgress: progressEvent=>{
                    this.progress = progressEvent.loaded / progressEvent.total * 100 | 0
                }
            }

            this.toast = this.$toasted.show('Loading...('+this.progress+'%)',{position: 'top-center'})

            this.$http.post(b2_rest_url+'imageUpload',formData,config).then(res=>{
                if(res.data.status == 401){
                    this.$toasted.show(res.data.message, {
                        theme: 'primary', 
                        position: 'top-center', 
                        duration : 4000,
                        type:'error'
                    })

                }else{
                    this.image = res.data.url
                    this.data.image = res.data.id
                }
                
                this.progress = 0
                this.$refs.fileInput.value = null
                this.locked = false;
                this.toast.goAway(0);
            }).catch(err=>{
                this.$toasted.show(err.response.data.message, {
                    theme: 'primary', 
                    position: 'top-center', 
                    duration : 4000,
                    type:'error'
                })
                this.locked = false
                this.progress = 0
                this.$refs.fileInput.value = null
                this.toast.goAway(0);
            })
        },
        showDrap(id){
            this.$set(this.showList,id,!this.showList[id])
        }
    }
})

Date.prototype.Format = function (fmt) { // author: meizz
    var o = {
        "M+": this.getMonth() + 1, // 月份
        "d+": this.getDate(), // 日
        "h+": this.getHours(), // 小时
        "m+": this.getMinutes(), // 分
        "s+": this.getSeconds(), // 秒
        "q+": Math.floor((this.getMonth() + 3) / 3), // 季度
        "S": this.getMilliseconds() // 毫秒
    };
    if (/(y+)/.test(fmt))
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
            return fmt;
}

var documentVote = new Vue({
    el:'.single-document-footer',
    data:{
        postData:[]
    },
    methods:{
        vote(type){
            b2ContentFooter.vote(type)
        }
    }
})

var documentSidebar = new Vue({
    el:'.request-supper',
    methods:{
        canRequest(url){
            let userData = JSON.parse(localStorage.getItem('userData'))
            if(!userData){
                userTools.login(1)
                return
            }

            window.location.href = url
        }
    }
})