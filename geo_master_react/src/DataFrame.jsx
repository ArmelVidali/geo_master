import { useEffect, useState } from "react";
import { RingLoader } from "react-spinners";
import noData from "./assets/404.jpg";
import selectIcon from "./assets/select-icon.svg";
import selectedIcon from "./assets/selected-icon.svg";

const DataFrame = (props) => {
  const {
    selectedCategory,
    selectedDepartment,
    view,
    setselectedEntities,
    data,
    setData,
  } = props;
  const [loading, setLoading] = useState(true);
  const [selected_icon, setSelectedIcon] = useState([]); // Initialize as an empty array

  const handleSelectIcon = (itemIndex) => {
    // Create a new array based on the current state
    if (selected_icon.includes(itemIndex)) {
      setSelectedIcon((prevSelectedIcon) =>
        prevSelectedIcon.filter((item) => item !== itemIndex)
      );
    } else {
      setSelectedIcon((prevSelectedIcon) => [...prevSelectedIcon, itemIndex]);
    }
  };

  useEffect(() => {
    setLoading(true);

    const fetchData = async () => {
      try {
        const res = await fetch(
          `http://localhost:3001/one_collection?collectionName=${selectedDepartment}&category=${selectedCategory}`
        );

        if (res.ok) {
          const json = await res.json();
          setData(json.output);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedDepartment, selectedCategory]);

  return (
    <div className={view === "data" ? "DataFrame" : "hidden-DataFrame"}>
      {loading ? (
        <div className="spinner-container">
          <RingLoader size={100} color={"white"} loading={loading} />
        </div>
      ) : data.length === 0 ? (
        <img src={noData} className="NoData" alt="No Data" />
      ) : (
        data.map((list, listIndex) => (
          <table key={listIndex}>
            <tbody>
              {list.map((item, itemIndex) => (
                <tr key={itemIndex}>
                  <td className="ItemName">
                    {item.name}{" "}
                    <img
                      src={
                        selected_icon.includes(itemIndex)
                          ? selectedIcon
                          : selectIcon
                      }
                      onClick={() => {
                        setselectedEntities(item._id);
                        handleSelectIcon(itemIndex);
                      }}
                      className="SelectIcon"
                      alt="Select Icon"
                    ></img>
                  </td>
                  <td className="TrDetails">
                    {"Projection : " +
                      item.crs.properties.name
                        .match(/EPSG::(\d+)/)[0]
                        .replace("::", ":")}
                  </td>
                  <td className="TrDetails">
                    {"Nombre d'entités : " + item.features.length}
                  </td>
                  <td className="TrDetails">
                    {"Géometrie : " + item.features[0].geometry.type}
                  </td>
                  <td className="TrDetails">
                    {"Champs : " +
                      Object.keys(item.features[0].properties).length +
                      " [...]"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ))
      )}
    </div>
  );
};

export default DataFrame;
