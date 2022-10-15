let myLibrary = [];
const booksDisplay = document.querySelector('.books');
const addBooksBtn = document.querySelector('.addbook');
addBooksBtn.addEventListener('click', showForm)

function Book (title, author, pages, readStatus) {
    this.title = title;
    this.author = author; 
    this.pages = pages;
    this.readStatus = readStatus;
    this.info = function () {
        if(this.readStatus) {
            return `The book "${this.title}" by ${this.author} is ${this.pages} pages long and you have read it.`
        } else if (!this.readStatus) {
            return `The book "${this.title}" by ${this.author} is ${this.pages} pages long and you have not read it.`
        } else {
            alert('An error has occurred!!')
        }
    }
}

function createBook (title, author, pages, readStatus) {
    if(isNaN(pages)) {
        alert('The pages should be a number');
    } 
    const newBook = new Book(title, author, pages, readStatus);
    myLibrary.push(newBook);
}


function displayBooks (myLibrary) {
    myLibrary.forEach(book => {
        let readOrNot;
        if(book.readStatus) {
            readOrNot = 'Already read';
        } else {
            readOrNot = 'Not Read!'
        }
        const bookHtml = `
        <div class="book-item">
            <h2 class="title">${book.title}</h2>
            <p class="author">${book.author}</p>
            <p class="readStatus">${readOrNot}</p>
        </div>
        `
        booksDisplay.innerHTML += bookHtml;
    });
} 

function showForm() {
    console.log('calls')
}
createBook('Ben codes', 'Ben', 40, true)
createBook('Dorothy meets Ben', 'Ben', 20, false)
createBook('Dday', 'Dorothy', 30, true)

displayBooks(myLibrary)