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
    renderFavorites();
  });
  
  let allProducts = [];
  
  // Firebase config
  const firebaseConfig = {
    apiKey: "AIzaSyDwuYyGgLlnjufIFEYHmW5MBxwugvyyUso",
    authDomain: "fakestore-654ff.firebaseapp.com",
    projectId: "fakestore-654ff",
    storageBucket: "fakestore-654ff.firebasestorage.app",
    messagingSenderId: "93376240477",
    appId: "1:93376240477:web:b8134a74afe90188eaa6b4"
  };
  
  firebase.initializeApp(firebaseConfig);
  const db = firebase.firestore();
  
  function handleRegisterFormSubmit(e) {
    e.preventDefault();
    const data = {
      nombre: document.getElementById('nombre').value,
      apellido: document.getElementById('apellido').value,
      email: document.getElementById('email').value,
      telefono: document.getElementById('telefono').value,
      direccion: document.getElementById('direccion').value,
      ciudad: document.getElementById('ciudad').value,
      contraseña: document.getElementById('contraseña').value
    };
  
    db.collection("usuarios").add(data)
      .then(() => {
        alert("Registro exitoso ✅");
        document.getElementById("registro-form").reset();
      })
      .catch(error => {
        console.error("Error al registrar: ", error);
        alert("Hubo un error 😓");
      });
  }
  
  document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('registro-form');
    if (form) {
      form.addEventListener('submit', handleRegisterFormSubmit);
    }
  });
  
  // Obtener productos de la API y mostrarlos
  function fetchProducts() {
    fetch('https://fakestoreapi.com/products')
      .then(res => res.json())
      .then(data => {
        allProducts = data;
        renderProducts(allProducts);
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
    renderFavorites();
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
  
  // TODO: Funcionalidad original
  