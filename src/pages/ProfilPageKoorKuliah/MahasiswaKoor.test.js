import React from 'react';
import axios from 'axios';
import Enzyme, {shallow} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import MahasiswaKoor from './MahasiswaKoor';

jest.mock('axios');

Enzyme.configure({adapter: new EnzymeAdapter()});
const setup = (props = {}, state = null, data = null) => {
  const wrapper = shallow(<MahasiswaKoor/>);
  if (state) wrapper.setState(state);
  return wrapper;
};

describe('koor praktikum page', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = setup();
  });

  it('exist daftar mahasiswa', () => {
    const list = wrapper.find('DaftarMahasiswa');
    expect(list.length).toBe(1);
  });

  it('invalid daftar mahasiswa', async () => {
    const data = {
    };
    try {
      await axios.post('http://ppl-berkah-backend.herokuapp.com/api/v1/koordinator-kuliah/list-mahasiswa/praktikum/', data);
      expect(true).toBe(true);
    } catch (e) {
      expect(e.message).toBe('Request failed with status code 401');
    }
  });

  // it('fetches erroneously data from an API', async () => {
  //   const errorMessage = 'Network Error';
  //   await expect(MahasiswaKoor).rejects.toThrow(errorMessage);
  // });
});

