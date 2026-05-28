document.addEventListener("DOMContentLoaded", function () {
    const track = document.getElementById("sliderTrack");

    // Si no encuentra el riel del carrusel, frena el script para evitar errores
    if (!track) return;

    let posicionActual = 0;
    const anchoDesplazamiento = 315; // 285px de la tarjeta + 30px de separación (gap)
    const totalTarjetasReales = 4;   // Tus 4 proyectos principales

    function pasarSiguienteImagen() {
        posicionActual++;
        
        // Ejecutamos la animación hacia la izquierda
        track.style.transition = "transform 0.6s cubic-bezier(0.25, 1, 0.5, 1)";
        track.style.transform = `translateX(-${posicionActual * anchoDesplazamiento}px)`;

        // Cuando pasa de la cuarta tarjeta (es decir, llega al clon), rebota al inicio en secreto
        if (posicionActual >= totalTarjetasReales) {
            setTimeout(() => {
                track.style.transition = "none"; // Desactivamos la animación un instante
                posicionActual = 0;
                track.style.transform = `translateX(0px)`;
            }, 600); // Espera exacta a que termine de deslizarse la tarjeta (0.6s)
        }
    }

    // Intervalo de tiempo: Pasa automáticamente cada 3 segundos (3000ms)
    let autoPlay = setInterval(pasarSiguienteImagen, 3000);

    // Si el usuario pone el cursor encima de una tarjeta para verla, se detiene el movimiento
    track.addEventListener("mouseenter", () => {
        clearInterval(autoPlay);
    });

    // Cuando quita el cursor, el carrusel vuelve a pasar solo
    track.addEventListener("mouseleave", () => {
        autoPlay = setInterval(pasarSiguienteImagen, 3000);
    });
});
// --- MOVIMIENTO INTERACTIVO POR BOLITAS (TESTIMONIOS) ---
document.addEventListener("DOMContentLoaded", function () {
    const track = document.getElementById("testimoniosTrack");
    const contenedorPuntos = document.getElementById("testimoniosIndicadores");

    if (!track || !contenedorPuntos) return;

    const bolitas = contenedorPuntos.querySelectorAll(".punto-item");
    let posicionActual = 0;
    const anchoTarjetaCompleta = 390; // 360px de tarjeta + 30px de espacio (gap)
    const totalTarjetasReales = 4;    // Cantidad de testimonios base sin contar los clones

    // Función para encender la bolita correspondiente
    function actualizarIndicadores(indice) {
        bolitas.forEach(bolita => bolita.classList.remove("activa"));
        
        // El residuo (%) mapea siempre los índices al rango de las 4 bolitas (0 a 3)
        const indiceReal = indice % totalTarjetasReales;
        if (bolitas[indiceReal]) {
            bolitas[indiceReal].classList.add("activa");
        }
    }

    // Función principal de desplazamiento
    function irAlTestimonio(indice) {
        track.style.transition = "transform 0.6s cubic-bezier(0.25, 1, 0.5, 1)";
        track.style.transform = `translateX(-${indice * anchoTarjetaCompleta}px)`;
        actualizarIndicadores(indice);
    }

    // Flujo automático
    function avanzarAutomaticamente() {
        posicionActual++;
        irAlTestimonio(posicionActual);

        // Reset invisible al tocar los duplicados de apoyo
        if (posicionActual >= totalTarjetasReales) {
            setTimeout(() => {
                track.style.transition = "none";
                posicionActual = 0;
                track.style.transform = `translateX(0px)`;
                actualizarIndicadores(0);
            }, 600); // Sincronizado con los 0.6s de la animación de transición CSS
        }
    }

    // Iniciar temporizador (3.5 segundos por diapositiva)
    let loopTestimonios = setInterval(avanzarAutomaticamente, 3500);

    // Pausar si el usuario posiciona el cursor sobre el carrusel
    track.addEventListener("mouseenter", () => clearInterval(loopTestimonios));

    // Reanudar el temporizador al retirar el cursor
    track.addEventListener("mouseleave", () => {
        loopTestimonios = setInterval(avanzarAutomaticamente, 3500);
    });

    // DETECTAR CLIC EN LAS BOLITAS PARA MOVER EL CARRUSEL
    bolitas.forEach(bolita => {
        bolita.addEventListener("click", function () {
            // Detiene el temporizador automático para evitar saltos inesperados
            clearInterval(loopTestimonios);

            // Obtiene el número de tarjeta asignado a esa bolita
            posicionActual = parseInt(this.getAttribute("data-index"));

            // Mueve el carrusel inmediatamente al testimonio seleccionado
            irAlTestimonio(posicionActual);

            // Reestablece el temporizador automático de forma limpia
            loopTestimonios = setInterval(avanzarAutomaticamente, 3500);
        });
    });
});
document.addEventListener("DOMContentLoaded", function () {
    const track = document.getElementById("blog-track");
    const prevBtn = document.getElementById("blog-prev-btn");
    const nextBtn = document.getElementById("blog-next-btn");

    if (!track || !prevBtn || !nextBtn) return;

    let index = 0;

    function getVisibleCards() {
        if (window.innerWidth <= 1024) return 2;
        return 3;
    }

    function actualizarCarruselBlog() {
        const totalItems = track.children.length;
        const visibleCards = getVisibleCards();
        const maxIndex = totalItems - visibleCards;

        if (index < 0) index = 0;
        if (index > maxIndex) index = maxIndex;

        const itemWidth = track.children[0].getBoundingClientRect().width;
        const gap = 30; // Coincide con el valor del gap definido en CSS

        const desplazamiento = index * (itemWidth + gap);
        track.style.transform = `translateX(-${desplazamiento}px)`;
    }

    nextBtn.addEventListener("click", () => {
        const totalItems = track.children.length;
        if (index < totalItems - getVisibleCards()) {
            index++;
            actualizarCarruselBlog();
        }
    });

    prevBtn.addEventListener("click", () => {
        if (index > 0) {
            index--;
            actualizarCarruselBlog();
        }
    });

    window.addEventListener("resize", () => {
        index = 0; // Reseteo para evitar desajustes al redimensionar pantallas
        track.style.transform = `translateX(0px)`;
    });
});
document.addEventListener("DOMContentLoaded", function () {
    const btnScrollUp = document.getElementById("btnScrollUp");

    if (!btnScrollUp) return;

    // Detectar scroll en la ventana
    window.addEventListener("scroll", () => {
        if (window.scrollY > 400) {
            btnScrollUp.style.opacity = "1";
            btnScrollUp.style.visibility = "visible";
        } else {
            btnScrollUp.style.opacity = "0";
            btnScrollUp.style.visibility = "hidden";
        }
    });

    // Evento de clic para subir suavemente
    btnScrollUp.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
});