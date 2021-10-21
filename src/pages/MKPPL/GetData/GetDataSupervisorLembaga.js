/**
 * Function to fetch data Supervisor Lembaga
 * @return {array}  Array of Supervisor Lembaga
 */

import {useState, useEffect} from 'react';

const URL = 'http://ppl-berkah-backend.herokuapp.com/api/v1/supervisor-lembaga/';

const GetDataSupervisorLembaga = (props) => {
  let unmounted = false;
  const [dataSupervisorLembaga, setDataSupervisorLembaga] = useState([]);

  async function fetchData() {
    const res = await fetch(URL + props + '/');
    res
        .json()
        .then((res) => {
          if (!unmounted) {
            setDataSupervisorLembaga(res.data);
          }
        })
        .catch((err) => alert(err));
  }

  useEffect(() => {
    fetchData();
    return () => unmounted = true;
  }, []);

  return dataSupervisorLembaga;
};

export default GetDataSupervisorLembaga;
