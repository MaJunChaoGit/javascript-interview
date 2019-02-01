function flatten(array) {
  let newArray = [];
  (function _flat(arr) {
    arr.forEach((item) => {
      if (Array.isArray(item)) {
        _flat(item);
      } else {
        newArray.push(item);
      }
    });
  })(array);
  return newArray;
}

let arr = flatten([1,[2],[3,[[4],[5,[7],[9],5],[6]]]]);
console.log(arr);