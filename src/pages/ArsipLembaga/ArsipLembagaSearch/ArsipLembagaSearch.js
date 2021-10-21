import React, {Component} from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

import {styled} from '@material-ui/core/styles';
import LembagaCard from './ArsipLembagaCard/ArsipLembagaCard';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';

import SearchBar from './../../OnBoarding/LembagaSearch/SearchBar/SearchBar';
import FilterTypeArsip from './../../OnBoarding/LembagaSearch/FilterType/FilterType';
import search from '../../../assets/GroupA/not-found.png';

/**
 * Lembaga and the filter component
 * @parent ArsipLembaga.js
 * @param {*} event
 * @param {*} key
 */

class ArsipLembagaSearch extends Component {
    newDate = new Date();  
    year = this.newDate.getFullYear() - 5;

    state = {
        lembagaData: [],
        filterData: {
            'tahun': [],
            'praktikum': [],
            'institusi': [],
            'tema': [],
        },
        searchBarValue: '',
        isLoaded: false,
        isAccordionExpanded: {
            'tahun': false,
            'praktikum': false,
            'institusi': false,
            'tema': false,
        },
        defaultTahun: [...Array(this.year).keys()],
        selectedTahun: [...Array(this.year).keys()]
    }
    
    URL_INSTITUSI = 'http://ppl-berkah-backend.herokuapp.com/api/v1/institusi/';
    URL_TEMA = 'http://ppl-berkah-backend.herokuapp.com/api/v1/tema/';
    URL_LEMBAGA = 'http://ppl-berkah-backend.herokuapp.com/api/v1/lembaga/';

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
        ])
            .then(axios.spread((institusi, tema) => {
            const filterData = {};
            filterData['tahun'] = [
                {id: 1, nama: (this.year - 6).toString(), isChecked: false},
                {id: 2, nama: (this.year - 5).toString(), isChecked: false},
                {id: 3, nama: (this.year - 4).toString(), isChecked: false},
                {id: 4, nama: (this.year - 3).toString(), isChecked: false},
                {id: 5, nama: (this.year - 2).toString(), isChecked: false},
                {id: 6, nama: (this.year - 1).toString(), isChecked: false},
            ];
            filterData['praktikum'] = [
                {id: 1, nama: 'Praktikum 1', isChecked: false},
                {id: 2, nama: 'Praktikum 2', isChecked: false},
            ];
            filterData['institusi'] = institusi.data;
            filterData['tema'] = tema.data;

            filterData['institusi'].forEach((obj) => {
                obj.isChecked = false;
            });

            filterData['tema'].forEach((obj) => {
                obj.isChecked = false;
            });

            this.setState({
                filterData: filterData,
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
                    selectedTahun: selectedFilters.length === 0 ? this.state.defaultTahun : selectedFilters.map(x=>+x)
                  }, this.filterList);
                }
            });

        params.set('nama', this.state.searchBarValue);

        const request = {
        params: params,
        };

        this.getLembagas(request);
    }

    /**
   * Autorun after loading the component
   */
    componentDidMount() {
        this.getFilters();
        const params = new URLSearchParams();
        const request = {
        params: params,
        };

        this.getLembagas(request);
    }

    /**
   * Get Lembaga datas from the API
   * If request is empty, returns all lembagas
   * else, returns lembagas based on the parameter
   * @param {URLSearchParams} request - Map of parameters for GET
   */

    getLembagas = (request) => {
        axios.get(this.URL_LEMBAGA, request)
          .then((res) => {
            this.setState({
              lembagaData: res.data.filter((item) => {
                return (
                  this.state.selectedTahun.includes(item.last_praktikum ? item.last_praktikum : '')
                );
              }).reverse(),
              isLoaded: true,
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
          isLoaded: true,
          error,
          });
        });
    }

    render() {   

      let insidePaper;

      const StyledPaperLembaga = styled(Paper)({
        height: '100%',
        // backgroundColor: '#F5F6F8',
        boxShadow: 'none',
        padding: '10px',
      });
  
      const StyledPaperFilter = styled(Paper)({
        backgroundColor: '#F5F6F8',
        boxShadow: 'none',
      });

      const StyledCircularProgress = styled(CircularProgress)({
        color: '#F15B15',
        marginLeft: '40%',
      });
    
      if (!this.state.isLoaded) {
        insidePaper = (
          <StyledCircularProgress/>
        );
      } else if (this.state.lembagaData.length === 0) {
        insidePaper = (
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}>
            <img className="tidak-tersedia"
              src={search} style={{width: '20%'}} alt="Tidak tersedia"></img>
            <br></br>
            <h1 style={{
              fontFamily: 'Nunito Sans',
              fontSize: '40px',
              fontWeight: 'lighter',
            }}>
              Lembaga Tidak Tersedia
            </h1>
          </div>
        );
      } else {
        insidePaper = (
          <Grid container item cols={{lg: 12, md: 10, sm: 6, xs: 3, xxs: 2}}>
            {
              this.state.lembagaData.map((data, index) => (
                <LembagaCard
                  data-testid={data.nama}
                  key={index}
                  isAdmin={this.props.isAdmin}
                  data={data}
                />
              ))
            }
          </Grid>
        );
      }

      return (
        <Grid container style={{position: 'relative'}}>
          <Grid item xs={2} sm={3}>
            <StyledPaperFilter>
              {
                Object.entries(this.state.filterData).map(([key, type]) => {
                  // console.log(key); TODO Somehow dia ngeloop dua kali
                  return (
                  <FilterTypeArsip
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
          <Grid item xs={10} sm={8}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <SearchBar searchHandler={this.searchHandler}
                  value={this.state.searchBarValue} />
              </Grid>
              <Grid item xs={12}>
                <StyledPaperLembaga>
                  {insidePaper}
                </StyledPaperLembaga>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      );
    }
}

export default ArsipLembagaSearch;

ArsipLembagaSearch.propType = {
  isAdmin: PropTypes.bool,
};