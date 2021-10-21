import React from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import {Field} from 'redux-form';
import styled from 'styled-components';

import RenderDateTimePicker from './RenderDateTimePicker';
import RenderSwitch from './RenderSwitch';
import RenderTextField from './RenderTextField';
import Button from '@material-ui/core/Button';

import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import DocsIcon from './../../../../assets/MKPPL/docs.png';

const Wrapper = styled(Container)`
  padding: 16px;
  border: 1px solid #DEDEDE;
  border-radius: 5px;
  margin-bottom: 8px;
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

const Link = styled.div`
  &:hover {
    text-decoration: underline;
    padding: auto;
    cursor: pointer;
  }
`;

let today = new Date();
const dd = String(today.getDate()).padStart(2, '0');
const MM = String(today.getMonth() + 1).padStart(2, '0');
const yyyy = today.getFullYear();
today = dd + '-' + MM + '-' + yyyy + ' 23:59';

function RenderSubmisi({fields, type, meta: {error}}) {
  const indexNewLaporan = fields.length + 1;
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };
  return (
    <>
      <div>
        {fields && fields.map((submisi, index) =>
          <div key={index} style={{position: 'relative'}}>
            <Wrapper classnames="align-me">
              <Row>
                <Col sm='1'>
                  <DocsImage src={DocsIcon} alt="docs"/>
                </Col>
                <Col sm='4'>
                  <Field
                    name={`${submisi}.nama_laporan`}
                    component={RenderTextField}
                    label="Nama Laporan" />
                </Col>
                <Col sm='4'>
                  <Field
                    name={`${submisi}.waktu_deadline`}
                    component={RenderDateTimePicker}
                    label="Deadline"
                  />
                </Col>
                <Col sm='3'>
                  <h5>Tampilkan:</h5>
                  <Field
                    name={`${submisi}.status_publikasi`}
                    component={RenderSwitch}
                    label="Tampilkan:"
                  />
                </Col>
                {/* <Col sm='2'>
                  <div style={{color: '#F24848'}}>
                    <DeleteModal/>
                    <DeleteIcon
                      onClick={() => fields.remove(index)}
                      style={{
                        position: 'absolute',
                        top: 0,
                        bottom: 0,
                        margin: 'auto',
                      }}/>
                  </div>
                </Col> */}
              </Row>
            </Wrapper>
          </div>,


        )}
      </div>
      {error && <h4 style={{color: '#F24848'}}>{error}</h4>}

      {type === 'isLaporanMingguan' ?
        <>
          <Link
            style={{color: '#FF8326'}}
            onClick={() => {
              handleClick(); fields.push({
                'jenis_praktikum': 'Praktikum 1',
                'nama_laporan': 'Laporan Minggu ' + indexNewLaporan,
                'waktu_deadline': today,
                'status_publikasi': false,
              });
            }}>
            + TAMBAH SUBMISI BARU
          </Link>
          <Snackbar
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            open={open}
            autoHideDuration={8000}
            onClose={handleClose}
            message= {`Laporan Minggu ${indexNewLaporan-1} ditambahkan`}
            action={
              <>
                <Button
                  color="primary"
                  size="small"
                  onClick={() => {
                    fields.remove(indexNewLaporan-2); handleClose();
                  }}
                >
                  Batalkan
                </Button>
                <IconButton
                  size="small"
                  aria-label="close"
                  color="inherit"
                  onClick={handleClose}
                >
                  <CloseIcon fontSize="small" />
                </IconButton>
              </>
            }/>
        </> : ''
      }
    </>
  );
}

export default RenderSubmisi;
