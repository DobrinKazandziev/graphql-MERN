import React, { useState, useMemo, useContext } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { toast } from 'react-toastify';
import omitDeep from 'omit-deep-lodash';
import Resizer from 'react-image-file-resizer';
import { AuthContext } from '../../context/authContext';
import axios from 'axios';

import { GET_PROFILE } from '../../graphql/queries';
import { USER_UPDATE } from '../../graphql/mutations';

const Profile = () => {
  const { state } = useContext(AuthContext);
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

  const fileResizeAndUpload = (e) => {
    let fileInput = false;
    if (e.target.files[0]) {
      fileInput = true;
    }
    if (fileInput) {
      Resizer.imageFileResizer(
        e.target.files[0],
        300,
        300,
        'JPEG',
        100,
        0,
        (uri) => {
          axios.post(`${process.env.REACT_APP_REST_ENDPOINT}/upload-images`,
          { image: uri },
          { headers: { authtoken: state.user.token } })
          .then(response => {
            setLoading(false);
            console.log('CLOUDINARY UPLOAD:', response);
            setValues({ ...values, images: [...images, response.data]})
          }) 
          .catch(error => {
            setLoading(false);
            console.log('CLOUDINARY UPLOAD FAILED:', error);
          });
        },
        'base64',
      );
    };
  };

  const handleImageRemove = (id) => {
    setLoading(true);
    axios.post(`${process.env.REACT_APP_REST_ENDPOINT}/remove-image`, 
    { public_id: id },
    { headers: { authtoken: state.user.token } })
    .then((response) => {
      setLoading(false);
      let filteredImages = images.filter((item) => {
        return item.public_id !== id;
      });
      setValues({ ...values, images: filteredImages });
    })
    .catch((error) => {
      setLoading(false);
      console.log('Image Remove Error:', error)
    })
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
    <div className="container p-5">
      <div className="row">
        <div className="col-md-3">
          <div className="form-group">
            <label className="btn btn-primary">
              Upload Image
              <input 
                hidden
                type="file" 
                accept="image/*"
                onChange={fileResizeAndUpload}
                className="form-control"
                placeholder="Image"
              />
            </label>
          </div>
        </div>
        <div className="col-md-9">
          {images.map((image) => (
            <img 
              src={image.url} 
              key={image.public_id} 
              alt={image.public_id} 
              style={{ height: '100px', cursor: 'not-allowed'}}
              className='float-right'
              onClick={() => handleImageRemove(image.public_id)}
            />
            // <button className=""></button>
          ))}
        </div>
      </div>
      {profileUpdateForm()}
    </div>
  );
};

export default Profile;
