import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import Login from './Login';

Enzyme.configure({adapter: new EnzymeAdapter()});

const findByTestAttr = (wrapper, val) => {
  return wrapper.find(`[name='${val}']`);
};

describe('Test Login has components', () => {
  let wrapper;

  beforeAll(() => {
    wrapper = shallow(<Login />);
  });

  it('render username without error', () => {
    const registerLembagaComponent = findByTestAttr(wrapper,
        'username',
    );
    expect(registerLembagaComponent.length).toBe(1);
  });

  it('render password without error', () => {
    const registerLembagaComponent = findByTestAttr(wrapper,
        'password',
    );
    expect(registerLembagaComponent.length).toBe(1);
  });

  it('exist navbar', () => {
    const navbar = wrapper.find('Navbar');
    expect(navbar.length).toBe(1);
  });

  it('exist role card', () => {
    const roleCrd = wrapper.find('RoleButton');
    expect(roleCrd.length).toBe(5);
  });

  it('exist welcome text', () => {
    const welcome = wrapper.find('.welcome');
    expect(welcome.length).toBe(1);
  });

  it('exist line', () => {
    const line = wrapper.find('.garis');
    expect(line.length).toBe(1);
  });

  it('exist username form', () => {
    const username = findByTestAttr(wrapper, 'username');
    expect(username.length).toBe(1);
  });

  it('exist password form', () => {
    const password = findByTestAttr(wrapper, 'password');
    expect(password.length).toBe(1);
  });
});

// describe('Test Login functionality', () => {
//   let wrapper;

//   beforeEach(() => {
//     wrapper = shallow(<Login />);
//   });

//   it('handles username', () => {
//     findByTestAttr(wrapper, 'username').simulate('change', {target: {name: 'username', value: 'krishankantsinghal'}});
//     expect(wrapper.state('username')).toEqual('krishankantsinghal');
//   });

//   it('handles password', () => {
//     findByTestAttr(wrapper, 'password').simulate('change', {target: {name: 'password', value: 'krishankant123'}});
//     expect(wrapper.state('password')).toEqual('krishankant123');
//   });

//   it('login successfully', () => {
//     findByTestAttr(wrapper, 'administrator-button').simulate('click');
//     findByTestAttr(wrapper, 'username').simulate('change', {target: {name: 'username', value: 'krishankantsinghal'}});
//     findByTestAttr(wrapper, 'password').simulate('change', {target: {name: 'password', value: 'krishankant123'}});
//     findByTestAttr(wrapper, 'login-button').simulate('click');
//     expect(wrapper.state('isLogined')).toBe(true);
//   });

//   it('login unsuccessfully', () => {
//     findByTestAttr(wrapper, 'username').simulate('change', {target: {name: 'username', value: 'krishankantsinghal'}});
//     findByTestAttr(wrapper, 'password').simulate('change', {target: {name: 'password', value: 'krishankant1234'}});
//     findByTestAttr(wrapper, 'login-button').simulate('click');
//     expect(wrapper.state('isLogined')).toBe(false);
//   });
// });
