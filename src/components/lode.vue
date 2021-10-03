<template>
	<div>
		<div class='isLoads'>
			<!-- <img src="../assets/loads.png" alt=""> -->
			<img src="../assets/jiazai.png" alt="">
			<div class='tit'>加载中</div>
		</div>
	</div>
</template>

<script>
	export default{
		name:'Load'
	}
</script>

<style scoped>
	.isLoads{
		position:fixed;
		z-index:5000;
		width:2.2rem;
		min-height:1.9rem;
		top:5.7rem;
		left:85%;
		margin-left:-3.8em;
		background:rgba(17, 17, 17, 0.7);
		text-align:center;
		border-radius:5px;
		color:#FFFFFF;
		border-radius: 0.1rem;
	}
	.isLoads .tit{
		font-size: 0.28rem;
		box-sizing:border-box;
		/* transform: translateY(-70%);
		-webkit-transform: translateY(-70%); */
	}
	.isLoads img{
		 width: 30px;
		 height: 30px;		
		 transform-origin: center center;
		 -webkit-transform-origin: center center;
		 /* transition: demo 0.7s infinite linear; */
		animation: demo 0.7s infinite linear;
		 -webkit-animation: demo 0.7s infinite linear;
		 /* border-radius: 50%; */
	}
	@-webkit-keyframes  demo{
		from{
			-webkit-transform: rotate(0deg);
		     
		}
		to{
			-webkit-transform: rotate(360deg);
		}
	}
	.isLoad .tit{
		font-size: 0.28rem;
	}
</style>
