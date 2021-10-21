import React from 'react';
import styled from 'styled-components';
import ErrorStateImage from './../../../assets/MKPPL/error-state.png';
import {StyledButton} from '../Button/Button';

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

export default function ErrorState() {
  return (
    <div style={{textAlign: 'center'}}>
      <StyledImage src={ErrorStateImage} />
      <h1 align="center">
        Ups.. Sepertinya sedang ada masalah
      </h1>
      <h5 align="center">
        Silahkan refresh kembali halaman ini
      </h5>
      <br></br>
      <StyledButton
        primary
        onClick={() => window.location.reload()}>
          Refresh
      </StyledButton>
    </div>
  );
}
