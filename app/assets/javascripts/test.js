var marker;
var infowindow;
var messagewindow;  
var geocoder;
var map;



function initialize() {
  geocoder = new google.maps.Geocoder();
  var latlng = new google.maps.LatLng(25.7617, -80.1918);
  var mapOptions = {
    zoom: 8,
    center: latlng
  }
  map = new google.maps.Map(document.getElementById('map'), mapOptions);
}

function initMap() {
    var miami = {lat: 25.7617, lng: -80.1918};
    map = new google.maps.Map(document.getElementById('map'), {
      center: miami,
      zoom: 8
    });
    
    infowindow = new google.maps.InfoWindow({
      content: document.getElementById('form')
    });
     
    messagewindow = new google.maps.InfoWindow({
    content: document.getElementById('message')
    });
   
    google.maps.event.addListener(map, "click", function(event) {
     marker = new google.maps.Marker({
     position: event.latLng,
     map: map
    });
    
    google.maps.event.addListener(marker, 'click', function() {
    infowindow.open(map, marker);
    });
  });
}

function codeAddress() {
  var address = document.getElementById('address').value;
  geocoder.geocode( { 'address': address}, function(results, status) {
    if (status == 'OK') {
      map.setCenter(results[0].geometry.location);
      var marker = new google.maps.Marker({
          map: map,
          position: results[0].geometry.location
      });
    } else {
      alert('Geocode was not successful for the following reason: ' + status);
    }
  });
}

function saveData() {
    var name = escape(document.getElementById("name").value);
    var address = escape(document.getElementById("address").value);
    // var type = document.getElementById("type").value;
    var latlng = marker.getPosition();
    var url = "phpsqlinfo_addrow.php?name=" + name + "&address=" + address 
    + "&lat=" + latlng.lat() + "&lng=" + latlng.lng();

    document.getElementById('data').addEventListener('click', saveData)

    downloadUrl(url, function(data, responseCode) {
        console.log("url", url);

      if (responseCode == 200 && data.length <= 1) {
      infowindow.close();
      messagewindow.open(map, marker);


    if (document.getElementById('data') != null) {
      var str = document.getElementById("data").value;

    }else {
        var str = null;
    }
    alert(str);
    }

  });
}  



  function downloadUrl(url, callback) {
    var request = window.ActiveXObject ?
        new ActiveXObject('Microsoft.XMLHTTP') :
        new XMLHttpRequest;

    request.onreadystatechange = function() {
      if (request.readyState == 4) {
        request.onreadystatechange = doNothing;
        callback(request.responseText, request.status);
      }
    };

    request.open('GET', url, true);
    request.send(null);
}

  function doNothing () {
}



