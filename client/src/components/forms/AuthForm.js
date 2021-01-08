import React from 'react';

const AuthForm = ({
  loading,
  email = "", 
  password = "", 
  setEmail = (f) => f,
  setPassword = (f) => f,
  handleSubmit,
  hideEmailInput = false,
  showPasswordInput = false,
}) => (
  <form onSubmit={handleSubmit}>
    {!hideEmailInput && (
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
    )}
    {showPasswordInput && (
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
    )}
    <button className="btn btn-raised btn-primary" disabled={loading}>Submit</button>
  </form>
)

export default AuthForm;
