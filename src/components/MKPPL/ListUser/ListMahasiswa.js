import React from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import styled from 'styled-components';
import StyledAvatar from '../StyledAvatar/StyledAvatar';
import Checkbox from '@material-ui/core/Checkbox';

// Styled components
const Wrapper = styled(Container)`
  padding: 16px;
  overflow: auto;
`;
const GrayLine = styled.div`
  border: 0.8px solid #DEDEDE;
  width: 100%;
`;

// Class to show the list of supervised students
export default function ListMahasiswa(props) {
  return (
    <>
      <Wrapper>
        <Row>
          <Col sm='1' style={{padding: '0', paddingTop: '0.3vw'}}>
            <StyledAvatar icon name='MH'></StyledAvatar>
          </Col>
          <Col sm='8' style={{paddingTop: '0.3vw'}}>
            <h3>{props.full_name}</h3>
            <h5>{props.npm}</h5>
            <h5>{props.dosen}</h5>
          </Col>
          <Col sm='3' style={{paddingTop: '0.3vw'}}>
            <Checkbox
              name={props.name}
              onChange={props.checkboxHandler}
              checked={props.checked}
              disabled={props.dosen === '' || props.dosen === props.selectedDosen ? false : true}
            />
          </Col>
        </Row>
      </Wrapper>
      <GrayLine />
    </>
  );
}
