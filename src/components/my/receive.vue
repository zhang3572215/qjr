<template>
	<div class='content'v-show='showContent'>
			<img class='bgImg' src="../../assets/banner-1.png" alt="">
			<Load v-if='isLoad'></Load>
			<div class='receiveImg' v-if='receiveSuccess'>
				<img src="../../assets/receive.png" alt="">
			</div>
			<div class='lookUp' @click="toVoucher">
			</div>
	</div>
</template>

<script>
	import * as axios from '../../untils/ajax.js'
	export default {
		data() {
			return {
				imgUrl: '',
				isLoad: false,
				activityId: '',
				receiveSuccess: '',
				showContent: false
			}
		},
		methods: {
			//跳转抵佣金页面
			toVoucher() {
				let info={
					sign:'抵佣金'
				}
				this.$router.push({
					'name': 'voucher',params:info
				})
			},
			getAllowance() {
				this.isLoad = true
				let params = new FormData()
				params.append('activityId', this.activityId)
				params.append('estateId', this.estateId)
				axios.post('/business/t-business-activity/postAllowanceByActivity', params).then(res => {
					if (res.meta.success) {
						this.receiveSuccess = true
					}
					this.isLoad = false
				})
			}
		},
		beforeCreate() {

			var url = window.location.href; /* 获取完整URL */
			var ua = window.navigator.userAgent.toLowerCase();
			if (url.includes('receive') && ua.indexOf('micromessenger') < 0) { //非微信浏览器,扫码，直接调用微信微信登录，这样可以显示请在微信客户端打开的页面
				this.$getOther.getWxURl()
				return
			}
			
		},
		created() {
			this.showContent = true
			//判断是否为微信浏览器
			var ua = window.navigator.userAgent.toLowerCase();
			if (ua.indexOf('micromessenger') >-1) {
				let token = this.$getOther.getUrlInfo('token')
				if (token) {
					window.localStorage.setItem('token', token)
					this.activityId = this.$getOther.getUrlInfo('activityId')
					this.estateId = this.$getOther.getUrlInfo('estateId')
					// this.recomPhone=this.$getOther.getUrlInfo('recomPhone')
					this.getAllowance()
				} else {
					this.$getOther.getReviceWxURl(this.$getOther.getUrlInfo('activityId'), this.$getOther.getUrlInfo('recomPhone'),
					this.$getOther.getUrlInfo('estateId')) //微信授权登录
				}
			}

			// this.getInfo()
		}
	}
</script>

<style scoped>
	.content {
		height: 100%;
		width: 100%;
		overflow: hidden;
		position: relative;
	}

	.bgImg {
		width: 100vw;
		height: 100vh;
		/* background-img: url('~@/static/invitation-info.jpg'); */
		/* background-size: 100% 100%; */

	}

	.receiveImg {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		-webkit-transform: translate(-50%, -50%);
	}

	.receiveImg img {
		width: 4rem;
		height: 5rem;
	}

	.lookUp {
		opacity: 0;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, 110%);
		-webkit-transform: translate(-50%, 110%);
		width: 3rem;
		height: 0.9rem;
	}
</style>
