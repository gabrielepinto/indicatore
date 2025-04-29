import { type FC } from "react";
import { Layer, Source } from "react-map-gl/maplibre";
import { FeatureCollection } from "../Interfaces/data_Interface";

interface HighlightLayerProps {
  data: FeatureCollection;
}

const HighlightLayer: FC<HighlightLayerProps> = ({ data }) => {
  if (!data) {
    return null;
  }
  return (
    <Source
      id="highlight_data"
      type="geojson"
      data={data}
      cluster={true}
      clusterMaxZoom={13}
      clusterRadius={50}
    >
      <Layer
        id="clusters"
        type="circle"
        source="highlight_data"
        filter={["has", "point_count"]}
        paint={{
          "circle-color": "#1d3557",
          "circle-radius": [
            "interpolate",
            ["linear"],
            ["get", "point_count"],
            0,
            15,
            100,
            30,
          ],
          "circle-opacity": 0.8,
        }}
      />

      <Layer
        id="cluster-counts"
        type="symbol"
        source="highlight_data"
        filter={["has", "point_count"]}
        layout={{
          "text-field": "{point_count_abbreviated}",
          "text-size": 18,
          "text-offset": [0, 0],
          "text-anchor": "center",
        }}
        paint={{
          "text-color": "#fff",
        }}
      />

      <Layer
        id="highlight-layer"
        type="circle"
        source="highlight_data"
        filter={["!", ["has", "point_count"]]}
        paint={{
          "circle-color": "#FF0000",
          "circle-radius": 10,
          "circle-opacity": 0.8,
        }}
      />
    </Source>
  );
};

export { HighlightLayer };
