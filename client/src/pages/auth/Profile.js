import React, { useState, useMemo } from 'react';
import { toast } from 'react-toastify';
import { useQuery, useMutation } from '@apollo/client';
import omitDeep from "omit-deep-lodash";

import { GET_PROFILE } from '../../graphql/queries';
import { USER_UPDATE } from '../../graphql/mutations';

const Profile = () => {
  const [values, setValues] = useState({
    userName: '',
    fullName: '',
    email: '',
    about: '',
    images: [],
  });

  const [loading, setLoading] = useState(false);

  const { userName, fullName, email, about, images } = values;

  const { data } = useQuery(GET_PROFILE);

  const [userUpdate] = useMutation(USER_UPDATE, {
    update: (cache, { data: { userUpdate } }) => {
      toast.success('Profile updated');
      cache.writeQuery({
        query: GET_PROFILE,
        data: { profile: userUpdate },
      });
    }
  });

  useMemo(() => {
    if (data) {
      setValues({
        ...values,
        userName: data.profile.userName,
        fullName: data.profile.fullName,
        email: data.profile.email,
        about: data.profile.about,
        images: omitDeep(data.profile.images, ["__typename"]),
      })
    }
  }, [data])

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    userUpdate({ variables: { input: values }})
    setLoading(false);
  }

  const handleChange = (e) => setValues({ ...values, [e.target.name]: e.target.value })

  const handleImageChange = () => {

  }

  const profileUpdateForm = () => (
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
        <label className="bmd-label-floating">Image</label>
        <input 
          type="file" 
          accept="image/*"
          onChange={handleImageChange}
          className="form-control"
          placeholder="Image"
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
  
  return (
    <div className="container p-5">{profileUpdateForm()}</div>
  );
};

export default Profile;
