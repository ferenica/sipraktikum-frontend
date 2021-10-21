import React, {Component} from 'react';
import Dropzone from 'react-dropzone';
import './AksesKontrol.css';
import icon from './Vector.png';
import {StyledButton} from './../../../components/MKPPL/Button/Button';

// Source:
// https://www.newline.co/@dmitryrogozhny/how-to-drag-and-drop-files-in-react-applications-with-react-dropzone--c6732c93
/** */
export default class Box extends Component {
  /**
   * @return {Component}
   */
  render() {
    return (
      <div className="App">
        <Dropzone onDrop={this.props.setFiles}>
          {({getRootProps, getInputProps}) => (
            <div {...getRootProps({className: 'dropzone'})}>
              <input {...getInputProps()} />
              <div className="text-center">
                <img src={icon} className="cloud" alt="" />
                <p className="description">
                  <b>Drag file pdf</b>
                </p>
                <p id="atau">atau</p>
                <StyledButton secondary>Upload File</StyledButton>
              </div>
            </div>
          )}
        </Dropzone>
      </div>
    );
  }
}
