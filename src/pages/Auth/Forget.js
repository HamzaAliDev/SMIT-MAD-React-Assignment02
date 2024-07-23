import React,{useState} from 'react';
import { useNavigate } from 'react-router-dom';
import myImg from '../../assets/profile.png'
import showImg from '../../assets/show.png'
import hideImg from '../../assets/hide.png'
import { toast } from 'react-toastify';

    const LOCAL_STORAGE_KEY = 'assign02Users';
    const initialState = {email:'', newPassword:'', confirmPassword:''};
export default function Forget() {

    const [newPasswordVisible, setNewPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
    const [state, setState] = useState(initialState);
    const navigate = useNavigate()

    const toggleNewPasswordVisibility = () => {
        setNewPasswordVisible(!newPasswordVisible);
    };

    const toggleConfirmPasswordVisibility = () => {
        setConfirmPasswordVisible(!confirmPasswordVisible);
    };

    const handleChange = (e) => {
        setState(s =>({...s,[e.target.name]:e.target.value}))
    };

    const handleUpdatePassword = () => {
        let {email, newPassword, confirmPassword} = state;
        email = email.trim();

        let storedUsers = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))

        let checkedUser = storedUsers.find(user => user.email === email)

        if(checkedUser){
            if(newPassword.length < 6){return toast.warning("Password must be 6 characters")};
            if(newPassword !== confirmPassword){return toast.warning("Password must be same")};

            checkedUser.password = newPassword;
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(storedUsers))
            setState(initialState);
            toast.success("Updated password successfully");
            navigate('/auth/login');

        }else{
            toast.error("Invalid email");
        }
    }

    return (
        <main className="">
            <div className='header-wave'>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#e0aaff" fillOpacity="1" d="M0,224L40,224C80,224,160,224,240,240C320,256,400,288,480,288C560,288,640,256,720,240C800,224,880,224,960,234.7C1040,245,1120,267,1200,261.3C1280,256,1360,224,1400,208L1440,192L1440,0L1400,0C1360,0,1280,0,1200,0C1120,0,1040,0,960,0C880,0,800,0,720,0C640,0,560,0,480,0C400,0,320,0,240,0C160,0,80,0,40,0L0,0Z"></path></svg>

            </div>
            <div className="register-section d-flex align-items-center justify-content-center">
            <div className="card auth-card">
                <img src={myImg} alt="" className='profile-img' />
                <div className="row mx-3" style={{ marginTop: 75 }}>
                    <div className="col">
                        <h2 className='text-white'>Forget Password</h2>
                    </div>
                </div>
                <div className="group">
                    <form action="">
                        <div className="form-group mt-2">
                            <label className=' mx-4 auth-label ' htmlFor='email'>Email</label>
                            <input required="" type="text" className="input mx-4  " id='email' name='email' value={state.email} onChange={handleChange} />
                            <span className="highlight mx-4  "></span>
                            <span className="bar mx-4  "></span>
                        </div>
                        <div className="form-group mt-2">
                            <label className='mx-4 auth-label ' htmlFor='newPassword'>New Password</label>
                            <input required="" type={newPasswordVisible ? "text" : "password"} className="input mx-4  " id='newPassword' name='newPassword' value={state.newPassword} onChange={handleChange}  />
                            <span className="highlight mx-4  "></span>
                            <span className="bar mx-4  "></span>
                            <img src={newPasswordVisible ? hideImg : showImg} alt='' className='eye-img-forget2 password-toggle-icon'  onClick={toggleNewPasswordVisibility} />
                        </div>
                        <div className="form-group mt-2">
                            <label className='mx-4 auth-label ' htmlFor='confirmPassword'>Confirm Password</label>
                            <input required="" type={confirmPasswordVisible ? "text" : "password"} className="input mx-4  " id='confirmPassword' name='confirmPassword' value={state.confirmPassword} onChange={handleChange} />
                            <span className="highlight mx-4  "></span>
                            <span className="bar mx-4  "></span>
                            <img src={confirmPasswordVisible ? hideImg : showImg} alt='' className='eye-img-forget password-toggle-icon'  onClick={toggleConfirmPasswordVisibility} />
                        </div>
                    </form>
                </div>
                <button className='btn btn-auth btn-primary mx-5 mt-4 fw-semibold' style={{color:'#3c096c'}} onClick={handleUpdatePassword}>Update</button>
            </div>

            </div>
            
        </main >
    )
}
