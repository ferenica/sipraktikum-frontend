import React from 'react';
import Enzyme, {shallow, mount, ReactWrapper} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import expect from 'expect';
import fetch from '../../../../../__mocks__/fetch';
import ChartStatistik from './ChartStatistik.js';


global.fetch = fetch;
Enzyme.configure({adapter: new EnzymeAdapter()});

const fetchSpy = jest.spyOn(window, 'fetch');
describe('Chart', () => {
  const wrapper = shallow(<ChartStatistik />);
  it('should renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});

