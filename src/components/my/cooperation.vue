<template>
	<div>
		<head-Piece>
			<template slot="content">活动收益</template>
		</head-Piece>
		<div class='info-head'>
			<div class='commission'>
				<div class='commission-info'>
					<div class='commission-top'>
						<div class='commission-title'>已累计总收益(元)</div>
						<div class='commission-num'>{{brokerCountInfo.totalBroker}}</div>
					</div>
					<div class='commission-top'>
						<div class='commission-title'>
							预估总收益(元)
						</div>
						<div class='commission-num'>
							{{brokerCountInfo.estimateBrokerCount}}
						</div>
					</div>
				</div>
				<div class='income'>
					<div class='income-bottom'>
						<div class='commission-title'>
							推荐注册总数
						</div>
						<div class='income-num'>{{brokerCountInfo.brokerCountOfYestarday}}</div>
					</div>
					<div class='income-bottom'>
						<div class='commission-title'>
							本日活动关注数
						</div>
						<div class='income-num'>{{brokerCountInfo.brokerCountOfThisMonth}}</div>
					</div>
					<div class='income-bottom'>
						<div class='commission-title'>
							本月活动关注数
						</div>
						<div class='income-num'>{{brokerCountInfo.brokerCountOfToday}}</div>
					</div>
				</div>

			</div>
			<div class='commission-bottom'>
				<div class='withdrawal' @click='toWithdrawal'>
					<div>可提现收益：<span class='withdrawal-num'>{{brokerCountInfo.leaveBroker}}</span></div>
					<div class='withdrawal-tit'>提现</div>
				</div>
				<!-- 	<div class='Office-building' @click='toOfficeBuilding'>
					<div>写字楼数量：</div>
					<div class='office-num'>
						<div>{{officeBuildingsNum}}</div>
						<img src="../../assets/right-to.png" alt="">
					</div>
				</div> -->
			</div>

		</div>

		<div class='info-center'>
			<div class='commission-order-title'>
				<div class='title-left'>
					<img src="../../assets/commission-order.png" alt="">
					<div>
						我的收益订单
					</div>
				</div>
				<div class='title-right' @click="toOrder">
					<div>
						查看明细
					</div>
					<img src="../../assets/right-to.png" alt="">

				</div>
			</div>
			<div class='commission-date'>
				<div :class='sign==1?"showColor":""' @click="collageColor(1)">
					昨日
				</div>
				<div :class='sign==2?"showColor":""' @click="collageColor(2)">近30天</div>
				<div :class='sign==0?"showColor":""' @click="collageColor(0)">
					累计
				</div>
			</div>
			<div class='order-info'>
				<div class='order-left'>
					<div class='order-left-num'>
						{{orderCountInfo.orderNum}}
					</div>
					<div class='order-left-title'>
						订单数
					</div>
				</div>
				<div class='order-right'>
					<div class='order-right-num'>
						{{orderCountInfo.paidMoney}}
					</div>
					<div class='order-right-title'>
						订单金额
					</div>
				</div>
			</div>
		</div>
		<div class='activity-title' v-if='activityList.length>0'>
			最新分享活动
		</div>
		<div class='activityList' v-if='activityList.length>0'>
			<div class='goodsList'  v-for="item in activityList " :key='item.id' >
				<div class='goodsList-left'>
					<img src="../../assets/goods.png" alt="">
					<div>
						<div class='title1'>{{item.name}}</div>
						<div class='title2' v-for='val in item.tBusinessActivityItem'>{{val.name}}</div>
					</div> 
				</div>
				<div class='goodsList-right'  @click="toActivityPage(item)">
					查看详情
				</div>
			</div>

			<!-- <div>

				<img v-for="item in activityList " :key='item.id' :src="item.picAboutUrl" alt="" @click="toActivityPage(item)">
			</div> -->

		</div>

		<Load v-if='isLoad'></Load>
	</div>
</template>

<script>
	import * as axios from '../../untils/ajax.js'
	export default {
		data() {
			return {
				sign: 1,
				isLoad: false,
				brokerCountInfo: {
					totalBroker: 0,
					brokerCountOfThisMonth: 0,
					brokerCountOfToday: 0,
					brokerCountOfYestarday: 0,
					estimateBrokerCount: 0,
					leaveBroker: 0
				},
				orderCountInfo: {
					orderNum: 0,
					paidMoney: 0
				},
				activityList: []
			}
		},
		methods: {
			collageColor(e) {
				this.sign = e
				this.getBrokerOrderCount(e)
			},
			toOrder() {
				this.$router.push('commissionOrder')
			},

			toWithdrawal() {
				this.$router.push('withdrawal')
			},
			toOfficeBuilding() {
				this.$router.push('officeBuildingList')
			},
			//获取收益汇总
			getBrokerCount() {
				this.isLoad = true
				axios.post('/business/t-business-estate/getBrokerCount', {}).then(res => {
					this.getBrokerOrderCount()
					if (res.meta.success) {
						this.brokerCountInfo = res.data
					}
				})
			},
			//收益订单汇总
			getBrokerOrderCount(e) {
				if (e || e == 0) {
					this.isLoad = true
				}
				let params = new FormData()
				params.append('time', this.sign)
				axios.post('/business/t-business-estate/getBrokerOrderCount', params).then(res => {
					this.isLoad = false
					if (res.meta.success) {
						this.orderCountInfo = res.data

					} else {

					}
				})
			},


			//获取周几
			getMyDay(date) {
				var week;
				if (date.getDay() == 0) week = "周日"
				if (date.getDay() == 1) week = "周一"
				if (date.getDay() == 2) week = "周二"
				if (date.getDay() == 3) week = "周三"
				if (date.getDay() == 4) week = "周四"
				if (date.getDay() == 5) week = "周五"
				if (date.getDay() == 6) week = "周六"
				return week;
			},
			getValidActivity() {
				axios.post('/business/t-business-activity/getValidActivity').then(res => {
					if (res.meta.success) {
						let data = res.data.map(item => {
							item.picAboutUrl = this.configUrl + item.picAboutUrl
							return item
						})
						this.activityList = data
					}
				})
			},
			toActivityPage(e) {
				// console.log(item)
				let info = {
					id: e.id

				}
				this.$router.push({
					'name': 'activityPage',
					params: info
				})
			}
		},
		created() {
			this.$nextTick(() => {
				// 禁用右键
				document.oncontextmenu = new Function("event.returnValue=false");
				// 禁用选择
				document.onselectstart = new Function("event.returnValue=false");
			});
			this.getValidActivity()
			this.getBrokerCount()
			// this.getAreaCountByEstateId()

		}
	}
</script>

<style scoped>
	.commission {
		height: 3.2rem;
		width: 6.98rem;
		margin: 0.2rem auto 0 auto;
		background: linear-gradient(to bottom, #f79d3d, #f67124);
		background: -webkit-linear-gradient(to bottom, #f79d3d, #f67124);
		border-top-left-radius: 0.25rem;
		border-top-right-radius: 0.25rem;

	}

	.commission-info {
		display: flex;
		display: -webkit-box;
		display: -webkit-flex;
		justify-content: space-between;
		-webkit-box-pack: justify;
		-webkit-justify-content: space-between;
		padding: 0 0.3rem;
		box-sizing: border-box;
	}

	.commission-top {
		text-align: center;
		margin-top: 0.16rem;
	}

	.commission-title {
		font-size: 0.26rem;
		color: #feeadd;
	}

	.commission-num {
		font-size: 0.52rem;
		color: #fffefe;
		margin-top: 0.1rem;
	}

	.income-num {
		font-size: 0.38rem;
		color: #fffefe;
		margin-top: 0.1rem;
	}

	.income {
		display: flex;
		display: -webkit-box;
		display: -webkit-flex;
		padding: 0 0.2rem;
		box-sizing: border-box;
		margin-top: 0.9rem;
	}


	.income-bottom:nth-child(1),
	.income-bottom:nth-child(3) {

		width: 30%;
		text-align: center;
	}

	.income-bottom:nth-child(2) {
		width: 40%;
		text-align: center;
	}

	.commission-bottom {
		font-size: 0.32rem;
		font-weight: 550;
		width: 6.98rem;
		margin: 0 auto;
		background: #fff;
		border-bottom-left-radius: 0.25rem;
		border-bottom-right-radius: 0.25rem;
	}

	.withdrawal {
		display: flex;
		display: -webkit-box;
		display: -webkit-flex;
		align-items: center;
		-webkit-box-align: center;
		-webkit-align-items: center;
		justify-content: space-between;
		-webkit-box-pack: justify;
		-webkit-justify-content: space-between;
		height: 0.75rem;
		padding: 0 0.25rem;
		box-sizing: border-box;
		margin-bottom: -0.1rem;
	}

	.withdrawal-num {
		color: #fe8000;
	}

	.withdrawal-tit {
		height: 0.4rem;
		width: 1rem;
		background: linear-gradient(to right, #f67024, #f89d3e);
		border-radius: 0.5rem;
		font-size: 0.26rem;
		display: flex;
		display: -webkit-box;
		display: -webkit-flex;
		align-items: center;
		-webkit-box-align: center;
		-webkit-align-items: center;
		justify-content: center;
		-webkit-box-pack: center;
		-webkit-justify-content: center;
		color: #fff;
		font-weight: 400;
	}

	.Office-building {
		display: flex;
		display: -webkit-box;
		display: -webkit-flex;
		align-items: center;
		-webkit-box-align: center;
		-webkit-align-items: center;
		justify-content: space-between;
		-webkit-box-pack: justify;
		-webkit-justify-content: space-between;
		height: 0.75rem;
		padding: 0 0.25rem;
		box-sizing: border-box;

	}

	.office-num {
		display: flex;
		display: -webkit-box;
		display: -webkit-flex;
		align-items: center;
		-webkit-box-align: center;
		-webkit-align-items: center;
		font-size: 0.32rem;
		color: #fe8000;
		height: 100%;

	}

	.office-num img {
		width: 0.12rem;
		height: 0.2rem;
		margin-left: 0.15rem;
	}

	.info-center {
		width: 6.98rem;
		background: #fff;
		margin: 0.2rem auto 0 auto;
		padding-bottom: 0.4rem;
	}

	.commission-order-title {
		display: flex;
		display: -webkit-box;
		display: -webkit-flex;
		align-items: center;
		-webkit-box-align: center;
		-webkit-align-items: center;
		justify-content: space-between;
		-webkit-box-pack: justify;
		-webkit-justify-content: space-between;
		padding: 0 0.25rem;
		box-sizing: border-box;
		height: 0.67rem;
		border-bottom: 1px solid #dfdfdf;
	}

	.commission-order-title .title-left {
		display: flex;
		display: -webkit-box;
		display: -webkit-flex;
		align-items: center;
		-webkit-box-align: center;
		-webkit-align-items: center;
		font-size: 0.3rem;
	}

	.title-left img {
		height: 0.38rem;
		width: 0.32rem;
		margin-right: 0.18rem;
	}

	.title-right {
		display: flex;
		display: -webkit-box;
		display: -webkit-flex;
		align-items: center;
		-webkit-box-align: center;
		-webkit-align-items: center;
		font-size: 0.24rem;
		color: #97979f;
	}

	.title-right img {
		width: 0.12rem;
		height: 0.2rem;
		margin-left: 0.15rem;
	}

	.commission-date {
		height: 0.56rem;
		margin: 0 0.25rem;
		display: flex;
		display: -webkit-box;
		display: -webkit-flex;
		align-items: center;
		-webkit-box-align: center;
		-webkit-align-items: center;
		font-size: 0.3rem;
		margin-top: 0.3rem;
		margin-bottom: 0.4rem;
		border: 0.01rem solid #ec5300;
		border-radius: 0.35rem;
		box-sizing: border-box;
	}

	.commission-date>div {
		flex: 1;
		-webkit-box-flex: 1;
		-webkit-flex: 1;
		height: 100%;
		text-align: center;
		border-radius: 0.35rem;
		line-height: 0.54rem;
	}

	.commission-date>div.showColor {
		background: #ec5300 !important;
		color: #fff !important;
		display: flex;
		display: -webkit-box;
		display: -webkit-flex;
		align-items: center;
		-webkit-box-align: center;
		-webkit-align-items: center;
		justify-content: center;
		-webkit-box-pack: center;
		-webkit-justify-content: center;
	}

	.order-info {
		height: 2.22rem;
		width: 5.78rem;
		background: #f7f7f7;
		display: flex;
		display: -webkit-box;
		display: -webkit-flex;
		align-items: center;
		-webkit-box-align: center;
		-webkit-align-items: center;
		margin: 0 auto;

	}

	.order-info .order-left {
		width: 50%;
		font-size: 0.28rem;

	}

	.order-left .order-left-num {
		width: 100%;
		text-align: center;
	}

	.order-left .order-left-title {
		width: 100%;
		text-align: center;
		color: #8e8e8e;
	}

	.order-info .order-right {
		width: 50%;
		font-size: 0.28rem;

	}

	.order-right .order-right-num {
		width: 100%;
		text-align: center;
		color: #fe8000;
	}

	.order-right .order-right-title {
		width: 100%;
		text-align: center;
		color: #8e8e8e;
	}

	.info-bottom {
		width: 6.98rem;
		background: #fff;
		margin: 0.2rem auto 0 auto;
		margin-bottom: 0.3rem;
		/* padding-bottom: 0.4rem; */
	}

	.turnover-title {
		display: flex;
		display: -webkit-box;
		display: -webkit-flex;
		align-items: center;
		-webkit-box-align: center;
		-webkit-align-items: center;
		justify-content: space-between;
		-webkit-box-pack: justify;
		-webkit-justify-content: space-between;
		padding: 0 0.25rem;
		box-sizing: border-box;
		height: 0.67rem;
		/* border-bottom: 1px solid #dfdfdf; */
	}

	.turnover-title .title-left {
		display: flex;
		display: -webkit-box;
		display: -webkit-flex;
		align-items: center;
		-webkit-box-align: center;
		-webkit-align-items: center;
		font-size: 0.3rem;
	}

	.title-left img {
		height: 0.38rem;
		width: 0.32rem;
		margin-right: 0.18rem;
	}

	.title-right {
		display: flex;
		display: -webkit-box;
		display: -webkit-flex;
		align-items: center;
		-webkit-box-align: center;
		-webkit-align-items: center;
		font-size: 0.24rem;
		color: #97979f;
	}

	.title-right img {
		width: 0.12rem;
		height: 0.2rem;
		margin-left: 0.15rem;
	}

	.turnover-list {
		background: #fff;
	}

	.turnover-info {
		height: 1.85rem;
		display: flex;
		display: -webkit-box;
		display: -webkit-flex;
		align-items: center;
		-webkit-box-align: center;
		-webkit-align-items: center;
		border-top: 1px solid #dfdfdf;
	}

	/* 
	.turnover-info:last-child {
		border: none !important;
	} */

	.turnover-time {
		font-size: 0.28rem;
		margin-left: 0.2rem;
	}

	.turnover-time .turnover-week {
		color: #7f7f89;
		margin-bottom: 0.1rem;
	}

	.turnover-time .turnover-date {
		color: #000;
		font-size: 0.22rem;
		margin-bottom: 0.1rem;
	}

	.turn-category {
		height: 100%;
		font-size: 0.26rem;
		display: flex;
		display: -webkit-box;
		display: -webkit-flex;
		flex-direction: column;
		-webkit-flex-direction: column;
		justify-content: center;
		-webkit-box-pack: center;
		-webkit-justify-content: center;
		margin-left: 0.5rem;
	}

	.caregory-info {
		display: flex;
		display: -webkit-box;
		display: -webkit-flex;
		align-items: center;
		-webkit-box-align: center;
		-webkit-align-items: center;
		margin-bottom: 0.1rem;
		color: #898989;
	}

	.caregory-info .caregory-num {
		margin-left: 1.2rem;
	}

	.caregory-title {
		position: relative;
	}

	.title-tips-green:before {

		content: "";
		position: absolute;
		top: 50%;
		left: -0.4rem;
		width: 0.24rem;
		height: 0.24rem;
		background: #53a960;
		border-radius: 50%;
		transform: translateY(-50%);
		-webkit-transform: translateY(-50%);
	}

	.title-tips-red::before {

		content: "";
		position: absolute;
		top: 50%;
		left: -0.4rem;
		width: 0.24rem;
		height: 0.24rem;
		background: #ec5300;
		border-radius: 50%;
		transform: translateY(-50%);
		-webkit-transform: translateY(-50%);
	}

	.caregory-info .caregory-num.num-color {
		color: #53a960;
	}

	.activity-title {
		font-weight: 550;
		width: 6.98rem;
		height: 0.7rem;
		background: #fff;
		font-size: 0.3rem;
		margin: 0.2rem auto 0 auto;
		line-height: 0.7rem;
		border-bottom: 1px solid #eee;
		padding-left: 0.3rem;
		box-sizing: border-box;
	}

	.activityList {

		width: 100%;
		background: #fff;
		width: 6.98rem;
		/* padding-left: 0.2rem; */
		box-sizing: border-box;
		margin: 0 auto;
		/* display: flex;
		display: -webkit-box;
		display: -webkit-flex;
		align-items: center;
		-webkit-box-align: center;
		-webkit-align-items: center; */
		background: #fff;
		overflow-x: scroll;
		margin-bottom: 0.2rem;
	}



	.activityList img {
		/* display: inline; */
		width: 0.82rem;
		height: 0.82rem;
		margin:0 0.2rem;
		/* height: auto; */
	}

	.activityList .goodsList {
		width: 100%;
		height: 1.6rem;
		display: flex;
		display: -webkit-box;
		display: -webkit-flex;
		align-items: center;
		-webkit-box-align: center;
		-webkit-align-items: center;
		justify-content: space-between;
		-webkit-box-pack: justify;
		-webkit-justify-content: space-between;
		font-size: 0.28rem;
		border-bottom: 1px solid #eee;
	}

	.activityList .goodsList .goodsList-left {
		display: flex;
		display: -webkit-box;
		display: -webkit-flex;
		align-items: center;
		-webkit-box-align: center;
		-webkit-align-items: center;
	}

	.activityList .goodsList .title1 {
		font-size: 0.3rem;
		font-weight: 550;
	}

	.activityList .goodsList .title2 {
		font-size: 0.22rem;
		color: #636267;
		margin-top: 0.04rem;
	}

	.goodsList .goodsList-right {
		width: 1.32rem;
		height: 0.5rem;
		background: linear-gradient(to right, #f67024, #f89c3e);
		font-size: 0.24rem;
		color: #fff;
		text-align: center;
		line-height: 0.5rem;
		border-radius: 0.25rem;
		margin-right: 0.2rem;
	}
</style>
