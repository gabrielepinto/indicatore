import { FC, useCallback, useEffect, useRef, useState } from "react";
import ReactMapGl, {
  MapLayerMouseEvent,
  MapRef,
  Popup,
} from "react-map-gl/maplibre";
import { PolygonLayer } from "./PolygonLayer";
import punti_vicinanze from "../punti_vicinanze.json";
import dati_punti_vicinanze from "../dati_punti_vicinanze.json";
import { FeatureCollection } from "../Interfaces/data_Interface";
import { PolygonFeatureCollection } from "../Interfaces/PolygonInterface";
import { HighlightLayer } from "./HighlightLayer";
import polygondata from "../centri.json";
import { defaulPolygonColor } from "./defaultPolygon";
import { PopupContent } from "./Popup";

const Map: FC = () => {
  const mapRef = useRef<MapRef>(null);
  const polygonData = polygondata as unknown as PolygonFeatureCollection;


  //   useState<PolygonFeatureCollection>(polygonData);
  const polygons = polygonData;

  const [gridId, setGridId] = useState<string>("");
  const [id_points, setIdPoints] = useState<number[] | []>([]);
  const [selectedFeature, setSelectedFeature] = useState<any | undefined>();
  const [highlightFeatures, setHighlightFeatures] =
    useState<FeatureCollection | null>(null);
  const [popupCoordinates, setPopupCoordinates] = useState<
    MapLayerMouseEvent["lngLat"] | null
  >(null);

  const filterFeaturesByIds = (
    featureCollection: FeatureCollection,
    ids: number[]
  ): FeatureCollection => {
    return {
      ...featureCollection,
      features: featureCollection.features.filter((feature) =>
        ids.includes(feature.properties.id_point)
      ),
    };
  };
  //CRS3035RES1000mN2105000E4503000

  const findItemByIdGrid = (id: string) => {
    const key = id;
    if (Object.prototype.hasOwnProperty.call(punti_vicinanze, key)) {
      const ids = punti_vicinanze[key as keyof typeof punti_vicinanze].id_point;
      setIdPoints(ids);
    }
  };

  useEffect(() => {
    console.log(selectedFeature);
  }, [selectedFeature]);

  useEffect(() => {
    console.log(popupCoordinates);
  }, [popupCoordinates]);

  useEffect(() => {
    if (gridId) {
      console.log("GRID ID", gridId);
      findItemByIdGrid(gridId);
    }
  }, [gridId]);

  useEffect(() => {
    if (id_points && id_points.length > 0) {
      console.log(id_points);
      const filteredFeatures = filterFeaturesByIds(
        dati_punti_vicinanze as FeatureCollection,
        id_points
      );
      setHighlightFeatures(filteredFeatures);
      console.log(filteredFeatures);
    } else {
      setHighlightFeatures(null);
    }
  }, [id_points]);

  const handleClick = (event: MapLayerMouseEvent): void => {
    if (mapRef.current && event.features && event.features[0]) {
      const map = mapRef.current.getMap();
      const layers = map.getStyle().layers;
      console.log(layers);
      if (event.features[0]?.layer?.id === "highlight-layer") {
        setPopupCoordinates(event.lngLat);
        setSelectedFeature(event.features[0].properties);
      }
      console.log("event.features.", event.features);
      console.log("event.features.0.", event.features[0]);

      if (event.features[0]?.layer?.id === "polygon-layer") {
        setGridId(event.features[0].properties.GRD_ID);
        console.log(
          "event.features[0].properties.GRD_ID",
          event.features[0].properties.GRD_ID
        );
        map.setPaintProperty("polygon-layer", "fill-color", [
          "case",
          ["==", ["get", "GRD_ID"], event.features[0].properties.GRD_ID],
          "rgba(255, 0, 0, 0.9)",
          defaulPolygonColor,
        ]);
      }
    }
  };

  const handleMouseEnterLayer = useCallback((e: MapLayerMouseEvent) => {
    e.target.getCanvas().style.cursor = "pointer";
  }, []);

  const handleMouseLeaveLayer = useCallback((e: MapLayerMouseEvent) => {
    e.target.getCanvas().style.cursor = "";
  }, []);
  return (
    <>
      <ReactMapGl
        style={{ width: "100vw", height: "100vh", position: "relative" }}
        initialViewState={{
          bearing: -0,
          latitude: 41.8928,
          longitude: 12.4837,
          padding: { top: 0, bottom: 0, left: 0, right: 0 },
          pitch: 0,
          zoom: 9,
        }}
        
        interactiveLayerIds={["highlight-layer", "polygon-layer"]}
        ref={mapRef}
        mapStyle="https://tiles.stadiamaps.com/styles/osm_bright.json"
        attributionControl={false}
        onClick={handleClick}
        onMouseEnter={handleMouseEnterLayer}
        onMouseLeave={handleMouseLeaveLayer}
      >
        {popupCoordinates != null && selectedFeature !== undefined && (
          <Popup
            maxWidth="400px"
            latitude={popupCoordinates.lat}
            longitude={popupCoordinates.lng}
            onClose={() => {
              setPopupCoordinates(null);
            }}
          >
            <PopupContent {...selectedFeature} />
          </Popup>
        )}
        <PolygonLayer polygons={polygons} />
        {highlightFeatures && <HighlightLayer data={highlightFeatures} />}
      </ReactMapGl>
    </>
  );
};

export { Map };
