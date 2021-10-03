<template>
	<div class='container'>
		<div class='contents'>
			<div class='head'>
				<div class='head-left' @click="toBack">
					<img src="../assets/left-black.png" mode=""></img>
					<span>返回</span>
				</div>
				<div class='head-center'>
				     新居清洁
				</div>
				<div class='head-rights'>
		         
				</div>
			</div>
		</div>
		<div class='head-show'>
		</div>
		<!-- <img class='content-img' src="../assets/new-residence-clean.jpg" alt=""> -->
		<!-- <img class='content-img' src="../assets/carpetBttom.png" alt=""> -->
	</div>
</template>

<script>
	export default{
		data(){
		  return{
			  
		  }
		},
		methods:{
			toBack(){
				this.$router.go(-1)
			}
		}
	}
</script>

<style scoped>
	.container{
		width: 100%;
		height: 100%;
		background: #fff;
	}
	.contents {
			position: fixed;
			top: 0;
			z-index: 100;
			width: 100vw;
		}
	
		.head {
			padding-top: 0.38rem;
			height: 0.88rem;
			width: 100vw;
			/* background: #36a8fa; */
			background: #fff;
			text-align: center;
			position: relative;
			box-sizing: content-box;
			/* color:#fff; */
			font-size: 0.33rem;
			z-index: 20000;
		}
	/* 
		.head-left {
			height: 100%;
			line-height: 0.88rem;
			float: left;
			width: 30%;
			display: flex;
			position: relative;
		}
	
		.head-left img {
			display: inline-block;
			width: 0.18rem;
			height: 0.32rem;
			position: absolute;
			margin-left: 0.28rem;
			top: 50%;
			transform: translateY(-50%);
			-webkit-transform: translateY(-50%);
		}
	
		.head-left span {
			margin-left: 0.60rem;
			font-size: 0.32rem;
			position: absolute;
			top: 50%;
			transform: translateY(-50%);
			-webkit-transform: translateY(-50%);
		} */
	.head-left {
			height: 100%;
			/* line-height: 0.88rem; */
			float: left;
			width: 30%;
			/* display: flex; */
	        position: relative;
		}
	
		.head-left img {
			display: inline-block;
			width: 0.18rem;
			height: 0.32rem;
			position: absolute;
			margin-left: 0.28rem;
			top:50%;
			left: 0;
			transform: translateY(-50%);
			-webkit-transform: translateY(-50%);
		}
	
		.head-left span {
			margin-left: 0.35rem;
			font-size: 0.32rem;
			position: absolute;
			top: 50%;
			left: 0;
			transform: translateY(-50%);
			-webkit-transform: translateY(-50%);
			width: 50%;
		}
	
		.head-center {
			height: 100%;
			width: 40%;
			line-height: 0.88rem;
			text-align: center;
			float: left;
			font-size: 0.36rem;
		}
	
		/* .head-right{
			 
			  height: 88rem;
			  width: 30%;
			
			} */
		.head-rights {
			height: 100%;
			line-height: 0.85rem;
			float: right;
			width: 20%;
			display: flex;
			justify-content: flex-end;
			padding-right: 0.28rem;
		}
	
		.head-show {
			height: 1.28rem;
			width: 100%;
		}
	  .content-img{
		  width: 100%;
		   margin-bottom: -0.25rem;
		  /* height: 90%; */
	  }
</style>
