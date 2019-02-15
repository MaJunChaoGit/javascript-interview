

### Webpack热更新流程



1. **webpack对文件系统进行watch打包到内存中**

   webpack-dev-middleware通过调用webpack的api对文件系统进行watch,并且webpack-dev-middleware将webpack的原来输出文件系统由打包至文件替换为memory-fs插件,将文件打包至内存中.当浏览器请求打包文件时,直接返回内存中对象给浏览器.

2. **devServer通过浏览器端文件发生改变**

   在启动devServer时,通过sockjs在服务端和浏览器端建立了一个webSocket通信,以便将webpack编译和打包的各个阶段状态告知浏览器,其中最关键的是webpack-dev-server通过调用webpack的api监听compile的done事件,当compile完成后,webpack-dev-server会通过_sendStatus方法将编译打包后的新模块hash通过socket发送给浏览器端.

3. **webpack-dev-server/client接收到服务端消息做出相应**

   webpack-dev-server修改webpack的入口文件配置,添加webpack-dev-client的代码,以便于在最后打包文件中可以接受到webSocket推送的信息.当webpack-dev-server/client接收到type为hash的消息会将其缓存起来,等到再次接受到type为ok的消息,如果此时没有配置热模块功能,将直接刷新浏览器,如果配置了热模块功能,会将最新的hash值发回webpack,将控制权交给webpack.

4. **当webpack接受到最新的hash值进行验证并请求模块代码**

   webpack/hot/dev-server监听webpack-dev-server/client发送的webpackHotUpdate消息,调用webpack/lib/HotModuleReplacement.runtime进行检测是否有新的更新,在检测的过程中会通过ajax向服务器请求是否有更新的文件,如果有的话会将更新的文件列表返回的浏览器端.并通过jsonp请求最新的模块代码,然后将代码转交给HMR运行时,

5. **HotModuleReplacement.runtime 对模块进行热更新**

   HTR runtime通过模块的id找出过时的模块和依赖,将其删除,然后将最新的模块进行添加.当下次调用webpack_require时就可以获取到最新的代码了.