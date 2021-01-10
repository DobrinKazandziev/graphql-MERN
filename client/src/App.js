import 'dotenv/config';
import React, { useContext } from 'react';
import { Switch, Route } from 'react-router-dom';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { ToastContainer } from 'react-toastify';
import { AuthContext } from './context/authContext';

import PrivateRoute from './components/PrivateRoute';
import PublicRoute from './components/PublicRoute';
import Nav from './components/Nav';
import Home from './pages/Home';
import Users from './pages/Users';
import Register from './pages/auth/Register';
import Login from './pages/auth/Login';
import CompleteRegitration from './pages/auth/CompleteRegistration';
import PasswordUpdate from './pages/auth/PasswordUpdate';
import PasswordForgot from './pages/auth/PasswordForgot';
import Profile from './pages/auth/Profile';
import Post from './pages/post/Post';
import SingleUser from './pages/SingleUser';

const App = () => {
  const { state } = useContext(AuthContext);
  const { userToken } = state;

  const client = new ApolloClient({
    uri: process.env.REACT_APP_GRAPHQL_ENDPOINT,
    cache: new InMemoryCache(),
    headers: { authtoken: userToken ? userToken : "" }
  });

  return (
    <ApolloProvider client={client}>
      <Nav />
      <ToastContainer />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/users" component={Users} />
        <PublicRoute exact path="/register" component={Register} />
        <PublicRoute exact path="/login" component={Login} />
        <Route exact path="/complete-registration" component={CompleteRegitration} />
        <Route exact path="/password/forgot" component={PasswordForgot} />
        <PrivateRoute exact path="/password/update" component={PasswordUpdate} />
        <PrivateRoute exact path="/profile" component={Profile} />
        <PrivateRoute exact path="/post/create" component={Post} />
        <Route exact path="/user/:userName" component={SingleUser} />
      </Switch>
    </ApolloProvider>
  );
}

export default App;
