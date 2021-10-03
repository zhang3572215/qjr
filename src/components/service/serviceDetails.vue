<template>
	<div>
		<head-Piece>
			<template slot="content">服务详情</template>
		</head-Piece>
		
		<div class='btn-head' :class='typeFlag?"collageTop":""'>
			<div class='btn-list' @click="collage(3)" :class='sign==3?"sign-color":""'>
				<div>
					{{unCompose}}
				</div>
				待排班
			</div>
			<div class='btn-list' @click="collage(2)" :class='sign==2?"sign-color":""'>
				<div>
					{{unService}}
				</div>
				待服务
			</div>
			<div class='btn-list' @click="collage(1)" :class='sign==1?"sign-color":""'>
				<div>
					{{service}}
				</div>
				已服务
			</div>
		</div>
		<div class='btn-show' :class='typeFlag?"collageHeight":""'>

		</div>
        
        <van-list  @load="onLoad" :offset="100" :immediate-check="false">
		<div class='stages-content'>
			<div class='stages' v-for='(item,index) in list' v-if='sign===3'>
				<!-- <div class='stages' > -->
				<div class='stages-info'>
					<div class='order-num'>
						<img src='../../assets/order.png'></img>
						<span>预约编号：{{item.appointNo}}</span>
					</div>

				</div>
				<div class='stages-info'>
					<div>清洁类型：</div>
					<div class='info-right' v-if='item.type==1'>深度清洁</div>
					<div class='info-right' v-else>日常清洁</div>
				</div>
				<div class='stages-info'>
					<div>预约服务日期：</div>
					<div class='info-right'>{{item.appointDate}}({{item.week}})</div>
				</div>

				<div class='stages-info'>
					<div>到场时辰：</div>
					<div class='info-right'>{{item.beginTime}}</div>
				</div>
				<div class='stages-info  stages-remark'>
					<div>特殊说明：</div>
					<textarea name="" id="" class='info-right three-adress-info' v-if='item.remark.length>0'>{{item.remark}}</textarea>
					<textarea name="" id="" class='info-right three-adress-info' v-else>无</textarea>
					<!-- <div class='info-right'>{{item.remark}}</div> -->
				</div>
				<!-- <div class='stages-btn' v-if='item.buyType==1'>
			
					<div class='btn-right cancle-right' @click="cancle(item.id)" >
						取消
					</div>
				
				</div> -->
			</div>
			<div class='stages' v-for='(item,index) in list' v-if='sign===2'>
				<!-- <div class='stages' > -->
				<div class='stages-info'>
					<div class='order-num'>
						<img src='../../assets/order.png'></img>
						<span>预约编号：{{item.appointNo}}</span>
					</div>

				</div>
				<div class='stages-head'>
					<div class='stages-left'>
						<img :src="item.picUrl" alt="">
					</div>
					<div class='stages-right'>
						<div class='right-info'>
							<div class='name'>{{item.employeeName}}({{item.code}})</div>
							<div class='serve'>服务次数：{{item.serviceNum}}</div>
							<div class='grade'>星级等级：<img v-for="index of item.starLevel" :key="index" src="static/img/activation.png" alt=""></div>

						</div>
						<img class='phone' src="../../assets/phone-4.png" @click="toCustomer(item.mobile)" alt="">
					</div>
				</div>
				<div class='stages-card'>
					<div>
						上岗证/健康证：
							<img v-for='val in item.imgList' :src="val" alt="" @click="prediv(item,val)">
						<!-- <img :src="item.jkUrl" alt=""> -->
					</div>

				</div>
				<div class='stages-news'>
					<div class='stages-type'>
						<div class='type-tit'>
							清洁类型
						</div>
						<div class='type-info' v-if='item.type==1'>
							深度清洁
						</div>
						<div class='type-info' v-else>
							日常清洁
						</div>
					</div>
					<div class='stages-serve'>
						<div class='serve-tit'>
							预约服务时间
						</div>
						<div class='serve-date'>
							{{item.appointDate}}({{item.week}}) <span>{{item.beginTime}}</span>
						</div>
					</div>
				</div>
				<!-- 
				<div class='stages-info' >
					<div>签到时间：</div>
					<div class='info-right'>{{item.signinTime}}</div>
				</div> -->
				<div class='stages-btn'>
					<div class='btn-right comment' v-if='item.assessStatus==1' @click="toComment(item.composeNo)">
						评价
					</div>
					<div class='btn-right ' @click="toComplanit(item.id)">
						投诉
					</div>



				</div>
				<!-- <wimg :show="isShowBigImg" :imgs="item.imgList" :currentImg="current" @close="isShowBigImg = false" v-if='item.imgList.length>0'></wimg> -->
			</div>

			<div class='stages' v-for='(item,index) in list' v-if='sign===1'>
				<!-- <div class='stages' > -->
				<div class='stages-info'>
					<div class='order-num'>
						<img src='../../assets/order.png'></img>
						<span>预约编号：{{item.appointNo}}</span>
					</div>

				</div>
				<div class='stages-head'>
					<div class='stages-left'>
						<img :src="item.picUrl" alt="">
					</div>
					<div class='stages-right'>
						<div class='right-info'>
							<div class='name'>{{item.employeeName}}({{item.code}})</div>
							<div class='serve'>服务次数：{{item.serviceNum}}</div>
							<div class='grade'>星级等级：<img v-for="index of item.starLevel" :key="index" src="static/img/activation.png" alt=""></div>

						</div>
						<img class='phone' src="../../assets/phone-4.png" @click="toCustomer(item.mobile)" alt="">
					</div>
				</div>
				<div class='stages-card'>
					<div>
						上岗证/健康证：
						<img v-for='val in item.imgList' :src="val" alt="" @click="prediv(item,val)">
						<!-- <img :src="item.jkUrl" alt=""> -->
					</div>

				</div>
				<div class='stages-news'>
					<div class='stages-type'>
						<div class='type-tit'>
							清洁类型
						</div>
						<div class='type-info' v-if='item.type==1'>
							深度清洁
						</div>
						<div class='type-info' v-else>
							日常清洁
						</div>
					</div>
					<div class='stages-serve'>
						<div class='serve-tit'>
							预约服务时间
						</div>
						<div class='serve-date'>
							{{item.appointDate}}({{item.week}}) <span>{{item.beginTime}}</span>
						</div>
					</div>
				</div>

				<div class='stages-info'>
					<div>签到时间：</div>
					<div class='info-right'>{{item.signinTime}}</div>
				</div>
				<div class='stages-btn'>
					<div class='btn-right comment' v-if='item.assessStatus==1' @click="toComment(item.composeNo)">
						评价
					</div>
					<div class='btn-right ' @click="toComplanit(item.id)">
						投诉
					</div>
					<!-- v-if='item.assessStatus==2'   -->


				</div>
				
			</div>
		</div>
        </van-list>
		<empty v-if="showEmpty"></empty>
		<Load v-if='isLoad'></Load>
		<div class='subscribe' v-if='showFlag'>
			<div class='subscribe-tit'>预约</div>
			<div class='select-time' @click="selectDate">选择时间：<span>{{nowDate}}</span></div>
			<div class='btn'>
				<div class='btn-cancel' @click="remove">取消</div>
				<div class='btn-comfirm' @click='comfirm'>确定</div>
			</div>
		</div>
		<div class='shadowArea' v-if='showFlag'>
		</div>
		<wimg :show="isShowBigImg" :imgs="imgList" :currentImg="current" @close="isShowBigImg = false" v-if='imgList.length>0'></wimg>
		<!-- <empty v-if="showEmpty"></empty> -->
		<showMoadel v-if='modelFlag' :cont='msg' :cancelspan='"取消"' :confirmspan='"确定"' @define='confirm' @remove='cancel'></showMoadel>
        <div class='total-success' v-if='isSuccess'>
        	<div class='success-img'><img src="../../assets/true-1.png" alt=""></div>
        	<div class='success-tit'>{{successInfo}}</div>
        </div>
	</div>
</template>

<script>
	import wimg from 'w-previewimg'
	import * as axios from '../../untils/ajax.js'
	import {
		mapGetters
	} from 'vuex'
	export default {
		data() {
			return {
				sign: 1,
				id: null,
				pageSize: 100,
				pageNo: 1,
				showEmpty: false,
				isLoad: false,
				list: [],
				total: null,
				showFlag: false,
				nowDate: "",
				info: '',
				collageCurstomer: false,
				phone: '',
				modelFlag: false,
				schedulingId: '',
				msg: "您确定取消预约么？",
				type: 1,
				cancelspan: "取消",
				confirmspan: '确定',
				signNum: 1,
				productType: '',
				unCompose: '',
				service: '',
				unService: '',
				isShowBigImg: false,
				imgList: [],
				current: '',
				typeFlag:false,
                isSuccess: false,
                successInfo:''
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
		computed: {
			...mapGetters(['showDate', 'showComplaintId'])
		},
		components: {
			wimg
		},
		methods: {
			collage(e) {
				this.sign = e
				this.pageNo = 1
				this.list = []
				this.getList()
			},
			getList() {
				this.isLoad = true
				if (this.sign != 3) {
					let params = new FormData()
					params.append('orderId', this.id)
					params.append('isService', this.sign)
					params.append('pageSize', 10)
					params.append('pageNo', this.pageNo)
					this.imgList = []
					axios.post('/office/t-office-compose/getDetailOfServeOrNot', params).then(res => {
						console.log(res)
						if (res.meta.success) {
							let data = res.data.records.map(item => {
								item.imgList=[]
								if (item.sgUrl.length > 0) {
									
									item.sgUrl = this.configUrl + item.sgUrl
									item.imgList.push(item.sgUrl)
								}
								if (item.jkUrl.length > 0) {
									item.jkUrl = this.configUrl + item.jkUrl
									item.imgList.push(item.jkUrl)
								}
								if (item.appointDate) {
									item.week = this.getMyDay(new Date(item.appointDate))
								}
								if (item.picUrl.length > 0) {
									item.picUrl = this.configUrl + item.picUrl
								}
								return item
							})
							if(data[0]){
								  this.imgList=data[0].imgList
							}
                          
							if (this.pageNo > 1) {
								this.list = this.list.concat(data)
							} else {
								this.list = data
							}

							this.total = res.data.totalCounts

							// this.toast.success('验证码已发送')
							this.isLoad = false
							if (this.list.length == 0) {
								this.showEmpty = true
							} else {
								this.showEmpty = false
							}
							this.signNum = 1
						} else {
							this.isLoad = false
							this.$toast({
								message: '获取数据失败',
								duration: 1500
							})

						}

					})
				} else {
					let params = new FormData()
					params.append('orderId', this.id)
					params.append('pageSize', 10)
					params.append('pageNo', this.pageNo)
					axios.post('/office/t-office-appoint/getDetailOfNoArrange', params).then(res => {
						if (res.meta.success) {
							let data = res.data.records.map(item => {
								if (item.appointDate) {
									item.week = this.getMyDay(new Date(item.appointDate))
								}

								return item
							})



							if (this.pageNo > 1) {
								this.list = this.list.concat(data)
							} else {
								this.list = data
							}
							this.total = res.data.totalCounts
							// this.toast.success('验证码已发送')
							if (this.list.length == 0) {
								this.showEmpty = true
							} else {
								this.showEmpty = false
							}
							this.isLoad = false

						} else {
							this.isLoad = false
							// this.toast.fail('获取数据失败')
							this.$toast({
								message: '获取数据失败',
								duration: 1500
							})
						}

					})
				}


			},
			toComplanit(e) {
				let id = {
					composeNo: e
				}
				this.$router.push({
					'name': 'complaintInfo',
					params: id
				})
				// uni.navigateTo({
				// 	url:'/pages/service/complaint?composeNo='+e
				// })
			},
			cancle(id) {
				console.log(44)
				let that = this
				this.schedulingId = id
				this.msg = '您确定取消预约么？'
				this.cancelspan = "取消"
				this.confirmspan = '确定'

				this.type = 1
				this.modelFlag = true

				//    let params=new FormData()
				// params.append('orderId',id)

			},
			cancel() {
				this.modelFlag = false
				this.tabPhone = false
			},
			confirm() {

				this.modelFlag = false
				let that = this
				if (!this.tabPhone) {
					let params = new FormData()
					params.append('id', this.schedulingId)
					if (this.type == 1) {
						axios.post('/office/t-office-appoint/putAppointById', params).then(res => {
							if (res.meta.success) {
								this.$toast({
									message: '取消成功',
									duration: 1500
								})
								// this.$toast.success('取消成功');
								// this.$toast({
								//     message:'取消成功', duration: 1000
								// })
								// that.toast.success('取消成功')
								setTimeout(() => {
									that.$router.go(-1)
								}, 1000)


							} else {
								that.msg = res.meta.msg
								that.cancelspan = "不联系",
									that.confirmspan = '联系'
								that.modelFlag = true
								that.type = 2
								// that.toast.fail(res.meta.msg)

							}
						})
					} else if (this.type == 2) {

						window.location.href = 'tel://4008290037'

					}
				} else {
					window.location.href = 'tel://' + this.phone
				}


			},
			nowTime() {
				var myDate = new Date();
				myDate.setDate(myDate.getDate() + 2); //获取AddDayCount天后的日期  
				var y = myDate.getFullYear();
				var m = (myDate.getMonth() + 1) < 10 ? "0" + (myDate.getMonth() + 1) : (myDate.getMonth() + 1); //获取当前月份的日期，不足10补0  
				var d = myDate.getDate() < 10 ? "0" + myDate.getDate() : myDate.getDate(); //获取当前几号，不足10补0  
				this.nowDate = y + "-" + m + "-" + d;
				console.log()
			},
			selectDate() {
				uni.navigateTo({
					url: '/pages/component/date'
				})
			},

			remove() {
				this.showFlag = false
			},
			subscribe(e) {
				this.showFlag = true
				this.info = this.list[e]
				console.log(this.info)
			},
			toCustomer(e) {
				this.phone = e
				this.tabPhone = true
				let that = this
				this.msg = '要拨打清洁师电话么？'
				this.modelFlag = true

				// uni.showModal({
				// 		  title:'提示',
				// 		  content:'要拨打清洁师电话么？',
				// 		  showCancel:true,
				// 		  cancelspan:'取消',
				// 		  cancelColor:'#323233',
				// 		  confirmspan:'确定',
				// 		  confirmColor:'#323233',
				// 		  success(res){
				// 			  if(res.confirm){
				// 				  uni.makePhoneCall({
				// 				  	phoneNumber:that.phone,
				// 				  	success: () => {

				// 				  	}
				// 				  })
				// 			  }else if(res.cancel){

				// 			  }
				// 		  }
				// })
			},
			toComment(e) {
				let id = this.id
				// uni.setStorageSync('orderId':id)
				this.signNum = 2
				let info = {
					composeNo: e
				}
				this.$router.push({
					'name': 'evaluation',
					params: info
				})
				// uni.navigateTo({
				// 	url:"/pages/service/evaluation?composeNo="+e
				// })
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
			getCount() {
				let params = new FormData()
				params.append('orderId', this.id)
				params.append('ProductType', this.productType)
				axios.post('/office/t-office-compose/getServiceCountByOrderId', params).then(res => {
					if (res.meta.success) {
						this.unCompose = res.data.unCompose
						this.service = res.data.service
						this.unService = res.data.unService
					}
				})
			},
			// 预览图片
			prediv(e,index) {
				this.imgList=e.imgList
				let that = this
				// console.log(typeof that.imgList[index])
				// let img=item.slice(5).toString()
				// console.log(that.imgList[index])
				this.isShowBigImg = true
				this.current = index

			},
            //上拉加载
            onLoad() {
        
            	// if (!this.loadFalg) {
            	// 	return
            	// }
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
            // 点击消息推送跳转过来的
            if(this.$getOther.getUrlInfo('orderId')){
            	this.id= this.$getOther.getUrlInfo('orderId')
            }else{
            	this.id = this.$route.params.orderId//路由跳转过来的
            }
			// this.id = this.$route.params.orderId
			// if(this.$route.params.productType){
			// 	this.productType = this.$route.params.productType
			// }
			this.productType=2//产品类型2目前写死(办公清洁2，家政清洁3，窗帘4.地毯5)
			this.getList()
			this.getCount()
			this.nowTime()
			//是否为微信浏览器
			if(window.localStorage.getItem('wxBrowser')){
					this.typeFlag=true
			}
					
		},
		// onShow() {
		// 	if(this.signNum==2){
		// 		this.pageNo=1
		// 		this.list=[]
		// 		this.getList()
		// 		this.nowTime()
		// 	}
		// },
		watch: {
			showDate(newval, oldval) {
				this.nowDate = newval
			},
			showComplaintId(newval, oldval) {

				this.getList()
			}
		}
	}
</script>

<style scoped>
	.btn-head {
		height: 1.2rem;
		display: flex;
		display: -webkit-box;
		display: -webkit-flex;
		align-items: center;
		-webkit-box-align: center;
		-webkit-align-items: center;
		padding-left: 0.28rem;
		width: 100%;
		background: #fff;
		position: fixed;
		top: 1.28rem;
		z-index: 100;
	}
	.btn-head.collageTop{
		top: 0.68rem;
	}

	.btn-show {
		height: 1.20rem;
	}
  .btn-show.collageHeight{
	  height: 0.95rem;
  }
	.btn-list {
		height: 0.8rem;
		background: #fff;
		width: 1.30rem;
		border-radius: 0.10rem;
		/* line-height: 0.60rem; */
		text-align: center;
		color: #000;
		margin-right: 0.20rem;
		font-size: 0.3rem;
	}

	.btn-list.sign-color {

		color: #ff5f1e;
	}

	.stages-content {
		width: 100vw;
		padding-bottom: 0.20rem;
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
        overflow: hidden;
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
		align-items: center;
		-webkit-box-align: center;
		-webkit-align-items: center;
		/* justify-content: space-between; */
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
		justify-content: flex-end;
		-webkit-justify-content: flex-end;
		align-items: center;
		-webkit-box-align: center;
		-webkit-align-items: center;
		/* flex-direction: row-reverse; */

	}

	.btn-left {
		font-size: 0.28rem;
		width: 1.60rem;
		height: 0.58rem;
		line-height: 0.58rem;
		text-align: center;
		border: 1px solid #ff5f1e;
		border-radius: 0.15rem;
		color: #FF5F1E;
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
		color: #fff;
		background-color: #ff5f1e;
		margin-left: 0.20rem;
		box-sizing: border-box;
	}

	.btn-right.cancle-right {
		border: 1px solid #999 !important;
		color: #000 !important;
		background: #fff !important;
	}

	.btn-right.comment {
		border: 1px solid #ff5f1e !important;
		color: #ff5f1e !important;
		background: #fff !important;
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

	.stages-info.clean {
		position: relative;
	}

	.stages-info.clean img {
		position: absolute;
		top: 50%;
		right: 0.2rem;
		transform: translateY(-50%);
		-webkit-transform: translateY(-50%);
		height: 0.39rem;
		width: 0.27rem;
	}

	.stages-info.stages-remark {
		height: 1.2rem;
	}

	.stages-info .three-adress-info {
		display: inline-block;
		width: 4.95rem;
		height: 0.75rem;
		overflow: hidden;
		/* text-overflow:ellipsis; */
		/* white-space: nowrap; */
		word-wrap: break-word;
		word-break: break-all;
		text-align: left;
		pointer-events: none;
		border: solid 1px #666;
	}

	.shadowArea {
		position: fixed;
		bottom: 0.98rem;
		height: 100%;
		width: 100%;
		background: rgba(0, 0, 0, 0.3);
	}

	.subscribe {
		background: #fff;
		position: absolute;
		width: 5rem;
		top: 4rem;
		left: 50%;
		transform: translateX(-50%);
		-webkit-transform: translateY(-50%);
		z-index: 10;
		border-radius: 0.20rem;

	}

	.subscribe .subscribe-tit {
		font-size: 0.40rem;
		width: 100%;
		text-align: center;
		font-weight: 550;
		margin-top: 0.15rem;
		font-weight: 550;
	}

	.subscribe .select-time {
		margin: 0.20rem 0 0.25rem 0.20rem;
		font-size: 0.30rem;
	}

	.subscribe .select-time span {
		color: #131315
	}

	.subscribe .btn {
		display: flex;
		display: -webkit-box;
		display: -webkit-flex;
		font-size: 0.35rem;
		border-top: 1px solid #eee;
	}

	.subscribe .btn .btn-cancel {
		border-right: 1px solid #edd;
		color: #949494;
	}

	.subscribe .btn>div {
		flex: 1;
		text-align: center;
		height: 1rem;
		line-height: 1rem;
	}

	.stages-head {
		height: 1.7rem;
		width: 100%;
		display: flex;
		display: -webkit-box;
		display: -webkit-flex;
		align-items: center;
		-webkit-box-align: center;
		-webkit-align-items: center;

	}

	.stages-head .stages-left {
		height: 1.3rem;
		width: 1.3rem;
	}

	.stages-head .stages-right {
		position: relative;
		width: 5.4rem;
		padding-left: 0.2rem;
		box-sizing: border-box;
	}

	.stages-left img {
		width: 100%;
		height: 100%;
	}

	.stages-right .right-info .name {
		font-size: 0.32rem;
		color: #000000;
		margin-bottom: 0.1rem;
	}

	.stages-right .right-info .serve {
		font-size: 0.24rem;
		color: #97979f;
	}

	.stages-right .right-info .grade {
		font-size: 0.24rem;
		color: #97979f;
		display: flex;
		display: -webkit-box;
		display: -webkit-flex;
		align-items: center;
		-webkit-box-align: center;
		-webkit-align-items: center;
	}

	.stages-right .right-info .grade img {
		height: 0.25rem;
		width: 0.25rem;
	}

	.stages-right .phone {
		width: 0.4rem;
		height: 0.4rem;
		position: absolute;
		top: 0;
		right: 0.2rem;
	}

	.stages-card {
		height: 2.02rem;
		width: 100%;
		display: flex;
		display: -webkit-box;
		display: -webkit-flex;
		align-items: center;
		-webkit-box-align: center;
		-webkit-align-items: center;
	}

	.stages-card>div {
		font-size: 0.28rem;
		color: #97979f;
		display: flex;
		display: -webkit-box;
		display: -webkit-flex;
		align-items: center;
		-webkit-box-align: center;
		-webkit-align-items: center;
	}

	.stages-card>div img {
		width: 1.62rem;
		height: 1.62rem;
		margin-right: 0.21rem;
	}

	.stages-news {
		height: 1.25rem;
		padding: 0.2rem 0.16rem !important;
		width: 100%;
		box-sizing: border-box;

	}

	.stages-news>div {
		display: inline-block;
	}

	.stages-news .stages-type {
		width: 35%;
		height: 0.86rem;
		line-height: 0.43rem;
		border-right: 1px solid #ccc;
		text-align: center;
		box-sizing: border-box;
		font-size: 0.26rem;
	}

	.stages-type .type-info {
		color: #5f5f6b;
		font-size: 0.26rem;
	}

	.stages-news .stages-serve {
		width: 65%;
		height: 0.86rem;
		text-align: center;
		line-height: 0.43rem;
		font-size: 0.26rem;
	}

	.stages-serve .serve-date {
		font-size: 0.26rem;
		color: #5f5f6b;
	}

	.zhezhao {
		z-index: 300;
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
    
</style>
