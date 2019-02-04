class MVVM {
  constructor(vm) {
    this.$vm = vm;
    this.$el = vm.el;
    this.$data = vm.data;
    this.$methods = vm.methods;
    new Observer(this.$data);
    new Compile(this);
  }
}