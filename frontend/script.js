const API_URL = 'http://localhost:3000/api/books';

// GET_Gauna visas knygas ir atvaizduoja
async function getBooks() {
  const res = await fetch(API_URL);
  const books = await res.json();

  const container = document.getElementById('books-container');
  container.innerHTML = '';

  books.forEach((book) => {
    const card = document.createElement('div');
    card.className = 'book-card';

    // HTML struktūrą su knygos informacija į kortelę
    card.innerHTML = `
      <img src="${book.image}" alt="${book.title}" />
      <h3>${book.title}</h3>
      <p><strong>Autorius:</strong> ${book.author}</p>
      <p><strong>ID:</strong> ${book.id}</p>
    `;

    container.appendChild(card);
  });
}

// POST_Pridėti naują knyga
document.getElementById('create-btn').addEventListener('click', async () => {
  const title = document.getElementById('book-title').value;
  const author = document.getElementById('book-author').value;
  const image = document.getElementById('book-image').value;

  // nieko nedarys, jei nebus įvestas bent vienas iš laukų
  if (!title || !author || !image) {
    alert('Užpildykite visus laukus');
    return;
  }

  await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, author, image }),
  });

  getBooks();
});

// PUT_Atnaujinti knyga
document.getElementById('update-btn').addEventListener('click', async () => {
  const id = document.getElementById('book-id').value;
  const title = document.getElementById('book-title').value;
  const author = document.getElementById('book-author').value;
  const image = document.getElementById('book-image').value;

  // Patikrinama ar įvesti visi laukai ir ID
  if (!id || !title || !author || !image) {
    alert('Užpildykite visus laukus ir įveskite ID');
    return;
  }

  await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, author, image }),
  });

  getBooks();
});

// DELETE_Ištrinti knygą
document.getElementById('delete-btn').addEventListener('click', async () => {
  const id = document.getElementById('delete-id').value;

  // Patikriname ar įvestas ID
  if (!id) {
    alert('Įveskite ID');
    return;
  }

  await fetch(`${API_URL}/${id}`, {
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

  // // Įrašo vienos knygos informaciją (paveikslėlį, pavadinimą, autorių) į div'ą #single-book
  singleBookDiv.innerHTML = `
            <img src="${book.image}" alt="${book.title}" style="max-width: 200px;" />
            <h3>${book.title}</h3>
      <p><strong>Autorius:</strong> ${book.author}</p>
    `;

  document.getElementById('clear-btn').addEventListener('click', () => {
    document.getElementById('single-book').innerHTML = '';
  });
});

// funkcija vėl gauna visą knygų sąrašą ir jį atvaizduoja naujai
getBooks();
