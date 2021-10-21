import React, {Component} from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Search from '@material-ui/icons/Search';
import styled from 'styled-components';

import FilterType from './../../OnBoarding/LembagaSearch/FilterType/FilterType';
import TabelArsip from './../TabelArsip/TabelArsip';

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

/**
 * Lembaga and the filter component
 * @parent ArsipLaporan.js
 * @param {*} event
 * @param {*} key
 */

class ArsipLaporanSearch extends Component {
  newDate = new Date();  
  year = this.newDate.getFullYear() - 5;

  state = {
    selectedPeriode: [],
    defaultPeriode: [],
    selectedPraktikum: [],
    defaultPraktikum: [],
    selectedInstitusi: [],
    defaultInstitusi: [],
    selectedTema: [],
    defaultTema: [],
    selectedLaporanData: [],
    defaultLaporanData: [],
    filterData: {
      'tahun': [],
      'praktikum': [],
      'institusi': [],
      'tema': [],
    },
    searchBarValue: '',
    isAccordionExpanded: {
      'tahun': false,
      'praktikum': false,
      'institusi': false,
      'tema': false,
    },
  }
  
  URL_INSTITUSI = 'http://ppl-berkah-backend.herokuapp.com/api/v1/institusi/';
  URL_TEMA = 'http://ppl-berkah-backend.herokuapp.com/api/v1/tema/';
  URL_LAPORAN_AKHIR = 'https://ppl-berkah-backend.herokuapp.com/api/v1/laporan-akhir-db/';
  URL_PERIODE = 'https://ppl-berkah-backend.herokuapp.com/api/v1/periode';

  expandHandler = (event, key) => {
    const isExpanded = this.state.isAccordionExpanded[key];
    this.setState({
      isAccordionExpanded: {
      ...this.state.isAccordionExpanded,
      [key]: !isExpanded,
      },
    });
  };

  /**
 * Get filter data from the API
 */
  getFilters = () => {
    axios.all([
    axios.get(this.URL_INSTITUSI),
    axios.get(this.URL_TEMA),
    axios.get(this.URL_PERIODE),
    ])
      .then(axios.spread((institusi, tema, tahun) => {
        const filterData = {};
        filterData['praktikum'] = [
          {id: 1, nama: 'Praktikum 1', isChecked: false},
          {id: 2, nama: 'Praktikum 2', isChecked: false},
        ];
        filterData['institusi'] = institusi.data;
        filterData['tema'] = tema.data;
        filterData['tahun'] = tahun.data.data.map(nama => ({nama, isChecked: false})).reverse();

        filterData['institusi'].forEach((obj) => {
          obj.isChecked = false;
        });

        filterData['tema'].forEach((obj) => {
          obj.isChecked = false;
        });

        this.setState({
          filterData: filterData,
          defaultPeriode: tahun.data.data,
          defaultPraktikum: ['Praktikum 1', 'Praktikum 2'],
          defaultInstitusi: institusi.data.map(n => n.nama),
          defaultTema: tema.data.map(n => n.nama)
        });
      }));
  }

  /**
   * Handle checkbox onchange
   * @param {*} event - event of the checkbox field
   */
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

  /**
   * Handle search bar onchange
   * @param {*} event - event of the search bar
   */
  searchHandler = (event) => {
      this.setState({
      searchBarValue: event.target.value,
      }, () => this.updateData());
  }

  /**
   * Update the states if eventHandler is run
   */
  updateData = () => {
    const params = new URLSearchParams();

    Object.entries(this.state.filterData)
      .map(([name, type]) => {
        const selectedFilters = [];
        type.forEach((filter) => {
          if (filter.isChecked) {
            selectedFilters.push(filter.nama);
          }
        });

        // Ensure that the URL has no empty parameters
        if (selectedFilters.length > 0) {
          params.set(name, selectedFilters.toString());
        }

        if (name === "tahun") {
          this.setState({
            selectedPeriode: selectedFilters.length === 0 ? this.state.defaultPeriode : selectedFilters
          }, this.filterList);
        } else if (name === "praktikum") {
          this.setState({
            selectedPraktikum: selectedFilters.length === 0 ? this.state.defaultPraktikum : selectedFilters
          }, this.filterList);
        } else if (name === "institusi") {
          this.setState({
            selectedInstitusi: selectedFilters.length === 0 ? this.state.defaultInstitusi : selectedFilters
          }, this.filterList);
        } else if (name === "tema") {
          this.setState({
            selectedTema: selectedFilters.length === 0 ? this.state.defaultTema : selectedFilters
          }, this.filterList);
        }
      });
  }

  filterList = (event) => {
    let items = this.state.defaultLaporanData;
    let value = event === undefined ? this.state.searchBarValue : event.target.value
    items = items.filter((item) => {
      return (
        (item.laporan_akhir[0].nama_laporan
          .toLowerCase()
          .search(value.toLowerCase()) !== -1 ||
        item.mahasiswa.user.full_name
          .toLowerCase()
          .search(value.toLowerCase()) !== -1) &&
        this.state.selectedPeriode.includes(item.mahasiswa.periode.nama) &&
        this.state.selectedPraktikum.includes(item.laporan_akhir[0].jenis_praktikum) &&
        this.state.selectedInstitusi.includes(item.mahasiswa.supervisor_lembaga.lembaga.institusi.nama) &&
        this.state.selectedTema.includes(item.mahasiswa.supervisor_lembaga.lembaga.tema.nama)
      );
    });
    this.setState({
      selectedLaporanData: items,
      searchBarValue: value
    });
  };

  componentDidMount() {
    this.getFilters();
    this.getLembagas();
  }

  async getLembagas() {
    axios.get(this.URL_LAPORAN_AKHIR)
      .then((res) => {
        const item = res.data.map(obj => obj.laporan_akhir.map(laporan_akhir => ({mahasiswa: obj.mahasiswa, laporan_akhir}))).flat();
        const markedItem = item.filter(item => item.laporan_akhir.skor_laporan_lembaga >= 0);
        this.setState({
          defaultLaporanData: markedItem,
          selectedLaporanData: markedItem,
        });
      })
    .catch((error) => {
    // TODO
      if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log('Error', error.message);
      }
      console.log(error.config);
      this.setState({
        error,
      });
    });
  }

  render() {

    const StyledPaperFilter = styled(Paper)({
      backgroundColor: '#F5F6F8',
      boxShadow: 'none',
      width: '80%',
    });

    return (
      <Grid container style={{position: 'relative'}}>
        <Grid item xs={2} sm={3}>
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
        </Grid>
        <Grid item xs={10} sm={9}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
                <SearchContainer>
                <Search />
                <InputSearch
                  type="text"
                  name="searchbar"
                  placeholder="Cari berdasarkan nama mahasiswa atau judul laporan"
                  onChange={this.searchHandler}
                />
              </SearchContainer>
            </Grid>
            <Grid item xs={12}>
              <TabelArsip data={this.state.selectedLaporanData}/>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

export default ArsipLaporanSearch;

ArsipLaporanSearch.propType = {
  isDosen: PropTypes.bool,
};