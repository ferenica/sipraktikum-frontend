import React from 'react';
import Enzyme, {shallow, mount} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import Tab from '@material-ui/core/Tab';

import MahasiswaTabs from './MahasiswaTabs';

Enzyme.configure({adapter: new EnzymeAdapter()});

const setup = (props = {}, state = null) => {
  const wrapper = shallow(<MahasiswaTabs {...props} />);
  if (state) wrapper.setState(state);
  return wrapper;
};
const findByTestAttr = (wrapper, val) => {
  return wrapper.find(`[data-test='${val}']`);
};
describe('test registration supervisor lembaga', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = setup();
  });
  it('renders without error', () => {
    const appBarComponent = findByTestAttr(wrapper, 'component-appbar');
    expect(appBarComponent.length).toBe(1);
  });
});
describe('functional test input', () => {
  let component;
  beforeEach(() => {
    component = mount(<MahasiswaTabs />);
  });
  it('Should capture fullname correctly onChange', async () => {
    const tab = component.find(Tab).at(0);
    tab.simulate('click');
  });
});
