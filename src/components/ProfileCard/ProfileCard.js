import React, {Component} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import MailOutlineRoundedIcon from '@material-ui/icons/MailOutlineRounded';
import PersonOutlineRoundedIcon from '@material-ui/icons/PersonOutlineRounded';
import StyledAvatar from '../MKPPL/StyledAvatar/StyledAvatar';

// Styled components
const Panel = styled.div`
  position: sticky;
  top: 48px;
  padding: 24px;
  border-radius: 10px;
  box-shadow: 0 2px 20px 0 rgba(39, 40, 48, 0.08);
  background-color: #ffffff;
  margin-bottom: 24px;

  @media screen and (max-width: 600px) {
    padding: 16px;
  }
`;
const GrayLine = styled.div`
  border: 1px solid #dedede;
  width: 100%;
`;

const InfoSpan = styled.span`
  display: inline-block;
  margin-right: 12px;
`;

/**
 * Profile Card on all role's dashboard
 */
class ProfileCard extends Component {
  /**
   * @return {Component}
   */
  render() {
    return (
      <div>
        <Panel>
          <div style={{textAlign: 'center', marginBottom: '20px'}}>
            <StyledAvatar profile name="S"></StyledAvatar>
            <h1>{this.props.full_name}</h1>
            <h4>@{this.props.username}</h4>
          </div>
          <GrayLine />
          <div
            style={{textAlign: 'left', marginLeft: '20px', marginTop: '20px'}}
          >
            <h5>
              <InfoSpan>
                <MailOutlineRoundedIcon />
              </InfoSpan>
              {this.props.email}
            </h5>
            <h5>
              <InfoSpan>
                <PersonOutlineRoundedIcon />
              </InfoSpan>
              {this.props.role || this.props.jabatan}
            </h5>
            <h5>
              <InfoSpan>
                <img
                  src={require('../../assets/MKPPL/building.png')}
                  alt="building"
                />
              </InfoSpan>
              {this.props.lembaga || this.props.major}
            </h5>
          </div>
        </Panel>
      </div>
    );
  }
}
export default ProfileCard;

ProfileCard.propTypes = {
  username: PropTypes.string,
  role: PropTypes.string,
  email: PropTypes.string,
  full_name: PropTypes.string,
  lembaga: PropTypes.string,
  jabatan: PropTypes.string,
};
