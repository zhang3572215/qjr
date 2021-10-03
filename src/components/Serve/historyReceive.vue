<template>
	<div class='containerHeight' @touchstart="touchStart($event)" @touchmove="touchMove($event)" @touchend="touchEnd($event)">
		<head-Piece :sign='"历史租赁"'>
			<template slot="content">历史租赁</template>
			<template slot="content-right">我要申领</template>
		</head-Piece>
		<div class='stages-content'>
			<div class='stages' v-for='(item,index) in list'>

				<div class='stages-info'>
					<div class='order-num'>
						<div class='order-no'>
							<img src='../../assets/order.png'></img>
							<span>申领编号：{{item.rendNo}}</span>
						</div>
						<div class='order-status'>
							<span v-if='item.status==1'>待付款</span>
							<span v-if='item.status==2'>已支付</span>
							<span v-if='item.status==3'>待提包</span>
							<span v-if='item.status==4'>已提包</span>
							<span v-if='item.status==5'>待退款</span>
							<span v-if='item.status==6'>退款完成</span>
						</div>
					</div>

				</div>
				<div class='stages-info' v-if='item.status<5'>
					<div>自提点：</div>
					<div class='info-right'>{{item.takePointPro}}{{item.takePointCity}}{{item.takePointDist}}{{item.takePointAddr}}</div>

				</div>
				<div class='stages-info' v-if='item.status>4'>
					<div>退还点：</div>
					<div class='info-right'>{{item.takePointPro}}{{item.takePointCity}}{{item.takePointDist}}{{item.takePointAddr}}</div>
				</div>
				<div class='stages-info' v-if='item.status==1 ||item.status==3'>
					<div>申领日期：</div>
					<div class='info-right'>{{item.rendDate }}</div>
				</div>

				<div class='stages-info' v-if='item.status<3'>
					<div>保证金：</div>
					<div class='info-right'>{{item.rendMoney }}</div>
				</div>
				<div class='stages-info' v-if='item.status>1 && item.status<5'>
					<div>付款日期：</div>
					<div class='info-right'>{{item.payTime}}</div>
				</div>
				<div class='stages-info' v-if='item.status==4'>
					<div>提包日期：</div>
					<div class='info-right'>{{item.sureTakeDate}}</div>
				</div>
				<div class='stages-info' v-if='item.status>4'>
					<div>退包日期：</div>
					<div class='info-right'>{{item.returnToolsDate}}</div>
				</div>
				<div class='stages-info' v-if='item.status>5'>
					<div>退款日期：</div>
					<div class='info-right'>{{item.returnMoneyTime}}</div>
				</div>
				<div class='stages-info' v-if='item.status>5'>
					<div>退款金额：</div>
					<div class='info-right'>{{item.returnMoney}}</div>
				</div>
				<!-- 	<div class='stages-info  stages-remark'>
					<div>特殊说明：</div>
					<textarea name="" id="" class='info-right three-adress-info' v-if='item.remark.length>0'>{{item.remark}}</textarea>
					<textarea name="" id="" class='info-right three-adress-info' v-else>无</textarea>
				</div> -->
				<div class='stages-btn' v-if='item.status !=2 && item.status!=5 &&  item.status!=6'>

					<!-- <div class='btn-right cancle-right'>
						取消
					</div> -->
					<div class='btn-right ' v-if='item.status==1' @click="toPay(item.id,item.rendMoney)">
						付款
					</div>
					<div class='btn-right ' v-if='item.status==3' @click='putSure(item.id)'>
						确认已提包
					</div>
					<div class='btn-right cancle-right' @click="returnPg(item.id)" v-if='item.status==4'>
						退还包
					</div>
				</div>
			</div>
		</div>
		<Load v-if='isLoad'></Load>
		<div class='total-success' v-if='isSuccess'>
			<div class='success-img'><img src="../../assets/true-1.png" alt=""></div>
			<div class='success-tit'>数据加载完了</div>
		</div>
		<empty v-if='showEmpty'></empty>
	</div>
</template>

<script>
	import {
		mapGetters
	} from 'vuex'
	import * as axios from '../../untils/ajax.js'
	export default {
		data() {
			return {
				pageNo: 1,
				pageSize: 10,
				list: [],
				wxChanne: '',
				isLoad: false,
				pullUpInfo: {
					moreText: '上拉加载更多',
					loadingText: '数据加载中...',
					noMoreText: '我是有底线的'
				},
				startX: 0,
				startY: 0,
				endX: 0,
				endY: 0,
				isSuccess: false,
				isFalse: false,
				showFlag: false,
				showVue: false,
				dateFlag: '',
				showFrame: false,
				nowDate: '',
				failInfo: '请求出错',
				biographyInfo: {},
				successInfo: '数据加载完了',
				showEmpty: false,
				signSuccess: 0,
				endListFalg: false,
				innerHeight: '',
				scrollTop: "",
				scrollHeight: '',
				contentHeight: '',
				signHeight: '',
				total: '',
				showEmpty: false

			}
		},
		computed: { ...mapGetters(['showApplyFalg'])
		},
		methods: {
			touchStart(e) {
				this.startX = e.touches[0].pageX
				this.startY = e.touches[0].pageY
				// this.successInfo = '数据加载完了'
			},
			touchMove(e) {
				this.endX = e.changedTouches[0].pageX
				this.endY = e.changedTouches[0].pageY
				let direction = this.getSlideDirection(this.startX, this.startY, this.endX, this.endY)
				switch (direction) {
					case 0:
						// console.log('没滑动')
						break
					case 1:
						// console.log('向上')
						this.scrollToTheEnd()
						break
					case 2:
						// console.log('向下')
						break
					case 3:
						// console.log('向左')
						break
					case 4:
						// console.log('向右')
						break
					default:
				}
			},
			touchEnd() {
				this.isLoading = false
			},
			scrollToTheEnd() {
				let innerHeight = document.querySelector('#app').clientHeight
				let contentHeight = document.querySelector('.containerHeight').offsetHeight
				// 变量scrollTop是滚动条滚动时，距离顶部的距离
				let scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop
				// 变量scrollHeight是滚动条的总高度
				let scrollHeight = document.documentElement.clientHeight || document.body.scrollHeight

				//变量scrollHeight是滚动条的总高度
				var scrollHeights = document.documentElement.scrollHeight || document.body.scrollHeight;
				this.innerHeight = scrollHeights
				this.scrollTop = scrollTop
				this.scrollHeight = scrollHeight
				this.contentHeight = contentHeight
				if (scrollTop == 0) {
					return
				}
				if (scrollTop + scrollHeight >= innerHeight) {
					if (this.pullUpState !== 3 && !this.isLoading) {
						this.infiniteLoad()
					}
				}
				console.log('距顶部' + scrollTop + '滚动条总高度' + scrollHeight + '内容高度' + innerHeight)
				let signHeight = Number(contentHeight) - (Number(innerHeight) + Number(scrollTop))
				let that = this
				if (signHeight < 60) {
					if (that.total <= that.list.length && that.total > 0) {

						that.signSuccess = that.signSuccess + 1

					}
				}

			},
			infiniteLoad() {
				if (this.total <= this.list.length) {
					// this.isSuccess = true
					// var that = this
					// setTimeout(() => {
					// 	that.isSuccess = false
					// }, 2000)
					this.endListFalg = true
					return
				}
				this.pullUpState = 2
				this.isLoading = true
				this.pageNo = this.pageNo + 1
				this.getList()
				// this.onInfiniteLoad(this.infiniteLoadDone)
			},

			/**
			 * 加载数据完成
			 */
			infiniteLoadDone() {
				this.pullUpState = 1
			},

			/**
			 * 返回角度
			 */
			getSlideAngle(dx, dy) {
				return Math.atan2(dy, dx) * 180 / Math.PI
			},

			/**
			 * 根据起点和终点返回方向 1：向上，2：向下，3：向左，4：向右,0：未滑动
			 * @param {number} startX X轴开始位置
			 * @param {number} startY X轴结束位置
			 * @param {number} endX Y轴开始位置
			 * @param {number} endY Y轴结束位置
			 */
			getSlideDirection(startX, startY, endX, endY) {
				let dy = startY - endY
				let dx = endX - startX
				let result = 0
				// 如果滑动距离太短
				if (Math.abs(dx) < 2 && Math.abs(dy) < 2) {
					return result
				}
				let angle = this.getSlideAngle(dx, dy)
				if (angle >= -45 && angle < 45) {
					result = 4
				} else if (angle >= 45 && angle < 135) {
					result = 1
				} else if (angle >= -135 && angle < -45) {
					result = 2
				} else if ((angle >= 135 && angle <= 180) || (angle >= -180 && angle < -135)) {
					result = 3
				}
				return result
			},
			returnPg(e) {
				let info = {
					id: e
				}
				this.$router.push({
					'name': 'giveBack',
					params: info
				})
			},
			getList(e) {
				if (!e) {
					this.isLoad = true
				}
				let params = new FormData()
				params.append('pageNo', this.pageNo)
				params.append('pageSize', this.pageSize)
				params.append('rendType', 1)
				axios.post('/office/t-office-tools-rend/getRendByBuyerId', params).then(res => {
					if (res.meta.success) {
						this.isLoad = false
						this.total = res.data.totalCounts
						if (res.data.records.length == 0) {

						} else {
							this.list = this.list.concat(res.data.records)
						}
						if (this.list.length == 0) {
							this.showEmpty = true
						}

					}
				})


			},
			toPay(id, num) {
				let params = new FormData()
				let that = this
				params.append('payableMoney', num)
				params.append('rendId', id)
				axios.post('/finance/payment/putPayRendByWx', params).then(res => {
					if (res.meta.success) {
						let orderInfo = JSON.stringify(res.data.payParams)

						plus.payment.request(that.wxChanne, orderInfo, function(result) {
							that.$toast('支付成功！')
							that.list = []
							that.pageNo = 1
							that.getList(1)
						}, function(e) {
							// plus.nativeUI.alert('更多错误信息请参考支付(Payment)规范文档：http://www.html5plus.org/#specification#/specification/Payment.html', null, '支付失败：' + e.code); 
						});
					}
				})

			},
			putSure(id) {
				let params = new FormData()

				params.append('rendId', id)
				axios.post('/office/t-office-tools-rend/putSureTakeById', params).then(res => {
					if (res.meta.success) {
						this.$toast('提包成功！')
						this.list = []
						this.pageNo = 1
						this.getList(1)

					}
				})

			}

		},
		created() {
			this.getList()
			let that = this
			that.wxChanne = null
			plus.payment.getChannels(function(channels) {
				for (var i in channels) {
					if (channels[i].id == "wxpay") {
						that.wxChanne = channels[i];
					} else if (channels[i].id == 'alipay') {
						// that.aliChannel = channels[i];
					}
				}
			}, function(e) {
				alert("获取支付通道失败：" + e.message);
			});
		},
		watch: {
			showApplyFalg() {
				this.list = []
				this.pageNo = 1
				this.getList()
			},
			signSuccess(val) {
				if (this.endListFalg) {
					let that = this
					this.successInfo = '数据加载完了'
					this.isSuccess = true

					setTimeout(() => {
						that.isSuccess = false
					}, 1000)
				}

			},
		}
	}
</script>

<style scoped>
	.stages-content {
		/* margin-top: 1.5rem; */
		padding-bottom: 0.20rem;
	}

	.stages {

		background: #fff;
		margin: 0.20rem auto 0 auto;
		width: 6.94rem;
		border-radius: 0.10rem;
		font-size: 0.12rem;
		color: #999;
		box-shadow: 0.05rem 0.05rem 0.10rem #ddd;

	}

	.stages-info img {
		height: 0.24rem;
		width: 0.19rem;
		margin-right: 0.08rem;
	}

	.stages-info .order-num {
		width: 100%;
		height: 100%;
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

	.stages-info .order-no {
		/* width: 100%; */
		height: 100%;
		display: flex;
		display: -webkit-box;
		display: -webkit-flex;
		align-items: center;
		-webkit-box-align: center;
		-webkit-align-items: center;
	}

	.stages-info .order-status {
		color: #333;
	}

	.stages>div {
		padding: 0 0.16rem;
		border-bottom: 1px solid #eee;
	}

	.stages>div:last-child {
		border-bottom: none;
	}

	.stages .stages-info {
		display: flex;
		display: -webkit-box;
		display: -webkit-flex;
		align-items: center;
		-webkit-box-align: center;
		-webkit-align-items: center;

		color: #97979f;
		font-size: 0.28rem;
		height: 0.71rem;
	}

	.info-right {
		color: #707070;
	}

	.stages-btn {
		height: 0.90rem;
		display: flex;
		display: -webkit-box;
		display: -webkit-flex;
		justify-content: flex-end;
		-webkit-justify-content: flex-end;
		align-items: center;
		-webkit-box-align: center;
		-webkit-align-items: center;

	}

	.btn-left {
		font-size: 0.28rem;
		width: 1.60rem;
		height: 0.58rem;
		line-height: 0.58rem;
		text-align: center;
		border: 1px solid #ff5f1e;
		border-radius: 0.15rem;
		color: #FF5F1E;
		box-sizing: border-box;
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
		margin-left: 0.20rem;
		box-sizing: border-box;
	}

	.btn-right.cancle-right {
		border: 1px solid #999 !important;
		color: #000 !important;
		background: #fff !important;
	}

	.btn-right.comment {
		border: 1px solid #ff5f1e !important;
		color: #ff5f1e !important;
		background: #fff !important;
	}

	.total-success {
		position: fixed;
		top: 5.7rem;
		background: rgba(44, 44, 44, 0.8);
		/* 	display: flex;
			flex-direction: column;
			align-items: center; */
		font-size: 0.28rem;
		color: #fff;
		width: 2.2rem;
		height: 2.15rem;
		border-radius: 0.15rem;
		left: 50%;
		transform: translateX(-50%);
		-webkit-transform: translateX(-50%);
		z-index: 1000;
	}

	.total-success .success-img {
		width: 100%;
		height: 1.4rem;
		position: relative;
		text-align: center;
	}

	.total-success img {
		width: 1.1rem;
		height: 1.05rem;
		margin-top: 0.35rem;
	}

	.total-success .success-tit {
		width: 100%;
		text-align: center;
	}
</style>
