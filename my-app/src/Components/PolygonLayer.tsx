import { type FC } from "react";
import { Layer, Source } from "react-map-gl/maplibre";
import { PolygonFeatureCollection } from "../Interfaces/PolygonInterface";

interface PolygonLayerProps {
  polygons: PolygonFeatureCollection; // Usa la tipizzazione GeoJSON
}

const PolygonLayer: FC<PolygonLayerProps> = ({ polygons }) => {
  return (
    <Source id="polygon-data" type="geojson" data={polygons}>
      <Layer
        id="polygon-layer"
        source="polygon-data"
        type="fill"
        paint={{
          "fill-color": [
            "interpolate",
            ["linear"],
            ["to-number", ["get", "indicatore"]],
            0.0,
            "#d1493f",
            10.0,
            "#e7745b",
            20.0,
            "#f49a7b",
            30.0,
            "#f7b89c",
            40.0,
            "#efcebd",
            50.0,
            "#dcdddd",
            60.0,
            "#c5d6f2",
            70.0,
            "#aac7fd",
            80.0,
            "#8caffe",
            90.0,
            "#6f92f3",
            100.0,
            "#5470de",
          ],
          "fill-opacity": [
            "case",
            ["==", ["to-number", ["get", "indicatore"]], 0.0],
            0.9, // Opacità 0 (trasparente)
            0.7, // Altrimenti, opacità 0.6
          ],
        }}
      />
    </Source>
  );
};

export { PolygonLayer };
