import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import SideMenu from "./sideMenu";
import DataFrame from "./DataFrame";
import NavBar from "./navbar";
import Lmap from "./map";

function App() {
  const [count, setCount] = useState(0);
  var [selectedCategory, setselectedCategory] = useState(null);
  var [selectedDepartment, setselectedDepartment] = useState(null);
  var [selectedEntities, setselectedEntities] = useState([]);
  var [view, setView] = useState("map");
  const [data, setData] = useState([]);

  const handleselectedEntities = (item_id) => {
    // Create a new array based on the current state
    if (selectedEntities.includes(item_id)) {
      setselectedEntities((selectedEntities) =>
        selectedEntities.filter((item) => item != item_id)
      );
    } else {
      setselectedEntities((selectedEntities) => [...selectedEntities, item_id]);
    }
  };

  return (
    <>
      <SideMenu
        onCategoryClick={setselectedCategory}
        onDepartmentClick={setselectedDepartment}
      />
      <NavBar setView={setView} />
      <Lmap view={view} selectedEntities={selectedEntities} data={data} />
      <DataFrame
        selectedCategory={selectedCategory}
        selectedDepartment={selectedDepartment}
        view={view}
        setselectedEntities={handleselectedEntities}
        data={data}
        setData={setData}
      />
    </>
  );
}

export default App;
