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
import { ApiEndpoint } from "../../../../../Api";
import { BasicPart, BasicPartType } from "../../../../../generated-sources";

interface Props {
  addiseq: boolean;
  multiplePartLinkers: boolean;
  setUploadedFile: React.Dispatch<React.SetStateAction<BasicPart | undefined>>;
  setCatchError: React.Dispatch<React.SetStateAction<string>>;
}

export const Genbank: React.FC<Props> = ({
  addiseq,
  multiplePartLinkers,
  setUploadedFile,
  setCatchError,
}) => {
  const { promiseInProgress } = usePromiseTracker();

  async function ValidateFileUpload(
    base64string: string,
    file: any,
    checked: boolean,
    addiseq_ticked: boolean,
    binaryStr: string
  ) {
    const form = new FormData();
    form.append("file", file);
    if (checked) {
      const response = await fetch(
        ApiEndpoint +
          "fileupload/multiple?type=genbank&addiseq=" +
          String(addiseq_ticked),
        {
          method: "POST",
          body: form,
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
            type: BasicPartType.UploadMultiple,
            index: i,
          });
        }
        setCatchError("");
      } else {
        setCatchError(result.error);
      }
    } else {
      const response = await fetch(
        ApiEndpoint +
          "fileupload/singular?type=genbank&addiseq=" +
          String(addiseq_ticked),
        {
          method: "POST",
          body: form,
        }
      );
      const result = await response.json();
      if (result.seq) {
        setUploadedFile({
          id: uuid(),
          seq: result.seq,
          label: file.path,
          type: BasicPartType.UploadSingle,
        });
        setCatchError("");
      } else {
        setCatchError(result.error);
      }
    }
  }

  const onDrop = useCallback(
    (acceptedFiles) => {
      acceptedFiles.forEach((file: Blob) => {
        console.log("file-preload", file);
        const reader = new FileReader();

        reader.onabort = () => console.log("file reading was aborted");
        reader.onerror = () => console.log("file reading has failed");
        reader.onload = () => {
          console.log("file-postload", file);

          const binaryStr = reader.result;
          if (file instanceof Blob) console.log("blob!!");
          if (binaryStr !== null && typeof binaryStr !== "string") {
            const uint8 = new Uint8Array(binaryStr);
            const dataString = JSON.stringify(Array.from(uint8));
            const b64string = btoa(dataString);
            console.log("data", dataString);
            trackPromise(
              ValidateFileUpload(
                b64string,
                file,
                multiplePartLinkers,
                addiseq,
                dataString
              )
            );
          }
        };
        reader.readAsArrayBuffer(file);
        // reader.readAsDataURL(file);
      });
    },
    [multiplePartLinkers, addiseq]
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
                Drag and drop some files here, or click to select files,
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
