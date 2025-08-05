const list = document.querySelector("#list");
const form = document.getElementById('add-item-form');
const titleInput = document.getElementById('title-input');
const descriptionInput = document.getElementById('description-input');

function renderItems(items) {
    list.innerHTML = '';
    items.forEach(item => {
        const listItem = document.createElement('li');
        const box = document.createElement('div');
        const title = document.createElement('h1');
        const description = document.createElement('p');
        const del = document.createElement('button');
        const edit = document.createElement('button');

        box.className = 'item-box';
        listItem.dataset.id = item.id;
        title.textContent = item.title;
        description.textContent = item.description;
        del.textContent = "Delete";
        edit.textContent = "Edit";

        box.append(title, description, del, edit);
        listItem.appendChild(box);
        list.appendChild(listItem);
    });
}

async function fetchAndRenderItems() {
    try {
        const response = await fetch("/users");
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const items = await response.json();
        renderItems(items);
    } catch (err) {
        console.error("Failed to fetch items:", err);
        list.innerHTML = '<li>Error loading items.</li>';
    }
}

async function addItem(event) {
    event.preventDefault();
    const title = titleInput.value.trim();
    const description = descriptionInput.value.trim();

    if (!title || !description) {
        alert("Please provide both a title and a description.");
        return;
    }

    const newItem = {
        title: title,
        description: description
    };

    try {
        const response = await fetch("/users", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newItem)
        });

        if (!response.ok) throw new Error("Failed to add item.");

        form.reset(); 
        fetchAndRenderItems(); 
    } catch (error) {
        console.error("Error adding item:", error);
        alert("Could not add the new item. Please try again.");
    }
}

form.addEventListener('submit', addItem);


fetchAndRenderItems();
