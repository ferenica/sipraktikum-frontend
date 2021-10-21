import React from 'react';
import DetailSubmisiLaporanAkhir from './../../../components/MKPPL/DaftarSubmisi/DetailSubmisiLaporanAkhir';

// Function for return a page for dynamic routing for 'Kelola'
export default function DetailSubmisiMahasiswaLaporanAkhirKoor({match, location}) {
  //   const {params: {username}} = match;
  const url = 'http://ppl-berkah-backend.herokuapp.com/api/v1/koordinator-kuliah/laporan-akhir-mahasiswa/detail/' + match.params.username + '/' + match.params.id + '/';
  return (
    <>
      <DetailSubmisiLaporanAkhir api={url} username={match.params.username} id={match.params.id} action={'koordinator-kuliah'}/>
    </>
  );
}
