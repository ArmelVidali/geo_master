import { useEffect, useState } from "react";

const DataFrame = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchAll = async () => {
      const res = await fetch("http://localhost:3001/getAllDocuments");
      if (res.ok) {
        const json = await res.json();
        console.log(json.output);
        setData(json.output); // Store the data in state
      }
    };

    fetchAll();
  }, []);

  return (
    <div>
      {data &&
        data.map((list, listIndex) => {
          return (
            <div key={listIndex}>
              {list.map((item, itemIndex) => (
                <div>
                  {/* entity group name, ie : france*/}
                  {item.name}
                  {/* entity group */}
                  <ul key={itemIndex} className="GeoEntityGroup">
                    {item.features.map((entity, entityIndex) => (
                      /* value key/pair values for each entity */
                      <ul key={entityIndex}>
                        {Object.entries(entity.properties).map(
                          ([key, value]) => (
                            <li key={key}>{key + " : " + value}</li>
                          )
                        )}
                      </ul>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          );
        })}
    </div>
  );
};

export default DataFrame;

/* <li key={itemIndex}>
                  <span>{"Name : " + item.name}</span>
                  <br />
                  <span>
                    {item.crs.properties.name
                      .substring(item.crs.properties.name.indexOf("EPSG"))
                      .replace("::", " : ")}
                  </span>
                  <br />
                  <span>{"Features : " + item.features.length}</span>
                  <ul>
                    {Object.entries(item.features).map(([key, value]) => (
                      <li key={key}>{key + value}</li>
                    ))}
                  </ul>
                </li> */
