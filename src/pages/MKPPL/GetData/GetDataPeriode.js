/**
 * Function to fetch data Periode
 * @return {array}  Array of periode
 */

import {useState, useEffect} from 'react';

const URL = 'http://ppl-berkah-backend.herokuapp.com/auth/periode/list';

const GetDataPeriode = () => {
  const [daftarPeriode, setDaftarPeriode] = useState([]);

  async function fetchData() {
    const res = await fetch(URL);
    res
        .json()
        .then((res) => setDaftarPeriode(res.data))
        .catch((err) => alert(err));
  }

  useEffect(() => {
    fetchData();
  }, []);

  return daftarPeriode;
};

export default GetDataPeriode;
