import { useState } from "react";
import "./App.css";
import Maps from "./Maps";
import SearchBox from "./SearchBox";

function App() {
  const [selectPlace, setSelectPlace] = useState(null);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        width: "98vw",
        height: "98vh",
      }}
    >
      <div
        style={{
          width: "50vw",
        }}
      >
        <Maps selectPosition={selectPlace}></Maps>
      </div>
      <div
        style={{
          width: "50vw",
          height: "100vh",
        }}
      >
        <SearchBox
          selectPosition={selectPlace}
          setSelectPosition={setSelectPlace}
        ></SearchBox>
      </div>
    </div>
  );
}

export default App;
