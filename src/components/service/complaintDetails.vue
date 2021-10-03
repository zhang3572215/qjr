<template>
	<div>
		<head-Piece>
			<template slot="content">投诉详细</template>
		</head-Piece>
		
		<div class='content'>
			<div class='num'>投诉编号：<span>{{info.complainNo}}</span></div>
			<div class='complaint'>
				<div class='complaint-tit'>投诉时间：<span>{{info.complainDate}}</span><span>{{info.complainTime}}</span></div>
				<div class='type' v-if='info.handleStatus==1'>待处理</div>
				<div class='type' v-if='info.handleStatus==2'>处理中</div>
				<div class='type' v-if='info.handleStatus==3'>处理完成</div>
			</div>
			<div class='complaint'>
				<div class='complaint-tit'>服务编号：<span>{{info.serviceNo}}</span></div>
				<div class='btn-left' v-if='info.handleStatus==1' @click='todetail(info.composeId)'>服务详细</div>
				
			</div>
			<div class='num'>投诉原因：<span v-if='info.complainCause ==1'>旷工</span><span v-if='info.complainCause ==2'>打扫不干净</span>
				<span v-if='info.complainCause ==3'>其他</span></div>
			<div class='evidence' v-if='info.imgList.length > 0'>
				<div class='evidence-tit'>证据</div>
				<div class='evidence-img'>
					<img :src='item' v-for='(item,index) in info.imgList' @click="prediv(item)"></img>
					<!-- <img src='../../static/banner-clean.png'></img> -->
				</div>
			</div>

			<div class='complaint-remark' :class='info.handleStatus!=3?"showBorder":""'>
				<div class='remark-tit'>
					投诉备注：
				</div>
				<div class='remark-span'>
					<textarea :value='info.complainRemark' disabled='true'></textarea>
				</div>
			</div>

		</div>
		<div class='hanlde' v-if='info.handleStatus==3'>
			处理情况
		</div>
		<div class='content' v-if='info.handleStatus==3'>
			<div class='num'>处理结果：<span v-if='info.handleResult ==1'>重新服务</span><span v-if='info.handleResult ==2'>退款</span>
				<span v-if='info.handleResult ==3'>不予处理</span><span v-if='info.handleResult ==4'>客户取消</span><span v-if='info.handleResult ==5'>其他</span></div>
			<div class='complaint'>
				<div class='complaint-tit'>处理时间：<span>{{info.handleDate}}</span><span>{{info.handleTime}}</span></div>
			</div>
			<div class='complaint-remark'>
				<div class='remark-tit'>
					处理备注：
				</div>
				<div class='remark-span'>
					<textarea :value='info.handleReamrk ' disabled='true'></textarea>
				</div>
			</div>
		</div>
		<Load v-if='isLoad'></Load>
		<wimg :show="isShowBigImg" :imgs="info.imgList" :currentImg="current" @close="isShowBigImg = false" v-if='info.imgList.length>0'></wimg>
	</div>
</template>

<script>
	import * as axios from '../../untils/ajax.js'
		import wimg from 'w-previewimg'
	export default {
		data() {
			return {
				info: {imgList:[]},
				id: '',
				isLoad: false,
				isShowBigImg: false,
				current: '',
				isSuccess: false,
				isLoad:false
			}
		},
		components: {
			wimg
		},
		methods: {
			getInfo() {
				let that = this
				//          let params=new FormData()
				// params.append('complainId',this.id)
				this.isLoad = true
				let params=new FormData()
				params.append('complainId',that.id)
				axios.post('/office/t-office-complain/getCompDetail',params).then(res => {
		            
					if(res.meta.success) {
						let data = res.data
						console.log(data)
						// if(res.data.length==0){
						
						// 	return
						// }
				
						let date1 = data.complainTime.split(' ')
						data.complainDate = date1[0]
						data.complainTime = date1[1]
						if(data.handleTime.length != 0) {
							
							let date2 = data.handleTime.split(' ')
							data.handleDate = date2[0]
							data.handleTime = date2[1]
						}
						if(data.complainPics.length > 0) {
							if(data.complainPics.includes(';')){
								let img = data.complainPics.split(';')
								let imgList = []
								for (var i = 0; i < img.length; i++) {
									imgList.push(this.configUrl + img[i])
								}
								data.imgList = imgList
							}else{
								let imgList=[]
								let imgUrl= this.configUrl +  data.complainPics
							     imgList.push(imgUrl)
								 data.imgList=imgList
								 console.log(data)
							}
							
						}else{
							data.imgList=[]
						}
						
						that.info = data
						
						this.isLoad = false
						console.log(that.info)
						
					} else {
						this.isLoad = false
					}
				})
			},
			todetail(e){
				let info={
					complainNo:e
				}
				this.$router.push({'name':'details',params:info})
				 // uni.navigateTo({
				 // 	url:'/pages/service/details?composeNo='+e
				 // })
			},
			prediv(index){
				let that=this
				this.isShowBigImg = true
				this.current = index
				// uni.predivimg({
				
				// 	urls: that.info.imgList,
				
				// 	current: that.info.imgList[index]
				
				// });
			}
		},
		created() {
		
			// 点击消息推送跳转过来的
			if (this.$getOther.getUrlInfo('id')) {
				this.id = this.$getOther.getUrlInfo('id')
			} else {
				this.id = this.$route.params.id
			}
			
	
		// if(options.isRead && options.isRead==2){
		// 	let badgeNumber= uni.getStorageSync('badgeNumber') - 1
		// 	  uni.setStorageSync('badgeNumber',badgeNumber)
		// 	 plus.runtime.setBadgeNumber(badgeNumber)
		// }
			this.getInfo()
		if(this.$route.params.isRead && this.$route.params.isRead==2){
			
		}
		
		}
	}
</script>

<style scoped>
	.content {
		background: #fff;
		/* margin-top: 0.20rem; */
		padding: 0 0.28rem;
	}

	.content>div {}

	.num {
		height: 0.90rem;
		line-height: 0.90rem;
		color: #5f5f6b;
		border-bottom: 1px solid #eee;
		font-size: 0.30rem;
	}

	.complaint {
		height: 0.90rem;
		border-bottom: 1px solid #eee;
		color: #5f5f6b;
		display: flex;
		display: -webkit-box;
		display: -webkit-flex;
		justify-content: space-between;
		-webkit-box-pack: justify;
		-webkit-justify-content: space-between;
		align-items: center;
		-webkit-box-align: center;
		-webkit-align-items: center;
		font-size: 0.30rem;
	}

	.complaint .type {
		color: #ff2a2a;
		font-size: 0.26rem;
	}
	 .complaint .btn-left {
		font-size: 0.28rem;
		width: 1.60rem;
		height: 0.58rem;
		line-height: 0.58rem;
		text-align: center;
		border: 1px solid #ff5f1e;
		border-radius: 0.15rem;
		color: #fff;
		background:#FF5F1E ;
		box-sizing: border-box;
	}

	.complaint-tit span {
		margin-right: 0.20rem;
	}

	.evidence {
		font-size: 0.30rem;
		color: #5f5f6b;
		padding-bottom: 0.30rem;
		border-bottom: 1px solid #eee;
	}

	.evidence .evidence-tit {
		height: 0.88rem;
		line-height: 0.88rem;
	}

	.evidence-img img {
		width: 1.60rem;
		height: 1.60rem;
		display: inline-block;
		margin-right: 0.25rem;
	}

	.complaint-remark {
		font-size: 0.30rem;
		color: #5f5f6b;
		padding: 0.28rem 0 0.28rem 0;
		border-bottom: 1px solid #eee;
	}

	.remark-tit {}

	.remark-span {
		width: 100%;
		height: 1.46rem;
		/* overflow: hidden; */
		/* overflow-y: scroll; */
		/* overflow-y:auto; */
		border: 1px solid #ddd;
		z-index: 1;
		overflow-y: scroll !important;
		overflow-x: visible;
		margin-top: 0.29rem;
	}

	.remark-span::-webkit-scrollbar {
		display: block;
		width: 0.30rem;
		height: 0.30rem;
	}

	.remark-span::-webkit-scrollbar-track-piece {
		background-color: #f5f5f5;
	}

	.remark-span::-webkit-scrollbar-thumb {
		border-radius: 0.40rem;
		background-color: #ddd;
		background-clip: padding-box;

		min-height: 28px;

	}

	.remark-span textarea {
		display: block;
		height: 1.60rem;
		width: 96%;
		background: #fff;
		border: none;
		/* border:1px  solid #ddd; */
	}
   .remark-span textarea:disabled{
	   -webkit-text-fill-color:  #5f5f6b;   
       -webkit-opacity: 1;
	   color: #5f5f6b;
   }
	.hanlde {
		height: 0.77rem;
		line-height: 0.79rem;
		color: #ff2a2a;
		font-size: 0.32rem;
		background: #f8f8fa;
		width: 100vw;
		padding: 0 0.28rem;
	}

	textarea {
		padding: 0.15rem 0 0 0.15rem;
	}

	.showBorder {
		border-bottom: none !important;
	}
	.zhezhao {
		z-index: 300;
	}
</style>
