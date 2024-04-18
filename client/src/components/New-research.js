import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import img1 from '../images/img1.png';
import { useCookies } from 'react-cookie';

const New = () => {
  const [cookies, setCookie] = useCookies(['research']);

  const nav = useNavigate();
  const [userData, setUserData] = useState(null);

  const addr = (research) => {
   setCookie('research', research);
    nav('/Apply', { research });
  };
  
  
  const callTeacherhome = async () => {
    try {
      const res = await fetch('/new_re', {
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
    <div style={{ backgroundImage: `url(${img1})`, backgroundSize: 'cover', backgroundPosition: 'center', width: "auto", height: 'auto', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div className="research-cards-container">
        {userData && userData.map(research => (
          <div key={research._id} className="card">
            <h2>Teacher: {research.teacher_n}</h2>
            <p>Research Title: {research.title}</p>
            <p>Domain: {research.domain}</p>
            <p>Additional: {research.additional}</p>
            <button className='new_r_button' onClick={() => addr(research)}>Apply</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default New;
