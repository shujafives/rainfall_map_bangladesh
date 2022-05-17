let getMapData=function(year){
        
    let rainfall_default=_.where(rainfall, {Year: year});
    // console.log(rainfall_default);

    let total = rainfall_default.reduce((s, f) => {
        return s + f.Rainfall;               // return the sum of the accumulator and the current time, as the the new accumulator
    }, 0); 

    for(i=0;i<rainfall_default.length;i++){
        rainfall_default[i].percent=rainfall_default[i].Rainfall/total*100
    }
    // console.log(rainfall_default);

    let divData={};
    divData.type=divisions.type;
    divData.name=divisions.name;
    divData.crs=divisions.crs;
    divData.features=[];

    for(i=0;i<divisions.features.length;i++){

        let feature={};
        feature.type=divisions.features[i].type;
        feature.geometry=divisions.features[i].geometry;

        let rainfall=_.where(rainfall_default, {division_name: divisions.features[i].properties.div_name});
        // console.log(rainfall[0].Rainfall);

        let properties=divisions.features[i].properties;
        properties.Year=year;
        properties.Rainfall=rainfall[0].Rainfall;
        properties.percent=rainfall[0].percent;

        feature.properties=properties;

        divData.features.push(feature);
    }
    return divData;
}