<template>
	<div>
		<div class='isLoad'>
			<img src="../assets/fail.png" alt="">
			<div class='tit'>{{msg}}</div>
		</div>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				
			}
		},
		props:['msg']
	}
</script>

<style scoped>
	.isLoad{
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
	.isLoad img{
		 width: 0.72rem;
		 height: 0.72rem;
		 border-radius: 50%;
	}

	.isLoad .tit{
		font-size: 0.28rem;
	}
</style>
