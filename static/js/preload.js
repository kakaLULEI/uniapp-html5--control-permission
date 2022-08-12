// let addEventListenerP = document.addEventListener;
// let plusreadyArray = [];
// document.addEventListener = null;
// document.addEventListener = function(...params){
// 	console.log('aaa');
// 	if(event!='plusready'){
// 		addEventListenerP.apply(document,params);
// 	}else{
// 		plusreadyArray.push(params[1]);
// 	}
// }
// document.addEventListener('plusready', function(){
// 	// plus.webview.all()[0].hide();
// 	// plus.webview.all()[1].hide()
// 	// let s = plus.webview.getTopWebview();
// 	// console.log(JSON.stringify(s))
// 	// plus.device.dial("18918169347", false);
// 	console.log('4444222')
// }, false);
// //只暴露部分api
// addEventListenerP.call(document,'plusready', function(e){
// 	console.log('5555');
// 	plusreadyArray.forEach((item)=>{
// 		if(typeof item == 'function'){
// 			item.call(document,e);
// 		}
// 	})
// }, true);

!function(){
	let primary,ready = false;
	if(window.plus){
		primary = window.plus;
		ready = true;
	}
	let last = {
		webview:{
			currentWebview:primary.webview.currentWebview
		},
		isReady:primary.isReady,
		__tag__:primary.__tag__,
		bridge:primary.bridge,
		// device:{
		// 	dial(phone){
		// 		primary.device.dial(phone, true);
		// 	}
		// }
	};
	Object.defineProperty(window,'plus',{
		get(){
			return last;
		},
		set(n){
			if(ready)
				return;
			primary = n;
			ready = true;
		},
		configurable:false,
	});
	//获取鉴权，开放对应的api，可以对api再进行一次封装来对权限进一步控制
	setTimeout(()=>{
		last.device = {
			dial(phone){
				primary.device.dial(phone, true);
			}
		};
		console.log(plus.device);
		const plusDiy = new CustomEvent('plusDiyReady', {
		  detail: {
		    name: 'plusDiyReady'
		  }
		});
		document.dispatchEvent(plusDiy);
	},5000);
}();