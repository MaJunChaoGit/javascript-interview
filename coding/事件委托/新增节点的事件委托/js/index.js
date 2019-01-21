  // window.onload = function() {
  //   var btn = document.getElementById('btn');
  //   var ul = document.getElementById('ul1');
  //   var li = document.getElementsByTagName('li');
  //   var num = 4;
  //   function hover() {
  //     for (var i = 0; i < li.length; i++) {
  //       li[i].onmouseover = function() {
  //         this.style.background = 'red';
  //       };
  //       li[i].onmouseout = function() {
  //         this.style.background = '#fff';
  //       }
  //     }
  //   }
    
  //   btn.onclick = function() {
  //     num++;
  //     var li = document.createElement('li');
  //     li.innerHTML = 111 * num;
  //     ul.appendChild(li);
  //     hover();
  //   }
  //   hover();
  // }

  // 使用事件委托来写
  window.onload = function() {
    var num = 4;
    var btn = document.querySelector('#btn');
    var ul = document.querySelector('#ul1');
    var li = document.querySelectorAll('li');

    ul.onmouseover = function(ev) {
      var ev = ev || window.event;
      var target = ev.target || ev.srcElement;
      if (target.nodeName.toLowerCase() === 'li') {
        target.style.background = 'red';
      }
    }

    ul.onmouseout = function(ev) {
      var ev = ev || window.event;
      var target = ev.target || ev.srcElement;
      if (target.nodeName.toLowerCase() === 'li') {
        target.style.background = 'white';
      }
    }
    btn.onclick = function() {
      num++;
      var li = document.createElement('li');
      li.innerHTML = num * 111;
      ul.appendChild(li);
    }
  }