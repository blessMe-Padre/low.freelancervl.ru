export const initObserver = () => {
    const svgAnimation = document.querySelector('.svg-animate');
    console.log(svgAnimation)

    if(svgAnimation) {

    
    // Ищу внутри переменной
    const svgs = svgAnimation.querySelectorAll('svg'); 
    console.log(svgs)

    const options = {
        root: null, // используем вьюпорт в качестве корневого элемента
        rootMargin: '0px', // без отступов
        threshold: 1 // коллбек будет вызван, когда элемент полностью виден
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Добавляем класс 'active' всем кнопкам
                svgs.forEach(svg => svg.classList.add('animate'));
                // console.log('Element is in the viewport: ', entry.target);
                // Прекращаем наблюдение за элементом, так как класс уже добавлен
                observer.unobserve(entry.target);
            }
        });
    }, options);
    // Наблюдаем за элементом 
    observer.observe(svgAnimation);
}

    const svgAnimation_2 = document.querySelector('.svg-animate-2');
    // console.log(svgAnimation)
    if(svgAnimation_2) {
    // Ищу внутри переменной
    const svgs_2 = svgAnimation_2.querySelectorAll('svg'); 
    // console.log(svgs_2)

    const observer_2 = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Добавляем класс 'active' всем кнопкам
                svgs_2.forEach(svg => svg.classList.add('animate'));
                // console.log('Element is in the viewport: ', entry.target);
                // Прекращаем наблюдение за элементом, так как класс уже добавлен
                observer_2.unobserve(entry.target);
            }
        });
    }, options);

    observer_2.observe(svgAnimation_2);
}
 };

// Теперь нет необходимости в отдельной функции handleIntersection, так как коллбек интегрирован прямо в IntersectionObserver
