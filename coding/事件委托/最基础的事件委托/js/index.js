window.onload = function() {
  var oUl = document.getElementById('ul1');
  var aLi = document.getElementsByTagName('li');
  for (var i = 0; i < aLi.length; i++) {
    aLi[i].onclick = function() {
      console.log(123);
    }
  }
}

// 使用事件委托机制
window.onload = function() {
  var ul = document.getElementById('ul1');
  ul.onclick = function(event) {
    var ev = ev || window.event;
    var target = ev.target || ev.srcElement;
    if (target.nodeName.toLowerCase() === 'li') {
      console.log(target.innerHTML);
    }
  }
}