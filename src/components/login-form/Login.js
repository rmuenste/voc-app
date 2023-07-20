import React, { useState } from 'react';
import './Login.css'

function LoginForm() {

  const [formData, setFormData] = React.useState(
  {
    regUserName: "",
    regUserPassword: "",
    logUserName: "",
    logUserPassword: ""
  });

  const handleChange = (event) => {
    const {name, value, type, checked} = event.target;
    console.log(name);
    setFormData( prevFormData => {
      return {
        ...prevFormData,
        [name]: value
      }
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formData);
  }
  
  return (
       <div class="loginBox"> <img class="user" src="https://i.ibb.co/yVGxFPR/2.png" height="100px" width="100px"/>
       <h3>Sign in here</h3>
       <form onSubmit={handleSubmit}>
           <div class="inputBox"> 
           <input id="uname" type="text" name="logUserName" placeholder="Username" onChange={handleChange}/> 
           <input id="pass" type="password" name="logUserPassword" placeholder="Password" onChange={handleChange}/> 
           </div> 
           <button type="submit"/>
       </form> 
       <a href="#">Forget Password<br/> </a>
       <div class="text-center">
           <p className='sign-up'>Sign-Up</p>
       </div>
       </div>    
  );
}

export default LoginForm;