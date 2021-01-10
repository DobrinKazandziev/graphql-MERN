import React, { Fragment, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { auth } from '../utils/firebase';
import { AuthContext } from '../context/authContext';

import { clearLS } from '../utils/localStorage';

const Nav = () => {
  const history = useHistory();
  const { state } = useContext(AuthContext);

  const { userEmail } = state;

  const logout = () => {
    clearLS();
    auth().signOut();

    history.push('/login');
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link className="navbar-brand" to="/">Navbar</Link>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item active">
            <Link className="nav-link" to="/users">Users</Link>
          </li>
          {userEmail && (
              <Fragment>
                <li className="nav-item">
                  <Link className="nav-link" to="/profile">{userEmail ? userEmail.split("@")[0] : `Profile`}</Link>
                </li>
              </Fragment>
          )}
          {!userEmail && (
            <Fragment>
              <li className="nav-item active">
                <Link className="nav-link" to="/login">Login</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/register">Register</Link>
              </li>
            </Fragment>
          )}
          {userEmail && (
            <Fragment>
              <li className="nav-item">
                <a onClick={logout} className="nav-item nav-link" href="/login">Logout</a>
              </li>
            </Fragment>
          )}
        </ul>
      </div>
    </nav>
  )
}

export default Nav;
