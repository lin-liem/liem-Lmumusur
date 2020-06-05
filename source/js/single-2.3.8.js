var lazyLoadInstance = new LazyLoad({
    elements_selector: ".entry-content img"
});

var b2SingleMeta = new Vue({
    el:'#post-meta',
    data:{
        following:false,
        self:true,
        showMeta:false,
        locked:false,
        postData:[]
    },
    mounted(){
        this.$http.post(b2_rest_url+'checkFollowing','user_id='+b2_global.author_id+'&post_id='+b2_global.post_id).then(res=>{
            this.self = res.data.self
            this.following = res.data.following
            this.postData = res.data
            b2DsBox.user = res.data.current_user
            b2DsBox.author = res.data.author
            b2Ds.data = res.data.ds_data
            payCredit.user = res.data.current_user
            payCredit.author = res.data.author
        })
    },
    methods:{
        followingAc(){
            let userData = JSON.parse(localStorage.getItem('userData'))
            if(!userData){
                login.show = true
            }else{
                this.$http.post(b2_rest_url+'AuthorFollow','user_id='+b2_global.author_id).then(res=>{
                    this.following = !this.following
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
                b2Dmsg.userid = b2_global.author_id
                b2Dmsg.show = true
            }
        }
    }
})

var postType5 = new Vue({
    el:'.post-style-5-top',
    data:{
        videos:[],
        user:'',
        player:'',
        index:0,
        show:true,
        title:'',
        showViews:false
    },
    mounted(){
        if(!this.$refs.postType5) return
        let post_id = this.$refs.postType5.getAttribute('data-id')
        this.$http.post(b2_rest_url+'getPostVideos','post_id='+post_id).then(res=>{
            this.videos = res.data.videos
            if(this.videos.length <= 1){
                this.$refs.videoList.style.display = 'none'
            }
            if(this.user.allow){
                this.show = false
            }
            this.user = res.data.user
            this.list = res.data.list
            this.title = res.data.title
            if(this.videos.length > 0){
                let url = ''
                if(this.user.allow){
                    url = this.videos[0].url
                }else{
                    url = this.videos[0].view
                    if(url){
                        this.showViews = true
                    }else{
                        this.showViews = false
                    }
                }

                this.player = new DPlayer({
                    container: document.getElementById('post-style-5-player'),
                    screenshot: false,
                    video: {
                        url: url,
                        pic: this.videos[0].poster,
                    },
                    mutex:true,
                    hotkey:true,
                    preload:res.data.auto === '1' ? 'auto' : 'none',
                    logo:b2_global.default_video_logo,
                    autoplay:res.data.auto && url ? true : false
                })

                if(this.videos.length > 1){
                    //视频播放结束，切换下一条
                    this.player.on('ended',()=>{
                        if(this.index+1 < this.videos.length){
                            this.index = this.index + 1
                            this.select(this.index)
                        }
                    })

                    this.player.on('play',()=>{
                        document.getElementById('post-style-5-player').querySelectorAll('.dplayer-video-current')[0].style="object-fit:contain"
                    })

                    this.player.on('canplay', ()=>{
                        Vue.nextTick(()=>{
                            b2SidebarSticky()
                        })
                    });
                }
            }

            b2playerInit()
        })
    },
    methods:{
        select(index){
            this.index = index
            let url
            if(this.user.allow){
                url = this.videos[index].url
            }else{
                url = this.videos[index].view
            }
            this.player.switchVideo({
                url:url,
                pic:this.videos[index].poster
            })

            if(this.user.allow){
                this.player.play()
            }else{
                this.show = true
            }

        },
        goComment(){
            this.$scrollTo('#comments', 300, {offset: -50})
        },
        showAc(){
            this.show = !this.show
            if(this.show === true){
                this.player.pause()
            }
        },
        listSlide(){
            console.log(11)
            var flkty = new Flickity(this.$refs.videoListIn, {
                cellAlign: 'left',
                contain: true
              });
        },
        play(){
            this.show = false
            this.player.play()
        },
        pay(){
            let userData = JSON.parse(localStorage.getItem('userData'))
            if(!userData){
                login.show = true
            }else{
                b2DsBox.data = {
                    'title':this.title,
                    'order_price':this.user.role.value,
                    'order_type':'v',
                    'post_id':b2_global.post_id
                }
                b2DsBox.show = true;
                b2DsBox.showtype = 'normal'
            }
        },
        credit(){
            let userData = JSON.parse(localStorage.getItem('userData'))
            if(!userData){
                login.show = true
            }else{
                payCredit.data = {
                    'title':this.title,
                    'order_price':this.user.role.value,
                    'order_type':'v',
                    'post_id':b2_global.post_id
                }
                payCredit.show = true;
            }
        },
        login(type){
            login.show = true
            login.loginType = type
        }
    }
})

function b2playerInit(){
    let player = document.querySelectorAll('.dplayer-video');
    if(player.length > 0){
        for (let i = 0; i < player.length; i++) {
            player[i].setAttribute('x5-video-player-type','h5-page')
            player[i].setAttribute('x5-video-player-fullscreen','true')
            player[i].setAttribute('playsinline','true')
            player[i].setAttribute('webkit-playsinline','true')
        }
    }
    
}

//播放远程视频
function b2SingleVideo(){
    let boxes = document.querySelectorAll('.entry-content .content-video-box');

    if(boxes.length > 0){
        boxes.forEach(e => {
            e.onclick = (even)=>{
                let url = even.target.parentNode.getAttribute('data-video-url');
                if(url){
                    axios.post(b2_rest_url+'getVideoHtml','url='+encodeURIComponent(url)).then((res)=>{
                        if(res.data.indexOf('class="smartideo"') !== -1){
                            e.innerHTML = res.data
                        }
                    })
                }
            }
        });
    }
}
b2SingleVideo()

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
			// imgs[i].className.indexOf('loading') !== -1 
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

//显示隐藏短代码内容
function showHideContent(){
    let box = document.querySelectorAll('.entry-content .content-show-roles.b2-mark');

    if(box.length > 0){

        let h_axios = axios
        let userData = JSON.parse(localStorage.getItem('userData'))

        if(userData){
            h_axios.defaults.headers.common['Authorization'] = 'Bearer ' + userData.token
        }

        h_axios.post(b2_rest_url+'getHiddenContent','&id='+b2_global.post_id).then((res)=>{

            if(res.status == 200){
                for (let i = 0; i < box.length; i++) {

                    if(typeof(res.data) == 'object'){
                        box[i].innerHTML = res.data[i]
                        box[i].previousElementSibling.remove()
                        let parentSib = box[i].parentNode.previousElementSibling;
                        parentSib.style.backgroundImage = 'none'
                        parentSib.children[0].className = parentSib.children[0].className.replace('b2-suo','b2-kaisuo')
                    }else{
                        box[i].innerHTML = res.data
                    }
                    
                    box[i].style.background = 'none'
                    box[i].style.minHeight = 'auto'
                    
                    b2VideoReset()
                    b2WidgetImageLoaded()
                }
            }

            setTimeout(()=>{
                b2AfterInnterHtml()
            },100)
        })
    }
}
showHideContent()

function b2AfterInnterHtml(){
    b2FileDown()
    b2SingleVideo()
    b2ImgZooming('.entry-content .content-show-roles img')
    if(typeof b2sidebar !== 'undefined'){
        b2SidebarSticky()
    }
}

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

        let userData = JSON.parse(localStorage.getItem('userData'))

        if(userData){
            this.data.link = new URL(this.data.link)
            this.data.link.searchParams.set('ref', userData.user_code)
            this.data.link = this.data.link.href
        }

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
            this.$http.post(b2_rest_url+'urlToBase64','url='+this.data.logo).then(res=>{
                this.logo = res.data;
                this.$http.post(b2_rest_url+'urlToBase64','url='+this.data.thumb).then(res=>{
                    this.thumb = res.data;
                    setTimeout(()=>{
                        this.html2canvas()
                    }, 0);
                });
            });
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
                    this.poster = canvas.toDataURL();
                    //console.log(imgData)
                    //this.poster = canvas.convertToJPEG(canvas, canvas.width, canvas.height);
                    //this.poster = URL.createObjectURL(this.base64ToBlob(imgData))
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
                b2loadScript(b2_global.site_info.site_uri+'/Assets/fontend/library/html2canvas.min.js',()=>{
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
        },
        postFavoriteAc(){
            let userData = JSON.parse(localStorage.getItem('userData'))
            if(!userData){
                login.show = true
            }else{
                if(this.locked == true) return
                this.locked = true

                this.$http.post(b2_rest_url+'userFavorites','post_id='+b2_global.post_id).then(res=>{
                    if(res.data == true){
                        this.postData.favorites_isset = true
                    }else{
                        this.postData.favorites_isset = false
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
        },
        vote(type){
            let userData = JSON.parse(localStorage.getItem('userData'))
            if(!userData){
                login.show = true
            }else{
                if(this.locked == true) return
                this.locked = true

                this.$http.post(b2_rest_url+'postVote','type='+type+'&post_id='+b2_global.post_id).then(res=>{

                    this.postData.up = parseInt(this.postData.up) + parseInt(res.data.up)
                    this.postData.down = parseInt(this.postData.down) + parseInt(res.data.down)
                    
                    if(res.data.up > 0){
                        this.postData.up_isset = true
                    }else{
                        this.postData.up_isset = false
                    }

                    if(res.data.down > 0){
                        this.postData.down_isset = true
                    }else{
                        this.postData.down_isset = false
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