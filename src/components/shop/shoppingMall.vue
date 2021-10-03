<template>
	<div class='contents' :class="list.length<5?'showHeight':''" @touchstart="touchStart($event)">
		<div class='head'>
			<img src="../../assets/banner-4.png" alt="">
		</div>
		<div class='show-head'>

		</div>
		<van-list :finished="finished" @load="onLoad" :offset="10">
			<div class='goodList'>
				<div class='good-info' v-for='(item,index) in list ' :key='index' @click="toDetails(item.id)">
					<div class='info-img'>
						<img :src="item.materPicUrl" alt="">
					</div>
					<div class='info-title'>
						{{item.name}}
					</div>
					<div class='info-money'>
						<div>￥{{item.minPrice}}</div>
						<img src="../../assets/shoppingCart-1.png" alt="">
					</div>
					<!-- <div class='cancelled'>已售{{item.monthNums}}件</div> -->
					<div class='cancelled'>已售99+件</div>
				</div>
			</div>
		</van-list>
		<div class='buyCard' @click="toBuyCar">

			<div>
				<img src="../../assets/shoppingCart-2.png" alt="">
				<div class='tips-num'>
					{{goodsNum}}
				</div>
			</div>
		</div>

		<Load v-if='isLoad'></Load>
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
				list: [],
				pageSize: 10,
				pageNo: 0,
				isLoad: false,
				isLoading: false,
				loading: false,
				finished: false,
				isSuccess: false,
				goodsNum: 0,
				loadFalg: true
			}
		},
		computed: { ...mapGetters(['showCardNum'])
		},
		methods: {
			getList() {
				let params = new FormData()
				params.append('pageSize', this.pageSize)
				params.append('pageNo', this.pageNo)
				this.isLoad = true
				axios.post('/shop/t-shop-item/getShopItemList', params).then(res => {
					if (res.meta.success) {
						this.total = res.data.totalCounts
						let data = res.data.records.map(val => {
							val['materPicUrl'] = this.configUrl + val['materPicUrl']
							return val
						})
						if (this.pageNo == 1) {
							this.list = data
						} else {
							this.list = this.list.concat(data)
						}


					} else {

					}
					this.isLoad = false
				})
			},
			touchStart() {
				this.loadFalg = true
			},
			//下拉刷新
			onRefresh() {
				this.page = 1
				this.finished = false
				this.getList()
			},
			//上拉加载
			onLoad() {
				if (!this.loadFalg) {
					return
				}
				if (this.isLoad) {
					return
				}
				if (this.total <= this.list.length && this.total > 0) {
					let that = this
					this.successInfo = '数据加载完了'
					this.isSuccess = true

					setTimeout(() => {
						that.isSuccess = false
					}, 1000)
					return
				}
				this.pageNo = this.pageNo + 1
				this.getList()

			},
			toDetails(e) {
				this.loadFalg = false
				let info = {
					id: e
				}
				this.$router.push({
					name: 'goodsBuy',
					params: info
				})
			},
			add() {
				this.goodsNum = this.goodsNum + 1
			},
			toBuyCar() {
				this.loadFalg = false
				this.$router.push({
					'name': 'shoppCart'
				})
			},
			saveShopCart() {
				let params = new FormData()
				params.append('tShopCar', )
				axios.post('/shop/t-shop-cart/saveShopCart', params).then(res => {

				})
			},
			cartNums() {
				axios.post('/shop/t-shop-cart/showUserShopCartNums').then(res => {
					if (res.meta.success) {
						this.goodsNum = res.data
					}
				})
			}


		},
		created() {

			// this.getList()
			this.cartNums()
		},
		watch: {
			showCardNum() {
				this.cartNums()
			}
		}
	}
</script>

<style scoped>
	.contents {

		background: #eeeeee;
		/* height: 100%; */
		/* height: 100vh; */
	}

	.contents.showHeight {
		height: 100vh;
	}

	.head {
		position: fixed;
		top: 0;
		background-image: url(../../assets/navigation-bc.png);
		height: 3.54rem;
		width: 100%;
		background-size: 100% 100%;
		background-repeat: no-repeat;
		text-align: center;
	}

	.head img {
		height: 3rem;
		width: 6.94rem;
		margin-top: 0.53rem;
	}

	.show-head {
		background: #eee;
		height: 3.85rem;
	}

	.goodList {
		width: 6.94rem;
		margin: 0 auto;
		display: flex;
		display: -webkit-box;
		display: -webkit-flex;
		justify-content: space-between;
		-webkit-box-pack: justify;
		-webkit-justify-content: space-between;
		flex-wrap: wrap;
		-webkit-flex-wrap: wrap;
		padding-bottom: 1rem;

	}

	.good-info {
		height: 4.2rem;
		width: 3.4rem;
		background: #fff;
		border-radius: 0.1rem;
		margin-bottom: 0.2rem;
	}

	.info-img {
		height: 2.46rem;
		width: 100%;
		display: flex;
		display: -webkit-box;
		display: -webkit-flex;
		justify-content: center;
		-webkit-box-pack: center;
		-webkit-justify-content: center;
		align-items: center;
		-webkit-box-align: center;
		-webkit-align-items: center;
	}

	.info-img img {
		/* width: 50%; */
		height: 85%;
		/* max-height: 95%; */
		/* height: 80%; */
	}

	.info-title {
		font-size: 0.3rem;
		margin-left: 0.2rem;
		margin-top: 0.28rem;
	}

	.info-money {
		font-size: 0.4rem;
		color: #ec5300;
		padding: 0 0.12rem;
		display: flex;
		display: -webkit-box;
		display: -webkit-flex;
		justify-content: space-between;
		-webkit-box-pack: justify;
		-webkit-justify-content: space-between;
		align-items: center;
		-webkit-box-align: center;
		-webkit-align-items: center;
		box-sizing: border-box;
	}

	.info-money img {
		height: 0.37rem;
		width: 0.37rem;


	}

	.cancelled {
		margin-left: 0.2rem;
		font-size: 0.26rem;
		color: #97979f;
	}

	.buyCard {
		position: fixed;
		top: 7.5rem;
		right: 0rem;
		height: 0.95rem;
		width: 0.95rem;
	}

	.buyCard>div {
		position: relative;
	}

	.buyCard>div img {
		width: 100%;
		height: 100%;
	}

	.buyCard>div .tips-num {
		position: absolute;
		top: 0;
		right: 0;
		min-width: 0.27rem;
		min-height: 0.27rem;
		font-size: 0.2rem;
		padding: 0.05rem;
		text-align: center;
		/* line-height: 0.27rem; */
		border-radius: 50%;
		background: #fff;
		color: #ed5705;
	}
</style>
