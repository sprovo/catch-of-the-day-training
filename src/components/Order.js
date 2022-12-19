import React from "react";
import { formatPrice } from "../helpers";
import { TransitionGroup, CSSTransition } from "react-transition-group";

class Order extends React.Component {
  renderOrder = (key) => {
    const fish = this.props.fishes[key]; // fish details
    const count = this.props.order[key]; // quantity to buy

    // Accounts for the possibility that this fish could be made unavailable during checkout
    const isAvailable = fish && fish.status === "available";
    const transitionOptions = {
      classNames: "order",
      key,
      timeout: { enter: 500, exit: 500 },
    };

    if (!fish) return null;
    if (!isAvailable) {
      return (
        <CSSTransition {...transitionOptions}>
          <li key={key}>
            Sorry {fish ? fish.name : "fish"} is no longer available{" "}
          </li>
        </CSSTransition>
      );
    }

    return (
      <CSSTransition {...transitionOptions}>
        <li key={key}>
          <span>
            <TransitionGroup component="span" className="count">
              <CSSTransition
                classNames="count"
                key={count}
                timeout={{ enter: 500, exit: 500 }}
              >
                <span>{count}</span>
              </CSSTransition>
            </TransitionGroup>
            lbs {fish.name}
            {formatPrice(count * fish.price)}
            <button onClick={() => this.props.removeFromOrder(key)}>
              &times;
            </button>
          </span>
        </li>
      </CSSTransition>
    );
  };

  render() {
    const { fishes, order } = this.props;
    const orderIds = Object.keys(order);
    // Calc total order price
    const total = orderIds.reduce((prevTotal, key) => {
      const fish = fishes[key]; // fish details
      const count = order[key]; // quantity to buy
      const isAvailable = fish && fish.status === "available";
      if (isAvailable) {
        return prevTotal + count * fish.price;
      }
      return prevTotal;
    }, 0);

    return (
      <div className="order-wrap">
        <h2>Order</h2>
        <TransitionGroup component="ul" className="order">
          {orderIds.map(this.renderOrder)}
        </TransitionGroup>
        <div className="total">
          <strong>Total: {formatPrice(total)}</strong>
        </div>
      </div>
    );
  }
}

export default Order;
