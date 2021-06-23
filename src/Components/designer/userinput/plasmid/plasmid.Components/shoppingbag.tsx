import React from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { makeStyles } from "@material-ui/core/styles";
import CancelIcon from "@material-ui/icons/Cancel";
import InsertPhotoIcon from "@material-ui/icons/InsertPhoto";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import FilterListIcon from "@material-ui/icons/FilterList";
import Divider from "@material-ui/core/Divider";
import { Part } from "../../../../../interfaces/Part";
import { green } from "@material-ui/core/colors";
import Tooltip from "@material-ui/core/Tooltip";
import CustomizedDialogs from "./combinatorialPopup";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    height: "100%",
  },
  partitem: {
    background: "#E5E5E5",
    display: "flex",
    height: "100%",
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
  playIconGreen: {
    height: 30,
    width: 30,
    color: green[500],
  },
  button: {
    padding: "5px",
    paddingTop: "5px",
  },
}));

interface Props {
  COLLECTION: Part[];
  COLLECTION2: Part[];
  items: Part[];
  onShopItemDelete: (itemid: Part["id"]) => void;
  openDialog: (item: Part) => void;
}

export const ShoppingBag: React.FC<Props> = ({
  COLLECTION,
  COLLECTION2,
  items,
  onShopItemDelete,
  openDialog,
}) => {
  const classes = useStyles();
  const [
    combinatorialClickedPart,
    setCombinatorialClickedPart,
  ] = React.useState<Part>({ id: "31321312", label: "unchanged" });

  const [combinatorialOpen, setCombinatorialOpen] = React.useState(false);

  const handleCombinatorialClickOpen = () => {
    setCombinatorialOpen(true);
  };
  const handleCombinatorialClose = () => {
    setCombinatorialOpen(false);
  };

  return (
    <>
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
                      style={
                        item.combinatorial ? { background: green[100] } : {}
                      }
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
                            {item.combinatorial ? "Combinatorial" : item.label}
                          </Typography>
                          <Typography variant="subtitle1" color="textSecondary">
                            {item.combinatorial
                              ? item?.combinatorialParts?.map(
                                  (combItem, index) => (
                                    <div>{combItem.label}</div>
                                  )
                                )
                              : item.collection
                              ? item.collection
                              : "UPLOADED"}
                          </Typography>
                        </CardContent>
                        <Divider variant="middle" />
                        <div className={classes.controls}>
                          <Tooltip title="View Part" aria-label="View-Part">
                            <IconButton
                              onClick={() => {
                                openDialog(item);
                              }}
                              aria-label="view"
                              color="primary"
                            >
                              <InsertPhotoIcon className={classes.playIcon} />
                            </IconButton>
                          </Tooltip>
                          <Tooltip
                            title="Delete Sequence"
                            aria-label="delete-sequence"
                          >
                            <IconButton
                              onClick={() => {
                                onShopItemDelete(item.id);
                              }}
                              aria-label="delete"
                              color="secondary"
                            >
                              <CancelIcon className={classes.playIcon} />
                            </IconButton>
                          </Tooltip>
                          <Tooltip
                            title="Make Combinatorial"
                            aria-label="make-combinatorial"
                          >
                            <IconButton
                              onClick={() => {
                                setCombinatorialClickedPart(item);
                                handleCombinatorialClickOpen();
                              }}
                              aria-label="make-combinatorial"
                              color="secondary"
                            >
                              <FilterListIcon
                                className={classes.playIconGreen}
                              />
                            </IconButton>
                          </Tooltip>
                          <Typography
                            component="h5"
                            variant="h6"
                            color="primary"
                          >
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
      <CustomizedDialogs
        item={combinatorialClickedPart}
        COLLECTION={COLLECTION}
        COLLECTION2={COLLECTION2}
        open={combinatorialOpen}
        handleClose={handleCombinatorialClose}
      />
    </>
  );
};
