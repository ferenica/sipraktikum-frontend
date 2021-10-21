import React from 'react';
import styled from 'styled-components';
import Loader from './../../../assets/MKPPL/Loader.gif';

const StyledImage = styled.img`
  display: block;
  margin-top: 48px;
  margin-bottom: 16px;
  margin-left: auto;
  margin-right: auto;
  height: 16vh;
`;

export default function LoadingState() {
  return (
    <div style={{textAlign: 'center'}}>
      <StyledImage src={Loader} />
      <h3 align="center">
        Sedang memproses data...
      </h3>
    </div>
  );
}
