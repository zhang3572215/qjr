<template>

	<div class='conntent-info'>
		<agreement v-show='!collageAgr' @showAdr='toBuyspan'></agreement>

		<div v-show='collageAgr'>
			<head-Piece>
				<template slot="content">提交订单</template>
			</head-Piece>

			<div class='order'>
				<div class='order-head'>
					<div class='order-head-img'>
						<img :src='list.materUrl'></img>
					</div>
					<div class='order-tit'>
						<div class='order-set'>
							<div>
								{{cateContent}}{{priceName}}
							</div>
							<div class='money'>
								<!-- ￥1.00 -->
							</div>
						</div>
						<div class='order-times'>

							<span class='count' v-if='type==2'>拼团价￥{{totalAssemblePrice }}</span>
							<span class='count' v-else>原价￥{{totalOriginalPrice}}</span>
							<span class='num' v-if='type==2'>原价￥{{totalOriginalPrice}}</span>

							<!-- <span class='week'>x1</span> -->
						</div>
					</div>
				</div>
				<div class='order-address' @click='selectMap'>
					<div class='select'>
						<div>
							<img src='../../assets/address-4.png'></img>
						</div>
						<div class='select-info'>
							<span>{{address}}</span>
						</div>
					</div>
					<div class='goto-address'>
						<img src="../../assets/right-to.png" mode=""></img>
					</div>
				</div>
				<div class='order-area' @click="collageFocus">
					<div class='area-tit'>
						清洁面积(或块)
					</div>
					<div>
						<input class='area' type="number" v-model="area" @input="changeNumber($event)" />
					</div>
				</div>
				<div class='order-date' v-if='type==1' @click="triggerTime">
					<div class='date-tit'>
						预约取件时间
					</div>
					<div class='select-date'>
						<div>
							<span>{{selectDateInfo}}</span><span style='margin-left: 10px;'>{{selectTime}}</span>
						</div>
						<div>
							<img src="../../assets/right-to.png" mode=""></img>
						</div>
					</div>
				</div>
				<!-- 	<div class='order-coupon' @click="couponClose">
				<div class='coupon'>
					<div>
						<img src='../../static/coupon.png'></img>
					</div>
					<div class='coupon-tit' v-if='couponNum==0'>
						<span v-if='couponList.length!=0'>请选择优惠券</span>
						<span v-else>暂无优惠券</span>
					</div>
					<div class='coupon-tit' v-else>
						<span v-if='couponList.length!=0'>{{couponNum}}优惠券</span>
						<span v-else>暂无优惠券</span>
					</div>
				</div>
				<div class='goto-coupon'>
					<img src="../../static/right-to.png" mode=""></img>
				</div>
			</div> -->
				<!-- 	<div class='order-coupon' @click="purposeClose">
				<div class='coupon'>
					<div>
						<img src='../../static/coupon.png'></img>
					</div>
					<div class='coupon-tit' v-if='purposeList.length==0'>
					
						<span>暂无抵用券</span>
					</div>
					<div class='coupon-tit' v-else>
						<span  v-if='purposeNum==0'>  请选择抵用券 </span>
						<span v-else>{{purposeNum}}抵用券</span>
						
					</div>
				</div>
				<div class='goto-coupon'>
					<img src="../../static/right-to.png" mode=""></img>
				</div>
			</div> -->

				<div class='exhort'>
					<div class='exhort-tit'>特殊需求备注</div>
					<textarea class='exhort-input' placeholder="请在这里写下您对清洁人的叮嘱吧!" v-model="remark" @blur="resetHeight" @focus="toHeight" />
					</div>
		<div class='explain'>
			  
			  <div class='explain-sign'  @click="collage">
				  <!-- <checkbox  class='inspect' :checked="flag" style='transform: scale(0.6);' @click="collage"/> -->
                   <img v-if='flag' src='../../assets/true.png'></img>
			  </div>
			  <div  class='explain-info' @click="toBuyspan">
				  购买视为同意 <span  class='explain-info-tit'>《清洁人用户购买协议》</span>
			  </div>
		</div>
	 </div>
		<!-- <div class='order-bottom' v-if='signBottom'> -->
		<div class='order-bottom'>
			<div class='tab-left'>		
				<div class='stay' v-if='type==2'>待支付：￥{{totalAssemblePrice}}</div>
				<div class='stay' v-else>待支付：￥{{totalOriginalPrice}}</div>
				<!-- <div  class='discount'>已优惠：￥{{discountNum}}</div> -->
			</div>
			<div  class='tab-right' @click="confirm">
				 提交订单
			</div>
		</div>
		<!-- <div class='coupon-info' :class='couponFlag?"showCouopn":""'>
			<div class='coupon-tit'>
				优惠卷
			</div>
			<div class='coupon-content' v-for='(item,index) in couponList' :class='totalPrice<item.enoughMoneys?"couponColor":""'
			 @click='obtainInfo(item)'>
				<div class='content-left'>
					<span >￥</span>{{item.denomination}}
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
			<img class='coupon-close' src='../../static/close.png' @click='couponClose'></img>
		</div> -->
		<!-- <div class='coupon-info' :class='purpose?"showCouopn":""'>
			<div class='coupon-tit'>
				抵用券
			</div>
			<div class='coupon-content' v-for='(item,index) in purposeList' 
			 @click='obtainPur(item)'  >
				<div class='content-left'>
					<span >￥</span>{{item.denomination}}
				</div>
				<div class='content-right'>
					<div class="">
						有效期至
					</div>
					<div class="">
						{{item.useEndTime}}
					</div>
				</div>
			</div>
			<img class='coupon-close' src='../../static/close.png' @click='purposeClose'></img>
		</div> -->
		<div class='time-info' :class='collageTime?"showTime-info":""'>
			<div class='elastic-head'>
				<div class='time-list'>
					<div v-for='(item,index)  in dateList ' :key='index' v-if='index>signIndex' :class=' collageDate==item.week ?"showTimeColor":""' @click="tabDate(item.week,item.date,index)">
						<div class='time-list-date'  >
				
							{{item.week}}
						</div>
						<div class='time-list-info'>
							{{item.date}}
						</div>
					</div>
				</div>
				<img class='time-close' src='../../assets/close.png' @click='timeclose'></img>
			</div>
			<div class='elastic-select'>
				<div class='select-count'>
					<div v-for='(item,index) in   hourList '  class='count-content' :key='index' @click='tabTime(item.id,item.time)'>
						<div class='count-info' :class=" hourId == item.id?'countColor':''">{{item.time}}</div>
					</div>
		
				</div>
		
			</div>
		</div>
		<div class='shadowArea' v-if=" couponFlag==true  ||purpose==true  || collageTime==true">
		
		</div>
			<Load v-if='isLoade'></Load>
			<tips :msg='showMsg' v-if='showTips'></tips>
		</div>
	</div>
</template>

<script>
		import * as axios from '../../untils/ajax.js'
		    import {mapGetters} from 'vuex'
			import agreement from '../agreement.vue'
	export default{
		data(){
			return{
				flag:true,
				list:{},
				area:'',
				couponFlag:false,
				couponList:[],
				totalPrice:0,
				totalMoney:0,
				couponNum:0,
				price:0,
				frequency:0,
				averagePrice:0,
				nowDate:'',
				signFlag:false,
				remark:'',
				endDate: '',
				id:'',
			    signNum:0,
				mapList:[],
				address:'选择地址',
				addressId:'',
				swicthFlag:false,
				isLoade:false,
				materUrl:'',
				purpose:false,
				purposeList:[],
				purposeId:'',
				purposeNum:0,
				discountNum:0,
				contentHeight:'',
		        signBottom:true,
				stages:3,
				focusFlag:false,
				radix:'',
				week:[],
				signIndex:0,
				collageAgr:true,
				showMsg:'',
				showTips:false,
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
				goodinfo:'',
				originalPrice:'',
				assemblePrice:'',
				totalOriginalPrice:'',
				totalAssemblePrice:'',
				productId:'',
				type:'',
			    specId:'',
				orderAssmbleid:'',
				cateContent:'',
				priceName:'',
				minNum:''
			}
		},
		components:{
			agreement
		},
		computed:{
			...mapGetters(['showDate','showAddressInfo'])
		},
		methods:{
			// 选择日期和星期几
			tabDate(e, date,num) {
				this.collageDate = e
				if(num==1){
					console.log(555)
							this.hourList = this.currentHourList//获取时间段
							this.selectTime = this.hourList[0].time
							this.hourId= this.hourList[0].id
				}else{
						this.hourList = this.collageHourList//获取时间段
						this.selectTime = this.hourList[0].time
						this.hourId = 1
				}
				// if (this.collageDate == '今天') {
				// 	this.hourList = this.currentHourList//获取时间段
				// 	this.selectTime = this.hourList[0].time
				// } else {
				// 	this.hourList = this.collageHourList//获取时间段
				// 	this.selectTime = this.hourList[0].time
				// 	// this.hourId = 1
				// }
			
			
				this.dateInfoList.forEach(item => {
					if (item.includes(date)) {
						this.selectDateInfo = item
						console.log(this.selectDateInfo)
					}
				})
			},
			// 选择时间
			tabTime(id, e) {
				this.hourId = id
				this.selectTime = e

			},
			// 促发服务时间弹框
			triggerTime() {
			
				this.collageTime = !this.collageTime
			},
			timeclose() {
				this.collageTime = !this.collageTime
			},
			changeNumber(e){
				if (e.data == null) {
					return
				}
				if (e.data == '.') {
					this.$toast({
						message: '不能输入小数点',
						duration: 1500
					})
				
				}
			
			// 	   this.area=Number(e.detail.value)
			
				
			},
           toHeight(e){
			 //  let height = e.detail.height 
			 // let screenHeight = uni.getSystemInfoSync().windowHeight;
			 // let statusHeight= uni.getSystemInfoSync().statusBarHeight;
			 //   this.contentHeight=(screenHeight-statusHeight-height)+20+'px'
			   this.signBottom=!this.signBottom
			
		   },
		   resetHeight(){
			    // this.contentHeight=100+'%'
				this.signBottom=!this.signBottom
		   },
			switch1Change(){
			this.swicthFlag =!this.swicthFlag
			console.log(this.swicthFlag)
			},
			collage(){
				this.flag=!this.flag
			},
			getCoupon() {
				let that=this
				this.isLoade=true
				// let params=new FormData()
				// params.append('productType', 2)
			  let params=new FormData()
			  params.append('productType',2)
			   params.append('buyType',this.id)
				axios.post('/business/t-business-coupon/getEnableCoupons',params).then(res => {
					this.couponList = res.data
					this.isLoade=false
								
				})
			},
			couponClose() {
				if(this.couponList.length>0){
					this.couponFlag = !this.couponFlag
				}
				
			},
			purposeClose(){
				console.log(this.purposeList)
				if(this.purposeList.length>0){
					this.purpose=!this.purpose
				}
				
			}, 
			obtainInfo(e) {
				if (this.totalPrice < e.enoughMoneys) {
					return
				}
				console.log(e)
			      this.couponNum=e.denomination
				  this.couponFlag = !this.couponFlag
				  this.totalPrice =(this.totalMoney - this.couponNum- this.purposeNum).toFixed(2)
				  this.averagePrice=(this.totalPrice/this.stages).toFixed(2)
				  this.couponId=e.id
				  this.discountNum=this.purposeNum+this.couponNum
		
			},
			obtainPur(e){
				this.purposeId=e.id
				this.purposeNum=e.denomination
				this.purpose=!this.purpose
				this.totalPrice =(this.totalMoney - this.couponNum - this.purposeNum).toFixed(2)
				this.averagePrice=(this.totalPrice/this.stages).toFixed(2)
				this.discountNum=this.purposeNum+this.couponNum
			},
			calculation() {
			
				this.totalOriginalPrice =   (this.area* this.originalPrice+0.0001).toFixed(2)
			   this.totalAssemblePrice  =   (this.area*this.assemblePrice + 0.0001).toFixed(2)
				if(this.id==1){
				
					// this.totalMoney=((this.totalNums * ((this.price * this.area).toFixed(2) * this.areaRadixt).toFixed(2)).toFixed(2)*this.radix).toFixed(2)
					// this.totalMoney=1
					// this.totalPrice =1
				}else{
					 //  this.totalMoney =(this.totalNums * (((this.price * this.area).toFixed(2) *this.areaRadixt).toFixed(2) *this.frequencyRadixt).toFixed(2)).toFixed(2)
						// this.totalPrice = (this.totalMoney-this.couponNum).toFixed(2)
						// this.totalMoney=1
						// this.totalPrice =1
					}	
		         // this.averagePrice=(this.totalPrice/this.stages).toFixed(2)
		          // console.log(this.totalMoney)
		          // console.log(this.totalPrice)
			},
			collageFocus(){
				this.focusFlag=true
			},
			selectDate(){
				uni.navigateTo({
					url:'/pages/component/date'
				})
			},
			selectMap(){
				this.$router.push({'name':'addressList',params:{sign:'sub'}})
				// uni.navigateTo({
				// 	url:'/pages/my/addressList?type='+'select'
				// })
			},
			tapPay(){
				uni.navigateTo({
					url:'/pages/home/orderPayment'
				})
			},
			nowTime(e) {
				var myDate = new Date();
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
					// this.selectDateInfo = date
				} else if (e == 1) {
					week = '明天'
					this.selectDateInfo = date
				}
				let info = {
					date: dates,
					week: week
				}
				this.dateInfoList.push(date)
				this.dateList.push(info)
			
				 
				if(this.currentHourList.length==0){
				      
					  this.signIndex=1
				      this.selectTime = this.hourList[0].time
					 
					  if(e==2){
						   this.collageDate = week
						  this.selectDateInfo = date
					  }
					  return
				}
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
				var start = startDate.getTime();
				var end = endDate.getTime()
				for (var i = start; i <= end; i += 86400000) {
					if (new Date(i).getDay() == weekX) {
						result++;
					}
				}
				return result;
			},
			getWeekNum(){
			     for(var i=0;i<7;i++){
				    this.week.push(this.getCountOfWeekX(this.toDate(this.nowDate), this.toDate(this.endDate), i))
				 }   
				 console.log(this.week)
			 },
			 getEndDate(){		
				var date = this.nowDate.split('-')
				if (this.id != 4) {
					if(this.id==2){
						if (Number(date[1]) + 1 >= 12) {
							date[0] = (Number(date[0]) + 1).toString()
							date[1] = (Number(date[1])+1-12).toString()
							date[2] = (Number(date[2])-1).toString()
							this.endDate = date[0] + '-' + date[1] + '-' + date[2]
						this.getWeekNum()
							
						}else{
							date[0] = (Number(date[0]) + 1).toString()
							date[2] = (Number(date[2])-1).toString()
							this.endDate = date[0] + '-' + date[1] + '-' + date[2]
							this.getWeekNum()
							
						}
					}else if(this.id==3){
						if (Number(date[1]) + 3 >= 12) {
							date[0] = (Number(date[0]) + 1).toString()
							date[1] = (Number(date[1])+3-12).toString()
							date[2] = (Number(date[2])-1).toString()
							this.endDate = date[0] + '-' + date[1] + '-' + date[2]
							this.getWeekNum()
								
						}else{
							date[0] = (Number(date[0]) + 1).toString()
							date[2] = (Number(date[2])-1).toString()
							this.endDate = date[0] + '-' + date[1] + '-' + date[2]
							
								this.getWeekNum()
						}
					}
				
				} else {
					date[0] = (Number(date[0]) + 1).toString()
					date[2] = (Number(date[2])-1).toString()
					this.endDate = date[0] + '-' + date[1] + '-' + date[2]
					console.log(this.endDate)
					this.getWeekNum()
				} 
			 },
			confirm(){
				let that=this
				// let params=new FormData()
				// params.append('productType', this.id)
				// params.append('buyType', this.buyType)
				// params.append('totalNums',this.totalNums)
				// params.append('startDate', this.nowDate)
				// params.append('frequency', this.frequency)
				// params.append('weeks', this.week)
				// params.append('timePriceId', this.list.timePriceId)
				// params.append('flatNum', this.area)
				// params.append('remark', this.remark)
				// params.append('orderMoney', this.orderMoney)
				// params.append('couponId', this.couponId)
				// params.append('payableMoney', this.totalPrice)
				// params.append('isPeriod', 2)
				// params.append('periodMoney', this.averagePrice)
				// params.append('addressId', 2)
				if(this.area.toString().includes('.')){
					
						this.$toast({
						    message:"面积有小数点", duration: 1500
						})
						return
				}
				if (this.area < this.minNum) {
				
					this.$toast({
						message: '面积(数量)不能小于'+that.minNum+'平方(块)',
						duration: 1500
					})
					return
				}
					this.isLoade=true
	
					let params=new FormData()
					if(this.type==1){
						params.append('productId',this.productId)
						params.append('orderAssembleId','')
						params.append('orderMoney',this.totalOriginalPrice)
						params.append('price',this.totalOriginalPrice)
						params.append('remark',this.remark)
						params.append('serviceDate',this.selectDateInfo)
						params.append('classPriceId',this.classPriceId)
						params.append('addressId',this.addressId)
					    params.append('beginTime',this.selectTime)
						params.append('isAssemble',2)
						params.append('num',this.area)
					}else{
						// totalOriginalPrice
						// totalAssemblePrice
						console.log(88588)
						params.append('productId',this.productId)
						params.append('orderAssembleId',this.orderAssmbleid)
						params.append('orderMoney',this.totalAssemblePrice)
						params.append('price',this.totalAssemblePrice)
						params.append('remark',this.remark)
						params.append('serviceDate',this.selectDateInfo)
						params.append('classPriceId',this.classPriceId)
						params.append('addressId',this.addressId)
						params.append('beginTime',this.selectTime)
						params.append('isAssemble',1)
						params.append('num',this.area)
					}
					
					axios.post('/carpet/t-carpet-order/postTechnologyOrder',
					params).then(res => {
						if(res.meta.success){
							console.log(res)
								this.isLoade=false
								// plus.storage.setItem('experience','1')
							let id={'id':res.data.orderId,carpetType:1}
							this.$router.push({"name":'cleanPayment',params:id})
							// uni.removeStorageSync('addressInfo')
						
						}else{
							this.isLoade=false
							this.$toast({
							    message: res.meta.msg, duration: 1500
							})
							// this.toast.fail(res.meta.msg)
							// setTimeout(()=>{
							
							// 	this.$router.go(-1)
							// },1000)
							// uni.showModal({
							// 		  title:'提示',
							// 		  content:res.meta.msg,
							// 		  cancelColor:'#323233',
							// 		  confirmspan:'确定',
							// 		  confirmColor:'#323233',
							// 		  success(res){
							// 			  if(res.confirm){
							// 				 uni.navigateTo({
							// 				   url: "/pages/expericence/countMeal?id=" +1
							// 				 })
							// 			  }else if(res.cancel){
											
							// 			  }
							// 		  }
							// })
							// this.toast.fail(res.meta.msg)
						}
					})
					
					// this.buyType,this.nowDate,this.list.weekCount,this.week,
				
			},
			getMapList() {
				let that=this
			
				axios.post('/sys/t-sys-app-user/getAllAddressByUserId', {
				}).then(res => {
					if (res.meta.success) {
					
						
								  // that.addressId=res.data[0].id
								  // that.address=res.data[0].address
								res.data.forEach(item => {
									  if(item.beDefault==1){
										  that.addressId=item.id
										  that.address=item.address
										  console.log(that.address)
									  }
								})
						
						
					} else {
						this.$toast({
						    message: '获取数据失败', duration: 1500
						})
					}
				})
			},
			getPurpose(){
				let that=this
				let params=new FormData()
				params.append('productType',2)
				params.append('itemType',this.id)
				axios.post('/business/t-business-allowance/findMyAllowance', params).then(res => {
					console.log(res)
					if (res.meta.success) {

						this.purposeList=res.data
					} else {
						this.$toast({
						    message: '获取数据失败', duration: 1500
						})
					}
				})
			},
			toBuyspan(){
				this.collageAgr=!this.collageAgr
				// this.$router.push('agreement')
				// uni.navigateTo({
				// 	url:'/pages/home/agreement'
				// })
			},
			tFlatPrice() {
				for (var i = 0; i < this.flatPriceList.length; i++) {
					if (this.area >= this.flatPriceList[i].flat) {
						this.areaRadixt = this.flatPriceList[i].radix
						break
					}
				}
				console.log(this.areaRadixt)
			},
			getInfo() {
				let params=new FormData()
				params.append('id',this.id)
				axios.post('/product/t-product-office/getProductOffice',params).then(res => {
					console.log(res)
					if (res.meta.success) {
						
						this.flatPriceList = res.data.tProductFlatPrice
						// this.tFlatPrice()
					
					} else {
						this.$toast({
						    message: '获取数据失败', duration: 1500
						})
			
					}
					// uni.stopPullDownRefresh();
				})
			},
			ergodicDate() {
				for (var i = 0; i < 6; i++) {
					this.nowTime(i)
				}
			},
			getweek(e) {
				var weekDay = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
				var myDate = new Date(Date.parse(e));
			
				return weekDay[myDate.getDay()]
				console.log(weekDay[myDate.getDay()])
				// this.weekName = weekDay[myDate.getDay()]
			},
			currentTime() {
				// let myDate = new Date()
				// let hours = myDate.getHours().toString() //获取当前小时数(0-23)
				// var minutes = myDate.getMinutes().toString() //获取当前分钟数(0-59)
				// if (minutes.length == 1) {
				// 	minutes = '0' + minutes
				// }
				var myDate = new Date()
				myDate.setTime(myDate.getTime()+24*60*60*1000);
				let hours = myDate.getHours().toString() //获取明天当前小时数(0-23)
				var minutes = myDate.getMinutes().toString() //获取明天分钟数(0-59)
				if (minutes.length == 1) {
					minutes = '0' + minutes
				}
				let timeNum = Number(hours + minutes)
				this.currentHourList = this.hourList.filter((item) => {
					let timeArray = item.time.split(':')
					// let num = Number(timeArray[0] + timeArray[1]) - 30
					let num = Number(timeArray[0] + timeArray[1]) 
					if (timeNum < num) {
						return item
					}
				})
				if(this.currentHourList.length==0){
					this.hourId=this.hourList[0].id
					this.selectTime = this.hourList[0].time
				}else{
					this.hourId=this.currentHourList[0].id
					// this.currentHourList=this.hourList
					this.collageHourList = this.hourList
					this.hourList = this.currentHourList
					this.selectTime = this.hourList[0].time
				}
			
			
			},
			postAssemble(){
				let params=new FormData()
				params.append('productId',this.productId)
				axios.post('/business/t-business-order-assemble/postCarpetAssemble',params).then(res=>{
					 if(res.meta.success){
						 this.orderAssmbleid=res.data
					 }
				 })
				
			},
		},
		created() {
	  this.currentTime()
	  this.ergodicDate()
			this.list = this.$route.params
			  this.area=this.list.area
			  this.totalPrice=this.list.totalPrice
			  this.totalMoney=1
			  this.couponNum=this.list.couponNum
			  this.totalNums =this.list.frequency
			  this.price=this.list.price
			  this.nowDate=this.list.nowDate
			  this.averagePrice=(this.totalPrice/3).toFixed(2)
			  this.frequency=this.list.rate
			  this.buyType=this.list.buyId
			
			  this.couponId=this.list.couponId
			  this.areaRadixt=this.list.areaRadixt
			  this.frequencyRadixt=this.list.frequencyRadixt   
			  this.materUrl=this.list.materUrl
			  this.radix=this.list.radix
	         this.goodinfo=this.list.goodinfo
			 this.specId=this.list.specId
			 this.originalPrice=this.list.originalPrice
			 this.assemblePrice=this.list.assemblePrice
             this.productId=this.list.productId
			 this.orderAssmbleid=this.list.orderAssmbleid
			 this.type=this.list.type
			 this.classPriceId=this.list.classPriceId
             this.totalOriginalPrice=this.list.totalOriginalPrice
             this.totalAssemblePrice=this.list.totalAssemblePrice
			 this.cateContent=this.list.cateContent
			 this.priceName=this.list.priceName
			 
			 this.minNum=this.list.minNum
			 if(this.type==2 && this.orderAssmbleid==undefined){
				 this.postAssemble()
			 }
			  
			  this.id=1
			 this.getInfo()
			
			   this.getEndDate()
			 
			  this.getMapList()
			

		},
		watch: {
			area() {
			if(this.signNum>0){
				this.couponNum=0
				this.couponId=''
				 // this.tFlatPrice()
			}		
			    this.couponNum=0
				this.purposeNum=0
				this.discountNum=0
				this.signNum=1
				// this.tFlatPrice()
				this.calculation()
			},
			showDate(newval,oldval){
				this.nowDate = newval
				this.week=[]
				this.getEndDate()
			
			},
			showAddressInfo(newval,oldval){
						this.addressId=newval['id']
						this.address=newval['address']
			}
		},
		// onShow() {
		// 	console.log(uni.getStorageSync('addressInfo'))
		// 	if(uni.getStorageSync('addressInfo')){
		// 		this.addressId=uni.getStorageSync('addressInfo')[1]
		// 		this.address=uni.getStorageSync('addressInfo')[0]
		// 	}
		// },
		// onUnload () {
		// 	uni.removeStorageSync('addressInfo')
		// }
			
	
	}
</script>

<style scoped>
	.conntent-info{
		height: 100vh;
		overflow: hidden;
	}
	.order{
		padding: 0 0.28rem;
		box-sizing: border-box;
		/* margin-top: 0.2rem; */
		padding-bottom: 1rem;
	}
	.order-head{
		height: 1.5rem;
		padding: 0.4rem 0.16rem;
		display: flex;
		display: -webkit-box;
		display: -webkit-flex;
		align-items: center;
		-webkit-box-align: center;
		-webkit-align-items: center;
		border-bottom: 1px solid #dadada;
        background: #fff;
	    border-radius:0.2rem 0.20rem 0 0 ;
		
	}
	.order-head .order-head-img img{
		display: block;
		height:1.14rem;
		width: 1.14rem;
		border: 1px solid #141414;
		margin-right: 0.24rem;

	}
	.order-head .order-set{
		font-size: 0.34rem;
	    display: flex;
	    display: -webkit-box;
	    display: -webkit-flex;
		justify-content: space-between;
		-webkit-box-pack: justify;
		-webkit-justify-content: space-between;
		width: 5.23rem;
	}
	.order-head .order-set div{
		color: #393939;
	}
	.order-head .order-set .money{
		color:#e01212;
		/* margin: ; */
	}
	.order-times{
		color:#666;
		font-size: 0.24rem;
		position: relative;
	}
	.order-times .count{
		margin-right: 0.17rem;
		font-size: 0.29rem;
		color: #e01212;
		display: inline-block;
		margin-top: 0.1rem;
	}
	.order-times .num{
		font-size: 0.28rem;
		color: #999;
		text-decoration: line-through;
		margin-left: 0.1rem;
		margin-right: 0.2rem;
		word-wrap:break-word;
		word-break: break-all;
		/* margin-right: 0.31rem; */
	}
	.order-times .week{
	    position: absolute;
		right: 0.1rem;
		top: 50%;
		transform: translateY(-50%);
		-webkit-transform: translateY(-50%);
		margin-top: 0.1rem;
		/* line-height: 0.24rem; */
		/* margin-left: 1.2rem; */
	}
	.order-address{
		padding: 0.30rem  0.16rem;
		border-bottom: 1px solid #eee;
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
		border-radius: 0 0 0.20rem 0.20rem;
		box-shadow: 0.05rem 0.05rem 0.10rem  #ececee;
		margin-bottom: 0.2rem;
	}
	.order-address .select {
		display: flex;
		display: -webkit-box;
		display: -webkit-flex;
		font-size: 0.30rem;
		color:#666;
	}
	.order-address .select img{
		 display: block;
		 height: 0.34rem;
		 width: 0.27rem;
		 margin-right: 0.17rem;
		 margin-top: 0.03rem;
	}
	.order-address  .goto-address img{
		display: block;
		height: 0.24rem;
		width: 0.13rem;
	}
	.order-address  .select-info{
		display: flex;
		display: -webkit-box;
		display: -webkit-flex;
		align-items: center;
		-webkit-box-align: center;
		-webkit-align-items: center;
	}
	.order-address  .select-info span{
		display: inline-block;
		width: 5rem;
		overflow: hidden;
		text-overflow:ellipsis;
		white-space: nowrap;
	}
	.order-area{
		margin-top: 0.2rem;
		margin-bottom:0.2rem;
		height:0.9rem;
		padding: 0 0.16rem;
		/* border-bottom: 1px solid #eee; */
		box-shadow: 0.05rem 0.05rem 0.10rem  #ececee;
		display: flex;
		display: -webkit-box;
		display: -webkit-flex;
		justify-content: space-between;
		-webkit-box-pack: justify;
		-webkit-justify-content: space-between;
		align-items: center;
		-webkit-box-align: center;
		-webkit-align-items: center;
		background: #fff;
		border-radius:0.20rem;
	}
	.order-area .area-tit{
		font-size:0.30rem ;
		color:#3a3a3a;
	}
	.area{
		/* border: 1upx  solid  #d8d8d8; */
		border:none;
		/* outline:medium; */
		width: 1.35rem;
		/* margin: 0 20upx 0 30upx; */
		height: 0.48rem;
		border-radius: 0.10rem;
		padding: 0.10rem;
		box-sizing: border-box;
		font-size: 0.26rem;
		display: flex;
		display: -webkit-box;
		display: -webkit-flex;
		align-items: center;
		-webkit-box-align: center;
		-webkit-align-items: center;
		text-align: right;
		
	}
	.order-date {
		/* margin-top: 20upx; */
		height: 0.90rem;
		padding: 0 0.16rem;
		/* border-bottom: 1px solid #dddddd; */
		display: flex;
		display: -webkit-box;
		display: -webkit-flex;
		justify-content: space-between;
		-webkit-box-pack: justify;
		-webkit-justify-content: space-between;
		align-items: center;
		-webkit-box-align: center;
		-webkit-align-items: center;
		background: #fff;
		font-size: 0.30rem;
		border-bottom: 1px solid #dddddd;
		border-radius:0.20rem;
		box-shadow: 0.05rem 0.05rem 0.10rem  #ececee;
		margin: 0.15rem 0;
	}
	.order-date .select-date div{
		display: inline-block;
		color:#999;
	}
	.order-date .select-date div:nth-child(1){
		
	}
	.order-date .select-date  img{
		display: inline-block;
		height: 0.24rem;
		width: 0.13rem;
		margin-left: 0.145rem;
	}
	.order-coupon{
		height: 0.90rem;
		padding: 0  0.16rem;
		display: flex;
		display: -webkit-box;
		display: -webkit-flex;
		justify-content: space-between;
		-webkit-box-pack: justify;
		-webkit-justify-content: space-between;
		align-items: center;
		-webkit-box-align: center;
		-webkit-align-items: center;
		background: #fff;
		margin-top: 0.20rem;
		border-bottom: 1px solid #eee;
		margin-bottom: 0.20rem;
		border-radius:  0.20rem;
		box-shadow: 0.05rem 0.05rem 0.10rem  #ececee;
	}
	.order-coupon .coupon {
		display: flex;
		align-items: center;
	}
	.order-coupon .coupon  img{
		display:inline-block ;
		height: 0.28rem;
		width: 0.30rem;
		margin-right: 0.17rem;
		transform: translateY(0.05rem);
		-webkit-transform:translateY(0.05rem) ;
		/* margin-top: 10upx; */
	}
	.order-coupon .coupon div{
		color:#e01212;
		font-size: 0.28rem;
		display: inline-block;
	}
	.order-coupon .goto-coupon  img{
			display: block;
			height: 0.24rem;
			width: 0.13rem;
	}
	.purchase{
		  padding: 0.20rem 0.16rem  0.20rem  0.16rem;
		/*  display: flex;
		  justify-content: space-between; */
		}
	.purchase .purchase-info{
		font-size: 0.30rem;
		color:#000 !important;
		display: flex;
		display: -webkit-box;
		display: -webkit-flex;
		justify-content: space-between;
		-webkit-box-pack: justify;
		-webkit-justify-content: space-between;
		align-items: center;
		-webkit-box-align: center;
		-webkit-align-items: center;
	}
	.purchase .purchase-money{
		height: 0.40rem;
		font-size: 0.30rem;
		color:#e01212 !important;
		margin-top:0;
	}
	.purchase uni-switch .wx-switch-input:not([class*="bg-"]), uni-switch .uni-switch-input:not([class*="bg-"]) {
		background:#01B90B !important;
	}
	.exhort{
		padding: 0 0.16rem  0.10rem 0.16rem;
		background: #fff;
		height: 2.42rem;
		border-radius: 0.20rem;
		box-shadow: 0.05rem 0.05rem 0.10rem  #ececee;
		border-bottom: 1px solid #eee;
		box-sizing: content-box;
	}
	.exhort textarea{
		display: block;
		height: 1.10rem;
		width: 6.25rem;
		border: 1px solid #ccc;
		overflow-x:hidden;
		overflow:scroll;
		margin-top: 0.30rem;
		padding: 0.15rem;
		font-size: 0.26rem;
		margin-bottom: 0.10rem;
	}
	.exhort .exhort-tit{
		font-size: 0.30rem;
		padding-top: 0.20rem;
	}
	.explain{
		margin-top: 0.18rem;
		padding: 0 0.16rem;
		display: flex;
		display: -webkit-box;
		display: -webkit-flex;
		padding-bottom: 0.30rem;
	}
	.explain uni-checkbox{
		display: block;
		width: 0.30rem ;
		height: 0.30rem;
		
	}
	 .explain-sign{
		 width: 0.34rem;
		 height: 0.30rem;
		 border: 1px solid #999;
		 display: flex;
		 display: -webkit-box;
		 display: -webkit-flex;
		 justify-content: space-between;
		 -webkit-box-pack: justify;
		 -webkit-justify-content: space-between;
		 align-items: center;
		 -webkit-box-align: center;
		 -webkit-align-items: center;
		 overflow: hidden;
	 }
	  .explain-sign img{
		  width: 0.22rem;
		  height: 0.27rem;
		  margin-left: 0.04rem;
	  }
	  
/* 	.explain .uni-checkbox-wrapper{
		width: 30upx !important;
		height: 30upx !important; 
	} */
	.explain-info{
		width: 6.30rem;
		/* display: flex; */
		word-wrap: break-word;
	}
	 .explain  .explain-info-tit{
		 font-size: 0.22rem;
		 color:#e01212;
	 }
/*  	.explain uni-checkbox .uni-checkbox-input.uni-checkbox-input-checked {
		width: 30upx !important;
		height: 30upx !important; 
	} */
/* 	uni-checkbox .wx-checkbox-input,  uni-checkbox .uni-checkbox-input{
		width: 30upx !important;
		height: 30upx !important; 
	} */

	.explain-info{
		margin-left: 0.17rem;
		font-size: 0.22rem;
	}
  .explain .inspect{
	  transform: translateY(-0.18rem);
	  -webkit-transform: translateY(-0.18rem);
  }
	.order-bottom{
		height: 1rem;
	   width: 100%;
		position: fixed;
		bottom: 0;
		z-index: 1;
	   display: flex;
	   display: -webkit-box;
	   display: -webkit-flex;
		background: #fff;
	}
	.order-bottom  .tab-left{
		height: 100%;
		width: 3.1rem !important;
		color:#e01212;
	}
	.order-bottom .tab-right{
		height: 100%;
		width: 4.42rem;
		background: #ff3a31;
		color:#fff;
		font-size: 0.34rem;
		text-align: center;
		line-height:1rem;
	}
	.tab-left{
		display: flex;
		display: -webkit-box;
		display: -webkit-flex;
		flex-direction: column;
		-webkit-box-orient: vertical;
		-webkit-box-direction: normal;
		-webkit-flex-direction: column;	
		justify-content: space-between;
		-webkit-box-pack: justify;
		-webkit-justify-content: space-between;
		align-items: center;
		-webkit-box-align: center;
		-webkit-align-items: center;
	}
	.tab-left .stay{
		line-height: 1rem;
		font-size: 0.3rem;
	}
	.tab-left .discount{
	font-size: 0.24rem;
	}
	.showCleen{
		/* background: #4bda62; */
	}
	
	.coupon-info {
		height: 0;
		width: 100%;
		position: fixed;
		bottom: 0.98rem;
		background: #fff;
		border-top-left-radius: 0.30rem;
		border-top-right-radius: 0.3rem;
		z-index: 10;
		overflow: hidden;
		/* padding-bottom: 100upx; */
		overflow-x: hidden;
		overflow-y: scroll;
		transition: all 1s;
		padding-top: 0;
		
	}
	
	.coupon-info.showCouopn {
		height: 6.67rem;
		padding-top: 0.26rem;
	}
	
	.coupon-tit {
		margin-left: 0.27rem;
		font-size: 0.32rem;
		/* margin-bottom: 28upx; */
		position: relative;
	}
	
	.coupon-content {
		height: 1.86rem;
		width: 7rem;
		background-image: url('../../assets/coupon-img.png');
		background-size: 100% 100%;
		margin: 0.20rem auto 0.20rem auto;
		display: flex;
		display: -webkit-box;
		display: -webkit-flex;
		align-items: center;
		-webkit-box-align: center;
		-webkit-align-items: center;
		padding-left: 0.30rem;
		color: #ff5f1e;
	}
	
	.coupon-content.couponColor {
		background: #eee;
		color: #7B7B7B;
	}
	
	.coupon-content .content-left {
		font-size: 0.50rem;
		margin-right: 0.45rem;
		font-weight: 550;
	}
	
	.coupon-content .content-right {
		font-size: 0.28rem;
	}
	
	.coupon-content .content-left span {
		font-size: 0.30rem;
		font-weight: 500
	}
	
	.coupon-close {
		position: absolute;
		top: 0.12rem;
		right: 0;
		width: 0.70rem;
		height: 0.70rem;
	}
	.shadowArea {
		position: fixed;
		bottom: 0.98rem;
		height: 100%;
		width: 100%;
		background: rgba(0, 0, 0, 0.1);
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
	.time-info {
		height: 0;
		width: 100%;
		position: fixed;
		bottom: 0rem;
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
	
	.elastic-head {
		margin: 0.50rem 0.20rem 0.3rem 0.30rem;
		position: relative;
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
		height: 6.8rem;
		/* padding-top: 0.76rem; */
		box-sizing: border-box;
	}
	
	.time-info .elastic-select {
		position: relative;
		height: 5.7rem;
		overflow-y: scroll;
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
		height: 6.8rem;
		/* padding-top: 0.76rem; */
		box-sizing: border-box;
	}
	
	.time-info .elastic-select {
		position: relative;
		height: 4.7rem;
		overflow-y: scroll;
		background: #fff;
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
</style>
