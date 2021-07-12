import { enableForm, disableForm, isFunction } from './utils.js';

const FilterPriceValue = {
  LOW: 'low',
  MIDDLE: 'middle',
  HIGH: 'high',
};

const FilterPriceLimit = {
  LOW: 10000,
  HIGH: 50000,
};

const mapFilterNode = document.querySelector('.map__filters');
const filterTypeNode = mapFilterNode.querySelector('#housing-type');
const filterPriceNode = mapFilterNode.querySelector('#housing-price');
const filterRoomNode = mapFilterNode.querySelector('#housing-rooms');
const filterGuestNode = mapFilterNode.querySelector('#housing-guests');
const filterFeatureNodes = Array.from(mapFilterNode.querySelectorAll('.map__checkbox'));

let initialOffers = null;
let filteredOffers = null;

disableForm(mapFilterNode);

const isAny = (value) => value === 'any';

const getFilterValues = () => ({
  type: filterTypeNode.value,
  price: filterPriceNode.value,
  room: filterRoomNode.value,
  guest: filterGuestNode.value,
  features: Array.from(
    filterFeatureNodes
      .filter(({ checked }) => checked)
      .map(({ value }) => value),
  ),
});

const filterOffer = ({ offer }) => {
  const {
    type,
    price,
    room,
    guest,
    features,
  } = getFilterValues();

  if (!isAny(type) && !(type === offer.type)) {
    return false;
  }

  if (!isAny(price)) {
    let isMatch = true;
    const offerPrice = Number(offer.price);

    switch (price) {
      case FilterPriceValue.LOW:
        isMatch = offerPrice < FilterPriceLimit.LOW;
        break;
      case FilterPriceValue.MIDDLE:
        isMatch = offerPrice >= FilterPriceLimit.LOW && offerPrice < FilterPriceLimit.HIGH;
        break;
      case FilterPriceValue.HIGH:
        isMatch = offerPrice >= FilterPriceLimit.HIGH;
        break;
    }

    if (!isMatch) {
      return false;
    }
  }

  if (!isAny(room) && !(Number(room) === offer.rooms)) {
    return false;
  }

  if (!isAny(guest) && !(Number(guest) === offer.guests)) {
    return false;
  }

  if (features.length) {
    const offerFeatures = new Set(offer.features);
    if (!features.every((feature) => offerFeatures.has(feature))) {
      return false;
    }
  }

  return true;
};

const initialize = (offers, afterMapFilterNodeChange) => {
  initialOffers = offers;
  enableForm(mapFilterNode);

  mapFilterNode.addEventListener('change', () => {
    filteredOffers = initialOffers.filter(filterOffer);

    if (isFunction(afterMapFilterNodeChange)) {
      afterMapFilterNodeChange();
    }
  });

  mapFilterNode.dispatchEvent(new Event('change'));
};

const reset = () => {
  mapFilterNode.reset();
  mapFilterNode.dispatchEvent(new Event('change'));
};

const getFilteredOffers = () => filteredOffers;

export { initialize, reset, getFilteredOffers };
