import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { gql, useMutation } from '@apollo/client';
import { toast } from 'react-toastify';
import { AuthContext, AUTH_ACTIONS } from '../../context/authContext';
import { auth } from '../../utils/firebase';
import { LS_KEYS, getLSItem, removeLSItem } from '../../utils/localStorage';

import AuthForm from '../../components/forms/AuthForm';

const USER_CREATE = gql`
  mutation userCreate {
    userCreate {
      email,
      userName,
    }
  }
`

const CompleteRegistration = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const history = useHistory();
  const [userCreate] = useMutation(USER_CREATE);
  const { dispatch } = useContext(AuthContext);

  useEffect(() => {
    setEmail(getLSItem(LS_KEYS.EMAIL_FOR_REGISTRATION));
  }, [history])

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    //  validation
    if (!email || !password) {
      toast.error("Email and password is required")
      setLoading(false);
      return
    }

    try {
      const result = await auth.signInWithEmailLink(email, window.location.href);
      console.log('result', result)
      if (result.user.emailVerified) {
        //  remove email from local storage
        removeLSItem(LS_KEYS.EMAIL_FOR_REGISTRATION);

        //  set User password
        let user = auth.currentUser;
        await user.updatePassword(password);

        //  dispatch user with token and email, then redirect
        const idTokenResult = await user.getIdTokenResult;
        dispatch({
          type: AUTH_ACTIONS.LOGGED_IN_USER,
          payload: { email: user.email, token: idTokenResult },  
        });

        //  make api request to save/update user in mongodb
        userCreate();

        history.push('/');
      }
      
    } catch (error) {
      console.log('Register complete error:', error.message);
      setLoading(false);
      toast.error(error.message);
    }
  }

  return (
    <div className="container p-5">
      {loading ? (<h4 className="text-danger">Loading...</h4>) : (<h4>Complete Your Registration</h4>)}
      <AuthForm 
        loading={loading}
        email={email}
        password={password}
        setEmail={setEmail}
        setPassword={setPassword}
        handleSubmit={handleSubmit}
        showPasswordInput
      />
    </div>
  )
}

export default CompleteRegistration;
