/* eslint-disable linebreak-style */

import React, {Component} from 'react';
import ProfilAdmin from './ProfilAdmin';
import Penugasan from './../Penugasan/Penugasan';

/**
 *
 */
class IndexProfilAdmin extends Component {
  /**
   *
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
  componentDidMount() {
    this.fetchDataFromServer();
  }
  /**
  * post data
  */
  async fetchDataFromServer() {
    try {
      const bearer = 'Bearer ' + localStorage.getItem('login_token');
      const requestOptions = {
        method: 'GET',
        headers: {'Content-Type': 'application/json', 'Authorization': bearer},
      };
      const awaitResponse = await fetch(
          'http://ppl-berkah-backend.herokuapp.com/auth/profile/administrator',
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
      this.props.action === "penugasan" ?
        <Penugasan
          username={this.state.username}
          email={this.state.email}
          full_name={this.state.full_name}
          isAuthenticated={this.props.isAuthenticated}
          isAdmin={this.props.isAdmin}
          halaman={'penugasan'}
        /> : this.props.action === "penugasan mahasiswa" ?
        <Penugasan
          username={this.state.username}
          email={this.state.email}
          full_name={this.state.full_name}
          isAuthenticated={this.props.isAuthenticated}
          isAdmin={this.props.isAdmin}
          selectedUser={this.props.match.params.name}
          selectedRole={this.props.match.params.role}
          selectedUsername={this.props.match.params.username}
          halaman={'penugasan mahasiswa'}
        /> : this.props.action === "konfirmasi penugasan" ?
        <Penugasan
          username={this.state.username}
          email={this.state.email}
          full_name={this.state.full_name}
          isAuthenticated={this.props.isAuthenticated}
          isAdmin={this.props.isAdmin}
          selectedUser={this.props.match.params.name}
          selectedUsername={this.props.match.params.username}
          selectedAddMahasiswa={this.props.match.params.add_mahasiswa}
          selectedRemoveMahasiswa={this.props.match.params.remove_mahasiswa}
          selectedAddUsername={this.props.match.params.add_username}
          selectedRemoveUsername={this.props.match.params.remove_username}
          selectedRole={this.props.match.params.role}
          halaman={'konfirmasi penugasan'}
        /> :
        <ProfilAdmin
          username={this.state.username}
          email={this.state.email}
          full_name={this.state.full_name}
          isAuthenticated={this.props.isAuthenticated}
          isAdmin={this.props.isAdmin}
        />
    );
  }
}
export default IndexProfilAdmin;
