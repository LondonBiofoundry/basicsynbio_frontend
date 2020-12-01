import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
import { SeqViz } from "seqviz";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  SeqVizDiv: {
    width: "100%",
    height: "100%",
  },
}));

export default function VisualiseAssembly(props) {
  const classes = useStyles();
  const [assemblySequence, setAssemblySequence] = useState("");
  const [assemblySequenceErr, setAssemblySequenceErr] = useState("");

  React.useEffect(() => {
    let active = true;

    (async () => {
      console.log(props.shoppingBagItems);
      const response = await fetch(
        "http://127.0.0.1:5000/s?build=" +
          JSON.stringify(props.shoppingBagItems)
      );
      const myresponse = await response.json();
      try {
        setAssemblySequence(myresponse.seq);
      } catch {
        setAssemblySequenceErr(myresponse.error);
      }
      console.log("seq", assemblySequence);
      console.log("err", assemblySequenceErr);
    })();

    return () => {
      active = false;
    };
  }, [props.open]);

  return (
    <div>
      <Dialog
        fullScreen
        open={props.open}
        TransitionComponent={Transition}
        keepMounted
        onClose={props.handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <AppBar className={classes.appBar} color="secondary">
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={props.handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Current Assembly Sequence
            </Typography>
            <Button autoFocus color="inherit" onClick={props.handleClose}>
              Exit
            </Button>
          </Toolbar>
        </AppBar>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            the selected part is from the collection: {props.itemcollection}
          </DialogContentText>
          <div className={classes.SeqVizDiv}>
            <SeqViz name="J23100" file={assemblySequence} viewer="linear" />
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
