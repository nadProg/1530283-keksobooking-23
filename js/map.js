import { isFunction } from './utils.js';
import { createPopupNode } from './popup.js';

const INITIAL_ZOOM = 13.5;
const INITIAL_VIEW = {
  lat: 35.68,
  lng: 139.75,
};
const ICON_URL = 'img/pin.svg';
const ICON_WIDTH = 40;
const MAIN_ICON_URL = 'img/main-pin.svg';
const MAIN_ICON_WIDTH = 52;
const TILE_LAYER_URL = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const TILE_LAYER_ATTRIBUTION = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
const POPUP_OFFSET = [0, -35];

const icon = L.icon({
  iconUrl: ICON_URL,
  iconSize: [ICON_WIDTH, ICON_WIDTH],
  iconAnchor: [ICON_WIDTH / 2, ICON_WIDTH],
});

const mainIcon = L.icon({
  iconUrl: MAIN_ICON_URL,
  iconSize: [MAIN_ICON_WIDTH, MAIN_ICON_WIDTH],
  iconAnchor: [MAIN_ICON_WIDTH / 2, MAIN_ICON_WIDTH],
});

const markerOptions = {
  icon,
};

const mainMarkerOptions = {
  icon: mainIcon,
  draggable: true,
  riseOnHover: true,
};

const popupOptions =  {
  offset: POPUP_OFFSET,
};

let map = null;
let mainMarker = null;
let markerGroup = null;

const finishInitialization = (onMainMarkerMove) => {
  markerGroup = L.layerGroup().addTo(map);
  mainMarker = L.marker(INITIAL_VIEW, mainMarkerOptions).addTo(map);

  if (isFunction(onMainMarkerMove)) {
    mainMarker.on('move', onMainMarkerMove);
  }
};

const loadTileLayer = (onMainMarkerMove) => new Promise((resolve, reject) => {
  L.tileLayer(TILE_LAYER_URL, { attribution: TILE_LAYER_ATTRIBUTION })
    .on('load', async (evt) => {
      evt.target.off();
      finishInitialization(onMainMarkerMove);
      resolve();
    })
    .on('tileerror', () => reject(new Error('Map initialization error')))
    .addTo(map);
});

const initialize = (onMainMarkerMove) => new Promise((resolve, reject) => {
  map = L.map('map-canvas');
  map.on('load', async () => {
    try {
      await loadTileLayer(onMainMarkerMove);
      resolve();
    } catch (error) {
      reject(error);
    }
  }).setView(INITIAL_VIEW, INITIAL_ZOOM);
});

const addMarkers = (data) => {
  markerGroup.clearLayers();

  data.forEach((datum) => {
    L.marker(datum.location, markerOptions)
      .bindPopup(createPopupNode(datum), popupOptions)
      .addTo(markerGroup);
  });
};

const reset = () => {
  map.closePopup();
  map.setView(INITIAL_VIEW, INITIAL_ZOOM);
  mainMarker.setLatLng(INITIAL_VIEW);
};

const getCurrentLocation = () => mainMarker.getLatLng();

const setViewToCurrentLocation = () => {
  map.closePopup();
  map.setView(getCurrentLocation(), INITIAL_ZOOM);
};

export { initialize, reset, addMarkers, getCurrentLocation, setViewToCurrentLocation };
