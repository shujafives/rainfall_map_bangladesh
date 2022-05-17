

let geojson;
var map = L.map('map').setView([23.8103, 90.4125], 7);

var OpenStreetMap_Mapnik = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
	maxZoom: 19
}).addTo(map);

var updateMap=function(year){
    year = parseInt(year);
    /* global divisionData */
    let divData= getMapData(year);

    if(geojson){
        map.removeLayer(geojson);
    }
    geojson = L.geoJson(divData, {
        style: style,
        onEachFeature: onEachFeature
    }).addTo(map);

}

updateMap(2016);

map.attributionControl.addAttribution('Division Wise Annual Rainfall Map of Bangladesh');

// control that shows division info on hover
var info = L.control();

info.onAdd = function (map) {
    this._div = L.DomUtil.create('div', 'info');
    this.update();
    return this._div;
};

info.update = function (props) {
    this._div.innerHTML = '<h4>Division Wise Annual Rainfall Map of Bangladesh</h4>' +  (props ?
        '<b>Division: ' + props.div_name + '</b><br />Year: ' + props.Year + '<br />Rainfall: '+ props.Rainfall + 
        ' mm (' + Math.round(props.percent) +'%)' : 'Hover over a division');
};

info.addTo(map);

function zoomToFeature(e) {
    map.fitBounds(e.target.getBounds());
}

var legend = L.control({position: 'bottomright'});

legend.onAdd = function (map) {

    var div = L.DomUtil.create('div', 'info legend');
    var grades = [0, 3, 6, 9, 12, 15, 18, 21];
    var labels = [];
    var from, to;

    for (var i = 0; i < grades.length; i++) {
        from = grades[i];
        to = grades[i + 1];

        labels.push(
            '<i style="background:' + getColor(from + 1) + '"></i> ' +
            from + (to ? '% &ndash;' + to +'%' : '% +'));
    }

    div.innerHTML = labels.join('<br>');
    return div;
};

legend.addTo(map);

var slider = document.getElementById("yearSlide");
var output = document.getElementById("year");
output.innerHTML = slider.value;

slider.oninput = function() {
  output.innerHTML = this.value;
  updateMap(this.value)
}