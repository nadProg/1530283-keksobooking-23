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

export const initMap = () => new Promise((resolve) => {
  map = L.map('map-canvas');

  map.on('load', () => resolve());

  setTimeout(() => {
    map.setView(INITIAL_VIEW, INITIAL_ZOOM);
  }, 500);

  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  ).addTo(map);

  const mainMarker = L.marker(
    INITIAL_VIEW,
    {
      icon: mainIcon,
      draggable: true,
    },
  );

  markerGroup = L.layerGroup();

  mainMarker.addTo(map);
  markerGroup.addTo(map);
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

    marker.addTo(markerGroup);
  }
};
