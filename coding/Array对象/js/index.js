// Array.isArray()
// 判断参数是否为数组,可以弥补typeof的不足
var arr = [1,2,3];
typeof arr; // 'object'
Array.isArray(arr); // true

// valueOf(),toString()
// valueOf()返回数组本身
var arr = [1,2,3];
arr.valueOf(); // [1,2,3]
// toString()返回数组的字符串形式
var arr = [1,2,3];
arr.toString(); // '1,2,3'
var arr = [1,2,3,[4,5,6]];
arr.toString(); // '1,2,3,4,5,6'

// push(), pop()
// push方法用于在数组末端添加一个或者多个元素,并返回添加新元素后的数组长度,该方法会改变原数组
var arr = [];
arr.push(1); // 1
arr.push('a'); // 2
arr.push(true, {}) // 4
arr // [1,'a', true, {}]

// pop方法用于删除数组的最后一个元素,并返回该元素,该方法会改变原数组
var arr = ['a', 'b', 'c'];
arr.pop();
arr // ['a', 'b']

// push和pop结合就是'后进先出'的栈结构
var arr  = [];
arr.push(1, 2);
arr.push(3);
arr.pop();
arr // [1, 2]

// shift(), unshift()
// shift方法用于删除数组的第一个元素,并返回该元素,该方法会改变原数组
var arr = ['a', 'b', 'c'];
arr.shift() // 'a'
arr // ['b', 'c']

// unshift方法用于在数组的第一个位置添加元素,并返回添加新元素后数组的长度,该方法会改变原数组
var arr = ['a', 'b', 'c'];
arr.unshift('x');
arr // ['x', 'a', 'b', 'c']

// push和shift结合使用,就是先进先出的队列结构
var arr  = [];
arr.push(1, 2);
arr.push(3);
arr.shift();
arr // [2, 3]

// join方法以指定参数作为分隔符,将数组所有成员连接成一个字符串返回,默认为逗号分隔
var arr = [1, 2, 3, 4];
arr.join(); // '1,2,3,4'
arr.join('|'); // '1|2|3|4'


// concat方法用于多个数组的合并,它将新数组的成员添加到原数组成员的后部,然后返回一个新数组,原数组不变
['hello'].concat(['world']); // ['hello', 'world']
['hello'].concat(['world'], ['!']); // ['hello', 'world', '!']

// reverse用于颠倒排列数组元素,返回改变后的数组,该方法将改变原数组
var arr = [1, 2, 3];
arr.reverse(); // [3, 2, 1]
arr // [3, 2, 1]

// slice方法用于提取目标数组的一部分,返回一个新数组,原数组不变
// [start ,end) 
var arr = ['a', 'b', 'c'];
arr.slice(0); // ['a', 'b', 'c']
arr.slice(1); // ['b', 'c']
arr.slice(1, 2); // ['b']
arr.slice(2, 6); // ['c']
arr.slice(); // ['a', 'b', 'c']

// splice方法用于删除原数组的一部分成员,并可以在删除的位置添加新的数组成员,返回值是被删除的元素,该方法会改变原数组
// [start ,end) 
var arr = ['a', 'b', 'c', 'd', 'e', 'f'];
arr.splice(4, 2, 1, 2); // ['e', 'f']
arr // ['a', 'b', 'c', 'd', 1 ,2]

//sort方法是对数组成员进行排序,默认是按照字典顺序进行排序,排序后,原数组将被改变
[4, 3, 2, 1].sort(); // [1, 2, 3, 4]
[11, 101].sort(); // [101, 11]

// 如果想让sort方法按照自定义方式排序,可以传入一个函数作为参数
[10111, 1101, 111].sort(function (a, b) {
  return a - b;
});