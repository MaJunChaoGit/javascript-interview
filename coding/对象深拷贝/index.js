function deepClone(obj) {
  if (!obj || typeof obj !== 'object') return obj;

  let result = typeof obj.splice === 'function' ? [] : {};
  
  Object.keys(obj).forEach(key => {
    if (typeof obj[key] === 'object') {
      result[key] = deepClone(obj[key]);
    } else {
      result[key] = obj[key];
    }
  });
  return result;
}