<template>
	 <div>
		<div class='contents'>
			<div class='head'>
				<div class='head-left'>
					<!-- <img src="./img/left-black.png" mode=""></img>
				<span>返回</span> -->
				</div>
				<div class='head-center'>
				    抢单大厅
				</div>
				<div class='head-right'>
					
				</div>
			</div>
		</div>
		<div class='head-show'>
		</div> 
		 <empty v-if='showEmpty'></empty>
	 </div>
</template>

<script>
	export default{
		data(){
			return{
					showEmpty:true
			}
		}
	}
</script>

<style scoped>
	.contents {
		position: fixed;
		top: 0;
		z-index: 1000;
		width: 100vw;
	
	}
	
	.head {
		padding-top: 0.38rem;
		height: 0.88rem;
		width: 100vw;
		/* background: #36a8fa; */
		background: #fff;
		text-align: center;
		/* position: relative; */
		box-sizing: content-box;
		/* color:#fff; */
		font-size: 0.33rem;
		z-index: 2000;
	}
	
	.head-left {
		height: 100%;
		line-height: 0.88rem;
		float: left;
		width: 30%;
		display: flex;
	}
	
	.head-left img {
		display: inline-block;
		width: 0.18rem;
		height: 0.32rem;
		position: absolute;
		margin-left: 0.28rem;
		top: 0.685rem;
	}
	
	.head-left span {
		margin-left: 0.60rem;
		font-size: 0.32rem;
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
	.head-right {
		height: 100%;
		line-height: 0.85rem;
		float: right;
		width: 20%;
		display: flex;
		justify-content: flex-end;
		padding-right: 0.28rem;
		font-size: 0.32rem;
	}
	
	.head-show {
	
		height: 1.28rem;
		width: 100%;
	}
	
</style>
