import React, { useState, useEffect } from 'react';
import img1 from '../images/img1.png'
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import Navbar from './Navbar';

const Teacherhome = () => {
  const nav=useNavigate();
  const [userData, setUserData] = useState(null);
  const [cookies, setCookie] = useCookies(['teacher_info']);
  

  const logout=()=>{
    nav('/Teacherlogin')
  }
  const viewra=()=>{
    const teacherInfo = { email: userData ? userData.email : '' };
  console.log('Teacher Info:', teacherInfo);
  setCookie('teacher_info', teacherInfo);
    nav('/Teacherresearch')
  }
  const viewr = () => {
  
  nav('/Teacherlogin');
};

  const addr=()=>{
    const teacherInfo = { email: userData ? userData.email : '' };
    console.log('Teacher Info:', teacherInfo);
    setCookie('teacher_info', teacherInfo);
    nav('/Addresearch')
  }
  const callTeacherhome = async () => {
    try {
      const res = await fetch('/thome', {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-type': 'application/json'
        },
        credentials: 'include'
      });
      const data = await res.json();
      console.log(data);
      if (res.status === 200) {
        // If the request is successful, set the user data
        setUserData(data);
      } else {
        console.log('Error:', data.error); // Log the error message
      }
    } catch (err) {
      console.error('Error:', err);
    }
  };

  useEffect(() => {
    callTeacherhome();
  }, []);

  return (
    <div style={{ backgroundImage: `url(${img1})`, backgroundSize: 'cover', backgroundPosition: 'center', width: '100vw', height: '100vh'}}>
   
    <div className="teacher-home-container">
      <h2>Faculty Information</h2>
      {userData ? (
        <div>
          <p className="user-info"> <strong>Name:</strong> {userData.username}</p>
          <p className="user-info"><strong>Email:</strong> {userData.email}</p>
          <p className="user-info"><strong>Branch:</strong> {userData.branch}</p>
          
          




        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
    <div className="button-container">
            <button className="action-button" onClick={addr}><b>Add research</b></button>
           
         
          <button className="action-button single-button" onClick={viewr}><b>Logout</b></button>
          <button className="action-button single-button" onClick={viewra}><b>Ongoing research</b></button>
          </div>
    </div>
    
  );
};

export default Teacherhome;
