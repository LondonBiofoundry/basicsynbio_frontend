import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography } from "@material-ui/core";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dark } from "react-syntax-highlighter/dist/esm/styles/prism";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const space4 = "\xa0\xa0\xa0\xa0";
const space8 = "\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0";
const space12 = "\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0";
const space16 =
  "\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0";

const basiclinker = `"<class 'basicsynbio.main.BasicLinker'>"`;
const utrlinker = `"<class 'basicsynbio.main.BasicUTRRBSLinker'>"`;

const components = {
  code({ node, inline, className, children, ...props }) {
    const match = /language-(\w+)/.exec(className || "");
    return !inline && match ? (
      <SyntaxHighlighter
        style={dark}
        language={match[1]}
        PreTag="div"
        children={String(children).replace(/\n$/, "")}
        {...props}
      />
    ) : (
      <code className={className} {...props} />
    );
  },
};

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    alignItems: "left",
    textAlign: "left",
    alignSelf: "stretch",
    padding: "50px",
  },
}));

export default function BasicBuild() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid
        container
        direction="row"
        justify="flex-start"
        alignItems="flex-start"
        spacing={3}
      >
        <Grid item xs={12}>
          <Typography variant="h4">Type Definitions</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body1">
            Instruction and ref specification use the following common types.
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6">Primitive Types</Typography>
        </Grid>
        <Grid item xs={12}>
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Type</TableCell>
                  <TableCell> Definition </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow key={"1"}>
                  <TableCell>Float</TableCell>
                  <TableCell>a floating point numeric value</TableCell>
                </TableRow>

                <TableRow key={"2"}>
                  <TableCell>Int</TableCell>
                  <TableCell>an integer numeric value</TableCell>
                </TableRow>
                <TableRow key={"3"}>
                  <TableCell>String</TableCell>
                  <TableCell>
                    any sequence of utf-encoded characters bounded with "
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6">Defined Types</Typography>
        </Grid>
        <Grid item xs={12}>
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Type</TableCell>
                  <TableCell> Example </TableCell>
                  <TableCell> Definition </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow key={"1"}>
                  <TableCell>DNA-String</TableCell>
                  <TableCell>
                    "TACGCATGACTCGTACGTACGATCGATCGATCGATCGTACTGCATC"
                  </TableCell>
                  <TableCell>
                    any sequence of utf-encoded A,C,T or G characters bounded
                    with "
                  </TableCell>
                </TableRow>
                <TableRow key={"2"}>
                  <TableCell>Unique-Part-ID</TableCell>
                  <TableCell>UP0</TableCell>
                  <TableCell>UP + A Non-Negative Int (0,1,2...)</TableCell>
                </TableRow>
                <TableRow key={"3"}>
                  <TableCell>Unique-Linker-ID</TableCell>
                  <TableCell>UL0</TableCell>
                  <TableCell>UL + A Non-Negative Int (0,1,2...)</TableCell>
                </TableRow>
                <TableRow key={"4"}>
                  <TableCell>Clip-Reaction-ID</TableCell>
                  <TableCell>CR0</TableCell>
                  <TableCell>CR + A Non-Negative Int (0,1,2...)</TableCell>
                </TableRow>
                <TableRow key={"5"}>
                  <TableCell>Assembly-ID</TableCell>
                  <TableCell>A0</TableCell>
                  <TableCell>A + A Non-Negative Int (0,1,2...)</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6">BasicBuild Object Types</Typography>
        </Grid>
        <Grid item xs={12}>
          <Paper variant="outlined" padding="10px">
            <div style={{ padding: "10px" }}>
              {"{"}
              <div style={{ paddingTop: "10px" }}>
                <span style={{ color: "#dd1244" }}>{space4}"unique_parts"</span>
                : {"{"}
              </div>
              <div style={{ paddingTop: "10px" }}>
                <span style={{ color: "#1b7fff" }}>{space8}Unique-Part-ID</span>
                : {"{"}
              </div>
              <div style={{ paddingTop: "10px" }}>
                <span style={{ color: "#dd1244" }}>{space12}"sequence"</span>:{" "}
                <span style={{ color: "#1b7fff" }}>DNA-String</span>,
              </div>
              <div style={{ paddingTop: "10px" }}>
                <span style={{ color: "#dd1244" }}>{space12}"id"</span>:{" "}
                <span style={{ color: "#1b7fff" }}>String</span>,
              </div>
              <div style={{ paddingTop: "10px" }}>
                <span style={{ color: "#dd1244" }}>{space12}"name"</span>:{" "}
                <span style={{ color: "#1b7fff" }}>String</span>,
              </div>
              <div style={{ paddingTop: "10px" }}>
                <span style={{ color: "#dd1244" }}>{space12}"description"</span>
                : <span style={{ color: "#1b7fff" }}>String</span>,
              </div>
              <div style={{ paddingTop: "10px" }}>
                <span style={{ color: "#dd1244" }}>
                  {space12}"Part mass for 30 μL clip reaction (ng)"
                </span>
                : <span style={{ color: "#1b7fff" }}>Int</span>,
              </div>
              <div style={{ paddingTop: "10px" }}>
                <span style={{ color: "#dd1244" }}>
                  {space12}"clip reactions"
                </span>
                :{" "}
                <span style={{ color: "#1b7fff" }}>
                  Array[Clip-Reaction-ID]
                </span>
              </div>
              <div style={{ paddingTop: "10px" }}>
                {space8}
                {"}"}
              </div>
              <div style={{ paddingTop: "10px" }}>
                {space4}
                {"}"},
              </div>
              <div style={{ paddingTop: "10px" }}>
                <span style={{ color: "#dd1244" }}>
                  {space4}"unique_linkers"
                </span>
                : {"{"}
              </div>
              <div style={{ paddingTop: "10px" }}>
                <span style={{ color: "#1b7fff" }}>
                  {space8}Unique-Linker-ID
                </span>
                : {"{"}
              </div>
              <div style={{ paddingTop: "10px" }}>
                <span style={{ color: "#dd1244" }}>{space12}"id"</span>:{" "}
                <span style={{ color: "#1b7fff" }}>String</span>,
              </div>
              <div style={{ paddingTop: "10px" }}>
                <span style={{ color: "#dd1244" }}>
                  {space12}"linker_class"
                </span>
                :{" "}
                <span style={{ color: "#1b7fff" }}>
                  Enum({basiclinker + "," + utrlinker})
                </span>
                ,
              </div>
              <div style={{ paddingTop: "10px" }}>
                <span style={{ color: "#dd1244" }}>{space12}"name"</span>:{" "}
                <span style={{ color: "#1b7fff" }}>String</span>,
              </div>
              <div style={{ paddingTop: "10px" }}>
                <span style={{ color: "#dd1244" }}>{space12}"sequence"</span>:{" "}
                <span style={{ color: "#1b7fff" }}>DNA-String</span>,
              </div>
              <div style={{ paddingTop: "10px" }}>
                <span style={{ color: "#dd1244" }}>{space12}"prefix_id"</span>:{" "}
                <span style={{ color: "#1b7fff" }}>String</span>,
              </div>
              <div style={{ paddingTop: "10px" }}>
                <span style={{ color: "#dd1244" }}>{space12}"suffix_id"</span>:{" "}
                <span style={{ color: "#1b7fff" }}>String</span>,
              </div>
              <div style={{ paddingTop: "10px" }}>
                <span style={{ color: "#dd1244" }}>
                  {space12}"overhang_slice_params"?
                </span>
                : <span style={{ color: "#1b7fff" }}>Array[Int,Int]</span>,
              </div>
              <div style={{ paddingTop: "10px" }}>
                <span style={{ color: "#dd1244" }}>
                  {space12}"prefix clip reactions"
                </span>
                :{" "}
                <span style={{ color: "#1b7fff" }}>
                  Array[Clip-Reaction-ID]
                </span>
                ,
              </div>
              <div style={{ paddingTop: "10px" }}>
                <span style={{ color: "#dd1244" }}>
                  {space12}"suffix clip reactions"
                </span>
                :{" "}
                <span style={{ color: "#1b7fff" }}>
                  Array[Clip-Reaction-ID]
                </span>
              </div>
              <div style={{ paddingTop: "10px" }}>
                {space8}
                {"}"}
              </div>
              <div style={{ paddingTop: "10px" }}>
                {space4}
                {"},"}
              </div>
              <div style={{ paddingTop: "10px" }}>
                <span style={{ color: "#dd1244" }}>{space4}"clips_data"</span>:{" "}
                {"{"}
              </div>
              <div style={{ paddingTop: "10px" }}>
                <span style={{ color: "#1b7fff" }}>
                  {space8}Clip-Reaction-ID
                </span>
                : {"{"}
              </div>
              <div style={{ paddingTop: "10px" }}>
                <span style={{ color: "#dd1244" }}>{space12}"prefix"</span>:{" "}
                {"{"}
              </div>
              <div style={{ paddingTop: "10px" }}>
                <span style={{ color: "#dd1244" }}>{space16}"key"</span>:{" "}
                <span style={{ color: "#1b7fff" }}>Unique-Linker-ID</span>,
              </div>
              <div style={{ paddingTop: "10px" }}>
                <span style={{ color: "#dd1244" }}>{space16}"prefix_id"</span>:{" "}
                <span style={{ color: "#1b7fff" }}>String</span>
              </div>
              <div style={{ paddingTop: "10px" }}>
                {space12}
                {"}"}
              </div>
              <div style={{ paddingTop: "10px" }}>
                <span style={{ color: "#dd1244" }}>{space12}"part"</span>: {"{"}
              </div>
              <div style={{ paddingTop: "10px" }}>
                <span style={{ color: "#dd1244" }}>{space16}"key"</span>:{" "}
                <span style={{ color: "#1b7fff" }}>Unique-Part-ID</span>,
              </div>
              <div style={{ paddingTop: "10px" }}>
                <span style={{ color: "#dd1244" }}>{space16}"id"</span>:{" "}
                <span style={{ color: "#1b7fff" }}>String</span>,
              </div>
              <div style={{ paddingTop: "10px" }}>
                <span style={{ color: "#dd1244" }}>{space16}"name"</span>:{" "}
                <span style={{ color: "#1b7fff" }}>String</span>
              </div>
              <div style={{ paddingTop: "10px" }}>
                {space12}
                {"}"},
              </div>
              <div style={{ paddingTop: "10px" }}>
                <span style={{ color: "#dd1244" }}>{space12}"suffix"</span>:{" "}
                {"{"}
              </div>
              <div style={{ paddingTop: "10px" }}>
                <span style={{ color: "#dd1244" }}>{space16}"key"</span>:{" "}
                <span style={{ color: "#1b7fff" }}>Unique-Linker-ID</span>,
              </div>
              <div style={{ paddingTop: "10px" }}>
                <span style={{ color: "#dd1244" }}>{space16}"suffix_id"</span>:{" "}
                <span style={{ color: "#1b7fff" }}>String</span>
              </div>
              <div style={{ paddingTop: "10px" }}>
                {space12}
                {"}"},
              </div>
              <div style={{ paddingTop: "10px" }}>
                <span style={{ color: "#dd1244" }}>
                  {space12}"total assemblies"
                </span>
                : <span style={{ color: "#1b7fff" }}>Int</span>,
              </div>
              <div style={{ paddingTop: "10px" }}>
                <span style={{ color: "#dd1244" }}>
                  {space12}"assembly keys"
                </span>
                : <span style={{ color: "#1b7fff" }}>Array[Assembly-ID]</span>
              </div>
              <div style={{ paddingTop: "10px" }}>
                {space8}
                {"}"}
              </div>
              <div style={{ paddingTop: "10px" }}>
                {space4}
                {"}"},
              </div>
              <div style={{ paddingTop: "10px" }}>
                <span style={{ color: "#dd1244" }}>
                  {space4}"assembly_data"
                </span>
                : {"{"}
              </div>
              <div style={{ paddingTop: "10px" }}>
                <span style={{ color: "#1b7fff" }}>{space8}Assembly-ID</span>:{" "}
                {"{"}
              </div>
              <div style={{ paddingTop: "10px" }}>
                <span style={{ color: "#dd1244" }}>{space12}"id"</span>:{" "}
                <span style={{ color: "#1b7fff" }}>String</span>,
              </div>
              <div style={{ paddingTop: "10px" }}>
                <span style={{ color: "#dd1244" }}>
                  {space12}"clip reactions"
                </span>
                :{" "}
                <span style={{ color: "#1b7fff" }}>
                  Array[Clip-Reaction-ID]
                </span>
              </div>
              <div style={{ paddingTop: "10px" }}>
                {space8}
                {"}"}
              </div>
              <div style={{ paddingTop: "10px" }}>
                {space4}
                {"}"}
              </div>
              {"}"}
            </div>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6">Example BasicBuild Object</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body1">
            An example BasicBuild JSON object can be found in the github
            repository for basicsynbio:{" "}
            <a href="https://github.com/LondonBiofoundry/basicsynbio/blob/master/json_files/test_build.json">
              https://github.com/LondonBiofoundry/basicsynbio/blob/master/json_files/test_build.json
            </a>
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
}
