import React from 'react';
import PropTypes from 'prop-types';
import {useForm, Controller} from 'react-hook-form';
import {Link} from 'react-router-dom';
import styled from 'styled-components';

import getDataNamaLembaga from '../GetData/GetDataNamaLembaga';

import {StyledButton, DisabledButton} from './../../../components/MKPPL/Button/Button';
import {makeStyles} from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

// Base URl end point to save changed data to backend
const URL = 'http://ppl-berkah-backend.herokuapp.com/api/v1/administrator/kelola-user/edit/';

// Message for form field and tooltip
const errorMessage = 'Wajib diisi';
const submitMessage = 'Data berhasil disimpan';
const submitMessageStatus = 'Data berhasil disimpan dan status keaktifan telah diubah';

let previousStatus = 0;

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
    username: value.username,
    email: value.email,
    full_name: value.full_name,
    lembaga_id: value.lembaga,
    jabatan: value.jabatan,
    is_active: value.is_active
  };

  try {
    const bearer = 'Bearer ' + localStorage.getItem('login_token');
    const requestOptions = {
      method: 'PUT',
      headers: {'Content-Type': 'application/json', 'Authorization': bearer},
      body: JSON.stringify(result),
    };
    const response = await fetch(URL + 'supervisor-lembaga/' +
      result.username + '/', requestOptions);

    if (response.status === 200) {
      if (previousStatus !== result.is_active){
        alert(submitMessageStatus);
      } else {
        alert(submitMessage);
      }
      window.location.reload(false);
    }
  } catch (error) {
    alert('Data tidak berhasil diubah\n\n' + error);
  }
}

/**
 * Form for kelola user supervisor lembaga
 * Form using React Hooks Form
 * @param {array} props The array of dict consisted of
 * default value from the input data CSV.
 * @return {html} The html form that consists of the value
 * from each attributes
 */
export default function FormSupervisorLembaga(props) {
  const classes = useStyles();
  const dataLembaga = getDataNamaLembaga();
  const status = [{id: 0, is_active: "Tidak aktif"}, {id: 1, is_active: "Aktif"}]
  const value = props.is_active === true ? 1 : 0;
  const defaultValues = props.data.user;
  defaultValues['lembaga'] = props.data.lembaga.id;
  defaultValues['jabatan'] = props.data.jabatan;
  defaultValues['is_active'] = value;
  previousStatus = value;

  const {register, handleSubmit, formState, control, errors} = useForm({defaultValues});
  const {dirty} = formState;

  return (
    <>
      <Back />
      <CenterText>Kelola Akses</CenterText>

      <Wrapper>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div style={{width: '100%'}}>

            <label htmlFor="username">Username</label>
            <StyledInput type="text" name="username" ref={register()} disabled/>
            {errors.username && <p style={{color: '#F24848'}}>{errorMessage}</p>}

            <label htmlFor="email">Email</label>
            <StyledInput type="email" name="email" ref={register({required: true})} />
            {errors.email && <p style={{color: '#F24848'}}>{errorMessage}</p>}

            <label htmlFor="full_name">Nama Lengkap</label>
            <StyledInput type="full_name" name="full_name" ref={register({required: true})} />
            {errors.full_name && <p style={{color: '#F24848'}}>{errorMessage}</p>}

            <label htmlFor="role">Role</label>
            <StyledInput type="text" name="role" ref={register()} disabled/>

            <label htmlFor="lembaga">Lembaga/Institusi</label>
            <Controller
              as={
                <Select className={classes.formControl} disableUnderline={true}>
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

            <label htmlFor="jabatan">Jabatan</label>
            <StyledInput type="text" name="jabatan" ref={register({required: true})} />
            {errors.jabatan && <p style={{color: '#F24848'}}>{errorMessage}</p>}

            <label htmlFor="is_active">Status Akses</label>
            <Controller
              as={
                <Select className={classes.formControl} disableUnderline={true}>
                  {status.map((item, index) => (
                    <MenuItem key={index} value={item.id}>
                      {item.is_active}
                    </MenuItem>
                  ))}
                </Select>
              }
              control={control}
              name="is_active"
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

FormSupervisorLembaga.propTypes = {
  data: PropTypes.object,
  role: PropTypes.string,
};
