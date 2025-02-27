import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {ToastContainer} from 'react-toastify'
import { handleError, handleSuccess } from '../utils'

function Login() {

    const [loginInfo , setLoginInfo] = useState({
        email:'',
        password:''
    })
    const navigate = useNavigate();
    const handleChange = (e) =>{
            const {name,value} = e.target;
            console.log(name,value);
            const copyLoginInfo = {...loginInfo} 
            copyLoginInfo[name] = value;
            setLoginInfo(copyLoginInfo);
    }
    // console.log("logging info -> ",loginInfo);
    const handleLogin = async (e) =>{
            e.preventDefault();
            const{email,password} = loginInfo;
            if(!email || !password){
                return handleError('email and password are required')
            }
            try{
                    const url = "https://deploy-mernlogin-app-api.vercel.app/auth/login";
                    const response = await fetch(url,{
                        method:"POST",
                        headers:{
                            'content-type' : 'application/json'
                        },
                        body:JSON.stringify(loginInfo)
                    })
                    const result = await response.json();
                    const {success,message,jwtToken,name,error} = result;
                    if (success) {
                        handleSuccess(message);
                        localStorage.setItem('token',jwtToken);
                        localStorage.setItem('loggedin User',name);

                        setTimeout(()=>{
                            navigate('/home')
                        },1000)
                    }else if(error){
                            const details = error?.details[0].message;
                            handleError(details);
                    }else if(!success){
                        handleError(message);
                    }
                    console.log(result);
            }catch(err){
                    handleError(err);
            }
    }
  return (
    <div className='container'>
        <h1>Log In</h1>
        <form onSubmit={handleLogin}>
            <div>
                <label htmlFor='email'>Email</label> 
                <input 
                onChange={handleChange}
                type='email' 
                name='email'
                placeholder='Enter your Email....'
                value={loginInfo.email}
                />
            </div>
            <div>
                <label htmlFor='password'>Password</label> 
                <input 
                onChange={handleChange}
                type='password' 
                name='password'
                placeholder='Enter your Password....'
                value={loginInfo.password}
                />
            </div>
            <button>Log In</button>
            <span>
                Don't have an Account ?
                <Link to="/signup">Sign Up</Link>
            </span>
        </form>
        <ToastContainer/>
    </div>
  )
}

export default Login
