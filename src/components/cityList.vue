<template>
	<div>
		<head-Piece>
			<template slot="content">城市列表</template>
		</head-Piece>
		
		<div class='content-head'>
			<div class='positioningCity'>定位城市：</div>
			<div class='position-info'>
				<div class='info-city' @click="preservation(city)">
					{{city}}
				</div>
				<div class='info-relocate' @click="relocate">
					重新定位
				</div>
			</div>
		</div>
		<div class='content-list'>
			<div class='open-city'>
				国内城市：
			</div>
			<div class='list'>
				<div class='list-info' v-for='(item,index) in list' :key='item.id' @click="preservation(item.name)">
					{{item.name}}
				</div>
			</div>
		</div>
		<div class="amap-page-container" v-show="false">
			<el-amap vid="amap" :plugin="plugin" class="amap-demo" v-if='mapFLag' >
			</el-amap>
		</div>
	</div>
</template>

<script>
	import * as axios from '../untils/ajax.js'
	import{mapActions} from'vuex'
	export default {
		data() {
			var _this=this
			return {
				list: [],
				city:"正在定位",
				plugin: [{
					pName: 'Geolocation',
					events: {
						init(o) {
							// o 是高德地图定位插件实例
							o.getCurrentPosition((status, result) => {			
								if (result && result.position) {	
										 _this.city =result.addressComponent.city
										   _this.boolCityExit()
									
							
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
				mapFLag:true
			}
		},
		methods: {
			...mapActions(['collageCity']),
			// 获取城市列表
			getList() {
				axios.post('/business/t-business-open-citys/findCitysList').then(res => {
					if (res.meta.success) {
						this.list = res.data
					}
				})
			},
			//判断定位的当前城市是否属于开放城市
			boolCityExit(){
				let params=new FormData()
				params.append('cityName',this.city)
				axios.post('/business/t-business-open-citys/boolCityExit',params).then(res => {
					if (res.meta.success) {
						if(!res.data){
							// this.$toast({
							// 	message:'当前城市未开放'
							// })
							this.city='厦门市'
						}
					}else{
						
					}
				})
			},
			relocate(){
				let that=this
				this.city='正在定位'
				// plus.geolocation.getCurrentPosition( function ( val ) {
								  
				// 				  that.city=val.address.city
				// 				  that.boolCityExit()
				// },function(){},{geocode:true,provider:'amap'});
				this.mapFLag=false
				setTimeout(()=>{
					that.mapFLag=true
				},0)
				
			},
			preservation(e){
				let city=e.slice(0,e.length-1)
				window.localStorage.setItem('city',city)
				this.collageCity(city)
				this.$router.go(-1)
			}
			
		},
		created() {
			this.getList()
			
		    
		}
	}
</script>

<style scoped>
	.positioningCity {
		font-size: 0.28rem;
		color: #a2a2a2;

	}

	.content-head {
		padding: 0.3rem 0.28rem 0 0.28rem;
		background: #fff;
	}

	.position-info {
		width: 100%;
		display: flex;
		display: -webkit-box;
		display: -webkit-flex;
		justify-content: space-between;
		-webkit-box-pack: justify;
		-webkit-justify-content: space-between;
		align-items: center;
		-webkit-box-align: center;
		-webkit-align-items: center;
		font-size: 0.3rem;
		color: #47b1e3;
		margin-top: 0.15rem;
		padding-bottom: 0.15rem;
	}

	.info-city {
		border: 1px solid #47b1e3;
		border-radius: 0.1rem;
		padding: 0 0.2rem;
		/* width: 1.2rem; */
		height: 0.5rem;
		text-align: center;
		line-height: 0.53rem;
	}

	.content-list {
		padding: 0.3rem 0.28rem 0 0.28rem;
		background: #fff;
		margin-top: 0.15rem;
	}

	.content-list .open-city {
		font-size: 0.28rem;
		color: #a2a2a2;

	}

	.list {
		font-size: 0.3rem;
		color: #47b1e3;
		display: flex;
		display: -webkit-box;
		display: -webkit-flex;
		flex-wrap: wrap;
		-webkit-flex-wrap: wrap;
		-moz-flex-wrap: wrap;
		-ms-flex-wrap: wrap;
		-o-flex-wrap: wrap;
		margin-top: 0.2rem;
		padding-bottom: 0.2rem;
		
	}

	.list-info {
		border: 1px solid #47b1e3;
		border-radius: 0.1rem;
		padding: 0 0.35rem;
		/* width: 1.2rem; */
		height: 0.5rem;
		text-align: center;
		line-height: 0.53rem;
		margin-right: 0.1rem;
		margin-bottom: 0.2rem;
	}
	.list-info:nth-child(4n){
		margin-right: 0;
	}
</style>
