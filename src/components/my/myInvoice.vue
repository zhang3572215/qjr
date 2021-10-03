<template>
	<div class='containerHeight' @touchstart="touchStart($event)" @touchmove="touchMove($event)" @touchend="touchEnd($event)">
		<head-Piece :sign='signInfo'>
			<template slot="content">开票信息</template>
			<!-- <block slot='content-right'>历史发票</block> -->
		</head-Piece>

		<!-- <div class='content-btn'>
			<div class='btn-info'>
				<div class='btn' @click="collage(1)" :class='type == 1?"sign-color":""'>
					信息服务类
				</div>
				<div class='btn' @click="collage(2)" :class='type == 2?"sign-color":""'>
					保洁服务类
				</div>
		
			</div>
		</div> -->
		<!-- 	<div class='content-show'>
			
		</div> -->
		<div class="content-list">
			<div v-for='(item,index) in list'>
				<div class='list' v-if='item.type == 2'>
					<div class='list-head'>
						<div>{{item.head}}</div>
						<!-- <radio value="" class='radios' :checked="flag" @click='tabFalg' style="transform: scale(0.72);" /> -->
						<!-- <div class='radios' :class='item.status===false?"signColor":""' @click='tabFalg(index)'>
							<img src='../../static/dui.png'></img>
						</div> -->
					</div>
					<div class='invoice-info'>
						<div>{{item.code}}</div>
						<!-- <div>增值税普通发票</div> -->
						<div>开户银行账号：<span>{{item.bankNo}}</span></div>
						<div>{{item.bankName}}</div>
						<div>
							增值税专用发票
						</div>
					</div>
					<div class='list-btn'>
						<div class='btn-edit' @click="edit(item)">
							<div>编辑</div>
							<img src='../../assets/edit.png'></img>
						</div>
						<div class='btn-del' @click="del(item.id)">
							<div>删除</div>
							<img src='../../assets/del.png'></img>
						</div>
					</div>
				</div>
				<div class='list' v-if='item.type==1'>
					<div class='list-head'>
						<div>{{item.head}}</div>
						<!-- <div class='radios' :class='item.status===true?"signColor":""' @click='tabFalg(index)'>
							<img src='../../static/dui.png'></img>
						</div> -->
						<!-- <radio value="" class='radios' :checked="flag" @click='tabFalg' style="transform: scale(0.72);" /> -->
					</div>
					<div class='invoice-info'>
						<div>{{item.code}}</div>
						<div>增值税普通发票</div>
					</div>
					<div class='list-btn'>
						<div class='btn-edit' @click="edit(item)">
							<div>编辑</div>
							<img src='../../assets/edit.png'></img>
						</div>
						<div class='btn-del' @click="del(item.id)">
							<div>删除</div>
							<img src='../../assets/del.png'></img>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class='add-bottom' @click="addInvoice">
			<img src='../../assets/add.png'></img>
			<div>新增开票信息</div>
		</div>
		<Load v-if='isLoad'></Load>
		<empty v-if="showEmpty"></empty>
		<showMoadel v-if='modelFlag' :cont='"是否要删除?"' :cancelText='"取消"' :confirmText='"确定"' @define='confirm' @remove='cancel'></showMoadel>
		<showSuccess v-if='isSuccess' :successInfo='successInfo'></showSuccess>
	</div>
</template>

<script>
	import * as axios from '../../untils/ajax.js'
	import {
		mapGetters
	} from 'vuex'
	export default {
		data() {
			return {
				flag: false,
				pageSize: 6,
				pageNo: 1,
				list: [],
				total: '',
				isLoad: false,
				modelFlag: false,
				id: null,
				showEmpty: false,
				startX: 0,
				startY: 0,
				endX: 0,
				endY: 0,
				innerHeight: '',
				scrollTop: "",
				scrollHeight: '',
				contentHeight: '',
				signHeight: '',
				signSuccess: 0,
				successInfo: '',
				isSuccess: false,
				endListFalg: false,
				signInfo: "开票信息",
				type: 1,
				typeContent: '信息服务类'
			}
		},
		// onReachBottom() {
		// 	this.pageNo = this.pageNo + 1
		// 	console.log(this.pageNo)
		// 	console.log(this.list)
		// 	if (this.list.length >= this.total) {
		// 		this.toast.success('数据加载完了')
		// 		return
		// 	}
		// 	this.getList()
		// },
		computed: {
			...mapGetters(['showInvoice'])
		},
		methods: {
			collage(e) {
				console.log(e)
				this.type = e
				if (e == 1) {
					this.typeContent = '信息服务类'
				} else {
					this.typeContent = '保洁服务类'
				}
				this.pageNo = 1
				this.list = []
				this.getList()
			},
			tabFalg(index) {
				this.list[index].status = !this.list[index].status
			},
			addInvoice() {
				if (this.signInfo == null) {
					this.signInfo = "开票信息"
				}
				this.$router.push({
					'name': 'specialInvoice'
				})
				// uni.navigateTo({
				// 	url: '/pages/my/specialInvoice'
				// })
			},

			getList(des) {
				let that = this
				// let params = new FormData()
				// params.append('pageSize', that.pageSize)
				// params.append('pageNo', that.pageNo)
				if (!des) {
					this.isLoad = true
				}

				let params = new FormData()
				params.append('pageSize', this.pageSize)
				params.append('pageNo', this.pageNo)
				params.append('content', this.typeContent)
				axios.post('/office/t-office-invoice-config/getInvoiceConfByUserId', params).then(res => {
					if (res.meta.success) {
						that.total = Number(res.data.totalCounts)
						var service = res.data.records.map(item => {
							item.status = false
							return item
						})
						if (that.pageNo === 1) {
							that.list = service
						} else {
							that.list = that.list.concat(service)
						}
						if (this.list.length == 0) {
							this.showEmpty = true
						} else {
							this.showEmpty = false
						}
						this.isLoad = false
					} else {
						this.isLoad = false
						// this.toast.fail('获取数据失败')
						this.$toast({
							message: res.meta.msg,
							duration: 1500
						})
					}

				})
			},
			edit(e) {
				console.log(e)
				var info = {}
				info['type'] = e.type
				info['head'] = e.head
				info['id'] = e.id
				info['code'] = e.code
				info['content'] = e.content
				if (e.type == 1) {
					console.log(44444)
					info['emails'] = e.emails
				} else {
					info['address'] = e.address
					info['mobile'] = e.mobile
					info['bankName'] = e.bankName
					info['bankNo'] = e.bankNo
				}
				if (this.signInfo == null) {
					this.signInfo = "开票信息"
				}
				this.$router.push({
					'name': 'specialInvoice',
					params: info
				})
				// uni.navigateTo({
				// 	url:'/pages/my/specialInvoice?info='+JSON.stringify(info) 
				// })
			},
			del(id) {
				this.modelFlag = true
				this.id = id
			},
			cancel() {
				this.modelFlag = false
			},
			confirm() {
				this.modelFlag = false
				let that = this
				let params = new FormData()
				params.append('id', this.id)

				axios.post('/office/t-office-invoice-config/deleteInvoiceConf', params).then(res => {
					if (res.meta.success) {
						// that.toast.success('删除成功')


						this.successInfo = '删除成功'
						this.isSuccess = true

						setTimeout(() => {
							that.isSuccess = false
						}, 1000)
						that.pageNo = 1
						that.list = []
						that.getList(1)
					} else {
						// that.toast.fail('删除失败')
						this.$toast({
							message: '删除失败',
							duration: 1500
						})
					}
				})
			},
			touchStart(e) {
				this.startX = e.touches[0].pageX
				this.startY = e.touches[0].pageY


			},
			touchMove(e) {
				this.endX = e.changedTouches[0].pageX
				this.endY = e.changedTouches[0].pageY
				let direction = this.getSlideDirection(this.startX, this.startY, this.endX, this.endY)
				switch (direction) {
					case 0:
						// console.log('没滑动')
						break
					case 1:
						// console.log('向上')
						this.scrollToTheEnd()
						break
					case 2:
						// console.log('向下')
						break
					case 3:
						// console.log('向左')
						break
					case 4:
						// console.log('向右')
						break
					default:
				}
			},
			touchEnd() {
				this.isLoad = false
			},
			scrollToTheEnd() {
				let innerHeight = document.querySelector('#app').clientHeight
				let contentHeight = document.querySelector('.containerHeight').offsetHeight
				// 变量scrollTop是滚动条滚动时，距离顶部的距离
				let scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop
				// 变量scrollHeight是滚动条的总高度
				let scrollHeight = document.documentElement.clientHeight || document.body.scrollHeight

				//变量scrollHeight是滚动条的总高度
				var scrollHeights = document.documentElement.scrollHeight || document.body.scrollHeight;
				this.innerHeight = scrollHeights
				this.scrollTop = scrollTop
				this.scrollHeight = scrollHeight
				this.contentHeight = contentHeight
				// 滚动条到底部的条件

				if (scrollTop + scrollHeight >= innerHeight) {
					if (this.pullUpState !== 3 && !this.isLoad) {
						this.infiniteLoad()
					}
					// console.log('距顶部' + scrollTop + '滚动条总高度' + scrollHeight + '内容高度' + innerHeight)
				}
				let signHeight = Number(contentHeight) - (Number(innerHeight) + Number(scrollTop))
				let that = this
				// this.$toast({
				//     message: signHeight, duration: 1500
				// })
				if (signHeight < 60) {
					if (that.total <= that.list.length && that.total > 0) {
						that.signSuccess = that.signSuccess + 1

					}
				}
			},

			/**
			 * 上拉加载数据
			 */
			infiniteLoad() {
				this.pullUpState = 2
				let that = this
				if (this.list.length >= this.total) {
					// this.isSuccess = true
					// setTimeout(() => {
					// 	that.isSuccess = false
					// }, 2000)
					this.endListFalg = true
					return false
				}
				this.pageNo = this.pageNo + 1
				this.getList()
				// this.onInfiniteLoad(this.infiniteLoadDone)
			},

			/**
			 * 加载数据完成
			 */
			infiniteLoadDone() {
				this.pullUpState = 1
			},

			/**
			 * 返回角度
			 */
			getSlideAngle(dx, dy) {
				return Math.atan2(dy, dx) * 180 / Math.PI
			},

			/**
			 * 根据起点和终点返回方向 1：向上，2：向下，3：向左，4：向右,0：未滑动
			 * @param {number} startX X轴开始位置
			 * @param {number} startY X轴结束位置
			 * @param {number} endX Y轴开始位置
			 * @param {number} endY Y轴结束位置
			 */
			getSlideDirection(startX, startY, endX, endY) {
				let dy = startY - endY
				let dx = endX - startX
				let result = 0
				// 如果滑动距离太短
				if (Math.abs(dx) < 2 && Math.abs(dy) < 2) {
					return result
				}
				let angle = this.getSlideAngle(dx, dy)
				if (angle >= -45 && angle < 45) {
					result = 4
				} else if (angle >= 45 && angle < 135) {
					result = 1
				} else if (angle >= -135 && angle < -45) {
					result = 2
				} else if ((angle >= 135 && angle <= 180) || (angle >= -180 && angle < -135)) {
					result = 3
				}
				return result
			},
		},
		created() {
			if (this.$route.params.sign) {
				this.signInfo = null
			}
			this.list = []
			this.pageNo = 1
			this.getList()
		},
		watch: {
			signSuccess(val) {
				if (this.endListFalg) {
					let that = this
					this.successInfo = '数据加载完了'
					this.isSuccess = true

					setTimeout(() => {
						that.isSuccess = false
					}, 1000)
				}

			},
			showInvoice() {
				this.list = []
				this.pageNo = 1
				this.getList()
			},
			parentPullUpState(curVal, oldVal) {
				this.pullUpState = curVal
			}
		}
		// onShow() {
		// 	this.list=[]
		// 	this.pageNo=1
		// 	this.getList()
		// }
	}
</script>

<style scoped>
	.content-btn {
		height: 0.9rem;
		/* width: 100vw; */
		padding: 0 0.28rem;
		/* box-sizing: border-box;
		display: flex;
		align-items: center; */
		font-size: 0.28rem;
		position: fixed;
		top: 1.28rem;
		width: 100%;
		background: #fff;
		z-index: 10;
	}

	.content-show {
		height: 0.90rem;
	}

	.content-btn .btn-info {
		width: 100%;
		background: #fff;
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		-webkit-transform: translateY(-50%);
	}

	.content-btn .btn {
		float: left;
		height: 0.60rem;
		width: 1.50rem;
		text-align: center;
		line-height: 0.60rem;
		background: #fff;
		/* border-radius: 0.10rem; */
		color: #fff;
		margin-right: 0.18rem;
		/* 	border: 1px solid #539ef9; */
		color: #000;
		box-sizing: border-box !important;
	}

	.btn.sign-color {
		color: #ff5f1e;
		border-bottom: 2px solid #FF5F1E;
	}

	.content-list {
		padding-bottom: 1rem;
	}

	.list {
		background: #fff;
		margin: 0.20rem auto;
		border-radius: 0.15rem;
		width: 6.94rem;
		padding-bottom: 0.28rem;
		box-shadow: 0.05rem 0.05rem 0.10rem #ececee;
	}

	.list:nth-child(1) {
		margin-top: 0 !important;
	}

	.list .list-head {
		height: 0.82rem;
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
		padding: 0 0.16rem;
		border-bottom: 1px solid #eee;
	}

	.invoice-info {
		padding: 0.18rem 0.20rem 0.35rem 0.20rem;
		font-size: 0.28rem;
		color: #707070;
	}

	.invoice-info div {
		margin-bottom: 0.10rem;
	}

	.invoice-info div:last-child {
		margin-bottom: 0px;
	}

	.list-btn {
		display: flex;
		display: -webkit-box;
		display: -webkit-flex;
		align-items: center;
		-webkit-box-align: center;
		-webkit-align-items: center;
		justify-content: flex-end;
		-webkit-box-pack: end;
		-moz-justify-content: flex-end;
		-webkit-justify-content: flex-end;
		font-size: 0.26rem;
		padding: 0 0.20rem;
	}

	.list .list-btn .btn-edit {
		display: flex;
		display: -webkit-box;
		display: -webkit-flex;
		align-items: center;
		-webkit-box-align: center;
		-webkit-align-items: center;
		color: #0396ff;
		margin-right: 0.35rem;
	}

	.list-btn .btn-edit img {
		width: 0.24rem;
		height: 0.24rem;
		margin-left: 0.08rem;
	}

	.list-btn .btn-edit>div {
		margin-top: 0.02rem;
	}

	.list .list-btn .btn-del {
		display: flex;
		display: -webkit-box;
		display: -webkit-flex;
		align-items: center;
		-webkit-box-align: center;
		-webkit-align-items: center;
		/* align-content: center; */
		color: #5f5f6b;

	}

	.list-btn .btn-del img {
		width: 0.28rem;
		height: 0.28rem;
		margin-left: 0.08rem;
	}

	.list-btn .btn-del>div {
		margin-top: 0.02rem;
	}


	.radios {
		width: 0.38rem;
		height: 0.38rem;
		border-radius: 50%;
		border: 1px solid #ddd;
		display: flex;
		display: -webkit-box;
		display: -webkit-flex;
		align-items: center;
		-webkit-box-align: center;
		-webkit-align-items: center;
		justify-content: center;
		-webkit-box-pack: center;
		-moz-justify-content: center;
		-webkit-justify-content: center;
	}

	.radios.signColor {
		background: #0396ff;
		border: none;
	}

	.radios img {
		width: 0.25rem;
		height: 0.25rem;
	}

	.add-bottom {
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
		align-items: center;
		-webkit-box-align: center;
		-webkit-align-items: center;
		justify-content: center;
		-webkit-box-pack: center;
		-moz-justify-content: center;
		-webkit-justify-content: center;
		font-size: 0.30rem;
		color: #fff;
	}

	.add-bottom img {
		width: 0.295rem;
		height: 0.295rem;
		margin-right: 0.18rem;
	}
</style>
