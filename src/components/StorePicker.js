import React from "react";
import { getFunName } from "../helpers";

class StorePicker extends React.Component {
  myInput = React.createRef();

  goToStore = (event) => {
    event.preventDefault();
    // Get text input
    const storeName = this.myInput.current.value;
    // Change page to store/text-input
    this.props.history.push(`/store/${storeName}`);
  };

  render() {
    return (
      <form className="store-selector" onSubmit={this.goToStore}>
        <h2>Please Enter A Store</h2>
        <input
          ref={this.myInput}
          type="text"
          required
          placeholder="Store name"
          defaultValue={getFunName()}
        />
        <button type="submit">Visit Store {"->"}</button>
      </form>
    );
  }
}

export default StorePicker;
