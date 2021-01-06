import React, { useState, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { AUTH_ACTIONS, AuthContext } from '../../context/authContext';
import { toast } from 'react-toastify';
import { auth, googleAuthProvider } from '../../utils/firebase';

const Login = () => {
  const history = useHistory();
  const { dispatch } = useContext(AuthContext);

  const [email, setEmail] = useState('dobrinkazandziev94@gmail.com');
  const [password, setPassword] = useState('gggggg');
  const [loading, setLoading] = useState(false);

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
            payload: { email: user.email, token: idTokenResult.token },
          });
    
          //  Send user info to our server mongodb to either update/create
          history.push('/');
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
          payload: { email: user.email, token: idTokenResult.token },
        });

        //  Send user info to our server mongodb to either update/create

        history.push('/');
      })
  }

  return (
    <div className="container p-5">
      {loading ? (<h4 className="text-danger">Loading...</h4>) : (<h4>Login</h4>)}
      <button onClick={googleLogin} className="btn btn-raised btn-danger mt-5">Login with Google</button>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email Address</label>
          <input
            type="email" 
            className="form-control"
            placeholder="Enter Email"
            disabled={loading}
            value={email} 
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password" 
            className="form-control"
            placeholder="Enter Password"
            disabled={loading}
            value={password} 
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button className="btn btn-raised btn-primary" disabled={!email || !password || loading}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default Login;
