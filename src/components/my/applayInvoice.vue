<template>
	<div class='containerHeight' @touchstart="touchStart($event)" @touchmove="touchMove($event)" @touchend="touchEnd($event)">
		<head-Piece :sign='"历史申请"'>
			<template slot="content">申请发票</template>
			<template slot='content-right'>历史申请</template>
		</head-Piece>

		<div class='content-btn'  :class='typeFlag?"collageTop":""'>
			<div class='btn-info'>
				<div class='btn' @click="collage(4)" :class='type == "4"?"sign-color":""'>
					半年内
				</div>
				<div class='btn' @click="collage(5)" :class='type == 5?"sign-color":""'>
					1年内
				</div>
				<div class='btn' @click="collage(6)" :class='type == 6?"sign-color":""'>
					全部
				</div>
			</div>
		<!-- 	<div class='history-applay' @click="toHistoryApply" v-if='typeFlag'>
				历史申请
			</div> -->
		</div>
		<div class='content-show'>

		</div>
		<div class='container'>
			<div class='list' @click="gotoDetail(item.id,item.buyType)" v-for='(item,index) in list'>
				<div v-if='item.productType==2'>
					<div class='list-head'>
						<div class='head-left'>
							<img src='../../assets/time.png'></img>
							<div class='left-tit'>下单时间:<span>{{item.orderTime}}</span></div>
						</div>
						<div class='head-right'>
							<span v-if='item.orderStatus==1'>待支付</span>
							<span v-if='item.orderStatus==2'>已支付</span>
							<span v-if='item.orderStatus==3'>服务中</span>
							<span v-if='item.orderStatus==4'>待评价</span>
						    <span v-if='item.orderStatus==5'>完成</span>
						    <span v-if='item.orderStatus==6'>关闭</span>
						</div>
					</div>
					<div class='list-center'>
						<div class='center-left'>
							<img class='left-img' src='../../assets/count-num.png' v-if='item.buyType==1'></img>
							<img class='left-img' src='../../assets/month.png' v-if='item.buyType==2'></img>
							<img class='left-img' src='../../assets/season.png' v-if='item.buyType==3'></img>
							<img class='left-img' src='../../assets/new-year.png' v-if='item.buyType==4'></img>
						</div>
						<div class='center-tit'>
							<div>
								<span v-if='item.buyType==1'>单次保洁</span><span v-if='item.buyType==2'>包月定制</span>
								<span v-if='item.buyType==3'>包季定制</span><span v-if='item.buyType==4'>包年定制</span>
								<span class='tit-right'>
									￥{{item.payMoney}}
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
								<span>{{item.flatNum}}平</span>
							</div>
					<!-- 		<div class='center-week'>
								{{item.weeks}}
							</div> -->
						</div>

					</div>
					<div class='list-address'>
						<div class='address-info'>
							<div class='info-img'>
								<img src='../../assets/address.png'></img>
							</div>

							<span class='addess-des'>{{item.address}}</span>
						</div>
						<div class='details'>

							<div class='details-info'>订单详情</div>
							<img src='../../assets/right-go.png'></img>
						</div>

					</div>
					<div class='list-btn'>
						<!-- 	<button class='btn-cancel' v-if='item.orderStatus==1' @click.stop.prevent="cancle(item.id)">取消订单</button>
					<button class='btn-pay' v-if='item.orderStatus==1' @click.stop.prevent='pay(item.id)'> 支付</button>
					<button class='btn-pay' v-if='(item.buyType==1 && item.orderStatus==2) || (item.buyType==1 && item.orderStatus==3)'
					 @click.stop.prevent='pay'>预约</button> -->
						<button class='btn-pay' @click.stop.prevent='toApplay(item.id,item.billsId)'>申请发票</button>
					</div>
				</div>
				<div v-if='item.productType==3'>

				</div>
				<div v-if='item.productType==4'>
					<div class='list-head'>
						<div class='head-left'>
							<img src='../../assets/time.png'></img>
							<div class='left-tit'>下单时间:<span>{{item.orderTime}}</span></div>
						</div>
						<div class='head-right'>
							<span v-if='item.orderStatus==1'>待支付</span>
							<span v-if='item.orderStatus==2'>已支付</span>
							<span v-if='item.orderStatus==3'>进行中</span>
							<span v-if='item.orderStatus==4'>待评价</span>
							<!-- 	<span v-if='item.orderStatus==5'>完成</span>
				 		<span v-if='item.orderStatus==6'>关闭</span> -->
						</div>


					</div>
					<div class='list-center'>
						<div class='center-left'>
							<img class='left-img' src='../../assets/curtians.png'></img>

						</div>
						<div class='center-tit'>
							<div>
								<span>窗帘清洁</span>

								<span class='tit-right'>
									￥{{item.orderMoney}}
								</span>
							</div>
							<div>

								<!-- <span>({{item.weeks}})</span> -->
								<span>{{item.flatNum}}平</span>
							</div>
							<div class='center-week'>
								{{item.weeks}}
							</div>
						</div>

					</div>
					<div class='list-address'>
						<div class='address-info'>
							<div class='info-img'>
								<img src='../../assets/address.png'></img>
							</div>

							<span class='addess-des'>{{item.address}}</span>
						</div>
						<div class='details'>
							<div class='details-info'>订单详情</div>
							<img src='../../assets/right-go.png'></img>
						</div>

					</div>
					<div class='list-btn'>
						<!-- 	<button class='btn-cancel' v-if='item.orderStatus==1' @click.stop.prevent="cancle(item.id)">取消订单</button>
				 	<button class='btn-pay' v-if='item.orderStatus==1' @click.stop.prevent='pay(item.id)'> 支付</button>
				 	<button class='btn-pay' v-if='(item.buyType==1 && item.orderStatus==2) || (item.buyType==1 && item.orderStatus==3)'
				 	 @click.stop.prevent='pay'>预约</button> -->
						<button class='btn-pay' @click.stop.prevent='toApplay(item.id,item.billsId)'>申请开票</button>
					</div>
				</div>
				<div v-if='item.productType==5'>
					<div class='list-head'>
						<div class='head-left'>
							<img src='../../assets/time.png'></img>
							<div class='left-tit'>下单时间:<span>{{item.orderTime}}</span></div>
						</div>
						<div class='head-right'>
							<span v-if='item.orderStatus==1'>待支付</span>
							<span v-if='item.orderStatus==2'>已支付</span>
							<span v-if='item.orderStatus==3'>进行中</span>
							<span v-if='item.orderStatus==4'>待评价</span>
							<!-- 	<span v-if='item.orderStatus==5'>完成</span>
			 				<span v-if='item.orderStatus==6'>关闭</span> -->
						</div>


					</div>
					<div class='list-center'>
						<div class='center-left'>
							<img class='left-img' src='../../assets/capet-recevice.png'></img>

						</div>
						<div class='center-tit'>
							<div>
								<span>地毯清洁</span>

								<span class='tit-right'>
									￥{{item.orderMoney}}
								</span>
							</div>
							<div>

								<!-- <span>({{item.weeks}})</span> -->
								<span>{{item.flatNum}}平</span>
							</div>
							<div class='center-week'>
								{{item.weeks}}
							</div>
						</div>

					</div>
					<div class='list-address'>
						<div class='address-info'>
							<div class='info-img'>
								<img src='../../assets/address.png'></img>
							</div>

							<span class='addess-des'>{{item.address}}</span>
						</div>
						<div class='details'>
							<div class='details-info'>订单详情</div>
							<img src='../../assets/right-go.png'></img>
						</div>

					</div>
					<div class='list-btn'>
						<!-- 	<button class='btn-cancel' v-if='item.orderStatus==1' @click.stop.prevent="cancle(item.id)">取消订单</button>
			 			<button class='btn-pay' v-if='item.orderStatus==1' @click.stop.prevent='pay(item.id)'> 支付</button>
			 			<button class='btn-pay' v-if='(item.buyType==1 && item.orderStatus==2) || (item.buyType==1 && item.orderStatus==3)'
			 			 @click.stop.prevent='pay'>预约</button> -->
						<button class='btn-pay' @click.stop.prevent='toApplay(item.id,item.billsId)'>申请开票</button>
					</div>
				</div>
			</div>
		</div>
		
		<Load v-if='isLoad'></Load>
		<empty v-if="showEmpty"></empty>
		<showSuccess v-if='isSuccess' :successInfo='successInfo'></showSuccess>
	</div>
</template>

<script>
	import * as axios from '../../untils/ajax.js'
	import {
		mapGetters
	} from 'vuex'
	export default {
		data() {
			return {
				type: 4,
				typeFlag:false,
				list: [],
				pageSize: 8,
				pageNo: 1,
				total: '',
				showEmpty: false,
				isLoad: false,
				showCollage: false,
				startX: 0,
				startY: 0,
				endX: 0,
				endY: 0,
				innerHeight: '',
				scrollTop: "",
				scrollHeight: '',
				contentHeight: '',
				signHeight: '',
				signSuccess: 0,
				successInfo: '',
				isSuccess: false
			}
		},
		computed: {
			...mapGetters(['showRefreshInvoce'])
		},
		// onReachBottom() {
		// 	this.pageNo = this.pageNo + 1
		// 	console.log(this.pageNo)
		// 	console.log(this.list)
		// 	if (this.list.length >= this.total) {
		// 		this.toast.success('数据加载完了')
		// 		return
		// 	}
		// 	this.getList()
		// },
		methods: {
			collage(e) {
				console.log(e)
				this.type = e
				this.pageNo = 1
				this.list = []
				this.getList()
			},
			toHistoryApply(){
				this.$router.push({
					'name': 'oldInvoice'
				})
			},
			getList() {
				// axios.post()
				let that = this
				var params = new FormData()

				// var params={
				//    pageSize:this.pageSize,
				//    pageNo:this.pageNo
				// }
				if (this.type != 6) {
					// params={
					// 	pageSize:this.pageSize,
					// 	pageNo:this.pageNo,
					// 	time:this.type
					// }
					params.append('pageSize', that.pageSize)
					params.append('pageNo', that.pageNo)
					params.append('time', that.type)
				} else {
					params.append('pageSize', that.pageSize)
					params.append('pageNo', that.pageNo)
				}
				this.isLoad = true
				axios.post('/office/t-office-order/getCanInvoiceOrderByUserId', params).then(res => {
					console.log(res)
					if (res.meta.success) {
						console.log(888)
						that.total = Number(res.data.totalCounts)
						that.showCollage = false
						if (that.pageNo === 1) {
                              console.log(333)
							that.list = res.data.records
                          console.log(that.list)
						} else {
							that.list = that.list.concat(res.data.records)
						}

						this.isLoad = false
						if (this.list.length == 0) {
							this.showEmpty = true
						} else {
							this.showEmpty = false
						}

						// this.toast.success('验证码已发送')
					} else {
						// that.toast.fail()
						this.$toast({
						    message: '获取数据失败', duration: 1000
						})

					}
					this.isLoad = false
					// uni.stopPullDownRefresh();
				})
			},
			gotoDetail(id, status) {
				console.log(status)
				let info = {
					orderId: id
				}
				if (status == 1) {
					this.$router.push({
						'name': 'orderFrequency',
						params: info
					})
					// uni.navigateTo({
					// 	url: "../order/orderFrequency?orderId=" + id
					// })
					return
				}
				this.$router.push({
					'name': 'orderDetails',
					params: info
				})
				// uni.navigateTo({
				// 	url: "../order/orderDetails?orderId=" + id
				// })
			},
			toApplay(id, billsId) {
				this.showCollage = true
				let info = {
					id: id,
					billsId: billsId
				}
				this.$router.push({
					'name': 'invoiceInfo',
					params: info
				})
				// uni.navigateTo({
				// 	url: '/pages/my/invoiceInfo?id=' + id + '&billsId=' + billsId
				// })
			},
			touchStart(e) {
				this.startX = e.touches[0].pageX
				this.startY = e.touches[0].pageY


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
				// 滚动条到底部的条件

				if (scrollTop + scrollHeight >= innerHeight) {
					if (this.pullUpState !== 3 && !this.isLoading) {
						this.infiniteLoad()
					}
					// console.log('距顶部' + scrollTop + '滚动条总高度' + scrollHeight + '内容高度' + innerHeight)
				}
				let signHeight = Number(contentHeight) - (Number(innerHeight) + Number(scrollTop))
				let that = this
				// this.$toast({
				//     message: signHeight, duration: 1500
				// })
				if (signHeight < 60) {
					if (that.total <= that.list.length && that.total > 0) {
						that.signSuccess = that.signSuccess + 1
					}
				}
			},

			/**
			 * 上拉加载数据
			 */
			infiniteLoad() {
				this.pullUpState = 2
				if(this.isLoad){
				  return
				}
				let that = this
				if (this.list.length >= this.total) {
					// this.isSuccess = true
					// setTimeout(() => {
					// 	that.isSuccess = false
					// }, 2000)
					this.endListFalg = true
					return false
				}
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
		
		},
		created() {
			this.getList()
			if(window.localStorage.getItem('wxBrowser')){
					this.typeFlag=true
			}		
		},
		
		watch: {
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
			showRefreshInvoce() {
				this.list = []
				this.pageNo = 1
				this.getList()
			}
		}
	}
</script>

<style scoped>
	.content-btn {
		height: 0.90rem;
		/* width: 100vw; */
		padding: 0 0.28rem;
		/* box-sizing: border-box;
		display: flex;
		align-items: center; */
		font-size: 0.28rem;
		position: fixed;
		top: 1.28rem;
		width: 100%;
		background: #fff;
		z-index: 10;
		display: flex;
		display: -webkit-box;
		display: -webkit-flex;
		justify-content: space-between;
		-webkit-box-pack: justify;
		-webkit-justify-content: space-between;
		align-items: center;
		-webkit-box-align: center;
		-webkit-align-items: center;
	}
    .content-btn.collageTop{
		top: 0.8rem;
		z-index: 100;
		/* top: 0;
		width: 100vw; */
		
	}
	.content-show {
		height: 0.90rem;
	}

	.content-btn .btn-info {
		/* width: 100%; */
		background: #fff;
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		-webkit-transform: translateY(-50%);
	}

	.content-btn .btn {
		float: left;
		height: 0.60rem;
		width: 1.30rem;
		text-align: center;
		line-height: 0.60rem;
		background: #fff;
		border-radius: 0.10rem;
		color: #fff;
		margin-right: 0.18rem;
		/* 	border: 1px solid #539ef9; */
		color: #000;
		box-sizing: border-box !important;
	}

	.btn.sign-color {
		color: #ff5f1e;
	}

	.container {
		width: 6.94rem;
		height: 100%;
		margin: 0 auto;
		padding: 0 0.28rem;
		padding-bottom: 0.4rem;
		box-sizing: content-box;
	}

	.container .list {
		width: 100%;
		/* height: 310upx; */

		display: flex;
		display: -webkit-box;
		display: -webkit-flex;
		flex-direction: column;
		-webkit-box-orient: vertical;
		-webkit-box-direction: normal;
		-webkit-flex-direction: column;
		background: #fff;
		margin-top: 0.20rem;
		box-shadow: 0px 0.02rem 0.10rem #ececee;
	}
  .container .list:nth-child(1){
	  margin-top: 0 !important;
  }
	.container .list>div {
		width: 100%;
	}

	.list .list-head {
		display: flex;
		display: -webkit-box;
		display: -webkit-flex;
		justify-content: space-between;
		-webkit-box-pack: justify;
		-webkit-justify-content: space-between;
		align-items: center;
		-webkit-box-align: center;
		-webkit-align-items: center;
		height: 0.83rem;
		width: 100%;
		border-bottom: 1px solid #e8e8e8;
	}

	.list .list-head .head-left {
		/* float: left; */
		/* height: 83upx; */
		/* line-height: 0.83rem; */
		display: flex;
		display: -webkit-box;
		display: -webkit-flex;
		align-items: center;
		-webkit-box-align: center;
		-webkit-align-items: center;
		padding-left: 0.215rem;
		box-sizing: content-box;
	}

	.list .list-head .head-left img {
		display: inline-block;
		width: 0.27rem;
		height: 0.27rem;
		margin-right: 0.15rem;
	}

	.list .list-head .head-left .left-tit {
		display: inline-block;
		font-size: 0.26rem;
		color: #707070;
	}

	.list .list-head .head-left .left-tit span {
		margin-left: 0.19rem;
	}

	.list .list-head .head-right {
		/* float: right;
		line-height: 0.83rem; */
		padding-right: 0.25rem;
		box-sizing: border-box;
		color: #ff2a2a;
		font-size: 0.28rem;
	}

	.list .list-center {
		display: flex;
		display: -webkit-box;
		display: -webkit-flex;
       
		/* height: 228upx; */
		padding-top: 0.35rem;
		box-sizing: border-box;
		width: 100%;
		/* line-height: 228upx; */
	}

	.list .list-center .center-left {
		/* margin-right: 0upx; */
		
		width: 1.40rem;
		height: 0.96rem;
	}

	.list .list-center img.left-img {
		/* 	display: inline-block; */
		display: block;
		width: 0.96rem !important;
		height: 0.96rem !important;
		margin-left: 0.20rem;
	}

	.container .list .list-center .center-tit {
		height: 0.96rem;
		margin-left: 0.21rem;
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		-webkit-box-orient: vertical;
		-webkit-box-direction: normal;
		-webkit-flex-direction: column;
		flex-direction: column;
		justify-content: center;
		-webkit-box-pack: center;
		-webkit-justify-content: center;
		

		font-size: 0.32rem;
		color: #1b1b1b;
		width: 100%;
	}

	.list-center .center-tit>div:nth-child(1) {

		/* height: 100upx; */
		/* margin-bottom: 10upx; */

	}

	.center-tit>div:nth-child(1) .tit-right {
		float: right;
		font-size: 0.30rem;
		margin-right: 0.32rem;
		color: #ff2d30;
	}

	.center-tit .center-week {
		font-size: 0.26rem;
		color: #595959;
	}

	.list-center .center-tit>div:nth-child(2) {
		/* margin-top: 18upx; */
		height: 0.35rem;
		line-height: 0.35rem;
		/* 	margin-top: 10upx; */
		font-size: 0.26rem;
		color: #595959;
	}

	.list-center .center-tit>div:nth-child(2) span {
		margin-right: 0.19rem;
	}

	.list-center .center-tit>div:nth-child(2) span:nth-child(2) {
		margin-right: 0.33rem;
	}

	.list-center .center-right {
		font-size: 0.30rem;
	}

	.list-address {
		display: flex;
		display: -webkit-box;
		display: -webkit-flex;
		justify-content: space-between;
		-webkit-box-pack: justify;
		-webkit-justify-content: space-between;
		align-items: center;
		-webkit-box-align: center;
		-webkit-align-items: center;
		margin: 0.40rem 0 0.32rem 0;
		padding-left: 0.20rem;
		box-sizing: border-box;

	}

	.list-address .address-info {
		color: #5a5a5a;
		display: flex;
		display: -webkit-box;
		display: -webkit-flex;
		justify-content: space-between;
		-webkit-box-pack: justify;
		-webkit-justify-content: space-between;
	}

	.list-address .address-info .info-img {
		display: flex;
		display: -webkit-box;
		display: -webkit-flex;
		align-items: center;
		-webkit-box-align: center;
		-webkit-align-items: center;

	}

	.list-address img {
		display: inline-block;
		width: 0.19rem;
		height: 0.24rem;
		margin-right: 0.12rem;

	}

	.list-address .addess-des {
		display: inline-block;
		width: 4rem;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		font-size: 0.28rem;
		/* line-height: 0.28rem; */
	}

	.list-address .details .details-info {
		color: #539ef9;
		display: inline-block;
		font-size: 0.28rem;
	}

	.details {
		display: flex;
		display: -webkit-box;
		display: -webkit-flex;
		align-items: center;
		-webkit-box-align: center;
		-webkit-align-items: center;
	}

	.details>div {
		/* line-height: 0.28rem; */
	}

	.details img {
		display: inline-block;
		width: 0.13rem;
		height: 0.22rem;
		margin: 0 0.32rem 0 0.10rem;
		transform: translateY(0.02rem);
		-webkit-transform: translateY(0.02rem);
	}

	.list-btn {
		display: flex;
		display: -webkit-box;
		display: -webkit-flex;
		justify-content: flex-end;
		-webkit-box-pack: end;
		-webkit-justify-content: flex-end;
		padding-bottom: 0.25rem;
		box-sizing: content-box;
	}

	.list-btn button {
		margin: 0;
		height: 0.50rem;
		font-size: 0.28rem;
		/* line-height: 0.50rem; */
		/* padding: 0  32upx; */
		margin-right: 0.28rem;
		background: #fff;
	}

	.list-btn .btn-pay {
		/* width: 170upx; */
		height: 0.64rem;
		border-radius: 0.32rem;
		width: 1.90rem;
		border: 1px solid #ff5f1e;
		color: #FF5F1E;
		text-align: center;
		/* line-height: 0.64rem; */
		margin-right: 0.20rem;
		box-sizing: border-box;
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
		line-height: 0.64rem;
		margin-right: 0.20rem;
		color: #868688 !important;
		border: 1px solid #97979f !important;
	}

	.list-btn .btn-cancel.button-hover {
		color: #868688;
		background: #fff;
	}

	.list-btn button:after {
		border: none;
	}
	.history-applay{
		padding: 0.05rem 0.1rem;
	    height: 0.4rem;
		background: #ED6A0C;
		color: #fff;
	    line-height: 0.40rem;
		font-size: 0.3rem;
		border-radius: 0.1rem;
		position: absolute;
		top: 50%;
		right: 0.8rem;
		transform: translateY(-50%);
		-webkit-transform: translateY(-50%);
	}
</style>
