import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContentText from "@material-ui/core/DialogContentText";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import "emoji-mart/css/emoji-mart.css";
import { Picker } from "emoji-mart";
import { withStyles } from "@material-ui/core/styles";

const styles = {
  dialog: {
    "& p": {
      fontSize: "1.2rem "
    }
  }
};
export class PalletMetaForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stage: "form",
      palletName: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.showEmojiPicker = this.showEmojiPicker.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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
  showEmojiPicker() {
    this.setState({
      stage: "emoji"
    });
  }
  handleSubmit(value) {
    const emoji = value.native;
    const paletteName = this.state.palletName;
    // seedColos에서 paletteName으로되어있으니 그대로해줘야된다
    this.props.savePallet({ paletteName, emoji });
  }
  render() {
    const { fullScreen, hideForm, classes } = this.props;
    const { palletName, stage } = this.state;

    return (
      <>
        <Dialog open={stage === "emoji"} onClose={hideForm}>
          <DialogTitle id="responsive-dialog-title">
            {"Choose a palette emoji"}
          </DialogTitle>
          <Picker title="Pick your emoji…" onSelect={this.handleSubmit} />
        </Dialog>
        <Dialog
          fullScreen={fullScreen}
          open={stage === "form"}
          onClose={hideForm}
          aria-labelledby="responsive-dialog-title"
          className={classes.dialog}
        >
          <DialogTitle id="responsive-dialog-title">
            {"Choose a palette name"}
          </DialogTitle>
          <ValidatorForm onSubmit={this.showEmojiPicker}>
            <DialogContent>
              <DialogContentText>
                Please enter a name for your new beautiful palette. Make sure
                it's unique!
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
              <Button onClick={hideForm} color="primary">
                Cancel
              </Button>
              <Button type="submit" variant="contained" color="primary">
                Save palette
              </Button>
            </DialogActions>
          </ValidatorForm>
        </Dialog>
      </>
    );
  }
}

export default withStyles(styles)(PalletMetaForm);
