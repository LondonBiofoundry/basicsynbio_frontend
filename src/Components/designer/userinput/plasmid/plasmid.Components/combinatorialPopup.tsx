import React from "react";
import {
  createStyles,
  Theme,
  withStyles,
  WithStyles,
} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import Switch from "@material-ui/core/Switch";
import WifiIcon from "@material-ui/icons/Wifi";
import BluetoothIcon from "@material-ui/icons/Bluetooth";
import { Part } from "../../../../../interfaces/Part";

const styles = (theme: Theme) =>
  createStyles({
    root: {
      margin: 0,
      padding: theme.spacing(2),
    },
    closeButton: {
      position: "absolute",
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: theme.palette.grey[500],
    },
  });

interface DialogTitleProps extends WithStyles<typeof styles> {
  id: string;
  children: React.ReactNode;
  onClose: () => void;
}

const DialogTitle = withStyles(styles)((props: DialogTitleProps) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme: Theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

interface Props {
  item: Part;
  COLLECTION: Part[];
  COLLECTION2: Part[];
  open: boolean;
  handleClose: () => void;
}

export const CustomizedDialogs: React.FC<Props> = ({
  item,
  COLLECTION,
  COLLECTION2,
  open,
  handleClose,
}) => {
  const list_of_original_checked = () => {
    if (item.combinatorial) {
      const returnitem = item?.combinatorialParts?.map((item) => item.label);
      if (returnitem) {
        console.log(returnitem);
        return returnitem;
      } else {
        return [item.label];
      }
    } else {
      return [item.label];
    }
  };
  const [checked, setChecked] = React.useState(list_of_original_checked);

  console.log(item);
  console.log(item?.combinatorialParts?.map((item) => item.label));

  const handleToggle = (value: string) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const saveCombinatorialChanges = () => {
    handleClose();
    if (checked.length >= 2) {
      item.combinatorial = true;
      item.combinatorialParts = COLLECTION.filter((item) =>
        checked.includes(item.label)
      );
    } else {
      item.combinatorial = false;
      item.combinatorialParts = [];
    }
  };

  return (
    <div>
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Turn {item.label} Combinatorial
        </DialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom>
            For the parts below which you would like to appear in this
            combinatorial position toggle the switch, if you would like to
            choose between more parts add more parts to you shopping bag from
            file upload or from collections.
          </Typography>
          <List subheader={<ListSubheader>Settings</ListSubheader>}>
            {COLLECTION.map((collectionItem, index) => (
              <ListItem>
                <ListItemIcon>
                  <BluetoothIcon />
                </ListItemIcon>
                <ListItemText
                  id="switch-list-label-bluetooth"
                  primary={collectionItem.label}
                />
                <ListItemSecondaryAction>
                  <Switch
                    edge="end"
                    onChange={handleToggle(collectionItem.label)}
                    checked={checked.indexOf(collectionItem.label) !== -1}
                    inputProps={{
                      "aria-labelledby": "switch-list-label-bluetooth",
                    }}
                  />
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={saveCombinatorialChanges} color="primary">
            Save changes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CustomizedDialogs;
