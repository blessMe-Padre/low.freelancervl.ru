export const initPinWrap = () => {
    const $pinWrap = document.querySelector('.pin-wrap');

    window.addEventListener('scroll', () => {
        const maxScrollValue = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercentage = window.scrollY / maxScrollValue;
        const translateXValue = -100 * scrollPercentage;
        $pinWrap.style.transform = `translateX(${translateXValue}%)`;
    });
}