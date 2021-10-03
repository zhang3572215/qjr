<template>
	<div>
		<selectDates v-show='showSelecteDate' @biography='collageDate'> </selectDates>
		<div  v-show='!showSelecteDate'>
		<head-Piece>
			<template slot="content">地毯清洁</template>
		</head-Piece>

	   <div class='order'>
	   			<div class='order-head'>
	   				<div class='order-head-img'>
	   					<img src='../../assets/capet-recevice.png'></img>
	   				</div>
	   				<div class='order-tit'>
	   					<div class='order-set'>
	   						<div>
	   							地毯清洁(赠礼) <span class='mr-left'>x2</span>
	   						</div>
	   						<!-- <div class='money'>
	   							￥0
	   						</div> -->
	   					</div>
	   					<div class='order-times'>
	   					  <span class='money'>￥0元</span>	<span class='count' v-if='list.id!=1'>限(30平)</span>
	   					</div>
	   				</div>
	   			</div>
	   			<div class='order-address' @click='selectMap'>
	   				<div class='select'>
	   					<div>
	   						<img src='../../assets/address-5.png'></img>
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
	   					地毯总面积（平）
	   				</div>
	   				<div>
	   					<input class='area'  type="number"  v-model="area"   @input="changeNumber" />
	   				</div>
	   			</div>
	   			<div class='order-date' @click="selectDate"  v-if='list.name !="按次购买"'>
	   				<div class='date-tit'>
	   					预约服务日期<span class='first-tit'>(首次)</span>
	   				</div>
	   				<div class='select-date'>
	   					<div>
	   						{{nowDate}}
	   					</div>
	   					<div>
	   						<img src="../../assets/right-to.png" mode=""></img>
	   					</div>
	   				</div>
	   			</div>
	   		    <div class='elastic-select'>
	   		    	<div class='select-title'>预约服务时辰<span  class='first-tit'>(首次)</span></div>
	   		    	<div class='select-count'>
	   		    		<div class='count-info' v-for='(item,index) in   timeList' :key='index' :class="timeId == item.id?'countColor':''"
	   		    		 @click="tabwTime(item)">{{item.content}}点</div>
	   		    	</div>
	   		    </div>
	   			
	
	   			<div class='exhort'>
	   				<div class='exhort-tit'>给清洁人叮嘱</div>
	   				<textarea class='exhort-input' placeholder="请在这里写下您对清洁人的叮嘱吧!" v-model="remark" @blur="resetHeight" @focus="toHeight"/>
	   			</div>
	   <!-- 		<div class='explain'>
	   			  
	   			  <div class='explain-sign'  @click="collage">
	                 <img v-if='flag' src='../../static/true.png'></img>
	   			  </div>
	   			  <div  class='explain-info' @click="toBuyspan">
	   				  购买视为同意 <span  class='explain-info-tit'>《清洁人用户购买协议》、《办公室（2020）版"服务说明"》</span>
	   			  </div>
	   		</div> -->
	   </div>
	   		<!-- <div class='order-bottom' v-if='signBottom'> -->
	   		<div class='order-bottom'>
	   			 <div class='btn cancle' @click="cancel">
					 取消
				 </div>
				 <div class='btn' @click="receive">
					 马上领取
				 </div>
	   		</div>
	   		
	   	
	   		<div class='shadowArea' v-if=" couponFlag==true  ||purpose==true">
	   		
	   		</div>
	   			<Load v-if='isLoade'></Load>
				<showSuccess v-if='showSuc' :successInfo='"领取成功"'></showSuccess>
			</div>
	</div>
</template>

<script>
	import * as axios from '../../untils/ajax.js'
		    import {mapGetters} from 'vuex'
			import selectDates from'../selectDate.vue'
	export default{
		data(){
			return{
				flag:true,
				list:{},
				area:0,
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
				address:'选择服务地址',
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
				timeList: [{
						id: 1,
						content: '7-9'
					}, {
						id: 2,
						content: '9-11'
					}, {
						id: 3,
						content: '11-13'
					}, {
						id: 4,
						content: '13-15'
					}, {
						id: 5,
						content: '15-18'
					},
					{
						id: 6,
						content: '18-20'
					}, {
						id: 7,
						content: '20-22'
					}
				],
				timeId:'',
				timeInfo:'',
				showSuc:false,
				showSelecteDate:false
			}
		},
		components:{
			selectDates
		},
		computed:{
			...mapGetters(['showDate'])
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
	
		
			obtainInfo(e) {
				if (this.totalMoney < e.enoughMoneys) {
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
				if(this.id==1){
				
					this.totalMoney=((this.totalNums * ((this.price * this.area).toFixed(2) * this.areaRadixt).toFixed(2)).toFixed(2)*this.radix).toFixed(2)
					this.totalPrice =(this.totalMoney-this.couponNum).toFixed(2)
				}else{
					  this.totalMoney =(this.totalNums * (((this.price * this.area).toFixed(2) *this.areaRadixt).toFixed(2) *this.frequencyRadixt).toFixed(2)).toFixed(2)
						this.totalPrice = (this.totalMoney-this.couponNum).toFixed(2)
					}	
		         this.averagePrice=(this.totalPrice/this.stages).toFixed(2)
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
			nowTime(){
				var myDate = new Date();
				myDate.setDate(myDate.getDate() + 2); //获取AddDayCount天后的日期  
				var y = myDate.getFullYear();
				var m = (myDate.getMonth() + 1) < 10 ? "0" + (myDate.getMonth() + 1) : (myDate.getMonth() + 1); //获取当前月份的日期，不足10补0  
				var d = myDate.getDate() < 10 ? "0" + myDate.getDate() : myDate.getDate(); //获取当前几号，不足10补0  
				this.nowDate = y + "-" + m + "-" + d;
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
				    // this.week.push(this.getCountOfWeekX(this.toDate(this.nowDate), this.toDate(this.endDate), i))
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
						
							
						}else{
							date[0] = (Number(date[0]) + 1).toString()
							date[2] = (Number(date[2])-1).toString()
							this.endDate = date[0] + '-' + date[1] + '-' + date[2]
							
							
						}
					}else if(this.id==3){
						if (Number(date[1]) + 3 >= 12) {
							date[0] = (Number(date[0]) + 1).toString()
							date[1] = (Number(date[1])+3-12).toString()
							date[2] = (Number(date[2])-1).toString()
							this.endDate = date[0] + '-' + date[1] + '-' + date[2]
							
								
						}else{
							date[0] = (Number(date[0]) + 1).toString()
							date[2] = (Number(date[2])-1).toString()
							this.endDate = date[0] + '-' + date[1] + '-' + date[2]
							
								
						}
					}
				
				} else {
					date[0] = (Number(date[0]) + 1).toString()
					date[2] = (Number(date[2])-1).toString()
					this.endDate = date[0] + '-' + date[1] + '-' + date[2]
					console.log(this.endDate)
					
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
					this.isLoade=true
				if(this.id==1){
					axios.post('/qjrapi/office/t-office-order/createOfficeOrderByTime',
					{productId:this.id,totalNums:this.totalNums,
					  timePriceId:this.list.timePriceId,flatNum: this.area,remark:this.remark,orderMoney:this.totalMoney,couponId:this.couponId,
					  payableMoney:this.totalPrice,addressId:this.addressId,allowanceId:this.purposeId
					}).then(res => {
						if(res.meta.success){
								this.isLoade=false
							uni.navigateTo({
								url:'/pages/home/orderPayment?id='+res.data.orderId
							})
							uni.removeStorageSync('addressInfo')
						
						}else{
							this.isLoade=false
							this.toast.fail(res.meta.msg)
						}
					})
					// this.buyType,this.nowDate,this.list.weekCount,this.week,
				}else{
				  var params={productId:this.id,buyType:this.buyType,totalNums:this.totalNums,startDate:this.nowDate,frequency:this.list.weekCount,weeks:this.week,
					  timePriceId:this.list.timePriceId,flatNum: this.area,remark:this.remark,orderMoney:this.totalMoney,couponId:this.couponId,
					  payableMoney:this.totalPrice,addressId:this.addressId,allowanceId:this.purposeId
					}
					console.log(this.id)
					if(this.id==3 || this.id==4){
						let isPeriod=this.swicthFlag==true?1:2
						params['isPeriod']=isPeriod
						if(this.swicthFlag==false){
							params['periodMoney']=''
						}else{
							params['periodMoney']=this.averagePrice
						}
					}else{
						params['isPeriod']=2
						params['periodMoney']=''
					}
					console.log(params)
					axios.post('/qjrapi/office/t-office-order/createOfficeOrderByMeal',params
					).then(res => {
						if(res.meta.success){
						  this.isLoade=false
							uni.navigateTo({
								url:'/pages/home/orderPayment?id='+res.data.orderId
							})
							uni.removeStorageSync('addressInfo')
						}else{
							this.isLoade=false
							this.toast.fail(res.meta.msg)
						}
					})
				}
				
			},
			getMapList() {
				let that=this
				axios.post('/qjrapi/sys/t-sys-app-user/getAllAddressByUserId', {
				}).then(res => {
					if (res.meta.success) {
						res.data.forEach(item => {
							  if(item.beDefault==1){
								  that.addressId=item.id
								  that.address=item.address
							  }
						})
					} else {
						that.toast.fail('获取数据失败')
					}
				})
			},
			
			toBuyspan(){
				uni.navigateTo({
					url:'/pages/home/agreement'
				})
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
		
			tabwTime(e){
				this.timeId=e.id
				this.timeInfo=e.content
			},
			cancel(){
				this.$router.go(-1)
			},
			receive(){
				if(this.timeInfo.length==0){
					this.$toast({
					    message:'请选择服务时辰', duration: 1000
					})
					return
				}else if(this.area.length==0){
					this.$toast({
					    message:'请填写输入面积', duration: 1000
					})
					return
				}else if(this.addressId.length==0){
					   this.$toast({
					       message:'请选择地址', duration: 1000
					   })
					   return
				}
				
				if(this.area.toString().includes('.')){
						this.$toast({
						    message:'面积有小数点', duration: 1000
						})
						return
				}
				let timeinfo=this.timeInfo.split('-')
				let that=this
				this.isLoade=true
				let params=new FormData()
				params.append('appointDate',this.nowDate)
				params.append('beginTime',timeinfo[0])
				params.append('endTime',timeinfo[1])
				params.append('flatNum',this.area)
				params.append('remark',this.remark)
				params.append('addressId',this.addressId)
				axios.post('/office/t-office-order/createDiTanOrderByExperience',params).then(res => {
					console.log(res)
					if (res.meta.success) {
						
						
					   this.isLoade=false
					   // this.toast.success('领取成功')
					   this.showSuc=true
					   setTimeout(()=>{
						   that.showSuc=false
					   },1000)
					   let id={'orderId':res.data.orderId}
					    this.$router.push({"name":'orderPayment',params:id})
					   // uni.navigateTo({
					   // 	url:'/pages/home/recevieceSuccess?orderId='+res.data.orderId
					   // })
					}else{
						  this.isLoade=false
						  setTimeout(()=>{
							  	// that.toast.fail(res.meta.msg)
								that.$toast({
								    message:res.meta.msg, duration: 1500
								})
											
						  },500)
					
							
					}
					// uni.stopPullDownRefresh();
				})
			}
			
		},
		// onLoad(options) {
  //          // this.getMapList()

		// },
		watch: {
			area(newval,oldval) {
			if(this.signNum>0){
				this.couponNum=0
				this.couponId=''
			}		
			if(newval>30){
				this.$toast({
				    message:'最多只能30平', duration: 1000
				})
			}
			this.area=Number(newval)
			    // this.couponNum=0
				this.purposeNum=0
				this.discountNum=0
				this.signNum=1
				// this.tFlatPrice()
				// this.calculation()
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
		// }
	
	}
</script>

<style scoped>
	.conntent-info{
		/* height: 100%; */
		overflow: hidden;
	}
	.order{
		padding: 0 0.28rem;
		box-sizing: border-box;
		margin-top: 0.20rem;
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
		border-bottom: 1px solid #eee;
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
	.order-head  .money{
		color:#e01212 !important;
		font-size: 0.28rem;
		margin-right: 0.10rem;
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
		border-bottom: 1px solid #eee;
	
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
		margin-top:0px;
	}
/* 	.purchase uni-switch .wx-switch-input:not([class*="bg-"]), uni-switch .uni-switch-input:not([class*="bg-"]) {
		background:#01B90B !important;
	} */
	.exhort{
		padding: 0 0.16rem  0.10rem 0.16rem;
		background: #fff;
		height: 2.32rem;
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
		padding-bottom: 30upx;
	}
/* 	.explain uni-checkbox{
		display: block;
		width: 30upx ;
		height: 30upx;
		
	} */
	 .explain-sign{
		 width: 0.34rem;
		 height: 0.30rem;
		 border: 1px solid #999;
         display: flex;
		display: -webkit-box;
		display: -webkit-flex;
		justify-content: center;
		-webkit-box-pack: center;
		-webkit-justify-content: center;
		align-items: center;
		-webkit-box-align: center;
		-webkit-align-items: center;
		 overflow: hidden;
	 }
	  .explain-sign img{
		  width: 0.22rem;
		  height: 0.27rem;
		  margin-left: 0.02rem;
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
	    align-items: center;
	    -webkit-box-align: center;
	    -webkit-align-items: center;
        justify-content: flex-end;
		-webkit-box-pack: end;
		-webkit-justify-content: flex-end;
		background: #fff;
	}
	
	.order-bottom .cancle{
		border: 1px solid #999 !important;
		color: #000 !important;
		background: #fff !important;
		line-height: 66upx !important;
	}
	.order-bottom .btn{
		width: 1.70rem;
		height: 0.64rem;
		border-radius: 0.32rem;
		color: #fff;
		text-align: center;
		line-height: 0.66rem;
		margin-right: 0.20rem;
		background: #FF5F1E ;
		font-size: 0.3rem;
		box-sizing: border-box;
		
	}
	.tab-left{
		display: flex ;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
	.tab-left .stay{
		font-size: 0.30rem;
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
		border-top-right-radius: 0.30rem;
		z-index: 10;
		overflow: hidden;
		/* padding-bottom: 100upx; */
		overflow-x: hidden;
		overflow-y: scroll;
		transition: all 1s;
		padding-top: 0px;
		
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
		width: 700upx;
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
	.elastic-select {
	  background: #fff;
	}
	.elastic-select .select-title {
		font-size: 0.30rem;
		margin: 0 0 0.30rem 0.16rem;
		padding-top: 0.20rem;
	}
	
	.elastic-select .select-title span {
		color: #E01212;
	}
	
	.elastic-select .select-count {
		margin-left: 0.20rem;
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
		margin: 0 0.28rem 0.20rem 0;
		font-size: 0.29rem;
	}
	.elastic-select .count-info.countColor {
		background: #f8ecec;
		color: #ff3a30;
	}
	.mr-left{
	   margin-left: 0.15rem;
	}
	 .first-tit{
		 font-size: 0.25rem !important;
		 color:#333 !important;
		 
	 }
</style>
