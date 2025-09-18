var map = L.map('map').setView([37.7, -122.4], 12);

L.tileLayer('https://a.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: 'Map tiles by Stamen Design, under CC BY 3.0.',
	minZoom: 0,
	maxZoom: 20,
}).addTo(map);

// Crime incidents layer
$.getJSON("https://raw.githubusercontent.com/orhuna/WebGIS_SLU_M1/main/Module%201/Assignment%201/data/sf_crime.geojson", function(data) {
  L.geoJson(data, {
    pointToLayer: function(feature, latlng) {
      return L.circleMarker(latlng, {
        radius: 5,
        fillColor: "red",
        color: "darkred",
        weight: 1,
        fillOpacity: 0.7
      });
    },
    onEachFeature: function(feature, layer) {
      var popup = "<b>Crime Incident</b><br>";
      if (feature.properties.category) {
        popup += "Category: " + feature.properties.category + "<br>";
      }
      if (feature.properties.date) {
        popup += "Date: " + feature.properties.date;
      }
      layer.bindPopup(popup);
    }
  }).addTo(map);
});

// Rodent sightings layer
$.getJSON("https://raw.githubusercontent.com/orhuna/WebGIS_SLU_M1/main/Module%201/Assignment%201/data/rodents.geojson", function(data) {
  L.geoJson(data, {
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
      if (feature.properties.address) {
        popup += "Address: " + feature.properties.address + "<br>";
      }
      if (feature.properties.date) {
        popup += "Date: " + feature.properties.date;
      }
      layer.bindPopup(popup);
    }
  }).addTo(map);
});

$.getJSON("https://raw.githubusercontent.com/orhuna/WebGIS_SLU_M1/main/Module%201/Assignment%201/data/chicago.geojson", function(data) {
  L.geoJson(data, {
    style: {
      color: "blue",
      weight: 2,
      fillOpacity: 0.05
    },
    onEachFeature: function(feature, layer) {
      var popup = "<b>Chicago Boundary</b>";
      if (feature.properties.name) {
        popup += "<br>Name: " + feature.properties.name;
      }
      layer.bindPopup(popup);
    }
  }).addTo(map);
});



