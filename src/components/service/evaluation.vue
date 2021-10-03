<template>
	<div>
		<!-- 	<div class='head'>
			<div class='head-left'>
				<img src="../../static/left-go.png" mode=""></img>
				<text>返回</text>
			</div>
			<div class='head-center'>
						 服务评价
			</div>
		</div> -->
		<head-Piece>
			<template slot="content">服务评价</template>
		</head-Piece>
		
		<div class='content'>
			<div class='content-attitude'>
				<div class='attitude'>
					服务态度
				</div>
				<div class='score'>
					<template v-for='(item,index) in frozen'>
						<div class='score-list' v-if='item===1' @click='tabFrozen(index,"des")'>
							<img v-if='item===1' src='../../assets/activation.png'></img>
						</div>
						<div class='score-list' v-if='item===0' @click='tabFrozen(index,"fro")'>
							<img v-if='item===0' src='../../assets/frozen.png'></img>
						</div>
					</template>
					<template>

					</template>
				</div>

			</div>
			<div class='content-attitude'>
				<div class='attitude'>
					服务质量
				</div>
				<div class='score'>
					<template v-for='(item,index) in activation'>
						<div class='score-list' v-if='item===1' @click='tabActivation(index,"des")'>
							<img v-if='item===1' src='../../assets/activation.png'></img>
						</div>
						<div class='score-list' v-if='item===0' @click='tabActivation(index,"fro")'>
							<img v-if='item===0' src='../../assets/frozen.png'></img>
						</div>
					</template>
					<template>

					</template>
				</div>
			</div>
			<div class='content-describe'>
				<div class='describe-tit'>
					<div>描</div>
					<div>述</div>
				</div>
				<div class='describe-text'>
					<textarea v-model="desInfo" placeholder="请给我们提出意见或建议,我们将继续改进!" placeholder-style="color:#ddd;font-size:14px;" />
					</div>
		  </div>
		</div>
		<div class='order-bottom'>
			<div @click='confirm'>提交</div>
		</div>
		<Load v-if='isLoad'></Load>
		<showMoadel v-if='modelFlag' :cont='"您確定要提交？"' :cancelText='"取消"'  :confirmText='"确定"' @define='confirms' @remove='cancel'></showMoadel>
	</div>
</template>

<script>
		import * as axios from '../../untils/ajax.js'
		import {
			mapState,
			mapActions
		} from 'vuex'
	export default{
		data(){
			return{
				activation:[0,0,0,0,0],
				frozen:[0,0,0,0,0],
				score1:0,
				score2:0,
				desInfo:'',
				isLoad:false,
				modelFlag:false
			}
		},
		computed:{
			...mapState(['complanitId'])
		},
		methods:{
			...mapActions(['collageComplanitId']),
			tabFrozen(index,info){
				  this.frozen=this.frozen.map((item,i) => {
					      if(info==='fro'){
							  if(i<=index){
								  item=1
							  }else{
								   item=0
							 }
						  }else if(info==='des'){
							 if(i<=index){
							 	 item=1
							 }else{
								   item=0
							 }
						  }
						  return item
				  })
				  this.score1=index+1
			},
			tabActivation(index,info){
				this.activation=this.activation.map((item,i) => {
									      if(info==='fro'){
											  if(i<=index){
												  item=1
											  }else{
												   item=0
											 }
										  }else if(info==='des'){
											 if(i<=index){
											 	 item=1
											 }else{
												   item=0
											 }
										  }
										  return item
				})
				this.score2=index+1
			},
			confirm(){
				console.log(this.score1)
				console.log(this.score2)
				console.log(this.desInfo)
				var that=this
				if(this.score1===0){
					// this.toast.fail('服务态度请评分')
					this.$toast({
					    message:'服务态度请评分', duration: 1000
					})
					return
				}else if(this.score2===0){
				    // this.toast.fail('服务质量请评分')	
					this.$toast({
					    message:'服务质量请评分', duration: 1000
					})
					return
				}
				
				this.modelFlag=true
				// uni.showModal({
				// 		  title:'提示',
				// 		  content:'是否要提交',
				// 		  showCancel:true,
				// 		  cancelColor:'#323233',
				// 		  confirmText:'确定',
				// 		  confirmColor:'#323233',
				// 		  success(ress){
				// 			  if(ress.confirm){
				// 				  that.isLoad=true
				// 				   axios.post('/qjrapi/office/t-office-order/putServiceAssess', {
				// 				   	composeNo:that.composeNo,assessManner:that.score1,assessQuality:that.score2,
				// 				   	assessRemark:that.desInfo
				// 				   }).then(res => {
				// 				   	console.log(res)
				// 				   	if(res.meta.success) {
				// 						  that.isLoad=false
				// 				   		that.toast.success('提交成功')
				// 				   	} else {
				// 							  that.isLoad=false
				// 				   		that.toast.fail(ress.meta.msg)
				// 				   	}
				// 				   })
				// 			  }else if(ress.cancel){
								
				// 			  }
				// 		  }
				// })
				// this.toast.showNewModal('提示','是否要提交',true,'取消','确定', axios.post('/qjrapi/office/t-office-order/getServiceDetails', {
				// 				   	composeNo:'C201912180001',assessManner:this.score1,assessQuality:this.score2,
				// 				   	assessRemark:this.desInfo
				// 				   }).then(res => {
				// 				   	console.log(res)
				// 				   	if (res.meta.success) {
				// 				   		this.toast.success('提交成功')
				// 				   	} else {
				// 				   		this.toast.fail('获取数据失败')
				// 				   	}
				// 				   }))
				
			},
			confirms(){
				var that=this
				
				this.modelFlag=false
				that.isLoad=true
				let params=new FormData()
				params.append('composeNo',that.composeNo)
				params.append('assessManner',that.score1)
				params.append('assessQuality',that.score2)
				params.append('assessRemark',that.desInfo)
				 axios.post('/office/t-office-order/putServiceAssess', params).then(res => {
				 	console.log(res)
				 	if(res.meta.success) {
								that.isLoad=false
								setTimeout(()=>{
									// that.toast.success('提交成功')
									let flag=!this.complanitId
									that.collageComplanitId(flag)
									that.$toast({
									    message:'提交成功', duration: 1000
									})
								},100)
								setTimeout(()=>{
								that.$router.go(-1)
									
									
								},800)
				 		
				 	} else {
						that.isLoad=false
					    setTimeout(()=>{
							// that.toast.fail(res.meta.msg)
							that.$toast({
							    message:res.meta.msg, duration: 1000
							})
						},200)
				 		
				 	}
				 })
			},
			cancel(){
				this.modelFlag=false
		    }
		},
		created() {
		
			this.composeNo=this.$route.params.composeNo
		}
	}
</script>

<style scoped>
/* 	.head{
		padding-top: 40upx;
		height: 88upx;
		width: 100%;
		background: #36a8fa;
		text-align: center;
		position: relative;
		box-sizing: content-box;
		color:#fff;
		font-size: 33upx;
		z-index: 20000;
	}
	.head-left{
	  height: 100%;
	  line-height: 88upx;
	  float: left;
	  width: 30%;
	  display: flex;
	}
	.head-left img{
		display: inline-block;
		width: 18upx;
		height: 32upx;
		position: absolute;
		margin-left: 28upx;
		top:68.5upx;
	}
	.head-left text{
		margin-left: 60upx;
		
	}
	.head-center{
		height: 100%;
		width: 40%;
		line-height: 88upx;
		text-align: center;
		float: left;
	}
	.head-right{

	  height: 88upx;
	  width: 30%;
	
	} */
	.content{
		padding: 0px 0.28rem  0.30rem  0.28rem ;
		background: #fff;
		
	}
	.content .content-attitude{
		/* margin-top: 40upx; */
		height: 1.20rem;
		display: flex;
		display: -webkit-box;
		display: -webkit-flex;
		align-items: center;
		-webkit-box-align: center;
		-webkit-align-items: center;
		/* margin-bottom: 40upx; */
	}
	.content .content-attitude:nth-child(1){
		  height: 0.90rem;
		  padding-top:0.10rem ;
		  box-sizing: content-box;
	}
	.content .content-attitude:nth-child(2){
		  height: 0.90rem;
		  margin-bottom: 0.20rem;
		  
	}
	 .content-attitude .attitude{
		 font-size: 0.30rem;
		 margin-right: 0.50rem;
	 }
	 .content-attitude .score{
		 height: 0.90rem;
		 display: flex;
		 display: -webkit-box;
		 display: -webkit-flex;
	 }
	 .score-list{
		 height: 0.90rem;
		display: flex;
		display: -webkit-box;
		display: -webkit-flex;
		align-items: center;
		-webkit-box-align: center;
		-webkit-align-items: center;
		 flex-direction: row;
	 }
	 .content-attitude .score img{
		 display: inline-block;
		 width: 0.35rem;
		 height: 0.35rem;
		 margin-right: 0.35rem;
	 }
	 .content-describe{
		 display: flex;
		 display: -webkit-box;
		 display: -webkit-flex;
	 }
	 .describe-tit{
		 font-size: 0.30rem;
		 display: flex;
		 display: -webkit-box;
		 display: -webkit-flex;
	 }
	 .describe-tit div{
		 display: inline-block;
		 
		 margin-right: 0.61rem;
	 }
	 .describe-text{
		 width: 5.34rem;
		 height: 1.46rem;
		 /* overflow: hidden; */
		 /* overflow-y: scroll; */
		 /* overflow-y:auto; */
		  border:1px  solid #ddd;
		  z-index: 1;	 
		  overflow-y:scroll !important;
		  overflow-x: hidden;
		  
	 }
	  .describe-text::-webkit-scrollbar{
		  display: block;
		  width:0.30rem;
		  height:0.30rem; 
		 
	  }
	  .describe-text::-webkit-scrollbar-track-piece { 
	  
	       background-color:#f5f5f5; 
	  }
	  .describe-text::-webkit-scrollbar-thumb {
	  
	  background-color:#ddd;
	  background-clip:padding-box;
	  
	  min-height:0.28rem; 
	   border-radius: 0.40rem;
	  
	  }
	 .describe-text textarea{
		 display: block;
		height: 1.60rem;
		width: 98%;
		 /* border:1px  solid #ddd; */
		padding:0.10rem 0 0 0.15rem;
		font-size: 0.28rem;
		border: none;
	 }
	 .order-bottom{
	 		  /* height: 1rem; */
			  padding: 0.18rem 0;
	 		  width: 100vw;
	 		  background: #fff;
	 		  position: fixed;
	 		   bottom:0;
			   
	 	/* 	  display: flex;
	 		  display: -webkit-box;
	 		  display: -webkit-flex;
	 		  align-items: center;
	 		  -webkit-box-align: center;
	 		  -webkit-align-items: center;
	 		   flex-direction: row-reverse;
			   -webkit-box-pack: end;
			    -webkit-box-direction: reverse;
			    -webkit-box-orient: horizontal;
			     -moz-flex-direction: row-reverse;
			    -webkit-flex-direction: row-reverse; */
			   font-size: 0.3rem;
	 		 }
	 		.order-bottom div{
	 			 width: 1.70rem;
	 			 height: 0.64rem;
	 			 border-radius: 0.32rem;
	 			 border:1px  solid #ff5f1e;
	 			 color:#FF5F1E;
	 			 text-align: center;
	 			 line-height: 0.64rem;
	 			 margin-right: 0.20rem;
				 box-sizing: border-box;
				 float: right;
	 		 }
	 		 .appointment{
	 			 
	 		 }
	 		.order-bottom .complaint{
	 			 color:#868688 !important; 
	 			 border:1px  solid #97979f  !important;
	 		 }
</style>
