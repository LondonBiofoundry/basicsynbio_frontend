/* eslint-disable no-use-before-define */

import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import { makeStyles } from '@material-ui/core/styles';

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

export default function CheckboxesTags() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Autocomplete
      multiple
      id="checkboxes-tags-demo"
      options={top100Films}
      disableCloseOnSelect
      getOptionLabel={(option) => option.title}
      renderOption={(option, { selected }) => (
        <React.Fragment>
          <Checkbox
            icon={icon}
            checkedIcon={checkedIcon}
            style={{ marginRight: 8 }}
            checked={selected}
          />
          {option.title}
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

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
const top100Films = [
  { title: 'BPROMOTERS_PARTS_00000'},
  { title: 'BPROMOTERS_PARTS_00001'},
  { title: 'BPROMOTERS_PARTS_00002'},
  { title: 'BPROMOTERS_PARTS_00003'},
  { title: 'BLINKERS_LINKERS_00000'},
  { title: 'BLINKERS_LINKERS_00001'},
  { title: 'BLINKERS_LINKERS_00002'},
  { title: 'BLINKERS_LINKERS_00003'},
  { title: 'BPARTS_PARTS_00000'},
  { title: 'BPARTS_PARTS_00001'},
  { title: 'BPARTS_PARTS_00002'},
  { title: 'BPARTS_PARTS_00003'},
];