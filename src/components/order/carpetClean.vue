<template>
	<div class='container' @scroll="scrollEvent">

		<div class='head' :class='showDistance?"showTop":""'>
			<div class='head-left' @click="tabReturn">
				<img src="../../assets/right-shadow.png"></img>
				<!-- <span>返回</span> -->
			</div>
			<div class='head-center'>
				<!-- 月度套餐 -->
			</div>
			<div class='head-right' @click="toShare">
				<img src='../../assets/share-shadow.png'  v-if='!showWx'></img>
			</div>
		</div>
		<div class='showHead' v-if='collageHead'>
			<div class='head' :class='showDistance?"showTop":""'>
				<div class='head-left' @click="tabReturn">
					<img src="../../assets/left-black.png" mode=""></img>

				</div>
				<div class='head-center'>
					服务详细
				</div>

				<div class='head-right' @click="toShare">
					<img src='../../assets/fenxiang.png'  v-if='!showWx'></img>
				</div>
			</div>
		</div>
		<div class='carpet-meal'>

			<van-swipe :autoplay="2000" :loop="true" indicator-color="#fff">
				<van-swipe-item v-for="(item, index) in picList" :key="index">
					<img :src="item">
				</van-swipe-item>
			</van-swipe>
			<!-- <swiper :options="homeSwiperOption" class="swiper-container" v-if="picList.length >= 1">
				<swiper-slide :data-link='item' v-for="(item,index) in picList" :key="index">
					
					<div class='showDot'>
						<img :src="item" alt="">
					</div>
				</swiper-slide>
				常见的小圆点
				<div class="swiper-pagination" v-for="(item,index) in  picList" :key="index" slot="pagination"></div>
			</swiper>
			
		
				<swiper :options="swiperOptionBanner" class="swiper-container"  v-if="picList.length ===1">
					<swiper-slide v-for="(item,index) in banner" :key="index">
						<img :src="item.picUrl" alt="" >
					</swiper-slide>
			
				</swiper> -->

		</div>
		<div class='content'>
			<div class='content-top'>
				<!-- 			<div class='content-title'>
				办公室清洁 <span style="margin-left: 10px;">活动期间1元体验1次</span>
			</div> -->
				<div class='content-money'>
					<!-- <span class='newMoney'>￥{{totalPrice}}</span> -->
					<div>
						<span class='newMoney'>￥<span class='newMoney-num'>{{totalAssemblePrice}}</span></span>
						<span class='active-money'>拼团价</span>
					</div>
					<div class='clean-name'>
						<!-- {{productTitle}} -->
						地毯清洁
					</div>
					<!-- <span class='count'>折价后</span>
				<span class='oldMoney'>￥{{discountPrice}}</span> -->
				</div>
				<div class='content-time'>
					<div class='cost-price'>
						原价<span>￥{{totalOriginalPrice}}</span>
					</div>
					<div class='cost-time'>
						<!-- 活动仅剩29天12时12分12秒 -->
					</div>
				</div>
			</div>
			<div class='content-title'>
				<div class='title-first'>
					<div class='title-assemble'>拼团</div>
					<div>
						<!-- {{productTitle}} -->
						地毯清洁
					</div>
				</div>
				<div class='title-second'>
					标准服务，深度清洗
				</div>
			</div>

			<div class='elastic'>


				<div class='elastic-bottom'>
					<div class='elastic-select showTop'>
						<div class='select-title'>地毯类别</div>
						<div class='select-categoryList'>
							<div class='count-info' v-for='(item,index) in  categoryList ' :class="categoryId == item.typeId?'countColor':''"
							 :key='index' @click='tabCategory(item)'>{{item.content}}</div>
						</div>
					</div>
					<div class='elastic-select showTop'>
						<div class='select-title'>价格区间</div>
						<div class='select-count '>
							<div class='count-info' v-for='(item,index) in  goodsList ' :key='index' :class="goodsId == item.typeId?'countColor':''"
							 @click="tabgoods(item)">{{item.priceClassName}}</div>
						</div>
					</div>
					<div class='elastic-select showTop'>
						<div class='select-title'>购买面积(或数量)</div>
						<div class='select-input'>
							<input type="text" class='area' v-model="area" @input="changeNumber">平方(或块)
						</div>
					</div>
					<!-- <div class='elastic-select showTop'>
						<div class='select-title'>请输入清洁面积<span>（租赁面积）</span></div>
						<div class='space'>
							<input class='area' type="number" v-model="area" @input="changeNumber" ref="inputVal" />
							<span>平</span>
						</div>
					</div> -->
					<!-- 	<div class='buy-info'>
						<div>
							请选择购买次数
						</div>
						<div class='buy-right'>
							<div class='buy-jia' @click="reduce">
								<img src='../../static/jian.png'></img>
							</div>
							<div class='buy-num'>
								{{frequency}}
							</div>
							<div class='buy-jian' @click="add">
								<img src='../../static/jia.png'></img>
							</div>
						</div>
					</div> -->

				</div>

			</div>
			<!-- <div class='content-head'>
				<div>
					<span class='head-discount'>优惠</span>
					<span class='head-money'>￥{{couponNum}}</span>
					<span class='head-count'>减额卷</span>
				</div>
				<div class='head-rights' @click="obtainCoupon">
					<div>立即领取</div>
					<img src='../../static/right-to.png'></img>
				</div>
			</div> -->

			<!-- <div class='content-info' @click='trigger'>
				<div class='info-first'>选择</div>
				<div class='info-second'>
					<div class='info-info'>
						<div>{{goodinfo}}</div>


					</div>
					<div class='info-img'>
						<img src='../../assets/right-to.png'></img>
					</div>
				</div>
			</div> -->
			<div>
				<div class='content-info assemble'>
					<div class='info-first'>拼团</div>
					<div class='info-second'>
						<div class='info-info'>
							<div>
								<span>{{city}}已有<span class='personNum'>{{totalnum}}人</span>成团</span></div>
						</div>
						<div class='info-img'>
							<img src='../../assets/right-to.png'></img>
						</div>
					</div>
				</div>
				<div class='assemble-info'>
					<div class='assemble-list' v-for='(item,index) in  groupList'>
						<div class='assemble-left'>
							<div class='left-img'>
								<img :src="item.headPic" alt="" v-if='item.headPic.length>0'>
								<img src="../../assets/logo-1.png" alt="" v-else>
							</div>
							<div class='left-info'>
								<div class='left-info-tit'>
									{{item.nickName}}<span class='residual-info'>还差<span class='personNum'>{{item.minNum-item.hasNum}}人</span>成团</span>
								</div>
								<div class='left-info-time'>
									{{item.endTimes}}
								</div>
							</div>
						</div>
						<div class='assemble-right' @click="goPay(2,item.id)">
							去参团
						</div>
					</div>
				</div>
			</div>
			<div class='content-img' v-if='banner.length!=0'>
				<div v-if="banner.length > 1">
					<swiper :options="swiperOptionAd" ref='silderAd' class="swiper-container">
						<swiper-slide :data-link='item.picUrl' v-for="(item,index) in banner" :key="index">
							<!-- <img src="../assets/newPeople.jpg" mode=""></img> -->
							<div class='showDot'>
								<img :src="item.picUrl" alt="">
							</div>
						</swiper-slide>
						<!-- 常见的小圆点 -->
						<div class="swiper-pagination2" v-if="picList.length > 0 " v-for="(item,index) in picList" :key="index" slot="pagination"></div>
					</swiper>
				</div>
				<swiper :options="swiperOptionBanner" class="swiper-container" v-if="banner.length == 1">
					<swiper-slide :data-link='item.picUrl' v-for="(item,index) in banner" :key="index">
						<!-- <img src="../assets/newPeople.jpg" mode=""></img> -->
						<div class='showDot'>
							<img :src="item.picUrl" alt="" @click="toMeal(item.linkHtml)">
						</div>
					</swiper-slide>

				</swiper>
			</div>

			<!-- 	<div class='nav'>
				商品详细
			</div> -->
			<div class='goodImgs'>
				<img mode='widthFix' :src='item' v-for='(item,index) in productList' :key='index'></img>
			</div>
		</div>
		<div class='container-bottom'>
			<div class='bottom-first'>
				<div class='tab-first'>
					<div>
						<img src='../../assets/address-4.png'></img>
					</div>
					<div>{{city}}</div>
				</div>
				<div class='tab-second' @click="toCustomer">
					<div>
						<img src='../../assets/service-1.png'></img>
					</div>
					<div>客服</div>
				</div>
			</div>
			<div class='bottom-three' @click="goPay(1)">
				￥{{totalOriginalPrice}}直接买
			</div>
			<div class='bottom-second' @click="goPay(2)">
				￥{{totalAssemblePrice}}去开团
			</div>
		</div>


		<div class='coupon-info' :class='couponFlag?"showCouopn":""'>
			<div class='coupon-tit'>
				优惠卷
			</div>
			<div class='coupon-content' v-for='(item,index) in couponList' :class='totalPrice<item.enoughMoneys?"couponColor":""'
			 @click='obtainInfo(item)'>
				<div class='content-left'>
					<span>￥</span>{{item.denomination}}
				</div>
				<div class='content-right'>
					<div class="">
						满{{item.enoughMoneys}}可用
					</div>
					<div class="">
						有效期至：{{item.useEndTime}}
					</div>
				</div>
			</div>
			<img class='coupon-close' src='../../assets/close.png' @click='couponClose'></img>
		</div>
		<div class='shadowArea' v-if="showElastic==true || couponFlag==true">

		</div>
		<Load v-if='isLoade'></Load>
		<customer v-if='collageCurstomer' @priming='toCustomer' @define='toPhone' :typeInfo='"技术清洁咨询"'></customer>
		<showMoadel v-if='modelFlag' :cont='"您面积未修改，确定100平吗？"' :cancelspan='"取消"' :confirmspan='"确定"' @define='confirm'
		 @remove='cancel'></showMoadel>
	</div>
</template>

<script>
	import {
		swiper,
		swiperSlide
	} from "vue-awesome-swiper";
	import {
		mapGetters
	} from 'vuex'
	import customer from '../customerService.vue'
	import * as axios from '../../untils/ajax.js'
	import wx from 'weixin-js-sdk'
	export default {
		data() {
			return {
				swiperCurrent: 0,
				collageHead: false,
				swiperDot: 0,
				list: [""],
				picList: [],
				week: [],
				productTitle: '家庭/办公室窗帘清洗',
				productList: [],
				countList: [{
						id: 1,
						content: '1次/周'
					}, {
						id: 2,
						content: '2次/周'
					}, {
						id: 3,
						content: '3次/周'
					}, {
						id: 4,
						content: '4次/周'
					}, {
						id: 5,
						content: '5次/周'
					},
					{
						id: 6,
						content: '6次/周'
					}, {
						id: 7,
						content: '7次/周'
					}
				],
				weekList: [{
						id: 1,
						content: '周一',
						sign: true
					}, {
						id: 2,
						content: '周二',
						sign: false
					}, {
						id: 3,
						content: '周三',
						sign: false
					}, {
						id: 4,
						content: '周四',
						sign: false
					}, {
						id: 5,
						content: '周五',
						sign: false
					},
					{
						id: 6,
						content: '周六',
						sign: false
					}, {
						id: 7,
						content: '周日',
						sign: false
					}
				],
				timeList: [{
						id: 1,
						content: '7-9点'
					}, {
						id: 2,
						content: '9-11点'
					}, {
						id: 3,
						content: '11-13点'
					}, {
						id: 4,
						content: '13-15点'
					}, {
						id: 5,
						content: '15-18点'
					},
					{
						id: 6,
						content: '18-20点'
					}, {
						id: 7,
						content: '20-22点'
					}
				],
				countId: 1,
				weekId: 1,
				timeId: '',
				showElastic: false,
				signFlag: 1,
				info: [],
				weekCount: '1',
				weekTime: '周一',
				area: 100,
				timeInfo: '',
				frequency: 1,
				price: 0,
				totalPrice: '',
				discount: 0,
				discountPrice: '',
				couponFlag: false,
				couponList: [],
				couponNum: 0,
				totalMoney: 0,
				id: '',
				nowDate: '',
				couponId: '',
				flatPriceList: [],
				areaRadixt: '',
				banner: [],
				collageCurstomer: false,
				radix: '',
				isLoade: false,
				modelFlag: false,
				phoneHeight: '',
				bottomHeight: '',
				shareInfo: '',
				setFocus: false,
				top: 0,
				homeSwiperOption: {
					observer: true,
					observeParents: true,
					// 参数选项,显示小点
					//循环
					loop: true,
					observer: true, //修改swiper自己或子元素时，自动初始化swiper
					// observeParents: true,
					pagination: {
						el: '.swiper-pagination'
					},
					//每张播放时长3秒，自动播放
					autoplay: {
						delay: 3000,
						disableOnInteraction: false
					},
					on: {
						//滑动之后回调函数
						slideChangeTransitionStart: function() {
							/* realIndex为滚动到当前的slide索引值 */
							// console.log(this.realIndex)
							this.signIndex = this.realIndex
							// console.log(this.signIndex)
						},
					},
					//滑动速度
					speed: 1000,
					msg: "您还未登录，是否要登录?"
					// delay:1000

				},
				swiperOptionBanner: {
					observer: true,
					observeParents: true,
					// 参数选项,显示小点

					//循环
					// loop: true,
					observer: true, //修改swiper自己或子元素时，自动初始化swiper
					// observeParents: true,
					//每张播放时长3秒，自动播放
					// autoplay: {
					// 	delay: 1700,
					// 	disableOnInteraction: false
					// },
					on: {
						//滑动之后回调函数
						slideChangeTransitionStart: function() {
							/* realIndex为滚动到当前的slide索引值 */
							// console.log(this.realIndex)
							this.signIndex = this.realIndex
							// console.log(this.signIndex)
						},
					},
					preventLinksPropagation: false, // 阻止点击事件冒泡
					//滑动速度
					// speed: 1000,
					// delay:1000

				},
				goodsList: [{
						typeId: 1,
						name: '2*3米4条  (不含纱布)',
						type: 1
					},
					{
						typeId: 2,
						name: '2*3米4条  (含纱布)',
						type: 1
					},
				],
				homeList: [{
						id: 1,
						content: '2*3米4条  (不含纱布)',
						type: 1
					},
					{
						id: 2,
						content: '2*3米4条  (含纱布)',
						type: 1
					},
				],
				officeList: [{
						id: 1,
						content: '3*3米4条  (不含纱布)',
						type: 2
					},
					{
						id: 2,
						content: '3*3米4条  (含纱布)',
						type: 2
					}
				],
				goodsId: 1,
				goodinfo: '家庭2*3米4条  (不含纱布)',
				categoryList: [{
					id: 1,
					content: '家用'
				}, {
					id: 2,
					content: '办公室'
				}],
				categoryId: 1,
				mattressList: [{
						id: 1,
						content: '家庭2.2米以下床垫1张'
					},
					{
						id: 2,
						content: '家庭2.2米以下床垫2张'
					},
					{
						id: 3,
						content: '家庭2.2米以下床垫3张'
					},
					{
						id: 3,
						content: '家庭2.2米以下床垫4张'
					},
				],
				mattressCategoryList: [{
					id: 1,
					content: '家用'
				}],
				airConditionerList: [{
						id: 1,
						content: '挂式/立式空调蒸汽清洗2台'
					},
					{
						id: 2,
						content: '挂式/立式空调蒸汽清洗3台'
					},
					{
						id: 3,
						content: '挂式/立式空调蒸汽清洗4台'
					},
					{
						id: 4,
						content: '挂式/立式空调蒸汽清洗4台'
					},
					{
						id: 5,
						content: '挂式/立式空调蒸汽清洗5台'
					},
					{
						id: 6,
						content: '挂式/立式空调蒸汽清洗6台'
					}

				],
				centerAirConditionerList: [{
						id: 1,
						content: '中央空调清洗1台'
					},
					{
						id: 2,
						content: '中央空调清洗2台'
					},
					{
						id: 3,
						content: '中央空调清洗3台'
					},
					{
						id: 4,
						content: '中央空调清洗4台'
					},
					{
						id: 5,
						content: '中央空调清洗5台'
					},
					{
						id: 6,
						content: '中央空调清洗6台'
					}
				],
				airConditionerCategory: [{
						id: 1,
						content: '非中央空调'
					},
					{
						id: 2,
						content: '中央空调'
					}

				],
				type: 2,
				totalList: [],
				originalPrice: '',
				assemblePrice: '',
				totalOriginalPrice: '',
				totalAssemblePrice: '',
				productId: '',
				groupList: [],
				totalnum: '',
				minNum: '',
				city: '',
				showDistance: false,
				showWx:false
			}
		},
		components: {
			swiper,
			swiperSlide,
			customer
			// selectDates,
			// customer
		},
		computed: {
			...mapGetters(['showDate']),
			swiper() {
				return this.$refs.swiperAd.swiper
			},
			swiperOptionAd() {
				let that = this
				let options = {
					observer: true,
					observeParents: true,
					// 参数选项,显示小点

					//循环
					loop: true,
					observer: true, //修改swiper自己或子元素时，自动初始化swiper
					// observeParents: true,
					pagination: {
						el: '.swiper-pagination2'
					},
					//每张播放时长3秒，自动播放
					autoplay: {
						delay: 13700,
						disableOnInteraction: false
					},
					on: {
						//滑动之后回调函数
						slideChangeTransitionStart: function() {
							/* realIndex为滚动到当前的slide索引值 */
							// console.log(this.realIndex)
							this.signIndex = this.realIndex
							// console.log(this.signIndex)
						},
						click: function() {

						}
					},
					preventLinksPropagation: false, // 阻止点击事件冒泡
					//滑动速度
					speed: 1000,
					// delay:1000
				}
				return options
			},
		},
		methods: {
			changeNumber(e) {
				if (e.data == null) {
					return
				}
				if (e.data == '.') {
					this.$toast({
						message: '不能输入小数点',
						duration: 1500
					})

				}

				// this.area = Number(e.detail.value)


			},
			toCustomer() {
				console.log(55444)
				this.collageCurstomer = !this.collageCurstomer
			},
			toPhone() {
				this.collageCurstomer = !this.collageCurstomer
				window.location.href = 'tel://4008290037'
			},
			swiperChange: function(e) {
				let current = e.detail.current;
				// console.log(current, '轮播图')
				let that = this
				this.swiperCurrent = current
			},
			swiperChangeDot(e) {
				let current = e.detail.current;
				// console.log(current, '轮播图')
				let that = this
				this.swiperDot = current
			},
			tabCount(id, e) {
				console.log(id)
				this.countId = id
				this.weekCount = e
				this.weekList = [{
						id: 1,
						content: '周一',
						sign: true
					}, {
						id: 2,
						content: '周二',
						sign: false
					}, {
						id: 3,
						content: '周三',
						sign: false
					}, {
						id: 4,
						content: '周四',
						sign: false
					}, {
						id: 5,
						content: '周五',
						sign: false
					},
					{
						id: 6,
						content: '周六',
						sign: false
					}, {
						id: 7,
						content: '周日',
						sign: false
					}
				]
				this.frequency = id * 4
				this.calculation()
			},
			tabwWeek(id, sign, content) {
				var count = 0
				this.weekList.forEach(item => {
					if (item.sign) {
						count++
					}
				})
				if (count > this.countId) {
					this.toast.fail('只能选择' + this.countId + '次')
					return
				}
				console.log()
				if (count == this.countId && !sign) {
					console.log(5555)
					this.toast.fail('只能选择' + this.countId + '次')
					return
				}
				this.weekList[id].sign = !this.weekList[id].sign
				this.weekTime = ''
				this.weekList.forEach(item => {
					if (item.sign) {
						if (this.weekTime.length == 0) {
							this.weekTime = this.weekTime + item.content
						} else {
							this.weekTime = this.weekTime + '、' + item.content
						}

					}
				})
				this.calculation()
			},
			tabwTime(id, price, item) {
				this.timeId = id
				this.price = price
				this.timeInfo = item.beginTime + '-' + item.endTime
				this.couponNum = 0
				this.couponId = ''
				this.calculation()
			},
			tabCategory(e) {
				  this.categoryId = e.typeId
				  this.CateContent = e.content //类别	  
				  this.productId = e.productId
				  this.goodsList = this.totalList[e.typeId - 1][0]	
				this.priceName = this.goodsList[0].priceClassName //价格区间名称

				// this.goodinfo = this.goodsList[0].name
				this.area = this.goodsList[0].minNum
				this.minNum = this.goodsList[0].minNum
				this.originalPrice = this.goodsList[0].price
				this.assemblePrice = this.goodsList[0].assemblePrice
				this.classPriceId = this.goodsList[0].id
				this.calculation()


				this.getTotalnum()
				this.getAssembleByProductId()
				//    if(this.type==4){
				// 	if (e.typeId == 1) {
				// 		this.goodsList = this.homeList

				// 	} else {
				// 		this.goodsList = this.officeList
				// 	}
				// }else if(this.type==10){


				//      if (e.typeId == 1) {
				//      	this.goodsList = this.airConditionerList

				//      } else {
				// 		 console.log(5555)
				//      	this.goodsList = this.centerAirConditionerList
				//      }
				// }
				this.goodsId = 1
			},
			tabgoods(e) {
				if (e.type == 1) {
					this.goodinfo = '家庭' + e.content
				} else {
					this.goodinfo = '办公室' + e.content
				}
				this.classPriceId = e.id
				this.goodinfo = e.name
				this.goodsId = e.typeId
				this.originalPrice = e.price
				this.assemblePrice = e.assemblePrice
				this.priceName = e.priceClassName //价格区间名称
				this.area = e.minNum
				this.minNum = e.minNum
			},
			trigger(e) {
				this.showElastic = !this.showElastic
				let that = this
				// uni.getSystemInfo({
				//     success: function (res) {
				//         console.log(res.windowHeight);
				//         that.phoneHeight=(res.windowHeight-that.bottomHeight-10)+'px'

				//     }
				// })
				if (e == true) {
					// this.setFocus=true
					setTimeout(() => {
						// that.top=99999
						that.setFocus = true
						that.$refs.inputVal.focus()
					}, 10)
					var container = this.$el.querySelector("#elastic-bottom");
					// container.scrollTop = container.scrollHeight;
				}
			},
			close() {
				this.showElastic = !this.showElastic
				this.phoneHeight = ''
				this.setFocus = false
			},
			tabReturn() {
				this.$router.go(-1)
					window.localStorage.removeItem('url')
			},
			goPay(e, id) {

				if (this.area.toString().includes('.')) {
					this.$toast({
						message: '不能输入小数点',
						duration: 1500
					})
					return
				}
				if (this.area < this.minNum) {
					let that = this
					this.$toast({
						message: '面积(数量)不能小于' + that.minNum + '平方(块)',
						duration: 1500
					})
					return
				}
				// console.log(this.info.materPicUrl)
				// console.log(this.priceName)
				let infoJson = {
					name: this.info.name,
					totalPrice: 1,
					frequency: this.frequency,
					timeInfo: this.timeInfo,
					area: this.area,
					couponNum: this.couponNum,
					price: this.price,
					weekCount: this.weekCount,
					nowDate: this.nowDate,
					id: this.id,
					buyId: this.info.type,
					timePriceId: this.timeId,
					couponId: this.couponId,
					orderMoney: this.totalPrice + this.couponNum,
					rate: this.weekCount,
					areaRadixt: this.areaRadixt,
					materUrl: this.info.materPicUrl,
					radix: this.radix,
					originalPrice: this.originalPrice,
					assemblePrice: this.assemblePrice,
					totalOriginalPrice: this.totalOriginalPrice,
					totalAssemblePrice: this.totalAssemblePrice,
					productId: this.productId,
					type: e,
					goodinfo: this.goodinfo,
					classPriceId: this.classPriceId,
					orderAssmbleid: id,
					cateContent: this.CateContent,
					priceName: this.priceName,
					minNum: this.minNum,
					categoryId:this.categoryId,
					goodsId:this.goodsId
				}
				//判断是否为微信浏览器
				if (window.localStorage.getItem('wxBrowser') && (window.localStorage.getItem('token') == 'null')) {
					window.localStorage.setItem('evaluation', JSON.stringify(infoJson))
						window.localStorage.setItem('url','carpetClean')
				}
				
				//判断有无token,或者token是否过期
			
				axios.post('/office/t-office-order-period/getWeAmount', {}).then(res => {
					if (res.meta.success) {

						this.$router.push({
							name: 'carpetsubmission',
							params: infoJson
						})
						  
					} else {
				
					}
				})
				
				// this.$router.push({
				// 	name: 'carpetsubmission',
				// 	params: infoJson
				// })
				// uni.navigateTo({
				// 	url: "/pages/experience/submission?json=" + JSON.stringify(infoJson)
				// })
			},
			getInfo() {

				let that = this
				this.isLoade = true
				let params = new FormData()
				params.append('openCityId', '123456789')
				// params.append('productType', this.type)
				axios.post('/carpet/t-product-carpet/getProductList', params).then(res => {
					console.log(res)
					if (res.meta.success) {

						var pic = res.data[0].picUrl.split(';')
						pic.forEach(item => {
							if (item.length != 0) {

								this.picList.push(this.configUrl + item)

							}

						})
						// var product = res.data.productItem.split(';')
						// console.log(product)
						// product.forEach(item => {
						// 	if (item.length != 0) {

						// 		this.productList.push(this.configUrl + item)

						// 	}
						// })    

						this.categoryList = res.data[0].tCarpetClasses.map((val, index) => {
							let list = {}
							list['typeId'] = index + 1
							list['content'] = val.name
							list['productId'] = val.productId
							return list

						})
						this.CateContent = this.categoryList[0].content
						this.productId = this.categoryList[0].productId
						this.goodsList = res.data[0].tCarpetClasses[0].tCarpetClassPrices.map((item, index) => {
							if (index == 0) {
								this.goodinfo = item.name
								this.classPriceId = item.id
							}
							item.typeId = index + 1
							return item
						})
						this.area = this.goodsList[0].minNum
						this.minNum = this.goodsList[0].minNum

						let list = res.data[0].tCarpetClasses.map((item, index) => {
							var info = []
							item.tCarpetClassPrices.map((el, index) => {
								el.typeId = index + 1


							})
							info.push(item.tCarpetClassPrices)

							return info
						})
						console.log(list)
						this.totalList = list
						this.originalPrice = list[0][0][0].price
						this.assemblePrice = list[0][0][0].assemblePrice


						this.priceName = list[0][0][0].priceClassName //价格区间名称

						this.info = res.data
						this.info['materPicUrl'] = this.configUrl + res.data[0].materPicUrl
						this.info = res.data
						// this.timeId = res.data.tProductTimePrices[0].id
						// this.timeInfo = res.data.tProductTimePrices[0].beginTime + '-' + res.data.tProductTimePrices[0].endTime
						// this.radix = res.data.tProductFrequencyPrice[0].radix

						// this.price = res.data.tProductTimePrices[0].price
						// this.discount = res.data.discount
						// this.flatPriceList = res.data.tProductFlatPrice
						// this.tFlatPrice()
						
						// 微信浏览器
						if (window.localStorage.getItem('wxBrowser') && (window.localStorage.getItem('evaluation') != null) && (window.localStorage.getItem('token') != null)) {
							this.wxEvaluation()
							let infoData= this.categoryList[this.categoryId-1]
							let goodsIndex=this.goodsId-1
							this.tabCategory(infoData)
							let goodsInfo=this.goodsList[goodsIndex]
							this.tabgoods(goodsInfo)
						}
                       
						 
						this.getAssembleByProductId()
						this.getTotalnum()
						this.calculation()
						this.getCoupon()
					} else {
						this.isLoade = false
						this.toast.fail('获取数据失败')

					}
					// uni.stopPullDownRefresh();
				})
			},
			getAssembleByProductId() {
				let that = this
				let params = new FormData()
				params.append('productId', this.productId)
				axios.post('/business/t-business-order-assemble/getAssembleByProductId', params).then(res => {
					if (res.meta.success) {
						let data = res.data.map(val => {

							let day2 = new Date(val.endTime.replace(/-/g, "/"))
							var day1 = new Date();

							var date3 = day2 - day1; //时间差的毫秒数      

							//计算出相差天数
							var days = Math.floor(date3 / (24 * 3600 * 1000))

							//计算出小时数

							var leave1 = date3 % (24 * 3600 * 1000) //计算天数后剩余的毫秒数
							var hours = Math.floor(leave1 / (3600 * 1000))
							//计算相差分钟数
							var leave2 = leave1 % (3600 * 1000) //计算小时数后剩余的毫秒数
							var minutes = Math.floor(leave2 / (60 * 1000))
							//计算相差秒数
							var leave3 = leave2 % (60 * 1000) //计算分钟数后剩余的毫秒数
							var seconds = Math.round(leave3 / 1000)
							hours = hours.toString()
							hours = hours.length < 2 ? '0' + hours : hours
							minutes = minutes.toString()
							minutes = minutes.length < 2 ? '0' + minutes : minutes
							seconds = seconds.toString()
							seconds = seconds.length < 2 ? '0' + seconds : seconds
							// alert("仅剩"+days+"天 "+hours+":"+minutes+":"+seconds)
							val.endTimes = "仅剩" + days + "天 " + hours + ":" + minutes + ":" + seconds
							return val
						})
						data = data.map(item => {
							if (item.headPic.length > 0) {
								item.headPic = this.configUrl + item.headPic

							}
							return item
						})
						this.isLoade = false
						that.groupList = data
						setInterval(() => {
							data = data.map(val => {

								let day2 = new Date(val.endTime.replace(/-/g, "/"))
								var day1 = new Date();

								var date3 = day2 - day1; //时间差的毫秒数      

								//计算出相差天数
								var days = Math.floor(date3 / (24 * 3600 * 1000))

								//计算出小时数

								var leave1 = date3 % (24 * 3600 * 1000) //计算天数后剩余的毫秒数
								var hours = Math.floor(leave1 / (3600 * 1000))
								//计算相差分钟数
								var leave2 = leave1 % (3600 * 1000) //计算小时数后剩余的毫秒数
								var minutes = Math.floor(leave2 / (60 * 1000))
								//计算相差秒数
								var leave3 = leave2 % (60 * 1000) //计算分钟数后剩余的毫秒数
								var seconds = Math.round(leave3 / 1000)
								hours = hours.toString()
								hours = hours.length < 2 ? '0' + hours : hours
								minutes = minutes.toString()
								minutes = minutes.length < 2 ? '0' + minutes : minutes
								seconds = seconds.toString()
								seconds = seconds.length < 2 ? '0' + seconds : seconds
								// alert("仅剩"+days+"天 "+hours+":"+minutes+":"+seconds)
								val.endTimes = "仅剩" + days + "天 " + hours + ":" + minutes + ":" + seconds
								return val
							})

							that.groupList = data
						}, 1000)

					}
				})


			},
			reduceDate(date) {
				Date.parse(new Date(a.replace(/-/g, "/")));
			},
			calculation() {


				this.totalOriginalPrice = (this.area * this.originalPrice + 0.0001).toFixed(2)
				this.totalAssemblePrice = (this.area * this.assemblePrice + 0.0001).toFixed(2)
				// this.totalMoney = this.totalPrice
				// this.discountPrice = (this.totalPrice / this.discount).toFixed(0)
				// let that = this
				// uni.getSystemInfo({
				//     success: function (res) {
				//         console.log(res.windowHeight);
				//         that.phoneHeight=(res.windowHeight-that.bottomHeight-10)+'px'

				//     }
				// });
			},
			getCoupon() {
				let params = new FormData()
				params.append('productType', 2)
				params.append('buyType', 1)
				axios.post('/business/t-business-coupon/getEnableCoupons', params).then(res => {
					this.couponList = res.data
				})
			},
			getTotalnum() {
				let params = new FormData()
				params.append('productId', this.productId)
				axios.post('/business/t-business-order-assemble/getAllAssembleByProductId', params).then(res => {
					if (res.meta.success) {
						this.totalnum = res.data.totalNum
					}
				})
			},
			couponClose() {
				this.couponFlag = !this.couponFlag
				this.phoneHeight = ''
			},
			obtainCoupon() {
				this.couponFlag = !this.couponFlag
			},
			obtainInfo(e) {
				if (this.totalPrice < e.enoughMoneys) {
					return
				}
				console.log(e)
				this.totalPrice = this.totalMoney
				this.couponNum = e.denomination
				this.couponFlag = !this.couponFlag
				this.totalPrice = (this.totalPrice - this.couponNum).toFixed(2)
				console.log(this.totalPrice)
				this.couponId = e.id
				this.phoneHeight = ''
			},
			selectDate() {
				uni.navigateTo({
					url: '/pages/component/date'
				})
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
			reduce() {
				if (this.frequency == 1) {
					this.toast.fail('次数至少为一次')
					return
				}
				this.frequency = this.frequency - 1
				this.calculation()
			},
			add() {
				this.frequency = this.frequency + 1
				this.calculation()
			},
			tFlatPrice() {
				for (var i = 0; i < this.flatPriceList.length; i++) {
					if (this.area >= this.flatPriceList[i].flat) {
						this.areaRadixt = this.flatPriceList[i].radix
						break
					}
				}

			},
			getfindAdvertList() {
				let that = this
				let params = new FormData()
				params.append('moduleType', 3)
				axios.post('/business/t-business-advert/findAdvertList', params).then(res => {
					console.log(res)
					if (res.meta.success) {
						let data = res.data.map(item => {
							item.picUrl = this.configUrl + item.picUrl
							return item
						})

						this.banner = data
					} else {

					}

				})

			},
			cancel() {
				this.modelFlag = false
				if (this.showElastic) {
					this.setFocus = true
					uni.pageScrollTo({
						scrollTop: 99999999999
					})
				} else {
					console.log(33333)
					this.trigger(true)
				}
			},
			confirm() {

				let infoJson = {
					name: this.info.name,
					totalPrice: 1,
					frequency: this.frequency,
					timeInfo: this.timeInfo,
					area: this.area,
					couponNum: this.couponNum,
					price: this.price,
					weekCount: this.weekCount,
					nowDate: this.nowDate,
					id: this.id,
					buyId: this.info.type,
					timePriceId: this.timeId,
					couponId: this.couponId,
					orderMoney: this.totalPrice + this.couponNum,
					rate: this.weekCount,
					areaRadixt: this.areaRadixt,
					materUrl: this.info.materPicUrl,
					radix: this.radix,
					goodinfo: this.goodinfo,
					classPriceId: this.classPriceId
				}
				this.modelFlag = false
				//判断是否为微信浏览器
				if (window.localStorage.getItem('wxBrowser') && (window.localStorage.getItem('token') == 'null')) {
					window.localStorage.setItem('evaluation', JSON.stringify(infoJson))
					window.localStorage.setItem('url','carpetClean')
				}
				// let infoData= JSON.stringify(infoJson)
				//判断有无token,或者token是否过期
				axios.post('/office/t-office-order-period/getWeAmount', {}).then(res => {
					if (res.meta.success) {
					
						this.$router.push({
							name: 'carpetsubmission',
							params: infoJson
						})
						   window.localStorage.removeItem('url')
					} else {
				
					}
				})
				
				// this.$router.push({
				// 	name: 'carpetsubmission',
				// 	params: infoJson
				// })
				// uni.navigateTo({
				// 	url: "/pages/experience/submission?json=" + JSON.stringify(infoJson)
				// })
			},
			toShare() {
				let that = this
				this.services.send({
					extra: {
						scene: "WXSceneSession"
					},
					type: 'web',
					title: that.shareInfo.title,
					content: that.shareInfo.subTitle,
					thumbs: [that.configUrl + that.shareInfo.picUrl],
					href: that.shareInfo.linkHtml
				}, function() {

				}, function() {

				})
				// uni.share({
				//     provider: "weixin",
				//     scene: "WXSceneSession",
				//     type: 0,
				//     href: that.shareInfo.linkHtml,
				//     title: that.shareInfo.title,
				//     summary: that.shareInfo.subTitle,
				//     imgUrl: that.configUrl+that.shareInfo.picUrl,
				//     success: function (res) {

				//     },
				//     fail: function (err) {

				//     }
				// });

			},
			getShare() { //获取要分享的内容
				let params = new FormData()
				params.append('shareType', 5)
				axios.post('/business/t-business-advert/findAdvertShare', params).then(res => {
					if (res.meta.success) {

						this.shareInfo = res.data
					}
				})
			},

			getServices() {
				let that = this
				plus.share.getServices(function(s) {

					for (var i in s) {
						if ('weixin' == s[i].id) {
							that.services = s = s[i];
						}
					}

				}, function(e) {
					console.log(e)
				});
			},
			scrollEvent(e) {
				let topHeight = e.srcElement.scrollTop
				if (topHeight > 180) {
					this.collageHead = true
				} else {
					this.collageHead = false
				}
			},
			toShareWx() {
				let that=this
				wx.config({
					debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
					appId: that.wxInfo.appId, // 必填，公众号的唯一标识，填自己的！
					timestamp: that.wxInfo.timestamp, // 必填，生成签名的时间戳，刚才接口拿到的数据
					nonceStr: that.wxInfo.noncestr, // 必填，生成签名的随机串
					signature: that.wxInfo.signature, // 必填，签名，见附录1
					jsApiList: [
						'onMenuShareTimeline',
						'onMenuShareAppMessage'
					]
				})
			
				let imgUrl = that.configUrl + that.shareInfo.picUrl
				wx.ready(function() {
			
					wx.onMenuShareAppMessage({
						title: that.shareInfo.title,
						desc: that.shareInfo.subTitle,
						link: that.shareInfo.linkHtml,
						imgUrl: imgUrl,
						type: 'link',
						dataUrl: '',
						success: function() {
							// console.log("分享成功");
						},
						cancel: function() {
							// alert('取消分享')
			
						},
						fail: function() {
							alert('分享失败')
						}
					});
				})
			},
			findAdvertShareConfig() {
				// alert(location.href.split('?')[0])
				// alert(window.location.href)
				let params = new FormData
				var url = window.location.href.split('#')[0]
				url = url.replace(/\&/g, '%26')
				params.append('url', url)
				axios.post('/business/t-business-advert/findAdvertShareConfig', params).then(res => {
					if (res.meta.success) {
						this.wxInfo = res.data
			            this.toShareWx()
					}
				})
			},
			// 微信浏览器上微信登录返回当前页面的缓存重新赋值到页面上
			wxEvaluation() {
				let data = JSON.parse(window.localStorage.getItem('evaluation'))
				this.info.name=data.name
				this.frequency=data.frequency
				this.timeInfo=data.timeInfo
				this.area=data.area
				this.couponNum= data.couponNum
				this.price=data.price
				this.weekCount=data.weekCount
				this.id= data.id
				this.info.type=data.buyId
				this.timeId=data.timePriceId
				this.couponId=data.couponId
				this.areaRadixt=data.areaRadixt
				this.info.materPicUrl=data.materUrl
				this.radi=data.radix
				this.originalPrice=data.originalPrice
				this.assemblePrice=data.assemblePrice
				this.totalOriginalPrice=data.totalOriginalPrice
				this.totalAssemblePrice=data.totalAssemblePrice
				this.productId=data.productId	
				this.goodinfo=data.goodinfo
				this.classPriceId=data.classPriceId
				this.cateContent=data.CateContent
				this.priceName=data.priceName
				this.minNum=data.minNum
                this.categoryId=data.categoryId	
				this.goodsId=data.goodsId
				window.localStorage.removeItem('evaluation')
			}
		},
		created() {
			// 判断是否微信浏览器
			if (window.localStorage.getItem('wxBrowser')) {
				this.showDistance = true
				this.showWx=true
			}

			this.city = window.localStorage.getItem('city')
			this.nowTime()
			// this.id = options.id
			this.id = 1



			this.getfindAdvertList()
			let that = this

			this.getShare()
			this.type = this.$route.params.type
			this.getInfo()
			if (this.type == 10) {
				//    this.goodsList=this.airConditionerList
				// this.categoryList=this.airConditionerCategory
				this.goodinfo = '挂式/立式空调蒸汽清洗2台'
				this.productTitle = '空调清洗'
			} else if (this.type == 8) {
				this.goodsList = this.mattressList
				this.categoryList = this.mattressCategoryList
				this.goodinfo = '家庭2.2米以下床垫1张'
				this.productTitle = '床垫清洗'
			}
			// this.getServices()
              
			 if (!this.showWx) {
			  	this.getServices()
			  } else {
			    this.findAdvertShareConfig()
			  }	  

		},
		watch: {
			showElastic: {
				handler(newval, oldval) {
					console.log(newval)
					this.showElastic = newval
				},
				immediate: true
			},
			area() {
				this.couponNum = 0
				this.couponId = ''
				this.tFlatPrice()
				this.calculation()
			},
			showDate(newval, oldval) {
				this.nowDate = newval
			}
		}
	}
</script>

<style scoped>
	.container {
		width: 100vw;
		height: 100%;
		padding-bottom: 1rem;
		box-sizing: content-box;
		overflow-x: hidden;
	}

	.head {
		padding-top: 0.4rem;
		height: 0.88rem;
		width: 100%;
		/* background: #539ef9; */
		text-align: center;
		position: relative;
		box-sizing: content-box;
		color: #fff;
		font-size: 0.3rem;
		z-index: 1000;
		position: fixed;
		top: 0;
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
		width: 0.63rem;
		height: 0.63rem;
		position: absolute;
		margin-left: 0.3rem;
		top: 0.53rem;
		left: 0;
	}

	.showTop .head-left img {
		top: 0.23rem;

	}

	.head-left span {
		margin-left: 0.6rem;

	}

	.head-center {
		height: 100%;
		width: 40%;
		line-height: 0.88rem;
		text-align: center;
		float: left;
	}

	.head-right {
		height: 0.88rem;
		width: 30%;

	}

	.head-right img {
		display: inline-block;
		width: 0.63rem;
		height: 0.63rem;
		position: absolute;
		right: 0.3rem;
		top: 0.53rem;
	}

	.showTop .head-right img {
		top: 0.23rem;

	}

	.showHead {

		background: #fff;
	}

	.showHead .head {
		padding-top: 0.4rem;
		height: 0.88rem;
		width: 100%;
		/* background: #539ef9; */
		text-align: center;
		/* position: relative; */
		box-sizing: content-box;
		color: #fff;
		font-size: 0.33rem;
		z-index: 1000;
		position: fixed;
		top: 0;
		background: #fff;
	}
	.showHead .head.showTop {
		padding-top: 0 !important;
	}

	.showHead .head-left {
		height: 100%;
		line-height: 0.88rem;
		float: left;
		width: 30%;
		position: relative;
	}

	.showHead .head-left img {
		display: inline-block;
		width: 0.23rem;
		height: 0.33rem;
		position: absolute;
		margin-left: 0.3rem;
		top: 50%;
		left: 0;
		transform: translateY(-50%);
		-webkit-transform: translateY(-50%);
	}

	.showHead .head-left span {
		margin-left: 0.6rem;

	}

	.showHead .head-center {
		height: 100%;
		width: 40%;
		line-height: 0.88rem;
		text-align: center;
		float: left;
		color: #111;
	}

	.showHead .head-right {
		float: left;
		height: 0.88rem;
		width: 30%;
		position: relative;
	}

	.showHead .head-right img {
		display: inline-block;
		width: 0.53rem;
		height: 0.53rem;
		position: absolute;
		top: 50%;
		right: 0.3rem;
		transform: translateY(-50%);
		-webkit-transform: translateY(-50%);
	}

	.carpet-meal {
		height: 6.86rem;
		width: 100vw;
		position: relative;
	}

	.carpet-meal .swiper {
		width: 100%;
		height: 100%;

	}

	.carpet-meal img {
		display: block;
		width: 100%;
		height: 100%;
	}




	/* .banner .dots {
		position: absolute;
		left: 0;
		right: 0;
		bottom: 0.2rem;
		display: flex;
		justify-content: center;
	}

	.banner .dots .dot {
		margin: 0 8rpx;
		width: 14rpx;
		height: 14rpx;

		border: 1px solid #fff;
		background: rgba(0, 0, 0, 0.1);
		border-radius: 8rpx;
		transition: all .6s;
	}

	.banner .dots .dot.active {
		width: 14rpx;
		background: #fff !important;
	} */

	.content {
		width: 100%;
		background: #fff;
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		-webkit-box-orient: vertical;
		-webkit-box-direction: normal;
		-webkit-flex-direction: column;
		flex-direction: column;
		padding-bottom: 1rem;
	}

	.content .content-top {
		height: 1.8rem;
		background-image: linear-gradient(to bottom, #fc6159, #ff3a31);
		color: #fff;
	}

	.content-title {
		width: 100%;
		height: 0.9rem;
		font-size: 0.33rem;
		padding: 0.15rem 0.25rem;
		border-bottom: 0.2rem solid #f8f8fa;

	}

	.content-title .title-first {
		width: 100%;
		/* background-color: #ff3d31; */
		font-size: 0.3rem;

	}

	.content-title .title-first>div {
		display: inline-block;
		line-height: 0.4rem;

	}

	.content-title .title-first>div:last-child {

		margin-left: 0.17rem;
		color: #000000;
	}

	.content-title .title-first .title-assemble {
		font-size: 0.25rem;
		width: 0.8rem;
		height: 0.4rem;
		text-align: center;
		line-height: 0.45rem;
		color: #fff;
		background-color: #ff3d31;
		border-radius: 0.3rem;
	}

	.content-title .title-second {
		font-size: 0.3rem;
		color: #9898a2;
	}

	.content-money {
		height: 1.1rem;
		width: 100%;
		line-height: 0.90rem;
		/* border-bottom: 1px solid #dadada; */
		padding: 0.22rem 0.28rem 0.05rem 0.28rem;
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		align-items: center;
		-webkit-box-align: center;
		-webkit-align-items: center;
		justify-content: space-between;
		-webkit-box-pack: justify;
		-webkit-justify-content: space-between;
		box-sizing: border-box;

	}

	.content-money .clean-name {
		font-size: 0.32rem;
		font-weight: 550;
	}

	.content .newMoney {
		display: inline-block;
		font-size: 0.40rem;
		margin-right: 0.16rem;
	}

	.newMoney .newMoney-num {
		font-size: 0.68rem;
	}

	.content-money .active-money {
		width: 1rem;
		height: 0.36rem;
		line-height: 0.36rem;
		text-align: center;
		background: #ff6961;
		-webkit-border-radius: 0.2rem;
		-moz-border-radius: 0.2rem;
		border-radius: 0.2rem;
		font-size: 0.24rem;
	}

	.content-top .content-time {

		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		align-items: center;
		-webkit-box-align: center;
		-webkit-align-items: center;
		justify-content: space-between;
		-webkit-box-pack: justify;
		-webkit-justify-content: space-between;
	}

	.content-top .cost-price {
		text-decoration: line-through;
		font-size: 0.28rem;
		margin-left: 0.28rem;
	}

	.content-top .cost-time {
		margin-right: 0.28rem;
		font-size: 0.26rem;
	}

	.content .count {
		display: inline-block;
		height: 0.25rem;
		width: 0.73rem;
		font-size: 0.20rem;
		color: #f4bdbd;
		border-radius: 0.05rem;
		background: #fdecec;
		line-height: 0.25rem;
		text-align: center;
		margin-right: 0.10rem;
	}

	.content .oldMoney {
		color: #999;
		font-size: 0.20rem;
		text-decoration: line-through;
	}

	.content .content-head {
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		padding: 0.27rem 0.28rem 0.10rem 0.28rem;
		box-sizing: content-box;
		font-size: 0.30rem;
		justify-content: space-between;
		-webkit-box-pack: justify;
		-webkit-justify-content: space-between;

	}

	.content-head .head-discount {
		color: #999;
		margin-right: 0.21rem;
	}

	.content-head .head-money {

		font-weight: 550;
		color: #333;
		margin-right: 0.14rem;
	}

	.content-head .head-count {
		font-weight: 550;
		color: #333;
	}

	.content-head .head-rights {
		display: flex;
		display: -webkit-box;
		display: -webkit-flex;
		align-items: center;
		-webkit-box-align: center;
		-webkit-align-items: center;
		color: #999;
	}

	.content-head .head-rights img {
		display: inline-block;
		height: 0.28rem;
		width: 0.18rem;
		margin-left: 0.12rem;
	}

	.content-info {
		padding: 0.27rem 0.28rem 0 0.28rem;
		display: flex;
		display: -webkit-box;
		display: -webkit-flex;
		/* border-bottom: 1px solid #dadada; */
		font-size: 0.3rem;
		border-bottom: 0.2rem solid #f8f8fa;
	}

	.content-info.assemble {
		border-bottom: none;
	}

	.content-info .info-first {
		margin-right: 0.2rem;
		color: #999;
		width: 0.8rem;
		font-size: 0.3rem;
	}

	.content-info .info-second {
		/* float: right; */
		display: flex;
		display: -webkit-box;
		display: -webkit-flex;
		justify-content: space-between;
		-webkit-box-pack: justify;
		-webkit-justify-content: space-between;
		align-items: center;
		-webkit-box-align: center;
		-webkit-align-items: center;
		width: 100%;
		padding-bottom: 0.20rem;

	}

	.info-second .personNum {
		color: #fe3e33;
	}

	.content-info .info-second .week {
		margin-right: 0.15rem;
	}

	.content-info .info-second .info-img img {
		display: inline-block;
		height: 0.28rem;
		width: 0.18rem;
		float: right;
	}

	.content .content-date {
		height: 0.76rem;
		line-height: 0.76rem;
		/* box-sizing: content-box; */
		padding: 0 0.28rem;
	}

	.content-date div {
		color: #999;
	}

	.content-date span {
		color: #333;
		margin-left: 0.33rem;
	}

	.nav {
		height: 0.165rem;
		text-align: center;
		line-height: 0.165rem;
		margin: 0.30rem auto 0.20rem auto;
		color: #bbd;
		font-size: 0.3rem;
	}

	.content-img {
		margin-top: 0.25rem;
		position: relative;
	}

	.content-img .swiper {
		width: 6.46rem;
		height: 2.28rem;
		margin: 0 auto;
	}

	.content-img img {
		width: 6.46rem;
		height: 2.28rem;
		margin: 0 auto;
		display: block;
	}

	.content-img .dots {
		position: absolute;
		left: 0;
		right: 0;
		bottom: 0.20rem;
		display: flex;
		display: -webkit-box;
		display: -webkit-flex;
		justify-content: center;
		-webkit-box-pack: center;
		-webkit-justify-content: center;
		z-index: 10;
	}

	.container-bottom {
		position: fixed;
		bottom: 0;
		height: 0.98rem;
		width: 100%;
		z-index: 1000;
		display: flex;
		display: -webkit-box;
		display: -webkit-flex;
		align-items: center;
		-webkit-box-align: center;
		-webkit-align-items: center;
		background: #fff;
	}

	.container-bottom .bottom-first {
		width: 2.80rem;
		display: flex;
		display: -webkit-box;
		display: -webkit-flex;
		font-size: 0.22rem;
	}

	.bottom-first .tab-first {
		color: #539ef9;
		margin-left: 0.62rem;

	}

	.bottom-first .tab-second {
		margin-left: 0.77rem;
		color: #8e8e8e;
	}

	.container-bottom .bottom-first img {
		display: block;
		width: 0.33rem;
		height: 0.37rem;
		margin: 0 auto 0.10rem;
	}

	.container-bottom .bottom-second {
		width: 2.365rem;
		background: #ff3a31;
		height: 0.98rem;
		text-align: center;
		color: #fff;
		font-size: 0.3rem;
		line-height: 0.98rem;
	}

	.container-bottom .bottom-three {
		width: 2.365rem;
		background: #ffe4e3;
		height: 0.98rem;
		text-align: center;
		color: #fd5c54;
		font-size: 0.3rem;
		line-height: 0.98rem;
	}

	.shadowArea {
		position: fixed;
		bottom: 0.98rem;
		height: 100%;
		width: 100%;
		background: rgba(0, 0, 0, 0.1);
		z-index: 1;
	}

	.elastic {
		/* position: fixed;
		bottom: 0.98rem; */
		/* height: 5rem; */
		width: 100%;
		background: #fff;
		border-top-left-radius: 0.30rem;
		border-top-right-radius: 0.30rem;
		/* z-index: 2; */
		/* overflow-x: hidden;
		overflow-y: scroll; */
		/* transition: all 1s; */
	}

	/* 
	.elastic.showHeight {
		height: 65%;
	} */

	.elastic-head {
		margin: 0.50rem 0.20rem 0.1rem 0.30rem;
		position: relative;
	}

	.scroll-height {
		height: 73%;
		overflow-y: scroll;
	}

	.elastic-bottom {
		height: 100%;
		/* padding-bottom: 2rem; */

	}

	.elastic-head .elastic-head-first {
		display: flex;
		display: -webkit-box;
		display: -webkit-flex;
		align-items: center;
		-webkit-box-align: center;
		-webkit-align-items: center;
	}

	.elastic-head .elastic-head-first .elastic-head-tit {
		font-size: 0.36rem;
		color: #000;
		font-weight: 550;
	}

	.elastic-head .elastic-head-first .elastic-head-info {

		transform: translateY(-48%);
		-webkit-transform: translateY(-48%);

	}

	.elastic-head .title-second {
		font-size: 0.3rem;
		color: #9898a2;
	}

	.elastic-head-first .new-money {
		color: #e01212;
		font-size: 0.3rem;
		margin: 0 0.20rem 0 0rem;
	}

	.elastic-head-first .old-money {
		color: #999;
		text-decoration: line-through;
		margin-right: 0.20rem;
		font-size: 0.3rem;
	}

	.elastic-head-first .num {
		color: #999;
	}

	.elastic-head .elastic-head-first img {
		display: block;
		height: 1.30rem;
		width: 1.30rem;
		margin-right: 0.3rem;
	}

	.elastic-head-second img {
		display: block;
		width: 0.7rem;
		height: 0.7rem;
		position: absolute;
		top: -0.20rem;
		right: 0;
	}

	.elastic-select .select-title {

		font-size: 0.30rem;
		margin: 0 0 0.30rem 0.3rem;
	}

	.elastic-select .select-title span {
		color: #E01212;
	}

	.elastic-select .select-count {
		margin-left: 0.3rem;
		/* display: flex;
		display: -webkit-box;
		display: -webkit-flex;
		flex-wrap: wrap;
		-webkit-flex-wrap: wrap; */
		/* height: 0.8rem; */
		/* overflow-y: scroll; */
		display: flex;
		display: -webkit-flex;
		flex-wrap: wrap;
		-webkit-flex-wrap: wrap;
	}

	.elastic-select .select-count.showHeight {
		height: auto !important;
		width: 100%;
	}

	.elastic-select .select-count>div {
		display: inline-block;
		/* float: left; */
	}

	.elastic-select .select-input {
		margin-left: 0.3rem;
		height: 0.6rem;
		display: flex;
		display: -webkit-box;
		display: -webkit-flex;
		align-items: center;
		-webkit-box-align: center;
		-webkit-align-items: center;
		font-size: 0.3rem;
	}

	.elastic-select .select-input .area {
		border: 1px solid #1B1B1B;
		width: 1.25rem;
		margin: 0 0.20rem 0 0rem;
		height: 0.55rem;
		border-radius: 0.10rem;
		padding-left: 0.1rem;
		text-align: left;
	}

	.elastic-select .select-categoryList {
		margin-left: 0.3rem;
		display: flex;
		display: -webkit-box;
		display: -webkit-flex;
		flex-wrap: wrap;
		-webkit-flex-wrap: wrap;
	}

	.elastic-select .select-count .count-info {
		height: 0.64rem;
		/* width: 3rem; */
		padding: 0 0.15rem;
		background: #f5f5f5;
		line-height: 0.64rem;
		text-align: center;
		border-radius: 0.15rem;
		margin: 0rem 0.28rem 0.20rem 0;
		font-size: 0.29rem;
	}

	.elastic-select .select-categoryList .count-info {
		height: 0.64rem;
		padding: 0 0.2rem;
		/* width: 4rem; */
		background: #f5f5f5;
		line-height: 0.64rem;
		text-align: center;
		border-radius: 0.15rem;
		margin: 0 0.28rem 0.20rem 0;
		font-size: 0.29rem;
	}

	.elastic .elastic-select.showTop {
		margin-top: 0.22rem;
		/* height: 100%; */
	}


	.elastic .elastic-select .space {
		display: flex;
		display: -webkit-box;
		display: -webkit-flex;
		align-items: center;
		-webkit-box-align: center;
		-webkit-align-items: center;
		font-size: 0.3rem;
	}

	.elastic .elastic-select .space span {}

	.elastic .elastic-select .count-info.countColor {
		background: #f8ecec;
		color: #ff3a30;
	}

	.coupon-info {
		height: 0;
		width: 100%;
		position: fixed;
		bottom: 0.98rem;
		background: #fff;
		border-top-left-radius: 0.30rem;
		border-top-right-radius: 0.30rem;
		z-index: 1;
		overflow: hidden;
		overflow-x: hidden;
		overflow-y: scroll;
		transition: all 1s;

	}

	.coupon-info.showCouopn {
		height: 6.67rem;
		padding-top: 0.26rem;
	}

	.coupon-tit {
		margin-left: 0.27rem;
		font-size: 0.32rem;
		margin-bottom: 0.28rem;
		position: relative;
	}

	.coupon-content {
		height: 1.86rem;
		width: 7rem;
		background-image: url('../../assets/coupon-img.png');
		background-size: 100% 100%;
		margin: 0 auto 0.20rem auto;
		display: flex;
		display: -webkit-box;
		display: -webkit-flex;
		align-items: center;
		-webkit-box-align: center;
		-webkit-align-items: center;
		padding-left: 0.3rem;
		color: #ff5f1e;
	}

	.coupon-content.couponColor {
		background: #eee;
		color: #7B7B7B;
	}

	.coupon-content .content-left {
		font-size: 0.50rem;
		margin-right: 0.45rem;
		font-weight: 550;
	}

	.coupon-content .content-right {
		font-size: 0.28rem;
	}

	.coupon-content .content-left span {
		font-size: 0.30rem;
		font-weight: 500
	}

	.coupon-close {
		position: absolute;
		top: 0.12rem;
		right: 0;
		width: 0.70rem;
		height: 0.70rem;
	}

	.buy-info {
		display: flex;
		display: -webkit-box;
		display: -webkit-flex;
		justify-content: space-between;
		-webkit-box-pack: justify;
		-webkit-justify-content: space-between;
		align-items: center;
		-webkit-box-align: center;
		-webkit-align-items: center;
		padding: 0.15rem 0.28rem 0 0.28rem;

	}

	.buy-right {
		display: flex;
		display: -webkit-box;
		display: -webkit-flex;
		align-items: center;
		-webkit-box-align: center;
		-webkit-align-items: center;
	}


	.buy-info .buy-jian {
		margin-right: 0;
	}

	.buy-info .buy-jia img {
		height: 0.05rem;
		width: 0.23rem;
	}

	.buy-info .buy-jian img {
		width: 0.24rem;
		height: 0.24rem;
	}

	.goodImgs {
		width: 6.94rem;
		margin: 0 auto;
	}

	.goodImgs img {
		width: 100%;
		height: 100%;
		margin-top: 0.20rem;
	}

	.goodImgs img:first-child {
		margin-top: 0;
	}

	.assemble-list {
		padding-left: 0.25rem;
		box-sizing: border-box;
		display: flex;
		display: -webkit-box;
		display: -webkit-flex;
		justify-content: space-between;
		-webkit-box-pack: justify;
		-webkit-justify-content: space-between;
		align-items: center;
		-webkit-box-align: center;
		-webkit-align-items: center;
		padding-bottom: 0.2rem;
	}

	.assemble-left .left-img {
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

	.assemble-left {
		font-size: 0.3rem;
		display: flex;
		display: -webkit-box;
		display: -webkit-flex;
		align-items: center;
		-webkit-box-align: center;
		-webkit-align-items: center;
	}

	.assemble-left .left-img img {
		width: 0.7rem;
		height: 0.7rem;
		border-radius: 50%;
	}

	.assemble-left .left-info {
		width: 4rem;
		margin-left: 0.15rem;
	}

	.assemble-left .left-info {
		font-size: 0.3rem;
		color: #000000;
	}

	.residual-info {
		font-size: 0.28rem;
		color: #9797a1;
		margin-left: 0.15rem;
	}

	.residual-info .personNum {
		color: #fe3e33;
	}

	.left-info-time {
		color: #9797a1;
		font-size: 0.28rem;
	}

	.assemble-right {
		width: 1.3rem;
		height: 0.6rem;
		background-color: #ff3d33;
		color: #fff;
		font-size: 0.33rem;
		border-radius: 0.5rem;
		text-align: center;
		line-height: 0.6rem;
		margin-right: 0.28rem;
	}
</style>
<style>
	.swiper-pagination-bullet {
		border: 1px solid #fff !important;
		background: rgba(0, 0, 0, 0.1) !important;
		width: 0.14rem;
		height: 0.14rem;
	}

	.swiper-pagination-bullet-active {
		/* background: #fff !important; */
		opacity: 0.5;
	}

	.carpet-meal .swiper-container {
		width: 100%;
		height: 100%;
		/* border-radius: 0.20rem; */
		overflow: hidden !important;
	}

	.carpet-meal .swiper-pagination-fraction,
	.carpet-meal .swiper-pagination-custom,
	.carpet-meal .swiper-container-horizontal>.swiper-pagination-bullets {
		position: absolute;
		bottom: 0.2rem !important;
		left: 50%;
		text-align: center;
		transform: translateX(-50%);
		-webkit-transform: translateX(-50%);
		z-index: 10;
	}

	.carpet-meal .swiper-container .showDot {
		width: 100%;
		height: 100%;
	}

	.carpet-meal.swiper-pagination-fraction,
	.carpet-meal.swiper-pagination-custom,
	.carpet-meal.swiper-container-horizontal>.swiper-pagination2.swiper-pagination-bullets {
		/* 		position: absolute;
		bottom: 1.1rem !important;
		z-index: 10; */
	}

	.carpet-meal .swiper-pagination2.swiper-pagination-bullets {
		height: 0.1rem;
	}

	.carpet-meal .van-swipe__indicators {
		bottom: 0.5rem;
	}

	.carpet-meal .van-swipe__indicators .van-swipe__indicator {
		border: 1px solid #fff !important;
		background: rgba(0, 0, 0, 0.5) !important;
	}

	.carpet-meal .swiper-pagination2.swiper-pagination-bullets {
		height: 0.1rem;
	}

	.carpet-meal .van-swipe {
		height: 100%;
	}
</style>
