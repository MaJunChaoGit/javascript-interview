const arr = [5,32,1,2];
function convert(arr) {
  arr = arr.sort(function(a, b) {
    return (b + '' + a + '') - (a + '' + b + '')
  });
  return arr.join('');
}