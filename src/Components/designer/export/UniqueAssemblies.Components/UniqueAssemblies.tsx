import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { API } from "../../../../Api";
import { BasicAssembly } from "../../../../generated-sources";
import { returnFilesFromJsonAssemblyArray } from "../../../../utils/getFilesFromParts";
import { saveAs } from "file-saver";

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

interface Props {
  currentBuild: BasicAssembly[];
}

export const UniqueAssemblies: React.FC<Props> = ({ currentBuild }) => {
  const classes = useStyles();

  const downloadUniqueAssemblies = async () => {
    const response =
      await API.builsUniqueAssembliesAsGenbankBuilduniqueassembliesPost(
        JSON.stringify(currentBuild),
        returnFilesFromJsonAssemblyArray(currentBuild)
      );
    var blob = new Blob([response.data], { type: "chemical/seq-na-genbank" });
    saveAs(blob, "Unique_Assemblies.gb");
  };

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardContent style={{ height: "100px" }}>
          <Typography gutterBottom variant="h5" component="h2">
            Unique Assemblies
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Download a genbank file containing inforamtion for every unique
            Assembly within the build
          </Typography>
        </CardContent>
      </CardActionArea>
      <Button
        onClick={downloadUniqueAssemblies}
        className={classes.downloadButton}
        variant="contained"
        color="secondary"
      >
        Download Unique Assemblies
      </Button>
    </Card>
  );
};
