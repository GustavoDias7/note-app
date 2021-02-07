// console.log("From Local Storage:", localStorage.getItem('myDataStoraged'));
const mainContainer = document.getElementById('main-container');
const addNewNote = document.getElementById('new-note');
const textareas = document.getElementsByClassName('note-text');

let database = JSON.parse(localStorage.getItem('myDataStoraged'));
if (database) database.forEach(createNewNote);

// Create new note
addNewNote.addEventListener('click', () => createNewNote());
function createNewNote(element = '') {
    const section = document.createElement('section');
    section.setAttribute('class', 'note');
    section.innerHTML =
    `<div class="bar">
        <button class="save">Save</button>
        <button class="edit active">Edit</button>
        <button class="delete">Delete</button>
    </div>
    <div class="note-text-container">
        <textarea readonly class="note-text">${element}</textarea>
    </div>`;
    mainContainer.appendChild(section);
}

// Add Event Listener on buttons EDIT and SAVE
window.document.addEventListener('click', event => {
    if (event.target.classList.contains('edit')) {
        toggleReadonlyNoteText(event);
        toggleEditSaveBTN(event);
    }
    else if (event.target.classList.contains('save')) {
        toggleReadonlyNoteText(event);
        toggleEditSaveBTN(event);
        storageText();
    }
    else if (event.target.classList.contains('delete')) {
        event.target.parentNode.parentNode.remove();
        storageText();
    }
});

/* <textarea readonly class="note-text"> */
function toggleReadonlyNoteText(event) {
     const pn = event.target.parentNode;
     const nes = pn.nextElementSibling;
     const fec = nes.firstElementChild;
    fec.toggleAttribute('readonly');
}

// activate and deactivate bottons edit and save
function toggleEditSaveBTN(event) {
    event.target.classList.toggle('active');
    if (event.target.classList.contains('edit')) {
        event.target.previousElementSibling.classList.toggle('active');
    } else {
        event.target.nextElementSibling.classList.toggle('active');
    }
    toggleColorNote(event);
}

function toggleColorNote(event) {
    event.target.parentNode.parentNode.classList.toggle('editedColorNote');
}

// Storage the note's text in a Array
function storageText() {
    let array = [];
    for (let ta of textareas) {
        array.push(ta.value)
    }
    database = [...array];
    let dataStoraged = JSON.stringify(database.filter(item => item !== ''));
    localStorage.setItem('myDataStoraged', dataStoraged);    
}