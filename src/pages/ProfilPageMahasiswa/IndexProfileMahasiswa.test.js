import React from 'react';
import Enzyme, {mount} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import IndexProfileMahasiswa from './IndexProfileMahasiswa';

Enzyme.configure({adapter: new EnzymeAdapter()});

describe('functional test input', () => {
  let component;
  it('test if fetch is called', async () => {
    const mockSuccessResponse = {};
    const mockJsonPromise = Promise.resolve(mockSuccessResponse); // 2
    const mockFetchPromise = Promise.resolve({
      // 3
      json: () => mockJsonPromise,
    });
    jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise); // 4
    component = mount(<IndexProfileMahasiswa />);
    await new Promise((resolve) => setImmediate(resolve));
    component.update();
    expect(global.fetch).toHaveBeenCalledTimes(1);
  });
});
