// Create map object
var baseMap = L.map("map", {
    center: [37.09, -95.71],
    zoom: 4
});

// Adding tile layer
L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.light",
  accessToken: API_KEY
}).addTo(baseMap);

// Load in geojson data
var geoData =  "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"

var geoJson;

// Grab data with D3
d3.json(geoData, function(data){        
  console.log(data.features)

  for (var i = 0; i < data.features.length; i++){
  // //   // var earthQuakeArray = [];
  // //   var mag = [];
  // //   // earthQuakeArray.push([data.features[i].geometry.coordinates[1], 
  // //   //                     data.features[i].geometry.coordinates[0] ]);
  // //   mag.push(data.features[i].properties.mag)

      color = "";
      radius = "";

      if (data.features[i].properties.mag < 1) {
        color = "#3cc435"
        radius = 5000;
      }
      else if (data.features[i].properties.mag < 2) {
        color = "#c0d66f"
        radius = 15000;
      }
      else if (data.features[i].properties.mag < 3) {
        color = "#e6db45"
        radius = 35000;
      }
      else if (data.features[i].properties.mag < 4) {
        color = "#e0b02b"
        radius = 55000;
      }
      else if (data.features[i].properties.mag < 5) {
        color = "#b0521c"
        radius = 75000;
      }
      else if (data.features[i].properties.mag > 5) {
        color = "#d41e17"
        radius = 100000;
      }
      var latlng = new L.LatLng(data.features[i].geometry.coordinates[1], data.features[i].geometry.coordinates[0]);
    
      geoJson = new L.circle ((latlng), {
        color: "black",
        weight: 0.5,
        fillColor: color,
        fillOpacity: 0.9,
        radius: radius, 
        // opacity:.8
      })
      geoJson.addTo(baseMap)
        .bindPopup("Earthquake magnitude: " + data.features[i].properties.mag + "<hr> Place: " + data.features[i].properties.place)
    }

     // Set up the legend
     // Need to credit stackexchange (https://gis.stackexchange.com/questions/133630/adding-leaflet-legend)
    function getColor(d) {
      return d === '0-1' ? "#3cc435" :
             d === '1-2' ? "#c0d66f" :
             d === '2-3' ? "#e6db45" :
             d === '3-4' ? "#e0b02b" :
             d === '4-5' ? "#b0521c"  :
             "#d41e17";
    } 
    var legend = L.control({position: 'bottomright'});
    legend.onAdd = function (baseMap) {
 
      var div = L.DomUtil.create('div', 'info legend');
      labels = ['<strong>Earthquake <br> Magnitude</strong>'];
      categories = ['0-1','1-2','2-3','3-4','4-5','5+'];
      
      for (var i = 0; i < categories.length; i++) {
 
        div.innerHTML += 
        labels.push(
        '<li class=\"circle\" style=\"background:' + getColor(categories[i]) + '"></li> ' +
        (categories[i] ? categories[i] : '+'));
        }
         div.innerHTML = labels.join('<br>');
      return div;
        };

    legend.addTo(baseMap);

})


// var circle = L.circle([51.508, -0.11], {
//   color: 'red',
//   fillColor: '#f03',
//   fillOpacity: 0.5,
//   radius: 20000
// }).addTo(baseMap);