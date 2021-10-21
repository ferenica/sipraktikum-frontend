import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';

import {render, fireEvent} from '@testing-library/react';
import {getByTestId} from '@testing-library/dom';

import KelolaLembaga from './KelolaLembaga';

Enzyme.configure({adapter: new EnzymeAdapter()});

const setup = (props = {}, state = null) => {
  const wrapper = shallow(<KelolaLembaga match={{params: {id: 1}}} />);
  if (state) wrapper.setState(state);
  return wrapper;
};

const findByTestAttr = (wrapper, val) => {
  return wrapper.find(`[data-test='${val}']`);
};

describe('KelolaLembaga', () => {
  const wrapper = shallow(<KelolaLembaga match={{params: {id: 1}}} />);

  it('should renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
  /**
    let wrapper;

    beforeEach(() => {
        wrapper = setup();
    });
    */

  /**
    it('should has navbar component', () => {
        const kelolaLembagaComponent = findByTestAttr(wrapper, 'NavbarComponent');
        expect(kelolaLembagaComponent.length).toBe(1);
    });
    it('should has nama component', () => {
        const kelolaLembagaComponent = findByTestAttr(wrapper, 'component-nama');
        expect(kelolaLembagaComponent.length).toBe(1);
    });
    it('should has jenis pelayanan component', () => {
        const kelolaLembagaComponent = findByTestAttr(wrapper, 'component-jenisPelayanan');
        expect(kelolaLembagaComponent.length).toBe(1);
    });
    it('should has institusi component', () => {
        const kelolaLembagaComponent = findByTestAttr(wrapper, 'component-institusi');
        expect(kelolaLembagaComponent.length).toBe(1);
    });
    it('should has tema component', () => {
        const kelolaLembagaComponent = findByTestAttr(wrapper, 'component-tema');
        expect(kelolaLembagaComponent.length).toBe(1);
    });
    it('should has praktikum component', () => {
        const kelolaLembagaComponent = findByTestAttr(wrapper, 'component-praktikum');
        expect(kelolaLembagaComponent.length).toBe(1);
    });
    it('should has desc component', () => {
        const kelolaLembagaComponent = findByTestAttr(wrapper, 'component-deskripsi');
        expect(kelolaLembagaComponent.length).toBe(1);
    });
    */
});
