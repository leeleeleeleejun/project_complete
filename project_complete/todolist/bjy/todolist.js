var getTodoId = (function () {
  var id = 0;
  return function () {
    return id++;
  };
})();

function createTodo(text) {
  var todoListElement = document.getElementById('todolist');

  var currentTodoId = getTodoId();

  var liElement = document.createElement('li');

  var input = document.createElement('input');
  input.setAttribute('type', 'checkbox');
  input.setAttribute('id', currentTodoId);

  input.addEventListener('click', function (e) {
    completeTodo(this.id, e.target.checked);
  });

  var label = document.createElement('label');
  label.setAttribute('class', 'task-name');
  label.setAttribute('for', currentTodoId);

  var addInput = document.getElementById('add-todo');

  label.innerText = addInput.value;

  var buttonWrapper = document.createElement('div');
  buttonWrapper.setAttribute('class', 'task-option');

  var editButton = document.createElement('button');
  editButton.setAttribute('type', 'button');
  editButton.innerText = 'Edit';

  var deleteButton = document.createElement('button');
  deleteButton.setAttribute('type', 'button');
  deleteButton.innerText = 'Delete';

  buttonWrapper.append(editButton, deleteButton);

  liElement.append(input, label, buttonWrapper);

  todoListElement.append(liElement);

  addInput.value = '';
}

function completeTodo(id, isComplete) {
  // 첫번째 우리가 컴플리트 섹션으로 옮길 li 태그 찾기
  var li = document.getElementById(id).parentElement;

  if (isComplete) document.getElementsByClassName('completed')[0].append(li);
  else document.getElementById('todolist').append(li);
}
