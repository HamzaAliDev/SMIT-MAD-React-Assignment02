import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import pic from '../../assets/dprofile1.png';

export default function Header() {

    const [dropdownVisible, setDropdownVisible] = useState(false);
    const navigate = useNavigate();

    const toggleDropdown = () => {
        // e.stopPropagation();
        setDropdownVisible(!dropdownVisible);

    };
    useEffect(() => {
        const handleClickOutside = () => {
            if (dropdownVisible) {
                setDropdownVisible(false);
            }
        };

        document.addEventListener('click', handleClickOutside);

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [dropdownVisible]);

    const handleLogOut = () => {
        localStorage.removeItem("CurrentUser");
        navigate('/');

    }

    return (
        <header>
            <p className='header-text-full'>Todo Management System</p>
            <p className='header-text-short'>Todo</p>
            <Link to='/home' className='navbar-home-link'><p>Home</p></Link>
            <img src={pic} alt='' onClick={(e) => { e.stopPropagation(); toggleDropdown(); }} />
            {dropdownVisible && (
                    <ul className={`dropdown-menu dropdown-menu-header ${dropdownVisible ? 'visible' : ''}`}>
                        <li className='list'><Link to='/auth/update-password' className='dropdown-link' >Update Password</Link></li>
                        <li className='list'><button  className='btn dropdown-link' onClick={ handleLogOut} >Logout</button></li>
                    </ul>
            )}
        </header>
    )
}
