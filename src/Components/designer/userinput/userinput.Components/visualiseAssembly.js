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
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { SeqViz } from "seqviz";
import { ApiEndpoint } from "../../../..";

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
  const [seqLabel, setSeqLabel] = useState(["Feature"]);
  const [selectedSeqQualifier, setSelectedSeqQualifier] = useState("Feature");
  const [assemblySequence, setAssemblySequence] = useState("");
  const [assemblySequenceErr, setAssemblySequenceErr] = useState("");
  const [returnSeq, setReturnSeq] = useState("");
  const [annotationsSeqSet, setAnnotationsSeqSet] = useState([]);
  //const loading = props.open && seqLabel.length === 0;

  //////
  React.useEffect(() => {
    (async () => {
      const responselabels = await fetch(ApiEndpoint + "viewseqlabels", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(props.shoppingBagItems),
      });
      const resultlabels = await responselabels.json();
      if (!resultlabels.error) setSeqLabel(resultlabels);
    })();
  }, [props.open]);

  function random_color() {
    const colorCodes = [
      "#9DEAED", // cyan
      "#8FDE8C", // green
      "#CFF283", // light green
      "#8CDEBD", // teal
      "#F0A3CE", // pink
      "#F7C672", // orange
      "#F07F7F", // red
      "#FAA887", // red-orange
      "#F099F7", // magenta
      "#C59CFF", // purple
      "#6B81FF", // blue
      "#85A6FF", // light blue
    ];
    return colorCodes[Math.floor(Math.random() * colorCodes.length)];
  }

  function process(entry) {
    if (entry)
      return {
        name: entry.name,
        start: entry.start,
        end: entry.end,
        direction: entry.direction,
        color: random_color(),
      };
    else return;
  }

  React.useEffect(() => {
    (async () => {
      const response = await fetch(
        ApiEndpoint +
          "assemblySeq?qualifier=" +
          JSON.stringify(selectedSeqQualifier),
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(props.shoppingBagItems),
        }
      );
      const result = await response.json();
      if (!result.err) {
        try {
          var filtered = result.annotated.filter(Boolean);
          var processed = filtered.map(process);
          setAnnotationsSeqSet(processed);
          setReturnSeq(result.seq);
        } catch (err) {
          console.log("error filtering", err);
        }
      }
    })();
  }, [selectedSeqQualifier, props.open]);

  React.useEffect(() => {
    if (!props.open) {
      setSeqLabel([]);
      setSelectedSeqQualifier("Feature");
      setReturnSeq("");
    }
  }, [props.open]);

  const SeqVizComponent = () => {
    if (selectedSeqQualifier === "Feature") {
      return (
        <SeqViz
          name="J23100"
          seq={returnSeq}
          annotations={annotationsSeqSet}
          viewer="linear"
        />
      );
    } else {
      return (
        <SeqViz
          name="item"
          seq={returnSeq}
          annotations={annotationsSeqSet}
          viewer="linear"
        />
      );
    }
  };

  return (
    <>
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
            <Typography variant="h6" className={classes.title}>
              Current Annotation: {selectedSeqQualifier}
            </Typography>
            <div className={classes.search}>
              <Autocomplete
                color="white"
                id="seq-qualifiers"
                options={seqLabel ? seqLabel : ["Feauture"]}
                getOptionLabel={(option) => option}
                value={selectedSeqQualifier}
                onChange={(event, newValue) => {
                  setSelectedSeqQualifier(newValue);
                }}
                style={{
                  width: 400,
                  background: "white",
                  borderRadius: "5px",
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Search Qualifiers to change Annotation..."
                    variant="filled"
                  />
                )}
              />
            </div>
          </Toolbar>
        </AppBar>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            the selected part is from the collection: {props.itemcollection}
          </DialogContentText>
          <div className={classes.SeqVizDiv}>
            <SeqVizComponent />
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
