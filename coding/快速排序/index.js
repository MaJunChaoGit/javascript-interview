function quickSort(arr) {
  if (arr.length < 2) {
    return arr;
  }
  let left = 0;
  let right = arr.length - 1;
  while(left < right) {
    // 寻找右边比arr[0]小的数的下标
    while(arr[right] >= arr[0] && left < right) {
      right--;
    }
    while(arr[left] <= arr[0] && left < right) {
      left++;
    }
    if (right === left) {
      let mid = arr[right];
      arr[right] = arr[0];
      arr[0] = mid;
      break;
    }
  }
  return quickSort(arr.slice(0, left)).concat(arr.slice(left, right + 1)).concat(quickSort(arr.slice(right + 1)));
}

const qsort = arr => arr.length <= 1 ? arr :
  qsort(arr.filter(x => x < arr[0]))
   .concat(arr.filter(x => x == arr[0]))
    .concat(qsort(arr.filter(x => x > arr[0])));