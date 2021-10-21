import React from 'react';
import DetailSubmisiLaporanBorang from './../../../components/MKPPL/DaftarSubmisi/DetailSubmisiLaporanBorang';

// Function for return a page for dynamic routing for 'Kelola'
export default function DetailSubmisiMahasiswaLaporanBorang({match, location}) {
//   const {params: {username}} = match;
  const url = 'http://ppl-berkah-backend.herokuapp.com/api/v1/supervisor-sekolah/borang-mahasiswa/detail/' + match.params.username + '/' + match.params.id + '/';
  return (
    <>
      <DetailSubmisiLaporanBorang api={url} username={match.params.username} id={match.params.id} action={'supervisor-sekolah'}/>
    </>
  );
}
