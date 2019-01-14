### CSS实现图片自适应布局



#### 最轻松的写法



```html
<div class="container">
    // 这里图片尺寸为440X440像素，
	<img src="./images/medium.jpg" alt="test">
</div>

<style>
  .container {
    width: 600px;
    height: 600px;
    border: 1px solid red;
  }
  .container > img {
    width: 100%;
    height: 100%;
  }
</style>
```

只要图片的父级图片宽高不是固定的，图片就能很简单的自适应容器大小了。

![case1](C:\Users\Administrator\Desktop\前端学习血汗屎\javascript-interview\coding\CSS实现图片自适应\images\case1.png)

不过，通过图片我们可以看出，440X440像素的图片完全填满了600X600的容器，图片被拉伸了，可能无法满足需求了。



#### 不会拉伸图片你的写法



```html
<div class="container">
    // 这里图片尺寸为440X440像素，
	<img src="./images/medium.jpg" alt="test">
</div>

<style>
  .container {
    width: 600px;
    height: 600px;
    border: 1px solid red;
  }
  .container > img {
    max-width: 100%;
    max-height: 100%;
  }
</style>
```

与第一个例子相比的话，我们其实就是将width，height改为了max-width，max-height而已，其中的区别就是width，height是基于父级元素作为计算的，而max-width，max-height是根据图片自身大小来计算的，效果见下图：

![case2](C:\Users\Administrator\Desktop\前端学习血汗屎\javascript-interview\coding\CSS实现图片自适应\images\case2.png)

图片到是没有拉伸了，但是对于父级容器相比图片过大，这种方法显然不使用了。



#### CSS3 image-set属性

平时我们通过js检查容器宽度,然后加载不同分辨率的图片。

通过HTML5的新特性我们同样也可以实现。

```css
.container {
  width: 600px;
  height: 600px;
  border: 1px solid red;

  background-repeat: no-repeat;
  background-image: url('./images/medium.jpg');

  background: -webkit-image-set(url('./images/small.jpg') 1x, url('./images/medium.jpg') 2x) 0 0 no-repeat;
  background: image-set(url('./images/small.jpg') 1x, url('./images/medium.jpg') 2x) 0 0 no-repeat;
}
```

这里的background-image只是起到了一个备用的作用，真正发挥作用的是image-set属性，url指定图片的路径,后面1px表示设备像素比为1时显示该url指定的图片。

![img](file:///C:\Users\Administrator\AppData\Roaming\Tencent\Users\354488954\QQ\WinTemp\RichOle\$Z$U_T_~%4L@ZMA3%FD_84A.png)

在电脑设备上通过浏览器打开后，1x像素比的图片如期加载。我们通过chrome改变下设备像素比来看看，2x像素比图片是否正常工作![img](file:///C:\Users\Administrator\AppData\Roaming\Tencent\Users\354488954\QQ\WinTemp\RichOle\%D2F5O~BNXZ9~7BBGT~DA}O.png)



可以看到的是，我们模拟的移动设备图片也正常的加载了。

![img](file:///C:\Users\Administrator\AppData\Roaming\Tencent\Users\354488954\QQ\WinTemp\RichOle\UO7H@1[UTH362CDN]RJB5CQ.png)

image-set可以很轻松的帮我们解决掉移动端图片的问题，但是它最为致命的问题是兼容性目前并不高。

那么我们有没有更好的方式去解决问题呢？



#### HTML5 srcset属性



```html
<div class="container">
  <img srcset="images/small.jpg 800w, images/medium.jpg 1024w, images/big.jpg 1440w">
</div>
```

上面的例子表示浏览器宽度达到 800px 则加载 small.jpg ，达到 1024px则加载 medium.jpg，达到1440px则加载big.jpg。

srcset可以实现媒体查询的功能，具体细节就不深入了，这里只是抛砖引玉而已，有兴趣的朋友可以移步[张鑫旭大佬的博客](https://www.zhangxinxu.com/wordpress/2014/10/responsive-images-srcset-size-w-descriptor/)。

