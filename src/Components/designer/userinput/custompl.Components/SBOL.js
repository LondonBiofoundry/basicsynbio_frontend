import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import RootRef from "@material-ui/core/RootRef";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import UploadIMG from "./uploadIMG";
import { Typography } from "@material-ui/core";
import { ApiEndpoint } from "../../../../index";

export default function SBOL(props) {
  async function ValidateFileUpload(dataString, filename) {
    console.log(dataString);
    const response = await fetch(
      ApiEndpoint +
        "fileupload/singular?file=" +
        JSON.stringify(dataString) +
        "&type=SBOL"
    );
    const result = await response.json();
    if (result.seq) {
      props.setUploadedFile({
        seq: result.seq,
        label: filename,
        collection: "",
        type: "SBOL",
        base64: dataString,
      });
      props.setCatchError("");
    } else {
      props.setCatchError(result.error);
    }
    console.log(result);
  }

  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();

      reader.onabort = () => console.log("file reading was aborted");
      reader.onerror = () => console.log("file reading has failed");
      reader.onload = () => {
        const binaryStr = reader.result;
        const dataString = JSON.stringify(
          Array.from(new Uint8Array(binaryStr))
        );
        const b64string = btoa(dataString);
        ValidateFileUpload(b64string, file.path);
      };
      reader.readAsArrayBuffer(file);
    });
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });
  const { ref, ...rootProps } = getRootProps();

  return (
    <RootRef rootRef={ref}>
      <Paper {...rootProps} variant="outlined">
        <input {...getInputProps()} />
        <Grid
          container
          direction="column"
          justify="center"
          alignItems="center"
          spacing={1}
          padding={1}
        >
          <Grid item>
            <UploadIMG />
          </Grid>
          <Grid item>
            <Typography>
              Drag and drop some files here, or click to select files
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </RootRef>
  );
}
