import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import RootRef from "@material-ui/core/RootRef";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import LinearProgress from "@material-ui/core/LinearProgress";
import { usePromiseTracker, trackPromise } from "react-promise-tracker";
import { v4 as uuid } from "uuid";

import UploadIMG from "./uploadIMG";
import { Typography } from "@material-ui/core";
import { ApiEndpoint } from "../../../../../ApiConnection";
import { Part } from "../../../../../interfaces/Part";

interface Props {
  multiplePartLinkers: boolean;
  setUploadedFile: React.Dispatch<React.SetStateAction<Part | undefined>>;
  setCatchError: React.Dispatch<React.SetStateAction<string>>;
}

export const Fasta: React.FC<Props> = ({
  multiplePartLinkers,
  setUploadedFile,
  setCatchError,
}) => {
  const { promiseInProgress } = usePromiseTracker();

  async function ValidateFileUpload(
    dataString: string,
    filename: string,
    checked: boolean
  ) {
    console.log(dataString);
    if (checked) {
      const response = await fetch(
        ApiEndpoint + "fileupload/multiple?type=fasta",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dataString),
        }
      );
      const result = await response.json();
      if (result.partsarray) {
        for (let i = 0; i < result.partsarray.length; i++) {
          setUploadedFile({
            id: uuid(),
            seq: result.partsarray[i].seq,
            label: result.partsarray[i].label,
            collection: "",
            type: "fasta",
            base64: dataString,
            multiple: true,
            index: i,
            binaryString: result.partsarray[i].binaryString,
          });
        }
        setCatchError("");
      } else {
        setCatchError(result.error);
      }
    } else {
      const response = await fetch(
        ApiEndpoint + "fileupload/singular?type=fasta",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dataString),
        }
      );
      const result = await response.json();
      if (result.seq) {
        setUploadedFile({
          id: uuid(),
          seq: result.seq,
          label: filename,
          collection: "",
          type: "fasta",
          base64: dataString,
          multiple: false,
          index: undefined,
        });
        setCatchError("");
      } else {
        setCatchError(result.error);
      }
    }
  }

  const onDrop = useCallback(
    (acceptedFiles) => {
      acceptedFiles.forEach((file: any) => {
        const reader = new FileReader();

        reader.onabort = () => console.log("file reading was aborted");
        reader.onerror = () => console.log("file reading has failed");
        reader.onload = () => {
          const binaryStr = reader.result;
          if (binaryStr !== null && typeof binaryStr !== "string") {
            const dataString = JSON.stringify(
              Array.from(new Uint8Array(binaryStr))
            );
            const b64string = btoa(dataString);
            trackPromise(
              ValidateFileUpload(b64string, file.path, multiplePartLinkers)
            );
          }
        };
        reader.readAsArrayBuffer(file);
      });
    },
    [multiplePartLinkers]
  );

  const { getRootProps, getInputProps } = useDropzone({ onDrop });
  const { ref, ...rootProps } = getRootProps();

  return (
    <>
      <RootRef rootRef={ref}>
        <Paper {...rootProps} variant="outlined">
          <input {...getInputProps()} />
          <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
            spacing={1}
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
      {promiseInProgress ? (
        <div style={{ padding: "10px" }}>
          <Typography color="textSecondary">Loading...</Typography>
          <LinearProgress />
        </div>
      ) : (
        <></>
      )}
    </>
  );
};
