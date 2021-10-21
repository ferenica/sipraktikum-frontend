/* eslint-disable valid-jsdoc */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import ListMahasiswa from '../../components/ListMahasiswa/ListMahasiswa';
import Search from '@material-ui/icons/Search';

import EmptyState from '../../components/MKPPL/State/EmptyState';

/**
 * Daftar Mahasiswa
 */
const InputSearch = styled.input`
  border: 0;
  flex: 1;
  background-color: #f2f2f2;
  margin-left: 4px;

  &:focus {
    outline: 'none';
    outline-width: 0;
  }
  &:active {
    color: #4f4f4f;
    font-weight: 600;
    color: #aaaaaa;
  }

  ::placeholder {
    color: #aaaaaa;
    font-size: 14px;
  }
`;
const SearchContainer = styled.div`
  display: inline-flex;
  /* flex: 1 1 300px; */
  position: relative;
  border-radius: 5px;
  overflow: hidden;

  background-color: #f2f2f2;
  border-style: solid;
  border: none;
  border-radius: 5px;
  color: #aaaaaa;
  padding: 8px;
  margin: 24px 0;
  width: 50%;
  height: 36px;

  @media screen and (max-width: 900px) {
    width: 100%;
  }
`;

const GrayLine = styled.div`
  border: 1px solid #dedede;
  width: 100%;
`;

/**
 * @class
 */
export default class DaftarMahasiswa extends Component {
  /**
 * @constructor
 */
  constructor(props) {
    super(props);

    this.state = {
      error: null,
      isLoaded: false,
      mahasiswaItems: [],
      filteredPraktikum: [],
      filteredUsername: [],
      items: [],
    };
  }

  /**
 *
 */
  componentDidMount() {
    this.fetchDataFromServer();
  }

  /**
 *
 */
  async fetchDataFromServer() {
    try {
      const bearer = 'Bearer ' + localStorage.getItem('login_token');
      const requestOptions = {
        method: 'GET',
        headers: {'Content-Type': 'application/json', 'Authorization': bearer},
      };
      const awaitResponse = await fetch(this.props.api, requestOptions)
          .then((response) => response.json())
          .then((data) => {
            if (this.props.type === 'koordinator-kuliah') {
              this.setState({
                MetaProducts: data,
                mahasiswaItems: data,
                filteredPraktikum: data,
                filteredUsername: data,
                init: 1,
              });
            } else {
              if (data.data !== undefined) {
                this.setState({
                  MetaProducts: data.data,
                  mahasiswaItems: data.data.mahasiswa,
                  filteredPraktikum: data.data.mahasiswa.filter(praktikum => praktikum.jenis_praktikum === this.props.praktikum),
                  filteredUsername: data.data.mahasiswa.filter(praktikum => praktikum.jenis_praktikum === this.props.praktikum),
                  init: 1,
                });
              } else {
                this.setState({
                  MetaProducts: data,
                  init: 1,
                });
              } 
            }
          });
      return await awaitResponse;
    } catch (error) {
      this.setState({
        isLoaded: true,
        error,
      });
    }
  }

  filterList = (event) => {
    let items = this.state.filteredPraktikum;
    items = items.filter((item) => {
      return (
        item.user.full_name
            .toLowerCase()
            .search(event.target.value.toLowerCase()) !== -1
      );
    });
    this.setState({filteredUsername: items});
  };

  /**
   *
   */
  renderData() {
    return (
      <>
        <form>
          <SearchContainer>
            <Search />
            <InputSearch
              type="text"
              name="searchbar"
              placeholder="Cari mahasiswa..."
              onChange={this.filterList}
            />
          </SearchContainer>
        </form>
        <GrayLine />
        <ul style={{padding: 0, listStyleType: 'none', marginBottom: 0}}>
          {
          this.state.mahasiswaItems !== undefined ?
            this.state.filteredUsername.map((item, index) => (this.props.type === 'supervisor-sekolah') ?
            // If role is supervisor sekolah
            <li key={index}>
              <ListMahasiswa
                type={this.props.type}
                nama={item.user.full_name}
                praktikum={item.user.username}
                statuskelola={item.user.email}
                urlkelola={`/spv-sekolah/penilaian/kelola/${item.user.username}`}
                urlpenilaian={`/spv-sekolah/penilaian/lihat/${item.user.username}`}
              />
            </li> :
            // If role is supervisor lembaga or koordinator kuliah
            <li key={index}>
              <ListMahasiswa
                type={this.props.type}
                nama={item.user.full_name}
                praktikum={item.jenis_praktikum}
                statuskelola={item.status_kelola}
                urlkelola=''
                urlpenilaian={`/${this.props.type}/penilaian/lihat/${item.user.username}`}
              />
            </li>,
            ) :
          this.state.MetaProducts.map((index) =>
            <li key={index}>
              <ListMahasiswa
                type={this.props.type}
                nama={index.user.full_name}
                praktikum={index.jenis_praktikum}
                statuskelola={index.status_kelola}
                urlkelola=''
                urlpenilaian={`/${this.props.type}/penilaian/lihat/${index.user.username}`}
              />
            </li>,
          )
          }
        </ul>
      </>
    );
  }

  /**
   * @return {Component}
  */
  render() {
    return this.state.init ? <div>{this.renderData()}</div> : <EmptyState/>;
  }
}

DaftarMahasiswa.propTypes = {
  api: PropTypes.string,
  type: PropTypes.string,
  praktikum: PropTypes.string,
};
