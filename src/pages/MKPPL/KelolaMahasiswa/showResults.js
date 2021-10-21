const URL = 'http://ppl-berkah-backend.herokuapp.com/api/v1/mahasiswa/praktikum/laporan-update/';

export default (async function showResults(values) {
  // window.alert(`You submitted:\n\n${JSON.stringify(values, null, 2)}`);
  // console.log(values)
  try {
    const bearer = 'Bearer ' + localStorage.getItem('login_token');
    const requestOptions = {
      method: 'POST',
      headers: {'Content-Type': 'application/json', 'Authorization': bearer},
      body: JSON.stringify(values),
    };
    const response = await fetch(URL +
      values.username_mahasiswa + '/', requestOptions);

    if (response.status === 201) {
      alert('Data berhasil disimpan!');
      window.location.reload(false);
    }
  } catch (error) {
    alert('Data tidak berhasil diubah\n\n' + error);
  }
});

