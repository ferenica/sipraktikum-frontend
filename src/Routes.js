import React from 'react';

import TentangPraktikum from './pages/TentangPraktikum/TentangPraktikum.js';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import OnBoarding from './pages/OnBoarding/OnBoarding.js';
import ArsipLembaga from './pages/ArsipLembaga/ArsipLembaga.js';
import ArsipLaporan from './pages/ArsipLaporan/ArsipLaporan.js';
import StatistikPage from './pages/INOS/Statistik/StatistikPage.js';
import TambahLembaga from './pages/TambahLembaga/TambahLembaga';
import LaporanAkhir from './pages/LaporanAkhir/LaporanAkhir.js';
import DetailLembaga from './pages/DetailLembaga/DetailLembaga.js';
import RegisterSupervisorLembaga
  from './pages/MKPPL/RegisterSupervisorLembaga/RegisterSupervisorLembaga';
import Login from './pages/Login/Login';
import KelolaLembaga from './pages/KelolaLembaga/KelolaLembaga';
import Logout from './pages/INOS/Logout.js';
import '../src/assets/INOS/BackStructure.css';
import IndexProfilAdmin
  from './pages/ProfilPageAdmin/IndexProfilAdmin.js';
import IndexProfilKoorKuliah
  from './pages/ProfilPageKoorKuliah/IndexProfilKoorKuliah';
import IndexProfilSupervisorSekolah
  from
  './pages/ProfilPageSupervisorSekolah/IndexProfilSupervisorSekolah.js';
import IndexProfilSupervisorLembaga
  from
  './pages/ProfilPageSupervisorLembaga/IndexProfilSupervisorLembaga.js';
import IndexProfileMahasiswa
  from './pages/ProfilPageMahasiswa/IndexProfileMahasiswa';
import LoginSivitas from './pages/MKPPL/LoginSivitas/LoginSivitas';
import NotFound from './pages/MKPPL/NotFound/NotFound';
import NotLogin from './pages/MKPPL/NotLogin/NotLogin';

const Routes = () => {
  const isAuthenticated = () => {
    const token = localStorage.getItem('login_token');
    return token !== null;
  };

  const isAdmin = () => {
    const role = localStorage.getItem('role');
    return role === 'Administrator';
  };

  const isDosen = () => {
    const role = localStorage.getItem('role');
    return role === 'Koordinator Praktikum' || role === 'Supervisor Sekolah';
  };

  return (
    <Router className="App">
      <Switch>
        <Route exact path="/" render={() => {
          return <OnBoarding
            isAuthenticated={isAuthenticated()}
            isAdmin={isAdmin()}
            isDosen={isDosen()} />;
        }} />
        <Route exact path="/tentang-praktikum" render={() => {
          return <TentangPraktikum
            isAuthenticated={isAuthenticated()}
            isAdmin={isAdmin()}
            isDosen={isDosen()} />;
        }} />
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/statistik" render={() => {
          return isAuthenticated() && isAdmin() ? (
            <StatistikPage isAuthenticated={true} isAdmin={true} />
          ) : (
            <Login />
          );
        }} />
        <Route exact path="/tambah-lembaga" render={() => {
          return isAuthenticated() && isAdmin() ? (
            <TambahLembaga
              isAuthenticated={true}
              isAdmin={true} />
          ) : (
            <Login />
          );
        }} >
        </Route>
        <Route exact path="/laporan-akhir" render={() => {
          return isAuthenticated() && isAdmin() ? (
            <LaporanAkhir isAuthenticated={true} isAdmin={true} />
          ) : (
            <Login />
          );
        }} />
        <Route exact path="/not-found">
          <NotFound />
        </Route>
        <Route path="/detail-lembaga/:id" render={(props) => {
          return (
            <DetailLembaga {...props}
              isAuthenticated={isAuthenticated()}
              isAdmin={isAdmin()}
              isDosen={isDosen()} />
          );
        }} />
        <Route path="/kelola-lembaga/:id"
          render={(props) => {
            return isAuthenticated() && isAdmin() ? (
            <KelolaLembaga {...props} isAuthenticated={true} isAdmin={true} />
          ) : (
            <Login />
          );
          }} />
        <Route exact path="/logout">
          <Logout />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route exact path="/arsip-lembaga" render={() => {          
          return (
            <ArsipLembaga 
              isAuthenticated={isAuthenticated()}
              isAdmin={isAdmin()}
              isDosen={isDosen()} />
          );
        }} />
        <Route exact path="/arsip-laporan" render={() => {
          return isAuthenticated() && isDosen() ? (
            <ArsipLaporan isAuthenticated={true} isDosen={true} />
          ) : (
            <Login />
          );
        }} />
        <Route path="/register-supervisor-lembaga">
          <RegisterSupervisorLembaga />
        </Route>
        <Route path="/login-sivitas/:token">
          <LoginSivitas />
        </Route>
        <Route path="/spv-lembaga" render={() => {
          return (localStorage.getItem('role') === 'Supervisor Lembaga') ? (
            <IndexProfilSupervisorLembaga
              isAuthenticated={isAuthenticated()}
              isAdmin={isAdmin()} />
          ) : (
            <NotLogin />
          );
        }} />
        <Route path="/spv-sekolah" render={() => {
          return (localStorage.getItem('role') === 'Supervisor Sekolah') ? (
            <IndexProfilSupervisorSekolah
              isAuthenticated={isAuthenticated()}
              isAdmin={isAdmin()}
              isDosen={isDosen()} />
          ) : (
            <NotLogin />
          );
        }} />
        <Route path="/koordinator-kuliah" render={() => {
          return (localStorage.getItem('role') === 'Koordinator Praktikum') ? (
            <IndexProfilKoorKuliah
              isAuthenticated={isAuthenticated()}
              isAdmin={isAdmin()}
              isDosen={isDosen()} />
          ) : (
            <NotLogin />
          );
        }} />
        <Route path="/admin" render={() => {
          return (localStorage.getItem('role') === 'Administrator') ? (
            <IndexProfilAdmin
              isAuthenticated={isAuthenticated()}
              isAdmin={isAdmin()} />
          ) : (
            <NotLogin />
          );
        }} />
        <Route path="/admin-penugasan-dosen" render={() => {
          return (localStorage.getItem('role') === 'Administrator') ? (
            <IndexProfilAdmin
              isAuthenticated={isAuthenticated()}
              isAdmin={isAdmin()}
              action={"penugasan"} />
          ) : (
            <NotLogin />
          );
        }} />
        <Route path="/admin-penugasan-mahasiswa/:role/:name/:username" render={(props) => {
          return (localStorage.getItem('role') === 'Administrator') ? (
            <IndexProfilAdmin {...props}
              isAuthenticated={isAuthenticated()}
              isAdmin={isAdmin()}
              action={"penugasan mahasiswa"} />
          ) : (
            <NotLogin />
          );
        }} />
        <Route path="/admin-konfirmasi-penugasan/:role/:name/:username/:add_mahasiswa/:remove_mahasiswa/:add_username/:remove_username" render={(props) => {
          return (localStorage.getItem('role') === 'Administrator') ? (
            <IndexProfilAdmin {...props}
              isAuthenticated={isAuthenticated()}
              isAdmin={isAdmin()}
              action={"konfirmasi penugasan"} />
          ) : (
            <NotLogin />
          );
        }} />
        <Route path="/mahasiswa" render={() => {
          return (localStorage.getItem('role') === 'Mahasiswa') ? (
            <IndexProfileMahasiswa
              isAuthenticated={isAuthenticated()}
              isAdmin={isAdmin()} />
          ) : (
            <NotLogin />
          );
        }} />

        {/* Route for NotLogin page */}
        <Route path="/not-login">
          <NotLogin />
        </Route>
        {/* Route for NotFound page */}
        <Redirect exact from="*" to="/not-found">
          <NotFound />
        </Redirect>
      </Switch>
    </Router>
  );
};

export default Routes;
