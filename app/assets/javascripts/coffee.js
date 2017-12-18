window.initMap = function() {
  var map;
  if ($('#map').size() > 0) {
    return map = new google.maps.Map(document.getElementById('map'), {
      center: {
        lat: -34.397,
        lng: 150.644
      },
      zoom: 8
    });
  }
};