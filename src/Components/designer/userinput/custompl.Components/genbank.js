import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import RootRef from "@material-ui/core/RootRef";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import LinearProgress from "@material-ui/core/LinearProgress";
import { usePromiseTracker, trackPromise } from "react-promise-tracker";

import UploadIMG from "./uploadIMG";
import { Typography } from "@material-ui/core";
import { ApiEndpoint } from "../../../..";

export default function Genbank(props) {
  const { promiseInProgress } = usePromiseTracker();

  async function ValidateFileUpload(dataString, filename, checked, binary) {
    console.log(dataString);
    if (checked) {
      console.log("ran", checked);
      const response = await fetch(
        ApiEndpoint +
          "fileupload/multiple?file=" +
          JSON.stringify(dataString) +
          "&type=genbank"
      );
      const result = await response.json();
      console.log(props.multiple);
      console.log(result);
      if (result.partsarray) {
        for (let i = 0; i < result.partsarray.length; i++) {
          props.setUploadedFile({
            seq: result.partsarray[i].seq,
            label: result.partsarray[i].label,
            collection: "",
            type: "genbank",
            base64: dataString,
            multiple: true,
            index: i,
            binaryString: binary,
          });
        }
        props.setCatchError("");
      } else {
        props.setCatchError(result.error);
      }
    } else {
      const response = await fetch(
        ApiEndpoint +
          "fileupload/singular?file=" +
          JSON.stringify(dataString) +
          "&type=genbank"
      );
      const result = await response.json();
      if (result.seq) {
        props.setUploadedFile({
          seq: result.seq,
          label: filename,
          collection: "",
          type: "genbank",
          base64: dataString,
          multiple: false,
          index: null,
          binaryString: binary,
        });
        props.setCatchError("");
      } else {
        props.setCatchError(result.error);
      }
    }
  }

  const onDrop = useCallback(
    (acceptedFiles) => {
      acceptedFiles.forEach((file) => {
        const reader = new FileReader();

        reader.onabort = () => console.log("file reading was aborted");
        reader.onerror = () => console.log("file reading has failed");
        reader.onload = () => {
          const binaryStr = reader.result;
          const uint8 = new Uint8Array(binaryStr);
          const dataString = JSON.stringify(Array.from(uint8));
          const b64string = btoa(dataString);
          console.log("data", dataString);
          trackPromise(
            ValidateFileUpload(
              b64string,
              file.path,
              props.multiplePartLinkers,
              file
            )
          );
        };
        reader.readAsArrayBuffer(file);
      });
    },
    [props.multiplePartLinkers]
  );

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
              Drag and drop some files here, or click to select files,
            </Typography>
          </Grid>
        </Grid>
      </Paper>
      {promiseInProgress ? (
        <div style={{ padding: "10px" }}>
          <Typography color="textSecondary">Loading...</Typography>
          <LinearProgress />
        </div>
      ) : (
        <></>
      )}
    </RootRef>
  );
}
