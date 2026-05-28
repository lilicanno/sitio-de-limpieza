document.addEventListener("DOMContentLoaded", () => {
    const botonHamburguesa = document.getElementById("abrir-menu-movil"); 
    const menuDesplegable = document.getElementById("menu-links"); 

    if (botonHamburguesa && menuDesplegable) {
        botonHamburguesa.addEventListener("click", (e) => {
            e.preventDefault();
            e.stopPropagation();
            menuDesplegable.classList.toggle("menu-abierto");
        });
    }

    const modalAnuncio = document.getElementById("miModal");
    const botonCerrar = document.getElementById("btnCerrarM");

    if (modalAnuncio) {
        setTimeout(() => {
            modalAnuncio.classList.add("active");
        }, 2000);
    }

    if (botonCerrar && modalAnuncio) {
        botonCerrar.addEventListener("click", () => {
            modalAnuncio.classList.remove("active");
        });
    }

    const botonSubir = document.querySelector(".boton-subir-cabeza");
    
    if (botonSubir) {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 300) {
                botonSubir.classList.add("visible");
            } else {
                botonSubir.classList.remove("visible");
            }
        });
    }
});