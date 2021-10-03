<template>
	<div>
		<div class='head'>
			<div class='head-left' @click='toBack'>
				<img src="../../assets/left-black.png" mode=""></img>
				<span>返回</span>
			</div>
			<div class='head-center'>
			  服务详情
			</div>
			<div class='head-right'>
		
			</div>
		</div>
		<div class='head-show'>
		</div>
		<div class='content'>
			<div class='info-content'>
			   <div>预约服务日期:</div>
			   <div class='cont-tit'>{{info.appointDate}}</div>
			</div>
			
			<div class='info-content'>
			   <div>到场时间:</div>
			   <div class='cont-tit'>{{info.appointTime}}</div>
			</div>
			<div class='info-content'>
			   <div>地址:</div>
			   <div class='cont-tit content-address' >{{info.address}}</div>
			</div>
			<div class='info-content' v-if='info.signinTime.length>0'>
			   <div>签到时间:</div>
			   <div class='cont-tit' >{{info.signinTime}}</div>
			</div>
			<div class='complanit-img'  v-if='info.signinPics.length>0'>
				<div class='img-tit'>
					签到图片:
				</div>
				<div class='show-img'>
					<template>
						<img :src="item" alt="" v-for='(item,index) in  info.signinPics ' :key='index' @click="signinPreview(item)">
					</template>	
				</div>
			</div>		
			<div class='info-content' v-if='info.signoutTime.length>0'>
			   <div>签退时间:</div>
			   <div class='cont-tit' >{{info.signoutTime}}</div>
			</div>
			<div class='complanit-img' v-if='info.signoutPics.length>0' >
				<div class='img-tit'>
					签退图片:
				</div>
				<div class='show-img'>
					<template>
						<img :src="item" alt="" v-for='(item,index) in  info.signoutPics ' :key='index' @click="SingoutPreview(item)">
					</template>
					
				</div>
			</div>		
			
		</div>
		
		 <wimg :show="isShowBigImg" :imgs="info.signinPics" :currentImg="signinCurrent" @close="isShowBigImg = false" v-if='info.signinPics.length>0'></wimg>
		  <wimg :show="isShowBigImgOut" :imgs="info.signoutPics" :currentImg="signoutCurrent" @close="isShowBigImgOut = false"  v-if='info.signoutPics.length>0'></wimg>
	</div>
</template>

<script>
	import wimg from 'w-previewimg'
	export default{
		data(){
			return{
				info:{signinPics:[],
				signoutPics:[]
				},
				isShowBigImg:false,
				isShowBigImgOut:false,
				signinCurrent:'',
				signoutCurrent:''
			}
		},
		components: {
		      wimg
		    },
		methods:{
		    toBack(){
		    	this.$router.go(-1)
		    },
			signinPreview(e){
				this.isShowBigImg=true
				this.signinCurrent=e
			},
			SingoutPreview(e){
				this.isShowBigImgOut=true
				this.signoutCurrent=e
			}
		},
		created() {
			this.info =this.$route.params.infos
			console.log(this.info.signinPics)
			// if(this.info.signinPics.length>0){
			// 			   if(this.info.signinPics.includes(';')){
			// 			   			      let complainImg=this.info.signinPics.split(';')
			// 			   				complainImg= complainImg.map(item=>{
			// 			   						 item = this.configUrl+item
			// 									 return item
			// 			   				  })
									
			// 							  this.info.signinPics =complainImg
			// 			   }else{
			// 				   console.log(8888)
			// 			   		 let complainImg=[]
			// 					 let url=this.configUrl+this.info.signinPics 
			// 					 complainImg.push(url)
			// 					 this.info.signinPics =complainImg
			// 			   }
			// }
			// if(this.info.signoutPics.length>0){
			// 			   if(this.info.signoutPics.includes(';')){
			// 			   			      let complainImg=this.info.signoutPics.split(';')
			// 			   				  complainImg=complainImg.map(item=>{
			// 			   						   item=this.configUrl+item
			// 									   return item
			// 			   				  })
			// 							  this.info.signoutPics=complainImg
			// 			   }else{
			// 			   		 let complainImg=[]
			// 					 let url=this.configUrl+this.info.signoutPics
			// 					 complainImg.push(url)
			// 					 this.info.signoutPics=complainImg
			// 			   }
			// }
					
		},
		destroyed(){
		
			this.info=[]
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
		z-index: 2;
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
		margin-top: 0.1rem;
		/* padding-bottom: 1.1rem; */
	}
	.info-content{
		    font-size: 0.3rem;
			 /* height:0.85rem; */
		  min-height: 0.85rem;
			  display: flex;
			  display: -webkit-flex;
			  -webkit-box-align: center;
			 -ms-flex-align: center;
			 -webkit-align-items: center;
			 border-bottom: 1px solid #ddd;	
			margin: 0 0.16rem;
			  padding-left: 0.16rem;
			  align-items: center;
		
	}
	.cont-tit{
			 margin-left: 0.1rem;
			 color: #777;
	}
	.cont-tit.content-address{
		width: 6rem;
		 border: 1px solid #222;
		 margin: 0.1rem  0  0.1rem 0.18rem;
		 font-size: 0.28rem;
		 word-wrap:break-word;
		 word-break: break-all;
		 min-height: 0.75rem;
		/* overflow: hidden; */
		/* text-overflow: ellipsis; */
		/* white-space: nowrap; */
	}
	.content-phone{
	 position: relative;
	}
	.content-phone img{
		position: absolute;
		top: 50%;
	    right: 0.16rem;
		transform: translateY(-50%);
		-webkit-transform: translateY(-50%);
		height: 0.39rem;
		width: 0.35rem;
		margin: 0;
	}
	.serveDetail{
		font-size: 0.28rem;
		width: 1.6rem;
		height:0.58rem;
		line-height:0.58rem;
		text-align: center;
		border: 1px solid #ff5f1e;
		border-radius: 0.15rem;
		color: #fff;
		background:#FF5F1E ;
		position: absolute;
		top: 50%;
		right: 0.16rem;
		transform: translateY(-50%);
		-webkit-transform: translateY(-50%);
	}
	.complanit-img .img-tit{
		  font-size: 0.3rem;
		  margin:0.2rem 0  0  0.3rem;
	}
	.show-img{
		padding: 0.15rem 0;
		margin:0 0.16rem 0 0.16rem;
		 border-bottom: 1px solid #ddd;
	}
	.complanit-img:last-child .show-img{
		border: none;
	}
	.show-img img{
		 width: 1.6rem;
		 height: 1.6rem;
		 margin: 0.25rem 0.25rem 0 0.25rem;
	}
	.zhezhao {
		z-index: 3;
	}
</style>
