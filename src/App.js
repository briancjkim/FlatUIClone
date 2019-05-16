import React from "react";
import seedColors from "./seedColors";
import Pallet from "./Pallet";
import { generatePallet } from "./colorHelpers";

class App extends React.Component {
  render() {
    console.log();
    return (
      <div className="App">
        <Pallet pallet={generatePallet(seedColors[4])} />
      </div>
    );
  }
}

export default App;
