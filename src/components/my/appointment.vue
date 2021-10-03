<template>
	<div  class='containerHeight' @touchstart="touchStart($event)" @touchmove="touchMove($event)" @touchend="touchEnd($event)">
		<head-Piece>
			<template slot="content">我的预约</template>
		</head-Piece>
	
		<!-- <div class='content'>
			<div class='content-tit'>
				<div class='launch'>发起日期</div>
				<div>预约日期</div>
				<div>排班状态</div>
				<div>操作</div>
			</div>
			<div class='content-info' v-for='(item,index) in list'>
				<div>{{item.appointDate}}</div>
				<div>{{item.initiateDate}}</div>
				<div><span v-if='item.composeStatus==1'>未排班</span><span v-if='item.composeStatus==2'>已排班</span></div>
				<div class='cancle' @click='cancle(item.id)'>取消</div>
			</div>
		</div> -->
		<div class='content-btn'>
			<div class='btn-info'>
				<div class='btn' @click="collage(2)" :class='type == "2"?"sign-color":""'>
					办公清洁
				</div>
				<div class='btn' @click="collage(4)" :class='type == 4?"sign-color":""'>
					窗帘清洁
				</div>
				<div class='btn' @click="collage(5)" :class='type == 5?"sign-color":""'>
					地毯清洁
				</div>
				<div class='btn' @click="collage(3)" :class='type == 3?"sign-color":""'>
					家务清洁
				</div>
			</div>
		</div>
		<div class='content-show'>
			
		</div>
		<div>
			<div class='stages' v-for='(item,index) in list'>
				<div class='stages-info'>
					<div class='order-num'>
						<img src='../../assets/order.png'></img>
						<span>预约编号：{{item.appointNo}}</span>
					</div>
		
				</div>
				<div class='stages-info'>
					<div>预约地址</div>
					<div class='info-right addressWidth'>{{item.address}}{{item.detailAddr}}</div>
				</div>
				<div class='stages-info'>
					<div>预约时间</div>
					<div class='info-right'>{{item.appointDate}}</div>
				</div>
				<div class='stages-info'>
					<div>时辰</div>
					<!-- \-{{item.endTime}} -->
					<div class='info-right'>{{item.beginTime}}点</div>
				</div>
				<div class='stages-info'>
					<div>排班状态</div>
					<div class='info-right'><span v-if='item.composeStatus==1'>未排班</span><span v-if='item.composeStatus==2'>已排班</span></div>
				</div>
				<div class='stages-btn'>
					<div class='btn-left'>
						<!-- 详情 -->
					</div>
					<div class='btn-right' @click="cancle(item.id)">
						取消
					</div>
				</div>
			</div>
		</div>
		<Load v-if='isLoad'></Load>
		<empty v-if="showEmpty"></empty>
		<showMoadel v-if='modelFlag' :cont='msg' :cancelspan='"不联系"'  :confirmspan='"联系"'  @define='confirm' @remove='cancel'></showMoadel>
		<showSuccess  v-if='isSuccess'  :successInfo='successInfo' ></showSuccess>
		<!-- <customer-Phone v-if='collageCurstomer' @priming='toCustomer' @define='toPhone'></customer-Phone> -->
	</div>
</template>

<script>
	import * as axios from '../../untils/ajax.js'
	export default {
		data() {
			return {
				list: [],
				type: 2,
				pageNo: 1,
				total: '',
				pageSize: 14,
				isLoad: false,
				showEmpty:false,
				modelFlag:false,
				msg:'',
				startX :0,
				startY:0,
				 endX:0,
				 endY:0,
				 innerHeight:'',
				 scrollTop:"", 
				 scrollHeight:'',
				  contentHeight:'',
				  signHeight:'',
				  signSuccess:0,
				  successInfo:'',
				  isSuccess:false
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
		// 	this.getInfo()
		// },
		methods: {
			collage(e) {
				console.log(e)
				this.type = e
				this.pageNo = 1
				this.list = []
				this.getInfo()
			},
			getInfo(e) {
				var that = this
				if (e != 1) {
					this.isLoad = true
				}
				let params=new FormData()
				params.append('pageSize',that.pageSize)
				params.append('pageNo',that.pageNo)
				params.append('productType',this.type)
				axios.post('/office/t-office-appoint/getAppointByUserID',params).then(res => {
					console.log(res)
					if (res.meta.success) {
						that.total = Number(res.data.totalCounts)
						if (that.pageNo === 1) {
							that.list = res.data.records
						} else {
							that.list = that.list.concat(res.data.records)
						}

						this.isLoad = false
						if(this.list.length==0){
												  this.showEmpty=true
						}else{
												   this.showEmpty=false
						}
						   
					} else {
						this.isLoad = false
						// this.toast.fail('获取数据失败')
						this.$toast({
						    message:res.meta.msg, duration: 1500
						})
					}

				})
			},
			cancle(id) {
				this.isLoad = true
		    let  that=this
			  let params=new FormData()
			  params.append('id',id)
				axios.post('/office/t-office-appoint/putAppointById', params).then(res => {
					if (res.meta.success) {
						console.log(res)
						this.isLoad=false
						
						// this.toast.success('取消成功')
						this.successInfo = '取消成功'
						this.isSuccess = true
						 
						setTimeout(() => {
							that.isSuccess = false
						}, 1000)
						this.pageNo = 1
						this.getInfo(1)
					} else {
						this.isLoad = false
						this.modelFlag=true
						this.msg=res.meta.msg
						this.$toast({
						    message:res.meta.msg, duration: 1500
						})
						
						// uni.showModal({
						// 		  title:'提示',
						// 		  content:res.meta.msg,
						// 		  showCancel:true,
						// 		  cancelspan:'不联系',
						// 		  cancelColor:'#323233',
						// 		  confirmspan:'联系',
						// 		  confirmColor:'#323233',
						// 		  success(res){
						// 			  if(res.confirm){
						// 				uni.makePhoneCall({
						// 					phoneNumber: "4008290037",
						// 					success: () => {
												
						// 					}
						// 				})
						// 			  }else if(res.cancel){
										
						// 			  }
						// 		  }
						// })
						// this.toast.fail('取消失败')
					}
				})
			},
		   cancel() {
		   	this.modelFlag = false
		   },
		   confirm() {
		   	this.modelFlag = false
			window.location.href = 'tel://4008290037'
		     // uni.makePhoneCall({
		     // 					phoneNumber: "4008290037",
		     // 					success: () => {
		     						
		     // 					}
		     // 				})
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
		// this.$toast({
		//     message: signHeight, duration: 1500
		// })
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
		   	this.getInfo()
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
			this.getInfo()
			// if(options.isRead && options.isRead==2){
			// 	let badgeNumber= uni.getStorageSync('badgeNumber') - 1
			// 	  uni.setStorageSync('badgeNumber',badgeNumber)
			// 	 plus.runtime.setBadgeNumber(badgeNumber)
			// }
			if(this.$route.params.isRead && this.$route.params.isRead==2){
				// let badgeNumber= uni.getStorageSync('badgeNumber') - 1
				  // uni.setStorageSync('badgeNumber',badgeNumber)
			
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
	
	.content-btn {
		height: 0.9rem;
		/* width: 100vw; */
		padding: 0 0.28rem;
		/* box-sizing: border-box;
		display: flex;
		align-items: center; */
		font-size:0.28rem;
		position: fixed;
		top:1.28rem;
		width: 100%;
		background: #fff;
		z-index: 10;
	}
	 .content-show{
		 height: 0.90rem;
	 }
	.content-btn .btn-info {
		width: 100%;
		background: #fff;
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		-webkit-transform: translateY(-50%);
	}
	
	.content-btn .btn {
		float: left;
		height: 0.60rem;
		width:1.30rem;
		text-align: center;
		line-height: 0.60rem;
		background: #fff;
		/* border-radius: 0.10rem; */
		color: #fff;
		margin-right:0.18rem;
	/* 	border: 1px solid #539ef9; */
		color: #000;
		box-sizing: border-box !important;
	}
	.btn.sign-color {
		color: #ff5f1e;
		border-bottom: 2px solid #FF5F1E;
	}
	.stages {
		/* padding: 15px 8px; */
		background: #fff;
		margin: 0.20rem auto 0 auto;
		width: 6.94rem;
		border-radius: 0.10rem;
		font-size: 0.12rem;
		color: #999;
		box-shadow: 0.05rem 0.05rem 0.10rem #ddd;
		
	}
	.stages:last-child{
		margin-bottom: 0.5rem;
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
	.addressWidth{
		width: 4.50rem;
		text-align: right;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
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
		width: 0.90rem;
		height: 0.58rem;
		line-height: 0.58rem;
		text-align: center;
		/* border: 1upx solid #ff5f1e; */
		border-radius: 0.15rem;
		color: #FF5F1E;
	}
	
	.btn-right {
		font-size: 0.28rem;
		width: 1.60rem;
		height: 0.58rem;
		line-height: 0.60rem;
		text-align: center;
		border: 1px solid #999;
		border-radius: 0.15rem;
		color: #000;
		box-sizing: border-box;
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
