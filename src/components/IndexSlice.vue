<template>
    <div class="qjr-index-group">
        <div class="qjr-icon-list">
            <div class="qjr-icon-item" v-for="item in iconList" :key="item.idx"> 
                <img :src="indexListIcon" alt="">
                <div>{{item.text}}</div>
            </div>
        </div>
        <div class="qjr-categorys">
            <div class="qjr-categorys-item" v-for="item in categorys" :key="item.id" :style="{backgroundImage:'url('+item.img+')'}"></div>
        </div>
        <div class="qjr-item-grp" style="margin-top: 0.15rem;">
            <div class="qjr-grp-title">
                <div class="title-text">家务派—居家保洁</div>
                <div class="sub-title">Home Pie - Home cleaning</div>
            </div>
            <div class="shadow-item item-sale-grid">
                <img :src="houseWork[0].imgPath" alt="">
                <div class="item-sale-name"><span>{{houseWork[0].workType}}</span>{{houseWork[0].name}}</div>
                <div class="item-sale-attrs">
                    <div class="discipt">{{houseWork[0].discription}}</div>
                    <div class="price">{{houseWork[0].price}}/{{houseWork[0].unit}}</div>
                </div>
                <div class="item-sale-btn">
                    立即<br/>预约<br/>GO&gt;
                </div>
            </div>
            <div class="item-sale-flex" style="margin-top:0.1rem;">
                <div class="sale-sub-item shadow-item ">
                    <div class="sub-item-name">{{houseWork[1].name}}</div>
                    
                    <div class="sub-item-price">{{houseWork[1].price}}/{{houseWork[1].unit}}</div>
                    
                    <div class="sub-item-btn">了解详情<img :src="backIcon" alt=""></div>
                    <img :src="houseWork[1].imgPath" class="sub-item-img" alt="">
                </div>
                <div class="sale-sub-item shadow-item">
                    <div class="sub-item-name">{{houseWork[2].name}}</div>
                    
                    <div class="sub-item-price">{{houseWork[2].price}}/{{houseWork[2].unit}}</div>
                    
                    <div class="sub-item-btn">了解详情<img :src="backIcon" alt=""></div>
                    <img :src="houseWork[2].imgPath" class="sub-item-img" alt="">
                </div>
            </div>
            <div class="shadow-item sale-grid-thd">
                <img :src="houseWorkOther.img" class="sale-other-timg" alt="">
                <div v-for="item in houseWorkOther.list" :key="item.id" class="oth-sale-item">
                    <img :src="item.img" alt="">
                    <p>{{item.text}}</p>
                </div>
            </div>
        </div>
        <div class="qjr-item-grp">
            <div class="qjr-grp-title">
                <div class="title-text">办公室清洁</div>
                <div class="sub-title">Office cleaning</div>
            </div>
            <div class="shadow-item item-sale-grid">
                <img :src="officeCleaning.imgPath" alt="">
                <div class="item-sale-name"><span>{{officeCleaning.workType}}</span>{{officeCleaning.name}}</div>
                <div class="item-sale-attrs">
                    <div class="discipt">{{officeCleaning.discription}}</div>
                    <div class="labels" >
                        <p v-for="(item,index) in officeCleaning.labels" :key="index">{{item}}</p>
                    </div>
                </div>
                <div class="item-sale-btn">
                    立即<br/>预约<br/>GO&gt;
                </div>
            </div>
         </div>
         <div class="qjr-item-grp">
            <div class="qjr-grp-title">
                <div class="title-text">衣物干洗</div>
                <div class="sub-title">Clothes dry cleaning</div>
            </div>
            <div class="shadow-item dc-item-fst">
                <img :src="dryCleaning.mainImg" class="main-img" alt="">
                <img :src="dryCleaning.tipsImg" class="tip-img" alt="">
                <div class="dc-item-btn">
                    立即<br/>预约<br/>GO&gt;
                </div>
            </div>
            <div class="dc-list">
                <div class="dc-list-item" v-for="(item,index) in dryCleaning.list" :key="index">
                    <img :src="item.img" alt="">
                    <p>{{item.text}}</p>
                </div>
            </div>
        </div>
        <div class="qjr-item-grp">
            <div class="qjr-grp-title">
                <div class="title-text">关于清洁人</div>
                <div class="sub-title">About the Cleaner</div>
            </div>
            <div class="ac-item-fst">
                <div class="vidio-item">
                    <video src=""></video>
                    <div class="ove-rlay ">
                        <img :src="videoStartBtn" alt="">
                        <p>一分钟了解清洁人</p>
                    </div>
                </div>
                <div class="vidio-item">
                    <video src=""></video>
                    <div class="ove-rlay ">
                        <img :src="videoStartBtn" alt="">
                        <p>一分钟了解清洁人</p>
                    </div>
                </div>
            </div>
            <div class="ac-list">
                <div class="ac-item" v-for="(item,index) in aboutList" :key="index">
                    <p class="label">{{item.label}}</p>
                    <p class="text">{{item.text}}</p>
                </div>
            </div>
        </div>
        <div class="qjr-index-bottom">
            <img :src="adText" alt="" class="ad-img">
            <div class="phone">
                <img :src="phoneIcon" class="phone-icon" alt="">
                <p>400-829-0037</p>
            </div>
            <p class="bottom-text">清洁人（厦门）信息科技有限公司</p>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'index-slice',
        data() {
            return {
                iconList: [{
                    idx: 0,
                    text: '员工自营'
                },{
                    idx: 1,
                    text: '大管家模式'
                },{
                    idx: 2,
                    text: '100%身份审核'
                }],
                indexListIcon: require('@/assets/physical/correct.png'),
                backIcon: require('@/assets/physical/back-icon.png'),
                videoStartBtn: require('@/assets/physical/video-start.png'),
                adText: require('@/assets/physical/ad-text.png'),
                phoneIcon: require('@/assets/physical/phone-icon.png'),
                categorys:[{
                    id:0,
                    text:'',
                    img:require('@/assets/dynamic/category-1.png')
                },{
                    id:1,
                    text:'',
                    img: require('@/assets/dynamic/category-2.png')
                },{
                    id:2,
                    text:'',
                    img: require('@/assets/dynamic/category-3.png')
                },{
                    id:3,
                    text:'',
                    img: require('@/assets/dynamic/category-4.png')
                },{
                    id:4,
                    text:'',
                    img: require('@/assets/dynamic/category-5.png')
                },{
                    id:5,
                    text:'',
                    img: require('@/assets/dynamic/category-6.png')
                },{
                    id:6,
                    text:'',
                    img: require('@/assets/dynamic/category-7.png')
                },{
                    id:7,
                    text:'',
                    img: require('@/assets/dynamic/category-8.png')
                }],
                houseWork:[{
                    name: '家庭单次保洁',
                    workType: '专业高端',
                    imgPath: require('@/assets/dynamic/hs-item-img.png'),
                    discription: '热门畅销，性价比高，品质精选给您一个整洁明亮的家',
                    price: 159,
                    unit: '4小时'
                },{
                    name: '保洁体验版',
                    workType: '专业高端',
                    imgPath: require('@/assets/dynamic/hs-item-img1.png'),
                    discription: '热门畅销，性价比高，品质精选给您一个整洁明亮的家',
                    price: null,
                    unit: '3次4小时'
                },{
                    name: '包年保洁套餐',
                    workType: '专业高端',
                    imgPath: require('@/assets/dynamic/hs-item-img2.png'),
                    discription: '热门畅销，性价比高，品质精选给您一个整洁明亮的家',
                    price: 25,
                    unit: '50次保洁'
                }],
                houseWorkOther:{
                    img: require('@/assets/dynamic/hs-other-ming.png'),
                    list:[{
                        text:'空调清洗',
                        img: require('@/assets/dynamic/hs-other-limg1.png')
                    },{
                        text:'油烟机清洗',
                        img: require('@/assets/dynamic/hs-other-limg2.png')
                    },{
                        text:'冰箱清洗',
                        img: require('@/assets/dynamic/hs-other-limg3.png')
                    },{
                        text:'洗衣机清洗',
                        img: require('@/assets/dynamic/hs-other-limg4.png')
                    }]
                },
                officeCleaning:{
                    name: '办公环境清洁',
                    workType: 'M+n次',
                    imgPath: require('@/assets/dynamic/oc-item-img.png'),
                    discription: '单次 / 包月 / 包季 / 包年',
                    labels: ['更专业','更安全','更干净'],
                },
                dryCleaning:{
                    mainImg: require('@/assets/dynamic/dc-item-mimg.png'),
                    tipsImg: require('@/assets/dynamic/dc-item-timg.png'),
                    list:[{
                        text:'沙发清洗',
                        img: require('@/assets/dynamic/dc-item-img1.png')
                    },{
                        text:'床垫清洗',
                        img: require('@/assets/dynamic/dc-item-img2.png')
                    },{
                        text:'窗帘清洗',
                        img: require('@/assets/dynamic/dc-item-img3.png')
                    },{
                        text:'软包清洗',
                        img: require('@/assets/dynamic/dc-item-img4.png')
                    }]
                },
                vidioList: [{

                }],
                aboutList:[{
                    label: '安全',
                    text: '实名上岗'
                },{
                    label: '专业',
                    text: '技能培训'
                },{
                    label: '职业',
                    text: '素养培训'
                },{
                    label: '标准',
                    text: '服务产品'
                }]
            }
        },
    }
</script>

<style lang="less" scoped>
.qjr-index-group {
    background-color: #f8f8f9;
}
.qjr-icon-list {
    padding: 0.15rem 0.05rem;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
}
.qjr-icon-item {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
}
.qjr-icon-item > img {
    width: 0.16rem;
    height: 0.16rem;
    margin-right: 0.08rem;
}
.qjr-icon-item > div {
    font-size: 0.14rem;
    line-height: 0.16rem;
}
.qjr-categorys {
    display: grid;
    grid-template-columns: repeat(16,1fr);
    // grid-gap: 5px;
}
.qjr-categorys-item {
    background-size: cover;
}
.qjr-categorys .qjr-categorys-item:nth-child(1){
    grid-column-start: span 4;
    grid-row-start: span 2;
}
.qjr-categorys-item:nth-child(4), .qjr-categorys-item:nth-child(2), .qjr-categorys-item:nth-child(3){
    height: 0.8rem;
    grid-column-start: span 4;
}
.qjr-categorys-item:nth-child(5), .qjr-categorys-item:nth-child(6), .qjr-categorys-item:nth-child(7), .qjr-categorys-item:nth-child(8){
    height: 0.72rem;
    grid-column-start: span 3;
}

.qjr-item-grp {
    padding-bottom: 0.15rem;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: stretch;
}
.qjr-grp-title {
    padding: 0.15rem 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.qjr-grp-title .title-text {
    font-size: 0.2rem;
    font-family: SourceHanSansCN;
    font-weight: 700;
    color: #333333;
    line-height: 1em;
}
.qjr-grp-title .sub-title {
    margin-top: 1em;
    font-size: 0.11rem;
    font-family: SourceHanSansCN;
    font-weight: 500;
    color: #BCBCBC;
    line-height: 1em;
}
.shadow-item {
    background: #FFFFFF;
    box-shadow: 0px 0px 0.1rem 0px rgba(153, 153, 153, 0.25);
    border-radius: 8px;
}
.item-sale-grid {
    padding: 0.1rem;
    display: grid;
    grid-gap: 0.05rem;
    grid-template-columns: repeat(7,1fr);
    grid-template-rows: 1fr 2fr 1fr;
}
.item-sale-grid > img {
    width: 1.35rem;
    height: 0.9rem;
    grid-column-start: span 3;
    grid-row-start: span 3;
}
.item-sale-name {
    max-width: 1.84rem;
    padding-top: 0.04rem;
    font-size: 0.15rem;
    font-family: SourceHanSansCN;
    font-weight: 500;
    color: #333333;
    line-height: 1em;
    text-align: left;
    grid-column-start: span 4;
    white-space: nowrap;
    overflow: hidden;
    word-break: break-all;
    text-overflow: ellipsis;
}
.item-sale-name span {
    color: #2091FE;
}
.item-sale-attrs {
    padding: 0.05rem 0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    grid-column-start: span 3;
    grid-row-start: span 2;
}
.discipt {
    max-width: 1.42rem;
    max-height: 0.4rem;
    font-size: 0.11rem;
    font-family: SourceHanSansCN;
    font-weight: 400;
    color: #999999;
    text-align: left;
    line-height: 13px;
}
.price {
    font-size: 0.13rem;
    font-family: SourceHanSansCN;
    font-weight: 500;
    font-style: italic;
    color: #F8B344;
    text-align: left;
    line-height: 0.13rem;
}
.labels  {
    text-align: left;
    line-height: 0.1rem;
}
.labels > p {
    font-size: 0.1rem;
    margin: 0;
    padding: 0.01rem;
    display: inline-block!important;
    font-family: SourceHanSansCN;
    font-weight: 500;
    font-style: italic;
    color: #F8B344;
    text-align: left;
    line-height: 0.1rem;
    background-color: rgba(248, 179, 68, .15);
}
.labels p + p {
    margin-left: 0.1rem;
}
.item-sale-btn {
    padding: 0.06rem;
    font-size: 0.12rem;
    font-family: SourceHanSansCN;
    font-weight: 400;
    font-style: italic;
    color: #FFFFFF;
    line-height: 18px;
    background: linear-gradient(135deg, #2091FE 0%, #6FBCFF 100%);
    border-radius: 0.08rem;
    grid-row-start: span 2;
}
.item-sale-flex {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
}
.sale-sub-item {
    flex: 1;
    padding: 0.12rem 0.1rem;
    height: 0.76rem;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    position: relative;
    z-index: 100;
}
.sale-sub-item + .sale-sub-item  {
    margin-left: 0.1rem;
}
.sub-item-name {
    font-size: 0.14rem;
    font-family: SourceHanSansCN;
    font-weight: 500;
    color: #333333;
    text-align: left;
    line-height: 1em;
    position: relative;
    z-index: 300;
}
.sub-item-price {
    margin-top: 0.08rem;
    font-size: 0.12rem;
    font-family: SourceHanSansCN;
    font-weight: 400;
    color: #999999;
    line-height: 1em;
    position: relative;
    z-index: 300;
}
.sub-item-btn {
    margin-top: 0.18rem;
    padding: 0.04rem 0.06rem;
    font-size: 0.12rem;
    display: inline-block;
    font-family: SourceHanSansCN;
    font-weight: 400;
    color: #2091FE;
    line-height: 1em;
    text-align: center;
    border: 1px solid #2091FE;
    border-radius: 4px;
}
.sub-item-btn img {
    max-height: 0.12rem;
    margin-left: 0.06rem;
    vertical-align: middle;
}
.sub-item-img {
    max-width: 1.2rem;
    max-height: 0.76rem;
    right: 0.1rem;
    bottom:0;
    position: absolute;
    z-index: 200;
}
.sale-grid-thd {
    margin-top: 0.1rem;
    display: grid;
    grid-template-columns: 0.8rem 1fr 1fr;
    grid-template-rows: 5fr 7fr;
}
.sale-grid-thd > img {
    width: 0.8rem;
    max-height: 1.2rem;
    grid-row-start: span 2;
}
.oth-sale-item {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
}
.oth-sale-item:nth-child(2), .oth-sale-item:nth-child(4) {
    border-right: 1px solid #EBEBEB;
}
.oth-sale-item:nth-child(2), .oth-sale-item:nth-child(3) {
    border-bottom: 1px solid #EBEBEB;
}
.oth-sale-item img {
    width: 0.6rem;
    height: 0.6rem;
    object-fit: contain;
    margin-right: 0.08rem;
}
.oth-sale-item p {
    font-size: 0.12rem;
    font-family: SourceHanSansCN;
    font-weight: 400;
    color: #333333;
    line-height: 0.12rem;
}
.dc-item-fst {
    min-height: 1rem;
    padding: 0.1rem;
    position: relative;;
}
.main-img {
    width: 2.65rem;
    height: 1rem;
    object-fit: cover;
    position: absolute;
    top: 0.1rem;
    left:0.1rem;
}
.tip-img {
    width: 0.8rem;
    height: 0.3rem;
    object-fit: cover;
    position: absolute;
    top: 0.1rem;
    right:0.1rem;
}

.dc-item-btn {
    width: 0.32rem;
    height: 0.52rem;
    padding: 0.04rem 0.06rem;
    font-size: 0.12rem;
    font-family: SourceHanSansCN;
    font-weight: 400;
    font-style: italic;
    color: #FFFFFF;
    line-height: 18px;
    background: linear-gradient(135deg, #2091FE 0%, #6FBCFF 100%);
    border-radius: 0.08rem;
    position: absolute;
    right: 0.1rem;
    bottom: 0.1rem;
}
.dc-list {
    width: 100%;
    margin-top: 0.1rem;
    display: grid;
    grid-template-columns: repeat(4,1fr);
    grid-gap: 0.075rem;
    background-color: transparent;
}
.dc-list-item {
    font-size: 0.12rem;
    border-radius: 0.03rem;
    background-color: transparent;
}
.dc-list-item img {
    max-width: 100%;
    max-height: 0.5rem;
    object-fit: contain;
    background-color: #ffffff;
}
.dc-list-item p {
    margin: 0.1rem 0 0;
    font-size: 0.12rem;
    font-family: SourceHanSansCN;
    font-weight: 400;
    color: #333333;
    line-height: 0.13rem;
}
.ac-item-fst {
    max-width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
}
.vidio-item {
    min-height: 0.9rem;
    flex: 1;
    border-radius: 0.04rem;
    position: relative;
    z-index: 200;
    overflow: hidden;
}
.vidio-item + .vidio-item  {
    margin-left: 0.1rem;
}
.vidio-item video {
    max-width: 44vw;
    position: relative;
    z-index: 300;

}
.ove-rlay {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    top: 0;
    left: 0;
    position: absolute;
    background-color: rgba(0, 0, 0, 0.75);
    z-index: 400;
}
.ove-rlay img {
    width: 0.2rem;
    height: 0.2rem;
    object-fit: cover;
}
.ove-rlay p {
    margin: 0.12rem 0 0;
    font-size: 0.1rem;
    font-family: SourceHanSansCN;
    font-weight: 400;
    color: #FEFEFE;
    line-height: 1em;
}
.ac-list {
    width: 100%;
    margin-top: 0.1rem;
    display: grid;
    grid-template-columns: repeat(4,1fr);
    grid-gap: 0.075rem;
    background-color: transparent;
}
.ac-item {
    min-height: 0.5rem;
    font-size: 0.12rem;
    border-radius: 0.03rem;
    background-color: #fff;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.ac-item .label {
    margin: 0;
    font-size: 0.14rem;
    font-family: SourceHanSansCN;
    font-weight: bold;
    color: #2091FE;
}
.ac-item .text {
    margin: 0.05rem 0 0;
    font-size: 0.12rem;
    font-family: SourceHanSansCN;
    font-weight: normal;
    color: #999999;
}
.qjr-index-bottom {
    margin-top: 0.15rem;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
}
.ad-img {
    max-width: 170rem;
    max-height: 0.3rem;
    object-fit: cover;
}
.phone {
    margin-top: 0.05rem;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
}
.phone > p {
    margin: 0 0 0 0.05rem;
    font-size: 0.14rem;
    font-family: Times New Roman;
    font-weight: bold;
    font-style: italic;
    color: #BCBCBC;
}
.phone-icon {
    max-width: 0.18rem;
    max-height: 0.18rem;
    object-fit: cover;
}
.bottom-text{
    margin-top: 0.1rem;
    font-size: 0.12rem;
    font-family: SourceHanSansCN;
    font-weight: 400;
    color: #BCBCBC;
}
</style> 