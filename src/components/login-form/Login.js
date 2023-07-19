import React from 'react';
import './Login.css'

function LoginForm() {
  return (
       <div class="loginBox"> <img class="user" src="https://i.ibb.co/yVGxFPR/2.png" height="100px" width="100px"/>
       <h3>Sign in here</h3>
       <form action="login.php" method="post">
           <div class="inputBox"> 
           <input id="uname" type="text" name="Username" placeholder="Username"/> 
           <input id="pass" type="password" name="Password" placeholder="Password"/> 
           </div> 
           <input type="submit" name="" value="Login"/>
       </form> 
       <a href="#">Forget Password<br/> </a>
       <div class="text-center">
           <p className='sign-up'>Sign-Up</p>
       </div>
       </div>    
  );
}

export default LoginForm;