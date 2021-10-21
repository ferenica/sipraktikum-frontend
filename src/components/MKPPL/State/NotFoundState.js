import React from 'react';
import styled from 'styled-components';
import NotFoundImage from './../../../assets/MKPPL/Search_Not_Found.png';

const StyledImage = styled.img`
  display: block;
  margin-top: 48px;
  margin-bottom: 16px;
  margin-left: auto;
  margin-right: auto;
  height: 32vh;
  
  @media screen and (max-width: 600px) {
    width: 90%;
    height: 90%;
  }
`;

export default function NotFoundState() {
  return (
    <div style={{textAlign: 'center'}}>
      <StyledImage src={NotFoundImage} />
      <h1 align="center">
        Pencarian tidak ditemukan
      </h1>
      <h5 align="center">
        Pastikan kembali data yang Anda cari sesuai
      </h5>
    </div>
  );
}
