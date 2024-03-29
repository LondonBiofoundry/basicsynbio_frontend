import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import RootRef from "@material-ui/core/RootRef";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import UploadIMG from "./uploadIMG";
import { Typography } from "@material-ui/core";
import { ApiEndpoint } from "../../../../../Api";
import { v4 as uuid } from "uuid";
import { BasicPart, BasicPartType } from "../../../../../generated-sources";

interface Props {
  addiseq: boolean;
  setUploadedFile: React.Dispatch<React.SetStateAction<BasicPart | undefined>>;
  setCatchError: React.Dispatch<React.SetStateAction<string>>;
}

export const SBOL: React.FC<Props> = ({
  addiseq,
  setUploadedFile,
  setCatchError,
}) => {
  async function ValidateFileUpload(dataString: string, filename: string) {
    const response = await fetch(
      ApiEndpoint +
        "fileupload/singular?file=" +
        JSON.stringify(dataString) +
        "&type=SBOL&addiseq=" +
        String(addiseq)
    );
    const result = await response.json();
    if (result.seq) {
      setUploadedFile({
        id: uuid(),
        seq: result.seq,
        label: filename,
        collection: "",
        type: BasicPartType.UploadSingle,
      });
      setCatchError("");
    } else {
      setCatchError(result.error);
    }
  }

  const onDrop = useCallback((acceptedFiles) => {
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
          ValidateFileUpload(b64string, file.path);
        }
        reader.readAsArrayBuffer(file);
      };
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
};
