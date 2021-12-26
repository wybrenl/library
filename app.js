let myLibrary = [];
const table = document.querySelector('table');
const form = document.querySelector('#form');

class Book {
    constructor(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }
}

//retrieves elements from form, add to the library and updates the table with new book
form.addEventListener('submit', (event) => {
    event.preventDefault();
    addBookToLibrary();
    displayLibrary(myLibrary);
    form.reset();
});

//retrieves elements from form, creates new book and adds to existing library
function addBookToLibrary () {
    let title = form.elements['title'].value;
    let author = form.elements['author'].value;
    let pages = form.elements['pages'].value;
    let read = form.elements['read'].checked;
    myLibrary.push(new Book(title, author, pages, read));
}

//visually shows new book when it has been added to library
function displayLibrary (arrayOfBooks) {
        let row = document.createElement('tr');
        Object.values(arrayOfBooks[arrayOfBooks.length -1]).forEach(text => {
            let cell = document.createElement('td');
            if (text == true || text == false) {
                let node = document.createElement('toggle');
                node.classList.add(text);
                cell.appendChild(node);
                row.appendChild(cell);
            } else {
                let node = document.createTextNode(text);
                cell.appendChild(node);
                row.appendChild(cell)};
        })
        let remove = document.createElement('td');
        let removeBut = document.createElement('remove');
        removeBut.classList.add("remove");
        remove.appendChild(removeBut);
        row.appendChild(remove);
        table.appendChild(row);
    };

//remove book from table;
table.addEventListener('click', function (e) {
    if (e.target.classList.contains('remove')) {
        let row = e.target.parentNode.parentNode;
        row.parentNode.removeChild(row);
        myLibrary = myLibrary.filter(Book => Book.title !== e.target.parentNode.parentNode.children[0].innerHTML);
    }
});

//toggle read vs. to read
table.addEventListener('click', function(e) {
    if (e.target.localName == 'toggle') {
        if (e.target.classList.contains('true')) {
            e.target.classList.add('false');
            e.target.classList.remove('true');
        } else {
            e.target.classList.add('true');
            e.target.classList.remove('false');}
    }
});

