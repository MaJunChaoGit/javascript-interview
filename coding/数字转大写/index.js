function convert(number) {
  number = [...number.toString()].reverse();
  let length = number.length;
  let i = 0;
  const n2c = ['零','一','二','三','四','五','六','七','八','九'];
  const unit = ['','十','百','千','万'];
  let result = [];
  while (i < length) {
    let char = n2c[parseInt(number[i])];
    if (char !== '零') {
      char = char.concat(unit[i]);
    }
    result.unshift(char);
    i++;
  }
  return result.join('').replace(/零+/g, '零').replace(/零$/, '');
}