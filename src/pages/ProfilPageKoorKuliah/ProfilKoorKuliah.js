import React, {Component} from 'react';
import styled from 'styled-components';
import {Container, Row, Col} from 'react-bootstrap';
import ProfileCard
  from '../../components/ProfileCard/ProfileCard';
import KoorKuliahTabs from './KoorKuliahTabs';
import {Redirect} from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import PropTypes from 'prop-types';

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
 * Profil Koordinator Kuliah page
 * @class
 */
class ProfilKoorKuliah extends Component {
  /**
   * @return {*} page
   */
  render() {
    if (localStorage.hasOwnProperty('login_token') === false) {
      return <Redirect to="/login/koordinator-kuliah/" />;
    }
    return (
      <>
        <Navbar
          isAuthenticated={this.props.isAuthenticated}
          isAdmin={this.props.isAdmin}
          isDosen={this.props.isDosen}
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
                role='Koordinator Mata Kuliah Praktikum'
                email={this.props.email}
                full_name={this.props.full_name}
                lembaga="Universitas Indonesia"
              />
            </Col>
            <Col md="8">
              <Panel>
                <KoorKuliahTabs />
              </Panel>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

export default ProfilKoorKuliah;

ProfilKoorKuliah.propTypes = {
  username: PropTypes.string,
  email: PropTypes.string,
  full_name: PropTypes.string,
  lembaga: PropTypes.string,
  isAuthenticated: PropTypes.bool,
  isAdmin: PropTypes.bool,
};
