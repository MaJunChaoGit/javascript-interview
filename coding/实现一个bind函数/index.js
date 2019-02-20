function bind(context) {
  var cb = this;
  var args = [].slice.call(arguments, 1);
  return function() {
    var newArgs = args.concat(Array.from(arguments));
    return cb.apply(context, ...newArgs);
  }
}