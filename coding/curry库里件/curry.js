// // 第一遍实现
// function curry(cb) {
//   let callback = cb;
//   let paramLength = cb.length;
//   let args = [];

//   function _curry(param) {
//     if (param) args.push(param); 

//     if (args.length === paramLength) {
//       let result = callback.apply(callback, args);
//       args.length = 0;
//       return result;
//     }      
//       return _curry;
//   }

//   return _curry
// }
// // 重构后
// function curry(cb) {
//   let args = [].slice.call(arguments, 1);
//   return function () {
//     const newArgs = args.concat(Array.from(arguments));

//     if (newArgs.length < cb.length) {
//       return curry(cb , ...newArgs);
//     } else {
//       return cb(...newArgs);
//     }
//   }
// }

// function add(a, b,c ,d) {
//     return a + b + c + d;
// }
// var curried = curry(add);
// console.log(curried(1)(2)(3)(100));

// // 106
// // 

// function curry(cb) {
//   let args = [].slice.call(arguments, 1);
//   return function() {
//     const newArgs = args.concat(Array.from(arguments));

//     if (newArgs.length < cb.length) {
//       return curry(cb, ...newArgs);
//     } else {
//       return cb(...newArgs);
//     }
//   }
// }

// function curry(cb) {
//   let args = [].slice.call(arguments, 1);
//   return function() {
//     const newArgs = args.concat(Array.from(arguments));
//     if (newArgs.length < cb.length) {
//       return curry(cb, ...newArgs);
//     } else {
//       return cb(...newArgs);
//     }
//   }
// }


// function curry(cb) {
//   let args = [].slice.call(arguments, 1);
//   return funtcion() {
//     const newArgs = args.concat(Array.from(arguments));
//     if (newArgs.length < cb.length) {
//       return curry(cb, ...newArgs);
//     } else {
//       return cb(...newArgs);
//     }
//   }
// }

// function curry(cb) {
//   let args = [].slice.call(arguments, 1);
//   return function() {
//     const newArgs = args.concat(Array.from(arguments));
//     if (newArgs.length < cb.length) {
//       return curry(cb, ...newArgs);
//     } else { 
//       return cb(...newArgs);
//     }
//   }
// } 

function curry(cb) {
  let args = [].slice.call(arguments, 1);
  return function() {
    const newArgs = args.concat(Array.from(arguments));
    if (newArgs.length < cb.length) {
      return curry(cb, ...newArgs);
    } else {
      return cb(...newArgs);
    }
  }
}