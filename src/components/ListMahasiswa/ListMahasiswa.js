import React from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import styled from 'styled-components';
import {StyledButton, DisabledButton} from '../MKPPL/Button/Button';
import Chips from '../MKPPL/Chips/Chips';
import StyledAvatar from '../MKPPL/StyledAvatar/StyledAvatar';
import Tooltip from '@material-ui/core/Tooltip';

const disableMessage = 'Data mahasiswa harus dikelola terlebih dahulu';
const notAvailableMessage = 'Laporan belum tersedia';

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
/**
 * List of Mahasiswa
 */
export default function ListMahasiswa(props) {
  return (
    <>
      <Wrapper>
        <Row>
          {props.type === 'supervisor-sekolah' ?
            <>
              <Col sm='1' style={{padding: '0', paddingTop: '1.2vw'}}>
                <StyledAvatar icon name='MH'></StyledAvatar>
              </Col>
              <Col sm='6'>
                <h3>{props.nama}</h3>
                <h5 style={{color: '#4F4F4F'}}>Status:
                  <StatusSpan><Chips label='aktif' /></StatusSpan>
                </h5>
                <h5>{props.praktikum}</h5>
              </Col>
              <Col sm='5' style={{paddingTop: '1.2vw'}}>
                <Link to={props.urlkelola}>
                  <StyledButton secondary>Kelola</StyledButton>
                </Link>
                {!props.statuskelola ?
                  <Tooltip title={disableMessage}>
                    <span>
                      <DisabledButton>Lihat Penilaian</DisabledButton>
                    </span>
                  </Tooltip> :
                  <Link to={props.urlpenilaian}>
                    <StyledButton secondary>Lihat Penilaian</StyledButton>
                  </Link>
                }
              </Col>
            </> :

            <>
              <Col sm='1' style={{padding: '0', paddingTop: '1.2vw'}}>
                <StyledAvatar icon name='MH'></StyledAvatar>
              </Col>
              <Col sm='6'>
                <h3>{props.nama}</h3>
                <h5 style={{color: '#4F4F4F'}}>Status:
                  <StatusSpan><Chips label='aktif' /></StatusSpan>
                </h5>
                <h5>{props.praktikum}</h5>
              </Col>
              <Col sm='5' style={{paddingTop: '20px', paddingLeft: '120px'}}>
                {!props.statuskelola ?
                  <Tooltip title={notAvailableMessage}>
                    <span>
                      <DisabledButton>Lihat Penilaian</DisabledButton>
                    </span>
                  </Tooltip> :
                  <Link to={props.urlpenilaian}>
                    <StyledButton secondary style={{margin: 'auto'}}>Lihat Penilaian</StyledButton>
                  </Link>
                }
              </Col>
            </>
          }
        </Row>
      </Wrapper>
      <GrayLine />
    </>
  );
}
