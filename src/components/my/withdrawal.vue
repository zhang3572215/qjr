<template>
	<div>
		<head-Piece :sign='"申请提现"'>
			<template slot="content">申请提现</template>
			<template slot="content-right">提现记录</template>
		</head-Piece>
		
		<div class='content-head'>
			<div class='head-money'>
				<input type="number" v-model="advanceMoney" :placeholder="money" >
			</div>
			<div class='money-title'>
				每月可申请提现1次（已累计提现{{percentMoney}}元）预计1-3个工作日到账
			</div>
		</div>
		<div class='card-info'>
			提现账户信息（银行卡）
		</div>
		<div class='select-card' @click='toSelect' v-if='!flag'>
			<img src="../../assets/card.png" alt="">
			<div>选择银行卡</div>
		</div>


		<div class='bank-list' v-else @click='toSelect'>
			<img :src="info.imgUrl" alt="">
			<div class='bank-info'>
				<div class='bank-title'>{{info.bankName}}</div>
				<div class='bank-num'>
					{{info.accountNo}}
				</div>
			</div>

		</div>
		<div class='btn' @click='postAdvance'>
			马上申请
		</div>
		<Load v-if='isLoad'></Load>
	</div>
</template>

<script>
	import * as axios from '../../untils/ajax.js'
	import {
		mapGetters
	} from 'vuex'
	export default {
		data() {
			return {
				money: '¥  可提现金额0.00',
				flag: false,
				info: {},
				advanceMoney: '',
				isLoad: false,
				percentMoney: ''
			}
		},
		computed: { ...mapGetters(['showBankCard'])
		},
		methods: {
			toSelect() {
				this.$router.push('bankCard')
			},
			getInfo() {
				this.isLoad = true
				axios.post('/business/t-business-estate/getInfoById').then(res => {
					this.isLoad = false
					if (res.meta.success) {
                        this.money='¥  可提现金额'+res.data.leaveBroker
						// this.advanceMoney = res.data.leaveBroker
						this.percentMoney = res.data.percentMoney

					}else{
						this.$toast({
							message: res.meta.msg,
							duration: 1000
						})
					}
				})
			},
			postAdvance() {
				if (this.advanceMoney.toString().length == 0) {
					this.$toast({
						message: '请填写提现金额',
						duration: 1000
					})
					return
				} else if (this.info.id == undefined) {
					this.$toast({
						message: '请选择银行卡',
						duration: 1000
					})
					return
				}
				let params = new FormData()
				params.append('advanceMoney', this.advanceMoney)
				params.append('bankCardId', this.info.id)
				let that = this
				this.isLoad = true
				axios.post('/business/t-business-estate-advance/postAdvance', params).then(res => {
					this.isLoad = false
					if (res.meta.success) {
						setTimeout(() => {
							that.$toast({
								message: '申请成功，请耐心等候',
								duration: 1000
							})
						}, 100)

						setTimeout(() => {
							that.$router.go(-1)
						}, 1000)
					} else {
						setTimeout(() => {
							that.$toast({
								message: res.meta.msg,
								duration: 1000
							})
						}, 100)

					}
				})
			}

		},
		created() {
			this.getInfo()
		},
		destroyed() {
			this.flag = false
		},
		watch: {
			showBankCard(newval, oldval) {
				this.flag = true
				this.info = newval
				console.log(this.info)
			}
		}

	}
</script>

<style scoped>
	.content-head {}

	.head-money {
		border-radius: 0.15rem 0.15rem 0 0;

		background: #fff;
		height: 1.28rem;
		width: 6.98rem;
		margin: 0.2rem auto 0 auto;
		display: flex;
		display: -webkit-box;
		display: -webkit-flex;
		align-items: center;
		-webkit-box-align: center;
		-webkit-align-items: center;
		font-size: 0.4rem;
		border-bottom: 1px solid #dcdcdc;
		overflow: hidden;
	}

	.head-money input {
		height: 0.8rem;
		border: none;
		margin-left: 0.3rem;
		/* text-align: center; */
		font-size: 0.4rem;
	}

	.head-money input::-webkit-input-placeholder {
		color: #dcdcdc;
		font-size: 0.4rem;

	}

	.money-title {
		border-radius: 0 0 0.15rem 0.15rem;
		font-size: 0.24rem;
		/* height: 0.78rem; */
		padding: 0.2rem 0;
		width: 6.98rem;
		margin: 0 auto;
		display: flex;
		display: -webkit-box;
		display: -webkit-flex;
		align-items: center;
		-webkit-box-align: center;
		-webkit-align-items: center;
		padding-left: 0.3rem;
		background: #fff;
		box-sizing: border-box;
	}

	.card-info {
		font-size: 0.3rem;
		margin: 0.3rem 0 0.2rem 0.28rem;
	}

	.select-card {
		height: 1.05rem;
		width: 6.98rem;
		background: #fff;
		display: flex;
		display: -webkit-box;
		display: -webkit-flex;
		align-items: center;
		-webkit-box-align: center;
		-webkit-align-items: center;
		font-size: 0.3rem;
		margin: 0 auto;
		border-radius: 0.1rem;
	}

	.select-card img {
		height: 0.4rem;
		width: 0.58rem;
		margin: 0 0.15rem 0 0.27rem;
	}

	.bank-list {
		height: 1.45rem;
		width: 6.98rem;
		margin: 0.2rem auto 0 auto;
		display: flex;
		display: -webkit-box;
		display: -webkit-flex;
		align-items: center;
		-webkit-box-align: center;
		-webkit-align-items: center;
		background: #fff;
		border-radius: 0.1rem;
	}

	.bank-list img {
		width: 0.8rem;
		height: 0.8rem;
		margin-left: 0.25rem;
		margin-right: 0.2rem;
	}

	.bank-info .bank-title {
		font-size: 0.32rem;
		margin-bottom: 0.05rem;
	}

	.bank-info .bank-num {
		font-size: 0.26rem;
	}

	.btn {
		height: 0.75rem;
		width: 5.80rem;
		background: #ff5f1e;
		color: #fff;
		text-align: center;
		line-height: 0.75rem;
		margin: 0.75rem auto 0 auto;
		font-size: 0.32rem;
		border-radius: 0.15rem;
	}
</style>
