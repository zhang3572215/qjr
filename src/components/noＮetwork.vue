<template>
	<div>
         <img class='net-img' src="../assets/no-network.png" alt="">
		 <div class='net-info'>
			 您的网速好像不给力，请稍候重试
		 </div>
		 <div class='btn' @click='again'>
			重新加载
		 </div>
	</div>
</template>

<script>
	 export default{
		 data(){
			 return{
				 
			 }
		 },
		 methods:{
			 again(){
				 this.$router.go(0)
			 }
		 }
	 }
</script>

<style scoped>
	.net-img{
	  width: 6rem;
	     position: absolute;
		 top: 40%;
		 left: 50%;
		 transform: translate(-50%,-50%);
		 -webkit-transform: translate(-50%,-50%);
	}
	.net-info{
		font-size: 0.3rem;
		color:#a2a19f;
		width: 100%;
		text-align: center;
		position: absolute;
		top: 60%;
		left: 50%;
		transform: translate(-50%,-50%);
		-webkit-transform: translate(-50%,-50%);
	}
	.btn{
	   height:0.6rem;
	   width:2rem;
	   color: #000000;
	   background: #f6d272;
	   font-size: 0.32rem;
	   text-align: center;
	   line-height: 0.6rem;
	   position: absolute;
	   top: 66%;
	   left: 50%;
	   transform: translate(-50%,-50%);
	   -webkit-transform: translate(-50%,-50%);
	}
</style>
