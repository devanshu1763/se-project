import React, { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import img1 from '../images/img1.png';


import Navbar from './Navbar'
const Ongoing = () => {
  const [userData, setUserData] = useState(null);
  const [cookies] = useCookies(['teacher_info']);
  const researchData = cookies.student_info;
  const { email } = researchData;



  // Define the effect to fetch data when component mounts or email changes
  useEffect(() => {
    const callTeacherhome = async () => {
      try {
        const res = await fetch(`/srecords?email=${email}`, {
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
          setUserData(data);
        } else {
          console.log('Error:', data.error);
        }
      } catch (err) {
        console.error('Error:', err);
      }
    };

    callTeacherhome();
  }, [email]); // Ensure useEffect runs whenever email changes
   


  
  return (
    <div style={{ backgroundImage: `url(${img1})`, backgroundSize: 'cover', backgroundPosition: 'center', width: "auto", height: '100vh', display: 'flex' }}>
      <div className="research-cards-container">
        {userData && userData.map(research => (
          <div key={research._id} className={`card ${research.status === 'accepted' ? 'accepted' : research.status === 'rejected' ? 'rejected' : 'pending'}`}>
            <h2>Title:{research.title}</h2>
            <p>Student email: {research.student_email}</p>
            <p>Branch: {research.branch}</p>
            <p>Cgpa: {research.cgpa}</p>
            <p>Status: {research.status}</p>
         
          </div>
        ))}
      </div>
    </div>)
};
export default Ongoing
