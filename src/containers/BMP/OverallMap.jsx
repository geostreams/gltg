import React, { useEffect, useRef, useState } from "react";
import "ol/ol.css";
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import TileWMS from "ol/source/TileWMS";
import { LAYERS, MAP_CENTER, GEOSERVER_URL } from "./config";

const generateUrlParameters = (inputString) => {
  const defaultParam = "gltg:state_bmp_EPA_319_2004";
  const lastUnderscoreIndex = inputString.lastIndexOf("_");
  if (lastUnderscoreIndex === -1) return defaultParam;

  return inputString.slice(0, lastUnderscoreIndex);
};

const generateStyleUrl = (urlParameters, inputString) => {
  const defaultStyle = "state_epa_319_bmp_funding_style_one_year";
  const lastUnderscoreIndex = inputString.lastIndexOf("_");
  if (lastUnderscoreIndex === -1) return defaultStyle;

  const lastPart = inputString.slice(lastUnderscoreIndex + 1);
  let mainPart = urlParameters.split(":")[1];
  let parts = mainPart.split("_");
  
  if (parts[2] === "EPA") {
    return `${parts[0]}_${parts[2].toLowerCase()}_319_${parts[1]}_${lastPart}_style_one_year`;
  }

  return `${parts[0]}_${parts[2].toLowerCase()}_${parts[1]}_${lastPart}_style_one_year`;
};

const OverallMap = ({ parameterString }) => {
  //Adding Map References
  const mapRef = useRef(null);
  const layerRef = useRef(null);
  const urlParameters = generateUrlParameters(parameterString);
  const styleUrl = generateStyleUrl(urlParameters, parameterString);
  const [legendSrc, setLegendSrc] = useState("");

  const createGeoServerLayer = (urlParameters, styleUrl) => {
    return new TileLayer({
      source: new TileWMS({
        url: `${GEOSERVER_URL}/wms`,
        params: {
          LAYERS: urlParameters,
          TILED: true,
          STYLES: styleUrl,
        },
        visible: true,
        serverType: "geoserver",
      }),
    });
  };

  useEffect(() => {
    mapRef.current = new Map({
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

    return () => {
      mapRef.current.dispose();
    };
  }, []);

  useEffect(() => {
    
    if (layerRef.current) {
      mapRef.current.removeLayer(layerRef.current);
    }
    const geoserverLayer = createGeoServerLayer(urlParameters, styleUrl);
    mapRef.current.addLayer(geoserverLayer);
    layerRef.current = geoserverLayer;
    //rendering legends
    const legendUrl = `${GEOSERVER_URL}/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=20&HEIGHT=20&LAYER=${urlParameters}&STYLE=${styleUrl}`;
    setLegendSrc(legendUrl);
  }, [parameterString, urlParameters, styleUrl]);

  return (
    <div style={{ position: "relative", width: "50%", height: "100%" }}>
      <div id="map" style={{ width: "100%", height: "100%" }}></div>
      {legendSrc && (
        <div
          className="legend"
          style={{
            position: "absolute",
            bottom: "8%",
            right: "2%",
            backgroundColor: "rgba(255, 255, 255, 0.7)",
            padding: "1%",
            borderRadius: "5%",
            boxShadow: "0 2px 10px rgba(0,0,0,0.3)",
          }}
        >
          <img src={legendSrc} alt="Map Legend" />
        </div>
      )}
    </div>
  );
};

export default OverallMap;
