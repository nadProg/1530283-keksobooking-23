import { createCardNode } from './cards.js';
import { isFunction } from './utils.js';

const INITIALIZATION_DELAY = 1500;
const INITIALIZATION_TIMEOUT = 5000;
const INITIAL_ZOOM = 14;
const INITIAL_VIEW = { lat: 35.68, lng: 139.75 };
const TILE_LAYER_URL = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const TILE_LAYER_ATTRIBUTION = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

const mainIcon = L.icon({
  iconUrl: 'img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const icon = L.icon({
  iconUrl: 'img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const mainMarkerOptions = {
  icon: mainIcon,
  draggable: true,
  riseOnHover: true,
};

const markerOptions = { icon };
const popupOptions =  { offset: [0, -35] };

const markerGroup = L.layerGroup();
const mainMarker = L.marker(INITIAL_VIEW, mainMarkerOptions);

let map = null;

const initialize = (callback) => new Promise((resolve, reject) => {
  map = L.map('map-canvas');

  map.on('load', () => resolve());

  setTimeout(() => reject(new Error('Map initialization timeout')), INITIALIZATION_TIMEOUT );

  L.tileLayer(TILE_LAYER_URL, { attribution: TILE_LAYER_ATTRIBUTION })
    .addTo(map);

  if (isFunction(callback)) {
    mainMarker.on('move', callback);
  }

  mainMarker.addTo(map);
  markerGroup.addTo(map);

  setTimeout(() => map.setView(INITIAL_VIEW, INITIAL_ZOOM), INITIALIZATION_DELAY);
});

const addMarkers = (data) => {
  markerGroup.clearLayers();

  data.forEach((datum) => {
    const { location } = datum;
    L.marker(location, markerOptions)
      .bindPopup(createCardNode(datum), popupOptions)
      .addTo(markerGroup);
  });
};

const reset = () => {
  map.closePopup();
  map.setView(INITIAL_VIEW, INITIAL_ZOOM);
  mainMarker.setLatLng(INITIAL_VIEW);
};

const getCurrentLocation = () => mainMarker.getLatLng();

const setViewToCurrentLocation = () => map.setView(getCurrentLocation(), INITIAL_ZOOM);

export { initialize, reset, addMarkers, getCurrentLocation, setViewToCurrentLocation };
