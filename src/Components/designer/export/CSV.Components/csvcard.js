import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  root: {
    width: "100%",
    height: "100%",
  },
  media: {
    height: 140,
  },
  downloadButton: {
    width: "100%",
    padding: "5px",
  },
});

export default function CSVCard(props) {
  const classes = useStyles();
  console.log(props.currentBuild);
  var downloadURL =
    "http://127.0.0.1:5000/buildcsvs?build=" +
    JSON.stringify(props.currentBuild);

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
        </CardContent>
      </CardActionArea>
      <a href={downloadURL} download style={{ textDecoration: "none" }}>
        <Button
          className={classes.downloadButton}
          variant="contained"
          color="primary"
        >
          Download CSV's
        </Button>
      </a>
    </Card>
  );
}
