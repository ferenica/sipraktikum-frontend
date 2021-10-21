import React, {Component} from 'react';
import ProfilSupervisorLembaga from './ProfilSupervisorLembaga';
import PropTypes from 'prop-types';

/**
 * Entry point dari profil supervisor lembaga
 */
class IndexProfilSupervisorLembaga extends Component {
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
   * Run after mounting component
   */
  async componentDidMount() {
    // this.fetchDataFromServer();
    try {
      const bearer = 'Bearer ' + localStorage.getItem('login_token');
      const requestOptions = {
        method: 'GET',
        headers: {'Content-Type': 'application/json', 'Authorization': bearer},
      };
      const awaitResponse = await fetch(
          'http://ppl-berkah-backend.herokuapp.com/auth/profile/supervisor-lembaga',
          requestOptions,
      )
          .then((response) => response.json())
          .then((data) => {
            this.setState({
              username: data.data.user.username,
              email: data.data.user.email,
              full_name: data.data.user.full_name,
              lembaga: data.data.lembaga.nama,
              jabatan: data.data.jabatan,
            });
          });
      return await awaitResponse;
    } catch (error) {

    }
  }

  /**
   * @return {Component}
   */
  render() {
    return (
      <ProfilSupervisorLembaga
        username={this.state.username}
        email={this.state.email}
        full_name={this.state.full_name}
        lembaga={this.state.lembaga}
        jabatan={this.state.jabatan}
        isAuthenticated={this.props.isAuthenticated}
        isAdmin={this.props.isAdmin}
      />
    );
  }
}

export default IndexProfilSupervisorLembaga;

IndexProfilSupervisorLembaga.propTypes = {
  isAuthenticated: PropTypes.bool,
  isAdmin: PropTypes.bool,
};
