<template>
	<div class='content'>
		<div class='head'>
			<div class='head-fixed' :class='showHead?"collage-head":""'>
				<div class='head-left' @click="tabReturn">
					<img src="../../assets/left-go.png" mode=""></img>
					<span>返回</span>
				</div>
				<div class='head-center'>
					订单详情
				</div>
				<div class='head-right' @click="toCustomer">
					<img src='../../assets/kefu.png'></img>
				</div>
			</div>
			<div class='head-top'>

			</div>
			<div class='head-bottom'>

			</div>

		</div>

		<div class='order-start' v-if='showContent' :class='showHead?"collage-head":""'>
			<div class='start' v-if='info.orderStatus==1'>
				待支付
			</div>
			<div class='start' v-if='info.orderStatus==2'>
				已支付
			</div>
			<div class='start' v-if='info.orderStatus==3'>
				服务中
			</div>
			<div class='start' v-if='info.orderStatus==4'>
				售后
			</div>
			<div class='start' v-if='info.orderStatus==5'>
				交易成功
			</div>
			<div class='start' v-if='info.orderStatus==6'>
				交易关闭
			</div>
			<div class='service' v-if='info.orderStatus==1'>
				订单超过60分钟将会自动取消，请在规定时间内完成支付
			</div>
			<div class='service' v-if='info.orderStatus==2'>
				感谢您的支持，清洁人将尽快为您服务！
			</div>
			<div class='service' v-if='info.orderStatus==3'>
				正在为您服务，有任何问题请致电4008290037
			</div>
		</div>
		<div>
			<div class='order-person' v-if='showContent'>
				<div class='address-img'>
					<img src='../../assets/address-6.png'></img>
				</div>
				<div class='person-info'>
					<div class='person-name'>
						{{info.linkman}}<span>{{info.linkmobile}}</span>
					</div>
					<div class='person-address'>
						<!-- {{info.city}}{{info.district}}{{info.address}} -->
						{{info.address}}
					</div>
				</div>
			</div>
			<div class='meal' v-if='showContent'>
				<div class='meal-top'>
					<div class='meal-img'>
						<img :src='materUrl'></img>
					</div>
					<div>
						<div class='meal-info'>
							<div v-if='info.productType==4'>
								窗帘清洗
							</div>
							<div v-if='info.productType==7'>
								水晶灯清洗
							</div>
							<div v-if='info.productType==8'>
								床垫清洗
							</div>
							<div v-if='info.productType==9'>
								石材养护
							</div>
							<div v-if='info.productType==10'>
								空调清洗
							</div>
							<div class='money'>￥{{info.orderMoney}}</div>
						</div>
						<div class='meal-times'>
							<!-- 			<span class='times'>{{info.frequency}}次/周</span>
			 					<span class='rang'>({{info.beginTime}}-{{info.endTime}}点)</span> -->
							<span class='num'>购买规格：{{info.specName}}</span>
							<!-- <span class='num'>(共{{info.totalNums}}次<span style="margin-left: 6px;">剩{{info.leaveNums}}次</span>)</span> -->
							<!-- 
			 					<div>
			 						{{info.weeks}}
			 					</div> -->
						</div>
						<div class='remain'>
							服务时间：<span>{{info.serviceDate}}</span>，到场时间：{{info.beginTime}}
						</div>
						<!-- <div class='remain'>
							服务时间：<span>{{info.weeks}}</span>
						</div>
						<div class='remain'>
							深度清洁：<span>购买{{info.depthNums}}次，</span><span>剩余{{info.depthLeaveNums}}次</span>
						</div>
						<div class='remain'>
							日常清洁：<span>购买{{info.dailyNums}}次，</span><span>剩余{{info.dailyLeaveNums}}次</span>
						</div> -->

					</div>
				</div>

				<div class='meal-bottom' v-if='showContent'>
					<div class='price'>
						<div>商品总价</div>
						<div>￥{{info.orderMoney}}</div>
					</div>
					<!-- 	<div class='price'>
			 				<div>优惠券</div>
			 				<div>-￥{{info.couponMoney}}</div>
			 			</div>
			 			<div class='price'>
			 				<div>抵用券</div>
			 				<div>-￥{{info.allowanceMoney}}</div>
			 			</div> -->
					<div class='payment'>
						<div>实付款</div>
						<div class='moneys'>￥{{info.price}}</div>
					</div>
					<div class='stages' v-if='info.isPeriod==1'>
						<div></div>
						<div class='moneys'>(分期为{{info.periodMoney}}*{{info.periodNum}} <span>已还{{info.payPeriod}}期</span>)</div>
					</div>
				</div>

			</div>
			<div class='order-info'>
				<div class='order-num'>
					<div>订单编号：<span>{{info.orderNo}}</span></div>
					<div class='info-btn' v-clipboard:copy="copyInfo" v-clipboard:success="copy">
						复制
					</div>
				</div>
				<div class='start-date'>下单时间：<span>{{info.orderTime}}</span><span></span></div>
				<div class='pay-time' v-if='info.orderStatus!=1'>付款时间：<span>{{info.payTime}}</span><span></span></div>
			</div>
			<div class='after-sale' v-if='false'>
				<div class='after-order'>售后订单：<span>7889999</span></div>
				<div class='applay-tit'>申请时间：<span class='apply-date'>2019-12-12</span><span>12:14:14</span></div>
				<div class='after-type'>售后类型：<span>退款</span></div>
				<span class='reason'>申请原因：<span>不要了</span></span>
			</div>
			<!-- 	<div class='recent-services' v-if='info.orderStatus==3  &&  list.length>0'>
			 		<div class='recent-list'>
			 			<div>排班概况</div>
			 			<div class='more' @click='tapService(info.orderNo)'>更多</div>
			 		</div>
			 		<div v-for="(item,index) in list "  >
			 			<div class='reason-info' >
			 				<span class='recent-date'>{{item.appointDate}}</span><span class='recent-lady'>{{item.employeeName}}</span><span class='look' @click='lookDetails(item.id)'>查看详情</span>
			 			</div>
			 		</div>
			 		
			 	</div> -->

			<div class='order-bottom' v-if='(showContent  && info.orderStatus==3) ||(showContent  && info.orderStatus==1)  ||  info.payStatus==1 '>
				<!-- <div class='appointment' v-if='info.orderStatus==2'>预约</div> -->
				<!-- <div v-if='info.orderStatus==3'>联系清洁师</div> -->
				<!-- <div v-if='info.orderStatus==3' class='complaint' @click='comPlaint(info.id)'>发起投诉</div> -->
				<div class='serveDe' v-if='info.payStatus==1' @click="toServeList()">服务详情</div>
				<div @click="pay" v-if='info.orderStatus==1'>去支付</div>
				<div class='complaint' v-if='info.orderStatus==1' @click="cancle(info.id)">取消订单</div>
				<!-- <div >申请开票</div> -->
				<!-- <div class='complaint'  v-if='false'>历史服务</div> -->
			</div>
		</div>


		<Load v-if='isLoad'></Load>
		<customer v-if='collageCurstomer' @priming='toCustomer' @define='toPhone'></customer>
		<showMoadel v-if='modelSign' :cont='msg' @define='confirms' @remove='cancels'></showMoadel>
		<!-- <customer-Phone v-if='collageCurstomer' @priming='toCustomer' @define='toPhone'></customer-Phone> -->
	</div>
</template>

<script>
	import * as axios from '../../untils/ajax.js'
	import customer from '../customerService.vue'
	import {
		mapActions,
		mapGetters
	} from 'vuex'
	export default {
		data() {
			return {
				id: "",
				info: {
					week: ''
				},
				showContent: false,
				isLoad: false,
				materUrl: '',
				collageCurstomer: false,
				list: [],
				copyInfo: '',
				modelSign: false,
				msg: '是否要取消订单?',
				showHead:false
			}
		},
		components: {
			customer

		},
		computed: {
			...mapGetters(['showCleanFlag'])
		},
		methods: {
			...mapActions(['collageCleanFlag']),
			toCustomer() {
				console.log(55444)
				this.collageCurstomer = !this.collageCurstomer
			},
			toPhone() {
				this.collageCurstomer = !this.collageCurstomer
				window.location.href = 'tel://4008290037'
			},
			tabReturn() {
				// uni.navigateBack()
				this.$router.go(-1)
			},
			tapService(e) {
				uni.navigateTo({
					url: '/pages/service/daily?orderNo=' + e
				})
			},
			getInfo() {
				// let params=new FormData()
				//   params.append('orderId',this.id)
				this.isLoad = true
				let params = new FormData
				params.append('orderId', this.id)

				axios.post('/technology/t-technology-order/getTecOrderDetailByOrderId', params).then(res => {
					if (res.meta.success) {
						console.log(res.data)
						this.info = res.data
						// this.getList()
						this.materUrl = this.configUrl + this.info.masterPicUrl
						if (typeof(this.info.allowanceMoney) == 'string') {
							console.log(555)
							this.info.allowanceMoney = 0
						}
						if (typeof(this.info.couponMoney) == 'string') {

							this.info.couponMoney = 0
						}
						// if(this.info.address.includes(')') && this.info.detailAddr.length>0){
						// 	 this.info.address=this.info.address.substr(0,this.info.address.length-1)+','+this.info.detailAddr+')'
						// }
						this.copyInfo = this.info.orderNo

						this.showContent = true
						this.isLoad = false
					} else {
						this.isLoad = false
					}
				})
			},
			pay() {
				// uni.navigateTo({
				// 	url: '/pages/home/orderPayment?id='+this.info.id
				// })
				let info = {
					'id': this.info.id
				}
				this.$router.push({
					"name": 'cleanPayment',
					params: info
				})
			},
			comPlaint(id) {


				uni.navigateTo({
					url: '/pages/service/complaint?composeNo=' + id
				})
			},
			cancle(id) {
				let that = this
				this.modelSign = !this.modelSign
				//    let params=new FormData()
				// params.append('orderId',id)

			},
			lookDetails(composeNo) {
				uni.navigateTo({
					url: '/pages/service/details?composeNo=' + composeNo
				})
			},
			toServeList() {
				// let id={
				// 	'orderId':e,
				// 	'productType':index
				// }
				// this.$router.push({'name':'serviceDetails',params:id})
				let id = {
					'orderId': this.id,
					'productType': this.info.productType
				}
				this.$router.push({
					'name': 'serviceDetails',
					params: id
				})
				// uni.navigateTo({
				// 	url: '/pages/service/serviceDetails?orderId=' + this.id
				// })
			},
			// 	getList() {
			// 		let that = this

			// 		this.isLoad = true
			// 		axios.post('/qjrapi/office/t-office-order/getServiceLog', {
			// 			orderNo: that.info.orderNo,
			// 			time: 1,
			// 			pageSize: 3,
			// 			pageNo:1
			// 		}).then(res => {
			// 			console.log(res)
			// 			if (res.meta.success) {
			// 				var service = res.data.records.map(item => {
			// 					item.status = false
			// 					return item
			// 				})
			// 				that.total = Number(res.data.totalCounts)
			// 				if (that.pageNo === 1) {
			// 					that.list = service
			// 				} else {
			// 					that.list = that.list.concat(service)
			// 				}



			// 				this.isLoad = false
			// 			} else {
			// 				this.isLoad = false
			// 				this.toast.fail('获取数据失败')

			// 			}

			// 		})
			// 	},
			copyhttplist(e) {

			},
			copy(e) {
				this.$toast({
					message: '复制成功',
					duration: 1000
				})


			},
			confirms() {
				let that = this
				this.modelSign = !this.modelSign
				let params = new FormData()
				params.append('orderId', this.id)
				axios.post('/technology/t-technology-order/cancelOrder', params).then(res => {
					if (res.meta.success) {
						// that.toast.success('取消成功')
						// uni.navigateBack({})
						this.$toast({
							message: '取消成功',
							duration: 1000
						})

						let flag = this.showCleanFlag + 1

						this.collageCleanFlag(flag)
						setTimeout(() => {
							that.$router.go(-1)
						}, 600)

					} else {
						this.$toast({
							message: res.meta.msg,
							duration: 1000
						})
						// that.toast.fail('取消失败')
					}
				})

			},
			cancels() {
				this.modelSign = !this.modelSign
			}
		},
		created() {
			if (window.localStorage.getItem('wxBrowser')) {
				this.showHead = true
			}

			// this.id ='1918761091732152470'
			this.id = this.$route.params.orderId
			this.getInfo()
			if(this.$route.params.isRead && this.$route.params.isRead==2){

				
			}
			
		}
	}
</script>

<style scoped>
	.content {
		padding-bottom: 1rem;
		box-sizing: border-box;
	}

	.head {
		padding-top: 0.40rem;
		height: 3.40rem;
		width: 100%;
		/* background: #539ef9; */
		/* background-img:url('../../static/head.png') ;
			background-size: 100% 100%; */
		background-image: url('../../assets/head-total2.png');
		background-size: 100% 100%;
		text-align: center;
		/* position: relative; */
		box-sizing: content-box;
		color: #fff;
		font-size: 0.33rem;
		display: flex;
		display: -webkit-box;
		display: -webkit-flex;
	}

	.head-fixed {
		padding-top: 0.40rem;
		height: 1.30rem;
		width: 100vw;
		position: fixed;
		top: 0;
		box-sizing: border-box;
		z-index: 10;
		background-image: url('../../assets/head-top2.png');
		background-size: 100% 100%;
	}

	.head-fixed.collage-head {
		padding-top: 0;
		top: -0.15rem;
		/* height: 1rem; */
	}

	.head-top {
		height: 1.30rem;
		width: 100vw;
	}

	.head-bottom {
		height: 2.12rem;
		width: 100vw;
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
		/* padding-top: 0.26rem; */
		width: 40%;
		/* height: 0.38rem; */
		display: flex;
		display: -webkit-box;
		display: -webkit-flex;
		justify-content: center;
		-webkit-box-pack: center;
		-webkit-justify-content: center;
		align-items: center;
		-webkit-box-align: center;
		-webkit-align-items: center;
		box-sizing: content-box;
		/* line-height: 88upx; */
		/* span-align: center; */
		float: left;
	}

	.head-right {
		height: 0.36rem;
		/* float: left; */
		/* height: 88upx; */

		padding-top: 0.26rem;
		width: 30%;

	}

	.head-right img {
		display: inline-block;
		width: 0.48rem;
		height: 0.40rem;
		position: absolute;
		right: 0.28rem;
		top: 0.67rem;
	}

	.head-img {
		height: 3.80rem;
		width: 100vw;
	}

	.head-img img {
		display: block;
		width: 100%;
		height: 100%;
	}

	.order-start {
		position: absolute;
		top: 1.53rem;
		color: #fff;
		margin-left: 0.28rem;
	}

	.order-start.collage-head {
		top: 1.23rem
	}

	.start {
		font-size: 0.34rem;
	}

	.service {
		margin-top: 0.18rem;
		font-size: 0.24rem;
	}

	.order-person {
		background: #fff;
		padding: 0.46rem 0 0.46rem 0.16rem;
		display: flex;
		display: -webkit-box;
		display: -webkit-flex;
		align-items: center;
		-webkit-box-align: center;
		-webkit-align-items: center;
		width: 6.94rem;
		margin: 0 auto;
		margin-top: 0;
		z-index: 3;
		transform: translatey(-50%);
		-webkit-transform: translateY(-50%);
		border-radius: 0.2rem;
	}

	.address-img img {
		height: 0.48rem;
		width: 0.48rem;
		margin-right: 0.20rem;
	}

	.head-fixed.collage-head .head-right img {
		top: 0.47rem;
	}

	.person-info .person-name {
		font-size: 0.30rem;
		margin-bottom: 0.21rem;
	}

	.person-info .person-name span {
		font-size: 0.26rem;
		color: #666;
		margin-left: 0.22rem;
	}

	.person-info .person-address {
		width: 6rem;
		font-size: 0.3rem;
		text-overflow: -o-ellipsis-lastline;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		line-clamp: 2;
		-webkit-box-orient: vertical;
		/* overflow: hidden;
	/*   overflow: hidden;
	   span-overflow: ellipsis;
	   white-space: nowrap; */
	}

	.meal {
		padding: 0.30rem 0.16rem;
		/* 	display: flex;
		flex-direction: column; */
		width: 6.94rem;
		background: #fff;
		margin: 0 auto;
		border-radius: 0.20rem;
		transform: translateY(-0.8rem);
		-webkit-transform: translateY(-0.8rem);
	}

	.meal-top {
		display: flex;
		display: -webkit-box;
		display: -webkit-flex;
		align-items: center;
		-webkit-box-align: center;
		-webkit-align-items: center;
	}

	.meal .meal-img {
		height: 1.2rem;
		width: 1.2rem;
		border: 1px solid #ddd;
		border-radius: 0.1rem;
		overflow: hidden;
		margin-right: 0.24rem;
	}

	.meal .meal-img img {
		width: 100%;
		height: 100%;

	}

	.meal .meal-info {
		display: flex;
		display: -webkit-box;
		display: -webkit-flex;
		justify-content: space-between;
		-webkit-box-pack: justify;
		-webkit-justify-content: space-between;
		align-items: center;
		-webkit-box-align: center;
		-webkit-align-items: center;
		width: 5.12rem;
		font-size: 0.28rem;
		margin-bottom: 0.16rem;
	}

	.meal .meal-info .money {
		/* float: right; */
		color: #e01212;
	}

	.meal-times {
		font-size: 0.24rem;
		color: #868688;
		/* margin-bottom: 0.16rem; */
	}

	.meal-times .times {
		margin-right: 0.20rem;
	}

	.meal-times .num {
		margin-right: 0.10rem;
	}

	.meal-times .rang {
		margin-right: 0.25rem;
	}

	.meal .remain {
		font-size: 0.24rem;
		/* color:#e01212; */
		color: #868688;
	}

	.meal .service-date {
		font-size: 0.24rem;
		color: #868688;
	}

	.meal-bottom {
		width: 100%;
		margin-top: 0.90rem;
	}

	.meal-bottom .price {
		width: 6.62rem;
		display: flex;
		display: -webkit-box;
		display: -webkit-flex;
		justify-content: space-between;
		-webkit-box-pack: justify;
		-webkit-justify-content: space-between;
		color: #999;
		font-size: 0.24rem;
		margin-bottom: 0.10rem;
	}

	.meal-bottom .payment {
		display: flex;
		display: -webkit-box;
		display: -webkit-flex;
		justify-content: space-between;
		-webkit-box-pack: justify;
		-webkit-justify-content: space-between;
		width: 6.62rem;
		font-size: 0.24rem;

	}

	.meal-bottom .payment .moneys {
		color: #e01212;
	}

	.meal-bottom .stages {
		width: 6.62rem;
		display: flex;
		display: -webkit-box;
		display: -webkit-flex;
		justify-content: space-between;
		-webkit-box-pack: justify;
		-webkit-justify-content: space-between;
		font-size: 0.22rem;
		margin-top: 0.05rem;
	}

	.meal-bottom .stages span {
		margin-left: 0.15rem;
	}

	.meal-bottom .stages .moneys {
		color: #e01212;
	}

	.order-info {
		padding: 0.30rem 0.16rem;
		background: #fff;
		margin: 0 auto;
		width: 6.94rem;
		border-radius: 0.20rem;
		transform: translateY(-0.60rem);
		-webkit-transform: translateY(-0.6rem);
		font-size: 0.24rem;
		color: #999;
	}

	.order-info .order-num {
		width: 6.62rem;
		display: flex;
		display: -webkit-box;
		display: -webkit-flex;
		justify-content: space-between;
		-webkit-box-pack: justify;
		-webkit-justify-content: space-between;
		margin-bottom: 0.20rem;
	}

	.order-info .order-num .info-btn {
		height: 0.34rem;
		width: 0.87rem;
		border: 1px solid #d6d7dc;
		text-align: center;
		line-height: 0.36rem;
		color: #000;
		border-radius: 0.07rem;
		font-size: 0.20rem !important;
	}

	.order-info .start-date {
		margin-bottom: 0.20rem;
	}

	.after-sale {
		padding: 0.30rem 0.16rem;
		margin: 0 auto;
		background: #fff;
		margin: 0 auto;
		width: 6.94rem;
		border-radius: 0.20rem;
		transform: translateY(-0.4rem);
		-webkit-transform: translateY(-0.4rem);
		font-size: 0.24rem;
		color: #999;

	}

	.after-sale div {
		margin-bottom: 0.20rem;
	}

	.after-sale .applay-tit .apply-date {
		margin-right: 0.20rem;
	}

	.recent-services {
		padding: 0.30rem 0.16rem;
		margin: 0 auto;
		background: #fff;
		width: 6.94rem;
		border-radius: 0.20rem;
		transform: translateY(-0.4rem);
		-webkit-transform: translateY(-0.4rem);
	}

	.recent-services .recent-list {
		font-size: 30upx;
		display: flex;
		display: -webkit-box;
		display: -webkit-flex;
		justify-content: space-between;
		-webkit-box-pack: justify;
		-webkit-justify-content: space-between;
		width: 6.62rem;
		margin-bottom: 0.20rem;
	}

	.recent-services .more {
		font-size: 0.24rem;
	}

	.recent-services .reason-info {
		color: #999;
		margin-bottom: 0.18rem;
	}

	.recent-date {
		margin-right: 0.40rem;
	}

	.recent-lady {
		margin-right: 0.40rem;
	}

	.look {
		/* color:#ff5f1e; */
		color: #169EFF;
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
		flex-direction: row-reverse;
		-ms-flex-direction: row-reverse;
		-webkit-flex-direction: row-reverse;
		-webkit-box-orient: row-reverse;
		font-size: 0.3rem;
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
		box-sizing: border-box;
	}

	.order-bottom .serveDe {
		color: #fff;
		background: #ff5f1e !important;

	}

	.appointment {}

	.order-bottom .complaint {
		color: #868688 !important;
		border: 1px solid #97979f !important;
	}
</style>
