import React from 'react';
import Enzyme, {mount} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import RiwayatLaporanCard from '../../../pages/MKPPL/RiwayatLaporanMahasiswa/RiwayatLaporanCard';
import {MemoryRouter} from 'react-router-dom';

Enzyme.configure({adapter: new EnzymeAdapter()});

describe('test registration supervisor lembaga', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(
        <MemoryRouter>
          <RiwayatLaporanCard />
        </MemoryRouter>,
    );
  });
  it('should render card', () => {
    expect(wrapper.find(RiwayatLaporanCard)).toHaveLength(1);
  });
});
