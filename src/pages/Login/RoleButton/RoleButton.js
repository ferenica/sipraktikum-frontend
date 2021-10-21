import React from 'react';
import IconAccount from '../../../assets/GroupA/account.png';
import PropTypes from 'prop-types';

import {styled} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';

const InactiveStyledCard = styled(Card)({
  'width': '310px',
  'display': 'flex',
  'alignItems': 'center',
  'justifyContent': 'center',
  'borderRadius': 10,
  'transition': '.15s all ease-in-out',
  '&:hover': {
    transform: 'scale(1.05)',
    backgroundColor: '#FFDEC5',
  },
  'margin': '3px',
});

const ActiveStyledCard = styled(InactiveStyledCard)({
  transform: 'scale(1.05)',
  backgroundColor: '#FFDEC5',
});

const StyledCardContent = styled(CardContent)({
  fontSize: '17px',
  fontWeight: 'bolder',
  lineHeight: '27px',
  whiteSpace: 'pre',
  alignItems: 'center',
  justifyContent: 'center',
  textAlign: 'center',
});

const StyledSSOText = styled('div')({
  fontSize: '14px',
  fontWeight: 'normal',
});

const RoleButton = (props) => {
  let ssoText;
  if (props.isSSO) {
    ssoText = (<StyledSSOText>SSO</StyledSSOText>);
  }

  if (props.isActive) {
    return (
      <ActiveStyledCard
        onClick={() => props.setType(props.name)}
        color="primary">
        <CardActionArea>
          <StyledCardContent>
            <img
              className="icon-account"
              src={IconAccount}
              style={{width: '20%'}}
              alt=""></img>
            <br></br><br></br>
            <div>{props.name}</div>
            {ssoText}
          </StyledCardContent>
        </CardActionArea>
      </ActiveStyledCard>
    );
  } else {
    return (
      <InactiveStyledCard
        onClick={() => props.setType(props.name)}
        color="primary">
        <CardActionArea>
          <StyledCardContent>
            <div className="content-role">
              <img
                className="icon-account"
                src={IconAccount}
                style={{width: '20%'}}
                alt=""></img>
              <br></br><br></br>
              <div>{props.name}</div>
              {ssoText}
            </div>
          </StyledCardContent>
        </CardActionArea>
      </InactiveStyledCard>
    );
  }
};

export default RoleButton;

RoleButton.propTypes = {
  name: PropTypes.string,
  setType: PropTypes.func,
  isActive: PropTypes.bool,
  isSSO: PropTypes.bool,
};
