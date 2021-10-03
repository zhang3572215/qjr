<template>
    <div>
        <head-Piece>
            <template slot="content">对公转账</template>
        </head-Piece>
        <div class='content-step' :class='showDistance?"showTop":""'>
            <div class='step-info'>
                <div class='step-num'>
                    1
                    <div class='step-title'>
                        提交订单
                    </div>
                </div>
                <div class='step-line'>
                </div>
            </div>
            <div class='step-info'>
                <div class='step-num'>
                    2
                    <div class='step-title'>
                        对公转账
                    </div>
                </div>
                <div class='step-line'>
                </div>
            </div>
            <div class='step-info'>
                <div class='step-num'>
                    3
                    <div class='step-title'>
                        输入转账公司
                    </div>
                </div>
                <div class='step-line'>
                </div>
            </div>
            <div class='step-info'>
                <div class='step-num'>
                    4
                    <div class='step-title'>
                        提交凭证
                    </div>
                </div>
                <div class='step-line'>
                </div>
            </div>
            <div class='step-info'>
                <div class='step-num'>
                    5
                    <div class='step-title'>
                        确认收款
                    </div>
                </div>
                <div class='step-line'>
                </div>
            </div>
            <div class='step-info'>
                <div class='step-num'>
                    6
                    <div class='step-title'>
                        安排服务
                    </div>
                </div>

            </div>
        </div>
        <div class='account'>
            <div class='account-title'>
                清洁人对公账户
            </div>
            <div class='account-news'>
                <div class='account-info'>
                    <div>账号</div>
                    <div class='account-num'>40332001040015965</div>
                </div>
                <div class='account-info'>
                    <div>户名</div>
                    <div class='account-num'>清洁人（厦门）信息科技有限公司</div>
                </div>
                <div class='account-info'>
                    <div>开户行</div>
                    <div class='account-num'>中国农业银行股份有限公司厦门湖东支行</div>
                </div>
            </div>
            <div class='transfer-news'>
                <div class='transfer-info'>
                    <div>转账公司</div>
                    <input type="text" v-model="voucherNo" placeholder="必填">
                </div>
                <div class='transfer-info' @click="showDate=true">
                    <div>转账日期</div>
                    <input type="text" v-model="selectDate" placeholder="必填" disabled>
                </div>
                <div class='content-upload'>
                    <div class="upload-tit">
                        转账图片<span class='unnecessary'>(非必传)</span>
                    </div>
                    <div class='upload-camera'>
                        <div class='showImg' v-for='(item,index) in imgList'>
                            <img :src='item'>
                            <div @touchstart="gotouchstart(index)" @touchmove="gotouchmove" @touchend="gotouchend(index)"
                                @click="prediv(item)"></div></img>
                        </div>
                        <div class="upload-img" v-if='imgList.length<1'>
                            <div>
                                <img class='camera' src='../../assets/camera.png'></img>
                                <div class='camera-tit'>
                                    上传图片
                                </div>
                            </div>
                            <input class='inputImg' @change="addImg" type="file" accept="image/png,image/jpeg,image/gif,image/jpg"
                                ref="inputer" multiple>
                        </div>
                    </div>
                </div>
                <!-- <div class='transfer-info-img' @click="showDate=true">
                    <div>转账截图</div>
                  
                </div> -->
            </div>
            <div class='remarks'>
                <span>备注：</span><span>如有其他情况，请先联系在线客服或者拨打电话</span><span @click="collage">前往联系客服</span>
            </div>
        </div>
        <div class='confirm' @click="confirm" v-if='!showBtn'>
            确认已转账
        </div>
        <div class='confirm' @click="confirm" v-else>
            保存修改
        </div>
        <div class='noConfirm' @click="noConfirm" v-if='!showBtn'>
            暂不确认转账
        </div>
        <div class='noConfirm' @click="noConfirm" v-else>
            暂不修改
        </div>
        <Load v-if='isLoad'></Load>
        <showMoadel v-if='modelSign' :cont='msg' @define='confirms' @remove='cancels'></showMoadel>
        <wimg :show="isShowBigImg" :imgs="imgList" :currentImg="current" @close="isShowBigImg = false" v-if='imgList.length>0'></wimg>
        <customer v-if='collageCurstomer' @priming='toCustomers' @define='toPhone' :typeInfo='typeMsg'></customer>
        <van-calendar v-model="showDate" @confirm="onConfirm" :min-date="minDate" :default-date='defaultDate' />
    </div>
</template>

<script>
    import * as axios from '../../untils/ajax.js'
    import customer from './../customerService.vue'
    import {
        mapActions
    } from 'vuex'
    import wimg from 'w-previewimg'
    var timeOutEvent = 0; //定时器  
    export default {
        data() {
            return {
                isLoad: false,
                showDate: false,
                selectDate: "",
                voucherNo: '',
                payFlag: '',
                monthId: '',
                collageCurstomer: false,
                typeMsg: '其他咨询',
                showBtn: false,
                showDistance: false,
                minDate: new Date(2000, 0, 1),
                defaultDate: new Date(),
                msgContent: '只能上传三张图片',
                showTips: false,
                modelSign: false,
                signIndex: '',
                isShowBigImg: false,
                current: '',
                imgList: []
            }
        },

        components: {
            customer,
            wimg
        },
        methods: {
            ...mapActions(['addDesCont']),
            collage() {
                this.collageCurstomer = !this.collageCurstomer
            },
            toCustomers() {
                this.collageCurstomer = !this.collageCurstomer
                // 允许页面滚动
                document.body.style.overflow = ''
                document.body.removeEventListener('touchmove', this.bodyScroll, {
                    passive: false
                });

            },
            //拨打客服电话
            toPhone() {
                this.collageCurstomer = !this.collageCurstomer
                window.location.href = 'tel://4008290037'
                // 允许页面滚动
                document.body.style.overflow = ''
                document.body.removeEventListener('touchmove', this.bodyScroll, {
                    passive: false
                });

            },
            colageDate() {
                this.showDate = !this.showDate
            },
            formatDate(date) {
                let month = (date.getMonth() + 1) < 10 ? ('0' + (date.getMonth() + 1)) : (date.getMonth() + 1)
                let day = (date.getDate()) < 10 ? ('0' + date.getDate()) : date.getDate()
                return `${date.getFullYear()}-${month}-${day}`;
            },
            onConfirm(date) {
                this.showDate = false
                this.selectDate = this.formatDate(date);
            },
            confirm() {
                let that = this
                if (this.voucherNo.length <= 0) {
                    this.$toast({
                        message: '请填写转账公司',
                        duration: 1000
                    })
                    return
                }
                if (this.selectDate.length <= 0) {
                    this.$toast({
                        message: '请选择转账日期',
                        duration: 1000
                    })
                    return
                }
                this.isLoad = true
                let params = new FormData()

                if (this.payFlag == 1) {
                    params.append('orderId', this.id)
                    params.append('payMoney', this.payMoney)
                    params.append('voucherNo', this.voucherNo)
                    params.append('transferDate', this.selectDate)
                    if (this.imgList.length == 1) {

                        params.append('transferUrl', this.imgList[0])
                    } else if (this.imgList.length > 1) {
                        let transferUrl = this.imgList.join(';;')
                        params.append('transferUrl', transferUrl)

                    } else {
                        params.append('transferUrl', '')
                    }

                    axios.post('/office/t-office-monthly-statement/insertPublicTransfer', params).then(res => {
                        this.isLoad = false
                        if (res.meta.success) {
                            this.$toast({
                                message: '提交成功',
                                duration: 1000
                            })
                            let that = this
                            setTimeout(() => {
                                let info = {
                                    'orderId': that.id,
                                    'isBack': 3
                                }
                                that.$router.push({
                                    'name': 'orderDetails',
                                    params: info
                                })
                            }, 1000)
                        } else {
                            this.$toast({
                                message: res.meta.msg
                            })
                        }
                    })
                } else if (this.payFlag == 2) {

                    params.append('monthId', this.monthId)
                    params.append('voucherNo', this.voucherNo)
                    params.append('transferDate', this.selectDate)
                    if (this.imgList.length == 1) {

                        params.append('transferUrl', this.imgList[0])
                    } else if (this.imgList.length > 1) {
                        let transferUrl = this.imgList.join(';;')
                        params.append('transferUrl', transferUrl)

                    } else {
                        params.append('transferUrl', '')
                    }

                    axios.post('/office/t-office-monthly-statement/updateMonthPublicTransfer', params).then(res => {
                        this.isLoad = false
                        if (res.meta.success) {
                            this.$toast({
                                message: '提交成功',
                                duration: 1000
                            })
                            let that = this
                            setTimeout(() => {
                                let info = {
                                    'orderId': that.id,
                                    'isBack': 3
                                }
                                that.$router.push({
                                    'name': 'orderDetails',
                                    params: info
                                })
                            }, 1000)
                        } else {
                            this.$toast({
                                message: res.meta.msg
                            })
                        }
                    })
                }

            },
            noConfirm() {
                // if(this.voucherNo.length<=0){
                //     this.$toast({
                //         message:'请填写转账公司',
                //         duration:1000
                //     })
                //     return
                // }
                // if(this.selectDate.length<=0){
                //       this.$toast({
                //           message:'请选择转账日期',
                //           duration:1000
                //       })
                //       return
                // }
                // this.isLoad=true
                // let params=new FormData()
                if (this.payFlag == 1) {

                    let that = this

                    that.addDesCont('car')
                    that.$router.push({
                        'name': 'index'
                    })

                    // params.append('orderId', this.id)
                    //   params.append('payMoney', this.payMoney)
                    //   params.append('voucherNo', this.voucherNo)
                    //   params.append('transferDate',this.selectDate)
                    //   axios.post('/office/t-office-monthly-statement/insertPublicTransfer',params).then(res => {
                    //       this.isLoad=false
                    //      if(res.meta.success){ 
                    //          this.$toast({
                    //              message:'提交成功',
                    //              duration:1000
                    //          })

                    //      }else{
                    //           this.$toast({
                    //               message:res.meta.msg
                    //           })
                    //      }
                    // })
                } else if (this.payFlag == 2) {
                    let that = this
                    that.addDesCont('car')
                    that.$router.push({
                        'name': 'index'
                    })

                    // params.append('monthId', this.monthId)
                    // params.append('voucherNo', this.voucherNo)
                    // params.append('transferDate',this.selectDate)
                    // axios.post('/office/t-office-monthly-statement/updateMonthPublicTransfer',params).then(res => {
                    //     this.isLoad=false
                    //     if(res.meta.success){ 
                    //         this.$toast({
                    //             message:'提交成功',
                    //             duration:1000
                    //         })
                    //         let that=this
                    //         setTimeout(() => {
                    //             that.addDesCont('car')
                    //             that.$router.push({'name':'index'})

                    //         },1000)
                    //     }else{
                    //          this.$toast({
                    //              message:`您第${res.meta.msg}期未支付！`
                    //          })
                    //     }
                    // })
                }

            },
            //查询对公转账
            loadPublicTransfer() {
                let params = new FormData()
                params.append('orderId', this.id)
                this.isLoad = true
                axios.post('/office/t-office-monthly-statement/loadPublicTransfer', params).then(res => {
                    this.isLoad = false
                    if (res.meta.success) {
                        if (res.data.transferDate) {
                            this.selectDate = res.data.transferDate
                            this.voucherNo = res.data.voucherNo
                            this.showBtn = true

                            if (res.data.transferUrl.length > 0) {
                               
                                    if(res.data.transferUrl.includes('https')){
                                         this.imgList = [res.data.transferUrl]
                                    }else{
                                         this.imgList = [this.configUrl + res.data.transferUrl]
                                    }
                                
                                
                            }

                        }


                    }
                })
            },
            //查询月结-对公转账
            loadMonthStatement() {
                let params = new FormData()
                params.append('monthId', this.monthId)
                this.isLoad = true
                axios.post('/office/t-office-monthly-statement/loadMonthStatement', params).then(res => {
                    this.isLoad = false
                    if (res.meta.success) {
                        if (res.data.transferDate.length > 0) {
                            this.selectDate = res.data.transferDate
                            this.voucherNo = res.data.voucherNo
                            this.showBtn = true

                            if (res.data.transferUrl.length > 0) {                           
                                   if(res.data.transferUrl.includes('https')){
                                        this.imgList = [res.data.transferUrl]
                                   }else{
                                        this.imgList = [this.configUrl + res.data.transferUrl]
                                   }
                                
                            }
                        }


                    }
                })
            },
            convertImgToBase64(url, callback, outputFormat) {

                var canvas = document.createElement('CANVAS');

                var ctx = canvas.getContext('2d');

                var img = new Image;

                img.crossOrigin = 'Anonymous';

                img.onload = function() {

                    var width = img.width;

                    var height = img.height;

                    // 按比例压缩5倍

                    var rate = (width < height ? width / height : height / width) / 8;

                    canvas.width = width * rate;

                    canvas.height = height * rate;

                    ctx.drawImage(img, 0, 0, width, height, 0, 0, width * rate, height * rate);

                    var dataURL = canvas.toDataURL(outputFormat || 'image/png');

                    callback.call(this, dataURL);

                    canvas = null;

                };

                img.src = url;

            },
            base64(e,num) {

                let that = this
                let reader = new FileReader();
                let imgFile
                // let that = this
                reader.readAsDataURL(e)
                reader.onload = e => {
               if(num>2*1024*1024){//大于2M的\
                   that.convertImgToBase64(e.target.result, function(retImg) { 
                       that.imgList = that.imgList.concat(retImg);
                   });
               }else{
                     
                    that.imgList = that.imgList.concat(e.target.result);
               }
                
                    // imgFile = e.target.result;
                    // let arr = imgFile.split(',')
                    // that.imgList.push(imgFile)
                    // this.datas.faceBase64 = arr[1]
                    // console.log(this.datas.faceBase64)
                }

            },
            addImg(e) {

                // let that=this
                // var a = [{
                // 	title: "拍照"
                // }, {
                // 	title: "从手机相册选择"
                // }];
                // plus.nativeUI.actionSheet({
                // 	title: "选择图片",
                // 	cancel: "取消",
                // 	buttons: a
                // }, function(b) { /*actionSheet 按钮点击事件*/
                // 	switch (b.index) {
                // 		case 0:
                // 			break;
                // 		case 1:
                // 			that.getImage(); /*拍照*/
                // 			break;
                // 		case 2:
                // 			that.galleryImg(); /*打开相册*/
                // 			break;
                // 		default:
                // 			break;
                // 	}
                // })
                let that = this
                var files = e.target.files;
                let imgLength = files.length + this.imgList.length

                if (imgLength > 1) {
                    this.msgContent = "只能上传三张图片"
                    this.showTips = true
                    setTimeout(() => {
                        that.showTips = false
                    }, 1500)
                    return
                }

                for (var i = 0; i < files.length; i++) {
                    console.log(files[i].size)
                    this.base64(files[i], files[i].size)
                }


                //转码base64

            },
            deletImg(index) {
                let that = this

                this.toast.showNewModal('提示', '是否要删除图片?', true, '取消', '确定', function() {
                    that.imgList.splice(index, 1)
                })

            },
            prediv(index) {
                let that = this
                // console.log(typeof that.imgList[index])
                // let img=item.slice(5).toString()
                // console.log(that.imgList[index])
                this.isShowBigImg = true
                this.current = index

            },
            gotouchstart(index) {
                let that = this;

                clearTimeout(timeOutEvent); //清除定时器
                timeOutEvent = 0;
                timeOutEvent = setTimeout(function() {
                    that.showMoadelFlag = 1
                    that.msg = "是否要删除图片?"
                    that.modelSign = true
                    that.signIndex = index
                    //执行长按要执行的内容，
                }, 1000); //这里设置定时
            },
            //手释放，如果在500毫秒内就释放，则取消长按事件，此时可以执行onclick应该执行的事件
            gotouchend() {
                clearTimeout(timeOutEvent);
                if (timeOutEvent != 0) {
                    //这里写要执行的内容（尤如onclick事件）

                }
            },
            //如果手指有移动，则取消所有事件，此时说明用户只是要移动而不是长按 
            gotouchmove() {
                clearTimeout(timeOutEvent); //清除定时器
                timeOutEvent = 0;
            },
            confirms() {
                this.modelSign = false
                if (this.showMoadelFlag == 1) {
                    this.imgList.splice(this.signIndex, 1)
                } else {
                    this.signConfirm()
                }

            },
            cancels() {
                this.modelSign = false
            },

        },
        created() {
            // console.log(this.$route.params)
            this.id = this.$route.params.id
            this.payMoney = this.$route.params.payableMoney
            this.payFlag = this.$route.params.payFlag
            this.showBtn = this.$route.params.showBtn //显示保存修改按钮
            this.monthId = this.$route.params.monthId //分期月结Id
            if (this.payFlag == 1) {
                this.loadPublicTransfer()
            } else if (this.payFlag == 2) {
                this.loadMonthStatement()
            }

            // 判断是否微信浏览器
            if (window.localStorage.getItem('wxBrowser')) {
                this.showDistance = true

            }

        }
    }
</script>

<style scoped>
    .content-step {
      
        margin: 0.1rem auto 0 auto;
        width: 6.4rem;
        font-size: 0.26rem;
          display: flex;
        display: flex;
        display: -webkit-box;
        display: -webkit-flex;
        align-items: center;
        -webkit-box-align: center;
        -webkit-align-items: center;
        justify-content: center;
        -webkit-box-pack: center;
        -webkit-justify-content: center;
    }

    .content-step.showTop {
        margin-top: 0.4rem;
    }

    .step-info {
        display: flex;
        display: -webkit-box;
        display: -webkit-flex;
        align-items: center;
        -webkit-box-align: center;
        -webkit-align-items: center;
    }

    .step-line {
        height: 1px;
        width: 0.765rem;
        background: #c5cad4;
        margin: 0 0.15rem;
    }

    .step-num {
        position: relative;
        font-weight: 550;
    }

    .step-num .step-title {
        width: 0.7rem;
        text-align: center;
        position: absolute;
        bottom: -0.7rem;
        left: 50%;
        transform: translateX(-50%);
        font-size: 0.24rem;
        font-weight: 500;
    }

    .step-info:nth-child(3) .step-num .step-title {
        width: 1.15rem;
    }

    .account {
        margin-top: 1rem;
    }

    .account-title {
        font-size: 0.3rem;
        margin-left: 0.27rem;
    }

    .account-news {
        background: #fff;
        width: 6.96rem;
        margin: 0.15rem auto 0 auto;
        border-radius: 0.1rem;
        box-shadow: 0 3px 5px #e4e4e5;
    }

    .account-info {
        display: flex;
        height: 0.82rem;
        width: 100%;
        font-size: 0.3rem;
        display: flex;
        display: -webkit-box;
        display: -webkit-flex;
        justify-content: space-between;
        -webkit-box-pack: justify;
        -webkit-justify-content: space-between;
        align-items: center;
        -webkit-box-align: center;
        -webkit-align-items: center;
        padding-left: 0.2rem;
        border-bottom: 1px solid #e8e8e8;
        box-sizing: border-box;
    }

    .account-info:nth-child(3) {
        border-bottom: none;
    }

    .account-num {
        width: 5.5rem;
        font-size: 0.26rem;
        color: #97979f;
    }

    .transfer-news {
        background: #fff;
        width: 6.96rem;
        margin: 0.25rem auto 0 auto;
        border-radius: 0.1rem;
        box-shadow: 0 3px 5px #e4e4e5;
    }

    .transfer-news .transfer-info {
        display: flex;
        height: 0.82rem;
        width: 100%;
        font-size: 0.3rem;
        display: flex;
        display: -webkit-box;
        display: -webkit-flex;
        justify-content: space-between;
        -webkit-box-pack: justify;
        -webkit-justify-content: space-between;
        align-items: center;
        -webkit-box-align: center;
        -webkit-align-items: center;
        padding-left: 0.2rem;
        border-bottom: 1px solid #e8e8e8;
        box-sizing: border-box;
    }

    .transfer-news .transfer-info input {
        border: none;
        width: 4.4rem;
    }

    .transfer-info input::-webkit-input-placeholder {
        color: #cecece;
    }

    .transfer-info:nth-child(2) input[disabled] {
        background: #fff;
    }

    .transfer-info-img {
        display: flex;
        height: 1.8rem;
        width: 100%;
        font-size: 0.3rem;
        display: flex;
        display: -webkit-box;
        display: -webkit-flex;
        justify-content: space-between;
        -webkit-box-pack: justify;
        -webkit-justify-content: space-between;
        align-items: center;
        -webkit-box-align: center;
        -webkit-align-items: center;
        padding-left: 0.2rem;
        border-bottom: 1px solid #e8e8e8;
        box-sizing: border-box;
    }

    .content-upload {
        /* margin-top: 20upx; */
        padding: 0.32rem 0.28rem 0.20rem 0.2rem;
        font-size: 0.30rem;
        background: #fff;
    }

    .content-upload .upload-tit {
        margin-bottom: 0.28rem;
        color: #3c4244;
    }

    .content-upload .upload-tit .unnecessary {
        color: #5c5e5f;
        margin-left: 0.28rem;
    }

    .upload-camera {
        display: flex;
        display: -webkit-flex;
        height: 1.7rem;
        overflow: hidden;
    }

    .upload-img {
        width: 1.62rem;
        height: 1.62rem;
        border: 1px dotted #ddd;
        /* display: flex;
   	align-items: center;
   	justify-content: center; */
        color: #a2a2a2;
        position: relative;
    }

    .upload-img .camera {
        display: block;
        width: 0.50rem;
        height: 0.40rem;
        margin: 0 auto 0.16rem auto;
        position: absolute;
        top: 0.4rem;
        left: 50%;
        transform: translateX(-50%);
        -webkit-transform: translateX(-50%);

    }

    .upload-img .camera-tit {
        width: 100%;
        text-align: center;
        position: absolute;
        top: 0.9rem;
        left: 50%;
        transform: translateX(-50%);
        -webkit-transform: translateX(-50%);

    }

    .upload-camera .showImg div {
        width: 1.62rem;
        height: 1.62rem;
        transform: translateY(-1.7rem);

    }

    .upload-camera .showImg img {
        width: 1.62rem;
        height: 1.62rem;
        margin-right: 0.15rem;
    }

    .sign-btn {
        height: 0.64rem;
        width: 6rem;
        background: #ff5f1e;
        line-height: 0.64rem;
        text-align: center;
        margin: 0.70rem auto 0 auto;
        font-size: 0.28rem;
        color: #fff;
        border-radius: 0.50rem;
    }

    input.inputImg {
        position: absolute;
        top: 0;
        width: 1.63rem !important;
        height: 1.63rem !important;
        padding: 0;
        margin: 0;
        border: 0;
        opacity: 0;
    }

    .remarks {
        transform: scale(0.95);
        -webkit-transform: scale(0.95);
        width: 100%;
        font-size: 0.2rem;
        text-align: center;
        margin-top: 0.15rem;
    }

    .remarks span:nth-child(1) {
        color: #ff3823;
    }

    .remarks span:nth-child(2) {
        color: #97979f;
    }

    .remarks span:nth-child(3) {
        font-size: 0.18rem;
        color: #3297ff;
        margin-left: 0.1rem;
    }

    .confirm {
        height: 0.8rem;
        width: 4.2rem;
        background: #3297ff;
        color: #fff;
        line-height: 0.8rem;
        text-align: center;
        font-size: 0.32rem;
        margin: 0.8rem auto 0 auto;
        border-radius: 0.15rem;
    }

    .noConfirm {
        height: 0.8rem;
        width: 4.2rem;
        background: #eee;
        color: #aaa;
        line-height: 0.8rem;
        text-align: center;
        font-size: 0.32rem;
        margin: 0.4rem auto 0 auto;
        border-radius: 0.15rem;
    }

    .zhezhao {
        z-index: 100;
    }
</style>
