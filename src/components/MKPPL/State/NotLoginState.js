import React from 'react';
import {Link} from 'react-router-dom';
import styled from 'styled-components';
import NotLoginImage from './../../../assets/MKPPL/not-login.png';
import {StyledButton} from '../Button/Button';

const StyledImage = styled.img`
  display: block;
  margin-top: 48px;
  margin-bottom: 16px;
  margin-left: auto;
  margin-right: auto;
  height: 400px;

  @media screen and (max-width: 600px) {
    width: 100%;
    height: 100%;
    margin-top: 30%;
  }
`;

export default function NotLoginState() {
  return (
    <div style={{textAlign: 'center'}}>
      <StyledImage src={NotLoginImage} />
      <h1 align="center">
        Ups.. Sepertinya Anda belum memiliki akses ke halaman ini
      </h1>
      <h5 align="center">
        Silahkan Anda login terlebih dahulu
      </h5>
      <br></br>
      <Link to={'/'}>
        <StyledButton primary>Kembali ke halaman utama</StyledButton>
      </Link>
    </div>
  );
}
