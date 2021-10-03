var getToken={
 
    
 get(name) {
 	// 正则：[找寻'&' + 'url参数名字' = '值' + '&']（'&'可以不存在）
 	let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
 	let r = window.location.search.substr(1).match(reg);
 	if (r != null) {
 		// 对参数值进行解码
 		return decodeURIComponent(r[2]);
 	}
 	return null;
	
	// let url = window.location.href
	// var arr = url.split("?")
	// let tokenArr = arr[1].split('=')
	// return tokenArr[0]
 }
}
export default getToken