import React, { useState } from 'react'
import Logo from './Logo';
import { Host } from './constant';
import axios from 'axios';
import { useNavigate } from 'react-router';

const Login = () => {
const [Username , setUsername] = useState('');
const [password , setPassword] = useState('')
const navigate = useNavigate();
    const handleSubmit = async(e) =>{
        console.log("here")
        e.preventDefault();

    // Client-side validation
    if (!Username || !password) {
      alert('Both username and password are required');
      return;
    }

    try {
     
      const res = await axios.post(`${Host}/login`, { Username, password });
      
      if (res.data.user) {
        localStorage.setItem('user', JSON.stringify(res.data.user));
         
        navigate('/dashboard')
       
      }
    } catch (error) {
      alert('Invalid login details');
    }
     
    }
  return (

    <div className='flex flex-col justify-center items-center border  w-full py-10'>
        {/* <div className='border'>
            <Logo />
        </div> */}
       <form className='flex flex-col gap-4 ' onSubmit={handleSubmit}>
        <h2 className='font-semibold  text-3xl mb-5 border'>Login</h2>
        {/* <label htmlFor="email">Enter your Username</label> */}
        <input id='Username' className='bg-slate-100 w-[40vw] h-10' placeholder='Enter your Username' value={Username} onChange={(e)=>{setUsername(e.target.value)}} />

      
        <input id='password' className='bg-slate-100 w-[40vw] h-10' placeholder='Enter your Password' value={password} onChange={(e)=>{setPassword(e.target.value)}} />
        <button type='submit' className='bg-gradient-to-r from-slate-600 to-slate-900 h-12 mt-5 text-white mx-10'>Login</button>
       </form>

    </div>
  )
}

export default Login