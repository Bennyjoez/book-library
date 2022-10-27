const books = document.querySelector('.books');
const button = document.querySelector('.addbook');
const formElement = document.querySelector('form');
const form = document.querySelector('.form');
const title = document.querySelector('#title');
const author = document.querySelector('#author');
const pages = document.querySelector('#pages');
let readOrNot = document.querySelectorAll('[name="readstatus"]');


let booksArr = [];

button.addEventListener('click', chooseOperation);
books.addEventListener('click', chooseOperation);

function chooseOperation(e) {
    if(e.target.textContent === 'NEW BOOK') {
        Respond.showForm(e)
    } else if (e.target.textContent === "ADD BOOK") {
        Respond.addBook(e)
    } else if (e.target.textContent === "Del") {
        UI.removeBook(e)
    }
}

class Respond {
    static showForm(e) {
        form.classList.toggle('display');
        e.target.textContent = "ADD BOOK";
    }
    
    static addBook(e) {
        let readStatus;

        if(readOrNot[0].checked) {
            readStatus = 'Already Read'
        } else if (readOrNot[1].checked) {
            readStatus = 'Not Read';
        }

        const book = new Book(title.value, author.value, pages.value, readStatus);
        booksArr.push(book);

        UI.addElement();
        e.target.textContent = "NEW BOOK";
        form.classList.remove('display');
        formElement.reset();
    }
}

class Book {
    constructor (bookTitle, bookAuthor, pageNumber, readStatus) {
        this.bookTitle = bookTitle,
        this.bookAuthor = bookAuthor,
        this.pageNumber = pageNumber,
        this.readStatus = readStatus
    }

}

class UI {
    static addElement() { 
        let elementsArr = booksArr.map(book => {
            return `
            <div class="book-item" data-identifier="${book.dataIdentifier}">
                <h2 class="title">${book.bookTitle}</h2>
                <p class="author">${book.bookAuthor}</p>
                <p class="pageNo">${book.pageNumber}</p>
                <div class="readStatus">
                    <span>${book.readStatus}</span>
                </div>
                <div><button class="delete">Del</button></div>
            </div>
            `
        });
        books.innerHTML = elementsArr.join(" ");
    }
    
    static removeBook(e) {
        let targetElement = e.target.parentNode.parentNode;
        let books = Array.from(targetElement.parentNode.children);
        let index = books.indexOf(targetElement);
        targetElement.remove();
        booksArr.splice(index, 1);
    }
}