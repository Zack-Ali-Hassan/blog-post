import React, { useEffect } from 'react'
import Login from '../components/Login'
import { Auth } from '../Context';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const { currentUser, setCurrentUser } = Auth();
  const navigate = useNavigate();
  useEffect(() => {
    if(currentUser) return navigate('/create-post')
  }, [currentUser]);
  return (
    <div>
      <Login/>
    </div>
  )
}

export default LoginPage