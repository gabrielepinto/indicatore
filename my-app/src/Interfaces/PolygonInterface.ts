type Coordinate = [number, number]; // [longitudine, latitudine]

type PolygonGeometry = {
  type: "Polygon";
  coordinates: Coordinate[][]; // Cambia da Coordinate[][][][] a Coordinate[][]
};

export interface PolygonFeatureProperties {
  GRD_ID: string;
  indicatore: number | null; // L'indicatore può essere un numero o null
}

export interface PolygonFeature {
  type: "Feature";
  properties: PolygonFeatureProperties;
  geometry: PolygonGeometry;
}

export interface PolygonFeatureCollection {
  type: "FeatureCollection";
  name: string;
  features: PolygonFeature[];
}
