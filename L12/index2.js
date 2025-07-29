let todo={
    id:8910,
    title:"Todo Title",
}
let ui = document.querySelector('.todo-list');
function addtodo(){
    let li = document.createElement('li');
    li.innerHTML=`<div>
                <input type="checkbox" id="checkbox">
                <h1>${todo.title}</h1>
                <div>
                    <button class="delete">Delete</button>
                    <button class="edit">Edit</button>
                </div>
            </div>`
            ui.appendChild(li);
            li.id = todo.id;
            console.log(li);
}

addtodo();