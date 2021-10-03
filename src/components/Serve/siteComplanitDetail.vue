<template>
	<div>
		<div class='head'>
			<div class='head-left' @click='toBack'>
				<img src="../../assets/left-black.png" mode=""></img>
				<span>返回</span>
			</div>
			<div class='head-center'>
				站点投诉详情
			</div>
			<div class='head-right'>

			</div>
		</div>
		<div class='head-show'>
		</div>
		<div class='content'>
			<div class='info-content'>
				<div>投诉编号:</div>
				<div class='cont-tit'>{{info.complainNo}}</div>
			</div>
			<div class='info-content content-phone' @click='toPhone()'>
				<div>投诉人:</div>
				<div class='cont-tit'>{{info.nickName}}</div>
				<img src="../../assets/task-phone.png" alt="">
			</div>
			<div class='info-content'>
				<div>投诉时间:</div>
				<div class='cont-tit'>{{info.complainTime}}</div>
			</div>
			<div class='info-content'>
				<div>投诉原因:</div>
				<div class='cont-tit' v-if='info.complainCause==1'>旷工</div>
				<div class='cont-tit' v-if='info.complainCause==2'>打扫不干净</div>
				<div class='cont-tit' v-if='info.complainCause==3'>其他</div>
			</div>
			<div class='complanit-img' v-if='info.complainPics.length>0'>
				<div class='img-tit'>
					投诉图片:
				</div>
				<div class='show-img'>
					<template>
						<img :src="item" alt="" v-for='(item,index) in  info.complainPics' :key='index' @click="preview(item)">


					</template>

				</div>
			</div>
			<div class='complanit-remark' v-if='info.complainRemark.length>0'>
				<div class='remark-tit'>
					投诉备注:
				</div>
				<div class='remark-text'>
					<textarea name="" id="" :value="info.complainRemark" readonly></textarea>
				</div>
			</div>
			<div class='info-content  content-phone' @click='toClearPhone()'>
				<div>清洁师:</div>
				<div class='cont-tit'>{{info.clearName}}</div>
				<img src="../../assets/task-phone.png" alt="">
			</div>
			<div class='info-content  content-phone'>
				<div>服务编号:</div>
				<div class='cont-tit'>{{info.serviceNo}}</div>
				<div class='serveDetail' @click='toServeDetail()'>
					服务详情
				</div>
			</div>
			<div class='info-content'>
				<div>处理状态:</div>
				<div class='cont-tit' v-if='info.handleStatus==1'>待处理</div>
				<div class='cont-tit' v-if='info.handleStatus==2'>处理中</div>
				<div class='cont-tit' v-if='info.handleStatus==3'>处理完成</div>
			</div>
			<div class='info-content' v-if='info.handleResult.length>0'>
				<div>处理结果:</div>
				<div class='cont-tit' v-if='info.handleResult ==1'>重新服务</div>
				<div class='cont-tit' v-if='info.handleResult ==2'>退款</div>
				<div class='cont-tit' v-if='info.handleResult ==3'>不予处理</div>
				<div class='cont-tit' v-if='info.handleResult ==4'>客户取消</div>
				<div class='cont-tit' v-if='info.handleResult ==5'>其他</div>
			</div>
			<div class='info-content' v-if='info.handleTime.length>0'>
				<div>处理时间:</div>
				<div class='cont-tit'>{{info.handleTime}}</div>
			</div>
			<div class='complanit-remark' v-if='info.handleReamrk.length>0'>
				<div class='remark-tit'>
					处理备注:
				</div>
				<div class='remark-text last-text'>
					<textarea name="" id="" :value="info.handleReamrk" readonly></textarea>
				</div>
			</div>
		</div>
		<div class='content-bottom' v-if='info.handleStatus==1 || info.handleStatus==2'>
			<div class='btn-right' @click='toComplaint'>
				处理
			</div>
		</div>
		<wimg :show="isShowBigImg" :imgs="info.complainPics" :currentImg="current" @close="isShowBigImg = false" v-if='info.complainPics.length>0'></wimg>
		<showMoadel v-if='modelFlag' :cont='msg' @define='confirm' @remove='cancel'></showMoadel>
		<Load v-if='isLoading'></Load>
	</div>
</template>

<script>
	import wimg from 'w-previewimg'
	import {
		mapGetters
	} from 'vuex'
		import * as axios from '../../untils/ajax.js'
	export default {
		data() {
			return {
				info: {
					complainPics: [],
					complainRemark:'',
					handleResult:'',
					handleReamrk:'',
					handleTime:''
				},
				modelFlag: false,
				msg: '',
				collagePhone: '',
				isShowBigImg: false,
				current: '',
				composeId:'',
				isLoading:false
			}
		},
		components: {
			wimg
		},
		computed: {
			...mapGetters(['showHandleTit'])
		},
		methods: {
			toBack() {
				this.$router.go(-1)
				// this.$router.push({
				// 	name: 'siteComplaintList'
				// })
			},
			cancel() {
				this.modelFlag = false
			},
			confirm() {
				if (this.collagePhone == 1) {
					window.location.href = 'tel://' + this.info.complainMobile
				} else {
					window.location.href = 'tel://' + this.info.clearMobile
				}

				this.modelFlag = false

			},
			toPhone(e) {
				this.collagePhone = 1
				this.msg = '您确定要拨打投诉人电话？'
				this.modelFlag = true
			},
			toClearPhone() {
				this.collagePhone = 2
				this.msg = '您确定要拨打清洁人电话？'
				this.modelFlag = true
			},
			toServeDetail() {
				let detail = this.info

				this.$router.push({
					name: 'serveDetail',
					params: {
						infos: detail
					}
				})
			},
			preview(index) {
				this.isShowBigImg = true
				this.current = index
				// this.$imagePreview({
				//         images: this.info.complainPics,
				//         index: index,
				//       })
			},
			toComplaint() {
				let detail = this.info
				this.$router.push({
					name: 'handlingComplaints',
					params: {
						info: detail
					}
				})
			},
			getInfo(){
				let params=new FormData()
				params.append('complainId',this.composeId)
				this.isLoading=true
				axios.post('/office/t-office-complain/mySiteComplainDetail',params).then(res =>{
					   if(res.meta.success){
						   
						  var info =res.data
						   if (info.complainPics.length > 0) {
						   	if (info.complainPics.includes(';')) {
						   		let complainImg = info.complainPics.split(';')
						   		complainImg = complainImg.map(item => {
						   			item = this.configUrl + item
						   			return item
						   		})
						   		info.complainPics = complainImg
						   	} else {
						   		let complainImg = []
						   		let url = this.configUrl + info.complainPics
						   		complainImg.push(url)
						   		info.complainPics = complainImg
						   	}
						   }
						   
						   if(info.signinPics.length>0){
						   			   if(info.signinPics.includes(';')){
						   			   			      let complainImg=info.signinPics.split(';')
						   			   				complainImg= complainImg.map(item=>{
						   			   						 item = this.configUrl+item
						   									 return item
						   			   				  })
						   						
						   							  info.signinPics =complainImg
						   			   }else{
						   			
						   			   		 let complainImg=[]
						   					 let url=this.configUrl+info.signinPics 
											 console.log(url)
						   					 complainImg.push(url)
						   					 info.signinPics =complainImg
											 console.log( this.info.signinPics)
						   			   }
						   }
						   if(info.signoutPics.length>0){
						   			   if(info.signoutPics.includes(';')){
						   			   			      let complainImg=info.signoutPics.split(';')
						   			   				  complainImg=complainImg.map(item=>{
						   			   						   item=this.configUrl+item
						   									   return item
						   			   				  })
						   							  this.info.signoutPics=complainImg
						   			   }else{
						   			   		 let complainImg=[]
						   					 let url=this.configUrl+info.signoutPics
						   					 complainImg.push(url)
						   					 info.signoutPics=complainImg
						   			   }
						   }
						      	this.isLoading=false
						   this.info=info
						
					   }
				})
			}
		},
		created() {


			if (this.$route.params.info) {
				this.infos = this.$route.params.info
			} else {
				let info = JSON.parse(window.localStorage.getItem('infoSite'))
				this.infos = info

			}

           this.composeId=this.infos.id
		   this.getInfo()
			// if (this.info.complainPics.length > 0) {
			// 	if (this.info.complainPics.includes(';')) {
			// 		let complainImg = this.info.complainPics.split(';')
			// 		complainImg = complainImg.map(item => {
			// 			item = this.configUrl + item
			// 			return item
			// 		})
			// 		this.info.complainPics = complainImg
			// 	} else {
			// 		let complainImg = []
			// 		let url = this.configUrl + this.info.complainPics
			// 		complainImg.push(url)
			// 		this.info.complainPics = complainImg
			// 	}
			// }
			// history.pushState(null, null, document.URL);
			//        window.addEventListener('popstate', function () {
			//            history.pushState(null, null, document.URL);
			// });

		},
		watch: {
			showHandleTit(newval, oldval){
		
					this.getInfo()
					// if (!this.$route.params.info && newval != null) {
					// 	this.$nextTick(() => {
					// 		this.info.handleStatus = newval
					// 	});
					// }
	
				
			}
		},

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
		z-index: 2;
	}

	.head-left {
		height: 0.88rem;
		/* line-height: 0.88rem; */
		float: left;
		width: 30%;
		/* display: flex; */
		position: relative;
	}

	.head-left img {
		width: 0.18rem;
		height: 0.32rem;
		position: absolute;
		/* margin-left: 0.28rem; */
		top: 50%;
		left: 0.28rem;
		transform: translateY(-50%);
		-webkit-transform: translateY(-50%);
	}

	.head-left span {
		/* margin-left: 0.60rem; */
		font-size: 0.32rem;
		position: absolute;
		/* margin-left: 0.28rem; */
		top: 50%;
		left: 0.6rem;
		transform: translateY(-50%);
		-webkit-transform: translateY(-50%);
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

	.content {
		background: #fff;
		margin-top: 0.1rem;
		/* padding-bottom: 1.1rem; */
	}

	.info-content {
		font-size: 0.3rem;
		height: 0.85rem;

		display: flex;
		display: -webkit-box;
		display: -webkit-flex;
		-webkit-box-align: center;
		-ms-flex-align: center;
		-webkit-align-items: center;
		border-bottom: 1px solid #ddd;
		margin: 0 0.16rem;
		padding-left: 0.16rem;
		align-items: center;

	}

	.cont-tit {
		margin-left: 0.1rem;
		color: #777;
	}

	.content-phone {
		position: relative;
	}

	.content-phone img {
		position: absolute;
		top: 50%;
		right: 0.16rem;
		transform: translateY(-50%);
		-webkit-transform: translateY(-50%);
		height: 0.39rem;
		width: 0.35rem;
		margin: 0;
	}

	.serveDetail {
		font-size: 0.28rem;
		width: 1.6rem;
		height: 0.58rem;
		line-height: 0.58rem;
		text-align: center;
		border: 1px solid #ff5f1e;
		border-radius: 0.15rem;
		color: #fff;
		background: #FF5F1E;
		position: absolute;
		top: 50%;
		right: 0.16rem;
		transform: translateY(-50%);
		-webkit-transform: translateY(-50%);
		box-sizing: border-box;
	}

	.complanit-img .img-tit {
		font-size: 0.3rem;
		margin: 0.2rem 0 0 0.3rem;
	}

	.show-img {
		padding: 0.15rem 0;
		margin: 0 0.16rem 0 0.16rem;
		border-bottom: 1px solid #ddd;
	}

	.show-img img {
		width: 1.6rem;
		height: 1.6rem;
		margin: 0.25rem 0.25rem 0 0.25rem;
	}

	.remark-tit {
		margin: 0.2rem 0 0 0.3rem;
		font-size: 0.3rem;
	}

	.remark-text{
		width: 6.94rem;
		height: 1.66rem;
		/* overflow: hidden; */
		/* overflow-y: scroll; */
		/* overflow-y:auto; */
		/* border: 1px solid #ddd; */
		border: 1px solid #ddd;
		z-index: 1;
		overflow-y: scroll !important;
		overflow-x: visible;
		margin-top: 0.29rem;
		margin-left: 0.26rem;

	}
	.remark-text.last-text{
		
		margin-bottom: 1rem;
	}

	.remark-text textarea {
		display: block;
		height: 1.76rem;
		width: 98%;
		overflow-y: scroll;
		outline: none;
		border: none;
	}

	textarea {
		padding: 0.15rem 0 0 0.15rem;
		box-sizing: border-box;
		resize: none;
		border: none;
		font-size: 0.28rem;
		/* scrollbar-arrow-color:yellow; */
		/* scrollbar-base-color:lightsalmon; */
	}

	.remark-text::-webkit-scrollbar {
		display: block;
		width: 0.3rem;
		height: 0.3rem;
	}

	.remark-text::-webkit-scrollbar-track-piece {
		background-color: #f5f5f5;
	}

	.remark-text::-webkit-scrollbar-thumb {
		border-radius: 0.4rem;
		background-color: #ddd;
		background-clip: padding-box;
		min-height: 0.28rem;

	}

	.content-bottom {
		position: fixed;
		bottom: 0;
		background: #fff;
		width: 100%;
		height: 1rem;
		display: -webkit-box;
		display: -ms-flexbox;
		display: -webkit-flex;
		display: flex;
		-webkit-box-align: center;
		-ms-flex-align: center;
		-webkit-align-items: center;
		align-items: center;
		-webkit-box-pack: end;
		-ms-flex-pack: end;
		-webkit-justify-content: flex-end;
		justify-content: flex-end;
		font-size: 0.28rem;
	}

	.btn-right {
		width: 1.7rem;
		height: 0.64rem;
		border-radius: 0.32rem;
		border: 1px solid #ff5f1e;
		color: #FF5F1E;
		text-align: center;
		line-height: 0.64rem;
		margin-right: 0.2rem;
		box-sizing: border-box;
	}

	.zhezhao {
		z-index: 3;
	}
</style>
