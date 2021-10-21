import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import LoadingState from '../../../components/MKPPL/State/LoadingState';

class LoginSivitas extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: this.props.match.params.token,
      loading: false,
    };
  }
  componentDidMount() {
    localStorage.removeItem('login_token');
    localStorage.removeItem('username');
    localStorage.removeItem('role');
    this.setLocalStorage();
  }
  async setLocalStorage() {
    await this.fetchDataFromServer();
    localStorage.setItem('role', this.state.role);
    localStorage.setItem('login_token', this.state.token);
    localStorage.setItem('username', this.state.username);
    if (this.state.role === 'Mahasiswa') {
      this.props.history.push('/mahasiswa');
    } else if (this.state.role === 'Supervisor Sekolah') {
      this.props.history.push('/spv-sekolah');
    } else if (this.state.role === 'Koordinator Praktikum') {
      this.props.history.push('/koordinator-kuliah');
    } else if (this.state.role === 'Administrator') {
      this.props.history.push('/admin');
    } else {
      this.props.history.push('/not-login');
    }
  }
  /**
   * post data
   */
  async fetchDataFromServer() {
    try {
      const bearer = 'Bearer ' + this.state.token;
      const requestOptions = {
        method: 'GET',
        headers: {'Content-Type': 'application/json', 'Authorization': bearer},
      };
      await fetch(
          'http://ppl-berkah-backend.herokuapp.com/auth/profile/user',
          requestOptions,
      )
          .then((response) => response.json())
          .then((data) => {
            this.setState({
              role: data.data.role,
              username: data.data.username,
              loading: true,
            });
          });
    } catch (error) {}
  }

  render() {
    return (
      <div data-test="component-login-sivitas-login">
        <LoadingState/>
      </div>
    );
  }
}
export default withRouter(LoginSivitas);
