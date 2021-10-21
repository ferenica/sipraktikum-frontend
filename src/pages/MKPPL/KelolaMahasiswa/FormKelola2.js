import 'date-fns';
import React from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import {Link} from 'react-router-dom';

import styled from 'styled-components';

import {useForm, useFieldArray, Controller} from 'react-hook-form';
import {Switch} from '@material-ui/core';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import TextField from '@material-ui/core/TextField';
import 'react-datepicker/dist/react-datepicker.css';
import {StyledButton, DisabledButton} from '../../../components/MKPPL/Button/Button';

import DocsIcon from './../../../assets/MKPPL/docs.png';

const URL = 'http://ppl-berkah-backend.herokuapp.com/api/v1/mahasiswa/praktikum/laporan-update/';

const Wrapper = styled(Container)`
  padding: 16px;
  border: 1px solid #DEDEDE;
  border-radius: 5px;
  margin-bottom: 8px;
`;
const CenterDiv = styled.div`
  width: 70%;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 24px;
  display: block;

  @media screen and (max-width: 600px) {
    width: 100%;
  }
`;
const DocsImage = styled.img`
  width: 36px;
  position: absolute;
  top: 0;
  bottom: 0;
  margin: auto;
  @media screen and (max-width: 600px) {
    display: none;
  }
`;

const StyledInput = styled.input`
  border: 0;
  flex: 1;
  background-color: #f2f2f2;
  width: 100%;
  margin-bottom: 12px;
`;

const GrayLine = styled.div`
  border: 1px solid #DEDEDE;
  width: 100%;
  margin-top: 24px;
  margin-bottom: 36px;
`;

const CenterText = styled.h3`
  color: #404852;
  text-align: center;
  margin-bottom: 20px;
`;

let defaultValues;

export default function FormKelola2(props) {
  defaultValues = {
    username_mahasiswa: props.username,
    username_supervisor_lembaga: props.objSupervisorLembaga.user.username,
    laporan_mingguan: props.dataLaporanMingguan,
    laporan_akhir: props.dataLaporanAkhir,
    laporan_borang: props.dataLaporanBorang,
  };

  const {register, control, handleSubmit, formState} = useForm({defaultValues});
  const {dirty} = formState;

  console.log(defaultValues);
  const {fields} = useFieldArray(
      {
        control,
        name: 'laporan_mingguan',
      },
  );

  // alert(JSON.stringify(data, null, 2));
  async function onSubmit(value) {
    console.log(defaultValues);
    const result = {
      username_mahasiswa: defaultValues.username_mahasiswa,
      username_supervisor_lembaga: value.username_supervisor_lembaga,
      laporan_mingguan: [],
      laporan_akhir: [],
      laporan_borang: [],
    };

    defaultValues.laporan_mingguan.map((laporan) => (
      result.laporan_mingguan.push({
        'jenis_praktikum': laporan.jenis_praktikum,
        'nama_laporan': laporan.nama_laporan,
        'waktu_deadline': laporan.waktu_deadline,
        'status_publikasi': laporan.status_publikasi,
      })
    ));
    // try {
    //   const bearer = 'Bearer ' + localStorage.getItem('login_token');
    //   const requestOptions = {
    //     method: 'PUT',
    //     headers: {'Content-Type': 'application/json', 'Authorization': bearer},
    //     body: JSON.stringify(result),
    //   };
    //   const response = await fetch(URL + 'mahasiswa/' +
    //     result.username + '/', requestOptions);
    //   if (response.status === 201) {
    //     alert('Data berhasil disimpan!');
    //     window.location.reload(false);
    //   }
    // } catch (error) {
    //   alert('Data tidak berhasil diubah\n\n' + error);
    // }
  }

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CenterDiv>
          <label>Username Supervisor Lembaga</label>
          <StyledInput type="text" name="username_supervisor_lembaga" ref={register({required: true})} />
        </CenterDiv>

        <div style={{width: '100%'}}>
          <GrayLine/>
          <CenterText>Kelola Laporan Praktikum</CenterText>
          <h4><b>Laporan Mingguan</b></h4>
          {fields.map((item, index) => {
            return (
              <div key={index} style={{position: 'relative'}}>
                <Wrapper classnames="align-me">
                  <Row>
                    <Col sm='1'>
                      <DocsImage src={DocsIcon} alt="docs"/>
                    </Col>
                    <Col sm='3'>
                      <h4 name={`laporan_mingguan[${index}].nama_laporan`}><b>{`${item.nama_laporan}`}</b></h4>
                    </Col>
                    <Col sm='5'>
                      <Controller
                        as={
                          <TextField
                            id="datetime-local"
                            label="Deadline"
                            color="primary"
                            type="datetime-local"
                            // format="dd-MM-yyyy HH:mm"
                            InputLabelProps={{
                              shrink: true,
                            }}
                          />}
                        name={`laporan_mingguan[${index}].waktu_deadline`}
                        control={control}
                        ref={register()}
                      />
                    </Col>
                    <Col sm='3'>
                      <Controller
                        as={
                          <FormControlLabel
                            control={<Switch color="primary" />}
                            label="Tampilkan"
                            labelPlacement="start"
                          />}
                        name={`laporan_mingguan[${index}].status_publikasi`}
                        type="checkbox"
                        control={control}
                        ref={register()}
                      />
                    </Col>
                  </Row>
                </Wrapper>
              </div>
            // <li key={item.id}>
            //   <h5>{`${item.nama_laporan}`}</h5>
            //   {/* <input
            //     name={`laporan_mingguan[${index}].nama_laporan`}
            //     defaultValue={`${item.nama_laporan}`} // make sure to set up defaultValue
            //     ref={register()}
            //   /> */}

            //   <Controller
            //     as={<input/>}
            //     name={`laporan_mingguan[${index}].waktu_deadline`}
            //     control={control}
            //     defaultValue={item.waktu_deadline} // make sure to set up defaultValue
            //   />

            //   <Controller
            //     as={  <TextField
            //       id="datetime-local"
            //       label="Next appointment"
            //       type="datetime-local"
            //       defaultValue="2017-05-24T10:30"
            //       InputLabelProps={{
            //         shrink: true,
            //       }}
            //     />}
            //     control={control}
            //     valueName="selected" // DateSelect value's name is selected
            //     onChange={([selected]) => selected}
            //     name="ReactDatepicker"
            //     className="input"
            //     placeholderText="Select date"
            //   />
            //   <Controller
            //     as={
            //     <FormControlLabel
            //       control={<Switch color="primary" />}
            //       label="Tampilkan"
            //       labelPlacement="start"
            //     />}
            //     name={`laporan_mingguan[${index}].status_publikasi`}
            //     type="checkbox"
            //     control={control}
            //   />
            // </li>
            );
          })}
          <GrayLine/>
          <h4><b>Laporan Akhir</b></h4>
          <GrayLine/>
          <h4><b>Borang Penilaian</b></h4>
        </div>

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
      </form>
    </div>
  );
}
