const CompileUtil = {
  text(node, vm, expr) {
    let updateFn = this.updater['textUpdater'];
    let value = this.getTextVal(vm, expr);
    expr.replace(/\{\{([^}]+)\}\}/, (...arguments) => {
      new Watcher(vm, arguments[1].trim(), (newValue) => {
        updateFn && updateFn(node, newValue);
      });
    });
    updateFn && updateFn(node, value);
  },
  model(node, vm, expr) {
    let updateFn = this.updater['modelUpdater'];
    new Watcher(vm, expr, (newValue) => {
      updateFn && updateFn(node, newValue);
    });
    node.addEventListener('input', e => {
      let newValue = e.target.value;
      this.setVal(vm, expr, newValue);
    }, false);
    updateFn && updateFn(node, this.getVal(vm, expr));
  },

  getTextVal(vm, expr) {
    return expr.replace(/\{\{([^}]+)\}\}/g,(...arguments)=>{
      return this.getVal(vm,arguments[1].trim());
    })
  },
  getVal(vm, expr) {
    expr = expr.split('.');
    return expr.reduce((pre, next) => {
      return pre[next];
    }, vm.$data);
  },
  setVal(vm, expr, newValue) {
    expr = expr.split('.');
    return expr.reduce((pre, next, index) => {
      if (index === expr.length - 1) {
        return pre[next] = newValue;
      }
      return pre[next];
    }, vm.$data);
  },
  updater: {
    modelUpdater(node, value) {
      node.value = value;
    },
    textUpdater(node, value) {
      node.textContent = value;
    }
  }
}

class Compile {
  constructor(el, vm, data) {
    debugger
    this.$el = this.isElementNode(el) ? el : document.querySelector(el);
    this.$vm = vm;
    this.$data = data;

    if (this.$el) {
      let fragment = this.nodeToFragment(this.$el);
      this.compile(fragment);
      this.$el.appendChild(fragment);
    }
  }

  isElementNode(el) {
    return el.nodeType === 1;
  }
  nodeToFragment(node) {
    let fragment = document.createDocumentFragment();

    let firstChild;
    while (firstChild = node.firstChild) {
      fragment.appendChild(firstChild);
    }
    return fragment;
  }
  compile(fragment) {
    Array.from(fragment.childNodes).forEach(node => {
      if (this.isElementNode(node)) {
        this.compileElement(node);
        this.compile(node);
      } else {
        this.compileText(node);
      }
    });
  }
  compileElement(node) {
    let attrs = node.attributes;
    Array.from(attrs).forEach(attr => {
      let attrName = attr.nodeName;
      if (this.isDirective(attrName)) {
        let type = attrName.slice(2);
        let expr = attr.value;
        CompileUtil[type](node, this.$vm, expr);
      }
    });
  }
  compileText(node) {
    let text = node.data;
    let reg = /\{\{([^}]+)\}\}/g;
    if (reg.test(text)) {
      CompileUtil['text'](node, this.$vm, text);
    }
  }
  isDirective(attrName) {
    return attrName.includes('v-');
  }
}