### JavaScript中的Number

[TOC]

#### 序言



**数值精度怎么缺失了 ？**

在[JavaScript的数据类型](https://blog.csdn.net/m0_37972557/article/details/84284477)一文中`Number`的部分介绍中我们遇到了以下问题，当时是以`Number.EPSILON `辅助最终解决了问题。

```
0.1 + 0.2 = 0.30000000000000004;
0.1 + 0.2 === 0.3; // false
```

但是到底是什么问题导致这样的结果呢，让我们往下看。



---



#### 概述

- **整数还是浮点数 ?**

  *对于JavaScript语言来说，所有数字都是以64位浮点数形式储存，即便整数也是如此。也就是说，JavaScript的底层中所有数字都是以64位浮点数进行表示。*

  那么，JavaScript中到底有整数没？

  > 当JavaScript在运行位运算的时候，此时会自动把64位浮点数，转成32位整数，然后再进行位运算

  也就是说，如果其中一个运算子不是32位带符号整数，将会自动转为32位带符号整数后再执行位运算，并且返回值也是32位带符号的整数。

  ```javascript
  function toInt32(x) {
  	return x | 0;
  }
  ```

  上面的函数的意思是将参数转为32位整数，并且无论是整数还是小数。

  ```javascript
  toInt32(1) // 1
  toInt32(-1) // -1
  toInt32(1.9999) // 1
  toInt32(1.0001) // 1
  toInt32(Math.pow(2, 32) + 1) // 1
  toInt32(Math.pow(2, 32) - 1) // -1
  ```

  对于一般的整数，返回值不会有所变化。对于大于2<sup>32</sup>的整数，大于32位的整数的数位都会被舍去。


- ​



https://blog.csdn.net/u013347241/article/details/79210840

####Number的不同进制表示方法

####Number不同进制的转换

####Number中的常量

####Number的常用方法

#### Math对象中的方法

https://www.cnblogs.com/fangchunying/p/9022783.html

https://en.wikipedia.org/wiki/IEEE_754-1985

http://javascript.ruanyifeng.com/grammar/number.html

https://blog.csdn.net/charles_neil/article/details/59125861

https://blog.csdn.net/sinat_36521655/article/details/81911329

https://blog.csdn.net/a2296096931/article/details/51213543

https://www.cnblogs.com/youyoui/p/8423199.html 

https://segmentfault.com/a/1190000008268668