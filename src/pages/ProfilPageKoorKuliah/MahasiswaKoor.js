import React from 'react';
import DaftarMahasiswa from '../DaftarMahasiswa/DaftarMahasiswa';

// Function for return a page for dynamic routing for 'Kelola'
/**
 * Creates a new Person.
 * @class
 */
export default function MahasiswaKoor() {
  return <DaftarMahasiswa type='koordinator-kuliah' api='http://ppl-berkah-backend.herokuapp.com/api/v1/mahasiswa/' />;
}
