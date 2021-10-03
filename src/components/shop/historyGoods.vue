<template>
	<div class='containerHeight' @touchstart="touchStart($event)" @touchmove="touchMove($event)" @touchend="touchEnd($event)">
		<dates v-if='showVue' :msg="dateFlag" @biography='collageDate'></dates>
		<div v-else>
			<head-Piece>
				<template slot="content">历史订单</template>
			</head-Piece>
			
			<!-- 	<div class='content-btn'>
				<div class='btn-info'>
					<div class='btn' @click="collageTitle(2)" :class='types == "2"?"sign-color":""'>
						办公
					</div>
					<div class='btn' @click="collageTitle(4)" :class='types == 4?"sign-color":""'>
						地毯
					</div>
					<div class='btn' @click="collageTitle(5)" :class='types == 5?"sign-color":""'>
						窗帘
					</div>
					<div class='btn' @click="collageTitle(3)" :class='types == 3?"sign-color":""'>
						空调
					</div>
					<div class='btn' @click="collageTitle(6)" :class='types == 6?"sign-color":""'>
						床垫
					</div>
					<div class='btn' @click="collageTitle(7)" :class='types == 7?"sign-color":""'>
						商城
					</div>
				</div>
			</div>
			<div class='content-show'>

			</div> -->
			<div class='container' ref='divDom'>
				<div class='list' @click="gotoDetail(item.id,item.buyType)" v-for='(item,index) in list' >
					<!-- v-if='item.orderStatus==5 || item.orderStatus==6 || item.orderStatus==7?false:true' -->
					<!-- 	  <div  v-if='item.productType==2 && (item.orderStatus==1 ||item.orderStatus==2 || item.orderStatus==3)'> -->


					<div>
						<div class='list-head'>
							<div class='head-left'>
								<img src='../../assets/time.png'></img>
								<div class='left-tit'>下单时间:<span>{{item.orderTime}}</span></div>
							</div>
							<div class='head-right'>
								<span v-if='item.orderStatus==1'>待支付</span>
								<span v-if='item.orderStatus==2'>待发货</span>
								<span v-if='item.orderStatus==3'>待收货</span>
								<span v-if='item.orderStatus==4'>待评价</span>
								<span v-if='item.orderStatus==5'>完成</span>
								<span v-if='item.orderStatus==6'>关闭</span>
								<span v-if='item.orderStatus==7'>售后中</span>
								<!-- 	<span v-if='item.orderStatus==5'>完成</span>
						<span v-if='item.orderStatus==6'>关闭</span> -->
							</div>


						</div>
						<div class='list-center clearfloat' v-for='(val,index) in  item.tShopOrderDetails'>
							<div class='center-left'>
								<img class='left-img' :src='imgUrl+val.picUrl'></img>

							</div>
							<div class='center-tit' :class='item.tShopOrderDetails.length>1?"center-ht":""'>
								<div class='content-info'>
									<div class="tit-info">
										<span>{{val.itemName}}</span>
										<span class='tit-right'>
											￥{{val.price}}
										</span>
									</div>
									<div>
										<!-- <span v-if='item.frequency==1'>1次/周</span>
										<span v-if='item.frequency==2'>2次/周</span>
										<span v-if='item.frequency==3'>3次/周</span>
										<span v-if='item.frequency==4'>4次/周</span>
										<span v-if='item.frequency==5'>5次/周</span>
										<span v-if='item.frequency==6'>6次/周</span>
										<span v-if='item.frequency==7'>7次/周</span> -->
										<!-- <span>({{item.weeks}})</span> -->
										<span>{{val.className}}*{{val.propName}}</span>
										<span class='tit-right num'>
											X{{val.num}}
										</span>
									</div>
									<!-- <div class='center-week'>
										{{item.weeks}}
									</div> -->
								</div>
							</div>

						</div>
						<div class='list-address ' :class='item.tShopOrderDetails.length>1?"address-mr":""'>
							<div class='address-info'>

								<img src='../../assets/address.png'></img>


								<span>{{item.address}}</span>
							</div>
							<div class='details'>
								<div class='details-info'>订单详情</div>

							</div>
							<img class='details-right' src='../../assets/right-go.png'></img>
						</div>
						<div class='list-btn' v-if='item.orderStatus==1 || (item.buyType==1 && item.orderStatus==2) || (item.buyType==1 && item.orderStatus==3) ||item.buyType==3 || item.orderStatus==3 ||item.orderStatus==4 '>
							<button class='btn-pay' v-if='item.orderStatus==1' @click.stop.prevent='pay(item.id)'> 支付</button>
							<button class='btn-cancel' v-if='item.orderStatus==1' @click.stop.prevent="cancle(item.id)">取消订单</button>
                            <button class='btn-cancel' v-if='item.orderStatus==3' @click.stop.prevent='confirmReceipt(item.id)'> 确认收货</button>
                            <button class='btn-pay' v-if='item.orderStatus==4' @click.stop.prevent="toReviews(item.id)">评价</button> 
						<!-- 	<button class='serveDe' v-if='item.payStatus==1' @click.stop.prevent="toServeList(item.id,item.productType)">服务详情</button>
							<button class='btn-pay' v-if='item.orderStatus==3 ||item.orderStatus==5' @click.stop.prevent="toServeList(item.id,item.productType)">评价</button> -->
							<!-- 		<button class='btn-pay' v-if='(item.buyType==1 && item.orderStatus==2) || (item.buyType==1 && item.orderStatus==3)' 
							 @click.stop.prevent='subscribe(item)'>预约</button> -->
						</div>
					</div>

				</div>
				<div class='subscribe' v-if='showFrame'>
					<div class='subscribe-tit'>预约</div>
					<div class='select-time' @click="selectDate">选择时间：<span>{{nowDate}}</span></div>
					<div class='btn'>
						<div class='btn-cancel' @click="remove">取消</div>
						<div class='btn-comfirm' @click='determine'>确定</div>
					</div>
				</div>
				<div class='shadowArea' v-if='showFrame'>
				</div>
			</div>
		</div>
		<!-- <div class="weui-toast weui_loading_toast" style="opacity: 1;" v-if='isLoading'>
			<div class="weui_loading"><i class="weui-loading weui-icon_toast"></i></div>
			<p class="weui-toast_content">加载中</p>
		</div> -->
		<Load v-if='isLoading'></Load>
		<div class='total-success' v-if='isSuccess'>
			<div class='success-img'><img src="../../assets/true-1.png" alt=""></div>
			<div class='success-tit'>{{successInfo}}</div>
		</div>
		<!-- 	<div class='total-success' v-if='isFalse'>
			<img src="../assets/fail.png" alt="">
			<span>请求出错</span>
		</div> -->
		<empty v-if='showEmpty'></empty>
		<showFail v-if='isFalse' :msg="failInfo"></showFail>
		<showModel :cont='msg' v-if='showFlag' @define='confirm' @remove='cancle'></showModel>
		<!-- <div style='width: 500px; height: 200upx;position: fixed;top:200px;font-size: 12px;background: #0066CC;'>
			距顶部{{innerHeight}}滚动条总高度{{scrollTop}}  滚动条总高度 {{signHeight}} 盒子高度{{contentHeight}}
			 
		 </div> -->
	</div>
</template>



<script>
	import {
		mapGetters
	} from 'vuex'
	import getToken from '../../untils/getToken.js'
	import * as axios from '../../untils/ajax.js'
	import showModel from './../showModel.vue'
	import dates from './../show-date.vue'
	export default {
		name: 'app',
		data() {
			return {
				type: 4,
				list: [],
				time: null,
				pageNo: 1,
				pageSize: 8,
				total: 0,
				top: 0,
				pullUpState: 0, // 1:上拉加载更多, 2:加载中……, 3:我是有底线的
				isLoading: false, // 是否正在加载
				pullUpInfo: {
					moreText: '上拉加载更多',
					loadingText: '数据加载中...',
					noMoreText: '我是有底线的'
				},
				startX: 0,
				startY: 0,
				endX: 0,
				endY: 0,
				isSuccess: false,
				isFalse: false,
				showFlag: false,
				showVue: false,
				dateFlag: '',
				showFrame: false,
				nowDate: '',
				failInfo: '请求出错',
				biographyInfo: {},
				successInfo: '数据加载完了',
				showEmpty: false,
				signSuccess: 0,
				endListFalg: false,
				innerHeight: '',
				scrollTop: "",
				scrollHeight: '',
				contentHeight: '',
				signHeight: '',
				msg: '',
				type: 1,
				types: 2,
				imgUrl: this.configUrl
			}
		},
		props: ['showPage'],
		components: {
			showModel,
			dates
		},
		computed: {
			...mapGetters(['showDate', 'showDateStart', 'showDateEnd', 'showCurrentListRefresh', 'showCleanFlag'])
		},
		methods: {
			collageTitle(e) {
				this.types = e
				this.pageNo = 1

				if (e != 7) {
					this.list = []
					this.getList()
					this.showEmpty = false
				} else {
					this.getList()
					this.list = []
					this.showEmpty = false
				}

			},
			collageDate() {
				this.showVue = !this.showVue
			},

			collage(e) {
				this.type = e
			},
			selectDate() {
				this.showVue = !this.showVue
			},
			remove() {
				this.showFrame = !this.showFrame
			},
			subscribe(e) {
				this.type = 2
				this.biographyInfo = e
				this.showFlag = true
				if (e.prototype == 2) {
					this.msg = '您确定要预约么？'
				} else if (e.prototype == 4) {
					this.msg = '您确定要预约窗帘清洁么？'
				} else if (e.prototype == 5) {
					this.msg = '您确定要预约地毯清洁么？'
				} else {
					this.msg = '您确定要预约么？'
				}

				// this.showFrame = !this.showFrame
			},
			determine() {
				this.showFrame = !this.showFrame
				let that = this
				let params = new FormData()
				this.isLoading = true
				params.append('startDate', this.biographyInfo.startDate)
				params.append('appointDate', this.nowDate)
				params.append('orderId', this.biographyInfo.id)
				params.append('beginTime', this.biographyInfo.beginTime)
				params.append('endTime', this.biographyInfo.endTime)
				axios.post('/office/t-office-appoint/postAppoint', params).then(res => {
					if (res.meta.success) {
						// this.showFlag = false
						// this.isLoad = false
						// this.toast.success('预约成功')
						this.isLoading = false
						this.isSuccess = true
						this.successInfo = '预约成功'
						setTimeout(() => {
							that.isSuccess = false
						}, 1000)
						this.list = []
						this.pageNo = 1
						this.pageSize = 8
						this.getList()
					} else {
						this.isLoading = false
						this.failInfo = res.meta.msg
						this.isFalse = true
						setTimeout(() => {
							that.isFalse = false
						}, 1000)
						// this.toast.fail('预约失败')
					}
				})
			},
			confirm() { //确定取消订单

				let that = this

				if (this.type == 1) {
					let params = new FormData()
					params.append('orderId', this.id)
					this.isLoading = true
					axios.post('/shop/t-shop-order/cancelOrder', params).then(res => {
						if (res.meta.success) {
							// that.toast.success('取消成功')
							that.pageNo = 1
							that.list = []
							that.getList(1)
						} else {
							// that.toast.fail('取消失败')
							this.isLoading = false
							this.failInfo = '取消失败'
							this.isFalse = true
							setTimeout(() => {
								that.isFalse = false
							}, 1000)
						}
					})
				} else {
					this.showVue = !this.showVue
					let info = {
						startDate: this.biographyInfo.startDate,
						orderId: this.biographyInfo.id,
						beginTime: this.biographyInfo.beginTime,
						endTime: this.biographyInfo.endTime
					}
					this.dateFlag = JSON.stringify(info)
				}
				this.showFlag = !this.showFlag
			},
			gotoHistory() {
				// uni.navigateTo({
				// 	url: "../order/order"
				// })
				this.$router.push({
					name: 'historyList'
				})
			},
			gotoDetail(id, status) {
				let info = {
					orderId: id
				}
				this.$router.push({
					'name': 'goodsDetail',
					params: info
				})


			},
			cancle(id) {
				this.showFlag = !this.showFlag
				this.msg = '您确定要取消订单么'
				this.id = id
				this.type = 1
				// })
			},
			pay(id) {

				let info = {
					'id': id,
				}
				this.$router.push({
					"name": 'shopPayment',
					params: info
				})


				// uni.navigateTo({
				// 	url: '/pages/home/orderPayment?id=' + id
				// })
			},

			touchStart(e) {
				this.startX = e.touches[0].pageX
				this.startY = e.touches[0].pageY
				// this.successInfo = '数据加载完了'
			},
			touchMove(e) {
				this.endX = e.changedTouches[0].pageX
				this.endY = e.changedTouches[0].pageY
				let direction = this.getSlideDirection(this.startX, this.startY, this.endX, this.endY)
				switch (direction) {
					case 0:
						// console.log('没滑动')
						break
					case 1:
						// console.log('向上')
						this.scrollToTheEnd()
						break
					case 2:
						// console.log('向下')
						break
					case 3:
						// console.log('向左')
						break
					case 4:
						// console.log('向右')
						break
					default:
				}
			},
			touchEnd() {
				this.isLoading = false
			},
			scrollToTheEnd() {
				let innerHeight = document.querySelector('#app').clientHeight
				let contentHeight = document.querySelector('.containerHeight').offsetHeight
				// 变量scrollTop是滚动条滚动时，距离顶部的距离
				let scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop
				// 变量scrollHeight是滚动条的总高度
				let scrollHeight = document.documentElement.clientHeight || document.body.scrollHeight

				//变量scrollHeight是滚动条的总高度
				var scrollHeights = document.documentElement.scrollHeight || document.body.scrollHeight;
				this.innerHeight = scrollHeights
				this.scrollTop = scrollTop
				this.scrollHeight = scrollHeight
				this.contentHeight = contentHeight
				if (scrollTop == 0) {
					return
				}

				if (scrollTop + scrollHeight >= innerHeight) {
					if (this.pullUpState !== 3 && !this.isLoading) {
						this.infiniteLoad()
					}
				}
				// console.log(contentHeight)
				// console.log('距顶部' + scrollTop + '滚动条总高度' + scrollHeight + '内容高度' + innerHeight)
				let signHeight = Number(contentHeight) - (Number(innerHeight) + Number(scrollTop))
				let that = this
				if (signHeight < 60) {
					if (that.total <= that.list.length && that.total > 0) {

						that.signSuccess = that.signSuccess + 1

					}
				}

			},
			infiniteLoad() {
				if (this.total <= this.list.length) {
					// this.isSuccess = true
					// var that = this
					// setTimeout(() => {
					// 	that.isSuccess = false
					// }, 2000)
					this.endListFalg = true
					return
				}
				this.pullUpState = 2
				this.isLoading = true
				this.pageNo = this.pageNo + 1
				this.getList()
				// this.onInfiniteLoad(this.infiniteLoadDone)
			},

			/**
			 * 加载数据完成
			 */
			infiniteLoadDone() {
				this.pullUpState = 1
			},

			/**
			 * 返回角度
			 */
			getSlideAngle(dx, dy) {
				return Math.atan2(dy, dx) * 180 / Math.PI
			},

			/**
			 * 根据起点和终点返回方向 1：向上，2：向下，3：向左，4：向右,0：未滑动
			 * @param {number} startX X轴开始位置
			 * @param {number} startY X轴结束位置
			 * @param {number} endX Y轴开始位置
			 * @param {number} endY Y轴结束位置
			 */
			getSlideDirection(startX, startY, endX, endY) {
				let dy = startY - endY
				let dx = endX - startX
				let result = 0
				// 如果滑动距离太短
				if (Math.abs(dx) < 2 && Math.abs(dy) < 2) {
					return result
				}
				let angle = this.getSlideAngle(dx, dy)
				if (angle >= -45 && angle < 45) {
					result = 4
				} else if (angle >= 45 && angle < 135) {
					result = 1
				} else if (angle >= -135 && angle < -45) {
					result = 2
				} else if ((angle >= 135 && angle <= 180) || (angle >= -180 && angle < -135)) {
					result = 3
				}
				return result
			},

			getList(e) {
				// $.showLoading()
				this.failInfo = '请求出错'
				var that = this
				var formdata = new FormData()
				formdata.append("pageNo", this.pageNo)
				formdata.append('pageSize', this.pageSize)
				formdata.append('time', 5)
				if (!e) {
					this.isLoading = true
				}

				axios.post(
					'/shop/t-shop-order/getShopOrderHistoryList',
					formdata
				).then(res => {
					if (res.meta.success) {
                         console.log(res.data)
						this.total = Number(res.data.totalCounts)
						if (this.pageNo === 1) {
							this.list = res.data.records

						} else {
							this.list = this.list.concat(res.data.records)
						}
						if (that.list.length == 0) {
							this.showEmpty = true
						}
						this.isLoading = false

					} else {
						this.isLoading = false
						this.isFalse = true
						setTimeout(() => {
							that.isFalse = false
						}, 2000)
					}
				})
			},
			nowTime() {
				var myDate = new Date();
				myDate.setDate(myDate.getDate() + 2); //获取AddDayCount天后的日期  
				var y = myDate.getFullYear();
				var m = (myDate.getMonth() + 1) < 10 ? "0" + (myDate.getMonth() + 1) : (myDate.getMonth() + 1); //获取当前月份的日期，不足10补0  
				var d = myDate.getDate() < 10 ? "0" + myDate.getDate() : myDate.getDate(); //获取当前几号，不足10补0  
				this.nowDate = y + "-" + m + "-" + d;
				console.log()
			},
			toServeList(e, index) {
				let id = {
					'orderId': e,
					'productType': index
				}
				this.$router.push({
					'name': 'serviceDetails',
					params: id
				})
				// uni.navigateTo({
				// 	url: '/pages/service/serviceDetails?orderId=' + this.id
				// })
			},
			//商品评价
			toReviews(id){
				let info = {
					'orderId': id
						
				}
				this.$router.push({name:'reviews',params:info})
			},
			//确认收货物
			confirmReceipt(id){
				let params=new FormData()
				params.append('orderId', id)
				axios.post('/shop/t-shop-order/confirm',params).then(res => {
					if(res.meta.success){
						this.$toast({
							message:'收货成功',
							duration:1000
						})
						this.list = []
						this.pageNo = 1
						this.getList()
						// let num =this.showCleanFlag+1
						// this.collageCleanFlag(num)
					}
				})
			}
		},
		created: function() {
			// let token =getToken.get('token')
			// if(!token){
			// 		this.$router.push({name:'login'})
			// 	return 
			// }
			console.log(window.localStorage.getItem('token'))
			this.getList()
			this.nowTime()
			this.load = true
			// this.$toast.loading({
			//   message: '加载中...',
			//   forbidClick: true,
			//   loadingType: 'spinner',
			//  duration:1000000
			// });
		},
		mounted() {
			let that = this
			// 		 this.$nextTick(() => {
			// 		window.onscroll = function(){

			// 		 var scrollTop =document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop

			// 		 var windowHeight = document.documentElement.clientHeight || document.body.clientHeight;

			// 		 var scrollHeight = document.documentElement.scrollHeight||document.body.scrollHeight;

			// 			this.innerHeight=scrollHeight
			// 			this.scrollTop=scrollTop
			// 			this.scrollHeight=windowHeight

			// 			if(scrollTop==0){
			// 				return
			// 			}
			// 		    if(scrollTop+windowHeight==scrollHeight){

			// 			if (that.total <= that.list.length && that.total>0) {

			// 				that.endListFalg=true

			// 			}

			// 			  that.signSuccess=that.signSuccess+1



			// 		    } 
			// 		  }
			// 		  })
		},
		watch: {
			showDateStart(newval, oldval) {

				this.nowDate = newval.date
			},
			signSuccess(val) {
				if (this.endListFalg) {
					let that = this
					this.successInfo = '数据加载完了'
					this.isSuccess = true

					setTimeout(() => {
						that.isSuccess = false
					}, 1000)
				}

			},
			showCurrentListRefresh(newval, oldval) {
				if (this.types != 2) {
					return
				}
				this.list = []
				this.pageNo = 1
				this.getList()
			},
			showCleanFlag() {
				// if (this.types == 2 || this.types == 7) {
				// 	return
				// }

				this.list = []
				this.pageNo = 1
				this.getList()
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
	}

	button:focus {
		outline: 0;
	}

	body {
		background-color: #f8f8fa !important;
		/* font-size: 28rem; */
		color: #333333;
		font-family: Helvetica Neue, Helvetica, sans-serif;
		width: 100%;
	}

	.content {
		width: 100vw;
		padding-bottom: 1rem;
	}

	.head {
		position: fixed;
		top: 0;
		width: 100vw;
		z-index: 1000;
	}

	.content-btn {
		height: 0.9rem;
		/* width: 100vw; */
		/* padding: 0 0.28rem; */
		/* box-sizing: border-box;
		display: flex;
		align-items: center; */
		font-size: 0.28rem;
		position: fixed;
		top: 1.28rem;
		width: 100%;
		background: #fff;
		z-index: 10;
	}

	.content-show {
		height: 0.90rem;
	}

	.content-btn .btn-info {
		width: 100%;
		background: #fff;
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		-webkit-transform: translateY(-50%);
	}

	.content-btn .btn {
		float: left;
		height: 0.60rem;
		width: 14%;
		font-size: 0.28rem;
		text-align: center;
		line-height: 0.60rem;
		background: #fff;
		/* border-radius: 0.10rem; */
		color: #fff;
		/* margin-right:0.18rem; */
		/* 	border: 1px solid #539ef9; */
		color: #000;
		margin: 0 0.1rem;
		box-sizing: border-box !important;
	}

	.btn.sign-color {
		color: #289dfc;
		border-bottom: 2px solid #0396fe;
	}

	.content-title {
		padding-top: 0.40rem;
		height: 0.88rem;
		width: 100vw;
		/* background: #539ef9; */
		background: #fff;
		text-align: center;
		position: relative;
		box-sizing: content-box;
		font-size: 0.38rem;
		position: relative;
		color: #000;
	}

	.head-show {

		height: 1.28rem;
		width: 100%;
	}

	.content-title .title-center {
		line-height: 0.88rem;
		font-size: 0.36rem;
	}

	.content-title .title-right {
		height: 0.88rem;
		position: absolute;
		font-size: 0.32rem;
		right: 0.30rem;
		top: 0.4rem;
		line-height: 0.88rem;
		text-align: center;

	}

	.content-title .title-right img {
		display: inline-block;
		width: 0.18rem;
		height: 0.32rem;
		margin-left: 0.11rem;
		transform: translateY(0.04rem);
	}

	.container {
		width: 6.94rem;
		height: 100%;
		margin: 0 auto;
		padding: 0 0.28rem;
		padding-bottom: 0.35rem;
		box-sizing: content-box;
	}

	.container .list {
		width: 100%;
		/* height: 310upx; */
		display: flex;
		display: -webkit-flex;
		flex-direction: column;
		background: #fff;
		margin-bottom: 0.20rem;
		box-shadow: 0 0.02rem 0.10rem #ececee;
	}

	.list .list-head {
		height: 0.83rem;
		width: 100%;
		border-bottom: 1px solid #e8e8e8;
		line-height: 0.83rem;
		box-sizing: border-box;
	}

	.list .list-head .head-left {
		float: left;
		height: 0.83rem;
		line-height: 0.83rem;
		padding-left: 0.215rem;
		box-sizing: content-box;
		position: relative;
		/* display: flex; */
		/* align-items: center; */
	}

	.list .list-head .head-left img {
		/* display: inline-block; */
		width: 0.27rem;
		height: 0.27rem;
		margin-right: 0.15rem;
		position: absolute;
		left: 0.2rem;
		top: 37%;
		/* transform: translateY(-37%); */
	}

	.list .list-head .head-left .left-tit {
		margin-top: 0.03rem;
		margin-left: 0.3rem;
		font-size: 0.26rem;
		color: #707070;
		height: 0.83rem;
		line-height: 0.83rem;
	}

	.list .list-head .head-left .left-tit span {
		margin-left: 0.19rem;
	}

	.list .list-head .head-right {
		float: right;
		height: 0.83rem;
		line-height: 0.83rem;
		padding-right: 0.25rem;
		box-sizing: border-box;
		color: #ff2a2a;
		font-size: 0.28rem;
	}

	.list .list-head .head-right span {
		display: inline-block;
		height: 0.83rem;
		line-height: 0.83rem;
	}

	.list .list-center {
		/* display: flex; */
		/* height: 228upx; */
		/* padding-top: 0.35rem; */
		box-sizing: border-box;
		/* line-height: 228upx; */
		height: auto !important;
	}

	.list .list-center.clearfloat {
		height: auto !important;
		display: flex;
		display: -webkit-box;
		display: -webkit-flex;
		align-items: center;
		-webkit-box-align: center;
		-webkit-align-items: center;
	}

	.list .list-center.clearfloat:last-child {
		margin-bottom: 0.2rem !important;
	}

	.list .list-center.clearfloat:nth-child(n)>div {
		padding-top: 0rem;
	}

	.container .list .list-center .center-tit.center-ht {
		height: 1.3rem;
	}

	.list .list-center.clearfloat:nth-child(n+3) .center-tit {
		/* padding-top: 0!important; */
		/* margin-top: -0.2rem; */
		/* transform: translateY(-0.3rem); */
		/* height: ; */
		height: 1.3rem;
	}

	.list .list-center.clearfloat:after {
		display: block;
		clear: both;
		content: "";
		visibility: hidden;
		height: 0
	}

	.list .list-center .center-left {
		/* margin-right: 0upx; */
		width: 1.40rem;
		height: 0.96rem;
		float: left;
		padding-top: 0.35rem;
	}

	.list .list-center img.left-img {
		/* 	display: inline-block; */
		display: block;
		width: 0.96rem !important;
		height: 0.96rem !important;

		margin-left: 0.20rem;
	}

	.container .list .list-center .center-tit {
		float: left;
		height: 1.6rem;
		padding-top: 0.29rem;
		box-sizing: border-box;
		width: 5.28rem;
		/* margin-left: 0.21rem; */
		/* 	display: flex;
		flex-direction: column;
		justify-content: center; */
		font-size: 0.32rem;
		color: #1b1b1b;
		/* width: 100%; */
		position: relative;
	}

	.center-tit .content-info {
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		-webkit-transform: translateY(-50%);
	}

	.list .list-center .center-tit .tit-info {
		/* margin-top: 0.28rem; */
		/* height: 0.32rem; */
		width: 5.28rem;
	}

	.list-center .center-tit div:nth-child(1) {
		/* display: flex;
		justify-content: space-between; */
	}

	.center-tit div:nth-child(1) .tit-right {
		font-size: 0.30rem;
		/* margin-right: 0.32rem; */
		color: #ff2d30;
		float: right;
		margin-top: -0.03rem;
	}

	.center-tit div:nth-child(1) .tit-right.num {
		margin-right: 0;
		color: #868688;

	}

	.center-tit .center-week {
		font-size: 0.26rem;
		color: #595959;
	}

	.list-center .center-tit div:nth-child(2) {
		/* margin-top: 18upx; */
		margin-top: 0.08rem;
		font-size: 0.26rem;
		color: #595959;
	}

	.list-center .center-tit div:nth-child(2) span {
		margin-right: 0.19rem;
	}

	.list-center .center-tit div:nth-child(2) text:nth-child(2) {
		margin-right: 33upx;
	}

	.list-center .center-right {
		font-size: 30upx;
	}

	.list-address {
		/* 	display: flex;
		justify-content: space-between;
		align-items: center; */
		height: 0.32rem;
		width: 100%;
		margin: 0rem 0 0.32rem 0;
		/* margin:0; */
		padding-left: 0.20rem;
		box-sizing: border-box;
		position: relative;
	}

	.list-address.address-mr {
		margin-top: 0.15rem;
	}

	.list-address .address-info {
		color: #5a5a5a;
		font-size: 0.28rem;
		height: 0.32rem;
		width: 100%;
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		-webkit-transform: translateY(-50%);

	}

	.list-address .address-info span {
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		-webkit-transform: translateY(-50%);
		display: inline-block;
		margin-left: 0.3rem;
		width: 4.25rem;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.list-address .address-info img {
		display: inline-block;
		width: 0.19rem;
		height: 0.24rem;
		margin-right: 0.12rem;
		/* transform: translateY(0.04rem); */
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		-webkit-transform: translateY(-50%);
	}

	.list-address .details {
		position: absolute;
		top: 50%;
		right: 4%;
		transform: translateY(-50%);
		-webkit-transform: translateY(-50%);
		/* float: right; */
		/* height: 0.32rem; */
		width: 1.37rem;
		/* line-height: 0.32rem; */
		/* display: flex;
		align-items: center; */
	}

	.list-address .details .details-info {
		color: #539ef9;
		font-size: 0.28rem;
		/* float: left;
		height: 0.32rem;
		line-height: 0.32rem; */
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		-webkit-transform: translateY(-50%);
		display: inline-block;
		/* margin-left: 0.3rem; */
		/* width: 4.25rem; */
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}


	.list-address .details-right {
		position: absolute;
		right: 4%;
		top: 50%;
		width: 0.13rem;
		height: 0.30rem;
		transform: translateY(-0.15rem);
		-webkit-transform: translateY(-0.15rem);

		/* position: relative; */
		/* 	float: right;
		
		/* line-height: 0.32rem; */
		/* margin-left: 0.1rem; */
		/* margin-right: 4%; */
		/* margin-top: 0.02rem; */

	}

	/* 	.details-right  img {
	
		width: 100%;
		height: 100%;
	
	} */

	.list-btn {
		/* display: flex;
		justify-content: flex-end; */
		height: 0.8rem;
		padding-bottom: 0.25rem;
		box-sizing: content-box;
		line-height: 0.5rem;
	}

	.list-btn button {
		float: right;
		margin-top: 0.08rem;
		height: 0.50rem;
		font-size: 0.28rem;
		line-height: 0.5rem;
		/* padding: 0  32upx; */
		margin-right: 0.28rem;
		background: #fff;
	}

	.list-btn .btn-pay {
		/* width: 170upx; */
		height: 0.64rem;
		border-radius: 0.32rem;
		width: 1.50rem;
		border: 1px solid #ff5f1e;
		color: #FF5F1E;
		text-align: center;
		line-height: 0.62rem;
		margin-right: 0.20rem;
	}

	.list-btn .btn-pay.button-hover {
		color: #FF5F1E;
		background: #fff;
	}

	.list-btn .btn-cancel {
		/* width: 170upx; */
		height: 0.64rem;
		border-radius: 0.32rem;
		text-align: center;
		line-height: 0.62rem;
		margin-right: 0.20rem;
		color: #868688 !important;
		border: 1px solid #97979f !important;
	}

	.list-btn .serveDe {
		height: 0.64rem;
		border-radius: 0.32rem;
		width: 1.50rem;
		border: 1px solid #ff5f1e;
		color: #FF5F1E;
		text-align: center;
		line-height: 0.62rem;
		margin-right: 0.20rem;
		background: #ff5f1e !important;
		color: #fff;
		padding-left: 0;
		padding-right: 0;
		box-sizing: border-box;
	}

	.list-btn .btn-cancel.button-hover {
		color: #868688;
		background: #fff;
	}

	.list-btn button:after {
		border: none;
	}

	.total-success {
		position: fixed;
		top: 5.7rem;
		background: rgba(44, 44, 44, 0.8);
		/* 	display: flex;
		flex-direction: column;
		align-items: center; */
		font-size: 0.28rem;
		color: #fff;
		width: 2.2rem;
		height: 2.15rem;
		border-radius: 0.15rem;
		left: 50%;
		transform: translateX(-50%);
		-webkit-transform: translateX(-50%);
		z-index: 1000;
	}

	.total-success .success-img {
		width: 100%;
		height: 1.4rem;
		position: relative;
		text-align: center;
	}

	.total-success img {
		width: 1.1rem;
		height: 1.05rem;
		margin-top: 0.35rem;
	}

	.total-success .success-tit {
		width: 100%;
		text-align: center;
	}

	.subscribe {
		background: #fff;
		position: fixed;
		width: 5rem;
		top: 4rem;
		left: 50%;
		transform: translateX(-50%);
		-webkit-transform: translateX(-50%);
		z-index: 1001;
		border-radius: 0.20rem;

	}

	.subscribe .subscribe-tit {
		font-size: 0.4rem;
		width: 100%;
		text-align: center;
		font-weight: 550;
		margin-top: 0.15rem;
		font-weight: 551;
	}

	.subscribe .select-time {
		margin: 0.2rem 0 0.25rem 0.20rem;
		font-size: 0.30rem;
	}

	.subscribe .select-time span {
		color: #131315
	}

	.subscribe .btn {
		display: flex;
		font-size: 0.35rem;
		border-top: 1px solid #eee;
	}

	.subscribe .btn .btn-cancel {
		border-right: 1px solid #edd;
		color: #949494;
	}

	.subscribe .btn>div {
		flex: 1;
		text-align: center;
		height: 1rem;
		line-height: 1rem;
	}

	.shadowArea {
		position: fixed;
		bottom: 0.98rem;
		height: 100%;
		width: 100%;
		background: rgba(0, 0, 0, 0.6);
		z-index: 1000;
	}
</style>
