import React from 'react';
import Enzyme, {shallow, mount} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import ReactDOM from 'react-dom';
import {render, fireEvent} from '@testing-library/react';
import {getByTestId} from '@testing-library/dom';
import LembagaCard from '../LembagaCard/LembagaCard';
import {Card} from '@material-ui/core';

Enzyme.configure({adapter: new EnzymeAdapter()});

describe('LembagaComponent', () => {
  it('works', () => {
    const data = {
      nama: 'Greenpeace',
      jenis_pelayanan: 'Advokasi Kebijakan Lingkungan',
      institusi: 'Perusahaan',
      tema: 'Lingkungan',
      deskripsi_singkat: 'reprehenderit ut dolore cupidatat irure aliqua laboris velit',
    };
    const wrapper = shallow(<LembagaCard data={data} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Card></Card>, div);
  });

  test('cardbtn clicked correctly', () => {
    const dom = render(<LembagaCard data={{nama: 'nama_lembaga_4', institusi: {nama: 'a'}, tema: {nama: 'Pemberdayaan Masyarakat'}}}/>);
    const cardBtn = getByTestId(dom.container, 'card-button');
    fireEvent.click(cardBtn);
  });
});
