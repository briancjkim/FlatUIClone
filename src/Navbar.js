import React from "react";
import Slider from "rc-slider";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import "rc-slider/assets/index.css";
// position last due to rc-slide default classname
import "./Navbar.css";

class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      format: "hex",
      open: false
    };
    this.handleChangeFormat = this.handleChangeFormat.bind(this);
    this.closeSnackbar = this.closeSnackbar.bind(this);
  }
  closeSnackbar() {
    this.setState({
      open: false
    });
  }
  handleChangeFormat(e) {
    this.props.handleChangeFormat(e.target.value);
    this.setState({
      format: e.target.value,
      open: true
    });
  }
  render() {
    const { level, handleChangeLevel } = this.props;
    return (
      <header className="Navbar">
        <div className="logo">
          <a href="#">Chanjong's Color</a>
        </div>
        <div className="slider-container">
          <span>level: {level}</span>
          <div className="slider">
            <Slider
              defaultValue={level}
              onChange={handleChangeLevel}
              min={100}
              max={900}
              step={100}
            />
          </div>
        </div>
        <div className="select-container">
          <Select value={this.state.format} onChange={this.handleChangeFormat}>
            <MenuItem value="hex">HEX - #ffffff</MenuItem>
            <MenuItem value="rgb">RGB - rgb(255,255,255)</MenuItem>
            <MenuItem value="rgba">RGBA - rgba(255,255,255,1.0)</MenuItem>
          </Select>
        </div>
        <Snackbar
          anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
          open={this.state.open}
          autoHideDuration={3000}
          message={
            <span className="message-id">
              Format Changed to {this.state.format.toUpperCase()}
            </span>
          }
          ContentProps={{
            "aria-describedby": "message-id"
          }}
          onClose={this.closeSnackbar}
          action={[
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              onClick={this.closeSnackbar}
            >
              <CloseIcon />
            </IconButton>
          ]}
        />
      </header>
    );
  }
}

export default Navbar;
