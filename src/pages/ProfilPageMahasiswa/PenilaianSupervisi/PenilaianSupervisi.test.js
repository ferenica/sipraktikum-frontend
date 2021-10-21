import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';

import PenilaianSupervisi from './PenilaianSupervisi';

Enzyme.configure({adapter: new EnzymeAdapter()});

const setup = (props = {}, state = null) => {
  const wrapper = shallow(<PenilaianSupervisi {...props} />);
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
    const penilaianComponent = findByTestAttr(
        wrapper,
        'component-penilaian-supervisi',
    );
    expect(penilaianComponent.length).toBe(1);
  });
});
