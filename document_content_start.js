// document_start_content.js
// 向 web 页面中通过<script>插入两个js文件
// 1. page_inject.js
// 2. message_api.js
// log标识说明
// [INJ]:Inject by content script; [WEB] web page; [EXT]extension; [TWO] shared by contentscript and web page
var jsPageInject = document.createElement('script');
jsPageInject.src = chrome.extension.getURL('page_inject.js');
jsPageInject.onload = function(){
	// 载入完成后从DOM中删除<script>标签内容（暂时不删除）
	//this.parentNode.removeChild(this);
}; 
var jsMessageAPI = document.createElement('script');
jsMessageAPI.src = chrome.extension.getURL('message_api.js');

(document.head || document.documentElement).appendChild(jsPageInject);
(document.head || document.documentElement).appendChild(jsMessageAPI);



