import React from 'react';
import Enzyme, {shallow, mount} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import {MemoryRouter} from 'react-router-dom';
import axios from 'axios';

import RegisterSupervisorLembaga from './RegisterSupervisorLembaga';

Enzyme.configure({adapter: new EnzymeAdapter()});
const setup = (props = {}, state = null) => {
  const wrapper = shallow(<RegisterSupervisorLembaga {...props} />);
  if (state) wrapper.setState(state);
  return wrapper;
};
const findByTestAttr = (wrapper, val) => {
  return wrapper.find(`[data-test='${val}']`);
};

describe('functional test input', () => {
  let component;
  beforeEach(() => {
    const mockFetchPromise = Promise.resolve({
      // 3
      data: [
        {
          id: 1,
          nama: 'nama_lembaga_0',
        },
      ],
    });
    jest.spyOn(axios, 'get').mockImplementation(() => mockFetchPromise); // 4
    component = mount(
        <MemoryRouter>
          <RegisterSupervisorLembaga />
        </MemoryRouter>,
    );
  });
  it('test if axios is called', async () => {
    await new Promise((resolve) => setImmediate(resolve));
    component.update();
    expect(axios.get).toHaveBeenCalledTimes(1);
  });
  it('Should capture fullname correctly onChange', async () => {
    await new Promise((resolve) => setImmediate(resolve));
    component.update();
    const inputFullName = component.find('input').at(0);
    inputFullName.instance().value = 'Muhammad Nadhirsyah';
    inputFullName.simulate('change');
    await new Promise((resolve) => setImmediate(resolve));
    expect(component.find(RegisterSupervisorLembaga).state().fullname).toEqual(
        'Muhammad Nadhirsyah',
    );
  });
  it('Should capture fullname correctly onChange if format is wrong', async () => {
    await new Promise((resolve) => setImmediate(resolve));
    component.update();
    const inputFullName = component.find('input').at(0);
    inputFullName.instance().value = '12345';
    inputFullName.simulate('change');
    await new Promise((resolve) => setImmediate(resolve));
    expect(
        component.find(RegisterSupervisorLembaga).state().formErrors.fullname,
    ).toEqual('Nama lengkap tidak valid!');
  });

  it('Should capture username correctly onChange', async () => {
    await new Promise((resolve) => setImmediate(resolve));
    component.update();
    const inputUsername = component.find('input').at(1);
    inputUsername.instance().value = 'nadhirsyah';
    inputUsername.simulate('change');
    await new Promise((resolve) => setImmediate(resolve));
    expect(component.find(RegisterSupervisorLembaga).state().username).toEqual(
        'nadhirsyah',
    );
  });
  it('Should capture username correctly onChange if format is wrong', async () => {
    await new Promise((resolve) => setImmediate(resolve));
    component.update();
    const inputFullName = component.find('input').at(1);
    inputFullName.instance().value = '123.45';
    inputFullName.simulate('change');
    await new Promise((resolve) => setImmediate(resolve));
    expect(
        component.find(RegisterSupervisorLembaga).state().formErrors.username,
    ).toEqual('Nama pengguna tidak valid!');
  });

  it('Should capture lembaga correctly onChange', async () => {
    await new Promise((resolve) => setImmediate(resolve));
    component.update();
    const inputLembaga = component.find('select').at(0);
    const option = component.find('option').at(0);
    option.instance().selected = true;
    inputLembaga.simulate('change');
    await new Promise((resolve) => setImmediate(resolve));
    expect(component.find(RegisterSupervisorLembaga).state().lembaga).toEqual(
        '1',
    );
  });
  it('Should capture email correctly onChange', async () => {
    await new Promise((resolve) => setImmediate(resolve));
    component.update();
    const inputFullName = component.find('input').at(2);
    inputFullName.instance().value = 'nadhirsyah@gmail.com';
    inputFullName.simulate('change');
    await new Promise((resolve) => setImmediate(resolve));
    expect(component.find(RegisterSupervisorLembaga).state().email).toEqual(
        'nadhirsyah@gmail.com',
    );
  });
  it('Should capture email correctly onChange if format is wrong', async () => {
    await new Promise((resolve) => setImmediate(resolve));
    component.update();
    const inputFullName = component.find('input').at(2);
    inputFullName.instance().value = 'nadhirsyah';
    inputFullName.simulate('change');
    await new Promise((resolve) => setImmediate(resolve));
    expect(
        component.find(RegisterSupervisorLembaga).state().formErrors.email,
    ).toEqual('Alamat email tidak valid!');
  });
  it('Should capture jabatan correctly onChange', async () => {
    await new Promise((resolve) => setImmediate(resolve));
    component.update();
    const inputFullName = component.find('input').at(3);
    inputFullName.instance().value = 'ketua';
    inputFullName.simulate('change');
    await new Promise((resolve) => setImmediate(resolve));
    expect(component.find(RegisterSupervisorLembaga).state().jabatan).toEqual(
        'ketua',
    );
  });
  it('Should capture jabatan correctly onChange if format is wrong', async () => {
    await new Promise((resolve) => setImmediate(resolve));
    component.update();
    const inputFullName = component.find('input').at(3);
    inputFullName.instance().value = 'nadhirsyah';
    inputFullName.simulate('change');
    inputFullName.instance().value = '';
    inputFullName.simulate('change');
    await new Promise((resolve) => setImmediate(resolve));
    expect(
        component.find(RegisterSupervisorLembaga).state().formErrors.jabatan,
    ).toEqual('Jabatan tidak valid!');
  });
  it('Should capture password correctly onChange', async () => {
    await new Promise((resolve) => setImmediate(resolve));
    component.update();
    const inputFullName = component.find('input').at(4);
    inputFullName.instance().value = '1234567';
    inputFullName.simulate('change');
    await new Promise((resolve) => setImmediate(resolve));
    expect(component.find(RegisterSupervisorLembaga).state().password).toEqual(
        '1234567',
    );
  });
  it('Should capture password correctly onChange if format is wrong', async () => {
    await new Promise((resolve) => setImmediate(resolve));
    component.update();
    const inputFullName = component.find('input').at(4);
    inputFullName.instance().value = '1234';
    inputFullName.simulate('change');
    await new Promise((resolve) => setImmediate(resolve));
    expect(
        component.find(RegisterSupervisorLembaga).state().formErrors.password,
    ).toEqual('minimal 6 karakter');
  });
  it('Should capture confirm password correctly', async () => {
    await new Promise((resolve) => setImmediate(resolve));
    component.update();
    const inputPassword = component.find('input').at(4);
    inputPassword.instance().value = '1234567';
    inputPassword.simulate('change');
    await new Promise((resolve) => setImmediate(resolve));
    const inputConfirmPassword = component.find('input').at(5);
    inputConfirmPassword.instance().value = '1234567';
    inputConfirmPassword.simulate('change');
    await new Promise((resolve) => setImmediate(resolve));
    expect(
        component.find(RegisterSupervisorLembaga).state().confirmPassword,
    ).toEqual('1234567');
  });
  it('Should capture confirm password doesnt match', async () => {
    await new Promise((resolve) => setImmediate(resolve));
    component.update();
    const inputPassword = component.find('input').at(4);
    inputPassword.instance().value = '1234567';
    inputPassword.simulate('change');
    await new Promise((resolve) => setImmediate(resolve));
    const inputConfirmPassword = component.find('input').at(5);
    inputConfirmPassword.instance().value = '123456';
    inputConfirmPassword.simulate('change');
    await new Promise((resolve) => setImmediate(resolve));
    expect(
        component.find(RegisterSupervisorLembaga).state().formErrors
            .confirmPassword,
    ).toEqual('Kata sandi tidak sesuai');
  });

  it('Should capture invalid submit', async () => {
    await new Promise((resolve) => setImmediate(resolve));
    component.update();
    const form = component.find('form');
    form.simulate('submit', {preventDefault() {}});
    await new Promise((resolve) => setImmediate(resolve));
    expect(component.find(RegisterSupervisorLembaga).text()).toContain(
        'Tolong isi formulir ini!',
    );
  });
  it('Should capture if some field is empty', async () => {
    await new Promise((resolve) => setImmediate(resolve));
    component.update();
    const inputFullName = component.find('input').at(0);
    inputFullName.instance().value = 'Razaqa Dhafin';
    inputFullName.simulate('change');
    await new Promise((resolve) => setImmediate(resolve));

    const inputUsername = component.find('input').at(1);
    inputUsername.instance().value = 'dha.0006';
    inputUsername.simulate('change');
    await new Promise((resolve) => setImmediate(resolve));

    const form = component.find('form');
    form.simulate('submit', {preventDefault() {}});
    await new Promise((resolve) => setImmediate(resolve));
    expect(component.find(RegisterSupervisorLembaga).text()).toContain(
        'Tolong isi formulir ini!',
    );
  });
  it('test if submit function called properly', async () => {
    jest.setTimeout(30000);
    await new Promise((resolve) => setImmediate(resolve));
    component.update();
    expect(
        component.find(RegisterSupervisorLembaga).state().isSubmitted,
    ).toEqual(false);
    const inputFullName = component.find('input').at(0);
    inputFullName.instance().value = 'Razaqa Dhafin';
    inputFullName.simulate('change');
    await new Promise((resolve) => setImmediate(resolve));

    const inputUsername = component.find('input').at(1);
    inputUsername.instance().value = 'dha0006';
    inputUsername.simulate('change');
    await new Promise((resolve) => setImmediate(resolve));

    const inputLembaga = component.find('select').at(0);
    const option = component.find('option').at(0);
    option.instance().selected = true;
    inputLembaga.simulate('change');
    await new Promise((resolve) => setImmediate(resolve));

    const inputEmail = component.find('input').at(2);
    inputEmail.instance().value = 'dha0006@test.com';
    inputEmail.simulate('change');
    await new Promise((resolve) => setImmediate(resolve));

    const inputJabatan = component.find('input').at(3);
    inputJabatan.instance().value = 'ketua';
    inputJabatan.simulate('change');
    await new Promise((resolve) => setImmediate(resolve));

    const inputPassword = component.find('input').at(4);
    inputPassword.instance().value = '1234567';
    inputPassword.simulate('change');
    await new Promise((resolve) => setImmediate(resolve));

    const inputConfirmPassword = component.find('input').at(5);
    inputConfirmPassword.instance().value = '1234567';
    inputConfirmPassword.simulate('change');
    await new Promise((resolve) => setImmediate(resolve));

    const mockSuccessResponse = {};
    const mockJsonPromise = Promise.resolve(mockSuccessResponse); // 2
    const mockFetchPromise = Promise.resolve({
      // 3
      json: () => mockJsonPromise,
      status: 201,
    });
    jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise); // 4
    const form = component.find('form');
    form.simulate('submit', {preventDefault() {}});
    await new Promise((resolve) => setImmediate(resolve));
    component.update();
    expect(component.find(RegisterSupervisorLembaga).state().submitted).toEqual(
        true,
    );

    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith(
        'http://ppl-berkah-backend.herokuapp.com/auth/register/supervisor-lembaga/',
        {
          body:
          // eslint-disable-next-line max-len
          '{"username":"dha0006","first_name":"Razaqa Dhafin","email":"dha0006@test.com","password":"1234567","profile":{"lembaga":"1","jabatan":"ketua"}}',
          headers: {'Content-Type': 'application/json'},
          method: 'POST',
        },
    );
    expect(
        component.find(RegisterSupervisorLembaga).state().status_code,
    ).toEqual(201);
  });
});
