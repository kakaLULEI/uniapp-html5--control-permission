<template>
  <web-view :src="src"></web-view>
  <!-- <view></view> -->
</template>

<script>
	export default {
		components:{
		},
		data() {
			return {
				src:'',
			}
		},
		computed:{
		},
		mounted(){
			var currentWebview = this.$scope.$getAppWebview() //此对象相当于html5plus里的plus.webview.currentWebview()。在uni-app里vue页面直接使用plus.webview.currentWebview()无效
			let wv = currentWebview.children()[0]
			wv.appendJsFile('_www/static/js/preload.js');
		},
		onLoad(res) {
			var url = '';
			url = decodeURIComponent(res.url)||'';
			url += (~url.indexOf('?')&&'&'||'?')+'t='+Date.now();
			this.src = url;
			//使用plus api创建webview也可以
			// let wv = plus.webview.create("","custom-webview",{
			// 	// disablePlus:true,
			// 	// plusrequire:"none", //禁止远程网页使用plus的API，有些使用mui制作的网页可能会监听plus.key，造成关闭页面混乱，可以通过这种方式禁止
			// 	'uni-app': 'none', //不加载uni-app渲染层框架，避免样式冲突
			// 	top:uni.getSystemInfoSync().statusBarHeight+44 //放置在titleNView下方。如果还想在webview上方加个地址栏的什么的，可以继续降低TOP值
			// })
			// // wv.evalJS('document.addEventListener = null;');
			// wv.appendJsFile('_www/static/preload.js');
			// wv.loadURL(this.src)
			// // wv.evalJS('document.addEventListener = null;');
			// // wv.appendJsFile('_www/static/preload.js');
			// // wv.setJsFile('_www/static/preload.js');
			// // wv.addEventListener("rendering",()=>{
			// // 	wv.setJsFile('_www/static/preload.js');
			// // })
			// // wv.appendJsFile('_www/static/preload.js');
			// var currentWebview = this.$scope.$getAppWebview(); //此对象相当于html5plus里的plus.webview.currentWebview()。在uni-app里vue页面直接使用plus.webview.currentWebview()无效
			// currentWebview.append(wv);
		},
		onReady() {
		},
		methods: {
			withPlusApi(){
				//使用plus api创建webview也可以
				let wv = plus.webview.create("","custom-webview",{
					// disablePlus:true,
					// plusrequire:"none", //禁止远程网页使用plus的API，有些使用mui制作的网页可能会监听plus.key，造成关闭页面混乱，可以通过这种方式禁止
					'uni-app': 'none', //不加载uni-app渲染层框架，避免样式冲突
					top:uni.getSystemInfoSync().statusBarHeight+44 //放置在titleNView下方。如果还想在webview上方加个地址栏的什么的，可以继续降低TOP值
				})
				wv.appendJsFile('_www/static/js/preload.js');
				wv.loadURL(this.src);
				var currentWebview = this.$scope.$getAppWebview(); //此对象相当于html5plus里的plus.webview.currentWebview()。在uni-app里vue页面直接使用plus.webview.currentWebview()无效
				currentWebview.append(wv);
			}
		}
	}
</script>

<style scoped>
</style>
