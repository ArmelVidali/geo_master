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
  var [view, setView] = useState("map");

  return (
    <>
      <SideMenu
        onCategoryClick={setselectedCategory}
        onDepartmentClick={setselectedDepartment}
      />
      <NavBar setView={setView} />
      <Lmap view={view} />
      <DataFrame
        selectedCategory={selectedCategory}
        selectedDepartment={selectedDepartment}
        setView={view}
      />
    </>
  );
}

export default App;
