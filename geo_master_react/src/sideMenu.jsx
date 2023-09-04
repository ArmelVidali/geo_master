import { useEffect, useState } from "react";

const SideMenu = () => {
  const [data, setData] = useState(null);
  var categ = [
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
        setData(json.collections); // Store the data in state
      }
    };

    fetchAll();
  }, []);

  return (
    <div>
      <p>Ouvrir 94 hydrographie pour les test</p>
      <ul>
        {categ.map((category, index) => (
          <li key={index} id={category}>
            {category}
          </li>
        ))}
      </ul>
      {data ? (
        <ul>
          {data.map((element, index) => (
            <li key={index} id={element.match(/dep_(\d+)/)[0]}>
              {element
                .match(/dep_(\d+)/)[0]
                .replace("dep", "Departement")
                .replace("_", " ")}
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
