import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import FilterStatistik from './FilterStatistik.js';

Enzyme.configure({adapter: new EnzymeAdapter()});

describe('FilterStatistik', () => {
  const wrapper = shallow(<FilterStatistik
    kategoriStatistik={jest.fn()}
    tahunStatistik={jest.fn()}
  />);
  const divedWrapper = wrapper.dive();

  it('should renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should run handleChange when an option is chosen', () => {
    const changeCategEvent = {target: {value: 'Tema'}};
    const changeTahunEvent = {target: {value: 2020}};

    divedWrapper.find('#select').at(0).simulate('change', changeCategEvent);
    divedWrapper.find('#select').at(1).simulate('change', changeTahunEvent);
    expect(divedWrapper.state().category).toBe('Tema');
    expect(divedWrapper.state().chosenTahun[0]).toBe(2020);
  });

  it('should add new Tahun form when Tambah button is clicked', () => {
    divedWrapper.find('#TambahBtn').simulate('click');
    expect(divedWrapper.state().chosenTahun.length).toBe(2);

    divedWrapper.find('#selectTahun').at(0).simulate('change', {target: {value: 2017}});
    expect(divedWrapper.state().chosenTahun[1]).toBe(2017);
  });

  it('should remove Tambah Button when 3 Tahun forms exists', () => {
    // there were 2 forms already, so only one more click event needed
    divedWrapper.find('#TambahBtn').simulate('click');

    expect(divedWrapper.state().chosenTahun.length).toBe(3);
    expect(divedWrapper.find('#TambahBtn').length).toBe(0);
  });

  it('should remove a Tahun form when Kurangi button is clicked', () => {
    divedWrapper.find('#KurangiBtn').simulate('click');

    // there were 3 forms before
    expect(divedWrapper.state().chosenTahun.length).toBe(2);
  });

  it('should not have Kurangi button when only 1 Tahun forms exist', () => {
    // there were 2 forms before
    divedWrapper.find('#KurangiBtn').simulate('click');
    expect(divedWrapper.state().chosenTahun.length).toBe(1);

    expect(divedWrapper.find('#selectTahun').length).toEqual(0);
    expect(divedWrapper.find('#KurangiBtn').length).toEqual(0);
  });
});
