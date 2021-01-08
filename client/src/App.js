import 'dotenv/config';
import React, { useContext } from 'react';
import { Switch, Route } from 'react-router-dom';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { ToastContainer } from 'react-toastify';
import { AuthContext } from './context/authContext';

import PrivateRoute from './components/PrivateRoute';
import Nav from './components/Nav';
import Home from './pages/Home';
import Register from './pages/auth/Register';
import Login from './pages/auth/Login';
import CompleteRegitration from './pages/auth/CompleteRegistration';
import PasswordUpdate from './pages/auth/PasswordUpdate';
import Profile from './pages/auth/Profile';
import Post from './pages/post/Post';

const App = () => {
  const { state } = useContext(AuthContext);
  const { user } = state;

  const client = new ApolloClient({
    uri: process.env.REACT_APP_GRAPHQL_ENDPOINT,
    cache: new InMemoryCache(),
    headers: { authtoken: user ? user.token : "" }
  });

  return (
    <ApolloProvider client={client}>
      <Nav />
      <ToastContainer />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/complete-registration" component={CompleteRegitration} />
        <PrivateRoute exact path="/password/update" component={PasswordUpdate} />
        <PrivateRoute exact path="/profile" component={Profile} />
        <PrivateRoute exact path="/post/create" component={Post} />
      </Switch>
    </ApolloProvider>
  );
}

export default App;
