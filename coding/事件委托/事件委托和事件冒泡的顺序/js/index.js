window.onload = function() {
  document.querySelector('div').addEventListener('click', function(event) {
    console.log('div捕获' + event.target);
  }, true);
  document.querySelector('ul').addEventListener('click', function(event) {
    console.log('ul捕获' + event.target);
  }, true);
  document.querySelector('li').addEventListener('click', function(event) {
    console.log('li捕获' + event.target);
  }, true);
  document.querySelector('a').addEventListener('click', function(event) {
    console.log('a捕获' + event.target);
  }, true);

  document.querySelector('div').addEventListener('click', function(event) {
    console.log('div捕获' + event.target);
  }, false);
  document.querySelector('ul').addEventListener('click', function(event) {
    console.log('ul捕获' + event.target);
  }, false);
  document.querySelector('li').addEventListener('click', function(event) {
    console.log('li捕获' + event.target);
  }, false);
  document.querySelector('a').addEventListener('click', function(event) {
    console.log('a捕获' + event.target);
  }, false);
}

// 对于IE来说,不支持addEventListener,需要使用attachEvent
// 并且event.target也要换成event.srcElement
// 
// 移除事件同样IE需要使用detachEvent
// 
// 组织事件传播需要使用stopPropagation(),而IE则需要使用cancelBubble属性为true