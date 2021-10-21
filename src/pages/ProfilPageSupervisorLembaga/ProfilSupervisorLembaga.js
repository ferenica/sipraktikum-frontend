import React, {Component} from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Navbar from '../../components/Navbar/Navbar';
import ProfileCard from '../../components/ProfileCard/ProfileCard';
import TabsSupervisorLembaga from './TabsSupervisorLembaga';

// Styled components
const HeaderContainer = styled.div`
  position: sticky;
  top: 0;
  z-index: -1;
  margin-bottom: -10vw;
`;

const Panel = styled.div`
  position: sticky;
  padding: 24px;
  min-height: 300px;
  border-radius: 10px;
  box-shadow: 0 2px 20px 0 rgba(39, 40, 48, 0.08);
  background-color: #ffffff;
  margin-bottom: 24px;

  @media screen and (max-width: 600px) {
    padding: 16px;
  }
`;

/**
 * Profil Supervisor Lembaga
 */
class ProfilSupervisorLembaga extends Component {
  /**
   * @return {Component}
   */
  render() {
    return (
      <>
        <Navbar
          isAuthenticated={this.props.isAuthenticated}
          isAdmin={this.props.isAdmin}
        />
        <HeaderContainer>
          <img
            style={{width: '100vw'}}
            src={require('../../assets/MKPPL/Orange_Header.png')}
            alt="header"
          />
        </HeaderContainer>

        <Container>
          <Row>
            <Col md="4">
              <ProfileCard
                username={this.props.username}
                email={this.props.email}
                full_name={this.props.full_name}
                lembaga={this.props.lembaga}
                jabatan={this.props.jabatan}
              />
            </Col>
            <Col md="8">
              <Panel>
                <TabsSupervisorLembaga />
              </Panel>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

export default ProfilSupervisorLembaga;

ProfilSupervisorLembaga.propTypes = {
  username: PropTypes.string,
  role: PropTypes.string,
  email: PropTypes.string,
  full_name: PropTypes.string,
  lembaga: PropTypes.string,
  jabatan: PropTypes.string,
  isAuthenticated: PropTypes.bool,
  isAdmin: PropTypes.bool,
};
