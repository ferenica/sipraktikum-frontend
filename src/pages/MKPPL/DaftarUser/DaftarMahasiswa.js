import React, {Component} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {Link} from 'react-router-dom';

import ListMahasiswa from '../../../components/MKPPL/ListUser/ListMahasiswa';
import Search from '@material-ui/icons/Search';
import Paper from '@material-ui/core/Paper';
import {Container, Row, Col} from 'react-bootstrap';
import {StyledButton, DisabledButton} from './../../../components/MKPPL/Button/Button';

import FilterType from './../../OnBoarding/LembagaSearch/FilterType/FilterType';
import EmptyState from './../../../components/MKPPL/State/EmptyState';
import ErrorState from './../../../components/MKPPL/State/ErrorState';
import LoadingState from './../../../components/MKPPL/State/LoadingState';
import notFoundState from './../../../components/MKPPL/State/NotFoundState';

const Wrapper = styled(Container)`
  padding: 16px;
  overflow: auto;
`;

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
  width: 100%;
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
export default class DaftarMahasiswa extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: null,
      isLoaded: false,
      initialItems: [],
      items: [],
      nameSearch: '',
      roleSearch: '',
      filterData: [],
      selectedPeriode: [],
      defaultPeriode: [],
      selectedAddMahasiswa: [],
      selectedAddUsername: [],
      selectedRemoveMahasiswa: [],
      selectedRemoveUsername: [],
      isAccordionExpanded: {
        'filter periode': false
      },
    };
  }

  namaSupervisorHandler = (item) => {
    if (item === null) {
      return '';
    } else {
      return item.user.full_name;
    }
  }

  statusHandler = (item) => {
    return item === null || item.user.full_name === this.props.selectedUser;
  }

  namaDosenHandler = (item) => {
    let name = ''
    if (this.props.selectedRole === 'Supervisor Lembaga') {
      name = this.namaSupervisorHandler(item.supervisor_lembaga);
    } else if (this.props.selectedRole === 'Supervisor Sekolah') {
      name = this.namaSupervisorHandler(item.supervisor_sekolah);
    } else if (this.props.selectedRole === 'Koordinator Praktikum') {
      // name = this.namaSupervisorHandler(item.koordinator_praktikum);
      name = '';
    }
    return name;
  }

  checkNamaHandler = (item) => {
    return this.namaDosenHandler(item) === this.props.selectedUser;
  }

  checkSelectedMahasiswaLength = (item) => {
    return item.length === 0 ? 'Empty' : item
  }

  checkSelectedMahasiswa = () => {
    const addMahasiswa = this.checkSelectedMahasiswaLength(this.state.selectedAddMahasiswa);
    const removeMahasiswa = this.checkSelectedMahasiswaLength(this.state.selectedRemoveMahasiswa);
    const addUsername = this.checkSelectedMahasiswaLength(this.state.selectedAddUsername);
    const removeUsername = this.checkSelectedMahasiswaLength(this.state.selectedRemoveUsername);
    return addMahasiswa + '/' + removeMahasiswa + '/' + addUsername + '/' + removeUsername;
  }
  
  checkboxHandler = (event) => {
    const targetName = event.target.name;
    const filterData = {...this.state.filterData};

    Object.entries(filterData).forEach(([name, type]) => {
      type.forEach((filter) => {
        if (name === 'filter periode') {
          if (filter.nama === targetName) {
            filter.isChecked = event.target.checked;
          }
        } else {
          if (filter.user.full_name === targetName) {
            filter.isChecked = event.target.checked;
          }
        }
      });
    });

    this.setState({
      filterData: filterData,
    }, () => this.updateData());
  }

  checkboxAllHandler = () => {
    const filterData = {...this.state.filterData};

    Object.entries(filterData).forEach(([name, type]) => {
      type.forEach((filter) => {
        if (name === 'filter mahasiswa') {
          if (this.props.selectedRole === 'Supervisor Lembaga') {
            filter.isChecked = this.statusHandler(filter.supervisor_lembaga);
          } else if (this.props.selectedRole === 'Supervisor Sekolah') {
            filter.isChecked = this.statusHandler(filter.supervisor_sekolah);
          } else if (this.props.selectedRole === 'Koordinator Praktikum') {
            // filter.isChecked = this.statusHandler(filter.koordinator_praktikum);
            filter.isChecked = true;
          }
        }
      });
    });

    this.setState({
      filterData: filterData,
    }, () => this.updateData());
  }

  updateData = () => {
    Object.entries(this.state.filterData)
        .map(([name, type]) => {
          const selectedFilters = [];
          const selectedFiltersUsername = [];
          const selectedRemoved = [];
          const selectedRemovedUsername = [];
          type.forEach((filter) => {
            if (name === 'filter periode' && filter.isChecked) {
              selectedFilters.push(filter.nama);
            } else if (name === 'filter mahasiswa' && filter.isChecked !== filter.defaultCheck) {
              const namaNpm = filter.npm + ' - ' + filter.user.full_name;
              if (filter.isChecked === true) {
                selectedFilters.push(namaNpm);
                selectedFiltersUsername.push(filter.user.username);
              } else {
                selectedRemoved.push(namaNpm);
                selectedRemovedUsername.push(filter.user.username);
              }
            }
          });
          if (name === 'filter periode') {
            this.setState({
              selectedPeriode: selectedFilters.length === 0 ? this.state.defaultPeriode : selectedFilters
            }, this.filterList);
          } else if (name === 'filter mahasiswa'){
            this.setState({
              selectedAddMahasiswa: selectedFilters,
              selectedAddUsername: selectedFiltersUsername,
              selectedRemoveMahasiswa: selectedRemoved,
              selectedRemoveUsername: selectedRemovedUsername
            }, this.filterList);
          }
        });
  }

  expandHandler = (event, key) => {
    const isExpanded = this.state.isAccordionExpanded[key];
    this.setState({
      isAccordionExpanded: {
        ...this.state.isAccordionExpanded,
        [key]: !isExpanded,
      },
    });
  };

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
      const awaitResponse = await Promise.all([
        fetch(this.props.api, requestOptions).then(response => response.json()),
        fetch("https://ppl-berkah-backend.herokuapp.com/api/v1/periode").then(response => response.json())
      ])
          .then((response) => {
            const initialItems = response[0];
            const periodeData = response[1].data;
            const items = initialItems;

            const filterData = {};
            filterData['filter periode'] = periodeData.map(nama => ({nama, isChecked: false})).reverse();
            filterData['filter mahasiswa'] = initialItems;
            
            filterData['filter mahasiswa'].forEach((obj) => {
              obj.isChecked = (this.checkNamaHandler(obj));
              obj.defaultCheck = (this.checkNamaHandler(obj));
            });

            this.setState({
              initialItems,
              items,
              isLoaded: true,
              filterData: filterData,
              selectedPeriode: periodeData,
              defaultPeriode: periodeData
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
        item.user.full_name
            .toLowerCase()
            .search(value.toLowerCase()) !== -1 &&
        this.state.selectedPeriode.includes(item.periode.nama ? item.periode.nama : '')
      );
    });
    this.setState({
      items: items,
      nameSearch: value
    });
  };

  render() {
    const StyledPaperFilter = styled(Paper)({
      backgroundColor: '#F5F6F8',
      boxShadow: 'none',
      display: 'inline-block',
    });
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
            {'Penugasan ' + this.props.selectedRole}
          </ul>
          <ul style={{padding: 0, textAlign: 'center', fontWeight: 'bold', fontSize: 20}}>
            Pilih Mahasiswa
          </ul>
          <Wrapper>
            <Row style={{height: '70px'}}>
              <Col sm='9' style={{padding: '0', paddingTop: '0.3vw'}}>
              <SearchContainer>
                <Search />
                <InputSearch
                  type="text"
                  name="searchbar"
                  placeholder="Cari berdasarkan nama"
                  onChange={this.filterList}
                />
              </SearchContainer>
              </Col>
              <Col sm='3' style={{paddingTop: '0.3vw'}}>
                <StyledButton secondary style={{marginTop: '1vw'}} onClick={this.checkboxAllHandler}>Pilih Semua</StyledButton>
              </Col>
            </Row>
          </Wrapper>
          <StyledPaperFilter>
            {
              Object.entries(this.state.filterData).map(([key, type]) => {
                // console.log(key); TODO Somehow dia ngeloop dua kali
                if (key === "filter periode") {
                  return (
                    <FilterType
                      key={key}
                      name={key}
                      type={type}
                      checkboxHandler={this.checkboxHandler}
                      expandHandler={this.expandHandler}
                      isExpanded={this.state.isAccordionExpanded[key]}
                    />
                  );
                }
              })
            }
          </StyledPaperFilter>
          <GrayLine />

          <ul style={{padding: 0, listStyleType: 'none', marginBottom: 0}}>
            {// If search input is valid, return data
            items.length ?
              items.map((item, index) =>
                <li key={index}>
                  <ListMahasiswa
                    full_name={item.user.full_name}
                    npm={item.npm}
                    dosen={this.namaDosenHandler(item)}
                    selectedDosen={this.props.selectedUser}
                    name={item.user.full_name}
                    checked={item.isChecked}
                    checkboxHandler={this.checkboxHandler}
                  />
                </li>,
              ) : // If search input is not valid, return Not Found
              notFoundState()}
          </ul>

          <div style={{position: 'relative', width: '100%', height: '60px', marginTop: '24px'}}>
            <div style={{position: 'absolute', right: '0'}}>
              <Link to={'/admin-penugasan-dosen/'}>
                <StyledButton secondary>Kembali</StyledButton>
              </Link>
              {items.length ?
                this.state.selectedAddMahasiswa.length === 0 && this.state.selectedRemoveMahasiswa.length === 0 ?
                  <DisabledButton>Lanjut</DisabledButton> :
                  <Link to={`/admin-konfirmasi-penugasan/${this.props.selectedRole}/${this.props.selectedUser}/${this.props.selectedUsername}/${this.checkSelectedMahasiswa()}`}>
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

DaftarMahasiswa.propTypes = {
  api: PropTypes.string,
  type: PropTypes.string,
};
