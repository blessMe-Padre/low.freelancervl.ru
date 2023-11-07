export const initSertificateSlider = () => {
    // слайдер "сертификаты"
    const exclusiveSlider = document.querySelector('.sertificate-swiper');

    if (exclusiveSlider) {
        const sliderItems = document.querySelectorAll('.sertificate-slide');
        console.log(window.innerWidth)
        if (window.innerWidth < 1023) {
            console.log('f')
            sliderItems.forEach((slide) => {
                slide.classList.add('swiper-slide');
            });

            console.log('количество items', sliderItems);
        }

        let breakpoint = window.matchMedia('(min-width:1023px)');
        let swiper;

        const breakpointChecker = function () {
            if (breakpoint.matches === true) {

                if (swiper !== undefined) {
                    swiper.destroy(true, true);
                } return;

            } else if (breakpoint.matches === false) {
                // eslint-disable-next-line consistent-return
                return exclusiveSliderInit();
            }
        };

        const exclusiveSliderInit = function () {
            swiper = new Swiper(exclusiveSlider, {
                loop: true,
                spaceBetween: 30,
                init: true,
                slidesPerView: 1.5,
                breakpoints: {
                    320: {
                        slidesPerView: 1.5,
                        spaceBetween: 20,
                    },

                    500: {
                        slidesPerView: 2.5,
                        spaceBetween: 30,
                    },

                    767: {
                        slidesPerView: 3.5,
                        spaceBetween: 30,
                    },
                },

            });
        };

        breakpoint.addEventListener('change', breakpointChecker);
        breakpointChecker();
    }
}