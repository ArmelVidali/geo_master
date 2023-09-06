import React, { useState } from "react";
import download_png from "/home/geo/Desktop/geo_master/geo_master_react/src/assets/download.svg";

const Navbar = (prop) => {
  const setView = prop.setView;
  const [indicatorPosition, setIndicatorPosition] = useState(2);

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
    </nav>
  );
};

export default Navbar;
