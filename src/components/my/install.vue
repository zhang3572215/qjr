<template>
	<div>
		<head-Piece>
			<div slot="content">设置</div>
		</head-Piece>
	
		<div class='content'>
			<div class='head pad' @click='collageHeadPic'>
				<div>头像</div>
				<div class="head-img">
					<img class='person-img' src='../../assets/missing-face.png' v-if='showHead.length==0'></img>
					<img class='person-img' :src='headUrl' v-else></img>
					<img class='right-to' src='../../assets/right-to.png'></img>
				</div>
			</div>
			<div class='head pad' @click="collageName">
				<div>
					昵称
				</div>
				<div class='call'>
					<div class="name">
						{{definition}}
					</div>
					<img src='../../assets/right-to.png'></img>
				</div>
			</div>
			<div class='head pad' @click='toOldPhone'>
				<div>
					手机号
				</div>
				<div class='call'>
					<div class="name">
						{{phone}}
					</div>
					<img src='../../assets/right-to.png'></img>
				</div>
			</div>
			<div class='head pad' @click="toSever">
				<div>
					服务协议
				</div>
				<div class='call'>

					<img src='../../assets/right-to.png'></img>
				</div>
			</div>
			<div class='head pad' @click="toPrivacy">
				<div>
					隐私政策
				</div>
				<div class='call'>
					<img src='../../assets/right-to.png'></img>
				</div>
			</div>
			<div class='head pad' v-if='showVerSion'>
				<div>
					版本号
				</div>
				<div class='call'>
					<div class="name">
						{{version}}
					</div>
					<!-- <img src='../../static/right-to.png'></img> -->
				</div>
			</div>
			<div class='btn-bottom' @click="login" >
				<div>退出登录</div>
			</div>
			<div class='nickName' v-if='flag'>
				<div class='nick'>
					修改昵称
				</div>
				<div class='nick-center'>
					<div>昵称：</div>
					<input type="text" v-model="name" placeholder="请输入昵称">
				</div>
				<div class='nick-bottom'>
					<div @click='cancel'>取消</div>
					<div @click="confirm">提交</div>
				</div>
			</div>
			<div class='showPage' v-if='flag || showHeadPic'>

			</div>
			<div class='headPic' v-if='showHeadPic'>
				<div class='head-title'>
					修改头像
					<input class='inputImg' @change="addImg" type="file" accept="image/png,image/jpeg,image/gif,image/jpg">
				</div>

				<img src='../../assets/missing-face.png' v-if='headPic.length==0' @click="chooseImg"></img>
				<img :src="headPic" mode="" v-else @longpress="prediv(index)" @click="chooseImg"></img>
				<div class='headPic-bottom'>
					<div @click='headCancel'>取消</div>
					<div @click="headConfirm">提交</div>
				</div>
			</div>
		</div>
		<Load v-if='isLoad'></Load>
		<showMoadel v-if='modelFlag' :cont='msg' :cancelText='"取消"' :confirmText='"确定"' @define='confirms' @remove='cancels'></showMoadel>
	</div>
</template>

<script>
	import * as axios from '../../untils/ajax.js'
	import {mapActions,mapGetters} from 'vuex'
	export default {
		data() {
			return {
				flag: false,
				name: '',
				phone: '',
				definition: '',
				isLoad: false,
				modelFlag: false,
				showHeadPic: false,
				headPic: '',
				headPicUrl: '',
				msg: "您确定要退出登录?",
				headUrl: "",
				showHead: '',
				version: '',
				showVerSion: true
			}
		},
		computed:{...mapGetters(['showInstallNum'])},
		methods: {
			...mapActions(['collageInstallNum','addDesCont']),
			confirm() {
				if (this.name.length == 0) {
					this.$toast({
						message: "请填写昵称",
						duration: 1000
					})
					return
				}
				this.isLoad = true
				let params = new FormData()
				params.append('nickName', this.name)
				axios.post('/sys/t-sys-app-user/putNickNameById', params).then(res => {
					this.isLoad = false
					if (res.meta.success) {
						this.$toast({
							message: "提交成功"
						})
						this.flag = !this.flag
						this.definition = this.name
						let num=this.showInstallNum+1
						this.collageInstallNum(num)
					} else {
						this.$toast({
							message: "提交失败"
						})
					}
				})
			},
			collageName() {
				this.flag = !this.flag
			},
			cancel() {
				this.flag = !this.flag
			},
			toOldPhone() {
				this.$router.push('oldPhone')
			},
			getInfo() {
				this.isLoad = true
				axios.post('/sys/t-sys-app-user/getAppUserInfo', {}).then(res => {
					if (res.meta.success) {
						
						this.definition = res.data.nickName
						this.phone = res.data.mobile
						this.headUrl = this.configUrl + res.data.headPic
						this.showHead = res.data.headPic
						this.isLoad = false
					} else {
						this.isLoad = false
					}
				})
			},
			login() {
				this.msg = "您确定要退出登录?"
				this.collage = 1
				this.modelFlag = true
			},
			confirms() {
				if (this.collage == 1) {
					if(!this.showVerSion){
					     this.modelFlag = false
						 window.localStorage.setItem('token', null)
						 this.addDesCont('basic')
						 this.$router.push({
						 	name: 'index'
						 })
					}else{
						this.modelFlag = false
						this.$router.push('login')
					}
					

				} else if (this.collage == 2) {

				}

			},
			cancels() {
				this.modelFlag = false
			},
			addImg(e) {
				let that = this
				var files = e.target.files;



				this.base64(files[0])


			},
			chooseImg() {
				let that = this
				uni.chooseimg({
					count: 6, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album', 'camera'],
					success: function(res) {
						// that.urlTobase64(res.tempFilePaths[0])
						that.headPic = res.tempFilePaths[0]
						that.base64(res.tempFilePaths)
					}
				});
			},
			base64(e) {
				console.log(e)
				let that = this
				let reader = new FileReader();
				let imgFile
				// let that = this
				reader.readAsDataURL(e)
				reader.onload = es => {
					that.convertImgToBase64(es.target.result, function(retImg) {
						that.headPicUrl = retImg
						that.headPic = retImg
						// that.imgList = that.imgList.concat(retImg);
					});
					// imgFile = e.target.result;
					// let arr = imgFile.split(',')
					// that.imgList.push(imgFile)
					// this.datas.faceBase64 = arr[1]
					// console.log(this.datas.faceBase64)
				}

			},
			// base64(e) {
			// 	let that = this
			// 	// this.imgList.push(e)

			// 	plus.io.resolveLocalFileSystemURL(e[0], function(entry) {
			// 		// 可通过entry对象操作test.html文件
			// 		entry.file(function(file) {
			// 			var fileReader = new plus.io.FileReader();
			// 			fileReader.readAsDataURL(file);
			// 			fileReader.onloadend = function(evt) {
			// 				that.headPicUrl = evt.target.result

			// 				// that.uploadimg(that.imgBase64List);
			// 			}
			// 		})
			// 	})

			// },
			collageHeadPic() {
				this.showHeadPic = true
			},
			prediv(index) {
				var imgList = [this.headPic]
				uni.predivimg({
					urls: imgList,
					current: imgList[0]
				});
			},
			headCancel() {
				this.showHeadPic = false
				this.headPic = ''
				this.headPicUrl = ''
			},
			headConfirm() {

				if (this.headPicUrl.length == 0) {
					this.$toast({
						message: "请选择头像",
						duration: 1000
					})
					return
				}
				this.showHeadPic = false
				this.isLoad = true
				let that = this
				let params = new FormData()
				params.append('headPic', this.headPicUrl)
				axios.post('/sys/t-sys-app-user/putHeadPicById', params).then(res => {
					if (res.meta.success) {
						this.isLoad = false
						setTimeout(() => {
							that.$toast({
								message: "修改成功",
								duration: 1000
							})
							let num=that.showInstallNum+1
							that.collageInstallNum(num)
							that.headUrl = that.headPic
							that.headPic = ''
							// plus.storage.setItem('collage', '1')
						}, 200)
					} else {
						this.isLoad = false
						setTimeout(() => {
							that.$toast({
								message: res.meta.msg,
								duration: 1000
							})
						}, 200)
					}
				})
			},
			toSever() {
				this.$router.push('serviceAgreement')
			},
			toPrivacy() {
				this.$router.push('privacyPolicy')

			},
			convertImgToBase64(url, callback, outputFormat) {

				var canvas = document.createElement('CANVAS');

				var ctx = canvas.getContext('2d');

				var img = new Image;

				img.crossOrigin = 'Anonymous';

				img.onload = function() {

					var width = img.width;

					var height = img.height;

					// 按比例压缩5倍

					var rate = (width < height ? width / height : height / width) / 2;

					canvas.width = width * rate;

					canvas.height = height * rate;

					ctx.drawImage(img, 0, 0, width, height, 0, 0, width * rate, height * rate);

					var dataURL = canvas.toDataURL(outputFormat || 'image/png');

					callback.call(this, dataURL);

					canvas = null;

				};

				img.src = url;

			}

		},
		created() {
			
			this.getInfo()
	
			var ua = window.navigator.userAgent.toLowerCase();
			if (ua.indexOf('micromessenger') > -1) {//微信浏览器

				this.showVerSion = false

			} else {
				let that = this
				plus.runtime.getProperty(plus.runtime.appid, function(widgetInfo) {
					that.version = widgetInfo.version
				})
			}
			


		}
	

	}
</script>

<style scoped>
	.content {
		width: 100vw;
		/* background: #fff; */
		position: relative;
	}

	.head {
		background: #fff;
		height: 1.10rem;
		padding: 0 0.2rem;
		display: flex;
		display: -webkit-box;
		display: -webkit-flex;
		justify-content: space-between;
		-webkit-box-pack: justify;
		-webkit-justify-content: space-between;
		align-items: center;
		-webkit-box-align: center;
		-webkit-align-items: center;
		font-size: 0.30rem;
		border-bottom: 1px solid #eee;
	}
     .content  .head:nth-last-child(2){
		 border: none !important;
	 }
	.head .head-img .person-img {
		height: 0.80rem;
		width: 0.80rem;
		border-radius: 50%;
	}

	.head .head-img .right-to {
		width: 0.15rem;
		height: 0.27rem;
		margin-left: 0.22rem;
	}

	.head .head-img {
		display: flex;
		display: -webkit-box;
		display: -webkit-flex;
		align-items: center;
		-webkit-box-align: center;
		-webkit-align-items: center;

	}

	.call {
		display: flex;
		display: -webkit-box;
		display: -webkit-flex;
		align-items: center;
		-webkit-box-align: center;
		-webkit-align-items: center;
		color: #898989;
	}

	.call img {
		width: 0.15rem;
		height: 0.27rem;
		margin-left: 0.22rem;
	}

	.btn-bottom {
		height: 0.88rem;
		width: 6.94rem;
		margin: 0.80rem auto 0 auto;
		border-radius: 0.50rem;
		background: #ff5f1e;
		line-height: 0.88rem;
		text-align: center;
		font-size: 0.30rem;
		color: #fff;
	}

	.showPage {
		height: 100%;
		background: rgba(0, 0, 0, 0.5);
		width: 100vw;
		/* z-index: 10; */
		position: fixed;
		top: 0;
		z-index: 1000;
	}

	.nickName {
		width: 6.50rem;
		/* height: 300upx; */
		border-radius: 0.25rem;
		position: fixed;
		top: 4.80rem;
		left: 50%;
		transform: translateX(-50%);
		-webkit-transform: translateX(-50%);
		z-index: 1001;
		background: #fff;
		overflow: hidden;
	}

	.nickName .nick {
		font-size: 0.42rem;
		width: 3rem;
		margin: 0.20rem auto;
		text-align: center;
	}

	.nick-center {
		margin-top: 0.35rem;
		margin-left: 0.50rem;
		display: flex;
		display: -webkit-box;
		display: -webkit-flex;
		align-items: center;
		-webkit-box-align: center;
		-webkit-align-items: center;
		font-size: 0.30rem;
	}

	.nick-center input {
		font-size: 0.28rem;
		border: none;
	}

	.nick-bottom {
		display: flex;
		border-top: 1px solid #ddd;
		margin-top: 0.30rem;
	}

	.nick-bottom div {
		width: 50%;
		font-size: 0.32rem;
		height: 1.20rem;
		line-height: 1.20rem;
		text-align: center;
	}

	.nick-bottom div:nth-child(1) {
		/* background: #007AFF;
		 color:#fff; */
		border-right: 1px solid #ddd;
	}

	/* 	.nick-bottom div:nth-child(2){
		 background: #F43F3B;
		 color:#fff;
	} */
	.headPic {
		width: 6.50rem;
		/* height: 300upx; */
		border-radius: 0.25rem;
		position: fixed;
		top: 3.30rem;
		left: 50%;
		transform: translateX(-50%);
		z-index: 1001;
		background: #fff;
		overflow: hidden;
		display: flex;
		display: -webkit-box;
		display: -webkit-flex;
		flex-direction: column;
		-webkit-box-direction: normal;
		-webkit-box-orient: vertical;
		-moz-flex-direction: column;
		-webkit-flex-direction: column;
		justify-content: center;
		-webkit-box-pack: center;
		-webkit-justify-content: center;
	}

	.head-title {
		font-size: 0.42rem;
		width: 3rem;
		margin: 0.20rem auto;
		text-align: center;
		position: relative;
	}

	.head-title .inputImg {
		position: absolute;
		top: 0.7rem;
		height: 2rem;
		width: 2rem;
		left: 50%;
		transform: translateX(-50%);
		opacity: 0;
	}

	.headPic img {
		width: 2rem;
		height: 2rem;
		border-radius: 50%;
		margin: 0 auto;
	}

	.headPic-bottom {
		display: flex;
		border-top: 1px solid #ddd;
		margin-top: 0.30rem;
	}

	.headPic-bottom div {
		width: 50%;
		font-size: 0.32rem;
		height: 1.20rem;
		line-height: 1.20rem;
		text-align: center;
	}

	.headPic-bottom div:nth-child(1) {
		/* background: #007AFF;
		 color:#fff; */
		border-right: 1px solid #ddd;
	}
</style>
