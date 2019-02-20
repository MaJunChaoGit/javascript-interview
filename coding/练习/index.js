function curry(cb) {
  let args = [].slice.call(arguments, 1);
  return function() {
    let newArgs = args.concat(Array.from(arguments));
    if (newArgs.length < cb.length) {
      return curry(cb, ...newArgs);
    } else {
      return cb(...newArgs);
    }
  }
}

Array.prototype.map = function(cb){
  let newArr = [];
  for (var i = 0; i < this.length; i++) {
    newArr.push(cb(this[i], i, this));
  }
  return newArr;
};

Array.prototype.reduce = function(cb, initValue){
  let index;
  let length = this.length;
  let value;
  let isValueSet = false;
  if (arguments.length > 1) {
    value = initValue;
    isValueSet = true;
  }
  for (index = 0; index < length; index++) {
    if (isValueSet) {
      value = cb(value, this[index], index, this);
    } else {
      value = this[index];
      isValueSet = true;
    }
  }
  return value;
};

function deepClone(obj) {
  if (typeof obj !== 'object') return obj;
  let result = Array.isArray(obj) ? [] : {};
  Object.keys(obj).forEach(key => {
    if (typeof obj[key] === 'object') {
      result[key] = deepClone(obj[key]);
    } else {
      result[key] = obj[key];
    }
  });
  return result;
}

function fibnacci(n) {
  if (n <= 1) return 1;
  return fibnacci(n - 1) + fibnacci(n - 2);
}

function fibnacci(n, ac1 = 1, ac2 = 1) {
  if (n <= 1) return ac2;
  return fibnacci(n - 1, ac2, ac1 + ac2);
}
function* fib() {
  let [pre, curr] = [1, 1];
  while(true) {
    [pre, curr] = [curr, pre + curr];
    yield curr;
  }
}

function fibnacci(n) {
  if (n <= 1) return 1;
  let ac = 0;
  let fibo = fib();
  for (var i = 1; i < n; i++) {
    ac = fibo.next();
  }
  return ac.value;
}

var qsort = arr => arr.length < 1 ? arr :
  qsort(arr.filter(x => x < arr[0]))
    .concat(arr.filter(x => x === arr[0]))
      .concat(qsort(arr.filter(x => x > arr[0])));

function flatten(arr) {
  let newArr = [];
  (function _flat(arr) {
    arr.forEach(item => {
      if (Array.isArray(item)) {
        _flat(item);
      } else {
        newArr.push(item);
      }
    });
  })(arr);
  return newArr;
}

function debounce(cb, timer = 300) {
  var timeoutId = null;
  return function() {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(function() {
      cb();
    }, timer); 
  }
}

function throttle(cb, timer = 1000) {
  var timeoutId = null;
  var startTime = Date.now();
  return function() {
    var currTime = Date.now();
    var context = this;
    var args = arguments;
    var remaining = timer - (currTime - startTime);
    clearTimeout(timeoutId);
    if (remaining <= 0) {
      cb.apply(context, args);
      startTime = Date.now();
    } else {
      timeoutId = setTimeout(function() {
        cb.apply(context, args);
        startTime = Date.now();
      }, remaining);
    }
  }
}


