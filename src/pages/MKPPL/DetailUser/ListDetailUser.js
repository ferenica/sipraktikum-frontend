import React from 'react';
import styled from 'styled-components';
import {Grid} from '@material-ui/core';

const Detail = styled.div`
font-family: Nunito Sans;
font-style: normal;
font-weight: normal;
font-size: 16px;
line-height: 30px;
/* identical to box height */

display: flex;
align-items: center;
letter-spacing: 0.0025em;
`;

const DetailValue = styled.div`
color: #404852;
font-family: Nunito Sans;
font-style: normal;
font-weight: bold;
font-size: 16px;
line-height: 30px;
/* identical to box height */

display: flex;
text-align: left;
letter-spacing: 0.0025em;
`;

const ListDetailUser = (props) => {
  return (
    <Grid item xs={12} style={{display: 'flex', flexDirection: 'row', alignItems: 'stretch', justifyContent: 'center'}}>
      <Grid item xs={5}>
        <Detail>{props.detail}</Detail>
      </Grid>
      <Grid item xs={1}>:</Grid>
      <Grid item xs={5}>
        <DetailValue>{props.value}</DetailValue>
      </Grid>
    </Grid>
  );
};

export default ListDetailUser;

