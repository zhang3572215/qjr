<template>
	<div>
		<head-Piece>
			<template slot="content">银行卡</template>
		</head-Piece>
	
		<div class='addCard' @click="addCard">
			添加银行卡
		</div>

			<div class='bank-list' v-for=" (item,index)  in list" :key ='index'   @touchstart="gotouchstart(index,item.id)" @touchmove="gotouchmove" @touchend="gotouchend(index)"  @click="toSelect(item)">
				<img :src="item.imgUrl" alt="">
				<div class='bank-info'>
					<div class='bank-title'>{{item.bankName}}</div>
					<div class='bank-num'>
						{{item.accountNo}}
					</div>
				</div>
			
			</div>
	    <Load v-if='isLoad'></Load>
		<showMoadel v-if='modelSign' :cont='"是否要删除该银行?"' @define='confirms' @remove='cancels'></showMoadel>
	</div>
</template>

<script>
	var timeOutEvents = 0; //定时器  
	import * as axios from '../../untils/ajax.js'
	import {mapGetters,mapActions} from 'vuex'
	export default{
		data(){
			return{
				 jianse:require('../../assets/jianse.png'),
				 nongye:require('../../assets/nongye.png'),
				 gongshang:require('../../assets/gongshang.png'),
				 minsheng:require('../../assets/minsheng.png'),
				 jiaotong:require('../../assets/jiaotong.png'),
				 xiamen:require('../../assets/xiamen.png'),
				 xingye:require('../../assets/xingye.png'),
				 youzheng:require('../../assets/youzheng.png'),
				 zhaoshang:require('../../assets/zhaoshang.png'),
				 zhongguo:require('../../assets/zhongguo.png'),
				 list:[],
				 isLoad:false,
				 modelSign:false,
				 bankCardId:'',
				 signIndex:''
			}
		},
		computed:{...mapGetters(['showBankFlag'])},
		methods:{
			...mapActions(['collageBankCard']),
			bankNum(e){
				// var str = "2222333344445555";
				// var reg = /^(\d{4})\d+(\d{4})$/;
				// str = str.replace(reg, "$1 **** **** $2");
				// var data = "626598886532146598";
				//  data=data.replace(/\s/g,'').replace(/(\d{4})\d+(\d{4})$/, "**** **** **** $2")
				//  console.log(data)
				// var str = "626598886532146598";
				
				 var str=e
				var reg = /^(\d{4})\d+(\d{4})$/;
				str = str.replace(reg, "$1 **** **** $2");
				return str
			},
			addCard(){
				this.$router.push('addBankCard')
			},
			getList(){
				let params=new FormData()
				params.append('pageSize',100)
				params.append('pageNo',1)
				this.isLoad=true
				axios.post('/business/t-business-bank/getBankCardList',params).then(res => {
					this.isLoad=false
					  if(res.meta.success){
						  this.list=res.data.records.map(val => {
							     val['imgUrl']= this.showImg(val.bankName)
			
								 val.accountNo=this.bankNum(val.accountNo)
								 return val
						  })
					  }
				})
				
			},
			 showImg(e){
				 var img=''
				 if(e=='建设银行')  img= this.jianse
				 if(e=='工商银行')  img= this.gongshang
				 if(e=='农业银行')  img=this.nongye
				 if(e=='民生银行') img=this.minsheng
				 if(e=='中国银行') img=this.zhongguo
				 if(e=='交通银行')  img=this.jiaotong
				 if(e=='兴业银行')  img=this.xingye
				 if(e=='厦门银行')  img=this.xiamen
				 if(e=='招商银行')  img=this.zhaoshang
				 if(e=='中国邮政储蓄银行') img=this.youzheng
				 return img
			 },
			 gotouchstart(index,id) {
			 	let that = this;
			 this.bankCardId=id
			 	clearTimeout(timeOutEvents); //清除定时器
			 	timeOutEvents = 0;
			 	timeOutEvents = setTimeout(function() {
			 		that.modelSign = true
			 		that.signIndex = index
			 		//执行长按要执行的内容，
			 	}, 1000); //这里设置定时
			 },
			 //手释放，如果在500毫秒内就释放，则取消长按事件，此时可以执行onclick应该执行的事件
			 gotouchend() {
			 	clearTimeout(timeOutEvents);
			 	if (timeOutEvents != 0) {
			 		//这里写要执行的内容（尤如onclick事件）
			 
			 	}
			 },
			 //如果手指有移动，则取消所有事件，此时说明用户只是要移动而不是长按 
			 gotouchmove() {
			 	clearTimeout(timeOutEvents); //清除定时器
			 	timeOutEvents = 0;
			 },
			 confirms() {
			 	this.modelSign = false
			 	this.delBankCard()
			 },
			 delBankCard(){
				 let params=new FormData()
				 params.append('bankCardId',this.bankCardId)
				 this.isLoad=true
				 let that=this
				axios.post('/business/t-business-bank/deleteBankCard',params).then(res => {
					   if(res.meta.success){
						   this.isLoad=false
						   setTimeout(()=>{
							   that.$toast({
							   	message: '删除成功',
							   	duration: 1000
							   })
							   	this.list.splice(this.signIndex, 1)
						   },100)
						 
					   }else{
						   this.$toast({
						   	message: res.meta.msg,
						   	duration: 1000
						   })
					   }
				}) 
			 },
			 cancels() {
			 	this.modelSign = false
			 },
			 toSelect(e){
				 console.log(e)
				 let info={
					 'bankName':e.bankName,
					 'id':e.id,
					 imgUrl:e.imgUrl,
					 'accountNo':e.accountNo
				 }
				 this.collageBankCard(info)
				 this.$router.go(-1)
			 }
		},
		created() {

			this.getList()
		},
		watch:{
			showBankFlag(){
				this.getList()
			}
		}
	}
</script>

<style scoped>
	 .addCard{
		 height: 0.9rem;
		 width: 6.98rem;
		 background-color: #fff;
		 font-size: 0.3rem;
		 text-align: center;
		 line-height: 0.9rem;
		 border: 1px solid   #dcdcdc;
		 margin:  0.2rem auto 0 auto;
		 border-radius: 0.15rem;
	 }
	 .bank-list{
		  height: 1.45rem;
		  width:6.98rem;
		  margin: 0.2rem  auto 0 auto;
		  display: flex;
		  display: -webkit-box;
		  display: -webkit-flex;
		  align-items: center;
		  -webkit-box-align: center;
		  -webkit-align-items: center;
          background: #fff;
		  border-radius: 0.1rem;
	 }
	 .bank-list img{
		 width: 0.8rem;
		 height: 0.8rem;
		 margin-left: 0.25rem;
		 margin-right: 0.2rem;
	 }
	 .bank-info .bank-title{
		 font-size: 0.32rem;
		 margin-bottom: 0.05rem;
	 }
	 .bank-info .bank-num{
	 		 font-size: 0.26rem;
	 }
</style>
