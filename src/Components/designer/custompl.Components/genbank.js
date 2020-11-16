import React, {Component} from 'react'
import {DropzoneAreaBase} from 'material-ui-dropzone'

class DropzoneAreaExample extends Component{
  constructor(props){
    super(props);
    this.state = {
      files: [],
      setUploadedFile: props.setUploadedFile
    };
  }
  handleChange(files){
    console.log(files)
    this.setState({
      files: files
    });
  }
  render(){
    return (
        <div style={{marginTop: '10px'}}>
            <DropzoneAreaBase
              onAdd={(fileObjs) => this.state.setUploadedFile(fileObjs[0].file.name)}
              onDelete={(fileObj) => console.log('Removed File:', fileObj)}
              onAlert={(message, variant) => console.log(`${variant}: ${message}`)}
            />
        </div>
    )
  }
}

export default DropzoneAreaExample;