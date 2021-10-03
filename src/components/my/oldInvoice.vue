<template>
	<div class='containerHeight' @touchstart="touchStart($event)" @touchmove="touchMove($event)" @touchend="touchEnd($event)">
		<head-Piece>
			<template slot="content">历史开票</template>
		</head-Piece>
	
		<div class='content-list'>
			<div class='list' @click="tapInv(item.type,item.id)" v-for='(item,index) in list'>
				<div class='type'>开票状态：<span v-if='item.markStatus==1'>已开</span>
					<span v-else>未开</span></div>
				<div class='invoice'>
					<div>发票类型：<span v-if='item.type==1'>增值税普通发票</span>
						<span v-if='item.type==2'>增值税专用发票</span></div>
					<div class='look'>
						<div>查看详情</div><img src='../../assets/right-go.png'></img>
					</div>
				</div>
				<div>发票抬头：<span>{{item.head}}</span></div>
				<div>纳税号：<span>{{item.code}}</span></div>
				<div>订单编号：<span>{{item.orderNo}}</span></div>
				<div>开票金额：<span>{{item.money}}</span></div>
				<div>下单时间：<span>{{item.date}}</span> <span class='times'>{{item.time}}</span></div>
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
				pageNo: 1,
				pageSize: 6,
				list: [],
				total: '',
				isLoad: false,
				showEmpty: false,
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
				endListFalg: false
			}
		},
		// onReachBottom() {
		// 	this.pageNo = this.pageNo + 1
		// 	console.log(this.pageNo)
		// 	console.log(this.list)
		// 	if (this.list.length >= this.total) {
		// 		this.toast.success('数据加载完了')
		// 		return
		// 	}
		// 	this.getList()
		// },
		methods: {
			tapInv(type, id) {
                 let info={
					 type:type,
					 id:id
				 }
				this.$router.push({'name':'invoice',params:info})
				// uni.navigateTo({
				// 	url: '/pages/order/invoice?type=' + type + '&id=' + id
				// })
			},
			getList() {
				// axios.post()
				let that = this
				// let params=new FormData()
				// params.append('pageSize',that.pageSize)
				// params.append('pageNo',that.pageNo)
				this.isLoad = true
				let params = new FormData()
				params.append('pageSize', this.pageSize)
				params.append('pageNo', this.pageNo)
				axios.post('/office/t-office-invoice-record/getInvoiceByUserId', params).then(res => {
					console.log(res)
					if (res.meta.success) {
						that.total = Number(res.data.totalCounts)
						let data = res.data.records.map(item => {
							let date = item.payTime.split(' ')
							item.date = date[0]
							item.time = date[1]
							return item
						})
						if (that.pageNo === 1) {
							that.list = res.data.records
						} else {
							that.list = that.list.concat(res.data.records)
						}
						if (that.list.length == 0) {
							this.showEmpty = true
						}
						this.isLoad = false
						// this.toast.success('验证码已发送')
					} else {
						this.isLoad = false
						this.$toast({
						    message:'获取数据失败', duration: 1500
						})

					}
					uni.stopPullDownRefresh();
				})
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
			this.getList()
		},
		watch:{
			signSuccess(val) {
				if (this.endListFalg) {
					let that = this
					this.successInfo = '数据加载完了'
					this.isSuccess = true
			
					setTimeout(() => {
						that.isSuccess = false
					}, 1000)
				}
			
			}
		}
		
	}
</script>

<style scoped>
	.containerHeight {
		width: 100vw;
	}
  .content-list{
	  padding-bottom: 0.4rem;
  }
	.list {
		padding: 0.26rem 0.16rem 0.30rem 0.16rem;
		margin: 0.20rem auto 0 auto;
		background: #fff;
		width: 6.94rem;
		border-radius: 0.10rem;
		color: #707070;
		box-shadow: 0px 0.05rem 0.10rem #ececee;
		font-size: 0.28rem;
	}
.list:nth-child(1){
	  margin-top: 0 !important;
  }
	.list .type {
		font-size: 0.30rem;
		color: #ff2d2d;
	}

	.list div {
		margin-bottom: 0.18rem;
	}

	.list div:last-child {
		margin-bottom: 0;
	}

	.list .address {
		width: 6.60rem;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.list .invoice {
		display: flex;
		display: -webkit-box;
		display: -webkit-flex;
		justify-content: space-between;
		-webkit-box-pack: justify;
		-webkit-justify-content: space-between;
		align-items: center;
		-webkit-box-align: center;
		-webkit-align-items: center;
		width: 6.62rem;

		margin-bottom: 0;
		/* position: relative; */
	}

	.list .invoice .look {
		/* position: absolute;
		right: 0;
		top: 0.03rem; */
		font-size: 0.24rem;
		color: #0396ff;
		display: flex;
		display: -webkit-box;
		display: -webkit-flex;
		align-items: center;
		-webkit-box-align: center;
		-webkit-align-items: center;
		margin-bottom: 0.18rem;

	}

	.list .invoice .look>div {
		margin-bottom: 0;
         /* line-height: 0.22rem; */
	}

	.list .invoice .look img {
		width: 0.11rem;
		height: 0.23rem;
		margin: 0 0 0 0.10rem;

	}

	.list div .times {
		margin-left: 0.15rem;
	}
</style>
