<template>
    <div class='containers'>
        <div class='content-head'>
            <div class='head-title'>洗窗帘</div>
            <div class='head-intr'>清洗窗帘专家，免费上门拆装</div>
            <div class='head-url'>www.qing.jieren365.com</div>
            <div class='head-phone'>400-829-0037</div>
        </div>
        <div class='content-info'>
            <div class='info-title'>
                <div>我们的优势</div>
            </div>
            <div class='info-advantage'>
                <div class='advantage'>
                    <img src="../../assets/factory.png" alt="">
                    <div>洗涤工厂</div>
                </div>
                <div class='advantage'>
                    <img src="../../assets/pick-delivery.png" alt="">
                    <div>当天取送</div>
                </div>

                <div class='advantage'>
                    <img src="../../assets/free.png" alt="">
                    <div>免费上门拆装</div>
                </div>

                <div class='advantage'>
                    <img src="../../assets/price.png" alt="">
                    <div>价格最低</div>
                </div>

            </div>

            <div class='info-title'>
                <div>服务流程</div>
            </div>
            <div class='technological-process'>
                <div class='step-info'>
                    <div class='step-num'>
                        <img src="../../assets/subscribe.png" alt="">
                        <div class='step-title'>
                            预约登记
                        </div>
                    </div>
                    <div class='step-line'>
                    </div>
                </div>
                <div class='step-info'>
                    <div class='step-num'>
                        <img src="../../assets/disassembly.png" alt="">
                        <div class='step-title'>
                            上门拆
                        </div>
                    </div>
                    <div class='step-line'>
                    </div>
                </div>
                <div class='step-info'>
                    <div class='step-num'>
                        <img src="../../assets/washing.png" alt="">
                        <div class='step-title'>
                            送洗
                        </div>
                    </div>
                    <div class='step-line'>
                    </div>
                </div>
                <div class='step-info'>
                    <div class='step-num'>
                        <img src="../../assets/install.png" alt="">
                        <div class='step-title'>
                            送回安装
                        </div>
                    </div>

                </div>

            </div>
            <div class='btn-appointment'>
                点击我立即预约洗窗帘
            </div>
            <div class='pricePreview'>
                价格优惠预览
            </div>
            <div class='list'>
                <table>
                    <tr>
                        <th>项目</th>
                        <th>单价</th>
                        <th>市场价</th>
                    </tr>
                    <tr>
                        <td>双层厚窗帘</td>
                        <td>89/条</td>
                        <td>120-150</td>
                    </tr>
                    <tr>
                        <td>单层窗帘</td>
                        <td>69/条</td>
                        <td>100-130</td>
                    </tr>
                    <tr>
                        <td>窗纱</td>
                        <td>39/条</td>
                        <td>60-100</td>
                    </tr>
                    <tr>
                        <td>楼中楼双层厚窗帘</td>
                        <td>399/条</td>
                        <td>500-600</td>
                    </tr>
                    <tr>
                        <td>单层窗帘</td>
                        <td>319/条</td>
                        <td>400-500</td>
                    </tr>
                </table>
            </div>

        </div>


        <div class='content-footer'>
            <div>免费上门安装 <span class='left'>提供备用窗帘</span></div>
            <div>价格比干洗店便宜一半</div>
            <div>五星级洗涤设备</div>
            <div>方便快捷，为您想得更周到</div>
            <div>
                <img src="../../assets/QR-code.png" alt="">
                <div class='wx'>关注微信公众号</div>
            </div>
            <div>
                你也可以电话预约下单
            </div>
            <div class='phone'>
                400-829-0037
            </div>
            <div>
                客服时间：8:30—17:30
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {

            }
        }
    }
</script>

<style scoped>
    .content-head {
        height: 3.7rem;
        width: 100%;
        background: #3297ff;
    }

    .content-head>div {
        width: 100%;
        text-align: center;
    }

    .content-head .head-title {
        font-size: 0.82rem;
        color: #fff;
        padding-top: 0.6rem;
        font-weight: 550;
        font-family: "agency fb";
    }

    .content-head .head-intr {
        font-size: 0.38rem;
        color: #fff;
        margin-top: 0.1rem;
        margin-bottom: 0.05rem;
    }

    .head-url,
    .head-phone {
        font-size: 0.33rem;
        color: #fff;
        margin-bottom: 0.07rem;
    }

    .content-info {
        width: 100%;
        display: flex;
        display: -webkit-box;
        display: -webkit-flex;
        justify-content: center;
        -webkit-box-pack: center;
        -webkit-justify-content: center;
        align-items: center;
        -webkit-box-align: center;
        -webkit-align-items: center;
        flex-direction: column;
        -webkit-box-direction: normal;
        -webkit-box-orient: vertical;
        -moz-flex-direction: column;
        -webkit-flex-direction: column;

    }

    .info-title {
        position: relative;
        height: 0.7rem;
        width: 1.75rem;
        border: 1px solid #3297ff;
        font-size: 0.28rem;
        margin-top: 0.6rem;
        margin-bottom: 0.44rem;
    }

    .info-title>div {
        background: #3297ff;
        width: 1.8rem;
        height: 0.51rem;
        text-align: center;
        line-height: 0.51rem;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        -webkit-transform: translateY(-50%);
        left: -0.18rem;
        color: #fff;
    }

    .info-advantage {
        display: flex;
        display: -webkit-box;
        display: -webkit-flex;
        width: 88%;
    }

    .advantage {
        flex: 1;
        -prefix-box-flex: 1;
        -webkit-box-flex: 1;
        -webkit-flex: 1;
        -moz-box-flex: 1;
        -ms-flex: 1;

        display: flex;
        display: -webkit-box;
        display: -webkit-flex;
        justify-content: center;
        -webkit-box-pack: center;
        -webkit-justify-content: center;
        align-items: center;
        -webkit-box-align: center;
        -webkit-align-items: center;
        flex-direction: column;
        -webkit-box-direction: normal;
        -webkit-box-orient: vertical;
        -moz-flex-direction: column;
        -webkit-flex-direction: column;
        /* width: 25%; */
        text-align: center;
        font-size: 0.26rem;

    }

    .advantage img {
        height: 0.95rem;
        width: 0.95rem;
        margin-bottom: 0.2rem;
    }

    .content-step {
        display: flex;
        margin: 0.1rem auto 0 auto;
        width: 6.4rem;
        font-size: 0.26rem;
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

    .technological-process {
        margin: 0.1rem auto 0 auto;
        /* width: 6.4rem; */
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
        width: 0.6rem;
        background: #000;
        margin: 0 0.25rem;
    }

    .step-num {
        position: relative;
        font-weight: 550;
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

    .step-num img {
        height: 0.57rem;
        width: auto;
    }

    .technological-process .step-info:nth-child(1) img {
        height: 0.59rem;
    }

    .step-num .step-title {
        width: 1.2rem;
        text-align: center;
        position: absolute;
        bottom: -0.5rem;
        left: 50%;
        transform: translateX(-50%);
        font-size: 0.24rem;
        font-weight: 500;
    }

    .step-info:nth-child(3) .step-num .step-title {
        width: 1.15rem;
    }

    .btn-appointment {
        width: 4.75rem;
        height: 0.75rem;
        background: #ef4f4f;
        text-align: center;
        line-height: 0.75rem;
        font-size: 0.28rem;
        color: #fff;
        margin-top: 1.45rem;
        border-radius: 0.1rem;
    }

    .pricePreview {
        font-size: 0.36rem;
        font-weight: 550;
        margin-top: 0.84rem;
        margin-bottom: 0.5rem;
    }

    .list table {
        border-spacing: 0;
        margin-bottom: 0.5rem;
    }

    .list th {
        font-size: 0.32rem;
        border: 1px solid #d9d9d9;
        border-bottom: none;
        height: 0.72rem;
    }

    .list tr th:nth-child(2),
    .list tr th:nth-child(3) {
        border-left: none;
    }

    .list td {
        text-align: center;
        font-size: 0.3rem;
        border: 1px solid #d9d9d9;
        padding: 0 0.35rem;
        height: 0.7rem;
        border-bottom: none;
        border-left: none;
        color: #515151;
    }

    .list tr td:first-child {
        border-left: 1px solid #D9D9D9;
    }

    .list tr:last-child td {
        border-bottom: 1px solid #d9d9d9;
    }


    .content-footer {
        background: #3297ff;
        font-size: 0.32rem;
        text-align: center;
        color: #fff;
        padding-top: 0.9rem;
        padding-bottom: 0.7rem;
        box-sizing: content-box;
    }

    .content-footer>div:nth-child(1) {
        margin-top: 0;
    }

    .content-footer>div {
        margin-top: 0.1rem;
    }

    .content-footer .left {
        margin-left: 0.5rem;
    }

    .content-footer img {
        height: 2.14rem;
        width: 2.14rem;
        margin-top: 0.4rem;
    }

    .content-footer .wx {
        font-size: 0.28rem;
        margin-bottom: 0.7rem;
    }

    .content-footer .phone {
        font-size: 0.42rem;
        margin-top: 0.17rem;
        margin-bottom: 0.05rem;
    }
</style>
