<template>
	<div class='container'>
		<!-- <head-Piece>
			<block slot="content">清洁人注册邀请</block>
		</head-Piece> -->
		<!-- <div class='head'>
			<div class='content-title bg-gradual-blue'>
				<div class='title-center'>
					清洁人注册邀请
				</div>
				<div class='title-right'>
				
			</div>
		</div> -->
	<!-- 	<div class='head-show'>
		</div> -->
		<div class='content' :style='{"height":officeHeight}' >
			<div class='info'>
				<div class='info-first'>
					<div>邀请人：<span>{{recomPhone}}</span></div>
				</div>
				<div class='info-second'>
					<input type="text" v-model="phone" placeholder="请输入手机号码" placeholder-style="color:#bfbfbf;">
				</div>
				<div class='info-three'>
					<input type="text" v-model="code" placeholder="请输入验证码" placeholder-style="color:#bfbfbf;">
					<div class='code' v-if='codeFlag' @click='tapCode'>
						获取验证码
					</div>
					<div class='code' v-else>
						{{codeInfo}}S
					</div>
				</div>
				<div class='btn' @click="confirm">
					立即注册
				</div>
			</div>
		</div>
		<Load v-if='isLoading'></Load>
		<showFail v-if='isFalse' :msg="failInfo"></showFail>
		<div class='total-success' v-if='isSuccess'>
			<img src="../assets/true-1.png" alt="">
			<span>{{successInfo}}</span>
		</div>
	</div>
</template>

<script>
	import * as axios from '../untils/ajax.js'
	export default {
		data() {
			return {
				phone: '',
				code: '',
				codeInfo: 60,
				codeFlag: true,
				isLoading:false,
				isFalse:false,
				failInfo:'',
				isSuccess:false,
				successInfo:null,
				recomPhone:null,
				officeHeight:0
			}
		},
		methods: {
			tapCode() {
				let that=this
				if (this.phone.length === 0) {
					// this.toast.fail('请填写手机号')
					this.isFalse=true
					this.failInfo='请填写手机号'
					setTimeout(() => {
						 that.isFalse=false
					},2000)
					return
				} else if (this.phone.length > 0) {
					if (this.phone.length < 11) {
						// this.toast.fail('号码填写不正确')
						this.isFalse=true
						this.failInfo='号码填写不正确'
						setTimeout(() => {
							 that.isFalse=false
						},2000)
						return
					}
					if (!this.isPhoneNumber(this.phone)) {
						// this.toast.fail('号码格式不对')
						this.isFalse=true
						this.failInfo='号码格式不对'
						setTimeout(() => {
							 that.isFalse=false
						},2000)
					
						return
					}
				}
				this.codeFlag = !this.codeFlag
				let code = 60
				
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
				this.getCode()
			},
			getCode(){
				let that=this
				let params = new FormData()
				this.isLoading=true
				params.append('phone', this.phone)
				axios.post('/sys/t-sys-app-user/sendVerCode', params).then(res => {
					if (res.meta.success) {
						// this.showFlag = false
						// this.isLoad = false
						// this.toast.success('预约成功')
						this.isLoading=false
						this.isSuccess=true
						this.successInfo='验证码已发送'
						setTimeout(() => {
							 that.isSuccess=false
						},2000)
						
					} else {
						this.isLoad = false
						that.isFalse=true
						this.failInfo='验证码发送失败'
						setTimeout(() => {
							 that.isFalse=false
						},2000)
											
						// this.toast.fail('预约失败')
					}
				})
			},
			isPhoneNumber(tel) {
				var reg = /^0?1[3|4|5|6|7|8][0-9]\d{8}$/;
				return reg.test(tel);

			},
			confirm() {
				let that=this
				if (this.phone.length === 0) {
					this.isFalse=true
					this.failInfo='请填写手机号'
					setTimeout(() => {
						 that.isFalse=false
					},2000)
					return
				} else if (this.phone.length > 0) {
					if (this.phone.length < 11) {
						this.isFalse=true
						this.failInfo='号码填写不正确'
						setTimeout(() => {
							 that.isFalse=false
						},2000)
						return
					}
					if (!this.isPhoneNumber(this.phone)) {
						this.isFalse=true
						this.failInfo='号码格式不对'
						setTimeout(() => {
							 that.isFalse=false
						},2000)
						return
					}
				}

				if (this.code.length === 0) {
					// this.toast.fail('请填写验证码')
					this.isFalse=true
					this.failInfo='请填写验证码'
					setTimeout(() => {
						 that.isFalse=false
					},2000)
					return
				} else if (this.code.length > 0) {
					if (this.code.length <4) {
						this.isFalse=true
						// this.toast.fail('验证码不正确')
						this.failInfo='验证码不正确'
						setTimeout(() => {
							 that.isFalse=false
						},1000)
						return
					}

				}
			
				let params = new FormData()
				this.isLoading=true
				params.append('phone', this.phone)
				params.append('verCode', this.code)
				params.append('recomPhone', this.recomPhone)
				axios.post('/sys/t-sys-app-user/appLogin', params).then(res => {
					if (res.meta.success) {
						// this.showFlag = false
						// this.isLoad = false
						// this.toast.success('预约成功')
					  
						this.isLoading=false
						// window.location.href='https://www.jieren365.cn/qjrapi/appInstallTest.html'//测试
						window.location.href='https://boss.jieren365.cn/qjrapi/appInstall.html'//正式		
					} else {
						this.isLoading= false
						// this.toast.fail('预约失败')
					}
				})
			}
		},
		created(){
			 this.officeHeight = (document.documentElement.offsetHeight || document.body.offsetHeight )+  'px'     	
			let phone=this.$route.params.phone 
			console.log(phone)
			this.recomPhone=phone
		}
	}
</script>

<style scoped>

	.container{
		height: 100%;
		width: 100%;
	}
	.head {
		position: fixed;
		top: 0;
		width: 100vw;
		z-index: 1000;
	}
	
	.content-title {
		padding-top: 0.40rem;
		height: 0.88rem;
		width: 100vw;
		/* background: #539ef9; */
		background: #fff;
		text-align: center;
		position: relative;
		box-sizing: content-box;
		font-size: 0.38rem;
		position: relative;
		color: #000;
	}
/* 	
	.head-show {
	
		height: 1.28rem;
		width: 100%;
	} */
	
	.content-title .title-center {
		line-height: 0.88rem;
		font-size: 0.36rem;
	}
	
	.content-title .title-right {
		height: 0.88rem;
		position: absolute;
		font-size: 0.32rem;
		right: 0.30rem;
		top: 0.4rem;
		line-height: 0.88rem;
		text-align: center;
	
	}
	
	.content-title .title-right img {
		display: inline-block;
		width: 0.18rem;
		height: 0.32rem;
		margin-left: 0.11rem;
		transform: translateY(0.04rem);
	}
	.content {
		width: 100%;
		height: 100vh;
		background-image: url(../assets/invitation-info.png);
		/* background-size: 100% 100%; */
		background-size:cover;
		position: relative;
		/* top: 0; */
	}

	.info {
		position: absolute;
		top: 6.2rem;
		left: 50%;
		transform: translateX(-50%);
		width: 6.76rem;
		height: 5.6rem;
		background: #fff;
		border-radius: 0.15rem;
		padding: 0 0.38rem;
		box-sizing: border-box;
	}

	.info .info-first {
		padding-top: 0.58rem;
		height: 1.20rem;
		box-sizing: border-box;
		font-size: 0.30rem;
		border-bottom: 1px solid #ddd;
	}

	.info .info-first>div {
		color: #000000;
		margin-left: 0.18rem;
	}

	.info .info-second {
		padding-top: 0.45rem;
		height: 1.05rem;
		box-sizing: border-box;
		font-size: 0.30rem;
		border-bottom: 1px solid #ddd;
	}

	.info .info-second input {
		margin-left: 0.18rem;
	}

	.info .info-three {
		padding-top: 0.45rem;
		height: 1.05rem;
		box-sizing: border-box;
		font-size: 0.30rem;
		border-bottom: 1px solid #ddd;
		display: flex;
		justify-content: space-between;
	}

	.info .info-three input {
		margin-left: 0.18rem;

	}

	.info .info-three .code {
		font-size: 0.24rem;
		width: 1.50rem;
		height: 0.50rem;
		background: #ff813a;
		line-height: 0.52rem;
		text-align: center;
		color: #fff;
		border-radius: 0.30rem;
	}

	.btn {
		width: 5.75rem;
		height: 0.90rem;
		line-height: 0.90rem;
		text-align: center;
		font-size: 0.32rem;
		color: #fff;
		background: #ff6d38;
		border-radius: 0.60rem;
		margin: 0.70rem auto 0 auto;
	}
	input{
	  border: none;
	  outline:none
	}
	.total-success {
		position: fixed;
		top: 5.7rem;
		background: rgba(44, 44, 44, 0.8);
		display: flex;
		flex-direction: column;
		align-items: center;
		font-size: 0.28rem;
		color: #fff;
		width: 2.2rem;
		height: 2.15rem;
		border-radius: 0.15rem;
		left: 50%;
		transform: translateX(-50%);
	}
	
	.total-success img {
		width: 1.1rem;
		height: 1.05rem;
		margin-top: 0.35rem;
	}
	
</style>
