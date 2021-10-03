<template>
	<div class='content'>
		<div class='head' :class='showHead?"collage-height":""'>
			<div class='head-top' :class='showHead?"collage-head":""'>
				<div class='head-left' @click="tabReturn">
					<img src="../../assets/left-go.png" mode=""></img>
					<span>返回</span>
				</div>
				<div class='head-center'>
					<span v-if='!showHead'>分期详情</span>
				</div>
				<div class='head-right' @click="toCustomer">
					<img src='../../assets/kefu.png'></img>
				</div>
			</div>
			<div class='head-cont'>

			</div>

			<div class='head-bottom'>

			</div>
		</div>

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
						<div v-if='info.buyType==1'>
							办公室清洁-单次保洁
						</div>
						<div v-if='info.buyType==2'>
							办公室清洁-包月定制
						</div>
						<div v-if='info.buyType==3'>
							办公室清洁-包季定制
						</div>
						<div v-if='info.buyType==4'>
							办公室清洁-包年定制
						</div>
						<div class='money'>￥{{info.orderMoney}}</div>
					</div>
					<div class='meal-times'>
						<!-- 			<span class='times'>{{info.frequency}}次/周</span>
								<span class='rang'>({{info.beginTime}}-{{info.endTime}}点)</span> -->
						<span class='num'>购买面积：{{info.flatNum}}平，到场时间：{{info.beginTime}}</span>
						<!-- <span class='num'>(共{{info.totalNums}}次<span style="margin-left: 6px;">剩{{info.leaveNums}}次</span>)</span> -->
						<!-- 
								<div>
									{{info.weeks}}
								</div> -->
					</div>

					<div class='remain' v-if='info.weeks.length>0'>
						服务时间：<span>{{info.weeks}}</span>
					</div>
					<div class='remain'>
						深度清洁：<span>购买{{info.depthNums}}次，</span><span>剩余{{info.depthLeaveNums}}次</span>
					</div>
					<div class='remain'>
						日常清洁：<span>购买{{info.dailyNums}}次，</span><span>剩余{{info.dailyLeaveNums}}次</span>
					</div>
					<div v-if='false' class='service-date'>
						服务日期：<span>2019.11.21-2019.11.25</span>
					</div>
				</div>


			</div>
			<div class='meal-bottom'>
				<div class='price'>
					<div>商品总价</div>
					<div>￥{{info.payableMoney}}</div>
				</div>
				<div class='price'>
					<div>优惠卷</div>
					<div>-￥{{info.couponMoney.length==0?'0':info.couponMoney}}</div>
				</div>
				<div class='payment'>
					<div>实付款</div>
					<div class='moneys'>￥{{info.payableMoney}}</div>
				</div>
				<div class='price'>
					<div>
						下单时间
					</div>
					<div>
						<span>{{info.orderDate}}</span><span class='mf-left'>{{info.orderTime}}</span>
					</div>
				</div>
				<!-- 	<div class='stages' v-if='info.isPeriod==1'>
					<div></div>
					<div class='moneys'>(分期为{{info.periodMoney}}*{{info.periodNum}} <span>第{{info.payPeriod+1}}期</span>)</div>
				</div> -->
			</div>

		</div>
		<div class='stages' v-if='showContent'>
			<div class='stages-info'>
				<div>分期总结额</div>
				<div class='info-right'>￥{{info.paidMoney}}</div>
			</div>
			<div class='stages-info'>
				<div>总分期数</div>
				<div class='info-right'>{{info.periodNum}}期</div>
			</div>
			<div class='stages-info'>
				<div>已还期数</div>
				<div class='info-right'>{{info.payPeriod}}/{{info.periodNum}}期</div>
			</div>
			<div class='stages-info'>
				<div>本期还款金额</div>
				<div class='info-right'>￥{{info.periodMoney}}</div>
			</div>
			<div class='stages-info'>
				<div>截止时间</div>
				<div class='info-right'>{{info.paybackDate}}</div>
			</div>
			<div class='stages-btn'>
				<div class='btn-info' @click="pay">
					立即还款
				</div>
			</div>
		</div>
		<!-- 	<div class='order-info'>
			<div class='order-num'>
				<div>订单编号：<span>58fsd8444454555</span></div>
				<div class='info-btn'>
					复制
			    </div>
			</div>
			<div class='start-date'>下单时间：<span>2019-12-16</span><span class='mf-left'>12:15:05</span></div>
			<div class='pay-time' v-if='info.orderStatus!=1'>付款时间：<span>{{info.payDate}}</span><span class='mf-left'>{{info.payTime}}</span></div>
		</div> -->
		<!-- 	<div class='after-sale'  v-if='false'>
			 <div class='after-order'>售后订单：<span>7889999</span></div>
			 <div class='applay-tit'>申请时间：<span class='apply-date'>2019-12-12</span><span>12:14:14</span></div>
			 <div class='after-type'>售后类型：<span>退款</span></div>
			 <span class='reason'>申请原因：<span>不要了</span></span>
		</div> -->

		<!-- <div class='order-bottom'>
				<div class='appointment' >预约</div>
				<div   >联系清洁师</div>
				<div class='complaint'>发起投诉</div>
				<div @click="pay">去支付</div>
				<div  class='complaint' @click='cancle(info.id)'>取消订单</div>
			</div> -->
		<Load v-if='isLoad'></Load>
		<customer v-if='collageCurstomer' @priming='toCustomer' @define='toPhone'></customer>
		<!-- <customer-Phone v-if='collageCurstomer' @priming='toCustomer' @define='toPhone'></customer-Phone> -->
	</div>
</template>

<script>
	import * as axios from '../../untils/ajax.js'
	import customer from '../customerService.vue'
	export default {
		data() {
			return {
				id: "",
				info: {
					tProductOffice: {
						name: ''
					},
					couponMoney: ""
				},
				isLoad: false,
				collageCurstomer: false,
				showContent: false,
				materUrl: '',
				sign: null,
				showHead: false
			}
		},
		components: {
			customer
		},
		methods: {
			toCustomer() {
				this.collageCurstomer = !this.collageCurstomer
			},
			toPhone() {
				this.collageCurstomer = !this.collageCurstomer
				window.location.href = 'tel://4008290037'

			},
			tabReturn() {
				// 点击消息推送跳转过来的
				if (this.$getOther.getUrlInfo('isBack') == '1') {
					this.$router.go(-2)
				} else {
					this.$router.go(-1)
				}

				// uni.navigateBack()
			},
			tapService() {
				uni.navigateTo({
					url: '/pages/service/daily'
				})
			},
			getInfo() {
				// let params = new FormData()
				// params.append('orderId',this.id)
				this.isLoad = true
				let params = new FormData()
				params.append('periodId', this.id)
				axios.post('/office/t-office-order-period/getPeriodDetailByOrderId', params).then(res => {
					if (res.meta.success) {
						console.log(res.data)
						let list = res.data
						let orderTime = list.orderTime.split(' ')
						console.log(orderTime)
						list.orderDate = orderTime[0]
						list.orderTime = orderTime[1]
						let payTime = list.payTime.split(' ')
						list.payDate = payTime[0]
						list.payTime = payTime[1]

						this.info = list
						this.materUrl = this.configUrl + this.info.tProductOffice.materPicUrl
						if (this.info.address.includes(')') && this.info.detailAddr.length > 0) {
							this.info.address = this.info.address.substr(0, this.info.address.length - 1) + ',' + this.info.detailAddr +
								')'
						}
						this.showContent = true
						this.isLoad = false
					}
				})
			},
			// cancle(id) {
			// 	console.log(44)
			// 	let that = this
			// 	this.toast.showNewModal('提示', '是否要取消订单?', true, '取消', '确定', function() {
			// 		axios.post('/qjrapi/office/t-office-order-period/getPeriodDetailByOrderId', {
			// 			periodId: id
			// 		}).then(res => {
			// 			if (res.meta.success) {
			// 				that.toast.success('取消成功')
			// 				uni.navigateBack({})
			// 			} else {
			// 				that.toast.fail('取消失败')
			// 			}
			// 		})
			// 	})
			// },
			pay() {
				this.sign = 'collage'
				let info = {
					id: this.info.id,
					periodId: this.id,

				}
				this.$router.push({
					name: 'stagesPayment',
					params: info
				})
				// uni.navigateTo({
				// 	url:'/pages/home/stagesPayment?id='+this.info.id+'&periodId='+this.id
				// })
			}
		},
		created() {
			// 点击消息推送跳转过来的
			if (this.$getOther.getUrlInfo('periodId')) {
				this.id = this.$getOther.getUrlInfo('periodId')
			} else {
				this.id = this.$route.params.periodId
			}

			if (window.localStorage.getItem('wxBrowser')) {
				this.showHead = true
			}


			// if(options.isRead && options.isRead==2){
			// 	let badgeNumber= uni.getStorageSync('badgeNumber') - 1
			// 	  uni.setStorageSync('badgeNumber',badgeNumber)
			// 	 plus.runtime.setBadgeNumber(badgeNumber)
			// }
			this.getInfo()
			if (this.$route.params.isRead && this.$route.params.isRead == 2) {
				

			}

		}
	}
</script>

<style scoped>
	.content {
		padding-bottom: 0.50rem;
		box-sizing: border-box;
	}

	.head {
		/* padding-top: 40upx; */
		height: 2.70rem;
		width: 100%;
		/* background: #539ef9; */
		/* background-img:url('../../static/head.png') ;
			background-size: 100% 100%; */
		background-image: url('../../assets/head-total1.png');
		background-size: 100% 100%;
		text-align: center;
		/* position: relative; */
		box-sizing: content-box;
		color: #fff;
		font-size: 0.33rem;
		display: flex;
		display: -webkit-box;
		display: -webkit-flex;
		flex-direction: column;
	}

	.head.collage-height {
		height: 2.38rem;
	}

	.head-cont {
		/* padding-top: 40upx; */
		width: 100vw;
		height: 1.30rem;
		background-image: url('../../assets/head-top1.png');
		background-size: 100% 100%;
	}

	.head-top {
		width: 100%;
		height: 1.30rem;
		padding-top: 0.40rem;
		box-sizing: border-box;
		background-image: url('../../assets/head-top1.png');
		position: fixed;
		top: 0;
		z-index: 10;
		background-size: 100% 100%;
	}

	.head-top.collage-head {

		padding-top: 0;
		top: -0.15rem;
		height: 1.2rem;
		/* height: 1rem; */
	}

	.head-bottom {
		width: 100vw;
		height: 1.10rem;
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
		font-size: 0.32rem;
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

	.head-top.collage-head .head-right img {
		top: 0.47rem;
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
		margin-top: 0px;
		z-index: 3;
		transform: translateY(-50%);
		-webkit-transform: translateY(-50%);
		border-radius: 0.2rem;
		box-shadow: 0.05rem 0.05rem 0.10rem #ddd;
	}

	.address-img img {
		height: 0.48rem;
		width: 0.48rem;
		margin-right: 0.20rem;
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
		text-overflow: -o-ellipsis-lastline;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		line-clamp: 2;
		-webkit-box-orient: vertical;
		font-size: 0.3rem;
		/* overflow: hidden;
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
		-webkit-transform: translateY(-0.80rem);
		;
		box-shadow: 0.05rem 0.05rem 0.10rem #ddd;
		box-sizing: border-box;
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
		height: 1.20rem;
		width: 1.20rem;
		border: 1px solid #ddd;
		border-radius: 0.10rem;
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
		width: 4.555rem;
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
		/* color: #e01212; */
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
		width: 6.62rem;
		display: flex;
		display: -webkit-box;
		display: -webkit-flex;
		justify-content: space-between;
		-webkit-box-pack: justify;
		-webkit-justify-content: space-between;
		font-size: 0.24rem;
		margin-bottom: 0.10rem;
	}

	.meal-bottom .payment .moneys {
		color: #e01212;
	}

	.meal-bottom .stages {
		width: 3.74rem !important;
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
		transform: translateY(-0.6rem);
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
		line-height: 0.34rem;
		color: #000;
		border-radius: 0.07rem;
		font-size: 0.2rem !important;
	}

	.order-info .start-date {
		margin-bottom: 0.20rem
	}

	.after-sale {
		padding: 0.30rem 0.16rem;
		margin: 0 auto;
		background: #fff;
		margin: 0 auto;
		width: 6.94rem;
		border-radius: 0.20rem;
		transform: translateY(-0.40rem);
		-webkit-transform: translateY(-0.40rem);
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
		transform: translateY(-0.40rem);
		-webkit-transform: translateY(-0.40rem);
	}

	.recent-services .recent-list {
		font-size: 0.30rem;
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
		color: #ff5f1e;
		/* color:#169EFF; */
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

	.mf-left {
		margin-left: 0.15rem;
	}

	.stages {
		/* padding: 15px 8px; */
		background: #fff;
		margin: 0 auto;
		width: 6.94rem;
		border-radius: 0.10rem;
		transform: translateY(-30px);
		-webkit-transform: translateY(-30px);
		font-size: 0.12rem;
		color: #999;
		box-shadow: 0.05rem 0.05rem 0.10rem #ddd;
	}

	.stages>div {
		padding: 0 0.16rem;
		border-bottom: 1px solid #eee;
	}

	.stages>div:last-child {
		border-bottom: none;
	}

	.stages .stages-info {
		display: flex;
		display: -webkit-box;
		display: -webkit-flex;
		justify-content: space-between;
		-webkit-box-pack: justify;
		-webkit-justify-content: space-between;
		align-items: center;
		-webkit-box-align: center;
		-webkit-align-items: center;
		color: #97979f;
		font-size: 0.28rem;
		height: 0.71rem;
	}

	.info-right {
		color: #707070;
	}

	.stages-btn {
		height: 0.90rem;
		/* 	display: flex;
		display: -webkit-box;
		display: -webkit-flex;
		align-items: center;
		-webkit-box-align: center;
		-webkit-align-items: center;
		flex-direction: row-reverse; */
		font-size: 0.24rem;
	}

	.btn-info {
		float: right;
		width: 1.6rem;
		height: 0.58rem;
		margin-top: 0.16rem;
		line-height: 0.58rem;
		text-align: center;
		border: 1px solid #ff5f1e;
		border-radius: 0.15rem;
		color: #FF5F1E;
		box-sizing: border-box;
	}
</style>
