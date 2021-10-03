<template>
	<div  class='containerHeight' @touchstart="touchStart($event)" @touchmove="touchMove($event)" @touchend="touchEnd($event)">
		<head-Piece :sign='"历史分期"'  :signIn='toback'>
			<template slot="content">待还记录</template>
			<template slot="content-right">历史分期</template>
		</head-Piece>

		<div>
			<div class='stages' v-for='(item,index) in list'>
				<div class='stages-info'>
					<div class='order-num'>
						<img src='../../assets/order.png'></img>
						<span>订单编号：{{item.orderNo}}</span>
					</div>

				</div>
				<div class='stages-info'>
					<div>总分期数</div>
					<div class='info-right'>{{item.periodNum}}期</div>
				</div>
				<div class='stages-info'>
					<div>当前期数</div>
					<div class='info-right'>第{{item.periodNo}}期</div>
				</div>
				<div class='stages-info'>
					<div>应还金额</div>
					<div class='info-right'>￥{{item.periodMoney}}</div>
				</div>
				<div class='stages-info'>
					<div>截至时间</div>
					<div class='info-right'>{{item.paybackDate}}</div>
				</div>
				<div class='stages-btn'>
					<div class='btn-left' @click="toStages(item.id)">
						详情
					</div>
					<div class='btn-right' @click="toStagesPay(item.orderId,item.id)">
						立即还款
					</div>
				</div>
			</div>
		</div>
		<empty v-if="showEmpty"></empty>
		<Load v-if='isLoad'></Load>
		 <showSuccess  v-if='isSuccess'  :successInfo='successInfo' ></showSuccess>
	</div>
</template>

<script>
		import * as axios from '../../untils/ajax.js'
	export default {
		data() {
			return {
				list: [],
				pageNo: 1,
				pageSize: 7,
				total: 0,
				isLoad: false,
				showEmpty:false,
				toback:null,
				startX: 0,
				startY: 0,
				endX: 0,
				endY: 0,
				showEmpty:false,
				innerHeight:'',
				scrollTop:"", 
				scrollHeight:'',
				 contentHeight:'',
				 signHeight:'',
				 signSuccess:0,
				 endListFalg:false,
				 isSuccess:false,
				 successInfo:''
			}
		},
		onReachBottom() {
			this.pageNo = this.pageNo + 1
			console.log(this.pageNo)
			console.log(this.list)
			if (this.list.length >= this.total) {
				this.toast.success('数据加载完了')
				return
			}
			this.getList()
		},
		methods: {
			getList() {
				this.isLoad = true
				var that=this
				let params=new FormData()
				params.append('pageNo',this.pageNo)
				params.append('pageSize', this.pageSize)
				axios.post('/office/t-office-order-period/getPeriodListByUserId',params).then(res => {
					if (res.meta.success) {
					
						let data = res.data.records.map(item => {
							let date = item.createTime.split(' ')
							item.date = date[0]
							item.time = date[1]
							return item
						})
						this.total = Number(res.data.totalCounts)
						console.log(data)
						if (this.pageNo == 1) {
							this.list = data
						} else {
							this.list = this.list.concat(data)
						}
						if(that.list.length==0){
							this.showEmpty=true
						}
						this.isLoad = false
					} else {
						this.isLoad = false
						this.toast.fail('获取数据失败')
					}
				})
			},
			toStages(id) {
			let  info={
				periodId:id
			}
			this.$router.push({'name':'stages',params:info})
				// uni.navigateTo({
				// 	url: '/pages/order/stages?periodId=' + id
				// })
			},
			toStagesPay(id,periodId){
				let info={
					id:id,
					periodId:periodId,
					
				}
				this.$router.push({name:'stagesPayment',params:info})
				// uni.navigateTo({
				// 	url:'/pages/home/stagesPayment?id='+id+'&periodId='+periodId
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
				let contentHeight=document.querySelector('.containerHeight').offsetHeight
				// 变量scrollTop是滚动条滚动时，距离顶部的距离
				let scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop
				// 变量scrollHeight是滚动条的总高度
				let scrollHeight = document.documentElement.clientHeight || document.body.scrollHeight
				
				//变量scrollHeight是滚动条的总高度
				var scrollHeights = document.documentElement.scrollHeight||document.body.scrollHeight;
				this.innerHeight=scrollHeights
				this.scrollTop=scrollTop
				this.scrollHeight=scrollHeight
				this.contentHeight=contentHeight
				// 滚动条到底部的条件
				if (scrollTop + scrollHeight >= innerHeight) {
					if (this.pullUpState !== 3 && !this.isLoading) {
						this.infiniteLoad()
					}
					// console.log('距顶部' + scrollTop + '滚动条总高度' + scrollHeight + '内容高度' + innerHeight)
				}
				let signHeight=Number(contentHeight)-( Number(innerHeight)+Number(scrollTop))
				let that=this
				 if(signHeight<60){
					if (that.total <= that.list.length && that.total>0) {
						that.signSuccess=that.signSuccess+1
						
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
					this.endListFalg=true
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
			// 			this.toback=options.stages
			// }
			// if(options.isRead && options.isRead==2){
			// 	let badgeNumber= uni.getStorageSync('badgeNumber') - 1
			// 	  uni.setStorageSync('badgeNumber',badgeNumber)
			// 	 plus.runtime.setBadgeNumber(badgeNumber)
			// }
				this.getList()
			if(this.$route.params.isRead && this.$route.params.isRead == 2){
				
			}
		
		},
		watch:{
			signSuccess(val){
				if(this.endListFalg){
					let that=this
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
	.stages {
		/* padding: 15px 8px; */
		background: #fff;
		margin: 0.30rem auto 0 auto;
		width: 6.94rem;
		border-radius: 0.10rem;
		font-size: 0.12rem;
		color: #999;
		box-shadow: 0.05rem 0.05rem 0.10rem #ddd;
		
	}
  .stages:nth-child(1){
	  margin-top: 0 !important;
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
		justify-content: space-between;
		-webkit-box-pack: justify;
		-webkit-justify-content: space-between;
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
		justify-content: space-between;
		-webkit-box-pack: justify;
		-webkit-justify-content: space-between;
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
		color: #fff;
		background:#FF5F1E ;
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
		color: #ff5f1e;
		box-sizing:border-box;
          
	}

	.stages-info img {
		height: 0.24rem;
		width: 0.19rem;
		margin-right: 0.08rem;
	}

	.stages-info .order-num {
		display: flex;
		display: -webkit-box;
		display: -webkit-flex;
		align-items: center;
		-webkit-box-align: center;
		-webkit-align-items: center;
		color: #707070;

	}
</style>
