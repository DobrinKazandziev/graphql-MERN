import React, { useContext } from 'react';
import Resizer from 'react-image-file-resizer';
import { AuthContext } from '../context/authContext';
import axios from 'axios';

import Image from '../components/Image';

const FileUpload = ({
  setValues,
  setLoading,
  values,
  loading,
}) => {
  const { state } = useContext(AuthContext);

  const fileResizeAndUpload = (e) => {
    setLoading(true);
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
          { headers: { authtoken: state.userToken } })
          .then(response => {
            setLoading(false);
            console.log('CLOUDINARY UPLOAD:', response);
            setValues({ ...values, images: [...values.images, response.data]})
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
    { headers: { authtoken: state.userToken } })
    .then((response) => {
      setLoading(false);
      let filteredImages = values.images.filter((item) => {
        return item.public_id !== id;
      });
      setValues({ ...values, images: filteredImages });
    })
    .catch((error) => {
      setLoading(false);
      console.log('Image Remove Error:', error)
    })
  }

  return (
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
        {values.images.map((image) => <Image image={image} handleImageRemove={handleImageRemove} key={image.public_id} />)}
      </div>
    </div>
  )
}

export default FileUpload;
