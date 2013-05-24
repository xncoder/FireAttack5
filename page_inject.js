// Description：监听web页面的 DOM 事件

// 通知 内容脚本，网页载入完毕
console.log('[INJ]Page injected');
document.customAPILoaded = document.createEvent('MessageEvent');
document.customAPILoaded.initEvent('HestiaReady', false, false);
document.dispatchEvent(document.customAPILoaded);


// 开始监听和拦截危险API
// 1. Capture XMLHttpRequest
var configuration={
	// 1 - log , 3 - block & freeze
	XMLHttpRequestStatue: 1
};

(function(){
	var proxied = window.XMLHttpRequest.prototype.open;
	window.XMLHttpRequest.prototype.open = function(){
		switch(configuration.XMLHttpRequestStatue){
			case 2:
				throw new Error('XMLHttpRequest is blocked');
				var out = {};
				this.out;
				break;
			case 1: 
				console.log('[INJ]XMLHttpRequest logged!');
				// 触发事件之后发送自定义数据
				var count = document.getElementsByTagName("HestiaMessages")[0].getAttribute("challenge");
				document.getElementsByTagName("HestiaMessages")[0].setAttribute("challenge",count+1);
				document.dispatchEvent(document.customAPILoaded);
				break;
		}
		return proxied.apply(this, arguments);
	};
})();

// 2. 拦截 History API
var i = 0;
(function(history){
	var pushState = history.pushState;
	history.pushState = function(state){
		if(typeof history.onpushstate == "function"){
			history.onpushstate({state : state});
		}
		return pushState.apply(history, arguments);
	};
})(window.history);

window.onpopstate = history.onpushstate = function(e){
	i++;
	console.log("[INJ]History changed :" + i + "times : " + e.state);
};

// 出于安全考虑，冻结扩展修改过的对象
Object.freeze(configuration);
Object.freeze(XMLHttpRequest);
Object.freeze(XMLHttpRequest.prototype);
