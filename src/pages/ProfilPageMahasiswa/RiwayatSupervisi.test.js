import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';

import RiwayatSupervisi from './RiwayatSupervisi';

Enzyme.configure({adapter: new EnzymeAdapter()});

const setup = (props = {}, state = null) => {
  const wrapper = shallow(<RiwayatSupervisi {...props} />);
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
    const riwayatComponent = findByTestAttr(
        wrapper,
        'component-riwayat-supervisi',
    );
    expect(riwayatComponent.length).toBe(1);
  });
});
