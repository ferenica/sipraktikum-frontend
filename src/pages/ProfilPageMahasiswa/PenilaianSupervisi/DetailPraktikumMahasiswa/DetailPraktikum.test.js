import React from 'react';
import Enzyme, {mount} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import DetailPratikum from './DetailPraktikum';
import axios from 'axios';
import {MemoryRouter} from 'react-router-dom';

Enzyme.configure({adapter: new EnzymeAdapter()});

describe('functional test input', () => {
  let component;

  it('test if axios is called', async () => {
    const mockSuccessResponse = {
      laporan_akhir: [
        {
          id: 2,
          nama_laporan: 'nama_laporan_akhir0',
          status_submisi: true,
          waktu_deadline: '08-01-2020 04:06',
          waktu_submisi: '09-01-2020 05:07',
        },
      ],
      laporan_borang: [
        {
          id: 2,
          nama_laporan: 'nama_laporan_borang0',
          status_submisi: true,
          waktu_deadline: '12-03-2020 10:16',
          waktu_submisi: '13-03-2020 11:17',
        },
      ],
      laporan_mingguan: [
        {
          id: 4,
          nama_laporan: 'nama_laporan_0',
          status_submisi: true,
          waktu_deadline: '20-03-2020 09:58',
          waktu_submisi: '21-03-2020 10:59',
        },
      ],
      profile: {
        supervisor_sekolah: {user: {}},
        supervisor_lembaga: {user: {}, lembaga: {}},
      },
    };
    const mockFetchPromise = Promise.resolve({
      // 3
      data: mockSuccessResponse,
    });
    jest.spyOn(axios, 'get').mockImplementation(() => mockFetchPromise); // 4
    component = mount(
        <MemoryRouter>
          <DetailPratikum />
        </MemoryRouter>,
    );
    await new Promise((resolve) => setImmediate(resolve));
    component.update();
    expect(axios.get).toHaveBeenCalledTimes(1);
  });
});
