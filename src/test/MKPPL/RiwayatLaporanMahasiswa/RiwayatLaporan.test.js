import React from 'react';
import Enzyme, {mount} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import RiwayatLaporan from '../../../pages/MKPPL/RiwayatLaporanMahasiswa/RiwayatLaporan';
import axios from 'axios';
import {MemoryRouter} from 'react-router-dom';

Enzyme.configure({adapter: new EnzymeAdapter()});

describe('functional test input', () => {
  let component;

  it('test if axios is called', async () => {
    const mockSuccessResponse = {
      riwayat_laporan_siswa: {
        laporan_akhir: [
          {
            id: 21,
            jenis: 'Akhir',
            jenis_praktikum: 'Praktikum 2',
            nama_laporan: 'Laporan Akhir 3',
            status_submisi: true,
            waktu_deadline: '03-06-2020 12:00',
            waktu_submisi: '02-06-2020 15:59',
          },
        ],
        laporan_borang: [
          {
            id: 21,
            jenis: 'Borang',
            jenis_praktikum: 'Praktikum 2',
            nama_laporan: 'Laporan Borang 3',
            status_submisi: true,
            waktu_deadline: '03-06-2020 12:00',
            waktu_submisi: '02-06-2020 17:22',
          },
        ],
        laporan_mingguan: [
          {
            id: 6,
            jenis: 'Minggu',
            jenis_praktikum: 'Praktikum 2',
            nama_laporan: 'nama_laporan_2',
            status_submisi: true,
            waktu_deadline: '21-06-2020 00:45',
            waktu_submisi: '22-06-2020 01:46',
          },
        ],
      },
      riwayat_supv_lembaga: {
        laporan_akhir: [
          {
            id: 2,
            jenis: 'Akhir',
            jenis_praktikum: 'Praktikum 2',
            nama_laporan: 'nama_laporan_akhir0',
            status_submisi: true,
            waktu_nilai_supv_lembaga: '02-06-2020 10:20',
          },
        ],
        laporan_borang: [
          {
            id: 2,
            jenis: 'Borang',
            jenis_praktikum: 'Praktikum 2',
            nama_laporan: 'nama_laporan_borang0',
            status_submisi: true,
            waktu_nilai_supv_lembaga: null,
          },
        ],
        laporan_mingguan: [
          {
            id: 6,
            jenis: 'Minggu',
            jenis_praktikum: 'Praktikum 2',
            nama_laporan: 'nama_laporan_2',
            status_submisi: true,
            waktu_nilai_supv_lembaga: null,
          },
        ],
      },
      riwayat_supv_sekolah: {
        laporan_akhir: [
          {
            id: 2,
            jenis: 'Akhir',
            jenis_praktikum: 'Praktikum 2',
            nama_laporan: 'nama_laporan_akhir0',
            status_submisi: true,
            waktu_nilai_supv_sekolah: '02-06-2020 10:20',
          },
        ],
        laporan_borang: [
          {
            id: 2,
            jenis: 'Borang',
            jenis_praktikum: 'Praktikum 2',
            nama_laporan: 'nama_laporan_borang0',
            status_submisi: true,
            waktu_nilai_supv_sekolah: null,
          },
        ],
        laporan_mingguan: [
          {
            id: 4,
            jenis: 'Minggu',
            jenis_praktikum: 'Praktikum 2',
            nama_laporan: 'nama_laporan_0',
            status_submisi: true,
            waktu_nilai_supv_sekolah: null,
          },
        ],
      },

      profile: {
        supervisor_sekolah: {user: {}},
        supervisor_lembaga: {user: {}, lembaga: {}},
        user: {user: {}, full_name: ''},
      },
    };
    const mockFetchPromise = Promise.resolve({
      // 3
      data: mockSuccessResponse,
    });
    jest.spyOn(axios, 'get').mockImplementation(() => mockFetchPromise); // 4
    component = mount(
        <MemoryRouter>
          <RiwayatLaporan />
        </MemoryRouter>,
    );
    await new Promise((resolve) => setImmediate(resolve));
    component.update();
    expect(axios.get).toHaveBeenCalledTimes(1);
  });
});
