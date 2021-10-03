<template>
	<div>
		<head-Piece>
			<template slot="content">常见问题</template>
		</head-Piece>
		
		<div>
			<div class='des-head'>
				<div class='first-des' :class='flag==1?"showColor":""' @click="collage(1)">
					订单问题
				</div>
				<div class='second-des' :class='flag==2?"showColor":""' @click="collage(2)">
					分期支付
				</div>
				<div class='second-des' :class='flag==3?"showColor":""' @click="collage(3)">
					发票
				</div>
				<div class='three-des' :class='flag==4?"showColor":""' @click="collage(4)">
					服务问题
				</div>
			</div>
			<div class='content-1' v-if='flag==1'>
				<div class='title'>
					一、订单取消
				</div>
				<div class='title-info'>
					如果是未支付订单，您可以随时在app上取消，如果是已经在服务的订单，请您先联系客服。
				</div>
				<div class='title'>
					二、订单更改
				</div>
				<div class='title-info'>
					原则上客户下单后，不允许随意更改订单内容，如因不可抗因素需要取消订单，请您先联系客服。
				</div>
				<div class='title'>
					三、付款方式
				</div>
				<div class='title-info'>
					清洁人支持直接在app上进行付款，也支持线下对公账户付款，对公账户付款，请您先联系客服。
				</div>
			</div>
			<div class='content-1' v-if='flag==2'>
				<div class='title'>
					一、分期手续费怎么算？
				</div>
				<div class='title-info'>
					清洁人服务产品支持分期支付，按照1个月为周期，分期不会收取您的手续费。
				</div>
				<div class='title'>
					二、申请分期后可以取消吗？
				</div>
				<div class='title-info'>
					申请分期支付后，请按期进行支付，因不可抗因素需要取消订单，请您先联系客服。
				</div>
				<div class='title'>
					三、申请分期后什么时候还款？
				</div>
				<div class='title-info'>
					分期支付，每个月按期还款，也可以提前还款。
				</div>
			</div>
			<div class='content-2' v-if='flag==3'>
				<div class='title'>
					一、开票通知
				</div>
				<div class='title-info'>
					电子发票支持报销入账，其法律效力、基本用途及使用规定与增值税普通纸质发票一致，为响应国家推行电子发票的号召并确保开具时效，建议您选择申请电子发票。
				</div>
				<div class='title'>
					二、已正确填写电子邮箱，为何无法获取电子发票？
				</div>
				<div class='title-info'>
					请先确认邮箱是否设置屏蔽，是否有被存放放到垃圾信箱，若核实完仍未收到。请及时联系清洁人客服为您处理。
				</div>
				<div class='title'>
					三、收到的发票为何无法在税务局查到？
				</div>
				<div class='title-info'>
					发票数据从企业上传到税务端可能出现短暂的延迟，请稍后再尝试查询。
				</div>
				<div class='title'>
					四、发票抬头等信息填写错误，能否修改？
				</div>
				<div class='title-info'>
					属于常规性错误的发票，可以作废重开；如发票金额与实际支付金额不符，税号错误或公司名称与实际营业执照登记的名称不符等。
				</div>
				<div class='title'>
					五、发票丢失，如何处理？
				</div>
				<div class='title-info'>
					发票为消费交易凭证，请务必妥善保管，如出现纸质发票丢失的情况，请及时联系客服。
				</div>
			</div>
			<div class='content-1' v-if='flag==4'>
				<div class='title'>
					一、投诉
				</div>
				<div class='title-info'>
					您可以在app上对清洁人的服务进行投诉，清洁人工作人员将在2小时内处理。
				</div>
				<div class='title'>
					二、重新服务
				</div>
				<div class='title-info'>
					如果是因为清洁人服务不到位，或者没按照服务标准，清洁人将重新为您安排服务
				</div>
				<div class='title'>
					三、物件损坏、丢失
				</div>
				<div class='title-info'>
					如果因为清洁人单方原因，造成物件丢失或者损坏，清洁人将按照法律规定进行操作
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				flag: 1
			}
		},
		methods: {
			collage(e) {
				this.flag = e
			}
		}
	}
</script>

<style scoped>
	.des-head {
		height: 0.80rem;
		width: 100%;
		display: flex;
		display: -webkit-box;
		display: -webkit-flex;
		align-items: center;
		 -webkit-box-align: center;
		 -webkit-align-items: center;
		background: #fff;
	}

	.des-head>div {
		height: 0.80rem;
		font-size: 0.30rem;
	}

	.des-head .first-des {
		height: 100%;
		margin-left: 0.28rem;
		line-height: 0.80rem;
	}

	.second-des {
		width: 1.40rem;
		height: 100%;
		line-height: 0.80rem;
		text-align: center;
		margin-left: 0.50rem;
	}
.second-des:nth-child(3){
	width: 0.8rem;
}
	.des-head .three-des {
	/* 	height: 100%;
		line-height: 0.80rem;
		width: 1.20rem;
		text-align: center;
		margin: 0.20rem; */
		width: 1.40rem;
		height: 100%;
		line-height: 0.80rem;
		text-align: center;
		margin-left: 0.50rem;
	}

	.showColor {
		color: #0396ff;
		box-sizing: border-box;
		border-bottom: 1px solid #0396ff;
	}

	.content-1 {
		width: 6.94rem;
		margin: 0.37rem auto 0 auto;
	}

	.content-2 {
		width: 6.94rem;
		margin: 0.37rem auto 0 auto;
	}

	.title {
		font-size: 0.28rem;
		font-weight: 550;
		margin-bottom: 0.10rem;
	}

	.title-info {
		font-size: 0.26rem;
		line-height: 0.38rem;
		margin-bottom: 0.20rem;
	}
</style>
