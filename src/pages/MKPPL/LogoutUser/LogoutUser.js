/**
 * Function to fetch data about Supervisor Sekolah
 * @return {array}  Array of Supervisor Sekolah
 */

const LogoutUser = () => {
  if (localStorage.getItem('login_token')) {
    localStorage.clear();
    window.location.href = '/';
  }
};

export default LogoutUser;
