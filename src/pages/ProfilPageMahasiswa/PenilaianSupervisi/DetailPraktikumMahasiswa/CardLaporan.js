import React, {Component} from 'react';
import Chips from '../../../../components/MKPPL/Chips/Chips';
import IconButton from '@material-ui/core/IconButton';
import ArrowForwardIosRoundedIcon from '@material-ui/icons/ArrowForwardIosRounded';
import {Link} from 'react-router-dom';
import {Container, Row, Col} from 'react-bootstrap';
import styled from 'styled-components';
import DocsIcon from '../../../../assets/MKPPL/docs.png';

const Wrapper = styled(Container)`
  padding: 16px;
  width: 100%;
  border: 1px solid #dedede;
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

class CardLaporan extends Component {
  render() {
    return (
      <>
        <Wrapper classnames="align-items-center">
          <Row>
            <Col xs="1" style={{paddingTop: '1.2vw'}}>
              <DocsImage src={DocsIcon} alt="docs"/>
            </Col>
            <Col xs="9">
              <Link to={this.props.urldetail}>
                <h4>{this.props.nama_laporan}</h4>
              </Link>
              <h6>Deadline: <b>{this.props.deadline}</b></h6>
              <Row>
                <Col sm="5">
                  <Chips
                    label={
                      this.props.status_submisi ?
                        'Sudah Mengumpulkan' :
                        'Belum Mengumpulkan'
                    }
                    bool={this.props.status_submisi ? 'true' : 'false'}
                  />
                </Col>
                {/* {txtSisaDeadline ? (
                  this.props.status_submisi ? (
                    <Col sm="7">
                      <h6 style={{ color: "#F24848" }}>{txtSisaDeadline}</h6>
                    </Col>
                  ) : null
                ) : null} */}
              </Row>
            </Col>
            <Col xs="2" style={{paddingTop: '1.2vw'}}>
              <Link to={this.props.urldetail}>
                <IconButton aria-label="arrow" color="primary">
                  <ArrowForwardIosRoundedIcon />
                </IconButton>
              </Link>
            </Col>
          </Row>
        </Wrapper>
      </>
    );
  }
}

export default CardLaporan;
