import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer } from "react-leaflet";

const Lmap = (prop) => {
  const view = prop.view;
  return (
    <div className={view == "map" ? "mapContainer" : "hidden-mapContainer"}>
      <MapContainer center={[48.8566, 2.3522]} zoom={13}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      </MapContainer>
    </div>
  );
};

export default Lmap;
