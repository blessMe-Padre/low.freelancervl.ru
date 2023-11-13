export const initObserver = () => {
    const svgAnimation = document.querySelector('.svg-animate');

    if (svgAnimation) {

        // Ищу внутри переменной
        const svgs = svgAnimation.querySelectorAll('svg');


        const options = {
            root: null, // используем вьюпорт в качестве корневого элемента
            rootMargin: '0px', // без отступов
            threshold: 0.1 // коллбек будет вызван, когда элемент полностью виден на 10%
        };

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Добавляем класс 'active' всем кнопкам
                    svgs.forEach(svg => svg.classList.add('animate'));
                    console.log('Element is in the viewport: ', entry.target);
                    // Прекращаем наблюдение за элементом, так как класс уже добавлен
                    observer.unobserve(entry.target);
                }
            });
        }, options);
        // Наблюдаем за элементом
        observer.observe(svgAnimation);
    }

    const svgAnimation_2 = document.querySelector('.svg-animate-2');

    if (svgAnimation_2) {
        // Ищу внутри переменной
        const svgs_2 = svgAnimation_2.querySelectorAll('svg');
        // console.log(svgs_2)

        const options = {
            root: null, // используем вьюпорт в качестве корневого элемента
            rootMargin: '0px', // без отступов
            threshold: 0.1 // коллбек будет вызван, когда элемент полностью виден
        };

        const observer_2 = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Добавляем класс 'active' всем кнопкам
                    svgs_2.forEach(svg => svg.classList.add('animate'));
                    console.log('Element is in the viewport: ', entry.target);
                    // Прекращаем наблюдение за элементом, так как класс уже добавлен
                    observer_2.unobserve(entry.target);
                }
            });
        }, options);

        observer_2.observe(svgAnimation_2);
    }




    const svgAnimation_3 = document.querySelector('.svg-animate-3');

    if (svgAnimation_3) {
        // Ищу внутри переменной
        const svgs_3 = svgAnimation_3.querySelectorAll('svg');
        // console.log(svgs_2)s

        const options = {
            root: null, // используем вьюпорт в качестве корневого элемента
            rootMargin: '0px', // без отступов
            threshold: 0.1 // коллбек будет вызван, когда элемент полностью виден
        };

        const observer_3 = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Добавляем класс 'active' всем кнопкам
                    svgs_3.forEach(svg => svg.classList.add('animate'));
                    console.log('Element is in the viewport 333333333333333: ', entry.target);
                    // Прекращаем наблюдение за элементом, так как класс уже добавлен
                    observer_3.unobserve(entry.target);
                }
            });
        }, options);

        observer_3.observe(svgAnimation_3);
    }
};

// Теперь нет необходимости в отдельной функции handleIntersection, так как коллбек интегрирован прямо в IntersectionObserver
