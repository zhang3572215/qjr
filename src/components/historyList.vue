<template>
    <!-- @touchstart="touchStart($event)" @touchmove="touchMove($event)" @touchend="touchEnd($event)" -->
    <div class='containerHeight'>
        <head-Piece>
            <template slot="content">历史订单</template>
        </head-Piece>
        <!-- <div class='content-btn'>
			<div class='btn-info'>
				<div class='btn' @click="collage(4)" :class='type == "4"?"sign-color":""'>
					半年内
				</div>
				<div class='btn' @click="collage(5)" :class='type == 5?"sign-color":""'>
					1年内
				</div>
				<div class='btn' @click="collage(undefined)" :class='type == undefined?"sign-color":""'>
					全部
				</div>
			</div>
		</div> -->
        <!-- 	<div class='content-show'>	
		</div> -->

        <van-list @load="onLoad" :offset="100" :immediate-check="false">
            <div class='container'>
                <div class='list' v-for='(item,index) in list' :key='index' @click="gotoDetail(item.id,item.buyType)">
                    <div v-if='item.productType==2'>
                        <div class='list-head'>
                            <div class='head-lefts'>
                                <img src='../assets/time.png'></img>
                                <div class='left-tit'>下单时间:<span>{{item.orderTime}}</span></div>
                            </div>
                            <div class='head-right'>
                                <span v-if='item.orderStatus==1'>待支付</span>
                                <span v-if='item.orderStatus==2'>已支付</span>
                                <span v-if='item.orderStatus==3'>服务中</span>
                                <span v-if='item.orderStatus==4'>待评价</span>
                                <span v-if='item.orderStatus==5'>完成</span>
                                <span v-if='item.orderStatus==6'>关闭</span>
                            </div>
                        </div>
                        <div class='list-center'>

                            <div class='center-left'>
                                <img class='left-img' src='../assets/count-num.png' v-if='item.buyType==1'></img>
                                <img class='left-img' src='../assets/month.png' v-if='item.buyType==2'></img>
                                <img class='left-img' src='../assets/season.png' v-if='item.buyType==3'></img>
                                <img class='left-img' src='../assets/new-year.png' v-if='item.buyType==4'></img>
                            </div>
                            <div class='center-tit'>
                                <div class='content-info'>
                                    <div class="tit-info">
                                        <span v-if='item.buyType==1'>单次保洁</span><span v-if='item.buyType==2'>包月定制</span>
                                        <span v-if='item.buyType==3'>包季定制</span><span v-if='item.buyType==4'>包年定制</span>
                                        <span class='tit-right'>
                                            ￥{{item.payableMoney}}
                                        </span>
                                    </div>
                                    <div>
                                        <!-- <span v-if='item.frequency==1'>1次/周</span>
								<span v-if='item.frequency==2'>2次/周</span>
								<span v-if='item.frequency==3'>3次/周</span>
								<span v-if='item.frequency==4'>4次/周</span>
								<span v-if='item.frequency==5'>5次/周</span>
								<span v-if='item.frequency==6'>6次/周</span>
								<span v-if='item.frequency==7'>7次/周</span> -->
                                        <!-- <span>({{item.weeks}})</span> -->
                                        <span>{{item.flatNum}}平</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class='list-address'>
                            <div class='address-info'>
                                <div class='info-img'><img src='../assets/address.png'></img></div>

                                <span>{{item.district}}{{item.address}}</span>
                            </div>
                            <div class='details'>
                                <div class='details-info'>订单详情</div>
                            </div>
                            <img class='details-right' src='../assets/right-go.png'></img>
                        </div>
                        <div class='list-btn' v-if='item.orderStatus==1 || (item.buyType==1 && item.orderStatus==2) || (item.buyType==1 && item.orderStatus==3)   || item.orderStatus==3 ||item.orderStatus==5 ||(item.orderStatus==2 && item.payType==3 && item.isSure ==1)'>
                            <button class='btn-pay' v-if='item.orderStatus==1  && item.payType==1' @click.stop.prevent='pay(item.id,item.payType,item.payableMoney,item.isSure)'>
                                支付</button>
                            <button class='btn-pay' v-if='item.orderStatus==1 &&  item.payType==2 && item.isSure ==2'
                                @click.stop.prevent='pay(item.id,item.payType,item.payableMoney,item.isSure)'>确认转账</button>
                            <button class='btn-pay' v-if='item.orderStatus==1 &&  item.payType==2 && item.isSure ==1'
                                @click.stop.prevent='pay(item.id,item.payType,item.payableMoney,item.isSure)'>修改凭证</button>
                            <button class='btn-pay' v-if='item.orderStatus==1 &&  item.payType==3 && item.isSure ==2'
                                @click.stop.prevent='pay(item.id,item.payType,item.payableMoney,item.isSure)'>确认签约</button>
                            <button class='serveDe' v-if='item.payStatus==1' @click.stop.prevent="toServeList(item.id,item.productType)">服务详情</button>
                            <button class='btn-pay' v-if='(item.orderStatus==1 || item.orderStatus==2 || item.orderStatus==3)  &&  item.payType==3 && item.isSure ==1'
                                @click.stop.prevent='pay(item.id,item.payType,item.payableMoney,item.isSure)'>月结</button>
                            <button class='btn-cancel' v-if='item.orderStatus==1 && item.payType!=3'
                                @click.stop.prevent="cancle(item.id)">取消订单</button>
                            <button class='btn-cancel' v-if='item.orderStatus==1 && item.payType==3 &&item.isSure==2'
                                @click.stop.prevent="cancle(item.id)">取消订单</button>

                            <button class='btn-pay' v-if='item.orderStatus==3 ||item.orderStatus==5'
                                @click.stop.prevent="toServeList(item.id,item.productType)">评价</button>
                            <!-- 		<button class='btn-pay' v-if='(item.buyType==1 && item.orderStatus==2) || (item.buyType==1 && item.orderStatus==3)' 
                @click.stop.prevent='subscribe(item)'>预约</button> -->
                        </div>
                        <!-- <div class='list-btn' v-if='item.orderStatus==1 || (item.buyType==1 && item.orderStatus==2) || (item.buyType==1 && item.orderStatus==3) ||item.buyType==3 ||item.orderStatus==3 ||item.orderStatus==5'>
						<button class='btn-pay' v-if='item.orderStatus==1' @click.stop.prevent='pay(item.id)'> 支付</button>
						<button class='btn-cancel' v-if='item.orderStatus==1' @click.stop.prevent="cancle(item.id)">取消订单</button>
				
					    <button class='serveDe ' v-if='item.payStatus==1' @click.stop.prevent="toServeList(item.id,item.productType)">服务详情</button>
			
					</div> -->
                    </div>
                    <div v-if='item.productType==3'>

                    </div>
                    <div v-if='item.productType==5'>
                        <div class='list-head'>
                            <div class='head-lefts'>
                                <img src='../assets/time.png'></img>
                                <div class='left-tit'>下单时间:<span>{{item.orderTime}}</span></div>
                            </div>
                            <div class='head-right'>
                                <span v-if='item.orderStatus==1'>待支付</span>
                                <span v-if='item.orderStatus==2'>已支付</span>
                                <span v-if='item.orderStatus==3'>服务中</span>
                                <span v-if='item.orderStatus==4'>待评价</span>
                                <span v-if='item.orderStatus==5'>完成</span>
                                <span v-if='item.orderStatus==6'>关闭</span>
                            </div>
                        </div>
                        <div class='list-center'>
                            <div class='center-left'>
                                <img class='left-img' src='../assets/capet-recevice.png'></img>
                            </div>
                            <div class='center-tit'>
                                <div class='content-info'>
                                    <div class="tit-info">
                                        <span>地毯清洁</span>

                                        <span class='tit-right'>
                                            ￥{{item.payableMoney}}
                                        </span>
                                    </div>
                                    <div>

                                        <span>{{item.flatNum}}平</span>
                                    </div>

                                </div>
                            </div>

                        </div>
                        <div class='list-address'>
                            <div class='address-info'>
                                <div class='info-img'>
                                    <img src='../assets/address.png'></img>
                                </div>

                                <span>{{item.address}}</span>
                            </div>
                            <div class='details'>
                                <div class='details-info'>订单详情</div>
                            </div>
                            <img class='details-right' src='../assets/right-go.png'></img>
                        </div>
                        <div class='list-btn' v-if='item.orderStatus==1 || (item.buyType==1 && item.orderStatus==2) || (item.buyType==1 && item.orderStatus==3) ||item.buyType==3 ||item.orderStatus==3 ||item.orderStatus==5'>
                            <button class='btn-pay' v-if='item.orderStatus==1' @click.stop.prevent='pay(item.id)'> 支付</button>
                            <button class='btn-cancel' v-if='item.orderStatus==1' @click.stop.prevent="cancle(item.id)">取消订单</button>
                            <!-- item.payStatus==1' -->
                            <button class='serveDe' v-if='item.payStatus==1' @click.stop.prevent="toServeList(item.id,item.productType)">服务详情</button>
                            <button class='btn-pay' v-if='item.orderStatus==3 ||item.orderStatus==5'
                                @click.stop.prevent="toServeList(item.id,item.productType)">评价</button>
                            <!-- 		<button class='btn-pay' v-if='(item.buyType==1 && item.orderStatus==2) || (item.buyType==1 && item.orderStatus==3)' 
							 @click.stop.prevent='subscribe(item)'>预约</button> -->
                        </div>
                    </div>
                    <div v-if='item.productType==4'>
                        <div class='list-head'>
                            <div class='head-lefts'>
                                <img src='../assets/time.png'></img>
                                <div class='left-tit'>下单时间:<span>{{item.orderTime}}</span></div>
                            </div>
                            <div class='head-right'>
                                <span v-if='item.orderStatus==1'>待支付</span>
                                <span v-if='item.orderStatus==2'>已支付</span>
                                <span v-if='item.orderStatus==3'>服务中</span>
                                <span v-if='item.orderStatus==4'>待评价</span>
                                <span v-if='item.orderStatus==5'>完成</span>
                                <span v-if='item.orderStatus==6'>关闭</span>
                            </div>
                        </div>
                        <div class='list-center'>
                            <div class='center-left'>
                                <img class='left-img' src='../assets/curtians.png'></img>
                            </div>
                            <div class='center-tit'>
                                <div class='content-info'>
                                    <div class="tit-info">
                                        <span>窗帘清洁</span>

                                        <span class='tit-right'>
                                            ￥{{item.payableMoney}}
                                        </span>
                                    </div>
                                    <div>

                                        <span>{{item.flatNum}}平</span>
                                    </div>

                                </div>
                            </div>

                        </div>
                        <div class='list-address'>
                            <div class='address-info'>
                                <div class='info-img'>
                                    <img src='../assets/address.png'></img>
                                </div>

                                <span>{{item.address}}</span>
                            </div>
                            <div class='details'>
                                <div class='details-info'>查看详情</div>
                            </div>
                            <img class='details-right' src='../assets/right-go.png'></img>
                        </div>
                        <div class='list-btn' v-if='item.orderStatus==1 || (item.buyType==1 && item.orderStatus==2) || (item.buyType==1 && item.orderStatus==3) ||item.buyType==3 ||item.orderStatus==3 ||item.orderStatus==5'>
                            <button class='btn-pay' v-if='item.orderStatus==1' @click.stop.prevent='pay(item.id)'> 支付</button>
                            <button class='btn-cancel' v-if='item.orderStatus==1' @click.stop.prevent="cancle(item.id)">取消订单</button>
                            <!-- item.payStatus==1' -->
                            <button class='serveDe' v-if='item.payStatus==1' @click.stop.prevent="toServeList(item.id,item.productType)">服务详情</button>
                            <button class='btn-pay' v-if='item.orderStatus==3 ||item.orderStatus==5'
                                @click.stop.prevent="toServeList(item.id,item.productType)">评价</button>
                            <!-- 		<button class='btn-pay' v-if='(item.buyType==1 && item.orderStatus==2) || (item.buyType==1 && item.orderStatus==3)' 
					 @click.stop.prevent='subscribe(item)'>预约</button> -->
                        </div>

                    </div>
                </div>
            </div>
        </van-list>
        <!-- <div class="weui-toast weui_loading_toast" style="opacity: 1;" v-if="isLoading">
			<div class="weui_loading"><i class="weui-loading weui-icon_toast"></i></div>
			<p class="weui-toast_content">加载中</p>
		</div> -->
        <Load v-if='isLoading'></Load>
        <div class='total-success' v-if='isSuccess'>
            <div class='success-img'><img src="../assets/true-1.png" alt=""></div>
            <div class='success-tit'>数据加载完了</div>
        </div>
        <div class='total-success' v-if='isFalse'>
            <div class='success-img'><img src="../assets/fail.png" alt=""></div>
            <div class='success-tit'>请求出错</div>
        </div>
        <empty v-if='showEmpty'></empty>
        <showModel :cont='msg' v-if='showFlag' @define='confirm' @remove='cancle'></showModel>
    </div>

</template>

<script type="text/javascript" src="https://js.cdn.aliyun.dcloud.net.cn/dev/uni-app/uni.webview.1.5.2.js"></script>

<script>
    import * as axios from '../untils/ajax.js'
    // import axios from '@/node_modules/axios/index.js'
    import showModel from './showModel.vue'
    import dates from './show-date.vue'
    export default {
        name: 'app',
        data() {
            return {
                type: undefined,
                list: [],
                time: null,
                pageNo: 1,
                pageSize: 8,
                total: 0,
                top: 0,
                pullUpState: 0, // 1:上拉加载更多, 2:加载中……, 3:我是有底线的
                isLoading: false, // 是否正在加载
                pullUpInfo: {
                    moreText: '上拉加载更多',
                    loadingText: '数据加载中...',
                    noMoreText: '我是有底线的'
                },
                startX: 0,
                startY: 0,
                endX: 0,
                endY: 0,
                isSuccess: false,
                isFalse: false,
                showEmpty: false,
                innerHeight: '',
                scrollTop: "",
                scrollHeight: '',
                contentHeight: '',
                signHeight: '',
                signSuccess: 0,
                endListFalg: false,
                showFlag: false,
                msg: ''
            }
        },
        components: {
            showModel,
            dates
        },
        methods: {
            toBack() {
                this.$router.go(-1)
            },
            collage(e) {
                // console.log(e)
                this.type = e
                this.pageNo = 1
                this.list = []
                this.getList()
            },
            gotoDetail(id, status) {
                // console.log(id)
                // uni.navigateTo({
                // 	url: '/pages/order/orderDetails?id=' + id
                // })
                let info = {
                    orderId: id
                }
                if (status == 1) {
                    this.$router.push({
                        'name': 'orderFrequency',
                        params: info
                    })
                    // uni.navigateTo({
                    // 	url: "../order/orderFrequency?orderId=" + id
                    // })
                    return
                }
                this.$router.push({
                    'name': 'orderDetails',
                    params: info
                })
                // uni.navigateTo({
                // url: "../order/orderDetails?orderId=" + id
                // })
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
                this.isLoading = false
            },
            scrollToTheEnd() {
                let innerHeight = document.querySelector('#app').clientHeight
                let contentHeight = document.querySelector('.containerHeight').offsetHeight
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
                    if (this.pullUpState !== 3 && !this.isLoading) {
                        this.infiniteLoad()
                    }
                    // console.log('距顶部' + scrollTop + '滚动条总高度' + scrollHeight + '内容高度' + innerHeight)
                }
                let signHeight = Number(contentHeight) - (Number(innerHeight) + Number(scrollTop))
                let that = this
                if (signHeight < 60) {
                    if (that.total <= that.list.length && that.total > 0) {
                        // console.log(55555)
                        that.signSuccess = that.signSuccess + 1

                    }
                }
            },
            infiniteLoad() {
                if (this.total <= this.list.length) {
                    this.endListFalg = true
                    return
                }
                this.pullUpState = 2
                this.isLoading = true
                this.pageNo = this.pageNo + 1

                this.getList()
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
            },

            getList() {
                this.isLoading = true
                // $.showLoading()
                var formdata = new FormData()
                formdata.append("pageNo", this.pageNo)
                formdata.append('pageSize', this.pageSize)
                if (this.type != undefined) {
                    formdata.append('time', this.type)
                }
                axios.post(
                    '/office/t-office-order/getAllOrderByUserId',
                    formdata
                ).then(res => {
                    if (res.meta.success) {

                        this.total = Number(res.data.totalCounts)
                        if (this.pageNo === 1) {
                            this.list = res.data.records

                        } else {
                            this.list = this.list.concat(res.data.records)
                        }
                        if (this.list.length == 0) {
                            this.showEmpty = true
                        } else {
                            this.showEmpty = false
                        }
                        this.isLoading = false

                    } else {

                    }
                })
            },
            toServeList(e, index) {
                let id = {
                    'orderId': e,
                    'productType': index
                }
                this.$router.push({
                    'name': 'serviceDetails',
                    params: id
                })
                // uni.navigateTo({
                // 	url: '/pages/service/serviceDetails?orderId=' + this.id
                // })
            },
            pay(id, payType, payableMoney, isSure) {
                // if (this.types == 2) {

                if (payType == 1) {
                    let info = {
                        id: id
                    }
                    this.$router.push({
                        name: 'orderPayment',
                        params: info
                    })
                } else if (payType == 2) {
                    let info = {}
                    if (isSure == 1) {
                        info = {
                            'id': id,
                            'payableMoney': payableMoney,
                            payFlag: 1,
                            showBtn: true
                        }
                    } else {
                        info = {
                            'id': id,
                            'payableMoney': payableMoney,
                            payFlag: 1,
                            showBtn: false
                        }
                    }

                    this.$router.push({
                        'name': "transferAccounts",
                        params: info
                    })
                } else {
                    if (isSure == 2) {
                        let info = {
                            'id': id,
                            'payableMoney': payableMoney
                        }
                        this.$router.push({
                            'name': "monthlyBalance",
                            params: info
                        })
                    } else if (isSure == 1) {
                        let info = {
                            'id': id
                        }
                        this.$router.push({
                            'name': "monthlyOrderList",
                            params: info
                        })
                    }

                }



                // uni.navigateTo({
                // 	url: '/pages/home/orderPayment?id=' + id
                // })
            },
            // pay(id) {
            // 	let info={
            // 		id:id
            // 	}
            // 	this.$router.push({
            // 		name:'orderPayment',
            // 	params:info
            // 	})
            // 	// uni.navigateTo({
            // 	// 	url: '/pages/home/orderPayment?id=' + id
            // 	// })
            // },
            cancle(id) {
                this.showFlag = !this.showFlag
                this.msg = '您确定要取消订单么'
                this.id = id
                // this.type=1
                // })
            },
            confirm() {

                let that = this

                // if(this.type==1){
                let params = new FormData()
                params.append('orderId', this.id)
                this.isLoading = true

                axios.post('/office/t-office-order/cancelOrder', params).then(res => {
                    if (res.meta.success) {
                        // that.toast.success('取消成功')
                        that.pageNo = 1
                        that.list = []
                        that.getList(1)
                    } else {
                        // that.toast.fail('取消失败')
                        this.isLoading = false
                        this.failInfo = '取消失败'
                        this.isFalse = true
                        setTimeout(() => {
                            that.isFalse = false
                        }, 1000)
                    }
                })
                // }
                // else{
                // 	this.showVue = !this.showVue
                // 	let info={
                // 		startDate:this.biographyInfo.startDate,
                // 	    orderId:this.biographyInfo.id,
                // 		beginTime:this.biographyInfo.beginTime,
                // 		endTime:this.biographyInfo.endTime
                // 	}
                // 	this.dateFlag= JSON.stringify(info)
                // }
                this.showFlag = !this.showFlag
            },
            //上拉加载
            onLoad() {
                // if (!this.loadFalg) {
                // 	return
                // }
                if (this.isLoading) {
                    return
                }
                // 异步更新数据
                if (this.total <= this.list.length && this.total > 0) {
                    let that = this
                    this.successInfo = '数据加载完了'
                    this.isSuccess = true

                    setTimeout(() => {
                        that.isSuccess = false
                    }, 1000)
                    return
                }
                this.pageNo = this.pageNo + 1
                this.getList()

            }

        },
        created: function() {
            this.getList()
            this.load = true
            // console.log(999)
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

            }
        }


    }
</script>

<style scoped>
    @import '../assets/css/weui.css'

    * {
        padding: 0;
        margin: 0;
        font-family: 'Microsoft YaHei'
    }

    #app {
        height: 100vh;
        max-width: 7.5rem;
    }

    body {
        background-color: #f8f8fa !important;
        /* font-size: 28rem; */
        color: #333333;
        font-family: Helvetica Neue, Helvetica, sans-serif;
        width: 100%;
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
        top: 50%;
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

    .content-btn {
        height: 1rem;
        /* width: 100vw; */
        padding: 0 0.28rem;
        /* box-sizing: border-box;
		display: flex;
		align-items: center; */
        font-size: 0.28rem;
        position: fixed;
        top: 1.26rem;
        width: 100%;
        background: #fff;
        z-index: 10;
    }

    .content-show {
        /* height: 1.28rem; */
        height: 0.3rem;
    }

    .content-btn .btn-info {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        -webkit-transform: translateY(-50%);
    }

    .content-btn .btn {
        float: left;
        height: 0.60rem;
        width: 1.30rem;
        text-align: center;
        line-height: 0.60rem;
        background: #fff;
        border-radius: 0.10rem;
        color: #fff;
        margin-right: 0.18rem;
        /* border: 1px solid #539ef9; */
        color: #000;
        box-sizing: border-box !important;
    }

    .btn.sign-color {
        color: #ff5f1e;
    }

    .container {
        width: 6.94rem;
        height: 100%;
        margin: 0 auto;
    }

    .container .list {
        width: 100%;
        /* height: 310rem; */
        display: flex;
        flex-direction: column;
        background: #fff;
        box-shadow: 0 0.02rem 0.10rem #ececee;
        margin-bottom: 0.20rem;
        padding-bottom: 0.32rem;
    }

    .list .list-head {
        height: 0.83rem;
        width: 6.94rem;
        border-bottom: 1px solid #e8e8e8;
        line-height: 0.83rem;
        box-sizing: border-box;
    }

    .list .list-head .head-lefts {
        float: left;
        height: 0.83rem;
        line-height: 0.83rem;
        padding-left: 0.215rem;
        box-sizing: content-box;
        position: relative;
        /* display: flex; */
        /* align-items: center; */
    }

    .list .list-head .head-lefts img {
        /* display: inline-block; */
        width: 0.27rem;
        height: 0.27rem;
        margin-right: 0.15rem;
        position: absolute;
        left: 0.2rem;
        top: 37%;
        /* transform: translateY(-37%); */
    }

    .list .list-head .head-lefts .left-tit {
        margin-top: 0.03rem;
        margin-left: 0.3rem;
        font-size: 0.26rem;
        color: #707070;
        height: 0.83rem;
        line-height: 0.83rem;
    }

    .list .list-head .head-lefts .left-tit span {
        margin-left: 0.19rem;
    }

    .list .list-head .head-right {
        float: right;
        height: 0.83rem;
        line-height: 0.83rem;
        padding-right: 0.25rem;
        box-sizing: border-box;
        color: #ff2a2a;
        font-size: 0.28rem;
    }

    .list .list-head .head-right span {
        display: inline-block;
        height: 0.83rem;
        line-height: 0.83rem;
    }

    .list .list-center {
        /* display: flex; */
        /* height: 228upx; */
        /* padding-top: 0.35rem; */
        box-sizing: border-box;
        /* line-height: 228upx; */
        height: 1.34rem;
    }

    .list .list-center .center-left {
        /* margin-right: 0upx; */
        width: 1.40rem;
        height: 0.96rem;
        float: left;
        padding-top: 0.35rem;
    }

    .list .list-center img.left-img {
        /* 	display: inline-block; */
        display: block;
        width: 0.96rem !important;
        height: 0.96rem !important;

        margin-left: 0.20rem;
    }

    .container .list .list-center .center-tit {
        float: left;
        height: 1.7rem;
        padding-top: 0.29rem;
        box-sizing: border-box;
        width: 5.28rem;
        /* margin-left: 0.21rem; */
        /* 	display: flex;
		flex-direction: column;
		justify-content: center; */
        font-size: 0.32rem;
        color: #1b1b1b;
        /* width: 100%; */
        position: relative;
    }

    .center-tit .content-info {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        -webkit-transform: translateY(-50%);
    }

    .list .list-center .center-tit .tit-info {
        /* margin-top: 0.28rem; */
        /* height: 0.32rem; */
        width: 5.28rem;
    }

    .list-center .center-tit div:nth-child(1) {
        /* display: flex;
		justify-content: space-between; */
    }

    .center-tit div:nth-child(1) .tit-right {
        font-size: 0.30rem;
        /* margin-right: 0.32rem; */
        color: #ff2d30;
        float: right;
        margin-top: -0.03rem;
    }

    .center-tit .center-week {
        font-size: 0.26rem;
        color: #595959;
    }

    .list-center .center-tit div:nth-child(2) {
        /* margin-top: 18upx; */
        margin-top: 0.08rem;
        font-size: 0.26rem;
        color: #595959;
    }

    .list-center .center-tit div:nth-child(2) span {
        margin-right: 0.19rem;
    }

    .list-center .center-tit view:nth-child(2) text:nth-child(2) {
        margin-right: 33upx;
    }

    .list-center .center-right {
        font-size: 30upx;
    }

    .list-address {
        /* 	display: flex;
		justify-content: space-between;
		align-items: center; */
        height: 0.32rem;
        margin: 0.40rem 0 0.32rem 0;
        /* margin:0; */
        padding-left: 0.20rem;
        box-sizing: border-box;
        position: relative;

    }

    .list-address .address-info {
        color: #5a5a5a;
        font-size: 0.28rem;
        height: 0.32rem;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        -webkit-transform: translateY(-50%);

    }

    .list-address .address-info span {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        -webkit-transform: translateY(-50%);
        display: inline-block;
        margin-left: 0.3rem;
        width: 4.25rem;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    .list-address .address-info img {
        display: inline-block;
        width: 0.19rem;
        height: 0.24rem;
        margin-right: 0.12rem;
        /* transform: translateY(0.04rem); */
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        -webkit-transform: translateY(-50%);
    }

    /* .list-address .details .details-info {
		color: #539ef9;
		font-size: 0.28rem;
		float: left;
	}
 
	.details {
		position: absolute;
		top: 50%;
		right: 4%;
		transform: translateY(-50%);
		-webkit-transform: translateY(-50%);
		
		height: 0.32rem;
		width: 1.37rem;
	    line-height: 0.32rem;
	
	} */
    .list-address .details {
        position: absolute;
        top: 50%;
        right: 4%;
        transform: translateY(-50%);
        -webkit-transform: translateY(-50%);
        /* float: right; */
        /* height: 0.32rem; */
        width: 1.37rem;
        /* line-height: 0.32rem; */
        /* display: flex;
		align-items: center; */
    }

    .list-address .details .details-info {
        color: #539ef9;
        font-size: 0.28rem;
        /* float: left;
		height: 0.32rem;
		line-height: 0.32rem; */
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        -webkit-transform: translateY(-50%);
        display: inline-block;
        /* margin-left: 0.3rem; */
        /* width: 4.25rem; */
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    .details-right {
        position: absolute;
        right: 4%;
        top: 50%;
        transform: translateY(-50%);
        -webkit-transform: translateY(-50%);
        width: 0.13rem;
        height: 0.30rem;
        /* position: relative; */
        /* 	float: right;
		
		/* line-height: 0.32rem; */
        /* margin-left: 0.1rem; */
        /* margin-right: 4%; */
        /* margin-top: 0.02rem; */

    }


    .total-success {
        position: fixed;
        top: 5.7rem;
        background: rgba(44, 44, 44, 0.8);
        /* 	display: flex;
			flex-direction: column;
			align-items: center; */
        font-size: 0.28rem;
        color: #fff;
        width: 2.2rem;
        height: 2.15rem;
        border-radius: 0.15rem;
        left: 50%;
        transform: translateX(-50%);
        z-index: 1000;
    }

    .total-success .success-img {
        width: 100%;
        height: 1.4rem;
        position: relative;
        text-align: center;
    }

    .total-success img {
        width: 1.1rem;
        height: 1.05rem;
        margin-top: 0.35rem;
    }

    .total-success .success-tit {
        width: 100%;
        text-align: center;
    }

    .list-btn {
        /* display: flex;
		justify-content: flex-end; */
        height: 0.8rem;
        /* padding-bottom: 0.25rem; */
        box-sizing: content-box;
        line-height: 0.5rem;
    }

    .list-btn button {
        float: right;
        margin-top: 0.08rem;
        height: 0.50rem;
        font-size: 0.28rem;
        line-height: 0.5rem;
        /* padding: 0  32upx; */
        margin-right: 0.28rem;
        background: #fff;
    }

    .list-btn .btn-pay {
        /* width: 170upx; */
        height: 0.64rem;
        border-radius: 0.32rem;
        width: 1.50rem;
        border: 1px solid #ff5f1e;
        color: #FF5F1E;
        text-align: center;
        line-height: 0.62rem;
        margin-right: 0.20rem;
    }

    .list-btn .btn-pay.button-hover {
        color: #FF5F1E;
        background: #fff;
    }

    .list-btn .btn-cancel {
        /* width: 170upx; */
        height: 0.64rem;
        border-radius: 0.32rem;
        text-align: center;
        line-height: 0.62rem;
        margin-right: 0.20rem;
        color: #868688 !important;
        border: 1px solid #97979f !important;
    }

    .list-btn .serveDe {
        height: 0.64rem;
        border-radius: 0.32rem;
        width: 1.50rem;
        border: 1px solid #ff5f1e;
        color: #FF5F1E;
        text-align: center;
        line-height: 0.62rem;
        margin-right: 0.20rem;
        background: #ff5f1e !important;
        color: #fff;
    }

    .list-btn .btn-cancel.button-hover {
        color: #868688;
        background: #fff;
    }

    .list-btn button:after {
        border: none;
    }
</style>
