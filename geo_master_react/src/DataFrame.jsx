import { useEffect, useState } from "react";
import { RingLoader } from "react-spinners";

const DataFrame = (props) => {
  const [data, setData] = useState(null);
  var { selectedCategory, selectedDepartment } = props;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const fetchAll = async () => {
      const res = await fetch(
        `http://localhost:3001/one_collection?collectionName=${selectedDepartment}&category=${selectedCategory}`
      );
      console.log(
        `http://localhost:3001/one_collection?collectionName=${selectedDepartment}&category=${selectedCategory}`
      );
      if (res.ok) {
        const json = await res.json();
        console.log(json);
        setData(json.output); // Store the data in state
        setLoading(false);
      }
    };

    fetchAll();
  }, [selectedDepartment, selectedCategory]);

  return (
    <div className="DataFrame">
      {loading ? (
        <div className="spinner-container">
          <RingLoader size={100} color={"white"} loading={loading} />
        </div>
      ) : (
        data.map((list, listIndex) => {
          return (
            <table key={listIndex}>
              {list.map((item, itemIndex) => (
                <div>
                  {/* entity group name, ie : france*/}
                  <p className="EntityName">{item.name}</p>
                  {/* entity group */}
                  <tr key={itemIndex} className="GeoEntityGroup">
                    {item.features.map((entity, entityIndex) => (
                      /* value key/pair values for each entity */
                      <tr key={entityIndex} className="GeoEntity">
                        {Object.entries(entity.properties).map(
                          ([key, value]) => (
                            <li key={key}>{key + " : " + value}</li>
                          )
                        )}
                      </tr>
                    ))}
                  </tr>
                </div>
              ))}
            </table>
          );
        })
      )}
    </div>
  );
};

export default DataFrame;
