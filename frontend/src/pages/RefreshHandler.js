import React , { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

function RefreshHandler({setIsAuthenticated}) {
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(()=>{
        if (localStorage.getItem('token')) {
            setIsAuthenticated(true);
            //token bhi hai lekin location user ne in teeno mai se request kri toh user ko wapas pr bolenge tu khi nhi jaega chup chap idhar he ruk
            if(location.pathname === '/' || 
               location.pathname === '/login' || 
               location.pathname === '/signup'){
                navigate('/home',{replace: false});
               }
        }
    },[location,navigate,setIsAuthenticated])
  return (
    null
  )
}

export default RefreshHandler