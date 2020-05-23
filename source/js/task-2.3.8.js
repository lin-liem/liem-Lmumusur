var b2Task = new Vue({
    el:'#task',
    data:{
        taskData:'',
        locked:false
    },
    mounted(){
        if(this.$refs.task){
            this.getTaskData()
        }
    },
    methods:{
        getTaskData(){
            this.$http.post(b2_rest_url+'getTaskData').then(res=>{
                console.log(res)
                this.taskData = res.data
                if(this.taskData.task.task_mission.finish == 1){
                    this.locked = true
                }
                if(this.taskData.task_user.length == 0){
                    this.$nextTick(()=>{
                        this.$refs.userTask.style.display = 'none'
                    })
                }
            })
        },
        mission(type){
            if(type === 'task_mission'){
                let userData = JSON.parse(localStorage.getItem('userData'))
                if(!userData){
                    login.show = true
                }else{
                    if(this.locked == true) return
                    this.locked = true

                    this.$http.post(b2_rest_url+'userMission').then(res=>{
                        let msg = this.$toasted.show('签到中,请稍后...',{
                            theme: 'primary',
                            position: 'top-center',
                            duration : 2000,
                            type:'message'
                        })

                        setTimeout(()=>{
                            this.$set(this.taskData.task.task_mission,'finish',1)
                            this.$toasted.show('签到成功',{
                                theme: 'primary',
                                position: 'top-center',
                                duration : 2000,
                                type:'success'
                            })
                        },2005)
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
        }
    }
})