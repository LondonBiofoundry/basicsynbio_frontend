import React, { useState } from "react";
import Checkbox from "@material-ui/core/Checkbox";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import { makeStyles } from "@material-ui/core/styles";
import fetch from "cross-fetch";
import CircularProgress from "@material-ui/core/CircularProgress";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Divider from "@material-ui/core/Divider";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Typography from "@material-ui/core/Typography";
import { ApiEndpoint } from "../../../../index.js";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
    marginTop: theme.spacing(2),
    textAlign: "center",
  },
  container: {
    display: "flex",
    flexWrap: "wrap",
  },
  formControl: {
    marginTop: theme.spacing(1),
    width: "100%",
  },
  selectcolumn: {
    width: "100%",
    paddingTop: "10px",
  },
}));

export default function Chip(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const loading = open && props.CollectionOptions.length === 0;

  //Popup Components
  const [versionOpen, setVersionOpen] = useState(false);
  const [age, setAge] = React.useState("");
  const [clickedCollection, setClickedCollection] = useState("");
  const handleChange = (event) => {
    setAge(Number(event.target.value) || "");
  };

  const handleVersionClose = () => {
    setVersionOpen(false);
  };

  React.useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    (async () => {
      const response = await fetch(ApiEndpoint + "collections/names");
      const myresponse = await response.json();
      console.log(myresponse);

      if (active) {
        props.setCollectionOptions(myresponse.data);
      }
    })();

    return () => {
      active = false;
    };
  }, [loading]);

  React.useEffect(() => {
    if (!open) {
      props.setCollectionOptions([]);
    }
  }, [open]);

  function HandleClickOnChip(event) {
    console.log("event", event);
    console.log("event.target.value", event.target.value);
    console.log("event.target.outertext", event.target.outerText);
    setClickedCollection(
      event.target.outerText.substring(0, event.target.outerText.length - 7)
    );
    setVersionOpen(true);
  }

  return (
    <div>
      <div className={classes.root}>
        <Autocomplete
          onChange={(event, newValue) => {
            props.setCollectionSelected(newValue);
          }}
          ChipProps={{ clickable: true, onClick: HandleClickOnChip }}
          multiple
          open={open}
          onOpen={() => {
            setOpen(true);
          }}
          onClose={() => {
            setOpen(false);
          }}
          fullWidth
          getOptionLabel={(option) => option + String(" | v0.1")}
          options={props.CollectionOptions}
          loading={loading}
          disableCloseOnSelect
          renderOption={(option, { selected }) => (
            <React.Fragment>
              {loading ? <CircularProgress color="inherit" size={20} /> : null}
              <Checkbox
                icon={icon}
                checkedIcon={checkedIcon}
                style={{ marginRight: 8 }}
                checked={selected}
              />
              {option}
            </React.Fragment>
          )}
          renderInput={(params) => (
            <TextField
              {...params}
              variant="outlined"
              label="Add Collections in which you want to search from"
              placeholder="Search Collections"
            />
          )}
        />
      </div>
      <Dialog
        disableBackdropClick
        disableEscapeKeyDown
        open={versionOpen}
        onClose={handleVersionClose}
      >
        <DialogTitle>Select Desired Version</DialogTitle>
        <Divider variant="middle" />
        <DialogContent>
          <Typography color="textSecondary">{clickedCollection}</Typography>
          <form className={classes.container}>
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="demo-dialog-native">Version</InputLabel>
              <Select
                autoWidth
                native
                value={age}
                onChange={handleChange}
                input={<Input id="demo-dialog-native" />}
              >
                <option aria-label="None" value="" />
                <option value={10}>v0.1</option>
              </Select>
            </FormControl>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleVersionClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleVersionClose} color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
