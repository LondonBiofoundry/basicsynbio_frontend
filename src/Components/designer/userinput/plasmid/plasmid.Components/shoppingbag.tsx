import React from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { makeStyles } from "@material-ui/core/styles";
import CancelIcon from "@material-ui/icons/Cancel";
import InsertPhotoIcon from "@material-ui/icons/InsertPhoto";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import { Part } from "../../../../../interfaces/Part";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    hieght: "100%",
  },
  partitem: {
    background: "#E5E5E5",
    display: "flex",
    hieght: "100%",
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 12,
  },
  droppableBox: {
    overflow: "auto",
    minHeight: "150px",
    padding: "10px",
    border: "3px dashed #777",
    borderRadius: "10px",
    display: "flex",
    justify: "center",
  },
  details: {
    display: "flex",
    flexDirection: "column",
  },
  content: {
    flex: "1 0 auto",
  },
  cover: {
    width: 130,
  },
  controls: {
    display: "flex",
    alignItems: "center",
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  playIcon: {
    height: 30,
    width: 30,
  },
  button: {
    padding: "5px",
    paddingTop: "5px",
  },
}));

interface Props {
  items: Part[];
  onShopItemDelete: (itemid: Part["id"]) => void;
  openDialog: (item: Part) => void;
}

export const ShoppingBag: React.FC<Props> = ({
  items,
  onShopItemDelete,
  openDialog,
}) => {
  const classes = useStyles();

  return (
    <Droppable droppableId="BAG" direction="horizontal">
      {(provided, snapshot) => (
        <ul ref={provided.innerRef} className={classes.droppableBox}>
          {items.map((item, index) => (
            <Draggable key={item.id} draggableId={item.id} index={index}>
              {(provided, snapshot) => (
                <li
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  style={provided.draggableProps.style}
                >
                  <Card
                    className={
                      item.collection === "BASIC_BIOLEGIO_LINKERS"
                        ? classes.partitem
                        : classes.root
                    }
                  >
                    <div className={classes.details}>
                      <CardContent
                        className={classes.content}
                        {...provided.dragHandleProps}
                      >
                        <Typography component="h5" variant="h6">
                          {item.label}
                        </Typography>
                        <Typography variant="subtitle1" color="textSecondary">
                          {item.collection ? item.collection : "UPLOADED"}
                        </Typography>
                      </CardContent>
                      <Divider variant="middle" />
                      <div className={classes.controls}>
                        <IconButton
                          onClick={() => {
                            openDialog(item);
                          }}
                          aria-label="view"
                          color="primary"
                        >
                          <InsertPhotoIcon className={classes.playIcon} />
                        </IconButton>
                        <IconButton
                          onClick={() => {
                            onShopItemDelete(item.id);
                          }}
                          aria-label="delete"
                          color="secondary"
                        >
                          <CancelIcon className={classes.playIcon} />
                        </IconButton>
                        <Typography component="h5" variant="h6" color="primary">
                          {item.collection === "BASIC_BIOLEGIO_LINKERS" ? (
                            "Linker"
                          ) : (
                            <></>
                          )}
                        </Typography>
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
};
