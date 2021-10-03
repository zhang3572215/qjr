<template>
	<div>
		<!-- <div class='head'>
			<div class='head-left'>
				<img src="../../static/left-go.png" mode=""></img>
				<text>返回</text>
			</div>
			<div class='head-center'>
						 我的投诉
			</div>
		</div> -->
		<head-Piece>
			<template slot="content">我的投诉</template>
		</head-Piece>
		
		<div class='content-reason' @click="tabCollage">
			<div>
				投诉原因
			</div>
			<div class='select-reason'>
				<div class="uni-list-cell-db ">
					<!-- <picker @change="bindPickerChange" @click="tabCollage" style='display: flex;' :value="index" :range="array">
						<div class="uni-input pad" v-if='index!==null' @click="tabCollage">{{array[index]}}</div>
						<div class="uni-input gray  pad" v-if='index===null' @click="tabCollage">请选择</div>

					</picker> -->
					<div class="pad" v-if='complantValue!==null'>{{complantValue}}</div>
					<div class="uni-input gray  pad" v-if='complantValue===null'>请选择</div>
					<img src="../../assets/right-to.png" ></img>
				</div>
			</div>
		</div>
		<div class='content-upload'>
			<div class="upload-tit">
				上传凭证
			</div>
			<div class='upload-camera'>
				<div class='showImg' v-for='(item,index) in imgList'>

					<img :src='item'>
					<div @touchstart="gotouchstart(index)" @touchmove="gotouchmove" @touchend="gotouchend(index)" @click="prediv(item)"></div></img>
				</div>
				<div class="upload-img" v-if='imgList.length<3'>
					<div @click='chooseImg'>
						<img class='camera' src='../../assets/camera.png'></img>
						<div>
							上传图片
						</div>
					</div>
					<!-- <input class='inputImg' @change="addImg" type="file" accept="image/png,image/jpeg,image/gif,image/jpg" ref="inputer"
					 multiple> -->
					 <input class='inputImg' @change="addImg" type="file" accept="image/*" ref="inputer"
					  multiple>
				</div>

			</div>


		</div>
		<div class='content-remark'>
			<div class='remark-tit'>
				备注
			</div>
			<div class='remark-text'>
				<textarea v-model="remark"></textarea>
			</div>
		</div>
		<div class='order-bottom'>

			<div class='complaint' @click="cancle">取消</div>
			<div @click='confirm'>提交</div>
		</div>
		<van-popup v-model="showPicker" position="bottom">
			<van-picker show-toolbar :columns="array" @cancel="showPicker = false" @confirm="onConfirm" />
		</van-popup>
		<wimg :show="isShowBigImg" :imgs="imgList" :currentImg="current" @close="isShowBigImg = false" v-if='imgList.length>0'></wimg>
		<Load v-if='isLoad'></Load>
		<showMoadel v-if='modelFlag' :cont='"是否要删除图片?"' :cancelText='"取消"' :confirmText='"确定"' @define='confirms' @remove='cancel'></showMoadel>
	</div>
</template>

<script>
	import * as axios from '../../untils/ajax.js'
	import wimg from 'w-previewimg'
	var timeOutEvent = 0; //定时器  
	import {
		mapState,
		mapActions
	} from 'vuex'
	export default {
		data() {
			return {
				array: ['旷工', '打扫不干净', '其他'],
				index: null,
				collage: false,
				imgList: [],
				imgList: [],
				composeId: '',
				cause: '',
				remark: '',
				isLoad: false,
				modelFlag: false,
				signIndex: '',
				showPicker: false,
				complantValue: null,
				current: '',
				isShowBigImg: false,
				modelFlag: false
			}
		},
		computed: {
			...mapState(['complanitId'])
		},
		components: {
			wimg
		},
		methods: {
			...mapActions(['collageComplanitId']),
			bindPickerChange: function(e) {
				console.log('picker发送选择改变，携带值为', e.target.value)
				this.index = e.target.value

				this.collage = false
				this.cause = Number(e.target.value) + 1
			},
			tabCollage: function() {
				this.showPicker = !this.showPicker
				// console.log(444)
				// this.collage = true
			},
			onConfirm(value) {
				this.complantValue = value;
				this.showPicker = false;
				this.array.forEach((item, index) => {
					if (item == value) {
						this.cause = index + 1
					}
				})
			},
			addImg(e) {
				let that = this
				var files = e.target.files;
				let imgLength = files.length + this.imgList.length
				if (imgLength > 3) {

					this.$toast({
						message: "只能上传三张图片",
						duration: 1500
					})
					return
				}

				for (var i = 0; i < files.length; i++) {
					this.base64(files[i])
				}


				//转码base64

			},
			chooseImg() {
				let that = this
				uni.chooseimg({
					count: 6, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album', 'camera'],
					success: function(res) {
						// that.urlTobase64(res.tempFilePaths[0])
						that.imgList.push(res.tempFilePaths[0])
						that.base64(res.tempFilePaths)
					}
				});
			},
			toBase64(url) {
				uni.getFileSystemManager().readFile({
					filePath: url, //选择图片返回的相对路径
					encoding: 'base64', //编码格式
					success: res => { //成功的回调
						let base64 = 'data:img/jpeg;base64,' + res.data //不加上这串字符，在页面无法显示的哦
						// console.log(base64)

					}
				})
			},
			urlTobase64(url) {
				let that = this
				uni.request({
					url: url,
					method: 'GET',
					responseType: 'arraybuffer',
					success: res => {
						let base64 = uni.arrayBufferToBase64(res.data); //把arraybuffer转成base64
						base64 = 'data:img/jpeg;base64,' + base64; //不加上这串字符，在页面无法显示
						// console.log(base64);
						that.imgList.push(base64)
					}
				});
			},
			deletImg(index) {
				let that = this
				this.modelFlag = true
				this.signIndex = index
				console.log(index)
				// this.toast.showNewModal('提示','是否要删除图片?',true,'取消','确定',function(){
				// 	that.imgList.splice(index,1)
				// })

			},
			gotouchstart(index) {

				let that = this;

				clearTimeout(timeOutEvent); //清除定时器
				timeOutEvent = 0;
				timeOutEvent = setTimeout(function() {
					that.modelFlag = true
					that.signIndex = index
					//执行长按要执行的内容，
				}, 800); //这里设置定时
			},
			//手释放，如果在500毫秒内就释放，则取消长按事件，此时可以执行onclick应该执行的事件
			gotouchend() {
				clearTimeout(timeOutEvent);
				if (timeOutEvent != 0) {
					//这里写要执行的内容（尤如onclick事件）

				}
			},
			//如果手指有移动，则取消所有事件，此时说明用户只是要移动而不是长按 
			gotouchmove() {
				clearTimeout(timeOutEvent); //清除定时器
				timeOutEvent = 0;
			},
			confirms() {
				this.modelFlag = false
				this.imgList.splice(this.signIndex, 1)
			},
			cancel() {
				this.modelFlag = false
			},
			prediv(index) {
				this.isShowBigImg = true
				this.current = index

				// uni.predivimg({
				//     urls: that.imgList,
				//     current:that.imgList[index]
				// });
			},
			confirm() {
				let pics = this.imgList.join('.')
				if (this.remark.length == 0) {
					this.$toast({
						message: '请填写备注',
						duration: 1500
					})
					return
				} else if (this.cause.toString().length == 0) {
					console.log(this.cause)
					this.$toast({
						message: '请选择投诉原因',
						duration: 1500
					})
					return
				}
				this.isLoad = true
				let that = this
				let params = new FormData()
				params.append('composeId', this.composeId)
				params.append('cause', this.cause)
				params.append('pics', pics)
				params.append('remark', this.remark)
				axios.post('/office/t-office-complain/postComplain', params).then(res => {
					if (res.meta.success) {
						this.isLoad = false
						// this.toast.success('投诉成功')
						this.$toast({
							message: '投诉成功',
							duration: 1500
						})
						setTimeout(() => {
							that.$router.go(-1)
							let flag = !that.complanitId
							that.collageComplanitId(flag)
							// uni.navigateBack({
							// 	delta:1
							// })
						}, 1000)

					} else {
						console.log(this.complanitId)
						this.isLoad = false
						// this.toast.fail(res.meta.msg)
						this.$toast({
							message: res.meta.msg,
							duration: 1500
						})
					}
				})
			},
			base64(e) {
				// this.imgList.push(e)

				// plus.io.resolveLocalFileSystemURL(e[0], function(entry) {
				// 	// 可通过entry对象操作test.html文件
				// 	entry.file(function(file) {
				// 		var fileReader = new plus.io.FileReader();
				// 		fileReader.readAsDataURL(file);
				// 		fileReader.onloadend = function(evt) {
				// 			that.imgList = that.imgList.concat(evt.target.result);
				// 			console.log(that.imgList)

				// 		}
				// 	})
				// })
				let that = this
				let reader = new FileReader();
				let imgFile
				// let that = this
				reader.readAsDataURL(e)
				reader.onload = e => {
					// imgFile = e.target.result;
					that.convertImgToBase64(e.target.result, function(retImg) {

						that.imgList = that.imgList.concat(retImg);
					});

					//    let arr = imgFile.split(',')
					// that.imgList.push(imgFile)	
					// this.datas.faceBase64 = arr[1]
					// console.log(this.datas.faceBase64)
				}

			},
			convertImgToBase64(url, callback, outputFormat) {

				var canvas = document.createElement('CANVAS');

				var ctx = canvas.getContext('2d');

				var img = new Image;

				img.crossOrigin = 'Anonymous';

				img.onload = function() {

					var width = img.width;

					var height = img.height;

					// 按比例压缩1倍

					var rate = (width < height ? width / height : height / width) / 8;

					canvas.width = width * rate;

					canvas.height = height * rate;

					ctx.drawImage(img, 0, 0, width, height, 0, 0, width * rate, height * rate);

					var dataURL = canvas.toDataURL(outputFormat || 'image/png');

					callback.call(this, dataURL);

					canvas = null;

				};

				img.src = url;

			},
			cancle() {
				this.$router.go(-1)
			}
		},
		created() {
			// console.log(options)
			this.composeId = this.$route.params.composeNo
		},
		watch: {

		}
	}
</script>

<style scoped>
	/* 	.head {
		padding-top: 0.40rem;
		height: 0.88rem;
		width: 100%;
		background: #36a8fa;
		text-align: center;
		position: relative;
		box-sizing: content-box;
		color: #fff;
		font-size: 33upx;
		z-index: 20000;
	}
 */
	.head-left {
		height: 100%;
		line-height: 88upx;
		float: left;
		width: 30%;
		display: flex;
	}

	.head-left img {
		display: inline-block;
		width: 18upx;
		height: 32upx;
		position: absolute;
		margin-left: 28upx;
		top: 68.5upx;
	}

	.head-left text {
		margin-left: 60upx;

	}

	.head-center {
		height: 100%;
		width: 40%;
		line-height: 88upx;
		text-align: center;
		float: left;
	}

	.head-right {
		/* float: left; */
		height: 88upx;
		width: 30%;

	}

	.content-reason {
		/* margin-top: 0.20rem; */
		background: #FFFFFF;
		height: 0.88rem;
		display: flex;
		display: -webkit-box;
		display: -webkit-flex;
		justify-content: space-between;
		-webkit-box-pack: justify;
		-webkit-justify-content: space-between;
		align-items: center;
		-webkit-box-align: center;
		-webkit-align-items: center;
		padding: 0 0.21rem 0 0.28rem;
		font-size: 0.30rem;
		z-index: 1000000;
	}

	.gray {
		color: #999;

	}

	.pad {
		padding-right: 0.46rem;
	}

	.select-reason img {
		display: block;
		height: 0.22rem;
		width: 0.12rem;
		transform: rotate(90deg);
		-webkit-transform: rotate(90deg);
		margin-left: 0.24rem;
		transition: all 0.5s;
		-webkit-transition: all 0.5s;
		position: absolute;
		right: 0.07rem;
	}

	.select-reason .uni-list-cell-db {
		display: flex;
		display: -webkit-box;
		display: -webkit-flex;
		align-items: center;
		-webkit-box-align: center;
		-webkit-align-items: center;
		position: relative;
	}

	.select-reason img.showCollage {
		transform: rotate(270deg);
		-webkit-transform: rotate(270deg);
	}

	.content-upload {
		margin-top: 0.20rem;
		padding: 0.32rem 0.28rem 0.20rem 0.28rem;
		font-size: 0.30rem;
		background: #fff;
	}

	.content-upload .upload-tit {
		margin-bottom: 0.28rem;
	}

	.upload-camera {
		display: flex;
		height: 1.65rem;
		overflow: hidden;
	}

	.upload-img {
		position: relative;
		width: 1.62rem;
		height: 1.62rem;
		border: 1px dotted #ddd;
		display: flex;
		display: -webkit-box;
		display: -webkit-flex;
		justify-content: center;
		-webkit-box-pack: center;
		-webkit-justify-content: center;
		align-items: center;
		-webkit-box-align: center;
		-webkit-align-items: center;
		color: #a2a2a2;
	}

	.upload-img .camera {
		display: block;
		width: 0.50rem;
		height: 0.40rem;
		margin: 0 auto 0.16rem auto;
	}

	.upload-camera .showImg {}

	.upload-camera .showImg div {
		width: 1.62rem;
		height: 1.62rem;
		transform: translateY(-1.7rem);

	}

	.upload-camera .showImg img {
		width: 1.62rem;
		height: 1.62rem;
		margin-right: 0.15rem;
		/* pointer-events: none; */


	}

	input.inputImg {
		position: absolute;
		top: 0;
		width: 100%;
		height: 100%;
		padding: 0;
		margin: 0;
		border: 0;
		opacity: 0;
		left: 0;
	}

	.content-remark {
		margin-top: 0.20rem;
		padding: 0.24rem 0.28rem 0.30rem 0.28rem;
		background: #fff;
		font-size: 0.30rem;
	}

	.content-remark .remark-tit {
		margin-bottom: 0.30rem;
	}

	.remark-text {
		width: 100%;
		height: 1.46rem;
		/* overflow: hidden; */
		/* overflow-y: scroll; */
		/* overflow-y:auto; */
		border: 1px solid #ddd;
		z-index: 1000;
		overflow-y: scroll !important;
		overflow-x: hidden;

	}

	.remark-text::-webkit-scrollbar {
		display: block;
		width: 0.30rem;
		height: 0.30rem;
	}

	.remark-text::-webkit-scrollbar-track-piece {
		background-color: #f5f5f5;
	}

	.remark-text::-webkit-scrollbar-thumb {
		border-radius: 0.40rem;
		background-color: #ddd;
		background-clip: padding-box;

		min-height: 0.28rem;

	}

	.remark-text textarea {
		display: block;
		height: 1.60rem;
		width: 100%;
		/* border:1px  solid #ddd; */
		border: none;
	}

	.order-bottom {
		height: 1rem;
		width: 100vw;
		background: #fff;
		position: fixed;
		bottom: 0;
		display: flex;
		display: -webkit-box;
		display: -webkit-flex;
		align-items: center;
		-webkit-box-align: center;
		-webkit-align-items: center;
		justify-content: flex-end;
		-webkit-justify-content: flex-end;
		/* flex-direction: row-reverse; */
	}

	.order-bottom div {
		width: 1.70rem;
		height: 0.64rem;
		border-radius: 0.32rem;
		border: 1px solid #ff5f1e;
		color: #FF5F1E;
		text-align: center;
		line-height: 0.66rem;
		margin-right: 0.20rem;
		font-size: 0.3rem;
	}

	.appointment {}

	.order-bottom .complaint {
		border: 1px solid #999 !important;
		color: #000 !important;
	}

	.zhezhao {
		z-index: 3000;
	}
</style>
