import React from 'react';
import ReactDOM from 'react-dom';
import Enzyme, {shallow} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import OnBoarding from './OnBoarding';

Enzyme.configure({adapter: new EnzymeAdapter()});
const setup = (props = {}, state = null) => {
  const wrapper = shallow(<OnBoarding {...props} />);
  if (state) wrapper.setState(state);
  return wrapper;
};

describe('Test on-boarding page has components', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = setup();
  });

  it('exist navbar', () => {
    const navbar = wrapper.find('Navbar');
    expect(navbar.length).toBe(1);
  });

  it('exist LembagaSearch', () => {
    const content = wrapper.find('LembagaSearch');
    expect(content.length).toBe(1);
  });

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<OnBoarding></OnBoarding>, div);
  });
});
