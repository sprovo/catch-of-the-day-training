import React from "react";

class EditFishForm extends React.Component {
  handleChange = (event) => {
    const { name, value } = event.currentTarget;
    // Update fish
    const updatedFish = {
      ...this.props.fish,
      [name]: value,
    };
    // Update State
    this.props.updateFish(this.props.index, updatedFish);
  };

  render() {
    const {
      fish: { name, status, price, desc, image },
    } = this.props;

    return (
      <div className="fish-edit">
        <input
          type="text"
          name="name"
          onChange={this.handleChange}
          placeholder="name"
          value={name}
        />
        <input
          type="text"
          name="price"
          onChange={this.handleChange}
          placeholder="price"
          value={price}
        />
        <select
          name="status"
          onChange={this.handleChange}
          placeholder="status"
          value={status}
        >
          <option value="available">Fresh!</option>
          <option value="unavailable">Sold Out!</option>
        </select>
        <textarea
          name="desc"
          onChange={this.handleChange}
          placeholder="desc"
          value={desc}
        />
        <input
          type="text"
          name="image"
          onChange={this.handleChange}
          placeholder="image"
          value={image}
        />
        <button onClick={() => this.props.deleteFish(this.props.index)}>
          Remove Fish
        </button>
      </div>
    );
  }
}

export default EditFishForm;
