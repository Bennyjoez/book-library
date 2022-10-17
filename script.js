let myLibrary = [];
const booksDisplay = document.querySelector('.books');
const addBooksBtn = document.querySelector('.addbook');
const form = document.querySelector('.form');
const finishedReading = document.querySelector('.finished');


addBooksBtn.addEventListener('click', showOrSubmit);

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

function showOrSubmit(e) {
    if(e.target.textContent === 'NEW BOOK') {
        showForm();
    } else {
        console.log('add book');
        grabData();
        showForm();
    }
}

function showForm() {
    form.classList.toggle('display'); 
    if(addBooksBtn.textContent == 'NEW BOOK') {
        addBooksBtn.textContent = 'ADD BOOK';
    } else {
        addBooksBtn.textContent = 'NEW BOOK'
    }
}

function grabData() {
    const bookTitle = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const pages = document.querySelector('#pages').value;
    const radioBtns = document.querySelectorAll('input[type="radio"]');
    let readStatus = '';

    radioBtns.forEach(btn => {
        if(btn.checked) {
            if(btn.value == 'Yes') {
                readStatus = true;
            } else {
                readStatus = false
            }
        }
    })

    if(bookTitle != '' && author != '' && pages != null && pages != '' && typeof readStatus === 'boolean') {
        createBook(bookTitle, author, pages, readStatus);
        document.querySelector('#title').value = '';
        document.querySelector('#author').value = '';
        document.querySelector('#pages').value = '';
        radioBtns.forEach(btn => {
            btn.checked = false
        })
    } else {
        console.log('error');
    }

}

function createBook (title, author, pages, readStatus) {
    if(isNaN(pages)) {
        alert('The pages should be a number');
    } 
    const newBook = new Book(title, author, pages, readStatus);
    myLibrary.push(newBook);

    displayBooks(myLibrary);
    console.log(title, author, pages, readStatus)
}


function displayBooks (myLibrary) {
    if(myLibrary.length >= 1) {
        booksDisplay.innerHTML = ''
        console.log(myLibrary);
        myLibrary.forEach(book => {
            let readOrNot;
            if(book.readStatus) {
                readOrNot = 'Already read';
            } else {
                readOrNot = 'Not Read!'
            }
            let bookHtml; 
            
            if (readOrNot == 'Already read') {
                bookHtml = `
                <div class="book-item">
                    <h2 class="title">${book.title}</h2>
                    <p class="author">${book.author}</p>
                    <p class="pageNo">${book.pages}</p>
                    <div class="readStatus">
                        ${readOrNot}
                    </div>
                    <div><button class="delete">Del</button></div>
                </div>
                `
            } else if(readOrNot == 'Not Read!'){
                bookHtml = `
                            <div class="book-item">
                                <h2 class="title">${book.title}</h2>
                                <p class="author">${book.author}</p>
                                <p class="pageNo">${book.pages}</p>
                                <div class="readStatus">
                                    ${readOrNot}
                                    <input type="checkbox" class="finished">
                                </div>
                                <div><button class="delete">Del</button></div>
                            </div>
                            `
            }
            
            booksDisplay.innerHTML += bookHtml;
        });
    }
} 


