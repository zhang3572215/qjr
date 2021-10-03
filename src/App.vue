<template>
	<div id='app'>
		<!-- 　<transition :name="transitionName"> -->
		<navigation>
			<router-view class="Router"></router-view>
		</navigation>
		<!-- </transition> -->
	</div>

</template>
<!-- <script type="text/javascript" src="https://js.cdn.aliyun.dcloud.net.cn/dev/uni-app/uni.webview.1.5.2.js"></script> -->
<!-- <meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=no,viewport-fit=cover"/> -->
<script>
	import * as axios from './untils/ajax.js'
	import getToken from './untils/getToken.js'
	import {
		mapGetters,
		mapState,
		mapActions
	} from 'vuex'

	// import axios from '@/node_modules/axios/index.js'
	export default {
		name: 'app',
		data() {
			return {
				transitionName: 'slide-right', // 默认动态路由变化为slide-right
				type: 4,
				list: [],
				time: null,
				pageNo: 1,
				pageSize: 8,
				total: 0,
				top: 0,
				pullUpState: 0, // 1:上拉加载更多, 2:加载中……, 3:我是有底线的
				isLoading: true, // 是否正在加载
				pullUpInfo: {
					moreText: '上拉加载更多',
					loadingText: '数据加载中...',
					noMoreText: '我是有底线的'
				},
				startX: 0,
				startY: 0,
				endX: 0,
				endY: 0
			}
		},
		methods: {
			...mapActions(['addShowDes', 'addShowSignId', 'addDesCont']),
			collage(e) {
				// console.log(e)
				this.type = e
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
				// 变量scrollTop是滚动条滚动时，距离顶部的距离
				let scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop
				// 变量scrollHeight是滚动条的总高度
				let scrollHeight = document.documentElement.clientHeight || document.body.scrollHeight
				// 滚动条到底部的条件
				if (scrollTop + scrollHeight >= innerHeight) {
					if (this.pullUpState !== 3 && !this.isLoading) {
						this.infiniteLoad()
					}
					// console.log('距顶部' + scrollTop + '滚动条总高度' + scrollHeight + '内容高度' + innerHeight)
				}
			},
			infiniteLoad() {
				this.pullUpState = 2
				this.isLoading = true
				this.pageNo = this.pageNo + 1
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


		},
		beforeCreate: function() {

		},
		created: function() {
			// this.$getOther.getUrl(str)
			var url = window.location.href; /* 获取完整URL */
			// alert(url.includes('receive')); /* http://127.0.0.1:8020/Test/index.html#test?name=test */

			let that = this

			// 判断浏览器是否为微信浏览器
			var ua = window.navigator.userAgent.toLowerCase();
			if (url.includes('receive') && ua.indexOf('micromessenger') < 0) { //非微信浏览器,扫码，直接调用微信微信登录，这样可以显示请在微信客户端打开的页面
				// this.$getOther.getWxURl()
				return
			}
			if (ua.indexOf('micromessenger') > -1) {
				// 微信浏览萨上面微信登录保存token
				let url = window.location.href
				var arr = url.split("?")
				let tokenArr = arr[1].split('=')

				if (tokenArr[0] == 'token') {
					let token = tokenArr[1].slice(0, -2)
					window.localStorage.setItem('token', token) //保存token
				}

				window.localStorage.setItem('wxBrowser', 'true') //作为判断微信浏览器依据
				if ((window.localStorage.getItem('token') == 'null') && tokenArr[0] != 'user' && tokenArr[0] && !this.$getOther.getUrlInfo(
						'unionId')) {
					// alert(this.$getOther.getUrlInfo('unionId'))
					// alert(url)
					// alert('要执行静默登录')
					//微信静默登录
					this.$getOther.getWxURl()

					return
				}
				let urlFlag = window.localStorage.getItem('url')
				if (!this.$getOther.getUrlInfo('unionId')) { //判断不是从登录页面授权进入的
					if (urlFlag == 'monthly') {
						this.$router.push('monthly') //定制页面
					} else if (urlFlag == 'countMeal') {
						this.$router.push('countMeal') //单次购买页面
					} else if (urlFlag == 'carpetClean') {
						//地毯页面
						let info = {
							id: 3
						}
						this.$router.push({
							'name': 'carpetClean',
							params: info
						})
					 } else if (urlFlag == 'exclusive') {
						this.$router.push('exclusive') //定制页面240平以上的
					} else if (urlFlag == 'currentList') {

						this.addDesCont('car') //当前订单
						this.$router.push({
							name: 'index'
						})
					} else if (urlFlag == 'notice') {
						this.addDesCont('like') //消息页面
						this.$router.push({
							name: 'index'
						})
					} else if (urlFlag == 'my') {
						this.addDesCont('my') //我的页面
						this.$router.push({
							name: 'index'
						})
					} else if (urlFlag == 'goodsBuy') { //商品购买页
						let ids = window.localStorage.getItem('goodsId')
						let infos = {
							id: ids
						}
						this.$router.push({
							name: 'goodsBuy',
							params: infos
						})
					}else if (urlFlag == 'shoppCart') { //购物车页面
						this.$router.push('shoppCart')
					} else if (urlFlag == 'firstCountMeal') {
						this.$router.push('firstCountMeal')
					}else {
                        this.$router.push({
                        	name: 'index'
                        })
                    }
					if (urlFlag) {
						window.localStorage.removeItem('url')
						return
					}

				}


			}


			// this.$router.push('monthlyPayment')
			// this.$router.push('signIn')
			//  return
			if (getToken.get('name') == 'invitationRegister') {
				var phones = getToken.get('phone')
				window.document.title = '清洁人注册邀请' 
				this.$router.push({
					name: 'invitationRegister',
					params: {
						phone: phones
					}
				}) 
				return
			} else if (getToken.get('name') == 'currentList') {
				this.addDesCont('car')
				this.$router.push({
					name: 'index'
				})
				return
			} else if (getToken.get('name') == 'task' && getToken.get('date') != 'tomorrow') {
				this.addShowDes('task')
				this.$router.push({
					name: 'serverIndex'
				})
				return
			} else if (getToken.get('name') == 'historyTask') {
				let news = 'news'
				this.$router.push({
					name: 'historyTask',
					params: {
						new: news                 
					}
				})
				return
			} else if (getToken.get('name') == 'task' && getToken.get('date') == 'tomorrow') {
				this.addShowDes('task')
				this.addShowSignId(2)
				this.$router.push({
					name: 'serverIndex'
				})
				return
			} else if (getToken.get('name') == 'myServe') {
				this.$router.push({
					name: 'index'
				})
				setTimeout(() => {
					that.addShowDes('my')
					that.$router.push({
						name: 'serverIndex'
					})
				}, 3000)

				return
			} else if (getToken.get('name') == 'bindPhone') {
				this.$router.push({
					name: 'bindPhone'
				})
				return
			}

			// this.$router.push({
			// 	 name:'washingIntroduction'
			// })
			// return

			let routeDes = getToken.get('route')

			let signId = getToken.get('signId')
			if (routeDes == 'task') {
				this.addShowDes('task')
				this.addShowSignId(signId)
				this.$router.push({
					name: 'serverIndex'
				})
			} else {
				if (ua.indexOf('micromessenger') < 0) {
					// this.$router.push({
					// 	name: 'index'
					// })
				}
				// 
			}
			//            this.$router.push({
			//            	name: 'siteComplaintList'
			//            })
			// return



		},
		mounted() {


			// if (document.URL.split('/')[document.URL.split('/').length - 1][0]=='?') { //在首页时候禁止返回
			// 	    console.log(document.URL.split('/')[document.URL.split('/').length - 1])
			// 		history.pushState(null, null, document.URL);
			// }	
			// window.addEventListener('popstate', function(e) { //后退事件置空
			// 	let url = document.URL.split('/')[document.URL.split('/').length - 1]
			// 	if (document.URL.split('/')[document.URL.split('/').length - 1][0]=='?') { //在首页时候禁止返回
			// 		history.pushState(null, null, document.URL);
			// 	}
			// 	// if (document.URL.split('/')[document.URL.split('/').length - 1].includes('index')) { //在首页时候禁止返回
			// 	// 	history.pushState(null, null, document.URL);
			// 	// }
			// });

			// 关闭浏览器促发，避免url历史记录
			window.addEventListener('beforeunload', e => {
				window.location.replace("https://www.runoob.com")
			});


		},
		destroyed() {
			window.localStorage.setItem('oo', 5555)
			// history.back();

		},
		watch: {
			// '$route'(to,from) {


			// 	let isBack = this.$router.isBack // 监听路由变化时的状态为前进还是后退
			// 	console.log(isBack)
			// 	if (isBack) {
			// 		this.transitionName = 'slide-right'
			// 	} else {
			// 		this.transitionName = 'slide-left'
			// 	}
			// 	this.$router.isBack = false

			// }
		}

	}
</script>

<style>
	body {
		background-color: #f8f8fa !important;
		/* font-size: 28rem; */
		color: #333333;
		font-family: Helvetica Neue, Helvetica, sans-serif;
		width: 100%;

		margin: 0;
	}

	html,
	body {
		width: 100%;
		height: 100%;
		/* overflow: scroll; */
		-webkit-touch-callout: none;
		/*系统默认菜单被禁用*/
		-webkit-user-select: none;
		/*webkit浏览器*/
		-khtml-user-select: none;
		/*早起浏览器*/
		-moz-user-select: none;
		/*火狐浏览器*/
		-ms-user-select: none;
		/*IE浏览器*/
		user-select: none;
		/*用户是否能够选中文本*/
	}

	html::-webkit-scrollbar,
	body::-webkit-scrollbar {
		width: 0px !important;
		height: 0px !important;
	}

	#app {
		height: 100%;
		width: 100%;
	}

	.head-show {

		height: 1.42rem;
		width: 100%;
	}

	textarea {
		/* color: inherit; */
		font: none
	}

	/* 	.Router {
	 position: absolute;
	 width: 100%;
     height: 100vh;
	
	 transition: all .5s;
	 top: 0px;
	}
	.slide-left-enter, .slide-right-leave-to {
	
	  transform: translateX(100%)
	}
	
	.slide-left-leave-to, .slide-right-enter {
	  
	  transform: translateX(-100%)
	}
	
	.slide-left-enter-active, .slide-left-leave-active, .slide-right-enter-active, .slide-right-leave-active {
	  transition: 0.5s;
	  position: absolute;
	   width: 100%;
	  top:0px;
	} */
</style>
