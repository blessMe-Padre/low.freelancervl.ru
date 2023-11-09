export const initHeroSlider = () => {
    const hero = document.querySelector('.hero');

    if (!hero) {
        return;
    }

    const img = document.querySelector('.hero-item-img');
    const item = document.querySelector('.hero-item-1');

    const img2 = document.querySelector('.hero-item-img-2');
    const item2 = document.querySelector('.hero-item-2');

    img.addEventListener('click', () => {
        item.classList.toggle('is-active');
        if (item2.classList.contains('is-active')) {
            item2.classList.remove('is-active');
        }
    });

    img2.addEventListener('click', () => {
        item2.classList.toggle('is-active');
    });

    const heroSlider = function () {
        let swiper = new Swiper(document.querySelector('.hero-swiper'), {
            loop: true,
            spaceBetween: 30,
            init: true,
            slidesPerView: 3,

            // Navigation arrows
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
        });
    };

    heroSlider();
}