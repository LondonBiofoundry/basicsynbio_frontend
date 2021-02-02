import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Slide from "@material-ui/core/Slide";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import CloseIcon from "@material-ui/icons/Close";
import { TransitionProps } from "@material-ui/core/transitions";
import { Assembly } from "../../../../interfaces/Assembly";
import { Popups } from "../../../../interfaces/Popups";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  SeqVizDiv: {
    width: "100%",
    height: "100%",
  },
  root: {
    "& > *": {
      borderBottom: "unset",
    },
  },
}));

interface Row {
  key: string;
  row: Assembly;
}

const RenderRow: React.FC<Row> = ({ key, row }) => {
  const [open, setOpen] = React.useState(false);
  const classes = useStyles();

  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.id}
        </TableCell>
        <TableCell component="th" scope="row">
          {row.name}
        </TableCell>
        <TableCell scope="row">{row.parts.length}</TableCell>
        <TableCell scope="row">{row.description}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                History
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Index/position</TableCell>
                    <TableCell>partname</TableCell>
                    <TableCell>Collection</TableCell>
                    <TableCell>ID</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.parts.map((assemblyitems, index) => (
                    <TableRow key={assemblyitems.id}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell component="th" scope="row">
                        {assemblyitems.label}
                      </TableCell>
                      <TableCell>{assemblyitems.collection}</TableCell>
                      <TableCell>{assemblyitems.id}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
};

interface Props {
  rows: Assembly[];
  openPopups: Popups;
  setOpenPopups: React.Dispatch<React.SetStateAction<Popups>>;
}

export const ViewBuild: React.FC<Props> = ({
  rows,
  openPopups,
  setOpenPopups,
}) => {
  const classes = useStyles();
  return (
    <Dialog
      fullScreen
      open={openPopups.viewBuild}
      TransitionComponent={Transition}
      keepMounted
      onClose={() => setOpenPopups((C) => ({ ...C, viewBuild: false }))}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
    >
      <AppBar className={classes.appBar} color="secondary">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={() => setOpenPopups((C) => ({ ...C, viewBuild: false }))}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Current Assembly Sequence
          </Typography>
          <Button
            autoFocus
            color="inherit"
            onClick={() => setOpenPopups((C) => ({ ...C, viewBuild: false }))}
          >
            Exit
          </Button>
        </Toolbar>
      </AppBar>
      <DialogContent>
        <TableContainer component={Paper}>
          <Table aria-label="collapsible table">
            <TableHead>
              <TableRow>
                <TableCell />
                <TableCell>ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Number Items</TableCell>
                <TableCell>Description</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <RenderRow key={row.id} row={row} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => setOpenPopups((C) => ({ ...C, viewBuild: false }))}
          color="primary"
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};
