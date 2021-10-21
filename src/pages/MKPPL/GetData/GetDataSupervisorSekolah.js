/**
 * Function to fetch data about Supervisor Sekolah
 * @return {array}  Array of Supervisor Sekolah
 */

import {useState, useEffect} from 'react';

const URL = 'http://ppl-berkah-backend.herokuapp.com/api/v1/administrator/kelola-user/list/supervisor-sekolah/';

const GetDataSupervisorSekolah = () => {
  const [dataSupervisorSekolah, setDataSupervisorSekolah] = useState([]);

  async function fetchData() {
    try {
      const bearer = 'Bearer ' + localStorage.getItem('login_token');
      const requestOptions = {
        method: 'GET',
        headers: {'Content-Type': 'application/json', 'Authorization': bearer},
      };
      const awaitResponse = await fetch(URL, requestOptions)
          .then((response) => response.json())
          .then((res) => setDataSupervisorSekolah(res.data));
      return await awaitResponse;
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return dataSupervisorSekolah;
};

export default GetDataSupervisorSekolah;
