export const iniStickyHeader = () => {
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        let scrollTop = window.scrollY;
        if (scrollTop >= 50) {
            console.log(scrollTop)
            header.classList.add('header-fix');
        } else {
            header.classList.remove('header-fix');
        }
    });
}
