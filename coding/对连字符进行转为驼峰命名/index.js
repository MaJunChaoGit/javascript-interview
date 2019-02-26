function hump(str) {
 return str.replace(/-(\w)/g, function($0, $1) {
  return $1.toUpperCase();
 });
}