mapboxgl.accessToken = "pk.eyJ1IjoiY29kZW15aG9iYnkiLCJhIjoiY2tqbW1jNmxkMHg4bzJzbWpmOXFpenY2byJ9.NshhLJgIl46JtWT6ZhKEDw";

let map;
let directions;

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

  // 🔵 Geolocate control (auto-follow + heading arrow)
  const geolocate = new mapboxgl.GeolocateControl({
    positionOptions: {
      enableHighAccuracy: true
    },
    trackUserLocation: true,   // keep following
    showUserHeading: true      // rotate with compass
  });

  map.addControl(geolocate);

  // Start following as soon as the map loads
  map.on("load", () => {
    geolocate.trigger();
  });
}

if ("geolocation" in navigator) {
  navigator.geolocation.getCurrentPosition(
    (position) => {
      setUpMap([position.coords.longitude, position.coords.latitude]);
    },
    () => {
      setUpMap([-2.28, 41.45]); // fallback location
    },
    {
      enableHighAccuracy: true
    }
  );
} else {
  console.error("Geolocation not supported.");
  setUpMap([-2.28, 41.45]);
}
