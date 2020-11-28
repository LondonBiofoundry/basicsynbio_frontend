import React from 'react';
import {Droppable, Draggable } from "react-beautiful-dnd";

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';  
import CancelIcon from '@material-ui/icons/Cancel';
import InsertPhotoIcon from '@material-ui/icons/InsertPhoto';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import VisibilityIcon from '@material-ui/icons/Visibility';
import { CardActionArea } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      hieght:'100%'
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      fontSize: 12,
    },
    droppableBox: {
      minHeight: '40px',
      padding: '10px',
      border: '3px dashed #777',
      borderRadius: '10px',
      display:'flex',
      justify:"center"
    },
    details: {
      display: 'flex',
      flexDirection: 'column',
    },
    content: {
      flex: '1 0 auto',
    },
    cover: {
      width: 130,
    },
    controls: {
      display: 'flex',
      alignItems: 'center',
      paddingLeft: theme.spacing(1),
      paddingBottom: theme.spacing(1),
    },
    playIcon: {
      height: 30,
      width: 30,
    },
    button: {
      padding:'5px',
      paddingTop:'5px'
    }
  }))

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
                        <div className={classes.details}>
                          <CardContent className={classes.content} {...provided.dragHandleProps}>
                            <Typography component="h5" variant="h6">
                              {item.label}
                            </Typography>
                            <Typography variant="subtitle1" color="textSecondary">
                              {item.collection?item.collection:'UPLOADED'}
                            </Typography>
                          </CardContent>
                          <Divider variant='middle'/>
                          <div className={classes.controls}>
                            <IconButton onClick={() => {props.openDialog(item.id,item.label,item.seq,item.collection)}} aria-label="view" color='primary'>
                              <InsertPhotoIcon className={classes.playIcon}/>
                            </IconButton>
                            <IconButton onClick={() => {props.onShopItemDelete(item.id)}} aria-label="delete" color='secondary'>
                              <CancelIcon className={classes.playIcon}/>
                            </IconButton>
                          </div>
                        </div>
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