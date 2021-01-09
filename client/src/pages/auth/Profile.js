import React, { useState, useMemo } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { toast } from 'react-toastify';
import omitDeep from 'omit-deep-lodash';

import UserProfile from '../../components/forms/UserProfile';
import FileUpload from '../../components/FileUpload';

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


  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-12 pb-3">
        {loading ? (<h4 className="text-danger">Loading...</h4>) : (<h4>Profile</h4>)}
        </div>
        <FileUpload 
          setValues={setValues}
          setLoading={setLoading}
          values={values}
          loading={loading}
        />
      </div>
      <UserProfile 
        {...values}
        loading={loading}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
    </div>
  );
};

export default Profile;
