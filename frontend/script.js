const API_URL = 'http://localhost:3000/books';

// GET_Gauna visas knygas ir atvaizduoja
async function getBooks() {
  const res = await fetch(API_URL);
  const books = await res.json();

  const container = document.getElementById('books-container');
  container.innerHTML = '';

  books.forEach((book) => {
    const card = document.createElement('div');
    card.className = 'book-card';

    card.innerHTML = `
      <img src="${book.image}" alt="${book.title}" />
      <h3>${book.title}</h3>
      <p><strong>Autorius:</strong> ${book.author}</p>
      <p><strong>ID:</strong> ${book.id}</p>
    `;

    container.appendChild(card);
  });
}

// POST_Pridėti naują knygą
document.getElementById('create-btn').addEventListener('click', async () => {
  const title = document.getElementById('book-title').value;
  const author = document.getElementById('book-author').value;
  const image = document.getElementById('book-image').value;

  if (!title || !author || !image) {
    alert('Užpildykite visus laukus');
    return;
  }

  await fetch(`${API_URL}/create`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, author, image }),
  });

  getBooks();
});

// PUT_Atnaujinti knygą
document.getElementById('update-btn').addEventListener('click', async () => {
  const id = document.getElementById('book-id').value;
  const title = document.getElementById('book-title').value;
  const author = document.getElementById('book-author').value;
  const image = document.getElementById('book-image').value;

  if (!id || !title || !author || !image) {
    alert('Užpildykite visus laukus (įskaitant ID)');
    return;
  }

  await fetch(`${API_URL}/update/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, author, image }),
  });

  getBooks();
});

// DELETE_Ištrinti knygą
document.getElementById('delete-btn').addEventListener('click', async () => {
  const id = document.getElementById('delete-id').value;

  if (!id) {
    alert('Įveskite ID');
    return;
  }

  await fetch(`${API_URL}/delete/${id}`, {
    method: 'DELETE',
  });

  getBooks();
});

// Knygos gavimas pagal ID

document.getElementById('show-book-btn').addEventListener('click', async () => {
  const bookId = document.getElementById('book-id-input').value;
  const response = await fetch(`${API_URL}/${bookId}`);
  const book = await response.json();

  const singleBookDiv = document.getElementById('single-book');

  if (book.error) {
    singleBookDiv.innerHTML = '<p>Knyga nerasta</p>';
    return;
  }

  singleBookDiv.innerHTML = `
            <img src="${book.image}" alt="${book.title}" style="max-width: 200px;" />
            <h3>${book.title}</h3>
      <p><strong>Autorius:</strong> ${book.author}</p>
    `;

  document.getElementById('clear-btn').addEventListener('click', () => {
    document.getElementById('single-book').innerHTML = '';
  });
});

// Iskvieciam pradini sąrasa
getBooks();
