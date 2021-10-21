import React, {Component} from 'react';
import styled from 'styled-components';
import {Container, Row, Col} from 'react-bootstrap';
import ProfileCard
  from '../../components/ProfileCard/ProfileCard';
import MahasiswaTabs from './MahasiswaTabs';
import Navbar from '../../components/Navbar/Navbar';
import PropTypes from 'prop-types';

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
 * Profil Mahasiswa
 */
class ProfilMahasiswa extends Component {
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
        <div data-test="component-profil-mahasiswa">
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
                  role="Mahasiswa"
                  full_name={this.props.full_name}
                  major="Kesejahteraan Sosial"
                />
              </Col>
              <Col md="8">
                <Panel>
                  <MahasiswaTabs />
                </Panel>
              </Col>
            </Row>
          </Container>
        </div>
      </>
    );
  }
}

export default ProfilMahasiswa;

ProfilMahasiswa.propTypes = {
  username: PropTypes.string,
  role: PropTypes.string,
  email: PropTypes.string,
  full_name: PropTypes.string,
  npm: PropTypes.string,
  major: PropTypes.string,
  isAuthenticated: PropTypes.bool,
  isAdmin: PropTypes.bool,
};
