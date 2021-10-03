<template>
	<div>
		<head-Piece>
			<template slot="content">地址管理</template>
		</head-Piece>

		<div class='content'>
			<div class='name pad'>
				<div class='contacts'>联系人：<input type="text" v-model="linkMan" placeholder="请填写联系人" placeholder-style="color:#ddd"></div>
			</div>
			<div class='name pad'>
				<div class='phone'>手机：<input type="text" v-model="linkPhone" placeholder="请填写手机号" placeholder-style="color:#ddd"></div>
			</div>
			<div class='name sign pad'>
				<div class='pag'>标签： </div>
				<div class='signs'>
					<div class='home' :class='type==1?"":"activation"' @click="collage( 1)">家</div>
					<div class='company' :class='type==2?"":"activation"' @click="collage(2)">公司</div>
					<div class='other' :class='type==3?"":"activation"' @click="collage(3)">其他</div>
				</div>
			</div>
			<div class='address-box' @click="selectAddress">
				<!-- <text class='address-info'>{{address}}</text> -->
				<div class='phone'>地址：</div>
				<textarea :value='address' disabled='true' />
				</div>
			<div class='bot pad'>
				<textarea v-model="detailAddr" placeholder="输入详细楼层、门牌号(公司名称)" />
				</div>
			 <div class='name pad' @click='dotCollage'> 
				 <div class='phone'>
					 <!-- <radio style='transform: scale(0.72);' value="r1" :checked="flag" @click='dotCollage' /> -->
					 <div class='radios' :class='flag===true?"signColor":""' >
					 	<img src='../../assets/dui.png'></image>
					 </div>
					 <span class='default-address'>设置默认地址</span></div> 
			 </div>
		
		</div>
		<div class='add-bottom' @click="confirm">
			<div>保存地址</div>
		</div>
		 	<Load v-if='isLoad'></Load>
			<showSuccess  v-if='isSuccess'  :successInfo='successInfo' ></showSuccess>
	</div>
</template>

<script>
	import * as axios from '../../untils/ajax.js'
	import {
		mapState,mapActions,mapGetters
	} from 'vuex'

	export default{
		data(){
			return{
				flag:false,
				address:'',
				addrName:'',
				province:'',
				detailAddr:'',
				city:'',
				district:'',
				lon:'',
				lat:'',
				linkMan:'',
				linkPhone:'',
                beDefault:'',
				id:'',
				type:1,
				isLoad:false,
				isSuccess:false,
				successInfoL:'',
				interval:'',
			    adInfo:''
			}
		},
		computed:{
		...mapState(['refreshAdr']),
		...mapGetters(['showAdsInfo'])
		},
		methods:{
			...mapActions(['collageRefreshAdr']),
			dotCollage(){
				this.flag=!this.flag
				if(this.flag){
					this.beDefault=1
				}else{
					this.beDefault=0
				}
			},
			collage(index){
				 this.type=index
			},
			selectAddress(){
				
				
				this.$router.push('map')
				return
				// var that=this
				// plus.storage.setItem('addressInfo','null')
				this.interval=setInterval(()=>{
								  if(plus.storage.getItem('addressInfo') && plus.storage.getItem('addressInfo')!='null'){									
							         let info =JSON.parse(plus.storage.getItem('addressInfo'))
									  that.adInfo= info.data
									  		that.addrName=that.adInfo.name
									  		that.province=that.adInfo.pname
									  		that.city=that.adInfo.cityname
									  		that.district=that.adInfo.adname
									  		if(that.adInfo.adname!=that.adInfo.address){
									  						   that.address=that.adInfo.name+'('+that.adInfo.pname+that.adInfo.cityname+that.adInfo.adname+that.adInfo.address+')'
									  		}else{
									  						   that.address=that.adInfo.name+'('+that.adInfo.pname+that.adInfo.cityname+that.adInfo.address+')'
									  		}
									  		 let lonAndLatitude = that.adInfo.location.split(',')
									  		  that.lon=lonAndLatitude[0]
									  			that.lat=lonAndLatitude[1]
									  		 if(that.addrName){
									  				 plus.storage.getItem('addressInfo','null')
									  		 	clearInterval(that.interval); 
									  		 } 				    
									  				 
									  // })
									
								   }						
								},1000)
				// uni.navigateTo({
				//    url:'/pages/component/map'
				// })
			
			},
			confirm(){
				console.log(this.linkMan)
				if(this.flag){
					this.beDefault=1
				}else{
					this.beDefault=0
				}
				if (this.linkPhone.length === 0) {
					// this.toast.fail('请填写手机号')
					this.$toast({
					    message:('请填写手机号'), duration: 1500
					})
					return
				} else if (this.linkPhone.length > 0) {
					if(this.linkPhone.length<11 ){
						// this.toast.fail('号码填写不正确')	
							this.$toast({
							    message:('号码填写不正确'), duration: 1500
							})
						return
					}
				      if(!this.isPhoneNumber(this.linkPhone)){
						   // this.toast.fail('号码格式不对')
						   this.$toast({
						       message:('号码格式不对'), duration: 1500
						   })
						   return
					  }
				}
			    if(this.linkMan.length==0){
				
					// this.toast.fail('请填写姓名')
					this.$toast({
					    message:('请填写姓名'), duration: 1500
					})
					return
				}else if(this.address.length==0){
					 // this.toast.fail('请选择地址')
					 this.$toast({
					     message:('请选择地址'), duration: 1500
					 })
					 return
				}	
			
				// console.log({
				// 	 id:this.id,linkMan:this.linkMan,addrName:this.addrName,linkPhone:this.linkPhone,province:this.province,city:this.city,district:this.district,
				// 	 address:this.address,detailAddr:this.detailAddr,type:this.type,beDefault:this.beDefault,lon:this.lon,lat:this.lat
				//  })
				
				 // let params={
				 // 	linkMan:this.linkMan,addrName:this.addrName,linkPhone:this.linkPhone,province:this.province,city:this.city,district:this.district,
				 // 	address:this.address,detailAddr:this.detailAddr,type:this.type,beDefault:this.beDefault,lon:this.lon,lat:this.lat
				 // }
				 let params=new FormData()
				 params.append('linkMan',this.linkMan)
				 params.append('addrName',this.addrName)
				 params.append('linkPhone',this.linkPhone) 
				 params.append('province',this.province) 
				 params.append('city',this.city) 
				 params.append('district',this.district)
				 params.append('address',this.address) 
				 params.append('detailAddr',this.detailAddr)
				 params.append('type',this.type)
				 params.append('beDefault',this.beDefault)
				 params.append('lon',this.lon) 
				 params.append('lat',this.lat) 
				 if(this.id.length!=0){
				   params.append('id',this.id) 
					 // params['id']=this.id
				 }
				 this.isLoad=true
                  let that=this
				 axios.post('/sys/t-sys-app-user/putOrPostAddress',params).then(res => {
				     if(res.meta.success){
						 this.isLoad=false
						 // this.toast.success('保存成功')
						 this.successInfo = '保存成功'
						 this.isSuccess = true
						  
						 setTimeout(() => {
						 	that.isSuccess = false
						 }, 1000)
						 setTimeout(()=>{
							 let num=Number(that.refreshAdr)+1
							 that.collageRefreshAdr(num)
							 that.$router.go(-1)
						 },500)
					
					 }else{
						 this.isLoad=false
						 this.$toast({
							 message:res.meta.msg,
							 duration:1000
						 })
					 }
				 })
			},
			isPhoneNumber(tel) {
				var reg = /^0?1[3|4|5|6|7|8][0-9]\d{8}$/;
				return reg.test(tel);
			}
		    
		},
		created() {
	          let info=this.$route.params
			  if(info.id){
				  this.id=info.id
				  this.linkMan=info.linkMan
				  this.addrName=info.addrName
				  this.linkPhone=info.linkPhone
				  this.province=info.province
				  this.city=info.city
				  this.district=info.district
				  this.address=info.address
				  this.detailAddr=info.detailAddr
				  this.type=info.type
				  this.beDefault=info.beDefault
				  if(this.beDefault==1){
				  	this.flag=true	
				  }else{
				  	this.flag=false
				  }
				  this.lon=info.lon
				  this.lat=info.lat
			  }
		},
		watch:{
			//监听选择地址的变化
			showAdsInfo(newval,oldval){
			          console.log(newval)
				 this.adInfo= newval
				 		this.addrName=this.adInfo.name
				 		this.province=this.adInfo.pname
				 		this.city=this.adInfo.cityname
				 		this.district=this.adInfo.adname
				 		if(this.adInfo.adname!=this.adInfo.address){
				 						   this.address=this.adInfo.name+'('+this.adInfo.pname+this.adInfo.cityname+this.adInfo.adname+this.adInfo.address+')'
				 		}else{
				 						   this.address=this.adInfo.name+'('+this.adInfo.pname+this.adInfo.cityname+this.adInfo.address+')'
				 		}
				 		 let lonAndLatitude = this.adInfo.location.split(',')
				 		  this.lon=lonAndLatitude[0]
				 			this.lat=lonAndLatitude[1]
				 	
			}
		}
	
		

	}
</script>

<style scoped>
	.content{
		width: 100vw;
		background:#fff;
		/* border-top: 1px solid #eee; */
		/* padding-left: 0.3rem; */
		/* box-sizing: border-box; */
	}
	.name{
		height: 0.88rem;
		 line-height: 0.88rem;
		 font-size: 0.30rem;
		 	border-bottom: 1px solid #eee;
			box-sizing: border-box;
				overflow-y: hidden;
	}
	.contacts {
		display: flex;
		display: -webkit-box;
		display: -webkit-flex;
		align-items: center;
		-webkit-box-align: center;
		-webkit-align-items: center;
	
		padding-left: 0.3rem;
	}
	.contacts input{
		border: none;
		margin-left: 0.58rem;
		color:#666666;
      height: auto;
	}
	.phone {
		display: flex;
		display: -webkit-box;
		display: -webkit-flex;
		align-items: center;
		-webkit-box-align: center;
		-webkit-align-items: center;
		font-size: 0.3rem;
		padding-left: 0.3rem;
	}
	.phone input,.phone span{
		border: none;
	   margin-left: 0.86rem;
	   color:#666666;
	}

 	.phone  .address-info{
		display: inline-block;
		width: 5rem;
		overflow: hidden;
		text-overflow:ellipsis;
		white-space: nowrap;
	}
	.sign{
		display: flex;
		display: -webkit-box;
		display: -webkit-flex;
		align-items: center;
		-webkit-box-align: center;
		-webkit-align-items: center;
			padding-left: 0.3rem;
	}
	.signs{
		display: flex;
		display: -webkit-box;
		display: -webkit-flex;
		align-items: center;
		-webkit-box-align: center;
		-webkit-align-items: center;
			padding-left: 0.9rem;
	}
	.name .sign{
		margin-left: 0.86rem;
	}
	.name .signs div{
		width: 0.66rem;
		height: 0.33rem  !important;
		border-radius: 0.20rem;
		color:#fff;
		background: #4d88ff;
		line-height: 0.34rem;
		text-align: center;
		font-size: 0.24rem;
		margin-right: 0.16rem;
	}
	.name .sign .company{
		width: 0.73rem;
		background: #f37356;
	}
	.name .sign .other{
		width: 0.73rem;
		background:#01B90B;
		color: #fff;
	}
	.address-box{
		display: flex;
		display: -webkit-box;
		display: -webkit-flex;
		align-items: center;
		-webkit-box-align: center;
		-webkit-align-items: center;
		/* justify-content: center; */
		height: 1.50rem !important;
		/* padding-left: 0.26rem; */
			border-bottom: 1px solid #eee;
	}
	.activation{
		border: 1px solid #cacaca !important;
		color:#cacaca !important;
		background: #fff !important;
		
	}
	.pad textarea{
		padding-top: 0.30rem;
		height: 1.70rem;
		width: 6.80rem;
		font-size: 0.28rem;
		border: none;
		
	}
	.bot {
		height: 1.70rem;
		border-bottom: 1px solid #eee;
		padding-left: 0.3rem;
		overflow-y: hidden;
	}
	.phone .default-address{
		margin-left: 0.18rem;
	}
	.add-bottom{
		width: 6.94rem;
		position: fixed;
		bottom: 0.26rem;
		border-radius: 1rem;
		height: 0.76rem;
		background: #ff5f1e;
		left: 50%;
		transform: translateX(-50%);
		-webkit-transform: translateX(-50%);
	}
	.add-bottom {
		display: flex;
		display: -webkit-box;
		display: -webkit-flex;
		justify-content:center;
		-webkit-box-pack: center;
		-webkit-justify-content: center;
		align-items: center;
		-webkit-box-align: center;
		-webkit-align-items: center;
		font-size: 0.30rem;
		color:#fff;
	}
	.radios {
		width: 0.35rem;
		height: 0.35rem;
		border-radius: 50%;
		border: 1px solid #ddd;
		display: flex;
		display: -webkit-box;
		display: -webkit-flex;
		justify-content: center;
		-webkit-box-pack:center;
		-webkit-justify-content: center;
		align-items: center;
		-webkit-box-align: center;
		-webkit-align-items: center;
		box-sizing: border-box;
	}
	
	.radios.signColor {
		background: #0396ff;
		border: none;
	}
	
	.radios img{
		width: 0.23rem;
		height: 0.23rem;
	}
    .address-box textarea{
		display: block;
		border: 1px solid #ccc;
		overflow-x:hidden;
		overflow:scroll;
		border: 1px solid #333;
		width: 5.8rem !important;
		/* height: 150upx; */
		height: 1.20rem !important;
		padding-top: 0.10rem !important;
		font-size: 0.28rem;
		background-color: #fff;
		border-radius: 0.05rem !important;
	
	}
	.address-box textarea:disabled{
	    -webkit-text-fill-color: #333;
	    -webkit-opacity: 1;
	    color: #000 !important;
}
</style>
