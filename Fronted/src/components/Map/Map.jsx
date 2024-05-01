import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";

const MyMap = ({ apiKey }) => {
  const isRetina = L.Browser.retina;
  const baseUrl = `https://maps.geoapify.com/v1/tile/osm-bright/{z}/{x}/{y}.png?apiKey=${apiKey}`;
  const retinaUrl = `https://maps.geoapify.com/v1/tile/osm-bright/{z}/{x}/{y}@2x.png?apiKey=${apiKey}`;

  const markerIcon = L.icon({
    iconUrl: `https://api.geoapify.com/v1/icon?size=xx-large&type=awesome&color=%233e9cfe&icon=paw&apiKey=${apiKey}`,
    iconSize: [31, 46],
    iconAnchor: [15.5, 42],
    popupAnchor: [0, -45],
  });

  return (
    <MapContainer
      center={[48.09698, 11.555466]}
      zoom={13}
      style={{ width: "100%", height: "100vh" }}
    >
      <TileLayer
        url={isRetina ? retinaUrl : baseUrl}
        attribution='Powered by <a href="https://www.geoapify.com/" target="_blank">Geoapify</a> | © OpenStreetMap <a href="https://www.openstreetmap.org/copyright" target="_blank">contributors</a>'
        maxZoom={20}
        id="osm-bright"
      />
      <Marker position={[48.09698, 11.555466]} icon={markerIcon}>
        <Popup>This is Munich Zoo</Popup>
      </Marker>
    </MapContainer>
  );
};

export default MyMap;
