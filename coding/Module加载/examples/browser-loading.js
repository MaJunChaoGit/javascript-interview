// 传统方法是用<script>标签加载JavaScript脚本
// 1.页面内嵌的脚本
// <script type="application/javascript">
// </script>

// 2.引用外部的脚本
// <script type="application/javascript" src="path/to/script.js"></script>

// 但是默认情况下,渲染引擎遇到了<script>就会停下来,等到执行完脚本,再继续进行渲染
// 如果是外部脚本,还必须加入脚本下载的时间
// 如果脚本很大的话,就会造成浏览器的阻塞,所以浏览器允许脚本异步下载

// 1.defer
// <script src="path/to/script.js" defer></script>
// 2.async
// <script src="path/to/script.js" async></script>
// 两者的区别是
// defer是等到整个页面全部渲染结束,才会执行。如果有多个defer的话,那么就会在渲染完按照顺序执行
// async是一旦下载完脚本就立即执行,如果有多个async,由于不能确定下载时间,所以顺序无法保证

// 浏览器加载ES6模块,也可以使用<script>标签,但是要加入type="module"属性,加入了该属性就相当于加入了defer属性
// <script src="path/to/script.js" type="module"></script>
// 当然也可以使用 async属性,效果就跟async一样了。

// 使用外部的模块脚本，有几点需要注意
// 1.代码是在模块作用域之中运行,而不是在全局作用域运行.模块内部的顶层变量,对外是不可见的
// 2.模块脚本自动采用严格模式，不管有没有声明use strict
// 3.模块内部可以使用import加载其他模块, .js 不可以省略,需要提供绝对URL和相对URL,也可以使用export对外输出接口
// 4.模块内顶层的this不指向window,而是undefined
// 5.同一个模块加载多次,只执行一次
// 6.利用this !== undefined可以判断是否在ES6模块中
