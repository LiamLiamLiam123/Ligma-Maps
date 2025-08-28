mapboxgl.accessToken = "pk.eyJ1IjoiY29kZW15aG9iYnkiLCJhIjoiY2tqbW1jNmxkMHg4bzJzbWpmOXFpenY2byJ9.NshhLJgIl46JtWT6ZhKEDw";

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
    var map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: center,
        zoom: 15
    });

    map.addControl(new mapboxgl.NavigationControl());

    // Add directions with metric units
    map.addControl(
        new MapboxDirections({
            accessToken: mapboxgl.accessToken,
            unit: 'metric'
        }),
        'top-left'
    );
}
