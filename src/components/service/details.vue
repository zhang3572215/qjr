<template>
	<div>
		<head-Piece>
			<template slot="content">服务详细</template>
		</head-Piece>
	
		<div class='content'>
			<div class='content-info '>
				<div class='info-img'>
					<img :src='info.picUrl'></img>
				</div>
				<div>
					<div class='info-lady'>{{info.employeeName}}<span>工号：{{info.code}}</span></div>
					<div class='info-service'>服务单号：<span>{{info.composeNo}}</span></div>
				</div>
			</div>
			<div class='content-register'>
				<div class='register-tit'>签到时间<span class='register-date'>{{info.signinDate}}</span>
					<span class='register-time'>{{info.signinTime}}</span>
				</div>
				<div class='register-img' v-if='info.signinPics.length!=0'>
					
						<img :src='item' @click='predivIn(item)' v-for="(item,index) in info.inImgList " :key='index'> </img>
					

				</div>
			</div>
			<div class='content-register'>
				<div class='register-tit'>签退时间<span class='register-date'>{{info.signoutDate}}</span>
					<span class='register-time'>{{info.signoutTime}}</span>
				</div>
				<div class='register-img' v-if='info.signoutPics.length!=0' v-for="(item,index)  in  info.outImgList " :key='index'>

					<img :src='item' @click="predivOut(item)"> </img>
				</div>
			</div>
		</div>
		<!-- <div class='order-bottom'>
			<div @click='tapComment'>去评价</div>
			<div @click='tapComplaint' class='complaint'>发起投诉</div>
		</div> -->
		<Load v-if='isLoad'></Load>
		<wimg :show="isShowOutImg" :imgs="info.outImgList" :currentImg="outCurrent" @close="isShowOutImg = false" v-if='info.outImgList.length>0'></wimg>
		<wimg :show="isShowInImg" :imgs="info.inImgList" :currentImg="inCurrent" @close="isShowInImg = false" v-if='info.inImgList.length>0'></wimg>
	</div>
</template>

<script>
	// import heads from '../compent/head.vue'
	import * as axios from '../../untils/ajax.js'
			import wimg from 'w-previewimg'
	export default {
		// components:{heads},
		data() {
			return {
				info: {outImgList:[],inImgList:[],signinPics:''},
				composeNo: '',
				isLoad: false,
				isShowOutImg: false,
				outCurrent: '',
				isSuccess: false,
				isLoad:false,
				isShowInImg:false,
				inCurrent:','
			}
		},
		components: {
			wimg
		},
		methods: {
			getInfo() {
				this.isLoad = true
				let params=new FormData()
				params.append('composeId',this.composeNo)
				axios.post('/office/t-office-order/getServiceDetails',params).then(res => {
					console.log(res)
					if (res.meta.success) {
						this.isLoad = false
						this.info = res.data[0]
						var signinTime = this.info.signinTime.split(' ')
						var signoutTime = this.info.signoutTime.split(' ')

						this.info.signinDate = signinTime[0]
						this.info.signinTime = signinTime[1]
						this.info.signoutDate = signoutTime[0]
						this.info.signoutTime = signoutTime[1]
						if (this.info.picUrl.lenth == 0) {

						} else {
							this.info.picUrl = this.configUrl + this.info.picUrl
						}
						if (this.info.signinPics.length > 0) {
							if (this.info.signinPics.includes(';')) {
								let img = this.info.signinPics.split(';')
								let imgList = []
								for (var i = 0; i < img.length; i++) {
									imgList.push(this.configUrl + img[i])
								}
								this.info.inImgList = imgList
							} else {
								let imgList = []
								let imgUrl = this.configUrl + this.info.signinPics
								imgList.push(imgUrl)
								this.info.inImgList = imgList
								console.log(typeof imgList)
							}

						}else{
							this.info.inImgList =[]
						}
						if (this.info.signoutPics.length > 0) {
							if (this.info.signoutPics.includes(';')) {
								let imgs = this.info.signoutPics.split(';')
								let imgLists = []
								for (var i = 0; i < imgs.length; i++) {
									imgLists.push(this.configUrl + imgs[i])
								}
								console.log(this.info.signoutPics)
								this.info.outImgList = imgLists
							} else {
								let imgLists = []
								let imgUrls = this.configUrl + this.info.signoutPics
								imgLists.push(imgUrls)
								this.info.outImgList = imgLists
								console.log(this.info.outImgList)
							}

						}else{
							this.info.outImgList =[]
						}
						// this.toast.success('验证码已发送')
						this.isLoad = false
					} else {
						this.isLoad = false
						this.toast.fail('获取数据失败')
					}
				})
			},
			tapComment() {
				uni.navigateTo({
					url: '/pages/service/evaluation?composeNo=' + this.composeNo
				})
			},
			tapComplaint() {
				uni.navigateTo({
					url: '/pages/service/complaint?composeNo=' + this.composeNo
				})
			},
			predivIn(index) {
				let that = this
				this.isShowInImg = true
				this.inCurrent = index
				// uni.predivimg({
				// 	urls: that.info.inImgList,
				// 	current: that.info.inImgList[index]
				// });
			},
			predivOut(index) {

				let that = this
             this.isShowOutImg = true
             this.outCurrent = index
				// uni.predivimg({

				// 	urls: that.info.outImgList,

				// 	current: that.info.outImgList[index]

				// });

			},
		},
		created() {
			this.composeNo = this.$route.params.complainNo
			this.getInfo()
		}
	}
</script>

<style scoped>
	.pad {
		padding: 0 0.28rem;
	}

	.content {
		padding: 0 0.28rem;
	}

	.content-info {
		/* margin-top: 0.40rem; */
		background: #fff;
		padding: 0.20rem 0.16rem;
		display: flex;
		display: -webkit-box;
		display: -webkit-flex;
		align-items: center;
		-webkit-box-align: center;
		-webkit-align-items: center;
	}

	.content-info .info-img img {
		height: 1.42rem;
		width: 1.42rem;
		margin-right: 0.24rem;
	}

	.content-info .info-lady {
		font-size: 0.30rem;
		/* font-weight: 550; */

	}

	.content-info .info-lady span {
		margin-left: 0.40rem;
		color: #5c5e5f;
	}

	.content-info .info-service {
		margin-top: 0.24rem;
		font-size: 0.23rem;
	}

	.content-info .info-service span {
		color: #5c5e5f;
	}

	.content-register {
		margin-top: 0.20rem;
		padding: 0.30rem 0.16rem 0.20rem 0.16rem;
		background: #fff;
	}

	.content-register .register-tit {
		font-size: 0.30rem;

	}

	.content-register .register-tit .register-date {
		margin-left: 0.50rem;
		color: #5c5e5f;
	}

	.content-register .register-tit .register-time {
		margin-left: 0.32rem;
		color: #5c5e5f;
	}

	.content-register .register-img {
		margin-top: 0.30rem;
	}

	.content-register .register-img img {
		width: 1.60rem;
		height: 1.60rem;
		/* background: #ddd; */
		margin-right: 0.20rem;
	}

	.order-bottom {
		height: 1rem;
		width: 100vw;
		background: #fff;
		position: fixed;
		bottom: 0;
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		-webkit-box-pack: end;
		-webkit-box-direction: reverse;
		-webkit-box-orient: vertical;
		-moz-flex-direction: column-reverse;
		-webkit-flex-direction: column-reverse;
		flex-direction: column-reverse;
		align-items: center;
		-webkit-box-align: center;
		-webkit-align-items: center;
	}

	.order-bottom div {
		width: 1.70rem;
		height: 0.64rem;
		border-radius: 0.32rem;
		border: 1px solid #ff5f1e;
		color: #FF5F1E;
		text-align: center;
		line-height: 0.64rem;
		margin-right: 0.20rem;
	}

	.appointment {}

	.order-bottom .complaint {
		color: #868688 !important;
		border: 1px solid #97979f !important;
	}
	.zhezhao {
		z-index: 300;
	}
</style>
