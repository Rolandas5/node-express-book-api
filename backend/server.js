const express = require('express');
const path = require('path');

const PORT = 3000;
const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, '../frontend')));

// Knygų masyvas
let books = [
  {
    id: 1,
    title: 'Haris Poteris',
    author: 'J.K. Rowling',
    image: 'https://covers.openlibrary.org/b/id/7984916-L.jpg',
  },
  {
    id: 2,
    title: 'Žiedų valdovas',
    author: 'J.R.R. Tolkien',
    image: 'https://covers.openlibrary.org/b/id/8231856-L.jpg',
  },
  {
    id: 3,
    title: 'Mažasis princas',
    author: 'Antoine de Saint-Exupéry',
    image: 'https://covers.openlibrary.org/b/id/11129979-L.jpg',
  },
  {
    id: 4,
    title: '1984',
    author: 'George Orwell',
    image: 'https://covers.openlibrary.org/b/id/1535610-L.jpg',
  },
  {
    id: 5,
    title: 'Alchemikas',
    author: 'Paulo Coelho',
    image: 'https://covers.openlibrary.org/b/id/8091016-L.jpg',
  },
];

// Pagrindinis puslapis
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

// GET: visos knygos
app.get('/api/books', (req, res) => {
  res.json(books);
});

// GET: viena knyga pagal ID
app.get('/api/books/:id', (req, res) => {
  const bookId = Number(req.params.id);
  const book = books.find((book) => book.id === bookId);

  if (!book) {
    return res.status(404).json({ error: 'Knyga nerasta' });
  }

  res.json(book);
});

// POST: sukuria nauja knygą
app.post('/api/books', (req, res) => {
  const { title, author, image } = req.body;

  if (!title || !author || !image) {
    return res.status(400).json({ error: 'Trūksta duomenų' });
  }

  const newBook = {
    id: books.length + 1,
    title,
    author,
    image,
  };

  books.push(newBook);
  res.status(201).json({ message: 'Knyga pridėta' });
});

// PUT: atnaujina knygą pagal ID
app.put('/api/books/:id', (req, res) => {
  const bookId = Number(req.params.id);
  const { title, author, image } = req.body;

  const book = books.find((book) => book.id === bookId);

  if (!book) {
    return res.status(404).json({ error: 'Knyga nerasta' });
  }

  if (title) book.title = title;
  if (author) book.author = author;
  if (image) book.image = image;

  res.json({ message: 'Knyga atnaujinta' });
});

// DELETE: istrina knygą pagal ID
app.delete('/api/books/:id', (req, res) => {
  const bookId = Number(req.params.id);
  const initialLength = books.length;

  books = books.filter((book) => book.id !== bookId);

  if (books.length === initialLength) {
    return res.status(404).json({ error: 'Knyga nerasta' });
  }

  res.json({ message: 'Knyga ištrinta' });
});

app.listen(PORT, () => {
  console.log(`Serveris veikia: http://localhost:${PORT}`);
});
