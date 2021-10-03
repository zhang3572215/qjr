import VueRouter from 'vue-router'
// 导入 Account 组件
// import home from './components/home.vue'
// import history from './components/historyList.vue'1
import index from './components/index.vue'
// import current from './components/currentList.vue'
// import myNew from './components/myNew.vue'
// import my from './components/my.vue'
// import complaintList from './components/complaintList.vue'
// import serverIndex from './components/Serve/serveIndex.vue'
// import historyList from './components/historyList.vue'


// import myTask from './components/Serve/myTask.vue'
// import myServe from './components/Serve/mySever.vue'
// import serveNew from './components/Serve/serverNew.vue'
// import historyTask from './components/Serve/historyTask.vue'
// import dates from './components/Serve/dates.vue'
// import customer from './components/customerService.vue'
// import invitationRegister from './components/invitationRegister.vue'
// import carpetClean from './components/order/carpetClean.vue'
// import signIn from './components/Serve/signIn.vue'
// import signOut from './components/Serve/signOut.vue'
// import siteComplaintList from './components/Serve/siteComplaintsList.vue'
// import siteComplaintDetail from './components/Serve/siteComplanitDetail.vue'
// import serveDetail from './components/Serve/serveDetail.vue'
// import handlingComplaints from "./components/Serve/handlingComplaints.vue"
// import newResidence from './components/newResidence'
// import mattress from './components/mattress.vue'
// import monthly from './components/monthly.vue'
// import privacyPolicy from './components/privacyPolicy.vue'
// import countMeal from './components/countMeal.vue'
// import firstCountMeal from './components/firstCountMeal.vue'
// import firstSubmission from './components/firstSubmission.vue'
// import agreement from './components/agreement.vue'
// import submission from './components/submission.vue'
// import orderPayment from './components/order/orderPayment.vue'
// import success from './components/order/success.vue'
// import carpetCleaning from './components/order/carpetCleaning.vue'
// import curtainsCleaning from './components/order/curtainsCleaning.vue'
// import recevieceSuccess from './components/order/recevieceSuccess.vue'
// import orderDetails from './components/order/orderDetails.vue'
// import orderFrequency from './components/order/orderFrequency.vue'
// import serviceDetails from './components/service/serviceDetails.vue'
// import complaintInfo from './components/service/complaint.vue'
// import evaluation from './components/service/evaluation.vue'
// import balance from './components/my/balance.vue'
// import voucher from './components/my/voucher.vue'
// import coupon from './components/my/coupon.vue'
// import repaymentList from './components/order/repaymentList.vue'
// import stages from './components/order/stages.vue'
// import stagesPayment from './components/order/stagesPayment.vue'
// import appointment from './components/my/appointment.vue'
// import myInvoice from './components/my/myInvoice.vue'
// import specialInvoice from './components/my/specialInvoice.vue'
// import addressList from './components/my/addressList.vue'
// import address from './components/my/address.vue'
// import historicalStages from './components/order/historicalStages.vue'
// import applayInvoice from './components/my/applayInvoice.vue'
// import invoiceInfo from './components/my/invoiceInfo.vue'
// import oldInvoice from './components/my/oldInvoice.vue'
// import complaintDetails from './components/service/complaintDetails.vue'
// import details from './components/service/details.vue'
// import commonProblem from './components/my/commonProblem.vue'
// import inviteFriends from './components/my/inviteFriends.vue'
// import login from './components/login/login.vue'
// import bindPhone from './components/login/bindPhone.vue'
// import taskDetails from './components/Serve/taskDetails.vue'
// import wallet from './components/Serve/wallet.vue'
// import invoice from './components/my/invoice.vue'
// import cleaning from './components/order/cleaning.vue'
// import cleanSubmission from './components/order/cleanSubmission.vue'
// import noNetwork from './components/noＮetwork.vue'
// import homes from './components/homes.vue'
// import historyListenEnpty from './components/historyListenEnpty.vue'
// import cleanPayment from './components/order/cleanPayment.vue'
// import carpetsubmission from './components/order/carpetSubmission.vue'
// import customers from './components/customer.vue'
// import cleanSuccess from './components/order/cleanSuccess.vue'
// import historyReceive from './components/Serve/historyReceive.vue'
// import apply from './components/Serve/apply.vue'
// import giveBack from './components/Serve/giveBack.vue'
// import carpetDetails from './components/order/carpetDetails.vue'
// import cleanDetails from './components/order/cleanDetails.vue'
// import myProfit from './components/my/myProfit.vue'
// import addBankCard from './components/my/addBankCard.vue'
// import withdrawal from './components/my/withdrawal.vue'
// import bankCard from './components/my/bankCard.vue'
// import commissionOrder from './components/my/commissionOrder.vue'
// import commissionFlow from './components/my/commissionFlow.vue'
// import officeBuildingList from './components/my/officeBuildingList.vue'
// import withdrawalRecord from './components/my/withdrawalRecord.vue'
// import goodsBuy from './components/shop/goodsBuy.vue'
// import shoppCart from './components/shop/shoppCart.vue'
// import shopSubmission from './components/shop/shopSubmission.vue'
// import shopPayment from './components/shop/shopPayment.vue'
// import goodsDetail from './components/shop/goodsDetail.vue'
// import historyGoods from './components/shop/historyGoods.vue'
// import cityList from './components/cityList.vue'
// import map from './components/my/map.vue'
// import shopDynamic from './components/shop/shopDynamic.vue'
// import install from './components/my/install.vue'
// import serviceAgreement from './components/serviceAgreement.vue'
// import oldPhone from './components/my/oldPhone.vue'
// import newPhone from './components/my/newPhone.vue'
// import exclusive from './components/order/exclusive.vue'
// import reviews from './components/shop/reviews.vue'
// import distribution from'./components/my/distribution.vue'
// import cooperation from './components/my/cooperation.vue'
// import receive from './components/my/receive.vue'
// import activityPage from './components/my/activityPage.vue'
// import  transferAccounts  from'./components/order/transferAccounts'
// import monthlyBalance from'./components/order/monthlyBalance.vue'
// import monthlyOrderList from './components/order/monthlyOrderList.vue'
// import monthlyPayment from './components/order/monthlyPayment.vue'

VueRouter.prototype.goBack = function() {
	this.isBack = true

	window.history.go(-1)
}


// 3. 创建路由对象
var router = new VueRouter({
	// mode:'history',
	base: '/',
	routes: [
		{
			path: '/',
			// redirect:'/index',
			component:index,
			// component:resolve => require(['@/components/index.vue'],resolve),
			name: 'index'
		},
		// {
		// 	path:'/index',
		// 	component: index,
		// 	name: 'index'
		// },
		{
			path: '/history',
			component: resolve => require(['@/components/historyList.vue'],resolve),
			name: 'historyList',
			meta:{
				title:'历史订单'
			}

		},

		// {
		// 	path: "/home",
		// 	component: resolve => require(['@/components/home.vue']),
		// 	name: home

		// },
		{
			path: '/currentList',
			component: resolve => require(['@/components/currentList.vue']),
			name: 'current'

		},
		{
			path: '/myNew',
			component: resolve =>require(['@/components/myNew.vue'],resolve),
			name: 'myNew'

		},
		{
			path: '/my',
			component:resolve =>require(['@/components/my.vue'],resolve),
			name: 'my'

		},
		{
			path: '/complaint',
			component: resolve => require(['@/components/complaintList.vue'],resolve),
			name: 'complaint',
			meta:{
				title:'投诉列表'
			}

		},
		{
			path: '/serverIndex',
			component:resolve => require(['@/components/Serve/serveIndex.vue'],resolve),
			name: 'serverIndex'

		},
		{
			path: '/myTask',
			component:resolve => require(['@/components/Serve/myTask.vue'],resolve),
			name: 'myTask'

		},
		{
			path: '/myServe',
			component:resolve => require(['@/components/Serve/mySever.vue'],resolve),
			name: 'myServe'

		},
		{
			path: '/serveNew',
			component: resolve => require(['@/components/Serve/serverNew.vue'],resolve),
			name: 'serveNew'

		},
		{
			path: '/historyTask',
			component: resolve => require(['@/components/Serve/historyTask.vue'],resolve),
			name: 'historyTask'

		},
		{
			path: '/dates ',
			component: resolve => require(['@/components/Serve/dates.vue'],resolve),
			name: 'dates'

		},
		{
			path: '/customer',
			component: resolve => require(['@/components/customerService.vue'],resolve),
			name: 'customer',
			meta:{
				title:'清洁人客服'
			}

		},
		{
			path: '/invitationRegister',
			component: resolve => require(['@/components/invitationRegister.vue'],resolve),
			name: 'invitationRegister'

		},

		{
			path: '/carpetClean',
			component:  resolve => require(['@/components/order/carpetClean.vue'],resolve),
			name: 'carpetClean'

		},

		{
			path: '/signIn',
			component: resolve => require(['@/components/Serve/signIn.vue'],resolve),
			name: 'signIn'

		},
		{
			path: '/signOut',
			component: resolve => require(['@/components/Serve/signOut.vue'],resolve),
			name: 'signOut'
		},
		{
			path: '/siteComplaintList',
			component:  resolve => require(['@/components/Serve/siteComplaintsList.vue'],resolve),
			name: 'siteComplaintList'

		},
		{
			path: '/siteComplaintDetail',
			component: resolve => require(['@/components/Serve/siteComplanitDetail.vue'],resolve),
			name: 'siteComplaintDetail'

		},
		{
			path: '/serveDetail',
			component: resolve => require(['@/components/Serve/serveDetail.vue'],resolve),
			name: 'serveDetail'

		},
		{
			path: '/handlingComplaints',
			component: resolve => require(['@/components/Serve/handlingComplaints.vue'],resolve),
			name: 'handlingComplaints'

		},
		{
			path: '/newResidence',
			component:resolve => require(['@/components/newResidence.vue'],resolve),
			name: 'newResidence'

		},
		{
			path: '/mattress',
			component: resolve => require(['@/components/mattress.vue'],resolve),
			name: 'mattress'

		},
		{
			path: '/monthly',
			component: resolve => require(['@/components/monthly.vue'],resolve),
			name: 'monthly'

		},
		{
			path: '/privacyPolicy',
			component: resolve => require(['@/components/privacyPolicy.vue'],resolve),
			name: 'privacyPolicy',
			meta:{
				tilte:'隐私政策'
			}
		},
		{
			path: '/countMeal',
			component: resolve => require(['@/components/countMeal.vue'],resolve),
			name: 'countMeal'

		},
		{
			path: '/firstCountMeal',
			component: resolve => require(['@/components/firstCountMeal.vue'],resolve),
			name: 'firstCountMeal'

		},
		{
			path: '/firstSubmission',
			component: resolve => require(['@/components/firstSubmission.vue'],resolve),
			name: 'firstSubmission'

		},
		{
			path: '/agreement',
			component:resolve => require(['@/components/agreement.vue'],resolve),
			name: 'agreement'

		},
		{
			path: '/submission',
			component:resolve => require(['@/components/submission.vue'],resolve),
			name: 'submission',
			meta: {
				title: '提交订单'
			}

		},
		{
			path: '/orderPayment',
			component: resolve => require(['@/components/order/orderPayment.vue'],resolve),
			name: 'orderPayment',
			meta:{
				title:'订单支付'
			}

		},
		{
			path: '/success',
			component: resolve => require(['@/components/order/success.vue'],resolve),
			name: 'success'

		},
		{
			path: '/carpetCleaning',
			component: resolve => require(['@/components/order/carpetCleaning.vue'],resolve),
			name: 'carpetCleaning'

		},
		{
			path: '/curtainsCleaning',
			component: resolve => require(['@/components/order/curtainsCleaning.vue'],resolve),
			name: 'curtainsCleaning'

		},
		{
			path: '/recevieceSuccess',
			component:resolve => require(['@/components/order/recevieceSuccess.vue'],resolve),
			name: 'recevieceSuccess'

		},
		{
			path: '/orderDetails',
			component:resolve => require(['@/components/order/orderDetails.vue'],resolve),
			name: 'orderDetails',
			meta:{
				title:'订单详情'
			}

		},
		{
			path: '/orderFrequency',
			component:resolve => require(['@/components/order/orderFrequency.vue'],resolve),
			name: 'orderFrequency',
			meta:{
				title:'订单详情'
			}

		},
		{
			path: '/serviceDetails',
			component: resolve => require(['@/components/service/serviceDetails.vue'],resolve),
			name: 'serviceDetails',
			meta:{
				title:'服务详情'
			}
		},
		{
			path: '/complaintInfo',
			component: resolve => require(['@/components/service/complaint.vue'],resolve),
			name: 'complaintInfo',
			meta:{
				title:'我的投诉'
			}

		},
		{
			path: '/evaluation',
			component: resolve => require(['@/components/service/evaluation.vue'],resolve),
			name: 'evaluation',
			meta:{
				title:'服务评价'
			}

		},
		{
			path: '/balance',
			component:resolve => require(['@/components/my/balance.vue'],resolve),
			name: 'balance',
			meta:{
				title:'余额'
			}

		},
		{
			path: '/voucher',
			component: resolve => require(['@/components/my/voucher.vue'],resolve),
			name: 'voucher',
			meta:{
				title:'我的抵用券'
			}
		},
		{
			path: '/coupon',
			component:resolve => require(['@/components/my/coupon.vue'],resolve),
			name: 'coupon',
			meta:{
				title:'我的优惠券'
			}

		},
		{
			path: '/repaymentList',
			component:resolve => require(['@/components/order/repaymentList.vue'],resolve),
			name: 'repaymentList',
			meta:{
				title:'待还记录'
			}

		},
		{
			path: '/stages',
			component:resolve => require(['@/components/order/stages.vue'],resolve),
			name: 'stages',
			meta:{
				title:'分期详情'
			}

		},
		{
			path: '/stagesPayment',
			component:resolve => require(['@/components/order/stagesPayment.vue'],resolve),
			name: 'stagesPayment',
			meta:{
				title:'订单支付'
			}

		},
		{
			path: '/appointment',
			component: resolve => require(['@/components/my/appointment.vue'],resolve),
			name: 'appointment'

		},
		{
			path: '/myInvoice',
			component:  resolve => require(['@/components/my/myInvoice.vue'],resolve),
			name: 'myInvoice',
			meta:{
				title:'开票信息'
			}

		},
		{
			path: '/specialInvoice',
			component:  resolve => require(['@/components/my/specialInvoice.vue'],resolve),
			name: 'specialInvoice',
			meta:{
				title:'开票信息'
			}
			

		},
		{
			path: '/addressList',
			component: resolve => require(['@/components/my/addressList.vue'],resolve),
			name: 'addressList',
			meta:{
				title:'地址管理'
			}

		},
		{
			path: '/address',
			component: resolve => require(['@/components/my/address.vue'],resolve),
			name: 'address',
			meta:{
				title:'地址管理'
			}

		},
		{
			path: '/historicalStages',
			component: resolve => require(['@/components/order/historicalStages.vue'],resolve),
			name: 'historicalStages',
			meta:{
				title:'历史分期'
			}

		},
		{
			path: '/applayInvoice',
			component: resolve => require(['@/components/my/applayInvoice.vue'],resolve),
			name: 'applayInvoice',
			meta:{
				title:'申请发票'
			}
		},
		{
			path: '/invoiceInfo',
			component:resolve => require(['@/components/my/invoiceInfo.vue'],resolve),
			name: 'invoiceInfo',
			meta:{
				title:'开票信息'
			}
		},
		{
			path: '/oldInvoice',
			component: resolve => require(['@/components/my/oldInvoice.vue'],resolve),
			name: 'oldInvoice',
			meta:{
				title:'历史开票'
			}
		},
		{
			path: '/complaintDetails',
			component:resolve => require(['@/components/service/complaintDetails.vue'],resolve),
			name: 'complaintDetails',
			meta:{
				title:'投诉详细'
			}
		},
		{
			path: '/details',
			component: resolve => require(['@/components/service/details.vue'],resolve),
			name: 'details',
			meta:{
				title:'服务详细'
			}
		},
		{
			path: '/commonProblem',
			component: resolve => require(['@/components/my/commonProblem.vue'],resolve),
			name: 'commonProblem',
			meta:{
				title:'常见问题'
			}
		},
		{
			path: '/inviteFriends',
			component:  resolve => require(['@/components/my/inviteFriends.vue'],resolve),
			name: 'inviteFriends',
			meta:{
				title:'清洁人注册邀请'
			}
		},
		{
			path: '/login',
			component:  resolve => require(['@/components/login/login.vue'],resolve),
			name: 'login'
		},
		{
			path: '/bindPhone',
			component: resolve => require(['@/components/login/bindPhone.vue'],resolve),
			name: 'bindPhone',
			meta:{
				title:'手机号授权'
			}
		},
		{
			path: '/taskDetails',
			component: resolve => require(['@/components/Serve/taskDetails.vue'],resolve),
			name: 'taskDetails'
		},
		{
			path: '/wallet',
			component:  resolve => require(['@/components/Serve/wallet.vue'],resolve),
			name: 'wallet'
		},
		{
			path: '/invoice',
			component: resolve => require(['@/components/my/invoice.vue'],resolve),
			name: 'invoice'
		},
		{
			path: '/cleaning',
			component: resolve => require(['@/components/order/cleaning.vue'],resolve),
			name: 'cleaning'
		},
		{
			path: '/cleanSubmission',
			component: resolve => require(['@/components/order/cleanSubmission.vue'],resolve),
			name: 'cleanSubmission'
		},
		{
			path: '/noNetwork',
			component: resolve => require(['@/components/noＮetwork.vue'],resolve),
			name: 'noNetwork'

		},
		{
			path: '/homes',
			component:resolve => require(['@/components/homes.vue'],resolve),
			name: 'homes'
		},
		{
			path: '/historyListenEnpty',
			component:resolve => require(['@/components/historyListenEnpty.vue'],resolve),
			name: 'historyListenEnpty',
			meta:{
				title:'历史订单'
			}
		
		},
		{
			path: '/cleanPayment',
			component:  resolve => require(['@/components/order/cleanPayment.vue'],resolve),
			name: 'cleanPayment',
			meta:{
				title:'订单支付'
			}
		},
		{
			path: '/carpetsubmission',
			component: resolve => require(['@/components/order/carpetSubmission.vue'],resolve),
			name: 'carpetsubmission',
			meta:{
				title:'提交订单'
			}
		},

		{
			path: '/customers',
			component:resolve => require(['@/components/customer.vue'],resolve),
			name: 'customers',
			meta:{
				title:'清洁人客服'
			}
		},
		{
			path: '/cleanSuccess',
			component: resolve => require(['@/components/order/cleanSuccess.vue'],resolve),
			name: 'cleanSuccess'
		},
		{
			path: '/historyReceive',
			component: resolve => require(['@/components/Serve/historyReceive.vue'],resolve),
			name: 'historyReceive'
		},
		{
			path: '/apply',
			component: resolve => require(['@/components/Serve/apply.vue'],resolve),
			name: 'apply'
		},
		{
			path: '/giveBack',
			component:resolve => require(['@/components/Serve/giveBack.vue'],resolve),
			name: 'giveBack'
		},
		{
			path: '/carpetDetails',
			component:resolve => require(['@/components/order/carpetDetails.vue'],resolve),
			name: 'carpetDetails'
		},
		{

			path: '/cleanDetails',
			component: resolve => require(['@/components/order/cleanDetails.vue'],resolve),
			name: 'cleanDetails'

		},
		{
			path: '/myProfit',
			component:  resolve => require(['@/components/my/myProfit.vue'],resolve),
			name: 'myProfit',
			meta:{
				title:'我的收益'
			}
		},
		{
			path: '/addBankCard',
			component: resolve => require(['@/components/my/addBankCard.vue'],resolve),
			name: 'addBankCard',
		},
		{
			path: '/withdrawal',
			component: resolve =>require(['@/components/my/withdrawal.vue'],resolve),
			name: 'withdrawal',
			meta:{
				title:'申请提现'
			}
		},
		{
			path: '/bankCard',
			component: resolve =>require(['@/components/my/bankCard.vue'],resolve),
			name: 'bankCard',
			meta:{
				title:'银行卡'
			}
		},
		{
			path: '/commissionOrder',
			component: resolve => require(['@/components/my/commissionOrder.vue'],resolve),
			name: 'commissionOrder',
			meta:{
				title:'收益订单'
			}
		},
		{
			path: '/commissionFlow',
			component: resolve => require(['@/components/my/commissionFlow.vue'],resolve),
			name: 'commissionFlow',
			meta:{
				title:'收益流水'
			}
		},
		{
			path: '/officeBuildingList',
			component: resolve => require(['@/components/my/officeBuildingList.vue'],resolve),
			name: 'officeBuildingList',
			meta:{
				title:'分佣写字楼'
			}
		},
		{
			path: '/withdrawalRecord',
			component: resolve =>require(['@/components/my/withdrawalRecord.vue'],resolve),
			name: 'withdrawalRecord',
			meta:{
				title:'提现记录'
			}
		},
		{
			path: '/goodsBuy',
			component: resolve => require(['@/components/shop/goodsBuy.vue'],resolve),
			name: 'goodsBuy'
		},
		{
			path: '/shoppCart',
			component: resolve =>require(['@/components/shop/shoppCart.vue'],resolve),
			name: 'shoppCart',
			meta:{
				title:'购物车'
			}
			
		},
		{
			path: '/shopSubmission',
			component:resolve => require(['@/components/shop/shopSubmission.vue'],resolve),
			name: 'shopSubmission',
			meta:{
				title:'确认订单'
			}
		},
		{
			path: '/shopPayment',
			component:resolve => require(['@/components/shop/shopPayment.vue'],resolve),
			name: 'shopPayment',
			meta:{
				title:'订单支付'
			}
			
		},
		{
			path: '/goodsDetail',
			component: resolve =>require(['@/components/shop/goodsDetail.vue'],resolve),
			name: 'goodsDetail'
		},
		{
			path: '/historyGoods',
			component:resolve => require(['@/components/shop/historyGoods.vue'],resolve),
			name: 'historyGoods',
			meta:{
				title:'历史订单'
			}
			
		},
		{
			path: '/cityList',
			component: resolve => require(['@/components/cityList.vue'],resolve),
			name: 'cityList'
		},
		{

			path: '/map',
			component: resolve => require(['@/components/my/map.vue'],resolve),
			name: 'map',
			meta:{
				title:'地址选择'
			}

		},
		{
			path: '/shopDynamic',
			component:resolve => require(['@/components/shop/shopDynamic.vue'],resolve),
			name: 'shopDynamic'
		},
		{
			path: '/install',
			component: resolve => require(['@/components/my/install.vue'],resolve),
			name: 'install ',
			meta:{
				title:"设置"
			}
		},
		{
			path: '/serviceAgreement',
			component:resolve => require(['@/components/serviceAgreement.vue'],resolve),
			name: 'serviceAgreement',
			meta:{
				 title:'客户服务协议'
			}
		},
		{
			path: '/oldPhone',
			component:resolve => require(['@/components/my/oldPhone.vue'],resolve),
			name: 'oldPhone'
		},
		{
			path: '/newPhone',
			component: resolve => require(['@/components/my/newPhone.vue'],resolve),
			name: 'newPhone'
		},
		{
			path: '/exclusive',
			component: resolve => require(['@/components/order/exclusive.vue'],resolve),
			name: 'exclusive'
		},
		{
			path:'/reviews',
			component:resolve => require(['@/components/shop/reviews.vue'],resolve),
			name:'reviews',
			meta:{
				title:'商品评价'
			}
		},
		{
			path:'/distribution',
			component:resolve => require(['@/components/my/distribution.vue'],resolve),
			name:'distribution',
			meta:{
				title:'活动'
			}
		},
		{
			path:'/cooperation',
			component:resolve => require(['@/components/my/cooperation.vue'],resolve),
			name:'cooperation',
			meta:{
				title:'分销合作'
			}
		},
		{
			path:'/receive',
			component:resolve => require(['@/components/my/receive.vue'],resolve),
			name:'receive'
		},
		{
			path:'/distributionActivities',
			component:resolve => require(['@/components/my/distributionActivities.vue'],resolve),
			name:'distributionActivities'
		},
		{
			path:'/activityPage',
			component:resolve => require(['@/components/my/activityPage.vue'],resolve),
			name:'activityPage'
		},
        {
        	path:'/transferAccounts',
        	component:resolve => require(['@/components/order/transferAccounts'],resolve) ,
        	name:'transferAccounts',
            meta:{
            	title:'对公转账'
            }
            
        },
        {
            path:'/monthlyBalance',
            component:resolve => require(['@/components/order/monthlyBalance.vue'],resolve),
            name:'monthlyBalance',
            meta:{
                title:'月结'
            }
        },
        {
           path:'/monthlyOrderList',
           component:resolve => require(['@/components/order/monthlyOrderList.vue'],resolve),
           name:"monthlyOrderList",
           meta:{
               title:'订单'
           }
        },
        {
           path:'/monthlyPayment',
           component:resolve => require(['@/components/order/monthlyPayment.vue'],resolve),
           name:'monthlyPayment',
           meta:{
               title:'订单支付'
             }
        },
        {
           path:'/washingIntroduction',
           component:resolve => require(['@/components/my/washingIntroduction.vue'],resolve),
           name:'washingIntroduction',
           meta:{
               title:'清洁人'
             }
        }
	]

})

router.beforeEach((to, from, next) => {
 
	/* 路由发生变化修改页面title */
	if (to.meta.title) {
		window.document.title = to.meta.title
		
	}else{
		window.document.title='清洁人'
	}

	 next()
	 // if(document.URL.split('/')[document.URL.split('/').length - 1][0]=='?'){
		//  console.log(336969699)
	 //    history.pushState(null, null, document.URL);
	 // }
	 // window.addEventListener('popstate', function(e) { //后退事件置空
	 // 	let url = document.URL.split('/')[document.URL.split('/').length - 1]
		// if(url[0]=='?'){
		// 	console.log(8888888888888888888)
		// }
	 // 	if (document.URL.split('/')[document.URL.split('/').length - 1].includes('index')) { //在首页时候禁止返回
	 // 		history.pushState(null, null, document.URL);
	 // 	}
	 // });
})
// router.afterEach((to,from,next) => {
   // let isBack = router.isBack // 监听路由变化时的状态为前进还是后退
   // console.log(isBack)
   // if (isBack) {


   // } else {
	  //  window.scrollTo(0,0);

   // }
	

// });
// 把路由对象暴露出去


export default router
