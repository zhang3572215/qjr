<template>
	<div>
		<head-Piece :sign='"购物车"'>
			<template slot="content">购物车</template>
			<div slot="content-right" @click='manage'>{{headRight}}</div>
		</head-Piece>
		<div class='goods-info' v-if='list.length!=0'>
			<div class='info-title'>
				<div class='select-all' @click="selectAll" v-if='allFlag'>
				</div>
				<img class='selectAll' v-else src="../../assets/select-true.png" @click="selectAll">
				<div class='select-title'>全选</div>
			</div>
			<div class='goods-list' v-for='(item , index) in list ' :key='index'>
				<div class='select-all' v-if='!item.flag' @click="select(item,index)">
				</div>
				<img class='selectAll' v-else src="../../assets/select-true.png" @click="select(item,index)">
				<div class='goods-img'>
					<img :src="item.mainPicUrl" alt="">
				</div>
				<div class='goods-content'>
					<div>
						<div class='goods-name'>{{item.itemName}}</div>
						<div class='specs'>
							{{item.propClassName}}*{{item.propName}}
						</div>
					</div>
					<div class='goods-bottom'>
						<div class='goods-price'>
							￥{{item.propPrice}}
						</div>
						<div class='inputNumber'>
							<div class='inputNumber-left' @click="reduce(index)">
								<img src="../../assets/minus-sign.png" alt="">
							</div>
							<div class='inputNumber-center' @click="modifyNum(item,index)">
								<div>
									{{item.num}}
								</div>
								<!-- <van-field  v-model="item.num" type="digit"  /> -->

							</div>
							<div class='inputNumber-right' @click='add(index)'>
								<img src="../../assets/plus.png" alt="">
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class='content-bottom' >
			<div class='content-bottom-lf'>
				<div class='select-all' v-if='allFlag' @click="selectAll"></div>
				<img class='selectAll' v-else src="../../assets/select-true.png" @click="selectAll">
				<div>全选</div>
			</div>
			<div class='content-bottom-rt' v-if='!bottomFlag'>
				<div class='excluding'>
					不含运费
				</div>
				<div class='amount-to'>
					合计
				</div>
				<div class='total-price'>
					￥{{totalPrice}}
				</div>
				<div class='btn-settlement' @click="toSubmission">
					结算<span v-if='goodsNum>0'>({{goodsNum}})</span>
				</div>
			</div>
			<div class='content-bottom-rt' v-else>
				<div class='btn-del' @click="del">
					删除
				</div>
			</div>
		</div>
		<div class='show-shadow' v-if='showPopup'>
		</div>
		<div class='popup' v-if='showPopup'>
			<div class='popup-title'>请输入您的内容</div>
			<div class='popup-input'>
				<van-field type="digit" v-model="popupNum" />
			</div>
			<div class='popup-btn'>
				<div class='btn-left' @click="cancel">取消</div>
				<div class='btn-right' @click="confirm">
					确认
				</div>
			</div>
		</div>
		<Load v-if='isLoad'></Load>
		<empty v-if='showEmpty'></empty>
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
				headRight: '管理',
				bottomFlag: false,
				allFlag: true,
				num: 1,
				popupNum: 0,
				popupIndex: 0,
				list: [],
				showPopup: false,
				id: '',
				isLoad: false,
				totalPrice: 0,
				popupId: 0,
			    totalNum:0,
				showEmpty:false,
				goodsNum:0
			}

		},
		computed: {
			...mapGetters(['showCardNum','showReturnRefresh']),
			},
		methods: {
			...mapActions(['collageCardNum','addDesCont']),
			manage() {
				if (this.headRight == '完成') {
					this.headRight = '管理'
				} else if (this.headRight == '管理') {
					this.headRight = '完成'
				}
				this.bottomFlag = !this.bottomFlag
			},
			selectAll() {
				this.allFlag = !this.allFlag
				this.list.forEach(item => {
					if (this.allFlag) {
						item.flag = false
					} else {
						item.flag = true
					}

				})
				this.calculatePrice()
			},
			select(e, index) {
				this.list[index].flag = !this.list[index].flag
				this.calculatePrice()
			},
			//获取总价格
			calculatePrice() {
			var	totalPrice = 0
				this.totalNum=0
				this.goodsNum=0
				this.list.forEach(val => {
					if (val.flag) {
						this.goodsNum +=1
						let price = Number(val.propPrice) * val.num
						this.totalNum +=val.num
						totalPrice += price
						
					}
				})
				this.totalPrice=totalPrice.toFixed(2)
			},
			add(e) {

				this.list[e].num = Number(this.list[e].num) + 1
				this.calculatePrice()
				this.updateShopCartNums(this.list[e])
			},
			reduce(e) {
				if (this.list[e].num == 1) {
					this.$toast({
						message: '该商品数量不能减少了'
					})
					return
				}
				this.list[e].num = Number(this.list[e].num) - 1
				this.calculatePrice()
				this.updateShopCartNums(this.list[e])
			},
			changeNum(num, e) {
				if (e.data == '.') {
					this.$toast({
						message: '不能输入小数点',
						duration: 1500
					})

				}
				this.calculatePrice()
				this.updateShopCartNums(e)

			},
			changeNumber(index, e) {
				console.log(e)
				let str = '' + this.list[index].num;
				if (e.key == '.') {
					this.list[index].num = this.list[index].num
				}
				if (str.indexOf('.') != -1) {
					let arr = str.split('');
					arr.splice(arr.length - 1);
					let str2 = arr.join('');
					this.list[index].num = +str2;
				}
			},
			modifyNum(e, index) {
				this.popupNum = e.num
				this.popupId = e.id
				this.popupIndex = index
				this.showPopup = !this.showPopup
			},
			cancel() {
				this.showPopup = !this.showPopup
			},
			confirm() {
				if (this.popupNum == 0) {
					this.$toast({
						message: '商品数量不能小于1'
					})
				} else if (!this.popupNum) {
					this.$toast({
						message: '商品数量不能为空'
					})
				} else {
					this.list[this.popupIndex].num = this.popupNum
				}
				this.calculatePrice()
				let info = {
					id: this.popupId,
					num: this.popupNum
				}
				this.updateShopCartNums(info)
				this.showPopup = !this.showPopup
			},
			toSubmission() {
		        let info={
					content:[],
					totalPrice:this.totalPrice,
					totalNum:this.totalNum,
					type:2
				}
				var flag=null
				this.list.forEach(val => {
					if(val.flag){
						let content={
							productId:val.itemId,
							specsId:val.id,
							name:val.itemName,
							goodInfo:val.propClassName+'*'+val.propName,
							price:val.propPrice,
							num:val.num,
							picUrl:val.mainPicUrl
						}
						info.content.push(content)
						flag=true
					}else{
				         
					}
					
				})
				if(!flag){
					this.$toast({
						message:'请选择要结算的商品'
					})
					return
				}
			
					this.$router.push({name:'shopSubmission',params:info})
			},
			getList(e) {
				let params = new FormData()
				params.append('buyerId', this.id)

				this.isLoad = true
                // 判断是否微信浏览器
                if (window.localStorage.getItem('wxBrowser') && (window.localStorage.getItem('token').length==0   || window.localStorage.getItem('token')=='null' )) {
                	window.localStorage.setItem('url','shoppCart')//微信浏览器，登录时候返回当前页面需要用到
					window.localStorage.setItem('cart','show')
                }
				axios.post('/shop/t-shop-cart/findUserShopCart').then(res => {
					if (res.meta.success) {
						this.isLoad = false
						this.list = res.data.map(val => {
							val.flag = false
							val.mainPicUrl=this.configUrl+val.mainPicUrl
							return val
						})
						if(this.list.length==0){
							this.showEmpty=true
						}
						window.localStorage.removeItem('url')//微信浏览器，登录时候返回当前页面需要用到
						
					}
				})

			},
			updateShopCartNums(e) {
				let params = new FormData()
				params.append('id', e.id)
				params.append('nums', e.num)
				axios.post('/shop/t-shop-cart/updateShopCartNums', params).then(res => {

				})
			},

			async del() {
				let ids = await this.getIds()
				let params = new FormData()
				params.append('ids', ids)
				axios.post('/shop/t-shop-cart/deleteShopCart', params).then(res => {
					if (res.meta.success) {
						this.list = this.list.filter(e => {
							return !e.flag
						})
						this.calculatePrice()
						let num=this.showCardNum+1
						this.collageCardNum(num)
						this.$toast({
							message: "删除成功"
						})
					}
				})
			},
			getIds() {
				var ids = ''
				this.list.forEach(val => {
					if (val.flag) {
						ids += val.id + ','
					}
				})
				return ids
			}


		},
		created() {
			this.getList()
		},
		watch:{
			showReturnRefresh(){
				this.getList()
			}
		}

	}
</script>

<style scoped>
	.goods-info {
		width: 6.94rem;
		margin: 0.15rem auto 0 auto;
	}

	.info-title {
		height: 1.12rem;
		display: flex;
		display: -webkit-box;
		display: -webkit-flex;
		align-items: center;
		-webkit-box-align: center;
		-webkit-align-items: center;
		font-size: 0.28rem;
		background: #fff;

	}

	.select-all {
		width: 0.3rem;
		height: 0.3rem;
		border: 1px solid #9999a1;
		border-radius: 50%;
		box-sizing: border-box;
		margin: 0 0.2rem;
		margin-top: 0.02rem;
	}

	.selectAll {
		width: 0.3rem;
		height: 0.3rem;
		border-radius: 50%;
		margin: 0 0.2rem;
		margin-top: 0.02rem;
	}

	.select-title {}

	.goods-list {
		display: flex;
		display: -webkit-box;
		display: -webkit-flex;
		align-items: center;
		-webkit-box-align: center;
		-webkit-align-items: center;
		background: #fff;
		padding-bottom: 0.6rem;
	}

	.goods-img {
		width: 1.8rem;
		height: 1.8rem;
		border: 1px solid #ddd;
		border-radius: 0.1rem;
		overflow: hidden;
	}

	.goods-img img {
		width: 100%;
		height: 100%;

	}

	.goods-content {
		height: 1.82rem;
		width: 3.95rem;
		margin-left: 0.1rem;
		font-size: 0.28rem;
		display: flex;
		display: -webkit-box;
		display: -webkit-flex;
		flex-direction: column;
		-webkit-box-direction: normal;
		-webkit-box-orient: vertical;
		-webkit-flex-direction: column;
		justify-content: space-between;
		-webkit-box-pack: justify;
		-webkit-justify-content: space-between;


	}

	.goods-content .goods-name {
		width: 100%;
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

	.goods-content .specs {
		font-size: 0.22rem;
		color: #a5a5a7;
		margin-top: 0.05rem;
	}

	.goods-bottom {
		display: flex;
		display: -webkit-box;
		display: -webkit-flex;
		justify-content: space-between;
		-webkit-box-pack: justify;
		-webkit-justify-content: space-between;
	}

	.goods-bottom .goods-price {
		font-size: 0.32rem;
		color: #e01212;
	}

	.inputNumber {
		display: flex;
		display: -webkit-box;
		display: -webkit-flex;
		align-items: center;
		-webkit-box-align: center;
		-webkit-align-items: center;
	}

	.inputNumber-left,
	.inputNumber-right {
		height: 0.46rem;
		width: 0.495rem;
		display: flex;
		display: -webkit-box;
		display: -webkit-flex;
		align-items: center;
		-webkit-box-align: center;
		-webkit-align-items: center;
		justify-content: center;
		-webkit-box-pack: center;
		-webkit-justify-content: center;
		border: 1px solid #e3e3e3;
		box-sizing: border-box;
	}

	.inputNumber-left {
		border-top-left-radius: 0.05rem;
		border-bottom-left-radius: 0.05rem;
	}

	.inputNumber-right {
		border-top-right-radius: 0.05rem;
		border-bottom-right-radius: 0.05rem;
	}

	.inputNumber-left img,
	.inputNumber-right img {
		width: 0.18rem;
	}

	.inputNumber-center {
		width: 0.79rem;
		height: 0.46rem;
		display: flex;
		display: -webkit-box;
		display: -webkit-flex;
		align-items: center;
		-webkit-box-align: center;
		-webkit-align-items: center;
		border-top: 1px solid #e3e3e3;
		border-bottom: 1px solid #e3e3e3;
		box-sizing: border-box;
	}

	.inputNumber-center div {
		width: 100%;
		border: none;
		text-align: center;
		color: #606060;
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
	}

	.content-bottom-rt .amount-to {
		color: #000;
		margin-left: 0.15rem;

	}

	.content-bottom-rt .total-price {
		color: #ff7911;
		margin-left: 0.1rem;
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

	.popup {
		height: 2rem;
		width: 5rem;
		background: #fff;
		position: fixed;
		top: 5rem;
		left: 50%;
		padding: 0.3rem;
		border-radius: 0.25rem;
		transform: translateX(-50%);
		-webkit-transform: translateX(-50%);
		z-index: 101;
	}

	.popup .popup-title {
		font-size: 0.4rem;
	}

	.popup .popup-input {
		border-bottom: 1px solid #ff0000;
	}


	.popup .popup-btn {
		font-size: 0.28rem;
		display: flex;
		display: -webkit-box;
		display: -webkit-flex;
		align-items: center;
		-webkit-box-align: center;
		-webkit-align-items: center;
		justify-content: flex-end;
		-webkit-box-pack: end;
		-webkit-justify-content: flex-end;
		color: #ff5600;
	}

	.popup-btn .btn-left,
	.popup-btn .btn-right {
		width: 1.2rem;
		height: 1rem;
		text-align: center;
		line-height: 1rem;
	}

	.show-shadow {
		height: 100%;
		width: 100%;
		background: rgba(0, 0, 0, 0.6);
		position: fixed;
		top: 0;
		z-index: 100;
	}
</style>
<style>
	/* 	.inputNumber-center .van-cell.van-field{
		padding: 0 !important;
		width: 0.79rem;
		height: 0.46rem;
		display: flex;
		display: -webkit-box;
		display: -webkit-flex;
		align-items: center;
		-webkit-box-align: center;
		-webkit-align-items: center;
		border-top: 1px solid #e3e3e3;
		border-bottom: 1px solid #e3e3e3;
		box-sizing: border-box;
	}
	.inputNumber-center .van-cell.van-field input{
		width: 100%;
		border: none;
		text-align: center;
		color: #606060;
	} */
	.popup-input .van-cell.van-field {
		padding-bottom: 0 !important;
		padding-left: 0 !important;

	}
</style>
