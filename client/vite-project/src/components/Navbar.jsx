import React from 'react'
import Logo from './Logo'
import { Link } from 'react-router-dom'

const Navbar = () => {
    const user = localStorage.getItem('user')
 const  userData =   JSON.parse(user)
    console.log(userData.Username)
  return (
    <>
    < div className='px-5 py-5 flex justify-between'>
    <div className=' flex gap-8' >
    <Logo />
    <Link className='' >Home</Link>
    </div>
    <div className=' flex gap-5'>
        <span>{userData.Username}</span>
        <button>logout</button>
    </div>
    </div>
    

    </>
  )
}

export default Navbar