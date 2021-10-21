import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import TambahLembaga from './TambahLembaga';

Enzyme.configure({adapter: new EnzymeAdapter()});

const findByTestAttr = (wrapper, val) => {
  return wrapper.find(`[name='${val}']`);
};

describe('Test TambahLembaga has components', () => {
  let wrapper;

  beforeAll(() => {
    wrapper = shallow(<TambahLembaga />);
  });

  it('has deskripsi lembaga form', () => {
    const form = findByTestAttr(wrapper, 'deskripsi');
    expect(form.length).toBe(1);
  });

  it('has jenis institusi form', () => {
    const form = findByTestAttr(wrapper, 'institusi');
    expect(form.length).toBe(1);
  });

  it('has jenis pelayanan form', () => {
    const form = findByTestAttr(wrapper, 'jenisPelayanan');
    expect(form.length).toBe(1);
  });

  it('has beneficiaries form', () => {
    const form = findByTestAttr(wrapper, 'beneficiaries');
    expect(form.length).toBe(1);
  });

  it('has tema form', () => {
    const form = findByTestAttr(wrapper, 'tema');
    expect(form.length).toBe(1);
  });

  it('has jenis praktikum form', () => {
    const form = findByTestAttr(wrapper, 'jenisPraktikum');
    expect(form.length).toBe(1);
  });

  it('has simpan button', () => {
    const form = findByTestAttr(wrapper, 'simpan-button');
    expect(form.length).toBe(1);
  });

  it('has batal button', () => {
    const form = findByTestAttr(wrapper, 'batal-button');
    expect(form.length).toBe(1);
  });
});
