import axios from 'axios'
import getToken from './getToken.js'
import router from '../router.js'
import getOther from './tool.js'
// console.log(getOther.getWxURl)
// 创建axios实例
// if( !getToken.get('token')){
// 	uni.navigateTo({
// 		url:'/pages/login/login'
// 	})
// }
var token = getToken.get('token')
// var token =window.localStorage.getItem('token')
let that = this
const service = axios.create({
	// 请求超时时间
	timeout: 50000,
	baseURL:getOther.getHttpUrl(),
	// baseURL:'https://192.168.2.192:8090/qjrapi',
	// baseURL: 'http://boss.nat300.top/qjrapi', //本地
	// baseURL:'https://www.jieren365.cn/qjrapi',//测试
	// baseURL:'https://boss.jieren365.cn/qjrapi_test',
	// baseURL:'https://boss.jieren365.cn/qjrapi',//正式服务
	// baseURL: 'https://192.168.1.117:8089/qjrapi',
	// headers: {
	// 	'Content-Type': 'application/x-www-form-urlencoded',
	// 	'X-Token': window.localStorage.getItem('token') ? window.localStorage.getItem('token') : ""
	// }
})

// request拦截器

service.interceptors.request.use(

	cfg => {
		// tool.showLoading('加载中')
		cfg.headers = {
			'Content-Type': 'application/x-www-form-urlencoded',

			// 'X-Token':'820ec94d9df04ab4a90416682d6ff878'
			// 'X-Token':'d3d3c830b8ae44a581b383ec7b29994e'
			// 'X-Token':token?token:"",
			// 'X-Token': getToken.get('token') ? getToken.get('token') : "",
			'X-Token': window.localStorage.getItem('token') ? window.localStorage.getItem('token') : ""
		}
		return cfg
	},
	error => {
		return Promise.reject(error)
	}
)

// response 拦截器
service.interceptors.response.use(
	res => {

		if (res.data.meta.msg == "Token is invaild") {
			// 判断浏览器是否为微信浏览器
			var ua = window.navigator.userAgent.toLowerCase();
			if (ua.indexOf('micromessenger') > -1) { // 判断浏览器是否为微信浏览器
            	window.localStorage.setItem('token', null)
				    getOther.getFirstWxurl()//微信授权登录
			} else {
				router.push({
					'name': 'login'
				})
			}

			return

		}
		if (res.status === 200) {
			const resp = res.data
			if (resp.meta) {
				if (!resp.meta.success) {

				}
			}
			// tool.hideLoding()
			return Promise.resolve(resp)
		}
	},
	error => {

		if (error.response.status === 401) {
			// 判断浏览器是否为微信浏览器
			var ua = window.navigator.userAgent.toLowerCase();
			if (ua.indexOf('micromessenger') > -1) { // 判断浏览器是否为微信浏览器
            	window.localStorage.setItem('token', null)
			   getOther.getFirstWxurl()//微信授权登录
			} else {
				router.push({
					'name': 'login'
				})
			}
	
			// router.push({'name':'login'})
			// uni.navigateTo({
			// 	url: '/pages/login/login'
			// })
		}
		if (error.response.message.includes('timeout')) { // 判断请求异常信息中是否含有超时timeout字符串
			console.log("错误回调", error);
			// alert("网络超时");
			// tool.fail('请求超时')

			return Promise.reject(error); // reject这个错误信息
		}
		if (error.response.status === 414) {

			that.$toast({
				message: '414',
				duration: 1500000
			})
			return Promise.reject(error);
		}
		

		// return Promise.reject(error)
	}
)

export const post = (url, paramObj) => {
	return new Promise((resolve, reject) => {
		service
			.post(url, paramObj)
			.then(resp => resolve(resp))
			.catch(err => reject(err))
	})
}

export const get = (url, paramObj = {}) => {
	return new Promise((resolve, reject) => {
		service
			.get(url, {
				params: paramObj
			})
			.then(resp => resolve(resp))
			.catch(err => reject(err))
	})
}

const download = (url, paramObj = {}) => {
	return new Promise((resolve, reject) => {
		service
			.post(url, paramObj, {
				responseType: 'blob'
			})
			.then(resp => resolve(resp))
			.catch(err => reject(err))
	})
}
// export default {
//   post,
//   get
// }
