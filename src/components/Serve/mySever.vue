<template>
	<div>
		<div class='content-head'>

			<div class='head'>
				<div class='head-first' @click="toClient">
					<img src='../../assets/collage.png'>
					</img>
					<span class='collage'>切换至客户端</span>
				</div>
				<div class='head-center'>

				</div>
				<div class='head-img' @click="install">
					<img src='../../assets/sign.png'></img>
				</div>
			</div>
			<div class='portrait'>
				<div class='portrait-left-img'>
					<img v-if='headPic.length==0' src='../../assets/logo.png'></img>
					<img v-if='headPic.length>0' :src='headPic'></img>
				</div>
				<div class='portrait-info'>
					<div class='portrait-definition'>
						<div class='portrait-lady'>{{definition}}</div>
						<div class='portrait-num'>{{phone}}</div>
					</div>
				</div>
				<!-- 	<div class='portrait-right-img'>
					<img src='../../assets/certified.png'></img>
				</div> -->
			</div>
		</div>
		<div class='content-use'>
			<div class='use-tit'>
				常用功能
			</div>
			<div class='use-des'>
				<div class='use-list' @click="toBalance">
					<img src="../../assets/wallet.png" alt="">
					<div class='list-tit'>我的钱包</div>
				</div>
				<div class='use-list' @click="toHistoryTask">
					<img src="../../assets/task-1.png" alt="">
					<div class='list-tit'>历史任务</div>
				</div>
				<div class='use-list' @click="toCustomer">
					<img src="../../assets/service.png" alt="">
					<div class='list-tit'>联系客服</div>
				</div>
				<div class='use-list' @click="toSite">
					<img src="../../assets/complaint-serve.png" alt="">
					<div class='list-tit'>站点投诉</div>
				</div>
				<div class='use-list' @click="toApply">
					<img src="../../assets/apply.png" alt="">
					<div class='list-tit'>历史租赁</div>
				</div>
				<div class='use-list' @click="toLogin">
					<img src="../../assets/signOut.png" alt="">
					<div class='list-tit'>退出登录</div>
				</div>
			</div>
		</div>
		<!-- 	<div class="weui-toast weui_loading_toast" style="opacity: 1;" v-if='isLoading'>
			<div class="weui_loading"><i class="weui-loading weui-icon_toast"></i></div>
			<p class="weui-toast_content">加载中</p>
		</div> -->
		<Load v-if='isLoading'></Load>
		<div class='total-success' v-if='isSuccess'>
			<img src="../../assets/true-1.png" alt="">
			<span>数据加载完了</span>
		</div>
		<div class='total-success' v-if='isFalse'>
			<img src="../../assets/fail.png" alt="">
			<span>请求出错</span>
		</div>
		<customer v-if='collageCurstomer' @priming='toCustomer' @define='toPhone' :typeInfo='"其他咨询"'></customer>
		<showMoadel v-if='modelFlag' :cont='"您确定要退出登录？"' @define='confirm' @remove='cancel'></showMoadel>
	</div>

</template>

<script>
	import * as axios from '../../untils/ajax.js'
	import customer from '../customerService.vue'
	import {
		mapGetters,
		mapState,
		mapMutations,
		mapActions
	} from 'vuex'
	// import axios from '@/node_modules/axios/index.js'
	export default {
		name: 'app',
		data() {
			return {
				isFalse: false,
				signId: 1,
				time: null,
				pageNo: 1,
				pageSize: 8,
				total: 0,
				top: 0,
				pullUpState: 0, // 1:上拉加载更多, 2:加载中……, 3:我是有底线的
				isLoading: false, // 是否正在加载
				isSuccess: false,
				pullUpInfo: {
					moreText: '上拉加载更多',
					loadingText: '数据加载中...',
					noMoreText: '我是有底线的'
				},
				startX: 0,
				startY: 0,
				endX: 0,
				endY: 0,
				definition: '',
				phone: "",
				load: false,
				collageCurstomer: false,
				headPic: '',
				modelFlag: false,
				interval: '',
				collageHeadPic: '',
				collageNickName: '',
				intervalName: ''
			}
		},
		computed: {
			...mapGetters(['showInstallNum', 'showReturnRefresh']),
		},
		components: {
			customer
		},
		methods: {
			...mapMutations(['showCate']),
			toCustomer() {
				this.collageCurstomer = !this.collageCurstomer
			},
			toPhone() {
				this.collageCurstomer = !this.collageCurstomer
				window.location.href = 'tel://4008290037'

			},
			toClient: function() {
				this.showCate('my')
				// uni.navigateTo({
				// 	url: '/pages/index/index'
				// })
				this.$router.push({
					name: 'index'
				})
			},
			install: function() {


				this.$router.push('install')
			},
			toBalance: function() {
				this.$router.push({
					'name': 'wallet'
				})
				// uni.navigateTo({
				// 					url: '/pages/Server/wallet'
				// 				})
			},
			toHistoryTask: function() {
				// uni.navigateTo({
				// 	url: '/pages/Server/history'
				// })
				this.$router.push({
					name: 'historyTask'
				})
			},
			toLogin: function() {
				// uni.navigateTo({
				// 	url: '/pages/login/login'
				// })
				this.modelFlag = true
			},
			collage: function(id) {
				this.signId = id
				this.list = []
				this.pageNo = 1
				this.isLoading = true
				this.getList()
			},
			signIn: function(id) {
				uni.navigateTo({
					url: '/pages/Server/signIn?id=' + id
				})
			},
			signOut: function(id) {
				uni.navigateTo({
					url: '/pages/Server/signBack?id=' + id
				})
			},
			toDeatail: function(id) {
				uni.navigateTo({
					url: '/pages/service/complaintDetails?id=' + id
				})
			},
			touchStart: function(e) {
				this.startX = e.touches[0].pageX
				this.startY = e.touches[0].pageY
			},

			touchEnd: function() {
				this.isLoading = false
			},
			/**
			 * 上拉加载数据
			 */

			/**
			 * 加载数据完成
			 */
			infiniteLoadDone: function() {
				this.pullUpState = 1
			},

			/**
			 * 返回角度
			 */
			getSlideAngle: function(dx, dy) {
				return Math.atan2(dy, dx) * 180 / Math.PI
			},

			/**
			 * 根据起点和终点返回方向 1：向上，2：向下，3：向左，4：向右,0：未滑动
			 * @param {number} startX X轴开始位置
			 * @param {number} startY X轴结束位置
			 * @param {number} endX Y轴开始位置
			 * @param {number} endY Y轴结束位置
			 */
			getList: function() {
				this.isLoading = true
				var that = this
				axios.post(
					'/sys/t-sys-app-user/getAppUserInfo', {}
				).then(res => {
					console.log(res)
					if (res.meta.success) {
						that.definition = res.data.nickName
						that.phone = res.data.mobile
						if (res.data.headPic.length > 0) {
							that.headPic = this.configUrl + res.data.headPic
						} else {
							that.headPic = res.data.headPic
						}
						setTimeout(() => {
							plus.navigator.closeSplashscreen()
							plus.navigator.setFullscreen(false)
						}, 1800)
						that.isLoading = false

					} else {
						that.isFalse = true
						setTimeout(() => {
							that.isFalse = false
						}, 2000)
					}
				})
			},
			confirm() {
				this.modelFlag = false
				this.$router.push({
					'name': 'login'
				})
				// uni.redirectTo({
				// 		url: '/pages/login/login'
				// 	})
			},
			cancel() {
				this.modelFlag = false
			},
			toApply() {
				this.$router.push({
					name: 'historyReceive'
				})
			},
			toSite() {
				this.$router.push({
					name: 'siteComplaintList'
				})
			},
			appServe() {
				let params = new FormData()
				params.append('type', 2)
				axios.post(
					'/sys/t-sys-app-user/putLatestModule', params
				).then(res => {
					if (res.meta.success) {


					} else {

					}
				})

			}
		},
		created: function() {
			this.getList()
			this.appServe()
			this.load = true
			// 进入服务端
			plus.storage.setItem('isClient', '2')
			// 　window.history.pushState('forward', null, '#');
			// 　window.history.forward(1);



		},
		destroyed() {
			//清除定时器
			clearInterval(this.interval);
			this.collageHeadPic = ''
			plus.storage.setItem('collage', 'null')
			plus.storage.setItem('collageNickName', 'null')
			this.collageNickName = ''
		},
		watch: {
			collageHeadPic(newval, oldval) {
				if (newval == 1) {
					this.collageHeadPic = ''
					plus.storage.setItem('collage', 'null')
					this.getList()

				}

			},
			collageNickName(newval, oldval) {
				if (newval == 1) {
					this.collageNickName = ''
					plus.storage.setItem('collageNickName', 'null')
					this.getList()

				}

			},
			showInstallNum() {
				this.getList()

			},
			showReturnRefresh() {
				this.getList()
				this.appServe()
			}
		}


	}
</script>

<style scoped>
	@import '../../assets/css/weui.css'

	* {
		padding: 0;
		margin: 0;
		font-family: 'Microsoft YaHei'
	}

	#app {
		height: 100vh;
		max-width: 7.5rem;
	}

	body {
		background-color: #f8f8fa !important;
		/* font-size: 28rem; */
		color: #333333;
		font-family: Helvetica Neue, Helvetica, sans-serif;
		width: 100%;
	}

	.contents {
		position: fixed;
		top: 0;
		z-index: 10000;
		width: 100vw;

	}

	.content-head {
		height: 3.86rem;
		width: 100%;
		background-image: url('../../assets/picture.png') !important;
		background-size: 100% 123%;
	}

	.head {
		padding-top: 0.55rem;
		height: 0.63rem;
		box-sizing: content-box;
		text-align: center;
		width: 100%;
		position: relative;
		font-size: 0.36rem;
		color: #fff;
	}

	.head-first {
		height: 0.63rem;
		line-height: 0.63rem;
		width: 50%;
		float: left;
		/* 	display: flex;
		align-items: center; */
		font-size: 0.3rem;
		position: relative;
	}

	.head-first .collage {
		display: inline-block;
		height: 0.38rem;
		line-height: 0.41rem;
		position: absolute;
		top: 50%;
		left: 0.76rem;
		transform: translateY(-50%);
		-webkit-transform: translateY(-50%);
	}

	.head-first img {
		width: 0.38rem;
		height: 0.38rem;
		/* margin: 0 0.14rem 0 0.28rem; */
		position: absolute;
		top: 50%;
		left: 0.28rem;
		transform: translateY(-50%);
		-webkit-transform: translateY(-50%);
	}

	.head-center {
		width: 10%;
		float: left;
	}

	.head .head-img {
		height: 0.5rem;
		width: 30%;
		float: right;
	}

	.head .head-img img {
		position: absolute;
		width: 0.38rem;
		height: 0.38rem;
		right: 0.29rem;
		top: 0.68rem;
	}

	.portrait {
		width: 6.94rem;
		height: 1.08rem;
		/* display: flex; */
		/* align-items: center; */
		padding-left: 0.40rem;
		margin-top: 0.22rem;
	}

	.portrait .portrait-left-img {
		/* display: flex;
		align-items: center; */
		float: left;
	}

	.portrait .portrait-left-img img {
		width: 1.08rem;
		height: 1.08rem;
		margin-right: 0.16rem;
		border-radius: 50%;
	}

	.portrait .portrait-info {
		float: left;
		height: 1.08rem;
		position: relative;
	}

	.portrait .portrait-info .portrait-definition {
		position: absolute;
		top: 50%;
		left: 0;
		transform: translateY(-50%);
		-webkit-transform: translateY(-50%);
	}

	.portrait .portrait-right-img img {
		width: 1.40rem;
		height: 0.50rem;
		margin-left: 0.30rem;
	}

	.portrait .portrait-lady {
		font-size: 0.32rem;
		color: #fff;
		margin-bottom: 0.20rem;
		width: 3rem;
	}

	.portrait .portrait-num {
		font-size: 0.24rem;
		color: #fff;
	}

	.content-use {
		width: 6.94rem;
		height: 9rem;
		padding-top: 0.4rem;
		box-sizing: border-box;
		margin: -0.83rem auto 0 auto;
		background: #fff;
		border-radius: 0.2rem;
	}

	.content-use .use-tit {
		font-size: 0.32rem;
		margin-left: 0.3rem;
		margin-bottom: 0.38rem;
	}

	.use-des {
		/* 		display: flex;
		align-items: center; */
		width: 100%;
	}

	.use-des>div {
		width: 25%;
		float: left;

	}

	.use-des .use-list {
		/* display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center; */
		float: left;
		width: 25%;
		height: 1.2rem;
		margin-bottom: 0.45rem;
		text-align: center;
		line-height: 0.12rem;
	}

	.use-des .use-list img {
		width: 0.65rem;
		height: 0.65rem;
		margin-bottom: 0.27rem;
	}

	.use-des .use-list .list-tit {
		text-align: center;
		color: #666;
		font-size: 0.26rem;
	}


	.total-success {
		position: fixed;
		top: 5.7rem;
		background: rgba(44, 44, 44, 0.8);
		display: flex;
		flex-direction: column;
		align-items: center;
		font-size: 0.28rem;
		color: #fff;
		width: 2.2rem;
		height: 2.15rem;
		border-radius: 0.15rem;
		left: 50%;
		transform: translateX(-50%);
		z-index: 1000;
	}

	.total-success img {
		width: 1.1rem;
		height: 1.05rem;
		margin-top: 0.35rem;
	}
</style>
