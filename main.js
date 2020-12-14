"use strict"

const themeSwitcher = document.querySelector('.header-theme-switcher');
const theme = document.querySelector('body')



themeSwitcher.addEventListener('click', (e) => {
    e.preventDefault();
    console.log(theme.classList.value);
    if (theme.classList.value === 'theme-dark') {
        theme.classList.replace('theme-dark', 'theme-light');
    } else if (theme.classList.value === 'theme-light') {
        theme.classList.replace('theme-light', 'theme-dark');
    }
});
const toDoList = [];
const toDosAmount = document.querySelector('.todos-amount');

class ToDo {
  constructor(id,toDo, status = false) {
      this.id = id;
      this.toDo = toDo;
      this.status = false;
  }

  changeStatus(){
      this.status = !this.status;
      console.log(this.status)
  }
} 
const addToDo = (event) => {
  if (event.key === "Enter") {
      const newToDo = event.target.value;
      if (newToDo.length === 0) {
          alert('Todo is empty')
      } else {
          event.target.value = "";
          toDoList.push(new ToDo(idGenerator(),newToDo, false));
          refresh();
          
      }
  }
}
const removeToDo = (event, id) => {
  event.preventDefault();
  const itemToRemove =  toDoList.filter(item => item.id !== id);

  toDoList.splice(0, toDoList.length);
  toDoList.push(...itemToRemove);
  
  refresh();
}
const createToDoElement = (id, toDo, status) => (
    
  `
  <li class="${"todos-item"+status}" data-state="false" id="${id}">
  <label for="todo-${id}" class="todo custom-checkbox-container">
    <input id="todo-${id}" type="checkbox" ${status===' marked' ? 'checked' :''} onclick="todoStatus(event, ${id})" class="todos-item--pending">
   <span class='label-text'>${toDo}</span>
    <span class="checkmark"></span>
  </label>
  <span class="toDos-item-remove-icon" onclick="removeToDo(event, ${id})">
   <img src="images/icon-cross.svg" alt="delete todo">
      </span>
  </li>
`
);
const refresh = () => {
  const elements = [];
  
  for(const item of toDoList){
      
      elements.push(createToDoElement(item.id, item.toDo,item.status ? ' marked' : ''))
  }
  //Repainting List Items
  repaint(elements);
  refreshToDosAmount();
}
function refreshToDosAmount () {
        
  let totalActive = toDoList.length;
  for(const item of toDoList){
      if(item.status){
          totalActive--;
      }
  }

  if (totalActive === 0) {
      toDosAmount.innerText = "No items";
  } else {
      toDosAmount.innerText= totalActive === 1 ? `${totalActive} item left` : `${totalActive} items left`;
  }   

  console.log('Number of items ', totalActive)
}

const repaint = (elements)=>{
 
  const list = document.querySelector('.todos');

  list.innerText="";

  for(const item of elements){
      list.insertAdjacentHTML('afterbegin', item);
  }
}
function initToDos() {
  toDoList.push(new ToDo(989, 'Go to the super market', true));
  toDoList.push(new ToDo(929, 'Go to the moutain', false));
  toDoList.push(new ToDo(489, 'Drink Coffee', true));
  toDoList.push(new ToDo(589, 'Do home work', false));
  toDoList.push(new ToDo(689, 'Call the store', false));

  refresh();
}
initToDos();