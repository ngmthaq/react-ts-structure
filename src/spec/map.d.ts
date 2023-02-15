import L from "leaflet";

interface MapConfigs {
  id: string;
  center: L.LatLngExpression;
  zoom: number;
  worldCopyJump: boolean;
  minZoom: number;
  maxZoom: number;
  clusteredNumber: number;
  clusteredDisableAtZoom: number;
  options?: L.MapOptions;
}

interface FeatureGroup {
  name: string;
  layer: L.FeatureGroup;
}

interface Marker {
  name: string;
  layer: L.Marker;
}

interface FeatureGroupInput {
  name: string;
}

interface MarkerInput {
  name: string;
  latlng: L.LatLng;
  options?: L.MarkerOptions;
}

interface TileLayerInput {
  urlTemplate: string;
  options?: L.TileLayerOptions;
}
