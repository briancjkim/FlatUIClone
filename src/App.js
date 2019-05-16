import React from "react";
import seedColors from "./seedColors";
import Pallet from "./Pallet";
import { generatePallet } from "./colorHelpers";
import { Route, Switch } from "react-router-dom";
import PalletList from "./PalletList";

class App extends React.Component {
  // find pallet with id and pass to component as props in route.
  findPallet(id) {
    return seedColors.find(pallet => pallet.id === id);
  }
  render() {
    return (
      <div className="App">
        <Switch>
          <Route
            exact
            path="/"
            render={() => <PalletList pallets={seedColors} />}
          />
          <Route
            exact
            path="/pallet/:id"
            render={routeProps => (
              <Pallet
                {...routeProps}
                pallet={generatePallet(
                  this.findPallet(routeProps.match.params.id)
                )}
              />
            )}
          />
        </Switch>
      </div>
    );
  }
  // <Pallet {...routeProps} pallet={generatePallet(seedColors[4])} />
}

export default App;
