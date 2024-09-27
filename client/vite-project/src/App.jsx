import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Route ,Routes } from 'react-router-dom'
import Layout from './page/layout'
import Login from './components/Login'
import Home from './page/Home'
import Dashboard from './page/Dashboard'
import CreateEmployee from './page/CreateEmployee'
// import { Employee } from '../../../Server/model/Employee.model'
import EmployeeTable from './page/Employee'

function App() {
  const [count, setCount] = useState(0)

  return (
    
<BrowserRouter>
<Routes>

<Route path='/' element={<Layout />} >
<Route path='/' element={<Home />} />
<Route path='/dashboard' element={<Dashboard />} > 
</Route>
<Route path='/create-employee' element={<CreateEmployee />} />
<Route path='/dashboard/employee-list' element={<EmployeeTable />} />
</Route>
<Route path='/login' element={<Login />} />

</Routes>

 </BrowserRouter>
    
  )
}

export default App
