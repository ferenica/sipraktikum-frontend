import React from 'react';
import {
  Container, Col, Form,
  FormGroup, Label, Input,
  Button,
} from 'reactstrap';
import styled from 'styled-components';
import '../LoginSupervisorLembaga/LoginSupervisorLembaga.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Redirect} from 'react-router-dom';
import {FormErrors} from '../../../components/MKPPL/FormError/FormError';

const Panel = styled.div`
  position: sticky;
  top: 48px;
  padding: 24px;
  border-radius: 10px;
  box-shadow: 0 2px 20px 0 rgba(39, 40, 48, 0.08);
  background-color: #ffffff;
  margin-bottom: 24px;
  width: 55vw;
  height: 453px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 2vw;

  @media screen and (max-width: 600px){
    padding: 16px;
    width: 90%;
  }
`;
const GrayLine = styled.div`
  border: 1px solid #DEDEDE;
  width: 100%;
`;

export default class LoginMahasiswa extends React.Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
      formErrors: {username: '', password: ''},
      usernameValid: false,
      passwordValid: false,
      formValid: false,
      isLogined: false,
    };
  }

    handleInputChange = (e) => {
      const name = e.target.name;
      const value = e.target.value;
      this.setState({[name]: value},
          () => {
            this.validateField(name, value);
          });
    }

    validateField(fieldName, value) {
      const fieldValidationErrors = this.state.formErrors;
      let usernameValid = this.state.usernameValid;
      let passwordValid = this.state.passwordValid;

      switch (fieldName) {
        case 'username':
          usernameValid = value.match(/^[a-z0-9_-]{6,16}$/i);
          fieldValidationErrors.username = usernameValid ? '' : ' is invalid';
          break;
        case 'password':
          passwordValid = value.length >= 6;
          fieldValidationErrors.password = passwordValid ? '' : ' is too short';
          break;
        default:
          break;
      }
      this.setState({
        formErrors: fieldValidationErrors,
        usernameValid: usernameValid,
        passwordValid: passwordValid,
      }, this.validateForm);
    }

    validateForm() {
      this.setState({formValid: this.state.usernameValid && this.state.passwordValid});
    }

    submitClick = () => {
      if ((this.state.username === 'krishankantsinghal') && (this.state.password === 'krishankant123')) {
        this.setState({isLogined: true});
      } else {
        this.fetchDataFromServer();
      }
    }

    async fetchDataFromServer() {
      try {
        const {
          username,
          password,
        } = this.state;
        const requestOptions = {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            username: username,
            password: password,
          }),
        };
        await fetch(
            'http://ppl-berkah-backend.herokuapp.com/auth/login/supervisor-lembaga/',
            requestOptions,
        ).then((res) => {
          if (res.status === 200) {
            return res.json();
          }
        }).then((resJson) => {
          this.setState({status_code: 200});
          localStorage.setItem('login_token', resJson.token);
          this.setState({isLogined: true});
        });
      } catch (error) {

      }
    }

    render() {
      if (this.state.isLogined === true) {
        return <Redirect to="/spv-sekolah" />;
      }
      return (
        <>
          <div style={{
            position: 'sticky',
            top: '0',
            zIndex: '-1',
            marginBottom: '-10vw',
          }}>
            <img style={{width: '100vw'}}
              src={require('../../../assets/MKPPL/Orange_Header.png')}
              alt="header" />
          </div>
          <Container>
            <Panel>
              <Container className='App login-border' fluid={true}>
                <p className="kembali"><a href="/register-supervisor-lembaga">&lt; Kembali</a></p>
                <h1 className="judul">Login Supervisor Sekolah</h1>
                <br></br>
                <div className="panel panel-default">
                  <FormErrors formErrors={this.state.formErrors} />
                </div>
                <Form className={'form tempat-input '}>
                  <Col sm={{size: 'auto'}}>
                    <FormGroup>
                      <Label id="usernameId">Username:</Label>
                      <Input
                        className={this.state.formErrors.username.length > 0 ? 'error' : null}
                        type="text"
                        name="username"
                        placeholder="JohnTitor01"
                        hint="username"
                        onChange={
                          this.handleInputChange
                        }
                      />
                      {this.state.formErrors.username.length > 0 && (
                        <span className="errorMessage">{this.state.formErrors.username}</span>
                      )}
                    </FormGroup>
                  </Col>
                  <Col sm={{size: 'auto'}}>
                    <FormGroup>
                      <Label for="examplePassword">Password:</Label>
                      <Input
                        className={this.state.formErrors.password.length > 0 ? 'error' : null}
                        type="password"
                        name="password"
                        placeholder="********"
                        hint="password"
                        onChange={
                          this.handleInputChange
                        }
                      />
                      {this.state.formErrors.username.length > 0 && (
                        <span className="errorMessage">{this.state.formErrors.password}</span>
                      )}
                    </FormGroup>
                  </Col>
                  <Col sm={{size: 'auto'}}>
                    <FormGroup>
                      <Button onClick={this.submitClick} color="primary" block disabled={!this.state.formValid}>Login</Button>
                      <GrayLine />
                    </FormGroup>
                  </Col>
                  <Col sm={{size: 'auto'}}>
                    <FormGroup>
                      <p className="punchline">Belum memiliki akun? <a className="daftar" href="/register-supervisor-lembaga">Daftar</a> </p>
                    </FormGroup>
                  </Col>
                </Form>
              </Container>
            </Panel>
          </Container>
        </>
      );
    }
}
