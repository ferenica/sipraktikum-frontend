import React, {createRef, Component} from 'react';
import styled from 'styled-components';
import axios from 'axios';
import {Redirect} from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import RoleButton from './RoleButton/RoleButton';

import {Modal} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

/**
 * The all-in-one login page
 * @param {*} e
 * @param {String} role
 */
export default class Login extends Component {
  state = {
    username: '',
    password: '',
    role: '',
    errorMessages: {username: '', password: '', role: ''},
    isUsernameValid: true,
    isPasswordValid: true,
    isLoginLoading: false,
    isLoggedIn: false,
    isActive: true,
    isOutdated: false,
    show: false,
    roleButtonState: {},
    warningMessage: '',
    lastLogin: '',
  };

  usernameInput = createRef();
  passwordInput = createRef();

  getStatus(username) {
    axios.get('http://ppl-berkah-backend.herokuapp.com/api/v1/supervisor-lembaga/user/' + username + '/')
        .then((res) => {
          this.setState({
            username: res.data.username,
            lastLogin: res.data.last_login,
            isActive: res.data.is_active
          }, this.validateField);
        });
  }

  getDateStatus() {
    if (this.state.lastLogin != null){
      const currentTime = new Date();
      const lastLogin = new Date(this.state.lastLogin);
      const timeDifference = currentTime.getTime()-lastLogin.getTime();
      const dateDifference = timeDifference / (1000 * 3600 * 24);
      if (dateDifference > 365) {
        this.setState({
          isOutdated: true
        })
      } else {
        this.setState({
          isOutdated: false
        })
      }
    } else {
      this.setState({
        isOutdated: false
      })
    }
  }

  handleInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    this.setState({[name]: value}, () => {
      name === 'username' ?
      this.usernameInput.current.focus() : this.passwordInput.current.focus();
    });
  }

  handleInputClick = () => {
    this.setState({
      errorMessages: {role: 'Pilih role sebelum mengisi username dan password'}
    });
  }

  /**
   * Handle button click
   * @param {event} e
   */
  handleLoginBtnClick = () => {
    this.setState({
      isLoginLoading: true,
    });
    this.getStatus(this.state.username);
    
  }

  /**
   * Validate the text fields' input
   */
  validateField = () => {
    this.getDateStatus();
    const errorMessages = this.state.errorMessages;
    let isUsernameValid = this.state.isUsernameValid;
    let isPasswordValid = this.state.isPasswordValid;
    let isRoleButtonSelected = false;

    isUsernameValid = this.state.username.match(/^[a-z0-9_\-.]{6,30}$/i);
    isPasswordValid = this.state.password.length >= 6;

    Object.entries(this.state.roleButtonState)
        .forEach(([key, value]) => {
          if (value) {
            isRoleButtonSelected = true;
          }
        });

    errorMessages.username = isUsernameValid ?
      '' : 'Kurang dari 6 karakter';
    errorMessages.password = isPasswordValid ?
      '' : 'Kurang dari 6 karakter';
    errorMessages.role = isRoleButtonSelected ?
      '' : 'Role tidak terpilih';

    this.setState({
      errorMessages: errorMessages,
      isUsernameValid: isUsernameValid,
      isPasswordValid: isPasswordValid,
    }, () => {
      if (isUsernameValid && isPasswordValid && isRoleButtonSelected) {
        this.fetchDataFromServer();
        
      } else {
        this.setState({
          isLoginLoading: false, // Remove loading circle
        });
      }
    });
  }

  /**
   * Connect to API for login
   */
  async fetchDataFromServer() {
    try {
      const {
        username,
        password,
        role,
      } = this.state;
      const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          username: username,
          password: password,
          role: role,
        }),
      };
      if(this.state.isActive && !this.state.isOutdated){
        if (this.state.roleButtonState['Supervisor Sekolah'] ||
        this.state.roleButtonState['Koordinator Praktikum'] ||
        this.state.roleButtonState['Mahasiswa']) {
          await fetch(
              'http://ppl-berkah-backend.herokuapp.com/auth/login/sso/',
              requestOptions,
          ).then((res) => {
            if (res.status === 200) {
              return res.json();
            } else {
              this.handleShowWrongField();
            }
          }).then((resJson) => {
            localStorage.setItem('login_token', resJson.token);
            if (this.state.roleButtonState['Supervisor Sekolah']) {
              localStorage.setItem('role', 'Supervisor Sekolah');
            } else if (this.state.roleButtonState['Koordinator Praktikum']) {
              localStorage.setItem('role', 'Koordinator Praktikum');
            } else if (this.state.roleButtonState['Mahasiswa']) {
              localStorage.setItem('role', 'Mahasiswa');
            }
            localStorage.setItem('username', this.state.username);
            this.setState({
              isLoginLoading: false,
              isLoggedIn: true,
            });
          });
        } else if (this.state.roleButtonState['Administrator']) {
          await fetch(
              'http://ppl-berkah-backend.herokuapp.com/auth/login/administrator/',
              requestOptions,
          ).then((res) => {
            if (res.status === 200) {
              return res.json();
            } else {
              this.handleShowWrongField();
            }
          }).then((resJson) => {
            localStorage.setItem('login_token', resJson.token);
            localStorage.setItem('role', 'Administrator');
            localStorage.setItem('username', this.state.username);
            this.setState({
              isLoginLoading: false,
              isLoggedIn: true,
            });
          });
        } else {
          await fetch(
              'http://ppl-berkah-backend.herokuapp.com/auth/login/supervisor-lembaga/',
              requestOptions,
          ).then((res) => {
            if (res.status === 200) {
              return res.json();
            } else {
              this.handleShowWrongField();
            }
          }).then((resJson) => {
            this.setState({status_code: 200});
            localStorage.setItem('login_token', resJson.token);
            localStorage.setItem('role', 'Supervisor Lembaga');
            localStorage.setItem('username', this.state.username);
            this.setState({
              isLoggedIn: true,
              isLoginLoading: false,
            });
          });
        }
      }
      else {
        if (!this.state.isActive) {
          this.handleShowInActiveUser();
        } else if (this.state.isOutdated){
          this.handleShowOutdatedUser();
        }
      }
      
    } catch (error) {}
  }

  handleShowWrongField = () => {
    this.setState({
      show: true,
      isLoginLoading: false, // Remove loading circle
      warningMessage: 'Username atau password yang anda masukkan salah.',
    });
  }

  handleShowInActiveUser = () => {
    this.setState({
      show: true,
      isLoginLoading: false, // Remove loading circle
      warningMessage: 'Maaf, akun Anda dalam keadaan nonaktif.\nSilahkan hubungi Admin untuk mengaktifkannya.',
    });
  }

  handleShowOutdatedUser = () => {
    this.setState({
      show: true,
      isLoginLoading: false, // Remove loading circle
      warningMessage: 'Maaf, akun Anda telah dinonaktifkan karena\nAnda tidak melakukan login lebih dari 1 tahun.',
    });
  }

  handleClose = () => {
    this.setState({show: false});
  }

  setType = (role) => {
    this.setState({
      role: role,
      roleButtonState: {
        [role]: true,
      },
    });
  }

  /**
   * @return {Component}
   */
  render() {
    if (this.state.isLoggedIn === true) {
      if (this.state.roleButtonState['Administrator'] === true) {
        return <Redirect to="/admin"/>;
      }
      if (this.state.roleButtonState['Supervisor Lembaga'] === true) {
        return <Redirect to="/spv-lembaga" />;
      }
      if (this.state.roleButtonState['Supervisor Sekolah'] === true) {
        return <Redirect to="/spv-sekolah" />;
      }
      if (this.state.roleButtonState['Koordinator Praktikum'] === true) {
        return <Redirect to="/koordinator-kuliah" />;
      }
      if (this.state.roleButtonState['Mahasiswa'] === true) {
        return <Redirect to="/mahasiswa" />;
      }
    }

    // Redirection if the user goes to login page after logging in
    if (localStorage.getItem('login_token') !== '') {
      if (localStorage.getItem('role') === 'Administrator') {
        return <Redirect to="/admin"/>;
      }
      if (localStorage.getItem('role') === 'Supervisor Lembaga') {
        return <Redirect to="/spv-lembaga" />;
      }
      if (localStorage.getItem('role') === 'Supervisor Sekolah') {
        return <Redirect to="/spv-sekolah" />;
      }
      if (localStorage.getItem('role') === 'Koordinator Praktikum') {
        return <Redirect to="/koordinator-kuliah" />;
      }
      if (localStorage.getItem('role') === 'Mahasiswa') {
        return <Redirect to="/mahasiswa" />;
      }
    }

    const Panel = styled.div`
      position: sticky;
      // top: 48px;
      padding: 24px;
      border-radius: 10px;
      box-shadow: 0 2px 20px 0 rgba(39, 40, 48, 0.08);
      background-color: #ffffff;
      margin-bottom: 24px;
      width: 100%;
      margin-left: auto;
      margin-right: auto;
      margin-top: auto;

      @media screen and (max-width: 600px){
        padding: 16px;
        width: 90%;
      }
    `;

    const GrayLine = styled.hr`
      border: 1px solid #DEDEDE;
      width: 50%;
      margin: auto;
    `;

    const StyledButton = styled(Button)({
      padding: '6px 40px',
      marginTop: '1.5rem',
    });

    const RoleErrorMessage = styled('p')({
      textAlign: 'center',
      fontSize: '15px',
      lineHeight: '27px',
      color: 'red',
    });

    const WelcomeText = styled('p')({
      textAlign: 'center',
      fontSize: '20px',
      fontWeight: 'Bold',
      marginBottom: '2rem',
    });

    const RoleRow = styled(Container)({
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      padding: '15px',
      marginBottom: '1rem',
    });

    const StyledTextField = styled(TextField)({
      width: '90%',
      paddingTop: '-5px',
      marginLeft: '3rem',
      marginRight: '3rem',
      marginBottom: '10px',
      visibility: 'visible',
    });

    const LoginPrompt = styled('p')({
      fontSize: '15px',
      textAlign: 'center',
    });

    const RegisterText = styled('p')({
      marginTop: '1.5rem',
      textAlign: 'center',
    });

    const Title = styled('h1')({
      marginTop: '1.5rem',
    });

    const selectedButton = Object.entries(this.state.roleButtonState)
        .find((pair) => pair[1] === true);

    let welcomeText = null;

    let usernameTextField = <StyledTextField
        inputRef={this.usernameInput}
        error={!this.state.isUsernameValid}
        variant="filled"
        label="Username"
        type="text"
        name="username"
        placeholder="Masukkan username"
        onChange={this.handleInputChange}
        value={this.state.username}
        helperText={this.state.errorMessages.username}
        disabled={true}
        onClick={this.handleInputClick}
    />;

    let passwordTextField = <StyledTextField
        inputRef={this.passwordInput}
        error={!this.state.isPasswordValid}
        variant="filled"
        label="Password"
        type="password"
        name="password"
        placeholder="********"
        hint="password"
        onChange={this.handleInputChange}
        value={this.state.password}
        helperText={this.state.errorMessages.password}
        disabled={true}
        onClick={this.handleInputClick}
    />;

    if (selectedButton) {
      welcomeText = (
          <WelcomeText className='welcome'>
            {'Halo, ' + selectedButton[0] + '!'}
          </WelcomeText>
      );
      usernameTextField = <StyledTextField
          inputRef={this.usernameInput}
          error={!this.state.isUsernameValid}
          variant="standard"
          label="Username"
          type="text"
          name="username"
          placeholder="Masukkan username"
          onChange={this.handleInputChange}
          value={this.state.username}
          helperText={this.state.errorMessages.username}
          disabled={false}
      />;
      passwordTextField = <StyledTextField
          inputRef={this.passwordInput}
          error={!this.state.isPasswordValid}
          variant="standard"
          label="Password"
          type="password"
          name="password"
          placeholder="********"
          hint="password"
          onChange={this.handleInputChange}
          value={this.state.password}
          helperText={this.state.errorMessages.password}
          disabled={false}
      />;
    } else {
      welcomeText = (
          <RoleErrorMessage>
            {welcomeText ? '' : this.state.errorMessages.role}
          </RoleErrorMessage>
      );
    }

    return (
      <div>
        <Navbar />
        <div style={{
          position: 'sticky',
          top: '0',
          zIndex: '-1',
          marginBottom: '-10vw',
        }}>
          <img style={{width: '100vw'}}
            src={require('../../assets/MKPPL/Orange_Header.png')}
            alt="header" />
        </div>
        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Peringatan</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {this.state.warningMessage}
          </Modal.Body>
          <Modal.Footer>
            <StyledButton primary onClick={this.handleClose}>
              Close
            </StyledButton>
          </Modal.Footer>
        </Modal>
        <Container>
          <Panel>
            <Container>
              <Title>Pilih Tipe Akun</Title>
              <RoleRow>
                <RoleButton
                  name='Supervisor Lembaga'
                  setType={this.setType}
                  isSSO={false}
                  isActive={
                    this.state.roleButtonState['Supervisor Lembaga']
                  } />
                <RoleButton
                  name='Supervisor Sekolah'
                  isSSO={true}
                  setType={this.setType}
                  isActive={
                    this.state.roleButtonState['Supervisor Sekolah']
                  } />
                <RoleButton
                  name='Koordinator Praktikum'
                  setType={this.setType}
                  isSSO={true}
                  isActive={
                    this.state.roleButtonState['Koordinator Praktikum']
                  } />
                <RoleButton
                  name='Mahasiswa'
                  setType={this.setType}
                  isSSO={true}
                  isActive={this.state.roleButtonState['Mahasiswa']} />
                <RoleButton
                  name='Administrator'
                  setType={this.setType}
                  isSSO={false}
                  isActive={this.state.roleButtonState['Administrator']} />
              </RoleRow>
              <Container className="welcome">
                {welcomeText}
              </Container>
              <Container>
                <Container>
                  {usernameTextField}
                </Container>
                <Container>
                  {passwordTextField}
                  <LoginPrompt>
                    Kami tidak menyimpan password akun Anda
                  </LoginPrompt>
                </Container>
                <Container style={{
                  textAlign: 'center',
                  marginBottom: '1rem',
                }}>
                  <StyledButton
                    name='login-button'
                    variant="contained"
                    color='primary'
                    onClick={this.handleLoginBtnClick}
                    disableElevation>
                        Login
                  </StyledButton>
                </Container>
                <Container style={{
                  textAlign: 'center',
                  marginBottom: '2rem',
                }}>
                  {
                    this.state.isLoginLoading ?
                      <CircularProgress color="primary" /> : null
                  }
                </Container>
                <Container>
                  <GrayLine className='garis' />
                </Container>
                <RegisterText>
                  Anda Supervisor Lembaga dan Belum memiliki Akun? <a
                    className="daftar"
                    href="/register-supervisor-lembaga">Daftar disini</a>
                </RegisterText>
              </Container>
            </Container>
          </Panel>
        </Container>
      </div>
    );
  }
}
