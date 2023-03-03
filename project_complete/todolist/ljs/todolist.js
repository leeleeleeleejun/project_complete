var add = document.getElementById('add-button');
add.addEventListener('click',addTodo);
var blank_pattern = /^\s+|\s+$/g;
var enterObj = add.previousSibling.previousSibling // getTodoList와 같은 객체
enterObj.addEventListener('keyup',function(e){
  if ((e.target.value !== '' || e.target.value !== null)&& e.target.value.replace(blank_pattern,'') !== ''){
    add.disabled=false; // enabled를 사용하는 게 이득인가?
  	if(e.key==='Enter'){
      //e.code 사용하면 두 번 실행됨
      addTodo();
    }
  }
  else add.disabled = true;
});

function addTodo () {
  var todo = document.getElementById('todo');
  var getTodoText = document.getElementById('get-todo-text');
  var box = document.createElement('li');
  var newCheckBox = document.createElement("input");
  var todoIndex = document.createElement("div");
  var newbr = document.createElement('br');
  var editButton = document.createElement('input');
  var deleteButton = document.createElement('input');
  todoIndex.appendChild(document.createTextNode(getTodoText.value));
  box.appendChild(newCheckBox);
  box.appendChild(todoIndex);
  box.appendChild(editButton);
  box.appendChild(deleteButton);
  todo.appendChild(box);
  deleteButton.setAttribute('class','delete-button');
  deleteButton.setAttribute('type', 'button');
  deleteButton.setAttribute('value','Delete');
  editButton.setAttribute('class','edit-button');
  editButton.setAttribute('type', 'button');
  editButton.setAttribute('value','Edit');
  newCheckBox.setAttribute('type','checkbox');   
  newCheckBox.addEventListener('click',checkboxAction);
  deleteButton.addEventListener('click',function(e){
    e.target.parentNode.remove();
  })
  editButton.addEventListener('click',edit);
  function edit(e){
    var editText = document.createElement('input');
    editText.setAttribute('type','text');
    editText.setAttribute('value',todoIndex.innerText);
    editText.setAttribute('class','edit-text');
    todoIndex.replaceWith(editText);
    function editEvent (e){
      todoIndex.innerHTML=e.target.value;
      e.target.replaceWith(todoIndex);
    }
    editText.addEventListener('keydown', function(e) {
      if (e.key==='Enter'){
        editEvent(e);
      }
    });
    editText.addEventListener('focusout', function(e) {
      if (e.sourceCapabilities !== null){ // focusout과 keydown 이벤트 충돌 방지
        editEvent(e);
      }
    });
  }  
  getTodoText.value = '';
  add.disabled = true;
}

function checkboxAction (e) {
  var elems = Array.from(e.target.parentNode.childNodes);
  var box = document.createElement('li');
  if (e.target.checked) {
    var completed = document.getElementById('completed');
    e.target.parentNode.remove();
    elems.forEach(function(elem, index) {
      box.appendChild(elem);
    });
    completed.appendChild(box);
  }
  else {
    e.target.parentNode.remove();
    elems.forEach(function(elem, index) {
      box.appendChild(elem);
    });
    todo.appendChild(box);
  }
}