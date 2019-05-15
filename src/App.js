import React from "react";
import seedColors from "./seedColors";
import Pallet from "./Pallet";

function App() {
  return (
    <div className="App">
      <Pallet {...seedColors[4]} />
    </div>
  );
}

export default App;
