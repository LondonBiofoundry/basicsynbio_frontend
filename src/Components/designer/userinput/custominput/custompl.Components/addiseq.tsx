import React from "react";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

interface Props {
  addiseq: boolean;
  setAddiseq: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AddISeq: React.FC<Props> = ({ addiseq, setAddiseq }) => {
  return (
    <FormGroup row>
      <FormControlLabel
        control={
          <Checkbox
            checked={addiseq}
            onChange={() => {
              setAddiseq(!addiseq);
            }}
          />
        }
        label="Add I_S and I_P sequence to part?"
      />
    </FormGroup>
  );
};
