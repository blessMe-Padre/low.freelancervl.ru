
window.addEventListener('DOMContentLoaded', () => {
    console.log('подключен скрипт main.js');

    const body = document.querySelector('body');
    const header = document.querySelector('header');

    // Меню
    const mobileMenu = document.querySelector('.mobile-menu');
    const menuButton = document.querySelector('.btn-close-menu');
    const mobileMenuLinks = document.querySelectorAll('.mobile-menu a');

    menuButton.addEventListener('click', e => {
        menuButton.classList.toggle('active');
        mobileMenu.classList.toggle('is-active');
        body.classList.toggle('lock');
    });

    mobileMenuLinks.forEach(link => {
        link.addEventListener('click', (evt) => {
            evt.preventDefault();
            menuButton.classList.remove('active');
            mobileMenu.classList.remove('is-active');
            body.classList.remove('lock');
        });
    });

    //Tabs
    const tabButtons = document.querySelectorAll("._tabs-item");
    const tabs_blocks = document.querySelectorAll("._tabs-block");

    tabButtons.forEach(button => {
        button.addEventListener('click', (evt) => {
            evt.preventDefault();
            const targetBtn = evt.currentTarget;
            const targetBtnId = targetBtn.getAttribute('data-tab');
            const currentTab = document.querySelector(targetBtnId);

            if (!targetBtn.classList.contains('_active')) {
                tabButtons.forEach(button => {
                    button.classList.remove('_active');
                    button.classList.remove('is-active');
                });

                tabs_blocks.forEach(button => {
                    button.classList.remove('_active');
                });

                targetBtn.classList.add('_active');
                targetBtn.classList.add('is-active');
                currentTab.classList.add('_active');
            }
        });
    });

    //accordions
    const accordions = document.querySelectorAll("._tabs-accordion");

    accordions.forEach(el => {
        const button = el.querySelector('._tabs-button');
        const content = el.querySelector('._tabs-content');

        button.addEventListener('click', (evt) => {
            evt.preventDefault();
            const currentButton = evt.currentTarget;

            currentButton.classList.toggle('_active');
            content.classList.toggle('_active');

            if (currentButton.classList.contains('_active')) {
                content.style.maxHeight = content.scrollHeight + 'px';
            } else {
                content.style.maxHeight = null;
            }

        });
    });

    //слайдер "Наши КЛИЕНТЫ"

    const clients = document.querySelector('.clients');
    if (clients) {
        const swiper = new Swiper('.clients-swiper', {
            loop: true,
            spaceBetween: 20,
            slidesPerView: 1,
            breakpoints: {
                580: {
                    slidesPerView: 1.5,
                    spaceBetween: 20,
                },
                767: {
                    slidesPerView: 2,
                    spaceBetween: 20,
                },
                1023: {
                    slidesPerView: 3,
                    spaceBetween: 20,
                    centeredSlides: true,
                },

                1023: {
                    slidesPerView: 4,
                    spaceBetween: 20,
                    centeredSlides: true,
                },
            },

            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
        });
    }

    // Плавный скролл до блока
    const menuLinks = document.querySelectorAll('.nav-link');
    if (menuLinks) {
        const onMenuLinkClick = (evt) => {
            const menuLink = evt.target;
            if (menuLink.dataset.goto && document.querySelector(menuLink.dataset.goto)) {
                const gotoBlock = document.querySelector(menuLink.dataset.goto);
                const gotoBlockValue = gotoBlock.getBoundingClientRect().top + pageYOffset - header.offsetHeight;

                window.scrollTo({
                    top: gotoBlockValue,
                    behavior: 'smooth',
                });
                evt.preventDefault();
            }
        };

        if (menuLinks.length > 0) {
            menuLinks.forEach((menuLink) => {
                menuLink.addEventListener('click', onMenuLinkClick);
            });
        }
    }

    window.addEventListener('scroll', () => {
        let scrollTop = window.scrollY;
        if (scrollTop >= 50) {
            header.classList.add('shadow-filter-1');
        } else {
            header.classList.remove('shadow-filter-1');
        }
    });



    // Легковесная маска для телефона
    const phoneInputs = document.querySelectorAll('input[type="tel"]');
    const COUNTRY_CODE = '+7';
    const length = COUNTRY_CODE.length;

    const replacePhoneValue = (el) => {
        const matrix = `${COUNTRY_CODE} (___) ___ __ __`;
        const def = matrix.replace(/\D/g, '');
        let i = 0;
        let val = el.value.replace(/\D/g, '');
        if (def.length >= val.length) {
            val = def;
        }
        el.value = matrix.replace(/./g, (a) => {
            // eslint-disable-next-line no-nested-ternary
            return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? '' : a;
        });
    };

    const onInputPhoneInput = ({ target }) => {
        replacePhoneValue(target);
    };

    const onFocusPhoneInput = ({ target }) => {
        if (!target.value) {
            target.value = COUNTRY_CODE;
            target.addEventListener('input', onInputPhoneInput);
            target.addEventListener('blur', onBlurPhoneInput);
            target.addEventListener('keydown', onKeydownPhoneInput);
        }
    };

    const onKeydownPhoneInput = (e) => {
        if (e.target.selectionStart <= length && e.keyCode !== 8 && e.keyCode !== 46) {
            e.target.setSelectionRange(length, length);
        }
        if ((e.target.selectionStart === length || e.target.selectionStart === 1) && e.keyCode === 8) {
            e.preventDefault();
        }
        if (e.target.selectionStart === 1 && e.keyCode === 46) {
            e.preventDefault();
        }
    };

    const onBlurPhoneInput = ({ target }) => {
        if (target.value === COUNTRY_CODE) {
            target.value = '';
            target.removeEventListener('input', onInputPhoneInput);
            target.removeEventListener('blur', onBlurPhoneInput);
        }
    };

    const initPhoneMask = () => {
        if (phoneInputs.length) {
            phoneInputs.forEach((input) => {
                input.addEventListener('focus', onFocusPhoneInput);
                if (input.value) {
                    replacePhoneValue(input);
                    input.addEventListener('input', onInputPhoneInput);
                    input.addEventListener('blur', onBlurPhoneInput);
                    input.addEventListener('keydown', onKeydownPhoneInput);
                }
            });
        }
    };

    initPhoneMask();



    //отправка формы =======================================================================================
    const forms = document.querySelectorAll('.validate-form');
    forms.forEach(form => {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();

            let error = formValidate(form);

            if (error === 0) {
                form.classList.add('_sending');
                let formData = new FormData(form);
                let response = await fetch('sendmail.php', {
                    method: 'POST',
                    body: formData
                });

                if (response.ok) {
                    let result = await response.json();
                    alert(result.message);
                    form.reset();
                    form.classList.remove('_sending');
                } else {
                    alert("Ошибка");
                    form.classList.remove('_sending');
                }
            } else {
                alert("Заполните обязательные поля");
            }
        });

        function formValidate(form) {
            let error = 0;
            let formReq = form.querySelectorAll('._req');

            for (let input of formReq) {
                formRemoveError(input);

                if (input.classList.contains('_email')) {
                    if (emailTest2(input)) {
                        formAddError(input);
                        error++;
                    }
                } else {
                    if (input.value === '') {
                        formAddError(input);
                        error++;
                    }
                }
            }
            return error;
        }

        form.querySelectorAll('input').forEach(input => {

            const inputEmail = document.querySelector('#formEmail');
            const inputMessage = document.querySelector('#formMessage');

            input.addEventListener('input', () => {
                if (input.type === 'tel' && input.value.length >= 18) {
                    input.style.border = "2px solid rgb(0, 196, 0)";
                    input.classList.remove('_error');
                } else if (input.type === 'tel' && input.value.length <= 4) {
                    input.style.border = "2px solid transparent";
                    input.classList.remove('_error');
                } else if (input.type === 'tel' && input.value.length > 4 && input.value.length <= 17) {
                    input.style.border = "2px solid red";
                } else if (input.type === 'text' && input.value.length > 2) {
                    input.classList.remove('_error');
                    input.style.border = "2px solid rgb(0, 196, 0)";
                    input.style.boxShadow = "none";
                } else if (input.type === 'text' && input.value.length === 0) {
                    input.classList.remove('_error');
                    input.style.boxShadow = "none";
                    input.style.border = "2px solid transparent";
                }
            });

            inputEmail.addEventListener('input', () => {
                inputEmail.style.border = "2px solid transparent";
                if (emailTest2(inputEmail)) {
                    inputEmail.classList.remove('_error');
                    inputEmail.style.border = "2px solid green";
                }
                if (!emailTest2(inputEmail)) {
                    inputEmail.style.border = "2px solid red";
                }
                if (inputEmail.value.length < 1) {
                    inputEmail.classList.remove('_error');
                    inputEmail.style.boxShadow = "none";
                    inputEmail.style.border = "2px solid transparent";
                }
            });

            inputMessage.addEventListener('input', () => {
                if (inputMessage.value.length >= 2) {
                    inputMessage.classList.remove('_error');
                }
            });
        });
    });



    function formAddError(input) {
        input.parentElement.classList.add('_error');
        input.classList.add('_error');
    }

    function formRemoveError(input) {
        input.parentElement.classList.remove('_error');
        input.classList.remove('_error');
    }


    // =========================================================================================
    //Функция теста email
    function emailTest(input) {
        return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
    }

    function emailTest2(input) {
        return /[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+/.test(input.value);
    }


    // popup =========================================================================================

    const popupLinks = document.querySelectorAll('.popup-link');
    const lockPadding = document.querySelectorAll(".lock-padding");
    let unlock = true;

    const timeout = 800;

    if (popupLinks.length > 0) {
        for (let index = 0; index < popupLinks.length; index++) {
            const popupLink = popupLinks[index];
            popupLink.addEventListener("click", function (e) {
                const popupName = popupLink.getAttribute('href').replace('#', '');
                const curentPopup = document.getElementById(popupName);
                popupOpen(curentPopup);
                e.preventDefault();
            });
        }
    }
    const popupCloseIcon = document.querySelectorAll('.close-popup');
    if (popupCloseIcon.length > 0) {
        for (let index = 0; index < popupCloseIcon.length; index++) {
            const el = popupCloseIcon[index];
            el.addEventListener('click', function (e) {
                popupClose(el.closest('.popup'));
                e.preventDefault();
            });
        }
    }

    function popupOpen(curentPopup) {
        if (curentPopup && unlock) {
            const popupActive = document.querySelector('.popup.open');
            if (popupActive) {
                popupClose(popupActive, false);
            } else {
                bodyLock();
            }
            curentPopup.classList.add('open');
            curentPopup.addEventListener("click", function (e) {
                if (!e.target.closest('.popup__content')) {
                    popupClose(e.target.closest('.popup'));
                }
            });
        }
    }

    function popupClose(popupActive, doUnlock = true) {
        if (unlock) {
            popupActive.classList.remove('open');
            if (doUnlock) {
                bodyUnLock();
            }
        }
    }

    function bodyLock() {
        const lockPaddingValue = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';

        if (lockPadding.length > 0) {
            for (let index = 0; index < lockPadding.length; index++) {
                const el = lockPadding[index];
                el.style.paddingRight = lockPaddingValue;
            }
        }

        body.style.paddingRight = lockPaddingValue;
        body.classList.add('lock');

        unlock = false;
        setTimeout(function () {
            unlock = true;
        }, timeout);
    }

    function bodyUnLock() {
        setTimeout(function () {
            if (lockPadding.length > 0) {
                for (let index = 0; index < lockPadding.length; index++) {
                    const el = lockPadding[index];
                    el.style.paddingRight = '0px';
                }
            }
            body.style.paddingRight = '0px';
            body.classList.remove('lock');
        }, timeout);

        unlock = false;
        setTimeout(function () {
            unlock = true;
        }, timeout);
    }

    document.addEventListener('keydown', function (e) {
        if (e.which === 27) {
            const popupActive = document.querySelector('.popup.open');
            popupClose(popupActive);
        }
    });

    (function () {
        // проверяем поддержку
        if (!Element.prototype.closest) {
            // реализуем
            Element.prototype.closest = function (css) {
                var node = this;
                while (node) {
                    if (node.matches(css)) return node;
                    else node = node.parentElement;
                }
                return null;
            };
        }
    })();
    (function () {
        // проверяем поддержку
        if (!Element.prototype.matches) {
            // определяем свойство
            Element.prototype.matches = Element.prototype.matchesSelector ||
                Element.prototype.webkitMatchesSelector ||
                Element.prototype.mozMatchesSelector ||
                Element.prototype.msMatchesSelector;
        }
    })();

    // DOMContentLoaded
});
