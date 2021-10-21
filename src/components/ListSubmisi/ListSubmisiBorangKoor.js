import React from 'react';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import {Col} from 'react-bootstrap';
import Chips from '../MKPPL/Chips/Chips';
import GrayChips from '../MKPPL/Chips/GrayChips';
import RedChips from '../MKPPL/Chips/RedChips';
import DocsIcon from './../../assets/MKPPL/docs.png';
import {IoIosArrowForward} from 'react-icons/io';

// Styled components
const DocsImage = styled.img`
  margin: 8px;
  width: 36px;
`;
const StyledButton = styled(Button)`
  border: 1px solid #DEDEDE;
  width: 100%;
`;
const StatusSpan = styled.span`
  display: inline-block;
`;
const StyledH3 = styled.h3`
  font-family: Nunito Sans;
  font-weight: bold;
  font-size: 18px;
  line-height: 25px;
  letter-spacing: 0.0025em;
  color: #404852;
  text-transform: capitalize;
`;
const StyledH5 = styled.h5`
  font-family: Nunito Sans;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 19px;
  color: #4F4F4F;
  text-transform: capitalize;
`;

/**
 *
 * @param {*} props
 */
export default function ListSubmisiBorangKoor(props) {
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
    deadlineStr = 'Deadline Tidak Ditentukan';
  }

  let terlambat = false;
  let textTerlambat = '';
  if (submisiStr !== null) {
    let selisih = (submisi.getTime() - deadline.getTime()) / (1000);
    if (selisih > 0) {
      terlambat = true;
      if (selisih >= 60 * 60 * 24) {
        selisih = Math.round(selisih / (60 * 60 * 24));
        textTerlambat = 'Terlambat ' + selisih + ' hari';
      } else if (selisih >= 60 * 60) {
        selisih = Math.round(selisih / (60 * 60));
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
      <StyledButton href={`/koordinator-kuliah/penilaian-laporan-borang/detail/${props.mahasiswa.user.username}/${props.laporan.id}`}>
        <Col sm="1">
          <DocsImage src={DocsIcon} alt='docs' />
        </Col>
        <Col sm="10">
          <StyledH3>{props.laporan.nama_laporan}</StyledH3>
          <StyledH5>Deadline: {deadlineStr}</StyledH5>
          {
                            (props.laporan.status_publikasi || props.laporan.status_submisi) ?
                                <>
                                  {
                                        props.laporan.skor_laporan_sekolah !== -1 ?
                                            <>
                                              <StyledH5 style={{color: '#4F4F4F'}}>
                                                {' '}
                                                <StatusSpan>
                                                  <Chips label='Sudah Dinilai' />
                                                </StatusSpan>
                                              </StyledH5>
                                              {
                                                    terlambat ?
                                                        <StyledH5 style={{color: 'red'}}>
                                                          {textTerlambat}
                                                        </StyledH5> :
                                                        <>
                                                        </>
                                              }
                                            </> :
                                            <>
                                              <StyledH5 style={{color: '#4F4F4F'}}>
                                                {' '}
                                                <StatusSpan>
                                                  <RedChips label='Menunggu Penilaian' />
                                                </StatusSpan>
                                              </StyledH5>
                                              {
                                                    terlambat ?
                                                        <StyledH5 style={{color: 'red'}}>
                                                          {textTerlambat}
                                                        </StyledH5> :
                                                        <>
                                                        </>
                                              }
                                            </>
                                  }
                                </> :
                                <>
                                  <StyledH5 style={{color: '#4F4F4F'}}>
                                    {' '}
                                    <StatusSpan>
                                      <GrayChips label='Belum Tersedia' />
                                    </StatusSpan>
                                  </StyledH5>
                                </>
          }
        </Col>
        <Col sm="1" style={{marginTop: '5px'}}>
          <IoIosArrowForward size={30} color='#DEDEDE'/>
        </Col>
      </StyledButton>
    </>
  );
}
