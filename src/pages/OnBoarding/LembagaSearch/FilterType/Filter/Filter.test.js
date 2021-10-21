import React from 'react';
import Filter from './Filter';
import Enzyme, {shallow, mount, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({adapter: new Adapter()});

describe('Filter', () => {
  it('is implemented correctly', () => {
    const props = {
      value: {
        nama: 'Praktikum 1',
        isChecked: false,
      },
      label: 'Praktikum 1',
    };
    const wrapper = mount(<Filter {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});
