import React from 'react';
import styled from 'styled-components';

import {connect} from 'react-redux';
import {Field, FieldArray, reduxForm} from 'redux-form';
import {load as loadSubmisi} from './submisi';
import validate from './validate';

import {StyledButton, DisabledButton} from '../../../components/MKPPL/Button/Button';
import RenderSubmisi from './Field/RenderSubmisi';
import RenderUsernameLembaga from './Field/RenderUsernameLembaga';
import CancelConfirmationModal from './Modal/CancelConfirmationModal';

// Styled Components
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

let FormKelola = (props) => {
  // Const to handle action and get props data
  const {
    handleSubmit,
    load,
    username,
    dataLaporanMingguan,
    dataLaporanAkhir,
    dataLaporanBorang,
    objSupervisorLembaga,
    idLembaga,
  } = props;

  // Data that will be sent to backend
  const data = {
    username_mahasiswa: username,
    username_supervisor_lembaga: objSupervisorLembaga.user.username,
    laporan_mingguan: [],
    laporan_akhir: [],
    laporan_borang: [],
  };

  dataLaporanMingguan.map((laporan) => {
    let deadline;
    if (laporan.waktu_deadline == null || laporan.waktu_deadline === '') {
      deadline = null;
    } else {
      deadline = laporan.waktu_deadline;
    }
    data.laporan_mingguan.push({
      'jenis_praktikum': laporan.jenis_praktikum,
      'nama_laporan': laporan.nama_laporan,
      'waktu_deadline': deadline,
      'status_publikasi': laporan.status_publikasi,
    });
  },
  );

  dataLaporanAkhir.map((laporan) => {
    let deadline;
    if (laporan.waktu_deadline == null || laporan.waktu_deadline === '') {
      deadline = null;
    } else {
      deadline = laporan.waktu_deadline;
    }
    data.laporan_akhir.push({
      'jenis_praktikum': laporan.jenis_praktikum,
      'nama_laporan': laporan.nama_laporan,
      'waktu_deadline': deadline,
      'status_publikasi': laporan.status_publikasi,
    });
  },
  );

  dataLaporanBorang.map((laporan) => {
    let deadline;
    if (laporan.waktu_deadline == null || laporan.waktu_deadline === '') {
      deadline = null;
    } else {
      deadline = laporan.waktu_deadline;
    }
    data.laporan_borang.push({
      'jenis_praktikum': laporan.jenis_praktikum,
      'nama_laporan': laporan.nama_laporan,
      'waktu_deadline': deadline,
      'status_publikasi': laporan.status_publikasi,
    });
  },
  );
  // {dataLaporanMingguan.map((laporan) => (
  //   data.laporan_mingguan.push({
  //     'jenis_praktikum': laporan.jenis_praktikum,
  //     'nama_laporan': laporan.nama_laporan,
  //     'waktu_deadline': laporan.waktu_deadline,
  //     'status_publikasi': laporan.status_publikasi,
  //   })
  // ));}

  // console.log(data)
  load(data);

  // Const for modal and routing
  const [open, setOpen] = React.useState(false);
  const [isChange, setIsChange] = React.useState(false);

  return (
    <form
      onSubmit={handleSubmit}
      onChange={() => setIsChange(true)}
      onBlur={() => setIsChange(true)}
    >
      <Wrapper>
        <Field
          name="username_supervisor_lembaga"
          component={RenderUsernameLembaga}
          label="Supervisor Lembaga"
          idlembaga={idLembaga}
        />
      </Wrapper>

      <div style={{width: '100%'}}>
        <GrayLine/>
        <CenterText>Kelola Laporan Praktikum</CenterText>
        <h4><b>Laporan Mingguan</b></h4>
        <FieldArray name="laporan_mingguan" type="isLaporanMingguan" component={RenderSubmisi} />
        <GrayLine/>
        <h4><b>Laporan Akhir</b></h4>
        <FieldArray name="laporan_akhir" component={RenderSubmisi} />
        <GrayLine/>
        <h4><b>Borang Penilaian</b></h4>
        <FieldArray name="laporan_borang" component={RenderSubmisi} />
      </div>

      <div style={{position: 'relative', width: '100%', height: '60px', marginTop: '24px'}}>
        <div style={{position: 'absolute', right: '0'}}>
          <StyledButton
            type="reset"
            secondary
            onClick={isChange ?
              () => setOpen(true) :
              () => window.location.replace('/spv-sekolah/penilaian')}
          >
            Batal
          </StyledButton>
          {isChange ? <StyledButton primary type="submit">Simpan</StyledButton> :
          <DisabledButton>Simpan</DisabledButton>}
        </div>
      </div>
      <CancelConfirmationModal open={open} onClose={() => setOpen(false)}/>
    </form>
  );
};

// Decorate with reduxForm(). It will read the initialValues prop provided by connect()
FormKelola = reduxForm({
  form: 'initializeFromState',
  validate,
  enableReinitialize: true,
})(FormKelola);

// You have to connect() to any reducers that you wish to connect to yourself
FormKelola = connect(
    (state) => ({
      initialValues: state.submisi.data, // pull initial values from account reducer
    }),
    {load: loadSubmisi}, // bind account loading action creator
)(FormKelola);

export default FormKelola;
