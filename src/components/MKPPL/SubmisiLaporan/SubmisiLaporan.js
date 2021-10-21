import React from 'react';
import {Container, Row, Col} from 'react-bootstrap';
// import {Link} from 'react-router-dom';
import styled from 'styled-components';
import DatePicker from './../DatePicker/DatePicker';
import StyledSwitch from './../Switch/Switch';

// Styled components
const Wrapper = styled(Container)`
  padding: 16px;
  width: 100%;
  border: 1px solid #DEDEDE;
  border-radius: 5px;
  margin-bottom: 8px;
`;
const StyledImg = styled.img`
  width: 36px;
  height: 36px;
`;

// Class to show the list of supervised students
export default function SubmisiLaporan(props) {
  return (
    <>
      <Wrapper classnames="align-me">
        <Row>
          <Col sm='1'>
            <StyledImg src={
              require('../../../assets/MKPPL/docs.png')} alt='docs'/>
          </Col>
          <Col sm='4'>
            <h4>{props.nama_laporan}</h4>
            {/* <h4>{props.waktu_deadline}</h4>
            <h4>{props.status_publikasi}</h4> */}
          </Col>
          <Col sm='4'>
            <DatePicker deadline={props.waktu_deadline}/>
          </Col>
          <Col sm='3'>
            <StyledSwitch checked={props.status_publikasi}/>
          </Col>
        </Row>
      </Wrapper>
    </>
  );
}
