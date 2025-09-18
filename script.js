var map = L.map('map').setView([37.7, -122.4], 11);

var osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

var crimeLayer;
$.getJSON("https://raw.githubusercontent.com/orhuna/WebGIS_SLU_M1/main/Module%201/Assignment%201/data/sf_crime.geojson", function(data) {
  var crimeIcon = L.icon({
    iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34]
  });

  crimeLayer = L.geoJson(data, {
    pointToLayer: function(feature, latlng) {
      return L.marker(latlng, { icon: crimeIcon });
    },
    onEachFeature: function(feature, layer) {
      var popup = "<b>Crime Incident</b><br>";
      if (feature.properties.category) popup += "Category: " + feature.properties.category + "<br>";
      if (feature.properties.date) popup += "Date: " + feature.properties.date;
      layer.bindPopup(popup);
    }
  });
  crimeLayer.addTo(map);
  control.addOverlay(crimeLayer, "Crime Incidents");
});


var rodentLayer;
$.getJSON("https://raw.githubusercontent.com/orhuna/WebGIS_SLU_M1/main/Module%201/Assignment%201/data/rodents.geojson", function(data) {
  rodentLayer = L.geoJson(data, {
    pointToLayer: function(feature, latlng) {
      return L.circleMarker(latlng, {
        radius: 5,
        fillColor: "green",
        color: "darkgreen",
        weight: 1,
        fillOpacity: 0.7
      });
    },
    onEachFeature: function(feature, layer) {
      var popup = "<b>Rodent Sighting</b><br>";
      if (feature.properties.address) popup += "Address: " + feature.properties.address + "<br>";
      if (feature.properties.date) popup += "Date: " + feature.properties.date;
      layer.bindPopup(popup);
    }
  });
  rodentLayer.addTo(map);
  control.addOverlay(rodentLayer, "Rodent Sightings");
});

var chicagoLayer;
$.getJSON("https://raw.githubusercontent.com/orhuna/WebGIS_SLU_M1/main/Module%201/Assignment%201/data/chicago.geojson", function(data) {
  chicagoLayer = L.geoJson(data, {
    style: {
      color: "blue",
      weight: 2,
      fillOpacity: 0.05
    },
    onEachFeature: function(feature, layer) {
      var popup = "<b>Chicago Boundary</b>";
      if (feature.properties.name) popup += "<br>Name: " + feature.properties.name;
      layer.bindPopup(popup);
    }
  });
  chicagoLayer.addTo(map);
  control.addOverlay(chicagoLayer, "Chicago Boundary");
});

var control = L.control.layers({"OpenStreetMap": osm}, {}, {collapsed:false}).addTo(map);
