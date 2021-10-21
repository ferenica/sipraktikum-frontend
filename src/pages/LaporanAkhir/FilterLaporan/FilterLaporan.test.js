import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import FilterLaporan from './FilterLaporan';

Enzyme.configure({adapter: new EnzymeAdapter()});

describe('FilterLaporan', () => {
  const wrapper = shallow(<FilterLaporan
    temaLaporan={jest.fn()}
    institusiLaporan={jest.fn()}
    tahunLaporan={jest.fn()}
  />);

  it('should renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  const divedWrapper = wrapper.dive();

  it('should run handleChange when an option is chosen', () => {
    const event = {target: {value: 'Lingkungan'}};

    divedWrapper.find('#select').at(0).simulate('change', event);
    divedWrapper.find('#select').at(1).simulate('change', event);
    divedWrapper.find('#select').at(2).simulate('change', event);
    expect(divedWrapper.state().tema).toBe('Lingkungan');
  });

  it('should run KelolaDialog when "Kelola" option is chosen', () => {
    expect(divedWrapper.find('#KelolaDialog').length).toBe(0);

    const event = {target: {value: '+'}};
    divedWrapper.find('#select').at(0).simulate('change', event);
    divedWrapper.find('#select').at(1).simulate('change', event);
    expect(divedWrapper.find('#KelolaDialog').length).toBe(1);
  });

  it('should be able to close KelolaDialog', () => {
    divedWrapper.find('#KelolaDialog').props().closeKelola();
    expect(divedWrapper.find('#KelolaDialog').length).toBe(0);
  });
});
