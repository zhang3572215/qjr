<template>
	<div>
		<head-Piece>
			<template slot="content">我要申领</template>
		</head-Piece>
		<img src="../../assets/apply-info.jpg" alt="" class='content'>
		<div class='content-bottom'>
			<div class='apply-content' @click='toSelect'>
				<div class=''>
					自提点：
				</div>
				<div class='showAddress' v-if='address.length==0'>请选择地址</div>
				<div class='collageAddress' v-else>{{address}}</div>
			</div>
			<div class='apply-content'>
				<div>
					保证金额：
				</div>
				￥337.1
			</div>
			<div class='apply-content'>
				<div class='btn-right' @click="postRend">
					提交申领单
				</div>
			</div>
		</div>
		<van-popup v-model="showPicker" position="bottom">
			<van-picker show-toolbar :columns="columns" @cancel="showPicker = false" @confirm="onConfirm" />
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
				isLoad: false,
				showPicker: false,
				columns: [],
				address: '',
				addressList: [],
				id: ''
			}
		},
		computed: { ...mapGetters(['showApplyFalg'])
		},
		methods: {
			...mapActions(['collageApplyFalg']),
			postRend() {
				if (this.id.length == 0) {
					this.$toast('请选择提取地点')
					return
				}
				let params = new FormData()
				params.append("type", 1)
				params.append('takePointId', this.id)
				params.append('rendMoney', 337.1)
				this.isLoad = true
				let that=this
				axios.post('/office/t-office-tools-rend/postRend', params).then(res => {
					if (res.meta.success) {
						this.isLoad = false
						let num = this.showApplyFalg + 1
						this.collageApplyFalg(num)
						this.$toast('提交成功')
						setTimeout(()=>{
							that.$router.go(-1)
						},600)
						
					}
				})
			},
			getInfo() {
				this.isLoad = true
				axios.post('/office/t-office-tools-point/getToolsPointList', {}).then(res => {
					if (res.meta.success) {
						let data = res.data
						data.forEach(item => {
							let addressInfo = item.province + item.city + item.district + item.address
							let info = {
								address: addressInfo,
								id: item.id
							}
							this.addressList.push(info)
							this.columns.push(addressInfo)
						})
						this.isLoad = false
					}
				})
			},
			onConfirm(value, index) {
				this.address = value;
				this.showPicker = false;
				this.id = this.addressList[index].id
			},
			toSelect() {
				this.showPicker = true
			},

		},
		created() {
			this.getInfo()
		}
	}
</script>

<style scoped>
	.content {
		margin-top: -0.2rem;
		width: 100vw;
		padding-bottom: 2.25rem;
	}

	.content-bottom {
		position: fixed;
		bottom: 0;
		width: 100vw;
		background: #fff;
		box-shadow: -5px -5px 10px #eee;
	}

	.apply-content {
		height: 0.8rem;
		border-bottom: 1px solid #eee;
		display: flex;
		align-items: center;
		font-size: 0.30rem;
		padding-left: 0.28rem;
	}

	.apply-content .showAddress {
		color: #ccc;
	}

	.apply-content .collageAddress {
		color: #000;
	}

	.apply-content:nth-child(3) {
		border: none;
		display: flex;
		display: -webkit-box;
		display: -webkit-flex;
		align-items: center;
		-webkit-box-align: center;
		-webkit-align-items: center;
		justify-content: flex-end;
		-webkit-box-pack: end;
		-webkit-justify-content: flex-end;
	}

	.btn-right {
		font-size: 0.28rem;
		width: 1.60rem;
		height: 0.58rem;
		line-height: 0.58rem;
		text-align: center;
		border: 1px solid #ff5f1e;
		border-radius: 0.15rem;
		color: #fff;
		background-color: #ff5f1e;
		box-sizing: border-box;
		margin-right: 0.2rem;
	}
</style>
