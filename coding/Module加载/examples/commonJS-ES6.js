// CommonJS和ES6有两个重大差异
// 1.CommonJS输出的是一个值的拷贝,ES6输出的是值的引用
// 2.CommonJS是运行时加载,ES6是编译时输出接口
// 第二点差异是因为CommonJS加载的是一个对象,即module.exports属性,该对象只有在运行完成时生成
// ES6模块不是对象,它的对外接口是一种静态定义,在代码静态解析阶段就会生成

// 下面重点解释第一个差异
// CommmonJS模块输出的值的拷贝,也就是说,一旦输出一个值,模块内部的变化就影响不到这个值
// 因为这里mod.counter是一个原始类型的值,他会被缓存,除非写成一个函数,才能得到内部变动的值
// var mod = require('./lib.js');

// console.log(mod.counter); // 3
// mod.incCounter();
// console.log(mod.counter); // 3

// ES6的import有点像 Unix系统的"符号链接",原始值变了,import加载的值也会跟着变,他是动态引用,并不会缓存值
import { counter, incCounter } from './lib.js';

console.log(counter); // 3
incCounter();
console.log(counter); // 4
