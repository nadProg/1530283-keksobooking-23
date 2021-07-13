import { enableForm, disableForm, isFunction } from './utils.js';

const FilterPriceValue = {
  ANY: 'any',
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

const isDefaultMatch =  (filterValue, offerValue) => {
  offerValue = String(offerValue);
  return isAny(filterValue) || filterValue === offerValue;
};

const isTypeMatch = isDefaultMatch;

const isRoomMatch = isDefaultMatch;

const isGuestMatch = isDefaultMatch;

const isPriceMatch = (filterValue, offerValue) => {
  offerValue = Number(offerValue);
  switch (filterValue) {
    case FilterPriceValue.ANY:
      return true;
    case FilterPriceValue.LOW:
      return offerValue < FilterPriceLimit.LOW;
    case FilterPriceValue.MIDDLE:
      return offerValue >= FilterPriceLimit.LOW && offerValue < FilterPriceLimit.HIGH;
    case FilterPriceValue.HIGH:
      return offerValue >= FilterPriceLimit.HIGH;
  }
};

const isFeaturesMatch =  (filterValues, offerValues) => {
  if (!filterValues.length) {
    return true;
  }

  offerValues = new Set(offerValues);

  return filterValues.every((value) => offerValues.has(value));
};

const filterOffer = ({ offer }) => {
  const {
    type,
    price,
    room,
    guest,
    features,
  } = getFilterValues();

  return (isTypeMatch(type, offer.type) &&
    isPriceMatch(price, offer.price) &&
    isRoomMatch(room, offer.rooms) &&
    isGuestMatch(guest, offer.guests) &&
    isFeaturesMatch(features, offer.features));
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
