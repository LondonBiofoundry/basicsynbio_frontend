import React from "react";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";
import { Popups } from "../../../../interfaces/Popups";

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

interface Props {
  openPopups: Popups;
  setOpenPopups: React.Dispatch<React.SetStateAction<Popups>>;
}

export const SnackbarPopups: React.FC<Props> = ({
  openPopups,
  setOpenPopups,
}) => {
  return (
    <Snackbar open={openPopups.pleaseValidateMessage} autoHideDuration={3000}>
      <Alert
        onClose={() =>
          setOpenPopups((C) => ({ ...C, pleaseValidateMessage: false }))
        }
        severity="warning"
      >
        Please validate assembly before continuing.
      </Alert>
    </Snackbar>
  );
};
