import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';

import {render, fireEvent} from '@testing-library/react';
import {getByTestId} from '@testing-library/dom';

import ProfileBtn from './ProfileBtn';

Enzyme.configure({adapter: new EnzymeAdapter()});

describe('ProfileBtn', () => {
  it('should renders correctly', () => {
    const component = shallow(<ProfileBtn />);
    expect(component).toMatchSnapshot();
  });
  test('profilebtn clicked correctly', () => {
    const dom = render(<ProfileBtn />);

    const muiBtn = getByTestId(dom.container, 'profbtn');
    fireEvent.click(muiBtn);
  });
});
