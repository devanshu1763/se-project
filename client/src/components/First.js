import React from 'react'
import { NavLink } from 'react-router-dom'
import Teacherlogin from "./Teacherlogin"
import Login from './Login'
import img1 from '../images/img1.png'
import img2 from '../images/img2.png'
const First = () => {
  return (
    <div style={{ backgroundImage: `url(${img1})`, backgroundSize: 'cover', backgroundPosition: 'center', width: '100vw', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}> 
      <div className="container" >
        <h1>ScholarSync</h1>
        <br></br>
        <br></br>
        <div className="button-containers">
          <NavLink type="submit" className="faculty-button"  to="/Teacherlogin">Faculty Login</NavLink>
        </div>
        
        <div className="button-containers">
          <NavLink type="submit" className="student-button"  to="/Login">Student Login</NavLink>
        </div>
        <img src={img2} alt="Image 2" />
      </div>
    </div>
  )
}

export default First
