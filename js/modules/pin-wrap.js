export const handleScroll = () => {
    const $pinWrap = document.querySelector('.pin-wrap');
    const maxScrollValue = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercentage = window.scrollY / maxScrollValue;
    const translateXValue = -100 * scrollPercentage;

    // Округляем значения до двух знаков после запятой
    const roundedTranslateXValue = Math.round(translateXValue * 100) / 100;

    $pinWrap.style.transform = `translateX(${roundedTranslateXValue}%)`;
    // $pinWrap.style.transition = 'transform 0.3s ease';
};

export const initPinWrap = () => {
    window.addEventListener('scroll', handleScroll);

    if (window.innerWidth < 767) {
        window.removeEventListener('scroll', handleScroll);
    }
};