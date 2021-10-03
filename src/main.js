import Vue from 'vue'
import App from './App.vue'
import remConfig from './untils/rem.js'
import './assets/css/weui.css'
// 1. 导入 vue-router 包
import VueRouter from 'vue-router'
// 2. 手动安装 VueRouter 
Vue.use(VueRouter)
import router from './router.js'
import Load from './components/lode.vue'
Vue.component('Load', Load)
import showMoadel from './components/showModel.vue'
Vue.component('showMoadel', showMoadel)
import showFail from './components/fail.vue'
Vue.component('showFail', showFail)

import showMoadea from './components/showModea.vue'
Vue.component('showMoadea', showMoadea)


import empty from './components/empty.vue'
Vue.component('empty', empty)

import showSuccess from './components/showSuccess.vue'
Vue.component('showSuccess', showSuccess)

import tips from './components/tips.vue'
Vue.component('tips', tips)

import headPiece from './components/headPiece.vue'
Vue.component('head-Piece', headPiece)
// import weui from 'weui.js'
// import 'weui'
// Vue.prototype.$weui = weui


import Vant from 'vant';
import 'vant/lib/index.css';

import {
    Picker,
    Switch,
    Toast,
    Swipe,
    SwipeItem,
    Lazyload,
    List,
    PullRefresh,
    Field,
    RadioGroup,
    Radio,
    Step,
    Steps,
    Calendar
} from 'vant';
// console.log(Toast)
Vue.use(Vant);
Vue.use(Switch, Toast, Swipe, SwipeItem, Lazyload, List, PullRefresh, Field, RadioGroup,
    Radio, Step, Steps, Calendar);



Vue.use(Lazyload, {
    lazyComponent: true,
});


import VueScroller from 'vue-scroller'
Vue.use(VueScroller)


import '@babel/polyfill';
import Es6Promise from 'es6-promise'
Es6Promise.polyfill()

import Navigation from 'vue-navigation'
Vue.use(Navigation, {
    router
})


import VueClipboard from 'vue-clipboard2'
Vue.use(VueClipboard)

import vueJsonp from 'vue-jsonp'
Vue.use(vueJsonp)

import VueAMap from 'vue-amap';

import getOther from './untils/tool.js'

Vue.prototype.$getOther = getOther

VueAMap.initAMapApiLoader({

    key: 'b3ff05b65b8107d3f29d229b7f529aed',

    plugin: [

        'AMap.Autocomplete',

        'AMap.PlaceSearch',

        'AMap.Scale',

        'AMap.OverView',

        'AMap.ToolBar',

        'AMap.MapType',

        'AMap.PolyEditor',

        'AMap.CircleEditor',

        'AMap.Geolocation'

    ],

    // 默认高德 sdk 版本为 1.4.4

    v: '1.4.4'

});

Vue.use(VueAMap);





import store from './store/index.js'
remConfig()
Vue.config.productionTip = false
Vue.prototype.configUrl = 'https://boss.jieren365.cn/orig/'
// Vue.prototype.getHttpUrl = 'https://www.jieren365.cn/qjrapp/index.html' //测试
Vue.prototype.getHttpUrl = 'https://boss.jieren365.cn/qjrapp_test/index.html' //正试
Vue.prototype.configRecomPhone = null



// import  skeleton  from'./skeleton.js'

window.document.addEventListener('UniAppJSBridgeReady', function() {
    new Vue({
        render: h => h(App),
        router,
        store
    }).$mount('#app')
}, false)

 