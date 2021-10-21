import React, {Component} from 'react';
import ProfilMahasiswa from './ProfilMahasiswa';
import PropTypes from 'prop-types';

/**
 * Entry point dari profil mahasiswa
 */
class IndexProfilMahasiswa extends Component {
  /**
   * @param {*} props
   */
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }

  /**
   * Run after render
   */
  componentDidMount() {
    this.fetchDataFromServer();
  }

  /**
   * Fetch user data from backend
   */
  async fetchDataFromServer() {
    try {
      const bearer = 'Bearer ' + localStorage.getItem('login_token');
      const requestOptions = {
        method: 'GET',
        headers: {'Content-Type': 'application/json', 'Authorization': bearer},
      };
      await fetch(
          'http://ppl-berkah-backend.herokuapp.com/auth/profile/mahasiswa',
          requestOptions,
      )
          .then((response) => response.json())
          .then((data) => {
            this.setState({
              username: data.data.user.username,
              role: data.data.user.role,
              email: data.data.user.email,
              npm: data.data.npm,
              full_name: data.data.user.username,
              major: data.data.major,
            });
          });
    } catch (error) {}
  }

  /**
   * @return {Component}
   */
  render() {
    return (
      <ProfilMahasiswa
        username={this.state.username}
        role={this.state.role}
        email={this.state.email}
        full_name={this.state.full_name}
        npm={this.state.npm}
        major={this.state.major}
        isAuthenticated={this.props.isAuthenticated}
        isAdmin={this.props.isAdmin}
      />
    );
  }
}

export default IndexProfilMahasiswa;

IndexProfilMahasiswa.propTypes = {
  isAuthenticated: PropTypes.bool,
  isAdmin: PropTypes.bool,
};
