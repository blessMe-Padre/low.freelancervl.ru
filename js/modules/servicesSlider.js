export const initServiceSlider = () => {

    const exclusiveSlider1 = document.querySelector('.services-swiper');

    console.log(window.innerWidth);

    if (exclusiveSlider1) {
        const sliderItems1 = document.querySelectorAll('.swiper-item1');
        if (window.innerWidth < 1023) {
            sliderItems1.forEach((slide) => {
                slide.classList.add('swiper-slide');
            });
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
                return exclusiveSliderInit1();
            }
        };

        const exclusiveSliderInit1 = function () {
            swiper = new Swiper(exclusiveSlider1, {
                loop: true,
                spaceBetween: 30,
                init: true,
                slidesPerView: 1,
                navigation: {
                    nextEl: ".swiper-button-next",
                    prevEl: ".swiper-button-prev",
                }
            });
        };

        breakpoint.addEventListener('change', breakpointChecker);
        breakpointChecker();
    }
}