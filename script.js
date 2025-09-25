mapboxgl.accessToken = "pk.eyJ1IjoiY29kZW15aG9iYnkiLCJhIjoiY2tqbW1jNmxkMHg4bzJzbWpmOXFpenY2byJ9.NshhLJgIl46JtWT6ZhKEDw";

let map;
let directions;
let userMarker;

// Watch position continuously (instead of one-time)
navigator.geolocation.watchPosition(successLocation, errorLocation, {
  enableHighAccuracy: true
});

function successLocation(position) {
  const lng = position.coords.longitude;
  const lat = position.coords.latitude;

  if (!map) {
    // First location → setup map
    setUpMap([lng, lat]);
  } else {
    // Update marker & keep map following
    userMarker.setLngLat([lng, lat]);

    map.easeTo({
      center: [lng, lat],
      duration: 1000 // smooth follow animation
    });
  }
}

function errorLocation() {
  setUpMap([-2.28, 41.45]);
}

function setUpMap(center) {
  map = new mapboxgl.Map({
    container: "map",
    style: "mapbox://styles/mapbox/streets-v11",
    center: center,
    zoom: 15
  });

  map.addControl(new mapboxgl.NavigationControl());

  // Directions with metric units
  directions = new MapboxDirections({
    accessToken: mapboxgl.accessToken,
    unit: "metric",
    language: "en"
  });
  map.addControl(directions, "top-left");

  // Add a blue marker to represent the user
  userMarker = new mapboxgl.Marker({ color: "blue" })
    .setLngLat(center)
    .addTo(map);
}
