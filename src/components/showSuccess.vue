<template>
	<div>
		<div class='total-success'>
			<div class='success-img'><img src="../assets/true-1.png" alt=""></div>
			<div class='success-tit'>{{successInfo}}</div>
		</div>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				
			}
		},
		props:['successInfo'],
		methods:{
			
		}
	}
</script>

<style scoped>
	.total-success {
			position: fixed;
			top: 5.7rem;
			background: rgba(44, 44, 44, 0.8);
		/* 	display: flex;
			flex-direction: column;
			align-items: center; */
			font-size: 0.28rem;
			color: #fff;
			width: 2.2rem;
			height: 2.15rem;
			border-radius: 0.15rem;
			left: 50%;
			transform: translateX(-50%);
			-webkit-transform: translateX(-50%);
			z-index: 1000;
		}
	 .total-success .success-img{
			 width:100%;
			 height:1.4rem;
			 position: relative;
			 text-align: center;
		 }
		.total-success img {
			width: 1.1rem;
			height: 1.05rem;
			margin-top: 0.35rem;
		}
	
	 .total-success   .success-tit{
		   width: 100%;
		   text-align: center;
	}
</style>
