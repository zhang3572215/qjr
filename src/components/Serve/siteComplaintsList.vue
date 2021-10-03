<template>
	<div class='containerHeight'  @touchstart="touchStart($event)" @touchmove="touchMove($event)" @touchend="touchEnd($event)">
		<div class='head'>
			<div class='head-left' @click='toBack'>
				<img src="../../assets/left-black.png" mode=""></img>
				<span>返回</span>
			</div>
			<div class='head-center'>
				站点投诉列表
			</div>
			<div class='head-right'>
		
			</div>
		</div>
		<div class='head-show'>
		</div>
		<div class="select-time">
			<div class='select-tit' :class='signId==item.id?"showColor":""' v-for='(item,index) in selectList' @click="collage(item.id)">{{item.name}}</div>
		</div>
		<div class='select-show'>
			
		</div>
		<div class='content-list'>
			<div class='list' v-for='(item,index) in list'   :key='index' @click='toDeail(item)'>
				<div class='list-cont'>
					<div>投诉编号:</div>
					<div class='cont-tit'>{{item.complainNo}}</div>
				</div>
				<div class='list-cont'>
					<div>产品类型:</div>
					<div class='cont-tit' v-if='item.productType==2'>办公室清洁</div>
					<div class='cont-tit' v-if='item.productType==3'>家政清洁</div>
					<div class='cont-tit' v-if='item.productType==4'>窗帘清洁</div>
					<div class='cont-tit' v-if='item.productType==5'>地毯清洁</div>
				</div>
				<div class='detail'>
					<div class='cont-person'>
					 <div>投诉人:</div>
					 <div class='cont-tit'>{{item.nickName}}</div>
					</div>

						<div class='look'>查看详情</div>
						<img class='look-img' src="../../assets/right-go.png" alt="">
					
				</div>
				<div class='list-cont'>
					<div>投诉时间:</div>
					<div class='cont-tit'>{{item.complainTime }}</div>
				</div>
				<div class='list-cont'>
					<div>投诉原因:</div>
					<div class='cont-tit' v-if='item.complainCause==1'>旷工</div>
					<div class='cont-tit' v-if='item.complainCause==2'>打扫不干净</div>
						<div class='cont-tit' v-if='item.complainCause==3'>其他</div>
				</div>
				<div class='list-cont'>
					<div>处理状态:</div>
					<div class='cont-tit' v-if='item.handleStatus==1'>待处理</div>
					<div class='cont-tit' v-if='item.handleStatus==2'>处理中</div>
					<div class='cont-tit' v-if='item.handleStatus==3'>处理完成</div>
				</div>
			</div>
		</div>
		<Load v-if='isLoading'></Load>
		<div class='total-success' v-if='isSuccess'>
			<div class='success-img'><img src="../../assets/true-1.png" alt=""></div>
			<div class='success-tit'>数据加载完了</div>
		</div>
		<div class='total-false' v-if='isFalse'>
			<!-- <div class='success-img'><img src="../../assets/fail.png" alt=""></div> -->
			<div class='success-tit'>{{msgFalg}}</div>
		</div>
		<empty v-if='showEmpty'></empty>

		<!-- <showMoadel v-if='modelFlag' :cont='msg' @define='confirm' @remove='cancel'></showMoadel> -->
	</div>
</template>

<script>
		import * as axios from '../../untils/ajax.js'
		import {
			mapGetters,
		   mapActions
		} from 'vuex'
	export default{
		data(){
			return{
				selectList: [{
					id: 1,
					name: '当天'
				}, {
					id:2,
					name: '昨天'
				}, {
					id: 3,
					name: '三天'
				}, {
					id: 0,
					name: '全部'
				}
				],
				signId:1,
				isLoading:false,
				showEmpty:false,
				isSuccess:false,
				isFalse:false,
				modelFlag:false,
				list:[],
				total:'',
				phone:'',
				startX: 0,
				startY: 0,
				endX: 0,
				endY: 0,
				innerHeight:'',
				scrollTop:"", 
				scrollHeight:'',
				contentHeight:'',
				 signHeight:'',
				 signSuccess:0,
				 endListFalg:false,
				 pageNo:1,
				 pageSize:7,
				 msgFalg:''
			}
		},
	    computed: {
	    	...mapGetters(['showHandStatus,showHandleTit'])
	    },
		methods:{
			...mapActions(['collageHandStatus']),
			toBack(){
				this.collageHandStatus(1)
				this.$router.push({
					name: 'serverIndex'
				})
			},
			collage(id) {
				this.signId = id
				console.log(id)
				this.collageHandStatus(id)
				this.list = []
				this.pageNo = 1
				this.showEmpty=false
				this.isLoading = true
				this.getList()
			},
			// 获取用户人手机号
			getPhone(){
				let that=this
				axios.post(
					'/sys/t-sys-app-user/getAppUserInfo', {}
				).then(res => {
					console.log(res)
					if (res.meta.success) {
						that.phone = res.data.mobile
				      this.getList()
					} else {
						
					}
				})
			},
			getList(){
				this.isLoading = true
				let that = this
				var formdata = new FormData()
				formdata.append("pageNo", this.pageNo)
				formdata.append('pageSize', this.pageSize)
				formdata.append('type', this.signId)
				formdata.append('mobile',this.phone)
				axios.post(
                  '/office/t-office-complain/findMySiteComplain',
					formdata
				).then(res => {
					if (res.meta.success) {
						
						that.total = Number(res.data.totalCounts)
						// let data = res.data.records.map(item => {
						// 	let date = item.createTime.split(' ')
						// 	item.date = date[0]
						// 	item.time = date[1]
						// 	return item
						// })
						if (that.pageNo === 1) {
							that.list = res.data.records
						} else {
							that.list = that.list.concat(res.data.records)
						}
						if(that.list.length==0){
							this.showEmpty=true
						}
						that.isLoading = false
						
					} else {
						that.isLoading = false
						that.isFalse = true
						that.msgFalg=res.meta.msg
						that.showEmpty=true
						setTimeout(() => {
							that.isFalse = false
						}, 2000)
					}
				})
			},
			touchStart(e) {
				this.startX = e.touches[0].pageX
				this.startY = e.touches[0].pageY
			},
			touchMove(e){
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
			infiniteLoad(){
				this.pullUpState = 2
					
					
				let that = this
				if (this.list.length >= this.total) {
				    this.endListFalg=true
					return false
				}
				this.pageNo = this.pageNo + 1
				this.isLoading = true
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
			toDeail(item){
				let  detail=item
				
				this.$router.push({
					name: 'siteComplaintDetail',params:{info:detail}
				})
				detail=JSON.stringify(detail);
				window.localStorage.setItem('infoSite',detail)
			}
		},
		created() {
			this.signId=1
			console.log(this.showHandStatus)
			console.log(44444)
			this.getPhone()
			
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
			   
			},
			showHandStatus:{
				handler(newval,oldval){
					console.log(newval)
					if(newval){
						this.signId=newval
					}
					 
				},
				immediate: true 
			},
			showHandleTit(newval, oldval) {
			
               this.list=[]
			   this.getList()
				
			}
		}
		
	}
</script>

<style scoped>
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
	
	.select-time {
		position: fixed;
		top:1.26rem;
		padding-left: 0.28rem;
		font-size: 0.30rem;
		background: #fff;
		height: 0.85rem;
		width: 100%;
		z-index: 10;
		/* align-items: center; */
		/* display: flex; */
	}
	.select-show{
	     height: 0.85rem;
	}
	.select-time .select-tit {
		float: left;
		line-height: 0.85rem;
		margin-right: 0.55rem;
	}
	
	.showColor {
		color: #ff5f1e;
	}
	 .list{
		  width: 7.2rem;
		  overflow: hidden;
		  margin: 0.15rem auto 0.3rem auto;
		  background: #fff;
		  font-size: 0.30rem;
		  border-radius: 0.15rem;
		  	box-shadow: 0 0.05rem 0.10rem #eee;
	 }
	 .list-cont{
		 height:0.7rem;
		 width: 6.94rem;
		  display: flex;
		  display: -webkit-flex;
		  -webkit-box-align: center;
		 -ms-flex-align: center;
		 -webkit-align-items: center;
		 border-bottom: 1px solid #ddd;	
		  padding-left: 0.16rem;
		  align-items: center;
		  box-sizing: content-box;
	 }
	 .list-cont:last-child{
		 border-bottom: none;
	 }
	   .detail{
		   height:0.7rem;
		   width: 6.94rem;
		   border-bottom: 1px solid #ddd;
		    padding-left: 0.16rem;
			/* float: left; */
		  display: flex;
		  display: -webkit-box;
		  display: -webkit-flex;
		  -webkit-box-pack: justify;
		   -ms-flex-pack: justify;
		  -webkit-justify-content: space-between;
		   justify-content: space-between;
		   position: relative;
	 }
	 .detail .cont-person{
		 float: left;
	 }
	 .cont-person{
		 display: flex;
		  display: -webkit-flex;
		  -webkit-box-align: center;
		 -ms-flex-align: center;
		 -webkit-align-items: center;
	 }
	 .cont-tit{
		 margin-left: 0.1rem;
		 color: #777;
	 }
	
		 .look{
			 	color: #0396ff;
				position: absolute;
				right: 0.4rem;
				top: 50%;
				transform: translateY(-50%);
				  -webkit-transform: translateY(-50%);
		 }
		 .look-img{
			 height: 0.32rem;
			 width: 0.12rem;
			 position: absolute;
			 right: 0.15rem;
			 top: 50%;
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
	.total-false{
		position: fixed;
			top: 5.7rem;
			background: rgba(44, 44, 44, 0.8);
		/* 	display: flex;
			flex-direction: column;
			align-items: center; */
			font-size: 0.28rem;
			color: #fff;
			/* width: 2.2rem; */
			/* height: 2.15rem; */
			padding:0.2rem;
			border-radius: 0.15rem;
			left: 50%;
			transform: translateX(-50%);
			-webkit-transform: translateX(-50%);
			z-index: 1000;
	}
	.total-false  .success-tit{
		   width: 100%;
		   text-align: center;
	}
</style>
