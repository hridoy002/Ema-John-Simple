import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "./SignUp.css"
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
;

const SignUp = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    // user create functionality
    const [createUserWithEmailAndPassword, user] = useCreateUserWithEmailAndPassword(auth)

    // handle form 
    const handleForm = (event) => {
        event.preventDefault()
        if (confirmPassword !== password) {
            setError("Passwords not match!")
            return;
        }
        if(password.length<6){
            setError('Password must be 6 length')
            return;
        }
        createUserWithEmailAndPassword(email,password);
    }

    // navigate after sign up 
    if(user){
        navigate("/");
    }
    // handle email 
    const handleEmail = event => {
        setEmail(event.target.value)
    }
    // handle password 
    const handlePassword = event => {
        setPassword(event.target.value)
    }
    // handle confirm password 
    const handleConfirmPassword = event => {
        setConfirmPassword(event.target.value)
    }


    return (
        <div className='form-container'>
            <div>
                <h2 className='title'>Sign Up</h2>
                <form onSubmit={handleForm} action="">
                    <div className="inputGroup">
                        <label htmlFor="email">Email</label>
                        <input onBlur={handleEmail} type="email" name="email" id="" required />
                    </div>
                    {/* password  */}
                    <div className="inputGroup">
                        <label htmlFor="password">Password</label>
                        <input onBlur={handlePassword} type="password" name="password" id="" required />
                    </div>
                    {/* confirm password */}
                    <div className="inputGroup">
                        <label htmlFor="password">Confirm Password</label>

                        <input onBlur={handleConfirmPassword} type="password" name="confirm-password" id="" required />
                        <p style={{ color: 'red' }}>{error}</p>
                    </div>
                    <input className='form-submit' type="submit" value="Sign Up" />
                </form>
                <p>Already have an account? <Link className='form-link' to='/login'>Login</Link></p>
            </div>
        </div>
    );
};

export default SignUp;