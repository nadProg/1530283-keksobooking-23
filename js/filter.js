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

const filterNode = document.querySelector('.map__filters');
const filterTypeNode = filterNode.querySelector('#housing-type');
const filterPriceNode = filterNode.querySelector('#housing-price');
const filterRoomsNode = filterNode.querySelector('#housing-rooms');
const filterGuestsNode = filterNode.querySelector('#housing-guests');
const filterFeatureNodes = Array.from(filterNode.querySelectorAll('.map__checkbox'));

let currentFilter  = {
  type: null,
  price: null,
  roomsAmount: null,
  guestsAmount: null,
  features: null,
};

let initialOffers = null;
let filteredOffers = null;

const isAny = (value) => value === 'any';

const updateFilter = () => {
  currentFilter = {
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

const isTypeMatch = (offerType) => isDefaultMatch(currentFilter.type, offerType);

const isRoomsAmountMatch = (offerRoomsAmount) => isDefaultMatch(currentFilter.roomsAmount, offerRoomsAmount);

const isGuestsAmountMatch = (offerGuestsAmount) => isDefaultMatch(currentFilter.guestsAmount, offerGuestsAmount);

const isPriceMatch = (offerPrice) => {
  switch (currentFilter.price) {
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
  const filterFeatures = currentFilter.features;
  if (!filterFeatures.length) {
    return true;
  }

  offerFeatures = new Set(offerFeatures);
  return filterFeatures.every((value) => offerFeatures.has(value));
};

const onFilterNodeChange = () => {
  updateFilter();
  filteredOffers = initialOffers.filter((offer) => (
    isTypeMatch(offer.type) &&
    isPriceMatch(offer.price) &&
    isRoomsAmountMatch(offer.roomsAmount) &&
    isGuestsAmountMatch(offer.guestsAmount) &&
    isFeaturesMatch(offer.features)
  ));
};

const reset = () => {
  filterNode.reset();
  filterNode.dispatchEvent(new Event('change'));
};

const initialize = (offers, afterFilterNodeChange) => {
  initialOffers = offers;
  enableForm(filterNode);

  filterNode.addEventListener('change', onFilterNodeChange);

  if (isFunction(afterFilterNodeChange)) {
    filterNode.addEventListener('change', () => {
      setTimeout(() => afterFilterNodeChange());
    });
  }

  reset();
};

const getFilteredOffers = () => filteredOffers;

disableForm(filterNode);

export { initialize, reset, getFilteredOffers };
