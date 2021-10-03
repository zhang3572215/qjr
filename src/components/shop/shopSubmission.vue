<template>
	<div class='container'>
		<head-Piece>
			<template slot="content">确认订单</template>
		</head-Piece>
		
		<div class='content-head' @click="selectMap">
			<div class='content-head-lf'>
				<img src="../../assets/address-6.png" alt="">
				<div v-if='address'>
					<div>
						{{linkMan}} <span class='phone'>{{linkPhone}}</span>
					</div>
					<div class='address'>{{address}}</div>
				</div>
				<div v-else>
				   请选择地址
				</div>
			</div>
			<img class='right-img' src="../../assets/right-to.png" alt="">
		</div>
		<div class='goods-List'>
			<div class='goods-info'>
				<div class='goods-head' v-for='(item,index) in goodList' :key='index'>
					<div class='goods-img'>
						<img :src="item.picUrl" alt="">
					</div>
					<div class='goods-news'>
						<div class='goods-name'>
							<div class='goods-title'>{{item.name}}</div>
							<div class='goods-price'>￥{{item.price}}</div>
						</div>
						<div class='goods-specs'>
							<div class='specs'>
								{{item.goodInfo}}
							</div>
							<div class='goods-num'>
								X{{item.num}}
							</div>
						</div>
					</div>
				</div>
				<div class='goods-bottom'>
					<div class='bottom-news'>
						<div class='news-left'>
							<div class='news-title'>配送方式</div>
							<div class='news-title-ct'>普通配送</div>
						</div>
						<div class='news-right'>
							<div class='express'>快递</div>
							<div class='free-postage'>免邮</div>
						</div>
					</div>
					<div class='bottom-news'>
						<div class='news-left'>
							<div class='news-title'>运费</div>

						</div>
						<div class='news-right'>

							<div class='free-postage'>￥0</div>
						</div>
					</div>
				<!-- 	<div class='bottom-news'>
						<div class='news-left'>
							<div class='news-title'>优惠</div>
							<div class='news-title-ct'>5元</div>
						</div>
						<div class='news-right'>

							<div class='free-postage discount'>-￥5</div>
						</div>
					</div> -->
					<div class='bottom-news'>
						<div class='news-left'>
							<div class='news-title'>订单备注</div>
							<input class='news-title-ct' type="text" placeholder="选填,请和商家协商一致" v-model="remark">
							<!-- <div class='news-title-ct'>5元</div> -->
						</div>
						<div class='news-right'>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class='content-bottom'>
			<div class='content-bottom-lf'>

			</div>
			<div class='content-bottom-rt'>
				<div class='excluding'>
					共{{totalNum}}件
				</div>
				<div class='amount-to'>
					合计:
				</div>
				<div class='total-price'>
					￥{{totalPrice}}
				</div>
				<div class='btn-settlement' @click="submit">
					提交订单
				</div>
			</div>

		</div>
			<Load v-if='isLoad'></Load>
	</div>
</template>

<script>
	import {
		mapGetters,mapActions
	} from 'vuex'
	import * as axios from '../../untils/ajax.js'
	export default {
		data() {
			return {
				address: '',
				addressId: 0,
				goodList: [],
				totalPrice: '',
				totalNum: '',
				remark: '',
				type:'',
				isLoad:false,
				linkMan:'',
				linkPhone:''
				
			}
		},
		computed: {
			...mapGetters(['showAddressInfo','showCardNum'])
		},
		methods: {
				...mapActions(['collageCardNum']),
			selectMap() {
				this.$router.push({
					'name': 'addressList',
					params: {
						sign: 'sub'
					}
				})
				// uni.navigateTo({
				// 	url:'/pages/my/addressList?type='+'select'
				// })
			},
			getMapList() {
				let that = this
				axios.post('/sys/t-sys-app-user/getAllAddressByUserId', {}).then(res => {

					if (res.meta.success) {
						// that.addressId=res.data[0].id
						//    that.address=res.data[0].address
						res.data.forEach(item => {
							if (item.beDefault == 1) {
								that.addressId = item.id
								that.address = item.address
                                that.linkMan=item.linkMan
								that.linkPhone=item.linkPhone
							}
						})
					} else {
						this.$toast({
							message: '获取数据失败',
							duration: 1500
						})

					}
				})
			},
			submit(){
				if(this.type==2){
					this.postShopOrderByCart()
				}else if(this.type==1){
					this.postShopOrderByDirect()
				}
			},
			// 购物车跳转过啦提交的
			postShopOrderByCart() {
				let params = new FormData()
				params.append('num', this.totalNum)
				params.append('orderMoney', this.totalPrice)
				params.append('vare', 0)
				params.append('remark', this.remark)
				params.append('addressId', this.addressId)
				var shopCartId = ''
				this.goodList.forEach((val, index) => {
					if (index == 0) {
						shopCartId = val.specsId
					} else {
						shopCartId += ',' + val.specsId
					}

				})

				params.append('shopCartId', shopCartId)
				this.isLoad=true
				axios.post('/shop/t-shop-order/postShopOrderByCart', params).then(res => {
						this.isLoad=false
					if (res.meta.success) {
                          let num=this.showCardNum+1
                          this.collageCardNum(num)
						  let id={'id':res.data.orderId}			 
						    this.$router.push({"name":'shopPayment',params:id})
					} else {
						this.$toast({
							message:res.meta.msg
						})
					}
				})
			},
			//购买页跳转过来直接提交的
			postShopOrderByDirect(){
				let params = new FormData()
				params.append('num', this.totalNum)
				params.append('orderMoney', this.totalPrice)
				params.append('vare', 0)
				params.append('remark', this.remark)
				params.append('addressId', this.addressId)
				params.append('propId', this.goodList[0].specId)
				this.isLoad=true
				axios.post('/shop/t-shop-order/postShopOrderByDirect', params).then(res => {
					this.isLoad=false
					if (res.meta.success) {
				        let id={'id':res.data.orderId}
				          this.$router.push({"name":'shopPayment',params:id})
					} else {
						this.$toast({
							message:res.meta.msg
						})
					}
				})
			}
			

		},
		created() {
			this.getMapList()
			this.goodList = this.$route.params.content
			this.totalPrice = this.$route.params.totalPrice
			this.totalNum = this.$route.params.totalNum
			this.type=this.$route.params.type
		},
		watch: {
			showAddressInfo(newval, oldval) {
				console.log(newval)
				this.addressId = newval['id']
				this.address = newval['address']
				this.linkMan=newval.linkMan
				this.linkPhone=newval.linkPhone
			}
		}
	}
</script>

<style scoped>
	.container{
		height: 100vh;
		overflow-x: hidden;
	}
	.content-head {
		padding: 0.48rem 0.12rem 0.48rem 0.14rem;
		width: 6.68rem;
		margin: 0.1rem auto 0 auto;
		font-size: 0.3rem;
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
		border-radius: 0.2rem;
	}

	.content-head-lf {
		display: flex;
		display: -webkit-box;
		display: -webkit-flex;
		align-items: center;
		-webkit-box-align: center;
		-webkit-align-items: center;
	}

	.content-head-lf .phone {
		font-size: 0.26rem;
		color: #8a8a8a;
	}

	.content-head-lf .address {
		color: #8a8a8a;
		margin-top: 0.05rem;
		width: 97%;
		text-overflow: -o-ellipsis-lastline;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		line-clamp: 2;
		-webkit-box-orient: vertical;
		word-wrap: break-word;
		word-break: break-all;
	}

	.content-head-lf img {
		height: 0.48rem;
		width: 0.48rem;
		margin-right: 0.20rem;
	}

	.content-head .right-img {
		width: 0.14rem;
	}

	.goods-List {
		margin-top: 0.25rem;
		margin-bottom: 1.3rem;
	}

	.goods-info {
		width: 6.94rem;
		background: #fff;
		margin: 0 auto;
		padding-top: 0.3rem;
	}

	.goods-info:first-child {
		border-radius: 0.25rem 0.25rem 0 0;
	}

	.goods-info:last-child {
		border-radius: 0 0 0.25rem 0.25rem;
	}

	.goods-head {
		display: flex;
		display: -webkit-box;
		display: -webkit-flex;
		padding-bottom: 0.45rem;
		padding-left: 0.2rem;
	}

	.goods-head .goods-img {
		width: 1.8rem;
		height: 1.8rem;
		border: 1px solid #ddd;
		border-radius: 0.1rem;
		overflow: hidden;
	}

	.goods-head .goods-img img {
		width: 100%;
		height: 100%;
	}

	.goods-head .goods-news {
		font-size: 0.28rem;

	}

	.goods-head .goods-name {
		width: 4.65rem;
		display: flex;
		display: -webkit-box;
		display: -webkit-flex;
		justify-content: space-between;
		-webkit-box-pack: justify;
		-webkit-justify-content: space-between;
		/* 	align-items: center;
		-webkit-box-align: center;
		-webkit-align-items: center; */
	}

	.goods-head .goods-title {
		margin-left: 0.15rem;
		width: 3.6rem;
		text-overflow: -o-ellipsis-lastline;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		line-clamp: 2;
		-webkit-box-orient: vertical;
		word-wrap: break-word;
		word-break: break-all;
	}

	.goods-head .goods-price {
		color: #e01212;
	}

	.goods-specs {

		width: 4.65rem;
		display: flex;
		display: -webkit-box;
		display: -webkit-flex;
		justify-content: space-between;
		-webkit-box-pack: justify;
		-webkit-justify-content: space-between;
		align-items: center;
		-webkit-box-align: center;
		-webkit-align-items: center;
		color: #868688;
		font-size: 0.22rem;
		margin-top: 0.05rem;
	}

	.goods-specs .specs {
		margin-left: 0.15rem;

	}

	.goods-bottom {
		padding-bottom: 0.15rem;
	}

	.bottom-news {
		display: flex;
		display: -webkit-box;
		display: -webkit-flex;
		/* 	align-items: center;
			-webkit-box-align: center;
			-webkit-align-items: center; */
		justify-content: space-between;
		-webkit-box-pack: justify;
		-webkit-justify-content: space-between;
		font-size: 0.26rem;
		margin-bottom: 0.26rem;
	}

	.bottom-news .news-left,
	.bottom-news .news-right {
		display: flex;
		display: -webkit-box;
		display: -webkit-flex;
		align-items: center;
		-webkit-box-align: center;
		-webkit-align-items: center;
	}

	.bottom-news .news-title {
		width: 1.85rem;
		text-align: right;
		margin-right: 0.22rem;
	}

	.bottom-news .news-title-ct {
		color: #97979f;
		font-size: 0.24rem;
		margin-top: 0.02rem;
	}

	.news-right .free-postage {
		margin-right: 0.26rem;
		margin-left: 0.26rem;
	}

	.news-right .free-postage.discount {
		color: #ff5511;
	}

	.news-left input {
		border: none;
		/* text-align: right; */
		width: 4.5rem;
		color: #222 !important;
		margin-top: 0.04rem !important;
	}

	.news-left input::-webkit-input-placeholder {
		color: #97979f;
	}

	.content-bottom {
		position: fixed;
		bottom: 0;
		font-size: 0.26rem;
		height: 1.07rem;
		width: 100%;
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
		border: 1px solid #e7eaf0;
	}

	.content-bottom .content-bottom-lf,
	.content-bottom .content-bottom-rt {
		display: flex;
		display: -webkit-box;
		display: -webkit-flex;
		align-items: center;
		-webkit-box-align: center;
		-webkit-align-items: center;
	}

	.content-bottom-rt .excluding {
		font-size: 0.2rem;
		color: #c1c1c5;
		margin-top: 0.01rem;
	}

	.content-bottom-rt .amount-to {
		color: #000;
		margin-left: 0.15rem;

	}

	.content-bottom-rt .total-price {
		color: #ff7911;
		/* margin-left: 0.1rem; */
	}

	.content-bottom-rt .btn-settlement {
		width: 2rem;
		height: 0.78rem;
		text-align: center;
		line-height: 0.78rem;
		background: linear-gradient(to right, #fe9000, #ff5200);
		color: #ffe5cc;
		border-radius: 0.5rem;
		margin: 0 0.28rem 0 0.1rem;
	}

	.content-bottom .select-all {
		width: 0.37rem;
		height: 0.37rem;
		border: 1px solid #9999a1;
		border-radius: 50%;
		box-sizing: border-box;
		margin: 0 0.2rem;
		margin-top: 0.02rem;
	}

	.content-bottom .selectAll {
		width: 0.37rem;
		height: 0.37rem;
		border-radius: 50%;
		margin: 0 0.2rem;
		margin-top: 0.02rem;
	}

	.content-bottom .btn-del {
		width: 1.8rem;
		height: 0.68rem;
		text-align: center;
		line-height: 0.68rem;
		border: 1px solid #ff5606;
		box-sizing: border-box;
		border-radius: 0.5rem;
		color: #FF5606;
		margin: 0 0.28rem 0 0.1rem;
	}
</style>
