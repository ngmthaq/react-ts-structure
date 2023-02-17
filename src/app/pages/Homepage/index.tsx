import React, { useEffect, useMemo } from "react";
import { getRandomInRange } from "app/utils";
import Leaflet from "app/map";

const Homepage: React.FC<HomepageProps> = () => {
  const leaflet = useMemo(() => new Leaflet(), []);

  useEffect(() => {
    let cont = document.querySelector("#map");
    if (cont) {
      leaflet.init({ id: "map", center: [51.505, -0.09] });
      leaflet.setTileLayer({ urlTemplate: "https://tile.openstreetmap.org/{z}/{x}/{y}.png" });

      let polylineLatLngs = [
        leaflet.createLatLng({ lat: 37, lng: -109.05 }),
        leaflet.createLatLng({ lat: 47, lng: -109.05 }),
        leaflet.createLatLng({ lat: 57, lng: -109.05 }),
      ];

      //   Vector
      let tooltip = leaflet.createTooltip({ content: "Polyline tooltip content" });
      let polyline = leaflet.createPolyline({ name: "polyline_1", latlngs: polylineLatLngs });
      polyline.layer.bindTooltip(tooltip);
      leaflet.renderGeoPicture(polyline);

      //   Marker
      let icon = leaflet.createIcon({ html: `<div class="custom_marker"></div>` });
      for (let i = 0; i < 100000; i++) {
        leaflet.createMarker({
          name: "marker" + i,
          latlng: leaflet.createLatLng({ lat: getRandomInRange(-90, 90), lng: getRandomInRange(-180, 180) }),
          options: {
            icon: icon,
          },
        });
      }

      leaflet.renderAllMarkers();

      leaflet.on("zoomend", (e: any) => {
        leaflet.renderAllMarkers();
      });

      leaflet.on("moveend", (e: any) => {
        leaflet.renderAllMarkers();
      });
    }
  }, [leaflet]);

  return <div id="map"></div>;
};

export default Homepage;

interface HomepageProps {}
