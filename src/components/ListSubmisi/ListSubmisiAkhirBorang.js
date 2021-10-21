import React from 'react';
import {Link} from 'react-router-dom';
import styled from 'styled-components';
import {Container, Row, Col} from 'react-bootstrap';
import Chips from '../MKPPL/Chips/Chips';
import GrayChips from '../MKPPL/Chips/GrayChips';
import RedChips from '../MKPPL/Chips/RedChips';
import DocsIcon from './../../assets/MKPPL/docs.png';


// Styled components
const DocsImage = styled.img`
  margin: 8px;
  width: 36px;
`;
const Wrapper = styled(Container)`
  padding: 16px;
`;
const GrayLine = styled.div`
  border: 0.8px solid #dedede;
  width: 100%;
`;
const StatusSpan = styled.span`
  display: inline-block;
`;
/**
 *
 * @param {*} props
 */
export default function ListSubmisiAkhirBorang(props) {
  let deadlineStr = props.laporan.waktu_deadline;
  if (deadlineStr !== null) {
    const deadlineStrTime = 'T' + deadlineStr.split(' ')[1] + ':00';
    const deadlineStrDate = deadlineStr.split(' ')[0].split('-').reverse().join('-');
    var deadline = new Date(deadlineStrDate + deadlineStrTime);
  }
  const submisiStr = props.laporan.waktu_submisi;
  if (submisiStr !== null) {
    const submisiStrTime = 'T' + submisiStr.split(' ')[1] + ':00';
    const submisiStrDate = submisiStr.split(' ')[0].split('-').reverse().join('-');
    var submisi = new Date(submisiStrDate + submisiStrTime);
  }
  // var daedlineStr = dateFormat(deadline, "dddd, mmmm dS, yyyy, h:MM:ss TT");
  // var submisiStr = dateFormat(submisi, "dddd, mmmm dS, yyyy, h:MM:ss TT");
  if (deadlineStr !== null) {
    const options = {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric'};
    deadlineStr = deadline.toLocaleDateString('id-ID', options);
  } else {
    deadlineStr = '';
  }

  let terlambat = false;
  let textTerlambat = '';
  if (submisiStr !== null) {
    let selisih = (submisi.getTime() - deadline.getTime()) / (1000);
    if (selisih > 0) {
      terlambat = true;
      if (selisih >= 60*60*24) {
        selisih = Math.round(selisih / (60*60*24));
        textTerlambat = 'Terlambat ' + selisih + ' hari';
      } else if (selisih >= 60*60) {
        selisih = Math.round(selisih / (60*60));
        textTerlambat = 'Terlambat ' + selisih + ' jam';
      } else if (selisih >= 60) {
        selisih = Math.round(selisih / 60);
        textTerlambat = 'Terlambat ' + selisih + ' menit';
      } else {
        selisih = Math.round(selisih);
        textTerlambat = 'Terlambat ' + selisih + ' detik';
      }
    }
  }
  return (
    <>
      <Wrapper>
        <Row>
          <Col sm="2">
            <DocsImage src={DocsIcon} alt='docs' />
          </Col>
          <Col sm="10">
            { props.action === 'Akhir' ? 
              <Link to={`/spv-sekolah/penilaian-laporan-akhir/detail/${props.mahasiswa.user.username}/${props.laporan.id}`}>
                <h3>{props.laporan.nama_laporan}</h3>
              </Link> :
              <Link to={`/spv-sekolah/penilaian-laporan-borang/detail/${props.mahasiswa.user.username}/${props.laporan.id}`}>
                <h3>{props.laporan.nama_laporan}</h3>
              </Link>
            }
            <h5>Deadline: {deadlineStr}</h5>
            {
            (props.laporan.status_publikasi || props.laporan.status_submisi) ?
                <>
                  {
                    props.laporan.skor_laporan_sekolah !== -1 ?
                        <>
                          <h5 style={{color: '#4F4F4F'}}>
                            {' '}
                            <StatusSpan>
                              <Chips label='Sudah Dinilai' />
                            </StatusSpan>
                          </h5>
                          {
                          terlambat ?
                            <h5 style={{color: 'red'}}>
                              {textTerlambat}
                            </h5> :
                            <>
                            </>
                          }
                        </> :
                        <>
                          <h5 style={{color: '#4F4F4F'}}>
                            {' '}
                            <StatusSpan>
                              <RedChips label='Menunggu Penilaian' />
                            </StatusSpan>
                          </h5>
                          {
                          terlambat ?
                            <h5 style={{color: 'red'}}>
                              {textTerlambat}
                            </h5> :
                            <>
                            </>
                          }
                        </>
                  }
                </> :
                <>
                  <h5 style={{color: '#4F4F4F'}}>
                    {' '}
                    <StatusSpan>
                      <GrayChips label='Belum Tersedia' />
                    </StatusSpan>
                  </h5>
                </>
            }
          </Col>
        </Row>
      </Wrapper>
      <GrayLine />
    </>
  );
}
