<template>
	<div>
		<div class='isLoad'>
			<!-- <img src="../../assets/fail.png" alt=""> -->
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
		padding: 0.1rem  0.07rem;
		top:5.7rem;
		left:85%;
		margin-left:-3.8em;
		background:rgba(17, 17, 17, 0.7);
		text-align:center;
		border-radius:5px;
		color:#FFFFFF;
		border-radius: 0.1rem;
	}	
	.isLoad .tit{
		font-size: 0.28rem;
	}
</style>
