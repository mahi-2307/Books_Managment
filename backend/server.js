const express = require("express");
const app = express();
const db = require("./db");
const cors = require("cors");
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const PORT = 5000;

app.use(express.json());
app.use(cors());

app.get("/books", (req, res) => {
  const q = "SELECT * FROM books.books;";
  db.connection.query(q, (err, data) => {
    if (err) return res.json({ message: err });
    else {
      // Convert image data to Base64
      const booksWithBase64Images = data.map((book) => ({
        ...book,
        image: book.image.toString("base64"),
      }));
      return res.json(booksWithBase64Images);
    }
  });
});


// Apply multer upload middleware to the /register/book route for file uploads
app.post("/register/book", upload.single("image"), (req, res) => {
  const { title, desc, price } = req.body;
  const image = req.file.buffer; // Now req.file is defined
  const q = "INSERT INTO books(`title`,`desc`,`image`,`price`) VALUES (?)";
  const values = [title, desc, image, price];
  db.connection.query(q, [values], (err, data) => {
    if (err) return res.json({ message: err });
    else return res.json("Book has been registered");
  });
});

app.delete("/delete/book/:id", (req, res) => {
  const bookID = req.params.id;
  const q = "DELETE FROM books WHERE id = ?";
  db.connection.query(q, [bookID], (err, data) => {
    if (err) return res.json({ message: err });
    else return res.json("Book has been deleted");
  });
});

// Apply multer upload middleware to the /update/:id route for file uploads
app.put("/update/:id", upload.single("image"), (req, res) => {
  const bookId = req.params.id;
  const image = req.file.buffer; // Now req.file is defined
  const q =
    "UPDATE books SET `title`= ?, `desc`= ?, `price`= ?, `image`= ? WHERE id = ?";
  const { title, desc, price } = req.body;

  const values = [title, desc, price, image, bookId]; // Update the order

  db.connection.query(q, values, (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

app.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});
