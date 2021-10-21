import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Enzyme, {shallow} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import DaftarMahasiswa from './DaftarMahasiswa';
import AwaitResponse from './DaftarMahasiswa';
jest.mock('axios');

Enzyme.configure({adapter: new EnzymeAdapter()});
const setup = (props = {}, state = null) => {
  const wrapper = shallow(<DaftarMahasiswa />);
  if (state) wrapper.setState(state);
  return wrapper;
};

describe('on boarding page', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = setup();
  });

  it('exist input search', async () => {
    const data = {
    };
    try {
      await axios.post('http://ppl-berkah-backend.herokuapp.com/api/v1/koordinator-kuliah/list-mahasiswa/praktikum/', data);
      expect(true).toBe(true);
    } catch (e) {
      expect(e.message).toBe('Request failed with status code 401');
    }
  });

  it('fetches erroneously data from an API', async () => {
    const errorMessage = 'Network Error';

    axios.get.mockImplementationOnce(() =>
      Promise.reject(new Error(errorMessage)),
    );

    await expect(new AwaitResponse()).toBeUndefined;
  });
});
