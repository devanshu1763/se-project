import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import img1 from '../images/img1.png';
import { useCookies } from 'react-cookie';
const Teacherresearch = () => {
 
    
    const nav = useNavigate();
    const [userData, setUserData] = useState(null);
  
    const [cookies, setCookie] = useCookies(['teacher_info', 'title_cookie']);
    const researchData = cookies.teacher_info;
    const { email } = researchData;
    
    const viewr = (title) => {
      const titleinfo = { title: title };
      console.log('Title Info:', titleinfo);
      
      setCookie('title_cookie', titleinfo);
      nav('/Viewapplications');
  };
  
    const callTeacherhome = async () => {
    
      try {
        const res = await fetch(`/trecords?email=${email}`, {
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
  
    useEffect(() => {
      callTeacherhome();
    }, []);
  
    return (
      <div style={{ backgroundImage: `url(${img1})`, backgroundSize: 'cover', backgroundPosition: 'center', width: "auto", height: '100vh', display: 'flex'}}>
        <div className="research-cards-container">
          {userData && userData.map(research => (
            <div key={research._id} className="card">
              <h2>Teacher: {research.teacher_n}</h2>
              <p>Research Title: {research.title}</p>
              <p>Domain: {research.domain}</p>
              <p>Additional: {research.additional}</p>
              <button className='new_r_button' onClick={() => viewr(research.title)}>View application</button>
            </div>
          ))}
        </div>
      </div>
    );
  };

export default Teacherresearch
