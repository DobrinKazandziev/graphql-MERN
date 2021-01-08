import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { auth } from '../../utils/firebase';
import AuthForm from '../../components/forms/AuthForm';

const PasswordForgot = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    console.log('handleSubmit', handleSubmit)
    e.preventDefault();
    setLoading(true);

    const config = {
      url: process.env.REACT_APP_PASSWORD_FORGOT_REDIRECT,
      handleCodeInApp: true,
    }

    await auth.sendPasswordResetEmail(email, config)
      .then(() => {
        setEmail('');
        setLoading(false);
        toast.success(`Email is sent to ${email}. Click on the link to reset your password`);
     }).catch((error) => {
       setLoading(false);
       console.log(`Error on password forgot email:`, error);
     });
  }

  return (
    <div className="container p-5">
      {loading ? <h4 className="text-danger">Loading ...</h4> : <h4>Forgot Password</h4>}
      <AuthForm
        email={email}
        setEmail={setEmail}
        loading={loading}
        handleSubmit={handleSubmit}
      />
    </div>
  );
};

export default PasswordForgot;