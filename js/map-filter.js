import { enableForm, disableForm } from './utils.js';

const ANY = 'any';

const mapFiltersNode = document.querySelector('.map__filters');
const filterTypeNode = mapFiltersNode.querySelector('#housing-type');
const filterPriceNode = mapFiltersNode.querySelector('#housing-price');
const filterGuestsNode = mapFiltersNode.querySelector('#housing-guests');
const filterFeaturesNode = mapFiltersNode.querySelector('#housing-features');

let initialData = [];

disableForm(mapFiltersNode);

const filterDatum = ({ offer }) => {
  if (filterTypeNode.value !== ANY) {
    const isMatch = filterTypeNode.value === offer.type;

    if (!isMatch) {
      return false;
    }
  }

  if (filterPriceNode.value !== ANY) {
    let isMatch = true;
    const price = Number(offer.price);

    switch (filterPriceNode.value) {
      case 'low':
        isMatch = price < 10000;
        break;
      case 'middle':
        isMatch = price >= 10000 && price < 50000;
        break;
      case 'high':
        isMatch = price >= 50000;
        break;
    }

    if (!isMatch) {
      return false;
    }
  }

  if (filterGuestsNode.value !== ANY) {
    const isMatch = offer.guests === Number(filterGuestsNode.value);

    if (!isMatch) {
      return false;
    }
  }

  const checkedFilterFeatureNodes = filterFeaturesNode.querySelectorAll(':checked');

  if (checkedFilterFeatureNodes.length) {
    const features = new Set(offer.features);
    const isMatch = Array.from(checkedFilterFeatureNodes).map((node) => node.value).every((value) => features.has(value));

    if (!isMatch) {
      return false;
    }
  }

  return true;
};

export const initMapFilter = (data) => {
  initialData = data;
  enableForm(mapFiltersNode);

  mapFiltersNode.addEventListener('change', () => {
    const filteredData = initialData.filter(filterDatum);

    console.log(filteredData);
  });

  mapFiltersNode.dispatchEvent(new Event('change'));
};
