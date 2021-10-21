import React from 'react';
import styled from 'styled-components';
import NotDevelopedImage from './../../../assets/MKPPL/coming-soon.png';

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
/** */
export default function NotDeveloped() {
  return (
    <div style={{textAlign: 'center'}}>
      <StyledImage src={NotDevelopedImage} />
      <h1 align="center">
        Masih dalam tahap pengembangan
      </h1>
      <h5 align="center">
        Saat ini halaman dashboard belum tersedia, tetapi Anda bisa melihat-lihat halaman lain
      </h5>
      <br></br>
    </div>
  );
}
