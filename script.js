myLibrary = [];
const addBookBtn = document.querySelector('#addBookBtn');
const cancelBtn = document.querySelector('#cancelForm');
const dialog = document.querySelector('#form-section');
const form = document.querySelector("#addBook-form");

class Book {
    constructor(title, author, pages, isRead) {
        this.id = crypto.randomUUID()
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.isRead = isRead
    }

    info() {
        return `${this.title} by ${this.author}, ${this.pages} pages.`;
    }

    toggleRead() {
        return this.isRead = !this.isRead;
    }
}

function addBookToLibrary(title, author, pages, isRead) {
    const newBook = new Book(title, author, pages, isRead);
    console.log("New Book Created:", newBook);
    myLibrary.push(newBook);
};

function displayBook() {
    const libraryContainer = document.querySelector(".library-container");
    libraryContainer.innerHTML = "";

    myLibrary.forEach(book => {
        const bookDiv = document.createElement('div');
        bookDiv.classList.add("book-row");

        const bookTitle = document.createElement('div');
        bookTitle.classList.add("books");
        bookTitle.style.textAlign = "left";
        bookTitle.textContent = book.title;
        bookDiv.append(bookTitle);

        //Creating of the author div
        const bookAuthor = document.createElement('div');
        bookAuthor.classList.add("books");
        bookAuthor.textContent = book.author;
        bookDiv.append(bookAuthor);

        const bookPages = document.createElement('div');
        bookPages.classList.add("books");
        bookPages.textContent = book.pages;
        bookDiv.append(bookPages);

        const bookIsRead = document.createElement('div');
        bookIsRead.classList.add("books");
        const isReadBtn = document.createElement('button');
        isReadBtn.textContent = book.isRead ? "Read" : "Not Read";
        bookIsRead.append(isReadBtn);
        bookDiv.append(bookIsRead);

        isReadBtn.addEventListener("click", (e) => {
            book.isRead = !book.isRead;
            displayBook();
        });

        const bookAction = document.createElement('div');
        bookAction.classList.add("books");
        const deleteBtn = document.createElement('button');
        deleteBtn.classList.add("deleteBtn");
        deleteBtn.textContent = "Delete"
        bookAction.append(deleteBtn);
        bookDiv.append(bookAction);

        deleteBtn.addEventListener("click", (e) => {
            const indexToRemove = myLibrary.findIndex(item => item.id === book.id);

            // 2. If it found a match, cut it out
            if (indexToRemove !== -1) {
                myLibrary.splice(indexToRemove, 1);
            }

            // 3. Refresh the UI
            displayBook();
            console.log("Deleted book with ID:", book.id);
        })



        libraryContainer.append(bookDiv)

    });
}

//Listening to the form
form.addEventListener("submit", (e) => {

    e.preventDefault();
    const titleValue = document.querySelector("#title").value;
    const authorValue = document.querySelector("#author").value;
    const pagesValue = document.querySelector("#pages").value;
    const isReadValue = document.querySelector("#readStatus").checked;

    addBookToLibrary(titleValue, authorValue, pagesValue, isReadValue);
    displayBook();
    dialog.close();
    form.reset();
});

//Show dialog when addBookBtn is clicked
addBookBtn.addEventListener("click", (e) => {
    dialog.showModal();
})

cancelBtn.addEventListener("click", (e) => {
    dialog.close();
})