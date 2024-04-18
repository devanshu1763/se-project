import React from 'react'
import Navbar from './components/Navbar'
import Home from './components/Home'
import Ongoing from './components/Ongoing-research'
import Login from './components/Login'
import Reg from './Reg'
import {Route ,Routes}from "react-router-dom";
import './App.css'
import New from './components/New-research'
import First from './components/First'
import Teacherlogin from './components/Teacherlogin'
import Teacherreg from './components/Teacherreg'
import Teacherhome from './components/Teacherhome'
import Viewapplication from './components/Viewapplication'
import Addresearch from './components/Addresearch'
import Apply from './components/Apply'
import Teacherresearch from './components/Teacherresearch'
import Forget from './components/Forget'
import Sforget from './components/Sforget'
const App = () => {
  return (
   <>
   
    <Routes>
    <Route path="/" element={<First />} />
    <Route path="/Login" element={<Login />} />
    <Route path="/Teacherlogin" element={<Teacherlogin />} />
    <Route path="/Addresearch" element={<Addresearch />} />
    <Route path="/Viewapplications" element={<Viewapplication />} />
    <Route path="/Teacherreg" element={<Teacherreg />} />
    <Route path="/Teacherhome" element={<Teacherhome />} />
      <Route path="/Home" element={<Home />} />
      <Route path="/Ongoing" element={<Ongoing />} />
      <Route path="/Reg" element={<Reg />} />
      <Route path="/Apply" element={<Apply />} />
      <Route path="/New" element={<New/>} />
      <Route path="/Teacherresearch" element={<Teacherresearch/>} />
      <Route path="/Forget" element={<Forget/>} />
      <Route path="/Sforget" element={<Sforget/>} />



</Routes>
   </>
  )
}

export default App
