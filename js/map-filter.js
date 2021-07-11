import { enableForm, disableForm } from './utils.js';

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
const filterFeaturesNode = mapFilterNode.querySelector('#housing-features');

let initialData = null;
let filteredData = null;

disableForm(mapFilterNode);

const isAny = (value) => value === ANY;

const filterDatum = ({ offer }) => {
  if (!isAny(filterTypeNode.value)) {
    const isMatch = filterTypeNode.value === offer.type;

    if (!isMatch) {
      return false;
    }
  }

  if (!isAny(filterPriceNode.value)) {
    let isMatch = true;
    const offerPrice = Number(offer.price);

    switch (filterPriceNode.value) {
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

  if (!isAny(filterRoomsNode.value)) {
    const isMatch = offer.rooms === Number(filterRoomsNode.value);

    if (!isMatch) {
      return false;
    }
  }

  if (!isAny(filterGuestsNode.value)) {
    const isMatch = offer.guests === Number(filterGuestsNode.value);

    if (!isMatch) {
      return false;
    }
  }

  const checkedFilterFeatureNodes = Array.from(filterFeaturesNode.querySelectorAll(':checked'));
  if (checkedFilterFeatureNodes.length) {
    const features = new Set(offer.features);

    const isMatch = checkedFilterFeatureNodes
      .map((node) => node.value)
      .every((value) => features.has(value));

    if (!isMatch) {
      return false;
    }
  }

  return true;
};

export const initMapFilter = (data, callback) => {
  initialData = data;
  enableForm(mapFilterNode);

  mapFilterNode.addEventListener('change', () => {
    filteredData = initialData.filter(filterDatum);

    if (callback) {
      callback(filteredData);
    }
  });

  mapFilterNode.dispatchEvent(new Event('change'));
};

export const getFilteredData = () => filteredData;
