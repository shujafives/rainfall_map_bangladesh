// get color depending on population density value
function getColor(d) {
    return d > 21 ? '#800026' :
        d > 18  ? '#BD0026' :
        d > 15  ? '#E31A1C' :
        d > 12  ? '#FC4E2A' :
        d > 9   ? '#FD8D3C' :
        d > 6   ? '#FEB24C' :
        d > 3   ? '#FED976' : '#FFEDA0';
}

function style(feature) {
    return {
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.7,
        fillColor: getColor(feature.properties.percent)
    };
}