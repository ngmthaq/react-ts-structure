import L from "leaflet";

interface MapConfigs {
  id: string | HTMLElement;
  center: L.LatLngExpression;
  zoom?: number;
  worldCopyJump?: boolean;
  minZoom?: number;
  maxZoom?: number;
  clusteredNumber?: number;
  clusteredDisableAtZoom?: number;
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
  latlng: L.LatLngExpression;
  name: string;
  options?: L.MarkerOptions;
}

interface TileLayerInput {
  urlTemplate: string;
  options?: L.TileLayerOptions;
}

interface LatLng {
  lat: number;
  lng: number;
}

interface LatLngBounds {
  southWest: L.LatLngExpression;
  northEast: L.LatLngExpression;
}

interface CustomLatLngBounds {
  bounds: L.LatLngBounds;
  markers: Marker[];
}

interface GeoPicture {
  name: string;
  layer: L.Path;
}

interface PolylineInput {
  name: string;
  latlngs: L.LatLngExpression[];
  options?: L.PolylineOptions;
}

interface PolygonInput {
  name: string;
  latlngs: L.LatLngExpression[];
  options?: L.PolylineOptions;
}

interface RectangleInput {
  name: string;
  latlngBounds: L.LatLngBounds;
  options?: L.PolylineOptions;
}

interface CircleInput {
  name: string;
  latlng: L.LatLngExpression;
  radius: number;
  options?: CustomCircleOptions;
}

interface CustomCircleOptions extends L.CircleOptions {
  radius?: number;
}
