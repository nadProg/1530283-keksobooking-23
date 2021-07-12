import { enableForm, disableForm, isFunction } from './utils.js';

const ANY = 'any';

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
const filterRoomsNode = mapFilterNode.querySelector('#housing-rooms');
const filterGuestsNode = mapFilterNode.querySelector('#housing-guests');
const filterFeatureNodes = Array.from(mapFilterNode.querySelectorAll('.map__checkbox'));

let initialOffers = null;
let filteredOffers = null;

disableForm(mapFilterNode);

const isAny = (value) => value === ANY;

const filterOffers = (offers) => {
  const filterTypeValue = filterTypeNode.value;
  const filterPriceValue = filterPriceNode.value;
  const filterRoomsValue = filterRoomsNode.value;
  const filterGuestsValue = filterGuestsNode.value;
  const filterFeatureValues = Array.from(
    filterFeatureNodes
      .filter(({ checked }) => checked)
      .map(({ value }) => value),
  );

  return offers.filter(({ offer}) => {
    if (!isAny(filterTypeValue)) {
      const isMatch = filterTypeValue === offer.type;

      if (!isMatch) {
        return false;
      }
    }

    if (!isAny(filterPriceValue)) {
      let isMatch = true;
      const offerPrice = Number(offer.price);

      switch (filterPriceValue) {
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

    if (!isAny(filterRoomsValue)) {
      const isMatch = offer.rooms === Number(filterRoomsValue);

      if (!isMatch) {
        return false;
      }
    }

    if (!isAny(filterGuestsValue)) {
      const isMatch = offer.guests === Number(filterGuestsValue);

      if (!isMatch) {
        return false;
      }
    }

    if (filterFeatureValues.length) {
      const features = new Set(offer.features);
      const isMatch = filterFeatureValues.every((value) => features.has(value));

      if (!isMatch) {
        return false;
      }
    }

    return true;
  });
};

const initialize = (offers, afterMapFilterNodeChange) => {
  initialOffers = offers;
  enableForm(mapFilterNode);

  mapFilterNode.addEventListener('change', () => {
    filteredOffers = filterOffers(initialOffers);

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
