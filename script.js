mapboxgl.accessToken = "pk.eyJ1IjoiY29kZW15aG9iYnkiLCJhIjoiY2tqbW1jNmxkMHg4bzJzbWpmOXFpenY2byJ9.NshhLJgIl46JtWT6ZhKEDw";

let map;
let marker;
let directions;

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

  // Create a marker for the user’s live location
  marker = new mapboxgl.Marker({ color: "blue" })
    .setLngLat(center)
    .addTo(map);
}

// Watch the position in real time
if ("geolocation" in navigator) {
  navigator.geolocation.watchPosition(
    position => {
      const lng = position.coords.longitude;
      const lat = position.coords.latitude;

      if (!map) {
        // First load: setup the map
        setUpMap([lng, lat]);
      } else {
        // Update marker position
        marker.setLngLat([lng, lat]);

        // Keep map centered on the person/device
        map.easeTo({
          center: [lng, lat],
          duration: 1000 // smooth animation
        });
      }
    },
    error => {
      console.error("Error getting location:", error);
      // Fallback start location
      setUpMap([-2.28, 41.45]);
    },
    {
      enableHighAccuracy: true
    }
  );
} else {
  console.error("Geolocation is not supported by this browser.");
  setUpMap([-2.28, 41.45]);
}
