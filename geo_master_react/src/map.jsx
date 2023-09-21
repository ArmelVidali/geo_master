import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
import { MapContainer, TileLayer, GeoJSON, LayersControl } from "react-leaflet";

const Lmap = (props) => {
  const view = props.view;
  const selectedEntities = props.selectedEntities;
  var data = props.data;

  // Create a state variable to store the filtered data
  const [filteredData, setFilteredData] = useState([]);

  // Use useEffect to filter the data whenever selectedEntities or data change
  useEffect(() => {
    // Check if data is not null before filtering
    if (data) {
      // Filter the data to only display the selected entities
      data = [].concat(...data);
      const entities_to_render = data.filter((entity) =>
        selectedEntities.includes(entity._id)
      );

      // Update the filteredData state with the filtered data
      setFilteredData(entities_to_render);
    }
  }, [data, selectedEntities]);

  return (
    <div className={view === "map" ? "mapContainer" : "hidden-mapContainer"}>
      <MapContainer center={[48.8566, 2.3522]} zoom={13}>
        {/* Use filteredData to render GeoJSON components */}
        <LayersControl>
          {filteredData.map((entity, index) => (
            <LayersControl.Overlay name={entity.name}>
              <GeoJSON
                data={entity}
                key={index}
                pathOptions={{
                  fillColor: () => {
                    const letters = "0123456789ABCDEF";
                    let color = "#";
                    for (let i = 0; i < 6; i++) {
                      color += letters[Math.floor(Math.random() * 16)];
                    }
                    return color;
                  },
                }}
              ></GeoJSON>
            </LayersControl.Overlay>
          ))}
        </LayersControl>

        <TileLayer url="https://tile.openstreetmap.org/{z}/{x}/{y}.png" />
      </MapContainer>
    </div>
  );
};

export default Lmap;
