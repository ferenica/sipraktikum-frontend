import React, {Component} from 'react';
import Navbar from '../../../components/Navbar/Navbar';
import styled from 'styled-components';
import './RegisterSupervisorLembaga.css';
import {Button} from 'reactstrap';
import axios from 'axios';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

const Panel = styled.div`
  position: sticky;
  top: 48px;
  padding: 24px;
  border-radius: 10px;
  box-shadow: 0 2px 20px 0 rgba(39, 40, 48, 0.08);
  background-color: #ffffff;
  margin-bottom: 24px;
  width: 55vw;
  /* height: 453px; */
  margin-left: auto;
  margin-right: auto;
  margin-top: 2vw;

  @media screen and (max-width: 600px) {
    padding: 16px;
    width: 90%;
  }
`;
const GrayLine = styled.div`
  border: 1px solid #dedede;
  width: 100%;
`;
const HeaderContainer = styled.div`
position: sticky;
top: 0;
z-index: -1;
margin-bottom: -10vw;
`;
const emailRegex = RegExp(
    /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
);
const fullNameRegex = new RegExp('^[a-zA-Z]+(([\',. -][a-zA-Z ])?[a-zA-Z ]*)*$');
const usernameRegex = RegExp(/^[a-z0-9_-]{6,16}$/i);

const formValid = ({formErrors, ...rest}) => {
  let valid = true;

  // validate form errors being empty
  Object.values(formErrors).forEach((val) => {
    val.length > 0 && (valid = false);
  });

  // validate the form was filled out
  Object.values(rest).forEach((val) => {
    val === null && (valid = false);
  });

  return valid;
};
/**
 * register user
 */
class RegisterSupervisorLembaga extends Component {
  /**
   * initiate state
   * @param{props} props
   */
  constructor(props) {
    super(props);
    this.state = {
      email: null,
      password: null,
      isSubmitted: false,
      fullname: null,
      username: null,
      confirmPassword: null,
      lembaga: 'yayasan1',
      jabatan: null,
      invalid: '',
      isLoaded: false,
      formErrors: {
        fullname: '',
        username: '',
        email: '',
        jabatan: '',
        password: '',
        confirmPassword: '',
      },
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleLembagaChange = this.handleLembagaChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  /**
   * handle submit
   */
  componentDidMount() {
    axios
        .get('http://ppl-berkah-backend.herokuapp.com/api/v1/lembaga/')
        .then((response) => {
          this.setState({
            daftarLembaga: response.data,
            isLoaded: true,
            lembaga: response.data[0].id,
          });
        });
  }
  /**
   * handle submit
   * @param{event} event
   */

  handleSubmit(event) {
    event.preventDefault();
    if (formValid(this.state)) {
      this.setState({submitted: true});
      this.fetchDataFromServer();
    } else {
      this.setState({invalid: 'Tolong isi formulir ini!'});
    }
  }
  /**
   * post data
   */
  async fetchDataFromServer() {
    try {
      const {
        username,
        fullname,
        email,
        password,
        lembaga,
        jabatan,
      } = this.state;
      const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          username: username,
          first_name: fullname,
          email: email,
          password: password,
          profile: {
            lembaga: lembaga,
            jabatan: jabatan,
          },
        }),
      };
      const response = await fetch(
          'http://ppl-berkah-backend.herokuapp.com/auth/register/supervisor-lembaga/',
          requestOptions,
      );
      if (response.status === 201) {
        this.setState({status_code: 201});
      } else if (response.status === 400) {
        this.setState({invalid: 'Email atau username telah terdaftar'});
      }
      return await response.json();
    } catch (error) {}
  }
  /**
   * handle change lembaga
   * @param{event} event
   */
  handleLembagaChange(event) {
    this.setState({lembaga: event.target.value});
  }
  /**
   * handle change
   * @param{event} event
   */
  handleChange(event) {
    event.preventDefault();
    const {name, value} = event.target;
    const formErrors = {...this.state.formErrors};

    if (name === 'fullname') {
      formErrors.fullname = fullNameRegex.test(value) ?
          '' :
          'Nama lengkap tidak valid!';
    } else if (name === 'username') {
      formErrors.username = usernameRegex.test(value) ?
          '' :
          'Nama pengguna tidak valid!';
    } else if (name === 'email') {
      formErrors.email = emailRegex.test(value) ? '' : 'Alamat email tidak valid!';
    } else if (name === 'jabatan') {
      formErrors.jabatan = value.length < 1 ? 'Jabatan tidak valid!' : '';
    } else if (name === 'password') {
      formErrors.password =
          value.length < 6 ? 'minimal 6 karakter' : '';
    } else if (name === 'confirmPassword') {
      formErrors.confirmPassword =
          value !== this.state.password ? 'Kata sandi tidak sesuai' : '';
    }

    this.setState({formErrors, [name]: value});
  }
  /**
   * render function
   * @return {html} html for render
   */
  render() {
    const OrangeTypography = styled(Typography)({
      color: '#FF8326',
      textAlign: 'center',
      fontWeight: 'bold',
    });

    const StyledDivider = styled(Divider)({
      backgroundColor: '#FF8326',
      height: '2px',
      width: '500px',
      margin: 'auto',
      marginBottom: '20px',
      marginTop: '10px',
    });

    const {formErrors} = this.state;
    if (this.state.status_code === 201) {
      return window.location.href = '/login';
    }
    if (!this.state.daftarLembaga) {
      return <div>Loading</div>;
    } else {
      return (
        <div data-test="component-register-supervisor-lembaga">
          <Navbar
          isAuthenticated={this.props.isAuthenticated}
          isAdmin={this.props.isAdmin} />
          <HeaderContainer>
            <img
                style={{width: '100vw'}}
                src={require('../../../assets/MKPPL/Orange_Header.png')}
                alt="header"
            />
          </HeaderContainer>
            <Panel>
              <p className="register-kembali">
                <a href="/login">&lt; Kembali</a>
              </p>
              <OrangeTypography variant="h5">Registrasi Supervisor Lembaga</OrangeTypography>
              <StyledDivider />
              <form
                data-test="form"
                className="form"
                onSubmit={this.handleSubmit}
                noValidate
              >
                <div className="fullname" data-test="component-input-fullname">
                  <label>Nama Lengkap:</label>
                  <input
                    className={formErrors.fullname.length > 0 ? 'error' : null}
                    type="text"
                    name="fullname"
                    id="exampleName"
                    data-test="input-fullname"
                    placeholder="Nama Lengkap"
                    noValidate
                    // value={this.state.fullname}
                    onChange={this.handleChange}
                  />
                  {formErrors.fullname.length > 0 && (
                    <span className="errorMessage">{formErrors.fullname}</span>
                  )}
                </div>
                <div className="username" data-test="component-input-username">
                  <label>Username:</label>
                  <input
                    className={formErrors.username.length > 0 ? 'error' : null}
                    noValidate
                    type="text"
                    name="username"
                    id="exampleUsername"
                    data-test="input-username"
                    placeholder="Username"
                    // value={this.state.username}
                    onChange={this.handleChange}
                  />
                  {formErrors.username.length > 0 && (
                    <span className="errorMessage">{formErrors.username}</span>
                  )}
                </div>
                <div className="lembaga" data-test="component-input-lembaga">
                  <label htmlFor="exampleSelect">Lembaga:</label>
                  <select
                    data-test="input-lembaga"
                    type="select"
                    name="select"
                    id="exampleSelect"
                    value={this.state.lembaga}
                    onChange={this.handleLembagaChange}
                  >
                    {this.state.daftarLembaga.map((item, index) => (
                      <option key={index} value={item.id}>
                        {item.nama}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="email" data-test="component-input-email">
                  <label>Email</label>
                  <input
                    className={formErrors.email.length > 0 ? 'error' : null}
                    type="email"
                    name="email"
                    id="exampleEmail"
                    data-test="input-email"
                    placeholder="myemail@email.com"
                    noValidate
                    // value={this.state.email}
                    onChange={this.handleChange}
                  />
                </div>
                <div className="jabatan" data-test="component-input-jabatan">
                  <label htmlFor="exampleJabatan">Jabatan</label>
                  <input
                    className={formErrors.jabatan.length > 0 ? 'error' : null}
                    placeholder="Jabatan"
                    type="text"
                    name="jabatan"
                    id="exampleJabatan"
                    data-test="input-jabatan"
                    // value={this.state.jabatan}
                    noValidate
                    onChange={this.handleChange}
                  />
                  {formErrors.jabatan.length > 0 && (
                    <span className="errorMessage">{formErrors.jabatan}</span>
                  )}
                </div>
                <div className="password" data-test="component-input-password">
                  <label htmlFor="examplePassword">Kata Sandi</label>
                  <input
                    className={formErrors.password.length > 0 ? 'error' : null}
                    type="password"
                    name="password"
                    id="examplePassword"
                    data-test="input-password"
                    placeholder="********"
                    // value={this.state.password}
                    noValidate
                    onChange={this.handleChange}
                  />
                  {formErrors.password.length > 0 && (
                    <span className="errorMessage">{formErrors.password}</span>
                  )}
                </div>
                <div
                  className="confirmPassword"
                  data-test="component-input-confirm-password"
                >
                  <label htmlFor="exampleConfirmPassword">
                    Konfirmasi Kata Sandi
                  </label>
                  <input
                    className={
                      formErrors.confirmPassword.length > 0 ? 'error' : null
                    }
                    type="password"
                    name="confirmPassword"
                    id="exampleConfirmPassword"
                    data-test="input-confirm-password"
                    placeholder="********"
                    // value={this.state.confirmPassword}
                    noValidate
                    onChange={this.handleChange}
                  />
                  {formErrors.confirmPassword.length > 0 && (
                    <span className="errorMessage">
                      {formErrors.confirmPassword}
                    </span>
                  )}
                </div>

                <div className="buttonSubmit">
                  {this.state.invalid.length > 0 && (
                    <div className="invalidForm">{this.state.invalid}</div>
                  )}
                  <Button color="primary" type="submit" block>
                    Daftar
                  </Button>
                  <GrayLine />
                </div>
                <div className="buttonSubmit">
                  <p className="punchline">
                    Sudah memiliki akun?{' '}
                    <Link
                      className="linkToLogin"
                      to="/login"
                    >
                      Login
                    </Link>
                  </p>
                </div>
              </form>
            </Panel>
          </div>
      );
    }
  }
}
export default RegisterSupervisorLembaga;

RegisterSupervisorLembaga.propTypes = {
  isAuthenticated: PropTypes.bool,
  isAdmin: PropTypes.bool,
};