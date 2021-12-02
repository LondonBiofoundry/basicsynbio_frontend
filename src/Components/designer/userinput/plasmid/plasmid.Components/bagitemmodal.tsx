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
import SearchIcon from "@material-ui/icons/Search";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { TransitionProps } from "@material-ui/core/transitions";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import ButtonGroup from "@material-ui/core/ButtonGroup";
// @ts-ignore
import { SeqViz } from "seqviz";
import { API, ApiEndpoint } from "../../../../../Api";
import { BasicPart } from "../../../../../generated-sources";
import { returnFileFromJsonPart } from "../../../../../utils/getFilesFromParts";

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  switch: {
    paddingLeft: "10%",
  },
  toggle: {
    background: "white",
    borderRadius: "5px",
  },
  SeqVizDiv: {
    width: "100%",
    height: "100%",
  },
}));

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface Props {
  open: boolean;
  handleClose: () => void;
  item: BasicPart;
}

export const BagItemModal: React.FC<Props> = ({ open, handleClose, item }) => {
  const classes = useStyles();
  const [DnaViewerString, setDnaViewerString] = useState<string>("");
  const [viewType, setViewType] = useState<"DnaFeatureViewer" | "Seqviz">(
    "Seqviz"
  );
  const [label, setLabel] = useState([]);
  const [selectedQualifier, setSelectedQualifier] = useState("Feature");
  const [returnedSeq, setReturnedSeq] = useState(item.seq);
  const [annotationsSet, setAnnotationsSet] = useState([]);
  const userWidth =
    (window.innerWidth ||
      document.documentElement.clientWidth ||
      document.body.clientWidth) - 65;
  const userHeight =
    (window.innerHeight ||
      document.documentElement.clientHeight ||
      document.body.clientHeight) - 120;

  type ViewMethod = "DnaFeatureViewer" | "Seqviz";
  const handleViewTypeChange = (event: any, newMethod: ViewMethod) => {
    if (["DnaFeatureViewer", "Seqviz"].indexOf(newMethod) >= 0) {
      if (newMethod === viewType) return;
      else setViewType(newMethod);
    }
  };

  React.useEffect(() => {
    if (!open) {
      setLabel([]);
      setSelectedQualifier("Feature");
      setViewType("Seqviz");
    } else {
      (async () => {
        const responseLabels = await API.viewPartLabelsViewpartlabelsPost(
          JSON.stringify(item),
          returnFileFromJsonPart(item)
        );
        const responseLabelsData = responseLabels.data;
        if (responseLabelsData.result) {
          setLabel(responseLabelsData.message);
        }
      })();
      (async () => {
        const DnaFeatureViewer = await fetch(ApiEndpoint + "dnafeatureviewer", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(item),
        });
        const dnafeatureviewer_response = await DnaFeatureViewer.json();
        setDnaViewerString(dnafeatureviewer_response.base64image);
        console.log(dnafeatureviewer_response);
      })();
    }
  }, [open]);

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

  function process(entry: any) {
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
      const seqAnnResponse = await API.viewSequenceAnnotationsReturnseqannPost(
        selectedQualifier,
        JSON.stringify(item),
        returnFileFromJsonPart(item)
      );
      try {
        const result = seqAnnResponse.data;
        var filtered = result.message.filter(Boolean);
        var processed = filtered.map(process);
        setAnnotationsSet(processed);
      } catch {
        console.log("error filtering");
      }
    })();
  }, [selectedQualifier]);

  const SeqVizComponent = () => {
    if (selectedQualifier === "Feature") {
      return (
        <SeqViz
          name="J23100"
          seq={returnedSeq}
          viewer="linear"
          style={{ height: userHeight, width: userWidth }}
        />
      );
    } else {
      return (
        <SeqViz
          name="item"
          seq={returnedSeq}
          annotations={annotationsSet}
          viewer="linear"
          style={{ height: userHeight, width: userWidth }}
        />
      );
    }
  };

  return (
    <div>
      <Dialog
        fullScreen
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography variant="h5" className={classes.title}>
              {item ? item.label : ""}
            </Typography>
            {viewType === "Seqviz" ? (
              <>
                <Typography variant="h6" className={classes.title}>
                  Current Annotation: {selectedQualifier}
                </Typography>
                <div>
                  <Autocomplete
                    color="secondary"
                    id="item-qualifiers"
                    options={label}
                    getOptionLabel={(option) => option}
                    value={selectedQualifier}
                    onChange={(event, newValue) => {
                      if (newValue !== null) {
                        setSelectedQualifier(newValue);
                      }
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
              </>
            ) : (
              <></>
            )}
            <div className={classes.switch}>
              <div className={classes.toggle}>
                <ToggleButtonGroup
                  color="primary"
                  value={viewType}
                  exclusive
                  onChange={handleViewTypeChange}
                  aria-label="text alignment"
                >
                  <ToggleButton value="Seqviz">Seqviz</ToggleButton>
                  {/* {item.collection !== "BASIC_BIOLEGIO_LINKERS" ? (
                    <ToggleButton value="DnaFeatureViewer">
                      DnaFeatureViewer
                    </ToggleButton>
                  ) : (
                    <ToggleButton disabled value="DnaFeatureViewer">
                      DnaFeatureViewer
                    </ToggleButton>
                  )} */}
                </ToggleButtonGroup>
              </div>
            </div>
          </Toolbar>
        </AppBar>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            The selected part is from the collection:{" "}
            {item ? item.collection : "Custom"}
          </DialogContentText>
          {viewType === "Seqviz" ? (
            <div className={classes.SeqVizDiv}>
              <SeqVizComponent />
            </div>
          ) : (
            <>
              <img
                width="100%"
                src={`data:image/jpeg;base64,${DnaViewerString}`}
              />
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
