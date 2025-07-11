const images = [
    'imagen/chilaquiles.jpg',
    'imagen/chilehuevillo.jpg',
    'imagen/tirado.jpg',
    'imagen/gelatina.jpg',
    'imagen/fachada.jpg'
];

let currentIndex = 0;
let bannerInterval;

function showBannerImage(index) {
    const banner = document.getElementById('banner-image');
    if (banner) {
        banner.src = images[index];
    }
    updateDots();
}

function nextBannerImage() {
    currentIndex = (currentIndex + 1) % images.length;
    showBannerImage(currentIndex);
}

function prevBannerImage() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    showBannerImage(currentIndex);
}

function startBannerAutoChange() {
    bannerInterval = setInterval(nextBannerImage, 5000); // Cambia cada 5 segundos
}

function resetBannerAutoChange() {
    clearInterval(bannerInterval);
    startBannerAutoChange();
}

// Dots (bolitas)
function updateDots() {
    const dotsContainer = document.getElementById('banner-dots');
    dotsContainer.innerHTML = '';
    for (let i = 0; i < images.length; i++) {
        const dot = document.createElement('span');
        dot.className = 'dot' + (i === currentIndex ? ' active' : '');
        dot.addEventListener('click', () => {
            currentIndex = i;
            showBannerImage(currentIndex);
            resetBannerAutoChange();
        });
        dotsContainer.appendChild(dot);
    }
}

// Swipe para móvil y drag para escritorio
function addSwipeListeners() {
    const banner = document.getElementById('banner-image');
    let startX = 0;

    // Para móvil
    banner.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
    });

    banner.addEventListener('touchend', (e) => {
        let endX = e.changedTouches[0].clientX;
        if (endX < startX - 30) { // Swipe izquierda
            nextBannerImage();
            resetBannerAutoChange();
        } else if (endX > startX + 30) { // Swipe derecha
            prevBannerImage();
            resetBannerAutoChange();
        }
    });

    // Para escritorio (drag)
    banner.addEventListener('mousedown', (e) => {
        startX = e.clientX;
    });

    banner.addEventListener('mouseup', (e) => {
        let endX = e.clientX;
        if (endX < startX - 30) {
            nextBannerImage();
            resetBannerAutoChange();
        } else if (endX > startX + 30) {
            prevBannerImage();
            resetBannerAutoChange();
        }
    });
}

// Inicializar
window.addEventListener('DOMContentLoaded', () => {
    showBannerImage(currentIndex);
    startBannerAutoChange();
    addSwipeListeners();

    document.getElementById('next-banner').addEventListener('click', () => {
        nextBannerImage();
        resetBannerAutoChange();
    });

    document.getElementById('prev-banner').addEventListener('click', () => {
        prevBannerImage();
        resetBannerAutoChange();
    });
});

// Menú hamburguesa
const menuToggle = document.getElementById('menu-toggle');
const menu = document.getElementById('menu');

let menuTimeout;

if (menuToggle && menu) {
    menuToggle.addEventListener('click', () => {
        menu.classList.toggle('mostrar');
        // Si el menú se muestra, inicia el temporizador
        if (menu.classList.contains('mostrar')) {
            clearTimeout(menuTimeout); // Limpia temporizadores anteriores
            menuTimeout = setTimeout(() => {
                menu.classList.remove('mostrar');
            }, 3000); // 3000 ms = 3 segundos
        } else {
            clearTimeout(menuTimeout);
        }
    });
}

// Carga de la imagen del banner al cargar la página
window.addEventListener('load', function () {
    // Cambia la imagen del banner al cargar la página
    const banner = document.getElementById('banner-image');
    if (banner) {
        banner.src = images[currentIndex];
    }

    const loader = document.getElementById('loader');
    if (loader) {
        loader.style.display = 'none';
    }
});

// Efecto fade-in al hacer scroll
const fadeEls = document.querySelectorAll('.fade-in');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target); // Solo animar una vez
        }
    });
}, {
    threshold: 0.2 // El 20% del elemento debe ser visible
});

fadeEls.forEach(el => observer.observe(el));