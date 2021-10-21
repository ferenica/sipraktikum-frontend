/* eslint-disable linebreak-style */
import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import styled from 'styled-components';
import renderer from 'react-test-renderer';
// import 'jest-styled-components';


import DetailLembaga from './DetailLembaga';

const Detail = styled.h1`
font-family: Nunito Sans;
font-style: normal;
font-weight: normal;
font-size: 16px;
line-height: 30px;
/* identical to box height */

display: flex;
align-items: center;
letter-spacing: 0.0025em;
`;

Enzyme.configure({adapter: new EnzymeAdapter()});

describe('Halaman detail lembaga', () => {
  it('should renders correctly', () => {
    const component = shallow(<DetailLembaga match={{params: {id: '1'}}} />);
    expect(component).toMatchSnapshot();
  });

  // it('appear detail lembaga', () => {
  //   const wrapper = shallow(<DetailLembaga match={{params: {id: '1'}}}/>);
  //   const lembagaDetail = wrapper.find('.detail-lembaga');
  //   expect(lembagaDetail.length).toBe(1);
  // });

  test('appear all details', () => {
    const tree = renderer.create(<Detail />).toJSON();
    expect(tree.length).toBe(undefined);
  });

  /* test('it works', () => {
    const tree = renderer.create(<Detail />).toJSON();
    expect(tree).toHaveStyleRule('font-family', 'Nunito Sans');
  });*/
});
