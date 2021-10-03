<template>
	<div class='container' @scroll="scrollEvent">

		<div class='head' :class='showDistance?"showTop":""'>
			<div class='head-left' @click="tabReturn">
				<img src="../assets/right-shadow.png" mode=""></img>
				<!-- <span>返回</span> -->
			</div>
			<div class='head-center'>
				<!-- 月度套餐 -->
			</div>
			<div class='head-right' @click="toShare">
				<img src='../assets/share-shadow.png'   v-if='!showWx'></img>
			</div>
		</div>
		<div class='showHead' v-if='collageHead'>
			<div class='head' :class='showDistance?"showTop":""'>
				<div class='head-left' @click="tabReturn">
					<img src="../assets/left-black.png" mode=""></img>

				</div>
				<div class='head-center'>
					服务详细
				</div>
				<div class='head-right' @click="toShare">
					<img src='../assets/fenxiang.png'  v-if='!showWx' ></img>
				</div>
			</div>
		</div>
		<div class='banner-meal'>


			<van-swipe :autoplay="2000" :loop="true" indicator-color="#fff">
				<van-swipe-item v-for="(item, index) in picList" :key="index">
					<img :src="item">
				</van-swipe-item>
			</van-swipe>
			<!-- 	<swiper :options="homeSwiperOption" class="swiper-container" v-if="picList.length > 1">
				<swiper-slide :data-link='item' v-for="(item,index) in picList" :key="index">
					
					<div class='showDot'>
						<img :src="item" alt="">
					</div>
				</swiper-slide>
				常见的小圆点
				<div class="swiper-pagination" v-for="(item,index) in  picList" :key="index" slot="pagination"></div>
			</swiper>
		
			
				<swiper :options="swiperOptionBanner" class="swiper-container"  v-if="picList.length ===1">
					<swiper-slide v-for="(item,index) in picList" :key="index">
						<img :src="item" alt="" >
					</swiper-slide>
			
				</swiper> -->

		</div>
		<div class='small-list'>
			<swiper :options="carpetSwiperOption" class="swiper-container" ref='carpetSw' v-if="smallImgList.length > 1">
				<swiper-slide :data-link='index' v-for="(item,index) in smallImgList" :key="index" :class='smallFlag==index?"enlarge":""'>
					<!-- <img src="../assets/newPeople.jpg" mode=""></img> -->
					<div class='showDot'>
						<img :src="item.picUrl" alt="">
					</div>
				</swiper-slide>
				<!-- 常见的小圆点 -->
				<!-- <div class="swiper-pagination" v-for="(item,index) in  imgList" :key="index" slot="pagination"></div> -->
			</swiper>
			<!-- </div> -->

			<swiper :options="carpetSwiperOption" ref='carpetSw' class="swiper-container" v-if="smallImgList.length ==1">
				<swiper-slide v-for="(item,index) in smallImgList" :key="index">
					<img :src="item.picUrl" alt="">
				</swiper-slide>

			</swiper>

		</div>
		<div class='content'>
			<div class='content-title'>
				办公室单次深度保洁
				<!-- <span style="margin-left: 10px;">{{info.name}}</span> -->
			</div>
			<div class='content-money'>
				<span class='newMoney'>￥{{totalPrice}}</span>
				<span class='count'>折价后</span>
				<span class='oldMoney'>￥{{discountPrice}}</span>
			</div>
			<!-- <div class='content-head'>
				<div>
					<span class='head-discount'>优惠</span>
					<span class='head-money'>￥{{couponNum}}</span>
					<span class='head-count'>减额券</span>
				</div>
				<div class='head-rights' @click="obtainCoupon">
					<div>立即领取</div>
					<img src='../assets/right-to.png'></img>
				</div>
			</div> -->
			<!-- 	<div class='content-date' @click="selectDate">
				<div>
					开始时间<span>{{nowDate}}</span>
				</div>
			</div> -->
			<div class='content-info'>
				<div class='info-first'>选择</div>
				<div class='info-second' @click="triggerTime">
					<div class='info-info'>
						<div><span>到场时间：</span><span>{{selectDateInfo}}</span><span style="margin-left: 10px;">{{selectTime}}</span></div>

						<!-- <div>面积：{{area}}平 -->
						<!-- <span style='margin-left: 8px;'>{{frequency}}次</span> -->
						<!-- </div> -->

					</div>
					<div class='info-img'>
						<img src='../assets/right-to.png'></img>
					</div>
				</div>
			</div>
			<div class='content-info info-area'>
				<div class='info-first'>面积</div>
				<div class='info-second'>
					<div class='info-info' @click="triggerTime">
						<div>(建筑面积,100起购)</div>

						<!-- <div>面积：{{area}}平 -->
						<!-- <span style='margin-left: 8px;'>{{frequency}}次</span> -->
						<!-- </div> -->

					</div>
					<div class='space'>
						<input class='area' type="number" v-model="area" @input="changeNumber" ref="inputVal" />

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

				<!-- <swiper class="swiper " autoplay="true" interval="4000" circular="true" duration="1600" @change="swiperChangeDot">
					<swiper-item v-for='(item,index) in banner' :key='index' @click="toMeal(item.linkHtml)">
						<img :src='item.picUrl'></img>
					</swiper-item>
				</swiper>
				<div class="dots" v-if='banner.length!=1'>
					<block v-for="(imgUrls,index ) in banner" :key="index">
						<div class="dot" :class="[index ==  swiperDot ? ' active' : '']"></div>
					</block>
				</div> -->
			</div>

			<!-- <div class='nav'>
				商品详细
			</div> -->
			<div class='goodImgs'>
				<img :src='item' v-for='(item,index) in productList' :key='index'></img>
			</div>
		</div>
		<div class='container-bottom'>
			<div class='bottom-first'>
				<div class='tab-first'>
					<div>
						<img src='../assets/address-4.png'></img>
					</div>
					<div>{{city}}</div>
				</div>
				<div class='tab-second' @click="toCustomer">
					<div>
						<img src='../assets/service-1.png'></img>
					</div>
					<div>客服</div>
				</div>
			</div>

			<div class='bottom-second' @click="goPay">
				立即购买
			</div>
		</div>

		<div class='elastic' :class='showElastic==true?"showHeight":""'>
			<div class='elastic-head'>
				<div class='elastic-head-first'>
					<div>
						<!-- <img src='../../static/banner-clean.png'></img> -->
						<img :src='info.materPicUrl'></img>
					</div>
					<div>
						<div class='elastic-head-tit'>办公室清洁-{{info.name}}</div>
						<div class='elastic-head-info'><span class='new-money'>￥{{totalPrice}}</span><span class='old-money'>￥{{discountPrice}}</span></div>
					</div>
				</div>
				<div class='elastic-head-second'>
					<img class='elastic-head-second' src='../assets/close.png' @click='close'></img>
				</div>
			</div>
			<!-- 		<div class='elastic-select'>
				<div class='select-title'>请选择频率</div>
				<div class='select-count'>
					<div class='count-info' v-for='(item,index) in  countList ' :class="countId == item.id?'countColor':''" :key='index'
					 @click='tabCount(item.id,item.content)'>{{item.content}}</div>
				</div>
			</div> -->
			<!-- 		<div class='elastic-select showTop'>
				<div class='select-title'>请选择时间</div>
				<div class='select-count'>
					<div class='count-info' v-for='(item,index) in  weekList ' :class="item.sign?'countColor':''" :key='index' @click="tabwWeek(index,item.sign,item.content)">{{item.content}}</div>
				</div>
			</div> -->
			<!-- 
			<div class='elastic-bottom'>
				<div class='elastic-select showTop'>
					<div class='select-title'>请选择时辰</div>
					<div class='select-count'>
						<div class='count-info' v-for='(item,index) in  info.tProductTimePrices ' :key='index' :class="timeId == item.id?'countColor':''"
						 @click="tabwTime(item.id,item.price,item)">{{item.beginTime}}-{{item.endTime}}点</div>
					</div>
				</div>
				<div class='elastic-select showTop'>
					<div class='select-title'>请输入清洁面积<span>（建筑面积）</span></div>
					<div class='space'>
						<input class='area' type="number" v-model="area" @input="changeNumber" ref="inputVal" />
						<span>平</span>
					</div>
				</div>
				<div class='buy-info'>
					<div>
						请选择购买次数
					</div>
					<div class='buy-right'>
						<div class='buy-jia' @click="reduce">
							<img src='../assets/jian.png'></img>
						</div>
						<div class='buy-num'>
							{{frequency}}
						</div>
						<div class='buy-jian' @click="add">
							<img src='../assets/jia.png'></img>
						</div>
					</div>
				</div>

			</div> -->

		</div>
		<div class='coupon-info' :class='couponFlag?"showCouopn":""'>
			<div class='coupon-tit'>
				优惠券
			</div>
			<div class='coupon-content' v-for='(item,index) in couponList' :class='totalMoney<item.enoughMoneys?"couponColor":""'
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
			<div class='coupon-content couponColor  noCoupon' v-if='couponList.length==0'>
				暂无优惠券
			</div>
			<img class='coupon-close' src='../assets/close.png' @click='couponClose'></img>
		</div>

		<div class='time-info' :class='collageTime?"showTime-info":""'>
			<div class='elastic-head'>
				<div class='time-list'>
					<div v-for='(item,index)  in dateList ' :key='index' v-if='index>hourFlag' :class=' collageDate==item.week ?"showTimeColor":""'
					 @click="tabDate(item.week,item.date,index)">
						<div class='time-list-date'>

							{{item.week}}
						</div>
						<div class='time-list-info'>
							{{item.date}}
						</div>
					</div>
				</div>
				<img class='time-close' src='../assets/close.png' @click='timeclose'></img>
			</div>
			<div class='elastic-select'>
				<div class='select-count'>
					<div v-for='(item,index) in   hourList ' class='count-content' :key='index' @click='tabTime(item.id,item.time)'>
						<div class='count-info' :class=" hourId == item.id?'countColor':''">{{item.time}}</div>
					</div>

				</div>

			</div>
		</div>
		<div class='shadowArea' v-if="showElastic==true || couponFlag==true  || collageTime==true" @touchmove.stop.prevent="moveHandle">

		</div>
		<Load v-if='isLoade'></Load>
		<customer v-if='collageCurstomer' @priming='toCustomer' @define='toPhone' :typeInfo='"办公清洁咨询"'></customer>
		<showMoadel v-if='modelFlag' :cont='msg' :cancelspan='"取消"' :confirmspan='"确定"' @define='confirm' @remove='cancel'></showMoadel>
	</div>
</template>

<script>
	import {
		swiper,
		swiperSlide
	} from "vue-awesome-swiper";
	import 'swiper/dist/css/swiper.css'
	import {
		mapGetters
	} from 'vuex'
	import customer from './customerService.vue'
	import * as axios from '../untils/ajax.js'
	import wx from 'weixin-js-sdk'
	var preD = function(e) {
		e.preventDefault()
	}
	export default {
		data() {
			return {
				collageHead: false,
				swiperCurrent: 0,
				swiperDot: 0,
				list: [""],
				picList: [],
				smallFlag: 0,
				smallImgList: [],
				bigImgList: [],
				week: [],
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
				signNum: false,
				phoneHeight: '',
				bottomHeight: '',
				shareInfo: '',
				msg: '您面积未修改，确定100平吗？',
				modelFlag: false,
				setFocus: false,
				top: 0,
				signIndex: 0,
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
				hourId: 1,
				selectTime: '',
				hourList: [{
						id: 1,
						time: '7:30'
					},
					{
						id: 2,
						time: '8:00'
					},
					{
						id: 3,
						time: '8:30'
					},
					{
						id: 4,
						time: '9:00'
					},
					{
						id: 5,
						time: '9:30'
					},
					{
						id: 6,
						time: '10:00'
					},
					{
						id: 7,
						time: '10:30'
					},
					{
						id: 8,
						time: '11:00'
					},
					{
						id: 9,
						time: '11:30'
					},
					{
						id: 10,
						time: '12:00'
					},
					{
						id: 11,
						time: '12:30'
					},
					{
						id: 12,
						time: '13:00'
					},
					{
						id: 13,
						time: '13:30'
					},
					{
						id: 14,
						time: '14:00'
					},
					{
						id: 15,
						time: '14:30'
					},
					{
						id: 16,
						time: '15:00'
					},
					{
						id: 17,
						time: '15:30'
					},
					{
						id: 18,
						time: '16:00'
					},
					{
						id: 19,
						time: '16:30'
					},
					{
						id: 20,
						time: '17:00'
					},
					{
						id: 21,
						time: '17:30'
					},
					{
						id: 22,
						time: '18:00'
					},
					{
						id: 23,
						time: '18:30'
					},
					{
						id: 24,
						time: '19:00'
					},
				],
				collageTime: false,
				dateInfoList: [],
				dateList: [],
				collageDate: '明天',
				collageHourList: [],
				currentHourList: [],
				selectDateInfo: '',
				hourFlag: 0,
				city: '',
				showDistance: false,
				showWx:''
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
			swiper() {
				return this.$refs.carpetSw.swiper
			},
			carpetSwiperOption() {
				let that = this
				let options = {
					observer: true,
					observeParents: true,
					// 参数选项,显示小点
					//循环
					// loop: true,
					slidesPerView: 6,
					observer: true, //修改swiper自己或子元素时，自动初始化swiper
					// observeParents: true,
					// pagination: {
					// 	el: '.swiper-pagination'
					// },
					//每张播放时长3秒，自动播放

					on: {
						//滑动之后回调函数
						slideChangeTransitionStart: function() {
							/* realIndex为滚动到当前的slide索引值 */
							// console.log(this.realIndex)
							this.signIndex = this.realIndex
							// console.log(this.signIndex)
						},
						click: function() {
							if (this.clickedSlide.dataset) {
								let num = Number(this.clickedSlide.dataset.link)
								// that.linkTo(this.clickedSlide.dataset.link)

								that.linkTo(num)
							}
						}
					},
					//滑动速度
					speed: 1000,

				}
				return options
			},

		},
		methods: {
			linkTo(e) {
				console.log(e)
				let that = this
				that.picList = []
				that.showSwiper = false

				that.smallFlag = e
				setTimeout(() => {
					that.picList = that.bigImgList[e]
					console.log(that.picList)
				}, 1)


			},
			swiperChange: function(e) {
				console.log(e)
				let current = e.detail.current;
				// console.log(current, '轮播图')
				let that = this
				this.swiperCurrent = current
			},
			changeNumber(e) {
				if (e.data == null) {
					return
				}
				if (this.area < 100) {
					this.$toast({
						message: '100平起购',
						duration: 1500
					})
				}

				if (e.data == '.') {
					this.$toast({
						message: '不能输入小数点',
						duration: 1500
					})

				}

				// this.area = Number(e.detail.value)


			},
			tabTime(id, e) {
				this.hourId = id
				this.selectTime = e
			},
			triggerTime() {

				this.collageTime = !this.collageTime
				document.body.style.overflow = 'hidden'
				document.addEventListener('touchmove', preD, {
					passive: false
				}) // 禁止页面滑动
			},
			timeclose() {
				this.collageTime = !this.collageTime
				document.body.style.overflow = '' // 出现滚动条
				document.removeEventListener('touchmove', preD, {
					passive: false
				})
			},
			tabDate(e, date, num) {

				this.collageDate = e
				if (num == 1) {

					this.hourList = this.currentHourList //获取时间段
					this.selectTime = this.hourList[0].time
					this.hourId = this.hourList[0].id
				} else {
					this.hourList = this.collageHourList //获取时间段
					this.selectTime = this.hourList[0].time
					this.hourId = 1
				}
				// if (this.collageDate == '今天') {
				// 	this.hourList = this.currentHourList//获取时间段
				// 	this.selectTime = this.hourList[0].time
				// } else {
				// 	this.hourList = this.collageHourList//获取时间段
				// 	this.selectTime = this.hourList[0].time
				// }


				this.dateInfoList.forEach(item => {
					if (item.includes(date)) {
						this.selectDateInfo = item
						console.log(this.selectDateInfo)
					}
				})
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
			trigger(e) {
				// this.showElastic = !this.showElastic
				let that = this
				// uni.getSystemInfo({
				// 	success: function(res) {
				// 		console.log(res.windowHeight);
				// 		that.phoneHeight = (res.windowHeight - that.bottomHeight - 10) + 'px'

				// 	}
				// });
				if (e == true) {
					// this.setFocus=true
					setTimeout(() => {
						// that.top=99999
						// that.setFocus = true
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
			goPay() {
				if (this.area < 100) {
					this.$toast({
						message: '100平起购',
						duration: 1500
					})
					return
				}
				if (this.area.toString().includes('.')) {
					this.toast.fail('面积有小数点')
					return
				}
				if (this.area == 100) {
					this.modelFlag = true
					return
				}
				let infoJson = {
					name: this.info.name,
					totalPrice: this.totalPrice,
					frequency: this.frequency,
					timeInfo: this.timeInfo,
					area: this.area,
					couponNum: this.couponNum,
					price: this.price,
					weekCount: this.weekCount,
					nowDate: this.nowDate,
					id: this.id,
					buyId: this.info.type,
					couponId: this.couponId,
					orderMoney: this.totalMoney,
					rate: this.weekCount,
					areaRadixt: this.areaRadixt,
					materUrl: this.info.materPicUrl,
					radix: this.radix,
					timePriceId: this.timeId,
					selectDateInfo: this.selectDateInfo,
					selectTime: this.selectTime,
					depthPrice: this.info.depthPrice,
					productId: this.info.id,
					typeId: 1,
					collageDate: this.collageDate,
					hourId: this.hourId,
					showWx:false
				}
				
				//判断是否为微信浏览器
				if (window.localStorage.getItem('wxBrowser') && (window.localStorage.getItem('token') == 'null')) {
					window.localStorage.setItem('evaluation', JSON.stringify(infoJson))
					window.localStorage.setItem('url','countMeal')
				}
				//判断有无token,或者token是否过期
				axios.post('/office/t-office-order-period/getWeAmount', {}).then(res => {
					if (res.meta.success) {

						this.$router.push({
							name: 'submission',
							params: infoJson
						})
					} else {

					}
				})
				// this.$router.push({
				// 	name: 'submission',
				// 	params: infoJson
				// })

				// uni.navigateTo({
				// 	url: "/pages/home/submission?json=" + JSON.stringify(infoJson)
				// })
			},
			confirm() {
				let infoJson = {
					name: this.info.name,
					totalPrice: this.totalPrice,
					frequency: this.frequency,
					timeInfo: this.timeInfo,
					area: this.area,
					couponNum: this.couponNum,
					price: this.price,
					weekCount: this.weekCount,
					nowDate: this.nowDate,
					id: this.id,
					buyId: this.info.type,
					couponId: this.couponId,
					orderMoney: this.totalMoney,
					rate: this.weekCount,
					areaRadixt: this.areaRadixt,
					materUrl: this.info.materPicUrl,
					radix: this.radix,
					timePriceId: this.timeId,
					selectDateInfo: this.selectDateInfo,
					selectTime: this.selectTime,
					depthPrice: this.info.depthPrice,
					productId: this.info.id,
					typeId: 1,
					services: '',
					collageDate: this.collageDate,
					hourId: this.hourId,
					showWx:false
				}
				this.modelFlag = false
				//判断是否为微信浏览器
				if (window.localStorage.getItem('wxBrowser') && (window.localStorage.getItem('token') == 'null')) {
					window.localStorage.setItem('evaluation', JSON.stringify(infoJson))
					window.localStorage.setItem('url','countMeal')
				}
				
				
				
				//判断有无token,或者token是否过期
				
				axios.post('/office/t-office-order-period/getWeAmount', {}).then(res => {
					if (res.meta.success) {

						this.$router.push({
							name: 'submission',
							params: infoJson
						})
					} else {

					}
				})
				// this.$router.push({
				// 	name: 'submission',
				// 	params: infoJson
				// })
				// uni.navigateTo({
				// 	url: "/pages/home/submission?json=" + JSON.stringify(infoJson)
				// })
			},
			cancel() {
				this.modelFlag = false
				if (this.showElastic) {
					// this.setFocus = true

				} else {

					this.trigger(true)
				}


			},
			// 获取数据
			getInfo() {

				let that = this
				this.isLoade = true
				let params = new FormData()
				params.append("id", this.id)
				axios.post('/product/t-product-office/getProductOfficeVersion2', params).then(res => {
					console.log(res)
					if (res.meta.success) {
						that.isLoade = false
						var pic = res.data.picUrl.split(';')
						pic.forEach(item => {
							if (item.length != 0) {
								this.picList.push(this.configUrl + item)
							}

						})
						var product = res.data.productItem.split(';')
						console.log(product)
						product.forEach(item => {
							if (item.length != 0) {

								this.productList.push(this.configUrl + item)

							}
						})

						this.info = res.data
						this.info['materPicUrl'] = this.configUrl + res.data.materPicUrl
						this.timeId = res.data.tProductTimePrices[0].id
						this.timeInfo = res.data.tProductTimePrices[0].beginTime + '-' + res.data.tProductTimePrices[0].endTime
						this.radix = res.data.tProductFrequencyPrice[0].radix

						let picUrlList = []
						let bigImgList = []
						res.data.tOfficeServiceAreas.forEach((item, index) => {
							let info = {}
							info.picUrl = this.configUrl + item.picUrl
							info.typeyIndex = index
							picUrlList.push(info)
							let imgList = []
							item.tOfficeServiceAreasItems.forEach((val, index) => {
								let url = this.configUrl + val.picUrl
								imgList.push(url)
							})
							bigImgList.push(imgList)
						})

						this.smallImgList = picUrlList
						this.bigImgList = bigImgList
						this.picList = this.bigImgList[0]

						this.price = res.data.tProductTimePrices[0].price
						this.discount = res.data.discount
						this.flatPriceList = res.data.tProductFlatPrice
						
						// 微信浏览器
						if (window.localStorage.getItem('wxBrowser') && (window.localStorage.getItem('evaluation') != null) && (window.localStorage.getItem('token') != null)) {
							this.wxEvaluation()
						}
						
						this.tFlatPrice()
						this.calculation()
						this.getCoupon()
					} else {
						this.isLoade = false
						this.toast.fail('获取数据失败')

					}
				})
			},
			calculation() {
				//加0.000001 ，是因为如何2.275,的四舍五入 变成2.27,加了0.000001,就不会了
				this.totalPrice = (((this.info.depthPrice * this.area).toFixed(2)) * this.areaRadixt + 0.000001).toFixed(2)
				this.totalMoney = this.totalPrice

				this.discountPrice = (this.totalPrice / this.discount).toFixed(0)
				if (this.signNum) {
					// this.selectCoupon()
				}
				this.signNum = true

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
			couponClose() {
				this.couponFlag = !this.couponFlag
				this.phoneHeight = ''
			},
			obtainCoupon() {
				this.couponFlag = !this.couponFlag
				let that = this
				// uni.getSystemInfo({
				// 	success: function(res) {
				// 		console.log(res.windowHeight);
				// 		that.phoneHeight = (res.windowHeight - that.bottomHeight - 10) + 'px'

				// 	}
				// });
			},
			obtainInfo(e) {
				if (this.totalMoney < e.enoughMoneys) {
					return
				}
				this.totalPrice = this.totalMoney
				this.couponNum = e.denomination
				this.couponFlag = !this.couponFlag
				this.totalPrice = (this.totalPrice - this.couponNum).toFixed(2)
				this.couponId = e.id
				this.phoneHeight = ''
			},
			moveHandle() {

			},
			selectDate() {
				// uni.navigateTo({
				// 	url: '/pages/component/date'
				// })
			},
			nowTime(e) {
				var myDate = new Date();
				var hours = new Date().getHours()
				myDate.setDate(myDate.getDate() + e); //获取AddDayCount天后的日期  
				var y = myDate.getFullYear();
				var m = (myDate.getMonth() + 1) < 10 ? "0" + (myDate.getMonth() + 1) : (myDate.getMonth() + 1); //获取当前月份的日期，不足10补0  
				var d = myDate.getDate() < 10 ? "0" + myDate.getDate() : myDate.getDate(); //获取当前几号，不足10补0  
				// this.nowDate = y + "-" + m + "-" + d;
				var date = y + "-" + m + "-" + d;
				var dates = m + "-" + d;
				var week = this.getweek(date)
				if (e == 0) {
					week = '今天'

				} else if (e == 1) {
					week = '明天'
					if (hours < 16) {
						this.selectDateInfo = date
						this.collageDate = week
						this.hourFlag = 0
					}
				} else if (e == 2) {
					if (hours >= 16) {
						this.selectDateInfo = date
						this.collageDate = week
						this.hourFlag = 1
					}

				}
				let info = {
					date: dates,
					week: week
				}
				this.dateInfoList.push(date)
				this.dateList.push(info)



			},
			getweek(e) {
				var weekDay = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
				var myDate = new Date(Date.parse(e));

				return weekDay[myDate.getDay()]
				// console.log(weekDay[myDate.getDay()])
				// this.weekName = weekDay[myDate.getDay()]
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
			selectCoupon() {
				if (this.couponList.length == 0) {
					return
				}
				var denomination = null
				this.couponList.forEach(item => {
					if (this.totalMoney >= item.enoughMoneys) {
						denomination = item.denomination
						this.couponId = item.id
					} else {

					}
				})
				this.totalPrice = this.totalMoney
				this.couponNum = denomination
				if (this.couponNum == null) {
					this.couponNum = 0
				}
				this.totalPrice = (this.totalPrice - this.couponNum).toFixed(2)

			},
			toMeal(e) {
				// uni.navigateTo({
				// 	url: e
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
				// 	provider: "weixin",
				// 	scene: "WXSceneSession",
				// 	type: 0,
				// 	href: that.shareInfo.linkHtml,
				// 	title: that.shareInfo.title,
				// 	summary: that.shareInfo.subTitle,
				// 	imgUrl: that.configUrl + that.shareInfo.picUrl,
				// 	success: function(res) {

				// 	},
				// 	fail: function(err) {

				// 	}
				// });

			},
			getShare() { //获取要分享的内容
				let params = new FormData()
				params.append('shareType', this.id)
				axios.post('/business/t-business-advert/findAdvertShare', params).then(res => {
					if (res.meta.success) {

						this.shareInfo = res.data
					}
				})
			},
			ergodicDate() {
				for (var i = 0; i < 6; i++) {
					this.nowTime(i)
				}
			},
			currentTime() {
				let myDate = new Date()
				var hourss = new Date().getHours()
				let hours = myDate.getHours().toString() //获取当前小时数(0-23)
				var minutes = myDate.getMinutes().toString() //获取当前分钟数(0-59)
				if (minutes.length == 1) {
					minutes = '0' + minutes
				}
				let timeNum = Number(hours + minutes)
				if (hourss < 16) {
					this.currentHourList = this.hourList.filter((item) => {
						let timeArray = item.time.split(':')
						// let num = Number(timeArray[0] + timeArray[1]) - 30
						let num = Number(timeArray[0] + timeArray[1])
						if (timeNum < num) {
							return item
						}
					})
					if (this.currentHourList.length == 0) {
						this.hourId = this.hourList[0].id
						this.selectTime = this.hourList[0].time
					} else {
						this.hourId = this.currentHourList[0].id
						// this.currentHourList=this.hourList
						this.collageHourList = this.hourList
						this.hourList = this.currentHourList
						this.selectTime = this.hourList[0].time
					}

				} else {
					this.currentHourList = this.hourList
					this.hourId = this.currentHourList[0].id

					this.collageHourList = this.hourList
					// this.hourList = this.currentHourList
					this.selectTime = this.hourList[0].time


				}



				// this.currentHourList = this.hourList.filter((item) => {
				// 	let timeArray = item.time.split(':')
				// 	let num = Number(timeArray[0] + timeArray[1]) - 30
				// 	if (timeNum < num) {
				// 		return item
				// 	}
				// })
				// this.currentHourList=this.hourList
				// this.collageHourList = this.hourList
				// this.hourList = this.currentHourList
				// this.selectTime = this.hourList[0].time

			},
			getShare() { //获取要分享的内容
				let params = new FormData
				params.append('shareType', this.id)
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
             	this.totalPrice=data.totalPrice
             	this.frequency=data.frequency
             	this.timeInfo= data.timeInfo
             	this.area=data.area
             	this.couponNum=data.couponNum
             	this.price= data.price
             	this.weekCount=data.weekCount
             	this.nowDate=data.nowDate
             	this.id=data.id
                this.info.type=data.buyId
             	this.couponId=data.couponId
             	this.totalMoney=data.orderMoney
             	this.weekCount=data.rate
             	this.areaRadixt=data.areaRadixt
             	this.info.materPicUrl=data.materUrl
             	this.radix=data.radix
             	this.timeId=data.timePriceId
             	this.selectDateInfo=data.selectDateInfo
             	this.selectTime=data.selectTime
             	this.info.depthPrice=data.depthPrice
             	this.info.id=data.productId
             	this.typeId=1
             	this.services= ''
             	this.collageDate= data.collageDate
             	this.hourId= data.hourId
             	this.showWx=false
             	window.localStorage.removeItem('evaluation')
             }
		},
		created() {
			//判断是否为微信浏览器
			if (window.localStorage.getItem('wxBrowser')) {
				this.showDistance = true
				this.showWx = true
			}

			this.city = window.localStorage.getItem('city')

			this.currentTime()
			this.ergodicDate()
			// this.nowTime()
			this.id = 123456789
			this.getInfo()
			this.getfindAdvertList()
			let that = this
			// uni.getSystemInfo({
			// 	success: function(res) { // res - 各种参数


			// 		let info = uni.createSelectorQuery().select(".container-bottom");
			// 		info.boundingClientRect(function(data) { //data - 各种参数
			// 			that.bottomHeight = data.height
			// 		}).exec()
			// 	}
			// });
			this.getShare()
			// this.getServices()
			if (!this.showWx) {
				this.getServices()
			} else {
			  this.findAdvertShareConfig()
			}

		},
		beforeRouteLeave(to, form, next) {
			document.body.style.overflow = '' // 出现滚动条
			document.removeEventListener('touchmove', preD, {
				passive: false
			})
			next()
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
	page {
		height: 100%;
	}

	.container {
		width: 100vw;
		height: 100vh;
		/* padding-bottom: 1rem; */
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
		font-size: 0.33rem;
		z-index: 1000;
		position: fixed;
		top: 0;
	}

	.head-left {
		height: 100%;
		line-height: 0.88rem;
		float: left;
		width: 30%;
		display: -webkit-box;
		display: -webkit-flex;
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
		right: 0.30rem;
		top: 0.53rem;
	}
	.showTop .head-right img {
		top: 0.23rem;

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

	.showTop .head-right img {
		top: 0.23rem;

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

	/* .banner {
		height: 6.86rem;
		width: 100vw;
		position: relative;
	}

	.banner .swiper {
		width: 100%;
		height: 100%;

	}

	.banner img {
		display: block;
		width: 100%;
		height: 100%;
	} */
	.banner-meal {
		height: 6.86rem;
		width: 100vw;
		position: relative;
	}

	.banner-meal .swiper {
		width: 100%;
		height: 100%;

	}

	.banner-meal img {
		display: block;
		width: 100%;
		height: 100%;
	}

	.banner-meal .dots {
		position: absolute;
		left: 0;
		right: 0;
		bottom: 20px;
		display: flex;
		justify-content: center;
		z-index: 10;
	}

	.banner-meal .dots .dot {
		margin: 0 0.08rem;
		width: 0.14rem;
		height: 0.14rem;
		border: 1px solid #fff;
		background: rgba(0, 0, 0, 0.1);
		border-radius: 50%;
		transition: all .6s;
	}

	.banner-meal .dots .dot.active {
		width: 0.14rem;
		background: #fff !important;
	}

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

	.content-title {
		font-size: 0.3rem;
		width: 100%;
		padding: 0.3rem 0.28rem 0 0.28rem;
		font-weight: 550;
	}

	.content-money {
		height: 0.65rem;
		width: 100%;
		line-height: 0.45rem;
		border-bottom: 1px solid #dadada;
		padding: 0 0.28rem;
		padding-bottom: 0.1rem;
	}

	.content .newMoney {
		font-size: 0.40rem;
		color: #e01212;
		margin-right: 0.16rem;
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
		font-size: 0.2rem;
		text-decoration: line-through;
	}

	.content .content-head {
		display: flex;
		display: -webkit-box;
		display: -webkit-flex;
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
		padding: 0.2rem 0.28rem 0 0.28rem;
		display: flex;
		display: -webkit-box;
		display: -webkit-flex;
		/* border-bottom: 1px solid #dadada; */
	}

	.content-info .info-first {
		font-size: 0.3rem;
		margin-right: 0.2rem;
		color: #999;
		width: 0.8rem;
	}

	.content-info .info-second {
		/* float: right; */
		font-size: 0.3rem;
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
		padding-bottom: 0.2rem;

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
		background: #f8f8fa;
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

	/* 	.content-img .dots .dot {
		margin: 0 8rpx;
		width: 14rpx;
		height: 14rpx;

		border: 1px solid #fff;
		background: rgba(0, 0, 0, 0.1);
		border-radius: 8rpx;
		transition: all .6s;
	}

	.content-img .dots .dot.active {
		width: 14rpx;
		background: #fff !important;
	}
 */
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
		width: 4.73rem;
		background: #ff3a31;
		height: 0.98rem;
		line-height: 0.98rem;
		text-align: center;
		color: #fff;
		font-size: 0.32rem;
	}

	.shadowArea {
		position: fixed;
		bottom: 0.98rem;
		height: 100%;
		width: 100%;
		background: rgba(0, 0, 0, 0.3);
		z-index: 1;
	}

	.elastic {
		position: fixed;
		bottom: 0.98rem;
		height: 0;
		width: 100%;
		background: #fff;
		border-top-left-radius: 0.30rem;
		border-top-right-radius: 0.30rem;
		z-index: 1;
		overflow-x: hidden;
		overflow-y: auto;
		transition: all 1s;
	}

	.elastic.showHeight {
		height: 65%;
	}

	.elastic-head {
		margin: 0.50rem 0.20rem 0.5rem 0.30rem;
		position: relative;
	}

	.scroll-height {
		height: 73%;
	}

	.elastic-bottom {
		height: 80%;
		padding-bottom: 0.1rem;
		overflow: hidden;
		overflow-y: scroll;
		z-index: 20;
	}

	.elastic-head .elastic-head-first {
		display: flex;
		display: -webkit-box;
		display: -webkit-flex;
		/* 	align-items: center;
		-webkit-box-align: center;
		-webkit-align-items: center; */
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

	.elastic-head-first .new-money {
		color: #e01212;
		font-size: 0.3rem;
		margin: 0 0.20rem 0 0;
	}

	.elastic-head-first .old-money {
		color: #999;
		font-size: 0.3rem;
		text-decoration: line-through;
		margin-right: 0.2rem;
	}

	.elastic-head-first .num {
		color: #999;
	}

	.elastic-head .elastic-head-first img {
		display: block;
		height: 1.3rem;
		width: 1.3rem;
		margin-right: 0.3rem;
	}

	.elastic-head-second img {
		display: block;
		width: 0.7rem;
		height: 0.7rem;
		position: absolute;
		top: -0.2rem;
		right: 0;
	}

	.elastic-select .select-title {
		font-size: 0.3rem;
		margin: 0 0 0.3rem 0.3rem;
	}

	.elastic-select .select-title span {
		color: #E01212;
	}

	.elastic-select .select-count {
		margin-left: 0.2rem;
		display: flex;
		display: -webkit-box;
		display: -webkit-flex;
		flex-wrap: wrap;
		-webkit-flex-wrap: wrap;
	}

	.elastic-select .select-count .count-info {
		height: 0.64rem;
		width: 1.34rem;
		background: #f5f5f5;
		line-height: 0.64rem;
		text-align: center;
		border-radius: 0.15rem;
		margin: 0 0.28rem 0.2rem 0;
		font-size: 0.29rem;
	}

	.elastic .elastic-select.showTop {
		margin-top: 0.52rem;
	}

	.elastic .elastic-select .area {
		border: 1px solid #1B1B1B;
		width: 1.35rem;
		margin: 0 0.20rem 0 0.30rem;
		height: 0.65rem;
		border-radius: 0.10rem;
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
		background-image: url('../assets/coupon-img.png');
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

	.couponColor.noCoupon {
		font-size: 0.4rem !important;
	}

	.coupon-content .content-left {
		font-size: 0.5rem;
		margin-right: 0.45rem;
		font-weight: 550;
	}

	.coupon-content .content-right {
		font-size: 0.28rem;
	}

	.coupon-content .content-left span {
		font-size: 0.3rem;
		font-weight: 500
	}

	.coupon-close {
		position: absolute;
		top: 0.12rem;
		right: 0;
		width: 0.7rem;
		height: 0.7rem;
	}

	.buy-info {
		display: flex;
		display: -webkit-box;
		display: -webkit-flex;
		align-items: center;
		-webkit-box-align: center;
		-webkit-align-items: center;
		justify-content: space-between;
		-webkit-box-pack: justify;
		-webkit-justify-content: space-between;
		padding: 0.15rem 0.28rem 0.4rem 0.28rem;
		font-size: 0.3rem;
	}

	.buy-right {
		display: flex;
		display: -webkit-box;
		display: -webkit-flex;
		align-items: center;
		-webkit-box-align: center;
		-webkit-align-items: center;
	}

	.buy-info .buy-jia,
	.buy-info .buy-jian,
	.buy-num {
		display: flex;
		display: -webkit-box;
		display: -webkit-flex;
		align-items: center;
		-webkit-box-align: center;
		-webkit-align-items: center;
		justify-content: center;
		-webkit-box-pack: center;
		-webkit-justify-content: center;
		background: #f6f6f6;
		width: 0.65rem;

		height: 0.65rem;
		margin-right: 0.10rem;
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
		padding-bottom: 1rem;
	}

	.goodImgs img {
		width: 100%;
		height: 100%;
		margin-top: 0.2rem;
	}

	.goodImgs img:first-child {
		margin-top: 0;
	}

	.time-info {
		height: 0;
		width: 100%;
		position: fixed;
		bottom: 0.98rem;
		background: #fff;
		border-top-left-radius: 0.30rem;
		border-top-right-radius: 0.30rem;
		z-index: 2;
		overflow: hidden;
		/* padding-bottom: 100upx; */
		overflow-x: hidden;
		/* overflow-y: scroll; */
		-webkit-transition: all 0.5s;
		transition: all 1s;
		padding-top: 0px;
		box-sizing: border-box;
	}

	.time-info .time-list {
		display: flex;
		width: 100%;
		display: -webkit-flex;
		padding-top: 0.2rem;
	}

	.time-info .elastic-head .time-close {
		position: absolute;
		top: -0.48rem;
		right: 0;
		width: 0.7rem;
		height: 0.7rem
	}

	.time-info .time-list>div {

		width: 20%;
		text-align: center;
	}

	.time-info .time-list>div.showTimeColor {
		color: #ff3a30;
		padding: 0 0.2rem;
		box-sizing: border-box;
		border-bottom: 1px solid #ff3a30;
	}

	.time-info .time-list .time-list-date {
		font-size: 0.3rem;
	}

	.time-info .time-list .time-list-info {
		font-size: 0.28rem;
		margin: 0.1rem 0;
	}

	.time-info.showTime-info {
		height: 7.3rem;
		/* padding-top: 0.76rem; */
		box-sizing: border-box;
	}

	.time-info .elastic-select {
		position: relative;
		height: 4.7rem;
		overflow-y: scroll;
	}

	.time-info .elastic-select .time-close {
		position: absolute;
		top: -0.68rem;
		right: 0;
		width: 0.7rem;
		height: 0.7rem
	}

	.time-info .elastic-select .count-info.countColor {
		background: #f8ecec;
		color: #ff3a30;
	}

	.time-info .select-count {
		margin-left: 0;
		display: flex;
		display: -webkit-flex;
		/* justify-content: center; */
		flex-wrap: wrap;
		-webkit-flex-wrap: wrap;
	}

	.time-info .select-count .count-content {
		width: 25%;
		display: flex;
		display: -webkit-flex;
		justify-content: center;
		-webkit-box-pack: center;
		-webkit-justify-content: center;
	}

	.time-info .count-info {
		margin-right: 0 !important;
		-webkit-box-flex: 1 !important;

	}

	.elastic .elastic-select.showTop {
		margin-top: 0.52rem;
	}

	.content-info.info-area {
		border: none;
		padding-top: 0;
	}

	.content-info.info-area .info-first {
		display: flex;
		display: -webkit-flex;
		justify-content: space-between;
		-webkit-box-pack: justify;
		-webkit-justify-content: space-between;
		align-items: center;
		-webkit-box-align: center;
		-webkit-align-items: center;
		padding-bottom: 0.2rem;
	}

	.content-info .info-second .area {
		border: 1px solid #1B1B1B;
		width: 1.25rem;
		margin: 0 0.20rem 0 0rem;
		height: 0.55rem;
		border-radius: 0.10rem;
		padding-right: 0.1rem;
		text-align: right;
		font-size: 0.3rem;
	}

	.content-info .info-second .space {
		display: flex;
		display: -webkit-box;
		display: -webkit-flex;
		align-items: center;
		-webkit-box-align: center;
		-webkit-align-items: center;
		font-size: 0.3rem;
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

	.banner-meal .swiper-container {
		width: 100%;
		height: 100%;
		/* border-radius: 0.20rem; */
		overflow: hidden !important;
	}

	.banner-meal .swiper-pagination-fraction,
	.banner-meal .swiper-pagination-custom,
	.banner-meal .swiper-container-horizontal>.swiper-pagination-bullets {
		position: absolute;
		bottom: 0.8rem !important;
		left: 50%;
		text-align: center;
		transform: translateX(-50%);
		-webkit-transform: translateX(-50%);
		z-index: 10;
	}

	.banner-meal .swiper-container .showDot {
		width: 100%;
		height: 100%;
	}

	.banner-meal .swiper-pagination-bullet {
		border: 1px solid #fff !important;
		background: rgba(0, 0, 0, 0.5) !important;
	}

	.banner-meal.swiper-pagination-fraction,
	.banner-meal.swiper-pagination-custom,
	.banner-meal.swiper-container-horizontal>.swiper-pagination2.swiper-pagination-bullets {
		/* 		position: absolute;
		bottom: 1.1rem !important;
		z-index: 10; */
	}

	.banner-meal .swiper-pagination2.swiper-pagination-bullets {
		height: 0.1rem;
	}

	.banner-meal .van-swipe__indicators {
		bottom: 0.5rem;
	}

	.banner-meal .van-swipe__indicators .van-swipe__indicator {
		border: 1px solid #fff !important;
		background: rgba(0, 0, 0, 0.5) !important;
	}

	.banner-meal .swiper-pagination2.swiper-pagination-bullets {
		height: 0.1rem;
	}

	.small-list {
		width: 7.5rem;
		height: 1.68rem;
		display: flex;
		align-items: center;
		margin-top: -0.8rem;
		background: #fff;
	}

	.small-list .swiper-container {
		width: 100%;
		/* height: 100%; */

	}

	.small-list img {
		display: block;
		width: 1.14rem;
		height: 1.2rem;
		border-radius: 0.1rem;
		/* margin-left: 0.3rem; */
	}

	.small-list .enlarge {
		/* transform:scale(1.2) */
	}

	/* 	.small-list  .swiper-slide.swiper-slide-duplicate{
		 width: 1.3rem !important;
		 height: 1.4rem !important;
		 margin-left: 0.2rem;
		 margin-right: 0.2rem;
	} */
	.small-list .swiper-slide.swiper-slide-next {
		/* width: 1.3rem !important;
		height: 1.4rem !important; */
		/* margin-left: 0.2rem;
		margin-right: 0.2rem; */

	}

	.small-list .swiper-slide {
		height: 1.48rem !important;
		display: flex;
		align-items: center;
	}

	.swiper-slide.enlarge.swiper-slide-duplicate {
		/* margin-left: 0.2rem; */
		margin-right: 0.2rem;
	}

	.small-list .swiper-slide.enlarge {
		margin-right: 0.15rem;
	}

	.small-list .enlarge img {
		width: 1.3rem;
		height: 1.4rem;
		border-radius: 0.15rem;
		/* margin-right: 0.3rem; */
	}
</style>
