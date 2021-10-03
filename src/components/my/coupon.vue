<template>
	<div class='containerHeight' @touchstart="touchStart($event)" @touchmove="touchMove($event)" @touchend="touchEnd($event)">
		<!-- <head-Piece  :sign='toback'> -->
		<head-Piece>
			<template slot="content">我的优惠券</template>
		</head-Piece>

		<div class='content-list'>
			<div class='list' v-for='(item,index) in list '>
				<div class='list-left'>
					<div class='money'>
						<div>￥</div>
						<div class='money-num'>{{item.denomination}}</div>
					</div>
					<div class='reduce'>
						减额券
					</div>
				</div>
				<div class='list-right'>
					<div class='coupon-tit'>{{item.name}}</div>
					<div class='coupon-info'>满{{item.enoughMoneys}}可用</div>
					<div class='coupon-btn'>
						<div class='btn' @click="toMeal(item.buyType)">
							立即使用
						</div>
					</div>
					<div class='validity'>
						有效期至：<span>{{item.dateStart}}—{{item.dateEnd}}</span>
						<!-- <span class='mr-left'></span> -->
					</div>
				</div>
			</div>
		</div>
		<empty v-if="showEmpty"></empty>
		<Load v-if='isLoad'></Load>
		<showSuccess v-if='isSuccess' :successInfo='successInfo'></showSuccess>
	</div>
</template>

<script>
	import * as axios from '../../untils/ajax.js'
	export default {
		data() {
			return {
				list: {},
				pageNo: 1,
				pageSize: 20,
				isLoad: false,
				showEmpty: false,
				toback: null,
				startX: 0,
				startY: 0,
				endX: 0,
				endY: 0,
				innerHeight: '',
				scrollTop: "",
				scrollHeight: '',
				contentHeight: '',
				signHeight: '',
				signSuccess: 0,
				successInfo: '',
				isSuccess: false,
				endListFalg: false,
			}
		},
		// onReachBottom() {
		// 	this.pageNo = this.pageNo + 1
		// 	if (this.list.length >= this.total) {
		// 		this.toast.success('数据加载完了')
		// 		return
		// 	}
		// 	this.getList()
		// },
		methods: {
			getList() {
				this.isLoad = true
				let that = this
				// let params = new FormData()
				// params.append('pageNo', this.pageNo)
				// params.append('pageSize', this.pageSize)
				let params = new FormData()
				params.append('pageNo', this.pageNo)
				params.append('pageSize', this.pageSize)
				axios.post('/business/t-business-coupon/getAllCoupons', params).then(res => {
					if (res.meta.success) {
						console.log(res.data)
						that.total = Number(res.data.totalCounts)
						let data = res.data.records.map(item => {
							let dateEnd = item.useEndTime.split(' ')
							item.dateEnd = dateEnd[0]
							let dateStart =item.useStartTime.split(' ')
							item.dateStart=dateStart[0]
							return item
						})
						if (that.pageNo === 1) {
							that.list = data
						} else {
							that.list = that.list.concat(data)
						}

						if (that.list.length == 0) {
							this.showEmpty = true
						}
						this.isLoad = false
					} else {
						this.isLoad = false
						this.$toast({
							message: '获取数据失败',
							duration: 1500
						})
						// this.toast.fail('获取数据失败')
					}

				})
			},
			toMeal(id) {
				this.$router.push('monthly')
				// if (id == 1) {
				// 	uni.navigateTo({
				// 		url: '/pages/home/countMeal?id=' + id
				// 	})
				// } else {
				// 	uni.navigateTo({
				// 		url: '/pages/home/monthly?id=' + id
				// 	})
				// }

			},
			touchStart(e) {
				this.startX = e.touches[0].pageX
				this.startY = e.touches[0].pageY


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
				this.isLoad = false
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
				// 滚动条到底部的条件

				if (scrollTop + scrollHeight >= innerHeight) {
					if (this.pullUpState !== 3 && !this.isLoad) {
						this.infiniteLoad()
					}
					// console.log('距顶部' + scrollTop + '滚动条总高度' + scrollHeight + '内容高度' + innerHeight)
				}
				let signHeight = Number(contentHeight) - (Number(innerHeight) + Number(scrollTop))
				let that = this
				// this.$toast({
				//     message: signHeight, duration: 1500
				// })
				if (signHeight < 60) {
					if (that.total <= that.list.length && that.total > 0) {
						that.signSuccess = that.signSuccess + 1

					}
				}
			},

			/**
			 * 上拉加载数据
			 */
			infiniteLoad() {
				this.pullUpState = 2
				let that = this
				if (this.list.length >= this.total) {
					// this.isSuccess = true
					// setTimeout(() => {
					// 	that.isSuccess = false
					// }, 2000)
					this.endListFalg = true
					return false
				}
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

		},
		created() {
			// if(options.stages){
			// 			   this.toback=options.stages
			// }
			this.getList()
			if (this.$route.params.isRead && this.$route.params.isRead == 2) {
				
			}
		},
		watch: {
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
	.list {
		height: 1.97rem;
		width: 6.83rem;
		margin: 0 auto 0.20rem auto;
		background-image: url('../../assets/coupon-1.png');
		/* background: #fff; */
		background-size: 100% 100%;
		display: flex;
		display: -webkit-box;
		display: -webkit-flex;
		align-items: center;
		-webkit-box-align: center;
		-webkit-align-items: center;
		/* line-height: 187upx; */
	}

	.list:first-child {
		margin-top: 0.20rem;
	}

	.list-left {
		width: 2.16rem;
		text-align: center;
		color: #fff;
		font-size: 0.30rem;
	}

	.list-left .money div {
		display: inline-block;
	}

	.list-left .money .money-num {
		font-size: 0.67rem;
	}

	.list-left .reduce {
		font-size: 0.25rem;
	}

	.list .list-right {
		width: 4.67rem;
		padding-left: 0.34rem;
		box-sizing: border-box;
	}

	.list-right .coupon-tit {
		font-size: 0.32rem;
		margin-top: -0.10rem;
	}

	.list-right .coupon-info {
		font-size: 0.24rem;
		color: #999;
		margin-top: 0.05rem;
	}

	.list-right .coupon-btn {
		display: flex;
		display: -webkit-box;
		display: -webkit-flex;
		align-items: center;
		-webkit-box-align: center;
		-webkit-align-items: center;
		justify-content: flex-end;
		-webkit-box-pack: end;
		-moz-justify-content: flex-end;
		-webkit-justify-content: flex-end;
	}

	.list-right .coupon-btn .btn {
		width: 1.24rem;
		height: 0.44rem;
		border: 1px solid #ff6323;
		color: #ff5f1e;
		border-radius: 0.50rem;
		text-align: center;
		font-size: 0.24rem;
		line-height: 0.46rem;
		margin-right: 0.27rem;
	}

	.list-right .validity {
		font-size: 0.18rem;
		margin-top: 0.12rem;
		color: #747474;
	}

	.mr-left {
		margin-left: 0.15rem;
	}
</style>
