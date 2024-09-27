import React from 'react'
import { useNavigate } from 'react-router'

const Dashboard = () => {
    const navigate = useNavigate()
  return (
    <div className='flex flex-col justify-center h-[70vh]'>
     <h2 className='border bg-yellow-400 text-center mx-10'>Welcome to Admin Pannel</h2>
     <div className='flex gap-10 justify-center mt-7'>

     <button className='border h-10 px-4 rounded-sm bg-slate-950 text-white hover:bg-slate-800' onClick={()=>{navigate('/dashboard/create-employee')}}>Create New Employee</button>
     <button className='border h-10 px-4 rounded-sm bg-slate-950 text-white hover:bg-slate-800' onClick={()=>{navigate('/dashboard/employee-list')}}  >Check The  List of employee</button>

     </div>
     

    </div>
  )
}

export default Dashboard