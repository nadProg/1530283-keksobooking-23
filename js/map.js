const INITIAL_VIEW = {
  lat: 35.68786,
  lng: 139.75549,
};
const INITIAL_MAIN_MARKER_COORDS = {
  lat: 35.68786,
  lng: 139.76650,
};
const INITIAL_ZOOM = 12;

let map = null;


export const initMap = () => new Promise((resolve) => {
  map = L.map('map-canvas');

  map.on('load', () => resolve());

  map.setView(INITIAL_VIEW, INITIAL_ZOOM);

  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  ).addTo(map);

  const mainMarkerIcon = L.icon({
    iconUrl: 'img/main-pin.svg',
    iconSize: [52, 52],
    iconAnchor: [52, 26],
  });

  const mainMarker = L.marker(
    INITIAL_MAIN_MARKER_COORDS,
    {
      icon: mainMarkerIcon,
      draggable: true,
    },
  );

  mainMarker.addTo(map);
});
