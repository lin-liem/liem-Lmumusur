var carts = new Vue({
    el:'#carts-list',
    data:{
        data:'',
        picked:[],
        comment:'',
        address:'',
        showAddress:false,
        total:0,
        dataLength:0,
        pickedAll:false,
        step:1,
        //地址编辑
        showAddressBox:false,
        pickedAddress:'',
        addressEditData:{
            'address':'',
            'name':'',
            'phone':''
        },
        editAddressKey:'',
        coupons:'',
        pickedCoupon:[],
        couponTotal:0,
        //邮箱
        pickedEmail:'',
        showEmailBox:false,
        showEmail:false
    },
    mounted(){
        if(typeof(b2_carts_data) !== "undefined"){
            this.getItems(b2_carts_data.id)
        }else{
            let data = JSON.parse(localStorage.getItem('carts'))

            if(typeof data === 'object' && data !== null && Object.keys(data).length > 0){
                this.data = data
                this.init();
            }else{
                this.data = null
            }
            
        }
    },
    methods:{
        init(){
            if(this.data != 0 && this.data != null){
                Object.keys(this.data).forEach((key)=>{
                    this.picked.push(key)
                    if(this.data[key].commodity === 1){
                        this.showAddress = true
                    }
                    this.total += Calc.Mul(this.data[key].price.current_price,this.data[key].count);
                    this.dataLength++
                    this.pickedAll = true
                });

                this.getCoupons()
                this.getAddress()
                this.getEmail()
            }
        },
        getCoupons(){
            let userData = JSON.parse(localStorage.getItem('userData'))
            if(!userData){
                return
            }

            let ids = {
                'ids':this.picked
            }
            this.$http.post(b2_rest_url+'getCouponsByPostId',Qs.stringify(ids)).then((res)=>{
                this.coupons = res.data
                if(this.pickedCoupon.length > 0){
                    for (let i = 0; i < this.pickedCoupon.length; i++) {
                        if(this.coupons.hasOwnProperty(this.pickedCoupon[i]) === false){
                            this.pickedCoupon.splice(i,1)
                        }
                    }
                }
            })
        },
        couponClass(item){
            if(item.expiration_date.expired) return 'stamp04'
            if(item.products.length > 0) return 'stamp01'
            if(item.cats.length > 0) return 'stamp02'
            return 'stamp03'
        },
        pickedCouponArg(id){
            if(this.pickedCoupon.indexOf(id) !== -1){
                this.pickedCoupon.splice(this.pickedCoupon.indexOf(id),1)
            }else{
                this.pickedCoupon.push(id)
            }
        },
        couponTotalReset(){
            this.couponTotal = 0;
            for (let i = 0; i < this.pickedCoupon.length; i++) {
                this.couponTotal = Calc.Add(this.coupons[this.pickedCoupon[i]].money,this.couponTotal)  
            }
        },
        totalPay(){
            let total = Calc.Sub(this.total,this.couponTotal);
            if(total < 0) return 0
            return total
        },
        getItems(id){
            let ids = {
                ids:[id],
                return:{
                    'images':0,
                    'attrs':0
                }
            }
            this.$http.post(b2_rest_url+'getShopItemsData',Qs.stringify(ids)).then((res)=>{
                this.data = res.data
                this.data[id].count = b2_carts_data.count
                this.init()
            })
            
        },
        emptyData(){
            if(typeof this.data === 'object' && this.data !== null){
                return true
            }

            return false
        },
        getEmail(){
            this.$http.post(b2_rest_url+'getEmail').then(res=>{
                this.pickedEmail = res.data
            })
        },
        getAddress(){
            this.$http.post(b2_rest_url+'getAddresses').then(res=>{
                this.address = res.data
                this.pickedAddress = this.address.default
            })
        },
        mul(price,count){
            return Calc.Mul(price,count,2)
        },
        countAdd(key){
            if(this.data[key].count >= this.data[key].stock.total - this.data[key].stock.sell) return
            if(this.picked.indexOf(key) !== -1){
                this.total = Calc.Add(this.total,this.data[key].price.current_price)
            }
            this.data[key].count++
        },
        countSub(key){
            if(this.data[key].count <=1 ) return
            if(this.picked.indexOf(key) !== -1){
                this.total = Calc.Sub(this.total,this.data[key].price.current_price)
            }
            this.data[key].count--
        },
        totalMoney(){
            return Calc.Add(this.total,0,2);
        },
        totalReset(){
            this.showAddress = false
            this.showEmail = false
            this.total = 0
            for (let i = 0; i < this.picked.length; i++) {
                if(this.data[this.picked[i]].commodity === 1){
                    this.showAddress = true
                }

                if(this.data[this.picked[i]].commodity === 0){
                    this.showEmail = true
                }
                
                this.total += Calc.Mul(this.data[this.picked[i]].price.current_price,this.data[this.picked[i]].count);
            }
        },
        allPicked(){
            if(this.data != 0 && this.data != null){
                Object.keys(this.data).forEach((key)=>{
                    if(this.picked.indexOf(key) === -1){
                        this.picked.push(key)
                    }
                });
            }
        },
        //关闭弹窗
        close(){
            this.showAddressBox = false
            this.showEmailBox = false
        },
        emptyAddress(){
            if(this.address === '') return false

            if(!this.emptyData()) return false
            
            if(this.pickedAddress === '') return false

            return true
        },
        deleteAddress(key){
            var r = confirm("确定要删除这个地址吗？");
            if (r == true) {
                this.$http.post(b2_rest_url+'deleteAddress','key='+key).then(res=>{
                    if(res.data){
                        this.address.addresses = res.data.address;
                        if(key === this.address.default){
                            this.address.default = res.data.default
                        }
                        if(this.pickedAddress === key){
                            this.pickedAddress = res.data.default
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
            return
        },
        pickedAddressAc(key){
            this.pickedAddress = key
            this.close()
        },
        editAddress(key){
            this.editAddressKey = key
            this.addressEditData = this.address.addresses[key]
        },
        addNewAddress(){
            this.editAddressKey = uuid(8, 16);
            this.addressEditData = []
        },
        saveAddress(){
            this.$http.post(b2_rest_url+'saveAddress','address='+this.addressEditData.address+'&name='+this.addressEditData.name+'&phone='+this.addressEditData.phone+'&key='+this.editAddressKey).then(res=>{
                this.address.addresses = res.data.address;
                this.pickedAddressAc(this.editAddressKey)
                this.editAddressKey = ''
                this.key = ''
            }).catch(err=>{
                this.$toasted.show(err.response.data.message, { 
                    theme: 'primary', 
                    position: 'top-center', 
                    duration : 4000,
                    type:'error'
                })
            })
        },
        //只显示选中商品
        pickedProducts(key){
            if(this.picked.indexOf(key) !== -1) return true
            return false
        },
        //支付
        pay(){
            let userData = JSON.parse(localStorage.getItem('userData'))
            if(!userData){
                login.show = true
                return
            }

            if(this.showAddress === true && !this.pickedAddress){
                this.$toasted.show('请添加您的收货地址！', { 
                    theme: 'primary', 
                    position: 'top-center', 
                    duration : 4000,
                    type:'error'
                })
                return
            }

            if(this.showEmail === true && !this.pickedEmail){
                this.$toasted.show('请添加您的邮箱地址！', { 
                    theme: 'primary', 
                    position: 'top-center', 
                    duration : 4000,
                    type:'error'
                })
                return
            }

            this.step = 2
            let data = {
                'products':this.getPickedProducts(),
                'content':this.comment,
                'address':this.showAddress ? this.pickedAddress : '',
                'coupons':this.pickedCoupon,
                'email':this.pickedEmail ? this.pickedEmail : ''
            }
            
            b2DsBox.data = {
                'title':'购买',
                'order_price':this.totalPay(),
                'order_type':'g',
                'post_id':0,
                'order_value':JSON.stringify(data),
            }
            b2DsBox.show = true;
        },
        getPickedProducts(){
            let data = [];
            Object.keys(this.data).forEach((key)=>{
                if(this.picked.indexOf(key) !== -1){
                    data.push({'id':key,'count':this.data[key]['count']})
                }
            });

            return data;
        },
        deleteCartsItem(key){
            b2AsideBar.deleteCartsItem(key)
        },
        deleteAll(){
            b2AsideBar.deleteCarts()
            this.init()
        },
        orderPage(){
            if(userTools.userData){
                return userTools.userData.user_link+'/orders'
            }
        },
        buyDisabeld(){
            if(this.showAddress === true && !this.pickedAddress){
                return true
            } 

            return false;
        }
    },
    watch:{
        pickedCoupon(val){
            this.couponTotalReset()
        },
        pickedAll(val){
            if(val){
                this.allPicked()
            }else{
                if(this.picked.length === this.dataLength){
                    this.picked = []
                }
            }
        },
        picked(val){
            if(val.length !== this.dataLength){
                this.pickedAll = false
            }else{
                this.pickedAll = true
            }
            this.getCoupons()
            this.totalReset()
        }
    }
})