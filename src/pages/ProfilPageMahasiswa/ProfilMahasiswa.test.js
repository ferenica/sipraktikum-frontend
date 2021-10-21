import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import ProfilMahasiswa from './ProfilMahasiswa';

Enzyme.configure({adapter: new EnzymeAdapter()});

const setup = (props = {}, state = null) => {
  const wrapper = shallow(<ProfilMahasiswa {...props} />);
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
    const profileComponent = findByTestAttr(
        wrapper,
        'component-profil-mahasiswa',
    );
    expect(profileComponent.length).toBe(1);
  });
});
