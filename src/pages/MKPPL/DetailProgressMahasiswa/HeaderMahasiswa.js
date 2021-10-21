import React from 'react';
import styled from 'styled-components';
import Chips from './../../../components/MKPPL/Chips/Chips';

const GrayLine = styled.div`
  border: 1px solid #dedede;
  width: 100%;
  margin-top: 24px;
  margin-bottom: 36px;
`;
const CenterText = styled.h1`
  color: #404852;
  text-align: center;
  margin-bottom: 20px;
  padding-top: 15px;
`;
const InlineSpan = styled.span`
  display: inline-block;
  margin-left: 8px;
`;

export default function HeaderMahasiswa(props) {
  return (
    <div>
      <CenterText>{props.nama_laporan}</CenterText>
      <div style={{textAlign: 'center'}}></div>
      <div
        style={{
          width: '80vh',
          margin: '20px 0',
          marginLeft: 'auto',
          marginRight: 'auto',
        }}
      >
        <h4>
          Status:
          <InlineSpan>
            <Chips label="Aktif" />
          </InlineSpan>
        </h4>
        <h4>
          Supervisor Sekolah:
          <InlineSpan>
            <b>{props.namaSupervisorSekolah}</b>
          </InlineSpan>
        </h4>
        <h4>
          Supervisor Lembaga:
          <InlineSpan>
            <b>{props.namaSupervisorLembaga}</b>
          </InlineSpan>
        </h4>
        <h4>
          Nama Lembaga:
          <InlineSpan>
            <b>{props.namaLembaga}</b>
          </InlineSpan>
        </h4>
      </div>
      <GrayLine />
    </div>
  );
}
