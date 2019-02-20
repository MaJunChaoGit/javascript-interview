class Observer {
  constructor(data) {
    this.$data = data;
    this.observe(this.$data);
  }
  observe(data) {
    if (typeof data !== 'object') return;
    Object.keys(data).forEach(key => {
      this.defineReactive(data[key], key, data);
      this.observe(data[key]);
    });
  }
  defineReactive(value, key, obj) {
    let dep = new Dep();
    Object.defineProperty(obj, key, {
      enumerable: true,
      configurable: true,
      get() {
        Dep.target && dep.addSub(Dep.target);
        return value;
      },
      set(newValue) {
        if (newValue !== value) {
          value = newValue;
          dep.notify();
        }
      }
    });
  }
}