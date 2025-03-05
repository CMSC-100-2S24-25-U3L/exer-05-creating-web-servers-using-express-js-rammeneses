[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/WwNNILUu)

Raphael Andrei M. Meneses <br>
BS Computer Science <br>

Key Takeaways: <br>
- req.body is an empty object to accommodate HTTP requests with no parameters when this line of code is used: <br>
```javascript
app.use(express.urlencoded({ extended : false }));
let book = Object.assign({},req.body);
res.send({ success: addBook(book, true)});
```
<br>
    The additional 2 lines for JSON parsing were still needed, but I had to assign it to an object before passing it to a function in the server.
<br>
Setting extended to **true** and assigning body to an object resolved my issue.
<br>

```javascript
app.use(express.urlencoded({ extended : true }));
let book = req.body;
res.send({ success: addBook(book, true)});
```

Reference: https://stackoverflow.com/questions/56298481/how-to-fix-object-null-prototype-title-product