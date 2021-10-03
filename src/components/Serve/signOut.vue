<template>
	<div>

		<div class='contents'>
			<div class='head'>
				<div class='head-left' @click='toBack'>
					<img src="../../assets/left-black.png" mode=""></img>
					<span>返回</span>
				</div>
				<div class='head-center'>
					签退
				</div>
				<div class='head-right'>

				</div>
			</div>
		</div>
		<div class='head-show'>
		</div>
		<div class='nav'></div>
		<div class='content-upload'>
			<div class="upload-tit">
				签退图片<span class='unnecessary'>(非必传)</span>
			</div>
			<div class='upload-camera'>
				<div class='showImg' v-for='(item,index) in imgList'>
					<img :src='item'>
					<div @touchstart="gotouchstart(index)" @touchmove="gotouchmove" @touchend="gotouchend(index)" @click="prediv(item)"></div></img>
				</div>
				<div class="upload-img" v-if='imgList.length<3'>
					<div>
						<img class='camera' src='../../assets/camera.png'></img>
						<div class='camera-tit'>
							上传图片
						</div>
					</div>
					<input class='inputImg' @change="addImg" type="file" accept="image/png,image/jpeg,image/gif,image/jpg" ref="inputer"
					 multiple>
				</div>
			</div>
		</div>

		<div class='sign-btn' @click="confirm">
			签退
		</div>
		<div class='positionInfo'>
			<img class='guarantee' src="../../assets/guarantee.png" alt="">
			<img class='finish' src="../../assets/finish.png">
			 <span v-if='showRange'>已经进入签退范围{{addrName}} </span>
			 <span class='discontent' v-else>您当前未在签退范围内</span>
			 <span @click="relocate">重新定位</span>
		</div>
		<!-- 	<div class='remark'>
			<div class='remark-tit'>买家叮嘱：</div>
			<div class='remark-content'>
				大多数都是发生的点点点点大大的大大的大大的大大的大大的大大的大大说的是当时当时的速度上单上单上单上单上单上单上单上单上单上单上单上单上单上单上单上单上单上单上单上单上单上单上单上单上单上单上单
			</div>
		</div> -->

		<div class="amap-page-container" v-show="false">
			<el-amap vid="amap" :plugin="plugin" class="amap-demo" v-if='mapFLag'>
			</el-amap>
		</div>

		<Load v-if='isLoad'></Load>
		<tips :msg='msgContent' v-if='showTips'></tips>
		<showMoadel v-if='modelSign' :cont='"是否要删除图片?"' @define='confirms' @remove='cancels'></showMoadel>
		<wimg :show="isShowBigImg" :imgs="imgList" :currentImg="current" @close="isShowBigImg = false" v-if='imgList.length>0'></wimg>
		<showSuccess v-if='isSuccess' :successInfo='"签退成功"'></showSuccess>
	</div>
</template>

<script>
	var timeOutEvent = 0; //定时器  
	import wimg from 'w-previewimg'
	import {
		mapMutations,
		mapActions,
		mapState
	} from 'vuex'
	import * as axios from '../../untils/ajax.js'
	export default {
		data() {
			var _this=this
			return {
				array: ['旷工', '打扫不干净', '其他'],
				index: null,
				collage: false,
				imgList: [],
				composeId: '',
				cause: '',
				remark: '',
				signId: null,
				file: '',
				msgContent: '只能上传三张图片',
				showTips: false,
				modelSign: false,
				signIndex: '',
				isShowBigImg: false,
				current: '',
				isSuccess: false,
				isLoad: false,
				plugin: [{
					pName: 'Geolocation',
					events: {
						init(o) {
							// o 是高德地图定位插件实例
							o.getCurrentPosition((status, result) => {
								if (result && result.position) {
									// console.log(result)
									_this.lonLat2=[result.position.lng,result.position.lat]
									_this.calculateDistance()
									// 	 _this.city =result.addressComponent.city
									// _this.boolCityExit()


									// self.lng = result.position.lng;
									// self.lat = result.position.lat;
									// self.center = [self.lng, self.lat];
									// self.loaded = true;
									// self.$nextTick();
								}
							});
						}
					}
				}],
				mapFLag: true,
				lonLat1:[],
			    lonLat2:[],
				showRange:true,
				addrName:''
			}
		},
		components: {
			wimg
		},
		computed: {
			...mapState(['desId'])
		},
		methods: {
			...mapMutations(['addBackDes']),
			...mapActions(['addShowSignId']),
			bindPickerChange: function(e) {
				console.log('picker发送选择改变，携带值为', e.target.value)
				this.index = e.target.value

				this.collage = false
				this.cause = e.target.value + 1
			},
			toBack() {
				this.$router.go(-1)
			},
			tabCollage: function() {
		
				this.collage = true
			},
			addImg(e) {
				let that = this
				var files = e.target.files;
				let imgLength = files.length + this.imgList.length
		
				if (imgLength > 3) {
					this.msgContent = "只能上传三张图片"
					this.showTips = true
					setTimeout(() => {
						that.showTips = false
					}, 1500)
					return
				}

				for (var i = 0; i < files.length; i++) {
					this.base64(files[i])
				}

				// let that=this
				// var a = [{
				// 	title: "拍照"
				// }, {
				// 	title: "从手机相册选择"
				// }];
				// plus.nativeUI.actionSheet({
				// 	title: "选择图片",
				// 	cancel: "取消",
				// 	buttons: a
				// }, function(b) { /*actionSheet 按钮点击事件*/
				// 	switch (b.index) {
				// 		case 0:
				// 			break;
				// 		case 1:
				// 			that.getImage(); /*拍照*/
				// 			break;
				// 		case 2:
				// 			that.galleryImg(); /*打开相册*/
				// 			break;
				// 		default:
				// 			break;
				// 	}
				// })
				//转码base64

			},
			chooseImg() {
				let that = this
				// uni.chooseimg({
				// 	count: 6, //默认9
				// 	sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
				// 	sourceType: ['album'], //从相册选择
				// 	success: function(res) {
				// 		// that.urlTobase64(res.tempFilePaths[0])
				//                        that.base64(res.tempFilePaths)
				// 	}
				// });


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

				this.toast.showNewModal('提示', '是否要删除图片?', true, '取消', '确定', function() {
					that.imgList.splice(index, 1)
				})

			},
			prediv(index) {
				let that = this
				// console.log(typeof that.imgList[index])
				// let img=item.slice(5).toString()
				// console.log(that.imgList[index])
				this.isShowBigImg = true
				this.current = index

			},
			confirm() {
				let that = this
				// if(!this.showRange){
				// 	this.$toast({
				// 		message:'您当前未在签退范围内',
				// 		duration:1500
				// 	})
				// 	return
				// }
				let pics = this.imgList.join('.')
				let params = new FormData()
				params.append('composeId', this.composeId)
				params.append('signoutPics', pics)
				params.append('singoutLat',this.lonLat1[1])
				params.append('singoutLon',this.lonLat1[0])
				let  singoutFlag=this.showRange?1:2
				params.append('singoutFlag',singoutFlag)
				this.isLoad = true
				axios.post('/office/t-office-compose/signOut', params).then(res => {
					this.isLoad = false
					if (res.meta.success) {
						this.isSuccess = true
						let num = Number(this.desId) + 1
						this.addShowSignId(num)
						setTimeout(() => {
							that.isSuccess = false
							that.$router.go(-1)
						}, 1000)

						// this.addBackDes('task')
						// this.addShowSignId(this.signId)
						// uni.navigateTo({
						// 	  url:"/pages/index/index"
						// })
					} else {
						this.msgContent = '签退失败'
						this.showTips = true
						setTimeout(() => {
							that.showTips = false
						}, 1500)
					}
				})
			},
			base64(e) {
				let that = this
				let reader = new FileReader();
				let imgFile
				// let that = this
				reader.readAsDataURL(e)
				reader.onload = e => {
					that.convertImgToBase64(e.target.result, function(retImg) {

						that.imgList = that.imgList.concat(retImg);
					});
					//    imgFile = e.target.result;
					//    let arr = imgFile.split(',')
					// that.imgList.push(imgFile)	
					// this.datas.faceBase64 = arr[1]
					// console.log(this.datas.faceBase64)
				}
				// let that = this
				// plus.io.resolveLocalFileSystemURL(e, function(entry) {
				// 	// 可通过entry对象操作test.html文件
				// 	entry.file(function(file) {
				// 		var fileReader = new plus.io.FileReader();
				// 		fileReader.readAsDataURL(file);
				// 		fileReader.onloadend = function(evt) {
				// if(that.imgList.length<3){
				// 	    that.convertImgToBase64(evt.target.result, function (retImg) {

				// 	               that.imgList = that.imgList.concat(retImg);
				// 	     });


				// 	// that.imgList = that.imgList.concat(evt.target.result);
				// }else{
				//    that.$toast({
				//        message: '只能上传三张图片', duration: 1500
				//    })
				// }

				// 			console.log(that.imgList)
				// 			// that.uploadImage(that.imageBase64List);
				// 		}
				// 	})
				// })
			},
			gotouchstart(index) {
				let that = this;

				clearTimeout(timeOutEvent); //清除定时器
				timeOutEvent = 0;
				timeOutEvent = setTimeout(function() {
					that.modelSign = true
					that.signIndex = index
					//执行长按要执行的内容，
				}, 1000); //这里设置定时
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
				this.modelSign = false
				this.imgList.splice(this.signIndex, 1)
			},
			cancels() {
				this.modelSign = false
			},
			//拍照
			getImage() {
				let that = this
				var c = plus.camera.getCamera();
				c.captureImage(function(e) {


					var fileSrc = e
					that.base64(fileSrc)
					// plus.io.resolveLocalFileSystemURL(e, function(entry) {
					// 	// uploadHead(s); /*上传图片*/ 

					// }, function(e) {
					// 	console.log("读取拍照文件错误：" + e.message);
					// });
				}, function(s) {
					console.log("error" + s);
				}, {
					filename: "_doc/head.png"
				})
			},
			// 从相册选图上传
			galleryImg() {
				let that = this
				plus.gallery.pick(function(e) {

					for (var i in e.files) {

						var fileSrc = e.files[i]
						that.base64(fileSrc)
					}

				}, function(e) {

					console.log("取消选择图片");

				}, {

					filter: "image",

					multiple: true,

					maximum: 3,

					system: false,

					onmaxed: function() {

						plus.nativeUI.alert('最多只能选择3张图片');

					}

				});

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
		 //计算当前位置和考勤地点的距离
			calculateDistance(){
				var p1 = this.lonLat1;
				var p2 =this.lonLat2;
				// 返回 p1 到 p2 间的地面距离，单位：米
				var dis = Number(AMap.GeometryUtil.distance(p1, p2).toFixed(2))
				if(dis<=200){
					this.showRange=true
				}else{
					this.showRange=false
				}
				this.isLoad=false
			},
			//重新定位
			relocate(){
				this.isLoad=true
				let that=this
				// this.city='正在定位'
				this.mapFLag=false
				setTimeout(()=>{
					that.mapFLag=true
				},0)
				
			},


		},
		mounted() {
		
		},
		created() {
			this.isLoad=true
			this.signId = this.$route.params.signId
			this.composeId = this.$route.params.id
			this.addrName=this.$route.params.addrName
			this.lonLat1=this.$route.params.LonLat
		},
		// onLoad(options) {
		// 	console.log(options)
		// 	console.log(options)
		// 	this.signId=options.signId
		// 	this.composeId = options.id
		// },
		watch: {

		}
	}
</script>

<style scoped>
	.contents {
		position: fixed;
		top: 0;
		z-index: 1;
		width: 100vw;
	}

	.head {
		padding-top: 0.38rem;
		height: 0.88rem;
		width: 100vw;

		background: #fff !important;
		text-align: center;
		/* position: relative; */
		box-sizing: content-box;
		/* color:#fff; */
		font-size: 0.33rem;
		z-index: 20000;
		color: #000000 !important;
	}

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
		transform: translateY(-50%);
		-webkit-transform: translateY(-50%);
		width: 50%;
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
		font-size: 0.32rem;
	}

	.head-show {

		height: 1.28rem;
		width: 100%;
	}

	.nav {
		height: 0.2rem;
		background: #f8f8fa;
	}


	.content-reason {
		margin-top: 0.2rem;
		display: flex;
		background: #FFFFFF;
		height: 0.88rem;
		align-items: center;
		justify-content: space-between;
		padding: 0 0.21rem 0 0.28rem;
		font-size: 0.30rem;
	}

	.gray {
		color: #999;

	}

	.pad {
		padding-right: 0.46rem;
	}


	.content-upload {
		/* margin-top: 20upx; */
		padding: 0.32rem 0.28rem 0.20rem 0.28rem;
		font-size: 0.30rem;
		background: #fff;
	}

	.content-upload .upload-tit {
		margin-bottom: 0.28rem;
		color: #3c4244;
	}

	.content-upload .upload-tit .unnecessary {
		color: #5c5e5f;
		margin-left: 0.28rem;
	}

	.upload-camera {
		display: flex;
		display: -webkit-flex;
		height: 1.7rem;
		overflow: hidden;
	}

	.upload-img {
		width: 1.62rem;
		height: 1.62rem;
		border: 1px dotted #ddd;
		/* display: flex;
		align-items: center;
		justify-content: center; */
		color: #a2a2a2;
		position: relative;
	}

	.upload-img .camera {
		display: block;
		width: 0.50rem;
		height: 0.40rem;
		margin: 0 auto 0.16rem auto;
		position: absolute;
		top: 0.4rem;
		left: 50%;
		transform: translateX(-50%);
		-webkit-transform: translateX(-50%);

	}

	.upload-img .camera-tit {
		width: 100%;
		text-align: center;
		position: absolute;
		top: 0.9rem;
		left: 50%;
		transform: translateX(-50%);
		-webkit-transform: translateX(-50%);

	}

	.upload-camera .showImg div {
		width: 1.62rem;
		height: 1.62rem;
		transform: translateY(-1.7rem);

	}

	.upload-camera .showImg img {
		width: 1.62rem;
		height: 1.62rem;
		margin-right: 0.15rem;
	}

	.sign-btn {
		height: 0.64rem;
		width: 6rem;
		background: #ff5f1e;
		line-height: 0.64rem;
		text-align: center;
		margin: 0.70rem auto 0 auto;
		font-size: 0.28rem;
		color: #fff;
		border-radius: 0.50rem;
	}

	input.inputImg {
		position: absolute;
		top: 0;
		width: 1.63rem !important;
		height: 1.63rem !important;
		padding: 0;
		margin: 0;
		border: 0;
		opacity: 0;
	}
    .positionInfo{
		margin-top: 0.3rem;
		width: 100%;
		display: flex;
		display: -webkit-box;
		display: -webkit-flex;
		justify-content: center;
		-webkit-box-pack: center;
		-webkit-justify-content: center;
		align-items: center;
		-webkit-box-align: center;
		-webkit-align-items: center;
		
		font-size: 0.28rem;
	}
	.positionInfo span:nth-child(3).discontent{
		 color: #CE3C39;
	}
	.positionInfo span:nth-child(4){
		 margin-left: 0.1rem;
		 color: #0099FF;
	}
   .positionInfo	.guarantee{
		width: 0.25rem;
		height: 0.3rem;
	}
	 .positionInfo .finish{
		width: 0.25rem;
		height: 0.25rem;
		margin:0 0.1rem;
	}
	.zhezhao {
		z-index: 3;
	}
</style>
