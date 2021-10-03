<template>
	<div  class='containerHeight' @touchstart="touchStart($event)" @touchmove="touchMove($event)" @touchend="touchEnd($event)">
		<dates v-if='showVue' :msg="dateFlag" @biography='collageDate'></dates>
		<div v-else>
			<head-Piece>
				<template slot="content">历史任务</template>
			</head-Piece>
			<!-- <div class='contents'>
				<div class='head'>
					<div class='head-left' @click='toBack'>
						<img src="../../assets/left-black.png" mode=""></img>
						<span>返回</span>
					</div>
					<div class='head-center'>
						历史任务
					</div>
					<div class='head-right'>

					</div>
				</div>
			</div>
			<div class='head-show'>
			</div> -->
			<div class='sort'>
				<div class='default-sort' @click="collage(1)">
					<div class='default-tit' :class='flag==1?"showColor":""'>{{sortDefault}}</div>
					<img src="../../assets/bottom-1.png" alt="" v-if='flag==1'>
					<img src="../../assets/bottom-2.png" alt="" v-else>
				</div>
				<div class='senior-sort' @click="collage(2)" :class='flag==2?"showColor":""'>
					<div class='senior-tit'>高级筛选</div>

					<img src="../../assets/bottom-1.png" alt="" v-if='flag==2'>
					<img src="../../assets/bottom-2.png" alt="" v-else>
				</div>
			</div>
			<div class='sort-show'>
				
			</div>
			<div class='sort-date' v-if='flag==1 && sortFlag'>
				<div @click="collageSortDefault('默认排序')">
					<div class='sorting'>默认排序</div><img class='sorting-img' v-if='this.sortDefault=="默认排序"' src="../../assets/true.png" alt="">
				</div>
				<div @click="collageSortDefault('最新日期')">
					<div class='sorting'>最新日期</div><img class='sorting-img' v-if='this.sortDefault=="最新日期"' src="../../assets/true.png" alt="">
				</div>
				<div @click="collageSortDefault('最早日期')">
					<div class='sorting'>最早日期</div><img class='sorting-img' v-if='this.sortDefault=="最早日期"' src="../../assets/true.png" alt="">
				</div>
			</div>
			<div class='showShadow' v-if='flag==1  && sortFlag'>
			</div>
			<div class='high-level' v-if='highFlag && flag==2'>
				<div class='high-tit'>
					服务单号
				</div>
				<input class='ligh-int' type="text" v-model="orderNo">
				<div class='high-tit hign-name'>
					名称
				</div>
				<input class='ligh-int high-linkName' type="text" v-model="linkName">
				<div class='high-tit hign-server'>
					服务日期
				</div>
				<div class='high-date'>
					<div class='start-date' id='date' @click="selecStartDate">
						<span v-if='beginServeDate==null'>开始日期</span>
						<span v-else>{{beginServeDate}}</span>
					</div>
					<div class='end-date' @click='selecEndDate'>
						<span v-if='endServeDate==null'>结束日期</span>
						<span v-else>{{endServeDate}}</span>
					</div>
					<div class='btn' @click="reset">重置日期</div>
				</div>
				<div class='high-bottom'>
					<div class='high-cancle' @click="cancle">取消</div>
					<div class='high-confirm' @click="confirm">确定</div>
				</div>
			</div>

			<div class='content'>
				<div class='list' v-for='(item,index) in list' :key='index' @click='toDeatail(item.id)'>
				   <div v-if='item.productType==2'>
					<div class='list-head'>
						<div class='head-date'>{{item.appointDate}} <span>({{item.beginTime}}-{{item.endTime}}点)</span></div>
						<div class='head-tit'>办公室清洁</div>
					</div>
					<div class='list-content'>
						<div class='list-company'>{{item.linkMan}}</div>
						<div class='list-look'>
							<div class='look'>查看详情</div>
							<img src="../../assets/right-go.png" alt="">
						</div>
					</div>
					<div class='list-address'>
						<img src="../../assets/address.png" alt="">
						<div class='address' >{{item.address}}</div>	
					</div>
				   </div>
				   <div v-if='item.productType==4'>
				   					<div class='list-head'>
				   						<div class='head-date'>{{item.appointDate}} <span>({{item.beginTime}}-{{item.endTime}}点)</span></div>
				   						<div class='head-tit'>窗帘清洁</div>
				   					</div>
				   					<div class='list-content'>
				   						<div class='list-company'>{{item.linkMan}}</div>
				   						<div class='list-look'>
				   							<div class='look'>查看详情</div>
				   							<img src="../../assets/right-go.png" alt="">
				   						</div>
				   					</div>
				   					<div class='list-address'>
				   						<img src="../../assets/address.png" alt="">
				   						<div class='address'>{{item.address}}</div>
				   					
				   					</div>
				   </div>
				   <div v-if='item.productType==5'>
				   					<div class='list-head'>
				   						<div class='head-date'>{{item.appointDate}} <span>({{item.beginTime}}-{{item.endTime}}点)</span></div>
				   						<div class='head-tit'>地毯清洁</div>
				   					</div>
				   					<div class='list-content'>
				   						<div class='list-company'>{{item.linkMan}}</div>
				   						<div class='list-look'>
				   							<div class='look'>查看详情</div>
				   							<img src="../../assets/right-go.png" alt="">
				   						</div>
				   					</div>
				   					<div class='list-address'>
				   						<img src="../../assets/address.png" alt="">
				   						<div class='address' >{{item.address}}</div> 			
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
				<div class='success-img'><img src="../../assets/true-1.png" alt=""></div>
				<div class='success-tit'>数据加载完了</div>
			</div>
			<div class='total-success' v-if='isFalse'>
				<div class='success-img'><img src="../../assets/fail.png" alt=""></div>
				<div class='success-tit'>请求出错</div>
			</div>
			<empty v-if='showEmpty'></empty>
		</div>
	</div>
</template>

<script>
	import {
		mapGetters,mapActions
	} from 'vuex'
	import dates from './dates.vue'
	import * as axios from '../../untils/ajax.js'
	export default {
		data() {
			return {
				collageFlag: "left",
				isFalse: false,
				selectList: [{
					id: 1,
					name: '当日'
				}, {
					id: 2,
					name: '明日'
				}, {
					id: 3,
					name: '近一周'
				}, {
					id: 4,
					name: '近一月'
				}],
				flag: '',
				signId: 1,
				sortDefault: '默认排序',
				sortFlag: false,
				highFlag: false,
				sorts: 'asc',
				orderNo: null,
				linkName: null,
				time: null,
				pageNo: 1,
				pageSize: 8,
				total: 0,
				top: 0,
				pullUpState: 0, // 1:上拉加载更多, 2:加载中……, 3:我是有底线的
				isLoading: false, // 是否正在加载
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
				beginServeDate: null,
				endServeDate: null,
				showVue: false,
				dateFlag: 'start',
				list: [{productType:''}],
				showEmpty: false,
				toBackInfo:'',
				innerHeight:'',
				scrollTop:"", 
				scrollHeight:'',
				 contentHeight:'',
				 signHeight:'',
				 signSuccess:0,
				 endListFalg:false,
				 moveSign:true

			}
		},
		components: {
			dates
		},
		computed: {
			...mapGetters(['showDate', 'showDateStart', 'showDateEnd'])
			
		},
		methods: {
			...mapActions(['addShowDes']),
			collageDate() {
				this.showVue = !this.showVue
			},
			collage(id) {
				this.flag = id
				if (this.flag == 1) {
					this.sortFlag = !this.sortFlag
					this.highFlag = false
					if(this.sortFlag){
						// 禁止页面滚动
						 document.body.style.overflow = 'hidden'
						 document.body.addEventListener('touchmove', this.bodyScroll, { passive: false });
						 this.moveSign=false
					}else{
						// 解除页面滚动
						this.moveSign=true
						document.body.style.overflow = '' // 出现滚动条
						document.body.removeEventListener('touchmove', this.bodyScroll, { passive: false });
					}
				} else if (this.flag == 2) {
					this.sortFlag = false
					this.highFlag = !this.highFlag
					if(this.highFlag){
						// 禁止页面滚动
						this.moveSign=false
						 document.body.style.overflow = 'hidden'
						  document.body.addEventListener('touchmove', this.bodyScroll, { passive: false });
					}else{
						// 解除页面滚动
						document.body.style.overflow = '' // 出现滚动条
						document.body.removeEventListener('touchmove', this.bodyScroll, { passive: false });
						this.moveSign=true
					}
				}
			},
			bodyScroll(event){
			    event.preventDefault();  
			},
			cancle() {
				this.highFlag = !this.highFlag
				document.body.style.overflow = '' // 出现滚动条
				this.moveSign=true
				document.body.removeEventListener('touchmove', this.bodyScroll, { passive: false });
			},
			confirm() {
				this.highFlag = !this.highFlag
                 document.body.style.overflow = '' // 出现滚动条
                 document.body.removeEventListener('touchmove', this.bodyScroll, { passive: false });
				 this.pageNo=1
				 this.list=[]
				this.getList()
				this.moveSign=true
			},
			collageSortDefault(e) {
				this.sortDefault = e
				this.sortFlag = !this.sortFlag
				if (this.sortDefault == '最新日期') {
					this.sorts = 'desc'
				} else {
					this.sorts = 'asc'
				}
				this.pageNo=1
				this.list=[]
				this.getList()
				this.moveSign=true
				document.body.style.overflow = '' // 出现滚动条
				document.body.removeEventListener('touchmove', this.bodyScroll, { passive: false });
			},
			toDeatail(id) {
				let info={
				   id:id
				}
				this.$router.push({'name':'taskDetails',params:info})
				// uni.navigateTo({
				// 	url: '/pages/Server/taskDetails?id=' + id
				// })
			},
			touchStart(e) {
				this.startX = e.touches[0].pageX
				this.startY = e.touches[0].pageY
			},
			touchMove(e) {
				if(!this.moveSign){
					return
				}
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
		
				}
				let signHeight=Number(contentHeight)-( Number(innerHeight)+Number(scrollTop))
				let that=this
				 if(signHeight<100){
					if (that.total <= that.list.length && that.total>0) {
					  
						that.signSuccess=that.signSuccess+1
						
					}
				   }
			},
			infiniteLoad() {
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
			getList() {
				// $.showLoading()
				let that = this
				this.isLoading = true
				var formdata = new FormData()
				formdata.append("pageNo", this.pageNo)
				formdata.append('pageSize', this.pageSize)
				formdata.append('beginServeDate', this.beginServeDate)
				formdata.append('endServeDate', this.endServeDate)
				if (this.orderNo != null) {
					formdata.append('serviceNo', this.orderNo)
				} else if (this.linkName != null) {
					formdata.append('linkMan', this.linkName)
				}
				formdata.append('sort', this.sorts)
				axios.post('/office/t-office-compose/getHistoryTask', formdata).then(res => {
					if (res.meta.success) {
						that.total = Number(res.data.totalCounts)
						let data=res.data.records.map(item=>{
							 if(item.address.includes(')')){
								 if(item.detailAddr.length>0){
									 let  address=item.address.substr(0,item.address.length-1)+','+item.detailAddr+')'
									  item.address=address
								 }
								
								  return item
							 }else{
                                 	  return item
                             }
							
						})
                        console.log(data)
						if (that.pageNo === 1) {
							that.list = data
						} else {
							that.list = that.list.concat( data)
						}
						console.log(that.list)
						if (that.list.length == 0) {
							this.showEmpty = true
						}
						
						// that.list.map(item=>{
						// 	 if(item.address.includes(')')){
						// 		 if(item.detailAddr.length>0){
						// 			 let  address=item.address.substr(0,item.address.length-1)+','+item.detailAddr+')'
						// 			  item.address=address
						// 		 }
								
						// 		  return item
						// 	 }
							
						// })
						this.isLoading = false
					} else {
						this.isLoading = false
						this.isFalse = true
						setTimeout(() => {
							that.isFalse = false
						}, 1500)
					}

				})
			},
			getQuery(name) {
				// 正则：[找寻'&' + 'url参数名字' = '值' + '&']（'&'可以不存在）
				let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
				let r = window.location.search.substr(1).match(reg);
				if (r != null) {
					// 对参数值进行解码
					return unescape(r[2]);
				}
				return null;
			},
			bodyScroll(event) {
				event.preventDefault();
			},
			selecStartDate() {
				// this.$router.push({
				// 	name: 'dates',
				// 	params: {
				// 		'date': 'start'
				// 	}
				// })
				// uni.navigateTo({
				// 	url: '/pages/component/date?date=' + 'start'
				// })
				this.dateFlag = 'start'
				this.showVue = !this.showVue
			},
			selecEndDate() {
				// uni.navigateTo({
				// 	url: '/pages/component/date?date=' + 'end'
				// })
				this.dateFlag = 'end'
				this.showVue = !this.showVue
			},
			toBack() {
				document.body.style.overflow = '' // 出现滚动条
				document.body.removeEventListener('touchmove', this.bodyScroll, { passive: false });
				if(this.toBackInfo=='news'){
					this.addShowDes('my')
					this.$router.push({
						name: 'serverIndex'
					})
				}else{
					this.$router.go(-1)
				}
				
			},
			reset(){
				this.beginServeDate=null
				this.endServeDate=null
			}
		},
		created() {
			this.getList()
            this.toBackInfo=this.$route.params.new
          // history.pushState(null, null, document.URL);
          //        window.addEventListener('popstate', function () {
          //            history.pushState(null, null, document.URL);
          // });
		},
		watch: {
			showDate(newval, oldval) {
				this.nowDate = newval
				this.week = []
				console.log(this.nowDate)
			},
			showDateStart(newval, oldval) {
				this.beginServeDate = newval.date
			},
			showDateEnd(newval, oldval) {
				this.endServeDate = newval.date
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
   *{
	  margin:0; padding:0;
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
		/* position: relative; */
		box-sizing: content-box;
		/* color:#fff; */
		font-size: 0.33rem;
		z-index: 20000;
	}

	.head-left {
		height: 100%;
		/* line-height: 0.88rem; */
		float: left;
		width: 30%;
		/* display: flex; */
		position: relative;
	}

	.head-left img {
		display: inline-block;
		width: 0.18rem;
		height: 0.32rem;
		position: absolute;
		margin-left: 0.28rem;
		top: 50%;
		left: 0;
		transform: translateY(-50%);
		-webkit-transform: translateY(-50%);
	}

	.head-left span {
		margin-left: 0.35rem;
		font-size: 0.32rem;
		position: absolute;
		top: 50%;
		left: 0;
		transform: translateY(-50%);
		-webkit-transform: translateY(-50%);
		width: 50%;
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
		font-size: 0.32rem;
	}

	.head-show {

		height: 1.28rem;
		width: 100%;
	}
  .sort-show{
	  height: 1rem;
  }
	.sort {
		display: flex;
		align-items: center;
		background: #fff;
		width: 100%;
		border-top: 1px solid #d9dada;
		position: fixed;
		top: 1.27rem;
		z-index: 2;
	}
    
	.sort>div {
		width: 50%;
		font-size: 0.28rem;
		/* display: flex;
		align-items: center;
		justify-content: center; */
		height: 0.8rem;
	}

	.sort .default-sort {
		border-right: 1px solid #d9dada;
		box-sizing: border-box;
		float: left;
		/* position: relative; */
		text-align: center;
	}

	.sort .default-sort .default-tit {
	   line-height: 0.8rem;
	    display: inline-block;
	}

	.sort .showColor {
		color: #ff5f1e;
	}

	.default-sort img {
		width: 0.22rem;
		height: 0.12rem;
		margin-left: 0.14rem;
		margin-top: 0.05rem;
		 display: inline-block;
		 
	}

	.senior-sort {
		float: right;
		/* position: relative; */
			text-align: center;
	}
  .senior-sort .senior-tit{
	   line-height: 0.8rem;
	    display: inline-block;
  }
	.senior-sort img {
		width: 0.22rem;
		height: 0.12rem;
		margin-left: 0.14rem;
		margin-top: 0.05rem;
		display: inline-block;
	}

	.content {
		height: 100%;
	     padding-bottom: 0.3rem !important;
	}

	.list {
		width: 6.94rem;
		background: #fff;
		margin: 0.2rem auto 0 auto;
		padding: 0 0.16rem;
		border-radius: 0.2rem;
		box-shadow: 0.05rem 0.05rem 0.1rem #EDEDED;
	}
     .list:nth-child(1){
		  margin-top: 0;
	 }
	.list-head {
		/* display: flex;
		align-items: center;
		justify-content: space-between; */
		font-size: 0.28rem;
		height: 0.7rem;
		line-height: 0.7rem;
		border-bottom: 1px solid #ddd;
	}

	.list-head .head-date {
		color: #5b5b5b;
		float: left;
	}

	.list-head .head-tit {
		color: #ff5f1e;
		float: right;
	}

	.list-content {
		margin-top: 0.18rem;
		/* display: flex;
		align-items: center;
		justify-content: space-between; */
		height: 0.35rem;
		line-height: 0.35rem;
	}

	.list-content .list-company {
		font-size: 0.3rem;
		float: left;
		height: 0.35rem;
		line-height: 0.35rem;
	}

	.list-content .list-look {
		/* display: flex;
		align-items: center; */
		font-size: 0.24rem;
		color: #0396ff;
		float: right;
		height: 0.35rem;
		line-height: 0.35rem;
		 display:table;      
		vertical-align:middle;
		/* display: inline-block; */
	}
   .list-content .list-look .look{
	   display: inline-block;
	   /* height: 0.35rem; */
	   /* line-height: 0.35rem; */
	   /* width: 1rem; */
	 /*  	position: absolute;
	   	top: 50%;
		right: 0.5rem;
		transform: translateY(-50%);
	   	-webkit-transform: translateY(-50%); */
	     
	   vertical-align:middle
   }
	.list-content .list-look img {
		height: 0.22rem;
		width: 0.12rem;
		/* margin-top: 0.035rem; */
		margin-left: 0.085rem;
		display: inline-block;
		line-height: 0.35rem;
		vertical-align:middle
	}

	.list .list-address {
		/* display: flex;
		align-items: center; */
	/* 	margin-top: 0.2rem;
		padding-bottom: 0.4rem; */
		height: 0.9rem;
		/* line-height: 0.3rem; */
		position: relative;
	}

	.list-address img {
		height: 0.24rem;
		width: 0.19rem;
		/* margin-top: 0.03rem; */
		margin-right: 0.09rem;
		/* display: inline-block; */
		/* line-height: 0.3rem; */
		/* vertical-align: middle; */
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		-webkit-transform: translateY(-50%);
	}

	.list .list-address .address {
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		-webkit-transform: translateY(-50%);
		margin-left: 0.27rem;
		display: inline-block;
		font-size: 0.26rem;
		color: #5a5a5a;
		width: 6rem;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		/* line-height: 0.3rem; */
		
	}

	.sort-date {
		position: fixed;
		top: 2.08rem;
		z-index: 10;
		width: 100vw;
		background: #fff;
	}

	.sort-date>div {
		height: 0.7rem;
		line-height: 0.7rem;
		width: 100%;
		padding-left: 0.28rem;
		font-size: 0.3rem;
		border-bottom: 1px solid #eee;
		box-sizing: border-box;
		position: relative;
	/* 	display: flex;
		align-items: center;
		justify-content: space-between; */
	}
    .sort-date .sorting{
		float: left;
	}
	.sort.date .sorting-img{
		
	}
	.sort-date>div:nth-child(3) {
		border-bottom: none;
	}

	.sort-date>div img {
		height: 0.35rem;
		width: 0.3rem;
		margin-right: 0.28rem;
		position: absolute;
		top: 50%;
		right: 0;
		transform: translateY(-50%);
		-webkit-transform: translateY(-50%);
	}

	.high-level {
		background: #fff;
		width: 100%;
		height: 100%;
		position: fixed;
		top: 2.08rem;
		z-index: 100;
		padding: 0 0.16rem;
		box-sizing: border-box;
	}

	.high-tit {
		font-size: 0.28rem;
		color: #999999;
		height: 0.7rem;
		line-height: 0.7rem;
	}

	.ligh-int {
		outline-style: none;
		border: 1px solid #ccc;
		border-radius: 0.05rem;
		padding: 0.14rem 0.14rem;
		height: 0.3rem;
		width: 4rem;
		transform: translateY(-0.6rem);
		-webkit-transform: translateY(-0.6rem);
		font-size: 0.28rem;
		background: #eee;
	}

	.hign-name {
		transform: translateY(-0.6rem);
		-webkit-transform: translateY(-0.6rem);
	}

	.high-linkName {
		transform: translateY(-1.2rem);
		-webkit-transform: translateY(-1.2rem);
	}

	.hign-server {
		transform: translateY(-1.2rem);
			-webkit-transform: translateY(-1.2rem);
	}

	.high-date {
		/* display: flex;
		align-items: center; */
	
	}

	.high-date>div {
		border: 1px solid #ccc;
		border-radius: 0.05rem;
		padding: 0.14rem 0.14rem;
		height: 0.3rem;
		transform: translateY(-1.25rem);
		-webkit-transform: translateY(-1.25rem);
		font-size: 0.28rem;
		background: #eee;
		width: 1.5rem !important;
		line-height: 0.3rem;
		text-align: center;
	}
	.high-date .start-date{
		float: left;
	}
      .high-date .end-date{
      	float: left;
      }
	.high-date>div:nth-child(1) {
		margin-right: 0.2rem;
	}
     
	.high-date .btn {
		float: right;
		padding: 0.14rem 0.14rem;
		height: 0.3rem;
		line-height: 0.3rem;
		width: 1.3rem;
		background: linear-gradient(to right, #0099FF, #0066CC);
		font-size: 0.28rem;
		transform: translateY(-1.25rem);
		-webkit-transform: translateY(-1.25rem);
		/* line-height: 0.3rem; */
		text-align: center;
		color: #fff;
		border-radius: 0.7rem;
		margin-left: 1rem;
	}

	.high-bottom {
		position: fixed;
		bottom: 1rem;
	/* 	display: flex;
		align-items: center;
		justify-content: space-between; */
		width: 100%;
	}

	.high-bottom .high-cancle {
		float: left;
		height: 1rem;
		width: 3rem;
		background: #ddd;
		font-size: 0.35rem;
		line-height: 1rem;
		text-align: center;
		border-radius: 0.7rem;
		color: #000 !important;
		margin-left: 0.2rem;
	}

	.high-bottom .high-confirm {
		float: right;
		height: 1rem;
		width: 3rem;
		background: linear-gradient(to right, #33CCFF, #0066FF);
		font-size: 0.35rem;
		line-height: 1rem;
		text-align: center;
		border-radius: 0.7rem;
		color: #000 !important;
		margin-right: 0.52rem;
		color: #fff !important;
	}

	.showShadow {
		width: 100vw;
		height: 100%;
		background: rgba(0, 0, 0, 0.3);
		position: fixed;
		top: 2.08rem;
		z-index:1;
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
	.zhezhao{
		z-index: 3;
	}
</style>
