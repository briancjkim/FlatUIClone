import React from "react";
import seedColors from "./seedColors";
import Pallet from "./Pallet";
import { generatePallet } from "./colorHelpers";
import { Route, Switch } from "react-router-dom";
import PalletList from "./PalletList";
import SinglePallet from "./SinglePallet";
import NewPalletForm from "./NewPalletForm";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    const savedPallets = JSON.parse(localStorage.getItem("pallets"));
    // localstorage에서 pallet이없으면 seedColors사용
    this.state = {
      pallets: savedPallets || seedColors
    };
    this.savePallet = this.savePallet.bind(this);
    this.deletePallet = this.deletePallet.bind(this);
  }
  // find pallet with id and pass to component as props in route.
  findPallet(id) {
    return this.state.pallets.find(pallet => pallet.id === id);
  }
  deletePallet(id) {
    this.setState(
      st => ({
        pallets: st.pallets.filter(pallet => pallet.id !== id)
      }),
      this.syncLocalStorage
    );
  }
  savePallet(newPallet) {
    // newPallet컴포넌트로 들어가서 새로운pallet정보를가져오고 state에추가한다
    // 새로운팔렛을 state에저장하고 그뒤에 state를 localstorage에 저장한다.
    this.setState(
      {
        pallets: [...this.state.pallets, newPallet]
      },
      this.syncLocalStorage
    );
  }
  syncLocalStorage() {
    localStorage.setItem("pallets", JSON.stringify(this.state.pallets));
  }
  render() {
    return (
      <Route
        render={({ location }) => (
          <TransitionGroup>
            <CSSTransition key={location.key} classNames="fade" timeout={500}>
              <Switch location={location}>
                <Route
                  exact
                  path="/pallet/new"
                  render={routeProps => (
                    <div className="page">
                      <NewPalletForm
                        savePallet={this.savePallet}
                        pallets={this.state.pallets}
                        {...routeProps}
                      />
                    </div>
                  )}
                />
                <Route
                  exact
                  path="/"
                  render={routeProps => (
                    <div className="page">
                      <PalletList
                        pallets={this.state.pallets}
                        deletePallet={this.deletePallet}
                        {...routeProps}
                      />
                    </div>
                  )}
                />
                <Route
                  exact
                  path="/pallet/:id"
                  render={routeProps => (
                    <div className="page">
                      <Pallet
                        pallet={generatePallet(
                          this.findPallet(routeProps.match.params.id)
                        )}
                        {...routeProps}
                      />
                    </div>
                  )}
                />
                <Route
                  exact
                  path="/pallet/:palletId/:colorId"
                  render={routeProps => (
                    <div className="page">
                      <SinglePallet
                        pallet={generatePallet(
                          this.findPallet(routeProps.match.params.palletId)
                        )}
                        colorId={routeProps.match.params.colorId}
                        {...routeProps}
                      />
                    </div>
                  )}
                />
              </Switch>
            </CSSTransition>
          </TransitionGroup>
        )}
      />
    );
  }
  // <Pallet {...routeProps} pallet={generatePallet(seedColors[4])} />
}

export default App;
