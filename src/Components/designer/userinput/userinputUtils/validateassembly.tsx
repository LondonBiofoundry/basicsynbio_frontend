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
import { Popups } from "../../../../interfaces/Popups";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface Props {
  setValidated: React.Dispatch<React.SetStateAction<boolean>>;
  shoppingBagItems: Part[];
  openPopups: Popups;
  setOpenPopups: React.Dispatch<React.SetStateAction<Popups>>;
}

export const ValidateAssembly: React.FC<Props> = ({
  setValidated,
  shoppingBagItems,
  openPopups,
  setOpenPopups,
}) => {
  const [validation, setValidation] = useState("");

  const expand_first_combinatorial = (input_lists: Part[][]) => {
    const expanded_assemblies: Part[][] = [];
    input_lists.forEach((input_list) => {
      const combinatorialFirstItem = input_list.filter(
        (item) => item.combinatorial == true
      )[0];
      const combinatorialItemIndex = input_list.indexOf(combinatorialFirstItem);
      combinatorialFirstItem.combinatorialParts?.forEach((element) => {
        var smaller_list = input_list.filter(
          (part) => part != combinatorialFirstItem
        );
        smaller_list.splice(combinatorialItemIndex, 0, element);
        console.log(smaller_list);
        expanded_assemblies.push(smaller_list);
      });
    });
    return expanded_assemblies;
  };

  const check_list_contains_conbinatorial = (input_lists: Part[][]) => {
    const mylist = input_lists[0].filter((item) => item.combinatorial === true);
    if (mylist.length >= 1) {
      return true;
    } else {
      return false;
    }
  };

  React.useEffect(() => {
    let active = true;
    console.log(shoppingBagItems);
    if (
      shoppingBagItems.filter((item) => item.combinatorial == true).length === 1
    ) {
      console.log("only 1 combinatorial");
      const combinatorialItem = shoppingBagItems.filter(
        (item) => item.combinatorial == true
      )[0];
      const combinatorialItemIndex = shoppingBagItems.indexOf(
        combinatorialItem
      );
      console.log(combinatorialItemIndex);
      const new_assemblies: Part[][] = [];
      const old_shopping: Part[] = shoppingBagItems;
      shoppingBagItems.map((item, index) => {
        if (item.combinatorial) {
          item.combinatorialParts?.forEach((element) => {
            var smaller_list = shoppingBagItems.filter((part) => part != item);
            smaller_list.splice(index, 0, element);
            console.log(smaller_list);
            new_assemblies.push(smaller_list);
          });
        }
      });
      console.log(new_assemblies);
      const my_validation_results: Boolean[] = [];
      const my_errors: String[] = [];

      new_assemblies.forEach((element) => {
        (async () => {
          const response = await fetch(ApiEndpoint + "validate", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(element),
          });
          const myresponse = await response.json();
          if (String(myresponse.result) === "success") {
            my_validation_results.push(true);
          } else {
            my_validation_results.push(false);
            my_errors.push(
              String(myresponse.error) +
                " ON COMBINATORIAL ASSEMBLY ->" +
                String(element.map((thing) => thing.label))
            );
          }
        })().then(() => {
          if (my_validation_results.includes(false)) {
            setValidated(false);
            setValidation(String(my_errors));
            console.log(my_errors);
          } else {
            setValidated(true);
            setValidation("success");
          }
        });
      });
    }
    if (
      shoppingBagItems.filter((item) => item.combinatorial == true).length === 0
    ) {
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
    }
    if (
      shoppingBagItems.filter((item) => item.combinatorial == true).length > 1
    ) {
      console.log("more than 1 combinatorial");
      //////
      console.log("using_my_function");
      var expanded_result: Part[][] = expand_first_combinatorial([
        shoppingBagItems,
      ]);
      while (check_list_contains_conbinatorial(expanded_result)) {
        expanded_result = expand_first_combinatorial(expanded_result);
      }
      console.log("final result");
      console.log(expanded_result);
      const my_validation_results: Boolean[] = [];
      const my_errors: String[] = [];

      expanded_result.forEach((element) => {
        (async () => {
          const response = await fetch(ApiEndpoint + "validate", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(element),
          });
          const myresponse = await response.json();
          if (String(myresponse.result) === "success") {
            my_validation_results.push(true);
          } else {
            my_validation_results.push(false);
            my_errors.push(
              String(myresponse.error) +
                " ON COMBINATORIAL ASSEMBLY ->" +
                String(element.map((thing) => thing.label))
            );
          }
        })().then(() => {
          if (my_validation_results.includes(false)) {
            setValidated(false);
            setValidation(String(my_errors));
            console.log(my_errors);
          } else {
            setValidated(true);
            setValidation("success");
          }
        });
      });
    }

    return () => {
      active = false;
    };
  }, [openPopups.validationAssembly]);

  function FailSuccess() {
    return validation === "success" ? <SuccessAnimation /> : <FailAnimation />;
  }

  return (
    <>
      <Dialog
        open={openPopups.validationAssembly}
        TransitionComponent={Transition}
        keepMounted
        onClose={() =>
          setOpenPopups((C) => ({ ...C, validationAssembly: false }))
        }
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
          <Button
            onClick={() =>
              setOpenPopups((C) => ({ ...C, validationAssembly: false }))
            }
            color="primary"
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
