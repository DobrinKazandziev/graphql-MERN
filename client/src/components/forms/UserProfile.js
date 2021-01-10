import React from 'react';

const UserProfile = ({
  handleSubmit,
  handleChange,
  loading,
  userName,
  fullName,
  email,
  about,
}) => (
  <form onSubmit={handleSubmit}>
    <div className="form-group">
      <label className="bmd-label-floating">Username</label>
      <input 
        type="text" 
        name="userName" 
        value={userName} 
        onChange={handleChange}
        className="form-control"
        placeholder="Username"
        disabled={loading}
      />
    </div>
    <div className="form-group">
      <label className="bmd-label-floating">Name</label>
      <input 
        type="text" 
        name="fullName" 
        value={fullName} 
        onChange={handleChange}
        className="form-control"
        placeholder="Name"
        disabled={loading}
      />
    </div>
    <div className="form-group">
      <label className="bmd-label-floating">Email</label>
      <input 
        type="text" 
        name="email" 
        value={email} 
        onChange={handleChange}
        className="form-control"
        placeholder="Email"
        disabled
      />
    </div>
    <div className="form-group">
      <label className="bmd-label-floating">About</label>
      <input 
        type="text" 
        name="about" 
        value={about} 
        onChange={handleChange}
        className="form-control"
        placeholder="About"
        disabled={loading}
      />
    </div>
    <button className="btn btn-primary" type="submit" disabled={!email || loading}>Submit</button>
  </form>
)

export default UserProfile;
