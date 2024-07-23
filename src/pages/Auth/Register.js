import React,{useState, useEffect} from 'react';
import { toast } from 'react-toastify';
import { Link,useNavigate } from 'react-router-dom';
import myImg from '../../assets/profile.png'
import showImg from '../../assets/show.png'
import hideImg from '../../assets/hide.png'

    const initialState = {fullName:"", email:"", password:''};
    const isValidEmail = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    const uniqueId = () => Math.random().toString(36).slice(4);
    const LOCAL_STORAGE_KEY = 'assign02Users';

export default function Register() {

    const [passwordVisible, setPasswordVisible] = useState(false);
    const [state, setState] = useState(initialState);
    const [users, setUsers] = useState([]);
    const navigate = useNavigate()

    
    // Load users from local storage when the component mounts
    useEffect(() => {
        const storedUsers = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (storedUsers) {
            setUsers(JSON.parse(storedUsers));
        }
    }, []);

    const togglePasswordVisibility = () => {
      setPasswordVisible(!passwordVisible);
    };

    const handleChange = (e) => {
        setState(s => ({...s,[e.target.name]: e.target.value}))   
    }

    const handleRegister = () => {
        let { fullName ,email, password } = state
        fullName = fullName.trim()
        email = email.trim()
    
        if(fullName === "" || email === "" || password === ''){ return toast.error("All fields are must required")}
        if(fullName.length < 3){return toast.error("Enter correct username")}
        if(!email.match(isValidEmail)){return toast.error("Invalid Email")}  
        if(password.length < 6){return toast.warning("Password must be 6 characters")}
        if(users.find(user => user.email === email)){return toast.info("Already Have an account")}
        
        let user = {
            fullName,
            email,
            password,
            addDate: new Date(),
            id:uniqueId(),
            status: "Active"
        }
        const updatedUsers = [...users, user];
        setUsers(updatedUsers);
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedUsers));

        toast.success("Added User Successfully!");
        setState(initialState);
        navigate("/auth/login");
        // console.log(user);
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
                        <h2 className='text-white'>Register</h2>
                    </div>
                </div>
                <div className="group">
                    <form action="">
                        <div className="form-group">
                            <label className=' mx-4 auth-label ' htmlFor='fullName'>Full Name</label>
                            <input required="" type="text" className="input mx-4  " id='fullName' name='fullName'  value={state.fullName} onChange={handleChange} />
                            <span className="highlight mx-4  "></span>
                            <span className="bar mx-4  "></span>
                        </div>
                        <div className="form-group mt-2">
                            <label className=' mx-4 auth-label ' htmlFor='email'>Email</label>
                            <input required="" type="text" className="input mx-4  " id='email' name='email'  value={state.email} onChange={handleChange} />
                            <span className="highlight mx-4  "></span>
                            <span className="bar mx-4  "></span>
                        </div>
                        <div className="form-group mt-2">
                            <label className='mx-4 auth-label ' htmlFor='password'>Password</label>
                            <input required="" type={passwordVisible ? "text" : "password"} className="input mx-4  " id='password' name='password'  value={state.password} onChange={handleChange} />
                            <span className="highlight mx-4  "></span>
                            <span className="bar mx-4  "></span>
                            <img src={passwordVisible ? hideImg : showImg} alt='' className='eye-img-register password-toggle-icon'  onClick={togglePasswordVisibility} />
                        </div>
                    </form>
                </div>
                <button className='btn btn-auth btn-primary mx-5 mt-4 fw-semibold' style={{color:'#3c096c'}} onClick={handleRegister}>Register</button>
                <div className="row mt-2">
                    <div className="col">
                    <p className='text-white text-center'>Already have an account. <Link to='/auth/login' style={{color:'#ff9100'}}>Login</Link></p>
                    </div>
                </div>

            </div>

            </div>
            
        </main >
    )
}
