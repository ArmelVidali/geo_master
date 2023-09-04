import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import SideMenu from "./sideMenu";
import DataFrame from "./DataFrame";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <SideMenu />
      <DataFrame />
    </>
  );
}

export default App;
