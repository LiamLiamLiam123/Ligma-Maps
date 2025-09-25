mapboxgl.accessToken = "pk.eyJ1IjoiY29kZW15aG9iYnkiLCJhIjoiY2tqbW1jNmxkMHg4bzJzbWpmOXFpenY2byJ9.NshhLJgIl46JtWT6ZhKEDw";

let map;
let userMarker;
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

  // Initial blue dot marker
  userMarker = new mapboxgl.Marker({
    color: "blue"
  })
    .setLngLat(center)
    .addTo(map);
}

// Track position live
if ("geolocation" in navigator) {
  navigator.geolocation.watchPosition(
    (position) => {
      const lng = position.coords.longitude;
      const lat = position.coords.latitude;

      if (!map) {
        // First position → initialize map
        setUpMap([lng, lat]);
      } else {
        // Update blue dot
        userMarker.setLngLat([lng, lat]);

        // Keep map centered on user smoothly
        map.easeTo({
          center: [lng, lat],
          duration: 1000
        });
      }
    },
    (error) => {
      console.error("Error getting location:", error);
      // fallback location
      setUpMap([-2.28, 41.45]);
    },
    {
      enableHighAccuracy: true,
      maximumAge: 0
    }
  );
} else {
  console.error("Geolocation not supported.");
  setUpMap([-2.28, 41.45]);
}
