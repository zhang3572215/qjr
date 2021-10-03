<template>
    <div>
        <head-Piece>
            <template slot="content">订单</template>
        </head-Piece>
        <div>
            <div class='order-list' v-for='(item,index) in list'  :key='index'>
                <div class='list-head'>
                    <div>应付款金额</div>
                    <div class='list-head-right' v-if='item.status==1'>已付款</div>
                     <div class='list-head-right' v-if='item.status==2 && item.voucherNo.length==0' >未付款</div>
                </div>
                <div class='money'>
                    ￥{{item.payMoney}}
                </div>
                <div class='list-info'>
                    <div>
                        应付款月份
                    </div>
                    <div>
                        {{item.payMonth}}
                    </div>
                </div>
                <div class='list-info'>
                    <div>
                        总期数
                    </div>
                    <div>
                        {{item.periodNum}}
                    </div>
                </div>
                <div class='list-info'>
                    <div>
                        当前期数
                    </div>
                    <div>
                        {{item.periodNo}}
                    </div>
                </div>
                <div class='list-info'>
                    <div>
                        支付方式
                    </div>
                    <div v-if='item.payType==2'>
                        对公转账
                    </div>
                    <div v-else>
                        在线支付
                    </div>
                </div>
                <div class='pay'  v-if='item.status==2'>
                     <div class='pay-btn' v-if='item.payType==1'  @click="toPay(item)">
                         去付款
                     </div>
                     <div class='pay-btn' v-if='item.payType==2 && item.voucherNo.length==0'  @click="toPay(item)">
                         确认转账
                     </div>
                     <div class='pay-btn' v-if='item.payType==2 && item.voucherNo.length>0'  @click="toPay(item)">
                         修改凭证
                     </div>
                </div>

            </div>
            
        </div>
        	<Load v-if='isLoad'></Load>
    </div>
</template>

<script>
     import * as axios from '../../untils/ajax.js'
     export default{
         data(){
             return{
                 isLoad:false,
                 id:'',
                 list:[]
             }
         },
         methods:{
             getList(){
                  let params=new FormData()
                  params.append('orderId',this.id)
                  this.isLoad=true
                  axios.post('/office/t-office-monthly-statement/findMonthStatementRecord',params).then(res => {
                       this.isLoad=false
                       if(res.meta.success){
                            this.list=res.data.map(val => {
                                    if(val.payMonth){
                                         let date=val.payMonth.toString()
                                         let dateYear=date.substring(0,4)
                                        let dateMonth=date.substring(4)
                                        val.payMonth= dateYear+'-'+dateMonth
                                        val.dateMonth=dateMonth
                                       
                                    }
                                    return val
                            })
                       }else{
                           
                       }
                  })
             },
             toPay(e){
                 
                 if(e.payType==1){
                     let info={
                         monthly:e.payMonth,
                         id:e.id,
                         payMoney:e.payMoney,
                         orderId:this.id,
                          periodNo:e.periodNo
                     }
                     this.$router.push({'name':"monthlyPayment",params:info})
                 }else if(e.payType==2){
                     let info={
                         monthId:e.id,
                         payFlag:2,
                         id:this.id
                     }
                     this.$router.push({'name':"transferAccounts",params:info})
                 }
             
             }
         },
         created() {
             this.id=this.$route.params.id
             this.getList()
             
         }
     }
</script>

<style scoped>
    .order-list {
        width: 6.94rem;
        height: auto;
        background: #fff;
        padding: 0 0.28rem;
        box-sizing: border-box;
        margin: 0.2rem auto 0 auto;
        border-radius: 0.1rem;
    }
   .order-list:last-child{
       margin-bottom: 0.2rem;
   }
    .order-list .list-head {
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
        color: #141418;
        padding-top: 0.28rem;
    }

    .list-head-right {
        width: 1.7rem;
        font-size: 0.28rem;
        color: #ff3823;
        text-align: right;
    }

    .money {
        font-size: 0.56rem;
        color: #141418;
        margin: 0.1rem 0 0 -0.1rem;
    }

    .list-info {
        display: flex;
        display: -webkit-box;
        display: -webkit-flex;
        justify-content: space-between;
        -webkit-box-pack: justify;
        -webkit-justify-content: space-between;
        align-items: center;
        -webkit-box-align: center;
        -webkit-align-items: center;
        font-size: 0.26rem;
        color: #3d3d3d;
        margin-top: 0.2rem;
    }

    .list-info:nth-child(3) {
        margin-top: 0.15rem;
    }

    .list-info:last-child {
        padding-bottom: 0.28rem;
    }
    .pay{
        margin-top: 0.28rem;
        padding-bottom: 0.28rem;
        display: flex;
         justify-content: flex-end;
        -webkit-box-pack: end;
        -webkit-justify-content: flex-end;
         
    }
    .pay-btn{
        min-width: 1.36rem;
        height: 0.5rem;
        /* box-sizing: border-box; */
       display: flex;
       display: -webkit-box;
       display: -webkit-flex;
       justify-content:center;
       -webkit-box-pack: center;
       -webkit-justify-content: center;
       align-items: center;
       -webkit-box-align: center;
       -webkit-align-items: center;
        border: 1px solid #ff3823;
        font-size: 0.28rem;
        color: #ff3823;
        border-radius: 0.3rem;
    }
</style>
