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
