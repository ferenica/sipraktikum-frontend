import React from 'react';
import DaftarSubmisi from './../../../components/MKPPL/DaftarSubmisi/DaftarSubmisiKoor';

// Function for return a page for dynamic routing for 'Kelola'
export default function SubmisiMahasiswaKoor({match, location}) {
  console.log('sampesubmisimahasiswakoor.js');
  const {params: {username}} = match;
  const url = 'http://ppl-berkah-backend.herokuapp.com/api/v1/koordinator-kuliah/praktikum-mahasiswa/list/' + username + '/';
  return (
    <>
      <DaftarSubmisi api={url} username={username} />
    </>
  );
}
