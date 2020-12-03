import React from "react";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

export default function MultipleCheck(props) {
  return (
    <FormGroup row>
      <FormControlLabel
        control={
          <Checkbox
            checked={props.multiplePartLinkers}
            onChange={() => {
              props.setMultiplePartLinkers(!props.multiplePartLinkers);
            }}
          />
        }
        label="Does the file contains multiple parts / linkers?"
      />
    </FormGroup>
  );
}