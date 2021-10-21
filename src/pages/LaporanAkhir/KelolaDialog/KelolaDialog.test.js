import React from 'react';
import Enzyme, {shallow, mount} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import KelolaDialog from './KelolaDialog';

Enzyme.configure({adapter: new EnzymeAdapter()});

describe('KelolaDialog', () => {
  const wrapper = shallow(<KelolaDialog
    closeKelola={jest.fn()} open={true} type={'tema'}
    dataKelola={{dataTema: [{id: 1, nama: 'Lingkungan'}, {id: 2, nama: 'Sosial'}],
      dataInstitusi: [{id: 1, nama: 'Lingkungan'}, {id: 2, nama: 'Sosial'}]}}
  />);

  it('should renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('opens correctly', () => {
    wrapper.find('#MainDialog').simulate('enter');
    expect(wrapper.state().inputVal).toBe('');
  });

  it('chooses an option correctly', () => {
    const event = {target: {value: {id: 1, nama: 'Lingkungan'}}};
    wrapper.find('#selectOption').simulate('change', event);
    expect(wrapper.state().selected).toBe(event.target.value);
  });

  it('shows value when inserting inputs to the input box', () => {
    const event = {target: {value: 'Bukan Lingkungan'}};
    wrapper.find('#inputBase').simulate('change', event);
    expect(wrapper.state().inputVal).toBe(event.target.value);
  });

  it('shows value when inserting inputs to the input box', () => {
    wrapper.find('#simpanBtn').dive().simulate('click');
    expect(wrapper.state().inputVal).toBe('Bukan Lingkungan');
  });

  it('closes correctly', () => {
    expect(wrapper.state().inputVal).not.toBe('');
    wrapper.find('#MainDialog').simulate('close');
    //expect(wrapper.state().inputVal).toBe('');
  });

  it('can add new option', () => {
    // reopening the components
    wrapper.find('#MainDialog').simulate('enter');
    expect(wrapper.state().inputVal).toBe('');

    // choosing "Tambah" value
    const event = {target: {value: {nama: ''}}};
    wrapper.find('#selectOption').simulate('change', event);
    expect(wrapper.state().selected).toBe(event.target.value);

    wrapper.find('#inputBase').simulate('change', {target: {value: 'Lingkungan Baru'}});
    expect(wrapper.state().inputVal).toBe('Lingkungan Baru');

    wrapper.find('#simpanBtn').dive().simulate('click');
    expect(wrapper.state().inputVal).toBe('Lingkungan Baru');
  });

  it('closes using batalBtn', () => {
    wrapper.find('#batalBtn').dive().simulate('click');
    //expect(wrapper.state().inputVal).toBe('');
  });

  it('can delete an option', () => {
    // reopening the components
    wrapper.find('#MainDialog').simulate('enter');
    expect(wrapper.state().inputVal).toBe('');

    // choosing a value
    const event = {target: {value: {id: 1, nama: 'Lingkungan'}}};
    wrapper.find('#selectOption').simulate('change', event);
    expect(wrapper.state().selected).toBe(event.target.value);

    wrapper.find('#deleteBtn').simulate('click');
    expect(wrapper.state().inputVal).toBe('Lingkungan');
  });
});
