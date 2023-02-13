let myLibrary = [];
const booksDisplay = document.querySelector('.books');
const addBooksBtn = document.querySelector('.addbook');
const form = document.querySelector('.form');


booksDisplay.addEventListener('click', clearTile);
addBooksBtn.addEventListener('click', showOrSubmit);

window.onload(start());

async function start () {
    let data = await localStorage.getItem("books");
    console.log(data)
    displayBooks(data)
}

function Book (title, author, pages, readStatus, dataIdentifier) {
    this.title = title;
    this.author = author; 
    this.pages = pages;
    this.readStatus = readStatus;
    this.dataIdentifier = dataIdentifier;
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
        alert('Please, fill out all fields including answering the question asked by selecting an option.');
    } 

}

function createBook (title, author, pages, readStatus) {
    if(isNaN(pages)) {
        alert('The pages should be a number');
    } 
    let length = myLibrary.length;
    let dataIdentifier = length += 1
    const newBook = new Book(title, author, pages, readStatus, dataIdentifier);
    myLibrary.push(newBook);

    localStorage.setItem("books", JSON.stringify(myLibrary));

    // save my library to local storage
    const displayed = localStorage.getItem("books")

    displayBooks(displayed);
}


function displayBooks (data) {
    if(data.length >= 1) {
        booksDisplay.innerHTML = ''

        data.map(book => {
            let readOrNot;
            let bookHtml;
            
            if(book.readStatus) {
                readOrNot = 'Already read';
            } else {
                readOrNot = 'Not Read!'
            }
            
            if (readOrNot == 'Already read') {
                bookHtml = `
                <div class="book-item" data-identifier="${book.dataIdentifier}">
                    <h2 class="title">${book.title}</h2>
                    <p class="author">${book.author}</p>
                    <p class="pageNo">${book.pages}</p>
                    <div class="readStatus">
                        <span>${readOrNot}</span>
                    </div>
                    <button class="delete">Del</button>
                </div>
                `
            } else if(readOrNot == 'Not Read!'){
                bookHtml = `
                            <div class="book-item" data-identifier="${book.dataIdentifier}">
                                <h2 class="title"><span class="label">Title:</span> ${book.title}</h2>
                                <p class="author"><span class="label">Author:</span> ${book.author}</p>
                                <p class="pageNo">${book.pages}pgs</p>
                                <div class="readStatus">
                                    <span>${readOrNot}</span>
                                    <input type="checkbox" class="finished">
                                </div>
                                <button class="delete">Del</button>
                            </div>
                            `
            }
            
            booksDisplay.innerHTML += bookHtml;
        });
    }
} 


function clearTile(e) {
    if(e.target.textContent == 'Del') {
        let victimBookTile = e.target.parentNode.parentNode;

        victimBookTile.remove();

        myLibrary.forEach(obj => {
            if(obj.dataIdentifier == victimBookTile.dataset.identifier) {
                let vicIndex = myLibrary.indexOf(obj);
                myLibrary.splice(vicIndex, 1);
            }
        })

        // update my library after the changes
        localStorage.setItem("books",JSON.stringify(myLibrary))

    } else if(e.target.className === 'finished') {
        e.target.previousElementSibling.textContent = 'Already read';
        e.target.remove();
    }
}