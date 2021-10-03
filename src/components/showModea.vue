<template>
	<div>
		<div class='showModel'>
			<div class='show-tit'>
				提示
			</div>
			<div class='show-content'>
				{{cont}}
			</div>
			<div class='show-btn'>
				<div class='show-confirm' @click="confirm" v-if='confirmspan.length>0'>{{confirmspan}}</div>
				<div class='show-confirm' @click="confirm" v-else>确定</div>
                <div class='show-cancel' @click='cancle' v-if='showCancel '>取消</div>
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
		props:['cont','showCancel','cancelspan','confirmspan'],
		methods:{
			confirm(){
				this.$emit('define')
			},
			cancle(){
				this.$emit('remove')
			}
		}
	}
</script>

<style scoped>
	.showModel {
		background: #fff;
		/* height: 3rem; */
		width: 6rem;
		position: fixed;
		top: 5.2rem;
		left: 50%;
		transform: translateX(-50%);
		-webkit-transform: translateX(-50%);
		border-radius: 0.07rem;
		z-index: 3002;
	
	}
	
	.show-shadow {
		height: 100%;
		width: 100%;
		background: rgba(0, 0, 0, 0.6);
		position: fixed;
		top: 0;
		z-index: 3001;
	}
	
	.showModel .show-tit {
		font-size: 0.38rem;
		width: 100%;
		height: 1rem;
		/* text-align: center; */
		margin-left: 0.4rem;
		line-height: 1.2rem;
		color: #000;
	}
	
	.showModel .show-content {
		font-size: 0.30rem;
		height: 1.1rem;
		width: 90%;
		/* line-height: 1.2rem; */
		/* text-align: center; */
		margin-top: 0.2rem;
		color: #000;
		margin-left: 0.4rem;
	     word-break: break-all;
	      display: -webkit-box;
	      -webkit-line-clamp: 2;  /*限制在一个块元素显示的文本的行数*/
	     -webkit-box-orient: vertical;
	      overflow: hidden;
	}
	
	.showModel .show-btn {
		width: 100%;
		height: 1rem;
		width: 100%;
	/* 	display: flex;
		display: -webkit-flex; */
		/* align-items: center; */
		/* border-top: 1px solid #ccc; */
		box-sizing: border-box;
		color: #218b75;
		margin-top: -0.17rem;
	}
	
	.showModel .show-btn>div {
		flex: 1;
		font-size: 0.28rem;
		/* text-align: center; */
		height: 100%;
		line-height: 1rem;
	}
	
	.showModel .show-btn .show-cancel {
		/* border-right: 1px solid #ccc; */
	    /* text-align: end; */
		float: right;
		margin-right: 0.46rem;
		box-sizing: border-box;
	    
	}
	.showModel .show-btn .show-confirm{
		margin-left: 0.46rem;
		float: left;
	}
</style>
