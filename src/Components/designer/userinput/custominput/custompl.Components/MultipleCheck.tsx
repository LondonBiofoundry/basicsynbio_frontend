import React from "react";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

interface Props {
  multiplePartLinkers: boolean;
  setMultiplePartLinkers: React.Dispatch<React.SetStateAction<boolean>>;
}

export const MultipleCheck: React.FC<Props> = ({
  multiplePartLinkers,
  setMultiplePartLinkers,
}) => {
  return (
    <FormGroup row>
      <FormControlLabel
        control={
          <Checkbox
            checked={multiplePartLinkers}
            onChange={() => {
              setMultiplePartLinkers(!multiplePartLinkers);
            }}
          />
        }
        label="Does the file contains multiple parts / linkers?"
      />
    </FormGroup>
  );
};
