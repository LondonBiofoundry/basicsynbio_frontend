import React, {useCallback, useEffect, useState} from 'react'
import {useDropzone} from 'react-dropzone'
import RootRef from '@material-ui/core/RootRef'
import Paper from '@material-ui/core/Paper';

export default function Fasta(props) {
  async function ValidateFileUpload (dataString, filename){
    console.log(dataString)
    const response = await fetch('http://127.0.0.1:5000/fileupload/gb?file='+JSON.stringify(dataString));
    const result = await response.json()
    props.setUploadedFile({seq:result.seq,label:filename,collection:'',type:'file:gb',base64:dataString})
    console.log(result)
  }
  
  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader()

      reader.onabort = () => console.log('file reading was aborted')
      reader.onerror = () => console.log('file reading has failed')
      reader.onload = () => {
        const binaryStr = reader.result
        const dataString = JSON.stringify(Array.from(new Uint8Array(binaryStr)))
        const b64string = btoa(dataString)
        ValidateFileUpload(b64string,file.path)
      }
      reader.readAsArrayBuffer(file)
    })
  }, [])

  const {getRootProps, getInputProps} = useDropzone({onDrop})
  const {ref, ...rootProps} = getRootProps()


  return(
      <RootRef rootRef={ref}>
        <Paper {...rootProps}>
          <input {...getInputProps()} />
          <p>Drag and drop some files here, or click to select files</p>
        </Paper>
      </RootRef>
    )
}