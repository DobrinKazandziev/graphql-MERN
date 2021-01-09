import React from 'react';

const Image = ({
  image,
  handleImageRemove = (f) => (f),
}) => (
  <img 
    src={image.url} 
    key={image.public_id} 
    alt={image.public_id} 
    style={{ height: '100px', cursor: 'not-allowed'}}
    className='float-right'
    onClick={() => handleImageRemove(image.public_id)}
  />
);

export default Image;
