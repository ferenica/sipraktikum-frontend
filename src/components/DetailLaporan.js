import React from 'react';
import styled from 'styled-components';
import {Grid} from '@material-ui/core';


const Detail = styled.div`
    font-family: Nunito Sans;
    font-style: normal;
    font-weight: normal;
    font-size: 13px;
    line-height: 18px;
    color: #4F4F4F;
    display: flex;
    align-items: center;
    letter-spacing: 0.0025em;
    `;

const DetailValue = styled.div`
    font-family: Nunito Sans;
    font-style: normal;
    font-weight: bold;
    font-size: 13px;
    line-height: 18px;
    color: #4F4F4F;
    display: flex;
    text-align: left;
    letter-spacing: 0.0025em;
`;

/**
 *
 * @param {*} props
 */
const DetailLaporan = (props) => {
  return (
    <Grid xs={12} style={{display: 'flex', flexDirection: 'row',
      alignItems: 'center', justifyContent: 'center'}}>
      <Grid xs={2}>
        <Detail>{props.detail}</Detail>
      </Grid>
      <Grid xs={1} style={{textAlign: 'center'}}>:</Grid>
      <Grid xs={4}>
        <DetailValue>{props.value}</DetailValue>
      </Grid>
    </Grid>
  );
};

export default DetailLaporan;

