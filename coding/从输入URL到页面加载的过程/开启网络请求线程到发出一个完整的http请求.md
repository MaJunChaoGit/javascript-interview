### 输入URL到页面加载——开启网络请求线程到发出一个完整的http请求



#### 解析URL

URL一般包括几大部分：

- protocol：协议头，比如https、htpp、ftp等
- host：主机域名或IP地址
- port：端口号
- path：目录路径
- query：查询参数，比如 a=1&&b=2
- fragment：即#后的hash值，一般用来定位到某个位置





#### 网络请求都是单独的线程

每次网络请求时都需要开辟单独的线程进行，比如如果URL解析到http协议，就会新建一个网络线程去处理资源下载。

因此浏览器会根据解析出得协议，开辟一个网络线程，前往请求资源。



#### DNS查询得到IP

如果输入的是域名，需要进行dns解析成IP，会经历以下流程

1. 如果浏览器缓存命中，直接使用浏览器缓存
2. 如果浏览器没有缓存，找寻本地缓存
3. 如果本地还没有，就向DNS服务器进行查询，查询到对应的IP

在这个过程中，DNS服务器解析过程是非常耗时的，因此如果解析域名过多，会让首屏加载变得过慢，这里会用到`dns-prefetch`优化



http://www.ruanyifeng.com/blog/2012/06/internet_protocol_suite_part_ii.html ![img](file:///C:\Users\ADMINI~1\AppData\Local\Temp\%W@GJ$ACOF(TYDYECOKVDYB.png)http://www.ruanyifeng.com/blog/2017/06/tcp-protocol.html ![img](file:///C:\Users\ADMINI~1\AppData\Local\Temp\%W@GJ$ACOF(TYDYECOKVDYB.png)https://blog.csdn.net/weixin_37719279/article/details/82846226 ![img](file:///C:\Users\ADMINI~1\AppData\Local\Temp\%W@GJ$ACOF(TYDYECOKVDYB.png)http://www.dailichun.com/2018/03/12/whenyouenteraurl.html ![img](file:///C:\Users\ADMINI~1\AppData\Local\Temp\%W@GJ$ACOF(TYDYECOKVDYB.png)http://www.dailichun.com/2018/03/12/whenyouenteraurl.html 