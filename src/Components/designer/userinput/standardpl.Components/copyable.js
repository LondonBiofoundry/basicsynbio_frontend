import React from 'react';
import { Droppable, Draggable } from "react-beautiful-dnd";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';  

const useStyles = makeStyles({
    root: {
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
    pos: {
      marginBottom: 12,
    },
  });

export default function Copyable(props) {
    const classes = useStyles();
    return (
        <Droppable droppableId={props.droppableId} isDropDisabled={true}>
        {(provided, snapshot) => (
            <ul ref={provided.innerRef} className={props.className} style={{display:'flex',flexWrap:'wrap'}}>
            {props.items.map((item, index) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                {(provided, snapshot) => (
                    <React.Fragment>
                    <li
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={provided.draggableProps.style}
                        className={snapshot.isDragging ? "dragging" : ""}
                    >
                        <Card className={classes.root}>
                            <CardContent>
                                {item.label}
                            </CardContent>
                        </Card>
                    </li>
                    {snapshot.isDragging && (
                        <li className="react-beatiful-dnd-copy">{item.label}{index}{item.id}</li>
                    )}
                    </React.Fragment>
                )}
                </Draggable>
            ))}
            {provided.placeholder}
            </ul>
        )}
        </Droppable>
    );
}