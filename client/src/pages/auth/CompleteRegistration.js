import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { auth } from '../../utils/firebase';
import { LS_KEYS, getLSItem } from '../../utils/localStorage';

const CompleteRegistration = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  let history = useHistory();

  useEffect(() => {
    setEmail(getLSItem(LS_KEYS.EMAIL_FOR_REGISTRATION));
  }, [history])

  const handleSubmit = () => {

  }

  return (
    <div className="container p-5">
      {loading ? (<h4 className="text-danger">Loading...</h4>) : (<h4>Register</h4>)}
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

