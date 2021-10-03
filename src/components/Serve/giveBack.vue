<template>
	<div>
		<head-Piece>
			<template slot="content">退还包</template>
		</head-Piece>

		<div class='content'>
			<div class='content-cont' @click="toSelect()">
				<div>工具包情况:</div>
				<div class='select' v-if='complantValue.length==0'>请选择</div>
				<div class='show-select' v-else>{{complantValue}}</div>
			</div>
			<div class='complanit-remark'>
				<div class='remark-tit'>
					备注:
				</div>
				<div class='remark-text'>
					<textarea name="" id="" v-model="remark" placeholder="请输入处理备注"></textarea>
				</div>
			</div>

		</div>
		<div class='apply-content'>
			<div class='btn-right' @click='putReturnTools'>
				确认退还
			</div>
		</div>
		<van-popup v-model="showPicker" position="bottom">
			<van-picker show-toolbar :columns="columns" @cancel="showPicker = false" @confirm="onConfirm" />
		</van-popup>

	</div>
</template>

<script>
	import * as axios from '../../untils/ajax.js'
	import {
		mapActions,
		mapGetters
	} from 'vuex'
	export default {
		data() {
			return {
				showPicker: false,
				columns: ['完好', '部分损坏','丢失'],
				complantValue: '',
				remark: ''
			}
		},
		computed: { ...mapGetters(['showApplyFalg'])
		},
		methods: {
			...mapActions(['collageApplyFalg']),
			onConfirm(value) {
				this.complantValue = value;

				this.showPicker = false;
			},
			toSelect() {
				this.showPicker = true
			},
			putReturnTools() {
				if(this.complantValue.length==0){
					this.$toast('请选择工具包情况')
				}
				var status=''
				if(this.complantValu=='完好'){
					status=1
				}else if(this.complantValu=='部分损坏'){
					status=2
				}else{
					status=3
				}
				let params = new FormData()
				params.append('rendId', this.id)
				params.append('toolsStatus',status)
				params.append('remark', this.remark)
				let that=this
				axios.post('/office/t-office-tools-rend/putReturnTools', params).then(res => {
					if (res.meta.success) {
						let num = this.showApplyFalg + 1
						this.collageApplyFalg(num)
						that.$toast('退还成功！')
                          setTimeout(()=>{
                          	that.$router.go(-1)
                          },600)
					}
				})


			}


		},
		created() {
            this.id=this.$route.params.id
		}
	}
</script>

<style scoped>
	.head-show {

		height: 1.28rem;
		width: 100%;
	}

	.content {
		background: #fff;
	}

	.content-cont {
		font-size: 0.3rem;
		height: 0.7rem;
		/* width:100%; */
		display: flex;
		display: -webkit-flex;
		-webkit-box-align: center;
		-ms-flex-align: center;
		-webkit-align-items: center;
		border-bottom: 1px solid #ddd;
		padding-left: 0.16rem;
		align-items: center;
		box-sizing: content-box;
	}

	.content-cont .select {
		color: #bbb;
		margin-left: 0.1rem;
	}

	.content-cont .show-select {
		color: #777;
		margin-left: 0.1rem;
	}

	.content .complanit-remark {
		padding-bottom: 0.3rem;
	}

	.remark-tit {
		margin: 0.2rem 0 0 0.16rem;
		font-size: 0.3rem;
	}

	.remark-text {
		width: 6.94rem;
		height: 1.66rem;
		/* overflow: hidden; */
		/* overflow-y: scroll; */
		/* overflow-y:auto; */
		/* border: 1px solid #ddd; */
		border: 1px solid #ddd;
		z-index: 1;
		overflow-y: scroll !important;
		overflow-x: visible;
		margin-top: 0.29rem;
		margin-left: 0.26rem;

		/* padding-bottom: 0.2rem; */
	}

	.remark-text textarea {
		display: block;
		height: 1.76rem;
		width: 98%;
		overflow-y: scroll;
		outline: none;
		border: none;
		font-size: 0.28rem;
	}

	textarea {
		padding: 0.15rem 0 0 0.15rem;
		box-sizing: border-box;
		resize: none;
		border: none;
		/* scrollbar-arrow-color:yellow; */
		/* scrollbar-base-color:lightsalmon; */
	}

	textarea::-webkit-input-placeholder {
		color: #aaa;

	}

	.remark-text::-webkit-scrollbar {
		display: block;
		width: 0.3rem;
		height: 0.3rem;
	}

	.remark-text::-webkit-scrollbar-track-piece {
		background-color: #f5f5f5;
	}

	.remark-text::-webkit-scrollbar-thumb {
		border-radius: 0.4rem;
		background-color: #ddd;
		background-clip: padding-box;
		min-height: 0.28rem;

	}

	.content-bottom {
		position: fixed;
		bottom: 0;
		background: #fff;
		width: 100%;
		height: 1rem;
		display: flex;
		display: -webkit-flex;
		align-items: center;
		justify-content: flex-end;
		font-size: 0.28rem;
	}

	.btn-right {
		width: 1.7rem;
		height: 0.64rem;
		border-radius: 0.32rem;
		border: 1px solid #ff5f1e;
		color: #FF5F1E;
		text-align: center;
		line-height: 0.64rem;
		margin-right: 0.2rem;
	}

	.total-false {
		position: fixed;
		top: 5.7rem;
		background: rgba(44, 44, 44, 0.8);
		/* 	display: flex;
			flex-direction: column;
			align-items: center; */
		font-size: 0.28rem;
		color: #fff;
		/* width: 2.2rem; */
		/* height: 2.15rem; */
		padding: 0.2rem;
		border-radius: 0.15rem;
		left: 50%;
		transform: translateX(-50%);
		-webkit-transform: translateX(-50%);
		z-index: 1000;
	}

	.total-false .success-tit {
		width: 100%;
		text-align: center;
	}

	.apply-content {
		width: 100%;
		height: 0.8rem;
		display: flex;
		align-items: center;
		justify-content: flex-end;
		font-size: 0.30rem;
		position: absolute;
		bottom: 0;
		background-color: #fff;
	}

	.btn-right {
		font-size: 0.28rem;
		width: 1.60rem;
		height: 0.58rem;
		line-height: 0.58rem;
		text-align: center;
		border: 1px solid #ff5f1e;
		border-radius: 0.15rem;
		color: #fff;
		background-color: #ff5f1e;
		box-sizing: border-box;
		margin-right: 0.24rem;
	}
</style>
