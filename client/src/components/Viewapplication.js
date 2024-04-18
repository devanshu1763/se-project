import React, { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import img1 from '../images/img1.png';

const ViewApplications = () => {
  const [userData, setUserData] = useState(null);
  
const [cookies] = useCookies(['teacher_info', 'title_cookie']);

const researchData = cookies.teacher_info;
const researchDat = cookies.title_cookie;

// Check if researchData exists

// Destructure the teacher_email property if researchData is not null
const { email } = researchData;
const { title } = researchDat;

  // Define the effect to fetch data when component mounts or email changes
  useEffect(() => {
    const callTeacherhome = async () => {
      try {
        const res = await fetch(`/records?email=${email}&title=${title}`, {
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
   


  const handleAccept = async (researchId) => {
    try {
      const res = await fetch(`/status/${researchId}`, {
        method: 'PATCH',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({ status: 'accepted' })
      });
      if (res.status === 200) {
        // If the status is updated successfully, update the UI
        setUserData(prevData =>
          prevData.map(research =>
            research._id === researchId ? { ...research, status: 'accepted' } : research
          )
        );
      } else {
        console.error('Error:', res.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleReject = async (researchId) => {
    try {
      const res = await fetch(`/status/${researchId}`, {
        method: 'PATCH',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({ status: 'rejected' })
      });
      if (res.status === 200) {
        // If the status is updated successfully, update the UI
        setUserData(prevData =>
          prevData.map(research =>
            research._id === researchId ? { ...research, status: 'rejected' } : research
          )
        );
      } else {
        console.error('Error:', res.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
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
            <button className='new_r_buttonq' onClick={() => handleAccept(research._id)}>Accept</button>
            <button className='new_r_buttonq' onClick={() => handleReject(research._id)}>Reject</button>
          </div>
        ))}
      </div>
    </div>
  );
  
};

export default ViewApplications;
