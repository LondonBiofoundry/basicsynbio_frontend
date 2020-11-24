import React, {useState} from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import { makeStyles } from '@material-ui/core/styles';
import fetch from 'cross-fetch';
import CircularProgress from '@material-ui/core/CircularProgress';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
    marginTop: theme.spacing(2)
  },
}));

function sleep(delay = 0) {
    return new Promise((resolve) => {
      setTimeout(resolve, delay);
    });
  }

export default function Chip(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const loading = open && props.CollectionOptions.length === 0;

  React.useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    (async () => {
      const response = await fetch('http://127.0.0.1:5000/collections/names');
      await sleep(1e3); // For demo purposes.
      const myresponse = await response.json();
      console.log(myresponse)

      if (active) {
        props.setCollectionOptions(myresponse.data);
      }
    })();

    return () => {
      active = false;
    };
  }, [loading]);

  React.useEffect(() => {
    if (!open) {
      props.setCollectionOptions([]);
    }
  }, [open]);

  return (
    <div className={classes.root}>
      <Autocomplete
      onChange={(event, newValue) => {
        props.setCollectionSelected(newValue);
      }}
      multiple
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      getOptionLabel={(option) => option}
      options={props.CollectionOptions}
      loading={loading}
      disableCloseOnSelect
      renderOption={(option, { selected }) => (
        <React.Fragment>
        {loading ? <CircularProgress color="inherit" size={20} /> : null}
          <Checkbox
            icon={icon}
            checkedIcon={checkedIcon}
            style={{ marginRight: 8 }}
            checked={selected}
          />
          {option}
        </React.Fragment>
      )}
      style={{ width: '100%' }}
      renderInput={(params) => (
        <TextField {...params} variant="outlined" label="Add Collections in which you want to search from" placeholder="Search Collections" />
      )}
    />
    </div>
  );
}