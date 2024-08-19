
let books = [];

window.onload = () => {

    //get books brom localstorage
    const storedBooks = localStorage.getItem('books');
    if (storedBooks) {
        books = JSON.parse(storedBooks);
        displayBooks()
    }
    
    // Get the form elements
    const titleInput = document.getElementById('title');
    const authorInput = document.getElementById('author');
    const yearInput = document.getElementById('year');
    const categoryInput = document.getElementById('category');
    const submitButton = document.getElementById('submit-btn');

    // Add event listener to the submit button
    submitButton.addEventListener('click', (event) => {
    event.preventDefault(); 

    // Get the book data from the form elements
    const title = titleInput.value.trim();
    const author = authorInput.value.trim();
    const year = yearInput.value.trim();
    const category = categoryInput.value.trim();

    // Validate the input data 
    if (!title || !author || !year || !category) {
        alert('Please fill in all fields.');
        return;
    }

    // Create a new book object
    const newBook = {
        id:crypto.randomUUID().substring(0,5),
        title: title,
        author: author,
        year: year,
        category: category
    };

    // Add the book to the array
    books.push(newBook);
    
    //save books to localstorage
    localStorage.setItem('books', JSON.stringify(books));

    // Clear the form fields
    titleInput.value = '';
    authorInput.value = '';
    yearInput.value = '';
    categoryInput.value = '';

    displayBooks()

    });

    function displayBooks(){
        const tableDisplayBody = document.getElementById('display-table')
        const tbody = document.getElementById("display-body")
        tbody.innerHTML = ""
        books.forEach((book) => {
            const row = `
            <tr>
                <td> ${book.id} </td>
                <td>${book.title}</td>
                <td>${book.author}</td>
                <td>${book.year}</td>
                <td>${book.category}</td>
                <td> <span class="delete" id="${book.id}">X</span> </td>
            </tr>
            `;
            tbody.innerHTML += row
        })
    }

    
    function deleteBook(id){
        books = books.filter((bood) => bood.id != id)
        localStorage.setItem('books', JSON.stringify(books));
        displayBooks()
    }
    
    
    
    document.getElementById("display-body").addEventListener("click", (e) => {
        if(e.target.classList.contains("delete")){
            deleteBook(e.target.id)
        }
    })
}