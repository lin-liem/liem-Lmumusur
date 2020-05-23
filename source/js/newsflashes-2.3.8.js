var b2Newsflashes = new Vue({
    el:'.news-content',
    data:{
        login:'',
        showPostFrom:false,
        locked:false,
        data:{
            title:'',
            content:'',
            tag:'',
            from:'',
            img:{
                url:'',
                id:''
            }
        },
        locked:false,
        paged:1,
        list:'',
        pages:0,
        term:0,
        //分页
        selecter:'news-list-box',
        opt:{
            paged:'',
            term:''
        },
        api:'getNewsflashesList'
    },
    mounted(){
        let userData = JSON.parse(localStorage.getItem('userData'))
        if(userData){
            this.login = true
        }else{
            this.login = false
        }

        if(this.$refs.paged){
            this.data.tag = this.$refs.tag.getAttribute('data-tag')

            this.opt.paged = this.$refs.paged.getAttribute('data-paged')
            this.opt.term = this.$refs.paged.getAttribute('data-termid') ? this.$refs.paged.getAttribute('data-termid') : 0
    
            autosize(this.$refs.newsTextarea);
    
            lazyLoadInstance.update()
    
            this.$refs.goldNav.go(this.opt.paged,'comment',true)
            if(B2ClientWidth > 768){
                new Flickity(document.querySelector('#menu-newsflashes'),{
                    pageDots: false,
                    groupCells: true,
                    draggable: true,
                    prevNextButtons: false,
                    freeScroll: false,
                    wrapAround:false,
                    selectedAttraction:0.15,
                    friction:1,
                    freeScrollFriction: 0.1,
                    cellAlign: 'left'
                });
            }
        }

        
    },
    methods:{
        get(data){
            if(this.list === ''){
                this.list = data.data
            }else{
                this.list = Object.assign({}, this.list, data.data)
            }
            this.pages = data.pages
            this.locked = false
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
            formData.append("type", 'newsflashes')

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
                    this.data.img.url = res.data.url
                    this.data.img.id = res.data.id
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
        postNewsflashes(){
            if(!this.login){
                login.show = true
                login.loginType = 1
                return
            }

            if(!userTools.role.newsflashes){
                this.$toasted.show('权限不足', { 
                    theme: 'primary', 
                    position: 'top-center', 
                    duration : 4000,
                    type:'error'
                })
                return
            }

            this.showPostFrom = !this.showPostFrom
        },
        submitNewsflashes(){
            if(this.locked == true) return
            this.locked = true

           if(!this.data.content || !this.data.title){
                this.$toasted.show('快讯标题和内容必填', { 
                    theme: 'primary', 
                    position: 'top-center', 
                    duration : 4000,
                    type:'error'
                })
                this.locked = false
                return
           }

           this.$http.post(b2_rest_url+'submitNewsflashes',Qs.stringify(this.data)).then(res=>{
               
                this.$toasted.show('发布成功', {
                    theme: 'primary', 
                    position: 'top-center', 
                    duration : 4000,
                    type:'success'
                })
                //this.showPostFrom = false
                this.data = {
                    title:'',
                    content:'',
                    tag:'',
                    from:'',
                    img:{
                        url:'',
                        id:''
                    }
                },
                this.showPostFrom = false
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
        getList(){
            this.$http.post(b2_rest_url+'getNewsflashesList','paged='+this.paged+'&term_id='+this.term).then(res=>{
                
                this.list = res.data.data
                this.pages = res.data.pages
                this.locked = false

                this.paged++
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
        vote(id,type,key1,key2){

            if(!this.login){
                login.show = true
                login.loginType = 1
                return
            }

            if(this.locked == true) return
            this.locked = true

            this.$http.post(b2_rest_url+'postVote','type='+type+'&post_id='+id).then(res=>{
                this.list[key1][key2]['vote']['up'] = parseInt(this.list[key1][key2]['vote']['up']) + parseInt(res.data.up)
                this.list[key1][key2]['vote']['down'] = parseInt(this.list[key1][key2]['vote']['down']) + parseInt(res.data.down)

                if(res.data.up > 0){
                    this.list[key1][key2]['vote'].up_isset = true
                }else{
                    this.list[key1][key2]['vote'].up_isset = false
                }

                if(res.data.down > 0){
                    this.list[key1][key2]['vote'].down_isset = true
                }else{
                    this.list[key1][key2]['vote'].down_isset = false
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
        openWin(url,type,key1,key2){

            if(type == 'weibo'){
                url = url+'&pic='+this.list[key1][key2]['img']
            }else{
                url = url+'&pics='+this.list[key1][key2]['img']
            }

            openWin(url,type,500,500)
        }
    }
})