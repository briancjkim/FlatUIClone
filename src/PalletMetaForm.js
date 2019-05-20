import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContentText from "@material-ui/core/DialogContentText";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";

export class PalletMetaForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: true,
      palletName: ""
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    ValidatorForm.addValidationRule("isUniquePalletName", value => {
      //return boolean
      return this.props.pallets.every(
        ({ paletteName }) => paletteName.toLowerCase() !== value.toLowerCase()
      );
    });
  }
  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { fullScreen, savePallet } = this.props;
    const { palletName } = this.state;

    return (
      <Dialog
        fullScreen={fullScreen}
        open={this.state.open}
        onClose={this.handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {"Choose a palette name"}
        </DialogTitle>
        <ValidatorForm onSubmit={() => savePallet(palletName)}>
          <DialogContent>
            <DialogContentText>
              Please enter a name for your new beautiful palette. Make sure it's
              unique!
            </DialogContentText>

            <TextValidator
              label="Palette Name"
              name="palletName"
              value={palletName}
              onChange={this.handleChange}
              fullWidth
              margin="normal"
              validators={["required", "isUniquePalletName"]}
              errorMessages={[
                "Enter Palette Name",
                "PalletName is already taken"
              ]}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button type="submit" variant="contained" color="primary">
              Save palette
            </Button>
          </DialogActions>
        </ValidatorForm>
      </Dialog>
    );
  }
}

export default PalletMetaForm;
