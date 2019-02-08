class Routers {
  constructor(list, index) {
    this.list = {} || list;
    this.index = index;
    this.pre = null;
    this.current = null;
    window.addEventListener('hashchange', function (ev) {
      let pre = ev.oldURL.split('#')[1];
      let cur = ev.newURL.split('#')[1];
      let preR = this.getByUrlOrName(pre);
      let curR = this.getByUrlOrName(cur);
      this.loadWithRouter(curR, preR);
    }.bind(this));
  }
  add(router, callback) {
    if (typeof router === 'string') {
      router = {
        path: router,
        name: router,
        callback: callback
      }
    }
    this.list[router.name || router.path] = router;
  }
  remove(name) {
    delete this.list[name];
  }
  get(name) {
    return this.getByUrlOrName(name);
  }
  load(name) {
    if (!name) {
      name = location.hash.slice(1);
    }
    let router = this.getByUrlOrName(name);
    this.loadWithRouter(router, null);
  }
  loadWithRouter(cur, pre) {
    if (cur && cur.callback) {
      this.pre = this.current || cur;
      cur.callback(cur, pre);
      this.current = cur;
    } else {
      this.NOTFOUND('未找到相关路由');
    }
  }
  getByUrlOrName(nameOrUrl) {
    let router = this.list[nameOrUrl];
    if (!router) {
      router = Object.values(this.list).find(rt => rt.name === nameOrUrl || rt.path === nameOrUrl);
    }
    return router;
  }
  setIndex(nameOrUrl)  {
    this.indexRouter = this.getByUrlOrName(nameOrUrl);
  }
  go(num) {
    window.history.go(num);
  }
  back() {
    window.history.back();
  }
  forword() {
    window.history.forword();
  }
  init() {
    if (window.location.hash) {
      this.load();
    } else if (this.indexRouter) {
      if ('replaceState' in window.history) {
        window.history.replaceState(null, null, window.location.href + '#' + this.indexRouter.path);
      } else {
        window.location.hash = this.indexRouter.path;
      }
    }
  }
}

var router = new Routers()
Routers.prototype.use = Routers.prototype.add
router.NOTFOUND = function (msg) {
    content.innerHTML = msg
}
// router.use('/m1', function (r) {
//     req(r.path.slice(1))
// });
// router.use('/m11', function (r) {
//     req(r.path.slice(1))
// });
// router.use('/m12', function (r) {
//     req(r.path.slice(1))
// });
// router.use('/m2', function (r) {
//     req(r.path.slice(1))
// });
// router.use('/m3', function (r) {
//     req(r.path.slice(1))
// });
// router.setIndex('/m1')
router.init();

function req(url) {
  ajax(url, function (res) {
    content.innerHTML = res;
  });
}

function ajax(id, callback) {
    callback({
      'm1': '菜单1的主区域内容',
      'm11': '菜单11的主区域内容',
      'm12': '菜单12的主区域内容',
      'm2': '菜单2的主区域内容',
      'm3': '菜单3的主区域内容'
    }[id] || '404 Not Found!')
}