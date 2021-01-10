import React from 'react';
import Image from './Image';
import { Link } from 'react-router-dom';

const UserCard = ({ user }) => {
  const { userName, images, about } = user;
  return (
    <div className="card text-center" style={{ minHeight: '375px'}}>
      <Image image={images[0]} />
      <Link to={`/user/${userName}`}><h4 className="text-primary">@{userName}</h4></Link>
      <hr />
      <small>{about}</small>
    </div>
  );
};

export default UserCard;
