document.addEventListener('DOMContentLoaded', () => {
  const todoList = document.getElementById('todo-list');
  const newTodoInput = document.getElementById('new-todo');
  const addTodoButton = document.getElementById('add-todo');

  function renderTodos(todos) {
    todoList.innerHTML = '';
    todos.forEach(todo => {
      const li = document.createElement('li');
      li.textContent = todo.task + (todo.completed ? " (done)" : "");
      if (todo.completed) li.style.textDecoration = "line-through";
      li.addEventListener('click', e => {
        if (e.target.tagName !== 'BUTTON')
          toggleTodo(todo.id, !todo.completed);
      });

      const btn = document.createElement('button');
      btn.textContent = "Delete";
      btn.onclick = () => deleteTodo(todo.id);
      li.appendChild(btn);
      todoList.appendChild(li);
    });
  }

  function fetchTodos() {
    fetch('/api/todos')
      .then(r => r.json()).then(renderTodos);
  }

  function addTodo() {
    const task = newTodoInput.value.trim();
    if (!task) return;
    fetch('/api/todos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ task })
    }).then(res => {
      if (!res.ok) return res.json().then(d => { throw new Error(d.error); });
      newTodoInput.value = '';
      fetchTodos();
    }).catch(e => alert(e.message));
  }

  function deleteTodo(id) {
    fetch('/api/todos/' + id, { method: 'DELETE' })
      .then(res => res.json()).then(fetchTodos)
      .catch(e => alert('Delete error'));
  }

  function toggleTodo(id, completed) {
    fetch('/api/todos/' + id, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ completed })
    }).then(fetchTodos);
  }

  addTodoButton.onclick = addTodo;
  fetchTodos();
});
