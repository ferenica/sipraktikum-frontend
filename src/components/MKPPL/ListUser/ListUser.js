import React from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import styled from 'styled-components';
import {StyledButton} from '../Button/Button';
import StyledAvatar from '../StyledAvatar/StyledAvatar';
import Chips from '../Chips/Chips';

// Styled components
const Wrapper = styled(Container)`
  padding: 16px;
  overflow: auto;
`;
const GrayLine = styled.div`
  border: 0.8px solid #DEDEDE;
  width: 100%;
`;
const StatusSpan = styled.span`
  display: inline-block;
  margin-left: 8px;
`;

// Class to show the list of supervised students
export default function ListUser(props) {
  return (
    <>
      <Wrapper>
        <Row>
          <Col sm='1' style={{padding: '0', paddingTop: '0.3vw'}}>
            <StyledAvatar icon name='MH'></StyledAvatar>
          </Col>
          { 
          props.role === "Supervisor Lembaga" ?
          // If role is supervisor sekolah
          <Col sm='5' style={{paddingTop: '0.3vw'}}>
            <h3>{props.full_name}</h3>
            <h5 style={{color: '#4F4F4F'}}>Status:
              <StatusSpan>
                <Chips 
                  bool={props.is_active === true ? 'true' : 'false'} 
                  label={props.is_active === true ? 'aktif' : 'tidak aktif'} 
                />
              </StatusSpan>
            </h5>
            <h5>{props.role}</h5>
            <h5>{props.lembaga}</h5>
          </Col> :
          // If role is others
          <Col sm='5' style={{paddingTop: '0.3vw'}}>
            <h3>{props.full_name}</h3>
            <h5>{props.role}</h5>
          </Col>
          }
          <Col sm='3' style={{paddingTop: '0.3vw'}}>
            <Link to={props.urlDetail}>
              <StyledButton secondary>Lihat Detail</StyledButton>
            </Link>
          </Col>
          <Col sm='3' style={{paddingTop: '0.3vw'}}>
            <Link to={props.urlKelola}>
              <StyledButton secondary>Kelola</StyledButton>
            </Link>
          </Col>
        </Row>
      </Wrapper>
      <GrayLine />
    </>
  );
}
