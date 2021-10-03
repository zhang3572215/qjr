<template>
	<!-- 打卡日历页面 -->
	<div>
		<div class='contents'>
			<div class='head'>
				<div class='head-left' @click='toBack'>
					<img src="../assets/left-black.png" mode=""></img>
					<span>返回</span>
				</div>
				<div class='head-center'>
					选择日期
				</div>
				<div class='head-right'>

				</div>
			</div>
		</div>
		<div class='head-show'>
		</div>
		<div class='all'>

			<div class="bar ">
				<!-- 上一个月 -->
				<div class="previous" @click="handleCalendar(0)">
					<div class='btn' v-if="langType=='ch'">上一月</div>
					<div v-else>Last</div>
				</div>
				<!-- 显示年月 -->
				<div class="date">{{cur_year || "--"}} 年 {{cur_month || "--"}} 月</div>
				<!-- 下一个月 -->
				<div class="next" @click="handleCalendar(1)">
					<div class='btn second' v-if="langType=='ch'">下一月</div>
					<div v-else>Next</div>
				</div>
			</div>
			<!-- 显示星期 -->
			<div class="week bg-gradual-blue" v-if="langType=='ch'">
				<div v-for="(item,index) in weeks_ch" :key="index">{{item}}</div>
			</div>
			<div class="week bg-gradual-blue" v-else>
				<div v-for="(item,index) in weeks_en" :key="index">{{item}}</div>
			</div>
			<div v-if="true" class="myDateTable clearfix">
				<div v-for="(item,j) in days" :key="j" class='dateCell  ' :class='(j+1)%7==0?"mr-right":""'>
					<div v-if="item.date==undefined||item.date == null" class='cell'>
						<span :decode="true"></span>
					</div>
					<div v-else>

						<div @click="clickSignUp(item.date,0,j)" class="cell redColor bgGray " :class="item.showColor===true?'greenColor':''"   v-if='item.date>=day'>
							<!-- 小程序不兼容这个 v-else-if="(new Date(cur_year+'-'+cur_month+'-'+item.date))<(new Date())"> -->
							<span>{{item.date}}</span>
						</div>
						<div class="cell redColor bgGray black " v-else>
							
							<span>{{item.date}}</span>
						</div>

					</div>

				</div>
			</div>
		</div>
		<div class='btn-list'>
			<div class='btn-left' @click="cancel">
				取消
			</div>
			<div class='btn-right' @click="subscribe">
				预约
			</div>
		</div>
	
		<Load v-if='isLoading'></Load>
		<div class='total-success' v-if='isSuccess'>
			<div class='success-img'><img src="../assets/true-1.png" alt=""></div>
			<div class='success-tit'>{{successInfo}}</div>
		</div>
		<!-- 	<div class='total-success' v-if='isFalse'>
			<img src="../assets/fail.png" alt="">
			<span>请求出错</span>
		</div> -->
		<!-- <empty v-if='showEmpty'></empty> -->
		<showFail v-if='isFalse' :msg="failInfo"></showFail>
	</div>
</template>

<script>
	import {
		mapActions
	} from 'vuex'
  	import * as axios from '../untils/ajax.js'
	export default {
		data() {
			return {
				days: [],
				SignUp: [],
				cur_year: 0, //当前选的年
				cur_month: 0, //当前选的月
				today: parseInt(new Date().getDate()), //本日
				toMonth: parseInt(new Date().getMonth() + 1), //本月
				toYear: parseInt(new Date().getFullYear()), //本年
				weeks_ch: ['日', '一', '二', '三', '四', '五', '六'],
				weeks_en: ['Sun', 'Mon', 'Tues', 'Wed', 'Thur', 'Fri', 'Sat'],
				showColor: false,
				day: '',
				nowDate: '',
				dateDes: '',
				dotTime:'',
				biographyInfo:'',
				isLoading: false, // 是否正在加载
				isSuccess: false,
				isFalse: false,
				successInfo:''
			};
		},
		props: {
			msg: {
				type: String,
				required: true
			},
			sendYear: {
				type: Number,
				default: new Date().getFullYear()
			},
			sendMonth: {
				type: Number,
				default: new Date().getMonth() + 1
			},
			dataSource: { //已签到的数据源
				type: Array,
				default: () => {
					return ["2019-10-04", "2019-10-08", "2019-10-09", "2019-10-13"]
				}
			},
			langType: { //只是示例一个翻译而已，要想所有都翻译自己可以再加加
				type: String,
				default: "ch"
			},
		},
		created() {
			console.log(this.$route.params.date)
			this.dateDes = this.$route.params.date
			this.nowTime()
			let dates = this.nowDate
			 this.dates=dates.split('-')

			dates = dates.split('-')
			console.log(dates)
			this.cur_year = dates[0];
			this.cur_month = dates[1];

			this.calculateEmptyGrids(this.cur_year, this.cur_month);
			this.calculateDays(this.cur_year, this.cur_month);
			this.onJudgeSign();

			var date = new Date()
			let day = date.getDate()
			this.day = dates[2]
			let month = date.getMonth() + 1

			this.month = dates[1]
			let year = date.getFullYear()
			this.year = Number(dates[0])
			console.log(year)
		},
		watch: {
			dataSource: 'onResChange',
		},
		methods: {

			...mapActions(['addDates', 'addDateStartDess', 'addDateEndDess']),
			toBack() {
				this.$emit('biography')
			},
			// 获取当月共多少天
			getThisMonthDays(year, month) {
				return new Date(year, month, 0).getDate()
			},
			nowTime() {
				var myDate = new Date();
				myDate.setDate(myDate.getDate() + 2); //获取AddDayCount天后的日期  
				var y = myDate.getFullYear();
				var m = (myDate.getMonth() + 1) < 10 ? "0" + (myDate.getMonth() + 1) : (myDate.getMonth() + 1); //获取当前月份的日期，不足10补0  
				var d = myDate.getDate() < 10 ? "0" + myDate.getDate() : myDate.getDate(); //获取当前几号，不足10补0  
				this.nowDate = y + "-" + m + "-" + d;
				console.log()
			},
			// 获取当月第一天星期几
			getFirstDayOfWeek(year, month) {
				return new Date(Date.UTC(year, month - 1, 1)).getDay();
			},
			// 计算当月1号前空了几个格子，把它填充在days数组的前面
			calculateEmptyGrids(year, month) {
				//计算每个月时要清零
				this.days = [];
				const firstDayOfWeek = this.getFirstDayOfWeek(year, month);
				console.log(firstDayOfWeek)
				if (firstDayOfWeek > 0) {
					for (let i = 0; i < firstDayOfWeek; i++) {
						var obj = {
							date: null,
							isSign: false,
							id: i
						}
						this.days.push(obj);
					}
				}
			},

			// 绘制当月天数占的格子，并把它放到days数组中
			calculateDays(year, month) {

				const thisMonthDays = this.getThisMonthDays(year, month);
				// this.columnsLen=Math.ceil(thisMonthDays/7);
				// console.log(this.columnsLen);
				for (let i = 1; i <= thisMonthDays; i++) {
					var obj = {
						date: i,
						isSign: false,
						showColor: false
					}
					this.days.push(obj);
				}
				//console.log(this.days);

			},

			onResChange(newD, oldD) {
				this.SignUp = newD;
				this.onJudgeSign();
			},
			//匹配判断当月与当月哪些日子签到打卡
			onJudgeSign() {

				var signs = this.SignUp;
				var daysArr = this.days;
				for (var i = 0; i < signs.length; i++) {
					var current = new Date(signs[i]); //.replace(/-/g, "/")
					var year = current.getFullYear();
					var month = current.getMonth() + 1;
					var day = current.getDate();
					day = parseInt(day);
					for (var j = 0; j < daysArr.length; j++) {
						//年月日相同则打卡成功   						
						if (year == this.cur_year && month == this.cur_month && daysArr[j].date == day) { //&& signs[i].isSign == "今日已打卡"
							// console.log(daysArr[j].date, day);
							daysArr[j].isSign = true;
						}
					}
				}
				this.days = daysArr;
			},

			// 切换控制年月，上一个月，下一个月
			handleCalendar(type) {
				console.log(type)
				const cur_year = parseInt(this.cur_year);
				const cur_month = parseInt(this.cur_month);
				var newMonth;
				var newYear = cur_year;
				var date = new Date()
				let day = Number(this.dates[2])
				if (type === 0) { //上个月
					newMonth = cur_month - 1;
					if (newMonth < 1) {
						newYear = cur_year - 1;
						newMonth = 12;
					}

					console.log(this.month)
					console.log(newMonth)
					if (this.month > newMonth) {
						this.day = 33
					} else if (this.year == newYear && this.month < newMonth) {
						this.day = -1
					} else {
						this.day = day
					}
					console.log(this.year)
					console.log(newYear)
					if (this.year > newYear) {
						this.day = 32
					} else if (this.year < newYear) {
						this.day = -1
					}
				} else {



					newMonth = cur_month + 1;
					if (newMonth > 12) {
						newYear = cur_year + 1;
						newMonth = 1;
					}

					console.log(this.year)
					console.log(newYear)
					if (this.month > newMonth) {
						this.day = 32
					} else if (this.month == newMonth) {
						this.day = day
					} else {
						this.day = -1
					}
					if (this.year < newYear) {
						this.day = -1
					} else if (this.year > newYear) {
						this.day = 32
					}
				}
				this.calculateEmptyGrids(newYear, newMonth);
				this.calculateDays(newYear, newMonth);

				this.cur_year = newYear;
				this.cur_month = newMonth;

				this.SignUp = []; //先清空
				this.$emit('dateChange', this.cur_year + "-" + this.cur_month); //传给调用模板页面去拿新数据				
			},

			clickSignUp(date, type, index) { //0补签，1当日签到		
				//this.$http.postHttp("Comment/UpdateRecord", "", (res) => {//可以通过后台接口添加当前用户当日打卡记录，
				//console.log(res);
				//if (res!= undefined) {


				// var str = "签到";
				// if (type == 0) {
				// 	str = "";
				// }
				// uni.showToast({
				// 	title: "选择成功" + date + "号",
				// 	icon: 'success',
				// 	duration: 2000
				// });
			    this.successInfo="选择成功" + date + "号",
				this.isSuccess=true
				let that=this
				setTimeout(() => {
					 that.isSuccess=false
				},1000)
				this.SignUp.push(this.cur_year + "-" + this.cur_month + "-" + date); //自动加假数据，写了接口就不用了

				this.$emit('clickChange', this.cur_year + "-" + this.cur_month + "-" + date); //传给调用模板页面


				//refresh
				this.onJudgeSign();

				//}
				this.days = this.days.map((item, i) => {
					if (i === index) {
						item.showColor = true
					} else {
						item.showColor = false
					}
					return item
				})
				let cur_month = this.cur_month.toString()
				cur_month = cur_month.length == 1 ? "0" + cur_month : cur_month,
					console.log(cur_month)
				date = date.toString()
				date = date.length == 1 ? "0" + date : date
				let time = this.cur_year.toString() + '-' + cur_month + '-' + date
				
                this.dotTime=time
				// this.addDates(time)
				// console.log(this.msg)
				// if (this.msg == 'start') {
				// 	this.addDateStartDess({
				// 		des: "start",
				// 		date: time
				// 	})
				// } else if (this.msg == 'end') {
				// 	this.addDateEndDess({
				// 		des: "end",
				// 		date: time
				// 	})
				// }
				// uni.navigateBack({

				// })
				// this.$router.go(-1)
				// this.$emit('biography')
			},
			subscribe() {
				// this.showFrame = !this.showFrame
					let that = this
				if(this.dotTime.length==0){
					this.failInfo = '请选择日期'
					this.isFalse = true
					setTimeout(() => {
						that.isFalse = false
					}, 1000)
					return
				}
			
				let params = new FormData()
				this.isLoading=true
				this.biographyInfo =JSON.parse(this.msg)
				params.append('startDate', this.biographyInfo.startDate)
				params.append('appointDate',this.dotTime)
				params.append('orderId', this.biographyInfo.orderId)
				params.append('beginTime', this.biographyInfo.beginTime)
				params.append('endTime', this.biographyInfo.endTime)
				axios.post('/office/t-office-appoint/postAppoint', params).then(res => {
					if (res.meta.success) {
						// this.showFlag = false
						// this.isLoad = false
						// this.toast.success('预约成功')
						this.isLoading=false
						this.isSuccess = true
						this.successInfo = '预约成功'
						setTimeout(() => {
							that.isSuccess = false
							that.$emit('biography')
						}, 1000)
						// this.list=[]
						// this.pageNo=1
						// this.pageSize=8
						// this.getList()
					} else {
						this.isLoading=false
						this.failInfo = res.meta.msg
						this.isFalse = true
						setTimeout(() => {
							that.isFalse = false
						}, 1000)
						// this.toast.fail('预约失败')
					}
				})
			},
			cancel(){
				this.$emit('biography')
			}
		}

	}
</script>

<style scoped>
	.contents {
		position: fixed;
		top: 0;
		z-index: 100;
		width: 100vw;
	}

	.head {
		padding-top: 0.40rem;
		height: 0.88rem;
		width: 100vw;
		/* background: #36a8fa; */
		background: #fff;
		text-align: center;
		position: relative;
		box-sizing: content-box;
		/* color:#fff; */
		font-size: 0.33rem;
		z-index: 20000;
	}

	/* 
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

	} */
	.head-left {
		height: 100%;
		/* line-height: 0.88rem; */
		float: left;
		width: 30%;
		/* display: flex; */
		position: relative;
	}

	.head-left img {
		display: inline-block;
		width: 0.18rem;
		height: 0.32rem;
		position: absolute;
		margin-left: 0.28rem;
		top: 50%;
		left: 0;
		transform: translateY(-50%);
		-webkit-transform: translateY(-50%);
	}

	.head-left span {
		margin-left: 0.35rem;
		font-size: 0.32rem;
		position: absolute;
		top: 50%;
		left: 0;
		transform: translateY(-50%);
		-webkit-transform: translateY(-50%);
		width: 50%;
	}

	.head-center {
		height: 100%;
		width: 40%;
		line-height: 0.88rem;
		text-align: center;
		float: left;
		font-size: 0.36rem;
		font-family: Arial !important;
		font-weight: 500 !important;
	}

	/* .head-right{
	 
	  height: 88upx;
	  width: 30%;
	
	} */
	.head-right {
		/* height: 100%; */
		line-height: 0.85rem;
		float: right;
		width: 30%;
		display: flex;
		justify-content: flex-end;
		padding-right: 0.28rem;
	}

	.all {
		margin-top: 0.20rem;
		background: #fff;
	}

	.all .bar {

		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		margin: 0.30rem 0.20rem;
		padding: 0.10rem;
		/* width: 100%; */
		height: 0.6rem;
		line-height: 0.6rem;

	}
    .all .bar .previous{
		width: 30%;
		 float: left; 
	}
	.all .bar .date {
		font-size: 0.27rem;
		float: left;
		width: 40%;
		height: 0.6rem;
		line-height: 0.6rem;
			text-align:center;
	}
     .all .bar  .next{
	   width: 30%;
	    float: right; 
		text-align:right;
   }
	.btn {
		
		padding: 0 0.14rem;
		box-sizing: border-box;
		font-size: 0.28rem !important;
		text-align: center;
		text-decoration: none;
		line-height: 0.6rem;
		border-radius: 5px;
		-webkit-tap-highlight-color: transparent;
		overflow: hidden;
		color: #000;
		background-color: #f8f8f8;
		border: 1px solid rgba(0, 0, 0, .2);
		height: 0.6rem;
		width: 1.3rem;
	}
  .btn.second{
	  float: right;
  }
	.btn:active {
		background: #dedede;
		color: rgba(0, 0, 0, 0.6);
	} 
   
	.bar .btn {
		margin: 0;
		padding: 0;
		/* height: 0.30rem; */
		/* line-height: 0.30rem; */
		font-size: 0.12rem;

	}

	.all .week {
		/* display: flex;
		flex-direction: row;
		justify-content: space-between; */
		padding: 0.20rem;
		padding-left: 0.40rem;
		padding-right: 0.40rem;
		margin: 0.20rem;
		border-radius: 0.10rem;
		background-color: #fff;
		font-size: 0.28rem !important;
		height: 0.32rem;
	}

	.all .week div {
		margin-right: 0.12rem;
		float: left;
		width: 14.1%;
		/* text-align: center; */
	}
.all .week div:last-child{
	  width: 1%;
}
	.myDateTable {
		/* height: 4.05rem; */
		margin: 2.5vw;
		padding: 2vw;
		padding-right: 0;
		border-radius: 0.10rem;
		background: linear-gradient(#74AADA, #94db98);
		/* display: flex;
		flex-wrap: wrap; */
	}

	.myDateTable .dateCell {
		/* width: 12vw; */
		padding: 1vw;
		margin-right: 0.218rem;
		/* display: inline-block; */
		text-align: center;
		font-size: 0.3rem;
		float: left;

	}
   .clearfix::after{
	   display: block;
	   clear: both;
	   content: '';
	   visibility: hidden;
	   height: 0;
   }
	.myDateTable .dateCell.mr-right {
		margin-right: 0;
	}

	.dateCell .cell {

		display: flex;
		border-radius: 50%;
		height: 0.65rem;
		width: 0.65rem;
		text-align: center !important;
		/* justify-content: center;
		align-items: center; */
		line-height: 0.65rem;
		
		/* margin-right:1upx ; */
	}
.dateCell .cell span{
	width: 100%;
	text-align: center;
}
	.bg-gradual-blue {
		background-image: -webkit-linear-gradient(45deg, #0081ff, #1cbbb4);
		background-image: linear-gradient(45deg, #0081ff, #1cbbb4);
		color: #ffffff;
	}

	.whiteColor {
		color: #fff;
	}

	.greenColor {
		color: #01b90b !important;
		/* color:#E01212; */
		font-weight: bold;
	}

	.black {
		color: #999 !important;
	}

	.bgWhite {
		background-color: #fff;
	}

	.bgGray {
		background-color: rgba(255, 255, 255, 0.42);
	}

	.bgBlue {
		font-size: 0.14rem;
		background-color: #4b95e6;
	}

	.redColor {
		color: #f00;
	}
	.btn-list{
		position: fixed;
		bottom: 1.4rem;
		/* display: flex; */
		/* justify-content: space-between; */
		width: 100vw;
	}
	.btn-left{
		height: 1rem;
		width: 2.2rem;
		border-radius: 0.50rem;
		line-height: 1rem;
		text-align: center;
		color: #000;
		background:#fff;
		margin-left: 0.2rem;
		font-size: 0.38rem;
		border: 1px solid #999 !important;
		color: #000 !important;
		float:left ;
	}
	.btn-right{
		height: 1rem;
		background: #f1f1f1;
		width: 2.2rem;
		border-radius: 0.50rem;
		line-height: 1rem;
		text-align: center;
		color: #fff;
		margin-right: 0.20rem;
		background-color:#ff5f1e ;
		float: right;
		font-size: 0.38rem;
	}
	.shadowArea {
		position: fixed;
		bottom: 0.98rem;
		height: 100%;
		width: 100%;
		background: rgba(0, 0, 0, 0.3);
		z-index: 10;
	}
	.total-success {
			position: fixed;
			top: 5.7rem;
			background: rgba(44, 44, 44, 0.8);
		/* 	display: flex;
			flex-direction: column;
			align-items: center; */
			font-size: 0.28rem;
			color: #fff;
			width: 2.2rem;
			height: 2.15rem;
			border-radius: 0.15rem;
			left: 50%;
			transform: translateX(-50%);
			z-index: 1000;
		}
	 .total-success .success-img{
			 width:100%;
			 height:1.4rem;
			 position: relative;
			 text-align: center;
		 }
		.total-success img {
			width: 1.1rem;
			height: 1.05rem;
			margin-top: 0.35rem;
		}
	
	 .total-success   .success-tit{
		   width: 100%;
		   text-align: center;
	}
</style>
