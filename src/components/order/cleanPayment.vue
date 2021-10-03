<template>
	<div class='container'>
		<!-- 	<div class='head'>
			<div class='head-left'>
				<img src="../../static/left-go.png" mode=""></img>
				<span>返回</span>
			</div>
			<div class='head-center'>
						  订单支付
			</div>

		</div> -->
		<head-Piece>
			<template slot="content">订单支付</template>
		</head-Piece>

		<!-- v-if='showContent' -->
		<div class='content'>
			<div class='order showdaw-color'>
				<div class='odrer-num'>
					<div class='num-tit'>订单编号</div>
					<div class='num'>{{info.orderNo}}</div>
				</div>
				<div class='order-info'>

					<div class='info-img'>
						<img :src="materUrl" mode=""></img>
					</div>
					<div class='info-new'>
						<div class='new-tit'>
							<div v-if='carpetType'>地毯清洁({{info.className}})</div>
							<div v-else>{{info.productName}}</div>
							<!-- 	<div v-if=' type==0'>办公室清洁1元体验100平</div>
							<div v-if='info.buyType==1  && type!=0'>办公室清洁-单次保洁</div>
							<div v-if='info.buyType==2  && type!=0'>办公室清洁-包月</div>
							<div v-if='info.buyType==3  && type!=0'>办公室清洁-包季</div>
							<div v-if='info.buyType==4  && type!=0'>办公室清洁-包年</div> -->
							<div class='money'>￥{{info.price}}</div>
						</div>
						<div class='new-tit' v-if='!carpetType'>
							<div v-if='info.productType!=4'> {{info.className}}({{info.specName}})</div>
							<div v-else>{{info.specName}}</div>
						</div>
						<!-- <div v-if='info.buyType!=1'>
							<div class='order-times'>
							
								<span class='count mr-right'>清洁频率：<span>{{info.dailyFrequency}}</span>，<span>其中深度清洁：{{info.depthFrequency}}</span></span>
							
							</div>
							<div class='start'>
							
								<span class='year'>清洁次数：<span>{{info.dailyNums+info.depthNums}}次</span>，<span>其中深度清洁：{{info.depthNums}}次</span></span>
							</div>
						</div> -->
						<!-- 	<div v-else>
							<div class='order-times'>
							
								<span class='num   mr-right'>{{info.totalNums }}次</span>
							
								<span >({{info.beginTime}}-{{info.endTime}}点)</span>
							</div>
						
						</div> -->
					</div>

				</div>

			</div>
			<div class='price showdaw-color'>
				<div class='goods'>
					<div>商品总金额</div>
					<div class='money'>￥{{info.orderMoney}}</div>
				</div>
				<!-- <div class='discount'>
					<div>优惠总金额</div>
					<div class='money'>-￥{{totalDiscount}}</div>
				</div> -->
			</div>
			<div class='showdaw-color'>
				<!-- <div class='pay'>
					<div>第三方支付</div>
					<div class='money' v-if='info.periodMoney.length!=0'>￥{{info.periodMoney}} ({{info.periodMoney}}*{{info.periodNum}})</div>
				</div> -->
				<div class='pay-des' :class='showWx?"hiddenBtm":""' @click="collage(1)">
					<div class='wx'>
						<img src='../../assets/wx.png'></img>
						<div>微信支付</div>
					</div>
					<div class='radios' :class='flag===true?"signColor":""'>
						<img src='../../assets/dui.png'></img>
					</div>
					<!-- <radio value="r1" :checked="!flag" style='transform: scale(0.8) !important;'  @click="collage"   /> -->

				</div>
				<div class='pay-des' @click="collage(2)" v-if='!showWx'>
					<div class='wx'>
						<img src='../../assets/zhifu.png'></img>
						<div>支付宝支付</div>
					</div>

					<div class='radios' :class='flag===false?"signColor":""'>
						<img src='../../assets/dui.png'></img>
					</div>

				</div>
			</div>
		</div>
		<div class='order-bottom'>
			<div class='actual'>
				<span>实付款：</span>
				<span class='money'>￥{{info.price}}</span>


			</div>
			<div class='immediately' @click="payMent">
				立即支付
			</div>
		</div>
		<div class='info-fail' v-if='failFlag'>
			{{failInfo}}
		</div>
		<Load v-if='isLoade'></Load>
	</div>
</template>

<script>
	import * as axios from '../../untils/ajax.js'
	import wx from 'weixin-js-sdk'
	export default {
		data() {
			return {
				flag: true,
				info: {
					periodMoney: []
				},
				showContent: false,
				payType: 1,
				isLoade: false,
				totalDiscount: 0,
				materUrl: '',
				providerList: [],
				failFlag: true,
				failInfo: '',
				type: '',
				carpetType: undefined,
				showWx: false
			}
		},
		methods: {
			collage(e) {
				if (this.showWx) {
					return
				}
				this.flag = !this.flag
				this.payType = e
			},
			getInfo() {
				this.isLoade = true
				let params = new FormData()
				params.append('orderId', this.id)
				if (!this.carpetType) {
					axios.post('/technology/t-technology-order/getTecOrderDetailByOrderId', params).then(res => {
						if (res.meta.success) {
							console.log(res)
							// let list = res.data
							// let orderTime = list.orderTime.split(' ')
							// console.log(orderTime)
							// list.orderDate = orderTime[0]
							// list.orderTime = orderTime[1]
							// let payTime = list.payTime.split(' ')
							// list.payDate = payTime[0]
							// list.payTime = payTime[1]
							this.info = res.data
							console.log(this.info)
							this.totalDiscount = this.info.allowanceMoney + this.info.couponMoney
							this.materUrl = this.configUrl + this.info.masterPicUrl
							this.showContent = true
							this.isLoade = false
						} else {
							this.isLoade = false
						}


					})
				} else {
					axios.post('/carpet/t-carpet-order/getCarpetOrderDetailByOrderId', params).then(res => {
						if (res.meta.success) {
							console.log(res)
							// let list = res.data
							// let orderTime = list.orderTime.split(' ')
							// console.log(orderTime)
							// list.orderDate = orderTime[0]
							// list.orderTime = orderTime[1]
							// let payTime = list.payTime.split(' ')
							// list.payDate = payTime[0]
							// list.payTime = payTime[1]
							this.info = res.data
							console.log(this.info)
							this.totalDiscount = this.info.allowanceMoney + this.info.couponMoney
							this.materUrl = this.configUrl + this.info.masterPicUrl
							this.showContent = true
							this.isLoade = false
						} else {
							this.isLoade = false
						}


					})
				}

			},
			payMent() {
				let that = this

				if (!this.carpetType) {

					if (this.payType == 1) {
						if (!this.showWx) {
							let params = new FormData()
							params.append('orderId', this.id)
							params.append('payableMoney', this.info.price)
							axios.post('/finance/payment/putPayTechnologyOrderByWx', params).then(res => {
								if (res.meta.success) {


									let orderInfo = JSON.stringify(res.data.payParams)

									plus.payment.request(that.wxChanne, orderInfo, function(result) {
										let id = {
											'id': that.id,
											'type': that.info.buyType
										}
										that.$router.push({
											"name": 'cleanSuccess',
											params: id
										})
									}, function(e) {
										// plus.nativeUI.alert('更多错误信息请参考支付(Payment)规范文档：http://www.html5plus.org/#specification#/specification/Payment.html', null, '支付失败：' + e.code); 
									});
									// uni.requestPayment({
									// 	provider: 'wxpay',
									// 	orderInfo: orderInfo,
									// 	success(res) {
									// 		// 支付成功跳转页面
									// let id={'id':res.data.orderId,'type':that.info.buyType}					 
									//  this.$router.push({"name":'success',params:id})
									// 		// uni.navigateTo({
									// 		// 	url: '/pages/home/success?id='+that.id+'&type='+that.info.buyType
									// 		// });
									// 	},
									// 	fail(err) {
									// 		console.log(err)
									// 		// that.toast.fail(err.errMsg)
									// 		// that.failFlag=true
									// 		// that.failInfo=err.errMsg
									// 		uni.showToast({
									// 			title: '支付失败',
									// 			img: '/static/imgs/tabIcon/fail.png'
									// 		});
									// 	}
									// });
								} else {
									this.$toast({
										message: res.meta.msg
									})
								}
							})
						} else {
                           let params = new FormData()
                           params.append('orderId', this.id)
                           params.append('payableMoney', this.info.price)
                           axios.post('/finance/payment/putPayTechnologyOrderByWxJs', params).then(res => {
                           	if (res.meta.success) {
                           
                           
                           		let orderInfo = res.data.payParams
                           		wx.config({
                           			beta: true,
                           			debug: false, // 开启调试模式,
                           			appId: orderInfo.appId, // 必填，企业号的唯一标识，此处填写企业号corpid
                           			timestamp: orderInfo.timeStamp, // 必填，生成签名的时间戳
                           			nonceStr: orderInfo.nonceStr, // 必填，生成签名的随机串
                           			signature: orderInfo.paySign, // 必填，签名，见附录1
                           			jsApiList: ['getBrandWCPayRequest']
                           		});
                           		
                           		wx.invoke("getBrandWCPayRequest", {
                           				appId: orderInfo.appId, //公众号名称，由商户传入
                           				timeStamp: orderInfo.timeStamp, //时间戳，自1970年以来的秒数
                           				nonceStr: orderInfo.nonceStr, //随机串
                           				package: orderInfo.package,
                           				signType: orderInfo.signType, //微信签名方式：
                           				paySign: orderInfo.paySign //微信签名sign
                           			},
                           			function(res) {
                           				if (res.err_msg == "get_brand_wcpay_request:ok") {
                           					let id = {
                           						'id': that.id,
                           						'type': that.info.buyType
                           					}
                           					that.$router.push({
                           						"name": 'cleanSuccess',
                           						params: id
                           					})
                           				} else if (res.err_msg == "get_brand_wcpay_request:cancel") {
                           					alert('支付失败！');
                           				} else if (res.err_msg == "get_brand_wcpay_request:fail") {
                           					alert('调起微信支付失败');
                           				}
                           			}
                           		);
                           
                           	
                           	} else {
                           		this.$toast({
                           			message: res.meta.msg
                           		})
                           	}
                           })
						}
					}

					if (this.payType == 2) {


						let params = new FormData()
						params.append('orderId', this.id)
						params.append('payableMoney', this.info.price)
						axios.post('/finance/payment/putPayTechnologyOrderByAli', params).then(res => {
							if (res.meta.success) {

							

								let orderInfo = res.data.payParams
								// alert(orderInfo)
								plus.payment.request(that.aliChannel, orderInfo, function(result) {
									let id = {
										'id': that.id,
										'type': that.info.buyType
									}
									that.$router.push({
										"name": 'cleanSuccess',
										params: id
									})
									// plus.nativeUI.alert('支付成功!', function() { 

									// }, '充值');                      
								}, function(e) {
									// plus.nativeUI.alert('更多错误信息请参考支付(Payment)规范文档：http://www.html5plus.org/#specification#/specification/Payment.html', null, '支付失败：' + e.code); 
								});
								// uni.requestPayment({
								// 	provider: 'wxpay',
								// 	orderInfo: orderInfo,
								// 	success(res) {
								// 		// 支付成功跳转页面
								// let id={'id':res.data.orderId,'type':that.info.buyType}					 
								//  this.$router.push({"name":'success',params:id})
								// 		// uni.navigateTo({
								// 		// 	url: '/pages/home/success?id='+that.id+'&type='+that.info.buyType
								// 		// });
								// 	},
								// 	fail(err) {
								// 		console.log(err)
								// 		// that.toast.fail(err.errMsg)
								// 		// that.failFlag=true
								// 		// that.failInfo=err.errMsg
								// 		uni.showToast({
								// 			title: '支付失败',
								// 			img: '/static/imgs/tabIcon/fail.png'
								// 		});
								// 	}
								// });
							} else {
								this.$toast({
									message: res.meta.msg
								})
							}
						})


					}
				} else {

					if (this.payType == 1) {
						if (!this.showWx) {
							//console.log(orderIds, addressId, couponIds, discount, remark, paymentType, sendPrice);

							let params = new FormData()
							params.append('orderId', this.id)
							params.append('payableMoney', this.info.price)
							axios.post('/finance/payment/putPayCarpetOrderByWx', params).then(res => {
								if (res.meta.success) {

									let orderInfo = JSON.stringify(res.data.payParams)

									plus.payment.request(that.wxChanne, orderInfo, function(result) {

										let id = {
											'id': that.id,
											'carpetType': that.carpetType
										}
										that.$router.push({
											"name": 'cleanSuccess',
											params: id
										})
									}, function(e) {
										// plus.nativeUI.alert('更多错误信息请参考支付(Payment)规范文档：http://www.html5plus.org/#specification#/specification/Payment.html', null, '支付失败：' + e.code); 
									});
									// uni.requestPayment({
									// 	provider: 'wxpay',
									// 	orderInfo: orderInfo,
									// 	success(res) {
									// 		// 支付成功跳转页面
									// let id={'id':res.data.orderId,'type':that.info.buyType}					 
									//  this.$router.push({"name":'success',params:id})
									// 		// uni.navigateTo({
									// 		// 	url: '/pages/home/success?id='+that.id+'&type='+that.info.buyType
									// 		// });
									// 	},
									// 	fail(err) {
									// 		console.log(err)
									// 		// that.toast.fail(err.errMsg)
									// 		// that.failFlag=true
									// 		// that.failInfo=err.errMsg
									// 		uni.showToast({
									// 			title: '支付失败',
									// 			img: '/static/imgs/tabIcon/fail.png'
									// 		});
									// 	}
									// });
								} else {
									this.$toast({
										message: res.meta.msg
									})
								}
							})
						} else {

							let params = new FormData()
							params.append('orderId', this.id)
							params.append('payableMoney', this.info.price)
							axios.post('/finance/payment/putPayCarpetOrderByWxJs', params).then(res => {
								if (res.meta.success) {

									let orderInfo = res.data.payParams
									wx.config({
										beta: true,
										debug: false, // 开启调试模式,
										appId: orderInfo.appId, // 必填，企业号的唯一标识，此处填写企业号corpid
										timestamp: orderInfo.timeStamp, // 必填，生成签名的时间戳
										nonceStr: orderInfo.nonceStr, // 必填，生成签名的随机串
										signature: orderInfo.paySign, // 必填，签名，见附录1
										jsApiList: ['getBrandWCPayRequest']
									});

									wx.invoke("getBrandWCPayRequest", {
											appId: orderInfo.appId, //公众号名称，由商户传入
											timeStamp: orderInfo.timeStamp, //时间戳，自1970年以来的秒数
											nonceStr: orderInfo.nonceStr, //随机串
											package: orderInfo.package,
											signType: orderInfo.signType, //微信签名方式：
											paySign: orderInfo.paySign //微信签名sign
										},
										function(res) {
											if (res.err_msg == "get_brand_wcpay_request:ok") {
												let id = {
													'id': that.id,
													'carpetType': that.carpetType
												}
												that.$router.push({
													"name": 'cleanSuccess',
													params: id
												})
											} else if (res.err_msg == "get_brand_wcpay_request:cancel") {
												alert('支付失败！');
											} else if (res.err_msg == "get_brand_wcpay_request:fail") {
												alert('调起微信支付失败');
											}
										}
									);



								} else {
									this.$toast({
										message: res.meta.msg
									})
								}
							})
						}
					}

					if (this.payType == 2) {


						let params = new FormData()
						params.append('orderId', this.id)
						params.append('payableMoney', this.info.price)
						axios.post('/finance/payment/putPayCarpetOrderByAli', params).then(res => {
							if (res.meta.success) {

								// let info = {
								// "timestamp": "1579654847",
								// "package": "Sign=WXPay",
								// "appid": "wx2fe518017551caaa",
								// "sign": "5CD0C2AB008D49A1D62FFA78E2418849",
								// "partnerid": "1546181851",
								// "prepayid": "wx220900445183403a1bfd5b0f1723750600",
								// "noncestr": "1579654847241"

								// }

								// console.log(res.data.payParams)

								let orderInfo = res.data.payParams
								// alert(orderInfo)
								plus.payment.request(that.aliChannel, orderInfo, function(result) {
									let id = {
										'id': that.id,
										'carpetType': that.carpetType
									}
									that.$router.push({
										"name": 'cleanSuccess',
										params: id
									})
									// plus.nativeUI.alert('支付成功!', function() { 

									// }, '充值');                      
								}, function(e) {
									// plus.nativeUI.alert('更多错误信息请参考支付(Payment)规范文档：http://www.html5plus.org/#specification#/specification/Payment.html', null, '支付失败：' + e.code); 
								});
								// uni.requestPayment({
								// 	provider: 'wxpay',
								// 	orderInfo: orderInfo,
								// 	success(res) {
								// 		// 支付成功跳转页面
								// let id={'id':res.data.orderId,'type':that.info.buyType}					 
								//  this.$router.push({"name":'success',params:id})
								// 		// uni.navigateTo({
								// 		// 	url: '/pages/home/success?id='+that.id+'&type='+that.info.buyType
								// 		// });
								// 	},
								// 	fail(err) {
								// 		console.log(err)
								// 		// that.toast.fail(err.errMsg)
								// 		// that.failFlag=true
								// 		// that.failInfo=err.errMsg
								// 		uni.showToast({
								// 			title: '支付失败',
								// 			img: '/static/imgs/tabIcon/fail.png'
								// 		});
								// 	}
								// });
							} else {
								this.$toast({
									message: res.meta.msg
								})
							}
						})


					}
				}

			}
		},
		created() {
			// 判断微信浏览器
			if (window.localStorage.getItem('wxBrowser')) {
				this.showWx = true
			}
			this.id = this.$route.params.id
			this.type = this.$route.params.type
			this.carpetType = this.$route.params.carpetType
			this.getInfo()
			let that = this
			if(!this.showWx){
				that.wxChanne = null
				that.aliChannel = null
				plus.payment.getChannels(function(channels) {
					for (var i in channels) {
						if (channels[i].id == "wxpay") {
							that.wxChanne = channels[i];
						} else if (channels[i].id == 'alipay') {
							that.aliChannel = channels[i];
						}
					}
				}, function(e) {
					alert("获取支付通道失败：" + e.message);
				});
			}
			

		}
	}
</script>

<style>
	.pay-des .wx uni-checkbox .uni-checkbox-input.uni-checkbox-input-checked {
		background: #3D7EFF !important;
		border-color: #3D7EFF !important;
	}
</style>
<style scoped>
	.container{
		height: 100vh;
		overflow-x: hidden;
	}
	.head {
		padding-top: 0.4rem;
		height: 0.88rem;
		width: 100%;
		background: #36a8fa;
		text-align: center;
		position: relative;
		box-sizing: content-box;
		color: #fff;
		font-size: 0.33rem;
		z-index: 20000;
	}

	.head-left {
		height: 100%;
		line-height: 0.88rem;
		float: left;
		width: 30%;
		display: flex;
	}

	.head-left img {
		display: inline-block;
		width: 0.18rem;
		height: 0.32rem;
		position: absolute;
		margin-left: 0.28rem;
		top: 0.685rem;
	}

	.head-left span {
		margin-left: 0.6rem;

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

	.content {
		padding: 0 0.28rem;
	}

	.order {
		/* margin-top: 0.30rem; */
		background: #fff;
		padding: 0.20rem 0;
	}

	.order .odrer-num {
		font-size: 0.32rem;
		display: flex;
		display: -webkit-box;
		display: -webkit-flex;
		align-items: center;
		-webkit-box-align: center;
		-webkit-align-items: center;
		padding: 0 0.16rem;
		padding-bottom: 0.20rem;
		box-sizing: content-box;
		border-bottom: 1px solid #eaeaec;
	}

	.order .odrer-num .num {
		font-size: 0.28rem;
		color: #97979f;
		margin-left: 0.20rem;

	}

	.order-info {
		padding: 0 0.16rem;
		margin-top: 0.20rem;
		display: flex;
		display: -webkit-box;
		display: -webkit-flex;
		align-items: center;
		-webkit-box-align: center;
		-webkit-align-items: center;
	}

	.order-info .info-img img {
		display: block;
		width: 1.30rem;
		height: 1.30rem;
		border: 1px solid #eaeaec;
		border-radius: 0.10rem;
		margin-right: 0.20rem;
	}

	.info-new .new-tit {
		display: flex;
		display: -webkit-box;
		display: -webkit-flex;
		justify-content: space-between;
		-webkit-box-pack: justify;
		-webkit-justify-content: space-between;
		align-items: center;
		-webkit-box-align: center;
		-webkit-align-items: center;
		width: 5.1rem;
		font-size: 0.28rem;
		margin-bottom: 0.16rem;
	}

	.info-new .money {
		color: #e01212;
	}

	.info-new .order-times {
		width: 5rem;
		margin-bottom: 0.10rem;
		color: #b6b6b6;
		font-size: 0.24rem;
	}

	.mr-right {
		margin-right: 0.08rem;
	}

	.info-new .start {
		color: #b6b6b6;
		font-size: 0.24rem;
	}

	.info-new .start .year {
		margin-right: 0.30rem;
	}

	.price {
		margin-top: 0.20rem;
		margin-bottom: 0.2rem;
		padding: 0.28rem 0.16rem 0.28rem 0.16rem;
		/* height: 148upx; */
		box-sizing: border-box;
		background: #fff;
		/* border-bottom: 1px  solid #eaeaec; */
	}

	.price .goods {
		display: flex;
		display: -webkit-box;
		display: -webkit-flex;
		justify-content: space-between;
		-webkit-box-pack: justify;
		-webkit-justify-content: space-between;
		align-items: center;
		-webkit-box-align: center;
		-webkit-align-items: center;
		font-size: 0.28rem;
		/* margin-bottom: 0.40rem; */
	}

	.money {
		color: #e01212;
	}

	.discount {
		display: flex;
		display: -webkit-box;
		display: -webkit-flex;
		justify-content: space-between;
		-webkit-box-pack: justify;
		-webkit-justify-content: space-between;
		align-items: center;
		-webkit-box-align: center;
		-webkit-align-items: center;
		font-size: 0.28rem;

	}

	.pay {
		height: 0.90rem;
		padding: 0 0.16rem;
		display: flex;
		display: -webkit-box;
		display: -webkit-flex;
		justify-content: space-between;
		-webkit-box-pack: justify;
		-webkit-justify-content: space-between;
		align-items: center;
		-webkit-box-align: center;
		-webkit-align-items: center;
		background: #fff;
		border-bottom: 1px solid #eaeaec;
		margin-top: 0.20rem;
		color: #97979f;
		font-size: 0.3rem;
	}

	.pay-des {
		background: #fff;
		display: flex;
		display: -webkit-box;
		display: -webkit-flex;
		justify-content: space-between;
		-webkit-box-pack: justify;
		-webkit-justify-content: space-between;
		align-items: center;
		-webkit-box-align: center;
		-webkit-align-items: center;
		padding: 0 0.16rem;
		border-bottom: 1px solid #eaeaec;
		line-height: 0.90rem;
	}

	.pay-des.hiddenBtm {
		border-bottom: none;
	}

	.pay-des:nth-child(3) {
		border-bottom: none;
	}

	.pay-des .wx {
		display: flex;
		display: -webkit-box;
		display: -webkit-flex;
		height: 0.90rem;
		line-height: 0.90rem;
		font-size: 0.28rem;
	}

	.pay-des .wx img {
		display: block;
		height: 0.42rem;
		width: 0.45rem;
		transform: translateY(0.25rem);
		-webkit-transform: translateY(0.25rem);
		margin-right: 0.24rem;
	}

	.order-bottom {
		display: flex;
		display: -webkit-box;
		display: -webkit-flex;
		position: fixed;
		bottom: 0;
		background: #fff;
		width: 7.50rem;
	}

	.order-bottom .actual {
		height: 1rem;
		width: 4.5rem;
		text-align: center;
		line-height: 1rem;
		font-size: 0.28rem;
		color: #131315;
	}

	.order-bottom .immediately {
		height: 1.01rem;
		width: 2.99rem;
		background: #ff3a31;
		text-align: center;
		line-height: 1rem;
		color: #fff;
		font-size: 0.36rem;
	}

	.pay-des .radios {
		width: 0.29rem;
		height: 0.29rem;
		border-radius: 50%;
		border: 1px solid #ddd;
		display: flex;
		display: -webkit-box;
		display: -webkit-flex;
		justify-content: center;
		-webkit-box-pack: center;
		-webkit-justify-content: center;
		align-items: center;
		-webkit-box-align: center;
		-webkit-align-items: center;
	}

	.radios.signColor {
		background: #0396ff;
		border: none;
	}

	.radios img {
		width: 0.2rem;
		height: 0.2rem;
	}

	.info-fail {
		position: fixed;
		width: 2rem;
		background: #0066CC;
		color: #000000;
	}
</style>
