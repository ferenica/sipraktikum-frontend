import React, {Component} from 'react';
import ProfilSupervisorSekolah from './ProfilSupervisorSekolah';
import PropTypes from 'prop-types';

/**
 * Entry point dari profile supervisor sekolah
 */
class IndexProfilSupervisorSekolah extends Component {
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
   * Fetch user data
   */
  async fetchDataFromServer() {
    try {
      const bearer = 'Bearer ' + localStorage.getItem('login_token');
      const requestOptions = {
        method: 'GET',
        headers: {'Content-Type': 'application/json', 'Authorization': bearer},
      };
      const awaitResponse = await fetch(
          'http://ppl-berkah-backend.herokuapp.com/auth/profile/supervisor-sekolah',
          requestOptions,
      )
          .then((response) => response.json())
          .then((data) => {
            this.setState({
              username: data.data.user.username,
              email: data.data.user.email,
              full_name: data.data.user.full_name,
            });
          });
      return await awaitResponse;
    } catch (error) {
      console.log(error);
    }
  }

  /**
   * @return {Component}
   */
  render() {
    return (
      <ProfilSupervisorSekolah
        username={this.state.username}
        email={this.state.email}
        full_name={this.state.full_name}
        isAuthenticated={this.props.isAuthenticated}
        isAdmin={this.props.isAdmin}
        isDosen={this.props.isDosen}
      />
    );
  }
}

export default IndexProfilSupervisorSekolah;

IndexProfilSupervisorSekolah.propTypes = {
  isAuthenticated: PropTypes.bool,
  isAdmin: PropTypes.bool,
  isDosen: PropTypes.bool,
};
