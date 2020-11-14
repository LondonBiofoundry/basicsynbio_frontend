import React from 'react';
import {Droppable, Draggable } from "react-beautiful-dnd";

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';  

const useStyles = makeStyles({
    root: {
      width: 200,
      padding:10,
      display: 'flex',
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      fontSize: 14,
    },
    droppableBox: {
      minHeight: '40px',
      padding: '10px',
      border: '3px dashed #777',
      borderRadius: '10px',
      display:'flex',
      justify:"center"
    },
  });

export default function ShoppingBag(props) {
    const classes = useStyles();

    return (
        <Droppable droppableId="BAG" direction='horizontal'>
          {(provided, snapshot) => (
            <ul ref={provided.innerRef} className={classes.droppableBox}>
              {props.items.map((item, index) => (
                <Draggable key={item.id} draggableId={item.id} index={index} className={classes.root}>
                  {(provided, snapshot) => (
                    <li
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={provided.draggableProps.style}
                    >
                      <Card className={classes.root}>
                        <CardContent>
                        {item.label}
                        </CardContent>
                      </Card>
                    </li>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
    );
}