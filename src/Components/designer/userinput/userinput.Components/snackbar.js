import React from "react";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function SnackbarPopups(props) {
  return (
    <Snackbar open={props.open} autoHideDuration={3000}>
      <Alert onClose={props.handleClose} severity="warning">
        Please validate assembly before continuing.
      </Alert>
    </Snackbar>
  );
}
