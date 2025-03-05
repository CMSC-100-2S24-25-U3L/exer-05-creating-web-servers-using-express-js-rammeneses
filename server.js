import express from 'express';
import { openSync, closeSync, appendFileSync } from 'node:fs';
import fs from 'node:fs';

// instantiate the server
const app = express();

// GET requests

// Method 2
app.get('/find-by-isbn-author',(req, res) => {
    let bookDetails = findByISBNAuthor(req.query.isbn, req.query.author)
    res.send(bookDetails)
})

// Method 3
app.get('/find-by-author',(req, res) => {
    let booksDetails = findByAuthor(req.query.author)
    res.send(booksDetails)
})

// POST requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Method 1
app.post('/add-book', (req, res) => {
    // These comments are explained in the first bullet of my Key Takeaways in README.md
    ////// 
    // // console.log(req.body)
    // let book = Object.assign({},req.body)
    let book = req.body
    // console.log(book)
    // console.log(book["book[bookName]"])
    // console.log(Object.keys(book).length)
    // console.log(book.type)
    // console.log("result: " + addBook(book,true))
    res.send({ success: addBook(book, true)});
});

// Functions

function addBook(book, debug = false) {
    // Checking of book object
    // Validation flags for Debugging
    let isValid = true
    
    let isValidBookName = true
    let isValidISBN = true
    let isValidAuthor = true
    let isValidYearPublished = true
    // Validation of inputs
    let length = Object.keys(book).length
    if (length !== 4) {
        isValidLength = false;
    }
    // destructure the inputs array for easier input accessing
    // let [bookName, isbn, author, yearPublished] = book;

    // Validation of inputs continuation
    // NOTE: these checks for a falsey value
    if (!book.bookName) { 
        isValidBookName = false;
    }
    // condition 3
    if (!book.isbn) { 
        isValidISBN = false;
    }
    if (!book.author) { 
        isValidAuthor = false;
    }
    if (book.yearPublished.type || book.yearPublished < 0 ) {
        isValidYearPublished = false;
    }

    // Pre-emptive return false if we see invalid inputs
    if (!isValid) {
        // Optional printing of what made the inputs invalid as an object
        if (debug){
            let toPrint = {
                isValidBookName: isValidBookName,
                isValidISBN: isValidISBN,
                isValidISBN: isValidISBN,
                isValidYearPublished: isValidYearPublished
            }
            console.log(toPrint);
            console.log("") // newline for readability
        }
        // returning false
        return false;
    }

    // Check if the book is in the books.txt file already
    let exists = checkISBN(book.isbn)
    console.log("test: "+exists)
    if (exists !== -1) {
        return false
    }
    // MODIFICATION of books.txt
    let toSave = [book.bookName, book.isbn, book.author, book.yearPublished].toString();
    // Snippet modified from 
    // https://nodejs.org/api/fs.html#fsappendfilesyncpath-data-options
    let fd;

    try {
        fd = openSync('books.txt', 'a');
        appendFileSync(fd, toSave);
        appendFileSync(fd, "\n");
    } catch (err) {
        console.log("Error in file");
    } finally {
    if (fd !== undefined)
        closeSync(fd);
    } // End of snippet
    // 
    return true;
}

function checkISBN(isbn) {
    let toReturn = -1;
    try {
        let data = fs.readFileSync("books.txt", "utf-8", "r");
        let splitData = data.split(/\n/)
        
        // Searching each book by splitting the book's details
        for (let i = 0; i < splitData.length; i++) {
            let bookISBN = splitData[i].split(',')[1]; // The ISBN is the second element after splitting the commas
            if (bookISBN == isbn) {
                toReturn = i // index of the book
                break
            }
        }
    } catch (err) {
        console.log("Error in file: " + err);
    } finally {
        return toReturn;
    }
}

// findISBNAuthor(String isbn, String author)
// 
function findByISBNAuthor(isbn, author) {
    let toReturn;
    // get index of book if found 
    let bookIndex = checkISBN(isbn)
    // pre-emptive return if a book with the isbn is not found
    if (bookIndex === -1) {
        toReturn = "Book with ISBN: \"" + isbn + "\" and author: " + author + " was not found."
        return toReturn
    }

    // Checking for the author
    let fd;

    try {
        let data = fs.readFileSync("books.txt", "utf-8", "r");
        let splitData = data.split(/\n/)
        
        // Going to the book's index
        let book = splitData[bookIndex].split(",") // Splitting the books details for access
        let bookAuthor = book[2] // The author is the third element
        if (bookAuthor === author) {
            toReturn = {
                bookName: book[0],
                isbn: book[1],
                author: book[2],
                yearPublished: book[3]
            }
        } else {
            toReturn = "Book with ISBN: \"" + isbn + "\" and author: " + author + " was not found."
        }
    } catch (err) {
        console.log("Error in file: " + err);
    } finally {
        return toReturn;
    }
}

function findByAuthor(author) {
    let toReturn = [];
    let toAppend;

    try {
        let data = fs.readFileSync("books.txt", "utf-8", "r");
        let splitData = data.split(/\n/)
        
        // Looping through the books
        for (let i = 0; i < splitData.length; i++) {
            let book = splitData[i].split(",") // Splitting the books details for access
            let bookAuthor = book[2] // The author is the third element
            if (bookAuthor === author) {
                // Enclose the data into an object
                toAppend = {
                    bookName: book[0],
                    isbn: book[1],
                    author: book[2],
                    yearPublished: book[3]
                }
                // Push to toReturn
                toReturn.push(toAppend)
            }
        }
    } catch (err) {
        console.log("Error in file: " + err);
    } finally {
        return toReturn;
    }
}

// App Listener at port 3000
app.listen(3000, () => { console.log('Server started at port 3000')} );