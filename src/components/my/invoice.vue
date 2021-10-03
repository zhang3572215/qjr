<template>
	<div class='content'>
		<head-Piece>
			<template slot="content">开票信息</template>
		</head-Piece>
	
		<div class='content-list'>
			<div class='list'  v-if='type==2'>
				<div class='type'>发票类型：<span>增值税专用发票</span></div>
				<div>发票抬头：<span>{{info.head}}</span></div>
				<div>纳税号：<span>{{info.code}}</span></div>
				<div class='address'>地址：<span>{{info.address}}</span></div>
				<div>电话：<span>{{info.mobile}}</span></div>
				<div>开户行：<span>{{info.bankName}}</span></div>
				<div>账号：<span>{{info.bankNo }}</span></div>
				<div>申请时间：<span>{{info.date}}</span><span>{{info.time}}</span></div>
			</div>
			<div class='list' v-else>
				<div class='type'>发票类型：<span>增值税普通发票</span></div>
				<div>发票抬头：<span>{{info.head}}</span></div>
				<div>纳税号：<span>{{info.code}}</span></div>
				<div>邮箱：<span>{{info.emails}}</span></div>
				<div>申请时间：<span>{{info.date}}</span><span>{{info.time}}</span></div>
			</div>
		</div>
			<Load v-if='isLoad'></Load>
			<empty v-if="showEmpty"></empty>
	</div>
</template>

<script>
    import * as axios from '../../untils/ajax.js'
	export default{
		data(){
			return{
				type:'',
				info:{},
				isLoad:false,
				showEmpty:false
			}
		},
		methods:{
			getInfo(){
				let that=this
				// let params=new FormData()
				// params.append('invoiceId',this.id)
				this.isLoad=true
				let params=new FormData()
				params.append('invoiceId',this.id)
				axios.post('/office/t-office-invoice-record/getInvoiceDetailById',params).then(res => {
					console.log(res)
					if (res.meta.success) {
					    var date=res.data.applyTime.split(' ')
						 
						that.info=res.data
					   that.info['date']=date[0]
					   that.info['time']=date[1]
						// this.toast.success('验证码已发送')
						this.isLoad=false
					} else {
						this.isLoad=false
						// that.toast.fail('获取数据失败')
				        this.$toast({
				            message:'获取数据失败', duration: 1500
				        })
					}
		
				})
			}
		},
		created(){
			this.type=this.$route.params.type
			this.id=this.$route.params.id
			this.getInfo()
		}
	}
</script>

<style scoped>
	.content{
		width:100vw;
	}
	.list{
	   padding: 0.26rem 0.16rem 0.30rem 0.16rem;
	   margin: 0.20rem  auto 0 auto;
	   background: #fff;
	   width: 6.94rem;
	   border-radius: 0.10rem;
	   color: #707070;
	   box-shadow: 0px 5px 10px #ececee;
	}
	.list .type{
		font-size: 0.30rem;
		color:#ff2d2d;
	}
	.list div{
		 font-size: 0.30rem;
		margin-bottom: 0.18rem;
	}
	.list div:last-child{
			margin-bottom:0;
	}
	.list div:last-child span:first-child{
		margin-right: 0.15rem;
	}
	.list .address{
		width: 6.60rem;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
</style>
