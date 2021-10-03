<template>
	<div class='content' @scroll="scrollEvent">
		<div class='content-head' :class='showHead?"collageTop":""'>
			<div class='head'>
				<div class='head-title'>
					<div class='head-img' @click="tapreturn">
						<img src='../../assets/left-go.png'></img>
						<div>返回</div>
					</div>
					<div class='head-center'>
						收益流水
					</div>
					<div class='head-right'>

					</div>
				</div>


				<div class='classify'>
					<div class='order-num'>
						<div>{{info.serverNum}}</div>
						<div class='classify-title'>清洁服务次数</div>
					</div>
					<div class='totalMoney'>
						<div>{{info.brokerMoney}}</div>
						<div class='classify-title'>收益金额(元)</div>
					</div>
				</div>
			</div>

		</div>
		<div class='commission-date' :class="[list.length==0?'showRadius':'',showHead?'collageTop':'']">
			<div :class='sign==1?"showColor":""' @click="collageColor(1)">
				<div>昨日</div>
			</div>
			<div :class='sign==2?"showColor":""' @click="collageColor(2)">
				<div>今天</div>
			</div>
			<div :class='sign==3?"showColor":""' @click="collageColor(3)">
				<div>近1周</div>
			</div>
			<div :class='sign==4?"showColor":""' @click="collageColor(4)">
				<div>近30天</div>
			</div>
			<div :class='sign==0?"showColor":""' @click="collageColor(0)">
				<div>全部</div>
			</div>
		</div>
		<div class='showInfo' :class='showHead?"collageTop":""'>

		</div>
		<!-- <div class='info  containerHeight'  @touchstart="touchStart($event)" @touchmove="touchMove($event)"
		 @touchend="touchEnd($event)"> -->
		<van-list :finished="finished" @load="onLoad" :offset="10" :immediate-check="false">
			<div class='turnover-list'>
				<div class='turnover-content' v-for="(item,index) in list" :key='index'>
					<div class='turnover-info'>
						<div class='turnover-time'>
							<div class='turnover-week'>
								{{item.week}}
							</div>
							<div class='turnover-date'>
								{{item.date}}
							</div>
							<div class='turnover-date'>
								{{item.time}}
							</div>
						</div>
						<div class='turn-category'>
							<div class='caregory-info'>
								<div class='caregory-title title-tips-red' v-if='item.type==1'>
									收入
								</div>
								<div class='caregory-title title-tips-green' v-else>
									支出
								</div>
								<div class='caregory-num num-color'>
									{{item.brokerMoeny}}
								</div>
							</div>
							<div class='caregory-info'>
								<div lass='caregory-title'>
									余额
								</div>
								<div class='caregory-num'>
									{{item.afterBrokerMoeny }}
								</div>
							</div>
							<div class='caregory-info'>
								<div lass='caregory-title'>
									摘要
								</div>
								<div class='caregory-num' v-if='item.type==1'>
									收益收入
								</div>
								<div class='caregory-num' v-else>
									提现
								</div>
							</div>
							<div class='caregory-info' v-if='item.type==1' @click="collageDetail(index)">
								<div class='caregory-title   caregory-detail-tips'>
									详细
									<img v-if='!item.flagType' src="../../assets/bottom-to.png" alt="">
									<img v-else src="../../assets/bottom-to-1.png" alt="">
								</div>
								<!-- 	<div class='caregory-num'>
								收益收入
							</div> -->
							</div>
						</div>
					</div>
					<div class='turnover-bottom' v-if='item.type==1 && item.flagType'>
						<div>
							<span v-if='item.appointType==1'>深度清洁</span>
							<span v-else>日常清洁</span>
							<div>
								{{item.brokerDate}}
							</div>
						</div>
						<div class='address-info'>
							{{item.address}}{{item.detailAddr}}
						</div>
					</div>
				</div>
				<!-- </div> -->
			</div>
		</van-list>
		<!-- 加载框 -->
		<Load v-if='isLoad'></Load>
		<!-- 弹框 -->
		<showSuccess v-if='isSuccess' :successInfo='successInfo'></showSuccess>
	</div>
</template>

<script>
	import * as axios from '../../untils/ajax.js'
	export default {
		data() {
			return {
				sign: 1,
				info: {
					serverNum: 0,
					brokerMoney: 0
				},
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
				detailFalg: false,
				isLoading: false,
				loading: false,
				finished: false,
				showHead: false
			}
		},
		methods: {
			tapreturn() {
				this.$router.go(-1)
			},
			//切换日期
			collageColor(e) {
				this.sign = e
				this.getInfo()
				this.list = []
				this.pageNo = 1
				this.getList()
			},
			collageDetail(index) {
				this.list[index].flagType = !this.list[index].flagType
			},
			getInfo() {
				let params = new FormData()
				params.append('time', this.sign)
				axios.post('/business/t-business-estate-broker/getEstateBrokerCount', params).then(res => {
					if (res.meta.success) {
						this.info = res.data
					}
				})

			},
			//获取数据
			getList() {
				let params = new FormData()
				params.append('time', this.sign)
				params.append('pageSize', this.pageSize)
				params.append('pageNo', this.pageNo)
				this.isLoad = true
				axios.post('/business/t-business-estate-broker/getEstateBrokerList', params).then(res => {
					this.isLoad = false
					if (res.meta.success) {
						this.total = res.data.totalCounts
						let data = res.data.records.map(val => {
							let dates = val.createTime.split(" ")
							val['week'] = this.getMyDay(new Date(dates[0]))
							val['date'] = dates[0]
							val['time'] = dates[1]
							if (val['type'] == 1) {
								val['flagType'] = false
							}

							return val
						})
						if (this.pageNo == 1) {
							this.list = data
						} else {
							this.list = this.list.concat(data)
						}

					}
				})
			},
			//获取周几
			getMyDay(date) {
				var week;
				if (date.getDay() == 0) week = "周日"
				if (date.getDay() == 1) week = "周一"
				if (date.getDay() == 2) week = "周二"
				if (date.getDay() == 3) week = "周三"
				if (date.getDay() == 4) week = "周四"
				if (date.getDay() == 5) week = "周五"
				if (date.getDay() == 6) week = "周六"
				return week;
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
			scrollEvent(e) {

				let topHeight = e.srcElement.scrollTop
				this.scrollToTheEnd(topHeight)

			},
			scrollToTheEnd(e) {
				// if (this.scrollBottom) {
				// 	return
				// }
				// let innerHeight = document.querySelector('#app').clientHeight
				// let contentHeight = document.querySelector('.containerHeight').offsetHeight
				// let showInfoHeight = document.querySelector('.showInfo').offsetHeight
				// // 变量scrollTop是滚动条滚动时，距离顶部的距离
				// // let scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop
				// let scrollTop = e
				// // 变量scrollHeight是滚动条的总高度
				// let scrollHeight = document.documentElement.clientHeight || document.body.scrollHeight

				// //变量scrollHeight是滚动条的总高度
				// var scrollHeights = document.documentElement.scrollHeight || document.body.scrollHeight;
				// this.innerHeight = scrollHeights
				// this.scrollTop = scrollTop
				// this.scrollHeight = scrollHeight
				// this.contentHeight = contentHeight
				// // 滚动条到底部的条件
				// // alert( scrollHeight)
				// if (scrollTop + innerHeight >= scrollHeight) {

				// 	if (this.pullUpState !== 3 && !this.isLoad && this.list.length < this.total) {

				// 		this.infiniteLoad()
				// 	}
				// 	// console.log('距顶部' + scrollTop + '滚动条总高度' + scrollHeight + '内容高度' + innerHeight+'info'+contentHeight)
				// }
				// let signHeight = Number(contentHeight) - Number(scrollTop)

				// let that = this
				// // this.$toast({
				// //     message: signHeight, duration: 1500
				// // })
				// // console.log('距顶部' + scrollTop + '滚动条总高度' + scrollHeight + '内容高度' + innerHeight+'info'+contentHeight+'show'+showInfoHeight)
				// if (scrollTop + innerHeight - showInfoHeight >= contentHeight) {

				// 	if (that.total <= that.list.length && that.total > 0) {
				// 		this.successInfo = '数据加载完了'
				// 		this.isSuccess = true

				// 		setTimeout(() => {
				// 			that.isSuccess = false
				// 		}, 1000)

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
				// 异步更新数据
				if (this.isLoad) {
					return
				}
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
			// this.showHead = true
			this.getInfo()
			this.getList()
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
		width: 100vw;
		height: 100%;
		overflow-x: hidden;
		/* background: #fff; */
	}

	.content-head {
		position: fixed;
		top: 0;
		height: 3.9rem;
		width: 100%;
		z-index: 1;
		/* background-image: url('../../assets/picture-1.png'); */
		background: linear-gradient(to bottom, #f89d3e, #f67024);
		/* background-size: 100% 124%; */
	}

	.content-head.collageTop {
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
		/* margin-top: -0.56rem; */
		border-radius: 0.2rem 0.2rem 0 0;
		padding: 0 0.15rem;
		box-sizing: border-box;
		z-index: 1;

	}
    .commission-date.collageTop{
    	top: 3.5rem;
    }
    
	.commission-date.showRadius {
		border-radius: 0.2rem !important;
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
		width: 1.25rem;
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

	.showInfo {
		height: 4.46rem;
	}
  .showInfo.collageTop{
	  height: 3.94rem;
  }
	.turnover-list {
		background: #fff;
		width: 6.94rem;
		margin: 0 auto;
		border-radius: 0 0 0.2rem 0.2rem;
	}

	.turnover-info {
		padding: 0.2rem 0;
		/* height: 1.85rem; */
		display: flex;
		display: -webkit-box;
		display: -webkit-flex;
		align-items: center;
		-webkit-box-align: center;
		-webkit-align-items: center;

	}

	.turnover-info:last-child {}

	.turnover-time {
		font-size: 0.28rem;
		margin-left: 0.2rem;
	}

	.turnover-time .turnover-week {
		color: #7f7f89;
		margin-bottom: 0.1rem;
	}

	.turnover-time .turnover-date {
		color: #000;
		font-size: 0.22rem;
		margin-bottom: 0.1rem;
	}

	.turn-category {
		height: 100%;
		font-size: 0.26rem;
		display: flex;
		display: -webkit-box;
		display: -webkit-flex;
		flex-direction: column;
		-webkit-flex-direction: column;
		justify-content: center;
		-webkit-box-pack: center;
		-webkit-justify-content: center;
		margin-left: 0.5rem;
	}

	.caregory-info {
		display: flex;
		display: -webkit-box;
		display: -webkit-flex;
		align-items: center;
		-webkit-box-align: center;
		-webkit-align-items: center;
		margin-bottom: 0.1rem;
		color: #898989;
	}

	.caregory-info .caregory-num {
		margin-left: 1.2rem;
	}

	.caregory-title {
		position: relative;
	}

	.title-tips-green:before {

		content: "";
		position: absolute;
		top: 50%;
		left: -0.4rem;
		width: 0.24rem;
		height: 0.24rem;
		background: #53a960;
		border-radius: 50%;
		transform: translateY(-50%);
		-webkit-transform: translateY(-50%);
	}

	.title-tips-red::before {

		content: "";
		position: absolute;
		top: 50%;
		left: -0.4rem;
		width: 0.24rem;
		height: 0.24rem;
		background: #ec5300;
		border-radius: 50%;
		transform: translateY(-50%);
		-webkit-transform: translateY(-50%);
	}

	.caregory-info .caregory-detail-tips {
		display: flex;
		display: -webkit-box;
		display: -webkit-flex;
		align-items: center;
		-webkit-box-align: center;
		-webkit-align-items: center;
	}

	.caregory-info .caregory-detail-tips img {
		height: 0.14rem;
		width: 0.24rem;
		margin-left: 0.15rem;
		margin-top: 0.04rem;
	}

	.caregory-info .caregory-num.num-color {
		color: #53a960;
	}

	.turnover-content {
		border-bottom: 1px solid #dfdfdf;
	}

	.turnover-content:last-child {
		border-bottom: none;
		margin-bottom: 0.3rem;
	}

	.turnover-bottom {
		font-size: 0.28rem;
		color: #6b6b6b;
		padding-left: 0.2rem;
		box-sizing: border-box;
		padding-bottom: 0.2rem;
		/* height: 1rem; */
	}

	.turnover-bottom>div:first-child {
		width: 98%;
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

	.turnover-bottom .address-info {
		width: 98%;
		word-wrap: break-word;
		word-break: break-all;
		/* 		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis; */
	}
</style>
