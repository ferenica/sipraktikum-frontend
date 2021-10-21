import React from 'react';
import Enzyme, {mount} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import CardPratikum from './CardPraktikum1';
import {MemoryRouter} from 'react-router-dom';

Enzyme.configure({adapter: new EnzymeAdapter()});

describe('test registration supervisor lembaga', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(
        <MemoryRouter>
          <CardPratikum />
        </MemoryRouter>,
    );
  });
  it('should render card', () => {
    expect(wrapper.find(CardPratikum)).toHaveLength(1);
  });
});
