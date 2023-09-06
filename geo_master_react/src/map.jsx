import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Polygon } from "react-leaflet";

const Lmap = (props) => {
  const view = props.view;
  const selectedEntities = props.selectedEntities;
  const data = props.data;

  // Create an array to store the Polygon components
  const polygonComponents = [];

  selectedEntities.forEach((entity_id) => {
    data.forEach((nested_array) => {
      console.log(nested_array);
      nested_array.forEach((inner_array) => {
        inner_array.features.forEach((feature) => {
          if (feature.geometry.type === "Polygon") {
            polygonComponents.push(
              <Polygon positions={feature.geometry.coordinates} />
            );
          }
        });
      });
    });
  });

  return (
    <div className={view === "map" ? "mapContainer" : "hidden-mapContainer"}>
      <MapContainer center={[48.8566, 2.3522]} zoom={13}>
        <polygonComponents />
        <TileLayer url="https://tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {/* Render the Polygon components outside of the loop */}
      </MapContainer>
    </div>
  );
};

export default Lmap;
