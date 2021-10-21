import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import ArsipLembaga from './ArsipLembaga';

Enzyme.configure({adapter: new EnzymeAdapter()});
const setup = (props = {}, state = null) => {
  const wrapper = shallow(<ArsipLembaga {...props} />);
  if (state) wrapper.setState(state);
  return wrapper;
};

describe('ArsipLembaga', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = setup();
  });

  it('exist navbar', () => {
    const navbar = wrapper.find('Navbar');
    expect(navbar.length).toBe(1);
  });

  it('exist ArsipLembagaSearch', () => {
    const content = wrapper.find('ArsipLembagaSearch');
    expect(content.length).toBe(1);
  });

  it('should renders correctly', () => {
    const component = shallow(<ArsipLembaga />);
    expect(component).toMatchSnapshot();
  });
});