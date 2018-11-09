// 初始版本
function Middleware() {
  let tasks = [];

  this.use = function(fn) {

    let self = this;

    tasks.push(function() {
      fn.call(self, self.next);
    })
  }

  this.next = function() {
    let fn = tasks.shift();
    fn && fn();
  }

  this.go = function(fn) {
    let self = this;
    tasks.push(function() {
      fn.call(self);
    });
    this.next();
  }
}

// 重构版本
function Middleware() {
  let tasks = [];

  this.use = function(fn) {
    tasks.push(fn);
    return this;
  }

  this.next = function() {
    if (tasks.length > 0) {
      let fn = tasks.shift();
      fn && fn.call(this, this.next.bind(this));
    }
  }

  this.go = function(fn) {
    tasks.push(fn);
    this.next();
  }
}

function Middleware() {
  let tasks = [];

  this.use = function(fn) {
    tasks.push(fn);
    return this;
  }

  this.go = function(fn) {
    tasks.push(fn);
    this.next(fn);
  }

  this.next = function() {
    var fn = tasks.shift();
    fn.call(this, this.next.bind(this));
  }
}