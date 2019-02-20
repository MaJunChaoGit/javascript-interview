class MVVM {
  constructor(vm) {
    this.$vm = vm;
    this.$data = vm.data;
    new Observer(this.$data);
    new Compile(this.$vm);
  }
}