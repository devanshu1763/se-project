import React, { useState } from 'react';
import img1 from '../images/img1.png';
import { useCookies } from 'react-cookie';
import { NavLink } from 'react-router-dom';

const Apply = () => {
  const [cookies] = useCookies(['research']);
  const researchData = cookies.research;

  // Declare state outside of conditional block
  const [user, setUser] = useState({
    title:"",
    teacher_email: "",
    student_email: "",
    branch: "",
    cgpa: "",
    status: ""
  });

  if (!researchData) {
    return (
      <div>
        <h2>Error: Research Data Not Found</h2>
      </div>
    );
  }

  const { title,teacher_email } = researchData;

  const handleinputs = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const postData = async () => {
    try {
      const { student_email, branch, cgpa } = user;
      const res = await fetch('/applyr', {
        method: "POST",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify({
          title:title,
          teacher_email: teacher_email,
          student_email: student_email,
          branch: branch,
          cgpa: cgpa,
          status: "pending"
        })
      });

      if (res.status === 400) {
        window.alert("error");
      } else {
        window.alert("application submited");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div style={{ backgroundImage: `url(${img1})`, backgroundSize: 'cover', backgroundPosition: 'center', width: '100vw', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <h1 className='regnp'>Application form </h1>
      <form method='POST'>
        <div className="form-grou">
          <label htmlFor="exampleInputEmail1">Email</label>
          <input type="title" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name='student_email' onChange={handleinputs} value={user.student_email} />
        </div>
        <div className="form-grou">
          <label htmlFor="exampleInputEmail1">branch</label>
          <input type="title" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name='branch' onChange={handleinputs} value={user.branch} />
        </div>
        <div className="form-grou">
          <label htmlFor="exampleInputEmail1">cgpa</label>
          <input type="title" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name='cgpa' onChange={handleinputs} value={user.cgpa} />
        </div>
        <br></br>
        <br></br>
        <NavLink type="submit" className="login-button" onClick={postData}>Submit</NavLink>
      </form>
    </div>
  );
};

export default Apply;
