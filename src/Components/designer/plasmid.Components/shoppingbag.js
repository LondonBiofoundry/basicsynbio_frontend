import React from 'react';
import {Droppable, Draggable } from "react-beautiful-dnd";

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';  
import { Grid, Icon } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import AssignmentIcon from '@material-ui/icons/Assignment';
import CancelIcon from '@material-ui/icons/Cancel';
import InsertPhotoIcon from '@material-ui/icons/InsertPhoto';
import IconButton from '@material-ui/core/IconButton';

const useStyles = makeStyles({
    root: {
      width: 200,
      height: 100,
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
                      style={provided.draggableProps.style}
                    >
                      <Card className={classes.root}>
                      <CardContent>
                      <Grid
                        container
                        direction="row"
                        justify="space-between"
                        alignItems="center"
                      >
                        <Grid item {...provided.dragHandleProps}>
                          <Avatar className={classes.green}>
                            <AssignmentIcon />
                          </Avatar>
                        </Grid>
                        <Grid item>
                          {item.label}
                        </Grid>
                        <Grid item>
                          <Grid
                            container
                            direction="column"
                            justify="center"
                            alignItems="flex-end"
                          >
                            <Grid>
                              <IconButton color="primary">
                                <InsertPhotoIcon color="primary" />
                              </IconButton>
                            </Grid>
                            <Grid item>
                              <IconButton onClick = {() => {props.onShopItemDelete(item.id);}} color="secondary">
                                <CancelIcon color="secondary"/>
                              </IconButton>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
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