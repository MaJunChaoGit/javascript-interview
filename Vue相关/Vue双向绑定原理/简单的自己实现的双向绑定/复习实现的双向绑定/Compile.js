const CompileUtil = {
  model: function(node, vm, expr) {
    let updateFn = this.updater['model'];
    new Watcher(vm, expr, newValue => {
      updateFn && updateFn(node, newValue);
    });
    node.addEventListener('input', e => {
      let value = e.target.value;
      this.setVal(vm, expr, value);
    });
    updateFn && updateFn(node, this.getVal(vm, expr));
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
  click: function(node, vm, expr) {
    node.addEventListener('click', e => {
      let method = vm.$methods[expr];
      method.call(vm.$vm.data);
    });
  },
  setVal: function(vm, expr, value) {
    expr = expr.split('.');
    expr.reduce((pre, next, index) => {
      if (index === expr.length - 1) {
        return pre[next] = value;
      }
      return pre[next];
    }, vm.$data);
  },
  getVal: function(vm, expr) {
    expr = expr.split('.');
    return expr.reduce((pre, next) => {
      return pre[next];
    }, vm.$data);
  },
  getTextVal(vm, expr) {
    return expr.replace(/\{\{([^}]+)\}\}/, (...arguments) => {
      return this.getVal(vm, arguments[1].trim());
    });
  },
  updater: {
    model: function(node,value) {
      node.value = value;
    },
    text: function(node,value) {
      node.textContent = value;
    }
  }
}

class Compile {
  constructor(vm) {
    this.$vm = vm;
    this.$el = document.querySelector(vm.$el);
    this.$data = vm.$data;
    this.$methods = vm.$methods;

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
        this.compileElementNode(node);
        this.compile(node);
      } else {
        this.compileTextNode(node);
      }
    });
  }
  compileElementNode(node) {
    Array.from(node.attributes).forEach(attr => {
      let attrName = attr.nodeName;
      if (this.isDective(attrName)) {
        let expr = attr.nodeValue;
        let type = attrName.slice(2);
        CompileUtil[type](node, this.$vm, expr);
      }
    });
  }
  compileTextNode(node) {
    let text = node.data;
    let reg = /\{\{([^}]+)\}\}/g;
    if (reg.test(text)) {
      CompileUtil['text'](node, this.$vm, text);
    }
  }
  isElementNode(node) {
    return node.nodeType === 1;
  }
  isDective(name) {
    return name.includes('v-');
  }
}