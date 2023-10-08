
const slider = document.querySelector('#carouselExampleIndicators');
const slides = document.querySelectorAll('.carousel-item');
let currentIndex = 0;

function showSlide(index) {
    if (index < 0) {
        currentIndex = slides.length - 1;
    } else if (index >= slides.length) {
        currentIndex = 0;
    }

    slides.forEach((slide, i) => {
        if (i === currentIndex) {
            slide.classList.add('active');
        } else {
            slide.classList.remove('active');
        }
    });
}

function nextSlide() {
    currentIndex++;
    showSlide(currentIndex);
}

function prevSlide() {
    currentIndex--;
    showSlide(currentIndex);
}

document.querySelector('#prevBtn').addEventListener('click', prevSlide);
document.querySelector('#nextBtn').addEventListener('click', nextSlide);

// Tampilkan slide pertama saat halaman dimuat
showSlide(currentIndex);

// Inisialisasi carousel menggunakan Bootstrap
const carousel = new bootstrap.Carousel(slider, {
    interval: 2500, // Ganti gambar setiap 3 detik
});


