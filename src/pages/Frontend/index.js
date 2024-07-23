import React from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'

import Landing from './Landing';
import Home from './Home';
import TodoList from './TodoList';
import UserList from './UserList';
import AddTodo from './AddTodo';
import Header from '../../components/Header'
import NoPage404 from './NoPage404';


export default function Frontend() {
    const location = useLocation();
    const isLandingPage = location.pathname === '/';
    const isNoPage404 = location.pathname === '*';

    // console.log(isLandingPage);
    // console.log(isNoPage404);
    const showHeader = !isLandingPage && !isNoPage404;
    // console.log(showHeader);

    return (
        <>
               {showHeader && <Header />}
            <Routes>
                <Route path='/' element={<Landing />} />
                <Route path='/home' element={<Home />} />
                <Route path='/todo-list' element={<TodoList />} />
                <Route path='/user-list' element={<UserList />} />
                <Route path='/create-todo' element={<AddTodo />} />
                <Route path='/*' element={<NoPage404 />} />
            </Routes>
        </>
    )
}
