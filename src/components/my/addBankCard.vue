<template>
	<div>
		<head-Piece>
			<template slot="content">添加银行卡</template>
		</head-Piece>

		<div class='content'>
			<div class='card'>
				<div>开户名</div>
				<input type="text" v-model="accountName" placeholder="请输入银行卡户名">
			</div>
			<div class='card' @click='toSelect()'>
				<div>开户银行</div>
				<input type="text" disabled="true" placeholder="请选择开户银行" :value='bankName '>
			</div>
			<div class='card'>
				<div>开户支行</div>
				<input type="text" v-model="bankSecName" placeholder="请输入开户支行">
			</div>
			<div class='card'>
				<div>银行卡号</div>
				<input  type="number" :value="accountNo" @input="handleInput" placeholder="请输入银行卡号">
			</div>
			<div class='card'>
				<div>手机号码</div>
				<input type="number"  v-model="mobile" placeholder="请输入手机号码">
			</div>
		</div>
		<div class='btn' @click='addBank'>
			确认添加
		</div>
		<van-popup v-model="showPicker" position="bottom">
			<van-picker show-toolbar :columns="array" @cancel="showPicker = false" @confirm="onConfirm" />
		</van-popup>
		<Load v-if='isLoad'></Load>
	</div>
</template>

<script>
	import * as axios from '../../untils/ajax.js'
	import {
		mapActions,
		mapGetters
	} from 'vuex'
	export default {
		data() {
			return {
				showPicker: false,
				array: ['中国银行', '建设银行', '农业银行', '工商银行', '交通银行', '招商银行', '兴业银行', '厦门银行', '民生银行', '中国邮政储蓄银行'],
				accountName: '',
				bankName: '',
				accountNo: '',
				bankSecName: '',
				mobile: '',
				isLoad: false,
			}
		},
		computed: { ...mapGetters(['showBankFlag'])
		},
		methods: {
			...mapActions(['collageBankFlag']),
			toSelect() {
				this.showPicker = true;
			},
			onConfirm(value) {
				this.bankName = value;
				this.showPicker = false;
			},
			isPhoneNumber(tel) {
				var reg = /^0?1[3|4|5|6|7|8][0-9]\d{8}$/;
				return reg.test(tel);
			},
			handleInput(e) {
				this.accountNo= e.target.value.replace(/[^\d]/g, '');
			},
			addBank() {

				if (this.bankName.length == 0) {
					this.$toast({
						message: '请选择开户银行',
						duration: 1000
					})
					return
				} else if (this.accountName.length == 0) {
					this.$toast({
						message: '请填写开户名',
						duration: 1000
					})
					return
				} else if (this.bankSecName.length == 0) {
					this.$toast({
						message: '请填写开户支行',
						duration: 1000
					})
					return
				} else if (this.accountNo.length == 0) {
					this.$toast({
						message: '请填写银行卡号',
						duration: 1000
					})
					return
				}

				if (this.accountNo.length <16 || this.accountNo.length >19) {
					this.$toast({
						message: '银行卡号错误',
						duration: 1000
					})
					return
				}

				if (this.mobile.length === 0) {
					this.$toast({
						message: '请填写手机号',
						duration: 1000
					})
					return
				} else if (this.mobile.length > 0) {
					if (this.mobile.length < 11) {
						// this.toast.fail('号码填写不正确')
						this.$toast({
							message: '号码填写不正确',
							duration: 1000
						})
						return
					}
					if (!this.isPhoneNumber(this.mobile)) {
						// this.toast.fail('号码格式不对')
						this.$toast({
							message: '号码格式不对',
							duration: 1000
						})
						return
					}
				}

				let params = new FormData()
				params.append('bankName', this.bankName)
				params.append('accountName', this.accountName)
				params.append('bankSecName', this.bankSecName)
				params.append('accountNo', this.accountNo)
				params.append('mobile', this.mobile)
				this.isLoad = true
				let that = this
				axios.post('/business/t-business-bank/postBankCard', params).then(res => {
					this.isLoad = false
					if (res.meta.success) {
						let num = this.showBankFlag + 1
						this.collageBankFlag(num)
						setTimeout(() => {
							that.$toast({
								message: '添加成功',
								duration: 600
							})
						}, 100)
						setTimeout(() => {
							that.$router.go(-1)
						}, 600)
					} else {
						this.$toast({
							message: '添加失败',
							duration: 1000
						})
					}
				})

			}
		}
	}
</script>

<style scoped>
	.content {
		background: #fff;
		box-shadow: 5px 5px 10px #e8e8e8;
	}

	.card {
		height: 0.9rem;
		padding: 0 0.28rem;
		font-size: 0.28rem;
		display: flex;
		display: -webkit-box;
		display: -webkit-flex;
		align-items: center;
		-webkit-box-align: center;
		-webkit-align-items: center;
		justify-content: space-between;
		-webkit-box-pack: justify;
		-webkit-justify-content: space-between;
		height: 0.75rem;
		border-bottom: 1px solid #e8e8e8;
	}

	.card:last-child {
		border: none;
	}

	.card input {
		border: none;
		text-align: right;
		font-size: 0.28rem;
	}

	.card input::-webkit-input-placeholder {
		color: #e2e2e2;
		font-size: 0.28rem;
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

	input[disabled],
	input:disabled,
	input.disabled {

		background: #fff;
	}
</style>
