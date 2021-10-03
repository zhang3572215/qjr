<template>
	<div class='content' v-if='showContent'>
		<dates v-if='showVue' :msg="dateFlag" @biography='collageDate'></dates>
		<div v-else>
			<div class='head'>
				<div class='head-fixed'  :class='showHead?"collage-head":""'>
					<div class='head-left' @click="tabReturn">
						<img src="../../assets/left-go.png" mode=""></img>
						<span>返回</span>
					</div>
					<div class='head-center'>
						<span v-if='!showHead'>订单详情</span>
					</div>
					<div class='head-right' @click="toCustomer">
						<img src='../../assets/kefu.png'></img>
					</div>
				</div>

				<div class='head-top'>

				</div>
				<div class='head-bottom'>

				</div>
			</div>
			<div class='order-start'  :class='showHead?"collage-head":""'>
				<div class='start' v-if='info.orderStatus==1'>
					待支付
				</div>
				<div class='start' v-if='info.orderStatus==2'>
					已支付
				</div>
				<div class='start' v-if='info.orderStatus==3'>
					服务中
				</div>
				<div class='start' v-if='info.orderStatus==4'>
					售后
				</div>
				<div class='start' v-if='info.orderStatus==5'>
					交易成功
				</div>
				<div class='start' v-if='info.orderStatus==6'>
					交易关闭
				</div>
				<div class='service' v-if='info.orderStatus==1'>
					订单超过60分钟将会自动取消，请在规定时间内完成支付
				</div>
				<div class='service' v-if='info.orderStatus==2'>
					感谢您的支持，清洁人将尽快为您服务！
				</div>
				<div class='service' v-if='info.orderStatus==3'>
					正在为您服务，有任何问题请致电4008290037
				</div>
			</div>
			<div v-if='info.productType==2'>
				<div class='order-person'>
					<div class='address-img'>
						<img src='../../assets/address-6.png'></img>
					</div>
					<div class='person-info'>
						<div class='person-name'>
							{{info.linkman}}<span>{{info.linkmobile}}</span>
						</div>
						<div class='person-address'>
							<!-- {{info.city}}{{info.district}}{{info.address}} -->
							{{info.address}}
						</div>
					</div>
				</div>
				<div class='meal'>
					<div class='meal-top'>
						<div class='meal-img'>
							<img :src='materUrl'></img>
						</div>
						<div>
							<div class='meal-info'>
								<div>
									办公室清洁-单次保洁
								</div>
								<div class='money'>￥{{info.orderMoney}}</div>
							</div>
							<div class='meal-times'>
								<!-- 	<span class='times'>{{info.totalNums}}次</span>
							<span class='rang'>({{info.beginTime}}-{{info.endTime}}点)</span> -->
								<span class='num'>购买面积：{{info.flatNum}}平，到场时间：{{info.beginTime}}</span>
								<!-- <span class='num'>(共{{info.totalNums}}次<span style="margin-left: 6px;">余{{info.leaveNums}}次</span>)</span> -->

								<!-- <div>
								周一、周二、周三
							</div> -->
							</div>

							<!-- 	<div class='remain' v-if='info.orderStatus==3'>
							剩{{info.leaveNums}}次
						</div> -->
							<div class='meal-times'>
								预约服务日期：<span>{{info.startDate}}</span>
							</div>
							<!-- <div v-if='false'  class='service-date'>
							服务日期：<span>2019.11.21-2019.11.25</span>
						</div> -->
						</div>


					</div>
					<div class='meal-bottom'>
						<div class='price'>
							<div>商品总价</div>
							<div>￥{{info.orderMoney}}</div>
						</div>
						<div class='price'>
							<div>优惠券</div>
							<div>-￥{{info.couponMoney}}</div>
						</div>
						<div class='price'>
							<div>抵用券</div>
							<div>-￥{{info.allowanceMoney}}</div>
						</div>
						<div class='payment'>
							<div>实付款</div>
							<div class='moneys'>￥{{info.payableMoney}}</div>
						</div>
						<div class='stages' v-if='info.isPeriod==1'>
							<div></div>
							<div class='moneys'>(分期为{{info.periodMoney}}*{{info.periodNum}} <span>第{{info.payPeriod+1}}期</span>)</div>
						</div>
					</div>

				</div>
				<div class='order-info'>
					<div class='order-num'>
						<div>订单编号：<span>{{info.orderNo}}</span></div>
						<div class='info-btn' v-clipboard:copy="copyInfo" v-clipboard:success="copy">
							复制
						</div>
					</div>
					<div class='start-date'>下单时间：<span>{{info.orderDate}}</span><span class='mf-left'>{{info.orderTime}}</span></div>
					<div class='pay-time' v-if='info.orderStatus!=1'>付款时间：<span>{{info.payDate}}</span><span class='mf-left'>{{info.payTime}}</span></div>
				</div>
				<div class='after-sale' v-if='false'>
					<div class='after-order'>售后订单：<span>7889999</span></div>
					<div class='applay-tit'>申请时间：<span class='apply-date'>2019-12-12</span><span>12:14:14</span></div>
					<div class='after-type'>售后类型：<span>退款</span></div>
					<span class='reason'>申请原因：<span>不要了</span></span>
				</div>
				<!-- <div class='recent-services' v-if='info.orderStatus==3'>
				<div class='recent-list'>
					<div>排班概况</div>
					<div class='more' @click='tapService(info.orderNo)'>更多</div>
				</div>
				<div class='reason-info'>
					<span class='recent-date'>2019-11-24</span><span class='recent-lady'>陈女士</span><span class='look'>查看详情</span>
				</div>
				<div class='reason-info'>
					<span class='recent-date'>2019-11-24</span><span class='recent-lady'>陈女士</span><span class='look'>查看详情</span>
				</div>
			</div> -->
				<div class='subscribe' v-if='showFlag'>
					<!-- <div class='subscribe-tit'>预约</div> -->
					<div class='select-time' @click="selectDate">选择时间：<span>{{nowDate}}</span></div>
					<div class='btn'>
						<div class='btn-cancel' @click="remove">取消</div>
						<div class='btn-comfirm' @click='comfirm'>确定</div>
					</div>
				</div>
				<div class='shadowArea' v-if='showFlag'>
				</div>
				<div class='order-bottom' v-if='info.orderStatus!=6'>
					<!-- <div class='appointment' v-if='info.orderStatus==2 || info.orderStatus==3' @click="subscribe">预约</div> -->
					<!-- <div v-if='info.orderStatus==3'>联系清洁师</div> -->
					<!-- <div v-if='info.orderStatus==3' class='complaint'>发起投诉</div> -->
					<div class='serveDe' v-if='info.payStatus==1' @click="toServeList()">服务详情</div>
					<div v-if='info.orderStatus==1' @click="pay">去支付</div>
					<div v-if='info.orderStatus==1' class='complaint' @click='cancle(info.id)'>取消订单</div>
					<!-- <div >申请开票</div> -->
					<!-- <div class='complaint'  v-if='false'>历史服务</div> -->
				</div>
			</div>
			<div v-if='info.productType==4'>
				<div class='order-person'>
					<div class='address-img'>
						<img src='../../assets/address-6.png'></img>
					</div>
					<div class='person-info'>
						<div class='person-name'>
							{{info.linkman}}<span>{{info.linkmobile}}</span>
						</div>
						<div class='person-address'>
							{{info.address}}
						</div>
					</div>
				</div>
				<div class='meal'>
					<div class='meal-top'>
						<div class='meal-img'>
							<img src='../../assets/curtians.png'></img>
						</div>
						<div>
							<div class='meal-info'>
								<div>
									窗帘清洁
								</div>
								<div class='money'>￥{{info.orderMoney}}</div>
							</div>
							<div class='meal-times'>

								<span class='num'>{{info.flatNum}}平</span>
								<span class='num'>(共{{info.totalNums}}次<span style="margin-left: 6px;">剩{{info.leaveNums}}次</span>)</span>

								<!-- <div>
								周一、周二、周三
							</div> -->
							</div>



							<!-- <div v-if='false'  class='service-date'>
							服务日期：<span>2019.11.21-2019.11.25</span>
						</div> -->
						</div>


					</div>
					<div class='meal-bottom'>
						<div class='price'>
							<div>商品总价</div>
							<div>￥{{info.orderMoney}}</div>
						</div>
						<div class='price'>
							<div>优惠券</div>
							<div>-￥{{info.couponMoney}}</div>
						</div>
						<div class='price'>
							<div>抵用券</div>
							<div>-￥{{info.allowanceMoney}}</div>
						</div>
						<div class='payment'>
							<div>实付款</div>
							<div class='moneys'>￥{{info.payableMoney}}</div>
						</div>
						<div class='stages' v-if='info.isPeriod==1'>
							<div></div>
							<div class='moneys'>(分期为{{info.periodMoney}}*{{info.periodNum}} <span>第{{info.payPeriod}}期</span>)</div>
						</div>
					</div>

				</div>
				<div class='order-info'>
					<div class='order-num'>
						<div>订单编号：<span>{{info.orderNo}}</span></div>
						<div class='info-btn' @click="copy(info.orderNo)">
							复制
						</div>
					</div>
					<div class='start-date'>下单时间：<span>{{info.orderDate}}</span><span class='mf-left'>{{info.orderTime}}</span></div>
					<div class='pay-time' v-if='info.orderStatus!=1'>付款时间：<span>{{info.payDate}}</span><span class='mf-left'>{{info.payTime}}</span></div>
				</div>
				<div class='after-sale' v-if='false'>
					<div class='after-order'>售后订单：<span>7889999</span></div>
					<div class='applay-tit'>申请时间：<span class='apply-date'>2019-12-12</span><span>12:14:14</span></div>
					<div class='after-type'>售后类型：<span>退款</span></div>
					<span class='reason'>申请原因：<span>不要了</span></span>
				</div>
				<!-- <div class='recent-services' v-if='info.orderStatus==3'>
				<div class='recent-list'>
					<div>排班概况</div>
					<div class='more' @click='tapService(info.orderNo)'>更多</div>
				</div>
				<div class='reason-info'>
					<span class='recent-date'>2019-11-24</span><span class='recent-lady'>陈女士</span><span class='look'>查看详情</span>
				</div>
				<div class='reason-info'>
					<span class='recent-date'>2019-11-24</span><span class='recent-lady'>陈女士</span><span class='look'>查看详情</span>
				</div>
			</div> -->
				<div class='subscribe' v-if='showFlag'>
					<!-- <div class='subscribe-tit'>预约</div> -->
					<div class='select-time' @click="selectDate">选择时间：<span>{{nowDate}}</span></div>
					<div class='btn'>
						<div class='btn-cancel' @click="remove">取消</div>
						<div class='btn-comfirm' @click='comfirm'>确定</div>
					</div>
				</div>
				<div class='shadowArea' v-if='showFlag'>
				</div>
				<div class='order-bottom' v-if='info.orderStatus!=6'>
					<!-- <div class='appointment' v-if='info.orderStatus==2 || info.orderStatus==3' @click="subscribe">预约</div> -->
					<!-- <div v-if='info.orderStatus==3'>联系清洁师</div> -->
					<!-- <div v-if='info.orderStatus==3' class='complaint'>发起投诉</div> -->
					<div class='serveDe' v-if='info.orderStatus==3 || info.orderStatus==2' @click="toServeList()">服务详情</div>
					<div v-if='info.orderStatus==1' @click="pay">去支付</div>
					<div v-if='info.orderStatus==1' class='complaint' @click='cancle(info.id)'>取消订单</div>
					<!-- <div >申请开票</div> -->
					<!-- <div class='complaint'  v-if='false'>历史服务</div> -->
				</div>
			</div>
			<div v-if='info.productType==5'>
				<div class='order-person'>
					<div class='address-img'>
						<img src='../../assets/address-6.png'></img>
					</div>
					<div class='person-info'>
						<div class='person-name'>
							{{info.linkman}}<span>{{info.linkmobile}}</span>
						</div>
						<div class='person-address'>
							{{info.address}}
						</div>
					</div>
				</div>
				<div class='meal'>
					<div class='meal-top'>
						<div class='meal-img'>
							<img src='../../assets/capet-recevice.png'></img>
						</div>
						<div>
							<div class='meal-info'>
								<div>
									地毯清洁
								</div>
								<div class='money'>￥{{info.orderMoney}}</div>
							</div>
							<div class='meal-times'>

								<span class='num'>{{info.flatNum}}平</span>
								<span class='num'>(共{{info.totalNums}}次<span style="margin-left: 6px;">剩{{info.leaveNums}}次</span>)</span>

								<!-- <div>
								周一、周二、周三
							</div> -->
							</div>



							<!-- <div v-if='false'  class='service-date'>
							服务日期：<span>2019.11.21-2019.11.25</span>
						</div> -->
						</div>


					</div>
					<div class='meal-bottom'>
						<div class='price'>
							<div>商品总价</div>
							<div>￥{{info.orderMoney}}</div>
						</div>
						<div class='price'>
							<div>优惠券</div>
							<div>-￥{{info.couponMoney}}</div>
						</div>
						<div class='price'>
							<div>抵用券</div>
							<div>-￥{{info.allowanceMoney}}</div>
						</div>
						<div class='payment'>
							<div>实付款</div>
							<div class='moneys'>￥{{info.payableMoney}}</div>
						</div>
						<div class='stages' v-if='info.isPeriod==1'>
							<div></div>
							<div class='moneys'>(分期为{{info.periodMoney}}*{{info.periodNum}} <span>第{{info.payPeriod+1}}期</span>)</div>
						</div>
					</div>

				</div>
				<div class='order-info'>
					<div class='order-num'>
						<div>订单编号：<span>{{info.orderNo}}</span></div>
						<div class='info-btn' @click="copy(info.orderNo)">
							复制
						</div>
					</div>
					<div class='start-date'>下单时间：<span>{{info.orderDate}}</span><span class='mf-left'>{{info.orderTime}}</span></div>
					<div class='pay-time' v-if='info.orderStatus!=1'>付款时间：<span>{{info.payDate}}</span><span class='mf-left'>{{info.payTime}}</span></div>
				</div>
				<div class='after-sale' v-if='false'>
					<div class='after-order'>售后订单：<span>7889999</span></div>
					<div class='applay-tit'>申请时间：<span class='apply-date'>2019-12-12</span><span>12:14:14</span></div>
					<div class='after-type'>售后类型：<span>退款</span></div>
					<span class='reason'>申请原因：<span>不要了</span></span>
				</div>
				<!-- <div class='recent-services' v-if='info.orderStatus==3'>
				<div class='recent-list'>
					<div>排班概况</div>
					<div class='more' @click='tapService(info.orderNo)'>更多</div>
				</div>
				<div class='reason-info'>
					<span class='recent-date'>2019-11-24</span><span class='recent-lady'>陈女士</span><span class='look'>查看详情</span>
				</div>
				<div class='reason-info'>
					<span class='recent-date'>2019-11-24</span><span class='recent-lady'>陈女士</span><span class='look'>查看详情</span>
				</div>
			</div> -->
				<div class='subscribe' v-if='showFlag'>
					<!-- <div class='subscribe-tit'>预约</div> -->
					<div class='select-time' @click="selectDate">选择时间：<span>{{nowDate}}</span></div>
					<div class='btn'>
						<div class='btn-cancel' @click="remove">取消</div>
						<div class='btn-comfirm' @click='comfirm'>确定</div>
					</div>
				</div>
				<div class='shadowArea' v-if='showFlag'>
				</div>
				<div class='order-bottom' v-if='info.orderStatus!=6'>
					<!-- <div class='appointment' v-if='info.orderStatus==2 || info.orderStatus==3' @click="subscribe">预约</div> -->
					<!-- <div v-if='info.orderStatus==3'>联系清洁师</div> -->
					<!-- <div v-if='info.orderStatus==3' class='complaint'>发起投诉</div> -->
					<div class='serveDe' v-if='info.orderStatus==3 || info.orderStatus==2' @click="toServeList()">服务详情</div>
					<div v-if='info.orderStatus==1' @click="pay">去支付</div>
					<div v-if='info.orderStatus==1' class='complaint' @click='cancle(info.id)'>取消订单</div>
					<!-- <div >申请开票</div> -->
					<!-- <div class='complaint'  v-if='false'>历史服务</div> -->
				</div>
			</div>
			<Load v-if='isLoad'></Load>
			<customer v-if='collageCurstomer' @priming='toCustomer' @define='toPhone'></customer>
			<showMoadel v-if='modelFlag' :cont='msg' :cancelspan='"取消"' :confirmspan='"确定"' @define='confirm' @remove='cancel'></showMoadel>
		</div>
	</div>
</template>

<script>
	import * as axios from '../../untils/ajax.js'
	import customer from '../customerService.vue'
	import dates from '../show-date.vue'

	import {
		mapActions,
		mapGetters
	} from 'vuex'
	export default {
		data() {
			return {
				id: "",
				info: {
					tProductOffice: {
						name: ''
					}
				},
				showFlag: false,
				nowDate: "",
				showContent: false,
				isLoad: false,
				materUrl: '',
				collageCurstomer: false,
				msg: '您确定要预约么？',
				modelFlag: false,
				copyInfo: '',
				showVue: false,
				cancelOrder: false
			}
		},
		components: {
			dates,
			customer
		},
		computed: {
			...mapGetters(['showDate', 'showCurrentListRefresh'])
		},
		methods: {
			...mapActions(['collageCltRefresh']),
			collageDate() {
				this.showVue = !this.showVue
			},
			toCustomer() {
				this.collageCurstomer = !this.collageCurstomer
			},
			toPhone() {
				this.collageCurstomer = !this.collageCurstomer
				window.location.href = 'tel://4008290037'
			},
			tabReturn() {
				// 点击消息推送跳转过来的
				if(this.$getOther.getUrlInfo('isBack')=='1'){
						this.$router.go(-2)
				}else{
						this.$router.go(-1)
				}
				// uni.navigateBack()
			},
			tapService(e) {
				uni.navigateTo({
					url: '/pages/service/daily?orderNo=' + e
				})
			},
			getInfo() {
				// let params = new FormData()
				// params.append('orderId',this.id)
				this.isLoad = true
				let params = new FormData()
				params.append('orderId', this.id)
				axios.post('/office/t-office-order/getOrderDetailByOrderId', params).then(res => {
					if (res.meta.success) {
						console.log(res.data)
						let list = res.data
						let orderTime = list.orderTime.split(' ')
						console.log(orderTime)
						list.orderDate = orderTime[0]
						list.orderTime = orderTime[1]
						let payTime = list.payTime.split(' ')
						this.materUrl = this.configUrl + list.tProductOffice.materPicUrl
						list.payDate = payTime[0]
						list.payTime = payTime[1]
						if (typeof(list.allowanceMoney) == 'string') {

							list.allowanceMoney = 0
						}
						if (typeof(list.couponMoney) == 'string') {

							list.couponMoney = 0
						}
						this.info = list
						this.info.frequency = this.info.frequency.length == 0 ? 0 : this.info.frequency
						if (this.info.productType == 2) {
							this.msg = '您确定要预约办公清洁么？'
						} else if (this.info.productType == 4) {
							this.msg = '您确定要预约窗帘清洁么？'
						} else if (this.info.productType == 5) {
							this.msg = '您确定要预约地毯清洁么？'
						}
						if (this.info.address.includes(')') && this.info.detailAddr.length > 0) {
							this.info.address = this.info.address.substr(0, this.info.address.length - 1) + ',' + this.info.detailAddr +
								')'
						}
						this.copyInfo = this.info.orderNo
						this.showContent = true
						this.isLoad = false
					} else {
						this.isLoad = false
					}
				})
			},
			cancle(id) {
				this.cancelOrder = true
				this.canelId = id
				console.log(44)
				let that = this
				this.modelFlag = true
				this.msg = '是否要取消订单?'

			},
			cancel() {
				this.modelFlag = false
				this.cancelOrder = false
			},
			confirm() {
				if (!this.cancelOrder) {
					this.modelFlag = false
					this.showVue = !this.showVue
					let info = {
						startDate: this.info.startDate,
						orderId: this.info.id,
						beginTime: this.info.beginTime,
						endTime: this.info.endTime,
					}

					this.dateFlag = JSON.stringify(info)
				} else {
					this.modelFlag = false
					let params = new FormData()
					let that = this
					params.append('orderId', this.canelId)
					axios.post('/office/t-office-order/cancelOrder', params).then(res => {
						if (res.meta.success) {
							// that.toast.success('取消成功')
							this.$toast({
								message: '取消成功',
								duration: 1000
							})

							let flag = Number(this.showCurrentListRefresh) + 1

							this.collageCltRefresh(flag)
							setTimeout(() => {
								that.$router.go(-1)
							}, 600)
							// uni.navigateBack({})
						} else {
							this.$toast({
								message: res.meta.msg,
								duration: 1500
							})
							// that.toast.fail('取消失败')
						}
					})
				}

				// uni.navigateTo({
				// 	url: '/pages/component/show-date?info=' + JSON.stringify(info)
				// })
			},
			pay() {
				let id = {
					'id': this.info.id
				}
				this.$router.push({
					"name": 'orderPayment',
					params: id
				})
				// uni.navigateTo({
				// 	url: '/pages/home/orderPayment?id=' + this.info.id
				// })
			},
			subscribe() {
				if (this.info.productType == 2) {
					this.msg = '您确定要预约办公清洁么？'
				} else if (this.info.productType == 4) {
					this.msg = '您确定要预约窗帘清洁么？'
				} else if (this.info.productType == 5) {
					this.msg = '您确定要预约地毯清洁么？'
				}
				this.cancelOrder = false
				this.modelFlag = true

				// this.showFlag = true
			},
			remove() {
				this.showFlag = false
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
				this.showVue = !this.showVue
				// let info = {
				// 	startDate: this.info.startDate,
				// 	orderId: this.info.id,
				// 	beginTime: this.info.beginTime,
				// 	endTime: this.info.endTime,
				// }
				// uni.navigateTo({
				// 	url: '/pages/component/show-date?info=' + JSON.stringify(info)
				// })
			},
			comfirm() {
				this.showFlag = false
				this.isLoad = true
				let that = this
				axios.post('/qjrapi/office/t-office-appoint/postAppoint', {
					startDate: this.info.startDate,
					appointDate: this.nowDate,
					orderId: this.info.id,
					beginTime: this.info.beginTime,
					endTime: this.info.endTime,
				}).then(res => {
					if (res.meta.success) {
						// this.showFlag = false
						this.isLoad = false
						setTimeout(() => {
							that.$toast({
								message: '预约成功',
								duration: 1500
							})
						}, 0)

						setTimeout(() => {
							that.$router.go(-1)
						}, 500)

					} else {

						this.isLoad = false
						setTimeout(() => {
							that.toast.fail(res.meta.msg)
						}, 0)

					}
				})
			},
			toServeList() {
				let id = {
					'orderId': this.id,
					'productType': this.info.productType
				}
				this.$router.push({
					'name': 'serviceDetails',
					params: id
				})
				//             let id={
				//  'orderId':this.id
				// }
				// this.$router.push({'name':'serviceDetails',params:id})
				// uni.navigateTo({
				// 	url: '/pages/service/serviceDetails?orderId=' + this.id
				// })
			},
			copyhttplist(e) {

			},
			copy(e) {
				this.$toast({
					message: '复制成功',
					duration: 1000
				})


			},
		},
		created() {
			
			if (window.localStorage.getItem('wxBrowser')) {
				this.showHead = true
			}
			// this.showHead = true
			// this.id = '1918761091732152464'
			// 点击消息推送跳转过来的
			if(this.$getOther.getUrlInfo('orderId')){
				this.id= this.$getOther.getUrlInfo('orderId')
			}else{
				this.id = this.$route.params.orderId
			}
			// if(options.isRead && options.isRead==2){
			// 	let badgeNumber= uni.getStorageSync('badgeNumber') - 1
			// 	  uni.setStorageSync('badgeNumber',badgeNumber)
			// 	 plus.runtime.setBadgeNumber(badgeNumber)
			// }
			this.getInfo()
			this.nowTime()
			if(this.$route.params.isRead && this.$route.isRead==2){
				
			}
			
			// plus.storage.setItem('hehe','4')
		},
		watch: {
			showDate(newval, oldval) {
				this.nowDate = newval
			}
		}
	}
</script>

<style scoped>
	.content {
		padding-bottom: 1rem;
		box-sizing: border-box;
	}

	.head {
		padding-top: 0.4rem;
		height: 3.40rem;
		width: 100%;
		/* background: #539ef9; */
		background-image: url('../../assets/head-total2.png');
		background-size: 100% 100%;
		text-align: center;
		/* position: relative; */
		box-sizing: content-box;
		color: #fff;
		font-size: 0.33rem;
		display: flex;
		display: -webkit-box;
		display: -webkit-flex;
	}

	.head-fixed {
		padding-top: 0.40rem;
		height: 1.30rem;
		width: 100vw;
		position: fixed;
		top: 0;
		box-sizing: border-box;
		z-index: 10;
		background-image: url('../../assets/head-top2.png');
		background-size: 100% 100%;
	}

	.head-fixed.collage-head {
		top: -0.15rem;
		padding-top: 0;
		/* height: 1rem; */
	}

	.head-top {
		height: 1.30rem;
		width: 100vw;
	}

	.head-bottom {
		height: 2.12rem;
		width: 100vw;
	}


	.head-left {
		height: 100%;
		/* line-height: 0.88rem; */
		float: left;
		width: 30%;
		/* display: flex; */
		position: relative;
	}

	.head-fixed.collage-head .head-right img {
		top: 0.47rem;
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
		/* padding-top: 0.26rem; */
		width: 40%;
		/* height: 0.38rem; */
		display: flex;
		display: -webkit-box;
		display: -webkit-flex;
		justify-content: center;
		-webkit-box-pack: center;
		-webkit-justify-content: center;
		align-items: center;
		-webkit-box-align: center;
		-webkit-align-items: center;
		box-sizing: content-box;
		/* line-height: 88upx; */
		/* span-align: center; */
		float: left;
	}

	.head-right {
		height: 0.36rem;
		/* float: left; */
		/* height: 88upx; */

		padding-top: 0.26rem;
		width: 30%;

	}

	.head-right img {
		display: inline-block;
		width: 0.48rem;
		height: 0.40rem;
		position: absolute;
		right: 0.28rem;
		top: 0.67rem;
	}

	.head-img {
		height: 3.80rem;
		width: 100vw;
	}

	.head-img img {
		display: block;
		width: 100%;
		height: 100%;
	}

	.order-start {
		position: absolute;
		top: 1.53rem;
		color: #fff;
		margin-left: 0.28rem;
	}
  .order-start.collage-head{
  	   top:1.23rem
  }
	.start {
		font-size: 0.34rem;
	}

	.service {
		margin-top: 0.18rem;
		font-size: 0.24rem;
	}

	.order-person {
		background: #fff;
		padding: 0.46rem 0 0.46rem 0.16rem;
		display: flex;
		display: -webkit-box;
		display: -webkit-flex;
		align-items: center;
		-webkit-box-align: center;
		-webkit-align-items: center;
		width: 6.94rem;
		margin: 0 auto;
		margin-top: 0;
		z-index: 3;
		transform: translateY(-50%);
		-webkit-transform: translateY(-50%);
		border-radius: 0.20rem;
		font-size: 0.3rem;
	}

	.address-img img {
		height: 0.48rem;
		width: 0.48rem;
		margin-right: 0.20rem;
	}

	.person-info .person-name {
		font-size: 0.30rem;
		margin-bottom: 0.21rem;
	}

	.person-info .person-name span {
		font-size: 0.26rem;
		color: #666;
		margin-left: 0.22rem;
	}

	.person-info .person-address {
		width: 6rem;
		text-overflow: -o-ellipsis-lastline;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		line-clamp: 2;
		-webkit-box-orient: vertical;
		/* overflow: hidden;
      span-overflow: ellipsis;
      white-space: nowrap; */
	}

	.meal {
		padding: 0.30rem 0.16rem;
		/* 	display: flex;
		flex-direction: column; */
		width: 6.94rem;
		background: #fff;
		margin: 0 auto;
		border-radius: 0.20rem;
		transform: translateY(-0.8rem);
		-webkit-transform: translateY(-0.8rem);
	}

	.meal-top {
		display: flex;
		display: -webkit-box;
		display: -webkit-flex;
		align-items: center;
		-webkit-box-align: center;
		-webkit-align-items: center;
	}

	.meal .meal-img {
		height: 1.2rem;
		width: 1.2rem;
		border: 1px solid #ddd;
		border-radius: 0.1rem;
		overflow: hidden;
		margin-right: 0.24rem;
	}

	.meal .meal-img img {
		width: 100%;
		height: 100%;

	}

	.meal .meal-info {
		display: flex;
		display: -webkit-box;
		display: -webkit-flex;
		justify-content: space-between;
		-webkit-box-pack: justify;
		-webkit-justify-content: space-between;
		align-items: center;
		-webkit-box-align: center;
		-webkit-align-items: center;
		width: 5.12rem;
		font-size: 0.28rem;
		margin-bottom: 0.16rem;
	}

	.meal .meal-info .money {
		/* float: right; */
		color: #e01212;
	}

	.meal-times {
		font-size: 0.24rem;
		color: #868688;
		/* margin-bottom: 0.16rem; */
	}

	.meal-times .times {
		margin-right: 0.20rem;
	}

	.meal-times .num {
		margin-right: 0.10rem;
	}

	.meal-times .rang {
		margin-right: 0.25rem;
	}

	.meal .remain {
		font-size: 0.24rem;
		color: #e01212;
		/* color:#868688; */
	}

	.meal .service-date {
		font-size: 0.24rem;
		color: #868688;
	}

	.meal-bottom {
		width: 100%;
		margin-top: 0.90rem;
	}

	.meal-bottom .price {

		width: 6.62rem;
		display: flex;
		display: -webkit-box;
		display: -webkit-flex;
		justify-content: space-between;
		-webkit-box-pack: justify;
		-webkit-justify-content: space-between;
		color: #999;
		font-size: 0.24rem;
		margin-bottom: 0.10rem;
	}

	.meal-bottom .payment {
		width: 6.62rem;
		display: flex;
		display: -webkit-box;
		display: -webkit-flex;
		justify-content: space-between;
		-webkit-box-pack: justify;
		-webkit-justify-content: space-between;
		align-items: center;
		-webkit-box-align: center;
		-webkit-align-items: center;
		font-size: 0.24rem;

	}

	.meal-bottom .payment .moneys {
		color: #e01212;
	}

	.meal-bottom .stages {
		width: 6.62rem;
		display: flex;
		display: -webkit-box;
		display: -webkit-flex;
		justify-content: space-between;
		-webkit-box-pack: justify;
		-webkit-justify-content: space-between;
		align-items: center;
		-webkit-box-align: center;
		-webkit-align-items: center;
		font-size: 0.22rem;
		margin-top: 0.05rem;
	}

	.meal-bottom .stages span {
		margin-left: 0.15rem;
	}

	.meal-bottom .stages .moneys {
		color: #e01212;
	}

	.order-info {
		padding: 0.3rem 0.16rem;
		background: #fff;
		margin: 0 auto;
		width: 6.94rem;
		border-radius: 0.20rem;
		transform: translateY(-0.6rem);
		-webkit-transform: translateY(-0.6rem);
		font-size: 0.24rem;
		color: #999;
	}

	.order-info .order-num {
		width: 6.62rem;
		display: flex;
		display: -webkit-box;
		display: -webkit-flex;
		justify-content: space-between;
		-webkit-box-pack: justify;
		-webkit-justify-content: space-between;
		margin-bottom: 0.20rem;
	}

	.order-info .order-num .info-btn {
		height: 0.34rem;
		width: 0.87rem;
		border: 1px solid #d6d7dc;
		text-align: center;
		line-height: 0.34rem;
		color: #000;
		border-radius: 0.07rem;
		font-size: 0.2rem !important;
	}

	.order-info .start-date {
		margin-bottom: 0.2rem
	}

	.after-sale {
		padding: 0.30rem 0.16rem;
		margin: 0 auto;
		background: #fff;
		margin: 0 auto;
		width: 6.94rem;
		border-radius: 0.2rem;
		transform: translateY(-0.4rem);
		-webkit-transform: translateY(-0.4rem);
		font-size: 0.24rem;
		color: #999;

	}

	.after-sale div {
		margin-bottom: 0.20rem;
	}

	.after-sale .applay-tit .apply-date {
		margin-right: 0.20rem;
	}

	.recent-services {
		padding: 0.30rem 0.16rem;
		margin: 0 auto;
		background: #fff;
		width: 6.94rem;
		border-radius: 0.20rem;
		transform: translateY(-0.40rem);
		-webkit-transform: translateY(-0.4rem);
	}

	.recent-services .recent-list {
		font-size: 0.30rem;
		display: flex;
		display: -webkit-box;
		display: -webkit-flex;
		justify-content: space-between;
		-webkit-box-pack: justify;
		-webkit-justify-content: space-between;
		width: 6.62rem;
		margin-bottom: 0.20rem;
	}

	.recent-services .more {
		font-size: 0.24rem;
	}

	.recent-services .reason-info {
		color: #999;
		margin-bottom: 0.18rem;
	}

	.recent-date {
		margin-right: 0.40rem;
	}

	.recent-lady {
		margin-right: 0.40rem;
	}

	.look {
		color: #ff5f1e;
		/* color:#169EFF; */
	}

	.order-bottom {
		height: 1rem;
		width: 100vw;
		background: #fff;
		position: fixed;
		bottom: 0;
		display: flex;
		display: -webkit-box;
		display: -webkit-flex;
		align-items: center;
		-webkit-box-align: center;
		-webkit-align-items: center;
		flex-direction: row-reverse;
		-ms-flex-direction: row-reverse;
		-webkit-flex-direction: row-reverse;
		-webkit-box-orient: row-reverse;
		font-size: 0.3rem;

	}

	.order-bottom div {
		width: 1.7rem;
		height: 0.64rem;
		border-radius: 0.32rem;
		border: 1px solid #ff5f1e;
		color: #FF5F1E;
		text-align: center;
		line-height: 0.64rem;
		margin-right: 0.20rem;
		box-sizing: border-box;
	}

	.appointment {}

	.order-bottom .complaint {
		color: #868688 !important;
		border: 1px solid #97979f !important;
	}

	.order-bottom .serveDe {
		color: #fff;
		background: #ff5f1e !important;

	}

	.mf-left {
		margin-left: 0.15rem;
	}

	.shadowArea {
		position: fixed;
		bottom: 0.98rem;
		height: 100%;
		width: 100%;
		background: rgba(0, 0, 0, 0.3);
		z-index: 10;
	}

	.subscribe {
		background: #fff;
		position: absolute;
		width: 5rem;
		top: 4rem;
		left: 50%;
		transform: translateX(-50%);
		-webkit-transform: translateX(-50%);
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
</style>
