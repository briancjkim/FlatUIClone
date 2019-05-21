import React, { Component } from "react";
import { ChromePicker } from "react-color";
import Button from "@material-ui/core/Button";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { withStyles } from "@material-ui/core/styles";

const styles = {
  root: {
    width: "100%"
  },
  picker: {
    width: "100% !important",
    marginTop: "2rem"
  },
  form: {
    "& p": {
      fontSize: "1rem !important"
    }
  },
  colorNameInput: {
    width: "100%",
    height: "70px",
    fontSize: "1rem",
    "& input": {
      padding: "2rem"
    }
  },
  addColor: {
    width: "100%",
    padding: "1rem ",
    fontSize: "2rem",
    margintTop: "1rem"
  }
};
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
    const { palletIsFull, classes } = this.props;
    return (
      <div className={classes.root}>
        <ChromePicker
          color={this.state.currentColor}
          onChangeComplete={color => this.ChangeCurrentColor(color)}
          className={classes.picker}
        />
        <ValidatorForm
          onSubmit={this.handleSubmit}
          ref="form"
          className={classes.form}
        >
          <TextValidator
            name="colorName"
            variant="filled"
            margin="normal"
            placeholder="Color Name"
            value={this.state.colorName}
            className={classes.colorNameInput}
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
            className={classes.addColor}
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

export default withStyles(styles)(ColorPickerForm);
