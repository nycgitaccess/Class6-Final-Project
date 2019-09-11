var map;

function createMap () {
  var options = {
    center: { lat: 37.982562, lng: 23.726106 },
    zoom: 14
  };

  map = new google.maps.Map(document.getElementById('map'), options);

  var input = document.getElementById('search');
  // CREATE SEARCHBAR USING GMAPS SEARCHBOX
  var searchBox = new google.maps.places.SearchBox(input);

  map.addListener('bounds_changed', function() {
    // SET THE SEARCH BOX LIMITS TO OUR MAPS BOUNDS
    searchBox.setBounds(map.getBounds());
  });

  var markers = [];
  
  searchBox.addListener('places_changed', function () {
    var places = searchBox.getPlaces();

    if (places.length == 0)
      return;

    markers.forEach(function (m) { m.setMap(null); });
    markers = [];

    var bounds = new google.maps.LatLngBounds();
    places.forEach(function(p) {
      if (!p.geometry)
        return;

      markers.push(new google.maps.Marker({
        map: map,
        title: p.name,
        position: p.geometry.location
      }));

      if (p.geometry.viewport)
        bounds.union(p.geometry.viewport);
      else
        bounds.extend(p.geometry.location);
    });
    
    map.fitBounds(bounds);
  });
}  
