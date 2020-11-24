import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});

export default function Export(props) {
  const classes = useStyles();
  var downloadURL = 'http://127.0.0.1:5000/buildcsvs?build='+JSON.stringify(props.currentBuild);
  const [error, setError] = React.useState([]);
  function failedDownload() {
      console.log('error')
  }


  async function loadCSVs() {
    fetch(downloadURL)
        .then((response)=>{
            if (response.status===400){
                setError(response)
            }
            console.log(response)
            console.log(response)
            setError('None')
        })
        .catch((err)=>{
            console.log(err)
            console.log('body',err.body)
            console.log('body',err.json)
            setError(err)
        })
  }
  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            CSV's
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Download csv's containing information about clips and ...
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {String(error)}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <a href={downloadURL} onAbort={failedDownload} onError={failedDownload}  download>
            <Button size="small" color="primary">
                Download Csv's
            </Button>
        </a>
        <Button size="small" color="primary">
          Learn More
        </Button>
        <Button onClick={loadCSVs} size="small" color="primary">
            Load CSV's
        </Button>
      </CardActions>
    </Card>
  );
}