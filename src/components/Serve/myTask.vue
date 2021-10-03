<template>
	<div class='containerHeight'>
		<div class='contents'>
			<div class='head'>
				<div class='head-left'>
					<!-- <img src="./img/left-black.png" mode=""></img>
				<span>返回</span> -->
				</div>
				<div class='head-center'>
					我的任务
				</div>
				<div class='head-right' @click='toHistoryTask'>
					历史任务
				</div>
			</div>
		</div>
		<div class='head-show'>
		</div>
		<div class="select-time">
			<div class='select-tit' :class='signId==item.id?"showColor":""' v-for='(item,index) in selectList' @click="collage(item.id)">
				<div>{{item.num}}</div> {{item.name}}
			</div>
		</div>
		<div class='select-display'  v-if='signId<=2'>
		     <div :class="selectFlag?'select-color':''" @click="collageSelect(1)">列表</div>
			 <div  :class="selectFlag?'':'select-color'" @click="collageSelect(2)">
				 地图
			 </div>
		</div>
		<div class='select-show'  :class='signId>2?"showTop":""'>

		</div>
	
		<van-list :finished="finished" @load="onLoad" :offset="10" v-if='selectFlag'>
			<div class='stages-list'>

				<div class='stages' v-for='(item,index) in list'>
					<div class='stages-info'>
						<div class='order-num'>
							<img src='../../assets/order.png'></img>
							<span>服务单号：{{item.serviceNo}}</span>
						</div>

					</div>
					<div class='stages-info'>
						<div class='stages-info-tit'>服务日期</div>
						<div class='info-right addressWidth'>{{item.appointDate}}({{item.week}})</div>
					</div>
					<div class='stages-info'>
						<div>到场时间</div>
						<div class='info-right'>{{item.beginTime}}</div>
					</div>
					<div class='stages-info'>
						<div>清洁类型</div>
						<div class='info-right' v-if='item.type==1'>深度清洁</div>
						<div class='info-right' v-else>日常清洁</div>
					</div>
					<div class='stages-info'>
						<div>服务面积</div>
						<div class='info-right'>{{item.flatNum}}平</div>
					</div>
					<div class='stages-info clean'>
						<div>联系人</div>
						<div class='info-right  linkman'>{{item.linkMan}} <img src="../../assets/task-phone.png" alt="" @click='toPhone(item.linkMobile)'></div>

					</div>
					<div class='stages-info-div info-address'>
						<div>服务地址</div>
						<div class='info-right three-adress-div'>
							{{item.address}}
						</div>

					</div>
					<div class='stages-info-div info-address'>
						<div>特殊说明</div>
						<div class='info-right three-adress-div' v-if="item.remark.length>0">
							{{item.remark}}
						</div>
						<div class='info-right three-adress-div' v-else>
							无
						</div>

					</div>
					<div class='stages-btn' v-if='signId==1 || signId== 5'>

						<div class='btn-right' v-if='item.taskexcStatus==1' @click='signIn(item)'>
							签到
						</div>
						<div class='btn-right' v-if='item.taskexcStatus==2' @click='signOut(item.id,item.addrName,item.addrLon,item.addrLat)'>
							签退
						</div>
					</div>
				</div>

			</div>
		</van-list>
		<!-- <div class="weui-toast weui_loading_toast" style="opacity: 1;" v-if='isLoading'>
			<div class="weui_loading"><i class="weui-loading weui-icon_toast"></i></div>
			<p class="weui-toast_content">加载中</p>
		</div> -->
		<div id="amap-container" v-if='!selectFlag && (signId==1|| signId==2)'>
			<el-amap vid="amapDemo" :center="center" :plugin="plugin" :zoom="zoom">
				<el-amap-marker v-for="(item,index) in selectMarker" :icon='item.icon' :position="item.position"
				 :label='item.label' :key='index'></el-amap-marker>
			</el-amap>
		</div>
		<Load v-if='isLoading'></Load>
		<div class='total-success' v-if='isSuccess'>
			<div class='success-img'><img src="../../assets/true-1.png" alt=""></div>
			<div class='success-tit'>数据加载完了</div>
		</div>
		<div class='total-success' v-if='isFalse'>
			<div class='success-img'><img src="../../assets/fail.png" alt=""></div>
			<div class='success-tit'>请求出错</div>
		</div>
		<empty v-if='showEmpty && selectFlag'></empty>
		<showMoadel v-if='modelFlag' :cont='msg' @define='confirm' @remove='cancel'></showMoadel>
	</div>
</template>

<script>
	import * as axios from '../../untils/ajax.js'
	import {
		mapGetters,
		mapState,
		mapActions
	} from 'vuex'
	export default {
		data() {
			return {
				collageFlag: "left",
				isFalse: false,
				list: [],
				selectList: [{
						id: 1,
						num: 0,
						name: '当日'
					}, {
						id: 2,
						num: 0,
						name: '明日'
					}, {
						id: 3,
						num: 0,
						name: '近一周'
					}, {
						id: 4,
						num: 0,
						name: '近一月'
					},
					{
						id: 5,
						num: 0,
						name: '忘签到'
					}
				],
				signId: 1,
				selectFlag:true,
				time: null,
				pageNo: 1,
				pageSize: 15,
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
				showEmpty: false,
				modelFlag: false,
				msg: '要拨打联系人电话？',
				innerHeight: '',
				scrollTop: "",
				scrollHeight: '',
				contentHeight: '',
				signHeight: '',
				signSuccess: 0,
				endListFalg: false,
				zoom: 14, // 地图缩放级别
				center: [], // 指定地图中心点
				// zoom: 12,
				// center: [121.59996, 31.197646],
				markers: [],
				markerRefs: [],
				source: 'click',
				plugin: [{
					pName: 'Scale',
					events: {
						init(instance) {
							
							// console.log(instance);
						}
					}
				}],
				// plugin: [{
				// 	enableHighAccuracy: true, //是否使用高精度定位，默认:true
				// 	timeout: 100, //超过10秒后停止定位，默认：无穷大
				// 	maximumAge: 0, //定位结果缓存0毫秒，默认：0
				// 	convert: true, //自动偏移坐标，偏移后的坐标为高德坐标，默认：true
				// 	showButton: true, //显示定位按钮，默认：true
				// 	buttonPosition: 'RB', //定位按钮停靠位置，默认：'LB'，左下角
				// 	showMarker: true, //定位成功后在定位到的位置显示点标记，默认：true
				// 	showCircle: true, //定位成功后用圆圈表示定位精度范围，默认：true
				// 	panToLocation: true, //定位成功后将定位到的位置作为地图中心点，默认：true
				// 	zoomToAccuracy: true, //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：f
				// 	extensions: 'all',
				// 	pName: "Geolocation",
				// 	events: {
				// 		init(o) {
				// 			// o 是高德地图定位插件实例
				// 			o.getCurrentPosition((status, result) => {
				// 				// console.log(result.position.lng,result.position.lat);  //  能获取定位的所有信息
				// 				if (result && result.position) {
				// 					// 经纬度
				// 					self.lng = result.position.lng;
				// 					self.lat = result.position.lat;
				// 					// 地址信息
				// 					self.str = result.formattedAddress;
				// 					self.center = [self.lng, self.lat];
				// 					self.loaded = true;
				// 					console.log(result)
				// 					// self.$nextTick();
				// 					// sessionStorage.setItem(
				// 					//   "id",
				// 					//   JSON.stringify(
				// 					//     // result.position.lng + "," + result.position.lat
				// 					//     result.formattedAddress   // 把地址信息储存的本地缓存上
				// 					//   )
				// 					// );
				// 				}
				// 			});
				// 		}
				// 	}
				// }],
				selectMarker: [],
				showMap: false,
				finished: false
			}
		},
		computed: {
			...mapGetters(['showDesId'])
		},
		methods: {
			collage(id) {
				this.signId = id
				if(this.signId>=3){
					this.selectFlag=true
				}
				this.list = []
				this.pageNo = 1
				this.showEmpty = false
				this.isLoading = true
				this.getList()
			},
			collageSelect(e){
				if(e==1){
					this.selectFlag=true
				}else{
					this.selectFlag=false
				}
			},
			signIn(e) {
				let info = {
					id: e.id,
					signId: this.signId,
					address: e.address,
					 addrName:e.addrName,
					LonLat:[e.addrLon,e.addrLat]
				}
				this.$router.push({
					'name': 'signIn',
					params: info
				})
				// uni.navigateTo({
				// 	url: '/pages/Server/signIn?id=' + id+'&signId='+this.signId
				// })
			},

			signOut(id,addrName,lon,lat) {
				let info = {
				    addrName,addrName,
					id: id,
					signId: this.signId,
					LonLat:[lon,lat]
				}
				this.$router.push({
					'name': 'signOut',
					params: info
				})
				// uni.navigateTo({
				// 	url: '/pages/Server/signBack?id=' + id+'&signId='+this.signId
				// })
			},
			toDeatail(id) {
				uni.navigateTo({
					url: '/pages/service/complaintDetails?id=' + id
				})
			},
			toHistoryTask() {
				this.$router.push({
					name: 'historyTask'
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
				this.isLoading = false
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
				if (scrollTop + scrollHeight >= innerHeight) {
					if (this.pullUpState !== 3 && !this.isLoading) {
						this.infiniteLoad()
					}
					// console.log('距顶部' + scrollTop + '滚动条总高度' + scrollHeight + '内容高度' + innerHeight)
				}
				let signHeight = Number(contentHeight) - (Number(innerHeight) + Number(scrollTop))
				let that = this
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
					this.endListFalg = true
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
				this.isLoading = true
				let that = this
				var formdata = new FormData()
				formdata.append("pageNo", this.pageNo)
				formdata.append('pageSize', this.pageSize)
				formdata.append('time', this.signId)
				axios.post(
					'/office/t-office-compose/getCurrentTask',
					formdata
				).then(res => {
					if (res.meta.success) {
						if (this.signId == 1 ||this.signId==2) {

							var addressInfo = []
							res.data.records.forEach((val, index) => {
								if (index == 0) {
									this.center = [val.lon, val.lat]
								}
								let info = {
									addrName: val.addrName,
									positionInfo: [val.lon, val.lat],
									beginTime: val.beginTime
								}
								if (addressInfo.length == 0) {
									addressInfo.push(info)
								} else {
									var flag=true
									addressInfo.forEach(el => {
										if (el.addrName == val.addrName) {
											el.beginTime = el.beginTime + ',' + val.beginTime
											flag=false
										}
									})
									if(flag){
										addressInfo.push(info)
									}
								}

							})
							this.selectMarker = []
							if(addressInfo.length==0){
									this.center = [118.08891,24.479627]
								this.selectMarker.push({
									label: {
										content: ``,
										offset: [-10, -10]
									},
									position: [118.08891,24.479627],
									icon: '',
									direction: 'right'
								})
							}else{
								addressInfo.forEach(val => {
									this.selectMarker.push({
										label: {
											content: `<div>
								              <div>${val.addrName}(${val.beginTime})</</div>
								            </div>`,
											offset: [-10, -10]
										},
										position: val.positionInfo,
										icon: 'https://a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-default.png',
										direction: 'right'
									})
								})
							}
							
							this.showMap = true

						}
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
						if (that.list.length == 0) {
							this.showEmpty = true
						}
						that.list.map(item => {
							if (item.address.includes(')')) {
								if (item.detailAddr.length > 0) {
									let address = item.address.substr(0, item.address.length - 1) + ',' + item.detailAddr + ')'
									item.address = address
								}


							}

							item.week = this.getMyDay(new Date(item.appointDate))
							return item

						})
						that.isLoading = false

					} else {
						that.isFalse = true
						setTimeout(() => {
							that.isFalse = false
						}, 2000)
					}
				})
			},
			cancel() {
				this.modelFlag = false
			},
			confirm() {
				window.location.href = 'tel://' + this.phone
				this.modelFlag = false

			},
			toPhone(e) {
				this.phone = e
				this.modelFlag = true
			},
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
			getTaskNum() {
				axios.post('/office/t-office-compose/getServiceCountByEmployeeId', {}).then(res => {
					if (res.meta.success) {
						this.selectList[0].num = res.data.today
						this.selectList[1].num = res.data.tomorrow
						this.selectList[2].num = res.data.seven
						this.selectList[3].num = res.data.month
						this.selectList[4].num = res.data.forget
					}
				})
			},
			handler(index) {
				alert(`${ index } - trigger`);
			},
			//上拉加载
			onLoad() {
				if (this.isLoading) {
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
				} else {
					this.pageNo = this.pageNo + 1
					this.getList()
				}


			},
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
			var that = this
			var showUrlDesId
			// 点击消息推送跳转过来的
			if(this.$getOther.getUrlInfo('showDesId')=='2'){
				// 等于2是明日
			   if(!window.sessionStorage.getItem('FlagDesId') || (window.sessionStorage.getItem('FlagDesId')=='null')){
				    showUrlDesId=this.$getOther.getUrlInfo('showDesId')
					window.sessionStorage.setItem('FlagDesId','1')
			   }     
			}
			this.selectList.map(item => {
				if (item.id == that.showDesId) {
					that.signId = item.id
				}
				if(item.id==showUrlDesId){
					that.signId = item.id
				}
			})

			console.log(this.signId)

			this.getList()
			this.getTaskNum()


			// let markers = [];
			// let index = 0;

			// let basePosition = [121.59996, 31.197646];
			// let num = 10;

			// for (let i = 0; i < num; i++) {
			// 	markers.push({
			// 		position: [basePosition[0], basePosition[1] + i * 0.03],
			// 		 icon: 'https://a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-default.png',
			// 		template: `<div @click="handler(${ i })">{{ source }} </div>`
			// 	});
			// }
			// this.markers = markers;

			// this.selectMarker = [{
			// 		label: {
			// 			content: `<div>
			//           <div>厦门围里公寓</div>
			//         </div>`,
			// 			offset: [-10, -10]
			// 		},
			// 		position: [118.142653, 24.529723],
			// 		icon: 'https://a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-default.png',
			// 		direction: 'right'
			// 	},
			// 	{
			// 		label: {
			// 			content: `<div>
			//               <div>厦门都市豪华公寓</div>
			//             </div>`,
			// 			offset: [10, 10]
			// 		},
			// 		position: [118.150615, 24.521214],
			// 		icon: 'https://a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-default.png',
			// 		direction: 'right'
			// 	},


			// ]

		},
		beforeDestroy() {
			
		},
		watch: {
			showDesId(newval, oldval) {
				var that = this
				this.pageNo = 1
				this.list = []
				this.getList()
				this.getTaskNum()
			},
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
	@import '../../assets/css/weui.css'

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
		z-index: 1000;
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
		z-index: 2000;
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
		font-size: 0.32rem;
	}

	.head-show {

		height: 1.28rem;
		width: 100%;
	}

	.content {
		/* padding: 0 28upx; */
		width: 100vw;
	}

	.select-time {
		position: fixed;
		top: 1.26rem;
		padding-left: 0.28rem;
		font-size: 0.30rem;
		background: #fff;
		height: 1.2rem;
		width: 100%;
		z-index: 10;
		display: flex;
		display: -webkit-box;
		display: -webkit-flex;
		align-items: center;
		-webkit-box-align: center;
		-webkit-align-items: center;
		/* align-items: center; */
		/* display: flex; */
	}

	.select-show {
		height: 2.02rem;
	}
   .select-show.showTop{
	   height: 1.32rem;
   }
	.select-time .select-tit {
		/* float: left; */
		/* line-height: 0.85rem; */
		text-align: center;
		margin-right: 0.55rem;
	}
  .select-display{
	  position: fixed;
	  top: 2.46rem;
	  font-size: 0.30rem;
	  background: #fff;
	  height: 0.8rem;
	  width: 100%;
	  z-index: 10;
	  display: flex;
	  display: -webkit-box;
	  display: -webkit-flex;
	  align-items: center;
	  -webkit-box-align: center;
	  -webkit-align-items: center;
	  border: 1px solid #ec5300;
	  color: #ec5300;
	  box-sizing: border-box;
  }
  .select-display>div{
	  width: 100%;
	  height: 100%;
	  line-height: 0.82rem;
	  text-align: center;
  }
  .select-display>div.select-color{
	  color: #fff;
	  background: #ec5300;
  }
	.showColor {
		color: #ff5f1e;
	}

	#amap-container {
		width: 100vw;
		height: 74vh;
	
	
	}

	.content-list {
		padding-bottom: 1.1rem;
	}

	.list {
		background: #fff;
		margin: 0.2rem auto;
		width: 6.94rem;
		font-size: 0.30rem;
		border-radius: 0.10rem;
		box-shadow: 0 0.05rem 0.10rem #eee;
	}

	.list-first {
		/* display: flex;
		align-items: center;
		justify-content: space-between; */
		height: 1.10rem;
		border-bottom: 0.01rem solid #ddd;
		padding: 0 0.16rem;
		box-sizing: border-box;
		position: relative;
	}

	.list-first img {
		width: 0.64rem;
		height: 0.64rem;
		margin-right: 0.10rem;
		/* line-height: 1.1rem; */
	}

	.first-left {
		position: relative;
		float: left;
		height: 1.1rem;
		/* display: flex;
		align-items: center; */
	}

	.first-left img {
		position: absolute;
		top: 50%;
		left: 0;
		transform: translateY(-50%);
		-webkit-transform: translateY(-50%);
	}

	.first-left .first-left-text {
		width: 3rem;
		position: absolute;
		top: 50%;
		left: 0.7rem;
		transform: translateY(-50%);
		-webkit-transform: translateY(-50%);
	}

	.first-left .dot {
		width: 0.14rem;
		height: 0.14rem;
		background: #ff2a2a;
		border-radius: 50%;
		position: absolute;
		top: 0.2rem;
		left: 0.57rem;
	}

	.first-right {
		position: absolute;
		top: 50%;
		right: 0.16rem;
		transform: translateY(-50%);
		-webkit-transform: translateY(-50%);

	}

	.list-second {
		padding: 0 0.16rem;
	}

	.second-top {
		/* display: flex;
		align-items: center;
		justify-content: space-between; */
		margin-top: 0.20rem;
		position: relative;
	}

	.second-compay {
		display: flex;
		align-items: center;
	}

	.second-compay img {
		height: 0.33rem;
		width: 0.38rem;
		margin-right: 0.17rem;


	}

	.second-phone {
		height: 0.33rem;
		width: 0.32rem;
		margin-right: 0.12rem;
		position: absolute;
		top: 50%;
		right: 0;
		transform: translateY(-50%);
		-webkit-transform: translateY(-50%);
	}

	.second-time {
		margin-left: 0.55rem;
		margin-top: 0.03upx;
		font-size: 0.26rem;
		color: #5b5b5b;

	}

	.list-three {
		margin-top: 0.23rem;
		/* display: flex;
		align-items: center;
		justify-content: space-between; */
		padding: 0 0.16rem;
		color: #5b5b5b;
		font-size: 0.26rem;
		position: relative;
	}

	.list-three .three-adress {
		display: flex;
		align-items: center;
		width: 4.5rem;
		/*    overflow: hidden;
	    text-overflow:ellipsis;
	    white-space: nowrap; */
		overflow: hidden;
		/** 隐藏超出的内容 **/
		word-break: break-all;
		text-overflow: ellipsis;
		/** 多行 **/
		display: -webkit-box;
		/** 对象作为伸缩盒子模型显示 **/
		-webkit-box-orient: vertical;
		/** 设置或检索伸缩盒对象的子元素的排列方式 **/
		-webkit-line-clamp: 2;
		/** 显示的行数 **/
	}

	.list-three .three-adress .three-adress-info {
		/* 	 display: inline-block;
		 width: 3.8rem;
		 overflow: hidden;
		 text-overflow:ellipsis;
		 white-space: nowrap; */
	}

	.three-adress img {
		width: 0.23rem;
		height: 0.25rem;
		margin-right: 0.06rem;
	}

	.thress-btn {
		height: 0.50rem;
		width: 1.14rem;
		border: 1px solid #ff5f1e;
		color: #ff5f1e;
		border-radius: 0.3rem;
		line-height: 0.5rem;
		text-align: center;
		position: absolute;
		top: 50%;
		right: 0.16rem;
		transform: translateY(-50%);
		-webkit-transform: translateY(-50%);
	}

	.list-four {
		display: flex;
		align-items: center;
		font-size: 0.26rem;
		color: #707070;
		padding: 0.04rem 0.16rem 0.27rem 0.16rem;

	}

	.list-four img {
		height: 0.23rem;
		width: 0.19rem;
		margin-right: 0.10rem;
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


	.stages {
		/* padding: 15px 8px; */
		background: #fff;
		margin: 0.20rem auto 0 auto;
		width: 6.94rem;
		border-radius: 0.10rem;
		font-size: 0.12rem;
		color: #999;
		box-shadow: 0.05rem 0.05rem 0.1rem #ddd;

	}

	.stages>div {
		padding: 0 0.16rem;
		border-bottom: 1px solid #eee;
	}

	.stages>div:last-child {
		border-bottom: none;
	}

	.stages .stages-info {
		/* 	display: flex;
		align-items: center;
		justify-content: space-between; */
		/* position: relative; */
		color: #97979f;
		font-size: 0.28rem;
		height: 0.71rem;
		/* line-height: 0.71rem; */
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

	.stages .stages-info-div {
		/* 	display: flex;
  	align-items: center;
  	justify-content: space-between; */
		/* position: relative; */
		color: #97979f;
		font-size: 0.28rem;
		height: auto;

		min-height: 1rem;
		/* line-height: 0.71rem; */
	}

	.stages .stages-info-div.info-address {
		/* height: 1.42rem !important; */
		min-height: 0.8rem !important;
		max-height: 3rem;
		display: flex;
		display: -webkit-box;
		display: -webkit-flex;
		align-items: center;
		-webkit-box-align: center;
		-webkit-align-items: center;
		justify-content: space-between;
		-webkit-box-pack: justify;
		-webkit-justify-content: space-between;
		padding: 0.1rem 0.18rem;
		/* line-height: 1.42rem; */
	}

	.stages .stages-info .stages-info-tit {
		/* 	position: absolute;
		top: 50%;
		left: 0.16rem;
		transform: translateY(-50%);
		-webkit-transform: translateY(-50%); */
	}

	.info-right {
		color: #707070;

		/* position: absolute;
		top: 50%;
		right: 0.16rem;
		-webkit-transform: translateY(-50%);
 */
	}

	.info-right.three-adress-info {
		display: inline-block;
		width: 4.95rem;
		height: 0.95rem;
		overflow: hidden;
		/* text-overflow:ellipsis; */
		/* white-space: nowrap; */
		word-wrap: break-word;
		word-break: break-all;
		text-align: left;
		pointer-events: none;
		border: solid 1px #666;
	}

	.info-right.three-adress-div {
		display: inline-block;
		width: 4.95rem;
		min-height: 0.8rem !important;
		overflow: hidden;
		padding: 0.05rem 0 0.05rem 0.05rem;
		/* text-overflow:ellipsis; */
		/* white-space: nowrap; */
		/* 	word-wrap: break-word;
  	word-break: break-all; */
		text-align: left;
		pointer-events: none;
		white-space: normal;
		border: solid 1px #666;
		line-height: 0.3rem;
	}

	.info-right.linkman {
		margin-right: 0.7rem;
		position: relative;
	}

	.addressWidth {
		width: 4.50rem;
		text-align: right;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}

	.stages-btn {
		height: 0.90rem;
		line-height: 0.90rem;
		position: relative;
		/* display: flex; */
		/* align-items: center;
		justify-content: space-between; */
	}

	.btn-left {
		font-size: 0.28rem;
		width: 0.9rem;
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
		line-height: 0.58rem;
		text-align: center;
		/* border: 1px solid #ff5f1e; */
		border-radius: 0.15rem;
		color: #fff;
		background: #ff5f1e;
		position: absolute;
		right: 0.16rem;
		top: 50%;
		transform: translateY(-50%);
		-webkit-transform: translateY(-50%);
	}

	.stages-info img {
		height: 0.24rem;
		width: 0.19rem;
		margin-right: 0.08rem;
	}

	.stages-info .order-num {
		display: flex;
		align-items: center;
		color: #707070;

	}

	.stages-info.clean img {
		position: absolute;
		top: 50%;
		right: -0.7rem;
		transform: translateY(-50%);
		-webkit-transform: translateY(-50%);
		height: 0.39rem;
		width: 0.35rem;

	}

	.stages-list {
		padding-bottom: 1.3rem;
	}
</style>
<style>
	.amap-maps .amap-marker .amap-marker-label {
		left: 0.65rem !important;
		top: 0.12rem !important;
		border: none !important;
		color: red;
	}

	.amap-maps .amap-marker .amap-icon {
		transform: scale(0.6);
	}
</style>
