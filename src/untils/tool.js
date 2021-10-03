let getOther={
 getUrl(obj){
     var index=obj.indexOf("/qjrapp");
     obj=obj.substring(index,obj.length);

     return obj;
 },
 getWxURl(){
	 // 微信静默登录
	// let redirect_uri = encodeURIComponent(
		// 'http://boss.nat300.top/qjrapi/sys/t-sys-app-user/wxOfficialAccountsLoginBackByBase') //本地
	// let redirect_uri = encodeURIComponent(
	// 	'https://www.jieren365.cn/qjrapi/sys/t-sys-app-user/wxOfficialAccountsLoginBackByBase')//测试

	// window.location.href =
	// 	`https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx37cc008acfbf08bc&redirect_uri=${redirect_uri}&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect`//本地、测试
    
    let redirect_uri = encodeURIComponent(
    	'https://boss.jieren365.cn/qjrapi/sys/t-sys-app-user/wxOfficialAccountsLoginBackByBase')//正式
	window.location.href =
		`https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx895cabe0c4b55359&redirect_uri=${redirect_uri}&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect`//正式
 },
 getFirstWxurl(){
     
	 // 微信授权登录
	// let redirect_uri = encodeURIComponent(
	// 	'http://boss.nat300.top/qjrapi/sys/t-sys-app-user/wxOfficialAccountsLoginBack') //本地
	// let redirect_uri = encodeURIComponent(
	// 	'https://www.jieren365.cn/qjrapi/sys/t-sys-app-user/wxOfficialAccountsLoginBack')//测试

	// window.location.href =
	// 	`https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx37cc008acfbf08bc&redirect_uri=${redirect_uri}&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect`//本地、测试
    
    let redirect_uri = encodeURIComponent(
    	'https://boss.jieren365.cn/qjrapi/sys/t-sys-app-user/wxOfficialAccountsLoginBack')//正式
	window.location.href =
		`https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx895cabe0c4b55359&redirect_uri=${redirect_uri}&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect`//正式
 },
 getReviceWxURl(activityId,recomPhone,estateId){
	 // 微信授权登录
	 // let redirect_uri = encodeURIComponent(
	 // 	`http://boss.nat300.top/qjrapi/business/t-business-activity/allowanceActivityBack?activityId=${activityId}&recomPhone=${recomPhone}&estateId=${estateId}`) //本地
		// let redirect_uri = encodeURIComponent(
		// 	`https://www.jieren365.cn/qjrapi/business/t-business-activity/allowanceActivityBack?activityId=${activityId}&recomPhone=${recomPhone}&estateId=${estateId}`) //测试

	 // window.location.href =
	 // 	`https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx37cc008acfbf08bc&redirect_uri=${redirect_uri}&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect`//本地、测试
     
     
    let redirect_uri = encodeURIComponent(
     	'https://boss.jieren365.cn/qjrapi/business/t-business-activity/allowanceActivityBack?activityId=${activityId}&recomPhone=${recomPhone}&estateId=${estateId}')//正式
	 window.location.href =
	 	`https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx895cabe0c4b55359&redirect_uri=${redirect_uri}&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect`//正式
 },
 getHttpUrl(){
	 // let url ='https://192.168.10.143:8090/qjrapi'
	  // let url='http://boss.nat300.top/qjrapi' //本地
	  let url= 'https://www.jieren365.cn/qjrapi'//测试
	  // let url ='https://boss.jieren365.cn/qjrapi'//正式服务 
     return url 
 },
 getUrlInfo(name){
	 let url= window.location.href.split('?').slice(1)
	 let  urlArr=url[0].split('&')
	 let urlJson={}
	 urlArr.forEach(item => {
	 	  let itemArr=item.split('=')
	 	 urlJson[itemArr[0]]=itemArr[1]
	 })
	 		
	 // let url1=url.slice(1)
	 // console.log(url1)
	 // alert(window.location.href)
	 return urlJson[name]
	 // if (urlJson[name] == '1') {
	 // 	alert(window.location.href)
	 // 	this.isBack = true
	 // }
 }
}
export default getOther