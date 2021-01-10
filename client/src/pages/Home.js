import 'dotenv/config';
import React, { useContext } from 'react';
import { useQuery, useLazyQuery } from '@apollo/client';
import { AuthContext } from '../context/authContext';

import { GET_ALL_POSTS } from '../graphql/queries';

const renderPosts = (posts) => posts && posts.map((post) => (
  <div key={post.id} className="col-md-4">
    <div className="card">
      <div className="card-body">
        <div className="card-title">
          <h4>{post.title}</h4>
        </div>
        <p className="card-text">{post.description}</p>
      </div>
    </div>
  </div>
))



const Home = () => {
  const { data, loading } = useQuery(GET_ALL_POSTS); 
  const [fetchPosts, { data: lazyFetchData, loading: loadingLazy }] = useLazyQuery(GET_ALL_POSTS); 
  const { dispatch } = useContext(AuthContext);

  const updateUserName = () => {
    dispatch({
      type: 'LOGGED_IN_USER',
      payload: 'Dobrin',
    })
  }
 
  if (loading) return <p className="p-5">Loading...</p>

  return (
    <div className="container">
      <div className="row p-5">
        {!loading && data && renderPosts(data.allPosts)}
      </div>
      <hr/>
      <div className="row p-5">
        <button onClick={() => fetchPosts()} className="btn-btn-raised btn-primary">Fetch post</button>
      </div>
      <div className="row p-5">
        {!loadingLazy && lazyFetchData && renderPosts(lazyFetchData.allPosts)}
      </div>
      <hr/>
      <button className="btn btn-primary" onClick={updateUserName}>Change user name</button>
    </div>
  );
}

export default Home;
