import { Grid } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { v4 as uuid } from "uuid";
import { DragDropContext } from "react-beautiful-dnd";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import BuildRoundedIcon from "@material-ui/icons/BuildRounded";
import VisibilityRoundedIcon from "@material-ui/icons/VisibilityRounded";
import DoneAllRoundedIcon from "@material-ui/icons/DoneAllRounded";
import { green } from "@material-ui/core/colors";
import { makeStyles } from "@material-ui/core/styles";
import { CustomPartLinker } from "./custominput/custominput";
import { Plasmid } from "./plasmid/plasmid";
import { ViewBuild } from "./userinputUtils/viewbuild";
import { ValidateAssembly } from "./userinputUtils/validateassembly";
import { SnackbarPopups } from "./userinputUtils/snackbar";
import { VisualiseAssembly } from "./userinputUtils/visualiseAssembly";

import "./styles.css";
import { StandardInput } from "./standardinput/standardinput";
import { Popups } from "../../../interfaces/Popups";
import {
  BasicPart,
  BasicAssembly,
  BasicPartType,
} from "../../../generated-sources";

const useStyles = makeStyles((theme) => ({
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
  FAB: {
    position: "fixed",
    bottom: theme.spacing(2),
    left: theme.spacing(2),
  },
  FABitem: {
    marginRight: theme.spacing(1),
  },
  FABitemgreen: {
    marginRight: theme.spacing(1),
    color: theme.palette.common.white,
    backgroundColor: green[500],
    "&:hover": {
      backgroundColor: green[600],
    },
  },
}));

const reorder = (list: BasicPart[], startIndex: number, endIndex: number) => {
  const [removed] = list.splice(startIndex, 1);
  list.splice(endIndex, 0, removed);
  return list;
};

const copy = (
  source: any,
  destination: any,
  droppableSource: any,
  droppableDestination: any
) => {
  const item = source[droppableSource.index];
  destination.splice(droppableDestination.index, 0, { ...item, id: uuid() });
  return destination;
};

const expand_first_combinatorial = (input_lists: BasicPart[][]) => {
  const expanded_assemblies: BasicPart[][] = [];
  input_lists.forEach((input_list) => {
    const combinatorialFirstItem = input_list.filter(
      (item) => item.combinatorial == true
    )[0];
    const combinatorialItemIndex = input_list.indexOf(combinatorialFirstItem);
    combinatorialFirstItem.combinatorialParts?.forEach((element: any) => {
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

const check_list_contains_conbinatorial = (input_lists: BasicPart[][]) => {
  const mylist = input_lists[0].filter((item) => item.combinatorial === true);
  if (mylist.length >= 1) {
    return true;
  } else {
    return false;
  }
};

interface Props {
  currentBuild: BasicAssembly[];
  setCurrentBuild: React.Dispatch<React.SetStateAction<BasicAssembly[]>>;
}

export const UserInput: React.FC<Props> = ({
  currentBuild,
  setCurrentBuild,
}) => {
  const classes = useStyles();
  //Used to add Parts to Collection Shops
  const [value, setValue] = useState<BasicPart | undefined>();
  const [uploadedFile, setUploadedFile] = useState<BasicPart>();
  // Used to track Assembly Information
  const [assemblyID, setAssemblyID] = useState<string>("");
  // Contains Information Abou the 3 shopping bags on screen
  const [COLLECTION, setCOLLECTION] = useState<BasicPart[]>([]);
  const [COLLECTION2, setCOLLECTION2] = useState<BasicPart[]>([]);
  const [shoppingBagItems, setShoppingBagItems] = useState<BasicPart[]>([]);
  //Validate Assembly Function
  const [validated, setValidated] = useState<boolean>(false);
  //AssemblyInputBoxed
  const [assemblyName, setAssemblyName] = useState<string>("");
  const [assemblyDesc, setAssemblyDesc] = useState<string>("");
  //HandlePopups
  const [openPopups, setOpenPopups] = useState<Popups>({
    viewAssembly: false,
    viewBuild: false,
    validationAssembly: false,
    pleaseValidateMessage: false,
  });

  const onDeleteStandardPart = (partlabel: BasicPart["label"]) => {
    if (partlabel !== null) {
      let filteredArray = COLLECTION.filter((item) => item.label !== partlabel);
      setCOLLECTION(filteredArray);
    }
  };

  const onDeleteCustomPart = (partlabel: BasicPart["label"]) => {
    if (partlabel !== null) {
      let filteredArray = COLLECTION2.filter(
        (item) => item.label !== partlabel
      );
      setCOLLECTION2(filteredArray);
    }
  };

  useEffect(() => {
    if (value?.label !== undefined) {
      setCOLLECTION((C: BasicPart[]) => [...C, value]);
    }
  }, [setValue, value]);

  useEffect(() => {
    if (uploadedFile?.label !== undefined) {
      if (!COLLECTION2.map((item) => item.label).includes(uploadedFile.label)) {
        setCOLLECTION2((C) => [...C, uploadedFile]);
      } else {
        alert(
          "Unable to add part, a part with the same name has already been uploaded, try renaming your file and uploading again"
        );
      }
    }
  }, [uploadedFile]);

  const onShopItemDelete = (itemid: BasicPart["id"]) => {
    let filteredArray = shoppingBagItems.filter((item) => item.id !== itemid);
    setShoppingBagItems(filteredArray);
    setValidated(false);
  };

  const onAddToBuild = () => {
    if (
      shoppingBagItems.filter((item) => item.combinatorial == true).length === 0
    ) {
      const currentAssembly: BasicAssembly = {
        id: uuid(),
        parts: shoppingBagItems,
        name: assemblyName,
        description: assemblyDesc,
      };
      setCurrentBuild((C) => [...C, currentAssembly]);
      setAssemblyDesc("");
      setAssemblyName("");
      setShoppingBagItems([]);
      setValidated(false);
    }
    if (
      shoppingBagItems.filter((item) => item.combinatorial == true).length === 1
    ) {
      const combinatorialItem = shoppingBagItems.filter(
        (item) => item.combinatorial == true
      )[0];
      const combinatorialItemIndex = shoppingBagItems.indexOf(
        combinatorialItem
      );
      console.log(combinatorialItemIndex);
      const new_assemblies: BasicPart[][] = [];
      const old_shopping: BasicPart[] = shoppingBagItems;
      shoppingBagItems.map((item, index) => {
        if (item.combinatorial) {
          item.combinatorialParts?.forEach((element: any) => {
            var smaller_list = shoppingBagItems.filter((part) => part != item);
            smaller_list.splice(index, 0, element);
            console.log(smaller_list);
            new_assemblies.push(smaller_list);
          });
        }
      });
      new_assemblies.forEach((element) => {
        const currentAssembly: BasicAssembly = {
          id: uuid(),
          parts: element,
          name: assemblyName,
          description: assemblyDesc,
        };
        setCurrentBuild((C) => [...C, currentAssembly]);
      });
      setAssemblyDesc("");
      setAssemblyName("");
      setShoppingBagItems([]);
      setValidated(false);
    }
    if (
      shoppingBagItems.filter((item) => item.combinatorial == true).length > 1
    ) {
      var expanded_result: BasicPart[][] = expand_first_combinatorial([
        shoppingBagItems,
      ]);
      while (check_list_contains_conbinatorial(expanded_result)) {
        expanded_result = expand_first_combinatorial(expanded_result);
      }
      expanded_result.forEach((element) => {
        const currentAssembly: BasicAssembly = {
          id: uuid(),
          parts: element,
          name: assemblyName,
          description: assemblyDesc,
        };
        setCurrentBuild((C) => [...C, currentAssembly]);
      });
      setAssemblyDesc("");
      setAssemblyName("");
      setShoppingBagItems([]);
      setValidated(false);
    }
  };

  const onDragEnd = React.useCallback(
    (result) => {
      const { source, destination } = result;

      if (!destination) {
        return;
      }

      switch (source.droppableId) {
        case destination.droppableId:
          setShoppingBagItems((state) =>
            reorder(state, source.index, destination.index)
          );
          setValidated(false);
          break;
        case "SHOP":
          setShoppingBagItems((state) =>
            copy(COLLECTION, state, source, destination)
          );
          setValidated(false);
          break;
        case "SHOP2":
          setShoppingBagItems((state) =>
            copy(COLLECTION2, state, source, destination)
          );
          setValidated(false);
          break;
        default:
          break;
      }
    },
    [setShoppingBagItems, COLLECTION, COLLECTION2]
  );

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div style={{ padding: 20 }}>
        <Grid container direction="row" alignItems="stretch" spacing={3}>
          <Grid item xs={12} md={6}>
            <StandardInput
              standardCollection={COLLECTION}
              value={value}
              onChangeValue={setValue}
              onDeleteStandardPart={onDeleteStandardPart}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <CustomPartLinker
              items={COLLECTION2}
              setUploadedFile={setUploadedFile}
              onDeleteCustomPart={onDeleteCustomPart}
            />
          </Grid>
          <Grid item xs={12}>
            <Plasmid
              COLLECTION={COLLECTION}
              COLLECTION2={COLLECTION2}
              assemblyName={assemblyName}
              assemblyDesc={assemblyDesc}
              setAssemblyDesc={setAssemblyDesc}
              setAssemblyName={setAssemblyName}
              validated={validated}
              assemblyID={assemblyID}
              setAssemblyID={setAssemblyID}
              items={shoppingBagItems}
              onShopItemDelete={onShopItemDelete}
            />
          </Grid>
        </Grid>
        <Grid
          container
          direction="row"
          justify="space-between"
          alignItems="center"
          spacing={3}
        >
          <Grid item>
            <div className={classes.FAB}>
              <Fab
                onClick={
                  validated
                    ? () => setOpenPopups((C) => ({ ...C, viewAssembly: true }))
                    : () =>
                        setOpenPopups((C) => ({
                          ...C,
                          pleaseValidateMessage: true,
                        }))
                }
                className={classes.FABitem}
                variant="extended"
                color="primary"
                aria-label="visualise"
              >
                <VisibilityRoundedIcon className={classes.extendedIcon} />
                Visualise
              </Fab>
              <Fab
                onClick={() =>
                  setOpenPopups((C) => ({ ...C, validationAssembly: true }))
                }
                className={classes.FABitemgreen}
                variant="extended"
                aria-label="Validate"
              >
                <DoneAllRoundedIcon className={classes.extendedIcon} />
                Validate
              </Fab>
              <Fab
                onClick={() =>
                  setOpenPopups((C) => ({ ...C, viewBuild: true }))
                }
                className={classes.FABitem}
                variant="extended"
                color="secondary"
              >
                <BuildRoundedIcon className={classes.extendedIcon} />
                View Current Build
              </Fab>
              <ViewBuild
                rows={currentBuild}
                openPopups={openPopups}
                setOpenPopups={setOpenPopups}
              />
              <Fab
                onClick={
                  validated
                    ? onAddToBuild
                    : () =>
                        setOpenPopups((C) => ({
                          ...C,
                          pleaseValidateMessage: true,
                        }))
                }
                className={classes.FABitem}
                variant="extended"
                color="secondary"
                aria-label="add"
              >
                <AddIcon className={classes.extendedIcon} />
                Add to Build
              </Fab>
            </div>
          </Grid>
        </Grid>
        <ValidateAssembly
          setValidated={setValidated}
          shoppingBagItems={shoppingBagItems}
          openPopups={openPopups}
          setOpenPopups={setOpenPopups}
        />
        <SnackbarPopups openPopups={openPopups} setOpenPopups={setOpenPopups} />
        <VisualiseAssembly
          shoppingBagItems={shoppingBagItems}
          openPopups={openPopups}
          setOpenPopups={setOpenPopups}
        />
      </div>
    </DragDropContext>
  );
};
