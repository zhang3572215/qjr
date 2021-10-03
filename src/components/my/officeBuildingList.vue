<template>
	<div  class='containerHeight' @touchstart="touchStart($event)" @touchmove="touchMove($event)" @touchend="touchEnd($event)">
		<head-Piece>
			<template slot="content">分佣写字楼</template>
		</head-Piece>

		<div class='info' v-for='(item,index) in list' :key='index'>
			{{item.province}}{{item.city}}{{item.district}}{{item.name}}
		</div>

		<Load v-if='isLoad'></Load>
		<showSuccess v-if='isSuccess' :successInfo='successInfo'></showSuccess>
		<empty v-if="showEmpty"></empty>
	</div>
</template>

<script>
	import * as axios from '../../untils/ajax.js'
	export default {
		data() {
			return {
				list: [],
				pageSize:20,
				pageNo:1,
				totalCounts: '',
				isLoad: false,
				startX: 0,
				startY: 0,
				endX: 0,
				endY: 0,
				innerHeight: '',
				scrollTop: "",
				scrollHeight: '',
				contentHeight: '',
				signHeight: '',
				signSuccess: 0,
				successInfo: '',
				isSuccess: false,
				endListFalg: false,
				showEmpty:false,
				typeFlag:false
			}
		},
		methods: {
			getAreaListByEstateId() {
				let params = new FormData()
				params.append('pageSize',this.pageSize)
				params.append('pageNo', this.pageNo)
				this.isLoad = true
				axios.post('/business/t-business-areas/getAreaListByEstateId', params).then(res => {
					this.isLoad = false
					if (res.meta.success) {
						this.totalCounts = res.data.totalCounts
						
						if(this.pageSize==1){
							this.list = res.data.records
						}else{
							this.list =this.list.concat(res.data.records)
						}
						
						if(this.list.length==0){
							this.showEmpty=true
						}
					}
				})
			},
           touchStart(e) {
           		this.startX = e.touches[0].pageX
           		this.startY = e.touches[0].pageY
      
           
           	},
           	touchMove(e) {
           		this.endX = e.changedTouches[0].pageX
           		this.endY = e.changedTouches[0].pageY
           		let direction = this.getSlideDirection(this.startX, this.startY, this.endX, this.endY)
           		switch (direction) {
           			case 0:
           				// console.log('没滑动')
           				break
           			case 1:
           				// console.log('向上')
           				this.scrollToTheEnd()
           				break
           			case 2:
           				// console.log('向下')
           				break
           			case 3:
           				// console.log('向左')
           				break
           			case 4:
           				// console.log('向右')
           				break
           			default:
           		}
           	},
           	touchEnd() {
           		this.isLoad = false
           	},
           	scrollToTheEnd() {
				
           		// let innerHeight = document.querySelector('#app').clientHeight
				// let innerHeight = document.querySelector('#app').clientHeight
           		let contentHeight =document.body.clientHeight
           		// 变量scrollTop是滚动条滚动时，距离顶部的距离
           		let scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop
           		// 变量scrollHeight是滚动条的总高度
           		let scrollHeight = document.documentElement.clientHeight || document.body.scrollHeight
           
           		//变量scrollHeight是滚动条的总高度
           		var scrollHeights = document.documentElement.scrollHeight || document.body.scrollHeight;
           		this.innerHeight = scrollHeights
           		this.scrollTop = scrollTop
           		this.scrollHeight = scrollHeight
           		this.contentHeight = contentHeight
           		// 滚动条到底部的条件

           		if (scrollTop + scrollHeight >= innerHeight) {
           			if (this.pullUpState !== 3 && !this.isLoad) {
           				this.infiniteLoad()
           			}
           			// console.log('距顶部' + scrollTop + '滚动条总高度' + scrollHeight + '内容高度' + innerHeight)
           		}
           		let signHeight = Number(contentHeight) - (Number(innerHeight) + Number(scrollTop))
           		let that = this
           		// this.$toast({
           		//     message: signHeight, duration: 1500
           		// })
           		if (signHeight < 60) {
           			if (that.total <= that.list.length && that.total > 0) {
           				that.signSuccess = that.signSuccess + 1
           
           			}
           		}
           	},
           
           	/**
           	 * 上拉加载数据
           	 */
           	infiniteLoad() {
           		this.pullUpState = 2
           		let that = this
           		if (this.list.length >= this.totalCounts) {
           			// this.isSuccess = true
           			// setTimeout(() => {
           			// 	that.isSuccess = false
           			// }, 2000)
           			this.endListFalg = true
           			return false
           		}
           		this.pageNo = this.pageNo + 1
           		this.getAreaListByEstateId()
           		// this.onInfiniteLoad(this.infiniteLoadDone)
           	},
           
           	/**
           	 * 加载数据完成
           	 */
           	infiniteLoadDone() {
           		this.pullUpState = 1
           	},
           
           	/**
           	 * 返回角度
           	 */
           	getSlideAngle(dx, dy) {
           		return Math.atan2(dy, dx) * 180 / Math.PI
           	},
           
           	/**
           	 * 根据起点和终点返回方向 1：向上，2：向下，3：向左，4：向右,0：未滑动
           	 * @param {number} startX X轴开始位置
           	 * @param {number} startY X轴结束位置
           	 * @param {number} endX Y轴开始位置
           	 * @param {number} endY Y轴结束位置
           	 */
           	getSlideDirection(startX, startY, endX, endY) {
           		let dy = startY - endY
           		let dx = endX - startX
           		let result = 0
           		// 如果滑动距离太短
           		if (Math.abs(dx) < 2 && Math.abs(dy) < 2) {
           			return result
           		}
           		let angle = this.getSlideAngle(dx, dy)
           		if (angle >= -45 && angle < 45) {
           			result = 4
           		} else if (angle >= 45 && angle < 135) {
           			result = 1
           		} else if (angle >= -135 && angle < -45) {
           			result = 2
           		} else if ((angle >= 135 && angle <= 180) || (angle >= -180 && angle < -135)) {
           			result = 3
           		}
           		return result
           	
           
           }
		},
		created() {
			this.getAreaListByEstateId()
		
		},
		watch: {
			signSuccess(val) {
				if (this.endListFalg) {
					let that = this
					this.successInfo = '数据加载完了'
					this.isSuccess = true
		
					setTimeout(() => {
						that.isSuccess = false
					}, 1000)
				}
		
			},
		}
	}
</script>

<style scoped>
	.containerHeight{
		height: 100vh;
	}
	.info {
		background: #fff;
		width: 100%;
		height: 1rem;
		border-top: 1px solid #eee;
		font-size: 0.3rem;
		display: flex;
		display: -webkit-box;
		display: -webkit-flex;
		align-items: center;
		-webkit-box-align: center;
		-webkit-align-items: center;
		padding-left: 0.2rem;
		box-sizing: border-box;
		margin-top: -0.14rem;
	}

</style>
