const todoControl = document.querySelector('.todo-control');
const headerInput = document.querySelector('.header-input');
const todoList = document.querySelector('.todo-list');
const todoCompleted = document.querySelector('.todo-completed');

let toDoData = [];

const getLocalData = function () {
  let localData = JSON.parse(localStorage.getItem('toDoData'));
  if (localData) {
    toDoData = localData;
  }
};

const render = function () {
  todoList.innerHTML = '';
  todoCompleted.innerHTML = '';

  toDoData.forEach(function (item) {
    const li = document.createElement('li');

    li.classList.add('todo-item');
    li.innerHTML = '<span class="text-todo">' + item.text + '</span>' +
      '<div class="todo-buttons">' +
      '<button class="todo-remove"></button>' +
      '<button class="todo-complete"></button>' +
      '</div>';

    if (item.completed) {
      todoCompleted.append(li);
    } else {
      todoList.append(li);
    }

    li.querySelector('.todo-remove').addEventListener('click', function () {
      li.remove();
      toDoData.forEach(function (item, index) {
        if (item.text === li.innerText) {
          toDoData.splice(index, 1);
        }
      });
    });

    li.querySelector('.todo-complete').addEventListener('click', function () {
      item.completed = !item.completed;
      render();
    });
  });
};

todoControl.addEventListener('submit', function (event) {
  event.preventDefault();

  if (headerInput.value.trim()) {
    const newToDo = {
      text: headerInput.value,
      completed: false
    };

    toDoData.push(newToDo);
    headerInput.value = '';
    render();
  }

});

window.addEventListener('unload', () => {
  localStorage.setItem('toDoData', JSON.stringify(toDoData));
});

getLocalData();
render();