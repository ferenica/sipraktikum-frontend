import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import Enzyme, {mount, configure, shallow} from 'enzyme';
import {MemoryRouter} from 'react-router';

import ProfilSupervisorSekolah from './ProfilSupervisorSekolah';
import NotFound from '../INOS/NotFound/NotFound';
import DaftarMahasiswa from '../DaftarMahasiswa/DaftarMahasiswa';
import Profil from './IndexProfilSupervisorSekolah';

configure({adapter: new Adapter()});

describe('Unit test for routing profile page supervisor sekolah', () => {
  test('valid path of profile should not redirect to 404', () => {
    const wrapper = mount(
        <MemoryRouter initialEntries={['/spv-sekolah']}>
          <ProfilSupervisorSekolah/>
        </MemoryRouter>,
    );
    expect(wrapper.find(ProfilSupervisorSekolah)).toHaveLength(1);
    expect(wrapper.find(NotFound)).toHaveLength(0);
  });

  test('valid path of penilaian should not redirect to 404', () => {
    const wrapper = mount(
        <MemoryRouter initialEntries={['/spv-sekolah/penilaian']}>
          <ProfilSupervisorSekolah>
            <DaftarMahasiswa/>
          </ProfilSupervisorSekolah>
        </MemoryRouter>,
    );
    expect(wrapper.find(ProfilSupervisorSekolah)).toHaveLength(1);
    expect(wrapper.find(NotFound)).toHaveLength(0);
  });

  test('invalid path should redirect to 404', () => {
    const wrapper = mount(
        <MemoryRouter initialEntries={['/random']}>
          <NotFound/>
        </MemoryRouter>,
    );
    expect(wrapper.find(ProfilSupervisorSekolah)).toHaveLength(0);
    expect(wrapper.find(NotFound)).toHaveLength(1);
  });
});

Enzyme.configure({adapter: new EnzymeAdapter()});

describe('Test for supervisor sekolah get API', () => {
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

  it('renders the profile block when API succeed', (done) => {
    const spyDidMount = jest.spyOn(Profil.prototype, 'fetchDataFromServer');

    fetch.mockImplementation(() => {
      return Promise.resolve({
        status: 200,
        json: () => {
          return Promise.resolve({
            message: 'User profile fetched successfully',
            data: {
              user: {
                username: 'username_user1',
                email: 'email_user1@mail.com',
                full_name: 'full_name_user1',
              },
              nip: '185383194450',
            },
          });
        },
      });
    });
    const didMount = wrapper.instance().fetchDataFromServer();
    // expecting componentDidMount have been called
    expect(spyDidMount).toHaveBeenCalled();
    didMount.then(() => {
      // updating the wrapper
      wrapper.update();
      expect(wrapper.state('username')).toEqual('username_user1');
      expect(wrapper.state('email')).toEqual('email_user1@mail.com');
      expect(wrapper.state('full_name')).toEqual('full_name_user1');
      spyDidMount.mockRestore();
      fetch.mockClear();
      done();
    });
  });
});
