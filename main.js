// *Создание и рендер разметки по массиву данных и предоставленному шаблону.
// *Реализация делегирования на галерее ul.js-gallery и получение url большого изображения.
// *Открытие модального окна по клику на элементе галереи.
// *Подмена значения атрибута src элемента img.lightbox__image.
// *Закрытие модального окна по клику на кнопку button[data-action="close-lightbox"].
// *Очистка значения атрибута src элемента img.lightbox__image.
// *Это необходимо для того, чтобы при следующем открытии модального окна,
// *пока грузится изображение, мы не видели предыдущее.

import galleryItems from "./gallery-items.js";

const galleryEl = document.querySelector('.js-gallery')
const modalHandler = document.querySelector('.js-lightbox')
// const lightboxOverlay = document.querySelector('.lightbox__overlay')
const lightboxImage = document.querySelector('.lightbox__image')
const images = galleryItems.map(image => image.original)

// ! Создаю шаблон разметки карточки картинки
const createImageCard = ({ original, preview, description }) =>
    `<li class="gallery__item">
  <a
    class="gallery__link"
    href="#"
  >
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</li>`;

// ! Создаю готовый список разметки картинок
const imageList = galleryItems.map(createImageCard).join('');
galleryEl.insertAdjacentHTML('afterbegin', imageList)

// ! Вешаю слушатель на галерею js-gallery
galleryEl.addEventListener('click', openLightbox)

// ! Callback открытия lightbox для слушателя галереи
function openLightbox(event) {
    if (!event.target.classList.contains('gallery__image')) return;

  modalHandler.classList.add('is-open')
  lightboxImage.src = event.target.dataset.source
  lightboxImage.alt = event.target.alt
  
  window.addEventListener('keydown', keyEventsLightbox);
}

// ! Слушатель для закрытия изображения по клику на button и overlay
modalHandler.addEventListener('click', closeLightbox)

// ! Callback закрытия lightbox по клику
function closeLightbox(event) {
  const btn = event.target.dataset.action
  const overlay = event.target.classList.contains('lightbox__overlay')
  if (!btn && !overlay) return;
  modalHandler.classList.remove('is-open');

  lightboxImage.src = '';
  lightboxImage.alt = '';
}

// ! Callback для событий по клавишам Escape, >, <
function keyEventsLightbox(event) {
  const curImageSrc = images.indexOf(`${lightboxImage.src}`)
  const imageArrLength = images.length - 1;

  // Стрелка вправо >>>
  if (event.key === 'ArrowRight') {
    if (curImageSrc === imageArrLength) {
      lightboxImage.src = images[0];
    } else {
      lightboxImage.src = images[curImageSrc + 1];
    }
  }

  // Стрелка влево <<
  if (event.key === 'ArrowLeft') {
    if (curImageSrc === 0) {
      lightboxImage.src = images[imageArrLength];
    } else {
      lightboxImage.src = images[curImageSrc - 1];
    }
  }

  // Закрытие на Escape
  if (event.key === 'Escape') {
    modalHandler.classList.remove('is-open')
    lightboxImage.src = '';
    lightboxImage.alt = '';
    window.removeEventListener('keydown', keyEventsLightbox);
  }
}


