import React from 'react';
import ReactDOM from 'react-dom';
import Enzyme, {shallow} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import {render, fireEvent} from '@testing-library/react';
import {getByTestId} from '@testing-library/dom';
import AddLembagaCard from './AddLembagaCard';
import AddIcon from '@material-ui/icons/Add';

Enzyme.configure({adapter: new EnzymeAdapter()});

describe('LembagaComponent', () => {
  it('should renders correctly', () => {
    const component = shallow(<AddLembagaCard />);
    expect(component).toMatchSnapshot();
  });

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<AddIcon></AddIcon>, div);
  });

  it('exist button add lembaga', () => {
    const buttonAdd = shallow(<AddLembagaCard />).find('.button-add');
    expect(buttonAdd.length).toBe(1);
  });

  it('exist button add lembaga', () => {
    const buttonAdd = shallow(<AddLembagaCard />).find('.button-add');
    buttonAdd.simulate('click');
  });

  test('addbtn clicked correctly', () => {
    const dom = render(<AddLembagaCard />);
    const buttonAdd = getByTestId(dom.container, 'addbtn');
    fireEvent.click(buttonAdd);
  });
});
