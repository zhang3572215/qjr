<template>
	<div>
		<div class='elastic' >
			<div class='elastic-tit'>
				客服咨询时间：8:00-21:00
			</div>
			<div class='elastic-num'>
				<div  @click="toOnline">
					<img src="../assets/online-service.png" alt="">
					<div>在线客服</div>
				</div>
				<div  @click='define'>
					<img src="../assets/phone-5.png" alt="">
					<div>拨打电话</div>
				</div>
				
			  <!--   400-829-0037
				 <div class='timeRange'>
					 客服时间段：早上8:00——晚上9:00
				 </div> -->
			</div>
			<div class='elastic-btn'>
				<div  class='btn-cancel'  @click="remove">
					取消
				</div>
				<!-- <div class='btn-cancel' @click="remove">取消</div>
				<div class='btn-confirm' @click='define'>确定</div> -->
			</div>
		</div>
		<div class='show-shadow'>

		</div>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				
			}
		},
	   props:{
		   typeInfo:String,
	   },
		methods:{
			remove(){
				this.$emit('priming')
			},
			define(){
				this.$emit('define')
			},
			toOnline(){
				this.$emit('priming')

				let info={
				   title:this.typeInfo
				}
				this.$router.push({name:'customers',params:info})
				
			}
		}
	}
</script>

<style scoped>
	.elastic {
		/* height: 3rem; */
		width: 5.5rem;
		position: fixed;
		top: 4rem;
		left: 50%;
		transform: translateX(-50%);
		-webkit-transform: translateX(-50%);
		border-radius: 0.3rem;
		overflow: hidden;
		z-index: 3001;
		background: #fff;
		
	}

	.elastic .elastic-tit {
		height: 0.8rem;
		font-size: 0.36rem;
		text-align: center;
		line-height: 0.8rem;
		color: #000;
		/* font-weight: 550; */
	}

	.elastic .elastic-num {
		height: 2rem;
		font-size: 0.28rem;
		/* line-height: 1rem; */
		/* text-align: center; */
		/* margin-top: -0.2rem; */
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
	.elastic .elastic-num>div{
		width: 50%;
		text-align: center;
		padding:0.3rem 0 ;
		color: #009cff;
	}
	.elastic .elastic-num img{
		 width: 0.8rem;
		 height: 0.8rem;
		
	}
/* .elastic .elastic-num .timeRange{
	   font-size: 0.18rem;
	   color: #777;
  } */
	.show-shadow {
		position: fixed;
		top: 0;
		left: 0;
		background: rgba(0, 0, 0, 0.6);
		width: 100%;
		height: 100%;
		z-index: 3000;
	}
	.elastic-btn{
		height: 1rem;
		width: 100%;
		margin-top: 0.3rem;
		/* border-top: 1px solid #ddd; */
	}
	.elastic-btn .btn-cancel{
		width: 2rem;
		font-size: 0.32rem;
		height: 0.7rem;
		background: #ff7944 ;
		color: #fff;
		margin: 0 auto;
		text-align: center;
		line-height: 0.7rem;
		border-radius: 0.15rem;
	}
/* 	.elastic-btn .btn-cancel{
		width: 50%;
		text-align: center;
		line-height: 1rem;
		color:#0066CC;
		font-size: 0.3rem;
		float: left;
		border-right: 1px solid #ddd;
		box-sizing: border-box;
	} */
	.elastic-btn .btn-confirm{
		width: 50%;
		text-align: center;
		line-height: 1rem;
		font-size: 0.3rem;
			color:#0066CC;
			float: right;
	}
</style>
