### JavaScript数据类型

[TOC]

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

当然网上对于类型系统的一些概念，众说纷坛，不好严格定义，但是JavaScript是弱类型，动态类型检查语言几乎没有争议。

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

- 6种 [原始类型](https://developer.mozilla.org/en-US/docs/Glossary/Primitive)
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

  ​

- **Null类型**

  1. Null类型只有一个值：`null`

  2. MDN上对Null类型的定义主要体现在**generally intentionally**，也就是说Null类型通常是程序级别的，是程序员自主的行为，它就是表示空的对象指针。

     >In computer science, a **null** value represents a reference that points, generally intentionally, to a nonexistent or invalid [object](https://developer.mozilla.org/en-US/docs/Glossary/object) or address. The meaning of a null reference varies among language implementations.

  3. ```javascript
     typeof null === 'object' // true
     // 这里是一个遗留的bug问题，null就应该是null，因为它是一个原始类型的值
     ```




- **Undefined类型**

  1. `undefined` 表示一个没有赋值的变量，

  2. 函数没有返回值时，默认返回`undefined`

  3. 一个并不存在的对象属性为`undefined`

  4. 函数定义形参不传值，默认就是`undefined`

  5. 在判断变量是否为`undefined`时,最好使用`typeof`进行判断,避免变量未定义时出现的潜在问题

     ```javascript
     var foo;
     foo === undefined // true
     // 这里的bar没有定义
     bar === undefined // Uncaught ReferenceError: bar is not defined
     // 我们换成typeof
     typeof bar === "undefined" // true
     ```

  6. 在变量提升阶段，只声明未定义，默认就是`undefined`。

     ```javascript
     function foo() {
       console.log(bar); // undefined
       var bar = 1;
       console.log(bar); // 1
     }
     foo();
     ```

     为了避免变量提升时的undefined所带来的潜在问题,我们可以使用let或者const定义变量。

     ```javascript
     function foo() {
       console.log(bar); // Uncaught ReferenceError: bar is not defined
       var bar = 1;
       console.log(bar);
     }
     foo();
     ```


  ​

- **Number类型**

  1. JavaScript采用 **"IEEE 754 标准定义的双精度64位二进制格式的值"**表示数值，它的范围是-(2<sup>63</sup>-1)到2<sup>63</sup>-1。


  2. 与其他编程语言不同的是,它并没有专门去区分浮点数和整数，也就是说我们在进行数字运算时一定要特别注意精度缺失的问题

     >我们可以使用 [`Number.MAX_SAFE_INTEGER`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Number/MAX_SAFE_INTEGER) 和 [`Number.MIN_SAFE_INTEGER`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Number/MIN_SAFE_INTEGER) 或者 [`Number.isSafeInteger()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Number/isSafeInteger) 来检查值是否在安全的整数取值范围内。 超出这个范围，JavaScript 中的数字不再安全了。

     ```javascript
     0.3 + 0.6 = 0.8999999999999999;
     0.3 + 0.6 === 0.9 // false
     ```

     上述的浮点数类型精度就已经缺失了,那么我们如何去对浮点数进行运算呢?

     ES6中引入ε，即Number.EPSILON，它代表一个极小的常量，**它表示1与大于1的最小浮点数之间的差**。

     那么让我们看看如何去使用这个常量修改上面的判断吧！

     ```javascript
     // 我们为比较浮点类型部署了一个误差检查函数,当小于2的-52次方时就判断两者相同
     function floatCompare(left, right) {
     	return Math.abs(left - right) < Number.EPSILON;
     }

     floatCompart(0.3 + 0.6, 0.9); // true
     ```

  3. 除了表示浮点数，Number类型中还有一些带符号的值: `+Infinity`，`-Infinity` 和 `NaN`

     >你可以使用常量 [`Number.MAX_VALUE`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Number/MAX_VALUE) 和 [`Number.MIN_VALUE`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Number/MIN_VALUE)来检查值是否大于或者小于`+/-Infinity`

  4. 特别需要注意的是在一个数除以0的时候有不同的情况

     ```javascript
     42 / +0; // Infinity
     42 / -0; // -Infinity
     ```

  Number类型的内容比较多，暂时先说到这里吧，把一些部分留到后面的Number精讲和类型转换中。

  ​

- **String类型**

  1. JavaScript的String类型用于表示文本数据。它是一组16位的无符号整数值的“元素”。在字符串中的每个元素占据了字符串的位置。第一个元素的索引为0，下一个是索引1，依此类推。字符串的长度是它的元素的数量。

  2. JavaScript 的字符串类型是不可更改的。这意味着字符串一旦被创建，就不能被修改。但是，可以基于对原始字符串的操作来创建新的字符串。例如：

     ```javascript
     var str = "foo";
     var otherStr = str.concat("-bar");
     console.log(str) // "foo";
     console.log(otherStr) // "foo-bar";
     // 可以看到原有的字符串没有被改变,而是重新创建了字符串otherStr并给其赋值为"foo-bar"
     ```

  String类型主要在其中API的应用，基础概念先到此为止，后续会有关于String类型的API讲解文章。

  

- **Symbol类型**

  1. ES6引入了一种新的原始数据类型Symbol，表示独一无二的值。
  2. ES6之前，对象的属性名只有字符串一种，而ES6新增了Symbol类型，它通过Symbol()这个函数生成，它是一个原生数据类型，不是一个对象！

  Symbol无需多说，直接看[阮大的文章](http://es6.ruanyifeng.com/#docs/symbol)

  

---



#### 特殊的Object类型

Object类型是指内存中可以被标识符引用的一块区域。

而Object类型分配的与原始数据类型稍有不同，**内存空间为栈(stack)内存空间中存储了指针,该指针指向了堆(heap)中存储的Object类型数据，解释器启动时会先寻找栈中的地址，取得地址后从堆中取得对应的实体**。

![img](http://upload-images.jianshu.io/upload_images/599584-8e93616d7afcf811.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

引用自[大佬的文章中的内存空间图解](http://www.cnblogs.com/dreamingbaobei/p/9815962.html)

在JavaScript中，对象可以被看做是一组属性的集合，它可以通过字符串或者Symbol的属性名来访问属性值，并且这些属性可以自由增减。

ECMAScript定义的对象中有两种属性：数据属性和访问器属性。 



- **数据属性**

  数据属性是键值对，并且每个数据属性拥有下列特性:

  **数据属性的特性(Attributes of a data property)**

  | 特性             | 数据类型           | 描述                                                         | 默认值    |
  | ---------------- | ------------------ | ------------------------------------------------------------ | --------- |
  | [[Value]]        | 任何Javascript类型 | 包含这个属性的数据值。                                       | undefined |
  | [[Writable]]     | Boolean            | 如果该值为 `false，`则该属性的 [[Value]] 特性 不能被改变。   | true      |
  | [[Enumerable]]   | Boolean            | 如果该值为 `true，`则该属性可以用 [for...in](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...in) 循环来枚举。 | true      |
  | [[Configurable]] | Boolean            | 如果该值为 `false，`则该属性不能被删除，并且 除了 [[Value]] 和 [[Writable]] 以外的特性都不能被改变。 | true      |

  **过时的属性(在ECMAScript 3定义的, 在ECMAScript 5被重命名) **

  | 属性       | 类型    | 描述                                          |
  | ---------- | ------- | --------------------------------------------- |
  | Read-only  | Boolean | ES5 [[Writable]] 属性的反状态(Reversed state) |
  | DontEnum   | Boolean | ES5 [[Enumerable]]  属性的反状态              |
  | DontDelete | Boolean | ES5 [[Configurable]] 属性的反状态             |

  

- **访问器属性**

  访问器属性有一个或两个访问器函数 (get 和 set) 来存取数值，并且有以下特性: 

  | 特性             | 类型                   | 描述                                                         | 默认值    |
  | ---------------- | ---------------------- | ------------------------------------------------------------ | --------- |
  | [[Get]]          | 函数对象或者 undefined | 该函数使用一个空的参数列表，能够在有权访问的情况下读取属性值。另见 `get。` | undefined |
  | [[Set]]          | 函数对象或者 undefined | 该函数有一个参数，用来写入属性值，另见 `set。`               | undefined |
  | [[Enumerable]]   | Boolean                | 如果该值为 `true，则该属性可以用` [for...in](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...in) 循环来枚举。 | true      |
  | [[Configurable]] | Boolean                | 如果该值为 `false，则该属性不能被删除，并且不能被转变成一个数据属性。` | true      |



> **注意：这些特性只有 JavaScript 引擎才用到，因此你不能直接访问它们。所以特性被放在两对方括号中，而不是一对。**



对象的知识点不仅仅如此，也会另外单独写一篇文章来讲解。

#### 总结

对于JavaScript，基础类型以及一些基础的知识就差不多了，本文抛砖引玉，希望能够帮助到更多的人。

以下是文章的中部分观点的引用，侵删致歉。



http://linianhui.cnblogs.com/p/plp-04-datatypes.html

https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Data_structures