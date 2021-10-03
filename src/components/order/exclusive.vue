<template>
    <!-- :style='{height:phoneHeight}' -->
    <div class='container' @scroll="scrollEvent">
        <selectDates v-show='showSelecteDate' @biography='collageDate'> </selectDates>
        <div v-show='!showSelecteDate'>
            <div class='head' :class='showDistance?"showTop":""'>
                <div class='head-left' @click="tabReturn">
                    <img src="../../assets/right-shadow.png" mode=""></img>

                </div>
                <div class='head-center'>

                </div>
                <div class='head-right' @click="toShare">
                    <img src='../../assets/share-shadow.png' v-if='!showWx'></img>
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
                        <img src='../../assets/fenxiang.png' v-if='!showWx'></img>
                    </div>
                </div>
            </div>
            <div class='banner-meal'>
                <!-- <swiper class="swiper " autoplay="true" interval="4000" circular="true" duration="1000" @change="swiperChange">
				<swiper-item v-for='(item,index) in picList' :key='index'>
				
					<img :src='item'></img>
				</swiper-item>
			</swiper> -->
                <!-- <div class="dots" v-if='picList.length!=1'>
				<block v-for="(imgUrls,index ) in  picList" :key="index">
					<div class="dot" :class="[index ==  swiperCurrent ? ' active' : '']"></div>
				</block>
			</div> -->

                <van-swipe :autoplay="2000" :loop="true" indicator-color="#fff">
                    <van-swipe-item v-for="(item, index) in picList" :key="index">
                        <img :src="item">
                    </van-swipe-item>
                </van-swipe>

                <!-- <div v-if="picList.length > 1 ">
				<swiper :options="homeSwiperOptionss" class="swiper-container" v-if="picList.length > 1 && picList.length>0">
					<swiper-slide :data-link='item' v-for="(item,index) in picList" :key="index">
					
						<div class='showDot'>
							<img :src="item" alt="">
						</div>
					</swiper-slide>
			
					<div class="swiper-pagination" v-for="(item,index) in  picList" v-if="picList.length > 1 && picList.length>0" :key="index"
					 slot="pagination"></div>
				</swiper>
				</div>

				<swiper :options="homeSwiperOptionss" class="swiper-container" v-if="picList.length ==1 ">
					<swiper-slide v-for="(item,index) in picList" :key="index">
						<img :src="item" alt="">
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
                    办公室清洁定制—240平以上大面积优享专区
                    <span>(含消毒)</span>
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

                <!-- <div class='content-date' @click="selectDate">
					<div>
						开始服务日期<span>{{nowDate}}</span><span>{{weekName}}</span>
					</div>
				</div> -->
                <div class='content-info' @click='trigger'>
                    <div class='info-first'>方案参数</div>
                    <div class='info-second'>
                        <div class='info-info'>
                            <!-- <span>（{{timeInfo}}点）</span> -->
                            <div><span>已选：</span><span class='week'>清洁{{weekCount}}次/周</span>
                                <!--    <div class='deepCount'>
									其中深度{{deepContent}}
								</div> -->
                            </div>
                            <div><span>已选：</span>{{area}}平</div>
                            <!-- <div>面积：{{area}}平 <span style='margin-left: 8px;'>{{frequency}}次</span></div> -->
                            <div><span>已选：</span>{{customizedInfo}}</div>
                        </div>
                        <div class='info-img'>
                            <img src='../../assets/right-to.png'></img>
                        </div>
                    </div>
                </div>
                <div class='content-info  timeSelect' @click="triggerTime">
                    <div class='info-first'>到场时间</div>
                    <div class='info-second'>
                        <div class='info-info'>
                            <div><span>已选：</span><span class='week'>{{selectTime}}到场</span>

                            </div>
                        </div>
                        <div class='info-img'>
                            <img src='../../assets/right-to.png'></img>
                        </div>

                    </div>

                </div>
                <div class='content-img' v-if='banner.length !=0'>
                    <div v-if="banner.length > 1">
                        <swiper :options="swiperOptionAd" ref='silderAd' class="swiper-container">
                            <swiper-slide :data-link='item.picUrl' v-for="(item,index) in banner" :key="index">
                                <!-- <img src="../assets/newPeople.jpg" mode=""></img> -->
                                <div class='showDot'>
                                    <img :src="item.picUrl" alt="">
                                </div>
                            </swiper-slide>
                            <!-- 常见的小圆点 -->
                            <div class="swiper-pagination2" v-if="banner.length > 0 " v-for="(item,index) in pbanner"
                                :key="index" slot="pagination"></div>
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
                    <img :src='item' v-for='(item,index) in productList' :key='index'></img>
                </div>
            </div>
            <div class='container-bottom '>
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

                <div class='bottom-second' @click="goPay">
                    立即定制
                </div>
            </div>
            <div class='container-bottom' v-show='showElastic'>

                <div class='bottom-info' @click="goPay">
                    立即购买
                </div>
            </div>

            <div class='elastic' :class='showElastic==true?"showHeight":""'>

                <div class='elastic-head' @touchmove.stop.prevent="moveHandle">
                    <div class='elastic-head-first'>
                        <div>
                            <img :src='info.materPicUrl'></img>
                        </div>
                        <div>
                            <div class='elastic-head-tit'>清洁方案定制</div>
                            <!-- <div class='elastic-head-tit'>办公室清洁-{{info.name}}</div> -->
                            <div class='elastic-head-info'><span class='new-money'>￥{{totalPrice}}</span><span class='old-money'>￥{{discountPrice}}</span></div>
                            <div class='elastic-head-num'><span class='num'>(日常{{dailyNum}}次,深度{{deepNum}}次,{{area}}平,{{customizedMeal}})</span></div>
                            <!-- {{everyCount}}元/次, -->
                        </div>
                    </div>

                    <img class='elastic-head-second' src='../../assets/close.png' @click='close'></img>
                    <!-- <div class='whySelect'>
                     	不知道选什么？
                     </div> -->
                </div>

                <!-- <scroll-div  class='scroll-height' scroll-y='true' :scroll-top="top"> -->
                <div class='elastic-bottom' id='elastic-bottom'>
                    <div class='elastic-select'>
                        <div class='select-title'>请选择清洁频率</div>
                        <div class='select-count'>
                            <div v-for='(item,index) in  countList ' style="height: 40px;" @click='tabCount(item.content,index,item.id)'>
                                <div class='count-info' :class="countId == item.content?'countColor':''" :key='index'>{{item.content}}次/周</div>
                            </div>

                        </div>
                    </div>
                    <!-- 	<div class='elastic-select'>
						<div class='select-title'>请选择深度清洁频率</div>
						<div class='select-count'>
							<div class='count-info' v-for='(item,index) in  deepCleanList ' :class="deepCountId == item.id?'countColor':''" :key='index'
							 @click='tabDeepCount(item.id,item.content)'>{{item.content}}</div>
						</div>
					</div> -->
                    <!-- <div class='elastic-select showTop'>
						<div class='select-title'>请选择时间</div>
						<div class='select-count'>
							<div class='count-info' v-for='(item,index) in  weekList ' :class="item.sign?'countColor':''" :key='index'
							 @click="tabwWeek(index,item.sign,item.content,null)">{{item.content}}</div>
						</div>
					</div> -->
                    <!-- 	<div class='elastic-select showTop'>
						<div class='select-title'>请选择时辰</div>
						<div class='select-count'>
							<div class='count-info' v-for='(item,index) in  info.tProductTimePrices ' :key='index' :class="timeId == item.id?'countColor':''"
							 @click="tabwTime(item.id,item.price,item)">{{item.beginTime}}-{{item.endTime}}点</div>
						</div>
					</div> -->
                    <div class='elastic-select showTop'>
                        <div class='select-title'>请输入清洁面积<span>（建筑面积）</span></div>
                        <div class='space'>
                            <input class='area' type="number" v-model="area" @blur="changeBlur" @input="changeNumber"
                                @onBlur='confirmNum' ref="inputVal" />
                            <span>平</span>
                            <span class='space-tit'>(240平起购)</span>
                        </div>
                    </div>
                    <div class='elastic-select showTop'>
                        <div class='select-title'>请选择方案定制周期</div>
                        <div class='select-count'>
                            <div class='customized' v-for='(item,index) in  customizedList ' :key='index' :class="customizedId == item.id?'countColor':''"
                                @click="tabCustomized(item.id,item.content)">
                                {{item.content}}
                               <!-- <div class='showTips' v-if='item.id==3'>
                                    9折优惠
                                </div>
                                <div class='showTips' v-if='item.id==4'>
                                    赠豪礼
                                </div> -->
                            </div>
                        </div>
                    </div>
                </div>
                <!-- </scroll-div> -->
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
                <img class='coupon-close' src='../../assets/close.png' @click='couponClose'></img>
            </div>


            <div class='time-info' :class='collageTime?"showTime-info":""'>
                <div class='elastic-select'>
                    <div class='select-count'>
                        <div v-for='(item,index) in   hourList ' class='count-content' :key='index' @click='tabTime(item.id,item.time)'>
                            <div class='count-info' :class=" hourId == item.id?'countColor':''">{{item.time}}</div>
                        </div>

                    </div>
                    <img class='time-close' src='../../assets/close.png' @click='timeclose'></img>
                </div>
            </div>
            <div class='shadowArea ' v-if="showElastic==true || collageTime==true" @touchmove.stop.prevent="moveHandle">

            </div>
            <Load v-if='isLoade'></Load>
            <customer v-if='collageCurstomer' @priming='toCustomers' @define='toPhone' :typeInfo='"办公清洁咨询"'></customer>

            <showMoadel v-if='modelFlag' :cont='msg' :cancelspan='"取消"' :confirmspan='"确定"' @define='confirm' @remove='cancel'></showMoadel>
        </div>

    </div>
</template>

<script>
    import {
        swiper,
        swiperSlide
    } from "vue-awesome-swiper";
    import 'swiper/dist/css/swiper.css'
    import wx from 'weixin-js-sdk'
    import {
        mapGetters
    } from 'vuex'
    import customer from './../customerService.vue'
    import selectDates from './../selectDate.vue'
    import * as axios from '../../untils/ajax.js'

    // import Swiper from 'swiper'
    var preD = function(e) {
        e.preventDefault()
    }
    export default {
        data() {
            return {
                collageHead: false,
                swiperCurrent: 0,
                showSwiper: true,
                swiperFirst: true,
                smallImgList: [],
                smallFlag: 0,
                swiperDot: 0,
                list: [""],
                picList: [],
                week: [],
                productList: [],
                customizedMeal: '包月',
                dailyNum: 4,
                countList: [{
                        id: 1,
                        content: 1
                    }, {
                        id: 2,
                        content: 2
                    }, {
                        id: 3,
                        content: 3
                    }, {
                        id: 4,
                        content: 4
                    }, {
                        id: 5,
                        content: 5
                    },
                    {
                        id: 6,
                        content: 6
                    }, {
                        id: 7,
                        content: 7
                    }
                ],
                deepCountId: 4,
                deepContent: '1次/两周',
                deepNum: 4,
                deepCleanList: [{
                        id: 0,
                        content: '不需要'
                    },
                    {
                        id: 3,
                        content: '1次/周'
                    },
                    {
                        id: 2,
                        content: '2次/周'
                    },
                    {
                        id: 1,
                        content: '3次/周'
                    },
                    {
                        id: 4,
                        content: '1次/两周'
                    },
                    {
                        id: 5,
                        content: '1次/四周'
                    }
                ],
                customizedId: 2,
                customizedInfo: '包月(4周)',
                customizedList: [{
                        id: 2,
                        content: "包月(4周)",
                    },
                    {
                        id: 3,
                        content: "包季度(12周)",
                    },
                    {
                        id: 4,
                        content: "包年(52周)",
                    },
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
                collageTime: false,
                tiemId: 1,
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
                hourId: 1,
                selectTime: '7:30',
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
                countId: '',
                weekId: 1,
                timeId: '',
                showElastic: false,
                signFlag: 1,
                info: [],
                weekCount: 1,
                weekTime: '周一',
                area: 240,
                timeInfo: '',
                frequency: 4,
                price: 0,
                totalPrice: 0,
                discount: 0,
                discountPrice: '',
                couponFlag: false,
                couponList: [],
                couponNum: 0,
                totalMoney: 0,
                id: '',
                nowDate: '',
                signCount: 1,
                endDate: '',
                couponId: '',
                areaRadixt: "",
                flatPriceList: [],
                frequencyRadixt: "",
                frequencyList: [],
                count: 1,
                everyCount: '',
                banner: [],
                isLoade: false,
                collageCurstomer: false,
                weekName: null,
                signNum: 0,
                phoneHeight: '',
                bottomHeight: '',
                shareInfo: '',
                services: '',
                msg: '您面积未修改，确定240平吗？',
                modelFlag: false,
                setFocus: false,
                top: 0,
                showSelecteDate: false,
                homeSwiperOptionss: {
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

                    // delay:1000

                },

                // msg: "您还未登录，是否要登录?",
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
                dailyPrice: 0,
                depthPrice: 0,
                cleanId: 3,
                city: '',
                showDistance: false,
                areaParameter: [{
                        id: 1,
                        areaFix: 0.223
                    },
                    {
                        id: 2,
                        areaFix: 0.187
                    },
                    {
                        id: 3,
                        areaFix: 0.153
                    },
                    {
                        id: 4,
                        areaFix: 0.125
                    },
                    {
                        id: 5,
                        areaFix: 0.1
                    },
                    {
                        id: 6,
                        areaFix: 0.098
                    }, {
                        id: 7,
                        areaFix: 0.096
                    },
                ],
                showWx: false
            }
        },
        components: {
            swiper,
            swiperSlide,
            selectDates,
            customer
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

                if (that.picList.length < 1) {
                    that.swiperFirst = false
                } else {
                    that.swiperFirst = true
                }
                that.showSwiper = true
                // this.$nextTick(function() {


                // })

                // console.log(that.picList)
            },
            collageDate() {
                this.showSelecteDate = !this.showSelecteDate
            },
            confirmNum() {
                alert(6366)
            },
            //输入框面积小于240，失去焦点自动变为240
            changeBlur() {
                if (this.area < 240) {
                    this.area = 240
                }
            },
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



            },
            tabCustomized(e, el) {
                this.customizedId = e
                this.customizedInfo = el
                if (e == 2) {
                    this.customizedMeal = '包月'
                } else if (e == 3) {
                    this.customizedMeal = '包季度'
                } else {
                    this.customizedMeal = '包年'
                }
            },
            tabDeepCount(e, info) {
                // let num = parseInt(info)
                // if (this.countId < num) {
                // 	return
                // }
                // this.deepCountId=e
                this.deepContent = info
                console.log(e)
                if (e == 1) {
                    this.calculateDeep(12)

                } else if (e == 2) {
                    this.calculateDeep(8)
                } else if (e == 3) {
                    this.calculateDeep(4)
                } else if (e == 4) {
                    this.calculateDeep(2)
                } else if (e == 5) {
                    this.calculateDeep(1)
                } else if (e == 0) {
                    this.calculateDeep(0)
                }




                // 	if(this.customizedId==1){

                // 	}else if(this.customizedId==2){

                // 	}else if(this.customizedId==3){

                // 	}
            },
            calculateDeep(e) {

                if (this.countId < 3) {


                    if (this.customizedId == 2) {
                        this.deepNum = e
                    } else if (this.customizedId == 3) {
                        this.deepNum = e * 3
                    } else if (this.customizedId == 4) {
                        this.deepNum = 52

                    }
                    if (this.customizedId == 2) {
                        this.dailyNum = this.countId * 4 - this.deepNum
                    } else if (this.customizedId == 3) {
                        this.dailyNum = this.countId * 12 - this.deepNum
                    } else if (this.customizedId == 4) {
                        this.dailyNum = this.countId * 52 - this.deepNum
                    }
                } else {
                    this.deepContent = '1次/两周'
                    this.deepCountId = 4
                    this.deepNum = 2
                    if (this.customizedId == 2) {

                        this.dailyNum = this.countId * 4 - this.deepNum
                    } else if (this.customizedId == 3) {
                        this.deepNum = this.deepNum * 3
                        this.dailyNum = this.countId * 12 - this.deepNum
                    } else if (this.customizedId == 4) {
                        this.deepNum = this.deepNum * 13
                        this.dailyNum = this.countId * 52 - this.deepNum
                    }
                }
                console.log(this.deepNum)

                this.calculation()
            },
            tabTime(id, e) {
                this.hourId = id
                this.selectTime = e
            },
            moveHandle() {

            },
            toCustomers() {
                this.collageCurstomer = !this.collageCurstomer
            },
            toCustomer() {

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
            tabCount(num, deindex, id) {
                let nums = parseInt(this.deepContent)
                if (id < 3) {
                    this.deepContent = '1次/周'
                    this.deepCountId = 3

                    if (this.customizedId == 2) {
                        this.deepNum = 4
                    } else if (this.customizedId == 3) {
                        this.deepNum = 4 * 3
                    } else if (this.customizedId == 4) {
                        if (this.deepCountId == 3) {
                            this.deepNum = 52
                        }

                    }


                    if (this.customizedId == 2) {

                        this.dailyNum = num * 4 - this.deepNum
                    } else if (this.customizedId == 3) {

                        this.dailyNum = num * 12 - this.deepNum
                    } else if (this.customizedId == 4) {

                        this.dailyNum = num * 52 - this.deepNum
                    }
                } else {

                    this.deepContent = '1次/两周'
                    this.deepCountId = 4
                    this.deepNum = 2

                    if (this.customizedId == 2) {

                        this.dailyNum = num * 4 - this.deepNum
                    } else if (this.customizedId == 3) {
                        this.deepNum = this.deepNum * 3
                        this.dailyNum = num * 12 - this.deepNum
                    } else if (this.customizedId == 4) {
                        this.deepNum = this.deepNum * 13
                        this.dailyNum = num * 52 - this.deepNum
                    }
                }
                // if (num < nums) {
                // 	return
                // }


                this.countId = num

                this.weekCount = num
                // // this.frequencyRadixt = index
                // this.weekList.map(item => {
                // 	return item.sign = false
                // })
                // this.tabwWeek(0, true, '周一', deindex)
                // this.tabwWeek(deindex)
                // this.weekList.map((item,i) => {
                //         if(i <= deindex){
                // 			item.sign=true
                // 		}else{
                // 			item.sign=false
                // 		}
                // 		return
                // })
                // this.frequency = id * this.signCount
                // this.couponNum = 0
                // this.couponId = ''

                this.calculation()
            },
            tabwWeek(id, sign, content, index) {
                var count = 0
                let that = this
                this.weekList.forEach(item => {
                    if (item.sign) {
                        count++
                    }
                })
                if (count > this.countId) {
                    // this.toast.fail('只能选择' + this.countId + '次')
                    this.$toast({
                        message: '只能选择' + that.countId + '次',
                        duration: 1500
                    })
                    return
                }

                if (count == this.countId && !sign) {
                    // this.toast.fail('只能选择' + this.countId + '次')
                    this.$toast({
                        message: '只能选择' + that.countId + '次',
                        duration: 1500
                    })
                    return
                }
                this.count = 0
                if (index) {
                    this.weekList = this.weekList.map((item, i) => {
                        if (i <= index) {
                            item.sign = true
                        } else {
                            item.sign = false
                        }
                        return item
                    })
                } else {
                    this.weekList[id].sign = !this.weekList[id].sign
                }

                this.weekTime = ''
                var num = 0
                this.weekList.forEach(item => {
                    if (item.sign) {
                        if (this.weekTime.length == 0) {
                            this.weekTime = this.weekTime + item.content
                        } else {
                            this.weekTime = this.weekTime + '、' + item.content
                        }
                        num = num + this.week[item.id - 1]
                        this.count = this.count + 1
                    }
                })
                this.couponNum = 0
                this.couponId = ''
                this.frequency = num
                this.calculation()
            },
            tabwTime(id, price, item) {
                this.timeId = id
                this.price = price
                this.timeInfo = item.beginTime + '-' + item.endTime
                this.couponNum = ''
                this.calculation()
            },
            trigger(e) {
                this.showElastic = !this.showElastic

                // if(this.showElastic==true || this.couponFlag==true){
                // 	this.flag=true
                // }
                let that = this
                // uni.getSystemInfo({
                //     success: function (res) {
                //         console.log(res.windowHeight);
                //         that.phoneHeight=(res.windowHeight-that.bottomHeight-10)+'px'

                //     }
                // });
                if (e == true) {
                    // this.setFocus=true
                    setTimeout(() => {
                        // that.top=99999
                        that.setFocus = true

                        that.$refs.inputVal.focus()
                    }, 400)
                    var container = this.$el.querySelector("#elastic-bottom");
                    container.scrollTop = container.scrollHeight;

                }
            },
            triggerTime() {

                this.collageTime = !this.collageTime
            },
            timeclose() {
                this.collageTime = !this.collageTime
            },
            close() {
                this.showElastic = !this.showElastic
                this.phoneHeight = ''
                this.setFocus = false
            },
            tabReturn() {
                // this.$router.goBack()
                this.$router.go(-1)
                // uni.navigateBack({})
            },
            goPay() {
                // 			if (this.count != this.countId) {

                // 				this.$toast({
                // 					message: '还有时间未选择',
                // 					duration: 1500
                // 				})
                // 				return
                // 			}
                if (this.area < 240) {
                    // this.toast.fail('面积不小于50平')
                    this.$toast({
                        message: '面积不小于240平',
                        duration: 1500
                    })
                    return
                }

                if (this.area.toString().includes('.')) {
                    // this.toast.fail('面积有小数点')
                    this.$toast({
                        message: '面积有小数点',
                        duration: 1500
                    })
                    return
                }
                if (this.area == 240) {
                    this.modelFlag = true
                    return
                }
                let infoJson = {
                    name: this.info.name,
                    totalPrice: this.totalPrice,
                    frequency: this.frequency,
                    timeInfo: this.timeInfo,
                    weekTime: this.weekTime,
                    area: this.area,
                    date: '',
                    couponNum: this.couponNum,
                    price: this.price,
                    weekCount: this.weekCount ? this.weekCount : 1,
                    deepContent: this.deepContent,
                    deepNum: this.deepNum,
                    dailyNum: this.dailyNum,
                    dailyPrice: this.dailyPrice,
                    depthPrice: this.depthPrice,
                    nowDate: this.nowDate,
                    id: this.id,
                    buyId: this.customizedId,
                    timePriceId: this.timeId,
                    couponId: this.couponId,
                    orderMoney: Number(this.totalPrice) + this.couponNum,
                    areaRadixt: this.areaRadixt,
                    frequencyRadixt: this.frequencyRadixt,
                    materUrl: this.info.materPicUrl,
                    customizedInfo: this.customizedInfo,
                    selectTime: this.selectTime,
                    deepCountId: this.deepCountId,
                    countId: this.countId,
                    productId: this.info.id,
                    typeId: 2,
                    exclusive: true,
                    overstepRadixt: this.overstepRadixt
                }
                // this.modelFlag = false

                //判断是否为微信浏览器

                if (window.localStorage.getItem('wxBrowser') && (window.localStorage.getItem('token') == 'null')) {
                    window.localStorage.setItem('evaluation', JSON.stringify(infoJson))
                    window.localStorage.setItem('url', 'exclusive')
                }

                axios.post('/office/t-office-order-period/getWeAmount', {}).then(res => {
                    if (res.meta.success) {

                        this.$router.push({
                            name: 'submission',
                            params: infoJson
                        })
                        window.localStorage.removeItem('url')
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
                // if (this.count != this.countId) {
                // 	console.log(this.count)
                // 	console.log(this.countId)
                // 	this.$toast({
                // 		message: '还有时间未选择',
                // 		duration: 1500
                // 	})
                // 	return
                // }
                if (this.area < 240) {
                    // this.toast.fail('面积不小于50平')
                    this.$toast({
                        message: '面积不小于240平',
                        duration: 1500
                    })
                    return
                }

                if (this.area.toString().includes('.')) {
                    this.$toast({
                        message: '面积有小数点',
                        duration: 1500
                    })
                    return
                }
                console.log(this.totalPrice)
                let infoJson = {
                    name: this.info.name,
                    totalPrice: this.totalPrice,
                    frequency: this.frequency,
                    timeInfo: this.timeInfo,
                    weekTime: this.weekTime,
                    area: this.area,
                    date: '',
                    couponNum: this.couponNum,
                    price: this.price,
                    weekCount: this.weekCount ? this.weekCount : 1,
                    deepContent: this.deepContent,
                    deepNum: this.deepNum,
                    dailyNum: this.dailyNum,
                    dailyPrice: this.dailyPrice,
                    depthPrice: this.depthPrice,
                    nowDate: this.nowDate,
                    id: this.id,
                    buyId: this.customizedId,
                    timePriceId: this.timeId,
                    couponId: this.couponId,
                    orderMoney: Number(this.totalPrice) + this.couponNum,
                    areaRadixt: this.areaRadixt,
                    frequencyRadixt: this.frequencyRadixt,
                    materUrl: this.info.materPicUrl,
                    customizedInfo: this.customizedInfo,
                    selectTime: this.selectTime,
                    deepCountId: this.deepCountId,
                    countId: this.countId,
                    customizedId: this.customizedId,
                    productId: this.info.id,
                    typeId: 2,
                    exclusive: true,
                    overstepRadixt: this.overstepRadixt
                }
                this.modelFlag = false
                //判断是否为微信浏览器

                if (window.localStorage.getItem('wxBrowser') && (window.localStorage.getItem('token') == 'null')) {
                    window.localStorage.setItem('evaluation', JSON.stringify(infoJson))
                    window.localStorage.setItem('url', 'exclusive')
                }
                axios.post('/office/t-office-order-period/getWeAmount', {}).then(res => {
                    if (res.meta.success) {
                        this.$router.push({
                            name: 'submission',
                            params: infoJson
                        })
                        window.localStorage.removeItem('url')
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
                    this.$nextTick(function() {
                        //DOM 更新了

                        console.log(this.$refs.box.scrollHeight)
                        this.$refs.box.scrollTop(0, 60000);

                    })

                    // uni.pageScrollTo({
                    //     scrollTop: 99999999999
                    // })
                } else {

                    this.trigger(true)

                }


            },
            getInfo() {
                this.isLoade = true
                let that = this
                let params = new FormData()
                params.append("id", '123456789')
                axios.post('/product/t-product-office/getProductOfficeVersion2', params).then(res => {
                    console.log(res)
                    if (res.meta.success) {
                        // var pic = res.data.picUrl.split(';')
                        // pic.forEach(item => {
                        // 	if (item.length != 0) {
                        // 		this.picList.push(this.configUrl + item)
                        // 	}

                        // })
                        var product = res.data.productItem.split(';')
                        product.forEach(item => {
                            if (item.length != 0) {
                                this.productList.push(this.configUrl + item)
                            }
                        })

                        that.isLoade = false
                        this.info = res.data
                        this.info['materPicUrl'] = this.configUrl + res.data.materPicUrl
                        this.timeId = res.data.tProductTimePrices[0].id

                        this.timeInfo = res.data.tProductTimePrices[0].beginTime + '-' + res.data.tProductTimePrices[
                            0].endTime
                        // this.toast.success('验证码已发送')
                        this.price = res.data.tProductTimePrices[0].price
                        this.discount = res.data.discount
                        this.flatPriceList = res.data.tProductFlatPrice
                        this.frequencyList = res.data.tProductFrequencyPrice
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


                        if (this.$route.params.countId) {
                            let info = this.$route.params
                            console.log(info)
                            this.area = info.area
                            this.countId = info.countId
                            this.deepCountId = info.deepCountId
                            this.deepContent = info.deepContent
                            this.weekCount = info.weekCount
                            this.deepNum = info.deepNum
                            this.dailyNum = info.dailyNum
                            this.customizedId = info.customizedId
                            this.customizedMeal = info.customizedMeal
                            this.customizedInfo = info.customizedInfo
                            this.selectTime = info.selectTime
                        } else {
                            this.weekCount = 3
                            this.countId = 3
                            this.dailyNum = this.countId * 4 - 2
                            this.deepNum = 2
                        }



                        this.dailyPrice = Number(res.data.dailyPrice)
                        this.depthPrice = Number(res.data.depthPrice)
                        this.frequencyRadixt = this.frequencyList[0].radix

                        // 微信浏览器
                        if (window.localStorage.getItem('wxBrowser') && (window.localStorage.getItem(
                                'evaluation') != null) && (window.localStorage
                                .getItem('token') != null)) {
                            this.wxEvaluation()
                        }

                        this.tFlatPrice()
                        this.calculation()
                        // this.getCoupon()

                    } else {
                        this.isLoade = false
                        // this.toast.fail('获取数据失败')
                        this.$toast({
                            message: '获取数据失败',
                            duration: 1500
                        })

                    }
                    // uni.stopPullDownRefresh();
                })
            },
            calculation() {
                // this.deepNum
                // this.dailyNum
                let overstepArea = this.area - 240
                this.overstepRadixt = this.areaParameter[this.countId - 1]['areaFix']
                let price1 = (((240 * this.dailyPrice + 0.00001).toFixed(2) * this.areaRadixt + 0.00001).toFixed(2) *
                    this.dailyNum +
                    0.00001).toFixed(2)
                let price2 = (((240 * this.depthPrice + 0.00001).toFixed(2) * this.areaRadixt + 0.00001).toFixed(2) *
                    this.deepNum +
                    0.00001).toFixed(2)
                let price3 = ((overstepArea * this.overstepRadixt + 0.00001).toFixed(3) * (this.dailyNum + this.deepNum +
                        0.00001))
                    .toFixed(3)
                // console.log(price3)
                // if (this.customizedId == 3) { //双11 9折活动
                //     this.totalPrice = (((Number(price1) + Number(price2) + Number(price3) + 0.0001).toFixed(2)) * 0.9 +
                //         0.00001).toFixed(2)
                // } else {
                    // this.totalPrice = (Number(price1) + Number(price2) + Number(price3) + 0.0001).toFixed(2)
                // }
                this.totalPrice = (Number(price1) + Number(price2) + Number(price3) + 0.0001).toFixed(2)
                
                // this.everyCount = (((this.price * this.area).toFixed(2) * this.areaRadixt).toFixed(2) * this.frequencyRadixt).toFixed(
                // 	2)
                this.totalMoney = this.totalPrice
                this.discountPrice = (this.totalPrice / this.discount).toFixed(0)

                if (this.signNum != 0) {
                    // this.selectCoupon()
                }
                this.signNum = this.signNum + 1

                console.log(this.totalPrice)
                console.log(this.everyCount)
            },
            getCoupon() {
                let params = new FormData()
                params.append('productType', 2)
                params.append('buyType', this.id)
                axios.post('/business/t-business-coupon/getEnableCoupons', params).then(res => {
                    this.couponList = res.data
                })
            },
            couponClose() {
                this.couponFlag = !this.couponFlag
                let that = this
                this.phoneHeight = ''
            },
            obtainCoupon() {
                this.couponFlag = !this.couponFlag
                let that = this
                // uni.getSystemInfo({
                //     success: function (res) {
                //         console.log(res.windowHeight);
                //         that.phoneHeight=(res.windowHeight-that.bottomHeight-10)+'px'

                //     }
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
                let that = this
                this.phoneHeight = ''
            },
            selectDate() {
                this.showSelecteDate = !this.showSelecteDate
                // uni.navigateTo({
                // 	url: '/pages/component/date'
                // })
            },
            nowTime() {
                var myDate = new Date();
                myDate.setDate(myDate.getDate() + 2); //获取AddDayCount天后的日期  
                var y = myDate.getFullYear();
                var m = (myDate.getMonth() + 1) < 10 ? "0" + (myDate.getMonth() + 1) : (myDate.getMonth() + 1); //获取当前月份的日期，不足10补0  
                var d = myDate.getDate() < 10 ? "0" + myDate.getDate() : myDate.getDate(); //获取当前几号，不足10补0  
                this.nowDate = y + "-" + m + "-" + d;
                this.getweek(this.nowDate)
                console.log(this.nowDate)
            },
            getweek(e) {
                var weekDay = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
                var myDate = new Date(Date.parse(e));
                console.log(weekDay[myDate.getDay()])
                this.weekName = weekDay[myDate.getDay()]
            },
            toDate(DateStr) {
                var converted = Date.parse(DateStr);
                var myDate = new Date(converted);
                if (isNaN(myDate)) {
                    var arys = DateStr.split('-');
                    myDate = new Date(arys[0], arys[1] - 1, arys[2]); //人类的习惯 month就是几月
                }
                return myDate;
            },
            getCountOfWeekX(startDate, endDate, weekX) {
                var result = 0;
                var start = startDate.getTime() - 24 * 60 * 60 * 1000;
                var end = endDate.getTime()
                console.log(start)
                for (var i = start; i <= end; i += 86400000) {
                    if (new Date(i).getDay() == weekX) {
                        result++;
                    }
                }
                return result;
            },
            getWeekNum() {
                let nowDate = this.nowDate.split('-')
                console.log(this.endDate)
                for (var i = 0; i < 7; i++) {
                    this.week.push(this.getCountOfWeekX(this.toDate(this.nowDate), this.toDate(this.endDate), i))
                }

                console.log(this.week)
                let weeks = this.weekTime.split('、')
                let num = 0
                weeks.forEach(item => {
                    if (item == '周一') {
                        num += Number(this.week[0])
                    } else if (item == '周二') {
                        num += Number(this.week[1])
                    } else if (item == '周三') {
                        num += Number(this.week[2])
                    } else if (item == '周四') {
                        num += Number(this.week[3])
                    } else if (item == '周五') {
                        num += Number(this.week[4])
                    } else if (item == '周六') {
                        num += Number(this.week[5])
                    } else if (item == '周日') {
                        num += Number(this.week[6])
                    }

                })

                this.frequency = num
                // this.calculation()
            },
            getEndDate() {
                var date = this.nowDate.split('-')
                console.log(date[1])
                if (this.id != 4) {
                    if (this.id == 2) {
                        if (Number(date[1]) + 1 >= 12) {
                            date[0] = (Number(date[0]) + 1).toString()
                            date[1] = (Number(date[1]) + 1 - 12).toString()
                            date[2] = (Number(date[2]) - 1).toString()
                            this.endDate = date[0] + '-' + date[1] + '-' + date[2]
                            console.log(this.endDate)
                            this.getWeekNum()
                        } else {
                            date[0] = (Number(date[0])).toString()
                            date[1] = (Number(date[1]) + 1).toString()
                            date[2] = (Number(date[2]) - 1).toString()

                            this.endDate = date[0] + '-' + date[1] + '-' + date[2]
                            console.log(this.endDate)
                            this.getWeekNum()
                        }
                    } else if (this.id == 3) {
                        if (Number(date[1]) + 3 >= 12) {
                            date[0] = (Number(date[0]) + 1).toString()
                            date[1] = (Number(date[1]) + 3 - 12).toString()
                            date[2] = (Number(date[2]) - 1).toString()
                            this.endDate = date[0] + '-' + date[1] + '-' + date[2]
                            console.log(this.endDate)
                            this.getWeekNum()
                        } else {
                            date[0] = (Number(date[0])).toString()
                            date[1] = (Number(date[1]) + 3).toString()
                            date[2] = (Number(date[2]) - 1).toString()
                            this.endDate = date[0] + '-' + date[1] + '-' + date[2]
                            console.log(this.endDate)
                            this.getWeekNum()
                        }
                    }

                } else {
                    date[0] = (Number(date[0]) + 1).toString()
                    date[2] = (Number(date[2]) - 1).toString()
                    this.endDate = date[0] + '-' + date[1] + '-' + date[2]
                    console.log(this.endDate)
                    this.getWeekNum()
                }
            },
            tFlatPrice() {
                for (var i = 0; i < this.flatPriceList.length; i++) {
                    if (240 >= this.flatPriceList[i].flat) {
                        this.areaRadixt = this.flatPriceList[i].radix

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
                        console.log(this.banner[1])
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
                console.log(this.couponNum)
                this.totalPrice = (this.totalPrice - this.couponNum).toFixed(2)
            },
            toMeal(e) {
                // uni.navigateTo({
                // 	url: e
                // })
            },
            toShare() {
                let that = this
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
                // let params = new FormData()

                // params.append('url', encodeURIComponent(window.location.href))
                // axios.post('/sys/t-sys-app-user/getSignature', params).then(res => {
                // 	if (res.meta.success) {
                // 		console.log(res)
                // 		wx.config({
                // 			// beta: true,
                // 			debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                // 			appId: res.data.appId, // 必填，公众号的唯一标识
                // 			timestamp: res.data.timestamp, // 必填，生成签名的时间戳
                // 			nonceStr: res.data.nonceStr, // 必填，生成签名的随机串
                // 			signature: res.data.signature, // 必填，签名
                // 			jsApiList: ['onMenuShareAppMessage', 'onMenuShareTimeline',
                // 				'onMenuShareQQ', 'onMenuShareQZone'
                // 			] // 必填，需要使用的JS接口列表
                // 		})

                // 		wx.ready(function() {
                // 			// 分享好友 
                // 			console.log(55555)
                // 			wx.onMenuShareAppMessage({
                // 				title: that.shareInfo.title, // 分享标题           
                // 				desc: that.shareInfo.subTitle, // 分享描述            
                // 				link: that.shareInfo.linkHtml, // 分享链接            
                // 				imgUrl: that.configUrl + that.shareInfo.picUrl, // 分享图标            
                // 				type: "", // 分享类型,music、video或link，不填默认为link            
                // 				dataUrl: "", // 如果type是music或video，则要提供数据链接，默认为空            
                // 				success: function() {},
                // 				cancel: function() { // 用户取消分享后执行的回调函数     
                // 					console.log(5888)
                // 				},
                // 			});

                // 		})


                // 	}
                // })
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
                let that = this
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
                this.info.name = data.name
                this.totalPrice = data.totalPrice
                this.frequency = data.frequency
                this.timeInfo = data.timeInfo
                this.weekTime = data.weekTime
                this.area = data.area
                this.date = ''
                this.couponNum = data.couponNum
                this.price = data.price
                this.weekCount = data.weekCount
                this.deepContent = data.deepContent
                this.deepNum = data.deepNum
                this.dailyNum = data.dailyNum
                this.dailyPrice = data.dailyPrice
                this.depthPrice = data.depthPrice
                this.nowDate = data.nowDate
                this.id = this.id,
                    this.customizedId = data.buyId
                this.timeId = data.timePriceId
                this.couponId = data.couponId
                this.orderMoney = data.orderMoney
                this.areaRadixt = data.areaRadixt
                this.frequencyRadixt = data.frequencyRadixt
                this.info.materPicUrl = data.materUrl
                this.customizedInfo = data.customizedInfo
                this.selectTime = data.selectTime
                this.deepCountId = data.deepCountId
                this.countId = data.countId
                this.info.id = data.productId
                this.typeId = 2
                this.exclusive = true
                this.overstepRadixt = data.overstepRadixt

                window.localStorage.removeItem('evaluation')
            }
        },
        mounted() {


            // var that = this;
            // that.$nextTick(function() {
            // 	var mySwiper = new Swiper(".swiper-container", {
            // 		direction: "horizontal",
            // 		/*横向滑动*/
            // 		loop: true,
            // 		slidesPerView: 3,
            // 		pagination: ".swiper-pagination",
            // 		/*分页器*/
            // 		autoplay: 3000 /*每隔3秒自动播放*/
            // 	});
            // })
        },
        destroyed() {
            document.body.style.overflow = 'auto'
        },
        created() {
            //判断是否为微信浏览器
            if (window.localStorage.getItem('wxBrowser')) {
                this.showDistance = true
                this.showWx = true
            }
            this.city = window.localStorage.getItem('city')
            this.nowTime()
            this.id = 2

            this.getEndDate()
            this.frequency = this.week[0]
            console.log(this.week[0])
            let that = this
            this.getInfo()
            this.getfindAdvertList()

            this.getShare()
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
                    // console.log(newval)
                    this.showElastic = newval
                    if (this.showElastic) {
                        document.body.style.overflow = 'hidden' //避免弹框滚动触发底层页面滚动
                    } else {
                        document.body.style.overflow = 'auto'
                    }
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
                this.getweek(this.nowDate)
                this.week = []
                this.getEndDate()
                console.log(this.nowDate)
            },
            totalPrice: {
                handler(newval, oldval) {
                    this.totalPrice = newval

                }

            },
            customizedId(newval, oldval) {
                // 重新计算日常次数
                if (this.customizedId == 2) {
                    this.dailyNum = this.countId * 4
                } else if (this.customizedId == 3) {
                    console.log(this.countId)
                    this.dailyNum = this.countId * 12
                    console.log(this.dailyNum)
                } else if (this.customizedId == 4) {
                    this.dailyNum = this.countId * 52
                }


                // 重新计算深度次数
                // if(this.deepCountId==1){
                // 	 this.calculateDeep(4)  		 
                // }else if(this.deepCountId==2){
                // 	 this.calculateDeep(8)  
                // }else if(this.deepCountId==3){
                // 		 this.calculateDeep(2)  
                // }else if(this.deepCountId==4){
                // 		 this.calculateDeep(1)  
                // }

                if (this.deepCountId == 1) {
                    this.calculateDeep(12)

                } else if (this.deepCountId == 2) {
                    this.calculateDeep(8)
                } else if (this.deepCountId == 3) {
                    this.calculateDeep(4)
                } else if (this.deepCountId == 4) {
                    this.calculateDeep(2)
                } else if (this.deepCountId == 5) {
                    this.calculateDeep(1)
                } else if (this.deepCountId == 0) {
                    this.calculateDeep(0)
                }

                // if(this.deepCountId==1){
                // 	 this.calculateDeep(4)  		 
                // }else if(this.deepCountId==2){
                // 	 this.calculateDeep(8)  
                // }else if(this.deepCountId==3){
                // 		 this.calculateDeep(12)  
                // }else if(this.deepCountId==4){
                // 		 this.calculateDeep(2)  
                // }else if(this.deepCountId==5){
                // 	    this.calculateDeep(1)
                // }else if(this.deepCountId==0){
                // 	this.calculateDeep(0)  
                // }

            }
        }
    }
</script>
<style>

</style>
<style scoped>
    /* @import '../assets/css/swiper.min.css'; */


    .container {
        /* pointer-events: none; */
        width: 100vw;
        height: 100%;
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
        z-index: 1;
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
        /* float: left; */
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

    .dots {
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0.2rem;
        display: flex;
        justify-content: center;
    }

    .dots .dot {
        margin: 0 0.08rem;
        width: 0.14rem;
        height: 0.14rem;
        /* background: #fff; */
        border: 1px solid #fff;
        background: rgba(0, 0, 0, 0.1);
        border-radius: 0.08rem;
        transition: all .6s;
    }

    .dots .dot.active {
        width: 0.14rem;
        background: #fff !important;
    }

    .content {
        width: 100%;
        /* padding: 0 28upx; */
        /* box-sizing: border-box; */
        background: #fff;
        display: -webkit-box;
        display: -webkit-flex;
        display: flex;
        -webkit-box-orient: vertical;
        -webkit-box-direction: normal;
        -webkit-flex-direction: column;
        flex-direction: column;
        padding-bottom: 20upx;

    }

    .content-title {
        font-size: 0.3rem;
        width: 100%;
        padding: 0.3rem 0.28rem 0 0.28rem;
        font-weight: 550;
    }

    .content-title span {
        /* font-size: 0.31rem; */
        margin-left: 0.03rem;
        color: #ff0000;
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
        font-size: 0.20rem;
        text-decoration: line-through;
    }

    .content .content-head {

        display: flex;
        display: -webkit-box;
        display: -webkit-flex;
        padding: 0.27rem 0.28rem 0.10rem 0.28rem;
        box-sizing: content-box;
        font-size: 0.3rem;

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

    .content-head .head-rights>div {
        line-height: 0.3rem;
    }

    .content-head .head-rights img {
        display: inline-block;
        height: 0.28rem;
        width: 0.18rem;
        margin-left: 0.12rem;
    }

    .content-info {
        padding: 0 28upx;
        display: flex;
        display: -webkit-box;
        display: -webkit-flex;

        /* border-bottom: 1px solid #dadada; */
    }

    .content-info.timeSelect {
        border-top: 10px solid #f8f8fa;
    }

    .content-info .info-first {
        margin-right: 0.22rem;
        padding-left: 0.28rem;
        padding-top: 0.2rem;
        color: #999;
        width: 1.8rem;
        font-size: 0.3rem;
    }

    .content-info .info-second {

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

        font-size: 0.3rem;
        padding: 0.2rem 0.28rem 0.2rem 0;
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

    .info-second .info-info .deepCount {
        margin-left: 0.88rem;
    }

    .content .content-date {
        height: 0.76rem;
        line-height: 0.76rem;
        padding: 0 0.28rem;
    }

    .content-date div {
        font-size: 0.3rem;
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
        margin: 0.3rem auto 0.2rem auto;
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
        bottom: 0.2rem;
        display: -webkit-box;
        display: -webkit-flex;
        display: flex;

        justify-content: center;
        -webkit-box-pack: center;
        -webkit-justify-content: center;
    }

    /* .content-img .dots .dot {
		margin: 0 0.08rem;
		width: 0.14rem;
		height:0.14rem;
		border: 1px solid #fff;
		background: rgba(0, 0, 0, 0.1);
		border-radius: 0.08rem;
		transition: all .6s;
	}

	.content-img .dots .dot.active {
		width: 0.14rem;
		background: #fff !important;
	} */

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

        justify-content: center;
        -webkit-box-pack: center;
        -webkit-justify-content: center;
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
        font-size: 0.34rem;
    }

    .bottom-info {
        width: 100%;
        background: #ff3a31;
        height: 0.98rem;
        text-align: center;
        color: #fff;
        font-size: 0.32rem;
        line-height: 0.98rem;
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
        border-top-left-radius: 0.3rem;
        border-top-right-radius: 0.3rem;
        z-index: 2;
        overflow: hidden;
        overflow-x: hidden;
        overflow-y: auto;
        -webkit-transition: all 0.5s;
        transition: all 0.5s;

    }

    .elastic.showHeight {
        /* height: 10rem; */
        /* height: 65%; */
        height: 68vh;
        overflow: hidden;

    }

    .elastic-head {
        margin: 0.50rem 0.2rem 0rem 0.3rem;
        position: relative;
        height: 2rem;
    }

    .scroll-height {
        height: 73%;
    }

    .elastic-bottom {
        height: 100%;
        padding-bottom: 1.7rem;
        overflow: hidden;
        overflow-y: scroll;
    }

    .elastic-head .elastic-head-first {

        display: flex;
        display: -webkit-box;
        display: -webkit-flex;
        /* 	-webkit-box-pack: center;
		-webkit-justify-content: center;
		justify-content: center; */
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

    .elastic-head .elastic-head-first .elastic-head-num {

        transform: translateY(-110%);
        -webkit-transform: translateY(-110%);
    }

    .elastic-head-first .new-money {
        color: #e01212;
        font-size: 0.3rem;
        margin: 0 0.20upx 0 -0.02rem;
    }

    .elastic-head-first .old-money {
        color: #999;
        font-size: 0.3rem;
        text-decoration: line-through;
        margin-right: 0.20rem;
    }

    .elastic-head-first .num {
        color: #999;
        font-size: 0.3rem;
    }

    .elastic-head .elastic-head-first img {
        display: block;
        height: 1.30rem;
        width: 1.30rem;
        margin-right: 0.30rem;
    }

    img.elastic-head-second {
        display: block;
        /* 	height: 40upx;
		width: 44upx; */
        width: 0.70rem;
        height: 0.70rem;
        position: absolute;
        top: -0.2rem;
        right: 0;
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
        overflow-y: scroll;
        -webkit-transition: all 0.5s;
        transition: all 1s;
        padding-top: 0px;
        box-sizing: border-box;
    }

    .time-info.showTime-info {
        height: 6.67rem;
        padding-top: 0.76rem;
        box-sizing: border-box;
    }

    .whySelect {
        width: 2rem !important;
        display: block;
        /* 	height: 40upx;
	   width: 44upx; */
        width: 0.70rem;
        height: 0.70rem;
        position: absolute;
        top: 1.4rem;
        right: 0;
        font-size: 0.28rem;
        color: #e01212;
    }

    .elastic-select .select-title {
        font-size: 0.30rem;
        margin: 0 0 0.30rem 0.30rem;
    }

    .elastic-select .select-title span {
        color: #E01212;
    }

    .elastic-select .select-count {
        margin-left: 0.20rem;
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
        margin: 0 0.28rem 0.20rem 0;
        font-size: 0.29rem;
    }

    .elastic-select .select-count .customized {
        height: 0.64rem;
        /* width: 1.34rem; */
        background: #f5f5f5;
        padding: 0 0.1rem;
        line-height: 0.64rem;
        text-align: center;
        border-radius: 0.15rem;
        margin: 0 0.28rem 0.20rem 0;
        font-size: 0.29rem;
        position: relative;
    }

    .elastic-select .select-count .customized .showTips {
        font-size: 0.13rem;
        width: 1.5rem;
        height: 0.4rem;
        position: absolute;
        top: -0.2rem;
        left: 0.4rem;
        background: #f5f5f5;
        line-height: 0.4rem;
        text-align: center;
        border-radius: 0.1rem;
        transform: scale(0.8);
        -webkit-transform: scale(0.8);
         color: #ff3a30;
    }

    .elastic-select .select-count .customized:nth-child(2) .showTips {
        left: 0.7rem;
    }

    .elastic-select .select-count .customized.countColor .showTips {
        color: #ff3a30;
        background: #f8ecec;
    }

    .elastic .elastic-select.showTop {
        margin-top: 0.52rem;
    }

    .elastic .elastic-select.showTop:last-child {
        padding-bottom: 3.5rem;
    }

    .elastic .elastic-select .area {
        border: 1px solid #1B1B1B;
        width: 1.35rem;
        margin: 0 0.2rem 0 0.3rem;
        height: 0.65rem;
        border-radius: 0.1rem;
        font-size: 0.3rem;
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

    .elastic .elastic-select .space .space-tit {
        margin-left: 0.10rem;
    }

    .elastic .elastic-select .count-info.countColor {
        background: #f8ecec;
        color: #ff3a30;
    }

    .elastic-select .select-count .customized.countColor {
        background: #f8ecec;
        color: #ff3a30;
    }

    .time-info .elastic-select {
        position: relative;
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
        justify-content: center;
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

    .coupon-info {
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
        overflow-y: scroll;
        -webkit-transition: all 0.5s;
        transition: all 1s;
        padding-top: 0px;
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
        margin: 0 auto 0.2rem auto;

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
        height: 0.7rem
    }

    .goodImgs {
        width: 6.94rem;
        padding-bottom: 1rem;
        height: auto;
        margin: 0 auto;
    }

    .goodImgs img {
        width: 100%;
        /* height: 100%; */
        margin-top: 0.2rem
    }

    .goodImgs img:first-child {
        margin-top: 0;
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

    .banner-meal.swiper-pagination-fraction,
    .banner-meal.swiper-pagination-custom,
    .banner-meal.swiper-container-horizontal>.swiper-pagination2.swiper-pagination-bullets {
        /* 		position: absolute;
		bottom: 1.1rem !important;
		z-index: 10; */
    }

    .banner-meal .swiper-pagination-bullet {
        border: 1px solid #fff !important;
        background: rgba(0, 0, 0, 0.5) !important;
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

    .small-list .swiper-container .swiper-wrapper {
        display: flex;
        display: -webkit-flex;
    }

    .small-list .swiper-slide {
        height: 1.48rem !important;
        display: flex;
        display: -webkit-box;
        display: -webkit-flex;
        align-items: center;
        -webkit-box-align: center;
        -webkit-align-items: center;
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
