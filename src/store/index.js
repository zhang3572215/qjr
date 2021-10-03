import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
	state: {
		abs: 1,
		category: 'basic',
		date: '',
		bannerImg: ['2'],
		history: 1,
		historyPull: false,
		dateStartDes: {
			des: '',
			date: ''
		},
		dateEndDes: {
			des: '',
			date: ''
		},
		desInfo: 'basic',
		desId: 0,
		HandleTit:0,
		handStatus: 1,
		invoice: 0,
		refreshAdr: 0,
		addressInfo: {
			address: '',
			id: ''
		},
		refreshInvoce: 0,
		complanitId: false,
		currentListRefresh:1,
		applyFalg:0,
		cleanFlag:0,
		bankFlag:0,
	    bankCard:{},
		cardNum:0,
		city:'',
		installNum:0,
		adsInfo:'',
	    returnRefresh:0,
		clientUnread:0,
	    serverUnread:0,
        invoiceFlag:0
	},

	mutations: {
		showInfo(state, info) {
			state.abs += info
		},
		showDes(state, info) {
			state.desInfo = info
		},
		showCate(state, cate) {
			state.category = cate
		},
		addDate(state, date) {
			state.date = date
		},
		addDateDes(state, date) {
			console.log(date)
			state.dateStartDes = date
		},
		addDateEndDes(state, date) {
			state.dateEndDes = date
		},
		addImg(state, img) {
			state.bannerImg = img
		},
		addHistory(state, num) {
			state.history = num
		},
		changeHistoryPull(state, flag) {
			state.historyPull = flag
		},
		addDesId(state, num) {
			state.desId = num
		},
		addDesCont(state, num) {
			state.desCont = num
		},
		addHandleTit(state, num) {
			state.HandleTit = num
		},
		addHandStatus(state, num) {
			console.log(num)
			state.handStatus = num
		},
		addInvoice(state, num) {
            console.log(num)
			state.invoice = num
		},
		addRefreshAdr(state, num) {
			state.refreshAdr = num
		},
		addAddressInfo(state, info) {
			state.addressInfo = info
		},
		addRefreshInvoce(state, num) {
			state.refreshInvoce = num
		},
		addcomplanitId(state, num) {
			state.complanitId = num
		},
		addCltRefresh(state,num){
	
			state.currentListRefresh=num
		},
		addApplyFalg(state,num){
			state.applyFalg=num
		},
		addCleanFlag(state,num){
			 state.cleanFlag=num
		},
		addBankFlag(state,num){
			state.bankFlag=num
		},
		addBankCard(state,num){
			state.bankCard=num
		},
		addCardNum(state,num){
			state.cardNum=num
		},
		addCity(state,title){
			state.city=title
		},
		addInstallNum(state,num){
			state.installNum=num
		},
		addAdsInfo(state,info){
			state.adsInfo=info
		},
		addReturnRefresh(state,num){
			state.returnRefresh=num
		},
		addClientUnread(state,num){
			state.clientUnread=num
		},
		addServerUnread(state,num){
			state.serverUnread=num
		},
        addInvoiceFlag(state,num){
            state.invoiceFlag=num
        }
	},
	getters: {
		// doneTodos: state => {
		//       return state.todos.filter(todo => todo.done)
		//     }
		toCate(state) {
			return state.category
		},
		todps(state) {
			return state.abs + 1
		},
		showBanner(state) {
			return state.bannerImg
		},
		showDate(state) {
			return state.date
		},
		showHistory(state) {
			return state.history
		},
		showHistoryPull(state) {
			return state.historyPull
		},
		showDateStart(state) {
			return state.dateStartDes
		},
		showDateEnd(state) {
			return state.dateEndDes
		},
		showDess(state) {
			return state.desInfo
		},
		showDesId(state) {
			return state.desId
		},
		showHandleTit(state) {
			return state.HandleTit
		},
		showHandStatus(state) {
			return state.handStatus
		},
		showInvoice(state) {
			return state.invoice
		},
		showRefreshAdr(state) {
			return state.refreshAdr
		},
		showAddressInfo(state) {
			return state.addressInfo
		},
		showRefreshInvoce(state) {
			return state.refreshInvoce
		},
		showComplaintId(state) {
			return state.complanitId
		},
		showCurrentListRefresh(state){
			
			return state.currentListRefresh
		},
		showApplyFalg(state){
			 return state.applyFalg
		},
		showCleanFlag(state){
			 return state.cleanFlag
		},
		showBankFlag(state){
			return  state.bankFlag
		},
		showBankCard(state){
			return state.bankCard
		},
		showCardNum(state){
			return state.cardNum
		},
		showCity(state){
			 return state.city
		},
		showInstallNum(state){
			return state.installNum
		},
		showAdsInfo(state){
			return state.adsInfo
		},
		showReturnRefresh(state){
			return state.returnRefresh
		},
		showClientUnread(state){
			return state.clientUnread
		},
		showServerUnread(state){
			return state.serverUnread
		},
        showInvoiceFlag(state,num){
            return state.invoiceFlag
        }

	},
	actions: {
		showCates({
			commit
		}, val) {
			commit('showCate', val)
		},
		addDates({
			commit
		}, val) {
			commit('addDate', val)
		},
		addImgs({
			commit
		}, val) {
			commit('addImg', val)
		},
		promotionHistory({
			commit
		}, val) {
			commit('addHistory', val)
		},
		promotionHistoryPull({
			commit
		}, val) {
			commit('changeHistoryPull', val)
		},
		addDateStartDess({
			commit
		}, val) {
			commit('addDateDes', val)
		},
		addDateEndDess({
			commit
		}, val) {
			commit('addDateEndDes', val)
		},
		addShowDes({
			commit
		}, val) {
			commit('showDes', val)
		},
		addShowSignId({
			commit
		}, val) {
			commit('addDesId', val)
		},
		addDesCont({
			commit
		}, val) {
			commit('showCate', val)
		},
		collageHandleTit({
			commit
		}, val) {
			commit('addHandleTit', val)
		},
		collageHandStatus({
			commit
		}, val) {
			commit('addHandStatus', val)
		},
		collageInvoice({
			commit
		}, val) {
			commit('addInvoice', val)
		},
		collageRefreshAdr({
			commit
		}, val) {
			commit('addRefreshAdr', val)
		},
		collageAddressInfo({
			commit
		}, val) {
			commit('addAddressInfo', val)
		},
		collageRefreshInvoce({
			commit
		}, val) {
			commit('addRefreshInvoce', val)
		},
		collageComplanitId({
			commit
		}, val) {
			commit('addcomplanitId', val)

		},
		collageCltRefresh({commit},val){
			
			   commit('addCltRefresh',val)
		},
		collageApplyFalg({commit},val){
			
			commit('addApplyFalg',val)
		},
		collageCleanFlag({commit},val){
			  commit('addCleanFlag',val)
		},
		collageBankFlag({commit},val){
			commit('addBankFlag',val)
		},
		collageBankCard({commit},val){
			commit('addBankCard',val)
		},
		collageCardNum({commit},val){
			commit('addCardNum',val)
		},
		collageCity({commit},val){
			commit('addCity',val)
		},
		collageInstallNum({commit},val){
			commit('addInstallNum',val)
		},
		collageAdsInfo({commit},val){
			commit('addAdsInfo',val)
		},
		collageReturnRefresh({commit},val){
			commit('addReturnRefresh',val)
		},
		collageClientUnread({commit},val){
			commit('addClientUnread',val)
		},
		collageServerUnread({commit},val){
			commit('addServerUnread',val)
		},
        collageInvoiceFlag({commit},val){
            commit('addInvoiceFlag',val)
        }
	}
})
export default store
