import React from "react";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

interface Props {
  open: boolean;
  handleClose: () => void;
}

export const SnackbarPopups: React.FC<Props> = ({ open, handleClose }) => {
  return (
    <Snackbar open={open} autoHideDuration={3000}>
      <Alert onClose={handleClose} severity="warning">
        Please validate assembly before continuing.
      </Alert>
    </Snackbar>
  );
};
