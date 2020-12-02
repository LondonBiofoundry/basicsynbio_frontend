import React from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { makeStyles } from "@material-ui/core/styles";
import Chip from "@material-ui/core/Chip";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: 10,
    display: "flex",
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  myul: {
    "& > *": {
      margin: theme.spacing(0.5),
    },
    display: "flex",
    flexWrap: "wrap",
  },
}));

export default function Copyable(props) {
  const classes = useStyles();

  return (
    <Droppable droppableId={props.droppableId} isDropDisabled={true}>
      {(provided, snapshot) => (
        <ul ref={provided.innerRef} className={classes.myul}>
          {props.items.map((item, index) => (
            <Draggable key={item.id} draggableId={item.id} index={index}>
              {(provided, snapshot) => (
                <React.Fragment>
                  <li
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    //style={provided.draggableProps.style}
                    //className={snapshot.isDragging ? "dragging" : ""}
                  >
                    <Chip
                      className={classes.root}
                      label={item.label}
                      onDelete={() => props.onDeleteStandardPart(item.label)}
                      color="primary"
                    />
                  </li>
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
