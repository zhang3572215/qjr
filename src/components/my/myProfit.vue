<template>
	<div>
		<head-Piece>
			<template slot="content">我的收益</template>
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
							昨日收入收益
						</div>
						<div class='income-num'>{{brokerCountInfo.brokerCountOfYestarday}}</div>
					</div>
					<div class='income-bottom'>
						<div class='commission-title'>
							本月收入收益
						</div>
						<div class='income-num'>{{brokerCountInfo.brokerCountOfThisMonth}}</div>
					</div>
					<div class='income-bottom'>
						<div class='commission-title'>
							今日收入收益
						</div>
						<div class='income-num'>{{brokerCountInfo.brokerCountOfToday}}</div>
					</div>
				</div>

			</div>
			<div class='commission-bottom' >
				<div class='withdrawal' @click='toWithdrawal'>
					<div>可提现收益：<span class='withdrawal-num'>{{brokerCountInfo.leaveBroker}}</span></div>
					<div class='withdrawal-tit'>提现</div>
				</div>
				<div class='Office-building' @click='toOfficeBuilding'>
					<div>写字楼数量：</div>
					<div class='office-num'>
						<div>{{officeBuildingsNum}}</div>
						<img src="../../assets/right-to.png" alt="">
					</div>
				</div>
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

		<div class='info-bottom'>
			<div class='turnover-title'>
				<div class='title-left'>
					<img src="../../assets/turnover.png" alt="">
					<div>
						收益流水
					</div>
				</div>
				<div class='title-right' @click="toFlow ">
					<div>
						查看更多
					</div>
					<img src="../../assets/right-to.png" alt="">

				</div>
			</div>
			<div class='turnover-list'  v-for="(item,index) in brokerList"  :key='index'>
				<div class='turnover-info'>
					<div class='turnover-time'>
						<div class='turnover-week'>
						   {{item.week}}
						</div>
						<div class='turnover-date'>
							{{item.date}}
						</div>
						<div class='turnover-date'>
							{{item.time}}
						</div>
					</div>
					<div class='turn-category'>
						<div class='caregory-info'>
							<div class='caregory-title title-tips-green'  v-if='item.type==2'>
								支出
							</div>
							<div class='caregory-title title-tips-red' v-else>
								收入
							</div>
							<div class='caregory-num num-color'>
								{{item.brokerMoeny}}
							</div>
						</div>
						<div class='caregory-info'>
							<div lass='caregory-title'>
								余额
							</div>
							<div class='caregory-num'>
								{{item.afterBrokerMoeny }}
							</div>
						</div>
						<div class='caregory-info'>
							<div lass='caregory-title'>
								摘要
							</div>
							<div class='caregory-num'  v-if='item.type==2'>
								提现
							</div>
							<div class='caregory-num' v-else>
								收益收入
							</div>
						</div>
					</div>
				</div>

			</div>
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
				isLoad:false,
				brokerCountInfo:{totalBroker:0,brokerCountOfThisMonth:0,brokerCountOfToday:0,brokerCountOfYestarday:0,estimateBrokerCount:0,leaveBroker:0},
				orderCountInfo:{orderNum:0,paidMoney:0},
				officeBuildingsNum:0,
				brokerList:[]
			}
		},
		methods: {
			collageColor(e) {
				this.sign = e
				this.getBrokerOrderCount(e)
			},
			toOrder(){
				this.$router.push('commissionOrder')
			},
			toFlow(){
				this.$router.push('commissionFlow')
			},
			toWithdrawal(){
				this.$router.push('withdrawal')
			},
			toOfficeBuilding(){
				this.$router.push('officeBuildingList')
			},
			//获取收益汇总
			getBrokerCount(){
				this.isLoad=true
				axios.post('/business/t-business-estate/getBrokerCount',{}).then(res =>{
					this.getBrokerOrderCount()
					  if(res.meta.success){
						  this.brokerCountInfo=res.data
					  }
				})
			},
			//收益订单汇总
			getBrokerOrderCount(e){
				if(e ||e==0){
					console.log(999)
						this.isLoad=true
				}
				let params=new FormData()
				params.append('time',this.sign)
				axios.post('/business/t-business-estate/getBrokerOrderCount',params).then(res =>{
					this.isLoad=false
					  if(res.meta.success){
						  this.orderCountInfo=res.data
						  
					  }else{
						  
					  }
				})
			},
			// 物业写字楼数量
			getAreaCountByEstateId(){
				axios.post('/business/t-business-areas/getAreaCountByEstateId').then(res => {
					  if(res.meta.success){
						  this.officeBuildingsNum=res.data
					  }
				})
			},
			getEstateBrokerList(){
				let params=new FormData()
				params.append('pageSize',3)
				params.append('pageNo',1)
				params.append('time',0)
				axios.post('/business/t-business-estate-broker/getEstateBrokerList',params).then(res => {
					  if(res.meta.success){
						    this.brokerList=res.data.records.map(val => {
								let dates = val.createTime.split(" ")
								val['week'] = this.getMyDay(new Date(dates[0]))
								val['date'] = dates[0]
								val['time'] = dates[1]
								    // val['week']=this.getMyDay(new Date(val.brokerDate))
									return val
							})
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
			
			
		},
		created() {
		this.$nextTick(() => {
		        // 禁用右键
		        document.oncontextmenu = new Function("event.returnValue=false");
		        // 禁用选择
		        document.onselectstart = new Function("event.returnValue=false");
		      });
			this.getEstateBrokerList()
			 this.getBrokerCount()
			 this.getAreaCountByEstateId()
		
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

		width: 25%;
		text-align: center;
	}

	.income-bottom:nth-child(2) {
		width: 50%;
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
		justify-content:center;
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
</style>
