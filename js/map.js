import { createCardNode } from './cards.js';

const INITIALIZATION_TIMEOUT = 1000;
const INITIAL_VIEW = {
  lat: 35.68,
  lng: 139.75,
};
const INITIAL_ZOOM = 13;

const mainIcon = L.icon({
  iconUrl: 'img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const icon = L.icon({
  iconUrl: 'https://assets.htmlacademy.ru/content/intensive/javascript-1/demo/interactive-map/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

let map = null;
let markerGroup = null;
let mainMarker = null;
let mainMarkerCallback = null;

export const initMap = (cb) => new Promise((resolve, reject) => {
  mainMarkerCallback = cb;
  map = L.map('map-canvas');

  map.on('load', () => resolve());
  setTimeout(() => reject(new Error('Map initialization timeout')), INITIALIZATION_TIMEOUT );

  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  ).addTo(map);

  mainMarker = L.marker(
    INITIAL_VIEW,
    {
      icon: mainIcon,
      draggable: true,
    },
  );

  mainMarker.on('move', ({target}) => mainMarkerCallback ? mainMarkerCallback(target.getLatLng()) : null);

  markerGroup = L.layerGroup();

  mainMarker.addTo(map);
  markerGroup.addTo(map);

  map.setView(INITIAL_VIEW, INITIAL_ZOOM);
  mainMarkerCallback(INITIAL_VIEW);
});

export const addMarkers = (data) => {
  if (markerGroup) {
    markerGroup.clearLayers();
  }

  for (const datum of data) {
    const marker = L.marker(
      datum.location,
      {
        icon,
      },
    );

    marker
      .bindPopup(
        createCardNode(datum),
        {
          offset: [0, -35],
        },
      )
      .addTo(markerGroup);
  }
};

export const resetMap = () => {
  mainMarker.setLatLng(INITIAL_VIEW);
  map.setView(INITIAL_VIEW, INITIAL_ZOOM);
  map.closePopup();
};
