import React from "react";
import Header from "./Header";
import Order from "./Order";
import Inventory from "./Inventory";
import sampleFishes from "../sample-fishes";
import Fish from "./Fish";
import base from "../base";

class App extends React.Component {
  state = {
    fishes: {},
    order: {},
  };

  componentDidMount() {
    // Firebase reference
    const { params } = this.props.match;
    // Reload order data via local storage
    const localStoreRef = localStorage.getItem(params.storeId);
    if (localStoreRef) {
      this.setState({ order: JSON.parse(localStoreRef) });
    }
    // Stores a reference to DB so the binding can be removed on unmount
    this.ref = base.syncState(`${params.storeId}/fishes`, {
      context: this,
      state: "fishes",
    });
  }

  componentDidUpdate() {
    localStorage.setItem(
      this.props.match.params.storeId,
      JSON.stringify(this.state.order)
    );
  }

  componentWillUnmount() {
    base.removeBinding(this.ref);
  }

  addFish = (fish) => {
    // Copy existing state
    const fishes = { ...this.state.fishes };
    // Add new fish
    fishes[`fish${Date.now()}`] = fish;
    // Update fishes state
    this.setState({
      fishes: fishes,
    });
  };

  updateFish = (key, updatedFish) => {
    // Creates updated fish state
    const fishes = { ...this.state.fishes, [key]: updatedFish };
    this.setState({ fishes });
  };

  deleteFish = (key) => {
    // Remove an item from state
    const fishes = { ...this.state.fishes, [key]: null };
    this.setState({ fishes });
  };

  loadSampleFishes = () => {
    this.setState({
      fishes: sampleFishes,
    });
  };

  addToOrder = (key) => {
    // Copy State
    const order = { ...this.state.order };
    // Add to order or update number in order
    order[key] = order[key] + 1 || 1;
    // Set new state
    this.setState({ order });
  };

  removeFromOrder = (key) => {
    // Copy State
    const order = { ...this.state.order };
    // Remove item from order
    delete order[key];
    // Set new state
    this.setState({ order });
  };

  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh Seafood Market" />
          <ul className="fishes">
            {Object.keys(this.state.fishes).map((key) => (
              <Fish
                key={key}
                index={key}
                details={this.state.fishes[key]}
                addToOrder={this.addToOrder}
              />
            ))}
          </ul>
        </div>
        <Order
          fishes={this.state.fishes}
          order={this.state.order}
          removeFromOrder={this.removeFromOrder}
        />
        <Inventory
          fishes={this.state.fishes}
          storeId={this.props.match.params.storeId}
          addFish={this.addFish}
          updateFish={this.updateFish}
          deleteFish={this.deleteFish}
          loadSampleFishes={this.loadSampleFishes}
        />
      </div>
    );
  }
}

export default App;
