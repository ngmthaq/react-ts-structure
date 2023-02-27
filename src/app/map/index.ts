import L from "leaflet";
import {
  CircleInput,
  CustomLatLngBounds,
  FeatureGroup,
  FeatureGroupInput,
  GeoPicture,
  LatLng,
  LatLngBounds,
  MapConfigs,
  Marker,
  MarkerInput,
  PolygonInput,
  PolylineInput,
  RectangleInput,
  TileLayerInput,
} from "spec/map";
class Leaflet {
  private map?: L.Map;
  private groups: FeatureGroup[];
  private markers: Marker[];
  private clusteredMarkers: Marker[];
  private geoPictures: GeoPicture[];
  private clusteredNumber: number;
  private clusteredDisableAtZoom: number;
  constructor() {
    this.groups = [];
    this.markers = [];
    this.clusteredMarkers = [];
    this.geoPictures = [];
    this.clusteredNumber = 12;
    this.clusteredDisableAtZoom = 12;
  }
  public init({
    id,
    center,
    zoom = 6,
    minZoom = 3,
    maxZoom = 12,
    clusteredNumber = 12,
    clusteredDisableAtZoom = 12,
    worldCopyJump = true,
    options = {},
  }: MapConfigs) {
    this.clusteredNumber = clusteredNumber;
    this.clusteredDisableAtZoom = clusteredDisableAtZoom;
    this.map = L.map(id, {
      center,
      zoom,
      minZoom,
      maxZoom,
      worldCopyJump,
      preferCanvas: true,
      renderer: L.canvas(),
      ...options,
    });
  }
  /**
   * Set tile layer
   */
  public setTileLayer({ urlTemplate, options = {} }: TileLayerInput) {
    let layer = L.tileLayer(urlTemplate, options);
    if (!this.map) throw new Error("Map is not initialize yet");
    this.map.addLayer(layer);
  }
  /**
   * Get map instance
   */
  public getMap(): L.Map {
    if (!this.map) throw new Error("Map is not initialize yet");
    return this.map;
  }
  /**
   * Create a feature group
   */
  public createFeatureGroup({ name }: FeatureGroupInput): FeatureGroup {
    let layer = L.featureGroup();
    let group = { name: name, layer: layer };
    this.groups.push(group);
    return group;
  }
  /**
   * Get feature group
   */
  public getFeatureGroup(name: string): FeatureGroup | undefined {
    return this.groups.find(group => group.name === name);
  }
  /**
   * Get all feature groups
   */
  public getAllFeatureGroups(): FeatureGroup[] {
    return this.groups;
  }
  /**
   * Render feature group into map
   */
  public renderFeatureGroup(group: FeatureGroup) {
    if (!this.map) throw new Error("Map is not initialize yet");
    this.map.addLayer(group.layer);
  }
  /**
   * Render all feature groups into map
   */
  public renderAllFeatureGroups() {
    this.groups.forEach(group => {
      this.renderFeatureGroup(group);
    });
  }
  /**
   * Un-mount feature group layer from map
   */
  public unmountFeatureGroup(group: FeatureGroup) {
    if (!this.map) throw new Error("Map is not initialize yet");
    if (this.map.hasLayer(group.layer)) {
      this.map.removeLayer(group.layer);
    }
  }
  /**
   * Un-mount all feature group layers from map
   */
  public unmountAllFeatureGroup() {
    this.groups.forEach(group => {
      this.unmountFeatureGroup(group);
    });
  }
  /**
   * Remove feature group from list
   */
  public removeFeatureGroup(group: FeatureGroup) {
    this.groups = this.groups.filter(g => g.name !== group.name);
  }
  /**
   * Remove all feature groups from list
   */
  public removeAllFeatureGroups() {
    this.groups = [];
  }
  /**
   * Create marker
   */
  public createMarker({ name, latlng, options = {} }: MarkerInput) {
    let layer = L.marker(latlng, options);
    let marker = { name: name, layer: layer };
    this.markers.push(marker);
    return marker;
  }
  /**
   * Get marker
   */
  public getMarker(name: string): Marker | undefined {
    return this.markers.find(marker => marker.name === name);
  }
  /**
   * Get all markers
   */
  public getAllMarkers(): Marker[] {
    return this.markers;
  }
  /**
   * Render marker into map
   */
  public renderMarker(marker: Marker, group?: FeatureGroup) {
    if (!this.map) throw new Error("Map is not initialize yet");
    if (group) {
      group.layer.addLayer(marker.layer);
    } else {
      this.map.addLayer(marker.layer);
    }
  }
  /**
   * Create clustered marker
   */
  private createCluteredMarker(name: string, latlng: L.LatLngExpression, options: L.MarkerOptions): Marker {
    let layer = L.marker(latlng, options);
    let marker = { name, layer };
    return marker;
  }
  /**
   * Render all markers into map
   */
  public renderAllMarkers(group?: FeatureGroup) {
    if (!this.map) throw new Error("Map is not initialize yet");
    this.unmountAllMarkers(group);
    this.clusteredMarkers = [];
    const h: number = 10;
    const w: number = 20;
    const bounds: L.LatLngBounds = this.map.getBounds();
    const nort: number = bounds.getNorth();
    const east: number = bounds.getEast();
    const south: number = bounds.getSouth();
    const west: number = bounds.getWest();
    const mapHeight: number = nort - south;
    const mapWidth: number = east - west;
    const partHeight: number = mapHeight / h;
    const partWidth: number = mapWidth / w;
    let splitedBounds: CustomLatLngBounds[] = [];
    let clusteredMarkers: Marker[] = [];
    for (let i = 0; i < h; i++) {
      for (let j = 0; j < w; j++) {
        let lat: number = partHeight * i + south;
        let lng: number = partWidth * j + west;
        let latlng: L.LatLngExpression = this.createLatLng({ lat, lng });
        let nextLat: number = partHeight * (i + 1) + south;
        let nextLng: number = partWidth * (j + 1) + west;
        let nextLatlng: L.LatLngExpression = this.createLatLng({ lat: nextLat, lng: nextLng });
        let bounds: L.LatLngBounds = this.createLatLngBounds({ southWest: latlng, northEast: nextLatlng });
        splitedBounds.push({ bounds: bounds, markers: [] });
      }
    }
    let visibleMarkers: Marker[] = this.markers.filter(marker => bounds.contains(marker.layer.getLatLng()));
    if (this.map.getZoom() < this.clusteredDisableAtZoom) {
      visibleMarkers.forEach(marker => {
        let markerLatlng: L.LatLng = marker.layer.getLatLng();
        let isHandled: boolean = false;
        splitedBounds.forEach(area => {
          if (area.bounds.contains(markerLatlng) && !isHandled) {
            area.markers.push(marker);
            isHandled = true;
          }
        });
      });
      splitedBounds.forEach((area, index) => {
        if (area.markers.length <= this.clusteredNumber) {
          clusteredMarkers = [...clusteredMarkers, ...area.markers];
        } else {
          let name: string = "clustered-marker-" + index;
          let html: string = `<div class="custom_clustered_marker">${area.markers.length}</div>`;
          let centerLatlng: L.LatLng = area.bounds.getCenter();
          let clusteredIcon: L.DivIcon = this.createIcon({ html: html });
          let newMarker: Marker = this.createCluteredMarker(name, centerLatlng, { icon: clusteredIcon });
          clusteredMarkers = [...clusteredMarkers, newMarker];
        }
      });
    }
    this.clusteredMarkers = clusteredMarkers;
    this.clusteredMarkers.forEach(marker => {
      this.renderMarker(marker, group);
    });
  }
  /**
   * Un-mount marker from map
   */
  public unmountMarker(marker: Marker, group?: FeatureGroup) {
    if (!this.map) throw new Error("Map is not initialize yet");
    if (group) {
      if (group.layer.hasLayer(marker.layer)) {
        group.layer.removeLayer(marker.layer);
      }
    } else {
      if (this.map.hasLayer(marker.layer)) {
        this.map.removeLayer(marker.layer);
      }
    }
  }
  /**
   * Un-mount all markers from map
   */
  public unmountAllMarkers(group?: FeatureGroup) {
    if (!this.map) throw new Error("Map is not initialize yet");
    this.clusteredMarkers.forEach(marker => {
      if (group) {
        if (group.layer.hasLayer(marker.layer)) {
          group.layer.removeLayer(marker.layer);
        }
      } else {
        if (!this.map) throw new Error("Map is not initialize yet");
        if (this.map.hasLayer(marker.layer)) {
          this.map.removeLayer(marker.layer);
        }
      }
    });
  }
  /**
   * Remove marker from list
   */
  public removeMarker(marker: Marker) {
    this.markers = this.markers.filter(g => g.name !== marker.name);
  }
  /**
   * Remove all markers from list
   */
  public removeAllMarkers() {
    this.markers = [];
  }
  /**
   * Create custom div icon
   */
  public createIcon(options: L.DivIconOptions): L.DivIcon {
    return L.divIcon(options);
  }
  /**
   * Create popup
   */
  public createPopup(options: L.PopupOptions): L.Popup {
    return L.popup(options);
  }
  /**
   * Create tooltip
   */
  public createTooltip(options: L.TooltipOptions): L.Tooltip {
    return L.tooltip(options);
  }
  /**
   * Create lat long
   */
  public createLatLng({ lat, lng }: LatLng): L.LatLngExpression {
    return L.latLng(lat, lng);
  }
  /**
   * Create lat long bounds
   */
  public createLatLngBounds({ southWest, northEast }: LatLngBounds) {
    return L.latLngBounds(southWest, northEast);
  }
  /**
   * Create polyline
   */
  public createPolyline({ name, latlngs, options = {} }: PolylineInput): GeoPicture {
    let layer = L.polyline(latlngs, options);
    let geoPicture: GeoPicture = { name: name, layer: layer };
    this.geoPictures.push(geoPicture);
    return geoPicture;
  }
  /**
   * Create polygon
   */
  public createPolygon({ name, latlngs, options = {} }: PolygonInput): GeoPicture {
    let layer = L.polygon(latlngs, options);
    let geoPicture: GeoPicture = { name: name, layer: layer };
    this.geoPictures.push(geoPicture);
    return geoPicture;
  }
  /**
   * Create rectangle
   */
  public createRectangle({ name, latlngBounds, options = {} }: RectangleInput): GeoPicture {
    let layer = L.rectangle(latlngBounds, options);
    let geoPicture: GeoPicture = { name: name, layer: layer };
    this.geoPictures.push(geoPicture);
    return geoPicture;
  }
  /**
   * Create circle
   */
  public createCircle({ name, latlng, radius, options = {} }: CircleInput): GeoPicture {
    let layer = L.circle(latlng, radius, options);
    let geoPicture: GeoPicture = { name: name, layer: layer };
    this.geoPictures.push(geoPicture);
    return geoPicture;
  }
  /**
   * Render geo picture
   */
  public renderGeoPicture(pictue: GeoPicture, group?: FeatureGroup) {
    if (!this.map) throw new Error("Map is not initialize yet");
    if (group) {
      group.layer.addLayer(pictue.layer);
    } else {
      this.map.addLayer(pictue.layer);
    }
  }
  /**
   * Render all geo pictures
   */
  public renderAllGeoPictures(group?: FeatureGroup) {
    this.unmountAllGeoPictures(group);
    this.geoPictures.forEach(picture => {
      this.renderGeoPicture(picture, group);
    });
  }
  /**
   * Un-mount geo picture layer from map
   */
  public unmountGeoPicture(picture: GeoPicture, group?: FeatureGroup) {
    if (!this.map) throw new Error("Map is not initialize yet");
    if (group) {
      if (group.layer.hasLayer(picture.layer)) {
        group.layer.removeLayer(picture.layer);
      }
    } else {
      if (this.map.hasLayer(picture.layer)) {
        this.map.removeLayer(picture.layer);
      }
    }
  }
  /**
   * Un-mount all geo picture layers from map
   */
  public unmountAllGeoPictures(group?: FeatureGroup) {
    this.geoPictures.forEach(picture => {
      this.unmountGeoPicture(picture, group);
    });
  }
  /**
   * Remove geo picture from list
   */
  public removeGeoPicture(pictue: GeoPicture) {
    this.geoPictures = this.geoPictures.filter(g => g.name !== pictue.name);
  }
  /**
   * Remove all geo pictures from list
   */
  public removeAllGeoPictures() {
    this.geoPictures = [];
  }
  /**
   * Add event listener
   */
  on(event: string, callback: any) {
    if (!this.map) throw new Error("Map is not initialize yet");
    this.map.on(event, callback);
  }
  /**
   * Remove event listener
   */
  off(event: string) {
    if (!this.map) throw new Error("Map is not initialize yet");
    this.map.off(event);
  }
}
export default Leaflet;
