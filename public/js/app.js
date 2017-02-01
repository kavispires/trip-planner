var styleArr = [{
  featureType: 'landscape',
  stylers: [{ "color": '#e4e2e0' },{ saturation: -100 }, { lightness: 60 }]
}, {
  featureType: 'road.local',
  stylers: [{ "color": '#e4e2e0' },{ saturation: -100 }, { lightness: 40 }, { visibility: 'on' }]
}, {
  featureType: 'transit',
  stylers: [{ saturation: -100 }, { visibility: 'simplified' }]
}, {
  featureType: 'administrative.province',
  stylers: [{ visibility: 'off' }]
}, {
  featureType: 'water',
  stylers: [{ color: '#61b5ba' }, { visibility: 'on' }, { lightness: 30 }]
}, {
  featureType: 'road.highway',
  elementType: 'geometry.fill',
  stylers: [{ color: '#e37222' }, { lightness: 40 }]
}, {
  featureType: 'road.highway',
  elementType: 'geometry.stroke',
  stylers: [{ visibility: 'off' }]
}, {
  featureType: 'poi.park',
  elementType: 'geometry.fill',
  stylers: [{ color: '#b6c54c' }, { lightness: 40 }, { saturation: -40 }]
}];


function initMap() {

  var fullstackAcademy = new google.maps.LatLng(40.705086, -74.009151);

  var mapCanvas = document.getElementById('map-canvas');

  return currentMap = new google.maps.Map(mapCanvas, {
    center: fullstackAcademy,
    zoom: 13,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    styles: styleArr
  });
}

var iconURLs = {
  hotel: '/img/lodging_0star.png',
  restaurant: '/img/restaurant.png',
  activity: '/img/star-3.png'
};

var activeDay = 1;

function setBounds() {
  var dayItems = $('.itinerary-item.day' + activeDay);
  if (dayItems.length !== 0) {
    var bounds = new google.maps.LatLngBounds();

    dayItems.each((idx, element) => {
      bounds.extend($(element).data('marker').position);
    });

    currentMap.fitBounds(bounds);
  }
}

function drawMarker (type, coords) {
  var latLng = new google.maps.LatLng(coords[0], coords[1]);
  var iconURL = iconURLs[type];
  var marker = new google.maps.Marker({
    icon: iconURL,
    position: latLng
  });
  marker.setMap(currentMap);
  return marker;
}

function addActivity() {
  var selected = getSelected('#activity-choices', activities);
  var marker = drawMarker('activity', selected.place.location);
  var item = buildIteneraryItem(selected, marker);
  console.log(item);
  $('#activity-list').append(item);
  setBounds();
}

function addHotel() {
  console.log('add-hotel button clicked');
  var selected = getSelected('#hotel-choices', hotels);
  var marker = drawMarker('hotel', selected.place.location);
  var item = buildIteneraryItem(selected, marker);
  $('#hotel-list').append(item);
  setBounds();
}

function addRestaurant() {
  var selected = getSelected('#restaurant-choices', restaurants);
  var marker = drawMarker('restaurant', selected.place.location);
  var item = buildIteneraryItem(selected, marker);
  $('#restaurant-list').append(item);
  setBounds();
}

function removeItem(type, event) {
  var $target = $(event.target);
  if($target.hasClass('form-remove')) {
    console.log('Removed', type);
    var $parent = $target.closest('.itinerary-item');
    $parent.data('marker').setMap(null);
    $parent.remove();
    setBounds();
  }
}

function getSelected(selectId, array) {
  var id = $(selectId).val();
  return array.find((element) => element.id == id);
}

function buildIteneraryItem(object, marker) {
  var item = $(`<li class="itinerary-item">
    <span class="title info-item">${object.name}</span>
    <a class="" href="#"><span class="glyphicon glyphicon-remove form-remove" aria-hidden="true"></span></a>
  </li>`);
  item.data('object', object);
  item.data('marker', marker);
  item.addClass('day' + activeDay);
  return item;
}

function activateDay(number) {
  activeDay = number;
  $('.itinerary-item').hide();
  $('.itinerary-item').each((index, element) => {
    $(element).data('marker').setMap(null);
  });
  $('.itinerary-item.day' + activeDay).show();
  $('.itinerary-item.day' + activeDay).each((index, element) => {
    $(element).data('marker').setMap(currentMap);
  });
  $('.day-btn.current-day').removeClass('current-day');
  $('#day-buttons :nth-child(' + number + ')').addClass('current-day');
  $('#day-title text').text('Day ' + activeDay);
  setBounds();
}



$(document).ready(function() {  

  currentMap = initMap();

  $('#map-canvas').css('height', $(window).height() - 50);

    $('#activity-choices').append(activities.map((activity) => 
      $('<option value="' + activity.id + '">' + activity.name + '</option>')
    ));
    $('#activity-button').on('click', addActivity);
    $('#activity-list').on('click', removeItem.bind(null, 'activity'));

    $('#hotel-choices').append(hotels.map((hotel) =>
      $('<option value="' + hotel.id + '">' + hotel.name + '</option>')
    ));
    $('#hotel-button').on('click', addHotel);
    $('#hotel-list').on('click', removeItem.bind(null, 'hotel'));

    $('#restaurant-choices').append(restaurants.map((restaurant) => 
      $('<option value="' + restaurant.id + '">' + restaurant.name + '</option>')
    ));
    $('#restaurant-button').on('click', addRestaurant);
    $('#restaurant-list').on('click', removeItem.bind(null, 'restaurant'));

    $('#day-1').data('day', 1);
    var nextDayToCreate = 2;

    var $dayAdd = $('#day-add');
    $dayAdd.on('click', () => {
      var newBtn = $('<button class="btn btn-default day-btn">' + nextDayToCreate + '</button>');
      newBtn.data('day', nextDayToCreate);
      nextDayToCreate++;
      $dayAdd.before(newBtn);
      $dayAdd.before(' ');
    });

    $('#day-buttons').on('click', () => {
      var $target = $(event.target);
      if($target.data('day')) {
        activateDay($target.data('day'));
      }
    });

    $('#day-title .remove').on('click', () => {
      var deleteDay = activeDay;
      if(activeDay === 1) {
        var $secondDay = $('#day-buttons :nth-child(2)');
        if(!$secondDay.data('day')) { // If we found the add button
          throw Error('You can\'t remove the last day');
        }
        activateDay(2);
      } else {
        activateDay(1);
      }
      $('.itinerary-item.day' + deleteDay).remove();
      $('#day-buttons :nth-child(' + deleteDay + ')').remove();

      $('#day-buttons .day-btn').each((idx, element) => {
        var $element = $(element);
        var newDay = idx + 1;
        if($element.data('day') && $element.data('day') !== newDay) {
          var oldDay = $element.data('day');
          $element.data('day', newDay);
          $element.text(newDay);
          $('.itinerary-item.day' + oldDay).removeClass('day' + oldDay).addClass('day' + newDay);
        }
      })

      nextDayToCreate--;
    })

}); // $(document).ready();



