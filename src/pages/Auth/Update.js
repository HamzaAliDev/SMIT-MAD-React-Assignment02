import React,{useState} from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import myImg from '../../assets/profile.png'
import showImg from '../../assets/show.png'
import hideImg from '../../assets/hide.png'

    const initialState = {oldPassword:'', newPassword:'', confirmPassword:''};
export default function Update() {

    const [oldPasswordVisible,setOldPasswordVisible] = useState(false);
    const [newPasswordVisible, setNewPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
    const [state, setState] = useState(initialState);
    const navigate = useNavigate();

    const toggleOldPasswordVisibility = () => {
        setOldPasswordVisible(!oldPasswordVisible);
    };
    const toggleNewPasswordVisibility = () => {
        setNewPasswordVisible(!newPasswordVisible);
    };

    const toggleConfirmPasswordVisibility = () => {
        setConfirmPasswordVisible(!confirmPasswordVisible);
    };

    const handleChange = (e) => {
        setState(s => ({...s,[e.target.name]: e.target.value}))
    }
    const handleUpdatePassword = () => {
        const{oldPassword,newPassword,confirmPassword} = state;
        
        const currentUser = JSON.parse(localStorage.getItem('CurrentUser'));
        const users = JSON.parse(localStorage.getItem('assign02Users')) || [];

        if(oldPassword === '' || newPassword === '' || confirmPassword === ''){return toast.warning("All fields are must Required")}

        if(currentUser.password === oldPassword){
            if(newPassword.length < 6){return toast.warning("Password must be 6 letters")}
            if(newPassword === confirmPassword){
                currentUser.password = newPassword;

                const updatedUsers = users.map(user => 
                    user.id === currentUser.id ? { ...user, password: newPassword } : user
                );

                localStorage.setItem('CurrentUser', JSON.stringify(currentUser));
                localStorage.setItem('assign02Users', JSON.stringify(updatedUsers));

                toast.success("Password Updated Successfully");
                setState(initialState);
                navigate('/home')


            }else if(newPassword !== confirmPassword){
                toast.error("New and Confirm password not match");
            }
        }else if(currentUser.password !== oldPassword){ toast.error("Password is incorrect")}
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
                        <h2 className='text-white'>Change Password</h2>
                    </div>
                </div>
                <div className="group">
                    <form action="">
                        <div className="form-group mt-2">
                            <label className='mx-4 auth-label ' htmlFor='oldPassword'>Old Password</label>
                            <input required="" type={oldPasswordVisible ? "text" : "password"} className="input mx-4  " id='oldPassword' name='oldPassword' value={state.oldPassword} onChange={handleChange} />
                            <span className="highlight mx-4  "></span>
                            <span className="bar mx-4  "></span>
                            <img src={oldPasswordVisible ? hideImg : showImg} alt='' className='eye-img-update3 password-toggle-icon'  onClick={toggleOldPasswordVisibility} />
                        </div>
                        <div className="form-group mt-2">
                            <label className='mx-4 auth-label ' htmlFor='newPassword'>New Password</label>
                            <input required="" type={newPasswordVisible ? "text" : "password"} className="input mx-4  " id='newPassword' name='newPassword' value={state.newPassword} onChange={handleChange} />
                            <span className="highlight mx-4  "></span>
                            <span className="bar mx-4  "></span>
                            <img src={newPasswordVisible ? hideImg : showImg} alt='' className='eye-img-update2 password-toggle-icon'  onClick={toggleNewPasswordVisibility} />
                        </div>
                        <div className="form-group mt-2">
                            <label className='mx-4 auth-label ' htmlFor='confirmPassword'>Confirm Password</label>
                            <input required="" type={confirmPasswordVisible ? "text" : "password"} className="input mx-4  " id='confirmPassword' name='confirmPassword' value={state.confirmPassword} onChange={handleChange} />
                            <span className="highlight mx-4  "></span>
                            <span className="bar mx-4  "></span>
                            <img src={confirmPasswordVisible ? hideImg : showImg} alt='' className='eye-img-update password-toggle-icon'  onClick={toggleConfirmPasswordVisibility} />
                        </div>
                    </form>
                </div>
                <button className='btn btn-auth btn-primary mx-5 mt-4 fw-semibold' style={{color:'#3c096c'}} onClick={handleUpdatePassword}>Update</button>

            </div>

            </div>
            
        </main >
    )
}
