import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import myImg from '../../assets/profile.png'
import showImg from '../../assets/show.png'
import hideImg from '../../assets/hide.png'

const LOCAL_STORAGE_KEY = 'assign02Users';
// Define the keys you want to keep
const KEYS_TO_KEEP = ['assign02Users', 'assign02Todos'];
const initialState = { email: "", password: "" };

export default function Login() {

    const [passwordVisible, setPasswordVisible] = useState(false);
    const [state, setState] = useState(initialState)
    const navigate = useNavigate()


    // Remove other local storage data
    const removeOtherLocalStorageData = () => {
        Object.keys(localStorage).forEach(key => {
            if (!KEYS_TO_KEEP.includes(key)) {
                localStorage.removeItem(key);
            }
        });
    };

    // Call the function to remove unwanted data
    removeOtherLocalStorageData();



    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    const handleChange = (e) => {
        setState(s => ({ ...s, [e.target.name]: e.target.value }))
    }

    const handleLogin = () => {
        let { email, password } = state;
        email = email.trim();

        let storedUsers = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || [];

        // check if user exists or password matches
        let CheckedUser = storedUsers.find(user => user.email === email && user.password === password)

        if (CheckedUser) {
            localStorage.setItem('CurrentUser', JSON.stringify(CheckedUser));
            toast.success("Login successfully");
            setState(initialState);
            navigate('/home');

        } else {
            toast.error("Invalid email or password.");
        }
    }


    return (
        <main className="">
            <div className='header-wave'>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#e0aaff" fillOpacity="1" d="M0,224L40,224C80,224,160,224,240,240C320,256,400,288,480,288C560,288,640,256,720,240C800,224,880,224,960,234.7C1040,245,1120,267,1200,261.3C1280,256,1360,224,1400,208L1440,192L1440,0L1400,0C1360,0,1280,0,1200,0C1120,0,1040,0,960,0C880,0,800,0,720,0C640,0,560,0,480,0C400,0,320,0,240,0C160,0,80,0,40,0L0,0Z"></path></svg>

            </div>
            <div className="login-section d-flex align-items-center justify-content-center">
                <div className="card auth-card">
                    <img src={myImg} className='profile-img' alt='' />
                    <div className="row mx-3" style={{ marginTop: 65 }}>
                        <div className="col">
                            <h1 className='text-white'>Login</h1>
                        </div>
                    </div>
                    <div className="group">
                        <form action="">
                            <div className="form-group">
                                <label className='mx-4 auth-label ' htmlFor='email'>Email</label>
                                <input required="" type="text" className="input mx-4  " id='email' name='email' value={state.email} onChange={handleChange} />
                                <span className="highlight mx-4  "></span>
                                <span className="bar mx-4  "></span>
                            </div>
                            <div className="form-group mt-3">
                                <label className='mx-4 auth-label ' htmlFor='password'>Password</label>
                                <input required="" type={passwordVisible ? "text" : "password"} className="input mx-4  " id='password' name='password' value={state.password} onChange={handleChange} />
                                <span className="highlight mx-4  "></span>
                                <span className="bar mx-4  "></span>
                                <img src={passwordVisible ? hideImg : showImg} alt='' className='eye-img-login password-toggle-icon' onClick={togglePasswordVisibility} />
                            </div>
                            <div>
                                <Link to='/auth/forgot-password' className='forget-pass-text'>Forgot Password</Link>

                            </div>
                        </form>
                    </div>
                    <button className='btn btn-auth btn-primary mx-5 mt-5 fw-semibold' style={{ color: '#3c096c' }} onClick={handleLogin}>Login</button>
                    <div className="row mt-2">
                        <div className="col">
                            <p className='text-white text-center'>Don't have an account? <Link to='/auth/register' style={{ color: '#ff9100' }}>Register</Link></p>
                        </div>
                    </div>

                </div>

            </div>

        </main >
    )
}
