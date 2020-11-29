import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import { SeqViz } from "seqviz";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles({
  SeqVizDiv: {
    width: "1000px",
    height: "200px",
  },
});

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
        width="1000px"
        open={props.open}
        TransitionComponent={Transition}
        keepMounted
        onClose={props.handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">
          Assembly Sequence
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            The Sequence of the whole assembly is:
          </DialogContentText>
          <div className={classes.SeqVizDiv}>
            <SeqViz name="J23100" seq={assemblySequence} viewer="linear" />
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
