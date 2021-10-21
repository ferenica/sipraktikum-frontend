import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Profil from './IndexProfilKoorKuliah';
import EnzymeAdapter from 'enzyme-adapter-react-16';

Enzyme.configure({adapter: new EnzymeAdapter()});

describe('App', () => {
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

  it('renders the profile block when API succeeds', (done) => {
    const spyDidMount = jest.spyOn(Profil.prototype, 'componentDidMount');

    fetch.mockImplementation(() => {
      return Promise.resolve({
        status: 200,
        json: () => {
          return Promise.resolve({
            message: 'User profile fetched successfully',
            data: {
              user: {
                username: 'username_user3',
                email: 'email_user3@mail.com',
                full_name: 'full_name_user3',
              },
              nip: '185383191457',
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
      expect(wrapper.state('username')).toEqual('username_user3');
      expect(wrapper.state('email')).toEqual('email_user3@mail.com');
      expect(wrapper.state('full_name')).toEqual('full_name_user3');
      spyDidMount.mockRestore();
      fetch.mockClear();
      done();
    });
  });
});
