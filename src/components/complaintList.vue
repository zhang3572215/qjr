<template>
	<div @touchstart="touchStart($event)" @touchmove="touchMove($event)" @touchend="touchEnd($event)">
		<head-Piece>
			<template slot="content">投诉列表</template>
		</head-Piece>
		<div class="content-list">
			<div class='list' v-for='(item,index) in list' @click="toDeatail(item.id)">
				<div class='list-head'>
					<div class='list-title'>办公室清洁</div>
					<div class='type' v-if='item.handleStatus==1'>待处理</div>
					<div class='type' v-if='item.handleStatus==2'>处理中</div>
					<div class='type' v-if='item.handleStatus==3'>处理完成</div>
				</div>
				<div class='list-time'>
					<div class='time-title'>投诉时间：<span class='list-date'>{{item.date}}</span><span>{{item.time}}</span></div>
					<div class='look'>
						<div class='look-tit'>查看详情</div>
						<img src='../assets/right-go.png'></img>
					</div>
				</div>
				<div class='list-btn' v-if='item.handleStatus!=3'>
					<div class='btn-cancle' @click.stop.prevent="cancel(item.id)">
						取消投诉
					</div>
				</div>
			</div>
		</div>
		<Load v-if='isLoading'></Load>
		<div class='total-success' v-if='isSuccess'>
			<div class='success-img'><img src="../assets/true-1.png" alt=""></div>
			<div class='success-tit'>{{isSuccessInfo}}</div>
		</div>
		<div class='total-success' v-if='isFalse'>
			<div class='success-img'><img src="../assets/fail.png" alt=""></div>
			<div class='success-tit'>{{isFalseInfo}}</div>
		</div>
		<empty v-if='showEmpty'></empty>
	</div>
</template>

<script>
	import * as axios from '../untils/ajax.js'
	export default {
		data() {
			return {
				type: 4,
				list: [],
				time: null,
				pageNo: 1,
				pageSize: 8,
				total: 0,
				top: 0,
				pullUpState: 0, // 1:上拉加载更多, 2:加载中……, 3:我是有底线的
				isLoading: false, // 是否正在加载
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
				isFalseInfo: '请求出错',
				isSuccessInfo: '数据加载完了',
				showEmpty: false
			}
		},
		methods: {
			toBack() {
				this.$router.go(-1)
			},
			cancel(id) {
				let that = this
				let parmas = new FormData()
				parmas.append('complainId', id)
				axios.post(
					'/office/t-office-complain/putCancelComp',
					parmas
				).then(res => {
					if (res.meta.success) {
						that.pageNo = 1
						that.list = []
						that.getList(true)
					} else {
						this.$toast({
							message: res.meta.msg,
							duration: 1500
						})
						// this.isFalseInfo = '取消失败'
						// this.isFalse = true
						// setTimeout(() => {
						// 	that.isFalse = false
						// 	this.isFalseInfo = '请求出错'
						// }, 2000)

					}
				})
			},
			toDeatail(id) {
				let info = {
					id: id
				}
				this.$router.push({
					'name': 'complaintDetails',
					params: info
				})
				// uni.navigateTo({
				// 	url: '/pages/service/complaintDetails?id=' + id
				// })
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
				this.isLoading = false
			},
			scrollToTheEnd() {
				let innerHeight = document.querySelector('#app').clientHeight
				// 变量scrollTop是滚动条滚动时，距离顶部的距离
				let scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop
				// 变量scrollHeight是滚动条的总高度
				let scrollHeight = document.documentElement.clientHeight || document.body.scrollHeight
				// 滚动条到底部的条件
				if (scrollTop + scrollHeight >= innerHeight) {
					if (this.pullUpState !== 3 && !this.isLoading) {
						this.infiniteLoad()
					}
					// console.log('距顶部' + scrollTop + '滚动条总高度' + scrollHeight + '内容高度' + innerHeight)
				}
			},

			/**
			 * 上拉加载数据
			 */
			infiniteLoad() {
				if (this.total <= this.list.length) {
					this.isSuccess = true
					var that = this
					setTimeout(() => {
						that.isSuccess = false
					}, 2000)
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
			getList(e) {
				// $.showLoading()

				this.isLoading = true

				let that = this
				var formdata = new FormData()
				formdata.append("pageNo", this.pageNo)
				formdata.append('pageSize', this.pageSize)

				axios.post(
					'/office/t-office-complain/getComplainByUserId',
					formdata
				).then(res => {
					if (res.meta.success) {

						that.total = Number(res.data.totalCounts)
						let data = res.data.records.map(item => {
							let date = item.complainTime.split(' ')
							item.date = date[0]
							item.time = date[1]
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
						this.isLoading = false
						if (e == true) {

							this.isSuccessInfo = '取消成功'
							this.isSuccess = true
							setTimeout(() => {
								that.isSuccess = false
								that.isSuccessInfo = '数据加载完了'
							}, 2000)
						}
					} else {
						this.isFalse = true
						setTimeout(() => {
							that.isFalse = false
						}, 2000)
					}
				})
			}
		},
		created() {
			// axios.post('http://boss.nat300.top/qjrapi/product/t-product-office/getProductList', {}).then(resp => {
			// 	console.log(resp)
			// })
			// var params={
			// 	pageNo: this.pageNo,
			// 	pageSize: this.pageSize
			// }
			// if(this.type!=undefined){
			//   params.time=this.type
			// }

			this.getList()
		},
		watch: {
			parentPullUpState(curVal, oldVal) {
				this.pullUpState = curVal
			}
		}
	}
</script>

<style scoped>
	@import '../assets/css/weui.css'

	* {
		padding: 0;
		margin: 0;
		font-family: 'Microsoft YaHei'
	}

	#app {
		height: 100vh;
	}

	body {
		background-color: #f8f8fa !important;
		/* font-size: 28rem; */
		color: #333333;
		font-family: Helvetica Neue, Helvetica, sans-serif;
		width: 100%;
	}

	.contents {
		position: fixed;
		top: 0;
		z-index: 100;
		width: 100vw;
	}

	.head {
		padding-top: 0.38rem;
		height: 0.88rem;
		width: 100vw;
		/* background: #36a8fa; */
		background: #fff;
		text-align: center;
		position: fixed;
		top: 0;
		box-sizing: content-box;
		/* color:#fff; */
		font-size: 0.33rem;
		z-index: 20000;
	}

	.head-left {
		height: 0.88rem;
		/* line-height: 0.88rem; */
		float: left;
		width: 30%;
		/* display: flex; */
		position: relative;
	}

	.head-left img {
		width: 0.18rem;
		height: 0.32rem;
		position: absolute;
		/* margin-left: 0.28rem; */
		top: 50%;
		left: 0.28rem;
		transform: translateY(-50%);
		-webkit-transform: translateY(-50%);
	}

	.head-left span {
		/* margin-left: 0.60rem; */
		font-size: 0.32rem;
		position: absolute;
		/* margin-left: 0.28rem; */
		top: 50%;
		left: 0.6rem;
		transform: translateY(-50%);
		-webkit-transform: translateY(-50%);
	}

	.head-center {
		height: 100%;
		width: 40%;
		line-height: 0.88rem;
		text-align: center;
		float: left;
		font-size: 0.36rem;
	}

	/* .head-right{
		 
		  height: 88rem;
		  width: 30%;
		
		} */
	.head-right {
		height: 100%;
		line-height: 0.85rem;
		float: right;
		width: 20%;
		display: flex;
		justify-content: flex-end;
		padding-right: 0.28rem;
	}

	.head-show {

		height: 1.28rem;
		width: 100%;
	}

	.substance {
		margin-top: 0;
		padding-top: 0;
		height: 100%;
		z-index: 100;
	}

	.content-list {
		/* background: #fff; */
		margin-bottom: 0.30rem;
	}

	.list {
		background: #fff;
		border-radius: 0.1rem;
		margin: 0.20rem auto 0 auto;
		width: 6.94rem;
		box-shadow: 0.05rem 0.05rem 0.1rem #EDEDED;
	}

	.list:nth-child(1) {
		margin-top: 0 !important;
	}

	.list .list-head {
		height: 0.84rem;
		/* 	display: flex;
		align-items: center;
		justify-content: space-between; */
		border-bottom: 1px solid #eee;
		padding: 0 0.16rem;
		font-size: 0.32rem;
		position: relative;
		/* font-weight: 500; */
	}

	.list-head .list-title {
		float: left;
		height: 0.84rem;
		line-height: 0.84rem;
	}

	.list-head .type {
		float: right;
		height: 0.84rem;
		line-height: 0.84rem;
		color: #ff2a2a;
		font-size: 0.28rem;
	}

	.list-time {
		height: 0.84rem;
		/* 	display: flex;
		align-items: center;
		justify-content: space-between; */
		padding: 0 0.16rem;
		font-size: 0.32rem;
		color: #5f5f6b;
		position: relative;
	}

	.time-title {
		/* float: left; */
		/* height: 0.84rem; */
		position: absolute;

		top: 50%;

		transform: translateY(-50%);

		-webkit-transform: translateY(-50%);
		/* line-height: 0.84rem; */
	}

	.list-time .list-date {
		margin-right: 0.15rem;
	}

	.content-list .list-time .look {
		font-size: 0.28rem;
		padding: 0;
		margin: 0;
		color: #0396ff;
		float: right;
		/* 	display: flex;
		align-items: center; */
		height: 0.84rem;
		/* line-height: 0.84rem; */
		position: relative;
		width: 1.2rem;
	}

	.content-list .list-time .look-tit {
		/* position: absolute;
	   top:50%;
	   transform: translateY(-50%);
	   -webkit-transform: translateY(-50%); */
		/* margin-right: 0.21rem; */
		padding: 0;
		margin: 0;
		/* 	height: 0.84rem;
		line-height: 0.84rem; */
		width: 1.2rem;
		right: 0.16rem;
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		-webkit-transform: translateY(-50%);
	}

	.list-time .look img {
		/* display: flex;
		align-items: center; */
		padding: 0;
		margin: 0;
		vertical-align: top;
		height: 0.24rem !important;
		width: 0.11rem;
		margin-left: 0.10rem;
		position: absolute;
		top: 50%;
		right: 0;
		transform: translateY(-0.12rem);
		-webkit-transform: translateY(-0.12rem);
	}

	.content-list .list-btn {
		height: 0.85rem;
		padding: 0 0.16rem;
		/* display: flex;
		align-items: center;
		justify-content: flex-end; */
		font-size: 0.28rem;
	}

	.list-btn .btn-cancle {
		float: right;
		width: 1.45rem;
		height: 0.52rem;
		color: #ff5f1e;
		border: 1px solid #ff6729;
		border-radius: 0.50rem;
		text-align: center;
		line-height: 0.54rem;
		box-sizing: border-box;
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
