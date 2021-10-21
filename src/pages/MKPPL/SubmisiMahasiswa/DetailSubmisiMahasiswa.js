import React from 'react';
import DetailSubmisi from './../../../components/MKPPL/DaftarSubmisi/DetailSubmisi';

// Function for return a page for dynamic routing for 'Kelola'
export default function DetailSubmisiMahasiswa({match, location}) {
//   const {params: {username}} = match;
  const url = 'http://ppl-berkah-backend.herokuapp.com/api/v1/supervisor-sekolah/laporan-mingguan-mahasiswa/detail/' + match.params.username + '/' + match.params.id + '/';
  return (
    <>
      <DetailSubmisi api={url} username={match.params.username} id={match.params.id}/>
    </>
  );
}
