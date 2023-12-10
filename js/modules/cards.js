function cards() {
  class MenuCard {
    constructor(src, alt, title, descr, price, parentSelector, ...classes) {
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
        this.classes.forEach((className) => element.classList.add(className))
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
