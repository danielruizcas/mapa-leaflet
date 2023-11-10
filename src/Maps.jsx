import { useEffect, useRef } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const icon = L.icon({
  iconUrl: "./marcador-de-posicion.png",
  iconSize: [38, 38],
});

const position = [4.679571508557538, -74.04770051214827];

function Maps(props) {
  const { selectPosition } = props;
  const locationSelection = [selectPosition?.lat, selectPosition?.lon];
  const mapRef = useRef();

  useEffect(() => {
    if (mapRef.current && selectPosition) {
      mapRef.current.setView([selectPosition.lat, selectPosition.lon]);
    }
  }, [selectPosition]);

  return (
    <MapContainer
      center={position}
      zoom={11}
      scrollWheelZoom={false}
      style={{ width: "100%", height: "100%" }}
      ref={mapRef}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {selectPosition && (
        <Marker position={locationSelection} icon={icon}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      )}
    </MapContainer>
  );
}

export default Maps;
