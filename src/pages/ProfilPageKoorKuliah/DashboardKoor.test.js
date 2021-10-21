import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import {screen} from '@testing-library/dom';
import DashboardKoor from './DashboardKoor';
import LineChart from './LineChart';
import DonutChart from './DonutChart';

jest.mock('axios');

Enzyme.configure({adapter: new EnzymeAdapter()});


describe('dashboard koor praktikum page', () => {
  it('exist dashboard koor', () => {
    const wrapper = shallow(<DashboardKoor/>);
    expect(wrapper).toMatchSnapshot();
  });

  // it('text appear', () => {
  //   const wrap = shallow(<DashboardKoor/> );
  //   expect(wrap.text()).toEqual('<DonutChart />Grafik Ketepatan Waktu Pengumpulan Laporan<LineChart />');
  // });
  it('donut chart appear', () => {
    const wrap = shallow(<DashboardKoor/> );
    expect(
        wrap.containsMatchingElement(
            <DonutChart></DonutChart>,
        ),
    ).toBeTruthy();
  });
  // it('line chart appear', () => {
  //   const wrap = shallow(<DashboardKoor/> );
  //   expect(
  //       wrap.containsMatchingElement(
  //           <LineChart></LineChart>,
  //       ),
  //   ).toBeTruthy();
  // });
  it('no button exist', () => {
    const submitButton = screen.queryByText('submit');
    expect(submitButton).toBeNull();
  });
});

