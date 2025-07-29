const db = document.querySelector('.delete');
const eb = document.querySelector('.edit');

db.addEventListener('click', () => {
    console.log('Delete button clicked');
    console.log(db.parentElement.parentElement.parentElement.id)
});

eb.addEventListener('click', () => {
    console.log('Edit button clicked');
});