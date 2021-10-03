<template>
	<div>
		<head-Piece>
			<template slot="content">历史任务详细</template>
		</head-Piece>
		<!-- <div class='head-show'>
		</div> -->
		<div class="info" v-if='showContent'>
			<div class='info-date'>
				{{info.appointDate}}
			</div>
			<div class='waiter'>
				<img :src='info.picUrl'></img>
				<div class='waiter-info'>
					<div>{{info.employeeName}}<span class='jobNum'>工号：{{info.code}}</span></div>
					<div class='num'>服务单号：{{info.serviceNo}}</div>
				</div>
			</div>
			<div class='signIn-time'>
				<div class='singIn-tit'>签到时间
					<span class='signIn-date'>{{info.signinDate}}</span><span class='signIn-dot'>{{info.signinTime}}</span>
				</div>
				<div class='singIn-img' v-if='signinPics.length>0'>
					<img :src='item' v-for='(item,index) in signinPics' :key='index' @click="predivIn(item)"></img>
				</div>
			</div>
			<div class='signIn-time'>
				<div class='singIn-tit'>签退时间
					<span class='signIn-date'>{{info.signoutDate}}</span><span class='signIn-dot'>{{info.signoutTime}}</span>
				</div>
				<div class='singIn-img' v-if='signoutPics.length>0'>
					<img :src='item' v-for='(item,index) in signoutPics' :key='index' @click="predivOut(item)"></img>
				</div>
			</div>
			<div class='assess' v-if='info.assessStatus==2'>
				评价内容
			</div>
			<div class='score' v-if='info.assessStatus==2'>
				<div class='content-attitude'>
					<div class='attitude'>
						服务态度
					</div>
					<div class='score'>
						<template v-for='(item,index) in frozen'>
							<img v-if='item===1' src='../../assets/activation.png'></img>
							<img v-if='item===0' src='../../assets/frozen.png'></img>
						</template>
						<template>

						</template>
					</div>

				</div>
				<div class='content-attitude'>
					<div class='attitude'>
						服务质量
					</div>
					<div class='score'>
						<template v-for='(item,index) in activation'>
							<img v-if='item===1' src='../../assets/activation.png'></img>
							<img v-if='item===0' src='../../assets/frozen.png'></img>
						</template>
						<template>
						</template>
					</div>
				</div>
				<div class='score-status'>
					{{info.situation}}
				</div>
			</div>

		</div>
		<Load v-if='isLoad'></Load>
		<wimg :show="isShowBigImg" :imgs="collageImg" :currentImg="current" @close="isShowBigImg = false" v-if='signinPics.length>0  || signoutPics.length > 0'></wimg>
	</div>

</template>

<script>
		import wimg from 'w-previewimg'
	import * as axios from '../../untils/ajax.js'
	export default {
		data() {
			return {
				activation: [0, 0, 0, 0, 0],
				frozen: [0, 0, 0, 0, 0],
				score1: 0,
				score2: 0,
				signinPics: [],
				signoutPics: [],
				info: {},
				id: '',
				showContent: false,
				isLoad: false,
				isShowBigImg:false,
				current:'',
				collageImg:[]
			}
		},
		components: {
		      wimg
		    },
		methods: {
			getInfo() {
				let that = this

				this.isLoad = true
				let params=new FormData()
				params.append('taskId',this.id)
				axios.post('/office/t-office-compose/getHistoryTaskDetail',params).then(res => {
					if (res.meta.success) {
						console.log(res.data)
						let data = res.data[0]
						data.picUrl = this.configUrl + data.picUrl
						if (data.signinPics.length > 0) {
							if (data.signinPics.includes(';')) {
								this.signinPics = data.signinPics.split(';').map(item => {
									console.log(item)
									return that.configUrl + item
								})
							} else {
								let imgIn = []
								let urlIn = this.configUrl + data.signinPics
								imgIn.push(urlIn)
								this.signinPics = imgIn
							}

						}
						if (data.signoutPics.length > 0) {
							if (data.signoutPics.includes(';')) {
								this.signoutPics = data.signoutPics.split(';').map(item => {
									return that.configUrl + item
								})
							} else {
								let imgOut = []
								let urlOut = this.configUrl + data.signoutPics
								imgOut.push(urlOut)
								this.signoutPics = imgOut
							}

						}

						let signinTime = data.signinTime.split(' ')
						data.signinDate = signinTime[0]
						data.signinTime = signinTime[1]
						let signoutTime = data.signoutTime.split(' ')
						data.signoutDate = signoutTime[0]
						data.signoutTime = signoutTime[1]
						this.info = data
						this.frozen = this.frozen.map((item, i) => {
							if (i < data.assessManner) {
								item = 1
							}
							return item
						})
						this.activation = this.activation.map((item, i) => {
							if (i < data.assessQuality) {
								item = 1
							}
							return item
						})
						this.showContent = true
						this.isLoad = false
					} else {
						this.isLoad = false
						setTimeout(() => {
							that.toast.fail('获取数据失败')
						}, 300)


					}
				})
			},
			predivIn(index) {
				let that = this
				this.collageImg=this.signinPics
                this.isShowBigImg=true
                this.current=index
				// uni.predivimg({

				// 	urls: that.signinPics,

				// 	current: that.signinPics[index]

				// });
			},
			predivOut(index) {
				let that = this
                this.collageImg=this.signoutPics
                this.isShowBigImg=true
                this.current=index
				// uni.predivimg({

				// 	urls: that.signoutPics,

				// 	current: that.signoutPics[index]

				// });
			}
		},
		created() {
			console.log(7777)
			this.id = this.$route.params.id
			this.getInfo()
		}
	}
</script>

<style scoped>
	.info {
		width: 6.94rem;
		margin: 0 auto;
	}

	.info .info-date {
		font-size: 0.30rem;
		height: 0.64rem;
		/* margin-left: 0.16rem; */
		line-height: 0.80rem;
		background: #fff;
		padding-left: 0.16rem;
		width: 100%;
		box-sizing: border-box;
	}

	.waiter {
		background: #fff;
		display: flex;
		display: -webkit-flex;
		-webkit-box-align: center;
		-ms-flex-align: center;
		-webkit-align-items: center;
		padding: 0.19rem 0.16rem;
		margin-bottom: 0.20rem;
	}

	.waiter img {
		width: 1.41rem;
		height: 1.41rem;
		margin-right: 0.16rem;
	}

	.waiter .waiter-info {
		font-size: 0.30rem;
	}

	.waiter .jobNum {
		font-size: 0.28rem;
		color: #5c5e5f;
		margin-left: 0.34rem;
	}

	.waiter .num {
		font-size: 0.23rem;
		color: #5c5e5f;
		margin-top: 0.17rem;
	}

	.signIn-time {
		background: #fff;
		padding: 0.27rem 0.16rem 0.20rem 0.16rem;
		margin-bottom: 0.20rem;
	}

	.singIn-tit {
		font-size: 0.30rem;
		color: #3c4244;
	}

	.singIn-tit span {
		font-size: 0.28rem;
		color: #5c5e5f;
	}

	.singIn-tit .signIn-date {
		margin: 0 0.25rem 0 0.45rem;
	}

	.singIn-img {
		margin-top: 0.25rem;
		display: flex;
		display: -webkit-box;
		display: -webkit-flex;

	}

	.singIn-img img {
		width: 1.60rem;
		height: 1.60rem;
		margin-right: 0.20rem;
	}

	.assess {
		height: 0.54rem;
		line-height: 0.62rem;
		margin-left: 0.16rem;
		font-size: 0.30rem;
	}

	.content-attitude {
		display: flex;
		display: -webkit-box;
		display: -webkit-flex;
		align-items: center;
		-webkit-box-align: center;
		-webkit-align-items: center;
		/* margin-top: 40upx; */
		/* margin-bottom: 27upx; */
	}


	.score .content-attitude:nth-child(2) {
		margin-top: -0.10rem;
		margin-bottom: 0.05rem;
	}

	.content-attitude .attitude {
		font-size: 0.30rem;
		margin-right: 0.50rem;
	}

	.content-attitude .score img {
		display: inline-block;
		width: 0.35rem;
		height: 0.35rem;
		margin-right: 0.35rem;
	}

	.score {
		background: #fff;
		padding: 0.25rem 0.16rem 0.12rem 0.16rem;
	}

	.score-status {
		font-size: 0.26rem;
		color: #97979f;
	}
	.zhezhao{
		z-index: 3000;
	}
</style>
