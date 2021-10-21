import Enzyme from 'enzyme';
import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import {createShallow} from '@material-ui/core/test-utils';
import {shallow, configure} from 'enzyme';
// import Button from '@material-ui/core/Button';
import TentangPraktikum from './TentangPraktikum.js';
import Typography from '@material-ui/core/Typography';


configure({adapter: new Adapter()});
describe('Teks tentang praktikum', () => {
  it('should renders correctly', () => {
    const component = shallow(<TentangPraktikum />);
    expect(component).toMatchSnapshot();
  });
});
