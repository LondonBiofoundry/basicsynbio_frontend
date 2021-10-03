import React from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Chip from "@material-ui/core/Chip";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
import { Part } from "../../../../../interfaces/Part";
import { BasicPart } from "../../../../../generated-sources";

const HtmlTooltip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: "#333333",
    color: "#f2f2f2",
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(12),
    border: "1px solid #dadde9",
  },
}))(Tooltip);

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

interface Props {
  droppableId: string;
  standardCollection: BasicPart[];
  onDeleteStandardPart: (partlabel: BasicPart["label"]) => void;
}

export const Copyable: React.FC<Props> = ({
  droppableId,
  standardCollection,
  onDeleteStandardPart,
}) => {
  const classes = useStyles();

  return (
    <Droppable droppableId={droppableId} isDropDisabled={true}>
      {(provided, snapshot) => (
        <ul ref={provided.innerRef} className={classes.myul}>
          {standardCollection !== undefined ? (
            standardCollection.map((item, index) => (
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
                      <HtmlTooltip
                        title={
                          <React.Fragment>
                            <Typography variant="body1" color="inherit">
                              Part Description:
                            </Typography>
                            <Typography variant="body2" color="inherit">
                              {item.description}
                            </Typography>
                          </React.Fragment>
                        }
                      >
                        <Chip
                          className={classes.root}
                          label={item.label}
                          onDelete={() => onDeleteStandardPart(item.label)}
                          color={
                            item.collection === "BASIC_BIOLEGIO_LINKERS"
                              ? "secondary"
                              : "primary"
                          }
                        />
                      </HtmlTooltip>
                    </li>
                  </React.Fragment>
                )}
              </Draggable>
            ))
          ) : (
            <></>
          )}
          {provided.placeholder}
        </ul>
      )}
    </Droppable>
  );
};
