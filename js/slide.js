const track = document.getElementById('blog-track');
const nextBtn = document.getElementById('blog-next');
const prevBtn = document.getElementById('blog-prev');

// Contamos cuántas tarjetas hay en total
const cards = document.querySelectorAll('.blog-card');
let index = 0;

// Función para mover el slider
function moveSlider() {
  // Calculamos el ancho de una tarjeta + su separación (gap)
  const cardWidth = cards[0].getBoundingClientRect().width + 20; 
  
  // Movemos el riel usando CSS transform
  track.style.transform = `translateX(${-index * cardWidth}px)`;
}

// Botón Siguiente
nextBtn.addEventListener('click', () => {
  // Evitamos que avance más allá del límite de tarjetas visibles
  // Si muestras 3 tarjetas en pantalla, el límite máximo es: total de tarjetas - 3
  if (index < cards.length - 3) {
    index++;
  } else {
    index = 0; // Regresa al inicio si llega al final (Bucle)
  }
  moveSlider();
});

// Botón Anterior
prevBtn.addEventListener('click', () => {
  if (index > 0) {
    index--;
  } else {
    index = cards.length - 3; // Va al final si retrocede desde el inicio
  }
  moveSlider();
});

// Re-calcular la posición si el usuario cambia el tamaño de la pantalla (Responsive)
window.addEventListener('resize', moveSlider);