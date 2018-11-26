####目录

[TOC]

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

  对于一般的整数，返回值不会有所变化。对于大于2<sup>32</sup>的整数，大于32位的整数的数位都会被去。



####Number数值精度

####Number的不同进制表示方法

####Number不同进制的转换

####Number中的常量

####Number的常用方法

#### Math对象中的方法





http://javascript.ruanyifeng.com/grammar/number.html



https://blog.csdn.net/a2296096931/article/details/51213543



