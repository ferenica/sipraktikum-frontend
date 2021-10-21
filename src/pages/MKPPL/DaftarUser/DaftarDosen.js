import React, {Component} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {Link} from 'react-router-dom';

import ListDosen from '../../../components/MKPPL/ListUser/ListDosen';
import Search from '@material-ui/icons/Search';
import {StyledButton, DisabledButton} from './../../../components/MKPPL/Button/Button';

import EmptyState from './../../../components/MKPPL/State/EmptyState';
import ErrorState from './../../../components/MKPPL/State/ErrorState';
import LoadingState from './../../../components/MKPPL/State/LoadingState';
import notFoundState from './../../../components/MKPPL/State/NotFoundState';

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

// Class to get all mahasiswa from API
// and return the result as a component
export default class DaftarDosen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: null,
      isLoaded: false,
      initialItems: [],
      items: [],
      nameSearch: '',
      selectedUser: '',
      selectedRole: '',
    };
  }

  checkboxHandler = (event) => {
    this.setState({
      selectedUser: event.target.name.split(',')[0],
      selectedRole: event.target.name.split(',')[1],
      selectedUsername: event.target.name.split(',')[2]
    });
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
      const awaitResponse = await fetch(this.props.api, requestOptions)
          .then((response) => response.json())
          .then((data) => {
            const initialItems = data.data.user_list.filter(s => s.role === "Supervisor Lembaga" || s.role === "Supervisor Sekolah");
            const items = initialItems;

            this.setState({
              initialItems,
              items,
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

  filterList = (event) => {
    let items = this.state.initialItems;
    let value = event === undefined ? this.state.nameSearch : event.target.value
    items = items.filter((item) => {
      return (
        item.full_name
            .toLowerCase()
            .search(value.toLowerCase()) !== -1
      );
    });
    this.setState({
      items: items,
      nameSearch: value
    });
  };

  render() {
    const {error, isLoaded, initialItems, items} = this.state;
    if (error) {
      return <ErrorState/>;
    } else if (!isLoaded) {
      return <LoadingState/>;
    } else if (initialItems.length === 0) {
      return <EmptyState/>;
    } else {
      return (
        <>
          <ul style={{padding: 0, textAlign: 'center', fontWeight: 'bold'}}>
            Penugasan Mahasiswa
          </ul>
          <ul style={{padding: 0, textAlign: 'center', fontWeight: 'bold', fontSize: 20}}>
            Pilih Dosen atau Supervisor
          </ul>
          <form>
            <SearchContainer>
              <Search />
              <InputSearch
                type="text"
                name="searchbar"
                placeholder="Cari berdasarkan nama"
                onChange={this.filterList}
              />
            </SearchContainer>
          </form>
          <GrayLine />

          <ul style={{padding: 0, listStyleType: 'none', marginBottom: 0}}>
            {// If search input is valid, return data
            items.length ?
              items.map((item, index) =>
                <li key={index}>
                  <ListDosen
                    full_name={item.full_name}
                    role={item.role}
                    currentName={this.state.selectedUser}
                    name={[item.full_name, item.role, item.username]}
                    onChange={this.checkboxHandler}
                  />
                </li>,
              ) : // If search input is not valid, return Not Found
              notFoundState()}
          </ul>

          <div style={{position: 'relative', width: '100%', height: '60px', marginTop: '24px'}}>
            <div style={{position: 'absolute', right: '0'}}>              
              {items.length ?
                this.state.selectedUser === '' ?
                  <DisabledButton>Lanjut</DisabledButton> :
                  <Link to={{pathname: `/admin-penugasan-mahasiswa/${this.state.selectedRole}/${this.state.selectedUser}/${this.state.selectedUsername}`}}>
                    <StyledButton primary>Lanjut</StyledButton>
                  </Link> : ''
              }
            </div>
          </div>
        </>
      );
    }
  }
}

DaftarDosen.propTypes = {
  api: PropTypes.string,
  type: PropTypes.string,
};
