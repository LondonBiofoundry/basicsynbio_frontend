import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";

import SuccessAnimation from "./successlottly";
import FailAnimation from "./faillottly";
import { ApiEndpoint } from "../../../../ApiConnection";
import { TransitionProps } from "@material-ui/core/transitions";
import { Part } from "../../../../interfaces/Part";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface Props {
  setValidated: React.Dispatch<React.SetStateAction<boolean>>;
  shoppingBagItems: Part[];
  open: boolean;
  handleClose: () => void;
}

export const ValidateAssembly: React.FC<Props> = ({
  setValidated,
  shoppingBagItems,
  open,
  handleClose,
}) => {
  const [validation, setValidation] = useState("");

  React.useEffect(() => {
    let active = true;
    (async () => {
      const response = await fetch(ApiEndpoint + "validate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(shoppingBagItems),
      });
      const myresponse = await response.json();
      if (String(myresponse.result) === "success") {
        setValidation(String(myresponse.result));
        setValidated(true);
      } else {
        setValidation(String(myresponse.error));
        setValidated(false);
      }
    })();

    return () => {
      active = false;
    };
  }, [open]);

  function FailSuccess() {
    return validation === "success" ? <SuccessAnimation /> : <FailAnimation />;
  }

  return (
    <>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle
          id="alert-dialog-slide-title"
          style={{ textAlign: "center" }}
        >
          Validation
        </DialogTitle>
        <Divider />
        <DialogContent>
          <Grid
            container
            direction="row"
            justify="space-around"
            alignItems="center"
            spacing={2}
          >
            <Grid item>
              <FailSuccess />
            </Grid>
            <Grid item>
              <DialogContentText id="alert-dialog-slide-description">
                Result of Validation: {validation}
              </DialogContentText>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
