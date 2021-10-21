import React from 'react';
import Enzyme, {mount} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import CardPratikum2 from './CardPraktikum2';
import {MemoryRouter} from 'react-router-dom';

Enzyme.configure({adapter: new EnzymeAdapter()});

describe('test registration supervisor lembaga', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(
        <MemoryRouter>
          <CardPratikum2 />
        </MemoryRouter>,
    );
  });
  it('should render card', () => {
    expect(wrapper.find(CardPratikum2)).toHaveLength(1);
  });
});
