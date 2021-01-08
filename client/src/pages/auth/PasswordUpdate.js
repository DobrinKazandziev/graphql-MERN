import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { auth } from '../../utils/firebase';
import AuthForm from '../../components/forms/AuthForm';

const PasswordUpdate = () => {
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    await auth.currentUser.updatePassword(password)
      .then(() => {
        setPassword('');
        setLoading(false);
        toast.success('Password updated');
     }).catch((error) => {
        setLoading(false);
        console.log('Update error:', error);
        toast.error(error.message);
     });  
  }

  return (
    <div className="container p-5">
      {loading ? <h4 className="text-danger">Loading ...</h4> : <h4>Password update</h4>}
      <AuthForm
        hideEmailInput
        showPasswordInput
        password={password}
        setPassword={setPassword}
        loading={loading}
        handleSubmit={handleSubmit}
      />
    </div>
  );
};

export default PasswordUpdate;
