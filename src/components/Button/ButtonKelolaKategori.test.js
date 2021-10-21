import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import ButtonKelolaKategori from './ButtonKelolaKategori';

Enzyme.configure({adapter: new EnzymeAdapter()});

describe('ButtonKelolaKategoriLembaga', () => {
  it('should renders correctly', () => {
    const component = shallow(<ButtonKelolaKategori />);
    expect(component).toMatchSnapshot();
  });
});
