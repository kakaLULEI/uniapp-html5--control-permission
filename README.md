# uniapp-html5+-control-permission
uni app打包app，webview或者plus webview api引入h5应用，进行h5应用的plus api 鉴权，控制plus给h5应用提供哪些api（app原生能力），使你的app更加安全



## **概述**

使用uni app开发app，app中嵌入h5应用，h5应用可以通过html5+暴露的plus api使用原生能力，但api暴露了太多的能力，导致加载外部网站十分不安全，参考各大app嵌入h5应用或者小程序原生能力的调用，应当对不同app授予不同api的权限，通过鉴权，固定h5应用只能使用固定的api



## 使用

- 使用hbuildx创建uni app项目

- 将pages里面的内容放入pages文件夹下

- 在page.json里添加

  ```javascript
  path:"pages/webview/index"
  ```

  webview页面的路由

- 点击h5应用跳转webview页面

- 设计具体的鉴权逻辑

  - 比如点击h5应用跳转webview的时候带上appid参数
  - 把appid作为webview的id
  - preload里面获取当前webview的id，加上域名作为参数，请求原生或者接口，获取权限api
  - 获取权限后应该在事件里通知h5用是成功还是失败
  - 失败应该扩展重试的方法，使h5应用可以主动重新调用，重新api授权
  - 成功可以存在sessionstorage里面，跳转页面的时候可以先从缓存里获取
  - preload里还可以扩展获取当前用户信息的方法
  - 不通过id，也可以通过plus访问storage获取appid，可以使用时间戳作为key，proload里获取url参数上的时间戳，再获取到appid
  - 也可以找其他方法交互appid，比如是否可以在当前webview对象上加一个属性，或者当前nativeInstanceObject对象是否可以作为桥梁或者调用原生或者父子webview之间是否有其他方法交互
  - 也可以设计其他方案，比如你提供一个api，h5应用调用此api，appid作为参数，或者h5应用先和服务器交互获取一个验证码，把验证码传入api，api再通过此码和服务器交互
