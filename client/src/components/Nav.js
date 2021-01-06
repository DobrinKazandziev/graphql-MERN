import React, { Fragment, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { auth, googleAuthProvider } from '../utils/firebase';
import { AUTH_ACTIONS, AuthContext } from '../context/authContext';

const Nav = () => {
  const history = useHistory();
  const { state, dispatch } = useContext(AuthContext);

  const { user } = state;

  const logout = () => {
    auth().signOut();
    dispatch({
      type: AUTH_ACTIONS.LOGGED_IN_USER,
      payload: null,
    })
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
          {!user && (
            <Fragment>
              <li className="nav-item active">
                <Link className="nav-link" to="/login">Login</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/register">Register</Link>
              </li>
            </Fragment>
          )}
          {user && (
            <li className="nav-item">
              <a onClick={logout} className="nav-item nav-link" href="/login">Logout</a>
            </li>
          )}
          {/* <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Dropdown
            </a>
            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
              <a className="dropdown-item" href="#">Action</a>
              <a className="dropdown-item" href="#">Another action</a>
              <div className="dropdown-divider"></div>
              <a className="dropdown-item" href="#">Something else here</a>
            </div>
          </li>
          <li className="nav-item">
            <a className="nav-link disabled" href="#">Disabled</a>
          </li> */}
        </ul>
        {/* <form className="form-inline my-2 my-lg-0">
          <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
          <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
        </form> */}
      </div>
    </nav>
  )
}

export default Nav;
