// 1.递归版本 s4
// function fibnacci(n) {
//   if (n <= 1 ) {
//     return 1;
//   }
 
//   return fibnacci(n - 1) + fibnacci(n - 2);
// }

// 2.递归缓存版本 s1
// var temp = {};
// function fibnacci(n) {
//   if (n <= 1 ) {
//     return 1;
//   }
//   let pre = getCache(n -1);
//   let next = getCache(n - 2);
//   if (!pre) {
//     pre = fibnacci(n - 1);
//     setCache(n -1, pre);
//   }
//   if (!next) {
//     next = fibnacci(n - 2);
//     setCache(n - 2, next);
//   }

//   if(pre && next) {
//     setCache(n, pre + next);
//     return pre + next;
//   } else {
//     return fibnacci(n - 1) + fibnacci(n - 2);
//   }
// }

// function getCache(n) {
//   return temp[n];
// }

// function setCache(n, value) {
//   temp[n] = value;
// }

// 3.递归尾调用 s2
// function fibnacci (n , ac1 = 1 , ac2 = 1) {
//   if( n <= 1 ) {return ac2};
//   return fibnacci (n - 1, ac2, ac1 + ac2);
// }

// 4.generator版本 s3
// function* fib() {
//   let [pre, curr] = [1, 1];
//   while(true) {
//     [pre, curr] = [curr, pre + curr];
//     yield curr;
//   }
// }
// function fibnacci(n) {
//   if (n === 1 || n === 2) return 1;
//   let ac = 0;
//   let fibo = fib();
//   for (var i = 2; i < n; i++) {
//     ac = fibo.next();
//   }
//   return ac.value;
// }