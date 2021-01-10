import React, { useEffect, useContext } from 'react';
import { Route, useHistory } from 'react-router-dom';
import { AuthContext } from '../context/authContext';


const PublicRoute = ({ children, ...rest }) => {
  const { state } = useContext(AuthContext);
  let history = useHistory();

  useEffect(() => {
    if (state.userToken) {
      history.push('profile');
    }
  }, [state.userToken]);


  return (
    <div className="container-fluid p-5">
      <Route { ...rest } />
    </div>
  )
}

export default PublicRoute;
