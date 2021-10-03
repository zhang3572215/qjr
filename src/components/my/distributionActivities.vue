<template>
	<div class='container'>
		<!-- <div class='contents'>
			<div class='head'>
				<div class='head-left' @click='toBack'>
					<img src="../../assets/left-black.png" mode=""></img>
					<span>返回</span>
				</div>
				<div class='head-center'>
					清洁人注册邀请
				</div>
				<div class='head-right' @click='invate'>
					立即邀请
				</div>
			</div>
		</div> -->
		<head-Piece :sign='"清洁人注册邀请"'>
			<template slot="content">分销活动页</template>
			<div slot='content-right'  @click='inshare'> <span v-if='!showWx'>立即邀请</span></div>
		</head-Piece>
		
		<!-- 	<div class='head-show'>
		</div> -->
		<img class='content' :src="imgUrl" alt=""  v-if='showIf'>
		<!-- <div class='content' :style='{backgroundImage:"url("+imgUrl+")"}' v-if='showIf'> -->
			<!-- <img src='../../static/invite-btn.png' @click='invate'></img> -->
			<!-- <img class='urlImg' :src="imgUrl"></img> -->
		<!-- </div> -->
		<Load v-if='isLoad'></Load>
	</div>
</template>

<script>
	import * as axios from '../../untils/ajax.js'
	export default {
		data() {
			return {
				isLoad: false,
				phone: null,
				imgUrl: null,
				showIf: false,
				services:'',
				wxInfo:'',
				showWx:false
			}
		},
		methods: {
			toBack() {
				this.$router.go(-1)
				// uni.navigateBack({})
			},

			getImg() {
				let that = this
				// that.isLoad=true
				this.showIf = false
				let params = new FormData()
				params.append('recomPhone', this.phone)
				axios.post('/business/t-business-distribution-activity/generateQRCodeByActivity', params).then(res => {
					console.log(res)
					if (res.meta.success) {
						this.imgUrl = this.configUrl + res.data
						that.isLoad = false
						this.showIf = true
						// that.toast.success('获取二维码成功')

					} else {
						that.isLoad = false
						this.$toast({
						    message: '获取二维码失败', duration: 1000
						})
						// that.toast.fail('获取二维码失败')
					}
				})
			},
			getInfo() {
				this.isLoad = true
				axios.post('/sys/t-sys-app-user/getAppUserInfo', {}).then(res => {
					if (res.meta.success) {
						console.log(res)
						this.phone = res.data.mobile
						this.getImg()
						// this.isLoad = false
					} else {
						this.isLoad = false
					}
				})
			},
			inshare() {
				let that = this
				this.isLoad = true
				
				this.services.send({
					extra: {
						scene: "WXSceneSession"
					},
					type: 'image',
					pictures: [that.imgUrl],
				}, function() {
				this.isLoad = false
				}, function() {
				this.isLoad = false
				})
				// uni.share({
				// 	provider: "weixin",
				// 	scene: "WXSceneSession",
				// 	type: 2,
				// 	imgUrl: that.imgUrl,
				// 	success: function(res) {
				// 		that.isLoad = false
				// 	},
				// 	fail: function(err) {
				// 		that.isLoad = false
				// 	}
				// });

			},
			getServices() {
				let that = this
				plus.share.getServices(function(s) {
			
					for (var i in s) {
						if ('weixin' == s[i].id) {
							that.services = s = s[i];
						}
					}
			
				}, function(e) {
					console.log(e)
				});
			},
			findAdvertShareConfig() {
				// alert(location.href.split('?')[0])
				// alert(window.location.href)
				let params = new FormData
				var url = window.location.href.split('#')[0]
				url = url.replace(/\&/g, '%26')
				params.append('url', url)
				axios.post('/business/t-business-advert/findAdvertShareConfig', params).then(res => {
					if (res.meta.success) {
						this.wxInfo = res.data
			        
					}
				})
			},
		},
		created() {
			//判断是否为微信浏览器
			if (window.localStorage.getItem('wxBrowser')) {
				
				this.showWx = true
			}
			
			window.document.title='清洁人注册邀请'
			// this.toast.success('788888')
			this.getInfo()
			this.getServices()
		}
	}
</script>

<style scoped>
	.container {
		height: 100vh;
		width: 100vw;
		overflow: hidden;
	}

	.content {
		width: 100vw;
		height: 100vh;
		/* background-img: url('~@/static/invitation-info.jpg'); */
		background-size: 100% 100%;
		position: relative;
	}

	.content img {
		height: 1rem;
		width: 6.28rem;
		position: absolute;
		bottom: 0.80rem;
		left: 50%;
		transform: translateX(-50%);
		-webkit-transform: translateX(-50%);
	}

	.content img.urlImg {
		position: absolute;
		top: 55.5%;
		/*  height: 165upx;
		width: 165upx; */
		height: 12.5vh;
		width: 1.65rem;
	}

	.contents {
		position: fixed;
		top: 0;
		z-index: 100;
		width: 100%;
	}

	.head {

		padding-top: 0.40rem;
		height: 0.88rem;
		width: 100%;
		/* background: #36a8fa; */
		background: #fff;
		text-align: center;
		/* position: relative; */
		box-sizing: content-box;
		/* color:#fff; */
		font-size: 0.33rem;
		z-index: 20000;
	}


	.head-left {
		/* padding-top: 0.26rem; */
		height: 0.88rem;
		/* line-height: 38upx; */
		box-sizing: content-box;
		display: flex;
		display: -webkit-box;
		display: -webkit-flex;
		align-items: center;
		-webkit-box-align: center;
		-webkit-align-items: center;
		/* align-items: center; */
		/*  height: 100%;
			  line-height: 88upx; */
		float: left;
		width: 25%;
		/* display: flex; */
	}

	.head-left img {
		width: 0.18rem;
		height: 0.32rem;
		/* position: absolute; */
		margin-left: 0.28rem;
		/* margin-top: 2upx; */
		/* top:67.5upx; */

	}

	.head-left span {
		vertical-align: middle;
		margin-left: 0.13rem;
		/* line-height: 0.38rem; */
		/* margin-top: 3upx; */
	}

	.head-center {
		height: 100%;
		width: 50%;
		display: flex;
		display: -webkit-box;
		display: -webkit-flex;
		align-items: center;
		-webkit-box-align: center;
		-webkit-align-items: center;
		justify-content: center;
		-webkit-box-pack: center;
		-webkit-justify-content: center;

		/* line-height: 0.88rem; */
		float: left;
		font-size: 0.36rem;
		font-family: Arial !important;
		font-weight: 500 !important;
	}


	.head-right {
		height: 100%;
		/* line-height: 0.85rem; */
		float: right;
		width: 25%;
		display: flex;
		display: -webkit-box;
		display: -webkit-flex;
		justify-content: flex-end;
		-webkit-box-pack: end;
		-moz-justify-content: flex-end;
		-webkit-justify-content: flex-end;
		align-items: center;
		-webkit-box-align: center;
		-webkit-align-items: center;
		padding-right: 0.28rem;
		box-sizing: border-box;
	}
</style>
