import React, { useState } from 'react'
import './Login.css'
import { Link ,useNavigate} from 'react-router-dom'
import {auth} from "../FirebaseConsole/firebase.js"
import {signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
function Login() {

const Navigate=useNavigate();
const [user,setUser]=useState({Email:"",
password:""
});

function handleChange(e)
{ 
   const name=e.target.name;
   const value=e.target.value;
   setUser((prevalue)=>{
    return {...prevalue,[name]:value}
   })
}

function handleLogin(event)
{
    event.preventDefault()
    signInWithEmailAndPassword(auth,user.Email,user.password).then(userCredential=>{
       
        Navigate('/')
    }).catch(error=>alert(error.message));
}
function handleRegister(event)
{
    event.preventDefault();
    createUserWithEmailAndPassword(auth,user.Email,user.password).then((userCredential) => {
        // Signed up 
        Navigate('/');
       // console.log(userCredential)
    
        // ...
      })
      .catch(error=>alert(error.message));
}
  return (
   <div className="login">
      <Link to="/">
                <img alt=''
                    className="login__logo"
                    src='https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png' 
                />
       </Link>
       <div className='login_container'>
        <h1>Sign-in</h1>
        <form>
            <h5>E-mail</h5>
            <input type='text' name='Email' onChange={handleChange} value={user.Email}/>
            <h5>Password</h5>
            <input type='password' name='password'  onChange={handleChange} value={user.password}/>
            <button type="submit" onClick={handleLogin} className='login_signButton'>Sign in</button>
        </form>
                <p>
                    By signing-in you agree to the AMAZON FAKE CLONE Conditions of Use & Sale. Please
                    see our Privacy Notice, our Cookies Notice and our Interest-Based Ads Notice.
                </p>
                <button className="login_registeButton" onClick={handleRegister}>Create your Amazon Account</button>
       </div>
   </div>
  )
}

export default Login