import React, { useState } from 'react';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { Link, useNavigate } from 'react-router-dom';
import auth from '../../firebase.init';
import "./LogIn.css"

const LogIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error,setError] = useState('');
    const navigate = useNavigate();

    const[signInWithEmailAndPassword, user] = useSignInWithEmailAndPassword(auth);

    const handleEmail =event =>{
        setEmail(event.target.value)
    }

   
    const handlePassword =event =>{
        setPassword(event.target.value)
    }

    if(user){
        navigate("/")
    }

     // handle form 
    const handleForm=(event)=> {
        event.preventDefault()
        signInWithEmailAndPassword(email,password)
        setError('Wrong Password')
    }
    return (
        <div className='form-container'>
            <div>
                <h2 className='title'>Login</h2>
                <form onSubmit={handleForm} action="">
                    <div className="inputGroup">
                        <label htmlFor="email">Email</label>
                        <input onBlur={handleEmail} type="email" name="email" id="" required/>
                    </div>
                    <div className="inputGroup">
                        <label htmlFor="password">Password</label>
                        <input onBlur={handlePassword} type="password" name="password" id="" required/>
                        <p style={{color:'red'}}>{error}</p>
                    </div>
                    <input className='form-submit' type="submit" value="Login" />
                </form>
                <p>New to Ema-john? <Link className='form-link' to='/signup'>Create New Account</Link></p>
            </div>
        </div>
    );
};

export default LogIn;