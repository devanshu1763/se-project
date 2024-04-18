import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import img1 from '../images/img1.png';

const Teacherreg = () => {
  const nav = useNavigate();
  const [user, setUser] = useState({
    name: "",
    email: "",
    branch: "",
    password: "",
  });

  const handleinputs = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  }

  const postData = async () => {
    try {
      const { name, email, branch, password } = user;
      
      // Check if any field is empty
      if (!name || !email || !branch || !password) {
        window.alert("Please fill in all fields");
        return;
      }

      const res = await fetch('/tsignup', {
        method: "POST",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify({
          username: name,
          email: email,
          password: password,
          branch: branch
        })
      });
      
      if (res.status === 400) {
        window.alert("User already exists");
        nav('/Teacherlogin');
      } else {
        window.alert("Registration successful");
        nav('/Teacherlogin');
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }

  return (
    <div style={{ backgroundImage: `url(${img1})`, backgroundSize: 'cover', backgroundPosition: 'center', width: '100vw', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <h1 className='regnp'>Teacher registration</h1>
      <form method='POST'>
        <div className="form-grou">
          <label htmlFor="exampleInputEmail1">USERNAME</label>
          <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name='name' onChange={handleinputs} value={user.name} />
        </div>
        <div className="form-grou">
          <label htmlFor="exampleInputPassword1">EMAIL</label>
          <input type="email" className="form-control" id="exampleInputPassword1" name='email' onChange={handleinputs} value={user.email} />
        </div>
        <div className="form-grou">
          <label htmlFor="exampleInputPassword1">Branch</label>
          <input type="text" className="form-control" id="exampleInputPassword1" name='branch' onChange={handleinputs} value={user.branch} />
        </div>
        <div className="form-grou">
          <label htmlFor="exampleInputPassword1">Password</label>
          <input type="password" className="form-control" id="exampleInputPassword1" name='password' onChange={handleinputs} value={user.password} />
        </div>
        <br />
        <br />
        <NavLink type="submit" className="login-button" onClick={postData}>Submit</NavLink>
      </form>
    </div>
  )
}

export default Teacherreg;
