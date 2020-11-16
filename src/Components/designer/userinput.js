import { Grid } from '@material-ui/core';
import React, {useState, useEffect} from 'react';
import { v4 as uuid } from "uuid";
import { DragDropContext} from "react-beautiful-dnd";

import StandardPartLinker from './standardpl';
import CustomPartLinker from './custompl';
import Plasmid from './plasmid';

import "./styles.css";
//import ShoppingBag from './plasmid.Components/shoppingbag';


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

const options = ['Option 1', 'Option 2'];


export default function UserInput() {
  const [value, setValue] = React.useState(options[0]);

  const [shoppingBagItems, setShoppingBagItems] = React.useState([]);
  const [COLLECTION,setCOLLECTION] = useState([
    { id: uuid(), label: "Promoter1" },
  ]);

  const [COLLECTION2] = useState([
    { id: uuid(), label: "genbank1" },
    { id: uuid(), label: "sbol1" },
    { id: uuid(), label: "fasta1" }
  ]);

  const valueHandleChange = (newValue) => {
    let filteredArray = COLLECTION.filter(item => item.label !== value)
    setCOLLECTION(filteredArray);
    setValue(newValue);    
  };

  useEffect(() => {
    // Update the document title using the browser API
    setCOLLECTION(state => [
        ...COLLECTION,
        { id: uuid(), label: value}
      ])
      console.log({ id: uuid(), label: value})
      console.log(COLLECTION)
  },[value]);

  const onShopItemDelete = (itemid) => {
    console.log(itemid)
    let filteredArray = shoppingBagItems.filter(item => item.id !== itemid)
    console.log('filter',filteredArray)
    setShoppingBagItems(filteredArray);
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
          break;
        case "SHOP":
          setShoppingBagItems(state =>
            copy(COLLECTION, state, source, destination)
          );
          break;
        case "SHOP2":
          setShoppingBagItems(state =>
            copy(COLLECTION2, state, source, destination)
          );
        break;
        default:
          break;
      }
    },
    [setShoppingBagItems,COLLECTION,COLLECTION2,shoppingBagItems]
  );

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div style={{ padding: 20 }}>
        <Grid
          container
          direction="row"
          //justify="center"
          alignItems="stretch"
          spacing={3}
          padding="40px"
        >
          <Grid item xs={12} md={6}>
            <StandardPartLinker 
              items={COLLECTION}
              value={value}
              onChangeValue={valueHandleChange}
              options={options}/>
          </Grid>
          <Grid item xs={12} md={6}>
            <CustomPartLinker items={COLLECTION2}/>
          </Grid>
          <Grid item xs={12}>
            <Plasmid 
            items={shoppingBagItems}
            onShopItemDelete={onShopItemDelete}/>
          </Grid>
        </Grid>
      </div>
    </DragDropContext>
  );
}