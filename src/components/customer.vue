<template>
	<div class='container'   ref='contentHeight'>
		<div class='contents' :class='!showHead?"hiddenHeight":""' id='contents' ref='topTitle'>
			<div class='head' >
				<div class='head-left' @click='tapReturn'>
					<img src="../assets/left-black.png" mode=""></img>
					<span>返回</span>
				</div>
				<div class='head-center'>
					<span v-if='showHead'>清洁人客服</span>
				</div>
				<div class='head-right'>

				</div>
			</div>
		</div>
		<iframe id="childFrame" :src='url'
		 width="100%" :style="{height:onlineH}" frameborder="1/0" name="iframe名称" scrolling="yes/no/auto">
		</iframe>
	</div>
</template>

<script>
	import * as axios from '../untils/ajax.js'
	export default {
		data() {
			return {
                onlineH:0,
				url:'',
			   nickName :'',
			   phone:'',
			   showHead:true
			}
		},
		methods: {
			tapReturn() {
				this.$router.go(-1)
			},
			rand(min,max) {
			        return Math.floor(Math.random()*(max-min))+min;
			    },
			getInfo() {
				// this.isLoading = true
				var that = this
				axios.post(
					'/sys/t-sys-app-user/getAppUserInfo', {}
				).then(res => {
					console.log(res)
					if (res.meta.success) {
						that.nickName = res.data.nickName
						that.phone = res.data.mobile
			            var title=this.$route.params.title
			            if(!title){
			            	title='其他咨询'
			            }
			           var randnum=that.phone.toString()
	                  var nickName='""'
	                  nickName=nickName.slice(0,1)+that.phone+nickName.slice(1)
			     //          var info={"nickName":that.nickName}.toString()
						  // console.log(info)
			              this.url= 'https://ykf-webchat.7moor.com/wapchat.html?accessId=ecfe8ad0-98a2-11ea-a52e-231a89a12d94&fromUrl=https://www.baidu.com/&urlTitle='+title
			              +'&clientId='+randnum+'&otherParams={"nickName":'+nickName+'}'
						  // console.log(this.url)
			   //          setTimeout(()=>{
			   //          	plus.navigator.closeSplashscreen()
			   //          	plus.navigator.setFullscreen(false)		
			   //          },1800)
						// that.isLoading = false
			
					} else {
						that.isFalse = true
						setTimeout(() => {
							that.isFalse = false
						}, 2000)
					}
				})
			},
		},
		created() {
			if (window.localStorage.getItem('wxBrowser')) {
				this.showHead = false
			}
			let token = window.localStorage.getItem('token')
			if(!token  || token==='null'){
				var title=this.$route.params.title
				if(!title){
					title='其他咨询'
				}
				var randnum=this.rand(1000,9999);
				    randnum='fk'+randnum.toString()
			   let  num =this.rand(1000,9999).toString()
			   var nickName='""'
			    nickName=nickName.slice(0,1)+'访客'+num+nickName.slice(1)
				  this.url= 'https://ykf-webchat.7moor.com/wapchat.html?accessId=ecfe8ad0-98a2-11ea-a52e-231a89a12d94&fromUrl=https://www.baidu.com/&urlTitle='+title
				  +'&clientId='+randnum+'&otherParams={"nickName":'+nickName+'}'
				  return
			}
	          this.getInfo()
	           
			// var title=this.$route.params.title
			// if(!title){
			// 	title='其他咨询'
			// }
   //            this.url= 'https://ykf-webchat.7moor.com/wapchat.html?accessId=ecfe8ad0-98a2-11ea-a52e-231a89a12d94&clientId=shimin_1994&otherParams={"nickName":"访客"}&fromUrl=https://www.baidu.com/&urlTitle='+title
			
		},
		mounted() {
			
			let topH = this.$refs.topTitle.offsetHeight;
			let contentH=document.documentElement.clientHeight || document.body.clientHeight
			
		     this.onlineH=contentH-topH+'px'
			 
		
		}
	}
</script>

<style scoped>
	.container {
		overflow: hidden;
	}

	.contents {
		position: fixed;
		top: 0;
		z-index: 100;
		width: 100%;
		height: 1.28rem;
	}
   .contents.hiddenHeight{
	   height: 0.88rem;
   }
	.head {
		padding-top: 0.4rem;
		height: 0.88rem;
		width: 100vw;
		/* background: #36a8fa; */
		background: #fff;
		text-align: center;
		/* position: relative; */
		box-sizing: content-box;
		/* color:#fff; */
		font-size: 0.33rem;
		z-index: 20;
	}
	.hiddenHeight .head{
		padding-top: 0 !important;
	}

	/* 	.head-left {
			height: 100%;
			line-height: 88upx;
			float: left;
			width: 30%;
			display: flex;
			position: relative;
		}
	
		.head-left img {
			display: inline-block;
			width: 18upx;
			height: 32upx;
			position: absolute;
			margin-left: 28upx;
			top: 50%;
			transform: translateY(-50%);
		}
	
		.head-left span {
			margin-left: 60upx;
	        line-height: 88upx;
		}
	 */
	.head-left {
		height: 100%;
		/* line-height: 0.88rem; */
		float: left;
		width: 30%;
		/* display: flex; */
		position: relative;
	}

	.head-left img {
		display: inline-block;
		width: 0.18rem;
		height: 0.32rem;
		position: absolute;
		margin-left: 0.28rem;
		top: 50%;
		left: 0;
		transform: translateY(-50%);
		-webkit-transform: translateY(-50%);
	}

	.head-left span {
		margin-left: 0.35rem;
		font-size: 0.32rem;
		position: absolute;
		top: 50%;
		left: 0;
		transform: translateY(-51%);
		-webkit-transform: translateY(-51%);
		width: 50%;
	}



	.head-center {
		height: 100%;
		width: 40%;
		line-height: 0.88rem;
		text-align: center;
		float: left;
		font-size: 0.36rem;
		font-family: Arial !important;
		font-weight: 500 !important;
	}

	/* .head-right{
		 
		  height: 88upx;
		  width: 30%;
		
		} */
	.head-right {
		height: 100%;
		line-height: 0.85rem;
		float: right;
		width: 20%;
		display: flex;
		display: -webkit-box;
		display: -webkit-flex;
		justify-content: flex-end;
		-webkit-box-pack: end;
		-webkit-justify-content: flex-end;
		padding-right: 0.28rem;
	}

	#childFrame {
		/* height: 100vh; */
		width: 100vw;
		margin: 0px;
		padding: 0px;
		border: none;
		overflow: hidden;
		position: absolute;
		bottom: 0;
		/* margin-top: 1.28rem; */
	}
</style>
