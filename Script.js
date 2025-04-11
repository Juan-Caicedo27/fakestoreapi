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
  
    // TODO: Llamar a la API e inicializar componentes
  });
  
  // Espacio para vincular la API:
  // fetch('https://fakestoreapi.com/products')
  //   .then(res => res.json())
  //   .then(data => console.log(data));
  
  // TODO: Implementar buscador
  // TODO: Implementar filtro por categoría
  // TODO: Implementar listado de productos
  // TODO: CRUD de favoritos en localStorage
  // TODO: Funcionalidad original
  // TODO: Manejo del formulario de registro
  