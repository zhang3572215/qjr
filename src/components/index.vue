<template>
	<!-- :style='{"height":officeHeight}' -->
	<div class='container-top'>
		<home :showPage='PageCur' v-if='PageCur === "basic"'></home>
		<!-- <home  v-if='PageCur === "basic"' ></home> -->
		<currentList v-if='PageCur === "car"'></currentList>
		<shop v-if='PageCur === "shopping"'></shop>
		<!-- <myNew v-if='PageCur === "like"'></myNew> -->
		<notice v-if='PageCur === "like"'></notice>
		<my v-if='PageCur === "my"' :showPage='PageCur'></my>
		<!-- <my  :showPage='PageCur'></my> -->
		<div class='tabs'>

			<div class='tabs-nav' :class='[PageCur == "basic"?"flag-color":""]' @click="collage" data-cur="basic">
				<!-- <img :src="'/static/tabbar/basics' + [PageCur=='basics'?'_cur':''] + '.png'"></img> -->
				<img :src='"../assets/home"+[PageCur == "basic"?"-act":""] +".png"'> </img>
				<div>首页</div>
			</div>
			<div class='tabs-nav' :class='[PageCur == "car"?"flag-color":""]' @click="collage" data-cur="car">
				<img :src='"../assets/jiu" +[PageCur == "car"?"-act":""] +".png"'> </img>
				<div>当前订单</div>
			</div>
			<!--   <div class='tabs-nav'   @click="collage" data-cur="new">
		   			   <img :src='"../../static/cate"+[PageCur == "cate"?"-act":""]+".png"'> </img>
		   			   <div>消息</div>
		   </div> -->
			<div class='tabs-nav' :class='[PageCur == "shopping"?"flag-color":""]' @click="collage" data-cur="shopping">
				<img :src='"../assets/shoppingMall"+[PageCur == "shopping"?"-act":""]+".png"'> </img>
				<div>商城</div>
			</div>
			<div class='tabs-nav tabs-notice' :class='[PageCur == "like"?"flag-color":""]' @click="collage" data-cur="like">
				<img :src='"../assets/like"+[PageCur == "like"?"-act":""]+".png"'> </img>
				<div>消息</div>
				<div class='notice-num' v-if='noticeNum'>
					{{noticeNum}}
				</div>

			</div>
			<div class='tabs-nav' :class='[PageCur == "my"?"flag-color":""]' @click="collage" data-cur="my">
				<img :src='"../assets/my"+[PageCur == "my"?"-act":""]+".png"'> </img>
				<div>我的</div>
			</div>
		</div>

	</div>

</template>

<script>
	import VueAMap from 'vue-amap';
	import * as axios from '../untils/ajax.js'
	import home from './home.vue'
	import currentList from './currentList.vue'
	import myNew from './myNew.vue'
	import my from './my'
	import shop from './shop/shoppingMall.vue'
	import notice from './notice.vue'
	import {
		mapGetters,
		mapState,
		mapActions
	} from 'vuex'
	import wx from 'weixin-js-sdk'
	export default {
		data() {
			return {
				PageCur: 'basic',
				historyNum: 1,
				historyNumPull: false,
				officeHeight: 0,
				noticeNum: '',
				wxInfo: ''

			}
		},
		components: {
			currentList,
			myNew,
			my,
			home,
			shop,
			notice
		},
		computed: {
			...mapGetters(['todps', 'showDesCont', 'showReturnRefresh', 'showClientUnread']),
			...mapState(['category'])
		},

		methods: {
			...mapActions(['addImgs', 'promotionHistory', 'promotionHistoryPull', 'showCates']),
			collage: function(e) {
				// e.currentTarget.dataset.cur

				this.PageCur = e.currentTarget.dataset.cur
				let flag = this.isToken()
				if (this.PageCur == 'car') {
					if (!flag) {

						window.localStorage.setItem('url', 'currentList')
					}

					window.document.title = '当前订单'

				} else if (this.PageCur == 'like') {
					window.document.title = '消息'
					if (!flag) {
						window.localStorage.setItem('url', 'notice')
					}
				} else if (this.PageCur == 'my') {
					window.document.title = '我的'
					if (!flag) {
						window.localStorage.setItem('url', 'my')
					}
				} else if (this.PageCur == 'shopping') {
					window.document.title = '商城'
				} else {
					window.document.title = '清洁人'
				}
				// this.showCates(this.PageCur)
			},
			isToken() {
				// 判断在微信浏览器上有无token

				if (window.localStorage.getItem('wxBrowser') && window.localStorage.getItem('token') && window.localStorage.getItem(
						'token') != 'null') {
					return true
				} else {
					return false
				}
			},
			banner() {
				axios.post('/business/t-business-banner/load', {
					moduleType: 1
				}).then(res => {
					console.log(res)
					if (res.meta.success) {
						this.addImgs(['1'])
					} else {
						toast.fail('请求出错')
					}
				})
			},
			// 未读数量(客户端)
			unReadNumByCus() {
				axios.post('/business/t-business-notice-user/unReadNumByCus').then(res => {
					if (res.meta.success) {
						this.noticeNum = res.data
					}
				})
			},
			getShare() { //获取要分享的内容
				let params = new FormData
				params.append('shareType', 2)
				axios.post('/business/t-business-advert/findAdvertShare', params).then(res => {
					if (res.meta.success) {

						this.shareInfo = res.data
						this.findAdvertShareConfig()
					}
				})
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
						'onMenuShareAppMessage',
						'hideMenuItems'
					]
				})
				let imgUrl = that.configUrl + that.shareInfo.picUrl
				wx.ready(function() {
					wx.hideMenuItems({
						menuList: ['menuItem:share:qq', "menuItem:share:email", 'menuItem:share:qq', 'menuItem:copyUrl','menuItem:openWithSafari','menuItem:share:QZone'] // 要隐藏的菜单项，只能隐藏“传播类”和“保护类”按钮，所有menu项见附录3
					})
					wx.onMenuShareAppMessage({ //分享微信好友
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
					//分享到微信朋友圈
					wx.onMenuShareTimeline({
						title: "清洁人", // 分享标题
						link: that.getHttpUrl, // 分享链接
						imgUrl:'https://boss.jieren365.cn/orig/qjr_icon.png', // 分享图标
						success: function() {
							// 用户确认分享后执行的回调函数
						},
						cancel: function() {
							// 用户取消分享后执行的回调函数
						}

					})
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
						let data = JSON.stringify(res.data)
						this.wxInfo = res.data
						this.toShareWx()
					}
				})
			},


			getLocation() {
				//         VueAMap.plugin('VueAMap.Geolocation', function () {
				//           var geolocation = new VueAMap.Geolocation({
				//             // 是否使用高精度定位，默认：true
				//             enableHighAccuracy: true,
				//             // 设置定位超时时间，默认：无穷大
				//             timeout: 10000,
				//           })

				//           geolocation.getCurrentPosition()
				//           VueAMap.event.addListener(geolocation, 'complete', onComplete)
				//           VueAMap.event.addListener(geolocation, 'error', onError)

				//           function onComplete(data) {
				//             // data是具体的定位信息
				//             console.log('定位成功信息：', data)
				// 			alert(data.formattedAddress)
				//           }

				//           function onError(data) {
				//             // 定位出错
				//             console.log('定位失败错误：', data)
				//           }
				//         })
			}

		},
		created() {
   
			if (window.localStorage.getItem('wxBrowser')) {
				this.getShare()
			}
			if (window.localStorage.getItem('token') != 'null' && window.localStorage.getItem('token')) {
				this.unReadNumByCus() //未读数量(客户端)
			}

			// plus.cache.clear( function () {
			// 								alert('清除成功')
			// 							});	
			let that = this
			// navigator.geolocation.getCurrentPosition(
			//    　　//locationSuccess 获取成功的话
			//    　　function(position) {
			//    　　　　that.getLongitude = position.coords.longitude;  //position就是我们通过api获取的信息，而我们想获取的经纬度就在coords下，随后将经纬度分别赋值给外部data设定好的变量
			//    　　　　that.getLatitude = position.coords.latitude;    //记住如果这里直接写this可能会导致找不到外部的变量而报错，所以提前设置一下this的指向
			//          console.log(position)
			//    　　　　alert(JSON.stringify(position))　　　　　　　　　　　　　　 //弹出经度测试
			//    　　},
			//    　　//locationError  获取失败的话
			//    　　function(error) {
			//    　　　　var errorType = ['您拒绝共享位置信息', '获取不到位置信息', '获取位置信息超时'];
			//    　　　　alert(errorType[error.code - 1]);
			//    　　}
			//    );

			// plus.storage.setItem('isClient', '1') //标志进入客户端！
			this.officeHeight = (document.documentElement.offsetHeight || document.body.offsetHeight) + 'px'

			// history.pushState(null, null, document.URL);
			//        window.addEventListener('popstate', function () {
			//            history.pushState(null, null, document.URL);
			// });
			history.pushState(null, null, document.URL); //首页加载时候先置空

			window.addEventListener('popstate', function(e) { //后退事件置空
				let url = document.URL.split('/')[document.URL.split('/').length - 1]
				if (document.URL.split('/')[document.URL.split('/').length - 1].includes('index')) { //在首页时候禁止返回
					history.pushState(null, null, document.URL);
				}
			});
		},
		mounted(){
			
		},
		beforeRouteLeave(to, from, next) {
			this.scrollTop = document.documentElement.scrollTop || document.body.scrollTop
			next()
		},
		beforeRouteEnter(to, from, next) {
			next(vm => {
				document.body.scrollTop = vm.scrollTop
			})
		},

		watch: {

			todps: {
				handler(newval, oldval) {
					// console.log(newval)
				},
				immediate: true
			},
			category: {
				handler(newval, oldval) {
					this.PageCur = newval
				},
				immediate: true
			},
			historyNum(newval, oldval) {
				this.promotionHistory(newval)
			},
			historyNumPull(newval, oldval) {
				this.promotionHistoryPull(newval)
			},
			showReturnRefresh() {
				if (window.localStorage.getItem('token') != 'null') {
					this.unReadNumByCus() //未读数量(客户端)
				}
			},
			showClientUnread() {
				if (window.localStorage.getItem('token') != 'null' && window.localStorage.getItem('token')) {
					this.unReadNumByCus() //未读数量(客户端)
				}
			}
		}

	}
</script>

<style scoped>
	.container-top {
		/* position: absolute;
		top: 0; */
		height: 100vh;
		width: 100%;
	}

	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		overflow: hidden;
		width: 100%;
	}

	.tabs {
		position: fixed;
		bottom: 0;
		z-index: 1000;
		height: 1rem;
		width: 100%;
		/* line-height: 1rem; */
		/* display: flex; */
		/* display:-webkit-flex; */
		/* justify-content: center; */
		/* align-items: center; */
		/* border-top: 1px solid #C8C7CC; */
		background: #fff;
		color: #8b8b8b;

	}

	.tabs .tabs-nav {
		height: 100%;
		width: 20%;
		/* display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center; */
		text-align: center;
		float: left;
		font-size: 0.24rem;
	}

	.tabs .tabs-nav img {
		display: block;
		height: 0.40rem;
		width: 0.40rem;
		margin: 0.15rem auto 0.06rem auto;

	}

	.tabs .tabs-nav.tabs-notice {
		position: relative;
	}

	.tabs-nav.tabs-notice .notice-num {
		color: #fff;
		min-width: 0.15rem;
		padding: 0.08rem;
		height: 0.15rem;
		line-height: 0.15rem;
		font-size: 0.22rem;
		border-radius: 0.15rem;
		background: #CE3C39;
		text-align: center;
		position: absolute;
		top: 0.05rem;
		right: 0.1rem;
	}

	.flag-color {
		color: #1095d8;
	}
</style>
