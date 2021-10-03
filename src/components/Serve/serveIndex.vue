<template>
	<div>
		<grabSheet v-if='PageCur =="order"'>    </grabSheet>
		<myTask v-if='PageCur =="task" '></myTask>
		<serveNew v-if='PageCur == "news"'></serveNew>
		<myServe v-if='PageCur =="my"'></myServe>
		<div class='tabs'>
			<div class='tabs-nav' :class='[PageCur == "order"?"flag-color":""]' @click="collage" data-cur="order">
				<img :src='"../../assets/home"+[PageCur == "order"?"-act":""] +".png"'> </img>
				<div>抢单大厅</div>
			</div>
			<div class='tabs-nav' :class='[PageCur == "task"?"flag-color":""]' @click="collage" data-cur="task">
				<img :src='"../../assets/jiu" +[PageCur == "task"?"-act":""] +".png"'> </img>
				<div>任务</div>
			</div>
			<div class='tabs-nav tabs-notice' :class='[PageCur == "news"?"flag-color":""]' @click="collage" data-cur="news">
				<img :src='"../../assets/like"+[PageCur == "news"?"-act":""]+".png"'> </img>
				<div>消息</div>
				<div class='notice-num' v-if='noticeNum'>
					{{noticeNum}}
				</div>
			</div>
			<div class='tabs-nav' :class='[PageCur == "my"?"flag-color":""]' @click="collage" data-cur="my">
				<img :src='"../../assets/my"+[PageCur == "my"?"-act":""]+".png"'> </img>
				<div>我的</div>
			</div>
		</div>
	</div>
</template>

<script>
	import myTask from './myTask.vue'
	import myServe from './mySever.vue'
	import serveNew from './serverNew.vue'
	import grabSheet from './grabSheet.vue'
	import {
		mapGetters,
		mapState,
		mapActions
	} from 'vuex'
	import * as axios from '../../untils/ajax.js'
	export default {
		data() {
			return {
				PageCur: 'order',
				noticeNum:''
			}
		},
		components: {
			myTask,
			myServe,
			serveNew,
			grabSheet
		},
		computed: {
			...mapGetters(['todps','showReturnRefresh','showServerUnread']),
			...mapState(['desInfo'])
		},
		methods: {
			...mapActions(['addShowDes','addShowSignId']),
			collage: function(e) {
				// e.currentTarget.dataset.cur
				this.PageCur = e.currentTarget.dataset.cur
				// console.log(this.PageCur)
				// this.addShowDes(this.PageCur)

					if(this.PageCur!='task'){
						this.addShowSignId(1)
				  }
			},
			// 未读数量(客户端)
			unReadNumByCus() {
				axios.post('/business/t-business-notice-employee/unReadNumByCle').then(res => {
					if (res.meta.success) {
			            this.noticeNum=res.data
					}
				})
			},
		},
		created() {
			
			// 点击消息推送跳转过来的
			if(this.$getOther.getUrlInfo('myTask')=='1'){
				this.PageCur='task'
			}else if(this.$getOther.getUrlInfo('mySever')=='1'){
				this.PageCur='my'
			}
			
			if(window.localStorage.getItem('token') != 'null'){
					this.unReadNumByCus() //未读数量(客户端)
			}
		    
			history.pushState(null, null, document.URL); //首页加载时候先置空
			window.addEventListener('popstate', function(e) { //后退事件置空
				let url=document.URL.split('/')[document.URL.split('/').length - 1]
				if (document.URL.split('/')[document.URL.split('/').length - 1].includes('serverIndex')) {//在首页时候禁止返回
					history.pushState(null, null, document.URL);
				}
			});
            // 进入服务端
              plus.storage.setItem('isClient','2')
		},
		watch: {
			desInfo: {
				handler(newval, oldval) {
					this.PageCur = newval
				},
				immediate: true
			},
			showReturnRefresh(){
				if(window.localStorage.getItem('token') != 'null'){
						this.unReadNumByCus() //未读数量(客户端)
				}
			},
			showServerUnread(){
				if(window.localStorage.getItem('token') != 'null'){
						this.unReadNumByCus() //未读数量(客户端)
				}
			}
		},
		
	}
</script>

<style scoped>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		overflow: hidden;
		width: 100%;
	}

	.tabs {
		position: fixed;
		bottom: 0;
		z-index: 1000;
		height: 1rem;
		width: 100%;
		/* line-height: 1rem; */
		/* display: flex; */
		/* display:-webkit-flex; */
		/* justify-content: center; */
		/* align-items: center; */
		/* border-top: 1px solid #C8C7CC; */
		background: #fff;
		color: #8b8b8b;
		
	}
	
	.tabs .tabs-nav {
		height: 100%;
		width: 25%;
		/* display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center; */
		text-align: center;
		float: left;
		font-size: 0.24rem;
	}
	
	.tabs .tabs-nav img {
		display: block;
		height: 0.40rem;
		width: 0.40rem;
		margin:0.15rem auto 0.06rem auto ;
	     
	}
	
	.tabs .tabs-nav.tabs-notice {
		position: relative;
	}
	
	.tabs-nav.tabs-notice .notice-num {
		color: #fff;
		min-width: 0.15rem;
		padding: 0.08rem;
		height: 0.15rem;
		line-height: 0.15rem;
		font-size: 0.22rem;
		border-radius: 0.15rem;
		background: #CE3C39;
		text-align: center;
		position: absolute;
		top: 0.05rem;
		right: 0.3rem;
	}
	
	.flag-color {
		color: #1095d8;
	}
</style>
