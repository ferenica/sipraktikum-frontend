import React from 'react';
import styled from 'styled-components';
import {Grid} from '@material-ui/core';


const Detail = styled.div`
font-family: Nunito Sans;
font-style: normal;
font-weight: normal;
font-size: 18px;
line-height: 30px;
/* identical to box height */

display: flex;
align-items: center;
letter-spacing: 0.0025em;
`;

const DetailValue = styled.div`
font-family: Nunito Sans;
font-style: normal;
font-weight: bold;
font-size: 18px;
line-height: 30px;
/* identical to box height */

display: flex;
text-align: justify;
letter-spacing: 0.0025em;
`;


const ListDetail = (props) => {
  return (
    <Grid xs={12} style={{display: 'flex', flexDirection: 'row', alignItems: 'stretch', justifyContent: 'left'}}>
      <Grid xs={2}>
        <Detail>{props.detail}</Detail>
      </Grid>
      <Grid xs={1}>:</Grid>
      <Grid xs={9}>
        <DetailValue>{props.value}</DetailValue>
      </Grid>
    </Grid>
  );
};

export default ListDetail;

