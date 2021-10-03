<template>
	<div class='content-info'>
		<head-Piece>
			<template slot="content">开票信息</template>
		</head-Piece>

		<div class='content'>
			<div class='content-type'>
				<div class='type'>发票类型</div>
				<div class='special' @click='tapRadios'>
					<div class='radios' :class='sign1===true?"signColor":""' @click='tapRadios'>
						<img src='../../assets/dui.png'></img>
					</div>
					<div class='special-info'>
						<div>增值税普通发票</div>
						<div class='info-content'>可开具电子发票或者纸质发票，电子发票与纸质发票具备同等</div>
						<div class='info-content'>法律效益，可支持报销入账。</div>
					</div>
				</div>
				<div class='special' @click='tapRadios'>
					<div class='radios' :class='sign2===true?"signColor":""'>
						<img src='../../assets/dui.png'></img>
					</div>
					<div class='special-info'>
						<div>增值税专用发票</div>
						<div class='info-content'>我司依法开具发票，请您按照税法规定使用发票</div>
					</div>
				</div>
			</div>
			<div class='content-type'>
				<div class='type'>发票内容</div>
				<div class='special' @click='tapRadiosContent(2)'>
					<div class='radios' :class='signContent1===false?"signColor":""'>
						<img src='../../assets/dui.png'></img>
					</div>
					<div class='special-info'>
						<div>保洁服务类</div>
						
					</div>
				</div>
				<div class='special' @click='tapRadiosContent(1)'>
					<div class='radios' :class='signContent1===true?"signColor":""' >
						<img src='../../assets/dui.png'></img>
					</div>
					<div class='special-info'>
						<div>信息服务类</div>

					</div>
				</div>
				
			</div>
			<div class='content-collector' v-if='sign2'>
				<div class='collector'>收票人信息</div>
				<div class='invoice-name'>
					<div class='name-left'>
						<img src='../../assets/sign-1.png'></img>
						<div class='name'>发票抬头名称</div>
					</div>
					<div class='input-tit'>
						<input type="text" v-model="company" placeholder="请填入公司名称" placeholder-style="color:#97979f;">
					</div>
				</div>
				<div class='invoice-name'>
					<div class='name-left'>
						<img src='../../assets/sign-1.png'></img>
						<div class='name'>纳税人识别号</div>
					</div>
					<div class='input-tit'>
						<input type="text" v-model="identifier" placeholder="请填入识别号" placeholder-style="color:#97979f;">
					</div>
				</div>
				<div class='invoice-name'>
					<div class='name-left'>
						<img src='../../assets/sign-1.png'></img>
						<div class='name'>公司电话</div>
					</div>
					<div class='input-tit'>
						<input type="text" v-model="phone" placeholder="请填入号码" placeholder-style="color:#97979f;">
					</div>
				</div>
				<div class='invoice-name'>
					<div class='name-left'>
						<img src='../../assets/sign-1.png'></img>
						<div class='name'>公司地址</div>
					</div>
					<div class='input-tit'>
						<input type="text" v-model='address' placeholder="用来结算纸质发票直送" placeholder-style="color:#97979f;">
					</div>
				</div>
				<div class='invoice-name'>
					<div class='name-left'>
						<img src='../../assets/sign-1.png'></img>
						<div class='name'>开户行</div>
					</div>
					<div class='input-tit'>
						<input type="text" v-model="bank" placeholder="请填入开户行" placeholder-style="color:#97979f;">
					</div>
				</div>
				<div class='invoice-name'>
					<div class='name-left'>
						<img src='../../assets/sign-1.png'></img>
						<div class='name'>银行账户</div>
					</div>
					<div class='input-tit'>
						<input type="text" v-model="bankNo" placeholder="请填入银行账户" placeholder-style="color:#97979f;">
					</div>
				</div>
			</div>

			<div class='content-collector' v-if='sign1'>
				<div class='collector'>收票人信息</div>
				<div class='invoice-name'>
					<div class='name-left'>
						<img src='../../assets/sign-1.png'></img>
						<div class='name'>发票抬头名称</div>
					</div>
					<div class='input-tit'>
						<input type="text" v-model="company" placeholder="请填入公司名称" placeholder-style="color:#97979f;">
					</div>
				</div>
				<div class='invoice-name'>
					<div class='name-left'>
						<img src='../../assets/sign-1.png'></img>
						<div class='name'>纳税人识别号</div>
					</div>
					<div class='input-tit'>
						<input type="text" v-model="identifier" placeholder="请填入识别号" placeholder-style="color:#97979f;">
					</div>
				</div>
					<div class='invoice-name'>
					<div class='name-left'>
						<img src='../../assets/sign-1.png'></img>
						<div class='name'>收票邮箱</div>
					</div>
					<div class='input-tit'>
						<input type="text" v-model="mailBox" placeholder="请填入邮箱" placeholder-style="color:#97979f;">
					</div>
				</div>
			</div>

			<div class='content-btn' @click="comfirm">
				提交
			</div>
		</div>
		<Load v-if='isLoad'></Load>
	</div>
</template>

<script>
	import * as axios from '../../untils/ajax.js'
	import {
		mapGetters,
		mapState,
		mapActions
	} from 'vuex'
	export default {
		data() {
			return {
				sign1: true,
				sign2: false,
				signContent1:false,
				signContent2:true,
				address: '',
				bank: '',
				bankNo: '',
				company: '',
				identifier: '',
				phone: '',
				mailBox: '',
				id: null,
				isLoad:false,
				content:2
			}
		},
		computed:{
				...mapState(['invoice'])
		},
		methods: {
			 ...mapActions(['collageInvoice']),
			tapRadios() {
				this.company = ''
				this.identifier = ''
				this.sign1 = !this.sign1
				this.sign2 = !this.sign2
			},
			tapRadiosContent(e){
				this.content=e
				this.signContent1 = !this.signContent1
			},
			comfirm() {
				var params = new FormData()
				console.log(this.mailBox)
				if (this.sign2) {
					if (this.company.length == 0) {
						this.$toast({
						    message: '公司名称没填写', duration: 1500
						})
						return
					} else if (this.identifier.length == 0) {
						this.$toast({
						    message: '识别号没填写', duration: 1500
						})
						return
					} else if (this.phone.length == 0) {
						this.$toast({
						    message: '公司电话没填写', duration: 1500
						})
						return
					} else if (this.address.length == 0) {
						this.$toast({
						    message:'公司地址没填写', duration: 1500
						})
						return
					} else if (this.bank.length == 0) {
						// this.toast.fail('开户行没填写')
						this.$toast({
						    message:'开户行没填写', duration: 1500
						})
						return
					} else if (this.bankNo.length == 0) {
						this.$toast({
						    message:'银行账户没填写', duration: 1500
						})
						return
					}
					let type= this.sign2 ? "2" : "1"
					params.append('type',type)
					params.append('head', this.company)
					params.append('code', this.identifier)
					params.append('address', this.address)
					params.append('mobile', this.phone)
                    params.append('backName',this.bank)
					params.append('backNo', this.bankNo)
					params.append('content', this.content)
				} else if (this.sign1) {
					if (this.company.length == 0) {
						this.$toast({
						    message:'公司地址没填写', duration: 1500
						})
						return
					} else if (this.identifier.length == 0) {
						this.$toast({
						    message: '识别号没填写', duration: 1500
						})
						return
					}else if(this.mailBox == undefined){
						this.$toast({
						    message:'邮箱没填写', duration: 1500
						})
						return
					}
					let type= this.sign2 ? "2" : "1"
					params.append('type',type)
					params.append('head', this.company)
					params.append('code', this.identifier)
					params.append('emails', this.mailBox)
					params.append('content', this.content)
				}
                if(this.id!=null){
					params.append('id',this.id)
					this.edit(params)
				}else{
					this.isLoad=true
					axios.post('/office/t-office-invoice-config/postInvoiceConf', params).then(res => {
						if (res.meta.success) {
							this.isLoad=false
							// uni.navigateBack({})
							let num=Number(this.invoice)+1
							this.collageInvoice(num)
							this.$router.go(-1)
						}else{
							this.isLoad=false
							this.$toast({
								message:'请求出错',
								duration:1000
							})
						}
					})
				}
			
			},
			edit(params) {
				this.isLoad=true
				axios.post('/office/t-office-invoice-config/putInvoiceConf', params).then(res => {
					if (res.meta.success) {
						this.isLoad=false
						let num=Number(this.invoice)+1
						this.collageInvoice(num)
						this.$router.go(-1)
					}else{
						this.isLoad=false
						this.$toast({
							message:'请求出错',
							duration:1000
						})
					}
				})
			},
			getClientHight() {
			        //     let that = this;
			        //     uni.getSystemInfo({
			        //         success(res) {
			        //             console.log(res.screenHeight); //获取手机设备屏幕高度
			        //             that.clientHight = res.screenHeight;
			        //             that.footerHight = that.clientHight * 0.1;
			        //         }
			        //     })
			        }
		},
		created() {
			var info =this.$route.params
			this.getClientHight()
			if (info.id != undefined) {
				// info = JSON.parse(info)
				this.id = info.id
				this.company = info.head
				this.identifier = info.code
				this.mailBox=info.emails
				this.content=info.content
				if (info.type == 1) {
					this.sign1 = true
					this.sign2 = false
				} else {
					this.sign1 = false
					this.sign2 = true
					this.address = info.address
					this.phone = info.mobile
					this.bank = info.bankName
					this.bankNo = info.bankNo
				   this.content=info.content
				}
			   if(this.content==2){
				   this.signContent1=false
			   }
			}
		}
	}
</script>

<style scoped>
	.content-info{
		/* position: fixed;
		bottom: 0; */
	}
	.content-type {
		box-shadow: 0.05rem 0.05rem 0.10rem #ececee;
		border-radius: 0.15rem;
	}

	.content-type .radios {
		width: 0.34rem;
		height: 0.34rem;
		border-radius: 50%;
		border: 1px solid #ddd;
		display: flex;
		display: -webkit-box;
		display: -webkit-flex;
		justify-content: center;
		-webkit-box-pack:center;
		-webkit-justify-content: center;
		align-items: center;
		 -webkit-box-align: center;
		 -webkit-align-items: center;
		box-sizing: border-box;
	}

	.radios.signColor {
		background: #0396ff;
		border: none;
	}

	.radios img {
		width: 0.22rem;
		height: 0.22rem;
	}

	.content-type {
		width: 6.94rem;
		background: #fff;
		margin: 0.20rem auto;
	}

	.type {
		height: 0.80rem;
		padding: 0 0.16rem;
		border-bottom: 1px solid #eee;
		line-height: 0.80rem;
		font-size: 0.3rem;
	}

	.special {
		display: flex;
		display: -webkit-box;
		display: -webkit-flex;
		padding: 0.18rem 0.16rem;
		border-bottom: 1px solid #eee;
		font-size: 0.28rem;
	}

	.special:last-child {
		border-bottom: none;
	}

	.special-info {
		margin-left: 0.18rem;
		margin-top: -0.05rem;
	}

	.special .info-content {
		font-size: 0.22rem;
		color: #ababad;
		margin-top: 0.05rem;
	}

	.content-collector {
		background: #fff;
		margin: 0 auto;
		width: 6.94rem;
		border-radius: 0.15rem;
		box-shadow: 0.05rem 0.05rem 0.10rem #ececee;
	}

	.content-collector>div {
		padding: 0 0.16rem;
	}

	.collector {
		height: 0.80rem;
		line-height: 0.80rem;
		font-size: 0.30rem;
		border-bottom: 1px solid #eee;
	}

	.invoice-name {
		display: flex;
		display: -webkit-box;
		display: -webkit-flex;
		justify-content: space-between;
		-webkit-box-pack: justify;
		-webkit-justify-content: space-between;
		align-items: center;
		-webkit-box-align: center;
		-webkit-align-items: center;
		height: 0.80rem;
		border-bottom: 1px solid #eee;
	}

	.invoice-name:last-child {
		border-bottom: none;
	}

	.invoice-name img {
		width: 0.15rem;
		height: 0.17rem;
		margin-right: 0.08rem;
	}

	.invoice-name .name-left {
		display: flex;
		display: -webkit-box;
		display: -webkit-flex;
		align-items: center;
		-webkit-box-align: center;
		-webkit-align-items: center;
		font-size: 0.28rem;
	}

	.invoice-name .name-tit {
		width: 3.70rem;
		color: #97979f;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.invoice-name .input-tit {
		width: 3.70rem;
		/* color: #97979f; */
	display: flex;
	display: -webkit-box;
	display: -webkit-flex;
	align-items: center;
	-webkit-box-align: center;
	-webkit-align-items: center;

	}

	.invoice-name .input-tit input {
		font-size: 0.28rem;
		border: none;
	}

	.content-btn {
		margin: 0.54rem auto;
		width: 3rem;
		height:0.8rem;
		text-align: center;
		line-height: 0.80rem;
		border-radius: 0.50rem;
		background: #ff5f1e;
		color: #fff;
		font-size: 0.32rem;
	}
</style>
