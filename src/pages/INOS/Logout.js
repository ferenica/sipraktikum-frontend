import React, {Component} from 'react';

/** */
class Logout extends Component {
  /** */
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  /** */
  componentDidMount() {
    localStorage.removeItem('login_token');
    localStorage.removeItem('username');
    localStorage.removeItem('role');

    const search = window.location.search;
    const params = new URLSearchParams(search);
    const next = params.get('next');

    window.location.href = next;
  }
  /** */
  render() {
    return (
      <p>Logging Out</p>
    );
  }
}
export default Logout;
