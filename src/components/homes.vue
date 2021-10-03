<template>
	<div :class='showPage!== "basic"?"hideDisplay":"showTop"'>
		<serviceAgreement @toCollage='collageAgreement' v-if='showAreement'></serviceAgreement>
		<privacyPolicy  @toCollagePricacy='collagePricacy' v-if='showPricacy'></privacyPolicy>
		<div class='head'>
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
		</div>
		<div class='content'>
			<div class='banner' v-if='showPage== "basic"'>
				<div class='swiper'>
					<swiper v-if="graph.length > 0" ref="mySwiper" :options="homeSwiperOption" class="swiper-container" @change='swiperChange'>
						<swiper-slide v-for='(item,index) in  graph' :key='index'>
							<!-- <img src="../assets/newPeople.jpg" mode=""></img> -->
							<!-- <img class="swiper-item " src='../assets/banner-1.png'></img> -->

							<img class="swiper-item "   :src='item.picUrl' @click="linkTo(item.linkHtml)"></img>
						</swiper-slide>
						<!-- 常见的小圆点 -->
						<div class="swiper-pagination" v-for="(item,index) in graph" :key="index" slot="pagination"></div>
					</swiper>
					<div class="dots">
						<div v-for="(imgUrls,index ) in  graph" :key="index">
							<div class="dot" :class="[index ==  signIndex ? ' active' : '']"></div>
						</div>
					</div>
				</div>
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
			</div>

			<div class='office'>
				<div class='tit'>办公清洁定制<img class='tit-img' src="../assets/start.png" alt=""><span>您的楼宇清洁师</span> </div>
				<!-- <div class='meal'>
					<img src="../assets/meal-1.png"  mode="" @click="dot(1)" ></img>
					<img src="../assets/meal-2.png" mode="" @click="dot(2)"></img>
					<img src="../assets/meal-3.png" mode="" @click="dot(3)"></img>
					<img src="../assets/meal-4.png" mode="" @click="dot(4)"></img>
				</div> -->
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
			</div>
			<div class='content-bottom'>

				<div class='add-clean' @click="addClean" v-if='false'>
					<!-- <img class='clean-img' src='../assets/addClean.png'></img> -->

					<div class='add-clean-left'>
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
				</div>

				<div class='news' v-if='showPage== "basic"'>
					<div v-if="banner.length > 1 ">
						<swiper :options="swiperOptions"  ref='conSilder' class="swiper-container" v-if="banner.length > 0">
							<swiper-slide v-if='showPage== "basic"' :data-link='item.linkHtml' v-for="(item,index) in banner"  :key="index">
								<!-- <img src="../assets/newPeople.jpg" mode=""></img> -->
								<div class='showDot' >
									<img :src="item.picUrl" alt="" @click="linkTo" >
									<!-- <img :src="item.picUrl" alt="" @click="linkTo(item.linkHtml)" > -->
								</div>
							</swiper-slide>
							<!-- 常见的小圆点 -->
							<div class="swiper-pagination2" v-if="banner.length > 0 " v-for="(item,index) in banner" :key="index" slot="pagination"></div>
						</swiper>
					</div>
					<div v-if="banner.length ===1" >
						<swiper :options="swiperOptionBanner" class="swiper-container">
							<swiper-slide v-for="(item,index) in banner" :key="index">
								<!-- <img :src="item.picUrl" alt="" @click="linkTo(item.linkHtml)"> -->
								<img :src="item.picUrl" alt="" @click="linkTo" >
							</swiper-slide>

						</swiper>
					</div>
				</div>
                 <div class='recevice'>
					  <img class='left-img' src="../assets/recevieceCurtains.png" alt="" @click="recevieceCurtains">
					  <img class='right-img' src="../assets/receviceCapet.png"  @click="receviceCapet">
				 </div>
				<div class='cleaner-info'>
					<div class='tit'>
						关于清洁人
					</div>
					<div class='cleaner-top'>
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
					</div>
				</div>
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
				<div class='new-sign'><img src="../assets/new-sign.png" alt=""></div>
				<div class='clean-company'>
					清洁人（厦门）信息科技有限公司
				</div>
			</div>




		</div>
		<div class='frame' :style="frame" v-if='showFrame' @click="toExperience(item.linkHtml)">
			<div></div>
			<img class='framed-pic' :src="imgurl" alt="">
		</div>

		<div class='show-shadow' v-if='showFrame' @click="collageFram">

		</div>
		<showMoadea v-if='modelFlag' :cont='msg' @define='confirm' @remove='cancel' :showCancel='msgCancle'></showMoadea>
		<customer v-if='collageCurstomer' @priming='toCustomer' @define='toPhone'></customer>
			<Load v-if='isLoading'></Load>
		<showMoadel v-if='modelSign' :cont='"请更新版本"' @define='confirms' @remove='cancels' ></showMoadel>
		
		
		<div class='showTreaty' v-if='collageTreaty'>
			 <div class='treaty-title'>
				 服务协议和隐私政策
			 </div>
			 <div class='treaty-content'>
				 请你务必审慎阅读，充分理解“服务协议”和“隐私政策”各条款，包括但不限于:为了向你提供即时通讯、内容分享等服务，我们需要收集你的设备信息、操作日志等个人信息。你可以在
				 “设置”中查看、变更、删除个人信息并管理你的授权。你可阅读<span @click='collageAgreement'>《服务协议》</span>和<span @click='collagePricacy'>《隐私政策》</span>了解详细信息。如你同意，请点击“同意”开始接受我们的服务
			 </div>
			 <div  class='treaty-btn'>
				 <div class='btn-left' @click='signOut'>暂不使用</div>
				 <div class='btn-right' @click='agree'>同意</div>
			 </div>
		</div>
		<div class='treaty-show'  v-if='collageTreaty'>
			
		</div>
	</div>
</template>

<script>
	import * as axios from '../untils/ajax.js'
	import {
		swiper,
		swiperSlide
	} from "vue-awesome-swiper";
		import 'swiper/dist/css/swiper.css'
	import customer from './customerService.vue'
import getToken from '../untils/getToken.js'
import  serviceAgreement from'./serviceAgreement.vue'
import  privacyPolicy from'./privacyPolicy.vue'
	export default {
		name: 'app',
		data() {
			return {
				swiperCurrent: 0,
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
					msg:"您还未登录，是否要登录?"
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
					preventLinksPropagation: false,   // 阻止点击事件冒泡
					//滑动速度
					// speed: 1000,
					// delay:1000

				},
				graph: [],
				collageCurstomer: false,
				meadl1: {},
				meadl2: {},
				meadl3: {},
				meadl4: {},
				signIndex: 0,
				modelFlag:false,
			    signMsg:false,
				receviceFlag:false,
				reveviceType:null,
				msgCancle:true,
				firstOrderId:'',
				isLoading:false,
				modelSign:false,
				showAreement:false,
				showPricacy:false,
				collageTreaty:false,
				version:''
			}
		},
		computed:{
			swiper(){
				return this.$refs.conSilder.swiper
			},
			swiperOptions(){
				let that=this
				let options={
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
					click:function(){
						if(this.clickedSlide.dataset){
							// console.log(this.clickedSlide.dataset.link)
							// that.linkTo(this.clickedSlide.dataset.link)
							that.linkTo()
						}
					}
				},
				preventLinksPropagation: false,   // 阻止点击事件冒泡
				//滑动速度
				speed: 1000,
				// delay:1000
			 }
			 return options
			},
		},
		components: {
			swiper,
			swiperSlide,
			customer,
			serviceAgreement,
			privacyPolicy
		},
		props: ['showPage'],
		methods: {
			swiperChange: function(e) {
				console.log(e)
				let current = e.detail.current;
				// console.log(current, '轮播图')
				let that = this
				this.swiperCurrent = current
			},
			linkTo(e) {
				
				uni.navigateTo({
					url: "/pages/home/countMeal?id=" + '1'
				})
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
			toCustomer() {
				this.collageCurstomer = !this.collageCurstomer
			},
			toPhone() {
				this.collageCurstomer = !this.collageCurstomer
				window.location.href = 'tel://4008290037'

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
					this.$router.push({'name':'countMeal',params:id})
					return
				}
				console.log(id)
				let info={
					id:id
				}
				this.$router.push({'name':'monthly',params:id})
				// uni.navigateTo({
				// 	url: "/pages/home/monthly?id=" + id
				// })
				// })
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
			getBanner() {
				let parmas = new FormData()
				parmas.append('moduleType', this.moduleType)
				axios.post('/business/t-business-banner/load', parmas).then(res => {
					console.log(res)
					if (res.meta.success) {
						let data = res.data.map(item => {
							item.picUrl = this.configUrl + item.picUrl
							
						 //    if(plus.storage.setItem('firstTime')){
							// 	setTimeout(()=>{
							// 		plus.navigator.closeSplashscreen()
							// 		plus.navigator.setFullscreen(false)	
							// 	    plus.storage.setItem('showWebview','1')
							// 		plus.storage.setItem('firstTime','1')
							// 	},1000)
							// }else{
							// 	plus.navigator.closeSplashscreen()
							// 	plus.navigator.setFullscreen(false)	
							// 	plus.storage.setItem('showWebview','1')
							//     plus.storage.setItem('firstTime','1')
							// }
							return item
						})


						this.graph = data

                             console.log(this.graph)
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
			toExperience(e){
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
			toCurtain(){
				this.$router.push({name:'curtainClean'})
			},
			toCarpet(){
				this.$router.push({name:'carpetClean'})
			},
			toOffice(){
				this.$router.push({name:'officeClean'})
			},
			// toResidence(){
			// 	this.$router.push({name:'newResidence'})
			// },
			toMattress(){
				this.$router.push({name:'mattress'})
			},
			cancel() {
				this.modelFlag = false
			},
			confirm() {
				this.modelFlag = false
				if(this.reveviceType==1){
					uni.navigateTo({
						url: "/pages/home/monthly?id=" + 4
					})
					return
				}else if(this.reveviceType==2 || this.reveviceType==3 ){
					
					return
				}else{
					uni.navigateTo({
						url: "/pages/login/login"
					})
				}
				
			},
			recevieceCurtains(){
				if(!getToken.get('token')){
					this.modelFlag=true
					this.msg='您还未登录，是否要登录?'
					return
				}else if(this.reveviceType==2 || this.reveviceType==3 ){
					this.msgCancle=false
					this.modelFlag=true
					return
				}else if(this.reveviceType==1 ){
					// uni.navigateTo({
					// 	url: "/pages/home/monthly?id=" + 4
					// })
					this.msgCancle=true
					this.modelFlag=true
					return
				}
				
		     if(this.receviceFlag==true){
				 uni.navigateTo({
				 	url: "/pages/home/curtainsClean"
				 })
				
				 
			 }	
			},
			receviceCapet(){
				console.log(this.reveviceType)
				if(!getToken.get('token')){
					this.msg='您还未登录，是否要登录?'
					this.modelFlag=true
					return
				}else if(this.reveviceType==2 || this.reveviceType==3 ){
					this.msgCancle=false
					this.modelFlag=true
					return
				}else if(this.reveviceType==1 ){
					// uni.navigateTo({
					// 	url: "/pages/home/monthly?id=" + 4
					// })
					this.msgCancle=true
					this.modelFlag=true
					return
				}
				if(this.receviceFlag==true){
					uni.navigateTo({
						url: "/pages/home/carpetCleaning"
					})
				}
				
			},
			getAd(){
				axios.post('/business/t-business-advert/isCanGetGifts', {}).then(res => {
						if (res.meta.success) {
						   // this.modelFlag=true
						   this.msg=res.data.msg
						   this.receviceFlag=true
							// this.productList = list
						}else{
							
							// this.modelFlag=true
							this.reveviceType=res.data.type
							this.msg=res.data.msg
						} 
					})
				},
			 appClinent(){
				 let params = new FormData()
				 params.append('type', 1)
				 axios.post(
				 	'/sys/t-sys-app-user/putLatestModule',params
				 ).then(res => {
				 	if (res.meta.success) {
				 		
				 
				 	} else {
				 		
				 	}
				 })
				 // this.$router.push({
				 // 	name: 'serverIndex'
				 // })
			 },
			 getFirstOrder(e){
				 // this.isLoading=true
				 // axios.post('/office/t-office-order/isFirstExperienceOrder', {}).then(res => {
				             
				 // 		      this.firstOrderId=res.data
					// 		  console.log(87888)
					// 		  if(this.firstOrderId.length>0){
					// 			  uni.navigateTo({
					// 			  	url: "../order/orderFrequency?orderId=" + this.firstOrderId
					// 			  })
					// 		  }else{
					// 			  if(e.length>0){
					// 				  uni.navigateTo({
					// 				  	url: e
					// 				  })
					// 			  }
					// 		  }
				 // 		        this.isLoading=false
				 // 	})
			 },
			 confirms(){
				plus.runtime.openURL('https://boss.jieren365.cn/qjrapi/appInstall.html');
				 this.modelSign=false
				plus.runtime.quit()
			 },
			 cancels(){
			     plus.runtime.quit()
			 },
			 collageAgreement(){
				  this.showAreement=!this.showAreement
			 },
			 collagePricacy(){
				 this.showPricacy= !this.showPricacy
			},
		    signOut(){
					 plus.runtime.quit() //安卓退出应用
		     },
			 agree(){
				  plus.storage.setItem('upgradings','1')
				   this.collageTreaty=!this.collageTreaty
				   document.body.style.overflow = '' // 出现滚动条
				   document.body.removeEventListener('touchmove', this.bodyScroll, { passive: false });
			 }
		},
		created() {
			// this.uid= this.getQuery('uid')
	
		
		},
		mounted() {
			
	// 		if(getToken.get('token').length!=0){
	// 			this.getAd()
	// 			this.appClinent()
	// 	    }
	
			this.getAdvertisement()
			this.getProductList()
			this.getfindAdvertList()
			this.getBanner()
			// console.log('wefrsf')
			// console.log(plus.runtime.version)
			var that=this
			var u = navigator.userAgent;
			var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
		
			   plus.runtime.getProperty(plus.runtime.appid, function(widgetInfo) {			 
				 var versionKist=widgetInfo.version.split('.')
				  var  version= Number(versionKist[0].toString()+versionKist[1].toString()+versionKist[2].toString())
				  that.version=version
				   if(version<112){
					    that.modelSign=true
				   }
				  
				  if (isAndroid) {    
					     
				          if(!plus.storage.getItem('upgradings')){
				   						   	that.collageTreaty=true
				   						   document.body.style.overflow = 'hidden'
				   						   document.body.addEventListener('touchmove', that.bodyScroll, { passive: false });
				   			}
			        }
				   // var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
				  
			   }) 
			
			   
			  
			
		  this.$nextTick(function () {
						   // plus.storage.setItem('showWebview','1')
						    
				 
		  })
		},
		watch:{
			
			
		}

	}
</script>

<style scoped>
	* {
		padding: 0;
		margin: 0;
		font-family: 'Microsoft YaHei'
	}

	body {
		max-width: 7.5rem;
	}

	#app {
		max-width: 7.5rem;
		display: flex;
		align-items: center;
	}
  .showTop{
	  position: absolute;
	  top:0;
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
		background: #fff;
		display: flex;
		flex-direction: column;
		align-items: center;
		padding-bottom: 1.1rem;
	}

	.content .banner {
		margin: 0 auto;
		margin-top: 1.45rem;
		width: 6.94rem;
		height: 3.35rem;
		position: relative;
		border-radius: 0.20rem;
		overflow: hidden !important;
		/* z-index: 10; */
	}

	.banner .swiper {
		width: 6.94rem !important;
		height: 3.35rem !important;
		border-radius: 0.2rem !important;
		overflow: hidden !important;
		position: relative;
	}

	.banner img {
		width: 100% !important;
		height: 100% !important;
		border-radius: 0.2rem !important;
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
     .recevice{
		 	width: 6.94rem;
			    height: 1.94rem;
		 	 margin: 0.3rem auto 0 auto;
		 	overflow: hidden;
	 }
	 .recevice img{
		   width: 3.36rem;
		   height: 1.94rem;
	 }
	 .recevice .left-img{
		  float: left;
	 }
	 .recevice .right-img{
	 		  float: right;
	 }
	.cleaner-info {
		height: 100%;
		width: 6.94rem;
		margin-top: 0.3rem;
		font-size: 0.32rem;
		padding: 0 0.28rem;
		padding-bottom: 0.20rem;
		box-sizing: content-box;

	}

	.cleaner-info .tit {
		text-align: center;
		margin-bottom: 0.30rem;
		font-weight: 650;
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
		background: #f6f5f5;
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
.treaty-show{
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
	.showTreaty{
		  position: fixed;
		   left: 50%;
		   top: 25%;
		   /* height: 5rem; */
		   width: 5.5rem;
		   border-radius: 0.2rem;
	        font-size: 0.28rem;
	        background: #fff;
			transform: translateX(-50%);
			-o-transform:  translateX(-50%);
			-moz-transform:  translateX(-50%);
		    -webkit-transform:  translateX(-50%);
			z-index: 2001;
	}
		.showTreaty .treaty-title{
			padding-top: 0.3rem;
		  font-size: 0.28rem;
		  color: #000;
		  width: 100%;
		  text-align: center;
	}
	.showTreaty  .treaty-content{
		  padding: 0.2rem  0.4rem  ;
	}
	.showTreaty  .treaty-content span{
		color:#70bcf3;
		font-size: 0.22rem;
	}
	.treaty-btn {
		
		 width: 100%;
		 display: flex;
		  align-items: center;
		 justify-content: space-between;
	}
	.treaty-btn .btn-left{
		  font-size: 0.28rem;
		  color: #000;
		  height: 0.65rem;
		  width: 50%;
		  text-align: center;
		  line-height: 0.65rem;
	}
	.treaty-btn .btn-right{
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
		background: rgba(0, 0, 0, 0.1) !important;
		width: 0.14rem;
		height: 0.14rem;
	}

	.swiper-pagination-bullet-active {
		background: #fff !important;
	}

	.banner .swiper-container {
		width: 6.94rem;
		height: 3.35rem;
		border-radius: 0.20rem;
		overflow: hidden !important;
	}

	.banner .swiper-pagination-fraction,
	.banner .swiper-pagination-custom,
	.banner .swiper-container-horizontal>.swiper-pagination-bullets {
		bottom: -0.05rem !important;

	}

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
	.news .swiper-pagination2.swiper-pagination-bullets{
		height: 0.1rem;
	}
	.tit-img{
		width: 0.3rem;
		height: 0.3rem;
	}
</style>
