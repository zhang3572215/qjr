<template>
    <div class='conntent-info'>
        <selectDates v-show='showSelecteDate' @biography='collageDate'> </selectDates>
        <agreement v-show='!collageAgr' @showAdr='toBuyspan'></agreement>
        <div v-show='collageAgr&&!showSelecteDate' class='content-info'>
            <head-Piece>
                <template slot="content">提交订单</template>
            </head-Piece>

            <div class='order'>

                <div class='order-head'>
                    <div class='order-head-img'>
                        <img :src='materUrl'></img>
                    </div>
                    <div class='order-tit'>
                        <div class='order-set'>
                            <div v-if='typeId==1'>
                                办公室清洁-单次保洁
                            </div>
                            <div v-else>
                                办公室清洁-{{customizedInfo}}
                            </div>
                            <div class='money'>
                                <!-- ￥{{totalPrice}} -->
                                ￥{{totalMoney}}

                            </div>
                        </div>
                        <div class='order-times' v-if='this.list.typeId!=1'>
                            <span class='count'>清洁频率：<span>{{list.weekCount}}次/周</span>，<span>其中深度清洁：{{deepContent}}</span></span>
                            <!-- 	<span class='count' v-if='list.id!=1'>{{list.weekCount}}次/周</span>
							<span class='num' v-if='list.id!=1'>(<span>{{list.frequency}}</span>次)</span>
							<span class='num' v-if='list.id==1'><span>{{list.frequency}}</span>次</span>
							<span>({{list.timeInfo}}点)</span>
							<span class='week'>{{list.weekTime}}</span> -->
                        </div>
                        <div class='order-times' v-if='list.typeId!=1'>
                            <span class='count'>清洁次数：<span>{{dailyNum+deepNum}}次</span>，<span>其中深度清洁：{{deepNum}}次</span></span>
                        </div>
                    </div>
                </div>
                <div class='order-address' @click='selectMap'>
                    <div class='select'>
                        <div>
                            <img src='./../assets/address-4.png'></img>
                        </div>
                        <div class='select-info'>
                            <span>{{address}}</span>
                        </div>
                    </div>
                    <div class='goto-address'>
                        <img src="../assets/right-to.png" mode=""></img>
                    </div>
                </div>
                <div class='order-area  ' @click="collageFocus">
                    <div class='area-tit'>
                        清洁面积（平）
                    </div>
                    <div>
                        <input class='area'  :focus='focusFlag' type="number"  @blur="changeBlur" @input="changeNumber" v-model="area" />
                    </div>
                </div>
                <!-- @click="selectDate" -->
                <div class='order-date' v-if='typeId==1' @click="triggerTime">
                    <div class='date-tit'>
                        预约服务时间
                    </div>
                    <div class='select-date'>
                        <div>
                            <span>{{selectDateInfo}}</span><span style='margin-left: 10px;'>{{selectTime}}</span>
                        </div>
                        <div>
                            <img src="../assets/right-to.png" mode=""></img>
                        </div>
                    </div>
                </div>
                <div class='order-date' v-else @click="triggerTime">
                    <div class='date-tit'>
                        到场时间
                    </div>
                    <div class='select-date'>
                        <div>
                            <span>{{selectTime}}</span>
                        </div>
                        <div>
                            <img src="../assets/right-to.png" mode=""></img>
                        </div>
                    </div>
                </div>
                <div class='order-coupon' @click="couponClose">
                    <div class='coupon'>
                        <div>
                            <img src='../assets/coupon.png'></img>
                        </div>
                        <div class='coupon-tit' v-if='couponNum==0'>
                            <span v-if='couponList.length!=0'>请选择优惠券</span>
                            <span v-else>暂无优惠券</span>
                        </div>
                        <div class='coupon-tit' v-else>
                            <span>{{couponNum}}优惠券</span>
                        </div>
                    </div>
                    <div class='goto-coupon'>
                        <img src="../assets/right-to.png" mode=""></img>
                    </div>
                </div>
                <div class='order-coupon' @click="purposeClose">
                    <div class='coupon'>
                        <div>
                            <img src='../assets/coupon.png'></img>
                        </div>
                        <div class='coupon-tit' v-if='purposeList.length==0'>

                            <span>暂无抵用券</span>
                        </div>
                        <div class='coupon-tit' v-else>
                            <span v-if='purposeNum==0'> 请选择抵用券 </span>
                            <span v-else>{{purposeNum}}抵用券</span>

                        </div>
                    </div>
                    <div class='goto-coupon'>
                        <img src="../assets/right-to.png" mode=""></img>
                    </div>
                </div>
                <div class='payment-method' v-if='typeId!=1'>
                    <div>支付方式</div>
                    <div class='payment-method-right'>
                        <van-radio-group v-model="payType" icon-size='14' direction="horizontal">
                            <van-radio name="1">在线支付</van-radio>
                            <van-radio name="2">对公转账</van-radio>
                            <van-radio name="3">月结</van-radio>
                        </van-radio-group>
                    </div>
                </div>
                <div class='purchase' v-if="signFlag">
                    <div>
                        <div class='purchase-info'>
                            <div>分期付款</div>
                            <van-switch v-model="swicthFlag" />
                            <!-- <switch class='red' style='transform: scale(1.2);' :checked='swicthFlag' @change="switch1Change"></switch> -->
                        </div>

                    </div>
                    <div class='purchase-money'> <span v-if='swicthFlag'>分{{stages}}期(含手续费)￥{{averagePrice}}/期</span>
                    </div>
                    <!-- <div> -->
                    <!-- <switch  color="#11D5D1"  style='transform: scale(1.2);' checked @change="switch1Change" /> -->

                    <!-- </div> -->
                </div>
                <div class='exhort'>
                    <div class='exhort-tit'>特殊需求备注</div>
                    <textarea class='exhort-input' placeholder="请在这里写下您的特殊要求" v-model="remark" @blur="resetHeight"
                        @focus="toHeight" />
                    </div>
		<div class='explain'>
			  
			  <div class='explain-sign'  @click="collage">
				  <!-- <checkbox  class='inspect' :checked="flag" style='transform: scale(0.6);' @click="collage"/> -->
				    <img v-if='flag' src='../assets/true.png'></img>
			  </div>
			  <div  class='explain-info' @click="toBuyspan">
				  购买视为同意 <span  class='explain-info-tit'>《清洁人用户购买协议》</span>
			  </div>
		</div>
	 </div>
		<!-- <div class='order-bottom' v-if='signBottom'> -->
		<div class='order-bottom'>
			<div class='tab-left'>
				<div class='stay'>待支付：￥{{totalPrice}}</div>
				<div  class='discount'>已优惠：￥{{discountNum}}</div>
			</div>
			<div  class='tab-right' @click="confirm">
				 提交订单
			</div>
		</div>
		<div class='coupon-info' :class='couponFlag?"showCouopn":""'>
			<div class='coupon-tit'>
				优惠卷
			</div>
			<!-- totalMoney -->
			<div class='coupon-list'>
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
						有效期至：{{item.dateStart}}—{{item.dateEnd}}
					</div>
				</div>
			</div>
			</div>
			<img class='coupon-close' src='../assets/close.png' @click='couponClose'></img>
		</div>
		<div class='coupon-info' :class='purpose?"showCouopn":""'>
			
			<div class='coupon-tit'>
				抵用券
			</div>
			<div class='coupon-list'>
			<div class='coupon-content' v-for='(item,index) in purposeList'   :class='totalPrice<item.enoughMoneys?"couponColor":""'
			 @click='obtainPur(item)'  >
				<div class='content-left'>
					<span >￥</span>{{item.denomination}}
				</div>
				<div class='content-right'><div class="">
						满{{item.enoughMoneys}}可用
					</div>
					<div class="">
						有效期至：{{item.dateStart}}—{{item.dateEnd}}
					</div>
					
				</div>
			</div>
			</div>
			<img class='coupon-close' src='../assets/close.png' @click='purposeClose'></img>
			
		</div>
		
		<div class='time-info' :class='collageTime?"showTime-info":""'>
			<div class='elastic-head'  :class='typeId !=1?"customized-head":""'>
				<div class='time-list'  v-if='typeId==1' >
					<div v-for='(item,index)  in dateList ' :key='index' v-if='index>hoursFlag' :class=' collageDates==item.week ?"showTimeColor":""' @click="tabDate(item.week,item.date,index)">
						<div class='time-list-date'>
		
							{{item.week}}
						</div>
						<div class='time-list-info' >
							{{item.date}}
						</div>
					</div>
				</div>
				<div  style='height: 1px;'  v-else>
					
				</div>
				<img class='time-close' src='../assets/close.png' @click='timeclose'></img>
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
			</div>
	</div>
</template>

<script>
		import * as axios from '../untils/ajax.js'
		   import {mapGetters} from 'vuex'
		import agreement from './agreement.vue'
		import selectDates from'./selectDate.vue'
		 var preD = function (e) {
		  e.preventDefault()
	        }
	export default{
		data(){
			return{
                payType: '1',
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
				tProductFlatPrice:[],
				collageAgr:true,
				showSelecteDate:false,
				deepContent:'',
				deepNum:'',
				dailyNum:'',
		        selectDateInfo:'',
				selectTime:'',
				dailyPrice:0,
				depthPrice:0,
				customizedInfo:'',
				deepCountId:'',
				countId:'',
				typeId:'',
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
				collageDates: '明天',
				collageHourList: [],
				currentHourList: [],
				hoursFlag:0,
				exclusive:false,
                isPeriod:2
			
			}
		},
		components:{
			agreement,selectDates
		},
		computed:{
			...mapGetters(['showDate','showAddressInfo'])
		},
		methods:{
			collageDate() {
				this.showSelecteDate=!this.showSelecteDate
			},
			changeNumber(e){
				if(this.area.toString().includes('.')){
					
			         this.$toast({
			             message: '不能输入小数点', duration: 1500
			         })
				}
			
				   // this.area=Number(e.detail.value)
			
				
			},
            //输入框面积小于240，失去焦点自动变为240
            changeBlur(){
                if(this.exclusive){
                    if(this.area<240){
                         this.area=240
                    }
                }
                    
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
				console.log(88)
			},
			// 获取优惠卷
			getCoupon() {
				let that=this
				this.isLoade=true
				// let params=new FormData()
				// params.append('productType', 2)
				let params=new FormData()
				params.append('productType',2)
				params.append('buyType',this.id)
				axios.post('/business/t-business-coupon/getEnableCoupons',params).then(res => {
					this.couponList = res.data.map((item)=>{
						let dateEnd = item.useEndTime.split(' ')
						item.dateEnd = dateEnd[0]
						let dateStart =item.useStartTime.split(' ')
						item.dateStart=dateStart[0]
						return item
					})
					
					
					this.isLoade=false
				
				})
			},
			couponClose() {
				if(this.couponList.length>0){
					this.couponFlag = !this.couponFlag
				}
				
			},
			purposeClose(){
				
				if(this.purposeList.length>0){
					this.purpose=!this.purpose
				}
				
			}, 
			obtainInfo(e) {
				// if (this.totalMoney < e.enoughMoneys) {
				// 	return
				// }
				if (this.totalPrice < e.enoughMoneys) {
					return
				}
			      this.couponNum=e.denomination
				  this.couponFlag = !this.couponFlag
				  this.totalPrice =(this.totalMoney - this.couponNum-this.purposeNum ).toFixed(2)
				  this.averagePrice=(this.totalPrice/this.stages).toFixed(2)
				  this.couponId=e.id
				  this.discountNum=(this.purposeNum+this.couponNum).toFixed(2)
		
			},
			obtainPur(e){
				// if (this.totalMoney < e.enoughMoneys) {
				// 	return
				// }
				if (this.totalPrice < e.enoughMoneys) {
					return
				}
				this.purposeId=e.id
				this.purposeNum=e.denomination
				this.purpose=!this.purpose
				this.totalPrice =(this.totalMoney - this.couponNum-this.purposeNum ).toFixed(2)
				this.averagePrice=(this.totalPrice/this.stages).toFixed(2)
				this.discountNum=(this.purposeNum+this.couponNum).toFixed(2)
			},
			calculation() {
				if(this.typeId==1){
					// this.totalPrice = (((this.frequency * (((this.price * this.area).toFixed(2) * this.areaRadixt).toFixed(2))).toFixed(2))*this.radix).toFixed(2)
					// this.totalMoney=  (((this.totalNums * (((this.price * this.area).toFixed(2) * this.areaRadixt).toFixed(2))).toFixed(2))*this.radix).toFixed(2)
					this.totalMoney=(((this.depthPrice * this.area).toFixed(2)) * this.areaRadixt +0.000001).toFixed(2)
					this.totalPrice =(this.totalMoney-this.couponNum +0.000001).toFixed(2)
				}else{
					if(!this.exclusive){
						let price1 = (((this.area * this.dailyPrice ).toFixed(2)*this.areaRadixt  + 0.00001).toFixed(2)*this.dailyNum+0.00001).toFixed(2)
						let price2 = (((this.area * this.depthPrice ).toFixed(2)*this.areaRadixt  + 0.00001).toFixed(2)*this.deepNum+0.00001).toFixed(2)
					  // alert(this.buyType)
                      // if(this.buyType==3){
                        
                      //     this.totalMoney = (((Number(price1) + Number(price2) + 0.0001).toFixed(2)) * 0.9 +0.00001).toFixed(2)
                      // }else{
                            this.totalMoney = (Number(price1) + Number(price2) + 0.0001).toFixed(2)
                      // }
						// this.totalMoney = (Number(price1) + Number(price2) + 0.0001).toFixed(2)
											 //  this.totalMoney =(this.totalNums * ((((this.price * this.area).toFixed(2) *this.areaRadixt).toFixed(2) *this.frequencyRadixt).toFixed(2))).toFixed(2)
						this.totalPrice = (this.totalMoney-this.couponNum + 0.0001).toFixed(2)
										
						this.averagePrice=(this.totalPrice/this.stages).toFixed(2)
					}else{//大面积 240平以上
						let overstepArea=this.area-240
						let overstepRadixt=this.list.overstepRadixt
						let price1 = (((240* this.dailyPrice+0.000001).toFixed(2) * this.areaRadixt + 0.00001).toFixed(2) * this.dailyNum +
							0.00001).toFixed(2)
						let price2 = (((240 * this.depthPrice+0.000001).toFixed(2) * this.areaRadixt + 0.00001).toFixed(2) * this.deepNum +
							0.00001).toFixed(2)
						let price3 =((overstepArea*overstepRadixt+0.000001).toFixed(3)*(this.dailyNum +this.deepNum+0.000001)).toFixed(3) 
                        
                        // if(this.buyType==3){
                        //     	this.totalMoney = (((Number(price1) + Number(price2) +Number(price3)+ 0.0001).toFixed(2))*0.9 +0.000001).toFixed(2)
                        // }else{
                            	this.totalMoney = (Number(price1) + Number(price2) +Number(price3)+ 0.0001).toFixed(2)
                        // }
						// this.totalMoney = (Number(price1) + Number(price2) +Number(price3)+ 0.0001).toFixed(2)
											 //  this.totalMoney =(this.totalNums * ((((this.price * this.area).toFixed(2) *this.areaRadixt).toFixed(2) *this.frequencyRadixt).toFixed(2))).toFixed(2)
						this.totalPrice = (this.totalMoney-this.couponNum + 0.0001).toFixed(2)
										
						this.averagePrice=(this.totalPrice/this.stages).toFixed(2)
					}
					}
		          // console.log(this.totalMoney)
		          // console.log(this.totalPrice)
			},
			collageFocus(){
				this.focusFlag=true
			},
			selectDate(){
				this.showSelecteDate=!this.showSelecteDate
				// uni.navigateTo({
				// 	url:'/pages/component/date'
				// })
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
			tabDate(e, date,num) {
			
				this.collageDates = e
				if(num==1){
					
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
				// }
			
			
				this.dateInfoList.forEach(item => {
					if (item.includes(date)) {
						this.selectDateInfo = item
						console.log(this.selectDateInfo)
					}
				})
			},
			tabTime(id, e) {
				console.log(id)
				this.hourId = id
				this.selectTime = e
			},
			triggerTime() {
			
				this.collageTime = !this.collageTime
				 document.body.style.overflow = 'hidden'
			      document.addEventListener('touchmove', preD, {passive: false}) // 禁止页面滑动
			},
			timeclose() {
				this.collageTime = !this.collageTime
				 document.body.style.overflow = '' // 出现滚动条
				  document.removeEventListener('touchmove', preD, {passive: false})
			},
			nowTime(e) {
				var myDate = new Date();
				var  hours=  new Date().getHours()
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
					
				} else if (e == 1) {
					week = '明天'
					
					// this.selectDateInfo = date
				}
				if(hours<16){
					this.hoursFlag=0
				}else{
					this.hoursFlag=1
				}
				let info = {
					date: dates,
					week: week
				}
				this.dateInfoList.push(date)
				this.dateList.push(info)
			},
			getweek(e) {
				var weekDay = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
				var myDate = new Date(Date.parse(e));
			
				return weekDay[myDate.getDay()]
				console.log(weekDay[myDate.getDay()])
				// this.weekName = weekDay[myDate.getDay()]
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
				for (var i = start; i <= end; i += 86400000) {
					if (new Date(i).getDay() == weekX) {
						result++;
					}
				}
				return result;
			},
			getWeekNum(){
			    let nowDate = this.nowDate.split('-')
			    console.log(this.endDate)
				console.log(this.week)
			    for (var i = 0; i < 7; i++) {
			    	this.week.push(this.getCountOfWeekX(this.toDate(this.nowDate), this.toDate(this.endDate), i))
			    }
				let weeks=this.list.weekTime.split('、')
				 let num=0
				 weeks.forEach(item => {
					   if(item == '周一'){
						   num +=Number(this.week[0])
					   }else if(item == '周二'){
						   num +=Number(this.week[1])
					  }else if(item == '周三'){
						   num +=Number(this.week[2])
					  }else if(item == '周四'){
						   num +=Number(this.week[3])
					  }else if(item == '周五'){
						   num +=Number(this.week[4])
					  }else if(item == '周六'){
						   num +=Number(this.week[5])
					  }else if(item == '周日'){
						   num +=Number(this.week[6])
					  }
					  
				 })
				 console.log(num)
				 this.list.frequency=num
				 this.totalNums=num
				 this.calculation()
			 },
			 getEndDate(){		
				var date = this.nowDate.split('-')
				console.log(date)
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
							date[1] = (Number(date[1]) + 1 ).toString()
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
							date[1] = (Number(date[1]) + 3 ).toString()
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
			confirm(){
				
				if(this.area.toString().includes('.')){
						
						this.$toast({
						    message: '面积有小数点', duration: 1500
						})
						return
				}
				if(!this.flag){
					this.$toast({
					    message:'未同意协议', duration: 1500
					})
					return
				}
				if(this.typeId==2){
					if(this.exclusive){
						if(this.area<240){
							this.$toast({
							    message:'优惠专项面积240平起购', duration: 1500
							})
							return
						}
					
					}else{
						if(this.area<100){
							this.$toast({
							    message:'面积100平起购', duration: 1500
							})
							return
						}
						
					}
				}else{
					if(this.area<100){
						this.$toast({
						    message:'面积100平起购', duration: 1500
						})
						return
					}
				}
			
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
					this.isLoade=true
					// {
					// 	"productId": "1",
					// 	"totalNums": 1,
					// 	"flatNum": 100,
					// 	"remark": "",
					// 	"orderMoney": "30.00",
					// 	"couponId": "",
					// 	"payableMoney": "30.00",
					// 	"addressId": "1743536459086954129",
					// 	"allowanceId": ""
					// }

				if(this.typeId==1){
					let params=new FormData()
					 params.append('productId',this.productId)
					 params.append('totalNums',1)
					 // params.append('timePriceId',this.list.timePriceId) 
				     params.append('flatNum', this.area)
					 params.append('remark', this.remark)
					 params.append('orderMoney', this.totalMoney)
					 params.append('couponId', this.couponId) 
					 params.append('payableMoney', this.totalPrice) 
					 params.append('addressId', this.addressId)
					 params.append('allowanceId', this.purposeId)
	                 params.append('beginTime',this.selectTime)
					 params.append('startDate',this.selectDateInfo)
					axios.post('/office/t-office-order/createOfficeOrderByTimeVersion2',params
					).then(res => {
						if(res.meta.success){
								this.isLoade=false
								let id={'id':res.data.orderId}
							    // this.$router.push({"name":'orderPayment',params:id})
                                if(this.payType==1){
                                    this.$router.push({"name":'orderPayment',params:id})
                                }else if(this.payType==2){
                                         let info= {'id':res.data.orderId,'payableMoney':this.totalPrice}
                                    this.$router.push({'name':"transferAccounts",params:info})
                                }else{
                                       let info= {'id':res.data.orderId,'payableMoney':this.totalPrice}
                                     this.$router.push({'name':"monthlyBalance",params:info})
                                }
							// uni.navigateTo({
							// 	url:'/pages/home/orderPayment?id='+res.data.orderId
							// })
							// uni.removeStorageSync('addressInfo')
						
						}else{
							this.isLoade=false
							this.$toast({
							    message: res.meta.msg, duration: 1500
							})
						}
					})
					// this.buyType,this.nowDate,this.list.weekCount,this.week,
				}else{
					let params=new FormData()
					params.append('productId',this.productId)
					 params.append('buyType',this.buyType)
										 // params.append('totalNums',this.totalNums)
										  // params.append('startDate',this.nowDate)
										  // params.append('frequency',this.list.weekCount)
										  // params.append('weeks',this.list.weekTime)
										 // params.append('timePriceId',this.list.timePriceId) 
					params.append('flatNum', this.area)
					params.append('remark', this.remark)
					params.append('orderMoney', this.totalMoney)
					params.append('couponId', this.couponId) 
					params.append('payableMoney', this.totalPrice) 
					params.append('addressId', this.addressId)
					params.append('allowanceId', this.purposeId)
					params.append('beginTime',this.selectTime)
					params.append('depthType', this.deepCountId)
					 params.append('dailyType', this.countId)
                     params.append('payType',this.payType)
					//  var params={productId:this.id,buyType:this.buyType,totalNums:this.totalNums,startDate:this.nowDate,frequency:this.list.weekCount,weeks:this.list.weekTime,
										//   timePriceId:this.list.timePriceId,flatNum: this.area,remark:this.remark,orderMoney:this.totalMoney,couponId:this.couponId,
										//   payableMoney:this.totalPrice,addressId:this.addressId,allowanceId:this.purposeId
										// }
					
					if(this.typeId==3 || this.typeId==4){
					let isPeriod=this.isPeriod
                    let averagePrice= (this.totalPrice/this.stages).toFixed(2)
											// params['isPeriod']=isPeriod
					              params.append('isPeriod',isPeriod)
				                 if(isPeriod==2 || this.payType!=3){
								   params.append('periodMoney','')
								}else{
								   params.append('periodMoney', averagePrice)
								}
					}else{
                        let averagePrice= (this.totalPrice/this.stages).toFixed(2)
                        if(this.isPeriod==2 || this.payType!=3){
                            params.append('isPeriod',2)
                            params.append('periodMoney','')
                        }else{
                            params.append('isPeriod',1)
                         params.append('periodMoney',averagePrice)
                        }
					
						
					}
						
					if(!this.exclusive){
					
											axios.post('/office/t-office-order/createOfficeOrderByMealVersion2',params
											).then(res => {
												if(res.meta.success){
												  this.isLoade=false
												  let id={'id':res.data.orderId}
												  if(this.payType==1){
                                                      this.$router.push({"name":'orderPayment',params:id})
                                                  }else if(this.payType==2){
                                                     let info= {'id':res.data.orderId,'payableMoney':this.totalPrice,payFlag:1}
                                                    
                                                    this.$router.push({'name':"transferAccounts",params:info})
                                                  }else{
                                                         let info= {'id':res.data.orderId,'payableMoney':this.totalPrice}
                                                       this.$router.push({'name':"monthlyBalance",params:info})
                                                  }
												    
													// uni.navigateTo({
													// 	url:'/pages/home/orderPayment?id='+res.data.orderId
													// })
													// uni.removeStorageSync('addressInfo')
												}else{
													this.isLoade=false
													this.$toast({
													    message: res.meta.msg, duration: 1500
													})
												}
											})
					}else{
					
											axios.post('/office/t-office-order/createOfficeOrderByMealEnjoyment',params
											).then(res => {
												if(res.meta.success){
												  this.isLoade=false
												  let id={'id':res.data.orderId}
												 
												   if(this.payType==1){
												       this.$router.push({"name":'orderPayment',params:id})
												   }else if(this.payType==2){
												       let info= {'id':res.data.orderId,'payableMoney':this.totalPrice}

												       this.$router.push({'name':"transferAccounts",params:info})
												   }else{
                                                         let info= {'id':res.data.orderId,'payableMoney':this.totalPrice}
												        this.$router.push({'name':"monthlyBalance",params:info})
												   }
													// uni.navigateTo({
													// 	url:'/pages/home/orderPayment?id='+res.data.orderId
													// })
													// uni.removeStorageSync('addressInfo')
												}else{
													this.isLoade=false
													this.$toast({
													    message: res.meta.msg, duration: 1500
													})
												}
											})
					}
					
				}
				
			},
			getMapList() {
				let that=this
				axios.post('/sys/t-sys-app-user/getAllAddressByUserId', {
				}).then(res => {
					console.log(res.data)
					if (res.meta.success) {
						// that.addressId=res.data[0].id
					 //    that.address=res.data[0].address
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
			//获取抵用金
			getPurpose(){
				let that=this
				let params=new FormData()
				params.append('productType',1)
				// params.append('itemType',this.id)
				axios.post('/business/t-business-allowance/findMyAllowance', params).then(res => {
					if (res.meta.success) {
						this.purposeList= res.data.map((item)=>{
						let dateEnd = item.useEndTime.split(' ')
						item.dateEnd = dateEnd[0]
						let dateStart =item.useStartTime.split(' ')
						item.dateStart=dateStart[0]
						return item
					})
						
						this.fullMinusSort()
					} else {
						this.$toast({
						    message: '获取数据失败', duration: 1000
						})	
					}
				})
			},
			fullMinusSort(){
				if(this.purposeList.length==0){
					return
				}
				
				// 根据满减法排序
				let  dataList=this.purposeList
				let  allowanceList=dataList.sort((a,b) =>{
					return b.denomination-a.denomination
				})		
				// 进入页面自动选出抵用券
				 allowanceList.some(val => {	
					if (this.totalMoney > val.enoughMoneys) {
						if(this.purposeId.length!=0){
								return true
						}
					   if(this.purposeId.length==0){
					   	this.purposeId=val.id
					   	this.purposeNum=val.denomination
					   	// this.purpose=!this.purpose
					   	this.totalPrice =(this.totalMoney - this.couponNum-this.purposeNum ).toFixed(2)
					   	this.averagePrice=(this.totalPrice/this.stages).toFixed(2)
					   	this.discountNum=(this.purposeNum+this.couponNum).toFixed(2)
					   }
					    
					}
					
				})
			},
			toBuyspan(){
				this.collageAgr=!this.collageAgr
				// uni.navigateTo({
				// 	url:'/pages/home/agreement'
				// })
			},
			tFlatPrice() {
				for (var i = 0; i < this.flatPriceList.length; i++) {
					if(!this.exclusive){
						if (this.area >= this.flatPriceList[i].flat) {
							this.areaRadixt = this.flatPriceList[i].radix
							break
						}
					}else{
						if (240 >= this.flatPriceList[i].flat) {
							this.areaRadixt = this.flatPriceList[i].radix
							break
						}
					}
					
				}
				console.log(this.areaRadixt)
			},
			getInfo() {
				let params=new FormData()
				params.append('id','123456789')
				axios.post('/product/t-product-office/getProductOfficeVersion2', params).then(res => {
					console.log(res)
					if (res.meta.success) {

						this.flatPriceList = res.data.tProductFlatPrice
						this.tFlatPrice()
					
					} else {
						this.$toast({
						    message: '获取数据失败', duration: 1500
						})
			
					}
					// uni.stopPullDownRefresh();
				})
			},
			currentTime() {
				let myDate = new Date()
				let hours = myDate.getHours().toString() //获取当前小时数(0-23)
				var minutes = myDate.getMinutes().toString() //获取当前分钟数(0-59)
				if (minutes.length == 1) {
					minutes = '0' + minutes
				}
				let timeNum = Number(hours + minutes)
				if(this.list.typeId==1){
					if(hours<16){
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
							if(this.collageDates!='明天'){
								// this.hourId=this.currentHourList[0].id
								// this.currentHourList=this.hourList
								
								this.collageHourList = this.hourList
							    
								// this.selectTime = this.hourList[0].time
							 }else{
									this.hourId=this.currentHourList[0].id
									// this.currentHourList=this.hourList
									this.collageHourList = this.hourList
									this.hourList = this.currentHourList
									this.selectTime = this.hourList[0].time
								}
							
						}
					}else{
						this.currentHourList = this.hourList
						this.hourId = this.currentHourList[0].id
						this.collageHourList = this.hourList
						// this.hourList = this.currentHourList
						this.selectTime = this.hourList[0].time
					}
								
				
					
				}else{
					this.currentHourList=this.hourList
					this.collageHourList = this.hourList
					this.hourList = this.currentHourList
					// this.selectTime = this.hourList[0].time
				}
			
				
				// this.currentHourList = this.hourList.filter((item) => {
				// 	let timeArray = item.time.split(':')
				// 	let num = Number(timeArray[0] + timeArray[1]) - 30
				// 	if (timeNum < num) {
				// 		return item
				// 	}
				// })
			
			
			},
			ergodicDate() {
				for (var i = 0; i < 6; i++) {
					this.nowTime(i)
				}
				
			},
		},
		created() {
			// this.nowTime()
			
		     this.list = this.$route.params
		
			  this.area=this.list.area
			  this.totalPrice=this.list.totalPrice
			  console.log(this.totalPrice)
			  // this.totalMoney=this.list.orderMoney
			   this.totalMoney=this.list.totalPrice
			  this.couponNum=this.list.couponNum
			
			  this.totalNums =this.list.frequency
			  this.price=this.list.price
			  this.nowDate=this.list.nowDate
			  this.averagePrice=(this.totalPrice/3).toFixed(2)
			  this.frequency=this.list.rate
			  this.buyType=this.list.buyId
			  // this.week=this.list.weekTime
			  this.couponId=this.list.couponId
			  this.areaRadixt=this.list.areaRadixt
			  this.frequencyRadixt=this.list.frequencyRadixt
			  this.materUrl=this.list.materUrl
			  this.radix=this.list.radix
			  this.selectTime=this.list.selectTime
			  // this.
			  this.productId=this.list.productId
			  this.depthPrice=this.list.depthPrice
			  this.typeId=this.list.typeId
			  if(this.list.typeId!=1){
				  this.deepNum=this.list.deepNum
				  this.dailyNum=this.list.dailyNum
				  this.discountNum=this.list.couponNum
				  this.deepContent=this.list.deepContent
				  this.dailyPrice=this.list.dailyPrice
				  this.customizedInfo=this.list.customizedInfo
                  if(this.customizedInfo.includes('12') ){
                        this.isPeriod=1 //分期
                        this.stages=3
                  }
                  if(this.customizedInfo.includes('52')){
                         this.isPeriod=1 //分期
                          this.stages=12
                  }
			      this.deepCountId=this.list.deepCountId
			      this.countId=this.list.countId
				   this.exclusive=this.list.exclusive
				  
				  
				  console.log(this.countId)
			  }else{
			       this.collageDates=this.list.collageDate
				  this.selectDateInfo=this.list.selectDateInfo
				  this.hourId=this.list.hourId
				
				  console.log(this.collageDates)
				  console.log(this.selectDateInfo)
				  // this.selectTime=this.list.selectTime
			  }
			 if(this.list.id ==3 || this.list.id ==4 ){
			 				  this.signFlag=true
			 }
			 if(this.list.id==4){
			 				  this.stages=12
			 				  console.log(this.stages)
							    this.averagePrice=(this.totalPrice/12).toFixed(2)
			 }
			  this.id=this.list.id
			  // let token=uni.getStorageSync('token')
			  
			//   if(!token){
			
				
			// 	  return
			//   }
			  this.currentTime()
			  this.ergodicDate()
			 this.getInfo()
			 this.getMapList()
			   this.getEndDate()
			  this.getCoupon()
			  
			  this.getPurpose()

		},
		beforeRouteLeave(to, form, next) {
		      document.body.style.overflow = '' // 出现滚动条
		      document.removeEventListener('touchmove', preD, {passive: false})
		       next()
		 },
		watch: {
			area() {
			if(this.signNum>0){
				this.couponNum=0
				
				this.discountNum=0
				this.couponId=''
				this.tFlatPrice()
				this.purposeId=''
				this.purposeNum=0
			}		
			    // this.couponNum=0
				this.purposeNum=0
				this.signNum=1
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
		overflow-x: hidden;
	}
	.content-info{
		height: 100vh;
	}
	.order{
		padding: 0 0.28rem;
		box-sizing: border-box;
		/* margin-top: 0.20rem; */
		padding-bottom: 1rem;
	}
	.order-head{
		padding: 0.40rem 0.16rem;
	    display: flex;
	    display: -webkit-box;
	    display: -webkit-flex;
	    align-items: center;
	    -webkit-box-align: center;
	    -webkit-align-items: center;
		border-bottom: 1px solid #dadada;
        background: #fff;
	    border-radius:0.20rem 0.20rem 0 0 ;
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
	}
	.order-times .count{
		margin-right: 0.17rem;
	}
	.order-times .num{
		margin-right: 0.31rem;
	}
	.order-times .week{
		margin-left: 0.15rem;
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
		margin-top: 0.20rem;
		height: 0.90rem;
		padding: 0 0.16rem;
		border-bottom: 1px solid #eee;
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
		border-radius:0.20rem 0.20rem 0 0 ;
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
		padding: 10upx;
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
	.hidden-date{
		border-radius: 0.2rem;
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
		border-radius: 0 0 0.20rem 0.20rem;
		box-shadow: 0.05rem 0.05rem 0.10rem  #ececee;
	}
	.order-date .select-date{
		display: flex;
		display: -webkit-box;
		display: -webkit-flex;
		align-items: center;
		-webkit-box-align: center;
		-webkit-align-items: center;
	}
	.order-date .select-date div{
		display: inline-block;
		color:#999;
	}
	.order-date .select-date div:nth-child(2){
		display: flex;
		display: -webkit-box;
		display: -webkit-flex;
		align-items: center;
		-webkit-box-align: center;
		-webkit-align-items: center;
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
		display: -webkit-box;
		display: -webkit-flex;
		align-items: center;
		-webkit-box-align: center;
		-webkit-align-items: center;
	}
	.order-coupon .coupon  img{
		display:inline-block ;
		height: 0.28rem;
		width: 0.30rem;
		margin-right: 0.17rem;
		transform: translateY(0.05rem);
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
    .payment-method{
        height: 0.90rem;
        padding: 0 0 0 0.16rem;
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
        font-size: 0.28rem;
    }
    .payment-method-right{
        font-size: 0.22rem;
        line-height: 0.22rem;
    }
	.purchase{
		  padding: 0.20rem  0.16rem  0.20rem  0.16rem;
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
		border-radius: 0.2rem;
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
		 justify-content:center;
		 -webkit-box-pack: center;
		 -webkit-justify-content:center;
		 align-items: center;
		 -webkit-box-align: center;
		 -webkit-align-items: center;
		 overflow: hidden;
	 }
	  .explain-sign img{
		  width: 0.22rem;
		  height:0.27rem;
		  /* margin-left: 0.02rem; */
	  }
	  
/* 	.explain .uni-checkbox-wrapper{
		width: 30upx !important;
		height: 30upx !important; 
	} */
	.explain-info{
		width: 6.3rem;
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
/* 	uni-checkbox .uni-checkbox-input{
		width: 30upx !important;
	 height: 30upx !important;
	  } */
	.explain-info{
		margin-left: 0.17rem;
		font-size: 0.22rem;
	}
  .explain .inspect{
	  transform: translateY(-0.18rem);
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
		line-height: 1rem;
	}
	.tab-left{		
		/* display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		
		flex-direction: column;
		-webkit-box-orient: vertical;
		-webkit-box-direction: normal;
		-webkit-flex-direction: column;
		justify-content: center;
		-webkit-box-pack: center;
		-webkit-justify-content: center;
		align-items: center;
		-webkit-box-align: center;
		-webkit-align-items: center; */
		/* line-height: 0.5rem; */
	}
	.tab-left .stay{
		width: 100%;
		text-align: center;
		font-size: 0.3rem;
		transform: translateY(50%);
		-webkit-transform: translateY(50%);
	}
	.tab-left .discount{
		width: 100%;
		text-align: center;
	   font-size: 0.24rem;
	   transform: translateY(50%);
	   -webkit-transform: translateY(50%);
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
		border-top-left-radius: 0.3rem;
		border-top-right-radius: 0.3rem;
		z-index: 10;
		overflow: hidden;
		/* padding-bottom: 100upx; */
		/* overflow-x: hidden;
		overflow-y: scroll; */
		transition: all 1s;
		padding-top: 0px;
		
	}
	.coupon-info .coupon-list{
		height: 90%;
		width: 100%;
		overflow-x: hidden;
		overflow-y: scroll;
	    /* padding-bottom: 1.7rem; */

		/* position: relative; */
	}
	.coupon-info .coupon-list .coupon-content:nth-child(1){
		margin-top: 0.1rem;
	}
	.coupon-info.showCouopn {
		height: 6.67rem;
		padding-top: 0.26rem;
	}
	
	.coupon-tit {
		/* height: 0.7rem; */
		margin-left: 0.27rem;
		font-size: 0.32rem;
		/* margin-bottom: 28upx; */
		/* position: relative; */
	}
	.coupon-info.showCouopn  .coupon-tit{
		height: 0.6rem;
	}
	.coupon-content {
		height:1.86rem;
		width: 7rem;
		background-image: url('../assets/coupon-img.png');
		background-size: 100% 100%;
		margin: 0.2rem auto 0.2rem auto;
		display: flex;
		display: -webkit-box;
		display: -webkit-flex;
		align-items: center;
		-webkit-box-align: center;
		-webkit-align-items: center;
		/* justify-content: space-between;
		-webkit-box-pack: justify;
		-webkit-justify-content: space-between; */
		padding-left: 0.3rem;
		color: #ff5f1e;
	}
	
	.coupon-content.couponColor {
		background: #eee;
		color: #7B7B7B;
	}
	
	.coupon-content .content-left {
		font-size: 0.5rem;
		margin-right: 0.4rem;
		font-weight: 550;
	}
	
	.coupon-content .content-right {
		font-size: 0.28rem;
		margin-right: 0.2rem;
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
		height: 0.7rem;
	}
	.shadowArea {
		position: fixed;
		bottom: 0.98rem;
		height: 100%;
		width: 100%;
		background: rgba(0, 0, 0, 0.1);
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
		margin: 0.50rem 0.20rem 0.5rem 0.30rem;
		position: relative;
	}
	 .elastic-head.customized-head{
		 margin: 0 !important;
		 height: 0.76rem;
		 
	 }
	.time-info .elastic-head .time-close {
		position: absolute;
		top: -0.48rem;
		right: 0;
		width: 0.7rem;
		height: 0.7rem
	}
	.time-info .elastic-head.customized-head .time-close {
		position: absolute;
		top: 0;
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
		height: 7.3rem;
		/* padding-top: 0.76rem; */
		box-sizing: border-box;
	}
	
	.time-info .elastic-select {
		position: relative;
		height: 4.9rem;
		overflow-y: scroll;
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
	
</style>
<style>
    
   .payment-method-right .van-radio__label{
         margin-left: 0.05rem;
         line-height: 0.25rem;
    }
</style>
