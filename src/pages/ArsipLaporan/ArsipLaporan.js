import React, {Component} from 'react';
import Navbar from '../../components/Navbar/Navbar';
import PropTypes from 'prop-types';

import styled from 'styled-components';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import ArsipLaporanSearch from './ArsipLaporanSearch/ArsipLaporanSearch';

const HeaderContainer = styled.div`
position: sticky;
top: 0;
z-index: -1;
margin-bottom: -10vw;
`;

/**
 * Arsip Lembaga page
 */

class ArsipLaporan extends Component {
    /**
   * @return {*} page
   */
    render (){
        const StyledContainer = styled(Container)({
            paddingTop: '2%',
            minHeight: '100vh',
            backgroundColor: '#FFFFFF',
            marginTop: '3vh',
            marginBottom: '2.5rem',
            borderRadius: 10,
            boxShadow:
            `6px 0px 8px 0 rgba(0, 0, 0, 0.05),
            6px 0px 6px 0 rgba(0, 0, 0, 0.03),
            -6px 0px 8px 0 rgba(0, 0, 0, 0.05),
            -6px 0px 6px 0 rgba(0, 0, 0, 0.03)`,
            width: '1100px',
        });

        return (
            <>
                <Navbar
                    isAuthenticated={this.props.isAuthenticated}
                    isDosen={this.props.isDosen}
                />
                <HeaderContainer>
                    <img
                        style={{width: '100vw'}}
                        src={require('../../assets/MKPPL/Orange_Header.png')}
                        alt="header"
                    />
                </HeaderContainer>
                <StyledContainer>
                    <div style={{marginLeft: '4%'}}>
                        <h1
                        className="judul"
                        style={{color: '#000000', fontFamily: 'Nunito Sans'}}>
                            Arsip Laporan Akhir
                        </h1>
                        <Typography
                            component="div"
                            variant="body1"
                            display="block"
                            gutterBottom>
                            <center>Daftar laporan akhir praktikum mahasiswa yang telah menyelesaikan mata kuliah praktikum</center>
                        </Typography>
                        <br></br><br></br>
                    </div>
                    <ArsipLaporanSearch isDosen={this.props.isDosen}/>
                </StyledContainer>
            </>
        );  
    }
}

export default ArsipLaporan;

ArsipLaporan.propTypes = {
    isAuthenticated: PropTypes.bool,
    isDosen: PropTypes.bool,
};