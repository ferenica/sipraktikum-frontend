import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import expect from 'expect';
import Navbar from './Navbar';

Enzyme.configure({adapter: new EnzymeAdapter()});

describe('Navbar', () => {
  const component = shallow(<Navbar />);
  it('should renders correctly', () => {
    expect(component).toMatchSnapshot();
  });
});
