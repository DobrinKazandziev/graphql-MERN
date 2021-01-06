import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AuthContext, AUTH_ACTIONS } from '../../context/authContext';
import { auth } from '../../utils/firebase';
import { LS_KEYS, getLSItem, removeLSItem } from '../../utils/localStorage';

const CompleteRegistration = () => {
  const history = useHistory();
  const { dispatch } = useContext(AuthContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);


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
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email Address</label>
          <input
            type="email" 
            className="form-control"
            placeholder="Enter Email"
            disabled
            value={email} 
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password" 
            className="form-control"
            placeholder="Enter password"
            disabled={loading}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button className="btn btn-raised btn-primary">Submit</button>
      </form>
    </div>
  )
}

export default CompleteRegistration;

