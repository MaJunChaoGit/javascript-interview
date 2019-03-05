// 1.原型链继承
// 无法传递参数给父类对象
// function Parent(name) {
//   this.name = name;
// }
// Parent.prototype.sayName = function() {
//   console.log('parent name:' + this.name);
// }
// Parent.prototype.sayGoodbye = function() {
//   console.log('Goodbye!' + this.name);
// }
// function Child(name) {
//   this.name = name;
// }
// Child.prototype = new Parent('father');
// Child.prototype.constructor = Child;
// Child.prototype.sayName = function() {
//   console.log('child name:' + this.name); 
// }

// 2.类式继承
// 没有原型上的继承,无法复用函数
// function Parent(name) {
//   this.name = name;
// }
// Parent.prototype.sayName = function() {
//   console.log('parent name:' + this.name);
// }
// Parent.prototype.sayGoodbye = function() {
//   console.log('Goodbye!' + this.name);
// }
// function Child(name) {
//   Parent.apply(this, arguments);
//   this.name = name;
// }
// Child.prototype.sayName = function() {
//   console.log('child name:' + this.name); 
// }

// 3.组合式继承
// 对于组合式继承的缺点是需要执行两次父类构造函数
// function Parent(name) {
//   this.name = name;
// }
// Parent.prototype.sayName = function() {
//   console.log('parent name:' + this.name);
// }
// Parent.prototype.sayGoodbye = function() {
//   console.log('Goodbye!' + this.name);
// }
// function Child(name) {
//   Parent.apply(this, arguments);
//   this.name = name;
// }
// // Child.prototype = Parent.prototype; // 如果这么写会导致父类和子类的原型对象相同,父类在调用自身没有的属性时,会从子类的原型上进行调用
// Child.prototype = new Parent();
// Child.prototype.constructor = Child;
// Child.prototype.sayName = function() {
//   console.log('child name:' + this.name); 
// }

// 4.寄生组合继承
// function Parent(name) {
//   this.name = name;
// }
// Parent.prototype.sayName = function() {
//     console.log('parent name:', this.name);
// }
// function Child(name, parentName) {
//     Parent.call(this, parentName);  
//     this.name = name;    
// }
// Parent.prototype.sayGoodbye = function() {
//   console.log('Goodbye!' + this.name);
// }
// function inheritPrototype(Parent, Child) {
//     Child.prototype = Object.create(Parent.prototype);   //修改
//     Child.prototype.constructor = Child;
// }

// inheritPrototype(Parent, Child);

// Child.prototype.sayName = function() {
//     console.log('child name:', this.name);
// }

// 5.ES6继承
// class Parent {
//   constructor(name) {
//     this.name = name;
//   }
//   sayHello() {
//     console.log('parent' + this.name + 'hello')
//   }
// }
// class Child  extends Parent{
//   constructor(name) {
//     this.name = name;
//   }
//   sayHello() {
//     console.log('child' + this.name + 'hello')
//   }
// }

// function Parent(name) {
//   this.name = name;
// }
// Parent.prototype.sayGoodbye = function() {
//   console.log('goodbye');
// }

// function Child(name) {
//   Parent.apply(this, arguments);
//   this.name = name;
// }
// Child.__proto = Parent;
// Child.prototype = new Parent();
// Child.prototype.constructor = Child;
// Child.prototype.sayHello = function() {
//   console.log(this.name)
// }