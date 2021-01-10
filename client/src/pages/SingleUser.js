import React from 'react';
import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import UserCard from '../components/UserCard';

import { GET_PUBLIC_PROFILE } from '../graphql/queries';

const SingleUser = () => {
  let { userName } = useParams();
  const { loading , data, error } = useQuery(GET_PUBLIC_PROFILE, {
    variables: { userName }
  });

  if (loading) return <p className="p-5">Loading...</p>

  return (
    <div className="container"><UserCard user={data.publicProfile} /></div>
  )

}

export default SingleUser;
