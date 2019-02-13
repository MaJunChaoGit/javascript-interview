### Webpack面试题

1. **为什么要用webpack?**

   随着时代的推进,作为一个前端程序员,我们以往使用的前端三件套已经不能满足于我们的要求了.比如说,我们使用Vue,React等应用框架提高了我们的开发效率,但是这些框架又要求用一些规定的文件格式去编写组件,模块等,如.vue,.jsx文件等.这些文件浏览器是无法认识的,需要进行特定的解析才能给浏览器使用,也就是说在使用这些框架的同时还额外多出一些编译的模块需要被安装及使用.

   再比如说传统的css样式复用性及维护是很麻烦的,与之而来的less,scss等面向对象的样式也同样需要进行编译的过程才能被浏览器使用,甚至于程序员们已经不能满足于js,在项目中加入的flow,typescript等强类型的语法.这些上述所有都模块最终都要服务于浏览器,手动去维护这些模块不现实,而webpack强大的功能恰恰好能帮我们解析上述流程.

2. **使用了哪些Plugin,用来解决什么问题?**

   - HotModuleReplacementPlugin

     热加载模块主要是用来解决团队开发效率以及开发体验,通过热加载模块,webpack会自动帮我们更新改变的内容,样式等.

   - CopyWebpackPlugin

     拷贝模块主要是解决我们在开发SDK包中,有一些静态文件需要发布到最终打包文件路径下.

   - GenerateAssetPlugin

     我主要通过该模块与localStorage结合,生成形成一套前端的配置文件.

   - DefinePlugin

     主要通过该模块进行编译期间的全局变量定义,通过这些变量会对这个webpack打包的流程和代码编译进行干涉,可以做到一些选择性的打包.

   - OtherPlugin

     当然还有一些常用的如压缩混淆代码,Vue组件插件,Webpack进度条,HTML模板生成,CSS样式提出,SASS和LESS的单独提出等插件也经常使用.

3. 使用了哪些Loader,用来解决什么问题?

   - worker-loader

     该loader主要用于让工程可以更好的支持webWoker特性

   - url-loader

     根据文件的大小,对字体和图片进行base64的转码,减少网络上的请求

   - babel-loader

     可以支持jsx,es6等语法,并通过webpack与babel整合生成浏览器兼容的es5语法

   - vue-loader

     用于解析vue文件

4. **Loader和Plugin 的不同?**

   loader主要是用于加载转化一些webpack资深无法加载的文件,如jsx,vue等.他的作用的加载,并作用于一个个文件上.

   plugin的作用是用于拓展一些webpack的功能,它将直接作用与webpack之上,相比于loader只专注于解析加载文件,plugin的功能更加的丰富.

5. **webpack热更新的实现?**

6. **webpack优化**

   - 项目主要是基于Cesium框架做的一些修改与扩展,Cesium库打包后也非常庞大,我们使用externals进行优化,让webpack避免重复打包该库,并且让其可以通过es6的import进行引入
   - 使用happypack对loader的执行过程从单一进程的形式拓展为多进程模式,从而在不修改配置的情况下提提高了编译过程的速度
   - 使用uglify对代码进行压缩,减少代码下载的时间
   - 通过commonsChunkPlugin对js代码进行分割,并通过require.ensure进行按需加载

7. **webpack的构建流程?**

