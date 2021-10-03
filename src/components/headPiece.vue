<template>
	<div>
		<div class='contents' id='contents'>
			<div class='head' :class='showHead?"":"hiddenPt"'>
				<div class='head-left' @click='tapReturn' >
					<img src="../assets/left-black.png" mode="" v-if='!headLeft'></img>
					<span v-if='!headLeft'>返回</span>
				</div>
				<div class='head-center'>
					<div v-show='showHead'>
						<slot name="content"></slot>
					</div>
				</div>
				<div class='head-right' @click='info'>
					<slot name="content-right"></slot>
				</div>
			</div>

		</div>
		<div class='head-show' :class='showHead?"":"showHeight"' v-if='sign!="清洁人注册邀请"'>
		</div>
	</div>
</template>

<script>
	import {
		mapMutations,
		mapActions
	} from 'vuex'
	import getToken from './../untils/getToken.js'
	export default {
		data() {
			return {
				showHead: true,
				isBack: false
			}
		},
		props: {
			sign: String,
			signId: String,
			signIn: String,
			headLeft: String,
            hiddenLeft:String
		},
		methods: {
			...mapMutations(['addBackDes']),
			...mapActions(['addShowSignId', 'addDesCont']),
			tapReturn() {
                if(this.hiddenLeft){
                   return 
                }
				if (this.sign === '签到') {
					// this.addBackDes('task')
					// this.addShowSignId(this.signId)
					//  uni.navigateTo({
					//  	  url:"/pages/index/index"
					//  })
					this.$router.go(-1)
				} else if (this.sign === '签退') {
					// this.addBackDes('task')
					// this.addShowSignId(this.signId)
					//  uni.navigateTo({
					//  	  url:"/pages/index/index"
					//  })
					this.$router.go(-1)
				} else if (this.sign == 'toback') {
					// uni.navigateTo({
					// 	url: "/pages/index/index"
					// })
				} else if (this.signIn == 'toback') {
					// uni.navigateTo({
					// 	url: "/pages/index/index"
					// })
				} else if (this.sign == '购物车') {
					if (window.localStorage.getItem('cart') && window.localStorage.getItem('cart').length > 0) {
						this.addDesCont('shopping')
						window.localStorage.removeItem('cart')
					}
					if (!this.isBack) {
						this.$router.goBack()
					} else {
						this.$router.go(-2)
					}


				} else {
					if (!this.isBack) {
						if(this.$getOther.getUrlInfo('voucher') || this.sign=='抵佣金'){//如果是从扫码活动的    已领取->跳抵用金页，点击返回首页
						   this.$router.push({name:'index'})
						}else{
							this.$router.goBack()
						}					
					} else {
						this.$router.go(-2)//极光推送点击消息进入的页面点击返回
					}

					// this.$router.go(-1)
					// window.history.back()
				}

				// if(this.sign=='地址'  || this.sign=='历史分期' ||this.sign=='历史申请'){
				// 					this.$router.go(-1)
				// }else  if(this.sign=='提交申请' || this.sign=="开票信息"){
				// 				   this.$router.go(-1)
				// } else
			},
			info() {

				if (this.sign === '历史申请') {
					this.$router.push({
						'name': 'oldInvoice'
					})
					// uni.navigateTo({
					// 	url: '/pages/order/oldInvoice'
					// })
				} else if (this.sign === '历史分期') {
					this.$router.push({
						'name': 'historicalStages'
					})
					// uni.navigateTo({
					//  url:'/pages/order/historicalStages'	
					// })

				} else if (this.sign == '历史租赁') {
					this.$router.push({
						'name': 'apply'
					})
				} else if (this.sign == '申请提现') {
					this.$router.push({
						'name': 'withdrawalRecord'
					})
				}
			},
	
		},
		created() {
			if (window.localStorage.getItem('wxBrowser')) {
				this.showHead = false
			}
		// 	let url= window.location.href.split('?').slice(1)
		// 	let  urlArr=url[0].split('&')
		// 	let urlJson={}
		// 	urlArr.forEach(item => {
		// 		  let itemArr=item.split('=')
		// 		 urlJson[itemArr[0]]=itemArr[1]
		// 	})
		
			// let url1=url.slice(1)
			// console.log(url1)
			
			// 点击消息推送跳转需要用到
			if (this.$getOther.getUrlInfo('isBack') == '1') {
				// alert(window.location.href)
				this.isBack = true
			}
		},
		mounted() {

		}
	}
</script>

<style scoped>
	.contents {
		position: fixed;
		top: 0;
		z-index: 100;
		width: 100%;
		height: 1.28rem;
	}

	.head {
		padding-top: 0.4rem;
		height: 0.88rem;
		width: 100vw;
		/* background: #36a8fa; */
		background: #fff;
		text-align: center;
		/* position: relative; */
		box-sizing: content-box;
		/* color:#fff; */
		font-size: 0.33rem;
		z-index: 20;
	}

	.head.hiddenPt {
		padding-top: 0 !important;
	}

	/* 	.head-left {
		height: 100%;
		line-height: 88upx;
		float: left;
		width: 30%;
		display: flex;
		position: relative;
	}

	.head-left img {
		display: inline-block;
		width: 18upx;
		height: 32upx;
		position: absolute;
		margin-left: 28upx;
		top: 50%;
		transform: translateY(-50%);
	}

	.head-left span {
		margin-left: 60upx;
        line-height: 88upx;
	}
 */
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
		/* line-height: 0rem; */
		margin-left: 0.35rem;
		font-size: 0.32rem;
		position: absolute;
		top: 50%;
		left: 0;
		transform: translateY(-51%);
		-webkit-transform: translateY(-51%);
		width: 50%;
	}



	.head-center {
		height: 100%;
		width: 40%;
		line-height: 0.88rem;
		text-align: center;
		float: left;
		font-size: 0.36rem;
		font-family: Arial !important;
		font-weight: 500 !important;
	}

	/* .head-right{
	 
	  height: 88upx;
	  width: 30%;
	
	} */
	.head-right {
		height: 100%;
		line-height: 0.85rem;
		float: right;
		width: 20%;
		display: flex;
		display: -webkit-box;
		display: -webkit-flex;
		justify-content: flex-end;
		-webkit-box-pack: end;
		-webkit-justify-content: flex-end;
		padding-right: 0.28rem;
	}

	.head-show.showHeight {
		height: 1.1rem;
	}

	.zhezhao {
		z-index: 1000;
	}
</style>
