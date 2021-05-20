// *Создание и рендер разметки по массиву данных и предоставленному шаблону.
// !Реализация делегирования на галерее ul.js-gallery и получение url большого изображения.
// !Открытие модального окна по клику на элементе галереи.
// !Подмена значения атрибута src элемента img.lightbox__image.
// !Закрытие модального окна по клику на кнопку button[data-action="close-lightbox"].
// !Очистка значения атрибута src элемента img.lightbox__image.
// !Это необходимо для того, чтобы при следующем открытии модального окна,
//     !пока грузится изображение, мы не видели предыдущее.

import galleryItems from "./gallery-items.js";

const galleryEl = document.querySelector('.js-gallery')
const modalHandler = document.querySelector('.js-lightbox')

const createImageEl = ({ original, preview, description }) =>
    `<li class="gallery__item">
  <a
    class="gallery__link"
    href="${original}"
  >
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</li>`;

const imageList = galleryItems.map(createImageEl).join('');

galleryEl.insertAdjacentHTML('afterbegin', imageList)

galleryEl.addEventListener('click', openOriginalImage)

function openOriginalImage(event) {
    if (!event.target.classList.contains('.gallery__image')) {
        return;
    }
}