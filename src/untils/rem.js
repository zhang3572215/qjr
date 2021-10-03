export default function() {
	var docEl = document.documentElement,
		isIOS = navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
		dpr = isIOS ? Math.min(window.devicePixelRatio, 3) : 1,
		dpr = window.top === window.self ? dpr : 1, //被iframe引用时，禁止缩放
		scale = 1 / dpr,
		resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize';
	docEl.dataset.dpr = dpr;
	var recalc = function() {
		var width = docEl.clientWidth;
		if (width / dpr > 750) { //750为设计稿的宽度，此处应根据实际情况改变
			width = 750 * dpr;
		}
		// 乘以100，px : rem = 100 : 1
		docEl.style.fontSize = 100 * (docEl.clientWidth / 750) + 'px';
	};

	if (!document.addEventListener) return;
	document.addEventListener(resizeEvt, recalc, false);
	document.addEventListener('DOMContentLoaded', recalc, false);
}
