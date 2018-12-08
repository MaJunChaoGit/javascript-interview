import './commonJS-ES6.js';

// ES6模块加载CommonJS模块
// CommonJS模块的输出都定义在module.exports属性上,Node的import命令加载CommonJS模块
// Node自动将module.exports属性,当做模块的默认输出,即等同于export default xxx

// import baz from './a_CommonJS.js';
// console.log(baz); // {foo: "hello", bar: "world"}

// import { default as baz } from './a_CommonJS.js';
// console.log(baz); // {foo: "hello", bar: "world"}

// import * as baz from './a_CommonJS.js';
// console.log(baz); // {foo: "hello", bar: "world", default: {…}}.

// 当使用第三种写法时,导出的其实是一个对象,如果要像获得module.exports时,需要使用,对象.default

// CommonJS加载ES6模块
const es_namespace = import('./b_ES6.js');
console.log(es_namespace);
