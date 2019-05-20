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
    marginRight: 20
  },
  navBtns: {
    marginRight: "1rem"
  },
  navBtn: {
    margin: "0 0.5rem"
  },
  goBackLink: {
    textDecoration: "none"
  }
});
export default styles;
