import React, { useState } from 'react';



const Login = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState('');
  
  const handleSubmit = () => {

  }

  return (
    <div className="container">
      <div className="row p-5">
        <h4>Login</h4>
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
        </form>
      </div>
    </div>
  );
};

export default Login;
