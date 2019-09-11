var map, infoWindow;

function createMap () {
  var options = {
    center: { lat: 37.982562, lng: 23.726106 },
    zoom: 10
  };

  map = new google.maps.Map(document.getElementById('map'), options);
  
  // WINDOW PROVIDING USER'S LOCATION'S DETAILS
  infoWindow = new google.maps.InfoWindow;

  // CHECK IF LOCATION SERVICE IS AVAILABLE
  if (navigator.geolocation) {
    // SET LOCATION TO USER'S CURRENT LOCATION
    navigator.geolocation.getCurrentPosition(function (p) {
      var position = {
        lat: p.coords.latitude,
        lng: p.coords.longitude
      };

      infoWindow.setPosition(position);
      infoWindow.setContent('Your location!');
      infoWindow.open(map);
      map.setCenter(position);
    }, function () {
      handleLocationError('Geolocation service failed', map.getCenter());
    });
  } else {
    handleLocationError('No geolocation available.', map.getCenter());
  }
}

function handleLocationError (content, position) {
  infoWindow.setPosition(position);
  infoWindow.setContent(content);
  infoWindow.open(map);
}