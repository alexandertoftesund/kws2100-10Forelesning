import React, { useEffect, useRef } from "react";
import { Map, View } from "ol";
import TileLayer from "ol/layer/Tile.js";
import { OSM } from "ol/source.js";
import { useGeographic } from "ol/proj.js";

// @ts-ignore
import "ol/ol.css";
import VectorLayer from "ol/layer/Vector.js";
import VectorSource from "ol/source/Vector.js";
import { GeoJSON } from "ol/format.js";

import proj4 from "proj4";
import { register } from "ol/proj/proj4.js";
import { Style, Circle as CircleStyle, Fill, Stroke } from "ol/style.js";

proj4.defs(
  "EPSG:25833",
  "+proj=utm +zone=33 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs +type=crs",
);
register(proj4);

useGeographic();

const kommuneLayer = new VectorLayer({
  source: new VectorSource({
    url: "/geojson/Kommuner-S.geojson",
    format: new GeoJSON(),
  }),
});

const grunnskoleStyle = new Style({
  image: new CircleStyle({
    radius: 6,
    fill: new Fill({ color: "#ff4500" }),
    stroke: new Stroke({
      color: "#ffffff",
      width: 2,
    }),
  }),
});

const grunnskoleLayer = new VectorLayer({
  source: new VectorSource({
    url: "/api/grunnskoler",
    format: new GeoJSON({ dataProjection: "EPSG:25833" }),
  }),
  style: grunnskoleStyle,
});

const map = new Map({
  view: new View({ center: [10.7, 59.9], zoom: 8 }),
  layers: [new TileLayer({ source: new OSM() }), kommuneLayer, grunnskoleLayer],
});

export function Application() {
  const mapRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => map.setTarget(mapRef.current!), []);
  return <div ref={mapRef}></div>;
}
