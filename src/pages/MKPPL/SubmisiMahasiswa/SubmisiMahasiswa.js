import React from 'react';
import DaftarSubmisi from './../../../components/MKPPL/DaftarSubmisi/DaftarSubmisi';

// Function for return a page for dynamic routing for 'Kelola'
export default function SubmisiMahasiswa({match, location}) {
  const {params: {username}} = match;
  const url = 'http://ppl-berkah-backend.herokuapp.com/api/v1/supervisor-sekolah/praktikum-mahasiswa/list/' + username + '/';
  return (
    <>
      <DaftarSubmisi api={url} username={username} />
    </>
  );
}
