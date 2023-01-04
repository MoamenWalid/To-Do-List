// Documents
const input = document.querySelector('input');
const addTaskButton = document.querySelector('.add-task > button');
const tasks = document.querySelector('.tasks');
const numTasks = document.querySelector('.tasks-paragraph > span');

// Variable
let addInformation = [];

if (window.localStorage.getItem('tasks')) {
  const storage = window.localStorage.getItem('tasks');
  addInformation = JSON.parse(storage);
  returnValueOfTasks(addInformation);
  removeTask();
  editTextOfTask();
  saveEdit();
  checkTasks();
}

addTaskButton.addEventListener('click', () => {

  const month = new Date().getMonth() + 1;
  const year = new Date().getFullYear();
  const day = new Date().getDate();
  const dayString = new Date().toString().split(' ')[0];
  const hour = (new Date().getHours() < 10)? `0${new Date().getHours()}`: new Date().getHours();
  const minutes = (new Date().getMinutes() < 10)? `0${new Date().getMinutes()}`: new Date().getMinutes();
  const seconds = (new Date().getSeconds() < 10)? `0${new Date().getSeconds()}`: new Date().getSeconds();

    if (input.value) {
  
      const objectInformation = {
        id: Date.now(),
        text: input.value,
        date: `${dayString} ${month} / ${day} / ${year}`,
        time: `${hour}:${minutes}:${seconds}`
      }
  
      tasks.innerHTML += `
        <div class ="time">Added: <span>${objectInformation.date} <span>${objectInformation.time}</span></span></div>
        <div class="task" id="${objectInformation.id}">
          <p>${objectInformation.text}</p>
          <div class="edit-on-task">
          <button class="save d-none">save</button>
            <button class="edit">Edit</button>
            <button class="delete">Delete</button>
          </div>
        </div>
      `
      input.value = '';
      input.focus();
      addInformation.push(objectInformation);
      addToLocalStorage(addInformation);
      removeTask();
      editTextOfTask();
      saveEdit();
      checkTasks();
    }
}) 

// Function To Add To Local Storage 
function addToLocalStorage(array) {
  window.localStorage.setItem('tasks', JSON.stringify(array));
}

// Returns Values To Tasks
function returnValueOfTasks(array) {
  array.forEach((task) => {
    tasks.innerHTML += `
    <div class ="time">Added: <span>${task.date} <span>${task.time}</span></span></div>
    <div class="task" id="${task.id}">
      <p>${task.text}</p>
      <div class="edit-on-task">
      <button class="save d-none">save</button>
        <button class="edit">Edit</button>
        <button class="delete">Delete</button>
      </div>
    </div>
  `
  });
}

// Function To Remove Task
function removeTask() {
  const time = document.querySelectorAll('.time');
  const task = document.querySelectorAll('.task');
  const deleteTask = document.querySelectorAll('.delete');

  deleteTask.forEach((del, index) => {
    del.addEventListener('click', () => {
      
      addInformation.forEach((item, counter) => {
        if (task[index].id == item.id) {

          time[index].remove();
          task[index].remove();
          addInformation.splice(counter, 1);
          addToLocalStorage(addInformation);
          checkTasks();
        }
      })
    })
  })
}

// Function To Check On Tasks
function checkTasks() {
  const editParagraph = document.querySelectorAll('.task > p')
  numTasks.innerHTML = editParagraph.length;
  if (numTasks.innerHTML == '0') {
    numTasks.innerHTML = 'No Tasks';
  }
}

// Function To Edit Text Of Task
function editTextOfTask() {
  const task = document.querySelectorAll('.task');
  const save = document.querySelectorAll('.save');
  const edit = document.querySelectorAll('.edit');
  const editParagraph = document.querySelectorAll('.task > p')

  edit.forEach((element, index) => {
    element.addEventListener('click', () => {
      save[index].classList.remove('d-none');
      editParagraph[index].setAttribute('contenteditable', true);
      editParagraph[index].focus();

      window.addEventListener('click', () => {
        addInformation.forEach((item) => {
          if (item.id ==  task[index].id) {
            item.text = editParagraph[index].innerHTML;
            addToLocalStorage(addInformation);
          }
        })
      })
    })
  })
}

// Function To Save Edit 
function saveEdit() { 
  const save = document.querySelectorAll('.save');
  const editParagraph = document.querySelectorAll('.task > p');

  save.forEach((ele, index) => {
    ele.addEventListener('click', () => {
      ele.classList.add('d-none');
      editParagraph[index].setAttribute('contenteditable', false);
    })
  })
}

window.addEventListener('keypress', (event) => {
  if (event.key === "Enter") {
    addTaskButton.click();
  }
})