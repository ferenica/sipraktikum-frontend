import React from 'react';
import PropTypes from 'prop-types';
import {useForm, Controller} from 'react-hook-form';
import {Link} from 'react-router-dom';
import styled from 'styled-components';

import convertRoleToURL from './../DaftarUser/ConvertRoleToUrl';

import {StyledButton, DisabledButton} from './../../../components/MKPPL/Button/Button';
import {makeStyles} from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

// Base URl end point to save changed data to backend
const URL = 'http://ppl-berkah-backend.herokuapp.com/api/v1/administrator/kelola-user/edit/';

// Message for form field and tooltip
const errorMessage = 'Wajib diisi';

// Const for current role and a few options to select
let currentRole = '';

const options = [
  {value: 'Administrator', label: 'Administrator'},
  {value: 'Koordinator Praktikum', label: 'Koordinator Praktikum'},
  {value: 'Supervisor Sekolah', label: 'Supervisor Sekolah'},
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
 * @param {dict} value The disctionary for changed data.
 * @return {response} The status is 200 when succeded.
 * Location will replace adjusted with the changed role
 */
async function onSubmit(value) {
  const result = {
    username: value.username,
    email: value.email,
    full_name: value.full_name,
    role: value.role,
  };
  const changedRole = convertRoleToURL(result.role);

  try {
    const bearer = 'Bearer ' + localStorage.getItem('login_token');
    const requestOptions = {
      method: 'PUT',
      headers: {'Content-Type': 'application/json', 'Authorization': bearer},
      body: JSON.stringify(result),
    };
    const response = await fetch(URL +
      currentRole + '/' + result.username + '/', requestOptions);

    if (response.status === 200) {
      window.location.replace(`/admin/kelola/${changedRole}/${result.username}/`);
      alert('Data berhasil disimpan!');
    }
  } catch (error) {
    alert('Data tidak berhasil diubah\n\n' + error);
  }
}

/**
 * Form for kelola user dosen, such as
 * administator, supervisor sekolah, and koordinator kuliah
 * Form using React Hooks Form
 * @param {array} props The array of dict consisted of
 * default value from the input data CSV.
 * @return {html} The html form that consists of the value
 * from each attributes
 */
export default function FormDosen(props) {
  currentRole = props.role;
  const classes = useStyles();
  const defaultValues = props.data.user;
  defaultValues['nip'] = props.data.nip;

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
            <StyledInput type="text" name="username" ref={register({required: true})} disabled />
            {errors.username && <p style={{color: '#F24848'}}>{errorMessage}</p>}

            <label htmlFor="email">Email</label>
            <StyledInput type="email" name="email" ref={register({required: true})} />
            {errors.email && <p style={{color: '#F24848'}}>{errorMessage}</p>}

            <label htmlFor="full_name">Nama Lengkap</label>
            <StyledInput type="full_name" name="full_name" ref={register({required: true})} />
            {errors.full_name && <p style={{color: '#F24848'}}>{errorMessage}</p>}

            <label htmlFor="role">Role</label>
            <Controller
              // as={<Option items={options} label="Role"/>}
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
              name="role"
              defaultValue={defaultValues['role']}
            />

            <label htmlFor="nip">NIP</label>
            <StyledInput type="text" name="nip" ref={register({required: true})} disabled />
            {errors.nip && <p style={{color: '#F24848'}}>{errorMessage}</p>}

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

FormDosen.propTypes = {
  data: PropTypes.object,
  role: PropTypes.string,
};
