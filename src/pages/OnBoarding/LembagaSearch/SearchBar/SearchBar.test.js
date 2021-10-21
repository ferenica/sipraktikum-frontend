import React from 'react';
import Enzyme, {shallow, mount} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import SearchBar from './SearchBar';

Enzyme.configure({adapter: new EnzymeAdapter()});

describe('Test SearchBar has components', () => {
  it('has', () => {
    const wrapper = mount(<SearchBar />);
    expect(wrapper).toMatchSnapshot();
  });
});
