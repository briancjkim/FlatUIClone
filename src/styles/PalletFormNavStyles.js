import sizes from "./sizes";
import { DRAWER_WIDTH } from "../constant";
const drawerWidth = DRAWER_WIDTH;
const styles = theme => ({
  root: {
    display: "flex"
  },

  hide: {
    display: "none"
  },
  appBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: "64px",
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 20,
    [sizes.down("xs")]: {
      margin: "0"
    }
  },
  navBtns: {
    marginRight: "1rem",
    [sizes.down("xs")]: {
      marginRight: "0"
    }
  },
  navBtn: {
    boxSizing: "border-box",
    margin: "0 0.5rem",
    [sizes.down("xs")]: {
      margin: "0 ",
      padding: 0
    }
  },
  goBackLink: {
    textDecoration: "none"
  }
});
export default styles;
