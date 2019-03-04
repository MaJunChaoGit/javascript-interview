class TableDragger {
  constructor(el, firstRowControl = false) {
    this.table = document.querySelector(el);
    this.firstRowControl = firstRowControl;
    // 虚拟TR
    this.vTR = null;
    if (this.table) this.initEvent();
  }
  initEvent() {
    this.initMouseDown();
  }
  initMouseDown() {
    let downControl = (event) => {
      if (this.isDraggable(event.target)) {
        let tr = this.getParentNode(event.target);
        // 创建一个虚拟TR
        this.vTR = this.createVirtualTR(tr);
        // 创建一个用于展示拖动的table并绑定需要拖拽的tr
        let table = this.createTable(this.vTR);
        // 然后将这个table绑定mousemove事件与mouseup事件
        this.bindMouse(table);
        document.body.appendChild(table);
        // 并删除原本的TR
        this.removeTR(tr);
      }
    }
    // 通过事件订阅,订阅到行级别的mousedown事件
    this.table.addEventListener('mousedown', downControl);
  }
  isDraggable(el) {
    if (this.firstRowControl) return true;
    // 判断是否是第一行
    if (el.parentNode.rowIndex !== 0) {
      return true;
    }
  }
  getParentNode(el) {
    return el.parentNode;
  }
  removeTR(tr) {
    return this.table.querySelector('tbody').removeChild(tr);
  }
  createVirtualTR(el) {
    let fragment = document.createDocumentFragment();
    let firstChild;
    let tr = document.createElement('tr');
    while (firstChild = el.firstChild) {
      tr.appendChild(firstChild);
    }
    fragment.appendChild(tr);
    return fragment;
  }
  createTable(tr) {
    let moveTR = tr.cloneNode(true);
    let table = document.createElement('table');
    table.cellSpacing="0";
    table.cellPadding="2";
    table.width="100%";
    table.border="1";
    table.appendChild(moveTR);
    table.style.opacity = '0.3';
    table.style.position = 'fixed';
    return table;
  }
  bindMouse(table) {
    let moveControl = (event) => {
      if (!table) return;
      table.style.top = event.y + 'px';
      table.style.left = event.x + 'px';
      table.style.width = '50%';
    }
    let upControl = (event) => {
      document.removeEventListener('mousemove', moveControl);
      document.body.removeChild(table);
      let positions = this.checkPosition();
      let index = this.getPosition(event, positions);
      // 根据位置将虚拟TR插入到原来的table
      this.appendNewRow(index);
      document.removeEventListener('mouseup', upControl);
    }
    document.addEventListener('mousemove', moveControl);
    document.addEventListener('mouseup', upControl);
  }
  checkPosition() {
    let positions = [];
    let trArrays = Array.from(this.table.querySelector('tbody').childNodes)
      .filter(element => {
        return element.nodeName === 'TR';
      })
      .map(element => {
        return element.clientHeight;
      });

    if (trArrays.length > 0) {
      positions.push((this.table.offsetTop + trArrays[0]) / 2);
    }
    trArrays.reduce((pre, next, index) => {
      positions.push((pre + pre + next) / 2);
      return pre + next;
    });
    return positions;
  }
  getPosition(event, positions) {
    positions.push(event.y);
    positions = positions.sort(function(a, b) {
      return a - b;
    });
    return positions.indexOf(event.y);
  }
  appendNewRow(index) {
    let newTr = this.table.insertRow(index);
    Array.from(this.vTR.lastChild.children).forEach(td => {
      newTr.appendChild(td);
    });
  }
}