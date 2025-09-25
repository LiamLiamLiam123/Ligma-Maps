mapboxgl.accessToken = "pk.eyJ1IjoiY29kZW15aG9iYnkiLCJhIjoiY2tqbW1jNmxkMHg4bzJzbWpmOXFpenY2byJ9.NshhLJgIl46JtWT6ZhKEDw";

let map;
let directions;

navigator.geolocation.getCurrentPosition(successLocation, errorLocation, {
  enableHighAccuracy: true
});

function successLocation(position) {
  setUpMap([position.coords.longitude, position.coords.latitude]);
}

function errorLocation() {
  setUpMap([-2.28, 41.45]);
}

function setUpMap(center) {
  map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: center,
    zoom: 15
  });

  map.addControl(new mapboxgl.NavigationControl());

  // Add directions with metric units
  directions = new MapboxDirections({
    accessToken: mapboxgl.accessToken,
    unit: 'metric',
    language: 'en'
  });
  map.addControl(directions, 'top-left');

  // Add geolocate control (blue dot that follows user)
  const geolocate = new mapboxgl.GeolocateControl({
    positionOptions: {
      enableHighAccuracy: true
    },
    trackUserLocation: true,     // continuously update
    showUserHeading: true        // show device heading (compass arrow)
  });

  map.addControl(geolocate);

  // Automatically trigger "follow mode" when map loads
  map.on('load', () => {
    geolocate.trigger();
  });
}
