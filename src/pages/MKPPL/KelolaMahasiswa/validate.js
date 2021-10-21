export default function(values) {
  const errors = {};
  if (!values.username_supervisor_lembaga) {
    errors.username_supervisor_lembaga = 'Username tidak boleh kosong';
  }
  if (!values.laporan_mingguan || !values.laporan_mingguan.length) {
    errors.laporan_mingguan = {_error: 'Laporan mingguan tidak boleh kosong'};
  }
  if (!values.laporan_akhir || !values.laporan_akhir.length) {
    errors.laporan_akhir = {_error: 'Laporan akhir tidak boleh kosong'};
  } else if (values.laporan_akhir.length > 1) {
    errors.laporan_akhir = {_error: 'Laporan akhir hanya boleh terdapat satu laporan'};
  }
  if (!values.laporan_borang || !values.laporan_borang.length) {
    errors.laporan_borang = {_error: 'Borang penilaian tidak boleh kosong'};
  } else if (values.laporan_borang.length > 1) {
    errors.laporan_borang = {_error: 'Borang penilaian hanya boleh terdapat satu laporan'};
  }
  return errors;
}
