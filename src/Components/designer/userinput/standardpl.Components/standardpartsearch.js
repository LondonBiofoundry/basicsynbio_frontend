import React from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
  dragbutton: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
    marginTop: theme.spacing(2),
  },
}));

export default function StandardPartLinkerSearch(props) {
  const classes = useStyles();
  const [inputValue, setInputValue] = React.useState("");

  return (
    <div>
      <br />
      <Autocomplete
        value={props.value}
        onChange={(event, newValue) => {
          //setValue(newValue);
          props.onChangeValue(newValue);
        }}
        inputValue={inputValue}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
        }}
        id="controllable-states-demo"
        options={props.options}
        style={{ width: "100%" }}
        renderInput={(params) => (
          <TextField {...params} label="Controllable" variant="outlined" />
        )}
      />
      <div className={classes.dragbutton}>
        {props.value ? (
          <Grid
            container
            direction="row"
            justify="space-between"
            alignItems="flex-end"
          >
            <Grid item>
              <Button variant="contained" color="secondary">
                {props.value}
              </Button>
            </Grid>
          </Grid>
        ) : (
          <div />
        )}
      </div>
    </div>
  );
}
