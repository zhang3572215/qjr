<template>
	<div>
		<head-Piece :sign='"购物车"'>
			<template slot="content">商品评价</template>
		</head-Piece>
		<div class='list' v-for="(item,index) in list" :key='index'>
			<div class='list-center clearfloat'>
				<div class='center-left'>
					<img class='left-img' :src='item.materPicUrl'></img>

				</div>
				<div class='center-tit'>
					<div class='content-info'>
						<div class="tit-info">
							<span> {{item.itemName}}</span>

						</div>
						<div class='good-specs'>
							<span>{{item.className}}*{{item.propName}}</span>
						</div>
						<!-- <div class='center-week'>
							{{item.weeks}}
						</div> -->
					</div>
				</div>

			</div>
			<div class='assess'>
				描述相符
				<template v-for='(items,indexs) in item.activation'>

					<div class='assets-img' v-if='items===1' @click='tabActivation(index,indexs,"des")'>
						<img src="../../assets/activation.png" alt="">
					</div>
					<div class='assets-img' v-if='items===0' @click='tabActivation(index,indexs,"fro")'>
						<img src='../../assets/frozen.png' alt="">
					</div>

				</template>
				<!-- <div class='assets-img'>
					<img src="../../assets/activation.png" alt="">
				</div> -->
				<span class='assess-title'>
					{{item.msg}}
				</span>
			</div>
			<div class='assess-info'>
				<textarea name="" id="" placeholder="从多个角度评价商品,可以帮助更多想买的人" v-model="item.content"></textarea>
			</div>
			
		</div>
	   <div class="evaluate" @click="evaluate">
	   	发布评价
	   </div>
		<Load v-if='isLoad'></Load>
	</div>
</template>

<script>
	import * as axios from '../../untils/ajax.js'
	import * as axios1 from '../../untils/ajax1.js'
  import {mapActions,mapGetters} from 'vuex'
	export default {
		data() {
			return {
				activation: [0, 0, 0, 0, 0],
				score: '',
				msg: '',
				isLoad: false,
				list: []
			}
		},
		computed:{
			...mapGetters(['showCleanFlag'])
		},
		methods: {
			...mapActions(['collageCleanFlag']),
			tabActivation(index, indexs, info) {
				let activation = this.list[index].activation
				this.list[index].activation = activation.map((item, i) => {
					if (info === 'fro') {
						if (i <= indexs) {
							item = 1
						} else {
							item = 0
						}
					} else if (info === 'des') {
						if (i <= indexs) {
							item = 1
						} else {
							item = 0
						}
					}
					return item
				})
				this.list[index].score=indexs+1
				let that = this
				switch (indexs) {
					case 0:
						that.list[index].msg = '很差'
						break;
					case 1:
						that.list[index].msg = '差'
						break;
					case 2:
						that.list[index].msg = '一般'
						break;
					case 3:
						that.list[index].msg = '好'
						break;
					case 4:
						that.list[index].msg = '非常好'
						break;
				}
			},
			getList() {
				this.isLoad = true
				let params = new FormData
				params.append('orderId', this.id)
				axios.post('/shop/t-shop-order/getShopOrderDetailByOrderId', params).then(res => {
					if (res.meta.success) {

						this.list = res.data[0].tShopOrderDetails.map((val, index) => {
							val.activation = [0, 0, 0, 0, 0]
							val.msg = ''
							val.materPicUrl = this.configUrl + val.picUrl
							val.content=''
							val.score=0
							return val
						})
						this.info = res.data[0]

						// this.materUrl = this.configUrl + this.info.tProductOffice.materPicUrl
						// if (typeof(this.info.allowanceMoney) == 'string') {
						// 	console.log(555)
						// 	this.info.allowanceMoney = 0
						// }
						// if (typeof(this.info.couponMoney) == 'string') {

						// 	this.info.couponMoney = 0
						// }
						// if (this.info.address.includes(')') && this.info.detailAddr.length > 0) {
						// 	this.info.address = this.info.address.substr(0, this.info.address.length - 1) + ',' + this.info.detailAddr +
						// 		')'
						// }
						this.copyInfo = this.info.orderNo

						this.showContent = true
						this.isLoad = false
					} else {
						this.isLoad = false
					}
				})
			},
			//评价
			evaluate(){
				let flag=true
				let params=[]
				this.list.forEach(val => {
					console.log(val.score)
					 if(val.score==0){
						 flag=false
					 }
					 let info={
						 
					 }
					 info.orderId=val.orderId
					 info.propId=val.propId
					 info.assessManner=val.score
					 info.content=val.content
					 params.push(info)
				})
				console.log(params)
				console.log(flag)
				if(!flag){
					this.$toast({
						message:'有商品未评分',
						duration:1000
					})
					return
				}
			   this.isLoad=true
				axios1.post('/shop/t-shop-order-assess/assess',params).then(res => {
					this.isLoad=false
				  	if(res.meta.success){
						let num =this.showCleanFlag+1
						this.collageCleanFlag(num)
						this.$toast({
							message:'评价成功',
							duration:1000
						})
						let that=this
						setTimeout(()=>{
							that.$router.go(-1)
						},400)
					}
				})
			}
		},
		created() {
			this.id = this.$route.params.orderId
			this.getList()
		}
	}
</script>

<style scoped>
	.list {
		background: #fff;
		padding: 0.28rem;
		width: 90%;
		margin: 0 auto;
		margin-bottom: 0.15rem;
	}

	.list-center {
		display: flex;
		display: -webkit-box;
		display: -webkit-flex;

		align-items: center;
		-webkit-box-align: center;
		-webkit-align-items: center;
		font-size: 0.3rem;
	}

	.list-center .center-left {
		display: flex;
		display: -webkit-box;
		display: -webkit-flex;
		align-items: center;
		-webkit-box-align: center;
		-webkit-align-items: center;
	}

	.list-center .center-left img {
		width: 0.96rem;
		height: 0.96rem;
	}

	.center-tit {
		margin-left: 0.15rem;
	}

	.center-tit .good-specs {
		color: #aaa;
		margin-top: 0.1rem;
	}

	.assess {
		display: flex;
		display: -webkit-box;
		display: -webkit-flex;
		align-items: center;
		-webkit-box-align: center;
		-webkit-align-items: center;
		height: 0.9rem;
		font-size: 0.3rem;
	}

	.assess .assets-img {
		display: flex;
		display: -webkit-box;
		display: -webkit-flex;
		align-items: center;
		-webkit-box-align: center;
		-webkit-align-items: center;
		margin-left: 0.2rem;
	}

	.assess .assets-img img {
		height: 0.45rem;
	}

	.assess .assess-title {
		margin-left: 0.3rem;
		color: #949494;
	}

	.assess-info {
		height: 1rem;
		width: 100%;
		padding-bottom: 0.2rem;
		margin-top: 0.1rem;
	}

	.assess-info textarea {
		width: 100%;
		height: 100%;
		font-size: 0.28rem;
		border-radius: 0.1rem;
		border: 1px solid #EEEEEE;
	}

	.assess-info textarea::-webkit-input-placeholder {
		color: #ccc;
	}

	.evaluate {
		background: #fff;
		position: absolute;
		left: 50%;
		transform: translateX(-50%);
		-webkit-transform: translateX(-50%);
		bottom: 0.5rem;
		height: 0.7rem;
		width: 2rem;
		text-align: center;
		line-height: 0.7rem;
		font-size: 0.32rem;
		border: 1px solid #888;
		color: #666;
		border-radius: 0.1rem;
	}
</style>
