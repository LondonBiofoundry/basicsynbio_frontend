import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Hidden from "@material-ui/core/Hidden";
import TemporaryDrawer from "./drawbar";

import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: "#293241",
    height: "10vh",
  },
  menuButton: {
    color: "white",
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    textAlign: "left",
    padding: "10",
    color: "primary",
  },
  navbartext: {
    color: "white",
  },
}));

export default function NavBar() {
  const classes = useStyles();

  const navStyle = {
    color: "white",
    textDecoration: "none",
  };

  return (
    <div>
      <AppBar position="static" color="transparent" className={classes.root}>
        <Toolbar>
          <Link to="/">
            <IconButton
              edge="start"
              className={classes.menuButton}
              aria-label="menu"
            >
              <img
                src={process.env.PUBLIC_URL + "navbarlogo.png"}
                height="50"
                alt="logo"
              />
            </IconButton>
          </Link>
          <Typography variant="h6" className={classes.title}></Typography>
          <Hidden xsDown>
            <Link style={navStyle} to="/">
              <Button>
                <Typography className={classes.navbartext}>Home</Typography>
              </Button>
            </Link>
            <Link style={navStyle} to="/about">
              <Button>
                <Typography className={classes.navbartext}>About</Typography>
              </Button>
            </Link>
            <Link style={navStyle} to="/designer">
              <Button>
                <Typography className={classes.navbartext}>designer</Typography>
              </Button>
            </Link>
          </Hidden>
          <Hidden smUp>
            <TemporaryDrawer />
          </Hidden>
        </Toolbar>
      </AppBar>
    </div>
  );
}
