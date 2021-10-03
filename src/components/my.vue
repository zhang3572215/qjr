<template>
	<div>

		<div class='content-head'  :class="!showServe?'collageHeight':''">
			<div class='heads' :class="!showServe?'collageTop':''">

			</div>
			<div class='fixed-head'  v-if='showServe'>


				<div class='head'>
					<div class='head-first' @click="toServe" >
						<img src='../assets/collage.png'>
						</img>
						<span class='collage'>切换至清洁师端</span>
					</div>
					<div class='head-center'>

					</div>
					<div class='head-img' @click="install">
						<img :class='!showServe?"collageTop":""' src='../assets/sign.png'></img>
					</div>
				</div>
			</div>
			<div class='portrait' :class="!showServe?'collageTop':''">
				<div class='portrait-left-img'>
					<img v-if='headPic.length==0' src='../assets/logo.png'></img>
					<img v-if='headPic.length>0' :src='headPic'></img>
				</div>
				<div class='portrait-info'>
					<div class='portrait-definition'>
						<div class='portrait-lady'>{{definition}}</div>
						<div class='portrait-num'>{{phone}}</div>
					</div>
				</div>
				<img class='installImg' src='../assets/sign.png'  @click="install" v-if='!showServe'></img>
				<!-- 	<div class='portrait-right-img'>
							<img src='../../static/my/certified.png'></img>
						</div> -->
			</div>
		</div>
		<div class='des'>
			<div class='des-balance' @click="toBalance">
				<div class='des-info'>
					<div class='des-num'> 0.00</div>
					<div class='des-tit'> 余额(元) </div>
				</div>
			</div>
			<div class='des-balance' @click="toAllo">
				<div class='des-info'>
					<div class='des-num'> {{allowanceCount}}</div>
					<div class='des-tit'> 抵用券(张) </div>
				</div>
			</div>
			<div class='des-balance' @click="toCoupon">
				<div class='des-info'>
					<div class='des-num'> {{couponCount}}</div>
					<div class='des-tit'> 优惠券(张) </div>
				</div>
			</div>
			<div class='des-balance' @click="toRepayment">
				<div class='des-info'>
					<div class='des-num'> {{periodAmount}}</div>
					<div class='des-tit'> 分期支付(元) </div>
				</div>
			</div>
		</div>
		<!-- <div class='advertisement' v-if='showPage== "my" && banner.length!==0'>
			<div v-if=' banner.length>1'>
				<swiper :options="swiperOptionMy" ref='mySwiper' class="swiper-container" v-if=' banner.length>0'>
					<swiper-slide v-for="(item,index) in banner" :data-link='item.linkHtml' :key="index">
						
						<img :src="item.picUrl" alt="">
					</swiper-slide>
			
					<div class="swiper-paginationMy" v-for="(item,index) in banner" :key="index" slot="pagination"></div>
				</swiper>
			</div>
			<div v-if=' banner.length==1'>
				<swiper :options="swiperOptionMys" class="swiper-container">
					<swiper-slide v-for="(item,index) in banner" :key="index">
				
						<img :src="item.picUrl" alt="" @click="linkMyto(item.linkHtml)">
					</swiper-slide>
					
					<div class="swiper-paginationMy" v-for="(item,index) in banner" :key="index" slot="pagination"></div>
				</swiper>
			</div>
		</div> -->
		<div class='history'>
			<div class='history-title'>
				历史订单
			</div>
			<div class='history-content'>
				<div class='history-des' @click="toHistory(1)">
					<img src='../assets/officeCleaning.png'></img>
					<div class='des-tit'>办公清洁</div>
				</div>
				<div class='history-des' @click="toHistory(4)">
					<img src='../assets/curtains-list.png'></img>
					<div class='des-tit'>窗帘清洗</div>
				</div>

				<div class='history-des' @click="toHistory(3)">
					<img src='../assets/carpet-list.png'></img>
					<div class='des-tit'>地毯清洗</div>
				</div>
				<div class='history-des' @click="toHistory(10)">
					<img src='../assets/air-list.png'></img>
					<div class='des-tit'>空调清洗</div>
				</div>
				<div class='history-des' @click="toHistory(8)">
					<img src='../assets/mattress-list.png'></img>
					<div class='des-tit'>床垫清洗</div>
				</div>
				<div class='history-des' @click="toHistory(7)">
					<img src='../assets/crystal-list.png'></img>
					<div class='des-tit'>水晶灯清洗</div>
				</div>
				<div class='history-des' @click="toHistory(9)">
					<img src='../assets/stone-list.png'></img>
					<div class='des-tit'>石材养护</div>
				</div>
				<div class='history-des' @click="toHistory(11)">
					<img src='../assets/shopMall.png'></img>
					<div class='des-tit'>商城</div>
				</div>
			</div>

		</div>
		<div class='sort'>
			<div class='sort-content clearfloat'>
				<!-- <div class='sort-des' @click="toSubscribe">
					<img src='../assets/appointment.png'></img>
					<div class='des-tit'>我的预约</div>
				</div> -->
				<div class='sort-des' @click="toAddresslist">
					<img src='../assets/address-2.png'></img>
					<div class='des-tit'>我的地址</div>
				</div>

				<div class='sort-des' @click="toApplay">
					<img src='../assets/applaytick.png'></img>
					<div class='des-tit'>申请发票</div>
				</div>
				<!-- <div class='sort-des' @click="toHistory">
					<img src='../assets/history-order.png'></img>
					<div class='des-tit'>历史订单</div>
				</div> -->
				<div class='sort-des' @click="toComplain">
					<img src='../assets/complaint.png'></img>
					<div class='des-tit'>我的投诉</div>
				</div>
				<div class='sort-des' @click="toCommonProblem">
					<img src='../assets/why.png'></img>
					<div class='des-tit'>常见问题</div>
				</div>

				<div class='sort-des' @click='toCustomer'>
					<img src='../assets/service.png'></img>
					<div class='des-tit'>联系客服</div>
				</div>
				<div class='sort-des' @click='toInvitation'>
					<img src='../assets/invitation.png'></img>
					<div class='des-tit'>邀请好友</div>
				</div>
				<div class='sort-des' @click='toProfit' v-if='isEstates'>
					<img src='../assets/profit.png'></img>
					<div class='des-tit'>我的收益</div>
				</div>
				<!-- <div class='sort-des' @click='toCooperation' >
					<img src='../assets/cooperation.png'></img>
					<div class='des-tit'>分销合作</div>
				</div> -->
				<!-- <div class='sort-des' @click="toBuyCar"  >
					<img src='../assets/shoppingCart-2.png'></img>
					<div class='des-tit'>购物车</div>
				</div> -->
				<div class='sort-des' @click="toInvoice">
					<img src='../assets/invoice.png'></img>
					<div class='des-tit'>开票信息</div>
				</div>
				<div class='sort-des' @click="toLogin" v-if='showServe'>
					<img src='../assets/signOut.png'></img>
					<div class='des-tit'>退出登录</div>
				</div>
			</div>

		</div>
		<div class='nav'>

		</div>
		<!-- 	<div class="weui-toast weui_loading_toast" style="opacity: 1;" v-if='isLoading'>
			<div class="weui_loading"><i class="weui-loading weui-icon_toast"></i></div>
			<p class="weui-toast_content">加载中</p>
		</div> -->
		<div class='total-success' v-if='isSuccess'>
			<img src="../assets/true-1.png" alt="">
			<span>数据加载完了</span>
		</div>
		<Load v-if='isLoading'></Load>
		<div class='total-success' v-if='isFalse'>
			<img src="../assets/fail.png" alt="">
			<span>请求出错</span>
		</div>
		<!-- <div class='showModel' v-if='modelFlag'>
			<div class='show-tit'>
				提示
			</div>
			<div class='show-content'>
				您还未加入清洁人服务，是否要加入?
			</div>
			<div class='show-btn'>
				<div class='show-cancel' @click='cancel'>取消</div>
				<div class='show-confirm' @click="confirm">确定</div>
			</div>
		</div> -->
		<showMoadel v-if='modelFlag' :cont='msg' @define='confirm' @remove='cancel'></showMoadel>
		<customer v-if='collageCurstomer' @priming='toCustomer' @define='toPhone' :typeInfo='"其他咨询"'></customer>
		<!-- 		<div class='show-shadow' v-if='modelFlag'>
		</div> -->
	</div>
</template>

<script>
	import * as axios from '../untils/ajax.js'
	import {
		swiper,
		swiperSlide
	} from "vue-awesome-swiper";
	import 'swiper/dist/css/swiper.css'
	import {
		mapGetters,
		mapState,
		mapActions
	} from 'vuex'
	import customer from './customerService.vue'
	import getToken from '../untils/getToken.js'
	import privacyPolicy from './privacyPolicy.vue'
	export default {
		data() {
			return {
				isFalse: false,
				signId: 1,
				time: null,
				pageNo: 1,
				pageSize: 8,
				total: 0,
				top: 0,
				isLoading: false, // 是否正在加载
				isSuccess: false,
				definition: '',
				phone: "",
				modelFlag: false,
				isService: '',
				banner: [],
				showFrame: false,
				imgIndex: 1,
				// swiperOptionMy: {
				// 	observer: true,
				// 	observeParents: true,
				// 	// 参数选项,显示小点

				// 	//循环
				// 	loop: true,
				// 	observer: true, //修改swiper自己或子元素时，自动初始化swiper
				// 	// observeParents: true,
				// 	pagination: {
				// 		el: '.swiper-paginationMy'
				// 	},
				// 	//每张播放时长3秒，自动播放
				// 	autoplay: {
				// 		delay: 3000,
				// 		disableOnInteraction: false
				// 	},
				// 	on: {
				// 		//滑动之后回调函数
				// 		slideChangeTransitionStart: function() {
				// 			/* realIndex为滚动到当前的slide索引值 */
				// 			// console.log(this.realIndex)
				// 			this.signIndex = this.realIndex
				// 			// console.log(this.signIndex)
				// 		},
				// 	},
				// 	//滑动速度
				// 	speed: 1000,
				// 	// delay:1000

				// },
				swiperOptionMys: {
					observer: true,
					observeParents: true,
					// 参数选项,显示小点

					//循环

					observer: true, //修改swiper自己或子元素时，自动初始化swiper
					// observeParents: true,
					//每张播放时长3秒，自动播放
					autoplay: {
						delay: 3000,
						disableOnInteraction: false
					},
					on: {
						//滑动之后回调函数
						slideChangeTransitionStart: function() {
							/* realIndex为滚动到当前的slide索引值 */
							// console.log(this.realIndex)
							this.signIndex = this.realIndex
							// console.log(this.signIndex)
						},
					},
					//滑动速度
					speed: 1000,
				},
				collageCurstomer: false,
				headPic: '',
				allowanceCount: 0,
				couponCount: 0,
				periodAmount: '0.00',
				msg: "您还未加入清洁人服务，是否要加入?",
				collageSign: 1,
				collageHeadPic: '',
				interval: '',
				collageNickName: '',
				intervalName: '',
				showPricacy: false,
				isEstates: false,
				showServe: true
			}
		},
		computed: {
			...mapGetters(['showInstallNum', 'showReturnRefresh']),
			swiper() {
				return this.$refs.mySwiper.swiper
			},
			swiperOptionMy() {
				let that = this
				let options = {
					observer: true,
					observeParents: true,
					// 参数选项,显示小点

					//循环
					loop: true,
					observer: true, //修改swiper自己或子元素时，自动初始化swiper
					// observeParents: true,
					pagination: {
						el: '.swiper-paginationMy'
					},
					//每张播放时长3秒，自动播放
					autoplay: {
						delay: 3700,
						disableOnInteraction: false
					},
					on: {
						//滑动之后回调函数
						slideChangeTransitionStart: function() {
							/* realIndex为滚动到当前的slide索引值 */
							// console.log(this.realIndex)
							this.signIndex = this.realIndex
							// console.log(this.signIndex)
						},
						click: function() {
							if (this.clickedSlide.dataset) {
								// console.log(this.clickedSlide.dataset.link)
								that.linkMyto(this.clickedSlide.dataset.link)
							}
						}
					},
					preventLinksPropagation: false, // 阻止点击事件冒泡
					//滑动速度
					speed: 1000,
					// delay:1000
				}
				return options
			},
		},
		components: {
			swiper,
			swiperSlide,
			customer,
			privacyPolicy
		},
		props: ['showPage'],
		methods: {
			...mapActions(['addShowDes']),
			linkMyto(e) {
				if (e.length == 0) {
					return
				}
				uni.navigateTo({
					url: e
				})
			},
			toCustomer() {
				this.collageCurstomer = !this.collageCurstomer
			},
			toPhone() {
				this.collageCurstomer = !this.collageCurstomer
				window.location.href = 'tel://4008290037'

			},
			toHistory(e) {
				// uni.navigateTo({
				// 	url: "/pages/order/order"
				// })
				if (e == 1) {
					this.$router.push({
						name: 'historyList'
					})
				} else if (e == 3) {
					let info = {
						type: e
					}
					this.$router.push({
						name: 'historyListenEnpty',
						params: info
					})
				} else if (e == 11) {
					this.$router.push({
						name: 'historyGoods'
					})
				} else {
					let info = {
						type: e
					}
					this.$router.push({
						name: 'historyListenEnpty',
						params: info
					})
				}

			},
			toSubscribe() {
				// uni.navigateTo({
				// 	url: "/pages/my/appointment"
				// })
				this.$router.push('appointment')
			},
			toAddresslist() {
				this.$router.push({
					'name': 'addressList'
				})
				// uni.navigateTo({
				// 	url: "/pages/my/addressList"
				// })
			},
			toInvoice() {
				this.$router.push({
					'name': 'myInvoice'
				})
				// uni.navigateTo({
				// 	url: "/pages/my/myInvoice"
				// })
			},
			toComplain() {
				// uni.navigateTo({
				// 	url: '/pages/order/complaintList'
				// })
				this.$router.push({
					name: 'complaint'
				})
			},
			install() {

				this.$router.push('install')

			},
			toBalance() {
				this.$router.push({
					'name': 'balance'
				})
				// uni.navigateTo({
				// 	url: '/pages/my/balance'
				// })
			},
			toAllo() {
				this.$router.push({
					'name': 'voucher'
				})
				// uni.navigateTo({
				// 	url: '/pages/my/voucher'
				// })
			},
			toCommonProblem() {
				this.$router.push({
					'name': 'commonProblem'
				})
				//    uni.navigateTo({
				// 	 url:'/pages/my/commonProblem'
				// })	
			},
			toCoupon() {
				this.$router.push({
					'name': 'coupon'
				})
				// uni.navigateTo({
				// 	url: '/pages/my/coupon'
				// })
			},
			toLogin() {
				// uni.navigateTo({
				// 	url:'/pages/login/login'
				// })
				// uni.removeStorageSync('token')
				this.msg = '您确定要退出登录？'
				this.collageSign = 2
				this.modelFlag = true
				// uni.redirectTo({
				// 	url: '/pages/login/login'
				// })
			},
			toInvitation() {
				this.$router.push({
					'name': 'inviteFriends'
				})
				//    uni.navigateTo({
				// 	url:'/pages/service/inviteFriends'
				// })
			},
			toProfit() {
				this.$router.push('myProfit')
			},
			toCooperation(){
				this.$router.push('cooperation')
			},
			toBuyCar() {
				this.$router.push({
					'name': 'shoppCart'
				})
			},
			toApplay() {
				this.$router.push({
					'name': 'applayInvoice'
				})
				// uni.navigateTo({
				// 	url:'/pages/my/applayInvoice'
				// })
			},
			toRepayment() {
				this.$router.push({
					'name': 'repaymentList'
				})
				// uni.navigateTo({
				// 	url: '/pages/order/repaymentList'
				// })
			},
			toServe() {
				if (this.isService != 1) {
					this.msg = "您还未加入清洁人服务，是否要加入?"
					this.modelFlag = true
					this.collageSign = 1
					return
				}
				this.addShowDes('my')
				let params = new FormData()
				params.append('type', 1)
				axios.post(
					'/sys/t-sys-app-user/putLatestModule', params
				).then(res => {
					if (res.meta.success) {


					} else {

					}
				})
				this.$router.push({
					name: 'serverIndex'
				})
				// uni.navigateTo({
				// 	url: '/pages/Server/index'
				// })
			},
			cancel() {
				this.modelFlag = false
			},
			confirm() {
				this.modelFlag = false
				if (this.collageSign == 1) {
					uni.navigateTo({
						url: "/pages/my/addCleaner"
					})
				} else if (this.collageSign == 2) {
					this.$router.push({
						'name': 'login'
					})
					// uni.redirectTo({
					// 		url: '/pages/login/login'
					// 	})

				}

			},
			getList() {
				this.isLoading = true
				let that = this
				axios.post(
					'/sys/t-sys-app-user/getAppUserInfo', {}
				).then(res => {
					if (res.meta.success) {
						that.definition = res.data.nickName
						that.phone = res.data.mobile
						that.isService = res.data.isService
						if (res.data.headPic.length > 0) {
							that.headPic = this.configUrl + res.data.headPic
						} else {
							that.headPic = res.data.headPic
						}
						that.collageHeadPic = ''
						
						this.getfindAdvertList()
						this.getNum()
						this.appClinent()
					} else {
						that.isFalse = true
						setTimeout(() => {
							that.isFalse = false
						}, 2000)
					}
					that.isLoading = false
				})
			},
			getQuery(name) {
				// 正则：[找寻'&' + 'url参数名字' = '值' + '&']（'&'可以不存在）
				let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
				let r = window.location.search.substr(1).match(reg);
				console.log(r);
				if (r != null) {
					// 对参数值进行解码
					return decodeURIComponent(r[2]);
				}
				return null;
			},
			getfindAdvertList() {
				let params = new FormData()
				params.append('moduleType', 2)
				axios.post('/business/t-business-advert/findAdvertList', params).then(res => {
					console.log(res)
					if (res.meta.success) {
						let data = res.data.map(item => {
							item.picUrl = this.configUrl + item.picUrl
							return item
						})
						this.banner = data
					} else {

					}

				})
			},
			getNum() {

				axios.post('/office/t-office-order-period/getWeAmount', {}).then(res => {
					if (res.meta.success) {

						this.allowanceCount = res.data.allowanceCount
						this.couponCount = res.data.couponCount
						this.periodAmount = (res.data.periodAmount.toFixed(2)).toString()
					} else {

					}
				})
			},
			appClinent() {
				let params = new FormData()
				params.append('type', 1)
				axios.post(
					'/sys/t-sys-app-user/putLatestModule', params
				).then(res => {
					if (res.meta.success) {


					} else {

					}
				})
				// this.$router.push({
				// 	name: 'serverIndex'
				// })
			},
			isEstate() {
				axios.post('/business/t-business-estate/isEstate', {}).then(res => {
					if (res.meta.success) {

						this.isEstates = true
					} else {

					}
				})
			}

		},
		created() {
			// let token =getToken.get('token')
			// if(!token){
			// 		this.$router.push({name:'login'})
			// 	return 
			// }
			// this.$router.push({name:'login'})
			// if(!window.localStorage.getItem('token')){
			// 	this.$router.push({name:'login'})
			// 	return
			// }
			document.body.removeEventListener('touchmove', this.bodyScroll, {
				passive: false
			});
			this.isEstate()
			this.getList()
			var ua = window.navigator.userAgent.toLowerCase();
			if (ua.indexOf('micromessenger') > -1) {

				this.showServe = false

			}

		},
		mounted() {

		},
		destroyed() {
			//清除定时器
			clearInterval(this.interval);
			this.collageHeadPic = ''
			plus.storage.setItem('collage', 'null')
			plus.storage.setItem('collageNickName', 'null')

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
				this.isEstate()
				this.getList()
			}
		}
	}
</script>

<style scoped>
	@import '../assets/css/weui.css'

	* {
		padding: 0;
		margin: 0;
		font-family: 'Microsoft YaHei'
	}

	span {
		margin: none;
		padding: none;
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
		background-image: url('../assets/picture.png') !important;
		background-size: 100% 123%;
	}
    .content-head.collageHeight{
		height: 2.75rem;
	}
	.heads {
		padding-top: 0.55rem;
		height: 0.63rem;
		box-sizing: content-box;
		text-align: center;
		width: 100%;
		position: relative;
		font-size: 0.36rem;
		color: #fff;

	}
    .heads.collageTop{
		 height: 0rem;
		 padding-top: 0.4rem;
	}
	.fixed-head {
		position: fixed;
		width: 100%;
		top: 0;
		z-index: 100;
	}
  .collageTop{
	  
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
		background-image: url('../assets/picture-top.png') !important;
		background-size: 100% 123%;
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

	.head .head-img img.collageTop {
		top: 0.28rem;
	}

	.portrait {
		width: 6.94rem;
		height: 1.08rem;
		/* display: flex; */
		/* align-items: center; */
		padding-left: 0.40rem;
		margin-top: 0.22rem;
		position: relative;
	}
  .portrait.collageTop{
	  margin-top: 0;
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

	.portrait .installImg {
		position: absolute;
		top: 50%;
		right: 0.1rem;
		transform: translateY(-50%);
		-webkit-transform: translateY(-50%);
		width: 0.38rem;
		height: 0.38rem;
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

	.des {
		width: 6.94rem;
		height: 1.70rem;
		/* display: flex;
		align-items: center;
		justify-content: center; */
		background: #fff;
		border-radius: 0.20rem;
		margin: -0.85rem auto 0 auto;
	}

	.des .des-balance {
		/* flex: 1;
		display: flex;
		align-items: center;
		flex-direction: column;
		justify-content: center; */
		float: left;
		width: 25%;
		height: 100%;
		position: relative;
	}

	.des .des-balance .des-info {
		width: 100%;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		-webkit-transform: translate(-50%, -50%);
		text-align: center;
	}

	.des .des-balance .des-num {
		font-size: 0.36rem;
		margin-bottom: 0.22rem;
		text-align: center;
	}

	.des .des-balance .des-tit {
		font-size: 0.24rem;
		color: #323232;
		text-align: center;
		width: 100%;
		margin-left: 0.02rem;
	}

	.advertisement {
		width: 6.94rem;
		height: 1.73rem;
		margin: 0.28rem auto 0 auto;
		border-radius: 1rem;
		overflow: hidden;
		z-index: 1000;
		position: relative;
	}



	.advertisement img {
		width: 6.94rem;
		height: 1.73rem;
		border-radius: 1rem;
	}

	.history {
		width: 6.94rem;
		background: #fff;
		border-radius: 0.20rem;
		margin: 0.20rem auto 0 auto;
		padding-top: 0.36rem;
		height: 3.25rem;
	}

	.history-title {
		font-size: 0.32rem;
		margin-left: 0.30rem;
	}

	.history-content {
		width: 100%;
		/* display: flex;
    	flex-wrap: wrap; */
		margin-top: 0.40rem;
	}

	.history-content .history-des {
		float: left;
		width: 25%;
		height: 1.2rem;
		/* 	display: flex;
    	flex-direction: column;
    	align-items: center;
    	justify-content: center;
    	width: 25%; */
		/* margin-bottom: 0.45rem; */
		text-align: center;
		line-height: 0.04rem;
	}

	.history-content .history-des img {
		width: 0.45rem;
		height: 0.45rem;
		margin-bottom: 0.35rem;
	}

	.history-content .history-des .des-tit {
		text-align: center;
		color: #666;
		font-size: 0.26rem;
	}


	.sort {
		width: 6.94rem;
		background: #fff;
		border-radius: 0.20rem;
		margin: 0.20rem auto 0 auto;
		padding-top: 0.1rem;
		/* height: 4rem; */
		/* height: 5.5rem; */
	}

	.sort-title {
		font-size: 0.32rem;
		margin-left: 0.30rem;
	}

	.sort-content {
		width: 100%;
		/* display: flex;
		flex-wrap: wrap; */
		margin-top: 0.40rem;
	}

	.sort-content.clearfloat:after {
		display: block;
		clear: both;
		content: "";
		visibility: hidden;
		height: 0
	}

	.sort-content .sort-des {
		float: left;
		width: 25%;
		height: 1.2rem;
		/* 	display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		width: 25%; */
		margin-bottom: 0.45rem;
		text-align: center;
		line-height: 0.12rem;
	}

	.sort-content .sort-des img {
		width: 0.65rem;
		height: 0.65rem;
		margin-bottom: 0.35rem;
	}

	.sort-content .sort-des .des-tit {
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

	.showModel {
		background: #fff;
		/* height: 3rem; */
		width: 6rem;
		position: absolute;
		top: 5.2rem;
		left: 50%;
		transform: translateX(-50%);
		border-radius: 0.1rem;
		z-index: 10;
	}

	.show-shadow {
		height: 100%;
		width: 100%;
		background: rgba(0, 0, 0, 0.6);
		position: fixed;
		top: 0;
		z-index: 9;
	}

	.showModel .show-tit {
		font-size: 0.36rem;
		width: 100%;
		height: 1rem;
		text-align: center;
		line-height: 1rem;
	}

	.showModel .show-content {
		font-size: 0.28rem;
		height: 1.2rem;
		width: 100%;
		line-height: 1.2rem;
		text-align: center;
		margin-top: -0.2rem;
		color: #999;
	}

	.showModel .show-btn {
		width: 100%;
		height: 1rem;
		width: 100%;
		display: flex;
		align-items: center;
		border-top: 1px solid #ccc;
		box-sizing: border-box;
	}

	.showModel .show-btn>div {
		flex: 1;
		font-size: 0.36rem;
		text-align: center;
		height: 100%;
		line-height: 1rem;
	}

	.showModel .show-btn .show-cancel {
		border-right: 1px solid #ccc;
		box-sizing: border-box;
	}

	.hideDisplay {
		display: none !important;
	}
</style>
<style>
	.advertisement .swiper-container {
		border-radius: 1rem;
		overflow: hidden;
		z-index: 100;
		width: 6.94rem;
		height: 1.73rem;

	}

	.advertisement .swiper-container .swiper-slide {
		border-radius: 1rem;
		overflow: hidden;
		z-index: 50;
	}

	.advertisement .swiper-pagination-fraction,
	.advertisement .swiper-pagination-custom,
	.advertisement .swiper-container-horizontal>.swiper-paginationMy.swiper-pagination-bullets {
		position: absolute;
		bottom: 1.2rem !important;
		left: 50%;
		text-align: center;
		transform: translateX(-50%);
		-webkit-transform: translateX(-50%);
		z-index: 5;
		height: 0rem;
	}

	.advertisement .swiper-pagination-bullet {
		border: 1px solid #fff;
		background: rgba(0, 0, 0, 0.1);
		width: 0.14rem;
		height: 0.14rem;
	}

	.advertisement .swiper-pagination-bullet-active {
		/* background: #fff !important; */
		opacity: 0.5;
	}

	.nav {
		height: 1.2rem;
	}
</style>
