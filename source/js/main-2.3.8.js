//挂在axios
Vue.prototype.$http = axios //需要鉴权
Vue.prototype.$https = axios //不需要鉴权
Vue.prototype.$b2JsonData = []
var b2_rest_url = b2_global.rest_url

Vue.use(Toasted)
Vue.use(vueDirectiveTooltip,{
    delay: 0
})

var b2Timeago = new timeago();

var b2zoom = new Zooming({enableGrab:true,scrollThreshold:0,transitionDuration:0.2,scaleBase:0.96,scaleExtra:1,customSize:'100%'});

b2Timeago.render(document.querySelectorAll('.b2timeago'), 'zh_CN');

var B2ClientWidth = document.body.clientWidth;

//懒加载
var lazyLoadInstance = new LazyLoad({
    elements_selector: ".lazy"
});

b2WidgetImageLoaded()

function b2WidgetImageLoaded(){
    imagesLoaded( document.querySelectorAll('.widget-area'), function( instance ) {
        b2SidebarSticky()
    });
}

function b2isWeixin() { //判断是否是微信
    var ua = navigator.userAgent.toLowerCase();
    return ua.match(/MicroMessenger/i) == "micromessenger";
};

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

var mobileMenu = new Vue({
    el:'#mobile-menu-button',
    data:{
        show:false
    },
    mounted(){
        if(B2ClientWidth >= 768) return
        this.dorpMenu()
        //移动端菜单点击展开
        let more = document.querySelectorAll('.sub-menu .b2-jt-right');
        for (let i = 0; i < more.length; i++) {
            more[i].onclick = (e)=>{
                e.stopPropagation()
                e.preventDefault()
                if(e.target.parentNode.nextElementSibling.className.indexOf(' m-show-sub') != -1){
                    e.target.parentNode.nextElementSibling.className = e.target.parentNode.nextElementSibling.className.replace(' m-show-sub','')
                }else{
                    e.target.parentNode.nextElementSibling.className += ' m-show-sub'
                }
            }
        }
        window.addEventListener('popstate', this.goBack, false);

    },
    methods:{
        dorpMenu(){
            let drop = document.querySelectorAll('.has_children .b2-jt-down')
            if(drop.length > 0){
                for (let index = 0; index < drop.length; index++) {
                    drop[index].onclick = (event)=>{
                        event.stopPropagation()
                        event.preventDefault()
                        if(event.target.parentNode.parentNode.className.indexOf(' show') == -1){
                            this.hideAll()
                            event.target.parentNode.parentNode.className += ' show'
                        }else{
                            this.hideAll()
                        }
                    }
                }
            }
        },
        hideAll(){
            let sub = document.querySelectorAll('.has_children .sub-menu')
            for (let i = 0; i < sub.length; i++) {
                sub[i].parentNode.className = sub[i].parentNode.className.replace(' show','')
            }
        },
        showMenu(val){
            const menu = document.querySelector('#mobile-menu')
                body = document.querySelector('body')
            if(val){
                menu.className += ' show-menu-box'
                body.className += ' m-open'
                bodyScrollLock.lock(this.$refs.MobileMenu)
                this.show = true
            }else{
                menu.className = menu.className.replace(' show-menu-box','')
                body.className = body.className.replace(' m-open','')
                bodyScrollLock.unlock(this.$refs.MobileMenu)
                this.show = false
            }
        },
        goBack(e){
            if(e.target.location.hash == '#showMenu'){
                this.showMenu(true)
            }else{
                this.showMenu(false)
            }
        },
        showAc(val){
            if(val){
                window.location.hash = '#showMenu';  
            }else{
                window.history.back()
            }
        }
    }
})

Vue.component('search-box', {
    props: ['show','searchType'],
    template:b2_global.search_box,
    data(){
        return{
            showSearch:false,
            type:'post'
        }
    },
    methods:{
        close(){
            this.$emit('close')
        }
    },
    watch:{
        searchType(val){
            this.type = val
        }
    }
})

var b2SearchBox = new Vue({
    el:'#search-box',
    data:{
        searchType:'all',
        show:false
    },
    methods:{
        close(){
            this.show = !this.show
        }
    }
})

var userTools = new Vue({
    el:'.top-user-info',
    data:{
        userData:{
            avatar:'',
            user_display_name:'',
            user_link:'',
            user_nickname:''
        },
        showDrop:false,
        role:{
            write:true,
            newsflashes:false
        }
    },
    mounted() {
        document.onclick = ()=>{
            this.showDrop = false
            this.userData = userTools.userData
            if(typeof b2Comment !== 'undefined'){
                b2Comment.show.smile = false
                b2Comment.show.image = false
            }

            if(typeof b2TaxTop !== 'undefined'){
                b2TaxTop.showFliter.hot = false
                b2TaxTop.showFliter.cat = false
            }
            b2AsideBar.close()
        }

        let ref = b2GetQueryVariable('ref')
        if(!ref){
            ref = localStorage.getItem('ref')
        }

        //检查本地储存的用户信息
        let userData = JSON.parse(localStorage.getItem('userData'))
        //如果本地存在token，检查是否过期，并获取用户数据
        if(userData){
            this.userData = userData
            let footer_text = document.querySelector('#footer-menu-user');
            if(footer_text){
                footer_text.innerText = '我的';
            }
            Vue.prototype.$http.defaults.headers.common['Authorization'] = 'Bearer ' + this.userData.token

            this.$http.post(b2_rest_url +'getUserInfo','ref='+ref).then(res=>{
                this.role = res.data
                b2bindLogin.type = res.data.binding_login
                if(res.data.distribution){
                    localStorage.removeItem('ref')
                }
            }).catch(err=>{
                this.loginOut()
            })
        }else{
            localStorage.setItem('ref',ref)
        }
    },
    methods: {
        login(type){
            login.show = true
            login.loginType = type
        },
        showDropMenu(){
            this.showDrop = !this.showDrop
        },
        loginOut(){
            localStorage.removeItem('userData')
            this.$http.get(b2_rest_url+'loginOut').then(res=>{
                if(typeof b2Comment !== 'undefined' && b2Comment.$refs.respond){
                    b2Comment.resetUserInfo()
                }
            })
            let footer_text = document.querySelector('#footer-menu-user');
            if(footer_text){
                footer_text.innerText = '登录';
            }
            location.reload()
        },
        out(){
            this.loginOut()
        }
    },
})

var headerTools = new Vue({
    el:'.header-tools',
    data:{
        userData:[]
    },
    mounted(){
        this.userData = userTools.userData
    },
    methods:{
        showSearch(){
            b2SearchBox.close()
        },
    }
})

//登陆与注册
Vue.component('login-box', {
    props: ['show','allowRegister','checkType','loginType','loginText','invitation','invitationLink','invitationText','imgBoxCode'],
    template:b2_global.login,
    data(){
        return {
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
            invitationPass:false,
            eye:false,
            codeImg:'',
            locked:false,
            showLuo:false,
            issetLuo:false,
            imgLocked:false,
            SMSLocked:false,
            count:60,
            repass:false,
            type:'',
            oauth:'',
            openOauth:false
        }
    },
    created(){
        window.getResponse = (resp) => {
            if(this.type == 'edit'){
                b2AuthorEdit.sendCode(resp)
                recaptcha.close()
            }else{
                this.data.img_code = resp
                this.$nextTick(()=>{
                    recaptcha.close()
                    this.sendSMS()
                })
            }
        }
        let userData = JSON.parse(localStorage.getItem('userData'))

        if(b2isWeixin()){
            if(!userData && document.querySelector('#open-page') === null){
                //localStorage.setItem('historyUrl',JSON.stringify(window.location.href))
                //window.location.href = this.oauth.weixin.url
            }
        }
    },
    methods:{
        close(val){
            this.$emit('close-form',val)
        },
        loginAc(val){
            this.$emit('login-ac',val)
        },
        loginSubmit(e){
            e.preventDefault()

            if(this.locked == true) return
            this.locked = true

            //邀请码
            if(this.invitation != 0 && (this.loginType == 2 && !this.invitationPass)){
                this.invitationCheck()
            }else if(this.loginType == 1){
                //登录
                this.$https.post(b2_global.rest_url+'jwt-auth/v1/token',Qs.stringify(this.data)).then(res=>{
                    if(res.status == 200){
                        localStorage.setItem('userData',JSON.stringify(res.data))
                        userTools.userData = res.data
                        Vue.prototype.$http.defaults.headers.common['Authorization'] = 'Bearer ' + userTools.userData.token
                    }

                    location.reload()
                    return 

                }).catch(err=>{
                    this.$toasted.show(err.response.data.message, { 
                        theme: 'primary',
                        position: 'top-center', 
                        duration : 4000,
                        type:'error'
                    })
                    localStorage.removeItem('userData')
                    this.locked = false
                })

            }else if(this.loginType == 2){
                //注册
                this.$https.post(b2_rest_url+'regeister',Qs.stringify(this.data)).then(res=>{
                    localStorage.setItem('userData',JSON.stringify(res.data.msg))

                    location.reload();

                    return

                }).catch(err=>{
                    this.$toasted.show(err.response.data.message, { 
                        theme: 'primary', 
                        position: 'top-center', 
                        duration : 4000,
                        type:'error'
                    })
                    this.locked = false
                })
            }else if(this.loginType == 3){
                this.$https.post(b2_rest_url+'forgotPass',Qs.stringify(this.data)).then(res=>{
                    this.loginAc(4)
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
            }else if(this.loginType == 4){
                this.$https.post(b2_rest_url+'resetPass',Qs.stringify(this.data)).then(res=>{
                    this.repass = true
                    this.data.password = ''
                    this.loginAc(1)
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
        },
        b2IsPhoneAvailable(val){
            if(b2IsPhoneAvailable(val)) return true
            return false
        },
        invitationCheck(){
            this.$https.post(b2_rest_url+'invitationCheck','code='+this.data.invitation_code).then(res=>{
                this.invitationPass = true
                this.locked = false
                this.showLuo = true
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
        sendCode(){
            recaptcha.show = true
            this.close(false)
        },
        getCode(){
            if(this.imgLocked) return
            this.codeImg = ''
            this.imgLocked = true
            this.$https.post(b2_rest_url+'getRecaptcha','number=4&width=186&height=50').then(res=>{
                if(res.data){
                    this.codeImg = res.data.base
                    this.data.token = res.data.token
                }
                this.imgLocked = false
            }).catch(err=>{
                this.$toasted.show(err.response.data.message, { 
                    theme: 'primary', 
                    position: 'top-center', 
                    duration : 4000,
                    type:'error'
                })
                this.imgLocked = false
            })
        },
        changeCode(){
            this.getCode()
        },
        sendSMS(){
            if(this.SMSLocked) return
            this.SMSLocked = true
            this.data.loginType = this.loginType
            this.$https.post(b2_rest_url+'sendCode',Qs.stringify(this.data)).then(res=>{
                if(res.data.token){
                    this.data.smsToken = res.data.token
                }
                this.SMSLocked = false
                this.countdown()
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
        markHistory(mp){
            if(mp){
                this.close()
                mpCode.show = true
                mpCode.type = this.loginType
            }
            localStorage.setItem('historyUrl',JSON.stringify(window.location.href))
        },
        countdown(){
            if(this.count <= 1 ){
                this.count = 60
                return
            }
            this.count --
            setTimeout(()=>{
                this.countdown()
            },1000)
        },
        resetPssNext(){
            this.loginAc(4)
        }
    },
    watch:{
        loginType(val){
            if((this.invitation == 0 || this.invitationPass) && val == 2){
                this.showLuo = true
            }else{
                this.showLuo = false
            }
            
            if(this.issetLuo){
                LUOCAPTCHA && LUOCAPTCHA.reset()
            }
        },
        invitationPass(val){
            if(this.issetLuo && val){
                setTimeout(()=>{
                    LUOCAPTCHA && LUOCAPTCHA.reset()
                },100)
            }
        },
        show(val){
            if(val){
                if(this.oauth === ''){
                    this.$https.get(b2_rest_url+'getOauthLink').then(res=>{
                        this.oauth = res.data
                        Object.keys(this.oauth).forEach((key)=>{
                            if(this.oauth[key].open){
                                this.openOauth = true
                            }
                       });
                    })
                }
            }
            if(val && this.checkType == 'text'){
                this.getCode()
                this.type = ''
            }
        },
        imgBoxCode(val){
            this.data.img_code = val.value
            this.data.token = val.token
        },
        showLuo(val){
            if(this.show && this.checkType == 'luo' && val && !this.issetLuo){
                let s = document.createElement('script')
                s.id = 'luosimao'
                s.type = 'text/javascript'
                s.src = '//captcha.luosimao.com/static/dist/api.js'
                document.getElementsByTagName("head")[0].appendChild(s)
                this.issetLuo = true
            }
        }
    }
})

Vue.component('mp-box', {
    props:['show','qrcode','invitation','invitationLink','invitationText'],
    template:b2_global.mp_box,
    data(){
        return{
            code:'',
            locked:false,
            token:false,
            invitationCode:'',
            locked:false
        }
    },
    methods:{
        close(){
            this.$emit('close')
        },
        submit(){

            if(this.locked == true) return
            this.locked = true
            this.$http.post(b2_rest_url+'mpLogin','code='+this.code).then(res=>{

                if(res.data.type === 'invitation'){
                    this.token = res.data.token
                }else{
                    if(res.data === true){
                        location.reload()
                    }else{
                        localStorage.setItem('userData',JSON.stringify(res.data))
                        userTools.userData = res.data
                        Vue.prototype.$http.defaults.headers.common['Authorization'] = 'Bearer ' + userTools.userData.token
                        location.reload()
                    }
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
        },
        checkInv(){
            if(this.locked == true) return
            this.locked = true

            this.$https.post(b2_rest_url+'mpLoginInv','token='+this.token+'&inv='+this.invitationCode).then(res=>{
                if(res.data.token){
                    localStorage.setItem('userData',JSON.stringify(res.data))
                    userTools.userData = res.data
                    Vue.prototype.$http.defaults.headers.common['Authorization'] = 'Bearer ' + userTools.userData.token
                    location.reload()
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
})

var mpCode = new Vue({
    el:'#mp-box',
    data:{
        show:false,
        qrcode:'',
        type:'1',
    },
    methods:{
        close(){
            this.show = !this.show
            login.show = true
            login.loginType = this.type
        },
        getQrcode(){
            this.$https.post(b2_rest_url+'getLoginQrcode').then(res=>{
                this.qrcode = res.data
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
    watch:{
        show(val){
            if(val){
                this.getQrcode()
            }
        }
    }
})

var login = new Vue({
    el:'#login-box',
    data:{
        show:false,
        loginType:1,
        checkCodeSendSuccess:false,
        isAdmin:false,
        imgCode:''
    },
    methods:{
        close(val){
            this.show = val
        },
        loginAc(val){
            this.loginType = val
        },
        imgCodeAc(val){
            this.imgCode = val
        }
    }
})

//验证码组件
Vue.component('recaptcha-box', {
    props: ['show','type'],
    template:b2_global.check_code,
    data(){
        return {
            recaptcha:'',
            token:'',
            recaptchaUrl:'',
            disabled:true,
            issetLuo:false,
            locked:false,
            loginType:2,
            checkType:b2_global.check_type,
        }
    },
    methods:{
        close(){
            this.$emit('close-form')
        },
        change(){
            //获取验证码base64及token
            if(this.locked) return
            this.recaptchaUrl = ''
            this.locked = true
            this.$https.post(b2_rest_url+'getRecaptcha','number=4&width=186&height=50').then(res=>{
                if(res.data){
                    this.recaptchaUrl = res.data.base
                    this.token = res.data.token
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
        },
        checkCode(){
            if(this.disabled) return
            this.disabled = true
            this.$https.post(b2_rest_url+'imgCodeCheck','img_code='+this.recaptcha+'&token='+this.token+'&loginType='+login.loginType).then(res=>{

                if(this.type == 'edit'){
                    b2AuthorEdit.imgCodeAc({
                        value:this.recaptcha,
                        token:this.token
                    })
                }else if(this.type == 'bind'){
                    b2bindLogin.imgCodeAc({
                        value:this.recaptcha,
                        token:this.token  
                    })
                }else{
                    login.imgCodeAc({
                        value:this.recaptcha,
                        token:this.token
                    }) 
                    setTimeout(()=>{
                        login.$refs.loginBox.sendSMS()
                    },50)    
                }

                this.disabled = false
                this.close()
            }).catch(err=>{
                this.$toasted.show(err.response.data.message, { 
                    theme: 'primary', 
                    position: 'top-center', 
                    duration : 4000,
                    type:'error'
                })
                this.disabled = false
            })
        }
    },
    watch:{
        show(val){
            if(val && b2_global.check_type == 'normal'){
                this.change()
            }
            if(val && !this.issetLuo && login.loginType != 3){
                let s = document.createElement('script')
                s.id = 'luosimao'
                s.type = 'text/javascript'
                s.src = '//captcha.luosimao.com/static/dist/api.js?time='+((new Date()).getTime())
                document.getElementsByTagName("head")[0].appendChild(s)
                this.issetLuo = true
            }else if(val && this.issetLuo && login.loginType != 3){
                LUOCAPTCHA && LUOCAPTCHA.reset()
            }

            if(this.type != 'edit'){
                this.loginType = login.loginType
            }
            

        },
        recaptcha(val){
            if(val.length == 4){
                this.disabled = false
            }else{
                this.disabled = true
            }
        }
    }
})

var recaptcha = new Vue({
    el:'#recaptcha-form',
    data:{
        show:false,
        type:''
    },
    methods:{
        close(){
            this.show = false
            if(this.type != 'edit' && this.type != 'bind'){
                login.show = true
            }
            if(this.type === 'bind'){
                b2bindLogin.show = true
            }
        },
    }
})

//首页加载更多
function postCatSelect(){
    var cat = document.querySelectorAll('.post-load-button')
    if(cat.length > 0){
        var paged = []
        var locked = false
        cat.forEach(_e => {

            let _pages = document.querySelector('#post-item-'+_e.getAttribute('data-i')).getAttribute('data-pages')
            if(_pages == 1 && _e.getAttribute('data-type') === 'more'){
                buttonDisabledNone(_e,true,_e.getAttribute('data-none'))
            }
            _e.onclick = function(e){
                e.preventDefault()
                e.stopPropagation()

                if(locked == true) return
                locked = true

                NProgress.set(0.7)

                //加载方式
                let type = e.target.getAttribute('data-type')

                let i
                if(type == 'cat'){
                    //获取当前模块的ID
                    i = e.target.parentNode.getAttribute('data-i')
                }else{
                    //获取当前模块的ID
                    i = e.target.getAttribute('data-i')
                }

                let item = document.querySelector('#post-item-'+i)
 
                //获取设置项
                let opt = item.getAttribute('data-opt')
                
                let cats,button

                //获取分类sulg
                if(type == 'more'){
                    cats = item.querySelectorAll('.picked')[0].getAttribute('data-cats')
                    item = item.parentNode
                    buttonDisabledLoad(e.target,true)
                }else{
                    item = item.parentNode
                    cats = e.target.parentNode.getAttribute('data-cats')
                    button = item.parentNode.querySelectorAll('.load-more button')[0]
                }

                pages = item.getAttribute('data-pages')

                //内容区域
                let box = item.parentNode.querySelectorAll('ul.b2_gap')[0]

                if(type === 'cat'){
                    paged[i] = 1
                }else{
                    paged[i] = paged[i] ? paged[i] : 1
                    paged[i]++
                }

                cats = JSON.parse(cats)
                opt = JSON.parse(opt)
                opt['post_cat'] = cats
                opt['post_paged'] = paged[i]
                opt['post_i'] = i
          
          		var request_url ="";
          		if(cats.length > 1){
          			request_url = 'page/'+paged[i]
          		}else{
          			request_url = 'categories/'+cats[0]+'/page/'+paged[i]
          		}
                axios.get(request_url).then(res=>{

                    if(res.status == 200){
						console.log(type);
                        //如果点击的是加载更多
                        if(type === 'more'){
          					let dom = parseDom(res.data);
                    
                            var fragment = document.createDocumentFragment();

                            let items = [];
                            dom.forEach(element => {
                              if(element.tagName == 'DIV'){
                                  fragment.appendChild(element );
                                  items.push(element)
                              }
                            });
          					console.log(items);
          					var contentHtml = items[0].getElementsByClassName('b2_gap')
          					
          					var htmlItem = contentHtml[0].innerHTML;
                          
                            //追加内容
                            box.insertAdjacentHTML('beforeend', htmlItem)
	
                            //增加渐变效果
                            listFadein(box.childNodes,20)
							
                            //如果是最后一页，提示加载完毕
                            if(htmlItem.trim().length == 0 && htmlItem.trim() == ''){
                                buttonDisabledNone(e.target,true,e.target.getAttribute('data-none'))
                            }else{
                                e.target.innerText = e.target.getAttribute('data-text')
                                buttonDisabledLoad(e.target,false)
                            }

                        }else{
          					let dom = parseDom(res.data);
          					var fragment = document.createDocumentFragment();
                            let items = [];
                            dom.forEach(element => {
                              if(element.tagName == 'DIV'){
                                  fragment.appendChild(element );
                                  items.push(element)
                              }
                            });
          					var contentHtml = items[0].getElementsByClassName('b2_gap')
							// 如果没有内容则调出
							if(contentHtml == null || contentHtml.length == 0){
								 box.innerHTML = b2_global.empty_page; 
								//隐藏按钮
								hiddenButton(button,false)
							}else{
								// 获取所需文本          					
								var htmlItem = contentHtml[0].innerHTML;
								var dataResult = contentHtml[0].getElementsByClassName('post-list-item');
								
								//如果内容为空，加载提示
								if(dataResult.length == 0 && htmlItem.trim() == ''){
								    box.innerHTML = b2_global.empty_page; 
								    //隐藏按钮
								    hiddenButton(button,false)
								          
								//如果内容不为空，并且只有一页，隐藏加载更多按钮
								}else if(dataResult.length < 12 ){
								    
									// 追加内容
									box.innerHTML = htmlItem
								
								    //增加渐变效果
								    listFadein(box.childNodes,20)
								
								    hiddenButton(button,true)
								    //按钮提示没有更多
								    if(button){
								        buttonDisabledNone(button,true,button.getAttribute('data-none'))
								    }
								    
								}else{
								    // 追加内容
								    box.innerHTML = htmlItem
								
								    //增加渐变效果
								    listFadein(box.childNodes,20)
								
								    //显示加载按钮
								    hiddenButton(button,true)
								    buttonDisabledLoad(button,false)
								    buttonDisabledNone(button,false,button.getAttribute('data-text'))
								}
							}
							

                            let picked = item.querySelectorAll('.picked')[0]
                            picked.className = picked.className.replace(' picked','')
                            e.target.parentNode.className += ' picked'
                            //e.target.childNodes[0].className = e.target.childNodes[0].className.replace(' b2-loading','')
                        }
                        b2RestTimeAgo(document.querySelectorAll('.b2timeago'))
         
                    }

                    NProgress.done()
                    locked = false
                    NProgress.remove()
                    lazyLoadInstance.update()
                    
                    b2SidebarSticky()
                    b2PackeryLoad()
                })
    
            }
        })
    }
}
postCatSelect()

//遍历dom树，依次添加 is-visible 类，使其支持渐变显示
function listFadein(dom,time){
    return
    var i = 0
    dom.forEach(e=>{
        if(e.className.indexOf('is-visible') === -1){
            i++
            if(i== 1){
                e.className += ' is-visible'
            }else{
                setTimeout(function(){
                    e.className += ' is-visible'
                }, i*time )
            }
        }
    })
}
listFadein(document.querySelectorAll('.post-list ul.b2_gap > li'),10)

//加载更多按钮增加disabled属性
function buttonDisabledLoad(e,bool){
    if(!e) return
    if(bool){
        e.className += ' b2-loading '
        e.disabled = true
    }else{
        e.className = e.className.replace(' b2-loading ','')
        e.disabled = false
    }
}

//全部加载完毕按钮禁用，提示文字
function buttonDisabledNone(e,bool,text){
    e.className = e.className.replace(' b2-loading ','')
    e.disabled = bool
    e.innerText = text
}

//隐藏加载按钮
function hiddenButton(button,bool){
    button = button.parentNode
    if(bool){
        if(button){
            button.className = button.className.replace(' b2-hidden', '')
        }
    }else{
        if(button.className.indexOf('b2-hidden') === -1){
            button.className += ' b2-hidden'
        }
    }
    return
}

//加载瀑布流
function b2PackeryLoad(e){
    var grid = document.querySelectorAll('.grid')
    if(grid.length > 0){
        for (let index = 0; index < grid.length; index++) {
           let pack = new Packery( grid[index])

            pack.on( 'layoutComplete', ()=>{
                b2SidebarSticky()
            });
        }
    }
}
b2PackeryLoad()
//分页代码
Vue.component('page-nav',{
    props: ['paged','navtype','pages','type','box','opt','api','url','title'],
    template: b2_global.page_nav,
    data:function(){
        return {
            locked:false,
            next:false,
            per:false,
            cpage:0,
            cpaged:1,
            cpages:[],
            mobile:false
        }
    },
    created(){
        window.addEventListener('scroll', this.autoLoadMore)
        this.cpaged = parseInt(this.paged)
        this.cpages = this.pagesInit()
        //监听前进与后退
        window.addEventListener("popstate", ()=>{
            let state = history.state;
            if(state && state.page && this.type == 'p'){
                this.go(state.page)
            }
        });
        this.mobile = B2ClientWidth > 768 ? false : true
    },
    methods:{
        disabled(page){
            return page == this.cpaged && this.locked == true
        },
        pagesInit(){
            let pagearr = []
            if(this.pages <= 7){
                for (let i = 1; i <= this.pages; i++) {
                    pagearr.push(i)
                }
            }else{
                if(!this.cpaged) this.cpaged = this.paged
                if(this.cpaged < 5){
                    for (let i = 1; i <= this.pages; i++) {
                        if(i >= 6) break
                        pagearr.push(i)
                    }
                    pagearr.push(0,this.pages)
                }else if(this.cpaged >= 5 && this.pages - 3 > this.cpaged){
                    pagearr.push(1,0)
                    for (let i = this.cpaged - 2; i <= this.cpaged + 2; i++) {
                        pagearr.push(i)
                    }
                    pagearr.push(0,this.pages)
                }else if(this.pages - 3 <= this.cpaged){
                    pagearr.push(1,0)
                    for (let i = this.cpaged - 3; i <= this.pages; i++) {
                        pagearr.push(i)
                    }
                }
            }
            return pagearr
        },
        autoLoadMore(){
            if(this.type == 'p') return
            let scrollTop = document.documentElement.scrollTop;
			if(scrollTop + window.innerHeight >= document.body.clientHeight) {
				this.go(this.cpaged+1)
			}
        },
        go(page,type,action){
            page = parseInt(page)
            if(this.opt.length > 0) return
            
            if(this.cpaged == page && !action) return
            if(this.locked == true) return

            if(this.type === 'm' && this.pages <= this.cpaged && page != 1) return

            this.locked = true

            NProgress.set(0.7)

            if(type == 'next'){
                this.next = true
            }else if(type == 'per'){
                this.per = true
            }

            this.cpaged = page

            this.opt['post_paged'] = page
            this.opt['paged'] = page

            this.$http.post(b2_rest_url+this.api,Qs.stringify(this.opt)).then(res=>{

                this.locked = false
                this.cpages = this.pagesInit()
                let dom = document.querySelector(this.box)

                //如果返回的是json数据
                if(this.navtype === 'json'){
                    this.$emit('return',res.data)
                }else{
                    if(this.type === 'p'){
                        dom.innerHTML = res.data.data
                    }else{
                        dom.insertAdjacentHTML('beforeend', res.data.data)
                    }
                }

                //变更地址栏和title
                if(!!(window.history && history.pushState)){
                    
                    if(page != 1){
                        if(this.navtype === 'comment'){
                            if(b2_global.structure){
                                window.history.pushState({page:page}, null, this.url+'/comment-page-'+page+'#comment')
                            }else{
                                window.history.pushState({page:page}, null, this.url+'&cpage='+page+'#comment')
                            }
                        }else{
                            if(this.navtype != 'authorComments' && this.title){
                                document.title = this.title+' '+b2_global.site_separator+' '+(b2_global.page_title.replace('{#}',page))+' '+b2_global.site_separator+' '+b2_global.site_name
                            }
                            
                            window.history.pushState({page:page}, null, this.url+'/page/'+page)
                        }
                        
                    }else{
                        if(this.navtype === 'comment'){
                            window.history.pushState({page:page}, null, this.url+'#comment')
                        }else{
                            if(this.navtype != 'authorComments' && this.title){
                                document.title = this.title+' '+b2_global.site_separator+' '+b2_global.site_name
                            }
                            
                            window.history.pushState({page:page}, null, this.url)
                        }
                    }
                    
                }

                if(this.navtype === 'comment' || this.navtype === 'authorComments'){
                    let img = document.querySelectorAll('.comment-img-box img');
                    if(img.length > 0){
                        for (let index = 0; index < img.length; index++) {
                            b2zoom.listen(img[index]);
                        }
                    }
                    if(this.navtype === 'comment'){
                        b2CommentList.showSticky()
                    }
                }else if(this.navtype === 'post'){
                    b2PackeryLoad()
                    //渐显
                    setTimeout(()=>{
                        listFadein(document.querySelectorAll(this.box+' > li'),20)
                    },500)
                }

                b2RestTimeAgo(document.querySelectorAll('.b2timeago'));

                NProgress.done()
                NProgress.remove()
                b2SidebarSticky()
                if(typeof b2CommentList !== 'undefined'){
                    b2CommentList.lazyLoadInstance.update()
                }
                lazyLoadInstance.update()
            }).catch(err=>{
                this.$toasted.show(err.response.data.message,{
                    theme: 'primary', 
                    position: 'top-center', 
                    duration : 4000,
                    type:'error'
                })
                NProgress.done()
                NProgress.remove()
            })
            
        },
        //获取数据
        getData(fn,data){
            this.cpaged = this.cpage
            this.cpages = this.pagesInit()
        },
        //跳转
        jump:function(event){
            var val = event.target.value || event.target.previousElementSibling.value
            if(val > this.pages) return
            this.go(parseInt(val))
        }
    },
    watch: {
        pages:function(val){
            this.cpages = this.pagesInit()
        },
        paged:function(){
            this.cpaged = parseInt(this.paged)
            this.cpages = this.pagesInit()
        }
    }
})

function b2RestTimeAgo(dom){
    b2Timeago.render(dom, 'zh_CN');
}

let pageNavBox = new Vue({
    el:'.post-nav',
    data:{
        selecter:'#post-list > .b2_gap',
        opt:'',
        api:'getPostList',
        options:[],
        value:1
    },
    mounted(){
        if(typeof b2_cat !== 'undefined'){
            this.opt = b2_cat.opt
        }
    },
    methods:{
        jump(paged){

        }
    }
})

//语音播放
let b2Audio = new Vue({
    el:'.b2-audio-content',
    data:{
        url:'',
        textList:[],
        playStatus:false,
        api:'https://tts.baidu.com/text2audio?lan=zh&ie=UTF-8&text=',
        index:0,
        currentTime:'00:00',
        startTime:'00:00',
        step:0,
        duration:0,
        ds:'',
        width:'0%'
    },
    methods:{
        play(){
            //如果未播放，加载播放列表
            if(!this.url){
                this.getPlayList()
            }else{
                this.playList()
            }
        },
        getPlayList(){
            this.$https.post(b2_rest_url+'getPostAudio','post_id='+this.$refs.audio.getAttribute('data-id')).then((res)=>{
                if(res.data.length > 0){
                    this.textList = res.data
                    //res.data
                    this.playList()
                    this.watchPlay()
                }
            })
        },
        playList(){
            this.url = this.api+this.textList[this.index];
            setTimeout(()=>{
                this.button()
            })
        },
        watchPlay(){
            this.$refs.audio.addEventListener('ended', ()=> {
                
                if(this.index >= this.textList.length - 1) {
                    this.playStatus = false
                    this.index = 0
                    this.step = 0
                    return;
                }
                this.step = 0
                this.index = this.index + 1
                this.playList()
            })
        },
        button(){
            if(this.$refs.audio!==null){
                if(this.$refs.audio.paused){
                    this.$refs.audio.play()
                    this.playStatus = true
                    this.timeSetp()
                }else{
                    this.$refs.audio.pause()
                    this.playStatus = false
                }

                this.$refs.audio.addEventListener("loadedmetadata",()=>{
                    this.duration = Math.round(this.$refs.audio.duration)
                    this.currentTime = this.secondToDate(this.duration)
                });
                
            } 
        },
        timeSetp(){
            if(this.playStatus == true){
                this.startTime = this.secondToDate(this.step++)
                if(this.ds){
                    clearTimeout(this.ds)
                }
                this.ds = setTimeout(()=>{
                    this.timeSetp()
                    this.width = this.step/this.duration * 100 + '%'
                },1000)
            }
        },
        secondToDate(s){
            var t;
            if(s > -1){
                var hour = Math.floor(s/3600)
                var min = Math.floor(s/60) % 60
                var sec = s % 60
                if(hour > 1){
                    if(hour < 10) {
                        t = '0'+ hour + ":"
                    } else {
                        t = hour + ":";
                    }
                }else{
                    t = '';
                }

                if(min < 10){t += "0"}
                t += min + ":";
                if(sec < 10){t += "0"}
                t += sec.toFixed(0);
            }
            return t;
        }
    }
})

var socialBox = new Vue({
    el:'#social-box',
    data:{
        locked:false,
        type:'',
        data:{
            'token':'',
            'invitation':'',
            'subType':''
        },
        error:'',
        oauth:'',
        name:''
    },
    mounted(){
        if(this.$refs.socialBox){
            let code = this.$refs.socialBox.getAttribute('data-code')
                type = this.$refs.socialBox.getAttribute('data-type')
            if(code){
                this.locked = true
                this.$http.post(b2_rest_url+'socialLogin','code='+code+'&type='+type).then(res=>{
                    this.locked = false
                    if(res.data === true){
                        this.back()
                    }else if(res.data.type == 'invitation'){
                        this.type = 'invitation',
                        this.data.token = res.data.token
                    }else{
                        this.setData(res.data)
                    }
                }).catch(err=>{
                    if(err.response.data.message.msg){
                        this.oauth = err.response.data.message.oauth
                        console.log(this.oauth )
                        this.error = err.response.data.message.msg
                        this.name = err.response.data.message.name
                    }else{
                        this.error = err.response.data.message
                    }
                    
                    this.locked = false
                })
            }
        }
    },
    methods:{
        setData(data){
            localStorage.setItem('userData',JSON.stringify(data))
            userTools.userData = data
            Vue.prototype.$http.defaults.headers.common['Authorization'] = 'Bearer ' + userTools.userData.token
            this.back()
        },
        back(){
            let url = JSON.parse(localStorage.getItem('historyUrl'))
            if(url){
                window.location.href = url
            }else{
                window.location.href = b2_global.home_url
            }
        },
        invRegeister(type){
            if(this.locked == 'pass' || this.locked == 'sub') return
            this.locked = type
            this.data.subType = type
            this.$http.post(b2_rest_url+'invRegeister',Qs.stringify(this.data)).then(res=>{
                this.setData(res.data)
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
        loginOut(){
            localStorage.removeItem('userData')
            this.$http.get(b2_rest_url+'loginOut').then(res=>{
                if(typeof b2Comment !== 'undefined' && b2Comment.$refs.respond){
                    b2Comment.resetUserInfo()
                }
            })
            let footer_text = document.querySelector('#footer-menu-user');
            if(footer_text){
                footer_text.innerText = '登录';
            }
        },
        rebuild(ev){
            this.$http.post(b2_rest_url+'unBuild','type='+type+'&user_id='+b2_author.author_id).then(res=>{
               
            }).catch(err=>{
                ev.preventDefault();
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

Vue.component('gg-box', {
    props: ['show','ggdata'],
    template: b2_global.gg_box,
    methods:{
        close(){
            this.$emit('close')
        },
    }
})

var b2GG = new Vue({
    el:'#gg-box',
    data:{
        ggdata:{
            'title':'',
            'thumb':'',
            'desc':'',
            'date':0,
            'href':'',
            'close':0
        },
        show:false
    },
    mounted(){
		var param = {
			params: {
			},
			headers: {
				'Content-Type': 'application/json;charset=UTF-8',
				'API-Authorization': b2_global.api_content
			}
		 }
		this.$http.get(b2_rest_url+'tags/notice/posts', param).then(res=>{
			console.log(res);
            let gg = JSON.parse(localStorage.getItem('gg_info'))
            if(!gg && res.data.title && res.data.show){
                this.ggdata = res.data
                this.show = true
            }else if(res.data.title && res.data.show){
                this.ggdata = res.data
                let timestamp = new Date().getTime()
                timestamp = parseInt(timestamp/1000)
                
                if(timestamp - gg.close >= res.data.days*86400){
                    this.show = true
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
    },
    methods:{
        close(){
            this.show = false
            let timestamp = new Date().getTime()
            timestamp = parseInt(timestamp/1000)

            this.ggdata.close = timestamp
            localStorage.setItem('gg_info',JSON.stringify(this.ggdata))
        }
    }
})

Vue.component('dmsg-box', {
    props: ['show','userid','type'],
    template: b2_global.dmsg_box,
    data(){
        return {
            user:[],
            content:'',
            locked:false,
            nickname:'',
            UserList:[],
            search:false
        }
    },
    methods:{
        close(){
            this.$emit('close')
            setTimeout(()=>{
                this.user = []
                this.content = ''
                this.nickname = ''
                this.UserList = []
            },100)
        },
        getUserData(id = 0){
            id = !id ? this.userid : id
            this.$http.post(b2_rest_url+'getUserPublicData','user_id='+id).then(res=>{
                this.user = res.data
                b2Dmsg.userid = id
                b2Dmsg.select = ''
                this.UserList = []
            }).catch(err=>{
                this.$toasted.show(err.response.data.message, {
                    theme: 'primary', 
                    position: 'top-center', 
                    duration : 4000,
                    type:'error'
                })
            })
        },
        edit(){
            b2Dmsg.select = 'select'
        },
        send(){
            if(this.locked == true) return
            this.locked = true
            this.$http.post(b2_rest_url+'sendDirectmessage','user_id='+this.userid+'&content='+this.content).then(res=>{
                if(res.data == true){
                    this.close()
                }
                if(b2DmsgPage.$refs.dmsgPage){
                    b2DmsgPage.getList()
                }
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
        searchUser(val){
            if(this.locked == true) return
            this.locked = true
            this.search = true
            this.$http.post(b2_rest_url+'searchUsers','nickname='+val).then(res=>{
                if(res.data.length > 0){
                    this.UserList = res.data
                }else{
                    this.UserList = []
                }
                this.locked = false
            }).catch(err=>{
                this.$toasted.show(err.response.data.message,{
                    theme: 'primary', 
                    position: 'top-center', 
                    duration : 4000,
                    type:'error'
                })
                this.locked = false
                this.UserList = []
            })
        }
    },
    watch:{
        show(val){
            if(val && this.type !== 'select'){
                this.getUserData()
            }
        },
        nickname(val){
            if(val){
                this.searchUser(val);
            }
        }
    }
})

var b2Dmsg = new Vue({
    el:'#dmsg-box',
    data:{
        userid:0,
        show:false,
        select:''
    },
    methods:{
        close(){
            this.show = !this.show
        }
    }
})

var b2DmsgPage = new Vue({
    el:'.dmsg-page',
    data:{
        list:false,
        locked:false,
        count:0,
        pages:0,
        selecter:'.dmsg-header',
        opt:{
            paged:1
        },
        api:'getUserDirectmessageList'
    },
    mounted(){
        if(this.$refs.dmsgPage){
            this.opt.paged = this.$refs.dmsgPage.getAttribute('data-paged')
            this.getList()
        }
    },
    methods:{
        getList(){
            this.$http.post(b2_rest_url+'getUserDirectmessageList',Qs.stringify(this.opt)).then(res=>{
                this.list = res.data.data
                this.pages = res.data.count
                this.locked = false
                this.$nextTick(()=>{
                    b2RestTimeAgo(document.querySelectorAll('.b2timeago'))
                })
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
        showDmsgBox(){
            b2Dmsg.select = 'select'
            b2Dmsg.show = true
        },
        get(data){
            this.list = data.data
            this.pages = data.count
            this.$nextTick(()=>{
                b2RestTimeAgo(document.querySelectorAll('.b2timeago'))
            })
        },
        jump(id){
            window.location.href = this.$refs.dmsgPage.getAttribute('data-url')+'/to/'+id; 
        },
        deleteDmsg(id){

        }
    }
})

var b2dmsgPageTo = new Vue({
    el:'.dmsg-page-to',
    data:{
        list:false,
        locked:false,
        opt:{
            paged:1,
            userid:0
        },
        count:0,
        pages:0,
        selecter:'.dmsg-header',
        api:'getMyDirectmessageList',
        content:'',
        sendLocked:false
    },
    mounted(){
        if(this.$refs.mydmsg){
            this.opt.userid = this.$refs.mydmsg.getAttribute('data-id')
            this.opt.paged = this.$refs.mydmsg.getAttribute('data-paged')
            this.getList();
        }
    },
    methods:{
        getList(){
            this.$http.post(b2_rest_url+'getMyDirectmessageList',Qs.stringify(this.opt)).then(res=>{
                this.list = res.data.data
                this.locked = false
                this.count = res.data.count
                this.pages = res.data.pages
                this.$nextTick(()=>{
                    b2RestTimeAgo(document.querySelectorAll('.b2timeago'))
                })

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
        get(val){
            this.list = val.data
            this.count = val.count
            this.pages = val.pages
        },
        send(){
            if(this.sendLocked == true) return
            this.sendLocked = true
            this.$http.post(b2_rest_url+'sendDirectmessage','user_id='+this.opt.userid+'&content='+this.content).then(res=>{
                this.getList()
                this.content = ''
                this.sendLocked = false
            }).catch(err=>{
                this.$toasted.show(err.response.data.message,{
                    theme: 'primary', 
                    position: 'top-center', 
                    duration : 4000,
                    type:'error'
                })
                this.sendLocked = false
            })
        }
    }
})

var b2DownloadPage = new Vue({
    el:'#download-page',
    data:{
        data:'',
        postId:0,
        index:0,
        i:0
    },
    mounted(){
        if(this.$refs.downloadPage){
            this.postId = this.$refs.downloadPage.getAttribute('data-postid');
            this.index = this.$refs.downloadPage.getAttribute('data-index');
            this.i = this.$refs.downloadPage.getAttribute('data-i');
            this.getData()

            var clipboard = new ClipboardJS('.fuzhi');
            clipboard.on('success', e=>{
                this.$toasted.show('复制成功',{
                    theme: 'primary', 
                    position: 'top-center', 
                    duration : 4000,
                    type:'error'
                })
            });
            clipboard.on('error', e=> {
                this.$toasted.show('请选中复制',{
                    theme: 'primary', 
                    position: 'top-center', 
                    duration : 4000,
                    type:'error'
                })
            });
        }
    },
    methods:{
        getData(){
            this.$http.post(b2_rest_url+'getDownloadPageData','post_id='+this.postId+'&index='+this.index+'&i='+this.i).then(res=>{
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
        login(){
            login.show = true
        }
    }
})

Vue.component('check-box',{
    props: ['show','title','type'],
    template: b2_global.pay_check,
    data(){
        return {
            success:false,
            timeOut:300,
            timesec:'',
            sTime:'',
            check:false,
            checkTime:''
        }
    },
    mounted(){

    },
    methods:{
        close(){
            this.$emit('close')
            this.sTime = ''
            this.checkTime = ''
        },
        checkAc(){
            if((this.sTime === null && this.success == 'fail') || this.checkTime === null || this.success === true){
                this.checkTime = null
                return
            }

            let order_id = localStorage.getItem('order_id')

            this.$http.post(b2_rest_url+'payCheck','order_id='+order_id).then(res=>{
                if(res.data === 'success'){
                    if(typeof(B2VerifyPage) !== "undefined"){
                        B2VerifyPage.data.pay = true
                        this.close()
                    }else if(typeof(carts) !== "undefined"){
                        carts.step = 3
                        this.close()
                    }else{
                        this.success = true;
                        this.checkTime = null;
                    }
                }else{
                    this.checkTime = setTimeout(()=>{
                        this.checkAc()
                    },1000)
                }
            })
        },
        time(){
            this.currTime = parseInt(Date.parse(new Date())/1000);
            this.endTime = parseInt(this.currTime + this.timeOut);
            this.setTime()
        },
        setTime(){
            if(this.show == false || this.success === true) return
            let diff_time = parseInt(this.endTime-this.currTime);
            let m = Math.floor((diff_time / 60 % 60));
            let s = Math.floor((diff_time % 60));
            this.timesec = (m > 0 ? m + '<b>分</b>' : '') + s + '<b>秒</b>';
            if(diff_time > 0){
                this.sTime = setTimeout(()=>{
                    this.endTime = this.endTime - 1;
                    this.setTime()
                },1000)
            }else{
                this.sTime = null
                this.success = 'fail'
            }
        },
        refresh(){
            if(typeof(B2VerifyPage) !== "undefined"){
                B2VerifyPage.data.pay = true
                this.close()
            }else if(typeof(carts) !== "undefined"){
                carts.step = 3
                this.close()
            }else{
                location.reload();
            }
        }
    },
    watch:{
        show(val){
            if(this.type == 'card') return
            if(val){
                this.sTime = ''
                this.checkTime = ''
                this.time()
                this.checkAc()
            }else{
                this.sTime = null
                this.success = false
                this.checkTime = null
            }
        }
    }
})

//跳转支付检查支付结果
var b2PayCheck = new Vue({
    el:'#pay-check',
    data:{
        show:false,
        title:'',
        type:''
    },
    methods:{
        close(){
            this.show = !this.show
        }
    }
})

//支付跳转页面
var b2Pay = new Vue({
    el:'#pay-page',
    data:{
        data:[],
        token:'',
        error:'',
        locked:false
    },
    mounted(){
        if(this.$refs.payPage){
            this.token = this.$refs.payPage.getAttribute('data-token');
            if(!this.token){
                this.data = JSON.parse(this.$refs.payPage.getAttribute('data-pay'));
                this.pay()
            }
        }
    },
    methods:{
        pay(){
            if(this.locked == true) return
            this.locked = true
            this.$http.post(b2_rest_url+'buildOrder',Qs.stringify(this.data)).then(res=>{
                this.token = res.data
                window.location.href = window.location.href.split('?')[0]+'?token='+this.token
                this.locked = false
            }).catch(err=>{
                this.error = err.response.data.message
                this.locked = false
            })
        }
    }
})

//扫码支付组件
Vue.component('scan-box',{
    props: ['show','data'],
    template: b2_global.scan_box,
    data(){
        return {
            locked:false,
            qrcode:'',
            timeOut:300,
            timesec:'',
            sTime:'',
            success:'',
            checkTime:'',
            backData:[]
        }
    },
    methods:{
        close(){
            this.$emit('close')
            this.backData = []
            this.checkTime = null
        },
        buildOrder(){
            if(this.locked == true) return
            this.locked = true

            this.currTime = parseInt(Date.parse(new Date())/1000);
            this.endTime = parseInt(this.currTime + this.timeOut);
            this.setTime()

            this.$http.post(b2_rest_url+'buildOrder',Qs.stringify(this.data)).then(res=>{
                this.backData = res.data
                var qr = new QRious({
                    value: this.backData.qrcode,
                    size:200,
                    level:'L'
                  });
                this.backData.qrcode = qr.toDataURL('image/jpeg')
                this.writeOrder(res.data.order_id)
                this.locked = false
                this.checkAc()
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
        writeOrder(id){
            localStorage.setItem('order_id',id)
        },
        checkAc(){
            if((this.sTime === null && this.success == 'fail') || this.checkTime === null || this.show == false){
                this.checkTime = null
                return
            }
            let order_id = localStorage.getItem('order_id')
            this.$http.post(b2_rest_url+'payCheck','order_id='+order_id).then(res=>{
                if(res.data === 'success'){
                    this.success = true;
                    this.checkTime = null;
                    if(typeof(B2VerifyPage) !== "undefined"){
                        B2VerifyPage.data.pay = true
                        this.close()
                    }
                    if(typeof(carts) !== "undefined"){
                        carts.step = 3
                        this.close()
                    }
                }else{
                    this.checkTime = setTimeout(()=>{
                        this.checkAc()
                    },1000)
                }
            }).catch(err=>{
                this.$toasted.show(err.response.data.message,{
                    theme: 'primary',
                    position: 'top-center', 
                    duration : 4000,
                    type:'error'
                })
            })
        },
        setTime(){
            if(this.show == false) return
            let diff_time = parseInt(this.endTime-this.currTime);
            let m = Math.floor((diff_time / 60 % 60));
            let s = Math.floor((diff_time % 60));
            this.timesec = (m > 0 ? m + '<b>分</b>' : '') + s + '<b>秒</b>';
            if(diff_time > 0){
                this.sTime = setTimeout(()=>{
                    this.endTime = this.endTime - 1;
                    this.setTime()
                },1000)
            }else{
                this.sTime = null
                this.success = 'fail'
            }
        },
        refresh(){
            location.reload();
        }
    },
    watch:{
        show(val){
            if(val){
                this.sTime = ''
                this.success = false
                this.checkTime = ''
            }else{
                this.sTime = null
                this.success = false
                this.checkTime = null
            }
        },
        data:{
            deep:true,
            handler(newName, oldName) {
                this.buildOrder()
            },
        }
    }
})

//扫码支付
var b2ScanPay = new Vue({
    el:'#scan-box',
    data:{
        data:[],
        show:false
    },
    methods:{
        close(){
            this.show = !this.show
        }
    }
})

Vue.component('ds-box', {
    props: ['show','money','msg','user','author','data','showtype'],
    template:b2_global.ds_box,
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
            }else if(this.showtype == 'cz'){
                data = {
                    'title':'充值',
                    'order_price':this.payMoney,
                    'order_type':'cz',
                    'post_id':0,
                    'pay_type':this.payType
                }
            }else if(this.showtype == 'cg'){
                data = {
                    'title':'积分购买',
                    'order_price':this.payMoney,
                    'order_type':'cg',
                    'post_id':0,
                    'pay_type':this.payType
                }
            }else{
                data = Object.assign(this.data,data)
            }
            data['pay_type'] = this.payType

            data = Object.assign({
                'redirect_url':JSON.parse(localStorage.getItem('historyUrl')) + '?paystatus=check'
            },data)

            return data;
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
        },
        chosePayType(val){
            
            if(this.locked == true) return;
            this.locked = true
            this.payType = val

            this.$http.post(b2_rest_url+'checkPayType','pay_type='+val).then(res=>{
                if(res.data.pay_type == 'card'){
                    this.$emit('change','card')
                    this.card.text = res.data.card_text
                    this.jump = res.data.pay_type
                }else{
                    if(this.showtype == 'card'){
                        this.$emit('change','cz')
                    }
                    this.jump = res.data.pay_type

                    this.isWeixin = res.data.is_weixin
                    this.isMobile = res.data.is_mobile
                    if(this.jump == 'jump'){
                        let url = b2_global.pay_url+'?'+Qs.stringify(this.restData())
                        this.href = encodeURI(url)
                    }
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
        },
        writeOrder(id){
            localStorage.setItem('order_id',id)
        },
        balancePay(order_id){
            let data = this.restData();
            this.$http.post(b2_rest_url+'balancePay','order_id='+order_id).then(res=>{
                this.close()
                b2PayCheck.show = true
                b2PayCheck.title = data['title']
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
        pay(){
            if(this.disabled()) return;

            if(this.jump === 'card'){
                if(this.locked == true) return
                this.locked = true
                this.$http.post(b2_rest_url+'cardPay',Qs.stringify(this.card)).then(res=>{
                    if(res.data === 'success'){
                        b2PayCheck.show = true
                        b2PayCheck.title = '充值成功'
                        b2PayCheck.type = 'card'
                        this.close()
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
            }else if(this.jump === 'jump'){
                b2PayCheck.show = true
                b2PayCheck.title = this.$refs.dstitle.innerHTML
                this.close()
            }else if(this.jump === 'balance'){
                if(this.locked == true) return
                this.locked = true
                
                let data = Qs.stringify(this.restData());
                this.$http.post(b2_rest_url+'buildOrder',data).then(res=>{
                    this.writeOrder(res.data)
                    this.balancePay(res.data)
                }).catch(err=>{
                    this.$toasted.show(err.response.data.message,{
                        theme: 'primary',
                        position: 'top-center', 
                        duration : 4000,
                        type:'error'
                    })
                    this.locked = false
                })
            }else if(this.jump === 'scan'){
                if(this.isMobile){
                    b2ScanPay.data = this.restData({
                        'is_weixin':this.isWeixin,
                        'is_mobile':this.isMobile
                    })
                }else{
                    b2ScanPay.data = this.restData()
                }
                b2ScanPay.show = true;
                this.close()
            }else if(this.jump === 'mweb' || this.jump === 'jsapi'){
                if(this.locked == true) return
                this.locked = true
                let data = this.restData();
                let title = data['title']
                data = Qs.stringify(data);
                if(!b2isWeixin()){
                    this.newWin = window.open('',"_blank");
                }
                
                this.$http.post(b2_rest_url+'buildOrder',data).then(res=>{
                    this.writeOrder(res.data.order_id)
                    if(this.jump === 'jsapi'){
                        jsApiCall(res.data.link)
                        this.close()
                        b2PayCheck.show = true
                        b2PayCheck.title = title
                    }else{
                        // window.open(res.data.link)
                        if(!b2isWeixin()){
                            this.newWin.location = res.data.link;
                        }else{
                            window.open(res.data.link)
                        }
                        //location.assign();
                        //window.open()
                        this.close()
                        b2PayCheck.show = true
                        b2PayCheck.title = title
                    }
                    this.locked = false
                }).catch(err=>{
                    if(err.response.data.message.msg === 'bind_weixin'){
                        localStorage.setItem('historyUrl',JSON.stringify(window.location.href))
                        b2weixinBind.show = true
                        b2weixinBind.url = err.response.data.message.oauth.weixin.url
                    }else{
                        this.$toasted.show(err.response.data.message,{
                            theme: 'primary',
                            position: 'top-center', 
                            duration : 4000,
                            type:'error'
                        })
                    }
                    
                    this.locked = false
                })
            }
        },
        allowPayType(){
            this.$http.post(b2_rest_url+'allowPayType','show_type='+this.showtype).then(res=>{
                this.allow = res.data
                this.user.money = res.data.money
                if(res.data.dh){
                    this.cg.min = res.data.min
                    this.cg.dh = res.data.dh
                    this.payMoney = this.cg.min
                }
            })
        },
        creditAdd(){
            return parseInt(this.payMoney*this.cg.dh)
        }
    },
    watch:{
        money(val){
            if(this.payMoney == 0){
                this.payMoney = val[0]
            }
        },
        payMoney(val){
            if(this.href && val && this.jump == 'jump'){
                let url = b2_global.pay_url+'?'+Qs.stringify(this.restData())
                this.href = encodeURI(url)
            }
        },
        show(val){
            if(val){
                localStorage.setItem('historyUrl',JSON.stringify(window.location.href))
                this.allowPayType()
            }
            if(val && this.money.length > 0){
                this.payMoney = this.money[0]
            }else if(val && this.data.length != 0){
                this.payMoney = this.data.order_price
            }else if(val == false){
                setTimeout(() => {
                    this.value = 0
                    this.payMoney = 0
                    this.payType = ''
                    this.clean()
                }, 10);
            }
        },
        payType(val){
            this.data.pay_type = val
        }
    }
})

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
            // let userData = JSON.parse(localStorage.getItem('userData'))
            // if(!userData){
            //     login.show = true
            // }else{
                b2DsBox.money = this.data.moneys
                b2DsBox.show = true
                b2DsBox.showtype = 'ds'
                b2DsBox.msg = this.data.single_post_ds_text
            // }
        },
    }
})

function b2pay(event){
    let userData = JSON.parse(localStorage.getItem('userData'))
    if(!userData){
        login.show = true
    }else{
        let data = JSON.parse(event.getAttribute('data-pay'));
        b2DsBox.data = data
        b2DsBox.show = true
        b2DsBox.showtype = 'normal'
    }
    
}

function b2creditpay(event){
    let userData = JSON.parse(localStorage.getItem('userData'))
    if(!userData){
        login.show = true
    }else{
        let data = JSON.parse(event.getAttribute('data-pay'));
        payCredit.data = data
        payCredit.show = true
    }
}

//随机数
function uuid(len, radix) {
    var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
    var uuid = [], i;
    radix = radix || chars.length;
    if (len) {
      for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random()*radix];
    } else {
      var r;
      uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
      uuid[14] = '4';
      for (i = 0; i < 36; i++) {
        if (!uuid[i]) {
          r = 0 | Math.random()*16;
          uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
        }
      }
    }
    return uuid.join('');
}

function openWin(url,name,iWidth,iHeight) {
    var iTop = (window.screen.availHeight - 30 - iHeight) / 2;
    var iLeft = (window.screen.availWidth - 10 - iWidth) / 2;
    window.open(url, name, 'height=' + iHeight + ',innerHeight=' + iHeight + ',width=' + iWidth + ',innerWidth=' + iWidth + ',top=' + iTop + ',left=' + iLeft + ',status=no,toolbar=no,menubar=no,location=no,resizable=no,scrollbars=0,titlebar=no');
}

function deleteHtmlTag(str){
    str = str.replace(/<[^>]+>|&[^>]+;/g,"").trim();
    return str;
}

var b2cache=[];
function b2addJs(path,callback){
    var flag=0;//检查是否加载的状态
    for(var i=b2cache.length;i--;){
        b2cache[i]==path?flag=1:flag=0;
    }
    if(flag){//如果已经加载则不加载    
        return;
    }
    var head = document.getElementsByTagName('head')[0];
    var script = document.createElement('script');
    script.src = path;
    script.type = 'text/javascript';
    head.appendChild(script);
    script.onload = script.onreadystatechange = function() {/*判断是否加载成功*/
    if (!this.readyState || this.readyState === "loaded" || this.readyState === "complete" ) {
        script.onload = script.onreadystatechange = null;
            callback(); 
        }
    };
    b2cache.push(path);//把加载过的存起来
}

//微信内支付
function jsApiCall(data){
    WeixinJSBridge.invoke(
        'getBrandWCPayRequest',
        data,
        function(res){}
    );
}

function callpay(){
    if (typeof WeixinJSBridge == "undefined"){
        if( document.addEventListener ){
            document.addEventListener('WeixinJSBridgeReady', jsApiCall, false);
        }else if (document.attachEvent){
            document.attachEvent('WeixinJSBridgeReady', jsApiCall);
            document.attachEvent('onWeixinJSBridgeReady', jsApiCall);
        }
    }else{
        jsApiCall();
    }
}

if(typeof userTools !== 'undefined'){
    const userDataWatch = userTools.$watch('userData', (newVal, oldVal) => {
        if(typeof headerTools !== 'undefined'){
            headerTools.userData = newVal
        }
        if(typeof b2Comment !== 'undefined'){
            b2Comment.userData = newVal
        }
    })
}

function b2SidebarSticky(){
    if(B2ClientWidth <= 768) return
    if(typeof window.b2Stick !== 'undefined'){
        for (let i = 0; i < window.b2Stick.length; i++) {
            window.b2Stick[i].updateSticky()
        }
        return
    }

    if(b2_global.is_home){
        var b2sidebar = document.querySelectorAll('.widget-ffixed');
    }else{
        var b2sidebar = document.querySelectorAll('.sidebar-innter');
    }

    if(b2sidebar){
        if(B2ClientWidth > 768){
            var b2Stick = []
            for (let i = 0; i < b2sidebar.length; i++) {
                b2Stick[i] = new StickySidebar(b2sidebar[i], {
                    topSpacing: 20,
                    bottomSpacing: 20
                });
            }

            window.b2Stick = b2Stick
        }
    }

}

Vue.component('credit-box', {
    props: ['show','data','user'],
    template:b2_global.credit_box,
    data(){
        return {
            locked:false
        }
    },
    methods:{
        close(){
            this.$emit('close')
        },
        writeOrder(id){
            localStorage.setItem('order_id',id)
        },
        disabled(){
            if(this.locked === true) return true
            if(parseInt(this.user.credit) < parseInt(this.data.order_price)) return true
            return false
        },
        creditPay(order_id){
            this.writeOrder(order_id)
            this.$http.post(b2_rest_url+'creditPay','order_id='+order_id).then(res=>{
                this.locked = false
                b2PayCheck.show = true
                this.close()
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
        pay(){
            if(this.locked == true) return
            this.locked = true

            this.data.pay_type = 'credit'
            let data = Qs.stringify(this.data)
            this.$http.post(b2_rest_url+'buildOrder',data).then(res=>{
                this.creditPay(res.data)
            }).catch(err=>{
                this.$toasted.show(err.response.data.message,{
                    theme: 'primary',
                    position: 'top-center', 
                    duration : 4000,
                    type:'error'
                })
                this.locked = false
            })
        }
    }
})

var payCredit = new Vue({
    el:'#credit-box',
    data:{
        show:false,
        data:[],
        user:[],
        author:[]
    },
    methods:{
        close(){
            this.show =  !this.show
        }
    }
})

var B2UserWidget = new Vue({
    el:'.b2-widget-user',
    data:{
        data:'',
    },
    mounted(){
        if(this.$refs.userWidget){
            this.getData()
        }
    },
    methods:{
        getData(){
            this.$http.post(b2_rest_url+'getUserWidget').then(res=>{
                this.data = res.data
                b2AsideBar.userData = res.data
                if(res.data.oauth){
                    if(!res.data.oauth.weibo.open && !res.data.oauth.qq.open && !res.data.oauth.weixin.open){
                        this.data.oauth = []
                    }
                }
                if(this.$refs.gujia){
                    this.$refs.gujia.style.display = 'none'
                }
                this.$nextTick(()=>{
                    b2WidgetImageLoaded()
                })
            })
        },
        markHistory(type){
            if(this.data.mp && type === 'weixin'){
                mpCode.show = true
            }
            localStorage.setItem('historyUrl',JSON.stringify(window.location.href))
        }
    }
})

var b2Mission = new Vue({
    el:'.b2-widget-mission',
    data:{
        data:'',
        locked:false,
        type:'today',
        paged:1,
        pages:{
            today:1,
            always:1
        }
    },
    mounted(){
        if(this.$refs.missionWidget){
            this.getData()
        }
    },
    methods:{
        getData(count,paged){
            if(this.$refs.missionWidget){
                count = this.$refs.missionWidget.getAttribute('data-count')
            }
            if(paged){
                this.paged = paged
            }
            this.$http.post(b2_rest_url+'getUserMission','count='+count+'&paged='+this.paged).then(res=>{
                this.data = res.data
                this.pages.today = res.data.mission_today_list.pages
                this.pages.always = res.data.mission_always_list.pages
                if(this.$refs.missiongujia){
                    this.$refs.missiongujia.style.display = 'none'
                }
                
                this.$nextTick(()=>{
                    b2RestTimeAgo(document.querySelectorAll('.user-mission-info .b2timeago'))
                })
            })
        },
        mission(){
            let userData = JSON.parse(localStorage.getItem('userData'))
            if(!userData){
                login.show = true
            }else{
                if(this.data.mission.credit){
                    this.$toasted.show('您已经签到了！',{
                        theme: 'primary',
                        position: 'top-center',
                        duration : 4000,
                        type:'error'
                    })
                    return
                }
                if(this.locked == true) return
                this.locked = true
                this.$http.post(b2_rest_url+'userMission').then(res=>{
                    this.$nextTick(()=>{
                        this.data.mission = res.data.mission
                        this.locked = false
                    })
                }).catch(err=>{
                    this.$toasted.show(err.response.data.message,{
                        theme: 'primary',
                        position: 'top-center',
                        duration : 4000,
                        type:'error'
                    })
                    this.locked = false
                })
            }
        }
    },
    watch:{
        type(){
            this.$nextTick(()=>{
                b2RestTimeAgo(document.querySelectorAll('.user-mission-info .b2timeago'))
            })
        } 
    }
})

var b2NewComment = new Vue({
    el:'.b2-widget-comment',
    data:{
        data:'',
        paged:1,
        pages:1,
        count:5,
        hidden:1,
        next:false,
        prev:false,
        locked:false
    },
    mounted(){
        if(this.$refs.commentWidget){
            this.count = this.$refs.commentWidget.getAttribute('data-count');
            this.hidden = this.$refs.commentWidget.getAttribute('data-hidden');
            this.getList()
            if(this.paged == 1){
                this.prev = true
            }
        }
    },
    methods:{
        getList(){
            if(this.locked == true) return
            this.locked = true
            this.$https.post(b2_rest_url+'getNewComments','paged='+this.paged+'&count='+this.count+'&hidden='+this.hidden).then(res=>{
                this.data = res.data.data
                this.pages = res.data.pages
                if(this.$refs.gujia){
                    this.$refs.gujia.style.display = 'none'
                }
                
                this.$nextTick(()=>{
                    b2SidebarSticky()
                    b2RestTimeAgo(this.$refs.commentWidget.querySelectorAll('.b2timeago'))
                })
                this.locked = false
            })
        },
        nexAc(){
            if(this.next || this.locked) return
            this.paged++
            this.getList()
        },
        prevAc(){
            if(this.prev || this.locked) return
            this.paged--
            this.getList()
        }
    },
    watch:{
        paged(val){
            if(val <= 1){
                this.prev = true
            }else{
                this.prev = false
            }
            if(val >= this.pages){
                this.next = true
            }else{
                this.next = false
            }
        }
    }
})

//移动端点击展开筛选
// function b2ShowFilterBox(event){

//     let filterBox = event.parentNode.nextElementSibling
    
//     if(filterBox.className.indexOf('b2-show') !== -1){
//         filterBox.className = filterBox.className.replace('b2-show','')
//         bodyScrollLock.lock(filterBox)
//     }else{
//         filterBox.className += ' b2-show'
//         bodyScrollLock.unlock(filterBox)
//     }
// }

var b2mobileFooterMenu = new Vue({
    el:'.mobile-footer-menu',
    data:{
        msg:0
    }
})

var b2AsideBar = new Vue({
    el:'.aside-container',
    data:{
        userData:[],
        dmsg:{
            count:0
        },
        msg:{
            count:0
        },
        showBox:false,
        showType:{
            'user':false,
            'msg':false,
            'dmsg':false,
            'mission':false,
            'coupon':false
        },
        locked:false,
        mission:[],
        bool:false,
        carts:{
            count:0,
            data:''
        },
        coupon:{
            count:0,
            data:''
        },
        showCouponInfo:[],
        qrcode:'',
        ref:''
    },
    mounted(){
        if(this.$refs.asideContent){
            let userData = JSON.parse(localStorage.getItem('userData'))
            if(userData){
                this.ref = userData.user_code
            }
            
            this.getNewDmsg()
            if(B2ClientWidth < 768){
                window.addEventListener('popstate', this.goBack, false)
            }
            this.updateCarts()
            
        }
    },
    methods:{
        getQrcode(url){
            var url = new URL(url)
            url.searchParams.set('ref', this.ref)
            var qr = new QRious({
                value: url.href,
                size:120,
                level:'L'
              });
            return qr.toDataURL('image/jpeg');
        },
        show(type,value){
            let userData = JSON.parse(localStorage.getItem('userData'))
            this.closeBox()
            if(type === 'user'){
                if(!userData){
                    login.show = true
                    login.type = 0
                    return
                }
                if(Object.keys(this.userData).length == 0){
                    B2UserWidget.getData()
                }
            }
            if(type === 'dmsg' && this.dmsg.count == 0){
                if(!userData){
                    login.show = true
                    login.type = 0
                    return
                }
                this.jumpTo(value)
                return;
            }
            if(type === 'msg'){
                if(!userData){
                    login.show = true
                    login.type = 0
                    return
                }
                this.jumpTo(value)
                return;
            }
            if(type == 'mission'){
                this.mission = b2Mission
                if(this.mission.data.length == 0){
                    this.mission.getData(10)
                }
            }
            if(type === 'coupon'){
                this.getMyCoupons()
            }
            this.showType[type] = true
            this.showBox = true
            if(B2ClientWidth < 768){
                bodyScrollLock.lock(this.$refs.asideContainer)
            }
            
            this.$nextTick(()=>{
                b2RestTimeAgo(document.querySelectorAll('.user-mission-info .b2timeago'))
            })
        },
        showAc(val){
            if(B2ClientWidth < 768){
                let userData = JSON.parse(localStorage.getItem('userData'))
                if(!userData){
                    login.show = true
                    return
                }
                if(val){
                    window.location.hash = '#showUserPanel';  
                }else{
                    window.history.back()
                }
            }else{
                if(val){
                    this.show('user')  
                }else{
                    this.close()
                }
            }
            
        },
        goBack(e){
            if(e.target.location.hash == '#showUserPanel'){
                this.show('user')
                this.$refs.asideContainer.className += ' aside-show';
            }else{
                this.close()
            }
        },
        closeBox(){
            Object.keys(this.showType).forEach(key => {
                this.showType[key] = false
            });
            this.showBox = false
            if(B2ClientWidth < 768){
                bodyScrollLock.unlock(this.$refs.asideContainer)
            }
            
        },
        getNewDmsg(){
            let userData = JSON.parse(localStorage.getItem('userData'))
            if(userData){
                if(this.locked) return
                this.locked = true
                this.$http.post(b2_rest_url+'getNewDmsg').then(res=>{
                    this.dmsg = res.data.dmsg
                    this.msg.count = res.data.msg
                    this.locked = false
                })
            }
        },
        close(){
            if(this.$refs.asideContainer && this.$refs.asideContainer.className.indexOf('aside-show') && B2ClientWidth < 768){
                this.$refs.asideContainer.className = this.$refs.asideContainer.className.replace(' aside-show','')
                if(B2ClientWidth < 768){
                    bodyScrollLock.unlock(this.$refs.asideContainer)
                }
            }else{
                this.closeBox()
            }
        },
        goTop(){
            this.$scrollTo('.site', 300, {offset: -50})
        },
        login(){
            let userData = JSON.parse(localStorage.getItem('userData'))
            if(!userData){
                login.show = true
                return
            }else if(!this.$refs.asideContent){
                self.location = userData.user_link
            }else{
                this.show('user')
                this.$refs.asideContainer.className += ' aside-show';
            }
        },
        showUser(){
            return Object.keys(this.userData).length && typeof(this.userData.lv) !== 'undefined'
        },
        showSearch(){
            b2SearchBox.close()
        },
        jumpTo(url){
            window.location.href = url; 
        },
        updateCarts(){
            this.carts.data = JSON.parse(localStorage.getItem('carts'))
            
            if(this.carts.data){
                if(this.carts.count > Object.keys(this.carts.data).length){
                    b2mobileFooterMenu.msg = b2mobileFooterMenu.msg - (this.carts.count - Object.keys(this.carts.data).length)
                }else{

                    b2mobileFooterMenu.msg = b2mobileFooterMenu.msg + (Object.keys(this.carts.data).length - this.carts.count) 
                }
                this.carts.count = Object.keys(this.carts.data).length
            }
        },
        deleteCarts(){

            b2mobileFooterMenu.msg = b2mobileFooterMenu.msg - this.carts.count

            localStorage.removeItem('carts')
            
            this.updateCarts()

            this.carts = {
                count:0,
                data:''
            }

            if(typeof B2ShopSingle !== 'undefined'){
                B2ShopSingle.carts = ''
            }
            if(typeof carts !== 'undefined'){
                carts.data = null
            }
        },
        deleteCartsItem(id){

            delete this.carts.data[id]
            localStorage.setItem('carts',JSON.stringify(this.carts.data))
            this.updateCarts()
            
            if(typeof B2ShopSingle !== 'undefined'){
                B2ShopSingle.carts = this.carts.data
            }

            if(typeof carts !== 'undefined'){
                Vue.delete(carts.picked, carts.picked.indexOf(id))
                carts.data = this.carts.data
                carts.step = 1
                carts.dataLength = Object.keys(carts.data).length;
            }
        },
        getMyCoupons(){
            let userData = JSON.parse(localStorage.getItem('userData'))
            if(!userData){
                login.show = true
                return
            }

            this.showType.coupon = true
            
            this.$https.get(b2_rest_url+'getMyCoupons').then(res=>{
                this.coupon = res.data
            })
        },
        couponClass(item){
            if(item.expiration_date.expired) return 'stamp04'
            if(item.products.length > 0) return 'stamp01'
            if(item.cats.length > 0) return 'stamp02'
            return 'stamp03'
        },
        couponMoreInfo(id){
            this.$set(this.showCouponInfo,id,!this.showCouponInfo[id])
        },
        deleteCoupon(id){
            var r = confirm("确定要删除这个优惠劵吗？")
            if(r){
                this.$https.post(b2_rest_url+'deleteMyCoupon','id='+id).then(res=>{
                    this.$delete(this.coupon.data,id)
                    this.$set(this.coupon,'count',this.coupon.count-1)
                })
            }
            return            
        }
    },
    watch:{
        dmsg:{
            handler(newVal, old) {
                if(newVal.count > 0){
                    b2mobileFooterMenu.msg += parseInt(newVal.count)
                }
            },
            immediate: true,
            deep: true
        },
        msg:{
            handler(newVal, old) {
                if(newVal.count > 0){
                    b2mobileFooterMenu.msg += parseInt(newVal.count)
                }
            },
            immediate: true,
            deep: true
        }
    }
})

function b2HiddenFilterBox(event){
    event.parentNode.parentNode.className = event.parentNode.parentNode.className.replace('b2-show','');
    bodyScrollLock.unlock(event.parentNode.parentNode)
}

function b2flickity(){
    if(B2ClientWidth < 768) return
    var f = document.querySelectorAll('.home-collection-silder');
    if(f){
        var collection = []
        for (let i = 0; i < f.length; i++) {
            collection[i] = new Flickity(f[i],{
                pageDots: false,
                groupCells: true,
                draggable: true,
                prevNextButtons: false,
                freeScroll: false,
                wrapAround:true,
                selectedAttraction:0.15,
                friction:1,
                freeScrollFriction: 0.1,
                cellAlign: 'left'
            });
            
            let previous = f[i].parentNode.parentNode.parentNode.querySelector('.collection-previous');
            previous.addEventListener( 'click', function() {
                collection[i].previous();
            });

            let next = f[i].parentNode.parentNode.parentNode.querySelector('.collection-next');
            next.addEventListener( 'click', function() {
                collection[i].next();
            });
        }
    }
}
    
b2flickity()

function b2HiddenFooter(){
    let footer = document.querySelector('.site-footer .site-footer-widget-in')
    if(!footer) return
    let footerWidget = footer.querySelectorAll('.mobile-hidden')

    if(footerWidget && footerWidget.length >= footer.childNodes.length){
        document.querySelector('.site-footer').className += ' mobile-hidden';
    }
}
b2HiddenFooter()

var b2SearchUser = new Vue({
    el:'#user-list',
    data:{
        follow:[],
        ids:[]
    },
    mounted(){
        if(this.$refs.searchUser){
            this.ids = b2_search_data.users
            this.checkFollowByids()
        }
    },
    methods:{
        checkFollowByids(){
            let data = {
                'ids':this.ids
            }
            this.$http.post(b2_rest_url+'checkFollowByids',Qs.stringify(data)).then(res=>{
                this.follow = res.data
            })
        },
        followAc(id){
            let userData = JSON.parse(localStorage.getItem('userData'))
            if(!userData){
                login.show = true
            }else{
                this.$http.post(b2_rest_url+'AuthorFollow','user_id='+id).then(res=>{
                    this.follow[id] = res.data
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
        dmsg(id){
            let userData = JSON.parse(localStorage.getItem('userData'))
            if(!userData){
                login.show = true
            }else{
                b2Dmsg.userid = id
                b2Dmsg.show = true
            }
        }
    }
})

function b2listenHash(){
    if(B2ClientWidth >= 768) return
    let hash = location.hash.slice(1);
    if(hash == 'showMenu' || hash == 'showUserPanel' || hash == 'ShowfilterBox'){
        history.pushState("", document.title, window.location.pathname + window.location.search);
    }
}
b2listenHash();

//精确计算
(function () {
    var calc = {
        /*
        函数，加法函数，用来得到精确的加法结果  
        说明：javascript的加法结果会有误差，在两个浮点数相加的时候会比较明显。这个函数返回较为精确的加法结果。
        参数：arg1：第一个加数；arg2第二个加数；d要保留的小数位数（可以不传此参数，如果不传则不处理小数位数）
        调用：Calc.Add(arg1,arg2,d)  
        返回值：两数相加的结果
        */
        Add: function (arg1, arg2) {
            arg1 = arg1.toString(), arg2 = arg2.toString();
            var arg1Arr = arg1.split("."), arg2Arr = arg2.split("."), d1 = arg1Arr.length == 2 ? arg1Arr[1] : "", d2 = arg2Arr.length == 2 ? arg2Arr[1] : "";
            var maxLen = Math.max(d1.length, d2.length);
            var m = Math.pow(10, maxLen);
            var result = Number(((arg1 * m + arg2 * m) / m).toFixed(maxLen));
            var d = arguments[2];
            return typeof d === "number" ? Number((result).toFixed(d)) : result;
        },
        /*
        函数：减法函数，用来得到精确的减法结果  
        说明：函数返回较为精确的减法结果。 
        参数：arg1：第一个加数；arg2第二个加数；d要保留的小数位数（可以不传此参数，如果不传则不处理小数位数
        调用：Calc.Sub(arg1,arg2)  
        返回值：两数相减的结果
        */
        Sub: function (arg1, arg2) {
            return Calc.Add(arg1, -Number(arg2), arguments[2]);
        },
        /*
        函数：乘法函数，用来得到精确的乘法结果  
        说明：函数返回较为精确的乘法结果。 
        参数：arg1：第一个乘数；arg2第二个乘数；d要保留的小数位数（可以不传此参数，如果不传则不处理小数位数)
        调用：Calc.Mul(arg1,arg2)  
        返回值：两数相乘的结果
        */
        Mul: function (arg1, arg2) {
            var r1 = arg1.toString(), r2 = arg2.toString(), m, resultVal, d = arguments[2];
            m = (r1.split(".")[1] ? r1.split(".")[1].length : 0) + (r2.split(".")[1] ? r2.split(".")[1].length : 0);
            resultVal = Number(r1.replace(".", "")) * Number(r2.replace(".", "")) / Math.pow(10, m);
            return typeof d !== "number" ? Number(resultVal) : Number(resultVal.toFixed(parseInt(d)));
        },
        /*
        函数：除法函数，用来得到精确的除法结果  
        说明：函数返回较为精确的除法结果。 
        参数：arg1：除数；arg2被除数；d要保留的小数位数（可以不传此参数，如果不传则不处理小数位数)
        调用：Calc.Div(arg1,arg2)  
        返回值：arg1除于arg2的结果
        */
        Div: function (arg1, arg2) {
            var r1 = arg1.toString(), r2 = arg2.toString(), m, resultVal, d = arguments[2];
            m = (r2.split(".")[1] ? r2.split(".")[1].length : 0) - (r1.split(".")[1] ? r1.split(".")[1].length : 0);
            resultVal = Number(r1.replace(".", "")) / Number(r2.replace(".", "")) * Math.pow(10, m);
            return typeof d !== "number" ? Number(resultVal) : Number(resultVal.toFixed(parseInt(d)));
        }
    };
    window.Calc = calc;
}());

function b2stmap(){
    let stmaps = document.querySelectorAll('.stamp');
    if(stmaps.length > 0){
        let h_axios = axios
        let userData = JSON.parse(localStorage.getItem('userData'))

        if(userData){
            h_axios.defaults.headers.common['Authorization'] = 'Bearer ' + userData.token
        }

        for (let i = 0; i < stmaps.length; i++) {
            stmaps[i].querySelector('.coupon-receive').onclick = (event)=>{
                if(!userData){
                    login.show = true
                    return
                }

                h_axios.post(b2_rest_url+'ShopCouponReceive','&id='+event.target.getAttribute('data-id')).then((res)=>{
                    Vue.toasted.show('领取成功', { 
                        theme: 'primary', 
                        position: 'top-center', 
                        duration : 4000,
                        type:'success'
                    })
                }).catch(err=>{
                    Vue.toasted.show(err.response.data.message, { 
                        theme: 'primary', 
                        position: 'top-center', 
                        duration : 4000,
                        type:'error'
                    })
                })

            }
            stmaps[i].querySelector('.more-coupon-info').onclick = (event)=>{
                event.target.nextElementSibling.style.display = 'block'
            }
            stmaps[i].querySelector('.close-coupon-info').onclick = (event)=>{
                event.target.parentNode.parentNode.style.display = 'none'
            }
        }
    }
}
b2stmap()

// document.ready(function () {
//     let link = document.createElement("link");
//     link.rel = "stylesheet";
//     link.href = "//at.alicdn.com/t/font_1105559_00rtseygv6tsc.css";

//     document.head.appendChild(link);
// })

function b2IsPhoneAvailable(phonevalue){
    var phoneReg = /^1[0-9]{10}/;
    var emailReg = /[a-zA-Z0-9]{1,10}@[a-zA-Z0-9]{1,5}\.[a-zA-Z0-9]{1,5}/;
    if(phoneReg.test(phonevalue) || emailReg.test(phonevalue)){
        return true;
    }else{
        return false;
    }
}

var b2TaxTop = new Vue({
    el:'.tax-header',
    data:{
        showFliter:{
            hot:false,
            cat:false
        }
    },
    methods:{
        show(type){
            if(type === 'hot'){
                this.showFliter.hot = !this.showFliter.hot
                this.showFliter.cat = false
            }
            if(type === 'cat'){
                this.showFliter.cat = !this.showFliter.cat
                this.showFliter.hot = false
            }
        }
    }
})

function b2scroll( fn ) {
    var beforeScrollTop = document.documentElement.scrollTop,
      fn = fn || function() {};

    window.addEventListener("scroll", function() {
      var afterScrollTop = document.documentElement.scrollTop || document.body.scrollTop,
        delta = afterScrollTop - beforeScrollTop;

      if( delta === 0 ) return false;
        
        fn( delta > 0 ? "down" : "up" ,afterScrollTop);

      beforeScrollTop = afterScrollTop;
    }, false);
}

function b2HeaderTop(){
    const banner = document.querySelector('.header-banner-left');
    const header = document.querySelector('.site');
    const aside = document.querySelector('.bar-user-info');
    if(!banner) return
    let h = 96
    if(B2ClientWidth < 768){
        h = 77
    }

    b2scroll(function(direction,top) {

        if(top > h){
            if(direction === 'down'){
                if(banner.className.indexOf(' hidden') === -1){
                    banner.className += ' hidden'
                }
                if(header.className.indexOf(' up') === -1){
                    header.className += ' up'
                }
                if(B2ClientWidth > 768 && aside){
                    aside.style = 'padding-top:'+(h-28)+'px'
                }
                
              }else{
                banner.className = banner.className.replace(' hidden','')
                header.className = header.className.replace(' up','')
                if(B2ClientWidth > 768 && aside){
                    aside.style = 'padding-top:'+(h+10)+'px'
                }
              }
              if(header.className.indexOf(' action') === -1){
                header.className += ' action'
              }
              
        }else{
            header.className = header.className.replace(' action','')
            banner.className = banner.className.replace(' hidden','')
            header.className = header.className.replace(' up','')
            if(aside){
                aside.style = 'padding-top:'+(h+10)+'px'
            }
        }
    });
}

b2HeaderTop()

var b2NewsfalshesWidget = new Vue({
    el:'.widget-newsflashes-box',
    data:{
        options:[],
        list:''
    },
    mounted(){
        if(this.$refs.newsWidget){
            this.options = JSON.parse(this.$refs.newsWidget.getAttribute('data-json'))
            this.getList()
        }
    },
    methods:{
        getList(){
            this.$https.post(b2_rest_url+'getWidgetNewsflashes',Qs.stringify(this.options)).then(res=>{
                this.list = res.data
                this.$refs.gujia.style.display = 'none'
            })
        }
    }
})

Vue.component('weixin-bind', {
    props: ['show','url'],
    template:b2_global.weixin_bind,
    methods:{
        close(){
            this.$emit('close')
        }
    }
})

//微信绑定
var b2weixinBind = new Vue({
    el:'#weixin-bind',
    data:{
        show:false,
        url:''
    },
    methods:{
        close(){
            this.show = !this.show
        }
    }
})

function b2GetQueryVariable(variable)
{
       var query = window.location.search.substring(1);
       var vars = query.split("&");
       for (var i=0;i<vars.length;i++) {
               var pair = vars[i].split("=");
               if(pair[0] == variable){return pair[1];}
       }
       return(false);
}

function validate(evt) {
    var theEvent = evt || window.event;
  
    // Handle paste
    if (theEvent.type === 'paste') {
        key = event.clipboardData.getData('text/plain');
    } else {
    // Handle key press
        var key = theEvent.keyCode || theEvent.which;
        key = String.fromCharCode(key);
    }
    var regex = /[0-9]|\./;
    if( !regex.test(key) ) {
      theEvent.returnValue = false;
      if(theEvent.preventDefault) theEvent.preventDefault();
    }
}

Vue.component('bind-login', {
    props: ['show','type'],
    template:b2_global.bind_login,
    data(){
        return {
            locked:false,
            count:60,
            SMSLocked:false,
            data:{
                img_code:'',
                token:'',
                username:'',
                password:'',
                confirmPassword:'',
                code:''
            },
            eye:false,
            userData:[],
            success:''
        }
    },
    mounted(){
        let userData = JSON.parse(localStorage.getItem('userData'))
        if(userData){
            this.userData = userData
        }
    },
    methods:{
        close(){
            this.$emit('close')
        },
        showCheck(){
            if(this.type !== 'text' && this.type !== 'luo' && this.data.username && this.show){
                return true
            }
            return false
        },
        sendCode(){
            recaptcha.show = true
            recaptcha.type = 'bind'
            this.close()
        },
        sendSMS(){
            if(this.SMSLocked == true) return
            this.SMSLocked = true
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
        setToken(val){
            this.data.img_code = val.value
            this.data.token = val.token
            this.sendSMS()
        },
        submit(){
            if(this.locked) return
            this.locked = true
            this.$http.post(b2_rest_url+'bindUserLogin',Qs.stringify(this.data)).then(res=>{
                this.success = res.data
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
})

//强制绑定登录名
var b2bindLogin = new Vue({
    el:'#binding-login',
    data:{
        show:false,
        type:false
    },
    methods:{
        close(){
            this.show = !this.show
        },
        imgCodeAc(val){
            this.$refs.bindBox.setToken(val)
        }
    },
    watch:{
        type(val){
            if(val){
                this.show = true
            }
        }
    }
})

var b2CreditTop = new Vue({
    el:'.credit-top',
    data:{
        settings:[],
        data:''
    },
    mounted(){
        if(this.$refs.creditTop){
            this.settings = JSON.parse(this.$refs.creditTop.getAttribute('data-settings'));
            this.getList()
        }
    },
    methods:{
        getList(){
            this.$http.post(b2_rest_url+'getGoldTop',Qs.stringify(this.settings)).then(res=>{
                this.data = res.data
                this.$nextTick(()=>{
                    this.$refs.creditTopGujia.style.display = 'none'
                })
            })
        }
    }
})