### Vue-Router实现原理

Vue-Router常用的两种模式为hash模式和history模式.其中hash模式时利用改变url中#后面的字符,通过配置监听hashchange事件来渲染对应的Vue组件改变页面,并且hash不会对服务器发起请求,也不需要服务器的支持.

history模式主要使用了HTML5中history的pushState,replaceState方法,他们可以对浏览器的历史记录进行操作,并且通过监听popState事件来进行渲染组件.

两者主要的区别如下:

1. 使用hash模式的URL带#符号不符合客户要求
2. hash模式传参只能传入简单的字符串,history则可以通过state参数进行对象的传入
3. hash模式下,仅符号前的内容会被包含在请求中,也就是说直接回车刷新是不会产生错误页面的.而对于history来说需要服务端进行请求的过滤拦截处理


