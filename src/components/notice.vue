<template>
	<div>
		<div class='head'  v-if='!showWx'>
			<div class='head-left'>
				<!-- <img src="./img/left-black.png" mode=""></img>
				<span>返回</span> -->
			</div>
			<div class='head-center'>
				我的消息
			</div>
			<div class='head-right'>

			</div>
		</div>
		<div class='head-show' v-if='!showWx'>
		</div>
		<div class='info-head' v-if='showNotification'>
			<div class='info-title'>允许消息推送</div>
			<div class='info-tips'>
				当有促销活动、发货通知、运营消息，可立即获取通知。
			</div>
			<div class='push-btn' @click="toPush">
				消息推送
			</div>
		</div>
		<div class='info-list' v-for='(item,index) in list' :key="index" @click='toDynamic(item.msgType)'>
			<img src="../assets/notice.png" alt="" v-if='item.msgType==1'>
			<img src="../assets/dynamic.png" alt="" v-if='item.msgType==2'>
			<img src="../assets/shopping-notice.png" alt="" v-if='item.msgType==3'>
			<div>
				<div class='list-title' v-if='item.msgType==1'>消息通知</div>
				<div class='list-title' v-if='item.msgType==2'>服务通知</div>
				<div class='list-title' v-if='item.msgType==3'>商城通知</div>
				<div class='list-news'>{{item.content}}</div>
			</div>
			<div class='new-dot' v-if='item.isRead==2'></div>
		</div>
		<!-- 	<div class='info-list' @click='toDynamic'>
			<img src="../assets/dynamic.png" alt="">
			<div>
				<div class='list-title'>服务通知</div>
				<div class='list-news'>亲爱的路飞，恭喜你成功升级为清洁人会员，原先</div>
			</div>
			 <div class='new-dot' ></div>
		</div>
		<div class='info-list' @click='toDynamic'>
			<img src="../assets/shopping-notice.png" alt="">
			<div>
				<div class='list-title'>商城通知</div>
				<div class='list-news'>亲爱的路飞，恭喜你成功升级为清洁人会员，原先</div>
			</div>
			 <div class='new-dot' ></div>
		</div> -->
		<Load v-if='isLoad'></Load>
	</div>
</template>

<script>
	import * as axios from '../untils/ajax.js'
	import {
		mapGetters
	} from 'vuex'
	export default {
		data() {
			return {
				list: [],
				isLoad: false,
				interval:null,
				showNotification:false,
				showWx:false
			}
		},
		computed: {
			...mapGetters(['showReturnRefresh'])
		},
		methods: {
			toDynamic(e) {
				let info = {
					type: e
				}

				this.$router.push({
					'name': 'shopDynamic',
					params: info
				})
			},
			toPush() {
				let that=this
				// 是否开启允许通知  
				if (plus.os.name == 'Android') {
					var main = plus.android.runtimeMainActivity();
					var pkName = main.getPackageName();
					var NotificationManagerCompat = plus.android.importClass("android.support.v4.app.NotificationManagerCompat");
					var packageNames = NotificationManagerCompat.from(main);
					var uid = main.getApplicationInfo().plusGetAttribute("uid");

					var Intent = plus.android.importClass('android.content.Intent');
					var Build = plus.android.importClass("android.os.Build");
					//android 8.0引导  
					// alert(Build.VERSION.SDK_INT)
					if (Build.VERSION.SDK_INT >= 26) {
						var intent = new Intent('android.settings.APP_NOTIFICATION_SETTINGS');
						intent.putExtra('android.provider.extra.APP_PACKAGE', pkName);
					} else if (Build.VERSION.SDK_INT >= 21) { //android 5.0-7.0  
						var intent = new Intent('android.settings.APP_NOTIFICATION_SETTINGS');
						intent.putExtra("app_package", pkName);
						intent.putExtra("app_uid", uid);
					} else { //(<21)其他--跳转到该应用管理的详情页  
						var Settings = plus.android.importClass("android.provider.Settings");
						var Uri = plus.android.importClass("android.net.Uri");
						var intent = new Intent();
						intent.setAction(Settings.ACTION_APPLICATION_DETAILS_SETTINGS);
						var uri = Uri.fromParts("package", main.getPackageName(), null);
						intent.setData(uri);
					}
					// 跳转到该应用的系统通知设置页  
					 main.startActivity(intent);
                     this.interval= setInterval(() => {
						 that.notificationAuthority()
					 },400)
					 
					 
					// var Intent = plus.android.importClass('android.content.Intent');
					// var intent = new Intent('android.settings.APP_NOTIFICATION_SETTINGS'); //可设置表中所有Action字段  
					// intent.putExtra('android.provider.extra.APP_PACKAGE', pkName);
					// main.startActivity(intent);

				} else if (plus.os.name == 'iOS') {
					var UIApplication = plus.ios.import("UIApplication");
					var app = UIApplication.sharedApplication();
					var enabledTypes = 0;
					if (app.currentUserNotificationSettings) {
						var settings = app.currentUserNotificationSettings();
						enabledTypes = settings.plusGetAttribute("types");
					} else {
						//针对低版本ios系统  
						enabledTypes = app.enabledRemoteNotificationTypes();
					}
					plus.ios.deleteObject(app);
					var UIApplication = plus.ios.import("UIApplication");
					var NSURL = plus.ios.import("NSURL");
					var setting = NSURL.URLWithString("app-settings:");
					var application = UIApplication.sharedApplication();
					application.openURL(setting);
					plus.ios.deleteObject(setting);
					plus.ios.deleteObject(application);
					this.interval= setInterval(() => {
						that.notificationAuthority()						
					},400)

				}


			},
			getUserNoticeList() {
				this.isLoad = true
				axios.post('/business/t-business-notice-user/getUserNoticeList').then(res => {
					this.isLoad = false
					if (res.meta.success) {
						this.list = res.data
					}
				})
			},
			// 判断安卓或ios是否开启通知权限
			notificationAuthority() {
				let that=this
				if(this.isAndroid_ios()){
				//安卓
				 var main = plus.android.runtimeMainActivity();
				 var pkName = main.getPackageName();
				 var NotificationManagerCompat = plus.android.importClass("android.support.v4.app.NotificationManagerCompat");
				 var packageNames = NotificationManagerCompat.from(main);
				 
				 if (packageNames.areNotificationsEnabled()) {
					// alert('已开启通知权限')
					 this.showNotification=false//关闭通知权限按钮
					if(that.interval){
						 clearInterval(that.interval);
					}
				 } else {
					   // alert('未启通知权限')
					   this.showNotification=true//显示通知权限按钮
					
				 	// uni.showModal({
				 	// 	title: '提示',
				 	// 	content: '请先打开APP通知权限',
				 	// 	showCancel: false,
				 	// 	success: function(res) {
				 	// 		if (res.confirm) {
				 	// 			var Intent = plus.android.importClass('android.content.Intent');
				 	// 			var intent = new Intent('android.settings.APP_NOTIFICATION_SETTINGS'); //可设置表中所有Action字段  
				 	// 			intent.putExtra('android.provider.extra.APP_PACKAGE', pkName);
				 	// 			main.startActivity(intent);
				 	// 		}
				 	// 	}
				 	// });
				 }
				}else{
				//ios
				   var UIApplication = plus.ios.import("UIApplication");  
				   var app = UIApplication.sharedApplication();  
				   var enabledTypes  = 0;  
				   if (app.currentUserNotificationSettings) {  
				       var settings = app.currentUserNotificationSettings();  
				       enabledTypes = settings.plusGetAttribute("types");  
				   } else {  
				       //针对低版本ios系统  
				       enabledTypes = app.enabledRemoteNotificationTypes();  
				   }  
				   plus.ios.deleteObject(app);  
				   if ( 0 == enabledTypes ) {  
					    this.showNotification=true
					     // alert('未启通知权限')
				       // uni.showModal({  
				       //     title: '提示',  
				       //     content: '请先打开APP通知权限',  
				       //     showCancel: false,  
				       //     success: function (res) {  
				       //         if (res.confirm) {  
				       //             var UIApplication = plus.ios.import("UIApplication");  
				       //             var NSURL = plus.ios.import("NSURL");  
				       //             var setting = NSURL.URLWithString("app-settings:");  
				       //             var application = UIApplication.sharedApplication();  
				       //             application.openURL(setting);  
				       //             plus.ios.deleteObject(setting);  
				       //             plus.ios.deleteObject(application);  
				       //         }  
				       //     }  
				       // });  

				   }else{ 
					    this.showNotification=false
					   // alert('已开启通知权限')
					   if(that.interval){
					   		 clearInterval(that.interval);
					   }
				   }
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
			//判断是否为微信浏览器
			if (window.localStorage.getItem('wxBrowser')) {
			
				this.showWx = true
			}
			
			this.getUserNoticeList()
			// this.notificationAuthority()
		},
		mounted() {
			this.notificationAuthority()
		},
		watch: {
			showReturnRefresh() {
				this.getUserNoticeList()
			}
		}
	}
</script>

<style scoped>
	.head {
		padding-top: 0.38rem;
		height: 0.88rem;
		width: 100vw;
		/* background: #36a8fa; */
		background: #fff;
		text-align: center;
		position: fixed;
		top: 0;
		box-sizing: content-box;
		/* color:#fff; */
		font-size: 0.33rem;
		z-index: 20000;
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
	}

	.head-show {

		height: 1.28rem;
		width: 100%;
	}

	.info-head {
		background: #fff;
		padding-bottom: 0.2rem;
	}

	.info-title {
		font-size: 0.3rem;
		height: 0.5rem;
		line-height: 0.5rem;
		width: 100%;
		text-align: center;
		padding-top: 0.1rem;
	}

	.info-tips {
		font-size: 0.28rem;
		color: #bbb;
		width: 100%;
		text-align: center;
	}

	.push-btn {
		height: 0.7rem;
		width: 6.94rem;
		background: #e4522d;
		color: #fff;
		text-align: center;
		line-height: 0.7rem;
		font-size: 0.28rem;
		margin: 0.15rem auto 0 auto;
		border-radius: 0.4rem;
	}

	.info-list {
		position: relative;
		display: flex;
		display: -webkit-box;
		display: -webkit-flex;
		align-items: center;
		-webkit-box-align: center;
		-webkit-align-items: center;
		height: 1.3rem;
		margin: 0 auto;
		background: #fff;
		margin-top: 0.2rem;
	}

	.new-dot {
		position: absolute;
		top: 0.10rem;
		right: 0.18rem;
		height: 0.18rem;
		width: 0.18rem;
		border-radius: 50%;
		background: #ec4f40;
	}

	.info-list img {
		height: 0.84rem;
		width: 0.84rem;
		margin-left: 0.28rem;
		margin-right: 0.15rem;
	}

	.list-title {
		font-size: 0.28rem;
	}

	.list-news {
		font-size: 0.28rem;
		color: #ccc;
		width: 6rem;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
</style>
