import React, {Component} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import convertRoleToURL from './ConvertRoleToUrl';
import ListUser from '../../../components/MKPPL/ListUser/ListUser';
import Search from '@material-ui/icons/Search';
import Paper from '@material-ui/core/Paper';

import FilterType from './../../OnBoarding/LembagaSearch/FilterType/FilterType';
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
export default class DaftarUser extends Component {
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
      selectedRole: ["Mahasiswa", "Supervisor Lembaga", "Supervisor Sekolah", "Koordinator Praktikum", "Administrator", ""],
      defaultRole: ["Mahasiswa", "Supervisor Lembaga", "Supervisor Sekolah", "Koordinator Praktikum", "Administrator", ""],
      isAccordionExpanded: {
        'filter role': false,
      },
    };
  }

  checkboxHandler = (event) => {
    const targetName = event.target.name;
    const filterData = {...this.state.filterData};

    Object.entries(filterData).forEach(([name, type]) => {
      type.forEach((filter) => {
        if (filter.nama === targetName) {
          filter.isChecked = event.target.checked;
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
          type.forEach((filter) => {
            if (filter.isChecked) {
              selectedFilters.push(filter.nama);
            }
          });
          this.setState({
            selectedRole: selectedFilters.length === 0 ? this.state.defaultRole : selectedFilters
          }, this.filterList);
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
      const awaitResponse = await fetch(this.props.api, requestOptions)
          .then((response) => response.json())
          .then((data) => {
            const initialItems = data.data.user_list;
            const items = initialItems;

            const filterData = {};
            filterData['filter role'] = [
              {id: 1, nama: 'Supervisor Lembaga', isChecked: false},
              {id: 2, nama: 'Supervisor Sekolah', isChecked: false},
              {id: 3, nama: 'Koordinator Praktikum', isChecked: false},
              {id: 4, nama: 'Mahasiswa', isChecked: false},
              {id: 5, nama: 'Administrator', isChecked: false},
            ];

            this.setState({
              initialItems,
              items,
              isLoaded: true,
              filterData: filterData
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
            .search(value.toLowerCase()) !== -1 &&
        this.state.selectedRole.includes(item.role ? item.role : '')
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
          <StyledPaperFilter>
            {
              Object.entries(this.state.filterData).map(([key, type]) => {
                // console.log(key); TODO Somehow dia ngeloop dua kali
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
              })
            }
          </StyledPaperFilter>
          <GrayLine />

          <ul style={{padding: 0, listStyleType: 'none', marginBottom: 0}}>
            {// If search input is valid, return data
            items.length ?
              items.map((item, index) =>
                <li key={index}>
                  <ListUser
                    full_name={item.full_name}
                    role={item.role}
                    lembaga={item.lembaga}
                    is_active={item.is_active}
                    urlKelola={`/admin/kelola/${convertRoleToURL(item.role)}/${item.username}`}
                    urlDetail={`/admin/detail/${convertRoleToURL(item.role)}/${item.username}`}
                  />
                </li>,
              ) : // If search input is not valid, return Not Found
              notFoundState()}
          </ul>
        </>
      );
    }
  }
}

DaftarUser.propTypes = {
  api: PropTypes.string,
  type: PropTypes.string,
};
