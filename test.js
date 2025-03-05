import needle from 'needle';

// needle.get('http://localhost:3000/', (err, res) => {
//     console.log(res.body); // prints the body of the response message. In this case, “Hello”
// });
// needle.post(
//     'http://localhost:3000/submit-data',
//     {name: "NAHMAN"},
//     (err, res) => {
//         console.log(res.body) // prints the server’s response “Received a POSTrequest.”
//     }
// );

// Testing by needle POST
// Method 1
needle.post(
    'http://localhost:3000/add-book',
    {
        bookName: "Harry Potter and the Philosopher's Stone",
        isbn: "978-0-7475-3269-9",
        author: "J.K Rowling",
        yearPublished:1997   
    },
    (err, res) => {
        console.log(res.body)
    }
)

// More Post Requests for testing
// Duplicate of the first POST
needle.post(
    'http://localhost:3000/add-book',
    {
        bookName: "Harry Potter and the Philosopher's Stone",
        isbn: "978-0-7475-3269-9",
        author: "J.K Rowling",
        yearPublished:1997   
    },
    (err, res) => {
        console.log(res.body)
    }
)
// Diff book name
needle.post(
    'http://localhost:3000/add-book',
    {
        bookName: "Harry Potter and the Transmutation Table",
        isbn: "978-0-7475-3269-9",
        author: "J.K Rowling",
        yearPublished:1997   
    },
    (err, res) => {
        console.log(res.body)
    }
)
// Diff author
needle.post(
    'http://localhost:3000/add-book',
    {
        bookName: "Harry Potter and the Philosopher's Stone",
        isbn: "978-0-7475-3269-9",
        author: "J.K Rowling in the deep",
        yearPublished:1997   
    },
    (err, res) => {
        console.log(res.body)
    }
)
// Diff year
needle.post(
    'http://localhost:3000/add-book',
    {
        bookName: "Harry Potter and the Philosopher's Stone",
        isbn: "978-0-7475-3269-9",
        author: "J.K Rowling",
        yearPublished:1998   
    },
    (err, res) => {
        console.log(res.body)
    }
)
// Diff isbn
needle.post(
    'http://localhost:3000/add-book',
    {
        bookName: "Harry Potter and the Philosopher's Stone",
        isbn: "123978-1230-1237475-1233269-1239",
        author: "J.K Rowling",
        yearPublished:1997   
    },
    (err, res) => {
        console.log(res.body)
    }
)

// Links for Testing Methods
// Method 2:
//  Working link
//      http://localhost:3000/find-by-isbn-author?isbn=978-0-7475-3269-9&author=J.K+Rowling
//  Fail link
//      http://localhost:3000/find-by-isbn-author?isbn=978-0-7475-3269-9&author=J.K+Rowlingd
//      http://localhost:3000/find-by-isbn-author?isbn=978-0-7475321321-3269-9&author=J.K+Rowling
// Method 3:
//  Working Link
//      http://localhost:3000/find-by-author?author=J.K+Rowling
//  Fail link
//      http://localhost:3000/find-by-author?author=J.FK+Rowlingintheddepp