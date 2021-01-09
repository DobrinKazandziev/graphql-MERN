import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { auth } from '../../utils/firebase';
import { LS_KEYS, setLSItem } from '../../utils/localStorage';

import AuthForm from '../../components/forms/AuthForm';

const Register = () => {
  const [email, setEmail] = useState('dobrinkazandziev94@gmail.com');
  const [loading, setLoading] = useState(false);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const config = {
      url: process.env.REACT_APP_CONFIRAMTION_EMAIL_REDIRECT,
      handleCodeInApp: true,
    }

    await auth.sendSignInLinkToEmail(email, config);

    //  show toast notification to user about email sent
    toast.success(`Email is sent to ${email}. Click the link to compelete your registration.`);

    //  save user email to local storage
    setLSItem(LS_KEYS.EMAIL_FOR_REGISTRATION, email);
    
    //  clear state
    setEmail('');
    setLoading(false);
  }

  return (
    <div className="container p-5">
      {loading ? (<h4 className="text-danger">Loading...</h4>) : (<h4>Register</h4>)}
      <AuthForm 
        email={email}
        loading={loading}
        setEmail={setEmail}
        handleSubmit={handleSubmit}
      />
    </div>
  );
};

export default Register;
