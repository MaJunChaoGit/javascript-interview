Array.prototype.map = function(cb){
  let newArr = [];
  for (var i = 0; i < this.length; i++) {
    let value = cb(this[i], i, this);
    newArr.push(value);
  }
  return newArr;
};