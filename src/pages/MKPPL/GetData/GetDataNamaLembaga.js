/**
 * Function to fetch data about Lembaga
 * @return {array}  Array of lembaga
 */

import {useState, useEffect} from 'react';

const URL = 'http://ppl-berkah-backend.herokuapp.com/api/v1/lembaga/';

const GetDataNamaLembaga = () => {
  const [daftarLembaga, setDaftarLembaga] = useState([]);

  async function fetchData() {
    const res = await fetch(URL);
    res
        .json()
        .then((res) => setDaftarLembaga(res))
        .catch((err) => alert(err));
  }

  useEffect(() => {
    fetchData();
  }, []);

  return daftarLembaga;
};

export default GetDataNamaLembaga;
