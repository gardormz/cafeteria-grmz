const images = [
    'imagen/chilaquiles.jpg',
    'imagen/chilehuevillo.jpg',
    'imagen/tirado.jpg',
    'imagen/gelatina.jpg',
    'imagen/fachada.jpg'
];

let currentIndex = 0;

function changeBannerImage() {
    const banner = document.getElementById('banner-image');
    if (banner) { // Verifica que el elemento exista
        // Aplica un efecto de desvanecimiento
        banner.style.opacity = 0;

        // Cambia la imagen después de un breve retraso
        setTimeout(() => {
            currentIndex = (currentIndex + 1) % images.length;
            banner.src = images[currentIndex];
            banner.style.opacity = 1; // Vuelve a mostrar la imagen
        }, 500); // El retraso debe coincidir con la duración de la transición
    }
}

// Cambia la imagen cada 6 segundos
setInterval(changeBannerImage, 6000);