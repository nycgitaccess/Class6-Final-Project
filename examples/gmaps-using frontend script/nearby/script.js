//variables
var map;
var lat = sessionStorage.getItem('pyrmontlat');
var lng = sessionStorage.getItem('pyrmontlng');
var pyrmont;
var address;
var marker;
var infoWindow;
var markers = [];
var ttypes; //value of type like 'atm','cafe';
var range = 500;
var filter;
var calval = 0;
//initialize Map
function initMap() {
    //lat=27;lng=77;
    pyrmont = { lat: 37.982562, lng: 23.726106 };
    map = new google.maps.Map(document.getElementById('map'),
        {
            center: pyrmont,
            zoom: 10
        });
    // marker = new google.maps.Marker({
    //     map: map,
    //     draggable: false,
    //     animation: google.maps.Animation.BOUNCE,
    //     title: 'My Present Location',
    //     icon: { url: "./images/present.png", scaledSize: new google.maps.Size(40, 40) },
    //     position: { lat: parseFloat(lat), lng: parseFloat(lng) }
    // });
    // WINDOW PROVIDING USER'S LOCATION'S DETAILS
    infoWindow = new google.maps.InfoWindow;

    // CHECK IF LOCATION SERVICE IS AVAILABLE
    if (navigator.geolocation) {
        // SET LOCATION TO USER'S CURRENT LOCATION
        navigator.geolocation.getCurrentPosition(function (p) {
            var myPosition = {
                lat: p.coords.latitude,
                lng: p.coords.longitude
            };

            infoWindow.setPosition(myPosition);
            infoWindow.setContent('Your location!');
            infoWindow.open(map);
            map.setCenter(myPosition);
        }, function () {
            handleLocationError('Geolocation service failed', map.getCenter());
        });
    } else {
        handleLocationError('No geolocation available.', map.getCenter());
    }


    //update the values of opt options for selection.
    // fn_type('opt');

    var service = new google.maps.places.PlacesService(map)
    service.nearbySearch(
        {
            location: pyrmont,
            radius: range,
            type: [ttypes],
            name: filter
        }, processResults);
    function processResults(results, status, pagination) {
        if (status !== google.maps.places.PlacesServiceStatus.OK) {
            var placelist = document.getElementById('places');
            placelist.innerHTML = ""; return;
        } else {
            createMarker(results);
            //if data is more
            if (pagination.hasNextPage) {
                var morebut = document.getElementById('More');
                morebut.disabled = false;
                morebut.addEventListener('click', function () {
                    morebut.disabled = true;
                    pagination.nextPage();
                });
            }
        }
    }
    function createMarker(places) {
        var placelist = document.getElementById('places');
        placelist.innerHTML = "";
        for (var i = 0, place; place = places[i]; i++) {
            calculatedistance(pyrmont.lat, pyrmont.lng, place.geometry.location.lat(), place.geometry.location.lng());
            marker = new google.maps.Marker({
                map: map, position: place.geometry.location,
                title: 'Distance From My Location: ' + calval + ' KM. '
            })
            placelist.innerHTML += "<li>" + (i + 1) + "|" + place.name + "|" + place.geometry.location.lat() + "|" + place.geometry.location.lng() + "</li>";
            map.setZoom(14);
        }
    }
    //define event of UL.
    var disp_mark = document.getElementById('places');
    disp_mark.onclick = function (event) {
        //alert(event.target.innerHTML);
        data = event.target.innerHTML.split('|');
        fn_mark(data);
    }
}
function fn_mark(para) {
    //alert(para[2]);
    new google.maps.Marker({ map: map, position: { lat: parseFloat(para[2]), lng: parseFloat(para[3]) }, icon: { path: google.maps.SymbolPath.CIRCLE, scale: 5 } });
}
function fn_type_opt() {
    ttypes = document.getElementById('opt').value;
    initMap();
}
function fn_sel(para) {
    if (document.getElementById('range1').checked) range = document.getElementById('range1').value;
    if (document.getElementById('range2').checked) range = document.getElementById('range2').value;
    if (document.getElementById('range3').checked) range = document.getElementById('range3').value;
    if (document.getElementById('range4').checked) range = document.getElementById('range4').value;
    initMap();
}
function fn_submit() {
    filter = document.getElementById('filter').value;
    initMap();
}
function calculatedistance(s1, s2, e1, e2) {
    var latlngA = new google.maps.LatLng(s1, s2); //Point A
    var latlngB = new google.maps.LatLng(e1, e2); //Point B
    //Calculate distance in meters between two points A and B.
    var dist = google.maps.geometry.spherical.computeDistanceBetween(latlngA, latlngB);
    calval = (dist / 1000).toFixed(2);
}

function handleLocationError(content, myPosition) {
    infoWindow.setPosition(myPosition);
    infoWindow.setContent(content);
    infoWindow.open(map);
}