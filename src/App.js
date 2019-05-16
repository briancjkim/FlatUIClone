import React from "react";
import seedColors from "./seedColors";
import Pallet from "./Pallet";
import { generatePallet } from "./colorHelpers";

class App extends React.Component {
  render() {
    console.log(generatePallet(seedColors[4]));
    return (
      <div className="App">
        <Pallet {...seedColors[4]} />
      </div>
    );
  }
}

export default App;
