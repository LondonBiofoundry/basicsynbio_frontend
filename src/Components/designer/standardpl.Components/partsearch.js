import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import fetch from 'cross-fetch';
import CircularProgress from '@material-ui/core/CircularProgress';


export default function PartSearch(props) {
  console.log('collection options',props.CollectionOptions)
  //const [options, setOptions] = useState([]);
  const [open, setOpen] = React.useState(false);
  const loading = open && props.partOptions.length === 0;

  React.useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    (async () => {
      const response = await fetch('http://127.0.0.1:5000/collections/allitems');
      const myresponse = await response.json();
      var mergedArray = []

      for (const [key, value] of Object.entries(myresponse)) {
        console.log('props',props.CollectionSelected)
        console.log('key',key)
        if(props.CollectionSelected.includes(key)){
            for (let item of value) {
                mergedArray.push(item)
            }
        }
      }
      if (active) {
        props.setPartOptions(mergedArray);
      }
    })();

    return () => {
      active = false;
    };
  }, [loading,props.CollectionSelected]);

  React.useEffect(() => {
    if (!open) {
      props.setPartOptions([]);
    }
    if ((props.CollectionSelected.length)===0){
      props.setPartOptions([]);
    }
  }, [open,props.CollectionSelected]);

  return (
    <Autocomplete
      id="asynchronous-demo"
      style={{ width: '100%' }}
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      getOptionSelected={(option, value) => option === value}
      getOptionLabel={(option) => option}
      options={props.partOptions}
      loading={loading}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Asynchronous"
          variant="outlined"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            ),
          }}
        />
      )}
    />
  );
}