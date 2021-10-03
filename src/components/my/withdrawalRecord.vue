<template>
	<div>
		<head-Piece>
			<template slot="content">提现记录</template>
		</head-Piece>

		<div class='content-head' :class='showHead?"collageTop":""'>
			<div>
				打款笔数：{{info.advanceNum}}笔
			</div>
			<div>
				打款金额：{{info.advanceMoney}}元
			</div>
		</div>
		<div class='content-head-show' :class='showHead?"collageTop":""'>

		</div>
		<div class='info-list' v-for='(item,index) in list ' :Key='index'>
			<div class='list-top'>
				<div>{{item.accountNo}}</div>
				<div>￥{{item.advanceMoney}}</div>
			</div>
			<div class='list-bottom'>
				<div class='list-time'>{{item.applyTime}}</div>
				<div class='list-bottom-rg'>
					<div v-if='item.applyStatus==1'>待审核</div>
					<div v-if='item.applyStatus==2 || item.applyStatus==3'>审核通过</div>
					<div v-if='item.applyStatus==2'>
						待打款
					</div>
					<div v-if='item.applyStatus==3'>
						已打款
					</div>
					<div v-if='item.applyStatus==4'>审核不通过</div>
					<div class='btn' v-if='item.applyStatus==1 || item.applyStatus==2' @click="cancel(item.id,index)">
						取消
					</div>
				</div>
			</div>
		</div>
		<Load v-if='isLoad'></Load>
		<showMoadel v-if='modelSign' :cont='"是否要取消提现?"' @define='confirms' @remove='cancels'></showMoadel>
		<empty v-if="showEmpty"></empty>
	</div>
</template>

<script>
	import * as axios from '../../untils/ajax.js'
	export default {
		data() {
			return {
				pageSize: 1000,
				pageNo: 1,
				isLoad: false,
				info: {},
				list: [],
				modelSign: false,
				id: '',
				signIndex: '',
				showEmpty: false,
				showHead: false
			}
		},
		methods: {
			getInfo() {
				axios.post('/business/t-business-estate-advance/getAdvanceCount').then(res => {
					if (res.meta.success) {
						this.info = res.data
					}
				})
			},
			getList() {
				let params = new FormData()
				params.append('pageSize', this.pageSize)
				params.append('pageNo', this.pageNo)
				this.isLoad = true
				axios.post('/business/t-business-estate-advance/getAdvanceList', params).then(res => {
					this.isLoad = false
					if (res.meta.success) {
						this.list = res.data.records.map(val => {
							val.accountNo = this.bankNum(val.accountNo)
							return val
						})
						if (this.list.length == 0) {
							this.showEmpty = true
						}
					}
				})
			},
			bankNum(e) {

				var str = e
				var reg = /^(\d{4})\d+(\d{4})$/;
				str = str.replace(reg, "$1 **** **** $2");
				return str
			},
			cancel(e, num) {
				this.id = e
				this.signIndex = num
				this.modelSign = true
			},
			cancels() {
				this.modelSign = false
			},
			confirms() {
				this.modelSign = false
				this.deleteAdvance()
			},
			deleteAdvance() {
				let params = new FormData()
				params.append('advanceId', this.id)
				this.isLoad = true
				axios.post('/business/t-business-estate-advance/deleteAdvance', params).then(res => {
					this.isLoad = false
					if (res.meta.success) {
						this.list.splice(this.signIndex, 1)
						if (this.list.length == 0) {
							this.showEmpty = true
						}
						this.$toast({
							message: '取消成功',
							duration: 1000
						})
					} else {
						this.$toast({
							message: '取消失败',
							duration: 1000
						})
					}

				})
			}

		},
		created() {
			if (window.localStorage.getItem('wxBrowser')) {
				this.showHead = true
			}
			// this.showHead = true
			this.getInfo()
			this.getList()
		}
	}
</script>

<style scoped>
	.content-head {
		position: fixed;
		top: 1.28rem;
		width: 100%;
		height: 0.86rem;
		background: #f1f1f1;
		display: flex;
		display: -webkit-box;
		display: -webkit-flex;
		justify-content: space-between;
		-webkit-box-pack: justify;
		-webkit-justify-content: space-between;
		align-items: center;
		-webkit-box-align: center;
		-webkit-align-items: center;
		font-size: 0.28rem;
		padding: 0 0.25rem;
		box-sizing: border-box;
	}

	.content-head.collageTop {
		margin-top: -0.38rem;
	}

	.content-head-show {
		height: 0.86rem;
	}

	.content-head-show.collageTop {
		margin-top: -0.38rem;
	}

	.info-list {
		background: #fff;
		width: 100%;
		height: 1.5rem;
		border-bottom: 1px solid #d9d9d9;
		padding: 0 0.25rem;
		box-sizing: border-box;
		display: flex;
		display: -webkit-box;
		display: -webkit-flex;
		flex-direction: column;
		-webkit-box-direction: normal;
		-webkit-box-orient: vertical;
		-webkit-flex-direction: column;
		justify-content: center;
		-webkit-box-pack: center;
		-webkit-justify-content: center;
	}

	.info-list:last-child {
		border: none;
	}

	.info-list .list-top {
		font-size: 0.32rem;
		width: 100%;
		display: flex;
		display: -webkit-box;
		display: -webkit-flex;
		align-items: center;
		-webkit-box-align: center;
		-webkit-align-items: center;
		justify-content: space-between;
		-webkit-box-pack: justify;
		-webkit-justify-content: space-between;
		margin-bottom: 0.15rem;
	}

	.info-list .list-bottom {
		width: 100%;
		font-size: 0.26rem;
		display: flex;
		display: -webkit-box;
		display: -webkit-flex;
		align-items: center;
		-webkit-box-align: center;
		-webkit-align-items: center;
		justify-content: space-between;
		-webkit-box-pack: justify;
		-webkit-justify-content: space-between;
	}

	.info-list .list-bottom-rg {
		display: flex;
		display: -webkit-box;
		display: -webkit-flex;
		align-items: center;
		-webkit-box-align: center;
		-webkit-align-items: center;
		color: #ff6a30;

	}

	.info-list .list-bottom-rg>div {
		margin-right: 0.1rem;
	}

	.info-list .list-bottom-rg>div:last-child {
		margin-right: 0;
	}

	.list-bottom-rg .btn {
		font-size: 0.26rem;
		height: 0.35rem;
		width: 0.8rem;
		background: #ff3a31;
		color: #fff;
		display: flex;
		display: -webkit-box;
		display: -webkit-flex;
		align-items: center;
		-webkit-box-align: center;
		-webkit-align-items: center;
		justify-content: center;
		-webkit-box-pack: center;
		-webkit-justify-content: center;
		/* text-align: center;
		line-height: 0.35rem; */
		border-radius: 0.05rem;

	}

	.list-bottom .list-time {
		color: #97979f;
	}
</style>
