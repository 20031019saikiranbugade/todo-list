import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const ProtectedRoutes = ({ Component }) => {
  const navigate = new useNavigate();
  function isAlready() {
    const isLogin = localStorage.getItem('isLogin');
    if (isLogin) {
      navigate('/user/home');
    }
  }
  useEffect(() => {
    isAlready();
  },[]);
  return (
    <>
      <Component />
    </>
  )
}

export default ProtectedRoutes