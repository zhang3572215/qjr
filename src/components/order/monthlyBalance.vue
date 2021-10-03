<template>
    <div>
        <head-Piece>
            <template slot="content">月结</template>
        </head-Piece>
        <div class='content-step' :class=' showDistance?"showTop":""'>
            <div class='step-info'>
                <div class='step-num'>
                    1
                    <div class='step-title'>
                        提交订单
                    </div>
                </div>
                <div class='step-line'>
                </div>
            </div>
            <div class='step-info'>
                <div class='step-num'>
                    2
                    <div class='step-title'>
                        签约电子合同
                    </div>
                </div>
                <div class='step-line'>
                </div>
            </div>
            <div class='step-info'>
                <div class='step-num'>
                    3
                    <div class='step-title'>
                        安排服务
                    </div>
                </div>
                <div class='step-line'>
                </div>
            </div>
            <div class='step-info'>
                <div class='step-num'>
                    4
                    <div class='step-title'>
                        电子发票
                    </div>
                </div>
                <div class='step-line'>
                </div>
            </div>
            <div class='step-info'>
                <div class='step-num'>
                    5
                    <div class='step-title'>
                        按月结账
                    </div>
                </div>

            </div>
           
        </div>
        <div class='payment-method'>
              <div>付款方式</div>
              <div class='payment-method-right'>
                 <van-radio-group v-model="payType" icon-size='14' direction="horizontal">
                   <van-radio name="1">在线支付</van-radio>
                   <van-radio name="2">对公转账</van-radio>
                 </van-radio-group>    
              </div>
        </div>
        
        <div class="content-list">
        	<div v-for='(item,index) in list'>
        		<div class='list' v-if='item.type == 2'>
        			<div class='list-head' @click='tabFalg(index,item.id)'>
        				<div>{{item.head}}</div>
        				<!-- <radio value="" class='radios' :checked="flag" @click='tabFalg' style="transform: scale(0.72);" /> -->
        				<div class='radios' :class='item.status===true?"signColor":""'>
        					<img src='../../assets/dui.png'></img>
        				</div>
        			</div>
        			<div class='invoice-info'>
        				<div>{{item.code}}</div>
        				<!-- <div>增值税普通发票</div> -->
        				<div>开户银行账号：<span>{{item.bankNo}}</span></div>
        				<div>{{item.bankName}}</div>
        				<div>
        					增值税专用发票
        				</div>
        			</div>
        			<div class='list-btn'>
        				<div class='btn-edit' @click="edit(item)">
        					<div>编辑</div>
        					<img src='../../assets/edit.png'></img>
        				</div>
        				<div class='btn-del' @click="del(item.id)">
        					<div>删除</div>
        					<img src='../../assets/del.png'></img>
        				</div>
        			</div>
        		</div>
        		<div class='list' v-if='item.type==1'>
        			<div class='list-head' @click='tabFalg(index,item.id)'>
        				<div>{{item.head}}</div>
        				<div class='radios' :class='item.status===true?"signColor":""' >
        					<img src='../../assets/dui.png'></img>
        				</div>
        				<!-- <radio value="" class='radios' :checked="flag" @click='tabFalg' style="transform: scale(0.72);" /> -->
        			</div>
        			<div class='invoice-info'>
        				<div>{{item.code}}</div>
        				<div>增值税普通发票</div>
        			</div>
        			<div class='list-btn'>
        				<div class='btn-edit' @click="edit(item)">
        					<div>编辑</div>
        					<img src='../../assets/edit.png'></img>
        				</div>
        				<div class='btn-del' @click="del(item.id)">
        					<div>删除</div>
        					<img src='../../assets/del.png'></img>
        				</div>
        			</div>
        		</div>
        	</div>
        </div>
        <div class='addInvoice' @click="addInvoice">
              <img src="../../assets/add-1.png" alt="">
              <span>新增开票信息</span>
        </div>
        <div class='remarks'>
            <span>备注：</span><span>收票邮箱同时作为电子合同接受邮箱，如有其他情况，请先联系在线客服或者拨打客服热线。</span><span @click="collage">前往联系客服</span>
        </div>
        <div class='confirm'  @click="confirm">
            确认已签约
        </div>
        <div class='noConfirm'  @click="noConfirm">
            暂不确认签约
        </div>
        	<Load v-if='isLoad'></Load>
        <customer v-if='collageCurstomer' @priming='toCustomers' @define='toPhone' :typeInfo='typeMsg'></customer>
        <showMoadel v-if='modelFlag' :cont='"是否要删除?"' :cancelText='"取消"' :confirmText='"确定"' @define='confirms' @remove='cancel'></showMoadel>
    </div>
</template>

<script>
    import * as axios from '../../untils/ajax.js'
     import customer from './../customerService.vue'
     import {
     	mapGetters,mapActions
     } from 'vuex'
    export default{
        data(){
            return{
                isLoad:false,
                payType:'1',
                list:[],
                pageSize:100,
                pageNo:1,
                collageCurstomer:false,
                 typeMsg: '其他咨询',
                 id:'',
                 payMoney:'',
                 invoiceId:'',
                 modelFlag:false,
                 showDistance:false
            }
        },
        components:{
            customer
        },
        computed:{
           ...mapGetters(['showInvoice'])
        },
        methods:{
            ...mapActions(['addDesCont']),
            edit(e) {
            	console.log(e)
            	var info = {}
            	info['type'] = e.type
            	info['head'] = e.head
            	info['id'] = e.id
            	info['code'] = e.code
            	info['content'] = e.content
            	if (e.type == 1) {
            		console.log(44444)
            		info['emails'] = e.emails
            	} else {
            		info['address'] = e.address
            		info['mobile'] = e.mobile
            		info['bankName'] = e.bankName
            		info['bankNo'] = e.bankNo
            	}
            	if (this.signInfo == null) {
            		this.signInfo = "开票信息"
            	}
            	this.$router.push({
            		'name': 'specialInvoice',
            		params: info
            	})
            	// uni.navigateTo({
            	// 	url:'/pages/my/specialInvoice?info='+JSON.stringify(info) 
            	// })
            },
            del(id) {
            	this.modelFlag = true
            	this.id = id
            },
            cancel() {
            	this.modelFlag = false
            },
            confirms() {
            	this.modelFlag = false
            	let that = this
            	let params = new FormData()
            	params.append('id', this.id)
            
            	axios.post('/office/t-office-invoice-config/deleteInvoiceConf', params).then(res => {
            		if (res.meta.success) {
            			// that.toast.success('删除成功')
            
            
            			this.successInfo = '删除成功'
            			this.isSuccess = true
            
            			setTimeout(() => {
            				that.isSuccess = false
            			}, 1000)
            			that.pageNo = 1
            			that.list = []
            			that.getList(1)
            		} else {
            			// that.toast.fail('删除失败')
            			this.$toast({
            				message: '删除失败',
            				duration: 1500
            			})
            		}
            	})
            },
            tabFalg(index,id) {
            	let signFlag=this.list[index].status
            	this.list=this.list.map(item => {
            		 item.status=false
            		 return item
            	})
            	if(signFlag){
            		this.list[index].status =false
            		this.invoiceId=''
            	}else{
            		this.list[index].status = !this.list[index].status
            		this.invoiceId=id
            	}
            	
            	
            },
            getList(des) {
            	let that = this
            	// let params = new FormData()
            	// params.append('pageSize', that.pageSize)
            	// params.append('pageNo', that.pageNo)
            	if (!des) {
            		this.isLoad = true
            	}
            
            	let params = new FormData()
            	params.append('pageSize', this.pageSize)
            	params.append('pageNo', this.pageNo)
            	params.append('content', this.typeContent)
            	axios.post('/office/t-office-invoice-config/getInvoiceConfByUserId', params).then(res => {
            		if (res.meta.success) {
            			that.total = Number(res.data.totalCounts)
            			var service = res.data.records.map(item => {
            				item.status = false
            				return item
            			})
            			if (that.pageNo === 1) {
            				that.list = service
            			} else {
            				that.list = that.list.concat(service)
            			}
            			if (this.list.length == 0) {
            				this.showEmpty = true
            			} else {
            				this.showEmpty = false
            			}
            			this.isLoad = false
            		} else {
            			this.isLoad = false
            			// this.toast.fail('获取数据失败')
            			this.$toast({
            				message: res.meta.msg,
            				duration: 1500
            			})
            		}
            
            	})
            },
            collage(){
                this.collageCurstomer=!this.collageCurstomer
            },
            toCustomers() {
                this.collageCurstomer = !this.collageCurstomer
                // 允许页面滚动
                document.body.style.overflow = ''
                document.body.removeEventListener('touchmove', this.bodyScroll, {
                    passive: false
                });
            
            },
            //拨打客服电话
            toPhone() {
                this.collageCurstomer = !this.collageCurstomer
                window.location.href = 'tel://4008290037'
                // 允许页面滚动
                document.body.style.overflow = ''
                document.body.removeEventListener('touchmove', this.bodyScroll, {
                    passive: false
                });
            
            },
            confirm(){
                let that = this
                if(this.invoiceId.length<=0){
                    this.$toast({
                        message:'请选择发票',
                        duration:1000
                    })
                    return
                }
                
                this.isLoad = true     
                let params = new FormData()
                params.append('orderId', this.id)
                params.append('payMoney', this.payMoney)
                params.append('payType', this.payType)
                params.append('invoiceId', this.invoiceId)
                axios.post('/office/t-office-monthly-statement/insertMonthStatement',params).then(res => {
                    this.isLoad=false
                    if(res.meta.success){
                        let info ={
                            id:this.id
                        }
                       this.$router.push({'name':'monthlyOrderList',params:info})
                     
                    }else{
                         this.$toast({
                             message:res.meta.msg
                         })
                    }
                })
            },
            noConfirm(){
              
                this.addDesCont('car')
                this.$router.push({'name':'index'})
            },
            addInvoice() {
            	this.$router.push({
            		'name': 'specialInvoice'
            	})
            	// uni.navigateTo({
            	// 	url: '/pages/my/specialInvoice'
            	// })
            },
        },
        created() {
            this.getList()
            this.id=this.$route.params.id
            this.payMoney=this.$route.params.payableMoney
            // 判断是否微信浏览器
            if (window.localStorage.getItem('wxBrowser')) {
            	this.showDistance = true
            	
            }
            
        },
        watch:{
            showInvoice(newval,oldval) {
            	this.getList()
            }
        }
    }
</script>

<style scoped>
    .content-step {
        display: flex;
        margin: 0.1rem auto 0 auto;
        width: 6.4rem;
        font-size: 0.26rem;
        display: flex;
        display: -webkit-box;
        display: -webkit-flex;
        align-items: center;
        -webkit-box-align: center;
        -webkit-align-items: center;
        justify-content: center;
        -webkit-box-pack: center;
        -webkit-justify-content: center;
    }
     .content-step.showTop{
          margin-top: 0.4rem;
     }
    .step-info {
        display: flex;
        display: -webkit-box;
        display: -webkit-flex;
        align-items: center;
        -webkit-box-align: center;
        -webkit-align-items: center;
    }
     
    .step-line {
        height: 1px;
        width: 1rem;
        background: #c5cad4;
        margin:0 0.2rem;
    }
    
    .step-num {
        position: relative;
        font-weight: 550;
    }
    
    .step-num .step-title {
        width: 1.2rem;
 
        text-align: center;
        position: absolute;
        bottom: -0.5rem;
        left: 50%;
        transform: translateX(-50%);
        font-size: 0.24rem;
        font-weight: 500;
    }
    .step-info:nth-child(2) .step-num .step-title{
        width: 1.8rem;
    }
    .payment-method{
        height: 0.90rem;
        width: 6.94rem;
        box-sizing: border-box;
        padding: 0 0 0 0.16rem;
        display: flex;
        display: -webkit-box;
        display: -webkit-flex;
        justify-content: space-between;
        -webkit-box-pack: justify;
        -webkit-justify-content: space-between;
        align-items: center;
        -webkit-box-align: center;
        -webkit-align-items: center;
        background: #fff;
        margin: 0.90rem auto 0.2rem auto;
        border-bottom: 1px solid #eee;
 
        border-radius:  0.20rem;
        box-shadow: 0.05rem 0.05rem 0.10rem  #ececee;
        font-size: 0.28rem;
    }
    .payment-method-right{
        font-size: 0.22rem;
        line-height: 0.22rem;
    }
    .content-list {
    	/* padding-bottom: 1rem; */
    }
    
    .list {
    	background: #fff;
    	margin: 0.20rem auto;
    	border-radius: 0.15rem;
    	width: 6.94rem;
    	padding-bottom: 0.28rem;
    	box-shadow: 0.05rem 0.05rem 0.10rem #ececee;
    }
    
    .list:nth-child(1) {
    	margin-top: 0 !important;
    }
    
    .list .list-head {
    	height: 0.82rem;
    	display: flex;
    	display: -webkit-box;
    	display: -webkit-flex;
    	justify-content: space-between;
    	-webkit-box-pack: justify;
    	-webkit-justify-content: space-between;
    	align-items: center;
    	-webkit-box-align: center;
    	-webkit-align-items: center;
    	font-size: 0.3rem;
    	padding: 0 0.16rem;
    	border-bottom: 1px solid #eee;
    }
    
    .invoice-info {
    	padding: 0.18rem 0.20rem 0.35rem 0.20rem;
    	font-size: 0.28rem;
    	color: #707070;
    }
    
    .invoice-info div {
    	margin-bottom: 0.10rem;
    }
    
    .invoice-info div:last-child {
    	margin-bottom: 0px;
    }
    
    .list-btn {
    	display: flex;
    	display: -webkit-box;
    	display: -webkit-flex;
    	align-items: center;
    	-webkit-box-align: center;
    	-webkit-align-items: center;
    	justify-content: flex-end;
    	-webkit-box-pack: end;
    	-moz-justify-content: flex-end;
    	-webkit-justify-content: flex-end;
    	font-size: 0.26rem;
    	padding: 0 0.20rem;
    }
    
    .list .list-btn .btn-edit {
    	display: flex;
    	display: -webkit-box;
    	display: -webkit-flex;
    	align-items: center;
    	-webkit-box-align: center;
    	-webkit-align-items: center;
    	color: #0396ff;
    	margin-right: 0.35rem;
    }
    
    .list-btn .btn-edit img {
    	width: 0.24rem;
    	height: 0.24rem;
    	margin-left: 0.08rem;
    }
    
    .list-btn .btn-edit>div {
    	margin-top: 0.02rem;
    }
    
    .list .list-btn .btn-del {
    	display: flex;
    	display: -webkit-box;
    	display: -webkit-flex;
    	align-items: center;
    	-webkit-box-align: center;
    	-webkit-align-items: center;
    	/* align-content: center; */
    	color: #5f5f6b;
    
    }
    
    .list-btn .btn-del img {
    	width: 0.28rem;
    	height: 0.28rem;
    	margin-left: 0.08rem;
    }
    
    .list-btn .btn-del>div {
    	margin-top: 0.02rem;
    }
    
    
    .radios {
    	width: 0.38rem;
    	height: 0.38rem;
    	border-radius: 50%;
    	border: 1px solid #ddd;
    	display: flex;
    	display: -webkit-box;
    	display: -webkit-flex;
    	align-items: center;
    	-webkit-box-align: center;
    	-webkit-align-items: center;
    	justify-content: center;
    	-webkit-box-pack: center;
    	-moz-justify-content: center;
    	-webkit-justify-content: center;
    }
    
    .radios.signColor {
    	background: #0396ff;
    	border: none;
    }
    
    .radios img {
    	width: 0.25rem;
    	height: 0.25rem;
    }
    .addInvoice{
        margin: 0 auto;
        width: 6.94rem;
        height:0.58rem ;
        box-sizing: border-box;
        border: 1px solid #c5cad4;
        border-radius: 0.15rem;
        font-size: 0.22rem;
        display: flex;
        display: -webkit-box;
        display: -webkit-flex;
        justify-content:  center;
        -webkit-box-pack:  center;
        -webkit-justify-content:  center;
        align-items: center;
        -webkit-box-align: center;
        -webkit-align-items: center;
        color: #84848c;
    }
    .addInvoice img{
        width: 0.25rem;
        height: 0.25rem;
        margin-right: 0.15rem;
    }
    .remarks{
/*        transform: scale(0.95);
        -webkit-transform: scale(0.95); */
        width: 6.94rem;
        margin: 0 auto;
        font-size: 0.2rem;
        /* text-align: center; */
        margin-top: 0.15rem;
    }
    .remarks span:nth-child(1){
        color: #ff3823;
    }
    .remarks span:nth-child(2){
        color: #97979f;
    }
    .remarks span:nth-child(3){
        font-size: 0.18rem;
        color: #3297ff;
        margin-left: 0.1rem;
    }
    .confirm{
        height: 0.8rem;
        width: 4.2rem;
        background:#3297ff;
        color: #fff;
        line-height: 0.8rem;
        text-align: center;
        font-size: 0.32rem;
        margin: 0.7rem auto 0 auto;
        border-radius: 0.15rem;
    }
    .noConfirm{
        height: 0.8rem;
        width: 4.2rem;
        background: #eee;
        color: #aaa;
        line-height: 0.8rem;
        text-align: center;
        font-size: 0.32rem;
        margin: 0.4rem auto 0.3rem auto;
        border-radius: 0.15rem;
    }
</style>

<style>
   /*  .payment-method .van-radio__icon--checked .van-icon, .payment-method .van-radio__icon .van-icon{
        transform: scale(0.8) !important;
    } */
</style>