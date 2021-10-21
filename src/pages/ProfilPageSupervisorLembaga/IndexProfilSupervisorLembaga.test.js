import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Profil from './IndexProfilSupervisorLembaga';
import EnzymeAdapter from 'enzyme-adapter-react-16';

Enzyme.configure({adapter: new EnzymeAdapter()});

describe('Test for ProfilSpvLembaga API', () => {
  beforeAll(() => {
    global.fetch = jest.fn();
  });

  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Profil />, {disableLifecycleMethods: true});
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it('Positive Test for API Profil', (done) => {
    const spyDidMount = jest.spyOn(Profil.prototype, 'componentDidMount');

    fetch.mockImplementation(() => {
      return Promise.resolve({
        status: 200,
        json: () => {
          return Promise.resolve({
            message: 'User profile fetched successfully',
            data: {
              user: {
                username: 'irfanamrl',
                email: 'i4@gmail.com',
                full_name: 'Irfan1',
              },
              lembaga: {
                id: 5,
                tema: {
                  id: 1,
                  nama: 'nama_tema_0',
                },
                institusi: {
                  id: 3,
                  nama: 'nama_institusi_2',
                },
                gambar: null,
                nama: 'nama_lembaga_4',
                jenis_pelayanan: 'Organisasi',
                deskripsi_singkat: 'deskripsi_singkat_4',
              },
              jabatan: 'Jabatan',
            },
          });
        },
      });
    });
    const didMount = wrapper.instance().componentDidMount();
    // expecting componentDidMount have been called
    expect(spyDidMount).toHaveBeenCalled();
    didMount.then(() => {
      // updating the wrapper
      wrapper.update();
      expect(wrapper.state('username')).toEqual('irfanamrl');
      expect(wrapper.state('email')).toEqual('i4@gmail.com');
      expect(wrapper.state('full_name')).toEqual('Irfan1');
      expect(wrapper.state('lembaga')).toEqual('nama_lembaga_4');
      expect(wrapper.state('jabatan')).toEqual('Jabatan');
      spyDidMount.mockRestore();
      fetch.mockClear();
      done();
    });
  });
});
