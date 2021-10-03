<template>
	<div class='container'>
		<head-Piece>
			<template slot="content">地址选择</template>
		</head-Piece>

		<div class='map-head'>
			<div class='city-info'>
				<div class='city-left'>
					<!-- 					<picker mode="selector" @change="bindPickerChange" :value="index" :range="array"  :range-key="index" >
						<div class="uni-input picker">{{array[index]}}
							<img src='../../static/bottom.png'></img>
						</div>
					</picker> -->
					<div class="uni-input picker">厦门
						<img src='../../assets/bottom.png'></img>
					</div>
				</div>
				<div class='city-right'>
					<img src='../../assets/search_icon.png'></img>
					<input type="text" @input='inputCity' v-model="keyAd" placeholder="小区/写字楼/学校等" placeholder-style='color:#97979f'>
				</div>
			</div>
		</div>
		<!-- 		  <map  id="wxMap" class="map" :longitude="longitude" :latitude="latitude"
			 :markers="mark" :polyline="polyline" show-location scale="11.5" >
			  </map> -->
		<!-- 	<map id="wxMap" ref='wxMaps' class="map" :longitude="longitude" :latitude="latitude" :markers="mark" show-location :scale="scaleNum">
		</map> -->
		
		<div id="amap-container"  v-show='showMap'>
			<el-amap vid="amapDemo" :zoom="zoom" :plugin="plugin">
				<el-amap-marker vid="component-marker" :position="center"></el-amap-marker>
			</el-amap>
		</div>
		<!-- <div id='container'></div> -->
		<div class='search-list'>
			<div class='list' v-for="(item,index) of mapList" :key='index' @click="keep(item)">
				<img src='../../assets/gps_icom.png'></img>
				<div>
					<div class='address-name'>{{item.name}}</div>
					<div class='address-info' v-if='item.adname!=item.address'> {{item.pname}}{{item.cityname}}{{item.adname}}{{ item.address }}</div>
					<div class='address-info' v-else> {{item.pname}}{{item.cityname}}{{ item.address }}</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	// import * as axios from '../../untils/ajax.js'

	import axios from 'axios'
	// import QQMapWX from '../../untils/qqmap-wx-jssdk.js'
	// import AMapWX from '../../untils/amap-wx.js'
	// var Amaps = new AMapWX({
	// 	key: "cb3ced9058159017037b6b51b1f54eed"
	// })
	import {
		mapActions
	} from 'vuex'
	export default {
		data() {
			const self = this;
			return {

				qqmapsdk: null,
				longitude: null,
				latitude: null,
				scale: 17,
				polyline: [],
				mark: [],
				keyAd: '',
				dstLng: '终点纬度',
				dstLat: '终点经度',
				array: ['厦门市'],
				index: 0,
				mapList: [],
				scaleNum: 17,
				contentMap: '',
				zoom: 17, // 地图缩放级别
				center: [118.1513348, 24528309], // 指定地图中心点
				plugin: [{
					pName: 'Geolocation',
					events: {
						init(o) {
							// o 是高德地图定位插件实例
							o.getCurrentPosition((status, result) => {
						
								if (result && result.position) {
									self.lng = result.position.lng;
									self.lat = result.position.lat;
									self.center = [self.lng, self.lat];
									self.loaded = true
									self.showMap = true
									self.around();//周边搜索API服务地址
									self.$nextTick();
								} else {
									// console.log(9999)
									// self.lng = self.getLongitude;
									// self.lat = self.getLatitude
									// self.center = [self.lng, self.lat];
									// self.around();
								}
							});
						}
					}
				}],

				showMap: false,

			}
		},
		methods: {
			...mapActions(['collageAdsInfo']),
			inputCity(e) {

				this.getSuggestion(this.keyAd)
			},
			bindPickerChange: function(e) {
				this.index = e.target.value
				let address = this.array[this.index]
				console.log(address)
				this.atuoGetLocation(address)
			},
			getNearloaction: function(longitude, latitude) {
				let t = this
				t.qqmapsdk.reverseGeocoder({
					location: {
						latitude: latitude,
						longitude: longitude
					},
					get_poi: 1,
					poi_options: 'policy=2;page_size=20;page_index=1;radius=1000',
					success: function(res, data) {

						console.log(data)
						var signCity = res.result.address_component.city
						var flag = t.array.some(item => {
							return item == signCity
						})
						if (flag) {
							t.updateMapList(data.pois)
						} else {
							uni.showToast({
								title: '当前城市未开放；自动切换到已开放城市',
								icon: 'none',
								duration: 1500
							})
							t.atuoGetLocation(t.array[0])
						}
					}
				})
			},
			dis() {
				var that = this
				//调用距离计算接口
				this.qqmapsdk.direction({
					mode: 'driving', //可选值：'driving'（驾车）、'walking'（步行）、'bicycling'（骑行），不填默认：'driving',可不填
					//from参数不填默认当前地址
					from: {
						latitude: that.latitude,
						longitude: that.longitude
					},
					to: {
						latitude: that.dstLat,
						longitude: that.dstLng
					},
					success: function(res) {

						var ret = res;
						var coors = ret.result.routes[0].polyline,
							pl = [];
						//坐标解压（返回的点串坐标，通过前向差分进行压缩）
						var kr = 1000000;
						for (var i = 2; i < coors.length; i++) {
							coors[i] = Number(coors[i - 2]) + Number(coors[i]) / kr;
						}
						//将解压后的坐标放入点串数组pl中
						for (var i = 0; i < coors.length; i += 2) {
							pl.push({
								latitude: coors[i],
								longitude: coors[i + 1]
							})
						}
						//   console.log(pl)
						//设置polyline属性，将路线显示出来,将解压坐标第一个数据作为起点
						that.latitude = pl[0].latitude
						that.longitude = pl[0].longitude
						that.polyline = [{
							points: pl,
							color: '#FF0000DD',
							width: 10
						}]

						that.mark = [{
								id: 0,
								latitude: that.latitude,
								longitude: that.longitude,
								// 起点图标
								iconPath: '../../static/firstsign.png'
							},
							{
								id: 1,
								latitude: that.dstLat,
								longitude: that.dstLng,
								// 终点图标
								iconPath: '../../static/lastsign.png',
								label: {

									content: '厦门北站',

									color: '#FF0000',

									fontSize: 15,

									borderRadius: 1,

									// display: 'ALWAYS',         
								}
							},
						]

					},
					fail: function(error) {
						console.error(error);
					},
					complete: function(res) {
						console.log(res);
					}
				});
			},
			getLocation() {
				let that = this
				uni.getLocation({
					type: 'gcj02',
					success: function(res) {

						console.log(888)
						console.log(res)
						that.latitude = res.latitude
						that.longitude = res.longitude
						// let  address=that.list.city+that.list.district+that.list.address
						// that.atuoGetLocation(address)
						that.mark = [{
							id: 0,
							latitude: that.latitude,
							longitude: that.longitude,
							// 起点图标
							iconPath: '../../static/firstsign.png'
						}]
						// that.getSuggestion()
						that.around()
						// that.getNearloaction(res.longitude, res.latitude)
						// that.openSetting()
					},
					fail: function(res) {
						uni.showModal({
							title: '温馨提示',
							content: '您已拒绝定位授权,请开启',
							confirmText: '去设置',
							success(res) {
								if (res.confirm) {
									//打开授权设置
									// that.openSetting()
									that.gotoAppPermissionSetting()
								}
							}
						})
					}

				})
			},
			gotoAppPermissionSetting() {
				// #ifdef APP-PLUS
				uni.getSystemInfo({
					success(res) {
						if (res.platform == 'ios') {
							var UIApplication = plus.ios.import("UIApplication");
							var application2 = UIApplication.sharedApplication();
							var NSURL2 = plus.ios.import("NSURL");
							var setting2 = NSURL2.URLWithString("app-settings:");
							application2.openURL(setting2);
							plus.ios.deleteObject(setting2);
							plus.ios.deleteObject(NSURL2);
							plus.ios.deleteObject(application2);
						} else if (res.platform == 'android') {
							console.log(444444)
							var Intent = plus.android.importClass("android.content.Intent");
							var Settings = plus.android.importClass("android.provider.Settings");
							var Uri = plus.android.importClass("android.net.Uri");
							var mainActivity = plus.android.runtimeMainActivity();
							var intent = new Intent();
							intent.setAction(Settings.ACTION_APPLICATION_DETAILS_SETTINGS);
							var uri = Uri.fromParts("package", mainActivity.getPackageName(), null);
							intent.setData(uri);
							mainActivity.startActivity(intent);
						}
					}
				});
				// #endif
			},
			openSetting() {

				// App跳转系统的设置界面
				// #ifdef APP-PLUS
				uni.getSystemInfo({
					success(res) {
						if (res.platform == 'ios') { //IOS
							plus.runtime.openURL("app-settings://");
						} else if (res.platform == 'android') { //安卓
							// let main = plus.android.runtimeMainActivity();
							// let Intents = plus.android.importClass("android.content.Intent");
							// let mIntent = new Intents('android.settings.ACTION_SETTINGS');
							// main.startActivity(mIntent);


							var Intent = plus.android.importClass('android.content.Intent');
							var Settings = plus.android.importClass('android.provider.Settings');
							var intent = new Intent(Settings.ACTION_LOCATION_SOURCE_SETTINGS);
							main.startActivity(intent);

						}
					}
				});
				// #endif
			},
			getSuggestion(keyword) {
				let t = this
				if (t.index == undefined) {
					t.index = 0
				}
				if (keyword == undefined) {
					keyword == ''
				}
				console.log(55555)
				var city = this.array[t.index]


				this.$jsonp('https://restapi.amap.com/v3/place/text', {
					keywords: keyword,
					city: '厦门',
					page: '1',
					offset: '20',
					extensions: 'all',
					key: '4545dacced806c77e28f8cb466588a1d'
				}).then(res => {

					t.mapList = res.pois

					t.mapList.forEach(item => {


					})
				})
				// uni.request({
				// 	url: 'https://restapi.amap.com/v3/place/text',
				// 	data: {
				// 		keywords: keyword,
				// 		city: '厦门',
				// 		page: '1',
				// 		offset: '20',
				// 		extensions: 'all',
				// 		key: '4545dacced806c77e28f8cb466588a1d'
				// 	},
				// 	method: 'get',
				// 	success(res) {
				// 		console.log(res)
				// 		t.mapList = res.data.pois
				// 		console.log(t.mapList)
				// 		t.mapList.forEach(item => {
				// 			console.log(item)

				// 		})

				// 	},
				// 	fail(err) {
				// 		console.log(err)
				// 	}
				// })
				// t.qqmapsdk.getSuggestion({
				// 	keyword: keyword,
				// 	region: city,
				// 	region_fix: 1,
				// 	policy: 1,
				// 	location: t.latitude + ',' + t.longitude,
				// 	page_size: 20,
				// 	page_index: 1,
				// 	success: res => {
				// 		t.mapList = res.data
				// 		console.log(t.mapList)
				// 		t.mapList.forEach(item => {
				// 			console.log(item)

				// 		})
				// 	}
				// })
			},
			//周边搜索API服务地址
			around() {
				let that = this

				this.$jsonp('https://restapi.amap.com/v3/place/around', {
					keywords: '',
					page: '1',
					location: that.lng + ',' + that.lat,
					radius: '10000',
					offset: '20',
					types: '120203|120201|120202|120100',
					extensions: 'all',
					key: '4545dacced806c77e28f8cb466588a1d'
				}).then(res => {

					that.mapList = res.pois
					console.log(that.mapList)
					that.mapList.forEach(item => {


					})
				})
				// uni.request({
				// 	url: 'https://restapi.amap.com/v3/place/around',
				// 	data: {
				// 		keywords: '',
				// 		page: '1',
				// 		location: that.latitude + ',' + that.longitude,
				// 		radius: '10000',
				// 		offset: '20',
				// 		types: '120203|120201|120202|120100',
				// 		extensions: 'all',
				// 		key: '4545dacced806c77e28f8cb466588a1d'
				// 	},
				// 	method: 'get',
				// 	success(res) {
				// 		console.log(res)
				// 		that.mapList = res.data.pois
				// 		console.log(that.mapList)
				// 		that.mapList.forEach(item => {
				// 			console.log(item)

				// 		})

				// 	},
				// 	fail(err) {
				// 		console.log(err)
				// 	}
				// })
			},
			atuoGetLocation(e) {
				let t = this
				this.qqmapsdk.geocoder({
					address: e, //用户输入的地址（注：地址中请包含城市名称，否则会影响解析效果），如：'北京市海淀区彩和坊路海淀西大街74号'
					success: function(res) {
						// console.log(res)
						t.longitude = res.result.location.lng
						t.latitude = res.result.location.lat
						t.scaleNum = 13
						if (e === '厦门市') {
							t.longitude = 118.08
							t.latitude = 24.48
						}
						t.getNearloaction(t.longitude, t.latitude)
					},
					complete: res => {
						//  console.log(res.result);   //经纬度对象
						//  this.longitude=res.result.location.lng
						//  this.latitude=res.result.location.lat
					},
					fail: function(error) {
						//  console.logr(error);
					},
				})
			},
			getNearloaction(longitude, latitude) {
				let t = this
				console.log(longitude, latitude)
				t.qqmapsdk.reverseGeocoder({
					location: {
						latitude: latitude,
						longitude: longitude
					},
					get_poi: 1,
					poi_options: 'policy=2;page_size=20;page_index=1;radius=1000',
					success: function(res, data) {
						var signCity = res.result.address_component.city
						var flag = t.array.some(item => {
							return item == signCity
						})
						if (flag) {
							t.updateMapList(data.pois)
						} else {
							uni.showToast({
								title: '当前城市未开放；自动切换到已开放城市',
								icon: 'none',
								duration: 1500
							})
							t.atuoGetLocation(t.array[0])
						}
					}
				})
			},
			updateMapList(mapList) {
				// this.showCity[0]=this.array[0]
				console.log(mapList[0])
				this.mapList = mapList
			},
			keep(e) {
				console.log(e)
				// this.contentMap.geocode(e.address,{city:"厦门"},function(event){
				// 		var address = event.address;  // 转换后的地理位置
				// 		var point = event.coord;  // 转换后的坐标信息
				// 		var coordType = event.coordType;	// 转换后的坐标系类型
				// 		 console.log(event)
				// 	},function(e){
				// 		alert("Failed:"+JSON.stringify(e));
				// 	});
				this.collageAdsInfo(e)
				// uni.setStorageSync('addressInfo', e)
				this.$router.go(-1)
			},
			onComplete(data) {
				alert(969999)
				alert(data.position)
				// document.getElementById('status').innerHTML='定位成功'
				// var str = [];
				// str.push('定位结果：' + data.position);
				// str.push('定位类别：' + data.location_type);
				// if(data.accuracy){
				//      str.push('精度：' + data.accuracy + ' 米');
				// }//如为IP精确定位结果则没有精度信息
				// str.push('是否经过偏移：' + (data.isConverted ? '是' : '否'));
				// document.getElementById('result').innerHTML = str.join('<br>');
			}
		},

		mounted() {
			// let that=this
			//   var map = new AMap.Map('container', {
			//         resizeEnable: true
			//     });
			//     AMap.plugin('AMap.Geolocation', function() {
			//         var geolocation = new AMap.Geolocation({
			//             enableHighAccuracy: true,//是否使用高精度定位，默认:true
			//             timeout: 10000,          //超过10秒后停止定位，默认：5s
			//             buttonPosition:'RB',    //定位按钮的停靠位置
			//             buttonOffset: new AMap.Pixel(10, 20),//定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
			//             zoomToAccuracy: true,   //定位成功后是否自动调整地图视野到定位点

			//         }); 
			//         map.addControl(geolocation);
			//         geolocation.getCurrentPosition(function(status,result){
			//             if(status=='complete'){
			//                 that.onComplete(result)
			//             }else{
			// 				alert('获取失败')
			//                 // onError(result)
			//             }
			//         });
			//     });






			// this.contentMap=plus.maps.Map

			var _this = this;
			if (navigator.geolocation) {
				navigator.geolocation.getCurrentPosition(
					//locationSuccess 获取成功的话
					function(position) {
						_this.getLongitude = position.coords.longitude;
						_this.getLatitude = position.coords.latitude;
						// alert(_this.getLongitude)　　　　　 //弹出经度测试
						// alert(_this.getLatitude)
						// console.log(_this.getLongitude, _this.getLatitude)
						// _this.center[0] = _this.getLongitude
						// _this.center[1] = _this.getLatitude
					},
					//locationError  获取失败的话
					function(error) {
						var errorType = ['您拒绝共享位置信息', '获取不到位置信息', '获取位置信息超时'];
						alert(errorType[error.code - 1]);
					}
				);
			}





		},

		created() {

			//   let that=this
			//   navigator.geolocation.getCurrentPosition(
			//      　　//locationSuccess 获取成功的话
			//      　　function(position) {
			//      　　　　that.getLongitude = position.coords.longitude;  //position就是我们通过api获取的信息，而我们想获取的经纬度就在coords下，随后将经纬度分别赋值给外部data设定好的变量
			//      　　　　that.getLatitude = position.coords.latitude;    //记住如果这里直接写this可能会导致找不到外部的变量而报错，所以提前设置一下this的指向
			//      　　   that.center[ position.coords.longitude,position.coords.latitude]　　
			//          that.shopMap=true　　　

			//       　　　　　 //弹出经度测试
			//      　　},
			//      　　//locationError  获取失败的话
			//      　　function(error) {
			//      　　　　var errorType = ['您拒绝共享位置信息', '获取不到位置信息', '获取位置信息超时'];
			//      　　　　alert(errorType[error.code - 1]);
			//      　　}
			//      );
			// let params={key:"a0efe965ec811ebb539842f532bb8f72&"}
			// axios.get('https://restapi.amap.com/v3/ip?key=a0efe965ec811ebb539842f532bb8f72', {}).then(res => {
			// 	console.log(res)
			// })


			//      uni.request({
			//      	url:'https://restapi.amap.com/v3/place/text',
			// data:{
			// 	keywords:'集美',
			// 	city:'厦门',
			// 	page:'20',
			// 	extensions:'all',
			// 	key:'4545dacced806c77e28f8cb466588a1d'
			// },
			// method:'get',
			// success(res) {
			// 	console.log(res)
			// },
			// fail(err){
			// 	console.log(err)
			// }
			//      })
			// uni.getSetting({
			//       success(res) {
			//       console.log(res.authSetting)
			//     }
			//  })
			// this.getLocation()
			// let t = this
			// this.qqmapsdk = new QQMapWX({
			// 	key: 'P2BBZ-3IKW6-X5ISC-M4R2U-UAV77-YDBDE'
			// })


			// this.qqmapsdk.geocoder({
			// 	address: '厦门北站', //用户输入的地址（注：地址中请包含城市名称，否则会影响解析效果），如：'北京市海淀区彩和坊路海淀西大街74号'
			// 	success: function(res) {

			// 	},
			// 	complete: res => {

			// 	},
			// 	fail: function(error) {

			// 	},
			// })
		}
	}
</script>

<style scoped>
	.container {
		width: 100%;
		height: 100%;
		position: fixed;
		top: 0;
	}

	.map {
		width: 100vw;
		height: 5rem;
	}

	#amap-container {
		width: 100vw;
		height: 5rem;
	}

	#container {
		width: 100vw;
		height: 5rem;
	}

	.map-head {
		margin-top: -0.1rem;
		background: #F5F5F5;
		padding: 0.10rem 0;
		box-sizing: content-box;
	}

	.city-info {
		display: flex;
		display: -webkit-box;
		display: -webkit-flex;
		align-items: center;
		-webkit-box-align: center;
		-webkit-align-items: center;
		width: 6.94rem;
		height: 0.80rem;
		margin: auto;
		background: #fff;
		border-radius: 0.50rem;
		padding: 0.10rem 30upx;
	}

	.city-info .city-left {
		display: flex;
		display: -webkit-box;
		display: -webkit-flex;
		border-right: 2px solid #ccc;

	}

	.city-info .city-left .picker {
		width: 1.50rem;
		font-size: 0.28rem;
		display: flex;
		display: -webkit-box;
		display: -webkit-flex;
		justify-content: center;
		-webkit-box-pack: center;
		-webkit-justify-content: center;
		align-items: center;
		-webkit-box-align: center;
		-webkit-align-items: center;
	}

	.city-info .city-left .picker img {
		width: 0.24rem;
		height: 0.16rem;
		margin: 0.07rem 0rem 0 0.10rem;
	}

	.city-info .city-right {
		display: flex;
		display: -webkit-box;
		display: -webkit-flex;
		align-items: center;
		-webkit-box-align: center;
		-webkit-align-items: center;
		font-size: 0.28rem;
	}

	.city-info .city-right input {
		margin-top: 0.08rem;
		border: none;
	}

	.city-right img {
		width: 0.30rem;
		height: 0.30rem;
		margin: 0.08rem 0.15rem 0 0.15rem;
	}

	.search-list {
		background: #fff;
		position: fixed;
		top: 7.20rem;
		/* height: 650upx; */
		height: 100%;
		width: 100vw;
		overflow-x: hidden;
		overflow-y: scroll;
	}

	.search-list .list {
		padding-left: 0.35rem;
		display: flex;
		display: -webkit-box;
		display: -webkit-flex;
		justify-content: start;
		-webkit-box-pack: start;
		-webkit-justify-content: start;
		align-items: center;
		-webkit-box-align: center;
		-webkit-align-items: center;
		width: 100%;
		height: 1.40rem;
		border-bottom: 1px solid #EDEDED;

	}

	.search-list .list img {
		width: 0.34rem;
		height: 0.37rem;
		margin-right: 0.20rem;
	}

	.search-list .address-name {
		width: 5rem;
		font-size: 0.28rem;
		font-weight: bold;
		color: rgba(93, 92, 97, 1);
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;

	}

	.search-list .address-info {
		margin-top: 0.16rem;
		width: 5.7rem;
		font-size: 0.24rem;
		font-weight: 500;
		color: rgba(153, 153, 153, 1);
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;

	}
</style>
