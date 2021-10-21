import React, {Component} from 'react';
import ProfilKoorKuliah from './ProfilKoorKuliah';
import PropTypes from 'prop-types';

/**
 * Page Dashboard Koordinator Kuliah
 * Base component for authorization
 */
class IndexProfilKoorKuliah extends Component {
  /**
   * @constructor
   * @param {*} props
   */
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }

  /**
   *
   */
  async componentDidMount() {
    try {
      const bearer = 'Bearer ' + localStorage.getItem('login_token');
      const requestOptions = {
        method: 'GET',
        headers: {'Content-Type': 'application/json', 'Authorization': bearer},
      };
      const awaitResponse = await fetch('http://ppl-berkah-backend.herokuapp.com/auth/profile/koordinator-kuliah',
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
      return awaitResponse;
    } catch (error) {
    }
  }

  /**
   * @return {Component}
   */
  render() {
    return (
      <ProfilKoorKuliah
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
export default IndexProfilKoorKuliah;

IndexProfilKoorKuliah.propTypes = {
  isAuthenticated: PropTypes.bool,
  isAdmin: PropTypes.bool,
  isDosen: PropTypes.bool,
};
