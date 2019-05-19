import React from "react";
import seedColors from "./seedColors";
import Pallet from "./Pallet";
import { generatePallet } from "./colorHelpers";
import { Route, Switch } from "react-router-dom";
import PalletList from "./PalletList";
import SinglePallet from "./SinglePallet";
import NewPalletForm from "./NewPalletForm";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pallets: [...seedColors]
    };
    this.savePallet = this.savePallet.bind(this);
  }
  // find pallet with id and pass to component as props in route.
  findPallet(id) {
    return this.state.pallets.find(pallet => pallet.id === id);
  }
  savePallet(newPallet) {
    // newPallet컴포넌트로 들어가서 새로운pallet정보를가져오고 state에추가한다
    this.setState({
      pallets: [...this.state.pallets, newPallet]
    });
  }
  render() {
    return (
      <div className="App">
        <Switch>
          <Route
            exact
            path="/pallet/new"
            render={routeProps => (
              <NewPalletForm
                savePallet={this.savePallet}
                pallets={this.state.pallets}
                {...routeProps}
              />
            )}
          />
          <Route
            exact
            path="/"
            render={routeProps => (
              <PalletList pallets={this.state.pallets} {...routeProps} />
            )}
          />
          <Route
            exact
            path="/pallet/:id"
            render={routeProps => (
              <Pallet
                pallet={generatePallet(
                  this.findPallet(routeProps.match.params.id)
                )}
                {...routeProps}
              />
            )}
          />
          <Route
            exact
            path="/pallet/:palletId/:colorId"
            render={routeProps => (
              <SinglePallet
                pallet={generatePallet(
                  this.findPallet(routeProps.match.params.palletId)
                )}
                colorId={routeProps.match.params.colorId}
                {...routeProps}
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
