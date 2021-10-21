import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import ProfilAdmin from './ProfilAdmin';
import EnzymeAdapter from 'enzyme-adapter-react-16';

Enzyme.configure({adapter: new EnzymeAdapter()});

describe('Test ProfilAdmin has components', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<ProfilAdmin />);
  });

  it('exist navbar', () => {
    const navbar = wrapper.find('Navbar');
    expect(navbar.length).toBe(1);
  });

  it('exists ProfileCard', () => {
    expect(wrapper.find('ProfileCard').length).toBe(1);
  });

  it('exists Tabs', () => {
    expect(wrapper.find('TabsAdmin').length).toBe(1);
  });
});
