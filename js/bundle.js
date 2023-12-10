/******/ ;(() => {
  // webpackBootstrap
  /******/ var __webpack_modules__ = {
    /***/ './js/modules/calc.js':
      /*!****************************!*\
  !*** ./js/modules/calc.js ***!
  \****************************/
      /***/ (module) => {
        function calc() {
          const result = document.querySelector('.calculating__result span')

          let place = 1.1,
            length,
            tonality = 550

          function calcResult() {
            if (!place || !length || !tonality) {
              result.textContent = '______'
              return
            }

            result.textContent = Math.round((300 + length * tonality) * place)
          }

          calcResult()

          function getStaticInfo(parentSelector, activeClass) {
            let ratio
            const elements = document.querySelectorAll(`${parentSelector} div`)

            elements.forEach((elem) => {
              elem.addEventListener('click', (event) => {
                ratio = +event.target.getAttribute('data-ratio')

                elements.forEach((elem) => {
                  elem.classList.remove(activeClass)

                  event.target.classList.add(activeClass)

                  if (parentSelector == '.place') {
                    place = ratio
                  } else {
                    tonality = ratio
                  }

                  calcResult()
                })
              })
            })
          }

          function getDinamicInfo(selector) {
            const input = document.querySelector(selector)

            input.addEventListener('input', () => {
              if (input.value.match(/\D/g)) {
                input.style.border = '1px solid red'
                console.log(+input.value)
              } else {
                input.style.border = 'none'
              }

              length = +input.value

              calcResult()
            })
          }

          getDinamicInfo('#height')

          getStaticInfo('.place', 'calculating__choose-item_active')
          getStaticInfo('.tonality', 'calculating__choose-item_active')
        }

        module.exports = calc

        /***/
      },

    /***/ './js/modules/cards.js':
      /*!*****************************!*\
  !*** ./js/modules/cards.js ***!
  \*****************************/
      /***/ (module) => {
        function cards() {
          class MenuCard {
            constructor(
              src,
              alt,
              title,
              descr,
              price,
              parentSelector,
              ...classes
            ) {
              this.src = src
              this.alt = alt
              this.title = title
              this.descr = descr
              this.price = price
              this.classes = classes
              this.parent = document.querySelector(parentSelector)
            }

            render() {
              const element = document.createElement('div')

              if (this.classes.length === 0) {
                //надо проверять сколько элементов в нем, а не в целом есть там что то или нет, посколько rest в любом случае создат массив, если что и пустой
                this.element = 'menu__item'
                element.classList.add(this.element)
              } else {
                this.classes.forEach((className) =>
                  element.classList.add(className)
                )
              }

              element.innerHTML = `
                <img src=${this.src} alt=${this.alt}>
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">${this.descr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> руб/метр</div>
                </div>
            `
              this.parent.append(element)
            }
          }

          new MenuCard(
            'img/tabs/3000K.jpg',
            'warm',
            'SWG 12V 3000K',
            'SWG WARM, 2835, 98 LED/м, 10 Вт/м, 12В - светодиодная гибкая лента IP33 класса LUX серии DSG2, мощность 10W/м, питание 12V, светодиоды smd 2835, 98 шт/м, световой поток 1199 lm, белая плата 8 мм, цвет свечения белый теплый, угол рассеивания светового луча 120, ̊ минимальный отрезок 71 мм (7 LED), гарантия 3 года.',
            229,
            '.menu .container',
            'menu__item',
            'big'
          ).render()

          new MenuCard(
            'img/tabs/4000K.jpg',
            'netral',
            'SWG 12V 4000K',
            'SWG NETRAL,SMD 3528, 120 LED/м, 9,6 Вт/м, 12В - светодиодная гибкая лента IP20, качество СТАНДАРТ, серия SWG3PT, светодиоды SMD 3528, 120 шт/м, цветовая температура 4000-4500К с нейтральным белым цветом свечения, мощность 9,6W/м, питание 12V, срок службы 20 000 часов, минимальный отрезок 25 мм (3 LED).',
            550,
            '.menu .container',
            'menu__item'
          ).render()

          new MenuCard(
            'img/tabs/5000K.jpg',
            'cold',
            'SWG 12V 5000K',
            'SWG COLD, 2835, 60 LED/м, 4,8 Вт/м, 12В - светодиодная гибкая лента IP20, качество ПРО, серия SWG2P, применяется для подсветки внутри помещений, белая плата шириной 8 мм на клейкой основе, светодиоды SMD2835, 60 шт/м, цветовая температура 6000-6500К, цветопередача CRI >80, мощность 4,8W/м, питание 12V.',
            430,
            '.menu .container',
            'menu__item'
          ).render()
        }

        module.exports = cards

        /***/
      },

    /***/ './js/modules/modal.js':
      /*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
      /***/ (module) => {
        function modal() {
          const modalTrigger = document.querySelectorAll('[data-modal]'),
            modal = document.querySelector('.modal'),
            modalCloseBtn = document.querySelector('[data-close]')

          function openModal() {
            modal.classList.add('show')
            modal.classList.remove('hide')
            document.body.style.overflow = 'hidden' // чтобы при открывании модального окна не двигался сам сайт
            clearInterval(modalTimerId) //если пользователь сам открыл уже это окно модальное, чтобы оно еще раз не открывалось, то при открытии сбрасываем интервал
          }

          modalTrigger.forEach((btn) => {
            btn.addEventListener('click', () => {
              openModal()
            })
          })

          function closeModal() {
            modal.classList.add('hide')
            modal.classList.remove('show')
            document.body.style.overflow = ''
          }

          modalCloseBtn.addEventListener('click', closeModal)

          modal.addEventListener('click', (e) => {
            if (e.target === modal) {
              closeModal()
            }
          })

          document.addEventListener('keydown', (e) => {
            if (e.code === 'Escape' && modal.classList.contains('show')) {
              //если евент равен эскейп, т.е. нажата кнопка ESC и модальное окно открыто, проверяем через контейнс, что есть класс шоу
              closeModal()
            }
          })

          // const modalTimerId = setTimeout(openModal, 5000);

          function showModalByScroll() {
            if (
              window.pageYOffset + document.documentElement.clientHeight >=
              document.documentElement.scrollHeight
            ) {
              openModal()
              window.removeEventListener('scroll', showModalByScroll)
            }
          }

          window.addEventListener('scroll', showModalByScroll)
        }

        module.exports = modal

        /***/
      },

    /***/ './js/modules/slider.js':
      /*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
      /***/ (module) => {
        function slider() {
          const slides = document.querySelectorAll('.offer__slide'),
            prev = document.querySelector('.offer__slider-prev'),
            next = document.querySelector('.offer__slider-next'),
            current = document.querySelector('#current'),
            total = document.querySelector('#total')
          let sliderIndex = 1

          //переменные для второго типа слайдера
          const slidesWrapper = document.querySelector(
              '.offer__slider-wrapper'
            ),
            slidesField = document.querySelector('.offer__slider-inner'),
            width = window.getComputedStyle(slidesWrapper).width //получаем значение применного стиля ксс к нашему блоку див slidesWrapper. Он выдает объект и через точкку получаем свойство

          let offset = 0

          // Один из вариантов слайдера

          // showSliders(sliderIndex);

          // function sliderIndexNum (whatNum, currentNum) { //функция чтобы задать значение тоталу и чтобы менять значение карента, для тотала мы используем длину массива со слайдерами, а для карента слайдериндекс, почитай поймешь, дядь, надеюсь понятно закодил. Можно вообще без функции, но я хотел типа оптимизейшен, ну и потренить
          //     if (slides.length < 10) {
          //         whatNum.textContent = `0${currentNum}`;
          //     } else {
          //         whatNum.textContent = currentNum;
          //     }
          // }

          // sliderIndexNum(total, slides.length)

          // if (slides.length < 10) {
          //     total.textContent = `0${slides.length}`;
          // } else {
          //     total.textContent = slides.length;
          // }

          // function showSliders(n) {
          //     if(n > slides.length) {
          //         sliderIndex = 1;
          //     }

          //     if(n < 1) {
          //         sliderIndex = slides.length;
          //     }

          //     slides.forEach(item => item.style.display = 'none');

          //     slides[sliderIndex - 1].style.display = 'block';

          //     sliderIndexNum(current, sliderIndex)
          // }

          // function plusSlides(n) {
          //     showSliders(sliderIndex += n)
          // }

          // prev.addEventListener('click', () => {
          //     plusSlides(-1);
          // })

          // next.addEventListener('click', () => {
          //     plusSlides(1);
          // })

          //второй вариант слайдера

          function deleteNotDigits(str) {
            //функйия для удаления всех букв в строке и получении цифрового результата
            return +str.replace(/\D/g, '')
          }

          if (slides.length < 10) {
            total.textContent = `0${slides.length}`
            current.textContent = `0${sliderIndex}`
          } else {
            total.textContent = slides.length
            current.textContent = sliderIndex
          }

          slidesField.style.width = 100 * slides.length + '%'
          slidesField.style.display = 'flex'
          slidesField.style.transition = '0.5s all'

          slidesWrapper.style.overflow = 'hidden'

          slides.forEach((slide) => {
            //добавляем нашим слайдам одну ширину
            slide.style.width = width
          })

          next.addEventListener('click', () => {
            if (offset === deleteNotDigits(width) * (slides.length - 1)) {
              offset = 0
            } else {
              offset += deleteNotDigits(width)
            }

            slidesField.style.transform = `translateX(-${offset}px)`

            if (sliderIndex == slides.length) {
              sliderIndex = 1
            } else {
              sliderIndex++
            }

            if (slides.length < 10) {
              current.textContent = `0${sliderIndex}`
            } else {
              current.textContent = sliderIndex
            }
          })

          prev.addEventListener('click', () => {
            const regExp = 'px'
            if (offset === 0) {
              offset = deleteNotDigits(width) * (slides.length - 1)
            } else {
              offset -= deleteNotDigits(width)
            }

            slidesField.style.transform = `translateX(-${offset}px)`

            if (sliderIndex == 1) {
              sliderIndex = slides.length
            } else {
              sliderIndex--
            }

            if (slides.length < 10) {
              current.textContent = `0${sliderIndex}`
            } else {
              current.textContent = sliderIndex
            }
          })
        }

        module.exports = slider

        /***/
      },

    /***/ './js/modules/tabs.js':
      /*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
      /***/ (module) => {
        function tabs() {
          const tabs = document.querySelectorAll('.tabheader__item'),
            tabsContent = document.querySelectorAll('.tabcontent'),
            tabsParent = document.querySelector('.tabheader__items')

          function hideTabContent() {
            //функция для скрытия табов всех
            tabsContent.forEach((item) => {
              // item.style.display = 'none'; //так мы используем энлайнстили так по старому, но тоже можно, а так через классы юзаем
              item.classList.add('hide')
              item.classList.remove('show', 'fade')
            })

            tabs.forEach((item) => {
              item.classList.remove('tabheader__item_active')
            })
          }

          function showTabContent(i = 0) {
            // tabsContent[i].style.display = 'block';//так мы используем энлайнстили так по старому, но тоже можно, а так через классы юзаем
            tabsContent[i].classList.add('show', 'fade')
            tabsContent[i].classList.remove('hide')
            tabs[i].classList.add('tabheader__item_active')
          }

          hideTabContent()
          showTabContent()

          tabsParent.addEventListener('click', (event) => {
            const target = event.target

            if (target && target.classList.contains('tabheader__item')) {
              tabs.forEach((item, i) => {
                if (target == item) {
                  hideTabContent()
                  showTabContent(i)
                }
              })
            }
          })
        }

        module.exports = tabs

        /***/
      },

    /***/ './js/modules/timer.js':
      /*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
      /***/ (module) => {
        function timer() {
          const deadline = '2024-01-01'

          function getTimeRemaining(endtime) {
            const t = Date.parse(endtime) - Date.parse(new Date()),
              days = Math.floor(t / (1000 * 3600 * 24)),
              hours = Math.floor((t / (1000 * 3600)) % 24),
              minutes = Math.floor((t / 1000 / 60) % 60),
              seconds = Math.floor((t / 1000) % 60)

            return {
              total: t,
              days: days,
              hours: hours,
              minutes: minutes,
              seconds: seconds,
            }
          }

          function getZero(num) {
            if (num >= 0 && num < 10) {
              return `0${num}`
            } else {
              return num
            }
          }

          function setClock(selector, endtime) {
            const timer = document.querySelector(selector),
              days = timer.querySelector('.days'),
              hours = timer.querySelector('.hours'),
              minutes = timer.querySelector('.minutes'),
              seconds = timer.querySelector('.seconds'),
              timeInterval = setInterval(updateClock, 1000)

            updateClock() //спецом вызываем заранее, пушто сет интвервал запустит время только через 1000мс и будет мигание времени на верстке, это некрасиво

            function updateClock() {
              const t = getTimeRemaining(endtime)

              days.innerHTML = getZero(t.days)
              hours.innerHTML = getZero(t.hours)
              minutes.innerHTML = getZero(t.minutes)
              seconds.innerHTML = getZero(t.seconds)

              if (t.total <= 0) {
                clearInterval(timeInterval)
              }
            }
          }

          setClock('.timer', deadline)
        }

        module.exports = timer

        /***/
      },

    /******/
  }
  /************************************************************************/
  /******/ // The module cache
  /******/ var __webpack_module_cache__ = {}
  /******/
  /******/ // The require function
  /******/ function __webpack_require__(moduleId) {
    /******/ // Check if module is in cache
    /******/ var cachedModule = __webpack_module_cache__[moduleId]
    /******/ if (cachedModule !== undefined) {
      /******/ return cachedModule.exports
      /******/
    }
    /******/ // Create a new module (and put it into the cache)
    /******/ var module = (__webpack_module_cache__[moduleId] = {
      /******/ // no module.id needed
      /******/ // no module.loaded needed
      /******/ exports: {},
      /******/
    })
    /******/
    /******/ // Execute the module function
    /******/ __webpack_modules__[moduleId](
      module,
      module.exports,
      __webpack_require__
    )
    /******/
    /******/ // Return the exports of the module
    /******/ return module.exports
    /******/
  }
  /******/
  /************************************************************************/
  var __webpack_exports__ = {}
  // This entry need to be wrapped in an IIFE because it need to be in strict mode.
  ;(() => {
    'use strict'
    /*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/

    window.addEventListener('DOMContentLoaded', () => {
      const tabs = __webpack_require__(
          /*! ./modules/tabs */ './js/modules/tabs.js'
        ),
        modal = __webpack_require__(
          /*! ./modules/modal */ './js/modules/modal.js'
        ),
        timer = __webpack_require__(
          /*! ./modules/timer */ './js/modules/timer.js'
        ),
        cards = __webpack_require__(
          /*! ./modules/cards */ './js/modules/cards.js'
        ),
        calc = __webpack_require__(
          /*! ./modules/calc */ './js/modules/calc.js'
        ),
        slider = __webpack_require__(
          /*! ./modules/slider */ './js/modules/slider.js'
        )

      tabs()
      modal()
      timer()
      cards()
      calc()
      slider()
    })
  })()

  /******/
})()
//# sourceMappingURL=bundle.js.map
