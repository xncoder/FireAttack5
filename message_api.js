// message_api.js
// 用来进行双向通信

// 创建一个随机的唯一id值
var accessID = Math.random().toString();
// 区分是在扩展还是web页面中
var inExtension = false;

try{
	// 在扩展中
	if(typeof chrome.extension.connect == 'function'){
		inExtension = true;
	}
}catch(e){}

console.log("[TWO]New id " + accessID + " can use chrome.extension:" + inExtension);
// 在web页面中，为通信数据创建placeholder
if(!inExtension){
	var element = document.createElement("HestiaMessages");
	// 可以通过唯一的 accessID 值进行调用
	element.setAttribute("id", accessID);
	element.setAttribute("from", "0");
	element.setAttribute("key", "0");
	element.setAttribute("value", "0");
	element.setAttribute("challenge", "0");
	document.documentElement.appendChild(element);
	console.log("[WEB]Made new placeholder for messageing on " + accessID);
}
// 只有扩展的message_api.js会监听 HestiaReady 事件
// 表明 web 页面已经完全载入，扩展可以开始和 web 页面通信了
var challenge = null;
document.addEventListener("HestiaReady", function(event){
	if(document && document.getElementById && document.getElementsByTagName && document.body && document.head){
		console.log("[INJ]Hestia Ready"); // extension 必须最先发送消息
		if(document.getElementsByTagName("HestiaMessages")[0].getAttribute("challenge") == (challenge + 1)){
			// 接收到消息事件，发送自定义内容
			sendMessageFromExtension('name','xnhandt');
		}
	}
});
// 从扩展发送数据给web页面
function sendMessageFromExtension(key, value){
	challenge = Math.random().toString();
	var store = document.getElementsByTagName("HestiaMessages")[0];
		store.setAttribute("from", accessID);
		store.setAttribute("key", key);
		store.setAttribute("value", value);
		store.setAttribute("challenge", challenge);
}