import React from 'react';
import {Link} from 'react-router-dom';
import styled from 'styled-components';
import PageNotFound from './../../../assets/MKPPL/page-not-found.png';
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

export default function UrlNotFound() {
  return (
    <div style={{textAlign: 'center'}}>
      <StyledImage src={PageNotFound} />
      <h1 align="center">
        404.. Sepertinya halaman tidak ditemukan
      </h1>
      <h5 align="center">
        Pastikan URL tujuan yang Anda masukan benar
      </h5>
      <br></br>
      <Link to={'/'}>
        <StyledButton primary>Kembali ke halaman utama</StyledButton>
      </Link>
    </div>
  );
}
