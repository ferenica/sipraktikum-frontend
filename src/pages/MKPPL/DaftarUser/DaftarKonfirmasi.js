import React, {useState} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {Link, Redirect} from 'react-router-dom';
import {useForm, Controller} from 'react-hook-form';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import {makeStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

import {StyledButton, DisabledButton} from './../../../components/MKPPL/Button/Button';

// Base URl end point to save changed data to backend
const URLedit = 'http://ppl-berkah-backend.herokuapp.com/api/v1/administrator/kelola-user/edit/mahasiswa/';
const URLdetail = 'http://ppl-berkah-backend.herokuapp.com/api/v1/administrator/kelola-user/detail/mahasiswa/';

// Message for form field and tooltip
const submitMessage = 'Data berhasil disimpan';

const GrayLine = styled.div`
  border: 1px solid #dedede;
  width: 100%;
`;

const StyledInput = styled.input`
  border: 0;
  flex: 1;
  background-color: #f2f2f2;
  width: 100%;
  margin-bottom: 12px;
`;

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

function namaSupervisorHandler (item) {
  if (item === null) {
    return '';
  } else {
    return item.user.username;
  }
}

async function fetchDataFromServer(name) {
  try {
    const bearer = 'Bearer ' + localStorage.getItem('login_token');
    const requestOptions = {
      method: 'GET',
      headers: {'Content-Type': 'application/json', 'Authorization': bearer},
    };
    const awaitResponse = await fetch(URLdetail + name + '/',
        requestOptions,
    )
        .then((response) => response.json())
        .then((data) => {
          const dataUser = {
            username: data.data.mahasiswa.user.username,
            email: data.data.mahasiswa.user.email,
            nama_lengkap: data.data.mahasiswa.user.full_name,
            username_supervisor_lembaga: namaSupervisorHandler(data.data.mahasiswa.supervisor_lembaga),
            username_supervisor_sekolah: namaSupervisorHandler(data.data.mahasiswa.supervisor_sekolah),
            jenis_praktikum_id: data.data.list_praktikum.id,
            periode_id: data.data.mahasiswa.periode.id,
            npm: data.data.mahasiswa.npm,
          };
          return dataUser;
        });
    return awaitResponse;
  } catch (error) {
    console.log(error)
  }
}

// Class to get all mahasiswa from API
// and return the result as a component
export default function DaftarKonfirmasi(props) {
  const [redirect, setRedirect] = useState(0)
  const classes = useStyles();
  
  const addUsername = props.selectedAddUsername.split(',').map(function(s) {
    return s.split(' ');
  });
  const removeUsername = props.selectedRemoveUsername.split(',').map(function(s) {
    return s.split(' ');
  });

  const defaultValues = {};
  defaultValues['jenisPraktikum'] = 1;

  const {handleSubmit, control, formState} = useForm({defaultValues});
  const {dirty} = formState;

  function list(item) {
    return item.split(',').join('\n');
  }

  function listCount(item) {
    return item.split(',').length;
  }

  async function onSubmit(value) {
    var result = {};
    if (props.selectedAddUsername !== 'Empty') {
      addUsername.map((name, index) => {
        updateData(name, result, value, index,'add');
      });
    }
    if (props.selectedRemoveUsername !== 'Empty') {
      removeUsername.map((name, index) => {
        updateData(name, result, value, index,'remove');
      });
    }
  }

  function updateData(name, result, value, index, action) {
    fetchDataFromServer(name).then(response => {
      var supervisor_lembaga = '';
      if (props.selectedRole === 'Supervisor Lembaga') {
        if(action === 'add') {
          supervisor_lembaga = props.selectedUsername;
        }
      } else {
        supervisor_lembaga = response.username_supervisor_lembaga
      }

      var supervisor_sekolah = '';
      if (props.selectedRole === 'Supervisor Sekolah') {
        if(action === 'add') {
          supervisor_sekolah = props.selectedUsername;
        }
      } else {
        supervisor_sekolah = response.username_supervisor_sekolah
      }

      var praktikum_id = value.jenisPraktikum;
      if(action === 'remove') {
        praktikum_id = response.jenis_praktikum_id;
      }

      result = {
        'username': response.username,
        'email': response.email,
        'nama_lengkap': response.nama_lengkap,
        'username_supervisor_lembaga': supervisor_lembaga,
        'username_supervisor_sekolah': supervisor_sekolah,
        'jenis_praktikum_id': praktikum_id,
        'periode_id': response.periode_id,
        'npm': response.npm,
      };
    }).then(
      res => {
        try {
          const bearer = 'Bearer ' + localStorage.getItem('login_token');
          const requestOptions = {
            method: 'PUT',
            headers: {'Content-Type': 'application/json', 'Authorization': bearer},
            body: JSON.stringify(result),
          };
          fetch(URLedit + name + '/', requestOptions).then(response => {
            if (response.status === 200 && index === addUsername.length - 1) {
              alert(submitMessage);
              setRedirect(1);
            } else if (response.status !== 200) {
              alert('Data ' + name + ' tidak berhasil diubah');
            }
          });
        } catch (error) {
          console.log(error)
        }
      }
    );
  }

  return (
    <>
      <ul style={{padding: 0, textAlign: 'center', fontWeight: 'bold'}}>
        {'Konfirmasi Penugasan'}
      </ul>
      {props.selectedAddMahasiswa !== 'Empty' ?
        <ul style={{padding: 0, textAlign: 'center', fontWeight: 'bold', fontSize: 20}}>
          {'Pilih Jenis Praktikum Aktif'}
        </ul> : ''
      }
      <GrayLine />
      <Wrapper>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div style={{width: '100%', marginTop: '40px'}}>
            
            <label htmlFor="jenisPraktikum">Jenis Praktikum Aktif</label>
            {props.selectedAddMahasiswa !== 'Empty' ?
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
              : <StyledInput type="text" name="namaSupervisor" defaultValue={"Default"} disabled/>
            }

            <label>Nama Supervisor</label>
            <StyledInput type="text" name="namaSupervisor" defaultValue={props.selectedUser} disabled/>

            <TextField name="addMahasiswa" value={list(props.selectedAddMahasiswa)} label="Daftar Add Mahasiswa" variant="standard" 
              multiline rows={listCount(props.selectedAddMahasiswa)} style = {{width: 500, marginBottom: 24, marginTop: 12}} disabled/>

            <TextField name="removeMahasiswa" value={list(props.selectedRemoveMahasiswa)} label="Daftar Remove Mahasiswa" variant="standard" 
              multiline rows={listCount(props.selectedRemoveMahasiswa)} style = {{width: 500, marginBottom: 12}} disabled/>

            <div style={{position: 'relative', width: '100%', height: '60px', marginTop: '24px'}}>
              <div style={{position: 'absolute', right: '0'}}>
                <Link to=''>
                  <StyledButton secondary>Batal</StyledButton>
                </Link>
                <Link to={{pathname: `/admin-penugasan-mahasiswa/${props.selectedRole}/${props.selectedUser}/${props.selectedUsername}`}}>
                  <StyledButton secondary>Kembali</StyledButton>
                </Link>
                {!dirty && props.selectedAddMahasiswa !== 'Empty' ?
                  <DisabledButton>Simpan</DisabledButton> :
                  <StyledButton primary type="submit">Simpan</StyledButton>
                }
                {redirect === 1 ? <Redirect to='/' /> : ''}
              </div>
            </div>
          </div>
        </form>
      </Wrapper>
    </>
  );
}

DaftarKonfirmasi.propTypes = {
  api: PropTypes.string,
  type: PropTypes.string,
};
