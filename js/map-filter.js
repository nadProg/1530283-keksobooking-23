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
const filterRoomsNode = mapFilterNode.querySelector('#housing-rooms');
const filterGuestsNode = mapFilterNode.querySelector('#housing-guests');
const filterFeatureNodes = Array.from(mapFilterNode.querySelectorAll('.map__checkbox'));

let filter  = {
  type: null,
  price: null,
  roomsAmount: null,
  guestsAmount: null,
  features: null,
};

let initialOffers = null;
let filteredOffers = null;

const isAny = (value) => value === 'any';

const updateFilterValue = () => {
  filter = {
    type: filterTypeNode.value,
    price: filterPriceNode.value,
    roomsAmount: filterRoomsNode.value,
    guestsAmount: filterGuestsNode.value,
    features: Array.from(
      filterFeatureNodes
        .filter(({ checked }) => checked)
        .map(({ value }) => value),
    ),
  };
};

const isDefaultMatch =  (filterValue, offerValue) => isAny(filterValue) || filterValue === String(offerValue);

const isTypeMatch = (offerType) => isDefaultMatch(filter.type, offerType);

const isRoomsAmountMatch = (offerRoomsAmount) => isDefaultMatch(filter.roomsAmount, offerRoomsAmount);

const isGuestsAmountMatch = (offerGuestsAmount) => isDefaultMatch(filter.guestsAmount, offerGuestsAmount);

const isPriceMatch = (offerPrice) => {
  switch (filter.price) {
    case FilterPriceValue.ANY:
      return true;
    case FilterPriceValue.LOW:
      return offerPrice < FilterPriceLimit.LOW;
    case FilterPriceValue.MIDDLE:
      return offerPrice >= FilterPriceLimit.LOW && offerPrice < FilterPriceLimit.HIGH;
    case FilterPriceValue.HIGH:
      return offerPrice >= FilterPriceLimit.HIGH;
  }
};

const isFeaturesMatch =  (offerFeatures) => {
  const filterFeatures = filter.features;
  if (!filterFeatures.length) {
    return true;
  }

  offerFeatures = new Set(offerFeatures);
  return filterFeatures.every((value) => offerFeatures.has(value));
};

const onMapFilterNodeChange = () => {
  updateFilterValue();
  filteredOffers = initialOffers.filter((offer) => (
    isTypeMatch(offer.type) &&
    isPriceMatch(offer.price) &&
    isRoomsAmountMatch(offer.roomsAmount) &&
    isGuestsAmountMatch(offer.guestsAmount) &&
    isFeaturesMatch(offer.features)
  ));
};

const reset = () => {
  mapFilterNode.reset();
  mapFilterNode.dispatchEvent(new Event('change'));
};

const initialize = (offers, afterMapFilterNodeChange) => {
  initialOffers = offers;
  enableForm(mapFilterNode);

  mapFilterNode.addEventListener('change', onMapFilterNodeChange);

  if (isFunction(afterMapFilterNodeChange)) {
    mapFilterNode.addEventListener('change', () => {
      setTimeout(() => afterMapFilterNodeChange());
    });
  }

  reset();
};

const getFilteredOffers = () => filteredOffers;

disableForm(mapFilterNode);

export { initialize, reset, getFilteredOffers };
