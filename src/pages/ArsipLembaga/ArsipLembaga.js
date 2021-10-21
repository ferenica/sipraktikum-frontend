import React, {Component} from 'react';
import Navbar from '../../components/Navbar/Navbar';
import PropTypes from 'prop-types';

import styled from 'styled-components';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import ArsipLembagaSearch from './ArsipLembagaSearch/ArsipLembagaSearch';

// Styled components
const HeaderContainer = styled.div`
position: sticky;
top: 0;
z-index: -1;
margin-bottom: -10vw;
`;

/**
 * Arsip Lembaga page
 */

class ArsipLembaga extends Component {
    newDate = new Date();  
    year = this.newDate.getFullYear() - 6;

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
            width: '1000px',
        });

        return (
            <>
                <Navbar
                    isAuthenticated={this.props.isAuthenticated}
                    isAdmin={this.props.isAdmin}
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
                            Arsip Mitra Lembaga
                        </h1>
                        <Typography
                            component="div"
                            variant="body1"
                            display="block"
                            gutterBottom>
                            <center>Daftar lembaga yang  bekerjasama dengan Departemen Ilmu Kesejahteraan Sosial</center>
                        </Typography>
                        <Typography
                            component="div"
                            variant="body1"
                            display="block"
                            gutterBottom>
                            <center>tahun {this.year} dan sebelumnya</center>
                        </Typography>
                        <br></br><br></br>
                    </div>
                    <ArsipLembagaSearch isAdmin={this.props.isAdmin} isDosen={this.props.isDosen}/>
                </StyledContainer>
            </>
        );  
    }
}

export default ArsipLembaga;

ArsipLembaga.propTypes = {
    isAuthenticated: PropTypes.bool,
    isAdmin: PropTypes.bool,
    isDosen: PropTypes.bool,
};