class Watcher {
  constructor(vm, expr, cb) {
    this.$vm = vm;
    this.$expr = expr;
    this.$cb = cb;
    this.$oldValue = this.get(vm, expr);
  }
  get(vm, expr) {
    Dep.target = this;
    let oldValue = this.getVal(vm, expr);
    Dep.target = null;
    return oldValue;
  }
  getVal(vm, expr) {
    expr = expr.split('.');
    return expr.reduce((pre, next) => {
      return pre[next];
    }, vm.data);
  }
  updater() {
    let oldValue = this.$oldValue;
    let newValue = this.getVal(this.$vm, this.$expr);
    if (oldValue !== newValue) {
      this.$cb(newValue);
    }
  }
}