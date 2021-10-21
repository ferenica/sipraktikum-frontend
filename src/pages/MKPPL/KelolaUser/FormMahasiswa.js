import React from 'react';
import PropTypes from 'prop-types';
import {useForm, Controller} from 'react-hook-form';
import {Link} from 'react-router-dom';
import styled from 'styled-components';

import getDataNamaLembaga from '../GetData/GetDataNamaLembaga';
import getDataPeriode from './../GetData/GetDataPeriode';
import getDataSupervisorSekolah from './../GetData/GetDataSupervisorSekolah';
// import getDataSupervisorLembaga from './../GetData/GetDataSupervisorLembaga';

import {StyledButton, DisabledButton} from './../../../components/MKPPL/Button/Button';
import {makeStyles} from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

// Base URl end point to save changed data to backend
const URL = 'http://ppl-berkah-backend.herokuapp.com/api/v1/administrator/kelola-user/edit/';

// Message for form field and tooltip
const errorMessage = 'Wajib diisi';
const submitMessage = 'Data berhasil disimpan';

// Const for a few options to select praktikum
const options = [
  {value: '1', label: 'Praktikum 1'},
  {value: '2', label: 'Praktikum 2'},
];

// Styling for this form
const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(0),
    padding: theme.spacing(1),
    height: 40,
    width: '100%',
    backgroundColor: '#F2F2F2',
    borderRadius: '5px',
    marginBottom: '12px',
  },
}));

const StyledInput = styled.input`
  border: 0;
  flex: 1;
  background-color: #f2f2f2;
  width: 100%;
  margin-bottom: 12px;
`;

const CenterText = styled.h3`
  color: #404852;
  text-align: center;
  margin-bottom: 20px;
`;

const Wrapper = styled.div`
  width: 70%;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 24px;
  display: block;

  @media screen and (max-width: 600px) {
    width: 100%;
  }
`;

const Back = () => {
  return (
    <>
      <Link
        to='/admin/daftar-pengguna'
        style={{padding: '24px'}}
      >
        <h6>&lt;  Kembali</h6>
      </Link>
    </>
  );
};

/**
 * Post current change of form to backend using PUT method
 * @param {dict} value The dictionary for changed data.
 * @return {response} The status is 200 when succeded.
 * Location will reload adjusted with the changed data
 */
async function onSubmit(value) {
  const result = {
    'username': value.username,
    'email': value.email,
    'full_name': value.full_name,
    'username_supervisor_lembaga': value.spvLembaga,
    'username_supervisor_sekolah': value.spvSekolah,
    'jenis_praktikum_id': value.jenisPraktikum,
    'periode_id': value.periode,
    'npm': value.npm
  };

  try {
    const bearer = 'Bearer ' + localStorage.getItem('login_token');
    const requestOptions = {
      method: 'PUT',
      headers: {'Content-Type': 'application/json', 'Authorization': bearer},
      body: JSON.stringify(result),
    };
    const response = await fetch(URL + 'mahasiswa/' +
      result.username + '/', requestOptions);
    if (response.status === 200) {
      alert(submitMessage);
      window.location.reload(false);
    }
  } catch (error) {
    alert('Data tidak berhasil diubah\n\n' + error);
  }
}

/**
 * Form for kelola user mahasiswa
 * Form using React Hooks Form
 * @param {array} props The array of dict consisted of
 * default value from the input data CSV.
 * @return {html} The html form that consists of the value
 * from each attributes
 */
export default function FormMahasiswa(props) {
  const classes = useStyles();
  const dataPeriode = getDataPeriode();
  const dataLembaga = getDataNamaLembaga();
  const dataSupervisorSekolah = getDataSupervisorSekolah();
  // const dataSupervisorLembaga = getDataSupervisorLembaga();

  // Default values
  const dataMahasiswa = props.data.mahasiswa;
  const defaultValues = dataMahasiswa.user;
  defaultValues['npm'] = dataMahasiswa.npm;
  defaultValues['jenisPraktikum'] = props.data.list_praktikum.id;

  // Condition if supervisor is not NULL
  if (dataMahasiswa.supervisor_sekolah !== null) {
    defaultValues['spvSekolah'] = dataMahasiswa.supervisor_sekolah.user.username;
  } else {
    defaultValues['spvSekolah'] = '';
  }
  if (dataMahasiswa.supervisor_lembaga !== null) {
    defaultValues['lembaga'] = dataMahasiswa.supervisor_lembaga.lembaga.id;
    defaultValues['spvLembaga'] = dataMahasiswa.supervisor_lembaga.user.username;
  } else {
    defaultValues['lembaga'] = '';
    defaultValues['spvLembaga'] = '';
  }
  defaultValues['periode'] = dataMahasiswa.periode.id;

  const {register, handleSubmit, watch, control, formState, errors} = useForm({defaultValues});
  const {dirty} = formState;

  const idPraktikum = watch('jenisPraktikum');

  // useEffect(() => {
  //   setDataLembaga(getDataNamaLembaga());
  //   setDataSpvLembaga(getDataSupervisorLembaga(idPraktikum));
  // }, []);

  return (
    <>
      <Back />
      <CenterText>Kelola Akses</CenterText>

      <Wrapper>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div style={{width: '100%'}}>

            <label htmlFor="username">Username</label>
            <StyledInput type="text" name="username" ref={register()} disabled />
            {errors.username && <p style={{color: '#F24848'}}>{errorMessage}</p>}

            <label htmlFor="email">Email</label>
            <StyledInput type="email" name="email" ref={register({required: true})} />
            {errors.email && <p style={{color: '#F24848'}}>{errorMessage}</p>}

            <label htmlFor="full_name">Nama Lengkap</label>
            <StyledInput type="full_name" name="full_name" ref={register({required: true})} />
            {errors.full_name && <p style={{color: '#F24848'}}>{errorMessage}</p>}

            <label htmlFor="role">Role</label>
            <StyledInput type="text" name="role" ref={register()} disabled/>
            {errors.role && <p style={{color: '#F24848'}}>{errorMessage}</p>}

            <label htmlFor="npm">NPM</label>
            <StyledInput type="npm" name="npm" ref={register({required: true})} />
            {errors.npm && <p style={{color: '#F24848'}}>{errorMessage}</p>}

            <label htmlFor="jenisPraktikum">Jenis Praktikum</label>
            <Controller
              as={
                <Select className={classes.formControl} disableUnderline={true}>
                  {options.map((item, index) => (
                    <MenuItem key={index} value={item.value}>
                      {item.label}
                    </MenuItem>
                  ))}
                </Select>
              }
              control={control}
              name="jenisPraktikum"
            />

            <label htmlFor="periode">Periode</label>
            <Controller
              as={
                <Select className={classes.formControl} disableUnderline={true}>
                  {dataPeriode.map((item, index) => (
                    <MenuItem key={index} value={item.id}>
                      {item.nama}
                    </MenuItem>
                  ))}
                </Select>
              }
              control={control}
              name="periode"
            />
            <label htmlFor="spvSekolah">Username Supervisor Sekolah (Praktikum {idPraktikum})</label>
            <Controller
              as={
                <Select className={classes.formControl} disableUnderline={true}>
                  <MenuItem value='' disabled>
                    Pilih nama supervisor sekolah
                  </MenuItem>
                  {dataSupervisorSekolah.map((item, index) => (
                    <MenuItem key={index} value={item.user.username}>
                      {item.user.username}
                    </MenuItem>
                  ))}
                </Select>
              }
              control={control}
              name="spvSekolah"
            />

            <label htmlFor="spvLembaga">Username Supervisor Lembaga (Praktikum {idPraktikum})</label>
            <StyledInput type="text" name="spvLembaga" ref={register()} />
            {errors.spvLembaga && <p style={{color: '#F24848'}}>{errorMessage}</p>}

            {/* <label htmlFor="spvLembaga">Nama Supervisor Lembaga 1</label>
            <Controller
              as={
                <Select className={classes.formControl} disableUnderline={true}>
                  <MenuItem value='' disabled>
                    Pilih supervisor lembaga
                  </MenuItem>
                  {dataSupervisorLembaga.map((item, index) => (
                    <MenuItem key={index} value={item.user.username}>
                      {item.user.full_name}
                    </MenuItem>
                  ))}
                </Select>
              }
              control={control}
              name="spvLembaga"
            /> */}

            <label htmlFor="lembaga">Lembaga / Institusi</label>
            <Controller
              as={
                <Select className={classes.formControl} disableUnderline={true}>
                  <MenuItem value='' disabled>
                    Pilih nama lembaga
                  </MenuItem>
                  {dataLembaga.map((item, index) => (
                    <MenuItem key={index} value={item.id}>
                      {item.nama}
                    </MenuItem>
                  ))}
                </Select>
              }
              control={control}
              name="lembaga"
            />

            <div style={{position: 'relative', width: '100%', height: '60px', marginTop: '24px'}}>
              <div style={{position: 'absolute', right: '0'}}>
                <Link to='/admin/daftar-pengguna'>
                  <StyledButton secondary>Batal</StyledButton>
                </Link>
                {!dirty ?
                  <DisabledButton>Simpan</DisabledButton> :
                  <StyledButton primary type="submit">Simpan</StyledButton>
                }
              </div>
            </div>
          </div>
        </form>
      </Wrapper>
    </>
  );
}

FormMahasiswa.propTypes = {
  data: PropTypes.object,
};
