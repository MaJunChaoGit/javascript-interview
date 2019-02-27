// 有如下代码,请问输出什么
// for (var i = 0; i < 5; i++) {
//   setTimeout(function() {
//     console.log(i); // 5 5 5 5 5
//   }, 1000);
// }

// 如果希望可以正常输出应该怎么改
// 1.通过闭包
// for (var i = 0; i < 5; i++) {
//  (function(i) {
//   setTimeout(function() {
//     console.log(i);
//   }, 1000);
//  })(i)
// }

// 2.通过传递参数
// function output(i) {
//   setTimeout(function() {
//     console.log(i);
//   }, 1000);
// }

// for (var i = 0; i < 5; i++) {
//   output(i);
// }
// 3. 通过let
// for (let i = 0; i < 5; i++) {
//   setTimeout(function() {
//     console.log(i);
//   }, 1000);
// }

// 如果期望代码的输出变成 0 -> 1 -> 2 -> 3 -> 4 -> 5，并且要求原有的代码块中的循环和两处 console.log 不变，该怎么改造代码？

// const task = [];
// const output = (i) => new Promise(resolve => {
//   setTimeout(() => {
//     console.log(i);
//     resolve();
//   }, 1000);
// });
// for (var i = 0; i < 5; i++) {
//   task.push(output(i));
// }
// Promise.all(task).then(resolve => {
//   console.log(i);
// });