app.get("/books", (req, res) => {
  const q = "SELECT * FROM books.books;";
  db.connection.query(q, (err, data) => {
    if (err) return res.json({ message: err });
    else return res.json(data);
  });
});

app.post("/register/book", (req, res) => {
  const q = "INSERT INTO books(`title`,`desc`,`image`) VALUES (?)";
  const values = ["title", "desc", "image"];
  db.connection.query(q, [values], (err, data) => {
    if (err) return res.json({ message: err });
    else return res.json("Book has been registered");
  });
});
  