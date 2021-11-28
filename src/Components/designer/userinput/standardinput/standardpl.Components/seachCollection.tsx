import React, { useContext, useState } from "react";
import {
  Checkbox,
  TextField,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  InputLabel,
  Input,
  FormControl,
  Select,
  Typography,
  CircularProgress,
} from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import { makeStyles } from "@material-ui/core/styles";
import fetch from "cross-fetch";
import { ApiEndpoint } from "../../../../../Api";
import { Collection } from "../../../../../generated-sources";
import { Context } from "../../../../../App";

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

interface Props {
  clickedCollections: Collection["name"][];
  setClickedCollections: React.Dispatch<
    React.SetStateAction<Collection["name"][]>
  >;
  collections: Collection["name"][];
  setCollections: React.Dispatch<React.SetStateAction<Collection["name"][]>>;
}

export const SearchCollection: React.FC<Props> = ({
  clickedCollections,
  setClickedCollections,
  collections,
  setCollections,
}) => {
  const { names } = useContext(Context);
  const classes = useStyles();
  const [open, setOpen] = useState<boolean>(false);
  const loading = open && collections.length === 0;

  //Popup Components
  const [versionOpen, setVersionOpen] = useState<boolean>(false);
  const [age, setAge] = React.useState<string>("");
  const handleChange = (
    event: React.ChangeEvent<{
      name?: string | undefined;
      value: unknown;
    }>
  ) => {
    setAge(String(event.target.value) || "");
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
      if (active) {
        setCollections(names);
      }
    })();
    return () => {
      active = false;
    };
  }, [loading]);

  React.useEffect(() => {
    if (!open) {
      setCollections([]);
    }
  }, [open]);

  function HandleClickOnChip(event: any) {
    setClickedCollections(
      event.target.outerText.substring(0, event.target.outerText.length - 7)
    );
    setVersionOpen(true);
  }

  return (
    <div>
      <div className={classes.root}>
        <Autocomplete
          onChange={(event: any, value: string[]) => {
            setClickedCollections(value);
            console.log(value);
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
          options={collections}
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
          <Typography color="textSecondary">{clickedCollections}</Typography>
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
};
