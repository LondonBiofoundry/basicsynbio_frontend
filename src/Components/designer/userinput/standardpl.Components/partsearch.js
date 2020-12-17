import React from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import fetch from "cross-fetch";
import CircularProgress from "@material-ui/core/CircularProgress";
import { ApiEndpoint } from "../../../..";

export default function PartSearch(props) {
  const [inputValue, setInputValue] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const loading = open && props.partOptions.length === 0;

  React.useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    (async () => {
      if (props.CollectionSelected.length === 0) {
        setOpen(false);
      }
      const response = await fetch(ApiEndpoint + "collections/data");
      const myresponse = await response.json();
      var mergedArray = [];

      for (const [key, value] of Object.entries(myresponse)) {
        console.log("props", props.CollectionSelected);
        console.log("key", key);
        if (props.CollectionSelected.includes(key)) {
          for (let item of value) {
            item.collection = key;
            mergedArray.push(item);
          }
        }
      }
      if (active) {
        props.setPartOptions(mergedArray);
      }
    })();

    return () => {
      active = false;
    };
  }, [loading, props.CollectionSelected]);

  React.useEffect(() => {
    if (!open) {
      props.setPartOptions([]);
    }
  }, [open]);

  return (
    <Autocomplete
      id="asynchronous-demo"
      style={{ width: "100%" }}
      value={props.value}
      onChange={(event, newValue) => {
        props.onChangeValue(newValue);
      }}
      inputValue={inputValue}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
      }}
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      getOptionSelected={(option, value) => option.id === value.label}
      getOptionLabel={(option) => option.id}
      options={props.partOptions}
      loading={loading}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Select Part"
          variant="outlined"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {loading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            ),
          }}
        />
      )}
    />
  );
}
