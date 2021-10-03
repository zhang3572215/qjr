<template>
	<div class='containerHeight' @touchstart="touchStart($event)" @touchmove="touchMove($event)" @touchend="touchEnd($event)">
		<head-Piece :sign='signInfo'>
			<template slot="content">开票信息</template>
			<!-- <block slot='content-right'>历史发票</block> -->
		</head-Piece>
	
		<div class="content-list">
			<div v-for='(item,index) in list'>
				<div class='list' v-if='item.type == 2'>
					<div class='list-head' @click='tabFalg(index,item.id)'>
						<div>{{item.head}}</div>
						<!-- <radio value="" class='radios' :checked="flag" @click='tabFalg' style="transform: scale(0.72);" /> -->
						<div class='radios' :class='item.status===true?"signColor":""'>
							<img src='../../assets/dui.png'></img>
						</div>
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
					<div class='list-head' @click='tabFalg(index,item.id)'>
						<div>{{item.head}}</div>
						<div class='radios' :class='item.status===true?"signColor":""' >
							<img src='../../assets/dui.png'></img>
						</div>
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
			<div>提交申请</div>
		</div>
       		<Load v-if='isLoad'></Load>
			<showMoadel v-if='modelFlag' :cont='msg' :cancelText='"取消"'  :confirmText='"确定"' @define='confirm' @remove='cancel'></showMoadel>
			<empty v-if="showEmpty"></empty>
			<showSuccess  v-if='isSuccess'  :successInfo='successInfo' ></showSuccess>
	</div>
</template>

<script>
	import * as axios from '../../untils/ajax.js'
	import {mapState,mapActions} from 'vuex'
	export default {
		data() {
			return {
				flag: false,
				pageSize: 6,
				pageNo: 1,
				list: [],
				total: '',
				isLoad:false,
				id:null,
				invoiceId:null,
				showEmpty:true,
				modelFlag:false,
				billsId:'',
				msg:"",
				delId:null,
				isSuccess:false,
				startX :0,
				startY:0,
				 endX:0,
				 endY:0,
				 innerHeight:'',
				 scrollTop:"", 
				 scrollHeight:'',
				  contentHeight:'',
				  signHeight:'',
				  signSuccess:0,
				  successInfo:'',
				  isSuccess:false,
				  signInfo:""
			}
		},
		computed:{
			...mapState(['refreshInvoce'])
		},
		// onReachBottom() {
		// 	this.pageNo = this.pageNo + 1
		
		// 	if (this.list.length >= this.total) {
		// 		this.toast.success('数据加载完了')
		// 		return
		// 	}
		// 	this.getList()
		// },
		methods: {
			...mapActions(['collageRefreshInvoce']),
			tabFalg(index,id) {
				let signFlag=this.list[index].status
				this.list=this.list.map(item => {
					 item.status=false
					 return item
				})
				if(signFlag){
					this.list[index].status =false
					this.invoiceId=undefined
				}else{
					this.list[index].status = !this.list[index].status
					this.invoiceId=id
				}
				
				
			},
			addInvoice() {
				let that=this
				if(!this.invoiceId){
					// this.toast.fail('请选择发票')
					this.$toast({
					    message:'请选择发票', duration: 1000
					})
					return
				}
				this.isLoad=true
				let params=new FormData()
				params.append('orderId',this.id)
				params.append('invoiceConfigId',this.invoiceId)
				params.append('billsId',this.billsId)
				axios.post('/office/t-office-order/applyInvoice',params).then(res =>{
					if(res.meta.success){
						this.isLoad=false
						this.successInfo = '提交成功'
						this.isSuccess = true
						setTimeout(() => {
							that.isSuccess = false
						}, 1500)
						let num= Number(this.refreshInvoce)+1
						this.collageRefreshInvoce(num)
						setTimeout(()=>{
							that.$router.go(-1)
						},700)
					}else{
						this.isLoad=false
						// this.toast.fail(res.meta.msg)
						this.$toast({
						    message: res.meta.msg, duration: 1500
						})
					}
				})
			},
			
			getList(des) {
				let that = this
				let params = new FormData()
				params.append('pageSize', that.pageSize)
				params.append('pageNo', that.pageNo)
				if(des!=1){
					this.isLoad=true
				}
				
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
						if(that.list.length==0){
							that.showEmpty=true
							that.msg="您未配置开票信息，请先配置"
						     that.modelFlag=true
						}else{
							that.showEmpty=false
						}
						this.isLoad=false
					} else {
						this.isLoad=false
						this.$toast({
						    message: '获取数据失败', duration: 1500
						})
					}
				
				})
			},
			edit(e){
				console.log(e)
				var info ={}
				info['type']=e.type
				info['head']=e.head
				info['id']=e.id
				info['code']=e.code
               if(e.type==1){
				   
			   }else{
                   info['address']=e.address
				   info['mobile']=e.mobile
				   info['bankName']=e.bankName
				   info['bankNo']=e.bankNo
			   }
			   
			   this.signInfo='提交申请'
			   this.$router.push({'name':'specialInvoice',params:info})
				// uni.navigateTo({
				// 	url:'/pages/my/specialInvoice?info='+JSON.stringify(info) 
				// })
			},
			del(id){
				 this.delId=id
				this.msg='是否要删除?'
			    this.modelFlag=true
				// this.toast.showNewModal('提示', '是否要删除?', true, '取消', '确定',function(){
				
				// })	
			},
			confirm(){
				let that=this
				this.modelFlag=false
				if(this.delId==null){
					   this.signInfo='提交申请'
					let info={
						sign:'sub'
					}
					this.$router.push({'name':'myInvoice',params:info})
					// uni.navigateTo({
					// 	url:'/pages/my/myInvoice'
					// })
					
				}else{
					let params=new FormData()
					params.append('id',this.delId)
					axios.post('/office/t-office-invoice-config/deleteInvoiceConf',params).then(res => {
						 if(res.meta.success){
							this.successInfo = '刪除成功'
							this.delId=null
							this.isSuccess = true
							setTimeout(() => {
								that.isSuccess = false
							}, 1500)
							this.list=[]
							 that.pageNo=1
							 that.getList(1)
						 }else{
							this.$toast({
							    message: '获取数据失败', duration: 1500
							})
						 }
					})
				}
			
				
			},
			cancel(){
			    this.modelFlag=false
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
			   	this.isLoading = false
			   },
			   scrollToTheEnd() {
			   	let innerHeight = document.querySelector('#app').clientHeight
			   	let contentHeight=document.querySelector('.containerHeight').offsetHeight
			   	// 变量scrollTop是滚动条滚动时，距离顶部的距离
			   	let scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop
			   	// 变量scrollHeight是滚动条的总高度
			   	let scrollHeight = document.documentElement.clientHeight || document.body.scrollHeight
			   	
			   	//变量scrollHeight是滚动条的总高度
			   	var scrollHeights = document.documentElement.scrollHeight||document.body.scrollHeight;
			   	this.innerHeight=scrollHeights
			   	this.scrollTop=scrollTop
			   	this.scrollHeight=scrollHeight
			   	this.contentHeight=contentHeight
			   	// 滚动条到底部的条件
				  
			   	if (scrollTop + scrollHeight >= innerHeight) {
			   		if (this.pullUpState !== 3 && !this.isLoading) {
			   			this.infiniteLoad()
			   		}
			   		// console.log('距顶部' + scrollTop + '滚动条总高度' + scrollHeight + '内容高度' + innerHeight)
			   	}
			   	let signHeight=Number(contentHeight)-( Number(innerHeight)+Number(scrollTop))
			   	let that=this
			// this.$toast({
			//     message: signHeight, duration: 1500
			// })
			   	 if(signHeight<60){
			   		if (that.total <= that.list.length && that.total>0) {
			   			that.signSuccess=that.signSuccess+1
			   			
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
			   		this.endListFalg=true
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
			 this.id=this.$route.params.id
			 this.billsId=this.$route.params.billsId
			 this.list=[]
			 this.pageNo=1
			 this.getList()
		},
		onShow() {
			// this.list=[]
			// this.pageNo=1
			// this.getList()
		},
		watch:{
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
	}
</script>

<style scoped>
	.content-list{
		padding-bottom: 1rem;
	}
	.list {
		background: #fff;
		margin:0 auto;
		border-radius: 0.15rem;
		width: 6.94rem;
		padding-bottom: 0.28rem;
		box-shadow: 0.05rem 0.05rem 0.10rem #ececee;
		margin-top: 0.2rem;
	}
 .content-list>div:nth-child(1) .list{
	 margin-top: 0;
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
		font-size: 0.30rem;
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
		justify-content: flex-end;
		-webkit-box-pack: end;
		-webkit-justify-content: flex-end;
		align-items: center;
		-webkit-box-align: center;
		-webkit-align-items: center;
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
		justify-content: center;
		-webkit-box-pack: center;
		-webkit-justify-content: center;
		align-items: center;
		-webkit-box-align: center;
		-webkit-align-items: center;
		box-sizing: border-box;
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
		position: fixed;
		bottom: 0.26rem;
		background: #fff;
		/* left: 100%; */
		right: 5%;
		/* transform: translateX(-50%); */
		height: 0.64rem;
		border-radius: 0.32rem;
		width: 1.90rem;
		border: 1px solid #ff5f1e;
		color: #FF5F1E;
		/* text-align: center; */
		line-height: 0.64rem;
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
		/* color: #fff; */
	}

	.add-bottom img {
		width: 0.295rem;
		height: 0.295rem;
		margin-right: 0.18rem;
	}
</style>
