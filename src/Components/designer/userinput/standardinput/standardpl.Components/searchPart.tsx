import React, { useContext } from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Context } from "../../../../../App";
import { Collection, BasicPart } from "../../../../../generated-sources";

interface Props {
  value: BasicPart | undefined;
  onChangeValue: React.Dispatch<React.SetStateAction<BasicPart | undefined>>;
  clickedCollections: Collection["name"][];
  partOptions: BasicPart[];
  setPartOptions: React.Dispatch<React.SetStateAction<BasicPart[]>>;
}

export const SearchPart: React.FC<Props> = ({
  value,
  onChangeValue,
  clickedCollections,
  partOptions,
  setPartOptions,
}) => {
  const { names, collections } = useContext(Context);
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
      const collectionsData = collections;
      var mergedArray = [];

      const clickedCollectionsArray = clickedCollections;

      for (let selectedCollection of collectionsData) {
        if (clickedCollectionsArray.includes(selectedCollection.name)) {
          for (let part of selectedCollection.versions[0].parts) {
            mergedArray.push(part);
          }
        }
      }

      if (active) {
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
      onChange={(event: any, newValue: BasicPart | null) => {
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
      getOptionLabel={(option) => option.label ?? ""}
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
