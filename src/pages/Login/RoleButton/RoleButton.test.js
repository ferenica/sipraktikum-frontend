import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import RoleButton from './RoleButton';

Enzyme.configure({adapter: new EnzymeAdapter()});

describe('Halaman detail lembaga', () => {
  it('should renders correctly (inactive)', () => {
    const component = shallow(<RoleButton
      name='Supervisor Lembaga'
      isActive={false} />);
    expect(component).toMatchSnapshot();
  });

  it('should renders correctly (inactive)', () => {
    const component = shallow(<RoleButton
      name='Supervisor Lembaga'
      isActive={true} />);
    expect(component).toMatchSnapshot();
  });
});
