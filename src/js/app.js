/* eslint-disable func-names */
/* eslint-disable no-loop-func */
/* eslint-disable no-plusplus */
/* eslint-disable no-unused-vars */
const lists = document.querySelectorAll('.list');
const button = document.querySelector('.button');
let draggedItem;

function changeTitle() {
  const titles = document.querySelectorAll('.title');
  titles.forEach((title) => {
    title.addEventListener('click', (e) => {
      e.target.textContent = '';
    });
  });
}

function gragNdrop() {
  const listItems = document.querySelectorAll('.list_item');
  const arrLists = document.querySelectorAll('.list');

  for (let i = 0; i < listItems.length; i++) {
    const item = listItems[i];
    item.addEventListener('dragstart', () => {
      draggedItem = item;
      setTimeout(() => {
        item.style.display = 'none';
      }, 0);
    });
    item.addEventListener('dragend', () => {
      setTimeout(() => {
        item.style.display = 'block';
        draggedItem = null;
      }, 0);
    });
    item.addEventListener('dblclick', () => {
      item.remove();
    });
    for (let j = 0; j < arrLists.length; j++) {
      const list = arrLists[j];
      list.addEventListener('dragover', (e) => {
        e.preventDefault();
      });
      list.addEventListener('dragenter', function (e) {
        e.preventDefault();
        this.style.backgroundColor = 'rgba(0,0,0,.3)';
      });
      list.addEventListener('dragleave', function (e) {
        this.style.backgroundColor = 'rgba(0,0,0,0)';
      });
      list.addEventListener('drop', function (e) {
        this.style.backgroundColor = 'rgba(0,0,0,0)';
        this.append(draggedItem);
      });
    }
  }
}

function addTask() {
  const btn = document.querySelector('.add_btn');
  const addBtn = document.querySelector('.add_item-btn');
  const canselBtn = document.querySelector('.cancel_item-btn');
  const textarea = document.querySelector('.textarea');
  const form = document.querySelector('.form');

  let value;

  btn.addEventListener('click', () => {
    form.style.display = 'block';
    btn.style.display = 'none';
    addBtn.style.display = 'none';

    textarea.addEventListener('input', (e) => {
      value = e.target.value;
      if (value) {
        addBtn.style.display = 'block';
      } else {
        addBtn.style.display = 'none';
      }
    });
  });
  canselBtn.addEventListener('click', () => {
    textarea.value = '';
    value = '';
    form.style.display = 'none';
    btn.style.display = 'flex';
  });
  addBtn.addEventListener('click', (e) => {
    const newItem = document.createElement('div');
    newItem.classList.add('list_item');
    newItem.draggable = true;
    newItem.textContent = value;
    lists[0].append(newItem);
    form.style.display = 'none';

    textarea.value = '';
    value = '';
    btn.style.display = 'flex';
    gragNdrop();
  });
}
addTask();

function addBoard() {
  const boards = document.querySelector('.boards');
  const board = document.createElement('div');
  board.classList.add('boards_item');
  board.innerHTML = `
  <span contenteditable="true" class="title">Введите название</span>
  <div class="list"></div>`;
  boards.append(board);
  changeTitle();
  gragNdrop();
}
button.addEventListener('click', addBoard);

changeTitle();

gragNdrop();
