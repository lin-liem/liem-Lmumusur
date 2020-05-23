var b2Author = new Vue({
    el:'.author-header',
    data:{
        userId:b2_author.author_id,
        admin:false,
        self:false,
        locked:false,
        progress:0,
        cover:'',
        avatar:'',
        toast:'',
        followed:false
    },
    mounted(){
        if(!this.$refs.fileInput) return
        //获取用户数据
        this.$http.post(b2_rest_url+'getAuthorInfo','author_id='+this.userId).then(res=>{
            this.cover = res.data.cover
            this.avatar = res.data.avatar
            this.admin = res.data.admin
            this.self = res.data.self
            this.followed = res.data.followed
            b2AuthorSidebar.userData = res.data
            b2AuthorPageleft.userData = res.data
        })
    },
    methods:{
        getFile(event,type){
            if(event.target.files.length <= 0) return
            if(this.locked == true) return
            this.locked = true
            this.progress = 0
            let file = event.target.files[0]

            let formData = new FormData()

            formData.append('file',file,file.name)
            formData.append("post_id", 1)
            formData.append("type", type)

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

                    this.progress = 0
                }

                if(type == 'cover'){
                    this.cover = res.data.url
                    this.saveCover(this.cover,res.data.id)
                }

                if(type == 'avatar'){
                    this.avatar = res.data.url
                    this.saveAvatar(this.avatar,res.data.id)
                }

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
        saveCover(url,id){
            this.$http.post(b2_rest_url+'saveCover','url='+url+'&id='+id+'&user_id='+this.userId)
        },
        saveAvatar(url,id){
            this.$http.post(b2_rest_url+'saveAvatar','url='+url+'&id='+id+'&user_id='+this.userId).then(res=>{
                let userData = JSON.parse(localStorage.getItem('userData'))
                if(userData['avatar'] && this.self){
                    userData['avatar'] = res.data
                    localStorage.setItem('userData',JSON.stringify(userData))
                    userTools.userData = userData
                }
            })
        },
        followingAc(){
            let userData = JSON.parse(localStorage.getItem('userData'))
            if(!userData){
                login.show = true
            }else{
                this.$http.post(b2_rest_url+'AuthorFollow','user_id='+this.userId).then(res=>{
                    this.followed = !this.followed
                }).catch(err=>{
                    this.$toasted.show(err.response.data.message, {
                        theme: 'primary', 
                        position: 'top-center', 
                        duration : 4000,
                        type:'error'
                    })
                })
            }
        },
        dmsg(){
            let userData = JSON.parse(localStorage.getItem('userData'))
            if(!userData){
                login.show = true
            }else{
                b2Dmsg.userid = this.userId
                b2Dmsg.show = true
            }
        }
    },
    watch:{
        progress(val){
            this.toast.text('Loading...('+val+'%)')
        }
    }
})

var b2AuthorPost = new Vue({
    el:'#author-post-list',
    data:{
        selecter:'#post-list > .b2_gap',
        api:'getPostList',
        options:[],
        empty:false
    },
    mounted(){
        if(this.$refs.AuthorSettings){
            this.options = JSON.parse(this.$refs.AuthorSettings.getAttribute('data-settings'));
            this.getPost()
        }
    },
    methods:{
        getPost(){
            this.$http.post(b2_rest_url+'getPostList',Qs.stringify(this.options)).then(res=>{
                if(res.data.data){
                    document.querySelector('#post-list > .b2_gap').innerHTML = res.data.data
                    b2Timeago.render(document.querySelectorAll('.b2timeago'), 'zh_CN');
                    lazyLoadInstance.update()
                }else{
                    this.empty = true
                }
            })
        },
        delete(id){
            if(!confirm('确实要删除这篇文章吗?')) return
            this.$http.post(b2_rest_url+'deleteDraftPost','post_id='+id).then(res=>{
                document.querySelector('#item-'+id).remove()
            })
        }
    }
})

var b2AuthorNewsflashes = new Vue({
    el:'#author-newsflashes',
    data:{
        selecter:'.author-comment-list ul',
        api:'getNewsflashesList',
        options:[],
        list:''
    },
    mounted(){
        if(this.$refs.authornewsflasheslist){
            this.options.user_id = b2_author.author_id
            this.options.term = 0
            this.options.post_paged = parseInt(this.$refs.authornewsflasheslist.getAttribute('data-paged'))
            this.$refs.commentPageNav.go(this.options.post_paged,'comment',true)
        }
    },
    methods:{
        get(data){
            this.list = data.data
            this.$refs.authornewsflasheslist.style.display = 'none'
        }
    }
})

var b2AuthorComment = new Vue({
    el:'.author-comment',
    data:{
        selecter:'.author-comment-list ul',
        api:'getAuthorComments',
        options:[]
    },
    mounted(){
        if(this.$refs.authorCommentSettings){
            this.options = JSON.parse(this.$refs.authorCommentSettings.getAttribute('data-settings'));
        }
    },
    methods:{

    }
})

var b2AuthorFollow = new Vue({
    el:'#author-following',
    data:{
        api:'getAuthorFollowing',
        options:[],
        pages:0
    },
    mounted(){
        if(this.$refs.authorFollow){
            this.options.user_id = b2_author.author_id
            this.options.number = 15
            this.options.post_paged = parseInt(this.$refs.authorFollow.getAttribute('data-paged'))
            this.pages = parseInt(this.$refs.authorFollow.getAttribute('data-pages'))
            this.$refs.commentPageNav.go(this.options.post_paged,'comment',true)
        }
    },
    methods:{
        followCancel(even,user_id){
            let msg = confirm(b2_global.alert_following)
            if(!msg) return
            this.$http.post(b2_rest_url+'AuthorFollow','user_id='+user_id).then(res=>{
                even.target.parentNode.parentNode.remove()
            }).catch(err=>{
                this.$toasted.show(err.response.data.message, {
                    theme: 'primary', 
                    position: 'top-center', 
                    duration : 4000,
                    type:'error'
                })
            })
        }
    }
})

var b2AuthorFollowers = new Vue({
    el:'#author-followers',
    data:{
        api:'getAuthorFollowers',
        options:[],
        pages:0
    },
    mounted(){
        if(this.$refs.authorFollow){
            this.options.user_id = b2_author.author_id
            this.options.number = 15
            this.options.post_paged = parseInt(this.$refs.authorFollow.getAttribute('data-paged'))
            this.pages = parseInt(this.$refs.authorFollow.getAttribute('data-pages'))
            this.$refs.commentPageNav.go(this.options.post_paged,'comment',true)
        }
    },
    methods:{
        following(even,user_id){
            
            this.$http.post(b2_rest_url+'AuthorFollow','user_id='+user_id).then(res=>{

                if(!res.data){
                    even.target.innerHTML = b2_global.nofollowed
                    even.target.className = even.target.className.replace('empty','')
                }else{
                    if(even.target.tagName == 'I'){
                        even.target.parentNode.innerHTML = b2_global.followed
                        even.target.parentNode.className += 'empty'
                    }else{
                        even.target.innerHTML = b2_global.followed
                        even.target.className += 'empty'
                    }
                    
                }
            }).catch(err=>{
                this.$toasted.show(err.response.data.message, {
                    theme: 'primary', 
                    position: 'top-center', 
                    duration : 4000,
                    type:'error'
                })
            })
        }
    }
})

var b2AuthorCollections = new Vue({
    el:'#author-collections',
    data:{
        api:'getUserFavoritesList',
        options:[],
        locked:false,
        pages:0
    },
    mounted(){
        if(this.$refs.authorFollow){
            this.options.user_id = b2_author.author_id
            this.options.number = 15
            this.options.sub = this.$refs.authorFollow.getAttribute('data-sub')
            this.options.post_paged = parseInt(this.$refs.authorFollow.getAttribute('data-paged'))
            this.pages = parseInt(this.$refs.authorFollow.getAttribute('data-pages'))
            this.$refs.commentPageNav.go(this.options.post_paged,'comment',true)
        }
    },
    methods:{
        userFavorites(even,id){

            let userData = JSON.parse(localStorage.getItem('userData'))
            if(!userData){
                login.show = true
            }else{
                let msg = confirm(b2_global.alert_favorites)
                if(!msg) return
                if(this.locked == true) return
                this.locked = true

                this.$http.post(b2_rest_url+'userFavorites','post_id='+id).then(res=>{
                    if(res.data == false){
                        even.target.parentNode.parentNode.remove()
                    }
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
            }
        }
    }
})

var b2AuthorInv = new Vue({
    el:'#user-inv-page',
    data:{
        invList:false,
        none:false
    },
    mounted(){
        if(this.$refs.invpage){
            this.$http.post(b2_rest_url+'getUserInvList','user_id='+b2_author.author_id).then(res=>{
                if(res.data.length != 0){
                    this.invList = res.data
                }else{
                    this.none = true
                }
            }).catch(err=>{
                this.$toasted.show(err.response.data.message, { 
                    theme: 'primary', 
                    position: 'top-center', 
                    duration : 4000,
                    type:'error'
                })
            })
        }
    },
    methods:{

    }
})

var b2AuthorSidebar = new Vue({
    el:'#author-index',
    data:{
        userData:[]
    },
    mounted(){
    },
    methods:{
    }
})

var b2AuthorPageleft = new Vue({
    el:'.author-page-right',
    data:{
        userData:[]
    },
    mounted(){
    }
})

var b2AuthorEdit = new Vue({
    el:'#author-edit-page',
    data:{
        userData:{
            open:{
                qq:{
                    open:false
                },
                weibo:{
                    open:false
                },
                weixin:{
                    open:false
                }
            }
        },
        addresses:{
            'address':'',
            'name':'',
            'phone':''
        },
        show:{
            nickname:false,
            sex:false,
            url:false,
            desc:false,
            address:false,
            phone:false,
            email:false,
            password:false
        },
        avatarType:'',
        locked:false,
        checkType:'',
        data:{
            'nickname':'',
            'username':'',
            'password':'',
            'code':'',
            'img_code':'',
            'invitation_code':'',
            'token':'',
            'smsToken':'',
            'luoToken':'',
            'confirmPassword':'',
            'loginType':''
        },
        count:60,
        SMSLocked:false
    },
    mounted(){
        if(this.$refs.authorEdit){
            this.$http.post(b2_rest_url+'getAuthorSettings','user_id='+b2_author.author_id).then(res=>{
                console.log(res);
                this.userData = res.data
                this.avatarType = res.data.open['default'].avatar_set
            }).catch(err=>{
                this.$toasted.show(err.response.data.message, { 
                    theme: 'primary', 
                    position: 'top-center', 
                    duration : 4000,
                    type:'error'
                })
            })
        }
    },
    methods:{
        changeAvatar(type){
            this.avatarType = type
            this.$http.post(b2_rest_url+'changeAvatar','type='+type+'&user_id='+b2_author.author_id).then(res=>{
                if(b2Author.self){
                    let userData = JSON.parse(localStorage.getItem('userData'))
                    if(userData['avatar']){
                        userData['avatar'] = res.data
                        localStorage.setItem('userData',JSON.stringify(userData))
                        userTools.userData = userData
                    }
                    b2Author.avatar = res.data
                }
            }).catch(err=>{
                this.$toasted.show(err.response.data.message, { 
                    theme: 'primary', 
                    position: 'top-center', 
                    duration : 4000,
                    type:'error'
                })
            })
        },
        getFile(event,type){
            if(event.target.files.length <= 0) return
            if(this.locked == true) return
            this.locked = true
            let file = event.target.files[0]

            let formData = new FormData()

            formData.append('file',file,file.name)
            formData.append("post_id", 1)
            formData.append("type", 'qrcode')

            this.$http.post(b2_rest_url+'imageUpload',formData).then(res=>{
                this.saveQrcode(type,res.data.id,res.data.url)
                this.$refs[type].value = null
                this.locked = false
            }).catch(err=>{
                this.$toasted.show(err.response.data.message, { 
                    theme: 'primary', 
                    position: 'top-center', 
                    duration : 4000,
                    type:'error'
                })
                this.$refs[type].value = null
                this.locked = false
            })
            
        },
        saveQrcode(type,id,url){
            this.$http.post(b2_rest_url+'saveQrcode','type='+type+'&id='+id+'&url='+url+'&user_id='+b2_author.author_id).then(res=>{
                console.log(res);
                if(type == 'weixin'){
                    this.userData.qrcode_weixin = res.data
                }else{
                    this.userData.qrcode_alipay = res.data
                }
            }).catch(err=>{
                this.$toasted.show(err.response.data.message, { 
                    theme: 'primary', 
                    position: 'top-center', 
                    duration : 4000,
                    type:'error'
                })
            })
        },
        markHistory(type){
            if(this.userData.open.weixin.mp && type === 'weixin'){
                mpCode.show = true
            }
            localStorage.setItem('historyUrl',JSON.stringify(window.location.href))
        },
        unBuild(type){
            if(this.locked == true) return
            this.locked = true
            this.$http.post(b2_rest_url+'unBuild','type='+type+'&user_id='+b2_author.author_id).then(res=>{
                this.userData = res.data
                this.avatarType = res.data.open['default'].avatar_set
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
        saveNickName(){
            this.$http.post(b2_rest_url+'saveNickName','name='+this.userData.display_name+'&user_id='+b2_author.author_id).then(res=>{
                if(res.data == true){
                    let userData = JSON.parse(localStorage.getItem('userData'))
                    if(userData['user_display_name']){
                        userData['user_display_name'] = this.userData.display_name
                        localStorage.setItem('userData',JSON.stringify(userData))
                        userTools.userData = userData
                    }
                    document.querySelector('#userDisplayName').innerText = this.userData.display_name
                    this.show.nickname = false
                }
            }).catch(err=>{
                this.$toasted.show(err.response.data.message, { 
                    theme: 'primary', 
                    position: 'top-center', 
                    duration : 4000,
                    type:'error'
                })
            })
        },
        saveSex(){
            this.$http.post(b2_rest_url+'saveSex','sex='+this.userData.sex+'&user_id='+b2_author.author_id).then(res=>{
                if(res.data == true){
                    this.show.sex = false
                }
            }).catch(err=>{
                this.$toasted.show(err.response.data.message, { 
                    theme: 'primary', 
                    position: 'top-center', 
                    duration : 4000,
                    type:'error'
                })
            })
        },
        saveUrl(){
            this.$http.post(b2_rest_url+'saveUrl','url='+this.userData.url+'&user_id='+b2_author.author_id).then(res=>{
                if(res.data == true){
                    this.show.url = false
                }
            }).catch(err=>{
                this.$toasted.show(err.response.data.message, { 
                    theme: 'primary', 
                    position: 'top-center', 
                    duration : 4000,
                    type:'error'
                })
            })
        },
        saveDesc(){
            this.$http.post(b2_rest_url+'saveDesc','desc='+this.userData.desc+'&user_id='+b2_author.author_id).then(res=>{
                if(res.data == true){
                    this.show.desc = false
                }
            }).catch(err=>{
                this.$toasted.show(err.response.data.message, { 
                    theme: 'primary', 
                    position: 'top-center', 
                    duration : 4000,
                    type:'error'
                })
            })
        },
        saveAddress(){
            let key = uuid(8, 16);
            this.$http.post(b2_rest_url+'saveAddress','address='+this.addresses.address+'&name='+this.addresses.name+'&phone='+this.addresses.phone+'&user_id='+b2_author.author_id+'&key='+key).then(res=>{
                if(res.data){
                    this.userData.address = res.data.address
                    this.userData.default_address = res.data.key
                    this.show.address = false
                }
            }).catch(err=>{
                this.$toasted.show(err.response.data.message, { 
                    theme: 'primary', 
                    position: 'top-center', 
                    duration : 4000,
                    type:'error'
                })
            })
        },
        saveDefaultAddress(key){
            this.$http.post(b2_rest_url+'saveDefaultAddress','key='+key+'&user_id='+b2_author.author_id).then(res=>{
                if(res.data){
                    this.userData.default_address = res.data
                }
            }).catch(err=>{
                this.$toasted.show(err.response.data.message, { 
                    theme: 'primary', 
                    position: 'top-center', 
                    duration : 4000,
                    type:'error'
                })
            })
        },
        addressLength(){
            return Object.keys(this.userData.address).length;
        },
        deleteAddress(key){
            this.$http.post(b2_rest_url+'deleteAddress','key='+key+'&user_id='+b2_author.author_id).then(res=>{
                if(res.data){
                    this.userData.default_address = res.data.default
                    this.userData.address = res.data.address;
                }
            }).catch(err=>{
                this.$toasted.show(err.response.data.message, { 
                    theme: 'primary', 
                    position: 'top-center', 
                    duration : 4000,
                    type:'error'
                })
            })
        },
        saveUsername(){
            this.data.user_id = b2_author.author_id
            this.$http.post(b2_rest_url+'saveUsername',Qs.stringify(this.data)).then(res=>{
                if(res.data){
                   this.show.phone = false
                   this.show.email = false
                }
            }).catch(err=>{
                this.$toasted.show(err.response.data.message, { 
                    theme: 'primary', 
                    position: 'top-center', 
                    duration : 4000,
                    type:'error'
                })
            })
        },
        //修改手机和邮箱
        checkCode(type){
            recaptcha.type = 'edit'
            recaptcha.show = true
            login.$refs.loginBox.type = 'edit'
            this.checkType = type
        },
        imgCodeAc(arg){
            this.data.img_code = arg.value
            this.data.token = arg.token
            this.sendSMS()
        },
        sendCode(token){
            this.data.img_code = token
            this.sendSMS()
        },
        sendSMS(){
            if(this.SMSLocked == true) return
            this.SMSLocked = true
            if(this.checkType == 'phone'){
                this.data.username = this.userData.phone
            }else{
                this.data.username = this.userData.email
            }
            
            this.$http.post(b2_rest_url+'sendCode',Qs.stringify(this.data)).then(res=>{
                if(res.data.token){
                    this.countdown()
                    this.data.smsToken = res.data.token
                }
                this.SMSLocked = false
            }).catch(err=>{
                this.$toasted.show(err.response.data.message, { 
                    theme: 'primary', 
                    position: 'top-center', 
                    duration : 4000,
                    type:'error'
                })
                this.SMSLocked = false
            })
        },
        countdown(){
            if(this.count <= 1 ){
                this.count = 60
                return
            }
            this.count --;
            setTimeout(()=>{
                this.countdown()
            },1000)
        },
        //修改密码
        editPass(){
            this.$http.post(b2_rest_url+'editPass','password='+this.userData.password+'&repassword='+this.userData.repassword+'&user_id='+b2_author.author_id).then(res=>{
                if(res.data){
                   this.show.password = false
                }
            }).catch(err=>{
                this.$toasted.show(err.response.data.message, { 
                    theme: 'primary',
                    position: 'top-center',
                    duration : 4000,
                    type:'error'
                })
            })
        }
    }
})

var b2orders = new Vue({
    el:'#myorders',
    data:{
        list:'',
        paged:1,
        options:[],
        pages:0,
        api:'getMyOrders',
        show:false,
        express:'',
        id:0
    },
    mounted(){
        if(this.$refs.myorders){
            this.paged = parseInt(this.$refs.myorders.getAttribute('data-paged'))
            this.options.paged = this.paged
            this.options.user_id = b2_author.author_id
            this.$refs.commentPageNav.go(this.options.paged,'comment',true)
        }
    },
    methods:{
        get(data){
            this.list = data.data
            this.pages = data.pages            
        },
        getExpressInfo(id,ex_id,address){
            this.show = true
            if(this.express === '') this.express = []
            if(this.express[id]) return
            this.$http.post(b2_rest_url+'getOrderExpress','id='+ex_id+'&address='+address).then(res=>{
                if(res.data){
                    this.id = id
                    this.$set(this.express,id,res.data.showapi_res_body)
                }
            }).catch(err=>{
                this.$toasted.show(err.response.data.message, { 
                    theme: 'primary',
                    position: 'top-center',
                    duration : 4000,
                    type:'error'
                })
            })
        },
    }
})