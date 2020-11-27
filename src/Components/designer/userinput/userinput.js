import { Grid } from '@material-ui/core';
import React, {useState, useEffect} from 'react';
import { v4 as uuid } from "uuid";
import { DragDropContext} from "react-beautiful-dnd";
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import BuildRoundedIcon from '@material-ui/icons/BuildRounded';
import VisibilityRoundedIcon from '@material-ui/icons/VisibilityRounded';
import DoneAllRoundedIcon from '@material-ui/icons/DoneAllRounded';
import { green } from '@material-ui/core/colors';
import { orange } from '@material-ui/core/colors';
import { brown } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/core/styles';

import StandardPartLinker from './standardpl';
import CustomPartLinker from './custompl';
import Plasmid from './plasmid';
import ViewBuild from './userinput.Components/viewbuild';
import ValidateAssembly from './userinput.Components/validateassembly';
import SnackbarPopups from './userinput.Components/snackbar';

import "./styles.css";

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  backButton: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
  FAB: {
    position: 'fixed',
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
    '&:hover': {
      backgroundColor: green[600],
    },
  },
  FABitemorange: {
    marginRight: theme.spacing(1),
    color: theme.palette.common.white,
    backgroundColor: brown[900],
    '&:hover': {
      backgroundColor: orange[600],
    },
  }
}));

const reorder = (list, startIndex, endIndex) => {
  const [removed] = list.splice(startIndex, 1);
  list.splice(endIndex, 0, removed);
  return list;
};

const copy = (source, destination, droppableSource, droppableDestination) => {
  const item = source[droppableSource.index];
  destination.splice(droppableDestination.index, 0, { ...item, id: uuid() });
  return destination;
};

export default function UserInput(props) {
  const classes = useStyles();
  const [assemblyID,setAssemblyID] = useState('')
  const [value, setValue] = useState({id:'',seq:''});
  const [uploadedFile, setUploadedFile] = useState('');
  const [shoppingBagItems, setShoppingBagItems] = useState([]);
  //const [currentBuild,setCurrentBuild] = useState([]);
  const [COLLECTION,setCOLLECTION] = useState([]);
  const [COLLECTION2,setCOLLECTION2] = useState([
    { id: uuid(), label: "genbank1", seq:'A'},
  ]);

  //View Build Functions
  const [open, setOpen] = useState(false);
  //Validate Assembly Function
  const [validated, setValidated]=useState(false)
  const [openValidation, setOpenValidation] = useState(false);
  const [openValidationMessage,setOpenValidationMessage] = useState(false);

  const handleClickOpenValidation = () => {
    setOpenValidation(true);
  };

  const handleCloseValidation = () => {
    setOpenValidation(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const OpenValidationMessage = () => {
    console.log('validated',validated)
    setOpenValidationMessage(true);
    console.log('openmessage',openValidationMessage)
  }

  const handleCloseValidationMessage = () => {
    setOpenValidationMessage(false);
  }

  const valueHandleChange = (newValue) => {
    if(newValue!==null){
      let filteredArray = COLLECTION.filter(item => item.label !== value.id)
      setCOLLECTION(filteredArray);
      setValue(newValue);  
    }  
  };

  useEffect(() => {
    // Update the document title using the browser API
    if(value!==null && value.id!=='' ){
      setCOLLECTION(C => [
        ...C,
        { id: uuid(), label: value.id, seq: value.seq, collection: value.collection}
      ])
      console.log(value)
    }
  },[setValue,value]);

  useEffect(() => {
    // Update the document title using the browser API
    if (!(uploadedFile)) {return}
    setCOLLECTION2(C => [
        ...C,
        { id: uuid(), label: uploadedFile}
      ])
  },[uploadedFile]);

  const onShopItemDelete = (itemid) => {
    let filteredArray = shoppingBagItems.filter(item => item.id !== itemid)
    setShoppingBagItems(filteredArray);
    setValidated(false)
  }

  const onAddToBuild = () => {
    console.log('validated',validated)
    if (assemblyID!==''){
      props.setCurrentBuild(C => [
        ...C,
        {id: assemblyID, buildItems:shoppingBagItems}
      ])
      setAssemblyID('')
    } else {
      props.setCurrentBuild(C => [
        ...C,
        {id: uuid(), buildItems:shoppingBagItems}
      ])
    }
    setShoppingBagItems([])
    setValidated(false)
  }

  const onDragEnd = React.useCallback(
    result => {
      const { source, destination } = result;

      if (!destination) {
        return;
      }

      switch (source.droppableId) {
        case destination.droppableId:
          setShoppingBagItems(state =>
            reorder(state, source.index, destination.index)
          );
          setValidated(false)
          break;
        case "SHOP":
          setShoppingBagItems(state =>
            copy(COLLECTION, state, source, destination)
          );
          setValidated(false)
          break;
        case "SHOP2":
          setShoppingBagItems(state =>
            copy(COLLECTION2, state, source, destination)
          );
          setValidated(false)
        break;
        default:
          break;
      }
    },
    [setShoppingBagItems,COLLECTION,COLLECTION2]
  );

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div style={{ padding: 20 }}>
        <Grid
          container
          direction="row"
          alignItems="stretch"
          spacing={3}
          padding="40px"
        >
          <Grid item xs={12} md={6}>
            <StandardPartLinker 
              items={COLLECTION}
              value={value}
              onChangeValue={valueHandleChange} />
          </Grid>
          <Grid item xs={12} md={6}>
            <CustomPartLinker 
            items={COLLECTION2}
            setUploadedFile={setUploadedFile}/>
          </Grid>
          <Grid item xs={12}>
            <Plasmid
            validated={validated}
            assemblyID={assemblyID}
            setAssemblyID={setAssemblyID}
            items={shoppingBagItems}
            onShopItemDelete={onShopItemDelete}/>
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
              <Fab className={classes.FABitem} variant="extended" color="primary" aria-label="visualise">
                <VisibilityRoundedIcon className={classes.extendedIcon}/>
                Visualise
              </Fab>
              <Fab 
              onClick={handleClickOpenValidation}
              className={classes.FABitemgreen} 
              variant="extended" 
              aria-label="Validate">
                <DoneAllRoundedIcon className={classes.extendedIcon}/>
                Validate
              </Fab>
              <Fab 
              onClick={handleClickOpen}
              className={classes.FABitem} 
              variant="extended" 
              color="secondary">
                <BuildRoundedIcon className={classes.extendedIcon} />
                View Current Build
              </Fab>
              <ViewBuild
              rows={props.currentBuild}
              open={open}
              handleClose={handleClose}/>
              <Fab
              onClick={validated?onAddToBuild:OpenValidationMessage}
              className={classes.FABitem} 
              variant="extended" 
              color="secondary" 
              aria-label="add">
                <AddIcon className={classes.extendedIcon}/>
                Add to Build
              </Fab>
            </div>
          </Grid>
        </Grid>
        <ValidateAssembly
        setValidated={setValidated}
        shoppingBagItems={shoppingBagItems}
        open={openValidation}
        handleClose={handleCloseValidation}/>
        <SnackbarPopups
        open={openValidationMessage}
        handleClose={handleCloseValidationMessage}/>
      </div>
    </DragDropContext>
  );
}