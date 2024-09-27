import React from 'react'
import { Outlet } from 'react-router'
import Navbar from '../components/navbar'
import Footer from '../components/Footer'

const Layout = () => {
  return (
    <>
   <Navbar />
   <Outlet />
   <Footer />
</>
  )
}

export default Layout