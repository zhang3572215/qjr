<template>
	<div classs='cantainer'>
		<div class='head'>
			<div class='head-left' @click='toBack'>
				<img src="../../assets/left-black.png" mode=""></img>
				<span>返回</span>
			</div>
			<div class='head-center'>
			    处理投诉
			</div>
			<div class='head-right'>
		
			</div>
		</div>
		<div class='head-show'>
		</div>
		<div class='content'>
		<div class='content-cont' @click="toSelect()">
			<div>处理状态:</div>
		     <div class='select'  v-if='complantValue.length==0'>请选择处理状态</div>
		     <div class='show-select' v-else>{{complantValue}}</div>
		</div>
		<div class='content-cont' @click="toSelectResult()">
			<div>处理结果:</div>
		     <div class='select'  v-if='resultValue.length==0'>请选择处理结果</div>
		     <div class='show-select' v-else>{{resultValue}}</div>
		</div>
		<div class='complanit-remark' >
			<div class='remark-tit'>
			    处理备注:
			</div>
			<div class='remark-text'>
			  <textarea name="" id="" v-model="remark"  placeholder="请输入处理备注"></textarea>	
			</div>
		</div>
		 
	 </div>
		<div class='content-bottom'>
		    <div class='btn-right' @click='submission'>
				提交
			</div>
		</div>
			<van-popup v-model="showPicker" position="bottom">
			  <van-picker
			    show-toolbar
			    :columns="columns"
			    @cancel="showPicker = false"
			    @confirm="onConfirm"
			  />
			</van-popup>
			
			<van-popup v-model="showPickerResult" position="bottom">
			  <van-picker
			    show-toolbar
			    :columns="resultList"
			    @cancel="showPickerResult = false"
			    @confirm="onConfirmResult"
			  />
			</van-popup>
			<div class='total-false' v-if='isFalse'>
				<!-- <div class='success-img'><img src="../../assets/fail.png" alt=""></div> -->
				<div class='success-tit'>{{msgFalg}}</div>
			</div>
			<Load v-if='isLoading'></Load>
			<showSuccess :successInfo='succeessMsg'  v-show='isSuccess'></showSuccess>
	</div>
</template>

<script>
		import * as axios from '../../untils/ajax.js'
		import {
			mapActions,mapGetters
		} from 'vuex'
	export default{
		data(){
			return{
				complantValue: '',
				showPicker: false,
				columns: ['处理中', '处理完成'],
				resultValue:'',
				showPickerResult:false,
				resultList:['重新服务','退款','不予处理','客户取消','其他'],
				isFalse:false,
				msgFalg:'',
				remark:'',
				id:'',
				isLoading:false,
				succeessMsg:'提交成功',
				isSuccess:false
			}
		},
		computed: {
			...mapGetters(['showHandleTit'])
		},
		methods:{
			...mapActions(['collageHandleTit']),
			toBack(){
				this.$router.go(-1)
			},
			 onConfirm(value) {
			      this.complantValue= value;
				  
			      this.showPicker = false;
			 },
			toSelect(){
				this.showPicker =true		    
			},
			toSelectResult(){
				this.showPickerResult=true
			},
			onConfirmResult(value){
				this.resultValue=value
				this.showPickerResult=false
			},
			submission(){
				var complainStatus=''
				var complainResult=''
				let that=this 
			   if(this.complantValue=='待处理'){
				    complainStatus=1
				}else if(this.complantValue=='处理中'){
					 complainStatus=2
				}else if(this.complantValue=='处理完成'){
					 complainStatus=3
				}else{
					this.msgFalg='请选择处理状态'
					this.isFalse=true
					setTimeout(()=>{
						 that.isFalse=true
					},1500)
					return
					  
				}
				if(this.resultValue=='重新服务'){
					complainResult=1
				}else if(this.resultValue=='退款'){
					complainResult=2
				}else if(this.resultValue=='不予处理'){
					complainResult=3
				}else if(this.resultValue=='客户取消'){
					complainResult=4
				}else if(this.resultValue=='其他'){
				    complainResult=5	
				}else{
					this.msgFalg='请选择处理结果'
					this.isFalse=true
					setTimeout(()=>{
						 that.isFalse=true
					},1500)
					return
				}
				
				
				this.isLoading = true
				var formdata = new FormData()
				formdata.append("complainStatus", complainStatus)
				formdata.append('complainResult', complainResult)
				formdata.append('id', this.id)
				formdata.append('complainRemark',this.remark)
				axios.post(
				  '/office/t-office-complain/putComplainById',
					formdata
				).then(res => {
					if (res.meta.success) {	
						that.isLoading = false
						this.isSuccess=true
						let num =this.showHandleTit+1
					    that.collageHandleTit(num)
						setTimeout(() => {
							that.isSuccess=false
							that.$router.go(-1)
						}, 1000)
						// setTimeout(()=>{
						// 	that.isSuccess=true
						// 	setTimeout(()=>{
						// 		that.isSuccess=false
								
						// 	},700)
						// },100)
						
					
					   
						
					} else {
						that.isLoading = false
						that.isFalse = true
						that.msgFalg=res.meta.msg
						setTimeout(() => {
							that.isFalse = false
						}, 1000)
					}
				})
			},
			
		},
		created() {
			this.id=this.$route.params.info.id
		}
	}
</script>

<style scoped>
	.head {
		padding-top: 0.38rem;
		height: 0.88rem;
		width: 100vw;
		/* background: #36a8fa; */
		background: #fff;
		text-align: center;
		position: fixed;
		top: 0;
		box-sizing: content-box;
		/* color:#fff; */
		font-size: 0.33rem;
		/* z-index: 20000; */
	}
	
	.head-left {
		height: 0.88rem;
		/* line-height: 0.88rem; */
		float: left;
		width: 30%;
		/* display: flex; */
		position: relative;
	}
	
	.head-left img {
		width: 0.18rem;
		height: 0.32rem;
		position: absolute;
		/* margin-left: 0.28rem; */
		top: 50%;
		left: 0.28rem;
		transform: translateY(-50%);
		-webkit-transform: translateY(-50%);
	}
	
	.head-left span {
		/* margin-left: 0.60rem; */
		font-size: 0.32rem;
		position: absolute;
		/* margin-left: 0.28rem; */
		top: 50%;
		left: 0.6rem;
		transform: translateY(-50%);
		-webkit-transform: translateY(-50%);
	}
	
	.head-center {
		height: 100%;
		width: 40%;
		line-height: 0.88rem;
		text-align: center;
		float: left;
		font-size: 0.36rem;
	}
	
	/* .head-right{
		 
		  height: 88rem;
		  width: 30%;
		
		} */
	.head-right {
		height: 100%;
		line-height: 0.85rem;
		float: right;
		width: 20%;
		display: flex;
		justify-content: flex-end;
		padding-right: 0.28rem;
	}
	
	.head-show {
	
		height: 1.28rem;
		width: 100%;
	}
	.content{
		background: #fff;
	}
	.content-cont{
		font-size: 0.3rem;
		height:0.7rem;
		/* width:100%; */
		 display: flex;
		 display: -webkit-flex;
		 -webkit-box-align: center;
		-ms-flex-align: center;
		-webkit-align-items: center;
		border-bottom: 1px solid #ddd;	
		 padding-left: 0.16rem;
		 align-items: center;
		 box-sizing: content-box;
	}
	.content-cont .select{
		color:#bbb;
		margin-left: 0.1rem;
	}
	 .content-cont .show-select{
		color:#777;
		margin-left: 0.1rem;
	}
	.remark-tit{
		  margin:0.2rem 0  0  0.16rem;
		font-size: 0.3rem;
	}
	.remark-text {
		width: 6.94rem;
		height: 1.66rem;
		/* overflow: hidden; */
		/* overflow-y: scroll; */
		/* overflow-y:auto; */
		/* border: 1px solid #ddd; */
		border: 1px solid #ddd;
		z-index: 1;
		overflow-y: scroll !important;
		overflow-x: visible;
		margin-top: 0.29rem;
		margin-left: 0.26rem;
		
		/* padding-bottom: 0.2rem; */
	}
	.remark-text textarea {
		display: block;
		height: 1.76rem;
		width: 98%;
		overflow-y: scroll;
		outline: none;
	   border: none;
	   font-size: 0.28rem;
	}
	textarea {
		padding: 0.15rem 0  0 0.15rem;
		box-sizing: border-box;
	    resize:none;
		border: none;
		/* scrollbar-arrow-color:yellow; */
		/* scrollbar-base-color:lightsalmon; */
	}
	textarea::-webkit-input-placeholder {
	    color: #aaa;
		
	}
	.remark-text::-webkit-scrollbar {
		display: block;
		width: 0.3rem;
		height: 0.3rem;
	}
	
	.remark-text::-webkit-scrollbar-track-piece {
		background-color: #f5f5f5;
	}
	
	.remark-text::-webkit-scrollbar-thumb {
		border-radius:0.4rem;
		background-color: #ddd;
		background-clip: padding-box;
		min-height:0.28rem ;
	
	}
	.content-bottom{
		position: fixed;
		 bottom: 0;
		 background: #fff;
		 width: 100%;
		height: 1rem;
		 display: flex;
		 display: -webkit-flex;
		 align-items: center;
		 justify-content: flex-end;
		 font-size: 0.28rem;
	}
	.btn-right{
		width:1.7rem;
		height: 0.64rem;
		border-radius: 0.32rem;
		border: 1px solid #ff5f1e;
		color: #FF5F1E;
		text-align: center;
		line-height:0.64rem;
		margin-right:0.2rem;
	}
	.total-false{
		position: fixed;
			top: 5.7rem;
			background: rgba(44, 44, 44, 0.8);
		/* 	display: flex;
			flex-direction: column;
			align-items: center; */
			font-size: 0.28rem;
			color: #fff;
			/* width: 2.2rem; */
			/* height: 2.15rem; */
			padding:0.2rem;
			border-radius: 0.15rem;
			left: 50%;
			transform: translateX(-50%);
			-webkit-transform: translateX(-50%);
			z-index: 1000;
	}
	.total-false  .success-tit{
		   width: 100%;
		   text-align: center;
	}
</style>
<style>
	.cantainer .van-popup .van-picker  .van-picker__toolbar{
		background: #999 !important;
	}
</style>
