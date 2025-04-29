import { ReactNode } from "react";

export interface FeatureProperties {
  source: ReactNode;
  lat?: number;
  lon?: number;
  name: string;
  sport_type: string;
  sport_entertainment: string;
  id_point: number;
}

export interface FeatureGeometry {
  type: "Point";
  coordinates: [number, number];
}

export interface Feature {
  type: "Feature";
  properties: FeatureProperties;
  geometry: FeatureGeometry;
}

export interface FeatureCollection {
  type: "FeatureCollection";
  name: string;
  crs: {
    type: "name";
    properties: { name: string };
  };
  features: Feature[];
}
