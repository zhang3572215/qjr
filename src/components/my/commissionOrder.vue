<template>
	<div class='content' @scroll="scrollEvent">
		<div class='content-head' :class='showHead?"collageTop":""'>
			<div class='head' >
				<div class='head-title'>
					<div class='head-img' @click="tapreturn">
						<img src='../../assets/left-go.png'></img>
						<div>返回</div>
					</div>
					<div class='head-center'>
						收益订单
					</div>
					<div class='head-right'>

					</div>
				</div>


				<div class='classify'>
					<div class='order-num'>
						<div>{{info.orderNum}}</div>
						<div class='classify-title'>订单数</div>
					</div>
					<div class='totalMoney'>
						<div>{{info.estimateBrokerCount}}</div>
						<div class='classify-title'>预估总收益(元)</div>
					</div>
				</div>
			</div>
		</div>
		<div class='commission-date' :class='showHead?"collageTop":""'>
			<div :class='sign==1?"showColor":""' @click="collageColor(1)">
				<div>昨日</div>
			</div>
			<div :class='sign==2?"showColor":""' @click="collageColor(2)">
				<div>近30天</div>
			</div>
			<div :class='sign==0?"showColor":""' @click="collageColor(0)">
				<div>累计</div>
			</div>
		</div>
		<div class='show-head' :class='showHead?"collageTop":""'>

		</div>
		<!-- 	<div  class='containerHeight' ref="box" @touchstart="touchStart($event)"
			 @touchmove="touchMove($event)" @touchend="touchEnd($event)"    > -->

		<!-- <van-pull-refresh v-model="isLoading" @refresh="onRefresh"> -->
		<van-list :finished="finished" @load="onLoad" :offset="100" :immediate-check="false">
			<div class='order-list ' v-for='(item,index) in list' :key='index'>
				<div class='order-head'>
					<div class='head-dates'>
						<img src="../../assets/clock.png" alt="">
						<div>{{item.payTime}}</div>
					</div>
					<div class='head-type'>
						<span v-if='item.buyType==1'>单次</span>
						<span v-if='item.buyType==2'>包月</span>
						<span v-if='item.buyType==3'>包季</span>
						<span v-if='item.buyType==4'>包年</span>
					</div>

				</div>
				<div class='order-info'>
					<div class='order-detail'>
						<div class='order-num'>
							{{item.payableMoney}}
						</div>
						<div class='order-tit'>
							订单金额
						</div>
					</div>
					<div class='order-detail'>
						<div class='order-num'>
							{{item.estimateBroker}}
						</div>
						<div class='order-tit'>
							预计收益
						</div>
					</div>
					<div class='order-detail'>
						<div class='order-num'>
							{{item.totalNums}}
						</div>
						<div class='order-tit'>
							购买次数
						</div>
					</div>
					<div class='order-detail'>
						<div class='order-num'>
							{{item.leaveNums}}
						</div>
						<div class='order-tit'>
							剩余次数
						</div>
					</div>
				</div>
				<div class='address'>
					<img src="../../assets/address-8.png" alt="">
					<div class='address-info'>{{item.address}}{{item.detailAddr}}</div>
				</div>
			</div>
		</van-list>
		<!-- </van-pull-refresh> -->
		<!-- </div> -->
		<Load v-if='isLoad'></Load>
		<showSuccess v-if='isSuccess' :successInfo='successInfo'></showSuccess>
	</div>
</template>

<script>
	import * as axios from '../../untils/ajax.js'
	export default {
		data() {
			return {
				sign: 1,
				info: {},
				pageSize: 10,
				pageNo: 1,
				list: [],
				total: 0,
				isLoad: false,
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
				isLoading: false,
				loading: false,
				finished: false,
				showHead:false
			}
		},
		methods: {
			tapreturn() {
				this.$router.go(-1)
			},
			collageColor(e) {
				this.sign = e
				// document.body.scrollTop = document.documentElement.scrollTop =0
				this.getInfo()
				this.pageNo = 1
				this.list = []
				this.getList()
			},
			getInfo() {
				let params = new FormData()
				params.append('time', this.sign)
				axios.post('/business/t-business-estate/getBrokerOrderCount', params).then(res => {
					if (res.meta.success) {
						this.info = res.data
					}
				})

			},
			getList() {
				let params = new FormData()
				params.append('time', this.sign)
				params.append('pageSize', this.pageSize)
				params.append('pageNo', this.pageNo)
				this.isLoad = true
				axios.post('/business/t-business-estate/getBrokerOrderList', params).then(res => {
					this.isLoad = false
					if (res.meta.success) {
						this.total = res.data.totalCounts
						if (this.pageNo == 1) {
							this.list = res.data.records
						} else {
							this.list = this.list.concat(res.data.records)
						}

					}
				})
			},
			scrollEvent(e) {
				let topHeight = e.srcElement.scrollTop
				// alert(topHeight)
				this.scrollToTheEnd(topHeight)

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
						// this.scrollToTheEnd()
						this.scrollBottom = false
						break
					case 2:
						// console.log('向下')
						this.scrollBottom = true
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
			scrollToTheEnd(e) {
				// if (this.scrollBottom) {
				// 	return
				// }
				// let innerHeight = document.querySelector('#app').clientHeight
				// let contentHeight = document.querySelector('.containerHeight').offsetHeight
				// let showHeadHeight = document.querySelector('.show-head').offsetHeight
				// // 变量scrollTop是滚动条滚动时，距离顶部的距离
				// // let scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop
				// let scrollTop = e
				// // 变量scrollHeight是滚动条的总高度
				// let scrollHeight = document.documentElement.clientHeight || document.body.scrollHeight

				// //变量scrollHeight是滚动条的总高度
				// var scrollHeights = document.documentElement.scrollHeight || document.body.scrollHeight;
				// this.innerHeight = scrollHeights
				// this.scrollTop = e
				// this.scrollHeight = scrollHeight
				// this.contentHeight = contentHeight * this.list.length
				// // 滚动条到底部的条件
				// if (scrollTop + innerHeight >= scrollHeight) {
				// 	if (this.pullUpState !== 3 && !this.isLoad) {
				// 		this.infiniteLoad()
				// 	}
				// 	// console.log('距顶部' + scrollTop + '滚动条总高度' + scrollHeight + '内容高度' + innerHeight)
				// }
				// let signHeight = Number(contentHeight) - (Number(innerHeight) + Number(scrollTop))

				// let that = this
				// // this.$toast({
				// //     message: signHeight, duration: 1500
				// // })

				// // alert('sc'+scrollTop+'inn'+innerHeight+'scroll'+scrollHeight+' 内容'+contentHeight)
				// console.log('sc' + scrollTop + 'inn' + innerHeight + 'scroll' + scrollHeight + ' 内容' + contentHeight)
				// if (scrollTop + innerHeight - showHeadHeight >= contentHeight) {
				// 	// alert('sc'+scrollTop+'inn'+innerHeight+'scroll'+scrollHeight+' 内容'+contentHeight)
				// 	if (that.total <= that.list.length && that.total > 0) {
				// 		that.signSuccess = that.signSuccess + 1

				// 	}
				// }
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

			//下拉刷新
			onRefresh() {
				this.page = 1
				this.finished = false
				this.getList()
			},
			//上拉加载
			onLoad() {
				if (this.isLoad) {
					return
				}
				// 异步更新数据
				if (this.total <= this.list.length && this.total > 0) {
					let that = this
					this.successInfo = '数据加载完了'
					this.isSuccess = true

					setTimeout(() => {
						that.isSuccess = false
					}, 1000)
					return
				}
				this.pageNo = this.pageNo + 1
				this.getList()

			},

		},
		created() {
			if (window.localStorage.getItem('wxBrowser')) {
				this.showHead = true
			}
			this.getInfo()
			this.getList()
		},
		mounted() {
			// let winHeight = document.documentElement.clientHeight                 //视口大小
			//       document.getElementById('list-content').style.minHeight = (winHeight - 82) +'px'  //调整上拉加载框高度

			// window.addEventListener("scroll",this.scrollEvent); 
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
	.content {
		height: 100%;
		overflow-x: hidden;
		/* width: 100vw; */
		/* background: #fff; */
	}

	.content-head {
		position: fixed;
		top: 0;
		height: 3.9rem;
		width: 100%;
		/* background-image: url('../../assets/picture-1.png'); */
		background: linear-gradient(to bottom, #f89d3e, #f67024);
		/* background-size: 100% 124%; */
		z-index: 1000;
	}
  .content-head.collageTop{
	  height: 3.5rem;
  }
	.head {
		padding-top: 0.65rem;
		text-align: center;
		width: 100%;
		position: relative;
		font-size: 0.36rem;
		color: #fff;

	}
    .collageTop .head{
		padding-top: 0.3rem;
	}
	.head .head-title {
		display: flex;
		display: -webkit-box;
		display: -webkit-flex;
		align-items: center;
		-webkit-box-align: center;
		-webkit-align-items: center;
	}

	.head .head-img {
		display: flex;
		display: -webkit-box;
		display: -webkit-flex;
		align-items: center;
		-webkit-box-align: center;
		-webkit-align-items: center;
		width: 30%;
		font-size: 0.32rem;

	}

	.head .head-img img {
		width: 0.18rem;
		height: 0.32rem;
		margin-right: 0.12rem;
		margin-left: 0.28rem;
	}

	.head .head-center {
		width: 40%;
		text-align: center;
	}

	/* .head .head-img  div{
	  line-height: 0.5rem;
  } */
	.head-right {
		width: 30%;
	}

	.classify {
		display: flex;
		display: -webkit-box;
		display: -webkit-flex;
		align-items: center;
		-webkit-box-align: center;
		-webkit-align-items: center;
		width: 100%;
		font-size: 0.38rem;
		margin-top: 0.85rem;
		z-index: 1000;
	}

	.classify .order-num {
		width: 50%;

	}

	.classify .totalMoney {
		width: 50%;
	}

	.classify .classify-title {
		font-size: 0.3rem;
	}

	.commission-date {
		position: fixed;
		top: 3.9rem;
		left: 50%;
		transform: translate(-50%, -50%);
		-webkit-transform: translate(-50%, -50%);
		height: 1.12rem;
		width: 6.94rem;
		background: #fff;
		margin: 0 auto;
		display: flex;
		display: -webkit-box;
		display: -webkit-flex;
		align-items: center;
		-webkit-box-align: center;
		-webkit-align-items: center;
		font-size: 0.3rem;
		/* margin-top: -0.56rem;
		margin-bottom: 0.4rem; */
		border-radius: 0.2rem;
		padding: 0 0.15rem;
		box-sizing: border-box;
		box-shadow: 0px 2px 0px #eee;
		z-index: 1000;
	}
	.commission-date.collageTop{
		top: 3.5rem;
	}

	.commission-date>div {
		flex: 1;
		-webkit-box-flex: 1;
		-webkit-flex: 1;
		height: 0.5rem;

		/* text-align: center; */

		display: flex;
		display: -webkit-box;
		display: -webkit-flex;
		align-items: center;
		-webkit-box-align: center;
		-webkit-align-items: center;
		justify-content: center;
		-webkit-box-pack: center;
		-webkit-justify-content: center;
	}

	.commission-date>div>div {
		width: 1.5rem;
		height: 100%;
		display: flex;
		display: -webkit-box;
		display: -webkit-flex;
		align-items: center;
		-webkit-box-align: center;
		-webkit-align-items: center;
		justify-content: center;
		-webkit-box-pack: center;
		-webkit-justify-content: center;
		font-size: 0.3rem;
		border-radius: 0.35rem;
	}

	.commission-date>div.showColor>div {
		background: #ec5300 !important;
		color: #fff !important;


	}

	.show-head {
		height: 4.8rem;
	}
  .show-head.collageTop{
	  height: 4.3rem;
  }
	.containerHeight {
		/* overflow-x: hidden; */
		/* height: 100%; */
	}

	.order-list {
		background: #fff;
		margin: 0 auto;
		border-radius: 0.1rem;
		width: 6.94rem;
		box-shadow: 0px 2px 0px #eee;
		margin-bottom: 0.3rem;
	}

	.order-head {
		height: 0.9rem;
		display: flex;
		display: -webkit-box;
		display: -webkit-flex;
		align-items: center;
		-webkit-box-align: center;
		-webkit-align-items: center;
		justify-content: space-between;
		-webkit-box-pack: justify;
		-webkit-justify-content: space-between;
		padding-left: 0.2rem;
		box-sizing: border-box;
	}

	.head-dates {
		display: flex;
		display: -webkit-box;
		display: -webkit-flex;
		align-items: center;
		-webkit-box-align: center;
		-webkit-align-items: center;
		font-size: 0.28rem;
	}

	.head-dates img {
		height: 0.37rem;
		width: 0.37rem;
		margin-right: 0.12rem;
	}

	.head-type {
		color: #ec5300;
		font-size: 0.28rem;
		margin-right: 0.36rem;
	}

	.order-info {
		height: 1rem;
		display: flex;
		display: -webkit-box;
		display: -webkit-flex;
		align-items: center;
		-webkit-box-align: center;
		-webkit-align-items: center;
		font-size: 0.28rem;
	}

	.order-detail {
		flex: 1;
		-webkit-box-flex: 1;
		-webkit-flex: 1;
		color: #141418;
		text-align: center;
	}

	.order-detail .order-num {
		color: #4d4d4d;
		margin-bottom: 0.05rem;
	}

	.address {
		padding: 0.15rem 0;
		display: flex;
		display: -webkit-box;
		display: -webkit-flex;
		align-items: center;
		-webkit-box-align: center;
		-webkit-align-items: center;
		font-size: 0.26rem;
	}

	.address img {
		margin-left: 0.2rem;
		margin-right: 0.24rem;
		width: 0.23rem;
		height: 0.28rem;

	}

	.address .address-info {
		width: 6rem;
		word-wrap: break-word;
		word-break: break-all;
		/* white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis; */
		/* line-height: 0.26rem; */
	}
</style>
