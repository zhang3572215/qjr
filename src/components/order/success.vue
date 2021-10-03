<template>
    <div>
        <div class='head' :class='showHead?"":"hiddenPt"'>
            <div class='head-left' @click="toBack">
                <img src="../../assets/left-black.png" mode=""></img>
                <span>返回</span>
            </div>
            <div class='head-center'>

            </div>
            <!-- 	<div class='head-right'>
				 <img src='../../static/buyMonth.png'></img>
			</div> -->
        </div>
        <div class='conntent-img'>
            <img src='../../assets/pay-success.png'></img>
        </div>
        <div class='content-info'>
            <div class='pay-suc'>
                支付成功
            </div>
            <div class="thank">
                感谢您的参与！
            </div>
        </div>
        <div class='content-btn'>
            <div class='continue' @click="againBuy">继续购买</div>
            <div class='look' @click="toDetail">查看订单</div>
        </div>
    </div>
</template>

<script>
    import {
        mapGetters,
        mapState,
        mapActions
    } from 'vuex'
    export default {
        data() {
            return {
                id: null,
                type: null,
                carpetType: null,
                showHead: true
            }
        },
        methods: {
            ...mapActions(['showCates']),
            toBack() {
                // uni.navigateTo({
                // 	url:'/pages/index/index'
                // })
                // this.$router.push('index')
                this.$router.push({
                    name: 'index'
                })
            },
            toDetail() {
                if (this.carpetType) {
                    let info = {
                        orderId: this.id
                    }
                    this.$router.push({
                        'name': 'orderFrequency',
                        params: info
                    })
                    return
                }
                if (this.type == 1) {
                    let info = {
                        orderId: this.id
                    }
                    this.$router.push({
                        'name': 'orderFrequency',
                        params: info
                    })
                    // uni.navigateTo({
                    // 	url: "/pages/order/orderFrequency?orderId=" + this.id
                    // })
                    return
                }
                if (this.type == 5) {
                    let info = {
                        orderId: this.id
                    }
                    this.$router.push({
                        'name': 'orderFrequency',
                        params: info
                    })
                    // uni.navigateTo({
                    // 	url: "/pages/order/orderFrequency?orderId=" + this.id
                    // })
                    return
                }
                if (this.type == 10) {
                    let info = {
                        orderId: this.id
                    }
                    this.$router.push({
                        'name': 'goodsDetail',
                        params: info
                    })
                    // uni.navigateTo({
                    // 	url: "/pages/order/orderFrequency?orderId=" + this.id
                    // })
                    return
                }
                let info = {
                    orderId: this.id
                }
                this.$router.push({
                    'name': 'orderDetails',
                    params: info
                })
                // uni.navigateTo({
                // 	url: "/pages/order/orderDetails?orderId=" + this.id
                // })
            },
            againBuy() {
                if (this.carpetType) {
                    let info = {
                        id: 3
                    }
                    this.$router.push({
                        'name': 'carpetClean',
                        params: info
                    })
                    return
                }


                if (this.type == 1) {
                    this.$router.push({
                        'name': 'countMeal',
                        params: '1'
                    })
                    // uni.navigateTo({
                    // 	url: "/pages/home/countMeal?id=" + this.type
                    // })
                    return
                }
                if (this.type == 10) {
                    this.showCates('shopping')
                    this.$router.push({
                        name: 'index'
                    })
                    return
                }
                this.$router.push({
                    'name': 'monthly',
                    params: '2'
                })
                // uni.navigateTo({
                // 	url: "/pages/home/monthly?id=" + this.type
                // })
            }
        },
        created() {
            if (window.localStorage.getItem('wxBrowser')) {
            	this.showHead = false
            }
            this.id = this.$route.params.id
            // console.log(this.type)
            if (this.$route.params.type) {
                this.type = this.$route.params.type
                // console.log(this.type)
            }
            if (this.$route.params.carpetType) {
                this.carpetType = this.$route.params.carpetType
            }

        }
    }
</script>

<style scoped>
    .head {
        padding-top: 0.4rem;
        height: 0.88rem;
        width: 100%;
        /* background: #36a8fa; */
        text-align: center;
        position: relative;
        box-sizing: content-box;
        color: #000;
        font-size: 0.33rem;
        z-index: 20000;
    }

    .head.hiddenPt {
        padding-top: 0 !important;
    }

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
    }

    .head-right {
        /* float: left; */
        height: 0.88rem;
        width: 30%;

    }

    .head-right img {
        display: inline-block;
        width: 0.32rem;
        height: 0.31rem;
        position: absolute;
        right: 0.28rem;
        top: 0.685rem;
    }

    .conntent-img img {
        display: block;
        height: 1.10rem;
        width: 1.10rem;
        margin: 0.90rem auto 0.35rem auto;
    }

    .content-info {
        margin: 0 auto;
        text-align: center;
    }

    .pay-suc {
        font-size: 0.32rem;
        margin-bottom: 0.19rem;
    }

    .thank {
        font-size: 0.28rem;
    }

    .content-btn {
        margin-top: 0.88rem;
        width: 100%;
        display: flex;
        display: -webkit-box;
        display: -webkit-flex;
        justify-content: center;
        -webkit-box-pack: center;
        -webkit-justify-content: center;
    }

    .content-btn .continue {
        width: 3.26rem;
        height: 0.88rem;
        line-height: 0.88rem;
        background: #0396ff;
        font-size: 0.28rem;
        color: #fff;
        text-align: center;
        margin-right: 0.2rem;
    }

    .content-btn .look {
        width: 3.26rem;
        height: 0.88rem;
        line-height: 0.88rem;
        background: #fff;
        font-size: 0.28rem;
        color: #0396ff;
        border: 1px solid #0396ff;
        text-align: center;
        box-sizing: border-box;
        margin-left: 0.2rem;
    }
</style>
