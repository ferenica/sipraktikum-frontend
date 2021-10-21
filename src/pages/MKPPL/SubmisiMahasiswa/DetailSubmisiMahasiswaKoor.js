import React from 'react';
import DetailSubmisi from './../../../components/MKPPL/DaftarSubmisi/DetailSubmisiKoor';

// Function for return a page for dynamic routing for 'Kelola'
export default function DetailSubmisiMahasiswaKoor({match, location}) {
  //   const {params: {username}} = match;
  console.log('masuk ke detail submisi mahasiswa');
  const url = 'http://ppl-berkah-backend.herokuapp.com/api/v1/koordinator-kuliah/laporan-mingguan-mahasiswa/detail/' + match.params.username + '/' + match.params.id + '/';
  return (
    <>
      <DetailSubmisi api={url} username={match.params.username} id={match.params.id} />
    </>
  );
}
