   function initMap() {
        // Styles a map in night mode.
        var map = new google.maps.Map(document.getElementById('googleMap'), {
          center: {lat: 40.674, lng: -73.945},
          zoom: 12,
          styles: [
            {
              "featureType": "landscape",
              "elementType": "geometry.fill",
              "stylers": [
                {
                  "color": "#e4e2e0"
                }
              ]
            },
            {
              "featureType": "poi",
              "elementType": "geometry.fill",
              "stylers": [
                {
                  "color": "#cdd1cc"
                }
              ]
            },
            {
              "featureType": "poi.park",
              "elementType": "labels.text.fill",
              "stylers": [
                {
                  "color": "#07889b"
                }
              ]
            },
            {
              "featureType": "road",
              "elementType": "labels.icon",
              "stylers": [
                {
                  "saturation": -70
                }
              ]
            },
            {
              "featureType": "road.highway",
              "elementType": "geometry.fill",
              "stylers": [
                {
                  "color": "#e37222"
                }
              ]
            },
            {
              "featureType": "road.highway",
              "elementType": "geometry.stroke",
              "stylers": [
                {
                  "color": "#e37222"
                }
              ]
            },
            {
              "featureType": "water",
              "elementType": "geometry.fill",
              "stylers": [
                {
                  "color": "#61b5ba"
                }
              ]
            }
          ]
        });
      }


$(document).ready(function() {

	$('#googleMap').css('height', $(window).height() - 50);


});

