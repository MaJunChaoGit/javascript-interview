const CompileUtil = {
  model: function(node, vm, expr) {
    let updateFn = this.updater['model'];
    new Watcher(vm, expr, newValue => {
      updateFn && updateFn(node, newValue);
    });
    node.addEventListener('input', event => {
      let newValue = event.target.value;
      this.setVal(vm, expr, newValue);
    });
    updateFn && updateFn(node, this.getVal(vm, expr));
  },
  click: function(node, vm, expr) {
    node.addEventListener('click', function() {
      vm.$methods[expr].call(vm.$data);
    });
  },
  text: function(node, vm, expr) {
    let updateFn = this.updater['text'];
    expr.replace(/\{\{([^}]+)\}\}/, (...arguments) => {
      new Watcher(vm, arguments[1].trim(), newValue => {
        updateFn && updateFn(node, newValue);
      });
    });
    updateFn && updateFn(node, this.getTextVal(vm, expr));
  },
  getVal(vm, expr) {
    expr = expr.split('.');
    return expr.reduce((pre, next) => {
      return pre[next];
    }, vm.$data);
  },
  getTextVal(vm, expr) {
    return expr.replace(/\{\{([^}]+)\}\}/, (...arguments) => {
      return this.getVal(vm, arguments[1]);
    });
  },
  setVal(vm, expr, value) {
    expr = expr.split('.');
    expr.reduce((pre, next, index) => {
      if (index === expr.length - 1) {
        return pre[next] = value;
      }
      return pre[next];
    }, vm.$data);
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
  constructor (vm) {
    this.$vm = vm;
    this.$el = typeof vm.$el !== 'object' ? document.querySelector(vm.$el) : vm.$el;
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
    Array.from(nodes.childNodes).forEach(node => {
      if (this.isElementNode(node)) {
        this.compileElement(node);
        this.compile(node);
      } else {
        this.compileText(node);
      }
    });
  }
  compileElement(node) {
    Array.from(node.attributes).forEach(attr => {
      let attrName = attr.nodeName;
      if (this.isDirective(attrName)) {
        let type = this.getDirective(attrName);
        let expr = attr.value;
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
  isDirective(attrName) {
    return attrName.includes('v-');
  }
  getDirective(attrName) {
    return attrName.slice(2);
  }
  isElementNode(node) {
    return node.nodeType === 1;
  }
}
