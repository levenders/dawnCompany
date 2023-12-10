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
