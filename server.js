import express from 'express';
import { openSync, closeSync, appendFileSync } from 'node:fs';

// instantiate the server
const app = express();

// GET requests


// POST requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
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
// // 
// app.get('/', (req, res) => {
//     res.send('Hello! there test...');
// });
// app.get('/greeting', (req, res) => {
//     res.send('Hello ' + req.query.name);
// });
// app.post('/submit-data', (req, res) => {
//     res.send('Received a POST request from ' + req.body.name);
// });


// App Listener at port 3000
app.listen(3000, () => { console.log('Server started at port 3000')} );