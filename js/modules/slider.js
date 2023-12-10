function slider() {
  const slides = document.querySelectorAll('.offer__slide'),
    prev = document.querySelector('.offer__slider-prev'),
    next = document.querySelector('.offer__slider-next'),
    current = document.querySelector('#current'),
    total = document.querySelector('#total')
  let sliderIndex = 1

  //переменные для второго типа слайдера
  const slidesWrapper = document.querySelector('.offer__slider-wrapper'),
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
