import React, {Component} from 'react';
import styled from 'styled-components';

import DetailDosen from './DetailDosen';
import DetailMahasiswa from './DetailMahasiswa';
import DetailSupervisorLembaga from './DetailSupervisorLembaga';

import Loader from './../../../assets/MKPPL/Loader.gif';

const URL = 'http://ppl-berkah-backend.herokuapp.com/api/v1/administrator/kelola-user/detail/';

const LoaderGif = styled.img`
  display: block;
  margin-top: 48px;
  margin-bottom: 16px;
  margin-left: auto;
  margin-right: auto;
  height: 16vh;
`;

// Class to get data from API based on username
class GetDataUser extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: null,
      isLoaded: false,
      dataUser: [],
    };
  }

  componentDidMount() {
    this.fetchDataFromServer();
  }

  async fetchDataFromServer() {
    try {
      const bearer = 'Bearer ' + localStorage.getItem('login_token');
      const requestOptions = {
        method: 'GET',
        headers: {'Content-Type': 'application/json', 'Authorization': bearer},
      };
      const awaitResponse = await fetch(
          URL + this.props.role + '/' + this.props.username + '/',
          requestOptions,
      )
          .then((response) => response.json())
          .then((data) => {
            const dataUser = data.data;

            this.setState({
              dataUser,
              isLoaded: true,
            });
          });
      return await awaitResponse;
    } catch (error) {
      this.setState({
        isLoaded: true,
        error,
      });
    }
  }

  getNamaLembaga(selectedLembaga) {
    this.setState({namaLembaga: selectedLembaga});
  }

  render() {
    const {
      error,
      isLoaded,
      dataUser,
    } = this.state;

    if (error) {
      return (
        <div>
          Mohon maaf terjadi kesalahan.
          <br />
          (Error: {error.message})
        </div>
      );
    } else if (!isLoaded) {
      return (
        <>
          <LoaderGif src={Loader} />
        </>
      );
    } else {
      return (
        <>
          {(() => {
            switch (this.props.role) {
              case 'mahasiswa':
                return <DetailMahasiswa data={dataUser}/>;
              case 'supervisor-lembaga':
                return <DetailSupervisorLembaga data={dataUser}/>;
              default:
                return <DetailDosen data={dataUser} role={this.props.role}/>;
            }
          })()}
        </>
      );
    }
  }
}

// Function for return a page for dynamic routing for 'Detail'
export default function DetailUser({match, location}) {
  const {
    params: {role, username},
  } = match;

  return (
    <>
      <GetDataUser username={username} role={role}/>
    </>
  );
}
