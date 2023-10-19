import React, { useEffect, useState } from "react";
import "ol/ol.css";
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import { LAYERS, MAP_CENTER, GEOSERVER_URL } from "./config";
import TileWMS from "ol/source/TileWMS";

//add legends{"parameterString":}
const OverallMap = (parameterString) => {
 
  let urlParameters = "gltg:state_bmp_EPA_319_2004";
  
  let styleParameters = "";
  let styleUrl = "state_epa_319_bmp_funding_style_one_year";
  let inputString = parameterString["parameterString"];
  const lastUnderscoreIndex = inputString.lastIndexOf("_");

  if (lastUnderscoreIndex !== -1) {
    const stringBeforeLastUnderscore = inputString.slice(
      0,
      lastUnderscoreIndex
    );
    const lastPart = inputString.slice(lastUnderscoreIndex + 1);
    urlParameters = stringBeforeLastUnderscore;
    styleParameters = lastPart;
  
    let mainPart = urlParameters.split(':')[1];
    let parts = mainPart.split('_');
    if(parts[2] == "EPA"){
      styleUrl = `${parts[0]}_${parts[2].toLowerCase()}_319_${parts[1]}_${lastPart}_style_one_year`;
    }else{
      styleUrl = `${parts[0]}_${parts[2].toLowerCase()}_${parts[1]}_${lastPart}_style_one_year`;
    }
    
  } 
  
  useEffect(() => {
    const map = new Map({
      target: "map",
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      view: new View({
        center: MAP_CENTER,
        zoom: 5,
      }),
    });
    // const styleUrl = "huc8_eqip_bmp_count_style_one_year";

    // Function to load SLD style dynamically
    async function loadStyle(url) {
      const response = await fetch(url);
      const sldText = await response.text();
      const sldFormat = new ol.format.SLD();å
      return sldFormat.readStyle(sldText);
    }
    const geoserverLayer = new TileLayer({
      source: new TileWMS({
        url: `${GEOSERVER_URL}/wms`,
        params: {
          LAYERS: urlParameters,
          TILED: true,
          STYLES: styleUrl
        },
        visible: true,
        serverType: "geoserver",
      }),
    });
   
    map.addLayer(geoserverLayer);
    return () => {
      map.dispose();
    };
  }, [inputString]);

  return <div id="map" style={{ width: "50%", height: "100%" }}></div>;
};

export default OverallMap;
