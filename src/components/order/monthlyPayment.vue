<template>
    <div class='container'>
        <head-Piece>
            <template slot="content">订单支付</template>
        </head-Piece>
        <div>
            <div class='payMonth'>
                应付款月份：<span>{{monthly}}</span>
            </div>
            <div class='showdaw-color'>
                <div class='pay'>
                    <div>第三方支付</div>
                    <!-- 		<div class='money' v-if='info.periodMoney.length!=0'>￥{{info.periodMoney}} ({{info.periodMoney}}*{{info.periodNum}})</div> -->
                </div>
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
                <span class='money'>￥{{payableMoney}}</span>
            </div>
            <div class='immediately' @click="payMent">
                立即支付
            </div>
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
                showWx: false,
                isLoade: false,
                monthly: '',
                payableMoney: '',
                payType: 1,
                wxChanne: '',
                aliChannel: '',
                orderId: '',
                periodNo: ''
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
            payMent() {
                let that = this

                if (!this.showWx) {
                    if (this.payType == 1) {
                        let params = new FormData()
                        params.append('monthStatementId', this.id)
                        params.append('periodMoney', this.payableMoney)
                        params.append('periodNo', this.periodNo)
                        axios.post('/finance/payment/createMonthPeriodUnifiedOrderWx', params).then(res => {
                            if (res.meta.success) {

                                let orderInfo = JSON.stringify(res.data.payParams)

                                plus.payment.request(that.wxChanne, orderInfo, function(result) {
                                    let id = {
                                        'id': res.data.orderId
                                    }
                                    that.$router.push({
                                        "name": 'success',
                                        params: id
                                    })
                                }, function(e) {
                                    // plus.nativeUI.alert('更多错误信息请参考支付(Payment)规范文档：http://www.html5plus.org/#specification#/specification/Payment.html', null, '支付失败：' + e.code); 
                                });
                            } else {
                                this.$toast({
                                    message: `您第${res.meta.msg}期未支付！`,
                                    duration: 1000
                                })
                            }
                        })
                    }

                    if (this.payType == 2) {


                        let params = new FormData()
                        params.append('monthStatementId', this.id)
                        params.append('periodMoney', this.payableMoney)
                        params.append('periodNo', this.periodNo)
                        axios.post('/finance/payment/createMonthPeriodUnifiedOrderAli', params).then(res => {
                            if (res.meta.success) {

                                let orderInfo = res.data.payParams
                                plus.payment.request(that.aliChannel, orderInfo, function(result) {
                                    let id = {
                                        'id': res.data.orderId
                                    }
                                    that.$router.push({
                                        "name": 'success',
                                        params: id
                                    })
                                    // plus.nativeUI.alert('支付成功!', function() { 

                                    // }, '充值');                      
                                }, function(e) {
                                    // plus.nativeUI.alert('更多错误信息请参考支付(Payment)规范文档：http://www.html5plus.org/#specification#/specification/Payment.html', null, '支付失败：' + e.code); 
                                });

                            } else {
                                this.$toast({
                                    message: `您第${res.meta.msg}期未支付！`,
                                    duration: 1000
                                })
                            }
                        })


                    }
                }else{
                    if (this.payType == 1) {
                    	let params = new FormData()
                    	params.append('monthStatementId', this.id)
                    	params.append('periodMoney', this.payableMoney)
                    	params.append('periodNo', this.periodNo)
                    	axios.post('/finance/payment/createMonthPeriodUnifiedOrderWxJs', params).then(res => {
                    		if (res.meta.success) {
                  
                    			// let orderInfo = JSON.stringify(res.data.payParams)
                    			let orderInfo = res.data.payParams
                    
                    			// function onBridgeReady() {
                    			// 	WeixinJSBridge.invoke("getBrandWCPayRequest", {
                    			// 			appId: orderInfo.appId, //公众号名称，由商户传入
                    			// 			timeStamp: orderInfo.timeStamp, //时间戳，自1970年以来的秒数
                    			// 			nonceStr: orderInfo.nonceStr, //随机串
                    			// 			package: orderInfo.package,
                    			// 			signType: orderInfo.signType, //微信签名方式：
                    			// 			paySign: orderInfo.paySign //微信签名sign
                    			// 		},
                    			// 		function(res) {
                    			// 			if (res.err_msg == "get_brand_wcpay_request:ok") {
                    			// 				alert('恭喜您，支付成功！')
                    			// 			} else if (res.err_msg == "get_brand_wcpay_request:cancel") {
                    			// 				alert('支付失败！');
                    			// 			} else if (res.err_msg == "get_brand_wcpay_request:fail") {
                    			// 				alert('调起微信支付失败');
                    			// 			}
                    			// 		}
                    			// 	);
                    			// }
                    			// onBridgeReady();
                    			//微信支付
                    			// })
                    
                    			wx.config({
                    				beta:true,
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
                    				function(ress) {
                    					if (ress.err_msg == "get_brand_wcpay_request:ok") {
                                            
                    						let id = {
                    						    'id': res.data.orderId
                    						}
                    						that.$router.push({
                    						    "name": 'success',
                    						    params: id
                    						})
                    					} else if (ress.err_msg == "get_brand_wcpay_request:cancel") {
                    						alert('支付失败！');
                    					} else if (ress.err_msg == "get_brand_wcpay_request:fail") {
                    						alert('调起微信支付失败');
                    					}
                    				}
                    			);
                    	
                    		} else {
                    			this.$toast({
                    			    message: `您第${res.meta.msg}期未支付！`,
                    			    duration: 1000
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
            this.monthly = this.$route.params.monthly
            this.payableMoney = this.$route.params.payMoney
            this.periodNo = this.$route.params.periodNo
            let that = this
            if (!this.showWx) {
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

<style scoped>
    .container {
        height: 100vh;
        overflow-x: hidden;
    }

    .payMonth {
        height: 0.8rem;
        width: 100%;
        background: #fff;
        font-size: 0.35rem;
        line-height: 0.8rem;
        padding-left: 0.16rem;
        box-sizing: border-box;
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

    .money {
        color: #e01212;
    }
</style>
