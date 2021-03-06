import React from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import fetch from "cross-fetch";
import CircularProgress from "@material-ui/core/CircularProgress";
import { ApiEndpoint } from "../../../../../ApiConnection";
import { Collection } from "../../../../../interfaces/Collection";
import { CollectionData } from "../../../../../interfaces/CollectionData";
import { Part } from "../../../../../interfaces/Part";

interface Props {
  value: Part | undefined;
  onChangeValue: React.Dispatch<React.SetStateAction<Part | undefined>>;
  clickedCollections: Collection[];
  partOptions: Part[];
  setPartOptions: React.Dispatch<React.SetStateAction<Part[]>>;
}

export const SearchPart: React.FC<Props> = ({
  value,
  onChangeValue,
  clickedCollections,
  partOptions,
  setPartOptions,
}) => {
  const [inputValue, setInputValue] = React.useState<string>();
  const [open, setOpen] = React.useState<boolean>(false);
  const loading = open && partOptions.length === 0;

  React.useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }
    (async () => {
      if (clickedCollections.length === 0) {
        setOpen(false);
      }
      const response = await fetch(ApiEndpoint + "collections/data");
      console.log(response);
      const myresponse = await response.json();
      console.log(myresponse);
      const collectionsData: CollectionData[] = myresponse.data;
      console.log(collectionsData);
      var mergedArray = [];

      const clickedCollectionsArray = clickedCollections.map(
        (item) => item.name
      );

      console.log(clickedCollectionsArray);

      for (let selectedCollection of collectionsData) {
        if (clickedCollectionsArray.includes(selectedCollection.name)) {
          for (let part of selectedCollection.parts) {
            console.log(part);
            mergedArray.push(part);
          }
        }
      }
      if (active) {
        console.log(mergedArray);
        setPartOptions(mergedArray);
      }
      return () => {
        active = false;
      };
    })();
  }, [loading, clickedCollections]);

  React.useEffect(() => {
    if (!open) {
      setPartOptions([]);
    }
  }, [open, setPartOptions]);

  return (
    <Autocomplete
      id="asynchronous-demo"
      style={{ width: "100%" }}
      value={value}
      onChange={(event: any, newValue: Part | null) => {
        if (newValue !== null) {
          onChangeValue(newValue);
        }
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
      getOptionSelected={(option, value) => value.label === option.label}
      getOptionLabel={(option) => option.label}
      options={partOptions}
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
};
