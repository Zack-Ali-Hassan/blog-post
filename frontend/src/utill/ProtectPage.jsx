import React from 'react'
import { Auth } from '../Context'
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

function ProtectPage({children}) {
    const {currentUser, setCurrentUser} = Auth();
    const navigate =useNavigate();
    useEffect(()=>{
        if(!currentUser) return  navigate('/login');
    },[currentUser])
    
  return (
    <div>{children}</div>
  )
}

export default ProtectPage;