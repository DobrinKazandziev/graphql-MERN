import React from 'react';

const Image = ({
  image,
  handleImageRemove = (f) => (f),
}) => (
  <img 
    src={image.url} 
    key={image.public_id} 
    alt={image.public_id} 
    style={{ height: '150px', width: '150px' ,cursor: 'not-allowed'}}
    className='img-thumbnail m-3 rounded mx-auto'
    onClick={() => handleImageRemove(image.public_id)}
  />
);

export default Image;
