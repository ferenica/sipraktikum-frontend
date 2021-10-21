import React from 'react';
import ReactDOM from 'react-dom';
import Enzyme, {mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import LembagaSearch from '../LembagaSearch/LembagaSearch';
import SearchBar from './SearchBar/SearchBar';
import LembagaCard from './LembagaCard/LembagaCard';
import FilterType from './FilterType/FilterType';

Enzyme.configure({adapter: new Adapter()});

const setWrapper = () => {
  const wrapper = mount(<LembagaSearch />);
  wrapper.setState({
    filterData: {
      praktikum: [
        {
          id: 1,
          nama: 'Praktikum 1',
          isChecked: false,
        },
      ],
      institusi: [
        {
          id: 1,
          nama: 'Government Organisation',
        },
      ],
      tema: [
        {
          'id': 1,
          'nama': 'Lingkungan',
        },
      ],
    },
    lembagaData: [
      {
        'id': 6,
        'tema': {
          'id': 1,
          'nama': 'Lingkungan',
        },
        'institusi': {
          id: 1,
          nama: 'Government Organisation',
        },
        'nama': 'Siprak Institution',
        'jenis_pelayanan': 'Edukasi',
        'deskripsi_singkat': 'Siprak institution adalah institusi yang mengedepankan selesainya projek PPL.',
        'beneficaries': 'Pengguna',
        'alamat': 'Jln. Margonda Raya',
        'praktikum_ke': 1,
      },
      {
        'id': 7,
        'tema': {
          'id': 1,
          'nama': 'Lingkungan',
        },
        'institusi': {
          id: 1,
          nama: 'Government Organisation',
        },
        'nama': 'Bawa Paket',
        'jenis_pelayanan': 'Jasa pengantaran barang',
        'deskripsi_singkat': 'Bawa Pakat adalah jasa pengiriman barang yang handal. Fransiscus Emmanuel Bunaren adalah Co-Founder dan CEO dari Bawa Paket.',
        'beneficaries': 'Pengguna jasa bawa paket',
        'alamat': 'Bekasi, Jawa Barat',
        'praktikum_ke': 2,
      },
    ],
    isLoaded: true,
    isAccordionExpanded: {
      'praktikum': true,
      'institusi': false,
      'tema': false,
    },
  });
  return wrapper;
};

describe('Test LembagaSearch has components', () => {
  let wrapper;
  beforeAll(() => {
    wrapper = setWrapper();
  });

  it('exists lembaga', () => {
    const lembagaList = wrapper.find(LembagaCard);

    expect(lembagaList.length).toBe(2);
  });

  it('exists filter', () => {
    const filterList = wrapper.find(FilterType);
    expect(filterList.length).toBe(3);
  });

  it('exists search bar', () => {
    const searchBar = wrapper.find(SearchBar);
    expect(searchBar.length).toBe(1);
  });

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<LembagaSearch></LembagaSearch>, div);
  });
});

describe('Test LembagaSearch functions', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = setWrapper();
  });

  // it('displays filtered lembaga cards', () => {
  //   expect(wrapper.debug()).toBe(1);
  //   wrapper.find(`Checkbox[name='Praktikum 1']`).simulate('click');

  //   expect(wrapper.text).toContain('Siprak Institution');
  // });

  it('displays searched lembaga cards', () => {
    wrapper.find('SearchBar')
        .simulate('change', {target: {value: 'Bawa'}});
    expect(wrapper.debug()).toContain('Bawa Paket');
  });
});
