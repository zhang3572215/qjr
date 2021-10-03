<template>
	<div>
		<head-Piece>
			<template slot="content">{{navTitle}}</template>
		</head-Piece>
		<van-list @load="onLoad" :offset="10">
			<div class='list'>
				<div class='content-list' v-for='(item,index) in list' :key='index'>
					<div class='list-head'>
						<div class='head-title' :class='item.isRead==1?"hidden-left":""'>
							<span v-if='item.operType==1'>排班提醒</span>
							<span v-if='item.operType==2'>服务人员签到提醒</span>
							<span v-if='item.operType==3'>服务人员签退提醒</span>
							<span v-if='item.operType==4'>分期还款提醒</span>
							<span v-if='item.operType==5'>套餐付款完成提醒</span>
							<span v-if='item.operType==6'>分期还款完成(非最后一期)</span>
							<span v-if='item.operType==7'>新增优惠券提醒</span>
							<span v-if='item.operType==8'>订单已完成提醒</span>
							<span v-if='item.operType==9'>抵用券派发提醒</span>
							<span v-if='item.operType==10'>取消预约提醒</span>
							<span v-if='item.operType==11'>投诉已受理提醒</span>
							<span v-if='item.operType==12'>投诉已处理提醒</span>
							<span v-if='item.operType==13'>预约修改日期或时辰提醒</span>
							<span v-if='item.operType==14'>订单修改时辰提醒</span>
							<span v-if='item.operType==15'>分期还款完成(最后一期)</span>
							<span v-if='item.operType==16'>按次订单付款完成提醒</span>
							<span v-if='item.operType==17'>商城订单付款完成提醒</span>
						</div>
						<div class='date'>
							{{item.createTime}}
						</div>

						<div class='new-dot' v-if='item.isRead==2'></div>
					</div>
					<div class='list-info'>
						{{item.content}}
					</div>
					<div class='list-bottom' @click='toDetail(item,index)'>
						<div>查看详情</div>
						<img src="../../assets/right-to.png" alt="">
					</div>
				</div>
			</div>
		</van-list>
		<showSuccess v-if='isSuccess' :successInfo='successInfo'></showSuccess>
		<Load v-if='isLoade'></Load>
		<empty v-if='showEmpty'></empty>
	</div>
</template>

<script>
	import * as axios from '../../untils/ajax.js'
	import {
		mapActions,
		mapGetters
	} from 'vuex'
	export default {
		data() {
			return {
				pageSize: 10,
				pageNo: 0,
				msgType: '',
				list: [],
				isLoade: false,
				isSuccess: false,
				total: 0,
				loadFalg: false,
				type: '',
				navTitle: '',
				showEmpty: false
			}
		},
		computed: {
			...mapGetters(['showClientUnread'])
		},
		methods: {
			...mapActions(['collageClientUnread']),
			getList() {
				let params = new FormData()
				params.append('pageSize', this.pageSize)
				params.append('pageNo', this.pageNo)
				params.append('msgType', this.type)
				this.isLoade = true
				axios.post('/business/t-business-notice-user/getUserNoticeByUserId', params).then(res => {
					this.isLoade = false
					if (res.meta.success) {
						this.total = res.data.totalCounts
						if (this.pageNo == 1 && this.total == 0) {
							this.showEmpty = true
						}
						this.list = this.list.concat(res.data.records)
					}
				})
			},
			touchStart() {
				this.loadFalg = true
			},
			//上拉加载
			onLoad() {
				// if(this.pageSize==0){
				// 	if(!this.loadFalg){
				// 		return
				// 	}
				// }
				if (this.isLoad) {
					return
				}
				// console.log(this.total)
				// console.log(this.list.length)
				if (this.total <= this.list.length && this.total > 0) {
					let that = this
					this.successInfo = '数据加载完了'
					this.isSuccess = true

					setTimeout(() => {
						that.isSuccess = false
					}, 1000)
					return
				}
				if (!this.isLoade) {
					this.pageNo = this.pageNo + 1
					this.getList()
				}


			},
			toDetail(e, index) {
				console.log(e)
				let that = this
				switch (e.pageId) {
					case 7:
						let info = {
							isRead: e.isRead
						}
						that.$router.push({
							'name': 'repaymentList',
							params: info
						}) //待还记录
						break;
					case 9:
						that.$router.push({
							'name': 'coupon'
						}) //优惠卷
						break;
					case 11:
						let info7 = {
							orderId: e.otherId,
							isRead: e.isRead
						}
						that.$router.push({
							'name': 'orderDetails',
							params: info7
						}) //订单详情定制
						break;
					case 13:
						let info1 = {
							id: e.otherId,
							isRead: e.isRead
						}
						that.$router.push({
							'name': 'complaintDetails',
							params: info1
						}) //客户投诉
						break;
					case 15:
						let info2 = {
							isRead: e.isRead
						}
						that.$router.push({
							'name': 'voucher',
							params: info2
						}) //-抵用金页
						break;
					case 17:
						let info3 = {
							periodId: e.otherId,
							isRead: e.isRead
						}
						that.$router.push({
							'name': 'stages',
							params: info3
						}) //-分期还款详情页
						break;
					case 19:
						let info4 = {
							isRead: e.isRead
						}
						that.$router.push({
							'name': 'appointment',
							params: info4
						}) //我的预约
						break;
					case 21:
						let info5 = {
							orderId: e.otherId,
							isRead: e.isRead
						}
						that.$router.push({
							'name': 'orderFrequency',
							params: info5
						}) //订单详情单次
						break;
					case 23:
						let info8 = {
							orderId: e.otherId,
							isRead: e.isRead
						}
						this.$router.push({
							'name': 'goodsDetail',
							params: info8
						})
                        case 25:
                        	let info9 = {
                        		orderId: e.otherId,
                        		isRead: e.isRead
                        	}
                        	that.$router.push({
                        		'name': 'orderDetails',
                        		params: info9
                        	}) //订单详情定制
					default:

				}
				if (e.isRead == 2) {
					let params = new FormData()
					params.append('noticeId', e.id)
					axios.post('/business/t-business-notice-user/updateReadById', params).then(res => {
						if (res.meta.success) {
							let num = this.showClientUnread + 1
							this.collageClientUnread(num)
                            this.list[index].isRead = 1
							let badgeNumber = Number(plus.storage.getItem('badgeNumber')) - 1
							plus.runtime.setBadgeNumber(badgeNumber)
							badgeNumber = badgeNumber.toString()
							plus.storage.setItem('badgeNumber', badgeNumber)
						}
					})

				}
				
			}
		},
		created() {
			this.type = this.$route.params.type
			if (this.type == 1) {
				this.navTitle = '消息通知'
			} else if (this.type == 2) {
				this.navTitle = '服务通知'
			} else if (this.type == 3) {
				this.navTitle = '商城通知'
			}
			console.log(this.type)
			// this.getList()
		}
	}
</script>

<style scoped>
	.list {
		padding-bottom: 0.3rem;
	}

	.content-list {
		margin: 0.15rem auto 0 auto;
		background: #fff;
		width: 6.94rem;
		padding: 0.05rem 0.15rem 0.15rem 0.15rem;
		border-radius: 0.15rem;
		padding-bottom: 0.2rem;
	}

	.list-head {
		height: 0.7rem;
		position: relative;
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
	}

	.head-title {
		margin-left: 0.3rem;
	}

	.head-title.hidden-left {
		margin-left: 0;
	}

	.new-dot {
		position: absolute;
		top: 0.270rem;
		left: 0;
		/* right: 0.18rem; */
		height: 0.18rem;
		width: 0.18rem;
		border-radius: 50%;
		background: #ec4f40;
	}

	.list-head .date {
		font-size: 0.28rem;
		color: #bbb;
	}

	.list-info {
		font-size: 0.28rem;
		color: #bbb;
		word-wrap: break-word;
		word-break: break-all;
	}

	.list-bottom {
		height: 0.6rem;
		font-size: 0.28rem;
		margin-top: 0.15rem;
		padding-top: 0.15rem;
		border-top: 1px solid #eee;
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

	.list-bottom img {
		width: 0.2rem;
	}
</style>
