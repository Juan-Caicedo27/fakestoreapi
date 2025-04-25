// Mostrar y ocultar pestañas
function showTab(tabId) {
  document.querySelectorAll('.tab').forEach(tab => {
      tab.classList.remove('active');
  });
  document.getElementById(tabId).classList.add('active');
}

// Splash screen desaparece tras 2 segundos
window.addEventListener('load', () => {
  setTimeout(() => {
      document.getElementById('splash-screen').style.display = 'none';
  }, 2000);

  // Llamar a la API e inicializar componentes
  fetchProducts();
  fetchCategories();
  initSearch();
  renderInfoTab();
});

// Declaración de la variable allProducts
let allProducts = [];


// Obtener productos de la API y mostrarlos
function fetchProducts() {
  fetch('https://fakestoreapi.com/products')
      .then(res => res.json())
      .then(data => {
          allProducts = data;
          renderProducts(allProducts); // Mostrar productos en la lista
          renderFavorites(); // Llamamos a renderFavorites después de obtener los productos
      })
      .catch(err => console.error('Error al obtener productos:', err));
}

function renderProducts(products) {
  const list = document.getElementById('product-list');
  const filteredList = document.getElementById('filtered-products');
  const searchList = document.getElementById('search-results');
  [list, filteredList, searchList].forEach(container => {
      if (container) {
          container.innerHTML = '';
          products.forEach(product => {
              const card = document.createElement('div');
              card.className = 'product-card';
              card.innerHTML = `
                  <img src="${product.image}" alt="${product.title}" style="width:100px;height:auto;">
                  <h3>${product.title}</h3>
                  <p>$${product.price}</p>
                  <button onclick="toggleFavorite(${product.id})">❤️</button>
              `;
              container.appendChild(card);
          });
      }
  });
}

function toggleFavorite(productId) {
  let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
  if (favorites.includes(productId)) {
      favorites = favorites.filter(id => id !== productId);
  } else {
      favorites.push(productId);
  }
  localStorage.setItem('favorites', JSON.stringify(favorites));
  renderFavorites(); // Llamamos a renderFavorites para actualizar la vista
}

function renderFavorites() {
  const container = document.getElementById('favorites-list');
  if (!container) return;

  container.innerHTML = '';
  const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
  const favProducts = allProducts.filter(p => favorites.includes(p.id));

  if (favProducts.length === 0) {
      container.innerHTML = '<p>No hay favoritos.</p>';
      return;
  }

  favProducts.forEach(product => {
      const card = document.createElement('div');
      card.className = 'product-card';
      card.innerHTML = `
          <img src="${product.image}" alt="${product.title}" style="width:100px;height:auto;">
          <h3>${product.title}</h3>
          <p>$${product.price}</p>
          <button onclick="toggleFavorite(${product.id})">❌ Quitar</button>
      `;
      container.appendChild(card);
  });
}

// Obtener categorías desde la API y llenar el filtro
function fetchCategories() {
  fetch('https://fakestoreapi.com/products/categories')
      .then(res => res.json())
      .then(categories => {
          const select = document.getElementById('category-filter');
          categories.forEach(cat => {
              const option = document.createElement('option');
              option.value = cat;
              option.textContent = cat;
              select.appendChild(option);
          });
      });

  document.getElementById('category-filter').addEventListener('change', e => {
      const selected = e.target.value;
      if (selected === 'all') {
          renderProducts(allProducts);
      } else {
          const filtered = allProducts.filter(p => p.category === selected);
          renderProducts(filtered);
      }
  });
}

// Buscador en tiempo real
function initSearch() {
  const input = document.getElementById('search-input');
  input.addEventListener('input', () => {
      const query = input.value.toLowerCase();
      const results = allProducts.filter(product =>
          product.title.toLowerCase().includes(query)
      );
      renderSearchResults(results);
  });
}

function renderSearchResults(products) {
  const container = document.getElementById('search-results');
  container.innerHTML = '';
  if (products.length === 0) {
      container.innerHTML = '<p>No se encontraron productos.</p>';
      return;
  }
  products.forEach(product => {
      const card = document.createElement('div');
      card.className = 'product-card';
      card.innerHTML = `
          <img src="${product.image}" alt="${product.title}" style="width:100px;height:auto;">
          <h3>${product.title}</h3>
          <p>$${product.price}</p>
          <button onclick="toggleFavorite(${product.id})">❤️</button>
      `;
      container.appendChild(card);
  });
}

function renderInfoTab() {
  const container = document.getElementById('info-content');
  container.innerHTML = `
      <div class="info-box">
          <h2>FakeStore API</h2>
          <img src="https://fakestoreapi.com/icons/logo.png" alt="API Logo" class="info-image"/>
          <p>Esta API proporciona una simulación de tienda online con productos, categorías y detalles ideales para pruebas de front-end y prototipos de e-commerce.</p>
          <p><strong>Versión:</strong> V.1.0.0</p>
          <p><strong>GitHub:</strong> @Juan-Caicedo27</p>
          <p class="author">Desarrollado por: Juan Caicedo </p>
      </div>
  `;
}
