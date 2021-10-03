<template>
	<div>
		<div class='head'>
			<div class='head-left' @click="toBack">
				<img src="../../assets/left-black.png" ></img>
				<span>返回</span>
			</div>
			<div class='head-center'>

			</div>
			<!-- 	<div class='head-right'>
				 <image src='../../static/buyMonth.png'></image>
			</div> -->
		</div>
		<div class='conntent-img'>
			<img src='../../assets/pay-success.png'></img>
		</div>
		<div class='content-info'>
			<div class='pay-suc'>
				领取成功
			</div>
			<div class="thank">
				感谢您的参与!
			</div>
		</div>
		<div class='content-btn'>
			<div class='look' @click="toBackIndex">返回首页</div>
			<div class='continue'  @click="toDetail">查看订单</div>
		</div>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				id:null,
				type:null
			}
		},
		methods:{
			toBack(){
				this.$router.push('index')
			},
			toDetail(){
				// if (this.type == 1) {
				// 	uni.navigateTo({
				// 		url: "/pages/order/orderFrequency?orderId=" + this.id
				// 	})
				// 	return
				// }
				// uni.navigateTo({
				// 	url: "/pages/order/orderDetails?orderId=" + this.id
				// })
			},

			toBackIndex(){
				// uni.navigateTo({
				// 	url:'/pages/index/index'
				// })
				this.$router.push('index')
			}
		},
		created(){
			this.id=this.$route.params.orderId
			
		}
	}
</script>

<style scoped>
	.head {
		padding-top:0.4rem;
		height: 0.88rem;
		width: 100%;
		/* background: #36a8fa; */
		text-align: center;
		position: relative;
		box-sizing: content-box;
		color: #000;
		font-size: 0.33rem;
		z-index: 20000;
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
		width: 40%;
		line-height: 0.88rem;
		text-align: center;
		float: left;
	}

	.head-right {
		/* float: left; */
		height: 0.88rem;
		width: 30%;

	}

	.head-right img {
		display: inline-block;
		width: 0.32rem;
		height: 0.31rem;
		position: absolute;
		right: 0.28rem;
		top: 0.685rem;
	}

	.conntent-img img {
		display: block;
		height: 1.80rem;
		width: 1.80rem;
		margin: 0.90rem auto 0.35rem auto;
	}

	.content-info {
		margin: 0 auto;
		text-align: center;
	}

	.pay-suc {
		font-size: 0.32rem;
		margin-bottom: 0.19rem;
	}

	.thank {
		font-size: 0.48rem;
	}

	.content-btn {
		margin-top: 0.88rem;
		width: 100%;
		display: flex;
		display: -webkit-box;
		display: -webkit-flex;
		justify-content: center;
		-webkit-box-pack: center;
		-webkit-justify-content: center;
	}

	.content-btn .continue {
		width: 3.26rem;
		height: 0.88rem;
		line-height: 0.88rem;
		background: #FF5F1E;
		font-size: 0.28rem;
		color: #fff;
		text-align: center;
		margin-left: 0.2rem;
	}

	.content-btn .look {
		width: 3.26rem;
		height: 0.88rem;
		line-height: 0.88rem;
		background: #fff;
		font-size: 0.28rem;
		color: #666;
		border: 1px solid #666;
		text-align: center;
		box-sizing: border-box;
		margin-right: 0.2rem;
	}
</style>
