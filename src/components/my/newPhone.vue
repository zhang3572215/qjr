<template>
	<div>
		<head-Piece>
			<div slot="content"></div>
		</head-Piece>
	
		<div class='content pad'>
			<div class='phone '>
				<div class='num'>手机号</div>
				<input type="text" v-model="phone" placeholder-style='color:#d9d9d9' placeholder="请输入新手机号">
			</div>
			<div class='phone '>
				<div class='num'>验证码</div>
				<div class='code'>
					<input type="text" v-model="code" placeholder-style='color:#d9d9d9' placeholder="请输入手机验证码">
					<div class='code-tit' v-if='codeFlag===true' @click='tapCode'>
						获取验证码
					</div>
					<div class='code-tit codeInfo' v-else>
						{{codeInfo}}S
					</div>
				</div>

			</div>
			<div class='btn-bottom' @click="confirm">
				提交
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
				codeInfo: 60,
				codeFlag: true,
				phone: '',
				code: '',
				isLoad: false
			}
		},
		methods: {
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

				let params = new FormData()
				params.append('phone', this.phone)
				axios.post('/sys/t-sys-app-user/sendVerCode', params).then(res => {
					console.log(res)
					if (res.meta.success) {
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
						this.$toast({
							message: '验证码已发送'
						})
					} else {
						this.$toast({
							message: '验证码获取失败'
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
				this.isLoad = true
				let params = new FormData()
				params.append('newPhone', this.phone)
				params.append('verCode', this.code)
				axios.post('/sys/t-sys-app-user/putPhone', params).then(res => {
					if (res.meta.success) {
						this.isLoad = false
						this.$router.go(-2)

					} else {
						this.isLoad = false
						this.$toast({
							message: res.meta.msg,
							duration: 1000
						})
					}
				})
			},
			isPhoneNumber(tel) {
				var reg = /^0?1[3|4|5|6|7|8][0-9]\d{8}$/;
				return reg.test(tel);
			},
		}
	}
</script>

<style scoped>
	.content {
		background: #fff;
		width: 100vw;
		border-top: 1px solid #eee;

	}

	.phone {
		height: 1.70rem;
		font-size: 0.32rem;
		border-bottom: 1px solid #eee;
		padding-left: 0.48rem;
		padding-right: 0.48rem;
	}

	.phone .num {
		padding-top: 0.35rem;
		padding-bottom: 0.33rem;
	}

	.phone input {
		font-size: 0.26rem;
		border: none;
		background: #fff;
		/* color: #eee; */
	}

	.code {
		display: flex;
		display: -webkit-box;
		display: -webkit-flex;
		justify-content: space-between;
		-webkit-box-pack: justify;
		-webkit-justify-content: space-between;
		align-items: center;
		-webkit-box-align: center;
		-webkit-align-items: center;
	}

	.code-tit {
		height: 0.44rem;
		width: 1.52rem;
		background: #ffeff0;
		color: #ff5f1e;
		border-radius: 0.20rem;
		font-size: 0.24rem;
		text-align: center;
		line-height: 0.44rem;
	}

	.codeInfo {
		width: 1rem;
	}

	.btn-bottom {
		height: 0.88rem;
		width: 6.94rem;
		margin: 0.80rem auto 0 auto;
		border-radius: 0.50rem;
		background: #ff5f1e;
		line-height: 0.88rem;
		text-align: center;
		font-size: 0.30rem;
		color: #fff;
	}
</style>
