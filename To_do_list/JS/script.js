function ItemDelete(event) {
    let currentEl = event.target,
    parent = currentEl.parentNode;
    parent.remove();
    }
function ItemCheck(event) {
    let currentEl = event.target,
    nextEl = currentEl.nextSibling,
    value = currentEl.checked;

    if(nextEl.nodeName === '#text')
        nextEl = nextEl.nextSibling;

    if(value) {
        nextEl.className = 'done';
    } else {
        nextEl.className = '';
    }
}
function AddItem() {
    let input = document.getElementById('item-input'),
        text = input.value;
    addItemToList(false, text);  
}
function Save(){
    let list = document.getElementById('item-list-do'),
    liArr = Array.from(list.childNodes),
    saveItems = liArr.filter(x => x.nodeName !== '#text')
    .map(x => {
        let checkbox = x.getElementsByTagName('input')[0],
            isChecked = checkbox.checked, 
            span = x.getElementsByTagName('span')[0],
            text = span.innerText;
            return {
                isChecked: isChecked,
                text: text
            }
    });
    let saveString = JSON.stringify(saveItems);
    localStorage['todo'] = saveString;
}
function Load(){
    let saveString = localStorage['todo'],
        itemList = JSON.parse(saveString);

    itemList.forEach(x => addItemToList(x.isChecked, x.text));
}
function addItemToList(isChecked, text) {
    let list = document.getElementById('item-list-do');
    let template = '<input onclick="ItemCheck(event)" type="checkbox"{1}/>' + 
                    '<span>{0}</span>' + 
                    '<button id="delDone" onclick="ItemDelete(event)">&#10006;</button>';
    let vTemplate = template.replace('{0}', text);
    vTemplate = vTemplate.replace('{1}', isChecked ? 'checked' : '');

    let newItem = document.createElement('li');
        newItem.innerHTML = vTemplate;
    if(isChecked) newItem.className = 'done';
    list.appendChild(newItem);
}
function DelAllChecked(event) {
    let done = document.getElementsByClassName('done');
        Array.from(done).forEach(x => x.parentNode = x.parentNode.remove());
    }
