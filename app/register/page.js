"use client"
import React, { useState } from 'react'
import "../main.css"
import "../notes/notes.css"
import "../login/login.css"
import "../login/googlebutton.css"
import GoogleSignInButton from '../login/googlebutton'


const page = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
  
    const handleSubmit = (e) => {
      e.preventDefault();
      // Handle form submission here
      console.log('Email:', email);
      console.log('Password:', password);
    };
  
    return (
        <>
     <div className="main">
        <div className="blur"></div>
        <div className="tealblob2"></div>
      <div className="purblob2"></div>







            <div className="noise"></div>
        
      <div className='login glassblur'>
        <div className="loginwrap">
        <h1>Register</h1>
        <form onSubmit={handleSubmit}>
          <div>

            <input
            placeholder='Email'
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>

            <input
            placeholder='Password'
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
           
          </div>
          <button type="submit">Register</button>
        </form>
        </div>

      </div>
      </div>

      </>
    );
  };
  
export default page