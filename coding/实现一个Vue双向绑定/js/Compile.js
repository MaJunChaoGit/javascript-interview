const CompileUtil = {
  model: function(node, vm, expr) {
    let updateFn = this.updater['model'];
    new Watcher(vm, expr, function(newValue) {
      updateFn && updateFn(node, newValue);
    });
    node.addEventListener('input', (e) => {
      let value = e.target.value;
      this.setVal(vm, expr, value);
    });
    updateFn && updateFn(node, this.getVal(vm, expr));
  },
  text: function(node, vm, expr) {
    let updateFn = this.updater['text'];
    expr.replace(/\{\{([^}]+)\}\}/g, (...arguments) => {
      new Watcher(vm, arguments[1].trim(), function(newValue) {
        updateFn && updateFn(node, newValue);
      });
    });
    updateFn && updateFn(node, this.getTextVal(vm, expr));
  },
  click: function(node, vm, expr) {
    node.addEventListener('click', e => {
      vm.methods[expr].bind(vm.data)();
    });
  },
  getVal(vm, expr) {
    expr = expr.split('.');
    return expr.reduce((pre, next) => {
      return pre[next];
    }, vm.data);
  },
  getTextVal(vm, expr) {
    return expr.replace(/\{\{([^}]+)\}\}/g, (...arguments) => {
      return this.getVal(vm, arguments[1].trim());
    });
  },
  setVal(vm, expr, value) {
    expr = expr.split('.');
    expr.reduce((pre, next, index) => {
      if (expr.length - 1 === index) {
        return pre[next] = value;
      }
      return pre[next];
    }, vm.data);
  },
  updater: {
    model: function(node, value) {
      node.value = value;
    },
    text: function(node, value) {
      node.textContent = value;
    }
  }
}
class Compile {
  constructor(vm) {
    this.$vm = vm;
    this.$el = typeof vm.el === 'string' ? document.querySelector(vm.el) : vm.el;
    this.$data = vm.data;
    this.$methods = vm.methods;
    let fragment = this.nodeToFragment(this.$el);
    this.compile(fragment);
    this.$el.appendChild(fragment);
  }

  nodeToFragment(node) {
    let fragment = document.createDocumentFragment();
    let firstChild;
    while(firstChild = node.firstChild) {
      fragment.appendChild(firstChild);
    }
    return fragment;
  }
  compile(nodes) {
    nodes.childNodes.forEach(node => {
      if (this.isElementNode(node)) {
        this.compileElement(node);
        this.compile(node);
      } else {
        this.compileText(node);
      }
    });
  }
  compileElement(node) {
    let attrNames = Array.from(node.attributes);
    attrNames.forEach(attr => {
      if (this.isDerective(attr.name)) {
        let type = attr.name.slice(2);
        let expr = attr.nodeValue;
        CompileUtil[type](node, this.$vm, expr);
      }
    });
  }
  compileText(node) {
    let expr = node.data;
    if (/\{\{([^}]+)\}\}/g.test(expr)) {
      CompileUtil['text'](node, this.$vm, expr);
    }
  }
  isElementNode(node) {
    return node.nodeType === 1;
  }
  isDerective(attr) {
    return attr.includes('v-');
  }
}