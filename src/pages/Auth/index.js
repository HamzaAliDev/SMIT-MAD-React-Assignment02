import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Login from './Login';
import Register from './Register';
import Forget from './Forget';
import Update from './Update';
import NoPage404 from '../Frontend/NoPage404';

export default function Auth() {
  return (
    <>
       <>
            <Routes>
            <Route path='login' element={<Login />} />
            <Route path='register' element={<Register />} />
            <Route path='forgot-password' element={<Forget />} />
            <Route path='update-password' element={<Update />} />
            <Route path='*' element={<NoPage404 />} />
            </Routes>
        </>
    </>
  )
}
