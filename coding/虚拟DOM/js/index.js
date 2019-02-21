const tree = Element('div', { id: 'virtual-container' }, [
  Element('p', {}, ['Virtual DOM']),
  Element('div', {}, ['before update']),
  Element('ul', {}, [
    Element('li', { class: 'item' },  ['Item 1']),
    Element('li', { class: 'item' },  ['Item 2']),
    Element('li', { class: 'item' },  ['Item 2'])
  ])
]);
const root = tree.render();
document.getElementById('app').appendChild(root);