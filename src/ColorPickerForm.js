import React, { Component } from "react";
import { ChromePicker } from "react-color";
import Button from "@material-ui/core/Button";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";

export class ColorPickerForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentColor: "teal",
      colorName: ""
    };
    this.ChangeCurrentColor = this.ChangeCurrentColor.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    ValidatorForm.addValidationRule("isUniqueColorName", value => {
      //return boolean
      return this.props.colors.every(
        ({ name }) => name.toLowerCase() !== value.toLowerCase()
      );
    });
    ValidatorForm.addValidationRule("isUniqueColor", value => {
      return this.props.colors.every(
        ({ color }) => color !== this.state.currentColor
      );
    });
  }

  ChangeCurrentColor(color) {
    this.setState({
      currentColor: color.hex
    });
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit() {
    const newColor = {
      name: this.state.colorName,
      color: this.state.currentColor
    };
    this.props.addNewColor(newColor);
  }

  render() {
    const { palletIsFull } = this.props;
    return (
      <div>
        <ChromePicker
          color={this.state.currentColor}
          onChangeComplete={color => this.ChangeCurrentColor(color)}
        />
        <ValidatorForm onSubmit={this.handleSubmit} ref="form">
          <TextValidator
            name="colorName"
            value={this.state.colorName}
            onChange={this.handleChange}
            validators={["required", "isUniqueColorName", "isUniqueColor"]}
            errorMessages={[
              "Enter a Color name",
              "Color name is already used",
              "Color is already used"
            ]}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            style={{
              backgroundColor: palletIsFull ? "grey" : this.state.currentColor
            }}
            disabled={palletIsFull}
          >
            {palletIsFull ? "Pallet is full" : "Add Color"}
          </Button>
        </ValidatorForm>
      </div>
    );
  }
}

export default ColorPickerForm;
