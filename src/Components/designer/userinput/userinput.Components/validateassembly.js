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
import { ApiEndpoint } from "../../../..";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ValidateAssembly(props) {
  const [validation, setValidation] = useState("");

  React.useEffect(() => {
    let active = true;
    (async () => {
      const response = await fetch(ApiEndpoint + "validate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(props.shoppingBagItems),
      });
      const myresponse = await response.json();
      if (
        String(myresponse.result) === "success" &&
        props.validated !== "success"
      ) {
        setValidation(String(myresponse.result));
        props.setValidated(true);
      } else {
        setValidation(String(myresponse.error));
        props.setValidated(false);
      }
    })();

    return () => {
      active = false;
    };
  }, [props.open]);

  function FailSuccess() {
    return validation === "success" ? (
      <SuccessAnimation open={props.open} />
    ) : (
      <FailAnimation open={props.open} />
    );
  }

  return (
    <>
      <Dialog
        open={props.open}
        TransitionComponent={Transition}
        keepMounted
        onClose={props.handleClose}
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
          <Button onClick={props.handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
