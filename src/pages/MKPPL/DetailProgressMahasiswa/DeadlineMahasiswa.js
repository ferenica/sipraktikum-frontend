import React from 'react';
import {Row, Col} from 'react-bootstrap';

export default function DeadlineMahasiswa(props) {
  return (
    <div>
      <Row>
        <Col sm="4">
          <h4>Deadline</h4>
        </Col>
        <Col sm="8">
          <h4>: {props.waktu_deadline ? props.waktu_deadline : '-'}</h4>
        </Col>
      </Row>
      <Row>
        <Col sm="4">
          <h4>Waktu tersisa</h4>
        </Col>
        <Col sm="8">
          {props.terlambat ? (
            <h4 style={{color: '#F24848'}}>
              : Terlambat {props.txtSisaDeadline}
            </h4>
          ) : (
            <h4>: {props.txtSisaDeadline}</h4>
          )}
        </Col>
      </Row>

      <Row>
        <Col sm="4">
          <h4>Terakhir diubah</h4>
        </Col>
        <Col sm="8">
          {props.status_submisi ? (
            <h4>: {props.waktu_submisi}</h4>
          ) : (
            <h4>: -</h4>
          )}
        </Col>
      </Row>
    </div>
  );
}
