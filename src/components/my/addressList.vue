<template>
	<div class='containerHeight' @touchstart="touchStart($event)" @touchmove="touchMove($event)" @touchend="touchEnd($event)">
		<head-Piece :sign='signInfo'>
			<template slot="content">地址管理</template>
		</head-Piece>
<!-- 		<div class='head-show'>
		</div> -->
		<div class='address-list'>
			<div class='address' v-for='(item,index) in list' @click="toBack(item.address,item.id,item.linkMan,item.linkPhone)">

				<div class='person-name'>{{item.linkMan}}<span>{{item.linkPhone}}</span> </div>
				<div class='person-address'><span class='address-info'>{{item.address}}</span> <span class='show-address' v-if='item.type==1'>家</span>
					<span class='show-address show-componeny' v-if='item.type==2'>公司</span>
					<span class='show-address show-other' v-if='item.type==3'>其他</span>
				</div>
				<div class='address-btn'>
					<div class='address-right'>
						<div class='address-edmit' @click.stop.prevent="del(item.id)">
							<img src='../../assets/edmit.png'></img>
							<div>删除</div>
						</div>
						<div class='address-del' @click.stop.prevent="edit(item)">
							<img src='../../assets/del.png'></img>
							<div>编辑</div>
						</div>

					</div>
					<div class='address-left' v-if='item.beDefault==1'>
						默认
					</div>
				</div>
			</div>
		</div>
		<div class='add-bottom' @click="add">
			<img src='../../assets/add.png'></img>
			<div>新增地址</div>
		</div>
		<empty v-if="showEmpty"></empty>
		<Load v-if='isLoad'></Load>
		<showSuccess v-if='isSuccess' :successInfo='successInfo'></showSuccess>
	</div>
</template>

<script>
	import * as axios from '../../untils/ajax.js'
	import {
		mapGetters,
		mapActions
	} from 'vuex'
	export default {
		data() {
			return {
				pageNo: 1,
				pageSize: 8,
				list: [],
				total: 0,
				select: '',
				isLoad: false,
				showEmpty: false,
				isSuccess: false,
				successInfo: '',
				collageAddress: '',
				signInfo: '地址',
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
				signFlag:''
			}
		},
		computed: {
			...mapGetters(['showRefreshAdr'])
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
		methods: {
			...mapActions(['collageAddressInfo']),
			add() {
				this.$router.push({'name':'address'})
				// plus.storage.setItem('collageAddress','null')
				// let that=this
				// this.interval = setInterval(() => {
				// 	if (plus.storage.getItem('collageAddress') == 1) {
				// 		that.collageAddress = plus.storage.getItem('collageAddress')
				// 		if (that.collageAddress == 1) {
				// 			clearInterval(that.interval);
				// 		}
				// 	}
				// }, 1000)
				// uni.navigateTo({
				// 	url: '/pages/my/address'
				// })
			},
			getList() {
				let that = this
				this.isLoad = true
				let params = new FormData()
				params.append('pageNo', this.pageNo)
				params.append('pageSize', this.pageSize)
				axios.post('/sys/t-sys-app-user/getAddressByUserId', params).then(res => {
					if (res.meta.success) {
						console.log(res.data)
						that.total = Number(res.data.total)
						if (that.pageNo == 1) {
							that.list = res.data.records

						} else {
							that.list = that.list.concat(res.data.records)
						}
						if (that.list.length == 0) {
							this.showEmpty = true
						}
						this.isLoad = false
					} else {
						this.isLoad = false
						this.$toast({
							message: res.meta.msg,
							duration: 1500
						})
					}
				})
			},
			del(id) {
				let that = this
				this.isLoad = true
				let params = new FormData()
				params.append('addressId', id)
				axios.post('/sys/t-sys-app-user/removeAddress', params).then(res => {
					if (res.meta.success) {

						this.isLoad = false
						// this.toast.success('删除成功')

						this.successInfo = '删除成功'
						this.isSuccess = true

						setTimeout(() => {
							that.isSuccess = false
						}, 1000)

						this.pageNo = 1
						let info = new FormData()
						info.append('pageNo', this.pageNo)
						info.append('pageSize', this.pageSize)
						axios.post('/sys/t-sys-app-user/getAddressByUserId', info).then(ress => {
							if (ress.meta.success) {
								that.total = Number(ress.data.total)
								that.list = ress.data.records
							} else {

							}

						})
					} else {
						this.isLoad = false
						// this.toast.fail('删除失败')
						this.$toast({
							message: res.meta.msg,
							duration: 1500
						})
					}
				})
			},
			edit(info) {
				console.log(info)
				this.$router.push({
					'name': 'address',
					params: info
				})
				// uni.navigateTo({
				// 	url: '/pages/my/address?info=' + JSON.stringify(info)
				// })
			},
			toBack(address, id,people,num) {
			
				if (this.signFlag != 'sub') {
					return
				}
				// if (this.select != 'select') {
				// 	return
				// } 
				// uni.setStorageSync('addressInfo', [address, id])
				let info = {
					address: address,
					id: id,
					linkMan:people,
					linkPhone:num
				}
				this.collageAddressInfo(info)
				this.$router.go(-1)
				// uni.navigateBack({})
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

			if (this.$route.params.sign == 'sub') {

				this.signInfo = ''
			}
			this.pageNo = 1
			this.list = []
			this.getList()
            this.signFlag=this.$route.params.sign
		},
		onLoad(options) {
			console.log(options)
			this.select = options.type
		},
		watch: {
			collageAddress(newval, oldval) {
				if (newval == 1) {
					this.collageAddress = ''
					plus.storage.setItem('collageAddress', 'null')
					this.pageNo = 1
					this.getList()

				}

			},
			showRefreshAdr() {
				this.pageNo = 1
				this.getList()
			},
			signSuccess(val){
				if(this.endListFalg){
					let that=this
					this.successInfo = '数据加载完了'
					this.isSuccess = true
				
					setTimeout(() => {
						that.isSuccess = false
					}, 1000)
				}
			   
			},
		}
		// onShow() {
		// 	this.pageNo = 1
		// 	this.list=[]
		// 	this.getList()
		// }
	}
</script>

<style scoped>
	.address {
		/* height: 2.30rem; */
		padding: 0.26rem 0 0.60rem 0;
		/* padding: 0.26rem 0 0 0; */
		background: #fff;
		margin-bottom: 0.20rem;
	}

	.address .person-name {
		font-size: 0.30rem;
		margin-bottom: 0.18rem;
		padding: 0 0.28rem;
	}

	.address .person-name span {
		margin-left: 0.20rem;
	}

	.person-address {
		font-size: 0.28rem;
		color: #5f5f6b;
		border-bottom: 1px solid #eeeddd;
		padding: 0 0.28rem 0.20rem 0.28rem;
		display: flex;
		display: -webkit-box;
		display: -webkit-flex;
		align-items: center;
		-webkit-box-align: center;
		-webkit-align-items: center;
	}

	.person-address .address-info {
		display: inline-block;
		width: 5rem;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.person-address .show-address {
		display: inline-block;
		height: 0.35rem;
		width: 0.68rem;
		background: #4d88ff;
		color: #fff;
		font-size: 0.22rem;
		border-radius: 0.28rem;
		text-align: center;
		line-height: 0.36rem;
		margin-left: 0.15rem;
	}


	.show-componeny {
		background: #f37356 !important;
	}

	.show-other {
		background: #01B90B !important;
	}

	.address-edmit {
		float: left;
		display: flex;
		display: -webkit-box;
		display: -webkit-flex;
		align-items: center;
		-webkit-box-align: center;
		-webkit-align-items: center;
		font-size: 0.3rem;
	}

	.address-edmit img {
		width: 0.28rem;
		height: 0.28rem;
		margin-right: 0.15rem;
	}

	.address-edmit>div {
		vertical-align: middle;
	}

	.address-del {
		float: right;
		display: flex;
		display: -webkit-box;
		display: -webkit-flex;
		align-items: center;
		-webkit-box-align: center;
		-webkit-align-items: center;
		font-size: 0.3rem;
	}

	.address-del img {
		width: 0.30rem;
		height: 0.30rem;
		margin: 0 0.15rem 0 0.35rem;
	}

	.address-btn {
		/* 	display: flex;
		display: -webkit-box;
		display: -webkit-flex;
		justify-content: space-between;
		-webkit-box-pack: justify;
		-webkit-justify-content: space-between;
		align-items: center;
		-webkit-box-align: center;
		-webkit-align-items: center;
		flex-direction: row-reverse; */
		margin-top: 0.20rem;
		padding: 0 0.28rem;
	}

	.address-right {
		float: right;
		display: flex;
		display: -webkit-box;
		display: -webkit-flex;
		/* 		flex-direction: row-reverse;
 */
	}

	.address-list {
		padding-bottom: 1.20rem;

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
		justify-content: center;
		-webkit-box-pack: center;
		-webkit-justify-content: center;
		align-items: center;
		-webkit-box-align: center;
		-webkit-align-items: center;
		font-size: 0.30rem;
		color: #fff;
	}

	.add-bottom img {
		width: 0.295rem;
		height: 0.295rem;
		margin-right: 0.18rem;
	}

	.address-left {
		float: left;
		height: 0.35rem;
		width: 0.68rem;
		background: #F43F3B;
		color: #fff;
		font-size: 0.22rem;
		border-radius: 0.28rem;
		text-align: center;
		line-height: 0.36rem;
		/* margin-left: 15upx; */
	}
</style>
