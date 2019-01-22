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



#### 五层因特网协议栈

其实就是一个概念： **从客户端发出http请求到服务器接收，中间会经过一系列的流程。**

简括就是：

**从应用层的发送http请求，到传输层通过三次握手建立tcp/ip连接，再到网络层的ip寻址，再到数据链路层的封装成帧，最后到物理层的利用物理介质传输。**

```html
1.应用层(dns,http): DNS解析成IP并发送HTTP请求，应用层HTTP协议将规定好的数据放入TCP数据包的数据部分。
2.传输层(tcp,udp): 有了MAC地址和IP地址后，我们还需要端口来知道数据服务于哪个应用。通过UDP协议封装端口信息进入UDP数据包，标头占用8个字节，总长度不超过65535，并将其放入IP数据包的数据部分。但是UDP协议传输上可靠性较差，为了提高网络可靠性，TCP协议诞生了，与UDP摆放的位置时一样的。
3.网络层(IP,ARP): 通过IP能够知道两台电脑是否为同一子网络的机器，如果是同一子网络的机器的话直接通过ARP协议就可以找到对方的MAC地址进行发送数据，否则还需经过网关以及路由协议处理，同样通过IP协议将数据链路层的帧进行再次封装，IP数据包的标头长度为20到60字节，整个数据包总长为65555字节，封装后将其放入以太网数据包。如果IP数据包超过了1500字节，将分开发送。
4.数据链路层(PPP): 通过以太网协议将电信号封装成帧,每个帧分为标头和数据,标头由最初的18字节提升为现在的22字节,数据最短为46字节,最长为1500字节。如果数据很长就需要分包发送。计算机通过MAC地址以及广播的方式找到目标机器
5.物理层: 物理传输,通过双绞线,电磁波等介质将电脑连接
```



#### 总结

DNS

接上文，假设输入的为Google官网，浏览器开启http协议请求线程，应用层通过http协议构建规定格式的数据内容，假定这部分内容为4960字节，它会被嵌入在TCP数据包中。

传输层将接受方Google的HTTP默认端口号80以及本机的端口号(假定为51775)放入TCP标头，加上嵌入的http协议数据包总大小为4980字节。

网络层将TCP包再嵌入IP数据包，IP数据包需要设置双方的IP地址，发送方为本机，接受方为Google.IP数据包标头长度为20，总数据包大小为5000字节。

数据链路层将IP数据包嵌入TCP数据包中，以太网数据包需要通过网络进行ARP协议寻找对方的网关MAC地址，并将其与本地MAC地址共同放入其中。由于以太网数据包数据的部分最大长度为1500字节，而现在IP数据包长度为5000字节，需要进行分割成4个包，因为每个包都有自己的IP标头，所以长度为1500，1500，1500，560.

TCP3次握手





最终将构成数据包进行发送，此数据包由以太数据包内嵌IP数据包再内嵌TCP数据包，以及http协议数据构成，其中http协议数据部分嵌在TCP数据包中，假定这部分数据为4960字节。此时TCP数据包需要设置端口，已知接收方http端口为80，发送方端口是一个随机生成的1024~65535之前的整数，假定为51775字节，TCP标头的大小为20字节，加上嵌入的数据，总共是4980字节。



http://www.ruanyifeng.com/blog/2012/06/internet_protocol_suite_part_ii.html ![img](file:///C:\Users\ADMINI~1\AppData\Local\Temp\%W@GJ$ACOF(TYDYECOKVDYB.png)http://www.ruanyifeng.com/blog/2017/06/tcp-protocol.html ![img](file:///C:\Users\ADMINI~1\AppData\Local\Temp\%W@GJ$ACOF(TYDYECOKVDYB.png)https://blog.csdn.net/weixin_37719279/article/details/82846226 ![img](file:///C:\Users\ADMINI~1\AppData\Local\Temp\%W@GJ$ACOF(TYDYECOKVDYB.png)http://www.dailichun.com/2018/03/12/whenyouenteraurl.html ![img](file:///C:\Users\ADMINI~1\AppData\Local\Temp\%W@GJ$ACOF(TYDYECOKVDYB.png)http://www.dailichun.com/2018/03/12/whenyouenteraurl.html 