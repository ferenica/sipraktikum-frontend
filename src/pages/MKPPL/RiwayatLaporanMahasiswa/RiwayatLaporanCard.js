import React from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import styled from 'styled-components';
import {StyledButton} from '../../../components/MKPPL/Button/Button';

// Styled components
const Wrapper = styled(Container)`
  padding: 16px;
`;
const GrayLine = styled.div`
  border: 0.8px solid #dedede;
  width: 100%;
`;

/**
 * Component of individual Mahasiswa's riwayat list element
 * @param {*} props
 * @return {Component}
 */
export default function RiwayatLaporanCard(props) {
  return (
    <>
      <Wrapper>
        <Row>
          <Col sm="9">
            {props.user === 'Mahasiswa' ? (
              <h3>
                <b>{props.nama_laporan}</b> telah diunggah
              </h3>
            ) : props.user === 'Lembaga' ? (
              <h3>
                <b>{props.nama_laporan}</b> telah dinilai Supervisor Lembaga
              </h3>
            ) : props.user === 'Sekolah' ? (
              <h3>
                <b>{props.nama_laporan}</b> telah dinilai Supervisor Sekolah
              </h3>
            ) : null}

            <h5>
              Oleh <b>{props.nama}</b> - {props.waktu_submisi}
            </h5>
          </Col>
          <Col sm="3">
            <Link to={props.url}>
              <StyledButton secondary>Lihat Detail</StyledButton>
            </Link>
          </Col>
        </Row>
      </Wrapper>
      <GrayLine />
    </>
  );
}
