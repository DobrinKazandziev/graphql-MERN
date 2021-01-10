import React, { useState, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { gql, useMutation } from '@apollo/client';
import { AUTH_ACTIONS, AuthContext } from '../../context/authContext';
import { toast } from 'react-toastify';
import { auth, googleAuthProvider } from '../../utils/firebase';

import { LS_KEYS, setLSItem } from '../../utils/localStorage';
import AuthForm from '../../components/forms/AuthForm';

const USER_CREATE = gql`
  mutation userCreate {
    userCreate {
      email,
      userName,
    }
  }
`

const Login = () => {
  const [email, setEmail] = useState('dobrinkazandziev94@gmail.com');
  const [password, setPassword] = useState('123456');
  const [loading, setLoading] = useState(false);

  const history = useHistory();
  const [userCreate] = useMutation(USER_CREATE);
  const { dispatch } = useContext(AuthContext);


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await auth.signInWithEmailAndPassword(email, password)
        .then(async (result) => {
          const { user } = result;
          const idTokenResult = await user.getIdTokenResult();

          dispatch({
            type: AUTH_ACTIONS.LOGGED_IN_USER,
            payload: { userEmail: user.email, userToken: idTokenResult.token },
          });

          setLSItem(LS_KEYS.CURRENT_USER_EMAIL, user.email);
          setLSItem(LS_KEYS.CURRENT_USER_TOKEN, idTokenResult.token);
    
          //  Send user info to our server mongodb to either update/create
          userCreate();

          history.push('/profile');
        })
    } catch (error) {
      console.log('Login Error:', error);
      toast.error(error.message);
      setLoading(false);
    }
  }

  const googleLogin = async() => {
    auth.signInWithPopup(googleAuthProvider)
      .then(async (result) => {
        const { user } = result;
        const idTokenResult = await user.getIdTokenResult();

        dispatch({
          type: AUTH_ACTIONS.LOGGED_IN_USER,
          payload: { userEmail: user.email, userToken: idTokenResult.token },
        });

        setLSItem(LS_KEYS.CURRENT_USER_EMAIL, user.email);
        setLSItem(LS_KEYS.CURRENT_USER_TOKEN, idTokenResult.token);

        //  Send user info to our server mongodb to either update/create
        userCreate();

        history.push('/');
      })
  }

  return (
    <div className="container p-5">
      {loading ? (<h4 className="text-danger">Loading...</h4>) : (<h4>Login</h4>)}
      <button onClick={googleLogin} className="btn btn-raised btn-danger mt-5">Login with Google</button>
      <AuthForm 
        loading={loading}
        email={email}
        password={password}
        setEmail={setEmail}
        setPassword={setPassword}
        handleSubmit={handleSubmit}
        showPasswordInput
      />
      <Link className="text-danger float-right" to="/password/forgot">Forgot Password</Link>
    </div>
  );
};

export default Login;
