import React, {Component} from 'react';
import Dropzone from 'react-dropzone';
import './AksesKontrol.css';
import icon from './Vector.png';

/**
 * Dropzone
 */
export default class Box extends Component {
  /**
   * @return {Component}
   */
  render() {
    return (
      <div className="App">
        <Dropzone
          onDrop={this.props.setFiles}
        >
          {({getRootProps, getInputProps}) => (
            <div {...getRootProps({className: 'dropzone'})}>
              <input {...getInputProps()} />
              <div className="text-center">
                <img src={icon} className="cloud" alt="" />
                <p className="description">
                  <b>Drag file csv</b>
                </p>
                <p id="atau">atau</p>
                <p id="subdesc">Klik Disini</p>
              </div>
            </div>
          )}
        </Dropzone>
      </div>
    );
  }
}
