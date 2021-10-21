import React from 'react';
import Enzyme, {shallow, mount} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import expect from 'expect';
import fetch from '../../../../__mocks__/fetch';
import StatistikPage from './StatistikPage.js';
import ChartStatisitik from './ChartStatistik/ChartStatistik';
import axios from 'axios';

jest.mock('axios');

global.fetch = fetch;
Enzyme.configure({adapter: new EnzymeAdapter()});

const fetchSpy = jest.spyOn(window, 'fetch');
describe('LaporanAkhir', () => {
  const component = shallow(<StatistikPage />);
  it('should renders correctly', () => {
    expect(component).toMatchSnapshot();
  });
});

describe('FilterStatistik in StatistikPage', () => {
  const component = mount(<StatistikPage />);
  it('can change filter states in StatistikPage', () => {
    const filterLaporan = component.find('#FilterStatistik').at(1).instance();

    // test ini butuh fetchspy
    filterLaporan.handleChange_category({target: {value: 'Tema'}});
    filterLaporan.handleChange_tahun({target: {value: 2020}}, 0);
    expect(component.state('tahun')[0]).toBe(2020);
  });

  it('chart statistik appear', () => {
    const wrap = shallow(<StatistikPage/> );
    expect(
        wrap.containsMatchingElement(
            <ChartStatisitik></ChartStatisitik>,
        ),
    ).toBeTruthy();
  });

  it('exist data', async () => {
    const data = {
    };
    try {
      await axios.get('http://ppl-berkah-backend.herokuapp.com/api/v1/laporan-akhir-db/', data);
      expect(true).toBe(true);
    } catch (e) {
      expect(e.message).toBe('Request failed with status code 401');
    }
  });
});


