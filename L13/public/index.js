let todo=[];
let ui = document.querySelector('.todo-list');
const form = document.getElementById('add-todo-form');
const todoInput = document.getElementById('todo-input');
fetchTodos();
function addtodo(item){
    let li = document.createElement('li');
    li.innerHTML=`<div>
                <input type="checkbox" id="checkbox-${item.id}">
                <h1>${item.title}</h1>
                <div>
                    <button class="delete">Delete</button>
                    <button class="edit">Edit</button>
                </div>
            </div>`
            ui.appendChild(li);
            li.id = item.id;
            console.log(li);
}

async function fetchTodos() {
    try {
        const response = await fetch('/todo');
        if (!response.ok) throw new Error('Network response was not ok');
        const todos = await response.json();
        todos.forEach(addtodo);
    } catch (error) {
        console.error('Error fetching todos:', error);
    }
}


form.addEventListener('submit', function(event) {
    event.preventDefault();
    const newTitle = todoInput.value.trim();
    if (!newTitle) return;

    const newTodo = {
        id: Date.now(), 
        title: newTitle
    };

   
    todo.push(newTodo);

  
    addtodo(newTodo);
    todoInput.value = '';
});


ui.addEventListener('click', function(event) {
    const target = event.target;
    const li = target.closest('li');

    if (!li) return; 

    const todoId = li.id;
    if (target.classList.contains('delete')) {
        li.remove(); 
        todo = todo.filter(item => item.id != todoId); 
    }
    if (target.classList.contains('edit')) {
        const h1 = li.querySelector('h1');
        const newTitle = prompt('Edit your todo', h1.textContent);
        if (newTitle && newTitle.trim() !== '') {
            h1.textContent = newTitle.trim();
            const todoItem = todo.find(item => item.id == todoId);
            if (todoItem) todoItem.title = newTitle.trim(); 
        }
    }
});