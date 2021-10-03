<template>
	<div class='content'>
		<div class='content-head'>
			<div class='head' :class='showHead?"collage-head":""'>
				<div class='head-img' @click="tapreturn">
					<img src='../../assets/left-go.png'></img>
					<div>返回</div>
				</div>
				<div>
					<span v-if='!showHead'>余额</span>
				</div>
				<div class='head-right' @click="toProblem">
					常见问题
				</div>
			</div>
			<div class='allowance-tit' :class='showHead?"tit-top":""'>
				我的抵佣金(元)
			</div>
			<div class='allowance-num'>
				0.00
			</div>
		</div>
		<div class='operation'>
			<div class='operation-left'>
				<img src='../../assets/withdraw.png'></img>
				<div>提现</div>
			</div>
			<div class='operation-right'>
				<img src='../../assets/recharge.png'></img>
				<div>充值</div>
			</div>
		</div>
		<div class='detailed'>
			<div class='detailed-tit'>
				<img src='../../assets/record.png'></img>
				<div>余额交易记录</div>
			</div>
			<img src='../../assets/right-to.png'></img>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
                    showHead:false
			}
		},
		methods: {
			tapreturn() {
				this.$router.go(-1)
			},
			toProblem(){
				this.$router.push('commonProblem')
			}
		},
		created() {
			if (window.localStorage.getItem('wxBrowser')) {
				this.showHead = true
			}
		
		}
	}
</script>

<style scoped>
	.content {
		width: 100vw;
		/* background: #fff; */
	}

	.content-head {
		height: 4.62rem;
		width: 100%;
		background-image: url('../../assets/picture-1.png');
		background-size: 100% 124%;
	}

	.head {
		padding-top: 0.65rem;
		text-align: center;
		width: 100%;
		position: relative;
		font-size: 0.36rem;
		color: #fff;
	}
   .head.collage-head{
	    padding-top: 0.3rem;
	}

	.head .head-img {
		display: flex;
		display: -webkit-box;
		display: -webkit-flex;
		align-items: center;
		-webkit-box-align: center;
		-webkit-align-items: center;
		position: absolute;
		left: 0.28rem;
		top: 65upx;
		font-size: 0.32rem;
	}

	.head .head-img img {
		width: 0.18rem;
		height: 0.32rem;
		margin-right: 0.12rem;
	}

	.head-right {
		position: absolute;
		right: 0.28rem;
		top: 0.65rem;
		font-size: 0.32rem;
	}
  .head.collage-head .head-right{
  	top: 0.3rem;
  }
	.allowance-tit {
		margin: 0.42rem 0 0 0.28rem;
		font-size: 0.30rem;
		color: #fff;
	}
	 .allowance-tit.tit-top{
		 margin-top: 0.82rem;
	 }

	.allowance-num {
		margin: 0.50rem 0 0 0.28rem;
		font-size: 1rem;
		color: #fff;
	}

	.operation {
		height: 1rem;
		width: 6.94rem;
		margin: 0 auto;
		background: #fff;
		border-radius: 0.10rem;
		display: flex;
		display: -webkit-box;
		display: -webkit-flex;
		align-items: center;
		-webkit-box-align: center;
		-webkit-align-items: center;
		transform: translateY(-0.50rem);
		-webkit-transform:translateY(-0.50rem) ;
		font-size: 0.26rem;
	}

	.operation .operation-left {
		display: flex;
		display: -webkit-box;
		display: -webkit-flex;
		justify-content: center;
		-webkit-box-pack:center;
		-webkit-justify-content: center;
		align-items: center;
		-webkit-box-align: center;
		-webkit-align-items: center;
		width: 50%;
	}

	.operation .operation-left img {
		width: 0.52rem;
		height: 0.52rem;
		margin-right: 0.22rem;
	}

	.operation-right {
		width: 50%;
		display: flex;
		display: -webkit-box;
		display: -webkit-flex;
		justify-content: center;
		-webkit-box-pack: center;
		-webkit-justify-content: center;
		align-items: center;
		-webkit-box-align: center;
		-webkit-align-items: center;
	}

	.operation .operation-right img {
		width: 0.52rem;
		height: 0.52rem;
		margin-right: 0.22rem;
	}

	.detailed {
		height: 1.10rem;
		width: 6.94rem;
		margin: 0 auto;
		border-radius: 10upx;
		display: flex;
		display: -webkit-box;
		display: -webkit-flex;
		justify-content: space-between;
		-webkit-box-pack: justify;
		-webkit-justify-content: space-between;
		align-items: center;
		-webkit-box-align: center;
		-webkit-align-items: center;
		padding: 0 0.28rem;
		background: #fff;
		transform: translateY(-0.30rem);
		-webkit-transform: translateY(-0.30rem);
		box-sizing: border-box;
	}

	.detailed-tit {
		display: flex;
		display: -webkit-box;
		display: -webkit-flex;
		font-size: 0.30rem;
		color: #666;
	}

	.detailed .detailed-tit img {
		width: 0.445rem;
		height: 0.365rem;
		margin-right: 0.22rem;
	}

	.detailed img {
		width: 0.15rem;
		height: 0.27rem;
	}
</style>
