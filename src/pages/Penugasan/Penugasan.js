import React, {Component} from 'react';
import Navbar from '../../components/Navbar/Navbar';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {Container, Row, Col} from 'react-bootstrap';

import DaftarMahasiswa from '../MKPPL/DaftarUser/DaftarMahasiswa';
import DaftarDosen from '../MKPPL/DaftarUser/DaftarDosen';
import DaftarKonfirmasi from '../MKPPL/DaftarUser/DaftarKonfirmasi';
import ProfileCard
  from '../../components/ProfileCard/ProfileCard';

const url = 'http://ppl-berkah-backend.herokuapp.com/api/v1/administrator/list-user/';
const mahasiswaUrl = 'https://ppl-berkah-backend.herokuapp.com/api/v1/mahasiswa/';

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

class Penugasan extends Component {
  /**
   * Render the page
   * @return {Component} Component
   */
  render() {
    return (
      <div>
        <Navbar
          isAuthenticated={this.props.isAuthenticated}
          isAdmin={this.props.isAdmin} />
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
                role="Administrator"
                full_name={this.props.full_name}
                lembaga="Universitas Indonesia"
              />
            </Col>
            <Col md="8">
              <Panel>
                {this.props.halaman === 'penugasan' ? 
                  <DaftarDosen api={url}/> 
                  : this.props.halaman === 'penugasan mahasiswa' ?
                  <DaftarMahasiswa 
                    api={mahasiswaUrl}
                    selectedUser={this.props.selectedUser}
                    selectedUsername={this.props.selectedUsername}
                    selectedRole={this.props.selectedRole}
                  /> : 
                  <DaftarKonfirmasi 
                    api={url}
                    selectedUser={this.props.selectedUser}
                    selectedUsername={this.props.selectedUsername}
                    selectedRole={this.props.selectedRole}
                    selectedAddMahasiswa={this.props.selectedAddMahasiswa}
                    selectedRemoveMahasiswa={this.props.selectedRemoveMahasiswa}
                    selectedAddUsername={this.props.selectedAddUsername}
                    selectedRemoveUsername={this.props.selectedRemoveUsername}
                  />
                }
              </Panel>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Penugasan;

Penugasan.propTypes = {
  isAuthenticated: PropTypes.bool,
  isAdmin: PropTypes.bool,
};
