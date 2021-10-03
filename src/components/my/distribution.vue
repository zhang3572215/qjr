<template>
	<div>
		<!-- <head-Piece>
			<template slot="content">绑定手机号</template>
		</head-Piece> -->
		<div class='activation'>
			绑定手机号码，即可领取{{activityName}}
		</div>
		<div class='input-info'>
			<div class='phone'>
				<img src='../../assets/phone-2.png'></img>
				<input type="text" placeholder="请输入手机号" v-model="phone" placeholder-style="color:#dce0e8;">
			</div>
			<div class='code-info'>
				<div class='code-left'>
					<img src='../../assets/lock.png'></img>
					<input type="text" v-model="code" placeholder="请输入验证码" placeholder-style="color:#dce0e8;">
				</div>
				<div class='code-right' v-if='codeFlag' @click='tapCode'>
					获取验证码
				</div>
				<div class='code-right' v-else>
					{{codeInfo}}S
				</div>
			</div>
		</div>

		<div class='content-btn' @click="confirm">
			提交
		</div>
		<Load v-if='isLoad'></Load>
		<showSuccess v-if='isSuccess' :successInfo='successInfo'></showSuccess>
	</div>
</template>

<script>
	import * as axios from '../../untils/ajax.js'
	import getToken from '../../untils/getToken.js'
	import {
		mapActions,
		mapGetters
	} from 'vuex'
	export default {
		data() {
			return {
				codeInfo: 60,
				codeFlag: true,
				code: '',
				phone: '',
				isLoad: false,
				unionId: '',
				headImgUrl: '',
				isSuccess: false,
				successInfo: '',
				openId: '',
				showWx: false,
				activityName:'',
				estateId:'',
				activityId:''
			}
		},
		computed: {

			...mapGetters(['showReturnRefresh'])

		},
		methods: {
			...mapActions(['collageReturnRefresh']),
			tapCode() {
				if (this.phone.length === 0) {
					this.$toast({
						message: '请填写手机号',
						duration: 1000
					})

					return
				} else if (this.phone.length > 0) {
					if (this.phone.length < 11) {
						this.$toast({
							message: '号码填写不正确',
							duration: 1000
						})
						return
					}
					if (!this.isPhoneNumber(this.phone)) {
						this.$toast({
							message: '号码格式不对',
							duration: 1000
						})
						return
					}
				}
				let code = 60
				this.codeFlag = false
				let that = this

				let interval = setInterval(() => {
					code -= 1
					if (code >= 0) {
						that.codeInfo = code
					} else {
						that.codeFlag = true
						clearInterval(interval)
						that.codeInfo = 60
					}
				}, 1000)

				let params = new FormData()
				params.append('phone', this.phone)
				axios.post('/sys/t-sys-app-user/sendVerCode', params).then(res => {
					console.log(res)
					if (res.meta.success) {
						this.successInfo = '验证码已发送'
						this.isSuccess = true

						setTimeout(() => {
							that.isSuccess = false
						}, 1000)
					} else {
						this.$toast({
							message: '验证码失败',
							duration: 1000
						})
					}
				})

			},
			confirm() {
				if (this.phone.length === 0) {
					this.$toast({
						message: '请填写手机号',
						duration: 1000
					})

					return
				} else if (this.phone.length > 0) {
					if (this.phone.length < 11) {
						this.$toast({
							message: '号码填写不正确',
							duration: 1000
						})
						return
					}
					if (!this.isPhoneNumber(this.phone)) {
						this.$toast({
							message: '号码格式不对',
							duration: 1000
						})
						return
					}
				}

				if (this.code.length === 0) {
					this.$toast({
						message: '请填写验证码',
						duration: 1000
					})
					return
				} else if (this.code.length > 0) {
					if (this.code.length < 4) {
						this.$toast({
							message: '验证码不正确',
							duration: 1000
						})
						return
					}

				}
				this.isLoad = true
				let params = new FormData()
				params.append('phone', this.phone)
				params.append('verCode', this.code)
				params.append('unionId', this.unionId)
				params.append('openId', this.openId)
				params.append('headImgUrl', this.headImgUrl)
				params.append('estateId',this.estateId)
				params.append('activityId',this.activityId)
				let that = this
				axios.post('/business/t-business-activity/postAllowanceByActivityByNew', params).then(res => {
					this.isLoad = false
					if (res.meta.success) {
						let token = res.data.token
						var ua = window.navigator.userAgent.toLowerCase();

						// uni.setStorageSync('token',token)
						// let num = this.showReturnRefresh + 1
						// this.collageReturnRefresh(num)
						window.localStorage.setItem('token', token)
						this.successInfo = '绑定成功'
						this.isSuccess = true

						setTimeout(() => {
							that.isSuccess = false
						}, 1000)
						if (ua.indexOf('micromessenger') < 0) {
							this.$router.go(-2)

						} else {
							this.$router.push({
								'name': 'index'
							})
							this.$toast({
								message: '领取成功',
								duration: 1000
							})
						}

						// this.$router.go(-2)
						// this.$router.push({
						// 	'name': 'index'
						// })
						// uni.navigateTo({
						// 	url: "/pages/index/index"
						// })
					} else {
						if(res.meta.msg=='验证码错误'){
							this.$toast({
								message: '验证码错误',
								duration: 1000
							})
						}else{
							let token = res.data.msg
							window.localStorage.setItem('token', token)
							this.$router.push({
							 	'name': 'index'
							 })
							this.$toast({
								message: '此活动已失效，感谢您的关注',
								duration: 1500
							})
						}
						
					}
				})
			},
			isPhoneNumber(tel) {
				var reg = /^0?1[3|4|5|6|7|8][0-9]\d{8}$/;
				return reg.test(tel);
			},
			toBack() {
				// uni.navigateTo({
				// 	url: '/pages/index/index'
				// })
			},
			getQueryVariable(variable) {
				var arr = window.location.href.split("?");
				var vars = arr[1].split("&");
				for (var i = 0; i < vars.length; i++) {
					var pair = vars[i].split("=");
					if (pair[0] == variable) {
						return pair[1];
					}
				}
				return (false);
			}

		},
		created() {
			
			//判断是否为微信浏览器
			// if (window.localStorage.getItem('wxBrowser')) {
   //              this.$getOther.getFirstWxurl()//微信授权登录
			// 	this.showWx = true
			// }
			var ua = window.navigator.userAgent.toLowerCase();
			if (ua.indexOf('micromessenger') > -1) {
				// alert('微信浏览器')
				this.unionId = this.getQueryVariable('unionId')
				let headImgUrl = this.getQueryVariable('headImgUrl')
				this.headImgUrl = decodeURIComponent(headImgUrl)
				this.openId=this.getQueryVariable('openId')
				this.activityId=this.getQueryVariable('activityId')
				this.estateId=this.getQueryVariable('estateId')
				let that=this
				this.activityName=decodeURI(that.getQueryVariable('activityName'))
				// alert(this.openId)
			}

		},
		mounted() {
			
		}
	}
</script>

<style scoped>
	.activation{
		font-size: 0.4rem;
		width: 100%;
		text-align: center;
		margin-top: 0.3rem;
	}
	.content-logo {
		height: 0.73rem;
		padding: 0 0.39rem;
		display: flex;
		display: -webkit-box;
		display: -webkit-flex;
		align-items: center;
		-webkit-box-align: center;
		-webkit-align-items: center;
		font-size: 0.50rem;
		margin-top: 0.90rem;
	}

	.content-logo img {
		height: 0.73rem;
		width: 0.73rem;
		margin-right: 0.18rem;
	}

	.input-info {
		padding: 0 0.39rem;
	}

	.input-info .phone {
		height: 0.45rem;
		width: 100%;
		padding: 0.91rem 0 0.29rem 0.39rem;
		box-sizing: content-box;
		font-size: 0.28rem;
		display: flex;
		display: -webkit-box;
		display: -webkit-flex;
		align-items: center;
		-webkit-box-align: center;
		-webkit-align-items: center;
		border-bottom: 1px solid #eee;
	}

	.input-info .phone input,
	.code-info .code-left input {
		border: none;
		background: #f8f8fa;
	}

	.phone img {
		height: 0.45rem;
		width: 0.29rem;
		margin-right: 0.30rem;
	}

	.code-info {
		height: 0.48rem;
		padding: 0.87rem 0 0.29rem 0.27rem;
		box-sizing: content-box;
		font-size: 0.28rem;
		display: flex;
		display: -webkit-box;
		display: -webkit-flex;
		justify-content: space-between;
		-webkit-box-pack: justify;
		-webkit-justify-content: space-between;
		align-items: center;
		-webkit-box-align: center;
		-webkit-align-items: center;
		border-bottom: 1px solid #eee;
	}

	.code-info .code-left {
		display: flex;
		display: -webkit-box;
		display: -webkit-flex;
		align-items: center;
		-webkit-box-align: center;
		-webkit-align-items: center;
	}

	.code-info .code-left img {
		width: 0.41rem;
		height: 0.48rem;
		margin-right: 0.30rem;
	}

	.code-right {
		height: 0.53rem;
		width: 1.53rem;
		background: #e5f4ff;
		color: #0396ff;
		text-align: center;
		line-height: 0.53rem;
		font-size: 0.24rem;
		border-radius: 0.30rem;
	}

	.content-btn {
		height: 0.875rem;
		width: 6.20rem;
		background: linear-gradient(to right, #12d59d, #18d59c);
		color: #fff;
		border-radius: 0.50rem;
		line-height: 0.875rem;
		text-align: center;
		margin: 1.25rem auto 0.80rem auto;
		font-size: 0.3rem;
	}

	.company {
		position: absolute;
		width: 100%;
		bottom: 0.30rem;
		/* left:50%; */
		text-align: center;
		/* transform: translateX(-50%); */
		font-size: 0.35rem;
		letter-spacing: 0.04rem;
	}

	.following {
		width: 100%;
		text-align: center;
		font-size: 0.30rem;
		color: #666;
	}

	.wx-content {
		width: 100%;
		margin-top: 0.30rem;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.wx-content img {
		width: 0.80rem;
		height: 0.80rem;
		border-radius: 50%;
	}

	.wx-content .wx-tit {
		margin-top: 0.15rem;
		font-size: 0.28rem;
		color: #888;
	}
</style>
