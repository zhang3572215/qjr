<template>
	<div class='containerHeight' @touchstart="touchStart($event)" @touchmove="touchMove($event)" @touchend="touchEnd($event)">

		<div class='head'>
			<div class='head-left'>
				<!-- <img src="./img/left-black.png" mode=""></img>
				<span>返回</span> -->
			</div>
			<div class='head-center'>
				我的消息
			</div>
			<div class='head-right'>

			</div>
		</div>
		<div class='head-show'>

		</div>
		<div class='collage-head'>
			<div class='collage-left'>
				<div :class='collageFlag==="left"?"showBorder":""' @click='collage("left")'>通知</div>
			</div>
			<div class='collage-right '>
				<div :class='collageFlag==="right"?"showBorder":""' @click='collage("right")'>对话</div>
			</div>
		</div>
		<div class='collage-head-show'>
			
		</div>
		<div class='content'>
		
			<div class='content-new'>
				<div v-for='(item,index) in  list' :key='index'>
					<div class='pad-bot showdaw-color'>
						<div class='new-tit'>
							<div class='new-head'>
								<div class='new-img'>
									<img src='../assets/room-cleaning.png'></img>
								</div>
								<div class='tit'>
									<!-- <span v-if='item.bizType == 1'>办公室清洁</span> -->
									<span v-if='item.bizType == 2'>办公室清洁</span>
									<!-- <span v-if='item.bizType == 3'>客房清洁</span> -->
									<span v-if='item.bizType == 4'>窗帘清洁</span>
									<span v-if='item.bizType == 5'>地毯清洁</span>
								</div>
<!-- 								<div class='new-dot' v-if='item.isRead==2'>

								</div> -->
							</div>
                            <div class='new-dot' v-if='item.isRead==2'>
                            </div>
							<div class='new-time'>{{item.date}}<span>{{item.time}}</span></div>
						</div>
						<div class='remind'>
							<div class='remind-tit' v-if='item.operType===1'>清洁人订单提醒</div>
							<div class='remind-tit' v-if='item.operType===2'>服务人员签到提醒</div>
							<div class='remind-tit' v-if='item.operType===3'>服务人员签退提醒 </div>
							<div class='remind-info  clear'>{{item.content}}</div>
						</div>
						<div class='new-look'  @click='toDeatail(item,index)'>
							<div class='look-tit'>查看详情</div>
							<img src='../assets/right-to.png'></img>
						</div>
					</div>
					<div class='pad-bot' v-if='item.id===2'>
						<div class='new-tit'>
							<div class='new-head'>
								<div class='new-img'>

									<img src="../assets/attestation.png"></img>
								</div>
								<div class='tit'>
									{{item.tit}}
								</div>
								
							</div>
                             <div class='new-dot' v-if='item.isRead==2'>
                             
                             </div>
							<div class='new-time'>{{item.date}}<span>{{item.time}}</span></div>
						</div>
						<div class='remind'>

							<div class='remind-tit'>认证结果提醒</div>
							<div class='remind-info'> 恭喜你认证成功</div>
						</div>
						<div class='new-look' @click='toDeatail(item)'>
							<div class='look-tit'>查看详情</div>
							<img src='../assets/right-to.png'></img>
						</div>
					</div>
				</div>

			</div>
		</div>
		<!-- <div class="weui-toast weui_loading_toast" style="opacity: 1;" v-if='isLoading'>
			<div class="weui_loading"><i class="weui-loading weui-icon_toast"></i></div>
			<p class="weui-toast_content">加载中</p>
		</div> -->
		<Load v-if='isLoading'></Load>
		<div class='total-success' v-if='isSuccess'>
			<div class='success-img'><img src="../assets/true-1.png" alt=""></div>
			<div class='success-tit'>数据加载完了</div>
		</div>
		<div class='total-success' v-if='isFalse'>
			<div class='success-img'><img src="../assets/fail.png" alt=""></div>
			<div class='success-tit'>请求出错</div>
		</div>
		<empty v-if='showEmpty'></empty>
	</div>
</template>

<script>
	import * as axios from '../untils/ajax.js'
	export default {
		data() {
			return {
				collageFlag: "left",
				isFalse: false,
				list: [],
				type: 4,
				time: null,
				pageNo: 1,
				pageSize: 8,
				total: 0,
				top: 0,
				pullUpState: 0, // 1:上拉加载更多, 2:加载中……, 3:我是有底线的
				isLoading: true, // 是否正在加载
				isSuccess: false,
				pullUpInfo: {
					moreText: '上拉加载更多',
					loadingText: '数据加载中...',
					noMoreText: '我是有底线的'
				},
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
				 endListFalg:false
			}
		},
		methods: {
			collage(e) {
				
			  if(e=='right'){
				  // this.$router.push('customers')
			  }
			},
			cancel(id) {
				let that = this
				let parmas = new FormData()
				parmas.append('complainId', id)
				axios.post(
					'/qjrapi/office/t-office-complain/putCancelComp',
					parmas
				).then(res => {
					if (res.meta.success) {
						that.pageNo = 1
						that.getList()
					} else {

			
					}
				})
			},
			toDeatail(e,index) {
				console.log(e)
			 if(e.bizType==2){
				 if(e.isPackage==1){
					 let info={
					    orderId:e.otherId,
						isRead:e.isRead 
					 }
					 this.$router.push({'name':'orderDetails',params:info})//订单详情套餐
					 // uni.navigateTo({
					 // 	url: "../order/orderDetails?orderId=" + e.otherId+'&isRead='+e.isRead  //订单详情套餐
					 // })
				 }else if(e.isPackage==2){
					 let info={
						 orderId:e.otherId,
						 isRead:e.isRead
					 }
					 this.$router.push({'name':'orderFrequency',params:info})//订单详情按次
					 // uni.navigateTo({
					 // 	url: "../order/orderFrequency?orderId=" + e.otherId+'&isRead='+e.isRead  //订单详情按次
					 // })
				 }else if( e.pageId == 7){
				    let info={
						isRead:e.isRead
					}
					this.$route.push({'name':'repaymentList',params:info})
				 // uni.navigateTo({
				 // 	 url:'../order/repaymentList?isRead='+e.isRead 
				 // })
			    }else if(e.pageId == 13){
					let info={
						 id:e.otherId,
						 isRead:e.isRead
					}
					this.$router.push({'name':'complaintDetails',params:info})
					// uni.navigateTo({
					// 	url: '/pages/service/complaintDetails?id=' + e.otherId+'&isRead='+e.isRead 
					// })
				}else if(e.pageId == 17){
					let info={
						periodId:e.otherId,
						 isRead:e.isRead
					}
					this.$router.push({'name':'stages',params:info})
					// uni.navigateTo({
					// 	url: '/pages/order/stages?periodId=' +e.otherId+'&isRead='+e.isRead 
					// })
				}else if(e.pageId == 19){
					let info={
						isRead:e.isRead
					}
					this.$route.push({'name':'appointment',params:info})
					// uni.navigateTo({
					// 	url: '/pages/my/appointment?isRead=' +e.isRead 
					// })
				}else if(e.pageId ==15 ){
					let info={
						isRead:e.isRead
					}
					this.$route.push({'name':'voucher',params:info})
					// uni.navigateTo({
					// 	url: '/pages/my/voucher?isRead='+e.isRead
					// })
					
				}
			 
				 
			 }else if(e.bizType==4){
				 let info={
				 		 orderId:e.otherId,
				 		 isRead:e.isRead
				 }
				 this.$router.push({'name':'orderFrequency',params:info})//订单详情地毯按次详情页
				 // uni.navigateTo({
				 // 	url: "../order/orderFrequency?orderId=" + e.id+'&isRead='+e.isRead  //订单详情地毯按次详情页
				 // })
			 }else if(e.bizType==5){
				 let info={
				 		 orderId:e.otherId,
				 		 isRead:e.isRead
				 }
				 this.$router.push({'name':'orderFrequency',params:info})//订单详情窗簾按次详情页
				 // uni.navigateTo({
				 // 	url: "../order/orderFrequency?orderId=" + e.id+'&isRead='+e.isRead   //订单详情窗簾按次详情页
				 // })
			 }
			 
			 if(e.isRead==2){
				 let params=new FormData()
				 params.append('noticeId',e.id)
				 axios.post('/business/t-business-notice-user/updateReadById',params).then()
			 }
		     this.list[index].isRead=1
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
					   console.log(5555)
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
				console.log(88555)
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
			getList() {
				// $.showLoading()
				let that = this
				this.isLoading = true
				var formdata = new FormData()
				formdata.append("pageNo", this.pageNo)
				formdata.append('pageSize', this.pageSize)

				axios.post(
					'/business/t-business-notice-user/getUserNoticeByUserId',
					formdata
				).then(res => {
					if (res.meta.success) {
					
						that.total = Number(res.data.totalCounts)
						let data = res.data.records.map(item => {
							let date = item.createTime.split(' ')
							item.date = date[0]
							item.time = date[1]
							return item
						})
						if (that.pageNo === 1) {
							that.list = data
						} else {
							that.list = that.list.concat(data)
						}
                        if(that.list.length==0){
                        	this.showEmpty=true
                        }
						this.isLoading = false

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
			document.body.removeEventListener('touchmove', this.bodyScroll, {
				passive: false
			});
			this.getList()
			// $.toast();
		},
		watch: {
			parentPullUpState(curVal, oldVal) {
				this.pullUpState = curVal
			},
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
		height: 100%;
		line-height: 0.88rem;
		float: left;
		width: 30%;
		display: flex;
	}

	.head-left img {
		display: inline-block;
		width: 0.18rem;
		height: 0.32rem;
		position: absolute;
		margin-left: 0.28rem;
		top: 0.685rem;
	}

	.head-left span {
		margin-left: 0.60rem;
		font-size: 0.32rem;
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

	.content {
		/* padding: 0 28upx; */
		width: 100vw;
		padding-bottom: 1rem;
	}

	.collage-head {
		border-top: 1px solid #eee;
		border-bottom: 1px solid #eee;
		height: 0.80rem;
		background: #fff;
		display: flex;
		display: -webkit-flex;
		/* margin-top: 20upx; */
		/* border-radius: 15upx; */
		overflow: hidden;
		width: 100vw;
		box-sizing: border-box;
		position: fixed;
		z-index: 10;
		transform: translateY(-0.02rem);
		-webkit-transform: translateY(-0.02rem);
	}
      .collage-head-show{
		 height: 0.8rem;
	  }
	.collage-head .collage-left {
		border-right: 1px solid #eee;
	}

	.collage-head .collage-left,
	.collage-head .collage-right {

		-webkit-flex: 1;
		font-size: 0.32rem;
		background: #fff;

		/* display: flex;
		align-items: center;
		justify-content: center; */
		text-align: center;
		position: relative;
	}

	.collage-head .collage-left>div,
	.collage-head .collage-right>div {
		border-bottom: 3px solid #fff;
		width: 1.4rem;
		height: 0.80rem;
		line-height: 0.80rem;
		text-align: center;
		/* color:#0396ff; */
		position: absolute;
		left: 50%;
		transform: translateX(-50%);
		-webkit-transform: translateX(-50%);
	}

	.showBorder {
		/* background: #0396ff !important; */
		border-bottom: 3px solid #0396FF !important;
		box-sizing: border-box;
		color: #0396ff !important;

	}

	.content-new {
		margin: 0.30rem auto 0 auto;
		width: 6.94rem;
		border-radius: 0.20rem;
		/* padding: 27upx 0upx 0upx 0upx; */
		/* display: flex; */

	}

	.pad-bot {
		padding: 0.27rem 0 0 0;
		margin-bottom: 0.21rem;
		background: #fff;
		box-sizing: content-box;
	}

	.new-tit {
		height: 0.645rem;
		position: relative;
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		width: 100%;
		 -webkit-box-pack: justify;
		    -ms-flex-pack: justify;
		    -webkit-justify-content: space-between;
		justify-content: space-between;
		padding: 0 0.16rem;
		box-sizing: border-box;
	}

	.new-tit .new-head {
		float: left;
		/* display: flex;
		align-items: center; */
		position: relative;
		height: 0.64rem;
			width: 0.44rem;
	}

	.new-tit .new-head .new-img {
		/* display: flex;
		align-items: center; */
		position: absolute;
		top:50%;
		transform: translateY(-50%);
		-webkit-transform: translateY(-50%);
		
	}

	.new-tit .new-head .new-img img {
		height: 0.44rem;
		width: 0.44rem;
		margin-right: 0.20rem;
		position: absolute;
		top:50%;
		transform: translateY(-50%);
		-webkit-transform: translateY(-50%);
	}

	.new-tit  .new-dot {
		position: absolute;
		top: -0.10rem;
		right: 0.38rem;
		height: 0.18rem;
		width: 0.18rem;
		border-radius: 50%;
		background: #ec4f40;
	}

	.new-tit .new-head .tit {
		font-size: 0.34rem;
		width: 4rem;
		position: absolute;
		top:50%;
		left: 0.8rem;
		transform: translateY(-50%);
		-webkit-transform: translateY(-50%);
	}

	.new-tit .new-time {
		line-height: 0.645rem;
		font-size: 0.22rem;
		color: #b2b2b2;
		float: right;
	}

	.new-tit .new-time span {
		margin-left: 0.12rem;
	}

	.remind {
		padding: 0.20rem 0.16rem 0.28rem 0.16rem;
		border-bottom: 1px solid #ddd;
	}

	.remind .remind-tit {
		font-size: 0.30rem;
	}

	.remind .remind-info {
		width: 100%;
		margin-top: 0.20rem;
		font-size: 0.26rem;
		word-wrap:break-word;
		color: #acabad;
		word-break: break-all;
	}

	.new-look {
		height: 0.88rem;
		padding: 0 0.16rem;
		/* display: flex;
		justify-content: space-between;
		align-items: center; */
		font-size: 0.28rem;
		position: relative;
	}
    .new-look .look-tit {
		float: left;
		height: 0.88rem;
		line-height: 0.9rem;
	}
	.new-look img {
		height: 0.22rem;
		width: 0.12rem;
		position: absolute;
	    top: 50%;
		right: 0.16rem;
		transform: translateY(-50%);
		-webkit-transform: translateY(-50%);
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

	
	.total-success .success-img{
			 width:100%;
			 height:1.4rem;
			 position: relative;
			 text-align: center;
		 }
		.total-success img {
			width: 1.1rem;
			height: 1.05rem;
			margin-top: 0.35rem;
		}
	
	 .total-success   .success-tit{
		   width: 100%;
		   text-align: center;
	}
	.clear {clear:both;}
</style>
