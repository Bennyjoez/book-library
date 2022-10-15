let myLibrary = [];
const booksDisplay = document.querySelector('.books');

function Book (title, author, pages, readStatus) {
    this.title = title;
    this.author = author; 
    this.pages = pages;
    this.readStatus = readStatus;
    this.info = function () {
        if(this.readStatus) {
            return `The book "${this.title}" by ${this.author} is ${this.pages} pages long and you have read it.`
        } else {
            return `The book "${this.title}" by ${this.author} is ${this.pages} pages long and you have not read it.`
        }
    }
}

function createBook (title, author, pages, readStatus) {
    const newBook = new Book(title, author, pages, readStatus);
    myLibrary.push(newBook);
}

// createBook('Ben codes', 'Ben', 40, true)

function displayBooks () {
    
}