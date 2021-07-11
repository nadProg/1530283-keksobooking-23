import { renderNodes } from './utils.js';

const offerTypes = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель',
};

const popupTemplateNode = document.querySelector('#card').content.querySelector('.popup');
const photoTemplateNode = popupTemplateNode.querySelector('.popup__photo');

const createPhotoNode = (photo) => {
  const photoNode = photoTemplateNode.cloneNode(true);
  photoNode.src = photo;

  return photoNode;
};

const createFeatureNode = (featureType) => {
  const featureNode = document.createElement('li');
  featureNode.classList.add('popup__feature', `popup__feature--${featureType}`);

  return featureNode;
};

export const createPopupNode = ({ author, offer }) => {
  const popupNode = popupTemplateNode.cloneNode(true);

  popupNode.querySelector('.popup__avatar').src = author.avatar;
  popupNode.querySelector('.popup__title').textContent = offer.title;
  popupNode.querySelector('.popup__type').textContent = offerTypes[offer.type];
  popupNode.querySelector('.popup__text--price').textContent = `${offer.price} ₽/ночь`;
  popupNode.querySelector('.popup__text--address').textContent = offer.address;
  popupNode.querySelector('.popup__text--capacity').textContent = `${offer.rooms} комнаты для ${offer.guests} гостей`;
  popupNode.querySelector('.popup__text--time').textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;
  popupNode.querySelector('.popup__description').textContent = offer.description;

  const featuresContainerNode = popupNode.querySelector('.popup__features');
  if (offer.features) {
    const featureNodes = offer.features.map(createFeatureNode);
    featuresContainerNode.innerHTML = '';
    renderNodes(featureNodes, featuresContainerNode);
  } else {
    featuresContainerNode.remove();
  }

  const photosContainerNode = popupNode.querySelector('.popup__photos');
  if (offer.photos) {
    const photoNodes = offer.photos.map(createPhotoNode);
    photosContainerNode.innerHTML = '';
    renderNodes(photoNodes, photosContainerNode);
  } else {
    photosContainerNode.remove();
  }

  return popupNode;
};
