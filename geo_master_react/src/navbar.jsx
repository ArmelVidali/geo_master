import React, { useState } from "react";
import download_png from "/home/geo/Desktop/geo_master/geo_master_react/src/assets/download.svg";

const Navbar = (props) => {
  const setView = props.setView;
  const selectedEntities = props.selectedEntities;
  const data = props.data;
  const [indicatorPosition, setIndicatorPosition] = useState(2);

  function download_geojsons() {
    const entities_to_download = []
      .concat(...data)
      .filter((entity) => selectedEntities.includes(entity._id));

    entities_to_download.forEach((entity, index) => {
      const jsonString = JSON.stringify(entity, null, 2);
      const blob = new Blob([jsonString], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${entity.name}.geojson`;
      a.click();
      URL.revokeObjectURL(url);
    });
  }

  const handleNavLinkClick = (index) => {
    setIndicatorPosition(index);
  };

  return (
    <nav>
      <a
        href="#"
        onClick={() => {
          handleNavLinkClick(1);
          setView("data");
        }}
        className={indicatorPosition === 1 ? "active" : ""}
      >
        Données
      </a>

      <a
        href="#"
        onClick={() => {
          handleNavLinkClick(2);
          setView("map");
        }}
        className={indicatorPosition === 2 ? "active" : ""}
      >
        Cartographie
      </a>

      <a
        href="#"
        onClick={() => {
          download_geojsons();
        }}
        style={{ position: "absolute", right: -60 }}
      >
        <img src={download_png} height={"19vh"}></img>
      </a>
    </nav>
  );
};

export default Navbar;
