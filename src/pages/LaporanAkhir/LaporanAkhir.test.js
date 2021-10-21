import React from 'react';
import Enzyme, {shallow, mount, ReactWrapper} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import expect from 'expect';
import LaporanAkhir from './LaporanAkhir';
import fetch from '../../../__mocks__/fetch';

global.fetch = fetch;
Enzyme.configure({adapter: new EnzymeAdapter()});

const fetchSpy = jest.spyOn(window, 'fetch');
describe('LaporanAkhir', () => {
  const component = shallow(<LaporanAkhir />);
  it('should renders correctly', () => {
    expect(component).toMatchSnapshot();
  });

  // it('should make rows 2 length', () => {
  //   expect(component.instance().state.rows.length).toBe(2);
  // });

  // it('should fetch a list of tasks', () => {
  //   expect(fetchSpy).toBeCalled();
  // });
});

describe('FilterLaporan in LaporanAkhir', () => {
  const component = mount(<LaporanAkhir />);
  it('can change filter states in LaporanAkhir', () => {
    const filterLaporan = component.find('#FilterLaporan').at(1).instance();
    const event = {target: {value: ''}};

    // test ini butuh fetchspy
    filterLaporan.getFilterAPI();
    filterLaporan.handleChange_tema(event);
    filterLaporan.handleChange_institusi(event);
    filterLaporan.handleChange_tahun({target: {value: 2019}});
    expect(component.state('tahun')).toBe(2019);
  });
});


describe('SearchBox', () => {
  const component = mount(<LaporanAkhir />);
  // console.log(component.instance().state.mahasiswaData)
  it('works', () => {
    const componentInst = component.instance();
    componentInst.getMahasiswa();
    const testVal = '';
    componentInst.searchMahasiswa({target: {value: testVal}});

    // let searchBox = component.find('input').at(0);

    // searchBox.simulate('change', {target: {value: testVal}});
    expect(componentInst.state.mahasiswaData[0].mahasiswa.user.full_name.toLowerCase()).toContain(testVal);

    // component.state('selectedRows').map(row => {
    //   expect(row.mahasiswa.user.fullName.toLowerCase()).toContain(testVal)
    // })
  });
});

// //test ini untuk mengetest handle klik pada pagination
// test('onClick: defined', { onClick: mockFn }, (props, wrapper) => {
//   it('=> onClick is called', () => {
//     const pageButtons = findPageButton(wrapper); //unutk mengecek kondisi pagebutton sekarang
//     const previousButtonIndex = 0;
//     const nextButtonIndex = pageButtons.length - 1;
//     pageButtons.forEach((pageButton, index) => {
//       mockFn.mockReset();  // untuk mereset mockfn sebelumnya
//       pageButton.simulate('click');
//       const pageVariant: PageVariant = pageButton.prop('pageVariant');
//       switch (pageVariant) {
//         case 'current':
//         case 'ellipsis':
//           expect(mockFn).not.toHaveBeenCalled();
//           break;
//         case 'end':
//           if (
//             (props.offset === 0 && index === previousButtonIndex) ||
//             (props.offset === 80 && index === nextButtonIndex)
//           ) {
//             expect(mockFn).not.toHaveBeenCalled();
//           } else {
//             expect(mockFn).toHaveBeenCalled();
//           }
//           break;
//         case 'standard':
//           expect(mockFn).toHaveBeenCalled();
//           break;
//       }
//     });
//   });
// });
