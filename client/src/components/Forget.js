import React, { useState } from 'react';
import img1 from '../images/img1.png';
import { NavLink } from 'react-router-dom';

const Forget = () => {
    const [email, setEmail] = useState('');
    const [apassword, setaPassword] = useState('');
    const [password, setPassword] = useState('');
    const [cpassword, setcPassword] = useState('');
    const [loading, setLoading] = useState(false); // State to manage loading state during API call

    const changePassword = async () => {
        if ( apassword=="devanshu" && password === cpassword) {
            setLoading(true); // Start loading state
            try {
                const response = await fetch('/change-password', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ email, password })
                });
                if (response.ok) {
                    alert('Password changed successfully');
                    // You can add logic to redirect the user or perform any other action here
                } else {
                    throw new Error('Failed to change password');
                }
            } catch (error) {
                console.error('Error changing password:', error);
                alert('Failed to change password');
            } finally {
                setLoading(false); // Stop loading state
            }
        } else {
            alert('Invalid input');
        }
    };

    return (
        <div style={{ backgroundImage: `url(${img1})`, backgroundSize: 'cover', backgroundPosition: 'center', width: '100vw', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <h1 className='regnp'>Reset password </h1>
            <div>
            <div className="form-grou">
                    <label htmlFor="exampleInputEmail1">Admin password</label>
                    <input type="password" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name='apassword' value={apassword} onChange={(e) => setaPassword(e.target.value)} />
                </div>
                <div className="form-grou">
                    <label htmlFor="exampleInputEmail1">Email</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name='email' value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>

                <div className="form-grou">
                    <label htmlFor="exampleInputEmail1">New password</label>
                    <input type="password" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name='password' value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div className="form-grou">
                    <label htmlFor="exampleInputPassword1">Confirm new password</label>
                    <input type="password" className="form-control" id="exampleInputPassword1" name='cpassword' value={cpassword} onChange={(e) => setcPassword(e.target.value)} />
                </div>

                <br />
                <button className="login-button" onClick={changePassword} disabled={loading}>{loading ? 'Loading...' : 'Submit'}</button>
            </div>
        </div>
    );
};

export default Forget;
