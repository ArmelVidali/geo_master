import { useEffect, useState } from "react";

const SideMenu = ({ onCategoryClick, onDepartmentClick }) => {
  const [data, setData] = useState(null);
  const categ = [
    "administratif",
    "adresses",
    "bati",
    "hydrographie",
    "lieux_nommes",
    "occupation_sol",
    "service_activites",
    "transports",
    "zone_reglementes",
  ];

  useEffect(() => {
    const fetchAll = async () => {
      const res = await fetch("http://localhost:3001/all_collections");
      if (res.ok) {
        const json = await res.json();
        setData(json); // Store the data in state
      }
    };

    fetchAll();
  }, []);

  // Set a list with all categories and a sublist with all departements, trimmed to remove the suffix (Bati, Adresse...)
  return (
    <div className="SideMenu">
      <input type="text" />
      <p>Catégorie</p>
      <ul className="CategList">
        {categ.map((category, index) => (
          <li
            key={index}
            id={category}
            className="FilterLi"
            onClick={() => onCategoryClick(category)}
          >
            {category.replace("_", " ").charAt(0).toUpperCase() +
              category.replace("_", " ").slice(1)}
          </li>
        ))}
      </ul>
      <p>Emprise géographique</p>
      {data ? (
        <ul className="DepartementList">
          {data.map((element, index) => (
            <li
              key={index}
              id={element}
              className="FilterLi"
              onClick={() => onDepartmentClick(element)}
            >
              {element.replace("dep", "Departement").replace("_", " ")}
            </li>
          ))}
        </ul>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default SideMenu;
