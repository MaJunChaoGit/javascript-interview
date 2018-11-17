### JavaScript数据类型



#### 序言



数据类型往往是学习一门编程语言的第一节课，数据类型的重要程度首当其冲。本文试图给各位初学JavaScript的看官讲明白这门语言中的数据类型，并且尽可能丰富内容，让已经学过这门语言的同行们可以查漏补缺，巩固自己的基础。



---



#### 数据类型的重要性



数据类型构成程序的重要基础要素，一个房子的建成少不了大小不一、颜色各异的砖瓦，数据类型就是开发程序的砖瓦。

数据类型是对程序所处理的数据的抽象，并且数据类型决定了数据的含义、表示方式、存储格式和运算。



> 我们如果在程序中要表示一个人的特征，他的特征中包含了姓氏、名字与年龄。那么我们会很自然的用int型表示他的年龄，string类型表示他的姓和名，这就是数据的抽象。
>
> 而当我们需要计算他和妻子年龄和的时候，两个int数据类型相加即整数的相加就代表了年龄和。或者当我们要得到其完整的姓名时,姓的数据类型与名的数据类型相加即字符串拼接则是完整的姓名，这就是数据的运算。
>
> 又或者比如我们将数字123456789以文本字符串的形式存储，它会占用9个字节，而以int型保存的话只需要占用4个字节的存储空间，这就是数据的存储格式。

虽然我只是列举了部分语言中的数据类型的部分意义与作用，但是其重要性亦可见一斑。



----



#### JavaScript是弱类型，动态类型检查语言



在类型系统中还有一个重要的概念，就是类型检查。

>类型检查的目的就是保证了程序遵循了语言的数据类型相容规则，违背这种规则的情况称为类型冲突

我们从数据类型的检查方式上将语言概括的分为强类型语言，弱类型语言，静态类型语言，动态类型语言。

> 例如，在编译阶段强制检查数据类型的语言大部分都是强类型语言，如: Java,C#等
>
> 而在运行时检查的大都是弱类型语言，如: JavaScript,PHP等

当然网上对于类型系统的一些概念，众说纷坛，不好严格定义，但是JavaScript是弱类型，动态类型检查几乎没有争议。

我们先看下何为弱类型，动态类型检查语言，有以下代码：

```javascript
var foo = 0;
typeof foo  // number
foo = "123";
typeof foo  // string
foo = true;
typeof foo; // boolean
```

在JavaScript中初始变量我们不需要像在其他强类型语言中需要明确指出变量类型为int,类似int foo = 0，并且当变量类型改变时，不需要重新初始化变量，直接修改即可

所有的类型的检查都是在JavaScript运行时做检查的，我们的写法*遵循了语言的数据类型相容规则*，并且对于强类型语言来说JavaScript语言的优势之一就是"灵活"。



---



#### JavaScript中的数据类型

根据最新的 ECMAScript 标准定义了7种数据类型：

- 6种[原始类型](https://developer.mozilla.org/en-US/docs/Glossary/Primitive)
  - [Boolean](https://developer.mozilla.org/en-US/docs/Glossary/Boolean)
  - [Null](https://developer.mozilla.org/en-US/docs/Glossary/Null)
  - [Undefined](https://developer.mozilla.org/en-US/docs/Glossary/Undefined)
  - [Number](https://developer.mozilla.org/en-US/docs/Glossary/Number)
  - [String](https://developer.mozilla.org/en-US/docs/Glossary/String)
  - [Symbol](https://developer.mozilla.org/en-US/docs/Glossary/Symbol) (ECMAScript 6新定义)
- 和 [Object](https://developer.mozilla.org/en-US/docs/Glossary/Object)



---



#### 原始类型

除了Object类型以外的所有类型**都是不可变的 (值本身无法改变)**

> JavaScript中对字符串的操作一定是返回了一个新的字符串，而原始字符串并没有被改变

我们称这些类型为"原始类型"。而原始类型分配的**内存空间为栈(stack)内存空间**。



- **Boolean类型**

  1. Boolean类型表示一个逻辑实体，它有两个值`true`和`false`。

  2. Boolean类型主要与条件语句相关联，条件语句通过程序员指定布尔条件来允许进行不同的操作。

  3. Boolean类型可以追溯到19世纪中期，伟大的英国数学家[George Boole](https://en.wikipedia.org/wiki/George%20Boole) 首次定义了一个逻辑系统。

     >在JavaScript中逻辑运算时还有Falsy与Truthy的概念，即不仅仅 true和false可以作为运算，所有类型的值都可以用作逻辑运算。
     >
     >Falsy的值，当进行逻辑判断时均为false。Falsy值包括：false、undefined、null、+0、-0、NaN、""。
     >
     >Truthy的值，当进行逻辑判断均为true。这里Truthy的值为Falsy的补集，即所有剩下的值。需要注意的是Infinity、空数组，"0"都是Truthy值。 

- **Null类型**

  Null类型只有一个值：`null`

  

- **Undefined类型**

  一个没有被赋值的变量会有个默认值`undefined`

  

- **Number类型**











http://linianhui.cnblogs.com/p/plp-04-datatypes.html

https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Data_structures