import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
// @ts-ignore
import { SeqViz } from "seqviz";
import { ApiEndpoint } from "../../../../Api";
import { TransitionProps } from "@material-ui/core/transitions";
import { Popups } from "../../../../interfaces/Popups";
import { BasicPart } from "../../../../generated-sources";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement },
  ref: React.Ref<unknown>
) {
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
  switch: {
    paddingLeft: "10%",
  },
  toggle: {
    background: "white",
    borderRadius: "5px",
  },
}));

interface Props {
  shoppingBagItems: BasicPart[];
  openPopups: Popups;
  setOpenPopups: React.Dispatch<React.SetStateAction<Popups>>;
}

export const VisualiseAssembly: React.FC<Props> = ({
  shoppingBagItems,
  openPopups,
  setOpenPopups,
}) => {
  const classes = useStyles();
  const [DnaViewerString, setDnaViewerString] = useState<string>("");
  const [viewType, setViewType] = useState<"DnaFeatureViewer" | "Seqviz">(
    "Seqviz"
  );
  const [seqLabel, setSeqLabel] = useState(["Feature"]);
  const [selectedSeqQualifier, setSelectedSeqQualifier] = useState("Feature");
  const [returnSeq, setReturnSeq] = useState("");
  const [annotationsSeqSet, setAnnotationsSeqSet] = useState([]);
  const userWidth =
    (window.innerWidth ||
      document.documentElement.clientWidth ||
      document.body.clientWidth) - 65;
  const userHeight =
    window.innerHeight ||
    document.documentElement.clientHeight ||
    document.body.clientHeight - 120;

  type ViewMethod = "DnaFeatureViewer" | "Seqviz";
  const handleViewTypeChange = (event: any, newMethod: ViewMethod) => {
    if (["DnaFeatureViewer", "Seqviz"].indexOf(newMethod) >= 0) {
      if (newMethod === viewType) return;
      else setViewType(newMethod);
    }
  };

  //////
  React.useEffect(() => {
    (async () => {
      const responselabels = await fetch(ApiEndpoint + "viewseqlabels", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(shoppingBagItems),
      });
      const resultlabels = await responselabels.json();
      if (!resultlabels.error) setSeqLabel(resultlabels);
    })();
    (async () => {
      const DnaFeatureViewer = await fetch(
        ApiEndpoint + "dnafeatureviewer_assembly",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(shoppingBagItems),
        }
      );
      const dnafeatureviewer_response = await DnaFeatureViewer.json();
      setDnaViewerString(dnafeatureviewer_response.base64image);
      console.log(dnafeatureviewer_response);
    })();
  }, [openPopups.viewAssembly]);

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
      const response = await fetch(
        ApiEndpoint +
          "assemblySeq?qualifier=" +
          JSON.stringify(selectedSeqQualifier),
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(shoppingBagItems),
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
  }, [selectedSeqQualifier, openPopups.viewAssembly]);

  React.useEffect(() => {
    if (!openPopups.viewAssembly) {
      setSeqLabel([]);
      setSelectedSeqQualifier("Feature");
      setReturnSeq("");
    }
  }, [openPopups.viewAssembly]);

  const SeqVizComponent = () => {
    if (selectedSeqQualifier === "Feature") {
      return (
        <SeqViz
          name="J23100"
          seq={returnSeq}
          annotations={annotationsSeqSet}
          viewer="linear"
          style={{ height: userHeight, width: userWidth }}
        />
      );
    } else {
      return (
        <SeqViz
          name="item"
          seq={returnSeq}
          annotations={annotationsSeqSet}
          viewer="linear"
          style={{ height: userHeight, width: userWidth }}
        />
      );
    }
  };

  return (
    <>
      <Dialog
        fullScreen
        open={openPopups.viewAssembly}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => setOpenPopups((C) => ({ ...C, viewAssembly: false }))}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <AppBar className={classes.appBar} color="secondary">
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={() =>
                setOpenPopups((C) => ({ ...C, viewAssembly: false }))
              }
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Current Assembly Sequence
            </Typography>
            {viewType === "Seqviz" ? (
              <>
                <Typography variant="h6" className={classes.title}>
                  Current Annotation: {selectedSeqQualifier}
                </Typography>
                <div>
                  <Autocomplete
                    color="white"
                    id="seq-qualifiers"
                    options={seqLabel ? seqLabel : ["Feauture"]}
                    getOptionLabel={(option) => option}
                    value={selectedSeqQualifier}
                    onChange={(event, newValue) => {
                      if (newValue !== null) {
                        setSelectedSeqQualifier(newValue);
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
                  <ToggleButton value="DnaFeatureViewer">
                    DnaFeatureViewer
                  </ToggleButton>
                </ToggleButtonGroup>
              </div>
            </div>
          </Toolbar>
        </AppBar>
        <DialogContent>
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
          <Button
            onClick={() =>
              setOpenPopups((C) => ({ ...C, viewAssembly: false }))
            }
            color="primary"
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
