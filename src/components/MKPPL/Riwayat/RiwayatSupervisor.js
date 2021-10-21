import React from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import styled from 'styled-components';
import {StyledButton} from '../Button/Button';
import Chips from '../Chips/Chips';
import OrangeChips from '../Chips/OrangeChips';

// Styled components
const Wrapper = styled(Container)`
  padding: 16px;
`;
const GrayLine = styled.div`
  border: 0.8px solid #DEDEDE;
  width: 100%;
`;

// Class to show the list of history of supervisor
export default function RiwayatSupervisor(props) {
  let deadlineStr = props.waktu_submisi;
  const deadline = new Date(deadlineStr);

  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  };
  deadlineStr = deadline.toLocaleDateString('id-ID', options);

  return (
    <>
      <Wrapper>
        <Row >
          <Col sm='9'>
            {props.skor === -1 ?
              <OrangeChips label="Menunggu Penilaian"/> :
              <Chips label="Sudah Dinilai"/>
            }
            <div style={{marginBottom: '8px'}}></div>
            <h3><b>{props.nama}</b> telah mengunggah {props.nama_laporan}</h3>
            <h5>{deadlineStr}</h5>

          </Col>
          <Col sm='3'>
            <Link to={props.url}>
              <StyledButton secondary style={{marginTop: '1.8vw'}}>
                Lihat Detail
              </StyledButton>
            </Link>
          </Col>
        </Row>
      </Wrapper>
      <GrayLine />
    </>
  );
}
