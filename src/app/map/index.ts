import L from "leaflet";
import { FeatureGroup, FeatureGroupInput, MapConfigs, Marker, MarkerInput, TileLayerInput } from "spec/map";

class Leaflet {
  private map: L.Map;
  private groups: FeatureGroup[];
  private markers: Marker[];
  private clusteredMarkers: Marker[];
  private clusteredNumber: number;
  private clusteredDisableAtZoom: number;

  constructor({
    id,
    center,
    zoom = 6,
    minZoom = 3,
    maxZoom = 12,
    clusteredNumber = 10,
    clusteredDisableAtZoom = 12,
    worldCopyJump = true,
    options = {},
  }: MapConfigs) {
    this.groups = [];
    this.markers = [];
    this.clusteredMarkers = [];
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
    this.map.addLayer(layer);
  }

  /**
   * Get map instance
   */
  public getMap(): L.Map {
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
    if (group) {
      group.layer.addLayer(marker.layer);
    } else {
      this.map.addLayer(marker.layer);
    }
  }

  /**
   * Render all markers into map
   */
  public renderAllMarkers(group?: FeatureGroup) {
    this.markers.forEach(marker => {
      this.renderMarker(marker, group);
    });
  }

  /**
   * Un-mount marker from map
   */
  public unmountMarker(marker: Marker, group?: FeatureGroup) {
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
  public unmountAllMarker(group?: FeatureGroup) {
    this.markers.forEach(marker => {
      this.unmountMarker(marker, group);
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
}

export default Leaflet;
