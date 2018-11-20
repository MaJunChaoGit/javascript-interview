### JavaScript中的Number

[TOC]

#### 序言



**数值精度怎么缺失了 ？**

在[JavaScript的数据类型](https://blog.csdn.net/m0_37972557/article/details/84284477)一文中`Number`的部分抛出了以下代码，并以`Number.EPSILON `辅助最终解决了问题。

```
0.3 + 0.6 === 0.9 // false
```

那么到底是什么问题导致这样的结果呢，我们首先得弄明白JavaScript中使用的数据标准是什么？



---



#### 概述

- **整数还是浮点数 ?**

  *对于JavaScript语言来说，所有数字都是以64位浮点数形式储存，即便整数也是如此。也就是说，JavaScript的底层中所有数字都是以64位浮点数进行表示。*

  那么，JavaScript中到底有整数没？

  > 当JavaScript在运行位运算的时候，此时会自动把64位浮点数，转成32位整数，然后再进行位运算

  也就是说，如果一个运算子不是32位带符号整数，将会自动转为32位带符号整数后再执行位运算，并且返回值也是32位带符号的整数。

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


- IEEE 754国际标准

  根据国际标准 IEEE 754，JavaScript浮点数为64个二进制位，他的构成是如下图所示。

  ![img](https://img-blog.csdn.net/20180821174847621?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3NpbmF0XzM2NTIxNjU1/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70)

  - 第1位：符号位，`0`表示正数，`1`表示负数

  - 第2位到第12位（共11位）：指数部分，指数部分一共有11个二进制位，最大是11个1，即范围为0到2047。

  - 第13位到第64位（共52位）：尾数部分（即有效数字）

    ​

  对于人类计算来说，浮点数0.0011可以表示成`1.1 x 2<sup>-3</sup>`，也可以表示成`11 x 2<sup>-4</sup>`。但是对于计算机的计算就必须有一个规范去统一。

  因为排除了`0`之外所有的二进制浮点数都从`1`开始，那么为了得到额外了1位精度，因此IEEE 754规定，如果指数部分的`偏移`后的值只要在`0`到`2047`之间（不含两个端点），有效数字的第一位默认总是`1`，并且这个数字不会保存在64位浮点数之中。

  ​

  > 关于指数部分为什么要偏移,并且是0到2047这个范围，下文会做解释。

    

  也就是说，尾数部分将是`1.fffff...`的形式，其中`fffff...`的部分保存在有效数字部分（13位到64位），最长为52位。因此，JavaScript提供的有效数字最长为（52 + 1）的二进制位。

    

  通过上述结论我们可以得到以下公式，我们一起来先看看公式。

  ```
    (-1) ^ 符号位 * 1.fffff... * 2 ^ 指数部分
  ```

  比如我们使用`4399`这个十进制数我们套用上述公式，反推得到以下结果。

  首先我们将`4399`转为2进制数`1000100101111`，因为是正数，那么符号位为 `0`。

  然后我们根据正规化的二进制浮点数表达，那么它以`1.fffff...`这种形式表达就是为`1.000100101111 x 2<sup>12</sup>`

  因此可以得出尾数部分为：`000100101111`。

  指数`12`经过偏移加上`1023`换算为：`10000001011`。

  最终在计算机中存储的结果为： 0-10000001011-00010010111100...

https://blog.csdn.net/u013347241/article/details/79210840

####Number的不同进制表示方法

####Number不同进制的转换

####Number中的常量

####Number的常用方法

#### Math对象中的方法

https://en.wikipedia.org/wiki/IEEE_754-1985

http://javascript.ruanyifeng.com/grammar/number.html

https://blog.csdn.net/charles_neil/article/details/59125861

https://blog.csdn.net/sinat_36521655/article/details/81911329

https://blog.csdn.net/a2296096931/article/details/51213543

https://www.cnblogs.com/youyoui/p/8423199.html 