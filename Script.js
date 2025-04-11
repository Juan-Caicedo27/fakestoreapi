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
  });
  
  // Obtener productos de la API y mostrarlos
  function fetchProducts() {
    fetch('https://fakestoreapi.com/products')
      .then(res => res.json())
      .then(data => {
        renderProducts(data);
      })
      .catch(err => console.error('Error al obtener productos:', err));
  }
  
  function renderProducts(products) {
    const list = document.getElementById('product-list');
    list.innerHTML = '';
    products.forEach(product => {
      const card = document.createElement('div');
      card.className = 'product-card';
      card.innerHTML = `
        <img src="${product.image}" alt="${product.title}" style="width:100px;height:auto;">
        <h3>${product.title}</h3>
        <p>$${product.price}</p>
        <button onclick="addToFavorites(${product.id})">❤️</button>
      `;
      list.appendChild(card);
    });
  }
  
  function addToFavorites(productId) {
    console.log('Favorito agregado:', productId);
    // Aquí puedes implementar la lógica para guardar en localStorage
  }
  
  // TODO: Implementar buscador
  // TODO: Implementar filtro por categoría
  // TODO: CRUD de favoritos en localStorage
  // TODO: Funcionalidad original
  // TODO: Manejo del formulario de registro
  