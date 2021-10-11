<template>

    <div :class='showPage!== "basic"?"hideDisplay":"showTop"'>
        <serviceAgreement @toCollage='collageAgreement' :flag='"首页"' v-if='showAreement'></serviceAgreement>
        <privacyPolicy @toCollagePricacy='collagePricacy' :flag='"首页"' v-if='showPricacy'></privacyPolicy>
        <!-- 	<div class='head'>
			<div class='head-first'>
				<div class='head-left'>
					<img src="../assets/address-3.png"></img>
					<span>厦门</span>
				</div>
				<div class='head-center'>

				</div>
				<div class='head-right' @click="toCustomer">
					<img src='../assets/phone-1.png'></img>
				</div>
			</div>
			<div class='head-three'>

			</div>
			<div class='head-second'>

			</div>
		</div> -->
        <div class='content'>
            <div class='top-left' :class='showDistance?"showTop":""' @click='toCityList'>
                <img src="../assets/address-7.png" alt="">
                <span>厦门</span>
            </div>
            <div class='top-right' :class='showDistance?"showTop":""' @click="toCustomer('其他咨询')">
                <img src="../assets/news.png" alt="">
            </div>
            <!-- v-if='showPage== "basic"' -->
            <div class='banner-home'>
                <div class='swiper'>
                    <!-- <div v-if='graph.length>0'> -->
                    <!-- <van-swipe :autoplay="2000" :loop="true" indicator-color="#fff"  v-if='showSwiper' >
						<van-swipe-item v-for="(item, index) in graph" :key="index">
							<img :src="item.url">
						</van-swipe-item>
					</van-swipe> -->



                    <swiper ref="mySwiper" :options="homeSwiperOption" class="swiper-container" v-if=' graph.length>0'
                        @change='swiperChange'>
                        <swiper-slide v-for='(item,index) in  graph' :key='index'>

                            <img class="swiper-item " :src='item.url'></img>
                        </swiper-slide>
                        <!-- 常见的小圆点 -->
                        <div class="swiper-pagination" v-for="(item,index) in graph" :key="index" slot="pagination"></div>
                    </swiper>
                    <!-- </div> -->
                    <!-- <div class="dots">
						<div v-for="(imgUrls,index ) in  graph" :key="index">
							<div class="dot" :class="[index ==  signIndex ? ' active' : '']"></div>
						</div>
					</div> -->
                </div>
            </div>
			<index-slice />
            <!-- 		<div class='classification'>
				<div class='classification-info' @click="toClean(10)">
					<img class='info-img' src="../assets/air-clean.png" alt="">
					<div class='clean-tit'>
						空调清洗
					</div>
				</div>
				<div class='classification-info' @click="toClean(4)">
					<img class='info-img' src="../assets/sunblind-clean.png" alt="">
					<img class='info-tips' src="../assets/tips-1.png" alt="">
					<div class='clean-tit'>
						窗帘清洗
					</div>
				</div>
				<div class='classification-info' @click="toClean(8)">
					<img class='info-img' src="../assets/mattress-cleaning.png" alt="">
					<div class='clean-tit'>
						床垫清洗
					</div>
				</div>
				<div class='classification-info'>
					<img class='info-img' src="../assets/crystal-clean.png" alt="" @click="toCustomer">
					<div class='clean-tit'>
						水晶灯清洗
					</div>
				</div>
				<div class='classification-info'>
					<img class='info-img' src="../assets/stoneMaterial.png" alt="" @click="toCustomer">
					<div class='clean-tit'>
						石材清洗
					</div>
				</div>
			</div> -->
<!--            <div class='office-classification'>
                <div class='classification-left' @click="dot(2)">
                    <div class='left-a'>办公室清洁定制</div>
                    <div class='left-b'>M+n方案</div> -->
                    <!-- <div class='left-c'>深度+日常方案</div> -->
                    <!-- <div class='left-d'><img src="../assets/active11.png" alt=""></div> -->
<!--                    <div class='left-btn'>
                        立即定制
                    </div>
                </div>
                <div class='classification-right'>
                    <div class='classification-top' @click="dot(1)"> -->
                        <!-- <img src="../assets/fastest.png" alt=""> -->
<!--                        <div class='right-a'>
                            办公室单次保洁
                        </div>
                        <div class='right-b'>精细保洁，随时预约</div>
                        <div class='right-btn'>
                            立即预约
                        </div>
                    </div>
                    <div class='classification-bottom' @click="dot(3)">
                        <div class='right-a'>
                            办公室/家庭地毯清洗
                        </div>
                        <div class='right-c'>定期清洁，健康常相伴</div>
                        <div class='right-btn-a'>
                            立即预约
                        </div>
                    </div>
                </div>
            </div>
            <div class='new-people' @click='toExclusive'>
                <div class='new-left'>
                    <div class='new-title exclusive'>
                        大面积<span>优享专区(240㎡起)</span>
                    </div>
                    <div class='new-content'>
                        <div>办公清洁低至0.096/㎡</div>
                        <img src="../assets/go-2.png" alt="">
                    </div>
                </div>
                <img class='new-img' src="../assets/largeArea.png" alt="">

            </div>
            <div class='new-people' @click='firstOrder()'>
                <div class='new-left'>
                    <div class='new-title'>
                        首次下单<span>享1元体验(100平)</span>
                    </div>
                    <div class='new-content'>
                        <div>同个地址只能体验一次</div>
                        <img src="../assets/go-1.png" alt="">
                    </div>
                </div>
                <img class='new-img' src="../assets/red-envelopes.png" alt="">

            </div>
            <div class='seek' v-if='false'>
                <div class='seek-head'>寻找清洁师</div>
                <div class='seek-list'>
                    <div class='seek-content'>
                        <div class='seek-img'><img src="../assets/office-clean.png" alt=""></div>
                        <div class='seek-tit'>
                            办公室清洁
                        </div>
                    </div>
                    <div class='seek-content'>
                        <div class='seek-img'><img src="../assets/residence.png" alt=""></div>
                        <div class='seek-tit'>
                            办公室清洁
                        </div>
                    </div>
                    <div class='seek-content'>
                        <div class='seek-img'><img src="../assets/restaurant.png" alt=""></div>
                        <div class='seek-tit'>
                            办公室清洁
                        </div>
                    </div>
                    <div class='seek-content'>
                        <div class='seek-img'><img src="../assets/assart.png" alt=""></div>
                        <div class='seek-tit'>
                            办公室清洁
                        </div>
                    </div>
                </div>
            </div>
            <div class='nav' v-if='false'>
            </div> -->

            <!-- 	<div class='office'>
				<div class='total-meadl'>
					<div class='meal-count mr-bottom' @click="dot(1)">
						<div class='meal-tit'>{{meadl1.name}}</div>
						<div class='meal-info'>{{meadl1.shortName}}</div>
						<img src="../assets/go.png" alt="">
					</div>
					<div class='meal-count mr-bottom meal-month' @click="dot(2)">
						<div class='meal-tit'>{{meadl2.name}}</div>
						<div class='meal-info'>{{meadl2.shortName}}</div>
						<img src="../assets/go.png" alt="">
					</div>
					<div class='meal-count meal-quarter' @click="dot(3)">
						<div class='meal-tit'>{{meadl3.name}}</div>
						<div class='meal-info'>{{meadl3.shortName}}</div>
						<img src="../assets/go.png" alt="">
					</div>
					<div class='meal-count meal-year' @click="dot(4)">
						<div class='meal-tit'>{{meadl4.name}}</div>
						<div class='meal-info'>{{meadl4.shortName}}</div>
						<img src="../assets/go.png" alt="">
						<div class='year-tit'>赠品</div>
					</div>
				</div>
			</div> -->
<!--            <div class='content-bottom'>

                <div class='add-clean' @click="addClean" v-if='false'> -->
                    <!-- <img class='clean-img' src='../assets/addClean.png'></img> -->

    <!--                <div class='add-clean-left'>
                        <div class='add-tit'>
                            <span class='tit-1'>加入</span>
                            <span class='tit-2'>清洁人</span>
                        </div>
                        <div class='add-info'>
                            <span>随时赚钱</span>
                            <span>(全职或兼职)</span>
                            <div class='add-info-img'><img src="../assets/go-addclean.png" alt=""></div>
                        </div>
                    </div>
                    <div class='add-clean-right'>
                        <img src="../assets/purse.png" alt="">
                    </div>
                </div> -->

                <!-- <div class='news' v-if='showPage== "basic"'>
					<div v-if="banner.length > 1 ">
						<swiper :options="swiperOptions" ref='conSilder' class="swiper-container" v-if="banner.length > 0">
							<swiper-slide v-if='showPage== "basic"' :data-link='item.linkHtml' v-for="(item,index) in banner" :key="index">
								
								<div class='showDot'>
									<img :src="item.picUrl" alt="" @click="linkTo">
								
								</div>
							</swiper-slide>
						
							<div class="swiper-pagination2" v-if="banner.length > 0 " v-for="(item,index) in banner" :key="index" slot="pagination"></div>
						</swiper>
					</div>
					<div v-if="banner.length ===1">
						<swiper :options="swiperOptionBanner" class="swiper-container">
							<swiper-slide v-for="(item,index) in banner" :key="index">

								<img :src="item.picUrl" alt="" @click="linkTo">
							</swiper-slide>

						</swiper>
					</div>
				</div> -->
                <!-- 	<div class='recevice'>
					<img class='left-img' src="../assets/recevieceCurtains.png" alt="" @click="recevieceCurtains">
					<img class='right-img' src="../assets/receviceCapet.png" @click="receviceCapet" alt="">
				</div> -->
              <!--  <div class='cleaner-info'>
                    <div class='tit'>
                        热门推荐
                    </div>
                    <div class='programme' @click="toCustomized(1)">
                        <img src="../assets/programme-1.png" alt="">
                        <div class='programme-content'>
                            <div>
                                <div class='programme-title'>办公清洁3次/周方案</div>
                                <div class='programme-info'>两周1次深度清洁+2次日常保洁</div>
                            </div>
                            <div class='programme-money'>
                                <div>300元</div>
                                <div class='programme-info'>包月参考价</div>
                            </div>
                        </div>
                    </div>
                    <div class='programme' @click="toCustomized(2)">
                        <img src="../assets/programme-2.png" alt="">
                        <div class='programme-content'>
                            <div>
                                <div class='programme-title'>办公清洁4次/周方案 </div>
                                <div class='programme-info'> 每月2次深度清洁+14次日常保洁</div>
                            </div>
                            <div class='programme-money'>
                                <div>380元</div>
                                <div class='programme-info'>包月参考价</div>
                            </div>
                        </div>
                    </div> -->
                    <!-- <div class='bottom-content'>
						<div class='bottom-first'>
							<img src="../assets/phone-3.png" alt="">
							<div>400-829-0037</div>
						</div>
						<div class='bottom-second'>
							清洁人（厦门）信息科技有限公司
						</div>
					</div> -->
                    <!-- <div class='cleaner-top'>
						<div class='clean-office' @click='toOffice'>
							办公清洁
						</div>
						<div class='clean-left'>
							<div class='clean-hotel' @click='toCarpet'>地毯清洗</div>
							<div class='clean-housework' @click="toCurtain">窗帘清洁</div>
						</div>
					</div>
					<div class='clean-bottom'>
						<div class='residence' @click="toResidence">
							新居清洁
						</div>
						<div class='restaurant'>
							开荒清洁
						</div>
						<div class='assart' @click='toMattress'>
							床垫清洗
						</div>
					</div> -->
                <!-- </div> -->
<!--                <div class='cleaner-info'>
                    <div class='tit'>
                        其他服务
                    </div>
                    <div class='other-service'> -->
                        <!-- toClean(10) -->
<!--                        <div class='service' @click="toCustomer('技术清洁清咨询')">
                            <img class='type' src="../assets/air-cleaning.png" alt="">
                            <div>空调清洗</div>
                        </div> -->
                        <!-- toClean(4) -->
      <!--                  <div class='service  service-position' @click="toCustomer('技术清洁清咨询')">
                            <img class='type' src="../assets/curtains-cleaning.png" alt="">
                            <div>窗帘清洗</div>
                            <img class='sameDay' src='../assets/sameDay.png'>
                        </div> -->
                        <!-- toClean(8) -->
       <!--                 <div class='service' @click="toCustomer('技术清洁清咨询')">
                            <img class='type' src="../assets/mattress-cleaning-1.png" alt="">
                            <div>床垫清洗</div>
                        </div>
                        <div class='service' @click="toCustomer('技术清洁清咨询')">
                            <img class='type' src="../assets/crystal-cleaning.png" alt="">
                            <div>水晶灯清洗</div>
                        </div>
                        <div class='service' @click="toCustomer('技术清洁清咨询')">
                            <img class='type' src="../assets/stone-1.png" alt="">
                            <div>石材养护</div>
                        </div>
                    </div> -->
                    <!-- <div class='cleaner-top'>
						<div class='clean-office' @click='toOffice'>
							办公清洁
						</div>
						<div class='clean-left'>
							<div class='clean-hotel' @click='toCarpet'>地毯清洗</div>
							<div class='clean-housework' @click="toCurtain">窗帘清洁</div>
						</div>
					</div>
					<div class='clean-bottom'>
						<div class='residence' @click="toResidence">
							新居清洁
						</div>
						<div class='restaurant'>
							开荒清洁
						</div>
						<div class='assart' @click='toMattress'>
							床垫清洗
						</div>
					</div> -->
                <!-- </div>
                <div class='clean-info'>
                    <div class='security'>
                        <div class='security-tit'>安全</div>
                        <div class='security-content'>实名上岗</div>
                    </div>
                    <div class='security major'>
                        <div class='security-tit'>专业</div>
                        <div class='security-content'>技能培训</div>
                    </div>
                    <div class='security vocation'>
                        <div class='security-tit'>职业</div>
                        <div class='security-content'>服务人员</div>
                    </div>
                </div>
                <div class='clean-logo'>
                    <div class='logo-tit'>
                        办公清洁——就找清洁人
                    </div>
                    <img class='logo' src="../assets/logo-index.png" alt="">

                </div>
                <div class='bottom-content'>
                    <div class='bottom-first'>
                        <img src="../assets/phone-3.png" alt="">
                        <div>400-829-0037</div>
                    </div>
                    <div class='bottom-second'>
                        清洁人（厦门）信息科技有限公司
                    </div>
                </div> -->
                <!-- <div class='new-sign'><img src="../assets/new-sign.png" alt=""></div> -->
                <!-- <div class='clean-company'>
					清洁人（厦门）信息科技有限公司
				</div> -->
            </div>
            <!-- 	<a target="_blank" href="weixin://">
			    点击我打开微信
			</a> -->




        </div>
        <div class='frame' :style="frame" v-if='showFrame' @click="toExperience(item.linkHtml)">
            <div></div>
            <img class='framed-pic' :src="imgurl" alt="">
        </div>

        <div class='show-shadow' v-if='showFrame' @click="collageFram">

        </div>
        <showMoadel v-if='modelFlag' :cont='msg' @define='confirm' @remove='cancel' :showCancel='msgCancle'></showMoadel>
        <customer v-if='collageCurstomer' @priming='toCustomers' @define='toPhone' :typeInfo='typeMsg'></customer>
        <Load v-if='isLoading'></Load>
        <showMoadel v-if='modelSign' :cont='"请更新版本"' @define='confirms' @remove='cancels'></showMoadel>


        <div class='showTreaty' v-if='collageTreaty'>
            <div class='treaty-title'>
                服务协议和隐私政策
            </div>
            <div class='treaty-content'>
                请你务必审慎阅读，充分理解“服务协议”和“隐私政策”各条款，包括但不限于:为了向你提供即时通讯、内容分享等服务，我们需要收集你的设备信息、操作日志等个人信息。你可以在
                “设置”中查看、变更、删除个人信息并管理你的授权。你可阅读<span @click='collageAgreement'>《服务协议》</span>和<span @click='collagePricacy'>《隐私政策》</span>了解详细信息。如你同意，请点击“同意”开始接受我们的服务
            </div>
            <div class='treaty-btn'>
                <div class='btn-left' @click='signOut'>暂不使用</div>
                <div class='btn-right' @click='agree'>同意</div>
            </div>
        </div>
        <div class='treaty-show' v-if='collageTreaty'>

        </div>
        <!-- <div class="amap-page-container" v-show="false">
			<el-amap vid="amap" :plugin="plugin" class="amap-demo" >
			</el-amap>
		</div> -->
    </div>
</template>

<script>
    import * as axios from '../untils/ajax.js'
	import indexSlice from './IndexSlice.vue'
    import {
        swiper,
        swiperSlide
    } from "vue-awesome-swiper";
    import 'swiper/dist/css/swiper.css'
    import customer from './customerService.vue'
    import getToken from '../untils/getToken.js'
    import serviceAgreement from './serviceAgreement.vue'
    import privacyPolicy from './privacyPolicy.vue'
    import jsonp from 'jsonp'
    import {
        mapGetters
    } from 'vuex'
    import ajax from 'axios'
    export default {
        name: 'app',
        data() {
            var _this = this
            return {
                city: '',
                swiperCurrent: 0,
                showSwiper: false,
                uid: '355757686523321',
                moduleType: '1',
                frame: {
                    height: 0,
                    width: 0,
                    top: 0,
                    left: 0
                },
                imgurl: "",
                banner: [],
                showFrame: false,
                imgIndex: 1,

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
                // swiperOptions: {
                // 	observer: true,
                // 	observeParents: true,
                // 	// 参数选项,显示小点

                // 	//循环
                // 	loop: true,
                // 	observer: true, //修改swiper自己或子元素时，自动初始化swiper
                // 	// observeParents: true,
                // 	pagination: {
                // 		el: '.swiper-pagination2'
                // 	},
                // 	//每张播放时长3秒，自动播放
                // 	autoplay: {
                // 		delay: 3700,
                // 		disableOnInteraction: false
                // 	},
                // 	on: {
                // 		//滑动之后回调函数
                // 		slideChangeTransitionStart: function() {
                // 			/* realIndex为滚动到当前的slide索引值 */
                // 			// console.log(this.realIndex)
                // 			this.signIndex = this.realIndex
                // 			// console.log(this.signIndex)
                // 		},
                // 	},
                // 	preventLinksPropagation: false,   // 阻止点击事件冒泡
                // 	//滑动速度
                // 	speed: 1000,
                // 	// delay:1000

                // },
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
                graph: [{
                        url: require('../assets/banner.jpg')
                    },
                    {
                        url: require('../assets/banner2.jpg')
                    },
                    {
                        url: require('../assets/banner3.jpg')
                    }

                ],
                collageCurstomer: false,
                meadl1: {},
                meadl2: {},
                meadl3: {},
                meadl4: {},
                signIndex: 0,
                modelFlag: false,
                signMsg: false,
                receviceFlag: false,
                reveviceType: null,
                msgCancle: true,
                firstOrderId: '',
                isLoading: false,
                modelSign: false,
                showAreement: false,
                showPricacy: false,
                collageTreaty: false,
                version: '',
                msg: '',
                typeMsg: '其他咨询',
                plugin: [{
                    pName: 'Geolocation',
                    events: {
                        init(o) {
                            // o 是高德地图定位插件实例
                            o.getCurrentPosition((status, result) => {

                                if (result && result.position) {
                                    if (window.localStorage.getItem('city')) {
                                        _this.city = window.localStorage.getItem('city')
                                    } else {
                                        let city = result.addressComponent.city
                                        _this.city = city.slice(0, city.length - 1)
                                    }

                                    // self.lng = result.position.lng;
                                    // self.lat = result.position.lat;
                                    // self.center = [self.lng, self.lat];
                                    // self.loaded = true;
                                    // self.$nextTick();
                                }
                            });
                        }
                    }
                }],
                mapFLag: false,
                showDistance: false
            }

        },
        computed: {
            ...mapGetters(['showCity']),
            swiper() {
                return this.$refs.conSilder.swiper
            },
            swiperOptions() {
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
                        delay: 3700,
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
                            if (this.clickedSlide.dataset) {
                                // console.log(this.clickedSlide.dataset.link)
                                // that.linkTo(this.clickedSlide.dataset.link)
                                that.linkTo()
                            }
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
        components: {
			indexSlice,
            swiper,
            swiperSlide,
            customer,
            serviceAgreement,
            privacyPolicy
        },
        props: ['showPage'],
        methods: {
            //轮播图手势切换
            swiperChange: function(e) {
                console.log(e)
                let current = e.detail.current;
                // console.log(current, '轮播图')
                let that = this
                this.swiperCurrent = current
            },
            //选择开发城市
            toCityList() {
                // this.$router.push('cityList')
            },
            linkTo(e) {

                // uni.navigateTo({
                // 	url: "/pages/home/countMeal?id=" + '1'
                // })
                // window.location.href=e

                // console.log(e)
                // if(!getToken.get('token')){
                // 	this.msg='您还未登录，是否要登录?'
                // 	this.modelFlag=true
                // 	return
                // }  

                // if (e.length == 0) {

                // 	return
                // }

                // if(getToken.get('token')){
                // 	this.getFirstOrder(e)
                // }


            },
            toCustomers() {
                this.collageCurstomer = !this.collageCurstomer
                // 允许页面滚动
                document.body.style.overflow = ''
                document.body.removeEventListener('touchmove', this.bodyScroll, {
                    passive: false
                });

            },
            toCustomer(e) {

                this.typeMsg = e
                // window.location.href='https://cschat-ccs.aliyun.com/index.htm?tntInstId=_1s9qSim&scene=SCE00007159#/'
                this.collageCurstomer = !this.collageCurstomer
                // 禁止页面滚动
                document.body.style.overflow = 'hidden'
                document.body.addEventListener('touchmove', this.bodyScroll, {
                    passive: false
                });
            },
            //拨打客服电话
            toPhone() {
                this.collageCurstomer = !this.collageCurstomer
                window.location.href = 'tel://4008290037'
                // 允许页面滚动
                document.body.style.overflow = ''
                document.body.removeEventListener('touchmove', this.bodyScroll, {
                    passive: false
                });

            },
            bodyScroll(event) {
                event.preventDefault();
            },
            toClean(e) {
                let info = {
                    type: e
                }
                this.$router.push({
                    'name': 'cleaning',
                    params: info
                })

            },
            dot(id) {
                // document.querySelector('.meal').addEventListener('click', function() {
                // 	console.log(88888)


                // })
                // document.querySelector('.meal').addEventListener('click', function() {
                // 	console.log(88888)
                if (id == 1) {
                    
                    // uni.navigateTo({
                    // 	url: "/pages/home/countMeal?id=" + id
                    // })
                    this.$router.push({
                        'name': 'countMeal',
                        params: id
                    })
                    return
                } else if (id == 3) {
                    let info = {
                        id: id
                    }
                    this.$router.push({
                        'name': 'carpetClean',
                        params: id
                    })
                    return
                }
                console.log(id)
                let info = {
                    id: id
                }
                this.$router.push({
                    'name': 'monthly',
                    params: id
                })
                // uni.navigateTo({
                // 	url: "/pages/home/monthly?id=" + id
                // })
                // })
            },
            // 定制
            toCustomized(e) {
                if (e == 1) {
                    this.$router.push({
                        'name': 'monthly'
                    })
                } else if (e == 2) {
                    let info = {
                        type: 2
                    }
                    this.$router.push({
                        'name': 'monthly',
                        params: info
                    })
                }
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
            getProductList() {
                // let url = this.configUrl
                axios.post('/product/t-product-office/getProductList', {}).then(res => {
                    if (res.meta.success) {
                        let data = res.data
                        this.meadl1 = data[0]
                        this.meadl2 = data[1]
                        this.meadl3 = data[2]
                        this.meadl4 = data[3]
                        // this.productList = list
                    } else {

                    }

                })
            },
            getfindAdvertList() {
                let params = new FormData()
                params.append('moduleType', 1)
                axios.post('/business/t-business-advert/findAdvertList', params).then(res => {
                    console.log(res.data)
                    if (res.meta.success) {
                        let data = res.data.map(item => {
                            item.picUrl = this.configUrl + item.picUrl
                            return item
                        })
                        this.banner = data
                        console.log(this.banner.length)
                        // this.productList = list
                    } else {

                    }

                })
            },
            getAdvertisement() {
                let parmas = new FormData()
                parmas.append('uid', this.uid)
                parmas.append('moduleType', this.moduleType)
                axios.post('/business/t-business-advert-bar/insertAdvertBarLog', parmas).then(res => {
                    console.log(res)
                    if (res.meta.success) {
                        let data = res.data[0]
                        if (res.data.length > 0) {
                            this.showFrame = true
                            this.frame['height'] = data.height + '%'
                            this.frame['width'] = data.width + '%'
                            this.frame['top'] = data.ySize + '%'
                            this.frame['left'] = data.xSize + '%'
                            this.imgurl = this.configUrl + data.picUrl
                            document.body.addEventListener('touchmove', this.bodyScroll, {
                                passive: false
                            });
                        }

                        // document.body.removeEventListener('touchmove', this.bodyScroll, { passive: false });
                    }
                })

            },
            //大面积优惠专享
            toExclusive() {
                this.$router.push('exclusive')
            },
            firstOrder() {
                this.$router.push('firstCountMeal')
                return
                let token = window.localStorage.getItem('token')

                if (token == 'null' || !token) {
                    // 判断浏览器是否为微信浏览器
                    var ua = window.navigator.userAgent.toLowerCase();
                    if (ua.indexOf('micromessenger') > -1) { // 判断浏览器是否为微信浏览器
                        this.$getOther.getFirstWxurl()
                        // let redirect_uri = encodeURIComponent(
                        // 	'http://boss.nat300.top/qjrapi/sys/t-sys-app-user/wxOfficialAccountsLoginBack') //本地
                        // let redirect_uri = encodeURIComponent(
                        // 	'https://www.jieren365.cn/qjrapi/sys/t-sys-app-user/wxOfficialAccountsLoginBack')//测试
                        // window.location.href =
                        // 	`https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx37cc008acfbf08bc&redirect_uri=${redirect_uri}&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect`
                    } else {
                        this.msg = '您还未登录，是否要登录?'
                        this.modelFlag = true
                    }


                    return
                }

                this.getFirstOrder()
            },
            getBanner() {
                let parmas = new FormData()
                parmas.append('moduleType', this.moduleType)
                axios.post('/business/t-business-banner/load', parmas).then(res => {
                    console.log(res)
                    if (res.meta.success) {
                        let data = res.data.map(item => {
                            item.picUrl = this.configUrl + item.picUrl
                     
                           
                            return item
                        })


                        // this.graph = data


                        // document.body.removeEventListener('touchmove', this.bodyScroll, { passive: false });
                    }
                })
            },
            bodyScroll(event) {
                event.preventDefault();
            },
            collageFram() {
                this.showFrame = false
                document.body.removeEventListener('touchmove', this.bodyScroll, {
                    passive: false
                });
            },
            toExperience(e) {
                this.showFrame = false
                uni.navigateTo({
                    url: e
                })
            },
            addClean() {
                uni.navigateTo({
                    url: "/pages/my/addCleaner"
                })
            },
            customer() {

            },
            toCurtain() {
                this.$router.push({
                    name: 'curtainClean'
                })
            },
            toCarpet() {
                this.$router.push({
                    name: 'carpetClean'
                })
            },
            toOffice() {
                this.$router.push({
                    name: 'officeClean'
                })
            },
            toResidence() {
                this.$router.push({
                    name: 'newResidence'
                })
            },
            toMattress() {
                this.$router.push({
                    name: 'mattress'
                })
            },
            cancel() {
                this.modelFlag = false
            },
            confirm() {
                this.modelFlag = false
                this.$router.push('login')

            },
            recevieceCurtains() {
                if (!getToken.get('token')) {
                    this.modelFlag = true
                    this.msg = '您还未登录，是否要登录?'
                    return
                } else if (this.reveviceType == 2 || this.reveviceType == 3) {
                    this.msgCancle = false
                    this.modelFlag = true
                    return
                } else if (this.reveviceType == 1) {
                    // uni.navigateTo({
                    // 	url: "/pages/home/monthly?id=" + 4
                    // })
                    this.msgCancle = true
                    this.modelFlag = true
                    return
                }

                if (this.receviceFlag == true) {
                    // uni.navigateTo({
                    // 	url: "/pages/home/curtainsClean"
                    // })


                }
            },
            receviceCapet() {
                console.log(this.reveviceType)
                if (!getToken.get('token')) {
                    this.msg = '您还未登录，是否要登录?'
                    this.modelFlag = true
                    return
                } else if (this.reveviceType == 2 || this.reveviceType == 3) {
                    this.msgCancle = false
                    this.modelFlag = true
                    return
                } else if (this.reveviceType == 1) {
                    // uni.navigateTo({
                    // 	url: "/pages/home/monthly?id=" + 4
                    // })
                    this.msgCancle = true
                    this.modelFlag = true
                    return
                }
                if (this.receviceFlag == true) {
                    uni.navigateTo({
                        url: "/pages/home/carpetCleaning"
                    })
                }

            },
            getAd() {
                axios.post('/business/t-business-advert/isCanGetGifts', {}).then(res => {
                    if (res.meta.success) {
                        // this.modelFlag=true
                        this.msg = res.data.msg
                        this.receviceFlag = true
                        // this.productList = list
                    } else {

                        // this.modelFlag=true
                        this.reveviceType = res.data.type
                        this.msg = res.data.msg
                    }
                })
            },
            appClinent() {
                let params = new FormData()
                params.append('type', 1)
                axios.post(
                    '/sys/t-sys-app-user/putLatestModule', params
                ).then(res => {
                    if (res.meta.success) {


                    } else {

                    }
                })
                // this.$router.push({
                // 	name: 'serverIndex'
                // })
            },
            getFirstOrder(e) {
                this.isLoading = true
                axios.post('/office/t-office-order/isFirstExperienceOrder', {}).then(res => {

                    this.firstOrderId = res.data
                    if (this.firstOrderId.length > 0) {
                        let info = {
                            orderId: this.firstOrderId
                        }
                        this.$router.push({
                            'name': 'orderFrequency',
                            params: info
                        })
                        // uni.navigateTo({
                        // 	url: "../order/orderFrequency?orderId=" + this.firstOrderId
                        // })
                    } else {
                        this.$router.push('firstCountMeal')
                    }
                    this.isLoading = false
                })
            },
            confirms() {
                plus.runtime.openURL('https://boss.jieren365.cn/qjrapi/appInstall.html');
                this.modelSign = false
                plus.runtime.quit()
            },
            cancels() {
                plus.runtime.quit()
            },
            collageAgreement() {
                this.showAreement = !this.showAreement
            },
            collagePricacy() {
                this.showPricacy = !this.showPricacy
            },
            signOut() {
                plus.runtime.quit() //安卓退出应用
            },
            agree() {
                // window.localStorage.setItem('upgradings', '1')
                plus.storage.setItem('upgradings', '1')
                this.collageTreaty = !this.collageTreaty
                document.body.style.overflow = '' // 出现滚动条
                document.body.removeEventListener('touchmove', this.bodyScroll, {
                    passive: false
                });
            },
            getHotRecomList() {
                let parmas = new FormData()
                parmas.append('cityId', '123456789')
                parmas.append('addrCode', '1')
                axios.post('/business/t-business-hot-recom/getHotRecomList', parmas).then(res => {
                    console.log(res)
                    if (res.meta.success) {

                    }


                    // this.graph = data


                    // document.body.removeEventListener('touchmove', this.bodyScroll, { passive: false });
                })
            },
            //判断定位的当前城市是否属于开放城市
            boolCityExit() {
                var that = this
                // 获取缓存的城市
                if (window.localStorage.getItem('city')) {
                    this.city = window.localStorage.getItem('city')
                } else {
                    // //判断定位的当前城市是否属于开放城市
                    // plus.geolocation.getCurrentPosition(function(val) {
                    // let city = val.address.city
                    let params = new FormData()
                    params.append('cityName', this.city)
                    axios.post('/business/t-business-open-citys/boolCityExit', params).then(res => {
                        if (res.meta.success) {
                            if (!res.data) {
                                // this.$toast({
                                // 	message:'当前城市未开放'
                                // })
                                that.city = '厦门'
                                window.localStorage.setItem('city', '厦门')
                                return
                            }

                            that.city = city.slice(0, city.length - 1)
                            window.localStorage.setItem('city', that.city)
                        } else {

                        }
                    })
                    that.city = city.slice(0, e.length - 1)
                    // }, function() {}, {
                    // 	geocode: true,
                    // 	provider: 'amap'
                    // });


                }

            },
            
            //判断是否是安卓还是ios
            isAndroid_ios() {
            	var u = navigator.userAgent,
            		app = navigator.appVersion;
            	var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //android终端或者uc浏览器
            	var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
            	return isAndroid == true ? true : false;
            }
            

        },
        created() {
            // 判断微信浏览器
            if (window.localStorage.getItem('wxBrowser')) {
                this.showDistance = true
            }
            // 	this.$jsonp('https://restapi.amap.com/v3/place/text',{
            // 			keywords:'公寓',
            // 			city:'厦门',
            // 			page:'1',
            // 			offset:'20',
            // 			extensions:'all',
            // 			key:'4545dacced806c77e28f8cb466588a1d'
            // 		}).then(res =>{
            // 			 console.log(res)
            // 		})


            // this.uid= this.getQuery('uid')
            let that = this
            // this.graph = [{
            //         url: require('../assets/banner.jpg')
            //     },
            //     {
            //         url: require('../assets/banner2.jpg')
            //     },
            //     {
            //         url: require('../assets/banner3.jpg')
            //     }

            // ]
            setTimeout(() => {
                that.showSwiper = true
            }, 10)
            // this.boolCityExit()
            window.localStorage.setItem('city', '厦门')

            if (this.$getOther.getUrlInfo('activityClose')) { //扫码->已注册->活动无效->首页
                this.$toast({
                    message: '此活动已失效，感谢您的关注',
                    duration: 1500
                })
            }
            this.getAdvertisement()
            this.getProductList()
            this.getfindAdvertList()
            this.getBanner()

        },
        mounted() {
            // 		var ua = window.navigator.userAgent.toLowerCase();

            // 		     // ua.indexOf('micromessenger')为真-微信端，如果为假，就是其他浏览器
            // 		     if (ua.indexOf('micromessenger') > -1) {
            // 		        alert('微信浏览器')
            // 		     } else {

            // 		     }

            // var mySwiper = new Swiper('.swiper-container', {})
            // 		if(getToken.get('token').length!=0){
            // 			this.getAd()
            // 			this.appClinent()
            // 	    }

            

            var that = this
            // console.log('wefrsf')
            // console.log(plus.runtime.version)
            
            // 判断是否为安卓,提示服务协议和隐私政策
            var u = navigator.userAgent;
            // that.collageTreaty = true
            var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
                plus.runtime.getProperty(plus.runtime.appid, function(widgetInfo) {
                	var versionKist = widgetInfo.version.split('.')
                	var version = Number(versionKist[0].toString() + versionKist[1].toString() + versionKist[2].toString())
                	that.version = version
                	if (version < 112) {
                		// that.modelSign = true//更新版本提示框！！
                	}

                	if (isAndroid) {
                		if (!plus.storage.getItem('upgradings')) {
                			that.collageTreaty = true
                			document.body.style.overflow = 'hidden'
                			document.body.addEventListener('touchmove', that.bodyScroll, {
                				passive: false
                			});
                		}
                	}


                })
               //判断是个首次打开
              if (plus.storage.getItem('firstTime')) {
                  let  ios=this.isAndroid_ios()
  
                  if(!ios){//ios 手机       
                        setTimeout(() => {
                            plus.navigator.closeSplashscreen()//关闭启动页
                            plus.navigator.setFullscreen(false)
                            plus.storage.setItem('showWebview', '1')
                            plus.storage.setItem('firstTime', '1')
                        }, 8000)    
                   }else{//安卓
                      setTimeout(() => {
                          plus.navigator.closeSplashscreen()//关闭启动页
                          plus.navigator.setFullscreen(false)
                          plus.storage.setItem('showWebview', '1')
                          plus.storage.setItem('firstTime', '1')
                      }, 1500)
                   }
                  // setTimeout(() => {
                  //     plus.navigator.closeSplashscreen()
                  //     plus.navigator.setFullscreen(false)
                  //     plus.storage.setItem('showWebview', '1')
                  //     plus.storage.setItem('firstTime', '1')
                  // }, 1000)
              } else {
                  let  ios=this.isAndroid_ios() 
                  if(!ios){//ios 手机
                        setTimeout(() => { 
                            plus.navigator.closeSplashscreen()//关闭启动页
                            plus.navigator.setFullscreen(false)
                            plus.storage.setItem('showWebview', '1')
                            plus.storage.setItem('firstTime', '1')
                        }, 10000)
                        
                   }else{//安卓
                    setTimeout(() => {
                        plus.navigator.closeSplashscreen()//关闭启动页
                        plus.navigator.setFullscreen(false)
                        plus.storage.setItem('showWebview', '1')
                        plus.storage.setItem('firstTime', '1')
                     }, 3000)
                   }
                
              }

            },
            watch: {
                showCity(newval, oldval) {
                    this.city = newval
                }

            }

        }
</script>

<style scoped>
    * {
        padding: 0;
        margin: 0;
        font-family: 'Microsoft YaHei'
    }

/*    body {
        max-width: 7.5rem;
    } */

 /*   #app {
        max-width: 7.5rem;
        display: flex;
        align-items: center;
    } */

    .showTop {
        height: 100%;
        width: 100%;
        position: absolute;
        top: 0;
    }

    .head {
        /* padding-top: 40upx; */
        height: 3.8rem;
        width: 100%;
        /* background: #539ef9; */
        /* background-img: url('../../static/head.png'); */
        background-size: 100% 100%;
        text-align: center;
        position: relative;
        box-sizing: content-box;
        color: #fff;
        font-size: 0.33rem;
        position: absolute;
        top: 0;
        left: 0;

    }

    .head-first {
        width: 100vw;
        padding-top: 0.4rem;
        height: 1.28rem;
        background-image: url('../assets/head-1.png');
        background-size: 100% 100%;
        position: fixed;
        top: 0;
        z-index: 10;
        box-sizing: border-box;
    }

    .head-three {
        padding-top: 0.4rem;
        height: 1.28rem;
        background-image: url('../assets/head-1.png');
        background-size: 100% 100%;
        box-sizing: border-box;
    }

    .head-second {
        height: 2.32rem;
        background-image: url('../assets/head-2.png');
        background-size: 100% 100%;
        margin-top: -0.01rem;
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
        width: 0.29rem;
        height: 0.4rem;
        position: absolute;
        margin-left: 0.29rem;
        top: 0.65rem;
    }

    .head-left span {
        margin-left: 0.75rem;

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
        width: 0.52rem;
        height: 0.5rem;
        position: absolute;
        right: 0.28rem;
        top: 0.62rem;
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

    .content {
        /* padding: 0 0.28rem; */
        width: 100%;
        box-sizing: border-box;
        /* background: #fff; */
        /* 	display: flex;
		flex-direction: column;
		align-items: center; */
        padding-bottom: 1.1rem;
        position: relative;
        background: #f8f8fa;
    }

    .content .top-left {
        height: 0.6rem;
        width: 1.4rem;
        font-size: 0.32rem;
        font-weight: 550;
        display: flex;
        display: -webkit-box;
        display: -webkit-flex;
        justify-content: center;
        -webkit-box-pack: center;
        -webkit-justify-content: center;
        align-items: center;
        -webkit-box-align: center;
        -webkit-align-items: center;
        /* border: 1px solid #141418; */
        box-sizing: border-box;
        border-radius: 0.5rem;
        position: fixed;
        top: 0.55rem;
        left: 0.28rem;
        z-index: 10;
        background-image: url('../assets/addressBorder.png');
        background-size: 100% 100%;
        color: #1893ff;
    }

    .content .top-left.showTop {
        top: 0.35rem;
    }

    .content .top-left img {
        height: 0.3rem;
        width: 0.25rem;
        margin-right: 0.1rem;
    }

    .content .top-right {
        height: 0.6rem;
        width: 0.6rem;
        display: flex;
        display: -webkit-box;
        display: -webkit-flex;
        justify-content: center;
        -webkit-box-pack: center;
        -webkit-justify-content: center;
        align-items: center;
        -webkit-box-align: center;
        -webkit-align-items: center;
        /* border: 1px solid #141418; */
        box-sizing: border-box;
        border-radius: 50%;
        position: fixed;
        top: 0.55rem;
        right: 0.28rem;
        z-index: 10;
        background-image: url('../assets/messageBorder.png');
        background-size: 100% 100%;
    }

    .content .top-right.showTop {
        top: 0.35rem;
    }

    .content .top-right img {
        height: 0.34rem;
        width: 0.28rem;
    }

    .content .banner {
        margin: 0 auto;
        /* margin-top: 1.45rem; */
        width: 100%;
        height: 4.63rem;
        position: relative;
        /* border-radius: 0.20rem; */
        overflow: hidden !important;
        /* z-index: 10; */
    }

    .banner .swiper {
        width: 100% !important;
        height: 4.63rem !important;
        /* border-radius: 0.2rem !important; */
        overflow: hidden !important;
        position: relative;
    }

    .banner img {
        width: 100vw !important;
        height: 100% !important;
        /* border-radius: 0.2rem !important; */
    }

    .dots {
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0.2rem;
        display: flex;
        justify-content: center;
        /* z-index: 100; */
    }

    .dots .dot {
        margin: 0 00.08rem;
        width: 0.14rem;
        height: 0.14rem;
        border: 0.01rem solid #fff;
        background: rgba(0, 0, 0, 0.1);
        border-radius: 0.08rem;
        transition: all 0.6s;
    }

    .dots .dot.active {
        width: 0.14rem;
        background: #fff !important;
    }

    /* 	.banner img {
				display: block;
				width: 6.94rem;
				height: 3.35rem;
				border-radius: 0.2rem;
			}
			 */
    .seek {
        height: 2.5rem;
        width: 6.94rem;
        margin: 0 auto;
        text-align: center;
        /* line-height: 2.5rem; */
    }

    .seek-head {
        font-size: 0.34rem;
        text-align: center;
        margin: 0.25rem 0 0.16rem 0;
    }

    .seek .seek-list {
        width: 100%;
    }

    .seek-head {
        font-size: 0.34rem;
        font-weight: 550;
    }

    .seek .seek-list .seek-content {
        width: 25%;
        float: left;
    }

    .seek-list .seek-content .seek-img {
        width: 100%;
        height: 1rem;
        text-align: center;
        margin-bottom: 0.15rem;
    }

    .seek-list .seek-content {
        text-align: center;
    }

    .seek-list .seek-content .seek-img img {
        width: 1rem;
        height: 1rem;
    }

    .seek-content .seek-tit {
        font-size: 0.26rem;

    }

    .classification {
        position: absolute;
        top: 4.43rem;
        left: 50%;
        transform: translateX(-50%);
        -webkit-transform: translateX(-50%);
        height: 1.8rem;
        width: 6.94rem;
        margin: 0 auto;
        background: #fff;
        display: flex;
        display: -webkit-box;
        display: -webkit-flex;
        /* 	justify-content:center;
		-webkit-box-pack: center;
		-webkit-justify-content:center; */
        align-items: center;
        -webkit-box-align: center;
        -webkit-align-items: center;
        box-shadow: 5px 5px 10px #eee;
        border-radius: 0.1rem;
        z-index: 1;
    }

    .classification .classification-info {
        width: 20%;
        font-size: 0.25rem;
        text-align: center;
        position: relative;
        /* 		display: flex;
		display: -webkit-box;
		display: -webkit-flex;
		justify-content: center;
		-webkit-box-pack: center;
		-webkit-justify-content: center;
		align-items: center;
		-webkit-box-align: center;
		-webkit-align-items: center; */
    }

    .classification .classification-info .info-img {
        width: 1.1rem;
        height: 1.1rem;
    }

    .classification-info .info-tips {
        width: 0.81rem;
        height: 0.29rem;
        position: absolute;
        left: 0.8rem;
    }

    .office-classification {
        height: 4.62rem;
        width: 6.94rem;
        /* margin: 1.8rem auto 0 auto; */
        margin: 0.2rem auto 0 auto;
        display: flex;
        display: -webkit-box;
        display: -webkit-flex;
        justify-content: space-between;
        -webkit-box-pack: justify;
        -webkit-justify-content: space-between;
    }

    .office-classification .classification-left {
        width: 3.45rem;
        height: 100%;
        background-image: url('../assets/customized.png');
        background-size: 101.5% 101.5%;
        z-index: 1;
    }

    .classification-left .left-a {
        font-size: 0.34rem;
        /* font-weight: 550; */
        color: #000;
        margin: 0.28rem 0 0 0.15rem;
    }

    .classification-left .left-b {
        font-size: 0.34rem;
        /* font-weight: 550; */
        color: #000;
        margin: 0 0 0 0.15rem;
    }

    .classification-left .left-c {
        font-size: 0.24rem;
        /* font-weight: 550; */
        color: #484c52;
        margin: 0.14rem 0 0 0.15rem;
    }
      .classification-left  .left-d{
            height: 0.4rem;
            display: flex;
            display: -webkit-box;
            display: -webkit-flex;
            /* 	justify-content:center;
            -webkit-box-pack: center;
            -webkit-justify-content:center; */
            align-items: center;
            -webkit-box-align: center;
               /* margin: -0.14rem 0 0 0.15rem; */
     }
     .classification-left  .left-d img{
           width: 2rem;
           height: auto;
           margin-left: 0.15rem;
           margin-top: 0.05rem;
     }
    .classification-left .left-btn {
        font-size: 0.24rem;
        width: 1.24rem;
        height: 0.44rem;
        background: #fff;
        text-align: center;
        line-height: 0.44rem;
        /* font-weight: 550; */
        color: #fff;
        margin: 0.25rem 0 0 0.15rem;
        border-radius: 0.1rem;
        background: linear-gradient(to right, #1c91fe, #71bdff);
    }

    .office-classification .classification-right {
        width: 3.4rem;
        height: 100%;
    }

    .classification-right .right-a {
        font-size: 0.3rem;
        /* font-weight: 550; */
        color: #000;
        padding: 0.28rem 0 0 0.15rem;
    }

    .classification-right .right-b {
        font-size: 0.24rem;
        /* font-weight: 550; */
        color: #5a5656;
        padding-left: 0.15rem;
    }

    .classification-right .right-c {
        font-size: 0.24rem;
        /* font-weight: 550; */
        color: #5a5656;
        padding-left: 0.15rem;
    }

    .classification-right .right-btn {
        font-size: 0.24rem;
        width: 1.24rem;
        height: 0.44rem;
        background: #fff;
        text-align: center;
        line-height: 0.44rem;
        /* font-weight: 550; */
        color: #fea612;
        margin: 0.25rem 0 0 0.15rem;
        border-radius: 0.1rem;
        color: #fff;
        background: linear-gradient(to right, #1c91fe, #71bdff)
    }

    .classification-right .right-btn-a {
        font-size: 0.24rem;
        width: 1.24rem;
        height: 0.44rem;
        background: #fff;
        text-align: center;
        line-height: 0.44rem;
        /* font-weight: 550; */
        color: #fff;
        margin: 0.25rem 0 0 0.15rem;
        border-radius: 0.1rem;
        background: linear-gradient(to right, #1c91fe, #71bdff)
    }

    .classification-right .classification-top {
        height: 2.25rem;
        width: 100%;
        background-image: url('../assets/single.png');
        background-size: 101.5% 104%;
        position: relative;
        z-index: 1;
    }

    .classification-top img {
        width: 1.26rem;
        height: 0.26rem;
        position: absolute;
        top: 0.02rem;
        right: 0.01rem;
    }

    .classification-right .classification-bottom {
        height: 2.25rem;
        width: 100%;
        background-image: url('../assets/carpetCleaning.png');
        background-size: 101.5% 104%;
        margin-top: 0.12rem;
        z-index: 1;
    }

    .new-people {
        height: 1.8rem;
        width: 6.94rem;
        margin: 0.4rem auto 0 auto;
        background: #fff;
        display: flex;
        display: -webkit-box;
        display: -webkit-flex;
        justify-content: space-between;
        -webkit-box-pack: justify;
        -webkit-justify-content: space-between;
        align-items: center;
        -webkit-box-align: center;
        -webkit-align-items: center;
        padding: 0 0.12rem 0 0.18rem;
        box-sizing: border-box;
        box-shadow: 0px 0px 10px #f1f1f1;
        border-radius: 0.2rem;
        z-index: 1;
    }

    .new-people .new-title.exclusive span {
        color: #ff601f !important;
    }

    .new-people .new-title {
        font-size: 0.44rem;
        color: #000;
    }

    .new-people .new-img {
        width: 1.11rem;
        height: 1.3rem;
    }

    .new-people .new-title span {
        color: #2f8bfa;
    }

    .new-people .new-content {
        color: #a1a1a1;
        font-size: 0.28rem;
        display: flex;
        display: -webkit-box;
        display: -webkit-flex;
        align-items: center;
        -webkit-box-align: center;
        -webkit-align-items: center;
    }

    .new-people .new-content img {
        width: 0.84rem;
        height: 0.34rem;
        margin-left: 0.08rem;
    }

    .nav {
        width: 100%;
        height: 0.2rem;
        background: #f6f5f5;
    }

    .cleaner {
        margin-top: 0.20rem;
        position: relative;
    }

    .cleaner .imgs {
        height: 2.98rem;
        width: 6.94rem;
    }

    .cleaner .imgs img {
        display: block;
        height: 100%;
        width: 100%;
    }

    .cleaner .des {

        position: absolute;
        bottom: 0.20rem;
        display: flex;
        left: 50%;
        transform: translateX(-50%);
    }

    .cleaner .des div {
        background: #539ef9;
        color: #fff;
        height: 0.7rem;
        width: 1.8rem;
        margin-right: 0.23rem;
        border-radius: 0.20rem;
        text-align: center;
        line-height: 0.70rem;
    }

    .office {
        margin-top: 0.20rem;
        font-size: 0.32rem;
        padding: 0 0.28rem;
    }

    .office .tit {
        text-align: center;
        font-size: 0.34rem;
        font-weight: 550;
        margin-bottom: 0.18rem;
        height: 0.42rem;
        line-height: 0.42rem;

    }

    .office .tit>span {
        font-size: 0.28rem;
        color: #333333;
        font-weight: 500;
        display: inline-block;
        height: 0.42rem;
        line-height: 0.42rem;
    }

    /* .office .meal {
		display: flex;
		flex-wrap: nowrap;
		margin-top: 0.30rem;
	}

	.office .meal img {
		display: inline-block;
		width: 1.55rem;
		height: 2.16rem;
		border-radius: 0.2rem;
		margin-right: 0.20rem;
	}

	.office .meal img:last-child {
		margin: 0;
	} */
    .total-meadl {
        height: 3.9rem;
        margin: 0 auto;
        width: 6.94rem;
        /* 	display: flex;
		flex-wrap: wrap; */
    }

    .meal-count {
        background-image: url(../assets/sequence.png);
        background-size: 100% 100%;
        height: 1.75rem;
        width: 3.28rem;
        padding-left: 0.1rem;
        float: left;
    }

    .meal-month {
        width: 3.28rem;
        float: right;
        background-image: url(../assets/monthly.png) !important;
    }

    .meal-quarter {
        width: 3.28rem;
        float: left;
        background-image: url(../assets/quarter.png) !important;
    }

    .meal-year {
        width: 3.28rem;
        float: right;
        background-image: url(../assets/years.png) !important;
        position: relative;
    }

    .meal-year .year-tit {
        position: absolute;
        width: 0.98rem;
        height: 0.29rem;
        text-align: center;
        line-height: 0.29rem;
        top: 0;
        right: 0;
        /* 		transform: translateY(-50%);
		-webkit-transform: translateY(-50%); */
        color: #fff;
        font-size: 0.22rem;
    }

    .mr-bottom {
        margin-bottom: 0.1rem;
    }

    .meal-count .meal-tit {
        font-size: 0.32rem;
        font-weight: 540;
        padding-top: 0.12rem;
        font-weight: 550;
    }

    .meal-count .meal-info {
        margin-top: 0.08rem;
        font-size: 0.26rem;
    }

    .meal-count img {
        margin-top: 0.16rem;
        height: 0.36rem;
        width: 0.7rem;
    }

    .news {
        width: 6.94rem;
        margin: 0.3rem auto 0 auto;
        border-radius: 0.20rem;
        overflow: hidden;
        z-index: 9;
        position: relative;
    }

    /* .news .swiper{
				width: 694upx;
				height: 252upx;
				border-radius: 20upx;
			} */
    .news img {
        width: 6.94rem;
        height: 1.6rem;
        border-radius: 0.20rem;
    }

    .recevice {
        width: 6.94rem;
        height: 1.94rem;
        margin: 0.3rem auto 0 auto;
        overflow: hidden;
    }

    .recevice img {
        width: 3.36rem;
        height: 1.94rem;
    }

    .recevice .left-img {
        float: left;
    }

    .recevice .right-img {
        float: right;
    }

    .cleaner-info {
        height: 100%;
        width: 100%;
        margin-top: 0.3rem;
        font-size: 0.32rem;
        /* padding: 0 0.28rem; */
        /* padding-bottom: 0.20rem; */

        background: #f8f8fa;
    }

    .cleaner-info:nth-child(2) {
        background: #f8f8fa !important;

    }

    .cleaner-info .tit {
        text-align: center;
        margin-bottom: 0.30rem;
        font-weight: 650;
        /* background:  #f8f8fa; */
    }

    .cleaner-top {
        height: 2.66rem;
        width: 100%;
    }

    .cleaner-top .clean-office {
        font-size: 0.28rem;
        color: #fff;
        line-height: 2.66rem;
        width: 4.55rem;
        height: 2.66rem;
        background-image: url(../assets/office.png);
        background-size: 100% 100%;
        float: left;
    }

    .clean-left {
        height: 2.66rem;
        width: 2.2rem;
        float: right;
        text-align: center;
        position: relative;
    }

    .clean-left .clean-hotel {
        font-size: 0.28rem;
        color: #fff;
        line-height: 1.24rem;
        height: 1.24rem;
        width: 100%;
        background: url(../assets/carpet.png);
        background-size: 100% 100%;
        position: absolute;
        top: 0;
        right: 0;
    }

    .clean-left .clean-housework {
        font-size: 0.28rem;
        color: #fff;
        line-height: 1.24rem;
        height: 1.24rem;
        width: 100%;
        background: url(../assets/housework.png);
        background-size: 100% 100%;
        position: absolute;
        bottom: 0;
        right: 0;
    }



    .clean-bottom {
        height: 1.24rem;
        width: 6.94rem;
        margin-top: 0.165rem;
    }

    .clean-bottom>div {
        font-size: 0.28rem;
        color: #fff;
        line-height: 1.24rem;
        height: 1.24rem;
        width: 2.2rem;
        float: left;
    }

    .clean-bottom .residence {
        background: url(../assets/new-residence.png);
        background-size: 100% 100%;

    }

    .clean-bottom .restaurant {
        background: url(../assets/new-assart.png);
        background-size: 100% 100%;
        margin-left: 0.15rem;
    }

    .clean-bottom .assart {
        background: url(../assets/mattress.png);
        background-size: 100% 100%;
        float: right;
    }

    .clean-info {
        height: 1rem;
        width: 6.94rem;
        margin: 0 auto;
        margin-top: 0.2rem;
    }

    .clean-info .security {
        height: 1rem;
        width: 2.2rem;
        background: #fff;
        /* line-height: 1rem; */
        text-align: center;
        font-size: 0.28rem;
        float: left;
        border-radius: 0.1rem;
    }

    .clean-info .security .security-tit {
        margin-top: 0.12rem;
        color: #00a652;
    }

    .clean-info .security .security-content {
        font-size: 0.28rem;
        color: #5f5f6b;
    }

    .clean-info .security.major {
        margin-left: 0.15rem;
    }

    .clean-info .security.vocation {
        float: right !important;
    }

    .clean-logo {
        width: 4.2rem;
        height: 0.48rem;
        text-align: center;
        margin: 0 auto;
        position: relative;
    }

    .clean-logo .logo-tit {
        font-size: 0.3rem;
        /* width: 3.38rem; */
        width: 50.5vw;
        font-weight: 650;
        display: inline-block;
        position: absolute;
        /* right: 20%; */
        left: 0;
        top: 70%;
        /* transform: translateX(-0.37rem); */
    }

    .clean-logo .logo {
        width: 0.47rem;
        height: 0.52rem;
        position: absolute;
        /* right: 7%; */
        right: 0;
        top: 50%;
        /* transform: translateY(-50%); */
    }

    .other-service {
        height: 1rem;
        width: 6.94rem;
        background: #fff;
        font-size: 0.24rem !important;
        padding: 0.5rem 0 0.2rem 0;
        margin: 0 auto;
        box-sizing: content-box;
        margin-bottom: 0.2rem;

    }

    .other-service .service {
        width: 20%;
        text-align: center;
        display: inline-block;

    }

    .other-service .type {
        width: 0.7rem !important;
        height: 0.47rem !important;
    }

    .service-position {
        position: relative;
    }

    .service-position .sameDay {
        height: 0.31rem;
        width: 0.8rem;
        position: absolute;
        top: -0.3rem;
        right: -0.2rem;

    }

    .programme {
        height: 3.96rem;
        width: 100%;
        padding-top: 0.15rem;
        box-shadow: 0px 0px 10px #f1f1f1;
        box-sizing: border-box;
        background: #fff;
    }

    .programme:last-child {
        margin-top: 0.25rem;
    }

    .programme img {
        width: 6.94rem;
        height: 2.4rem;
    }

    .programme-content {
        display: flex;
        display: -webkit-box;
        display: -webkit-flex;
        justify-content: space-between;
        -webkit-box-pack: justify;
        -webkit-justify-content: space-between;
        align-items: center;
        -webkit-box-align: center;
        -webkit-align-items: center;
        padding: 0 0.28rem;
        margin-top: 0.2rem;
    }

    .programme-content .programme-title {
        text-align: left;
        font-size: 0.3rem;
        color: #000;
    }

    .programme-content .programme-info {
        text-align: left;
        color: #5f5f6b;
        font-size: 0.26rem;
        margin-top: 0.04rem;
    }

    .programme-content .programme-money {
        color: #e2002b;
        font-size: 0.3rem;
    }

    .programme-content .programme-money span {
        font-size: 0.24rem;
    }

    .bottom-content {
        /* background: #fff; */
        padding-top: 0.36rem;
        margin-top: 5px;
    }

    .bottom-first {
        display: flex;
        display: -webkit-box;
        display: -webkit-flex;
        justify-content: center;
        -webkit-box-pack: center;
        -webkit-justify-content: center;
        align-items: center;
        -webkit-box-align: center;
        -webkit-align-items: center;
        font-size: 0.26rem;
        color: #a8a8a8;
    }

    .bottom-first img {
        width: 0.35rem;
        height: 0.3rem;
        margin-right: 0.12rem;
    }

    .bottom-second {
        font-size: 0.22rem;
        color: #d3d3d3;
        margin-top: 0.2rem;
    }

    .new-sign {
        height: 0.53rem;
        width: 1.28rem;
        margin: 0 auto;
        text-align: center;
        line-height: 0.3rem;
        margin-top: 0.28rem;
        /* transform: translateY(-0.65rem); */
    }

    .new-sign img {
        height: 100%;
        width: 100%;
        /* 	position: absolute;
		top:0; */

    }

    .clean-company {
        color: #a8a8a8;
        font-size: 0.22rem;
        margin: 0.4rem auto;

        /* transform: translateY(-0.5rem); */
    }

    .content-bottom {
        background: #f8f8fa;
        width: 100%;
        height: 100%;
        text-align: center;
    }

    .add-clean {
        margin: 0.20rem auto 0 auto;
        width: 6.94rem;
        height: 1.8rem;
        background: #fff;
        border-radius: 0.15rem;
    }

    .add-clean-left {
        font-size: 0.38rem;
        float: left;
        padding-left: 0.2rem;
        box-sizing: border-box;
    }

    .add-clean-left .add-tit {
        margin-top: 0.38rem;
    }

    .add-clean-left .tit-1 {
        font-weight: 550;
    }

    .add-clean-left .tit-2 {
        font-weight: 550;
        color: #1d90fe;
    }

    .add-clean-left .add-info {
        font-size: 0.30rem;
        color: #a1a1a1;
        margin-top: 0.12rem;
        line-height: 0.34rem;
    }

    .add-clean-left .add-info-img {
        display: inline-block;
        line-height: 0.34rem;
        margin-left: 0.25rem;
    }

    .add-clean-left img {
        height: 0.34rem;
        width: 0.86rem;
        transform: translateY(0.09rem);
    }

    .add-clean-right {
        float: right;
        height: 1.8rem;
        /* line-height: 1.8rem; */
        position: relative;
    }

    .add-clean-right img {
        width: 1.36rem;
        height: 1.13rem;
        position: absolute;
        top: 50%;
        right: 0.22rem;
        transform: translateY(-50%);
    }

    /* .add-clean .clean-img {
		height: 1.82rem;
		width: 6.94rem;
	} */

    .frame {
        z-index: 2001;
        position: fixed;
        -webkit-transform: translate(-50%, -50%);
        -moz-transform: translate(-50%, -50%);
        transform: translate(-50%, -50%);
    }

    .framed-pic {
        width: 100%;
        height: 100%;
    }

    .show-shadow {
        position: fixed;
        top: 0;
        left: 0;
        background: rgba(0, 0, 0, 0.7);
        width: 100%;
        height: 100%;
        z-index: 2000;
    }

    .treaty-show {
        position: fixed;
        top: 0;
        left: 0;
        background: rgba(0, 0, 0, 0.7);
        width: 100%;
        height: 100%;
        z-index: 2000;
    }

    .hideDisplay {
        display: none !important;
    }

    .showTreaty {
        position: fixed;
        left: 50%;
        top: 25%;
        /* height: 5rem; */
        width: 5.5rem;
        border-radius: 0.2rem;
        font-size: 0.28rem;
        background: #fff;
        transform: translateX(-50%);
        -o-transform: translateX(-50%);
        -moz-transform: translateX(-50%);
        -webkit-transform: translateX(-50%);
        z-index: 2001;
    }

    .showTreaty .treaty-title {
        padding-top: 0.3rem;
        font-size: 0.28rem;
        color: #000;
        width: 100%;
        text-align: center;
    }

    .showTreaty .treaty-content {
        padding: 0.2rem 0.4rem;
    }

    .showTreaty .treaty-content span {
        color: #70bcf3;
        font-size: 0.22rem;
    }

    .treaty-btn {

        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .treaty-btn .btn-left {
        font-size: 0.28rem;
        color: #000;
        height: 0.65rem;
        width: 50%;
        text-align: center;
        line-height: 0.65rem;
    }

    .treaty-btn .btn-right {
        font-size: 0.28rem;
        color: #70bcf3;
        height: 0.65rem;
        width: 50%;
        text-align: center;
        line-height: 0.65rem;
    }
</style>
<style>
    .swiper-pagination-bullet {
        border: 1px solid #fff !important;
        background: rgba(0, 0, 0, 0.5) !important;
        width: 0.14rem;
        height: 0.14rem;
        box-sizing: border-box;
    }

    .swiper-pagination-bullet-active {
        /* background: #fff !important; */
        opacity: 0.5;
    }

    .banner-home .swiper-container {
        width: 100%;
        height: 4.63rem;
        border-radius: 0 !important;
        /* border-radius: 0.20rem; */
        overflow: hidden !important;

    }

    .banner-home .swiper-container .swiper-wrapper img {
        /* z-index: 10000; */
        width: 100%;
        /* height: 100%; */
    }

    .banner-home .swiper-pagination-fraction,
    .banner-home .swiper-pagination-custom,
    .banner-home .swiper-container-horizontal>.swiper-pagination-bullets {
        bottom: -0.05rem !important;

    }

    .banner-home .van-swipe__indicators {
        bottom: 0.5rem;
    }

    .banner-home .van-swipe__indicators .van-swipe__indicator {
        border: 1px solid #fff !important;
        background: rgba(0, 0, 0, 0.5) !important;
    }

    /* banner .van-swipe__indicators {
		display: none;
	}
 */
    .news .swiper-container {
        width: 6.94rem !important;
        height: 1.6rem;
        border-radius: 0.20rem;
        margin: 0 auto;
    }

    .news .swiper-pagination-fraction,
    .news .swiper-pagination-custom,
    .news .swiper-container-horizontal>.swiper-pagination2.swiper-pagination-bullets {
        position: absolute;
        bottom: 1.3rem !important;
        z-index: 10;
    }

    .news .swiper-pagination2.swiper-pagination-bullets {
        height: 0.1rem;
    }

    .tit-img {
        width: 0.3rem;
        height: 0.3rem;
    }
</style>
